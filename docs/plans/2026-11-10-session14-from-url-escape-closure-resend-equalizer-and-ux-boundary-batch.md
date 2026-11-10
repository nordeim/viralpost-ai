# Session 14 — The from_url Escape Closure + The Resend Equalizer + The UX-Boundary Batch (2026-11-10)

## Context

Session 13 pushed `d98d24e` (the in-app-delivery polarity warning + the OTP
log gate + the from_url seam); the owner added `acec9aa` (the session-13
log). This round re-ran the standing instruction against the merged tree:
docs review → pristine-clone verification → the comprehensive audit → the
neo-crm repo re-review → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (pristine-clone verification):** fresh clone + `bun install` +
`cp .env.example .env` + `db:generate`/`db:push`/`db:seed` (census MATCH) →
the full gate GREEN at the documented session-13 counts — lint 0/0 · tsc 0 ·
unit 528/528 (37 files) · build · smoke 15/15 · e2e 54/54 (9 specs). ONE
fresh-sandbox gap (environment, not code): the Playwright browser binaries
were not preinstalled — `bunx playwright install chromium` (headless-shell
v1248) cured it; documented here for the next fresh-sandbox round.

**The audit** (dispatched wide; every load-bearing finding hand-verified in
source): 0 Critical / 1 High / 3 Medium / 4 Low / 3 Informational. The
session-13 cures re-verified clean (the boot warning arm, the OTP log gate
in both routes, the verify P2025 mapping, the font hoist, the seam's test
wiring).

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review; the recorded adoption/deferral decisions stand.

**The parity walk (live, both sides):** the reference (login → `/Home`;
the mobile menu at 390×844 — 5 destinations, auto-close on navigation, the
no-aria hamburger; `/Tool` hard-nav title "Tool | ViralPost AI" + og:title
+ og:description + canonical — NO drift since session 13) and the clone's
dev server (hydration clean; the menu open/close, Escape WITH the focus
return; navigate + auto-close + the title; `from_url=/Tool` → signs in →
`/Tool`; the foreign-origin fallback → `/`; sitemap/robots/manifest and the
404 noindex + derived title all verified).

