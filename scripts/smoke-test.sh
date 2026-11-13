#!/usr/bin/env bash
# The smoke leg — boots the STANDALONE ARTIFACT (not the dev server — the
# e2e doctrine: validate what ships) on :3210 with its OWN scratch
# database (db/smoke.db, gitignored like db/custom.db) and a dedicated
# throwaway AUTH_SECRET, then walks the assertion ladder:
#
#   01  /api/health 200 + "status":"healthy"        (the db round-trip)
#   02  the landing renders (title + hero heading)   (the public surface)
#   03  /Tool renders its H1                         (the generator page)
#   04  /Pricing + /Contact render their H1s         (the page family)
#   05  /Home 308-redirects to /                     (the canonical alias)
#   06  the unknown route answers the designed 404   (the not-found page)
#   07  the demo login -> the viralpost_session cookie (the auth round-trip)
#   08  the sessioned /api/auth/me -> 200 + the USER row (envelope; the
#       logged-out data:null face can never satisfy it — session-32 S32-2)
#   09  an invalid contact payload -> 400            (the Zod seam)
#   10  a valid contact submit -> 200 (the persistence superset)
#   11  the generator round-trip -> 200 + hashtags   (the core workflow!)
#   12  logout -> 200; /api/auth/me data:null     (the cookie teardown)
#   13  the 11th login answers 429 + Retry-After  (the LIVE rate limit —
#       the master skill's smoke-tier contract, restored from the CRM-era
#       11th-login shape; session-32 S32-3: leg 07's login + 10 wrong-
#       password POSTs, the first nine answer 401, the tenth additional
#       is the 11th in the login window)
#   14  /sitemap.xml + /robots.txt + /manifest.json all 200 (the SEO family)
#   15  THE BOOT-GATE PROBE: a second boot WITHOUT AUTH_SECRET refuses
#       to serve — the fail-fast posture (the log carries the message)
#   16  THE ARTIFACT-HYGIENE assertions: the built artifact contains NO
#       .env / .git / db / skills / docs / uploads / worklog.md /
#       test-results entries — session-35 (S35-6): the full 29-entry
#       mirror (all the root contract docs + SKILL/LICENSE + the
#       lockfiles + the configs + tsbuildinfo + scripts/ + tests/);
#       the in-loop enumeration below is the authority, this header a
#       summary (the pre-S34-7 8-entry form stayed stale here for two
#       rounds — the header must name the families, never enumerate
#       exhaustively)
#
# Every assertion: ok "NN — description" || { fail "NN"; exit 1; }
# The trap kills the server on ANY exit.

set -euo pipefail

PORT=3210
BASE="http://localhost:${PORT}"
SMOKE_DB_URL="file:../db/smoke.db"
# A dedicated throwaway secret (33 chars >= the 16-char production floor)
# — NEVER the repo .env's value: the smoke leg must be immune to the
# shell-env trap the db-path seam documents.
SMOKE_SECRET="smoke-test-secret-0123456789abcdef"
COOKIE_JAR="$(mktemp)"
SERVER_LOG="$(mktemp)"
GATE_LOG="$(mktemp)"
SERVER_PID=""
# Session-20 (S20-3): the S19-17 trap references GATE_PID, and this
# script runs `set -u` — an uninitialized reference in the EXIT trap
# (any early-leg failure) aborts the cleanup mid-function and leaks
# the temp files. Every trap-referenced variable is born empty here.
GATE_PID=""
# Session-33 (S33-6): the S20-3 doctrine, extended to the three
# leg-local mktemp files — the push/seed log (leg 00's fail path cats
# and exits BEFORE its rm -f) and the 429 leg's body/headers (leg 13's
# fail path exits at the assertion). Born empty so the trap's rm -f is
# safe on every exit path (rm -f "" exits 0 — verified); the mktemp
# assignments later in the script simply overwrite these.
SMOKE_PUSH_LOG=""
rl_body=""
rl_headers=""

ok()   { echo "  ok $1 — $2"; }
fail() { echo "  FAIL $1 — $2" >&2; }
cleanup() {
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
  # Session-19 (S19-17): the boot-gate probe's server rides the trap too —
  # a leg failing between the :3211 spawn and the inline kill leaked it.
  [ -n "$GATE_PID" ] && kill "$GATE_PID" 2>/dev/null || true
  # Session-33 (S33-6): the three leg-local temp files join the trap —
  # every failure-path exit now cleans them (rm -f on the born-empty
  # spelling is a no-op; on the mktemp spelling it removes the file).
  rm -f "$COOKIE_JAR" "$SERVER_LOG" "$GATE_LOG" "$SMOKE_PUSH_LOG" "$rl_body" "$rl_headers"
}
trap cleanup EXIT

