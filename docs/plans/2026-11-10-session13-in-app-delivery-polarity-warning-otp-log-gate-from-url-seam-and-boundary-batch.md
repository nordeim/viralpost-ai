# Session 13 — The In-App-Delivery Polarity Warning + The OTP Log Gate + The from_url Seam (2026-11-10)

## Context

Session 12 pushed `2fd947c` (the count-reality census + the reset-funnel e2e +
the UX-boundary batch); the owner added `5f22be0` (the session-12 log). This
round re-ran the standing instruction against the merged tree: docs review →
pristine-clone verification (the full baseline gate green at the documented
counts — lint 0/0 · tsc 0 · unit 507/507 (36 files) · build · smoke 15/15 ·
e2e 52/52 (9 specs) · census MATCH) → the comprehensive audit (the
web-application skill's dimensions, dispatched wide; every load-bearing
finding hand-verified) → the neo-crm repo re-review (HEAD `b3d0fbe`,
session-217-era — UNCHANGED since session 12's re-review; its adoptions stand,
nothing new to adopt) → the live reference parity walk (logged-in: `/Home`
redirect, the mobile menu at 390×844 — 5 destinations, auto-close on
navigation, the no-aria hamburger, the `/Tool` hard-nav title + OG family —
NO drift since session 12) → the clone's dev-server walk (hydration clean,
the mobile menu open/close, Escape WITH the focus return, navigate +
auto-close + the title; the from_url round-trip AND the foreign-origin
fallback live-verified).

