# Session 11 — The Standalone-Launch DB Re-Anchor + The Dead-CSS Retirement + The Verification-Funnel Closure (2026-11-10)

## Context

Session 10 pushed `b86c98c` (the dev-origin hydration lock + the palette
re-pin completion); the owner added `b1424f3` (the session-10 log). This
round re-ran the standing instruction against the merged tree: docs review →
pristine-clone verification (the full baseline gate green at the documented
counts — lint 0/0 · tsc 0 · unit 463/463 (32 files) · build · smoke 15/15 ·
e2e 49/49 (8 specs) · census MATCH) → a comprehensive audit (the
web-application skill's dimensions, dispatched wide + every load-bearing
finding hand-verified) → the neo-crm repo re-reviewed for patterns → the
live reference parity walk (logged-in: `/Home` redirect, the mobile menu at
390×844 — 5 destinations, no-aria hamburger, the dead-`/98` transparent
panel, auto-close on navigation, the stale-title soft-nav, the OG family —
NO drift since session 10).

**The round's headline discovery (live, reproduced, root-caused):** the
production standalone server launched the documented local way — `bun run
start` from the repo root with the default relative
`DATABASE_URL="file:../db/custom.db"` — **cannot open the database at all**
(`/api/health` answers `SERVICE_UNAVAILABLE / Error code 14`). Mechanism
(probe-verified): bun loads `<repo>/.env` at launch and ABSOLUTIZES the
relative `file:` value against the repo root → `file:<parent-of-repo>/db/
custom.db`; the standalone `server.js` then `chdir`s into
`.next/standalone`; and the session-34 launch-dir recovery in
`runtimeDatabaseUrl()` is NESTED inside `if (envUrl && isRelativeFileUrl
(envFileUrl))` — a guard that requires a `.env` at the POST-CHDIR cwd
(`.next/standalone/.env`) — a file the build script's hygiene step has
DELETED since session 7 (`rm -f .next/standalone/.env`). The recovery is
therefore dead code in the exact launch shape it was written for, and the
bun-rewritten parent-of-repo URL passes through as an "intentional
override" (absolute URLs are honored by design). On a machine where the
parent-of-repo `db/` directory exists, the failure is WORSE: the server
silently opens an EMPTY WRONG database (logins fail with "invalid
credentials" instead of a boot error). This is neo-crm's session-212 defect
class (orphaned there for 42 sessions; their fix is the cure pattern). The
smoke ladder and e2e never see it because both pin their own explicit
DATABASE_URL; only the documented `bun run start` flow (README quickstart
continuation, DEPLOYMENT's "try the build" path) trips it.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F11-18 | **HIGH** (correctness/DX) | `src/lib/db-path.ts:192-221` (the nested launch-dir recovery); trigger `package.json` `"start"` + the build script's `rm -f .next/standalone/.env` | **The standalone-launch DB lock** (live-reproduced above). The session-34 recovery only runs when `.next/standalone/.env` exists; the session-7 hygiene step deleted it; `bun run start` with the relative default .env therefore resolves the DB OUTSIDE the repo (Error code 14 on a clean machine, a silent empty wrong DB on a machine with a parent `db/`). Cure (the neo-crm s212 hoist): try the launch-dir signature whenever `envUrl` is set — not only when the post-chdir cwd carries a relative `.env` — preserving the session-35 absolute-value guard. TDD + a live A/B (the standalone boot with the relative .env answers `ok:true` and touches `<repo>/db/custom.db`). |
| F11-1 | MED (Tailwind v4) | `src/components/layout/login-card.tsx:537` (`border border-input`); `src/app/globals.css` (no `--color-input`); `tests/design-tokens.test.ts:101` (the census regex) | **`border-input` is a phantom token** — Tailwind v4 generates NO utility for it (0 occurrences in the built CSS; the rendered border rides the base-layer `* { border-color: var(--color-line) }`). The render is accidentally correct (#e2e8f0 both ways) but the class is inert markup, and the "mechanical" color census has a blind spot: it enumerates only STEPPED utilities (`family-step`), so single-word semantic utilities (`border-input`, `ring-ring`, …) escape the "every color utility resolves to a @theme literal" invariant. Cure: define `--color-input: #e2e8f0` (the reference's DOM vocabulary for the OTP inputs, made live at the value it always rendered) + a STEP-LESS CENSUS ARM in design-tokens.test.ts. |
| F11-2 | MED (dead CSS + phantom claim) | `src/app/globals.css:2` (`@import "./vendor/tw-animate.css"`); `src/components/ui/toast.tsx:115-116`; AGENTS/CLAUDE/SKILL | **The vendored tw-animate.css ships dead CSS on a phantom justification.** No Radix package exists (session-2 diet); the only consuming class family retired at session-131 (D-131a1); the built CSS still carries the vendor's `@keyframes enter/exit/accordion-down` + a block of `@property` declarations with ZERO consumers. The toast comment claims "the Radix dialog family rides it" — a phantom of exactly the sessions-4/7/9 genus. Cure: retire the import + the vendor file + the phantom claims (code comment + AGENTS/CLAUDE/SKILL lockstep). |
| F11-3 | MED (funnel dead-end) | `src/components/layout/login-card.tsx` (`onSigninSubmit`); `src/lib/login-reset.ts` | **A pending-verification user who leaves the verify view has no re-entry.** Signing in answers 403 `VERIFICATION_REQUIRED` which renders ONLY the error banner (no view swap); the signup route answers 400 "A user with this email already exists" for the re-signup attempt; `resend` is wired only inside the verify view. The only escape is waiting out the 15-minute TTL — which F11-4 lets bypass verification entirely. Cure: on `VERIFICATION_REQUIRED`, swap the card to the verify view (email known, digits reset, info banner with the refusal message, the Resend affordance one click away). |
| F11-4 | LOW (security posture) | `src/app/api/auth/login/route.ts:55`; `src/lib/verification.ts:77-81` | **Email verification is advisory, not enforceable**: once `verificationExpiresAt` passes (15 min), an account that never verified signs in freely (`isVerificationPending` is the only gate; a non-null `verificationCodeHash` is never checked). Cure: refuse login while `verificationCodeHash` is non-null REGARDLESS of expiry (a new pure seam `unverifiedAccount()`), and make `resend` re-mint for any unverified account (drop the `isVerificationPending` requirement from its no-op gate) — the resend becomes the re-arm path, closing the loop with F11-3. The seeded demo (null hash) is unaffected. |
| F11-5 | LOW (dead tokens + mis-attributed pins) | `src/app/globals.css` (tokens :33-84, :163-201; utilities :246-257); `tests/design-tokens.test.ts:154-157`; `tests/typography.test.ts:124` | **Dead `@theme` tokens, keyframes and `@utility` rules ship in every build; two pins mis-attribute them.** Zero class consumers for: `--color-primary-foreground`, `--color-brand`, `--color-brand-strong`, `--color-surface`, `--color-line-strong`, `--color-ink`, `--color-muted-ink`, `--color-warning(-soft)`, `--color-info(-soft)`, `--color-success-soft`, `--color-danger-soft`, `--radius-card`, `--radius-button`, `--animate-fade-in`, `--animate-reveal` (+ their keyframes), `@utility input-base`, `@utility scrollbar-thin`. The `reveal` keyframes' comment says "applied by the Reveal component" (Reveal uses inline-style transitions); design-tokens pins their presence as "the hero's motion vocabulary" (the hero uses only `animate-float`); typography.test.ts cites "the input-base utility's 0.875rem" (input-base sets no font-size). Cure: retire the dead set (the S7/F9-10 dead-exports doctrine), fix the pins, and add a MECHANICAL DEAD-TOKEN CENSUS (every semantic `--color-*` token must have a consumer in src/ or a var() reference — the F11-5 genus becomes tested). |
| F11-6 | LOW (phantom provenance) | `tests/auth-contract.test.ts:48` + header :22-23 | The dead `uploadRoute` helper reads `src/app/api/upload/route.ts` (does not exist) and is never invoked; the header's S67-P3 bullet promises an upload-route rate-limit pin that doesn't exist. Cure: delete both. |
| F11-7 | LOW (UX at the boundary) | `src/app/api/generate/route.ts:23,54`; `src/lib/generator.ts:29` | Two ceilings, two messages: 501–1000 raw chars → the correct "Keep the idea a little shorter (500 characters max)." (via `sanitizeIdea`); **>1000 chars fails the Zod schema** → "Describe your post idea first." — misleading for a user who did describe their idea (the textarea has no maxLength; paste reaches it). Cure: map the schema's max-failure to the same shorter-message (an exported constant on the generator seam). |
| F11-8 | LOW (doc drift) | `Project_Architecture_Document.md` §12 | The Key Files line counts drifted: api.ts ~120 vs 223, db-path.ts ~150 vs 227, password.ts ~110 vs 67, globals.css ~210 vs 257, auth.ts ~200 vs 184, navbar ~150 vs 164, smoke-test.sh ~200 vs 175, generation-counter ~109 vs 102, route-title ~60 vs 56, site.ts ~120 vs 138. Cure: re-anchor to the live exact counts + a docs-counts inventory arm (the neo-crm inventory-census pattern: every PAD §12 row pinned to the live `wc -l`). |
| F11-9 | LOW (doc drift) | `viralpost-ai_SKILL.md:209` vs `src/lib/generator.ts:357` | SKILL §6 says "5-8 hashtags (2-3 derived from the idea's own keywords)"; the code caps idea-derived tags at 2 (`kws.slice(0, 2)`). Cure: "up to 2 derived". |
| F11-10 | LOW (doc drift) | `Project_Architecture_Document.md` §10.3 vs `eslint.config.mjs` | The PAD claims "hook rules as errors … both gates, never weakened" without the SKILL §3 qualifier (`exhaustive-deps`/`purity` deliberately off). Cure: align the PAD line with the SKILL's honest form. |
| F11-11 | LOW (a11y polish, the standing surface) | `src/components/marketing/navbar.tsx:108-136, :63-70` | The mobile menu (functionally correct, e2e-pinned) lacks: `aria-controls` + a panel `id`, and Escape does not return focus to the toggle (focus falls to body when the panel hides). Cure: `id="mobile-menu"` + `aria-controls` + `menuButtonRef.current?.focus()` on Escape — the next increment of the same documented superset. |
| F11-12 | LOW (consistency) | `src/components/layout/login-card.tsx` — `onSigninSubmit`/`onSignupSubmit`/`onVerifySubmit` | In-flight double-submit guards are inconsistent: `onSendResetLink` has `if (pending) return;`, `onResend` has `resending`; the other three have none (a same-tick double-click fires two POSTs — for signup the loser answers "A user with this email already exists" right after a successful creation). Cure: the same early-return guard on all four. |
| F11-13 | LOW (race shape) | `src/app/api/auth/signup/route.ts:60-92` | The `findUnique→create` gap: two concurrent same-email signups → the loser's P2002 throws into the generic catch → **500** instead of the pinned 400 duplicate. Cure: catch `Prisma.PrismaClientKnownRequestError` P2002 → the 400 duplicate message (the reset-password route's pattern). |
| F11-14 | INFO (deferred) | `src/app/(site)/page.tsx:34-55` vs `sections.tsx` | The landing inlines the PricingSection wrapper markup instead of consuming the export; the contact header copy is duplicated. `landing-page.test.ts` pins the composition. DEFERRED: a parity-surface refactor with drift already caught by the pin; recorded as deferred debt. |
| F11-15 | INFO (UX, small) | `src/components/layout/login-card.tsx:296-306` | Pasting the full 6-digit code fills only one box (the last digit). Cure: distribute multi-digit input across the boxes from the focused index. |
| F11-16 | INFO (scaffold residue) | `components.json` (repo root) | The shadcn CLI config serves a workflow that no file uses (the toast is hand-rolled; no Radix, no generated ui/ kit). Cure: retire alongside F11-2 (+ its next.config.ts exclude entry). |
| F11-17 | INFO (a11y) | `src/components/ui/toast.tsx:104` | All toasts render `role="status"` (polite); error toasts should announce assertively. Cure: `role={item.variant === "error" ? "alert" : "status"}`. |

**Verified clean this round (no action):** the session-10 changes (no
regressions — the navbar adjust-during-render close, the hashtag 5-7
window, the siteUrl fallback, the boot-env shape warning, the Link swaps
all re-verified); the auth core (sign/verify/cookie/tokenVersion); the
rate limiter; db-path's other anchors; the reset funnel; the body
pre-gate; the SEO surfaces; `.env.example` ↔ the six-knob contract (both
directions); dependency health (nine runtime deps, all live); the
vitest/playwright configs vs the actual files; the smoke ladder; the
prisma schema/seed/census; error boundaries; headers; no dead routes, no
`any`, no `console.log`, no TODO in src/. **Documented decisions
re-affirmed (not re-litigated):** F10-12 (ERR vocabulary), F10-14
(particle rAF, deferred), F10-15 (toast store shape), F10-16 (footer
year), F10-7 (VERIFICATION_LOCKED Retry-After), F10-6 (first-signup-admin).

**neo-crm adoption decisions (the re-review):** ADOPT this round — the
s212 db-path cure (F11-18), the gate-script pin (the gate chain order +
the CI=1 fresh-boot contract), the doctrine-census mini (every AGENTS
command exists in package.json, read LIVE), the PAD §12 inventory census
(F11-8), the mutation-battery discipline (planted-defect proofs for the
new pins, documented), and the `bun audit` periodic duty (run + recorded).
DEFER (documented): the screenshot drift-sweep family, the
dead-code-hygiene suite, the count-ladder scripts — heavier than this
round's scope; noted for a future session.

## Remediation (TDD where a contract changes)

- **R11-1 (RED→GREEN, F11-18) — THE HEADLINE**: `tests/db-path.test.ts`
  gains the hygiene-shape standalone fixture (NO `.next/standalone/.env` —
  the build deletes it) + the RED pin: `runtimeDatabaseUrl(standalone)`
  with bun's launch-absolutized env URL must re-anchor to
  `file:<repo>/db/custom.db` (currently returns the parent-of-repo path).
  GREEN: hoist the launch-dir signature check out of the
  `isRelativeFileUrl(envFileUrl)` guard (the neo-crm s212 cure; the
  session-35 absolute-launch-value guard preserved). LIVE A/B: `bun run
  start`-shaped boot with the relative .env → `/api/health` answers
  `ok:true` and `<repo>/db/custom.db` is touched. Mutation battery: revert
  the hoist → the pin REDs → restore.
- **R11-2 (RED→GREEN, F11-1)**: design-tokens gains THE STEP-LESS CENSUS
  PIN (every single-word color utility used in src/ must resolve to a
  `--color-<word>` @theme literal; `border-input` is the RED). GREEN:
  `--color-input: #e2e8f0` in @theme with the WHY comment.
- **R11-3 (RED→GREEN, F11-2 + F11-5 + F11-16)**: the dead-CSS retirement.
  RED pins: the retired-form negatives (no `--animate-fade-in`, no
  `@keyframes reveal`, no `@utility input-base`, no tw-animate import) +
  THE DEAD-TOKEN CENSUS (every semantic `--color-*` token has a consumer)
  + the float-only motion pin (the mis-attributed "float + reveal" pin
  corrected). GREEN: globals.css loses the vendor import, the dead token
  set, the dead keyframes, the dead utilities; the header comment's Radix
  claim retires; `src/app/vendor/tw-animate.css` deleted; toast.tsx's
  phantom comment re-written; `components.json` + its next.config.ts
  exclude entry retired; typography.test.ts:124 re-attributed.
- **R11-4 (RED→GREEN, F11-3 + F11-4 — the funnel closure)**: NEW
  `tests/verification.test.ts` pins the `unverifiedAccount()` seam
  (null→false; non-null→true regardless of expiry; pending-window shape);
  login-views gains the route/source pins (the login route gates on the
  seam; the resend route re-mints for unverified accounts; the login card
  swaps to the verify view on `VERIFICATION_REQUIRED`; all four submit
  handlers carry in-flight guards — F11-12 rides here); auth.spec gains
  THE FULL-FUNNEL e2e (signup → reload → login refusal → the verify-view
  swap → resend → the in-app code hint → verify → the session) — the
  e2e RED for the view swap. GREEN: `unverifiedAccount()` in
  verification.ts; the login route's gate widened to hash-non-null; the
  resend route's no-op gate narrowed to `!unverifiedAccount(...)`; the
  login card's `VERIFICATION_REQUIRED` branch (digits reset, info banner,
  view swap); the double-submit guards.
- **R11-5 (RED→GREEN, F11-7)**: api-robustness gains the generate-route
  pin (the schema-failure branch distinguishes over-length from empty).
  GREEN: the branch maps over-length to the exported
  `IDEA_TOO_LONG_MESSAGE` (generator.ts).
- **R11-6 (RED→GREEN, F11-11 + F11-15 + F11-17)**: a11y-controls gains
  the navbar pins (aria-controls + the panel id + the Escape focus
  return); toast-anatomy gains the error-variant role pin. GREEN: the
  navbar id/aria-controls/menuButtonRef; the OTP paste distribution
  (F11-15); the toast `role={variant === "error" ? "alert" : "status"}`.
- **R11-7 (F11-6 + F11-9 + F11-10)**: the sweep — auth-contract's dead
  uploadRoute helper + S67-P3 bullet deleted; SKILL §6 "2-3"→"up to 2";
  PAD §10.3's lint line qualified.
- **R11-8 (F11-8 + the neo-crm adoptions)**: PAD §12 re-anchored to live
  exact counts; NEW `tests/gate-script.test.ts` (the gate chain order,
  the build hygiene tail, the CI=1 e2e form, the start-script shape);
  docs-counts extended (the AGENTS Commands table ↔ package.json scripts
  census — the missing rows added to AGENTS; the PAD §12 inventory
  census); `bun audit` run + recorded; the mutation-battery convention
  documented in AGENTS.
- **R11-9 (lockstep)**: the full docs lockstep at the FINAL counts (unit
  463+Δ / e2e 49+1 → the badge re-anchored; README status table +
  architecture table; AGENTS counts + the plans map (eleven rounds) + the
  tw-animate line; CLAUDE counts + the tw-animate line; PAD counts + §5
  tokens + §12; SKILL v1.6.0 → v1.7.0 — frontmatter, §4 (the tw-animate
  retirement + the dead-token census), §6 (the funnel + the hashtag
  wording), §11, Appendix A session-11 row, Appendix B); worklog Task 11;
  this plan's execution record.
- **R11-10**: captures 29/30 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1` — the
  allowedDevOrigins cure re-proven), PIL-verified.
- **R11-11**: the full gate on the exact commit tree (lint 0/0 · tsc 0 ·
  unit (463+Δ) · build · smoke 15/15 · e2e (49+1) · census MATCH) → the
  Conventional Commit on `main` → the SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. LIVE: the `bun run start`-shaped standalone boot with the relative
   default .env answers `/api/health` `ok:true` and touches
   `<repo>/db/custom.db` (never the parent-of-repo path).
3. The step-less census green; `--color-input` defined; the built CSS
   contains `.border-input`.
4. The built CSS carries no `enter`/`exit`/`accordion-down` keyframes and
   no `--animate-fade-in`/`--animate-reveal`; the dead-token census green;
   `src/app/vendor/` and `components.json` gone.
5. The full-funnel e2e green (signup → login refusal → verify view →
   resend → verify → session).
6. Login refuses `verificationCodeHash`-non-null accounts (unit-pinned);
   resend re-mints for them (source-pinned).
7. The over-length idea answers the shorter-message (source-pinned).
8. The navbar carries `aria-controls` + the panel `id` + the Escape focus
   return (source-pinned); the e2e mobile-navigation family still green.
9. The PAD §12 rows match the live line counts (pinned); the gate-script
   + doctrine-census pins green.
10. Captures 29/30 regenerated, PIL-verified.
11. Docs lockstep at the final counts; SKILL v1.7.0.

## Execution record

- **Baseline (pristine-clone verification)**: the full gate green at the
  documented session-10 counts on the pulled tree (b1424f3) — lint 0/0 ·
  tsc 0 · unit 463/463 (32 files) · build · smoke 15/15 · e2e 49/49
  (8 specs) · census MATCH.
- **The audit**: dispatched wide (the web-application skill's dimensions)
  + every load-bearing finding hand-verified before planning: the
  border-input phantom confirmed against the BUILT css (0 occurrences);
  the dead-token set confirmed by exhaustive utility-class greps (with
  two audit-list corrections — `--color-primary-hover`, `--color-success`,
  `--color-danger`, `--color-info`-via-text-primary ARE live; `line-soft`
  is consumed by the toast close button); the funnel dead-end traced
  end-to-end through login/signup/resend; F11-18 (the db-path launch
  lock — found via the neo-crm re-review, MISSED by the code audit)
  live-reproduced: the `bun run start`-shaped standalone boot answered
  `SERVICE_UNAVAILABLE / Error code 14` with the repo db untouched, and
  the mechanism probe-verified (bun exports the absolutized parent-of-repo
  URL; `runtimeDatabaseUrl` under the post-chdir cwd passes it through —
  the nested session-34 recovery requires the `.next/standalone/.env`
  the session-7 hygiene step deletes).
- **R11-1 (RED→GREEN, F11-18) — THE HEADLINE**: the hygiene-shape fixture
  + 2 RED pins in tests/db-path.test.ts (the re-anchor + the
  absolute-override guard), then the hoist (the neo-crm session-212 cure:
  the launch-dir signature check now runs whenever an env URL is present,
  the session-35 absolute-value guard preserved). **Mutation battery**:
  cure reverted → exactly the new pin RED → restored → GREEN. **LIVE
  A/B**: the standalone boot with the relative `.env` now answers
  `{"ok":true,"data":{"status":"healthy","db":"up"}}` and holds
  `<repo>/db/custom.db` open (fd-verified via /proc); the parent-of-repo
  db was never created.
- **R11-2 (RED→GREEN, F11-1)**: the step-less census pin — one iteration
  of noise-tuning (the `(?![\w-])` boundary lookahead so family-STEP
  utilities stay invisible to this arm; `xl`/`color`/`radius`/`mode` +
  the comment-prose fragments into the exclusion vocabulary) — until the
  RED was exactly `input`. GREEN: `--color-input: #e2e8f0` (the value the
  class always rendered via the base-layer fallback).