# --- 0. the artifact must exist (the gate chain builds right before) --------
[ -f .next/standalone/server.js ] || { fail "00" "no standalone artifact — run bun run build first"; exit 1; }

# --- 1. the smoke database: fresh schema + seed (the ambient override) ------
# Session-23 (S23-17): output captured, cat-ed on failure — under set -e a
# failed push/seed used to abort the gate with ZERO diagnostics (a locked
# SQLite file read as an unexplained failure at leg "00").
SMOKE_PUSH_LOG="$(mktemp)"
if ! DATABASE_URL="$SMOKE_DB_URL" bun run db:push >"$SMOKE_PUSH_LOG" 2>&1; then
  cat "$SMOKE_PUSH_LOG" >&2
  fail "00" "bun run db:push failed (above) — the smoke database could not be created"
  exit 1
fi
if ! DATABASE_URL="$SMOKE_DB_URL" bun run db:seed >"$SMOKE_PUSH_LOG" 2>&1; then
  cat "$SMOKE_PUSH_LOG" >&2
  fail "00" "bun run db:seed failed (above) — the smoke database could not be seeded"
  exit 1
fi
rm -f "$SMOKE_PUSH_LOG"

# --- 2. kill squatters on the smoke port ------------------------------------
# Session-22 (S22-12): portable across GNU/BSD — `xargs -r` is GNU-only
# (BSD rejects it), so `grep .` provides the empty-input no-op instead;
# the lsof guard keeps a missing binary loud-but-liminal instead of a
# silent 30-second health-wait mystery at leg 00.
kill_port_squatters() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -ti:"$1" | grep . | xargs kill 2>/dev/null || true
  else
    echo "smoke: lsof not found — skipping the squatter-kill for port $1" >&2
  fi
}
kill_port_squatters "$PORT"
sleep 1

# --- 3. boot the standalone artifact ----------------------------------------
# Session-48 (S48-12, AUDIT-1 I3): booted with `node` by design — every
# env is explicit in this run, so the leg is deterministic regardless of
# the launcher. The production `start` script's bun launch (the regime
# the standalone server's own runtime owns) is not exercised here; a
# regime-parity leg would trade determinism for coverage the e2e layer
# already owns.
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="$SMOKE_SECRET" NODE_ENV=production PORT="$PORT" \
  node .next/standalone/server.js >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# --- the health-wait loop (30 x 1s) -----------------------------------------
# Session-23 (S23-11): --max-time 2 — a wedged server (TCP accept, no
# response) used to hang curl indefinitely, making the seq bound fiction.
up=1
for _ in $(seq 1 30); do
  if curl -sf --max-time 2 "$BASE/api/health" >/dev/null 2>&1; then up=0; break; fi
  sleep 1
done
[ "$up" = 0 ] || { fail "00" "the standalone server never became healthy"; cat "$SERVER_LOG" >&2; exit 1; }

# --- 4. the assertion ladder -------------------------------------------------
body() { curl -s --max-time 10 "$@"; }
code() { curl -s --max-time 10 -o /dev/null -w "%{http_code}" "$@"; }

# 01 — health: the db round-trip
[ "$(code "$BASE/api/health")" = 200 ] && body "$BASE/api/health" | grep -q '"status":"healthy"' \
  && ok 01 "health 200 + healthy" || { fail 01 "health"; exit 1; }

# 02 — the landing renders (title + the sr-only h1 phrase)
body "$BASE/" | grep -q "<title>ViralPost AI</title>" && body "$BASE/" | grep -q "Go Viral!" \
  && ok 02 "landing renders (title + hero)" || { fail 02 "landing page"; exit 1; }

# 03 — the Tool page renders its H1
body "$BASE/Tool" | grep -q "AI Post Generator" \
  && ok 03 "tool page renders" || { fail 03 "tool page"; exit 1; }

