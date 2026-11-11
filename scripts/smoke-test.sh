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
#   08  the sessioned /api/auth/me -> 200 + the user (the envelope ok:true)
#   09  an invalid contact payload -> 400            (the Zod seam)
#   10  a valid contact submit -> 200 (the persistence superset)
#   11  the generator round-trip -> 200 + hashtags   (the core workflow!)
#   12  logout -> /api/auth/me data:null             (the cookie teardown)
#   13  /sitemap.xml + /robots.txt + /manifest.json all 200 (the SEO family)
#   14  THE BOOT-GATE PROBE: a second boot WITHOUT AUTH_SECRET refuses
#       to serve — the fail-fast posture (the log carries the message)
#   15  THE ARTIFACT-HYGIENE assertions: the built artifact contains NO
#       .env / .git / db / skills / docs / uploads / worklog.md /
#       test-results entries
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

ok()   { echo "  ok $1 — $2"; }
fail() { echo "  FAIL $1 — $2" >&2; }
cleanup() {
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
  # Session-19 (S19-17): the boot-gate probe's server rides the trap too —
  # a leg failing between the :3211 spawn and the inline kill leaked it.
  [ -n "$GATE_PID" ] && kill "$GATE_PID" 2>/dev/null || true
  rm -f "$COOKIE_JAR" "$SERVER_LOG" "$GATE_LOG"
}
trap cleanup EXIT

# --- 0. the artifact must exist (the gate chain builds right before) --------
[ -f .next/standalone/server.js ] || { fail "00" "no standalone artifact — run bun run build first"; exit 1; }

# --- 1. the smoke database: fresh schema + seed (the ambient override) ------
DATABASE_URL="$SMOKE_DB_URL" bun run db:push >/dev/null 2>&1
DATABASE_URL="$SMOKE_DB_URL" bun run db:seed >/dev/null 2>&1

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
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="$SMOKE_SECRET" NODE_ENV=production PORT="$PORT" \
  node .next/standalone/server.js >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# --- the health-wait loop (30 x 1s) -----------------------------------------
up=1
for _ in $(seq 1 30); do
  if curl -sf "$BASE/api/health" >/dev/null 2>&1; then up=0; break; fi
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

# 08 — the sessioned envelope
[ "$(code -b "$COOKIE_JAR" "$BASE/api/auth/me")" = 200 ] && body -b "$COOKIE_JAR" "$BASE/api/auth/me" | grep -q '"ok":true' \
  && ok 08 "sessioned me 200 + ok:true" || { fail 08 "sessioned read"; exit 1; }

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
# the by-design data:null face — a logged-out caller gets 200 + data:null)
code -b "$COOKIE_JAR" -c "$COOKIE_JAR" -X POST "$BASE/api/auth/logout" >/dev/null
body -b "$COOKIE_JAR" "$BASE/api/auth/me" | grep -q '"data":null' \
  && ok 12 "logout + post-logout data:null" || { fail 12 "logout teardown"; exit 1; }

# 13 — the SEO family
[ "$(code "$BASE/sitemap.xml")" = 200 ] && [ "$(code "$BASE/robots.txt")" = 200 ] && [ "$(code "$BASE/manifest.json")" = 200 ] \
  && ok 13 "sitemap + robots + manifest 200" || { fail 13 "the SEO family"; exit 1; }

# --- 14. THE BOOT-GATE PROBE: a secretless production boot refuses -----------
kill_port_squatters 3211
sleep 1
DATABASE_URL="$SMOKE_DB_URL" AUTH_SECRET="" NODE_ENV=production PORT=3211 \
  node .next/standalone/server.js >"$GATE_LOG" 2>&1 &
GATE_PID=$!
served=1
for _ in $(seq 1 8); do
  if curl -sf "http://localhost:3211/api/health" >/dev/null 2>&1; then served=0; break; fi
  sleep 1
done
kill "$GATE_PID" 2>/dev/null || true
wait "$GATE_PID" 2>/dev/null || true
[ "$served" = 1 ] && grep -q "AUTH_SECRET" "$GATE_LOG" \
  && ok 14 "the secretless production boot refuses to serve (the log names AUTH_SECRET)" \
  || { fail 14 "the boot gate did not refuse"; cat "$GATE_LOG" >&2; exit 1; }

# --- 15. THE ARTIFACT-HYGIENE assertions -------------------------------------
hygiene_fail=""
for entry in .env .git db skills docs uploads worklog.md test-results dev.log; do
  [ -e ".next/standalone/$entry" ] && hygiene_fail="$hygiene_fail $entry"
done
[ -z "$hygiene_fail" ] \
  && ok 15 "the artifact carries no .env/.git/db/skills/docs/uploads/logs" \
  || { fail 15 "the artifact ships:$hygiene_fail"; exit 1; }

echo "SMOKE: 15/15 PASS"
