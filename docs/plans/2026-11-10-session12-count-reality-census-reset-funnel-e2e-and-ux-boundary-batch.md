# Session 12 — The Count-Reality Census + The Reset-Funnel E2E + The UX-Boundary Batch (2026-11-10)

## Context

Session 11 pushed `250266d` (the standalone-launch DB re-anchor + the
dead-CSS retirement + the verification-funnel closure); the owner added
`0de6e1a` (the session-11 log). This round re-ran the standing instruction
against the merged tree: docs review → pristine-clone verification (the
full baseline gate green at the documented counts — lint 0/0 · tsc 0 ·
unit 488/488 (34 files) · build · smoke 15/15 · e2e 50/50 (8 specs) ·
census MATCH, after `cp .env.example .env`, `db:push`, `db:seed`, and the
Playwright chromium install) → the comprehensive audit (the
web-application skill's dimensions, dispatched wide; every load-bearing
finding hand-verified) → the neo-crm repo re-review (HEAD `b3d0fbe`,
session-217-era) → the live reference parity walk (logged-in: `/Home`
redirect, the mobile menu at 390×844 — 5 destinations, auto-close on
navigation, no-aria hamburger, the `/Tool` hard-nav title + OG family —
NO drift since session 11) → the clone's dev-server mobile-menu walk
(open/close, Escape WITH the focus return, navigate + auto-close, the
title superset — all live-verified).