# 04 — the Pricing + Contact pages render their H1s
body "$BASE/Pricing" | grep -q "Simple, Transparent Pricing" \
  && body "$BASE/Contact" | grep -q "Contact Us" \
  && ok 04 "pricing + contact render" || { fail 04 "page family"; exit 1; }

# 05 — the /Home alias redirects to the canonical /
redirect_code=$(code "$BASE/Home")
[ "$redirect_code" = 308 ] && ok 05 "/Home 308-redirects to /" || { fail 05 "/Home redirect (got $redirect_code)"; exit 1; }

# 06 — the unknown route answers the designed 404: true 404 STATUS + the
# reference's DERIVED title (session-2 F-1: "<StartCase(last segment)> |
# ViralPost AI" — the /Dashboard decode). The 404 BODY renders through
# the client stream (Next's dynamic-boundary fallback — the same
# client-rendered posture as the reference's SPA 404); the rendered-body
# contract is owned by the e2e layer (tests/e2e/landing.spec.ts asserts
# the "404" heading + Go Home in a real browser).
[ "$(code "$BASE/definitely-not-a-route")" = 404 ] \
  && body "$BASE/definitely-not-a-route" | grep -q "<title>Definitely Not A Route | ViralPost AI</title>" \
  && body "$BASE/definitely-not-a-route" | grep -q 'name="robots" content="noindex"' \
  && ok 06 "the designed 404 (status + derived title + noindex)" || { fail 06 "404 page"; exit 1; }

# 07 — the demo login round-trip (the seed contract's credentials)
login_code=$(code -c "$COOKIE_JAR" -H "Content-Type: application/json" \
  -d '{"email":"sepnetflix2023@outlook.com","password":"$Abcd1234"}' "$BASE/api/auth/login")
[ "$login_code" = 200 ] && grep -q "viralpost_session" "$COOKIE_JAR" \
  && ok 07 "demo login + the viralpost_session cookie" || { fail 07 "login"; exit 1; }

# 08 — the sessioned envelope (session-32 S32-2: the grep carries the USER
# row — the logged-out ok:true,data:null face can never satisfy it, so a
# cookie-VERIFICATION regression now fails the leg instead of riding green)
[ "$(code -b "$COOKIE_JAR" "$BASE/api/auth/me")" = 200 ] && body -b "$COOKIE_JAR" "$BASE/api/auth/me" | grep -q '"email":"sepnetflix2023@outlook.com"' \
  && ok 08 "sessioned me 200 + the user row" || { fail 08 "sessioned read"; exit 1; }

# 09 — the invalid payload (the Zod seam's 400)
[ "$(code -b "$COOKIE_JAR" -H "Content-Type: application/json" -d '{"name":"x","email":"not-an-email","message":"y"}' "$BASE/api/contact")" = 400 ] \
  && ok 09 "invalid contact payload 400" || { fail 09 "invalid payload"; exit 1; }

# 10 — the valid contact submit (the persistence superset; smoke.db is
# disposable)
[ "$(code -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -d '{"name":"Smoke Probe","email":"smoke@example.com","message":"Hello from the smoke ladder."}' \
  "$BASE/api/contact")" = 200 ] \
  && ok 10 "valid contact submit 200" || { fail 10 "contact submit"; exit 1; }

# 11 — the generator round-trip (the CORE workflow — the working engine)
gen_body=$(body -b "$COOKIE_JAR" -H "Content-Type: application/json" \
  -d '{"idea":"motivational post for entrepreneurs about consistency"}' "$BASE/api/generate")
echo "$gen_body" | grep -q '"ok":true' && echo "$gen_body" | grep -q '#' \
  && ok 11 "generate 200 + a hashtagged post" || { fail 11 "generator (body: $gen_body)"; exit 1; }

# 12 — the logout teardown (-c: the jar takes the cleared cookie; /me is
# the by-design data:null face — a logged-out caller gets 200 + data:null).
# Session-32 (S32-2): the STATUS is asserted too — the S29-1 session gate
# answers 401 for cookie-less callers; with the jar it must be 200.
logout_code=$(code -b "$COOKIE_JAR" -c "$COOKIE_JAR" -X POST "$BASE/api/auth/logout")
[ "$logout_code" = 200 ] && body -b "$COOKIE_JAR" "$BASE/api/auth/me" | grep -q '"data":null' \
  && ok 12 "logout 200 + post-logout data:null" || { fail 12 "logout teardown (code $logout_code)"; exit 1; }