**The walk's own catch:** the audit's M-1 was LIVE-CONFIRMED on the clone —
`/login?from_url=http://127.0.0.1:3000//evil.com?x=1` signs in and the
browser lands on `https://evil.com/?x=1`. The session-13 seam's origin
check passes (the URL IS same-origin) but the returned PATH
`//evil.com?x=1` is protocol-relative at the router — a real open redirect,
promoted to this round's HIGH.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S14-1 | **HIGH** (open redirect, live-verified) | `src/lib/from-url.ts:18-26` | **A same-origin URL with a `//`-prefixed path escapes the open-redirect guard.** `resolveFromUrl("http://host//evil.com?x=1", "http://host")` passes the origin check (the URL IS same-origin) and returns `//evil.com?x=1` — a protocol-relative string that `router.push` navigates CROSS-ORIGIN. Live-verified on the clone's dev server: sign-in at `/login?from_url=http://127.0.0.1:3000//evil.com?x=1` landed the browser on `https://evil.com/?x=1`. The existing pins cover the RAW `//evil` input (rejected — different shape) but not the same-origin-absolute-with-`//`-path form. Cure: reject pathnames that do not start with `/` or that start with `//` (backslash paths normalize to `//` in the URL parser and are caught by the same arm). |
| S14-2 | **MED** (enumeration) | `src/app/api/auth/resend/route.ts:47-76`; `verify/route.ts:54-71` | **Resend leaks the account's VERIFICATION STATE twice (shape + timing); verify leaks via timing.** Shape: the no-op branch (unknown OR already-verified) returns `{resent, message}` with NO `verificationCode` key while the known-unverified branch returns `{resent, message, verificationCode}` — the key's PRESENCE distinguishes known-unverified emails even in the production knob-off posture (signup's duplicate-email 400 can only reveal "exists", never "unverified"). Timing: the known-unverified branch burns a scrypt hash + a DB write; the miss branch returns immediately. Login closed this exact class at S72-C (the timing equalizer); forgot-password documents its accepted fsync-scale residual — but resend's known branch ALREADY burns scrypt, so an equalizer burn on the miss branch EQUALIZES (it cannot invert the signal the way forgot-password's documented rationale (b) warns about). Cure: (a) the no-op branch always includes `verificationCode: null`; (b) both routes burn one scrypt on the miss branch (resend: `hashVerificationCode(<constant>)`; verify: `verifyVerificationCode(code, timingEqualizerHash())` — login's exact shape). |
| S14-3 | LOW (maintenance trap) | `src/app/api/generate/route.ts:29-31` | **`requireSession`'s 401 branch is dead code that reads like an auth wall.** `const user = isGuarded(guard) ? null : guard.user;` never returns the guard's 401 — anonymous generation is BY DESIGN (the reference's logged-out tool; ADR-003), but the shape implies enforcement. Cure: the intent comment (the guard only selects the LIMITER BUCKET — guests are allowed) + a wiring pin so the null-fallback shape cannot silently become a wall (or silently vanish). |
| S14-4 | LOW (contract asymmetry) | `src/lib/schemas.ts:29-31` vs `:80-83` | **Password-length ceilings are asymmetric:** `passwordSchema` (signup) has NO max while `new_password` (reset) caps at 200. A user who sets a 201+ char password at signup (the 16KB body cap allows it) cannot set a NEW password at reset — the reset form dead-ends while the old password still verifies. Cure: `passwordSchema` gains `.max(200, "Password must be reasonably sized")` (the reset family's own message); login's password stays unbounded (login never rejects on length — the tolerant posture for pre-existing hashes). |
| S14-5 | LOW (a11y doctrine) | `src/components/layout/login-card.tsx:829` | **The green resend confirmation uses `role="alert"`.** The house doctrine (toast.tsx:104-106, F11-17) reserves the assertive `role="alert"` for errors; informational announcements ride `role="status"`. Screen-reader users get an urgent interruption for "New verification code sent". Cure: `role="status"` on InfoCallout + the login-views pin re-anchored (alert count 2→1, the status count pinned at 1). |
| S14-6 | LOW (a11y) | `src/components/ui/toast.tsx:133-148` | **The toast dismiss button has no visible keyboard focus indicator** — hover-only affordance (`hover:bg-line-soft hover:text-neutral-900`), no `focus-visible:` arm. The OTP inputs' own pattern (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`) is the house cure. |
| S14-7 | INFO (motion boundary) | `src/components/effects/particle-text.tsx:186` | The reduced-motion swap boundary uses strict `>` on an exactly-on-schedule timer — an exactly-equal elapsed (measure-zero; timers usually fire ≥1ms late) misses the swap and holds the phrase a second full window (the S13-3 symptom recurring at the boundary). Cheap cure: `>=` + the order pin extended. |
| S14-8 | INFO (docs) | `docs/DEPLOYMENT.md` §3 | The depth-0 "unknown" shared bucket (M-2) is a documented tradeoff (code comment + `.env.example`), but the AVAILABILITY side — the entire deployment shares one per-route ceiling (10 logins/15 min for ALL users combined) — is not stated where an operator would act on it. Cure: the one-liner in the hops row (depth 0 suits single-user/test deployments; multi-user direct exposure should front the app with a proxy and declare depth 1). |
| S14-9 | INFO (deferred) | `src/app/api/auth/signup/route.ts:69-88` | The count-derived `role`/`avatarColor` race (two concurrent first-ever signups can both read `count === 0`) — unreachable in the seeded shape (the demo user occupies count 0; the quickstart seeds). **No action** (documented; the minimal-diff doctrine). |
| S14-10 | INFO (deferred) | `src/components/effects/reveal.tsx` | SSR ships `opacity: 0` inline styles (below-the-fold invisible to non-JS agents until IO settles) — the reference's framer-motion shape has the same property (parity). **No action.** |
| S14-11 | INFO (re-attributed) | the delivery family | The audit's H-1 (default-unset delivery knobs = in-response takeover surface) is the RECORDED S13-1 residual: session 13's decision stands — warn, never fatal (the mail-less demo posture is a legitimate deployment; a bad toggle must never take a working deployment down). The boot warning + `.env.example` + DEPLOYMENT guidance are the mitigation. **No action this round.** |

## Remediation (TDD where a contract changes)

- **R14-1 (RED→GREEN, S14-1)**: `tests/from-url.test.ts` first — the
  same-origin-absolute-with-`//`-path form (both the composed and
  string-concat shapes), the backslash-normalized form, and the
  deep-path-with-inner-`//` STILL PASSES control (the guard targets the
  LEADING `//` only). Then `src/lib/from-url.ts` gains the pathname arm
  (`!u.pathname.startsWith("/") || u.pathname.startsWith("//")` → `/`).
  Plus ONE e2e leg in `tests/e2e/auth.spec.ts` (the mirror of the live
  repro: `from_url=<origin>//evil.com` → signs in → lands on `/`).
- **R14-2 (RED→GREEN, S14-2)**: `tests/auth-contract.test.ts` pins first —
  (a) the resend no-op branch includes `verificationCode: null`; (b) the
  resend miss branch burns `hashVerificationCode` (the equalizer); (c) the
  verify miss branch burns `verifyVerificationCode(code,
  timingEqualizerHash())`. Then the cures: the no-op branch's payload, the
  two equalizer burns (the `timingEqualizerHash` "only consumer" comment
  in password.ts updated in the same commit), the resend module const for
  the equalizer input.
- **R14-3 (S14-3)**: the generate-route intent comment + the
  `api-robustness` wiring pin (the null-fallback shape
  `isGuarded(guard) ? null : guard.user` — the guests-allowed face).
- **R14-4 (RED→GREEN, S14-4)**: `tests/schemas.test.ts` — a 201-char
  password rejects with "Password must be reasonably sized"; then
  `passwordSchema` gains the `.max(200, …)`.
- **R14-5 (S14-5)**: InfoCallout `role="alert"` → `role="status"`; the
  login-views pin re-anchored (alert 2→1 + status 1).
- **R14-6 (S14-6)**: the toast dismiss `focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-ring` arm + the toast-anatomy
  pin.
- **R14-7 (S14-7)**: the reduced-branch boundary `>` → `>=` + the
  effects-motion pin (the boundary comparison pinned on its own face).
- **R14-8 (docs)**: the DEPLOYMENT.md hops-row one-liner (S14-8).
- **R14-9 (lockstep)**: the count constants re-anchored AFTER all test
  changes land (UNIT 528+Δ / E2E 54+1); the badge; README (status row,
  testing section); AGENTS (counts, the plans map's fourteenth round);
  CLAUDE; PAD (§12 re-anchor); SKILL v1.9.0 → v1.10.0; worklog Task 14;
  this plan's execution record.
- **R14-10**: captures 35/36 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`,
  hydration awaited), PIL-verified.
- **R14-11**: the full gate on the exact commit tree → `bun audit` (the
  periodic duty) → the Conventional Commit on `main` → the SSH-wrapper
  push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The `//`-path family falls back to `/` (3 unit pins + the e2e leg);
   the deep-path-with-inner-`//` control still passes.
3. The resend no-op branch ships `verificationCode: null`; both miss
   branches burn one scrypt (the login S72-C shape).
4. The generate route's guests-allowed intent is pinned (the wiring pin).
5. A 201-char password rejects at signup with the pinned message; login
   stays tolerant.
6. InfoCallout rides `role="status"` (pin re-anchored); the toast dismiss
   shows a keyboard focus ring (pinned).
7. The reduced-branch boundary is `>=` (pinned).
8. Docs lockstep at the final counts; SKILL v1.10.0; captures 35/36
   PIL-verified.

## Execution record

- **Baseline**: the full gate green at the documented session-13 counts on
  the fresh clone (528/37 files · 54/9 specs · 15 legs · census MATCH);
  the one fresh-sandbox gap (Playwright browsers) cured and documented.
- **The audit**: 0 Critical / 1 High / 3 Medium / 4 Low / 3 Informational;
  S14-1..S14-8 hand-verified in source before this plan; S14-1
  live-verified as an open redirect on the dev server.
- **The parity walk**: the reference live (NO drift — the mobile menu, the
  `/Tool` title/OG/canonical family) and the clone's dev server (the menu
  family, the from_url round-trip + the foreign fallback, the SEO
  surfaces, the 404 contract).
- (Execution entries appended as each R-item lands.)

## Post-execution record (appended at ship)

- **R14-1 (S14-1)**: the from-url escape pins first (RED — exactly the 2
  escape pins; the inner-`//` control passed), then the leading-`//`
  pathname arm. ONE iteration: the backslash pin's second shape
  (`host\evil.com` — a backslash DIRECTLY after the host) normalizes to
  the SINGLE-slash path `/evil.com`, a safe same-origin path — the pin's
  expectation was corrected to assert the parser's actual normalization
  (the first shape `/\evil.com` → `//evil.com` → caught by the arm).
  The e2e leg added (the mirror of the live repro, origin read after
  landing). **Mutation battery**: killing the arm (`if (false)`) REDs
  exactly the 2 escape pins → restored → GREEN.
- **R14-2 (S14-2)**: the auth-contract pins first (RED — exactly 3),
  then the cures (the uniform no-op shape, the resend equalizer burn on
  the module-const input, the verify burn against the memoized
  equalizer hash, the password.ts consumer-comment update).
  **Mutation batteries**: un-shaping REDs the shape pin; removing
  either burn REDs exactly its pin → restored → GREEN.
- **R14-3 (S14-3)**: the generate-route intent comment + the
  api-robustness wiring pin. **Mutation battery**: planting the 401
  wall REDs the pin → restored → GREEN.
- **R14-4 (S14-4)**: the 201-char rejection pin (RED), then the
  `.max(200, "Password must be reasonably sized")` on the shared
  schema. **Mutation battery**: dropping the max REDs the pin →
  restored → GREEN.
- **R14-5 (S14-5)**: InfoCallout → the polite role + the login-views
  pin re-anchored (alert 2→1, status pinned at 1). ONE iteration: the
  cure comment first quoted both role literals, which the RAW-source
  pin double-counts — rewritten to describe the doctrine without the
  literals. **Mutation battery**: the revert REDs the pin → restored →
  GREEN.
- **R14-6 (S14-6)**: the toast dismiss focus-visible family + the
  toast-anatomy pin. **Mutation battery**: stripping the arm REDs the
  pin → restored → GREEN.
- **R14-7 (S14-7)**: the boundary pin (RED), then `>` → `>=`.
  **Mutation battery**: the revert REDs the pin → restored → GREEN.
- **R14-8 (docs)**: the DEPLOYMENT.md hops-row availability one-liner.
- **R14-9 (lockstep)**: unit 538/37 files (+10: +3 from-url, +3
  auth-contract, +1 api-robustness, +1 schemas, +1 toast-anatomy, +1
  effects-motion), e2e 55/9 specs (+1), badge 593 = 538+55; the census
  constants re-anchored FIRST (the reality census caught every stale
  site in one run); README (badge, architecture table, testing
  section, the session-14 status row, the gate line); AGENTS (counts,
  the plans map's fourteenth round); CLAUDE; PAD (§8 test distribution,
  §12 re-anchor: from-url 26→36, password 67→68, particle-text
  311→315); the SKILL v1.9.0 → v1.10.0 (frontmatter, the §11 checklist
  count, Appendix A session-14 row, Appendix B re-certification + the
  session-14 re-walk); worklog Task 14; this record.
- **R14-10**: captures 35/36 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`,
  hydration awaited), PIL-verified.
- **R14-11**: the full gate on the exact commit tree → `bun audit`
  (the periodic duty) → the Conventional Commit on `main` → the
  SSH-wrapper push (dry-run first).
- **Deferred (documented in the findings table)**: S14-9 (the signup
  count-derived role race — unreachable in the seeded shape),
  S14-10 (the reveal SSR opacity-0 — the reference's own posture),
  S14-11 (the delivery polarity — the RECORDED S13-1 residual: warn,
  never fatal; the session-13 decision stands).