**The audit's verdict:** 0 Critical / 0 High / 2 Medium / 8 Low /
7 Informational. The session-11 cures all re-verified clean (db-path's
six shapes, the funnel closure, the P2002 mapping, the navbar a11y). The
findings are coverage gaps and boundary UX the eleven sessions left:

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F12-1 | **MED** (process) | `tests/docs-counts.test.ts:36-47` | **The count constants are pinned to doc *sites*, never to test *reality*.** The suite asserts README/AGENTS/CLAUDE/PAD/SKILL carry `UNIT=488`/`E2E=50` — but nothing mechanically compares the constants to the live suites. Adding a test without bumping `UNIT` leaves every doc stale while the gate stays green — the badge-drift genus this very suite claims to have retired (3 prior recurrences). Cure: REALITY-CENSUS arms that count `it(`/`test(` in `tests/*.test.ts` and spec files ON DISK and assert `=== UNIT`/`SUITES`/`E2E_SPECS`; the e2e test count rides the a11y matrix made importable (`tests/e2e/a11y-matrix.ts` — the loop expansion computed from the same constants the spec consumes). Mutation battery: a scratch test file REDs the census. |
| F12-2 | **MED** (coverage) | `tests/e2e/*` (zero matches for reset-password) | **The password-reset funnel has zero behavioral coverage.** No e2e navigates `/reset-password?token=…`; no test references `ResetPasswordScreen`; the reset API is covered only by source-pins; the smoke ladder has no reset leg. The verification funnel got its full e2e at session 11 — its sibling did not. Cure: `tests/e2e/reset-funnel.spec.ts` — signup → verify → forgot (the in-app `resetUrl`) → open the link → set a new password → sign in with it (`/api/auth/me`) → the single-use replay → 400. |
| F12-3 | LOW (UX) | `src/components/layout/login-card.tsx` (the 403 branch) | **A stale `verifyCodeHint` survives the 403 re-entry.** The F11-3 branch resets digits/error/info/view — but not the hint: a hint minted for a PREVIOUS signup/resend (different email, or an already-consumed code) renders as "Demo code: …" for the newly-entered email. Cure: `setVerifyCodeHint("")` in the branch (the route deliberately returns no code there). |
| F12-4 | LOW (UX) | `src/components/layout/login-card.tsx:231` | **Verify success drops the `from_url` return target** — `onVerifySubmit` pushes `/` while `onSigninSubmit` honors `resolveFromUrl(fromUrl ?? "/")`. A guest sent to `/login?from_url=/Tool` who completes signup→verification lands on `/`. Cure: the same resolver call (same-module, open-redirect-safe). |
| F12-5 | LOW (doc drift) | `Project_Architecture_Document.md:156,304` (+ ADR-004's "409+ unit checks") | **The PAD still references the retired `tw-animate.css`** (ADR-005's Decision + the file tree) and ADR-004's stale "409+" count prose — session-11 retired the vendor file and updated CLAUDE/AGENTS/SKILL but the PAD's ADR/tree kept the dead reference. Cure: edit both; pin with the semantic-prose census (N12-1) so the genus can't return. |
| F12-6 | LOW (UX boundary) | `src/components/layout/login-card.tsx` (`onCodeDigit`) | **Pasting into a box that already holds a digit fills shifted and drops the last digit** — `raw = <existing><pasted>` (7 digits) distributes the pre-existing digit at the focus index and shifts everything right. Cure: take the TRAILING `VERIFICATION_CODE_LENGTH` digits (strictly better or equal in every traced case) — extracted to a pure seam `distributeOtpDigits()` (TDD) with the card wiring thin. |
| F12-7 | LOW (census gap) | `tests/design-tokens.test.ts` (both censuses) | **Stepped utilities on semantic families escape both censuses** — a `text-success-500`-shaped class is skipped by the stepped census (semantic family in the exclusion list) and invisible to the step-less census (the numeric step defeats its pattern) — the F11-1 genus one notch deeper (zero live instances today). Cure: the stepped census FAILS on any semantic-family-with-step class (no such literal exists in `@theme` by construction). |
| F12-8 | LOW (a11y/perf) | `src/components/effects/particle-text.tsx:173-181` | **The reduced-motion branch keeps a 60 fps rAF loop redrawing static text** — `prefers-reduced-motion` users get an all-day redraw loop for a canvas that changes once per ~3 s. Cure: draw once, schedule the phrase change with `setTimeout` (cleared on dispose), no rAF in the reduced shape. |
| F12-9 | LOW (cosmetic) | `src/components/effects/iridescence.tsx:170-177` | **`devicePixelRatio` captured once at boot** — a cross-monitor move renders at the stale DPR until remount (particle-text re-reads it inside `layout()` — the correct pattern, inconsistently applied). Cure: read `dpr` inside `resize()`. |
| F12-10 | LOW (copy) | `src/app/api/auth/verify/route.ts:52-56` | **An expired code answers "Too many failed attempts…"** — the no-pending-code branch (expired TTL, zero attempts made) reuses `verificationLockoutMessage()`, misleading a user who never failed once. Cure: `verificationInvalidMessage()` ("This verification code is no longer valid. Please request a new one.") — still non-leaking (covers unknown email, no code, expired); the 429 VERIFICATION_LOCKED keeps the lockout copy. |
| F12-11 | INFO (hygiene) | `src/components/marketing/hero.tsx:9` | Unused `import * as React` (no `React.*` reference; harmless under `react-jsx`) — the one unused import in src/. Cure: remove. |
| F12-12 | INFO (dead exports) | `src/lib/verification-server.ts:3`; `src/lib/api.ts` (ERR.FORBIDDEN / ERR.NOT_FOUND) | The `generateVerifyCode` re-export ("for any stragglers" — zero importers) and the two zero-call-site ERR entries — the retire-dead-exports doctrine's next round. Cure: retire both. |
| F12-13 | INFO (perf) | `src/components/marketing/logo.tsx:13` | The Logo is a raw `<a href="/Home">` — a full document navigation + a 308 hop for an internal link (F10-8 converted every other internal CTA to `next/link`; this one was missed). Cure: `Link` (the `/Home` path preserved — the reference's own DOM vocabulary). |
| F12-14 | INFO (test quality) | `tests/verification.test.ts:33-45` | Two "stored hash means owed" tests carry IDENTICAL assertions (the seam takes no timestamp — the second constructs no expired state). Cure: merge into one honestly-named test. |

**Verified clean this round:** the session-11 changes (db-path's six
shapes, the funnel closure, the P2002 cure, the navbar a11y increments,
the dead-CSS retirement); the auth core (scrypt/HMAC/tokenVersion/cookie
lifecycle); the rate limiter (per-route budgets, hop-trust, sweep); the
body handling (bounded reader + Zod at every boundary); the reset/forgot
API mechanics (hashed-at-rest, atomic consume, no-enumeration); the SEO
surfaces (sitemap 4 routes + `/Home` excluded, robots, manifest,
per-route OG — live-verified both sides); the navbar mobile menu (live
walk: open/close/Escape+focus-return/navigate); the generator (hashtag
window by construction); the generation counter; the route-title
derivation; the effects cleanup; the envelope discipline; doc-count
lockstep (all 17 PAD §12 rows match live); dependency health (9 runtime
deps, all live). **Deferred (documented):** A-14 (the resend double-mint
race — inherent, retry heals), A-11 (the lint-disable posture — tsc
strict is the gate), the neo-crm drift-sweep/dead-code-hygiene suites
and count-ladder scripts (heavier than this round), `probe:ref` (needs
live-reference network at gate time — the gate stays offline-runnable).

**neo-crm adoption decisions (the s217-era re-review):** ADOPT this
round — the reality-census arms (F12-1, the R2 live-constant principle
taken to its conclusion: constants vs DISK, not constants vs docs), the
semantic-prose census STARTER (N12-1: negative pins on retired doc forms
— the s208–s217 family scoped to this repo's drift-prone sites), and the
one-owner doctrine line (N12-2, the mutation-battery refinement).
DEFER (documented): the count-ladder scripts (the reality census
centralizes the constants), `probe:ref` + the pixel sweep gates
(offline-gate doctrine), the checkout-portability contract (verified
already satisfied — no unit pin reads a runtime-generated artifact;
db-path's fixtures write their own temp trees).

## Remediation (TDD where a contract changes)

- **R12-1 (RED→GREEN, F12-1)**: `tests/e2e/a11y-matrix.ts` (SURFACES +
  WIDTHS + LOGIN_WIDTHS extracted — pure data, no playwright import);
  a11y.spec.ts consumes it (behavior unchanged); docs-counts gains THE
  REALITY CENSUS (unit `it(`/`test(` counted on disk === UNIT; suite
  files === SUITES; spec files === E2E_SPECS; e2e tests = source count
  − loop-shape tests + the matrix expansion === E2E; plus the
  only-a11y-has-loops guard). Mutation battery: a scratch `tests/zz.test.ts`
  → SUITES RED → removed → GREEN.
- **R12-2 (F12-2)**: `tests/e2e/reset-funnel.spec.ts` (opted out of
  storageState, the auth.spec pattern) — signup → verify (the in-app
  hint) → forgot → the sent view's "Open your password reset link" →
  the set-new-password form → sign in with the NEW password →
  `/api/auth/me` → the same-token replay → 400. Rate-limit budget: 2
  signups / 2 verifies / 1 forgot / 2 resets / 2 logins per run — every
  bucket ≤ 20% of its limit.
- **R12-3 (RED→GREEN, F12-3 + F12-4)**: login-views source pins (the
  403 branch clears the hint; the verify submit resolves from_url), then
  the two one-line cures.
- **R12-4 (RED→GREEN, F12-6)**: the pure seam
  `src/lib/otp.ts` (`otpDigitsAfterPaste(raw)` — trailing-6 semantics,
  non-digit stripping) + unit pins RED first, then the `onCodeDigit`
  wiring.
- **R12-5 (RED→GREEN, F12-10)**: `verificationInvalidMessage()` in
  verification.ts (+ pins), the verify route's 400 branch swap (+ the
  route source pin).
- **R12-6 (RED→GREEN, F12-7)**: the design-tokens stepped-semantic arm
  (RED by planting a `text-success-500` in a scratch read → GREEN with
  the assertion live; verified zero live instances).
- **R12-7 (F12-8 + F12-9)**: the particle-text reduced-motion
  setTimeout cure + the iridescence dpr re-read (source-pinned: no rAF
  in the reduced branch's source shape; dpr read inside resize).
- **R12-8 (F12-11 + F12-12 + F12-13 + F12-14)**: the sweep — hero's
  React import, the verification-server re-export, ERR.FORBIDDEN/
  NOT_FOUND, the Logo → Link, the verification.test.ts dedup, the PAD
  "409+" prose.
- **R12-9 (F12-5 + N12-1)**: the PAD tw-animate/tree edits + the
  semantic-prose census starter in docs-counts (the PAD carries no
  `tw-animate`/`vendor/` reference; no "409+" form; the README
  quickstart keeps its `cp .env.example .env` line — the fresh-clone
  leg; the AGENTS one-owner line exists).
- **R12-10 (N12-2)**: the AGENTS mutation-battery convention gains the
  one-owner doctrine ("each live face is owned by exactly one pin;
  co-pinned faces are documented in the pin's comment").
- **R12-11 (lockstep)**: the full docs lockstep at the FINAL counts
  (unit 488+Δ / e2e 50+Δ → the badge; README status table + the
  session-12 row; AGENTS counts + the twelve-round plans map; CLAUDE;
  PAD; SKILL v1.7.0 → v1.8.0 — frontmatter, §11, Appendix A/B);
  worklog Task 12; this plan's execution record.
- **R12-12**: captures 31/32 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`,
  hydration awaited), PIL-verified.
- **R12-13**: the full gate on the exact commit tree → `bun audit`
  (the periodic duty) → the Conventional Commit on `main` → the
  SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The reality census green: constants === disk counts (unit, suites,
   spec files, e2e tests incl. the matrix expansion); the scratch-file
   mutation battery documented.
3. The reset-funnel e2e green: signup → verify → forgot → link → new
   password → login → me; the replay answers 400.
4. The 403 re-entry renders NO stale hint; the verify submit honors
   `from_url` (both source-pinned).
5. The OTP paste takes the trailing six digits (unit-pinned at the
   seam).
6. The expired-code 400 answers the no-longer-valid message; the 429
   lockout copy unchanged (pins on both).
7. The stepped-semantic census arm green (zero live instances, the
   planted-defect proof documented).
8. The reduced-motion branch schedules by timeout (no rAF in its
   shape); `dpr` re-read inside resize (both source-pinned).
9. The PAD carries no tw-animate/vendor reference and no "409+" prose
   (census-pinned); the Logo is a Link; the dead exports retired.
10. Captures 31/32 regenerated, PIL-verified; docs lockstep; SKILL
    v1.8.0.

## Execution record

- **Baseline (pristine-clone verification)**: the full gate green at
  the documented session-11 counts on the pulled tree (0de6e1a) —
  lint 0/0 · tsc 0 · unit 488/488 (34 files) · build · smoke 15/15 ·
  e2e 50/50 (8 specs) · census MATCH (after `cp .env.example .env`,
  `db:push`/`db:seed`, and the Playwright chromium install — the
  fresh-sandbox gap, not a code defect).
- **The audit**: dispatched wide (the web-application skill's
  dimensions) — 0 Critical / 0 High / 2 Medium / 8 Low / 7 Informational;
  every load-bearing finding hand-verified before this plan (A-1's
  constants vs an independent `rg -c` count; A-2's zero e2e matches;
  A-3/A-4/A-10 read in source; A-5's branch; the OTP shift traced).
- **The neo-crm re-review**: HEAD `b3d0fbe` (session-217-era) — the
  post-adoption arc is the doc-prose-census family; adopted the scoped
  forms above, deferred the rest with reasons.
- **The parity walk**: the reference live (login → `/Home`; the mobile
  menu at 390×844 — 5 destinations, auto-close, the no-aria hamburger;
  `/Tool` hard-nav title "Tool | ViralPost AI" + og:title + canonical +
  the 170-char description — NO drift) and the clone's dev server (the
  menu open/close, Escape WITH the focus return — `expanded:false`,
  focus on "Open menu", panel hidden — navigate + auto-close + the
  title superset).
- (Execution entries appended as each R-item lands.)

## Post-execution record (appended at ship)

- **R12-1 (F12-1)**: `tests/e2e/a11y-matrix.ts` created (SURFACES +
  WIDTHS, pure data); a11y.spec.ts consumes it (behavior unchanged —
  12 tests from 3 source blocks, verified by the e2e run); the
  reality-census arms landed (unit/suites/spec-files counted on disk;
  the e2e total = source blocks − the a11y 3 + the matrix expansion;
  the width-loop-stays-a11y-only guard). **Mutation battery**: a
  scratch `tests/zz-scratch.test.ts` REDs the census (37 ≠ 36 files /
  508 ≠ 507) → removed → GREEN. Constants re-anchored to the final
  counts (507/36, 52/9) AFTER all session test changes landed.
- **R12-2 (F12-2)**: `tests/e2e/reset-funnel.spec.ts` — the full walk
  green: signup → the in-app code hint → verify → forgot → the sent
  view's link → the set-new-password form → the done state → sign-in
  with the NEW password → `/api/auth/me` → the same-token replay →
  400; the invalid-link state pinned. ONE iteration: the in-app link
  is RELATIVE — the replay's `new URL(resetUrl)` threw Invalid URL;
  the parse now carries a dummy base (only the query param matters).
- **R12-3 (F12-3 + F12-4)**: the RED pins first (both failed against
  the uncured card), then the one-line cures. The s145-era pin
  re-anchored in the same commit (its literal `router.push("/")`
  count went 1 → 0 — the F12-4 retirement of the bare form).
  **Mutation battery**: reverting both cures REDs exactly 3 pins (the
  s145 re-anchor + the 2 new) → restored → GREEN.
- **R12-4 (F12-6)**: the `src/lib/otp.ts` seam + 7 unit pins (written
  RED against the missing module), then the `onCodeDigit` wiring.
  **Mutation battery**: the naive no-window form REDs exactly the 2
  trailing-window pins → restored → GREEN.
- **R12-5 (F12-10)**: `verificationInvalidMessage()` + the verify
  route's 400 swap (the 429 lockout copy pinned unchanged).
  **Mutation battery**: the message revert REDs the route pin →
  restored → GREEN.
- **R12-6 (F12-7)**: the stepped-semantic census arm — one assertion
  fix (an empty `Set` is not `[]` in Vitest's deep-equal; spread
  first). **Mutation battery**: a planted `text-success-500` in a
  scratch export REDs it → removed → GREEN. Zero live instances.
- **R12-7 (F12-8 + F12-9)**: the particle-text reduced-motion timeout
  cure (draw once → sleep → swap; the handle cleared on dispose) +
  the iridescence dpr re-read. TWO pin iterations (the
  needle-in-own-doc lesson bit three times this round: the cure
  comments name the retired APIs — the pins now read comment-stripped
  source; plus the 6-space brace boundary for the nested branch, and
  one botched edit that dropped the branch's `return;` — caught by
  re-reading and repaired before the type gate). **Mutation
  battery**: reverting both cures REDs their pins → restored → GREEN.
- **R12-8 (F12-11 + F12-12 + F12-13 + F12-14)**: the sweep — hero's
  React import, the verification-server re-export,
  ERR.FORBIDDEN/NOT_FOUND (all zero-caller-verified before removal),
  the Logo → `next/link` (one malformed-prop-typo caught and fixed in
  the same edit session), the verification.test.ts dedup (−1 test,
  the intent note folded into the survivor), the PAD "409+" prose.
- **R12-9 (F12-5 + N12-1)**: the PAD tw-animate/tree edits (one
  needle-in-own-doc iteration: the ADR-005 retirement note itself
  contained the banned literal — reworded to "the vendored
  animate-utilities file") + the semantic-prose census starter (3
  arms: the PAD negatives, the README fresh-clone cp ordering, the
  AGENTS one-owner line — one case-sensitivity iteration:
  `EXACTLY ONE pin`).
- **R12-10 (N12-2)**: the AGENTS one-owner doctrine line landed.
- **R12-11 (lockstep)**: unit 507/36 files (+19: +7 otp, +3
  effects-motion, +2 login-views, +2 verification −1 dedup, +1
  design-tokens, +5 docs-counts censuses), e2e 52/9 specs (+2), badge
  559 = 507+52; README (badge, architecture table, testing section,
  file tree, the session-12 status row, the gate line); AGENTS
  (counts, the plans map's twelfth round, the one-owner doctrine);
  CLAUDE (counts); PAD (the §12 re-anchor: api.ts 222,
  iridescence 221, particle-text 301 — the test-distribution table,
  the counts line, the reality-census note in §8.3); the SKILL
  v1.7.0 → v1.8.0 (frontmatter, §11, Appendix A session-12 row,
  Appendix B re-certification); worklog Task 12; this record.
- **R12-12**: captures 31/32 on the remediated tree — the dev-server
  landing 1280×800 + the OPEN mobile menu 390×844, both via
  `http://127.0.0.1:3000` with the hydration explicitly awaited (the
  React-owned `aria-controls` button present; `aria-expanded=true`
  after the click). PIL-verified: 100.0% / 99.9% non-white; the
  menu-open strip 99.1% dark (the slate-900 family over the hero);
  3105 amber + 7370 teal content pixels.
- **R12-13**: the full gate on the exact commit tree — lint 0/0 · tsc
  0 · unit 507/507 (36 files, +19) · build · smoke 15/15 · e2e 52/52
  (9 specs, +2) · census MATCH; `bun audit` re-run (10 advisories —
  the same set as session 11's triage, all dev/test/build toolchain,
  the direct runtime zod patched at 4.6.7; no override warranted);
  the Conventional Commit on `main` and the SSH-wrapper push
  (dry-run first).
- **The one-off defects this round's own execution introduced and
  caught**: the Logo prop-typo, the dropped `return;`, the Set/[]
  assertion form, the three needle-in-own-doc pins, the AGENTS case
  mismatch, the relative-URL replay parse — every one caught by a
  gate leg (tsc / unit / e2e) or by re-reading before the ship, none
  reached the commit.