# 13 — the LIVE rate limiter (session-32 S32-3): the master skill's
# smoke-tier contract (web-application §14.3 "rate limit (429)"), restored
# from the CRM-era 11th-login shape the session-1 transform dropped.
# leg 07's login + 10 wrong-password POSTs = 11 in the login window; the
# first nine answer 401 (allowed, wrong credentials — the timing
# equalizer burns on each), the tenth additional is the 11th cumulative
# and must answer 429 with Retry-After + the RATE_LIMITED envelope.
# Broken-OPEN (never 429) and broken-CLOSED (429 too early) both fail
# the exact code sequence.
rl_body="$(mktemp)"; rl_headers="$(mktemp)"; rl_codes=""
for _ in $(seq 1 10); do
  rl_c=$(curl -s --max-time 10 -o "$rl_body" -D "$rl_headers" \
    -H "Content-Type: application/json" \
    -d '{"email":"sepnetflix2023@outlook.com","password":"definitely-wrong"}' \
    -w "%{http_code}" "$BASE/api/auth/login")
  rl_codes="$rl_codes $rl_c"
done
[ "$rl_codes" = " 401 401 401 401 401 401 401 401 401 429" ] \
  && grep -qi '^retry-after:' "$rl_headers" \
  && grep -q 'RATE_LIMITED' "$rl_body" \
  && ok 13 "the 11th login answers 429 + Retry-After (the live limiter)" \
  || { fail 13 "rate limit (codes:$rl_codes)"; exit 1; }
rm -f "$rl_body" "$rl_headers"

# 14 — the SEO family
[ "$(code "$BASE/sitemap.xml")" = 200 ] && [ "$(code "$BASE/robots.txt")" = 200 ] && [ "$(code "$BASE/manifest.json")" = 200 ] \
  && ok 14 "sitemap + robots + manifest 200" || { fail 14 "the SEO family"; exit 1; }

# --- 15. THE BOOT-GATE PROBE: a secretless production boot refuses -----------
kill_port_squatters 3211
sleep 1
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="" NODE_ENV=production PORT=3211 \
  node .next/standalone/server.js >"$GATE_LOG" 2>&1 &
GATE_PID=$!
served=1
for _ in $(seq 1 8); do
  if curl -sf --max-time 2 "http://localhost:3211/api/health" >/dev/null 2>&1; then served=0; break; fi
  sleep 1
done
kill "$GATE_PID" 2>/dev/null || true
wait "$GATE_PID" 2>/dev/null || true
[ "$served" = 1 ] && grep -q "AUTH_SECRET" "$GATE_LOG" \
  && ok 15 "the secretless production boot refuses to serve (the log names AUTH_SECRET)" \
  || { fail 15 "the boot gate did not refuse"; cat "$GATE_LOG" >&2; exit 1; }

# --- 16. THE ARTIFACT-HYGIENE assertions -------------------------------------
hygiene_fail=""
# Session-23 (S23-18): server.log joins dev.log — the start script's tee
# creates it at the repo root; a stale one belongs to the F-170a nft-baggage
# class and must fail the same hygiene leg.
# Session-34 (S34-7): the enumeration now MIRRORS next.config.ts's
# outputFileTracingExcludes root files (plus uploads, the pre-existing
# tripwire) — the excludes list and this leg are the same F-170a nft
# repo-root-drag tripwire in two places; a hazard shape that ships any
# of these fails the leg even when the tracer itself never dragged it.
for entry in .env .env.example .env.production .env.local .git db skills docs uploads worklog.md test-results dev.log server.log AGENTS.md CLAUDE.md README.md Project_Architecture_Document.md viralpost-ai_SKILL.md neo-crm_SKILL.md next.config.ts LICENSE bun.lock package-lock.json eslint.config.mjs playwright.config.ts postcss.config.mjs tsconfig.json tsconfig.tsbuildinfo vitest.config.mts scripts tests; do
  [ -e ".next/standalone/$entry" ] && hygiene_fail="$hygiene_fail $entry"
done
[ -z "$hygiene_fail" ] \
  && ok 16 "the artifact carries no repo-root drag (the excludes mirror: env files/.git/db/skills/docs/uploads/logs/configs/markdown/scripts/tests)" \
  || { fail 16 "the artifact ships:$hygiene_fail"; exit 1; }

echo "SMOKE: 16/16 PASS"
