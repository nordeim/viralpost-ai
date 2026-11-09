# Session 9 — The Rate-Limiter Trust-Default Warning + The Phantom-Claim Retirement + The Docs-Counts Gate (2026-11-09)

## Context

Session 8 pushed `284525b` (the live OG-parity cure + the evidence-provenance
sweep); the owner added `80bcb2f` (`docs/session_8.md`, the session log). This
round re-runs the standing instruction against the merged tree: docs review →
codebase validation → fresh audit (repo skills: `web-application` §15/§16,
`security-and-hardening`, `tdd`) → live parity re-verification against the
reference (logged-in walk, the mobile menu at 390×844, the SEO surface) →
TDD remediation → gate → captures 25/26 → push. The neo-crm repo was reviewed
for tech-stack patterns (its AGENTS/CLAUDE/PAD/SKILL): the infra seams are
already inherited; the one pattern worth adopting this round is its
`tests/docs-counts.test.ts` — the unit-gated count lockstep (R9-10).

The workspace was reset before this round, so the round organically re-ran
the §15 pristine-clone verification (clone → install → `cp .env.example .env`
→ db:push → db:seed → census MATCH → lint/tsc/unit/build/smoke/e2e green at
the documented counts, after installing the Playwright browser the fresh
sandbox lacked).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F9-1 | **HIGH** (hardening) | `src/lib/rate-limit.ts:79-99`, `src/lib/boot-env.ts` | `VIRALPOST_PROXY_HOPS` unset (the default) = trust depth 1 — "exactly one appending proxy." On a DIRECT-exposure deployment (the README quickstart's own shape) the whole `x-forwarded-for` header is client-supplied, so a client rotating one fake XFF value per request gets a fresh limiter bucket every time — every per-IP wall (login 10/15min, signup, resend 5, verify 20, forgot/reset 10, contact 5/h, generate 20/15min) is bypassable. The seam's own comment documents the hazard; the boot gate warns on unparsable values but is SILENT on the unset-under-direct-exposure case — the one configuration where the default is wrong for the topology. Cure: a production boot warning when unset (the `NEXT_PUBLIC_SITE_URL` precedent — warn, never fatal), TDD. |
| F9-2 | MED (docs) | `README.md:178`, `AGENTS.md:57`, `CLAUDE.md:86`, `Project_Architecture_Document.md:155,303,464` | Four docs (six sites) claim tokens live in `@theme inline`; the code (`globals.css:27`) and its own pin (`tests/design-tokens.test.ts:35`) use `@theme` — the plain form. Not cosmetic: `@theme inline` does NOT emit `:root` custom properties, and `@layer base` consumes `var(--color-line)` etc. — an engineer "fixing" the CSS toward the docs would break the base layer. Cure: the six sites → `@theme`. |
| F9-3 | MED (phantom feature) | `src/app/api/generate/route.ts:12-14`, `src/lib/generator.ts:11-13`, `README.md:193`, `docs/implementation-plan.md:25,55,97,108` | The "optional OpenAI-compatible provider (set GENERATOR_PROVIDER + OPENAI_API_KEY)" is advertised as a live knob in present tense — but ZERO code reads either variable (grep-clean over src/tests/scripts/prisma), and `src/lib/generator-provider.ts` does not exist. An operator setting the env expects a behavior change that never happens; neither var is in `.env.example` or the boot-gate closed set. Cure: reword every site to the documented WIRE-IN POINT (future tense: the exact prompt is preserved by `generatorPrompt()`; wiring belongs in a future module) — the ADR-002 doctrine (the local engine is the shipped feature) stays intact. |
| F9-4 | MED (docs) | `docs/DEPLOYMENT.md` | The deployment guide still describes ORBITAL (the scaffold's app): "ORBITAL ships…" (line 3), `orbital.example.com` (:43), `file:/var/lib/orbital/custom.db` (:65), "the 29 API route files (41 verb handlers)" (:14 — actual: 11 route files / 11 handlers), an AUTH_SECRET row teaching the RETIRED pre-boot-gate semantics ("shorter values fall back to the insecure dev constant… instead of the run-time error" — since session-170 production FAILS HARD AT BOOT for missing/short secrets), and a stale health shape (`{"status":"ok",...}` — actual `{"ok":true,"data":{"status":"healthy","db":"up"}}`). Cure: rewrite for ViralPost AI at the current facts. |
| F9-5 | MED (phantom test layer + unused dep) | `Project_Architecture_Document.md:559`, `src/lib/rate-limit.ts:9-15`, `tests/rate-limit.test.ts:220`, `package.json:42` | The PAD claims "Property tests (fast-check) on the generator contract"; `rate-limit.ts` and `rate-limit.test.ts` cite `tests/property.test.ts P-n…P-q` — the file does not exist, and `fast-check` has zero imports anywhere (violating the SKILL's own "no dependency without a live import" doctrine). Cure: LAND the property suite (TDD value: the generator contract + the fixed-window limiter over generated spaces) — the PAD claim becomes true and the dependency earns its keep. |
| F9-6 | LOW (badge) | `README.md:8` | The `tests-455 checks` badge was session-8's math (407+48) updated in prose but the unit count moved to 409 (+2 the session-8 pins) — the real total is 457. The F8-8 genus, third occurrence (450→455→457): the count-lockstep is prose discipline and prose drifts. Cure: fix the badge AND retire the genus mechanically (F9-13/R9-10). |
| F9-7 | LOW (error handling) | `src/app/api/auth/forgot-password/route.ts:70,104`, `src/app/api/auth/reset-password/route.ts:54,95` | (a) The forgot-password READ path (`.catch(() => null)`) swallows a DB outage (P2024/P2028) into the no-enumeration 200 with `resetUrl: null` — inconsistent with the route's own update-path doctrine (transient aborts surface as 503). (b) The reset-password read path misclassifies an outage as `INVALID_TOKEN_MESSAGE` 400. (c) Both routes' final `else { throw error; }` escapes the envelope — a raw Next 500, not `{ok:false,error}` — contradicting reset-password's own "never a bare 500 past it" comment. Cure: classify P2024/P2028 on the reads as 503; the residual re-throw becomes `ERR.INTERNAL()`. |
| F9-8 | LOW (memory + comment) | `src/app/api/contact/route.ts`, `src/app/api/generate/route.ts`, `src/lib/rate-limit.ts:5-6,24-26` | The `contact:`/`generate:` key families never sweep (their routes don't call `sweepRateLimits()`), so under rotating keys with zero auth traffic the bucket map grows unbounded; the module comment claims "Every auth route calls sweepRateLimits() on every request (13+ call sites)" — actual sweep call sites: 6 — and line 5 cites the phantom "sessioned upload route at 20". Cure: add the sweep to both routes (the auth-route placement precedent: after the limiter call, denied requests sweep too); rewrite the comment to the actual six. |
| F9-9 | LOW (CRM relic) | `src/app/api/auth/signup/route.ts:87` | Non-first signups get `role: "rep"` — a CRM-era sales-rep value OUTSIDE the schema's documented vocabulary (`role String @default("user") // user | admin`, `prisma/schema.prisma:24`). The value is only ever echoed back by `/api/auth/me` (no authorization gate reads it), but a self-hosted operator inspecting rows finds an undocumented role. Cure: `"rep"` → `"user"` (the schema's own default). |
| F9-10 | LOW (dead code + dep) | `src/types/index.ts` (whole module), `src/lib/generator.ts:372` (`extractHashtags`), `src/lib/generation-counter.ts:100` (`resetLive`), `package.json:44` (`tw-animate-css`) | Zero-caller exports (grep-verified, tests included): the `src/types` module (components hand-roll their wire types), `extractHashtags` (the engine uses `hashtags.length`), `resetLive` (documented "escape hatch," no test uses it). `tw-animate-css` the devDep has zero imports — the live import is the vendored `src/app/vendor/tw-animate.css`. Cure: retire all four (the S7 `api.ts` retirement precedent — zero-caller exports go, with a note); `bun remove` for the dep (never hand-edit the manifest). |
| F9-11 | LOW (stale comments) | `next.config.ts:13-27`, `tsconfig.json:13-26`, `.gitignore:54-79`, `tests/db-census.test.ts:69-72`, `src/components/marketing/navbar.tsx:111-115` | Scaffold-era commentary naming phantom artifacts of the CRM tree: the F-170a "uploads.ts validated-anchor" + "photo-upload e2e pair" (no upload route exists); tsconfig's `scripts/sweep.ts` and "nine capital-route .jsx alias files" (neither exists); .gitignore's `/uploads/`, `scripts/sweep-shots/`, `walk50-62` inert entries; db-census.test.ts prose citing the CRM seed contract (15 contacts / 24 leads…) above pinned expectations that are correctly ours; the navbar's "animation-safe conditional classes" overstatement (the `hidden` swap makes the transition classes inert — SKILL §9 item 13 already documents this). Cure: re-attribute/trim each to this repo's reality. |
| F9-12 | LOW (doc drift) | `Project_Architecture_Document.md:312,509`, `README.md:83`, `viralpost-ai_SKILL.md:105,232` | PAD "login-card (3 views)" (actual: five — signin/reset/sent/signup/verify); README's public/ tree claims "screenshots" (actual: og-image + hero-portrait; screenshots live in docs/); SKILL "hook rules as errors" (actual config: `exhaustive-deps`/`purity` are OFF, only `rules-of-hooks` rides the preset); SKILL "testimonials, pricing, FAQ" (no FAQ section exists); PAD §6.1 "Secrets never in logs" vs the DOCUMENTED demo OTP console-logging posture (signup/resend log the live code server-side — the known-issue register already carries the mail-transport mitigation). Cure: fix each to the live truth. |
| F9-13 | **Adopted pattern** (neo-crm) | new `tests/docs-counts.test.ts` | The badge-drift genus has now recurred three times (F8-8 twice, F9-6 once) because the count-lockstep is prose discipline. neo-crm's `tests/docs-counts.test.ts` (session-102, S102-P1) puts every LIVE-TENSE count site under the unit gate: a stale count anywhere fails `bun run test`. Cure: adopt the pattern — constants-driven pins (unit count, e2e count, suite counts, the README badge arithmetic, the six-knob env-table rows) + stale-form negatives (450 and 455 never return). |

**Verified at parity this round (live, logged-in on the reference; no drift
since session 8):** the login funnel; the `/Home` landing (same nav + sections
+ generator card); the mobile menu at 390×844 (the same 5 destinations + brand;
the reference's panel computes `rgba(0,0,0,0)` on light pages — the dead
`bg-slate-900/98` class, our documented dark-panel superset intact); menu
navigation + auto-close; fresh-load `/Tool` title "Tool | ViralPost AI"; the
SPA stale-title-on-soft-nav behavior (our documented superset); `/Dashboard`
derived title + 404 h1; the OG/Twitter family (plain 170-char description).
Clone-side walk green on the dev server (burger relabels "Close menu",
`expanded=true` → Pricing click → auto-close + correct title; /Tool;
/Dashboard 404; robots/sitemap/manifest shapes). The standing-instruction
items verified already-satisfied: `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root (the seam + fixture tests hold); vitest + playwright
configs (29 files/409 unit; 8 specs/48 e2e green against the build); the SEO
surface (sitemap/robots/manifest + per-route OG + the 15-leg smoke SEO legs);
`.env.example` ↔ the six-knob contract, both directions.

## Remediation (TDD where a contract changes)

- **R9-1 (RED→GREEN, F9-1)**: `tests/boot-env.test.ts` gains the pins —
  production + unset `VIRALPOST_PROXY_HOPS` → a warning naming the
  direct-exposure hazard and the fix (set 0 for direct exposure, N for an
  N-proxy chain); dev + unset → NO warning; production + "0"/"1" → NO
  warning. Then `boot-env.ts` gains the warning (the `NEXT_PUBLIC_SITE_URL`
  precedent block).
- **R9-2 (RED→GREEN, F9-9)**: a signup source-pin — the route assigns
  `count === 0 ? "admin" : "user"`; comment-stripped `src/` carries no
  `"rep"`. Then fix `signup/route.ts:87`.
- **R9-3 (RED→GREEN, F9-7)**: `tests/api-robustness.test.ts` gains the pins —
  both reset-funnel routes classify the transient-abort family (P2024/P2028)
  on their DB READS as the 503 envelope (not the no-enumeration 200 / the
  invalid-token 400); neither route carries a bare `throw error` past its
  catch (comment-stripped). Then the route cures.
- **R9-4 (F9-5)**: land `tests/property.test.ts` — the generator contract
  over `fc` generated (idea, seed) spaces (determinism; 5-8 hashtags; < 200
  words; the hook-first shape; hashtags on the last line, `#[A-Za-z0-9_]+`,
  deduped; blank-line-separated paragraphs; `sanitizeIdea` bounds) + the
  fixed-window limiter properties (the crossing: exactly `limit` allowed per
  window then denied until reset; `retryAfterSec` within the window ceiling;
  `remaining` monotonic non-increasing; `computeWatermark` minimality).
- **R9-5 (F9-8)**: add `sweepRateLimits()` to the contact + generate routes
  (the auth-route placement); rewrite the `rate-limit.ts` header comment to
  the actual call-site census (drop the phantom upload-route line and the
  "13+" figure).
- **R9-6 (F9-10)**: retire `src/types/index.ts`, `extractHashtags`,
  `resetLive` (zero-caller, grep-verified; retirement notes in place — the
  S7 precedent); `bun remove tw-animate-css` (the vendored copy stays the
  import).
- **R9-7 (F9-2)**: the six `@theme inline` doc sites → `@theme`.
- **R9-8 (F9-3)**: reword the provider claims to the documented wire-in
  point (generate route, generator.ts, README deviations row,
  implementation-plan S-9 + the three rows).
- **R9-9 (F9-4)**: rewrite `docs/DEPLOYMENT.md` for ViralPost AI — the name,
  the 11-route census, the boot-gate AUTH_SECRET semantics, this app's
  example origins, the live health shape, and the F9-1 proxy-hops warning
  cross-referenced.
- **R9-10 (F9-6 + F9-13)**: fix the README badge to the post-R9-4 arithmetic;
  land `tests/docs-counts.test.ts` (the neo-crm adoption) — the
  constants-driven live-tense pins + the stale-form negatives (450/455) +
  the six-knob env-table rows.
- **R9-11 (F9-11 + F9-12)**: the stale-comment/doc sweep (next.config,
  tsconfig, .gitignore, db-census.test, navbar comment; PAD views count,
  README public tree, SKILL hook-rules + FAQ lines, PAD §6.1 nuance).
- **R9-12 (lockstep)**: SKILL v1.4.0 → v1.5.0 (Appendix A Session 9 row,
  frontmatter state); README status table + gate line; AGENTS plans map
  (nine) + counts; CLAUDE/PAD counts; worklog Task 9; this plan's execution
  record — all at the final post-R9-4 counts.
- **R9-13**: re-capture 25/26 on the remediated tree (dev server: landing
  1280×800 + the open mobile menu 390×844), PIL-verified.
- **R9-14**: the full gate on the exact commit tree → Conventional Commit on
  `main` → SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts (lint 0/0 · tsc 0 · unit (409+Δ)
   · build · smoke 15/15 · e2e 48/48 · census MATCH).
2. `rg '"rep"' src/` → nothing; `rg '@theme inline' README.md AGENTS.md
   CLAUDE.md Project_Architecture_Document.md` → nothing; `rg
   'GENERATOR_PROVIDER|OPENAI_API_KEY' src/` → only wire-in-point phrasing;
   `rg 'throw error' src/app/api/auth/*-password/route.ts` → nothing;
   `rg '455%20checks|450%20checks' README.md` → nothing; `rg '13\+ call
   sites' src/` → nothing.
3. The boot warning fires on a production-shaped env with unset hops
   (unit-pinned); no warning in dev.
4. Captures 25/26 regenerated on the remediated tree and PIL-verified.
5. The docs-counts suite holds every live-tense count site at the shipped
   numbers — a future stale count fails `bun run test`.

## Execution record

- **R9-1 (RED→GREEN, F9-1)**: 4 RED pins written and verified failing
  (unset/empty warn; declared 0/1/2 and dev silent) — then the
  `boot-env.ts` warning landed (the `NEXT_PUBLIC_SITE_URL` warn
  precedent; never fatal; dev exempt). The healthy-env test builder now
  declares `VIRALPOST_PROXY_HOPS: "1"` — declaring the topology IS the
  healthy posture the warning teaches. GREEN: 27/27 in the suite.
- **R9-2 (RED→GREEN, F9-9)**: both role pins verified RED, then
  `signup/route.ts` mints `"user"` for non-first signups (the schema's
  own default; the admin bootstrap stays). GREEN.
- **R9-3 (RED→GREEN, F9-7)**: both pins verified RED, then the cures —
  the forgot-password read classifies P2024/P2028 as the 503 envelope
  (other read failures stay null → the no-enumeration 200); the
  reset-password read likewise (never the invalid-token 400 for a
  server condition); both bare re-throws → `ERR.INTERNAL()`. GREEN.
- **R9-4 (F9-5)**: `tests/property.test.ts` landed — 15 properties (7
  generator-contract, 2 sanitize-boundary, 4 limiter, 2 static faces).
  One property self-inflicted bug caught in RED (the retryAfter-ceiling
  probe must stay strictly inside the window — a drift past the reset
  legitimately reopens the bucket) and fixed before GREEN. The PAD
  claim and the `rate-limit.ts`/`rate-limit.test.ts` citations now
  point at a real file; fast-check has its live import.
- **R9-5 (F9-8)**: `sweepRateLimits()` added to contact + generate
  (the auth-route placement, denied requests included); the
  `rate-limit.ts` header rewritten to the actual call-site census (the
  phantom upload-route line and the "13+" figure gone).
- **R9-6 (F9-10)**: `src/types/index.ts` retired (module deleted —
  zero importers); `resetLive` retired with a note; `tw-animate-css`
  removed via `bun remove` (the vendored copy stays the import);
  `install_packages.sh` synced. **`extractHashtags` was NOT retired —
  the type gate caught the audit's error** (`tests/generator.test.ts`
  imports it; the "zero callers" claim was wrong) — kept with a
  live-caller note. The build-as-type-gate doctrine proving itself
  mid-session.
- **R9-7 (F9-2)**: the six `@theme inline` sites → `@theme` (README ×2,
  AGENTS, CLAUDE, PAD ×3); grep-clean after.
- **R9-8 (F9-3)**: the provider claims reworded to the documented
  wire-in point at all four surfaces (generate route, generator.ts,
  README deviations row, implementation-plan S-9 + rows 33/55/97/108).
- **R9-9 (F9-4)**: `docs/DEPLOYMENT.md` rewritten for ViralPost AI —
  the name, the 11/11 route census, the boot-gate AUTH_SECRET
  semantics, `viralpost.example.com` origins, the live health shape,
  the §7 warning row + the F9-1 cross-reference.
- **R9-10 (F9-6 + F9-13)**: the README badge → 490 (= 442 unit + 48
  e2e); `tests/docs-counts.test.ts` landed (10 pins: the badge
  arithmetic + stale-form negatives 450/455/457, the suite counts
  across README/AGENTS/CLAUDE/PAD/SKILL, the six-knob env table, the
  plans census, the property-claim truth pin). Verified RED against
  the pre-update docs, GREEN after the lockstep.
- **R9-11 (F9-11 + F9-12)**: the stale-comment sweep — next.config's
  F-170a uploads commentary re-attributed (+ the phantom `uploads/**`
  exclude dropped), tsconfig's sweep.ts/.jsx notes rewritten to the
  doctrine form, .gitignore's inert uploads/sweep/walk5x block retired,
  db-census.test's CRM seed prose re-anchored, the navbar transition
  comment made honest, PAD login-card 3→5 views + the OTP-console
  nuance on the secrets row, README's public/ tree fixed, SKILL's
  hook-rules + FAQ claims corrected.
- **R9-12 (lockstep)**: SKILL v1.5.0 (Session 9 row, frontmatter,
  Appendix B advanced to 442/31), README status table + gate line,
  AGENTS nine-plan map + counts, CLAUDE/PAD counts, worklog Task 9,
  this execution record.
- **R9-13**: captures 25/26 regenerated on the remediated tree (the
  dev-server landing 1280×800 + the open mobile menu 390×844),
  PIL-verified (99.7% / 99.9%).
- **R9-14**: the full gate on the exact commit tree — lint 0/0 · tsc 0
  · unit 442/442 (31 files, +33) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH — then the Conventional Commit on `main`
  and the SSH-wrapper push (dry-run first).