- **R11-3 (RED→GREEN, F11-2 + F11-5 + F11-16)**: 5 RED pins (the dead
  motion/keyframes negatives, the @utility-block retirement, the
  vendor-import + file absence, THE DEAD-TOKEN CENSUS, plus the
  corrected float-only motion pin), then the retirement: 13 dead
  `@theme` tokens, the fade-in/reveal keyframes + tokens, the
  input-base/scrollbar-thin utilities, the radius pair, the
  `@import "./vendor/tw-animate.css"` + the vendor directory,
  `components.json` + its next.config.ts exclude entry, the toast.tsx
  phantom comment re-written, the globals.css header's Radix claim
  retired, typography.test.ts's input-base citation re-attributed. Two
  needle-in-own-doc iterations (the retirement comments contained the
  retired literals — the s64/s65/s66 lesson): the pins now read
  comment-stripped CSS.
- **R11-4 (RED→GREEN, F11-3 + F11-4 + F11-12 + F11-15)**: the new
  tests/verification.test.ts (4 pins on `unverifiedAccount()`), 4
  login-views source pins (the login gate, the resend re-mint, the
  card's verify-view swap, the four-handler double-submit guard), and
  THE FULL-FUNNEL e2e (signup → reload → the refused login → the verify
  view → resend → the paste-distributed code → the session +
  /api/auth/me). GREEN: `unverifiedAccount()` in verification.ts; the
  login route's gate widened to the stored hash; the resend no-op gate
  narrowed; the login-card VERIFICATION_REQUIRED branch; `if (pending)
  return;` on all four submits; the OTP paste distribution.
- **R11-5 (RED→GREEN, F11-7)**: the api-robustness pin + the exported
  `ideaTooLongMessage()` seam + the route branch (over-length → the
  shorter message; empty keeps describe-first).
- **R11-6 (RED→GREEN, F11-11 + F11-17)**: the a11y-controls pins + the
  navbar cure (`id="mobile-menu"` + `aria-controls` + `menuButtonRef`
  with the Escape focus return); the toast-anatomy role pin + the
  variant-conditional role. The e2e axe battery + all 7
  mobile-navigation pins pass on the cured tree.
- **R11-7 (F11-6 + F11-9 + F11-10 + F11-13)**: the auth-contract
  uploadRoute helper + S67-P3 bullet deleted; the SKILL §6 hashtag
  wording ("up to 2"); the PAD §10.3 lint line qualified; the signup
  P2002 catch → the 400 duplicate (the reset-password route's Prisma
  pattern, pinned).
- **R11-8 (F11-8 + the neo-crm adoptions)**: the PAD §12 table re-anchored
  to the live exact counts; tests/gate-script.test.ts (5 pins — the gate
  chain order, the CI=1 fresh boot, the build hygiene tail, the start
  shape, the smoke script; **mutation battery**: order swap → RED →
  restore → GREEN); the docs-counts doctrine census (every AGENTS
  Commands-table command exists in package.json, read live — the
  start/test:watch/db:generate rows added to AGENTS) + the PAD §12
  inventory census (every row pinned to the live line count; one
  newline-semantics iteration — api.ts counts 224 by the split
  arithmetic); the mutation-battery convention + the `bun audit` duty
  documented in AGENTS. **bun audit run**: 10 advisories (4 high, 5
  moderate, 1 low) — ALL in the dev/test/build toolchain (eslint's
  minimatch, the prisma CLI's deepmerge-ts, vitest's vite family, the
  eslint-plugin-react-hooks NESTED zod <4.6.6 — the direct runtime zod
  is the patched 4.6.7, and the bounded reader pre-gates every Zod
  input; postcss's source-map-js); ZERO on the runtime request path; no
  override warranted (the neo-crm rule: overrides only for runtime
  transitive advisories).
- **R11-9 (lockstep)**: unit 488/34 files (+25: +2 db-path, +5
  design-tokens, +4 verification, +4 login-views funnel, +1
  api-robustness, +1 a11y-controls, +1 auth-contract P2002, +5
  gate-script, +2 docs-counts censuses), e2e 50/8 specs (+1 the funnel),
  badge 538 = 488+50; README (badge, architecture table, testing
  section, file tree, the session-11 status row, the gate line); AGENTS
  (counts, the Commands-table rows, the tw-animate trap line, the
  mutation-battery + bun-audit conventions, the eleven-round plans map);
  CLAUDE (counts, the tw-animate line); PAD (the §12 re-anchor + note,
  the test-distribution table, the counts line, the lint qualifier); the
  SKILL v1.6.0 → v1.7.0 (frontmatter, §3 the DATABASE_URL launch note,
  §4 the token block + the tw-animate retirement, §6 the verification
  seam + the hashtag wording, §11, Appendix A session-11 row, Appendix
  B); worklog Task 11; this execution record.
- **R11-10**: captures 29/30 on the remediated tree — the dev-server
  landing 1280×800 + the OPEN mobile menu 390×844, both via
  `http://127.0.0.1:3000` with the hydration explicitly awaited (the
  React-owned `aria-controls` button present; `aria-expanded=true` after
  the click — the F10-17 cure re-proven). PIL-verified: 100.0% / 99.9%
  non-white; the menu-open strip 31/31 dark (the slate-900 family over
  the hero); 393 amber pill pixels.
- **R11-11**: the full gate on the exact commit tree — lint 0/0 · tsc
  0 · unit 488/488 (34 files, +25) · build · smoke 15/15 · e2e 50/50
  (8 specs, +1) · census MATCH — then the Conventional Commit on
  `main` and the SSH-wrapper push (dry-run first).