**The audit's verdict:** 0 Critical / 1 High / 1 Medium / 3 Low / 6
Informational. The session-12 cures all re-verified clean (the otp seam, the
reality census arithmetic recounted by hand, the reset-funnel selectors, the
effects hygiene, the stepped-semantic census). The findings:

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S13-1 | **HIGH** (deployment polarity) | `src/lib/boot-env.ts` (+ the three delivery routes) | **The in-app delivery family defaults ON with NO production warning.** `VIRALPOST_DISABLE_IN_APP_OTP`/`_RESET` ship `""` (enabled) in `.env.example`; a default-configured production deploy returns a LIVE reset token for any known email (`forgot-password` → `resetUrl`) and a fresh OTP for any unverified account (`resend` → the code; `verify` then signs in). The boot gate warns for strictly less dangerous knobs (`VIRALPOST_PROXY_HOPS` unset) but not these. Cure: the per-knob production warning (unset or `""`), mirroring the hops shape — warn, never fatal (the demo posture is a legitimate deployment; the skill's "a bad toggle must never take a working deployment down"). The off-vocabulary values stay owned by the existing off-vocab arm (one-owner doctrine). |
| S13-2 | **MED** (secret hygiene) | `src/app/api/auth/signup/route.ts:95`; `resend/route.ts:63` | **The verification code is logged to server stdout in EVERY environment** — with `VIRALPOST_DISABLE_IN_APP_OTP=1` (a real mail transport owns delivery) every user's OTP still lands in the logs (the skill §16 "secrets never in logs"). The comment even documents the gap ("the console log stays either way"). Cure: gate the `console.info` on the SAME `inAppOtpEnabled` condition the response rides (the demo posture keeps its log; the mail-transport posture stops leaking). |
| S13-3 | LOW (motion cadence) | `src/components/effects/particle-text.tsx:178-189` | **The reduced-motion branch draws BEFORE advancing** — each timer fire paints the phrase that is about to retire: the first phrase holds ~2× its window and every swap lands one frame late. Cure: advance `textIndex` + reset `phaseStart` BEFORE `drawPlain()` (each phrase exactly one window). |
| S13-4 | LOW (coverage) | `src/components/layout/login-card.tsx:36-44` | **The from_url resolver is module-private with ZERO behavioral coverage** — `resolveFromUrl` (the open-redirect guard) is exercised only by source regex pins; a regression in its logic passes the whole gate. It also uses `window.location.origin` inline (ununit-testable). Cure: extract to the pure seam `src/lib/from-url.ts` (`resolveFromUrl(raw, origin)`), TDD the shapes (same-origin path/search, foreign origin, protocol-relative, malformed, empty), rewire the card, re-anchor the login-views pins to the WIRING (the seam owns the guard face), + 2 e2e legs (the round-trip and the foreign fallback — both live-verified this round). |
| S13-5 | LOW (envelope discipline) | `src/app/api/auth/verify/route.ts:75-78,88-95` | **A vanished-row race between findUnique and the updates answers 500, not the 400 envelope** — the P2025 mapping the forgot-password route implements (its own :117) is missing here. Unreachable today (no user-delete surface) but the known-error mapping doctrine says map it. Cure: the catch checks `P2025` → `fail("VERIFICATION_INVALID", …, 400)`. |
| S13-6 | INFO | `login/signup` pages vs `reset-password` | Suspense posture inconsistency around `useSearchParams()` — all three pages are force-dynamic (both shapes work; the login-views pin documents why). Cosmetic only. **No action** (minimal-diff doctrine; documented here). |
| S13-7 | INFO (perf nit) | `particle-text.tsx:121-129,163-166` | `getComputedStyle(document.body).fontFamily` re-read inside both font-fit while-loops (up to ~42 redundant computed-style reads per rasterize, per undebounced resize). Cure: hoist one read per draw call before each loop. |
| S13-8 | INFO | `logout/route.ts` | Logout-CSRF nuisance (a cross-site form POST clears the victim's cookie; SameSite gates sending, not clearing). Standard apps accept it. **No action** (documented). |
| S13-9 | INFO | `playwright.config.ts:66-73` | Documented e2e flakiness under local server reuse (the in-memory limiter). The gate's `CI=1` prefix avoids it. **No action.** |
| S13-10 | INFO (census gap) | `tests/docs-counts.test.ts` | The reality census counts `it(`/`test(` blocks — a future `it.each(`/`test.skip(`/`.only(` form registers a different number of RUN tests than the census counts (the badge-drift genus one notch deeper; the e2e side guards loops, the unit side guards nothing). Cure: the forms-guard arm — no uncountable registration form in any unit suite or e2e spec (comment-stripped; zero live instances to verify first). |
| S13-11 | INFO | `prisma/seed.ts` + README | The demo credential mirrors the reference app's own login (the parity doctrine; documented in the README). **No action.** |

**Verified clean this round:** the session-12 changes (the otp seam traced
against every input shape, the reality census arithmetic recounted against
disk, the reset-funnel selectors vs the actual markup, the effects cleanup,
the stepped-semantic census); the auth core (HMAC/timingSafeEqual, cookie
lifecycle, tokenVersion); the rate limiter (per-route budgets, hop-trust,
sweep); the body handling; the reset consume (atomic, hashed-at-rest);
the SEO surfaces (live-verified both sides this round); the navbar mobile
menu (live walk); the docs-count lockstep (all sites); dependency health
(every dep traced to real usage); `next.config.ts` hardening.

**neo-crm re-review:** HEAD `b3d0fbe` — unchanged since session 12's review;
the session-12 adoption/deferral decisions stand as recorded there.

## Remediation (TDD where a contract changes)

- **R13-1 (RED→GREEN, S13-1)**: `tests/boot-env.test.ts` — the `env()`
  builder gains both knobs at `"1"` (the healthy-production declares-delivery
  posture, the session-9 hops precedent) + a new describe: production + unset
  OTP knob → the warning (names the knob + the response-rides hazard + the
  `=1` fix); production + empty reset knob → the same; both `"1"` → no
  warning; development + unset → NO warning (the demo posture IS the dev
  default); an off-vocabulary value → no SECOND warning (the off-vocab arm
  owns that face). Then `src/lib/boot-env.ts` gains the arm (per-knob,
  `undefined`/`""`, production-only).
- **R13-2 (RED→GREEN, S13-2)**: source pins (the routes' existing pin
  family) — the `console.info` sits inside the `inAppOtpEnabled` guard in
  BOTH routes; then the cures: hoist the `inAppOtpEnabled` computation above
  the log and wrap it; retire the "the console log stays either way"
  comment-sentence (both routes).
- **R13-3 (RED→GREEN, S13-3)**: the effects-motion pin — in the reduced
  branch the index-advance precedes `drawPlain()`; then the reorder cure.
- **R13-4 (RED→GREEN, S13-4)**: `tests/from-url.test.ts` first (RED against
  the missing module): same-origin relative path; path + search; same-origin
  ABSOLUTE URL (the reference's own auth-wall form); foreign origin → `/`;
  protocol-relative `//evil` → `/`; malformed → `/`; empty → `/`; bare
  origin → `/`. Then `src/lib/from-url.ts` (the pure seam, `origin` a
  parameter); the login-card rewire (import + `window.location.origin`);
  the login-views pins re-anchored in the same commit (the card-level
  origin-comparison pin → the wiring pin: the card passes
  `window.location.origin` into the seam; the seam's guard face is owned by
  the new unit suite — the one-owner doctrine). Plus 2 e2e legs in
  `auth.spec.ts` (the `/Tool` round-trip; the foreign fallback).
- **R13-5 (RED→GREEN, S13-5)**: the verify-route source pin — the catch maps
  `P2025` to the 400 envelope; then the cure (`Prisma` import + the catch
  branch).
- **R13-6 (S13-7)**: the particle-text font-family hoist (both loops read a
  per-call constant) + the effects-motion pin (no computed-style read inside
  either fit loop, comment-stripped).
- **R13-7 (S13-10)**: the census forms-guard arm in `docs-counts.test.ts` —
  no `.each(`/`.skip(`/`.only(`/`.todo(`/`.concurrent(` registration form in
  any unit suite or e2e spec (comment-stripped; zero live instances verified
  before the pin lands).
- **R13-8 (docs)**: `.env.example` — the two knobs' guidance names the
  production boot warning; README env table + PAD boot-gate prose + CLAUDE
  env table gain the same one-liner.
- **R13-9 (lockstep)**: the count constants re-anchored AFTER all test
  changes land (UNIT 507+Δ / SUITES 36+1 / E2E 52+2); the badge; README
  (status row, testing section, file tree); AGENTS (counts, the plans map's
  thirteenth round); CLAUDE; PAD (§12 re-anchor incl. the new from-url row
  + the changed line counts); SKILL v1.8.0 → v1.9.0; worklog Task 13; this
  plan's execution record.
- **R13-10**: captures 33/34 on the remediated tree (dev server: the landing
  1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`, hydration
  awaited), PIL-verified.
- **R13-11**: the full gate on the exact commit tree → `bun audit` (the
  periodic duty) → the Conventional Commit on `main` → the SSH-wrapper push
  (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The boot warning fires per-knob in production (unset/empty) and NOT in
   dev or at `"1"`; the e2e webServer (which pins `""` in production mode)
   prints it in its server log — correct visibility, no failure.
3. The OTP log line prints ONLY when in-app delivery is enabled (both
   routes).
4. The reduced-motion phrase cadence: each phrase exactly one window
   (advance-then-draw, source-pinned).
5. The from_url seam: 8 behavioral pins green; the card wiring pinned; the
   e2e round-trip lands on `/Tool` and the foreign fallback lands on `/`.
6. The verify route maps P2025 to the 400 envelope (source-pinned).
7. The census forms-guard green (zero live instances; the planted-defect
   proof documented).
8. Docs lockstep at the final counts; SKILL v1.9.0; captures 33/34
   PIL-verified.

## Execution record

- **Baseline (pristine-clone verification)**: the full gate green at the
  documented session-12 counts on the pulled tree (5f22be0) — lint 0/0 ·
  tsc 0 · unit 507/507 (36 files) · build · smoke 15/15 · e2e 52/52
  (9 specs) · census MATCH.
- **The audit**: dispatched wide — 0 Critical / 1 High / 1 Medium / 3 Low /
  6 Informational; S13-1..S13-5 hand-verified in source before this plan
  (the forgot-password response path read end-to-end; the console.info
  sites; the reduced-branch order traced; the module-private resolver; the
  verify catch read).
- **The parity walk**: the reference live (login → `/Home`; the mobile menu
  at 390×844 — 5 destinations, auto-close, the no-aria hamburger; `/Tool`
  hard-nav title "Tool | ViralPost AI" + og:title + canonical + the 170-char
  description — NO drift) and the clone's dev server (hydration clean, the
  menu open/close, Escape WITH the focus return — `focusIsToggle: true`,
  navigate + auto-close + the title; `from_url=/Tool` → signs in → `/Tool`;
  `from_url=https://evil.example/x` → signs in → `/`; sitemap/robots/
  manifest/404-noindex all verified).
- (Execution entries appended as each R-item lands.)

## Post-execution record (appended at ship)

- **R13-1 (S13-1)**: the boot-env pins first (6 new tests; the env()
  builder now carries both knobs at "1" — the healthy-production
  declares-delivery posture), then the boot-env.ts warning arm. **Mutation
  battery**: killing the arm (`if (false)`) REDs exactly the 3 warning
  pins → restored → GREEN.
- **R13-2 (S13-2)**: the auth-contract pins (the console.info inside the
  inAppOtpEnabled guard in BOTH routes), then the cures (the computation
  hoisted above the log; the "stays either way" comment-sentence
  retired). **Mutation battery**: un-gating the resend log REDs exactly
  its pin → restored → GREEN. ONE iteration: the pins were first born
  inside a for-of over the two routes — ONE source block, TWO runner
  tests; the census (526) diverged from the runner (527) at ship time
  and the diff was caught — unrolled to explicit its (+1 census block)
  and the forms-guard gained the loop arm (below).
- **R13-3 (S13-3)**: the effects-motion order pin (the advance precedes
  drawPlain inside the reduced branch), then the reorder. **Mutation
  battery**: the revert REDs the pin → restored → GREEN.
- **R13-4 (S13-4)**: tests/from-url.test.ts written RED against the
  missing module (8 behavioral pins), then the seam, then the card
  rewire + the login-views re-anchors (the card-level origin-comparison
  pin → the wiring pin; the F12-4 pin re-anchored to the verify
  submit's own site — the both-sites face owned by the session-147 pin).
  TWO iterations: (a) the design-tokens step-less census flagged the
  from-url MODULE PATH as a from-<word> "utility" — "url" joined the
  documented NON_COLOR English-fragment set; (b) the e2e legs added to
  auth.spec (the /Tool round-trip + the foreign fallback). **Mutation
  battery**: killing the origin check REDs exactly the 3 guard pins →
  restored → GREEN.
- **R13-5 (S13-5)**: the auth-contract P2025 pin, then the verify-route
  catch branch (+ the Prisma import). **Mutation battery**: removing the
  branch REDs the pin → restored → GREEN.
- **R13-6 (S13-7)**: the font-family hoist in both fit loops + the
  effects-motion pin (no computed-style read inside either loop; exactly
  2 hoisted reads). **Mutation battery**: reverting one hoist REDs the
  pin → restored → GREEN.
- **R13-7 (S13-10)**: the census forms-guard arm (no
  .each(/.skip(/.only(/.todo(/.concurrent(/.fails( in any unit suite
  or e2e spec, comment-stripped; zero live instances verified before
  the pin landed) + THE LOOP ARM (born from this round's own R13-2
  defect: an it( registration inside a for-loop body — one source
  block, N runner tests — now banned by an indent-based scan; the
  census-vs-runner diff at ship time was the live catch). **Mutation
  batteries**: a planted `it.skip(` REDs the forms arm; a planted
  for-of registration REDs the loop arm (both + SUITES/UNIT — the
  scratch file itself) → removed → GREEN.
- **R13-8 (docs)**: .env.example (the production-warning guidance on
  both knobs), README env table (both rows name the boot warning),
  CLAUDE env row, PAD (the delivery-polarity security row + the
  secrets-in-logs prose re-anchor).
- **R13-9 (lockstep)**: unit 528/37 files (+21: +6 boot-env, +3
  auth-contract, +2 effects-motion, +8 from-url, +2 docs-counts), e2e
  54/9 specs (+2), badge 582 = 528+54; README (badge, architecture
  table, testing section, file tree, the session-13 status row, the
  gate line); AGENTS (counts, the plans map's thirteenth round); CLAUDE;
  PAD (§12 re-anchor incl. the new from-url row + particle-text 311);
  the SKILL v1.8.0 → v1.9.0 (frontmatter, §11, Appendix A session-13
  row, Appendix B re-certification); worklog Task 13; this record.
- **R13-10**: captures 33/34 on the remediated tree (the dev-server
  landing 1280×800 + the OPEN mobile menu 390×844, via 127.0.0.1,
  hydration awaited), PIL-verified.
- **R13-11**: the full gate on the exact commit tree → `bun audit` (the
  periodic duty) → the Conventional Commit on `main` → the SSH-wrapper
  push (dry-run first).
- **Deferred (documented in the findings table)**: S13-6 (the Suspense
  posture inconsistency — force-dynamic makes both shapes equivalent),
  S13-8 (the logout-CSRF nuisance — the standard accepted posture),
  S13-9 (the documented e2e local-reuse flakiness), S13-11 (the demo
  credential mirrors the reference's own login — the parity doctrine).
