# Session 21 — The CTA-Class Re-Anchor + The oklab→sRGB Gradient Cure + The Mobile-Menu Pill + The Audit Batch (2026-11-11)

## Context

Session 20 pushed `b280189` (the ledger-count closure + resetToken index +
limiter namespace + hygiene batch); the owner added `8c2fdcf` (the session-20
round log). This round re-ran the standing instruction against the merged
tree: docs review → baseline gate → the comprehensive audit (three parallel
subagents) → the neo-crm re-review → the live reference parity walk → the
TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
571/571 (37 files) · census MATCH (1 user + 0 contact messages). `.env`
re-created from `.env.example` (AUTH_SECRET set for dev), `db/` at the repo
root with `custom.db` pushed + seeded — the DATABASE_URL contract
(`file:../db/custom.db` resolving against `prisma/schema.prisma`)
re-verified end-to-end on a clean clone. The operator's standing asks
re-verified: `.env` DATABASE_URL + `db/` at root ✓ · vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in place
and current ✓ · sitemap.xml / robots.txt / manifest / OG family /
per-route metadata byte-verified against the live reference ✓ · `skills/`
excluded from every gate (tsconfig/eslint/vitest, all explicit) ✓.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review (re-cloned and verified this round); the recorded
adoption/deferral decisions stand.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs —
every load-bearing finding hand-verified in source by the lead):
**0 Critical / 0 High / 1 Medium / 11 Low / 14 Info.** The one audit
Medium: the oklab-gradient doctrine unimplemented (A2-1 — elevated below
to a LIVE parity drift by the walk).

**The parity walk (live, both sides, logged into the reference):** the
five-route head census (title/description/og/twitter/canonical) — NO
DRIFT (the session-19 description family holds byte-for-byte). The
monetization floaters (10 icons, identical class families, live rotation
transforms in-envelope) — NO DRIFT. Sitemap.xml + robots.txt — identical
(origin-difference only). The clone's generator round-trip green (the
reference's LLM stays platform-dead — the documented superset). The
Tailwind v4 trap catalog re-verified mitigated in `globals.css`.

**BUT the computed-style control census found FIVE LIVE DRIFTS** — the
first class-level drifts since session 19:

| ID | Severity | Surface | Drift |
|---|---|---|---|
| S21-1 | **MEDIUM** (parity) | `src/components/marketing/footer.tsx:67` — the footer "Upgrade – $19" CTA | Reference: `inline-block px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/30 transition-all`. Clone: `inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all`. Four deltas: display, gradient start (teal-500→teal-400), text color (white→slate-900), hover-shadow opacity (/30→/25). |
| S21-2 | **MEDIUM** (parity) | `src/components/marketing/sections.tsx:435` — the Pro-card CTA | Reference: `mt-8 block w-full py-3.5 text-center font-semibold rounded-2xl bg-white text-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all`. Clone: `mt-8 w-full py-3.5 … hover:bg-teal-50 transition-colors inline-block`. Hover family + display drift. |
| S21-3 | **MEDIUM** (parity) | `src/components/marketing/navbar.tsx:171-174` — the mobile-menu Upgrade pill | Reference text: "Upgrade to Pro" (changed since the session-1 dossier's "Upgrade to Pro – $19" capture) with the desktop pill's full class incl. the hover family. Clone text: "Upgrade to Pro – $19", no hover classes. |
| S21-4 | **LOW** (parity) | `src/components/marketing/navbar.tsx:158-161` — the mobile-menu links | The reference's dropdown now reuses the DESKTOP link family (`LINK_BASE` underline affordances + active `after:w-full`). Clone: mobile-specific `block w-full text-left … py-2` without the underline family. |
| S21-5 | **MEDIUM** (parity) — A2-1 elevated by the walk | All `bg-gradient-to-*` surfaces | The live reference (v3) ships sRGB interpolation (`linear-gradient(to right, …)`); the clone (v4) compiles `in oklab`. The hue-crossing `from-teal-400 to-amber-400` family drifts ΔR≈26 in the midband (round-trip-computed) on the brand wordmark (navbar + footer via `logo.tsx:21`), the monetization headline (`sections.tsx:81`), and the "Get Unlimited Access" CTA (`sections.tsx:486`). The house doctrine (CLAUDE.md:92, SKILL §5 item 5 — "use inline styles where the reference's blend must be exact") was never implemented; `docs/Tailwind-V4-Validation-Report.md:238-240` carries a false template claim ("the hero gradient ships the sRGB-equivalent arbitrary `bg-[linear-gradient(…)]` form" — no arbitrary form exists in this tree). |

Evidence: the agent-browser computed-style censuses (both sides, desktop
1280×800 + mobile 390×844, menu open) — `getComputedStyle(el).backgroundImage`
and full class strings, captured in the round log.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S21-1 | **MEDIUM** (parity) | `footer.tsx:67` | The footer CTA class drift (above). |
| S21-2 | **MEDIUM** (parity) | `sections.tsx:435` | The Pro-card CTA hover/display drift (above). |
| S21-3 | **MEDIUM** (parity) | `navbar.tsx:171-174` | The mobile-menu pill text + hover drift (above). |
| S21-4 | **LOW** (parity) | `navbar.tsx:158-161` | The mobile-menu link affordance drift (above). |
| S21-5 | **MEDIUM** (parity) | `logo.tsx:21`, `sections.tsx:81`, `sections.tsx:486` | The oklab-vs-sRGB gradient interpolation drift on the hue-crossing brand family (above). |
| S21-6 | **LOW** (a11y, WCAG 2.4.3) | `src/components/layout/reset-password-screen.tsx:55,100-116` | The success swap unmounts the focused form and renders the confirmation card with no focus management — the exact S19-10 genus the login card cured (its `data-view-focus` map); this screen never received the treatment. |
| S21-7 | **LOW** (UX correctness) | `src/components/layout/login-card.tsx:337-360` | Typing a digit into an already-filled OTP box smears the old digit forward (the two-char append rides the multi-digit PASTE path) instead of replacing in place — the standard OTP affordance. The seam (`otpDigitsAfterPaste`) is correct for pastes; the keystroke/paste conflation lives in `onCodeDigit`. |
| S21-8 | **LOW** (config edge) | `src/lib/db-path.ts:107-124` | `parseEnvFile` does not strip unquoted inline comments (`KEY=value # note`) but bun's loader does — the bun-signature re-anchor then misses and the DB can silently land outside the repo (the exact `Error code 14` class the seam exists to kill). Live-verified divergence on this machine. |
| S21-9 | **LOW** (coverage) | `tests/e2e/*.spec.ts` | `/signup` has zero runtime coverage (no e2e visit, no a11y scan, no smoke leg — source pins only); a render-time break would ship through a green gate. PAD §8.3's "every user-visible surface has an e2e pin" is falsified by it. |
| S21-10 | **LOW** (coverage) | `tests/page-titles.test.ts:111-121` | `/reset-password`'s `pageMetadata` consumption is unpinned (the factory-consumer list covers the five routes but not it). |
| S21-11 | **LOW** (docs drift) | `Project_Architecture_Document.md:150` | ADR-004's live-tense "the 488-test gate" (session-11's count; the live gate is 571) — the one stale count the docs-counts gate can't see. |
| S21-12 | **LOW** (comment truth) | `tests/http-headers.test.ts:44,88` + ~10 more sites | The template-family session citations collide with this repo's ledger — worst: `http-headers.test.ts`'s "session-20 … S20-P1/P2/P3/P4" describes are the CRM family's session-20 (git-verified: born in the CRM-era commit `6b8809e`), actively colliding with THIS repo's session-20 findings. Un-bridged sites: `.env.example` (170/169/163), `docs/DEPLOYMENT.md` (67/170), `playwright.config.ts` (69/195), `tests/boot-env.test.ts`, `tests/error-boundaries.test.ts`, `tests/login-views.test.ts`, `tests/auth-reset.test.ts`, the login/signup/reset-password page comments. |
| S21-13 | **LOW** (comment truth) | `tests/e2e/a11y.spec.ts:34`, `src/components/effects/reveal.tsx:26` | The retired "PT section" name survives in present-tense comments (the S20-13 cure scoped only to the SKILL). |
| S21-14 | **LOW** (docs hygiene) | `Project_Architecture_Document.md` | The §7 heading is missing from the ladder (§6 → §8; the TOC's items 7–12 point at anchors #8–#13 and the TOC misses §13 Glossary); "Last Updated: 2026-11-09" lags two sessions; the `public/` tree entry claims `screenshots/` (they live in `docs/screenshots/`). |
| S21-15 | **INFO→cured** (comment truth) | `tests/page-titles.test.ts:32,58-63` | The pinning test's own prose still says "word-boundary-truncated" (the S20-15 cure reworded `site.ts`'s comment but not the test's). |
| S21-16 | **INFO→cured** (config hygiene) | `eslint.config.mjs:47` | Phantom ignore entries for directories that don't exist here (`examples/**`, `delivery/**`, `research/**`, `tool-results/**`, `mini-services/**`, `.zscripts/**`, `out/**`, `build/**` — scaffold-family carryover). |
| S21-17 | **INFO→cured** (warning completeness) | `src/lib/boot-env.ts:175-179` | The unset-`VIRALPOST_PROXY_HOPS` production warning names only the x-forwarded-for rotation face; the `x-real-ip` fallback (rate-limit.ts:88) is the same client-suppliable class. |
| S21-18 | **INFO→cured** (docs precision) | `src/lib/schemas.ts:43-55,68-69,81-83` | The tolerant-email posture of login/verify/resend (no format regex, unlike signup/forgot/contact) is deliberate but undocumented. |
| S21-19 | **INFO→cured** (refactor, behavior-preserving) | `src/app/api/auth/reset-password/route.ts:61,91` | `findFirst` + double `hashResetToken` where the S20-2 `@unique` admits `findUnique` with the hash computed once — expresses the one-live-token invariant structurally. Existing auth-reset pins are the characterization. |
| S21-20 | **INFO→cured** (a11y consistency) | `src/components/marketing/generator-card.tsx:177-181` | The Copy button relies on the UA default focus ring; the house focus-visible family (S14-6 toast, S15-8 hamburger) never reached it. |
| S21-21 | **INFO→cured** (consistency) | `src/components/effects/floating-icons.tsx:72` | The one `matchMedia` call without the `typeof window.matchMedia === "function"` guard the other three effects carry. |
| S21-22 | **INFO→cured** (SKILL freshness) | `viralpost-ai_SKILL.md:504` | Appendix B's header still says "re-certified through session 19" (the counts were re-anchored at session 20; the narrative lagged). |

**Verified, no action (the honest-deferred register):** the signup
admin-bootstrap race (an empty-DB edge behind the IP limiter — the
documented first-signup-is-operator contract); the logout-CSRF nuisance
(the adjudicated S13-8 posture, no in-tree caller); the landing's inline
pricing/contact section-header duplication (A2-4 — the CARD family is
shared via `<PricingCards />`, so the S21-2 cure lands on both routes;
the section-header twins remain byte-identical with the pin-churn reason
carried from session 20); the Reveal no-JS trade-off (the reference's SPA
renders nothing without JS — we stay strictly better); the offscreen-rAF
pause and the mid-session reduced-motion toggle (parity-neutral battery
costs, the reference's effects also run continuously); the non-signin
login views' h2-only headings (the reference's own swap DOM,
dossier-verified); the per-account login lockout (carried — needs its own
design round); `scryptSync` on the request path (the family convention);
the toast nested-live-region trade-off and the dormant subscribe race
(carried); the error.tsx axe battery (needs a forced-error surface); the
`bun run start` tee pipe (accepted at session 19).

## Remediation (TDD where a contract changes)

- **R21-1 (S21-1, TDD)**: the pin FIRST — landing-page.test.ts's footer
  describe gains the reference's exact CTA class string
  (`inline-block px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600
  text-white text-sm font-semibold rounded-full`). RED. GREEN:
  footer.tsx:67 re-anchored (the gradient is same-family — the oklab
  delta is sub-threshold, utility classes stay). Live-verify the computed
  class on the dev server.
- **R21-2 (S21-2, TDD)**: the pin FIRST — landing-page.test.ts pins the
  Pro-card CTA's reference string (`mt-8 block w-full py-3.5 text-center
  font-semibold rounded-2xl bg-white text-teal-700 hover:shadow-lg
  hover:-translate-y-0.5 transition-all`). RED. GREEN: sections.tsx:435.
  Both routes (landing + /Pricing) ride the shared `<PricingCards />`.
- **R21-3 (S21-3, TDD + live)**: the pin FIRST — nav-config.test.ts (or
  the landing-page navbar describe) pins the menu pill's reference text
  + hover family. RED. GREEN: text "Upgrade to Pro" + classes
  `block w-full text-center px-5 py-2.5 text-sm font-semibold
  text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500
  rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all
  hover:-translate-y-0.5` (the layout prefix stays — the touch-target
  superset, documented in the navbar comment + the Deviations Ledger).
  The e2e mobile-navigation pin (`Upgrade to Pro – $19`) re-anchors in
  the same commit. Live-verify at 390×844.
- **R21-4 (S21-4, TDD + live)**: the pin FIRST — the menu links must
  carry the `LINK_BASE` underline family. RED. GREEN: the mobile links
  gain `relative after:absolute after:bottom-[-4px] after:left-0
  after:h-[2px] after:bg-teal-400 after:transition-all` + the active
  `text-teal-400 after:w-full` / idle `text-slate-300 hover:text-white
  after:w-0 hover:after:w-full` pair, keeping `block w-full text-left
  py-2` (the touch-target superset). Live-verify.
- **R21-5 (S21-5, TDD + live + mutation battery)**: the pin FIRST —
  design-tokens.test.ts pins the three sRGB inline gradients (the exact
  `linear-gradient(to right, #2dd4bf, #fbbf24)` string on logo.tsx +
  sections.tsx's two sites) and BANS the hue-crossing utility pair
  (`from-teal-400 to-amber-400`) from src/. RED. GREEN: the inline-style
  cure per the house doctrine — `style={{ backgroundImage:
  "linear-gradient(to right, #2dd4bf, #fbbf24)" }}` on the wordmark span
  (logo.tsx:21), the monetization headline span (sections.tsx:81), and
  the CTA (sections.tsx:486, the gradient moves to the style prop, the
  layout/hover classes stay). Mutation battery: revert one site to the
  utility pair → exactly the pin REDs → restore → GREEN. Live-verify:
  the computed `backgroundImage` byte-matches the reference's
  `linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`.
  The Validation-Report trap-3 line re-anchored to describe THIS tree's
  cure.
- **R21-6 (S21-6, TDD)**: the pin FIRST — a11y-controls.test.ts pins the
  reset screen's `data-view-focus` map (the done-view h1 carries
  `tabIndex={-1} data-view-focus`; the effect queries it). RED. GREEN:
  the S19-10 pattern with the prev-state ref guard (the initial mount
  doesn't steal focus).
- **R21-7 (S21-7, TDD)**: the pin FIRST — login-views.test.ts pins the
  `onPaste` handler + the replace-in-place `onChange` (keystrokes take
  `digits.slice(-1)`; ONLY pastes distribute). RED. GREEN: the OTP inputs
  gain `onPaste` (clipboardData read + preventDefault + the
  `otpDigitsAfterPaste` distribution), `onCodeDigit` simplifies to the
  replace-in-place + auto-advance. The seam's contract is unchanged
  (otp.test.ts stays green untouched).
- **R21-8 (S21-8, TDD)**: the pin FIRST — db-path.test.ts gains the
  unquoted inline-comment face (`DATABASE_URL=file:../db/custom.db # note`
  parses to the bare URL). RED. GREEN: `parseEnvFile` strips an unquoted
  trailing ` #` comment (dotenv semantics; quoted values keep their
  content — `#` inside quotes survives).
- **R21-9 (S21-9, TDD)**: the pin IS the cure — landing.spec.ts gains
  the `/signup` render leg (title + the signup card heading + the
  factory canonical). The e2e count 57 → 58; PAD §8.3's claim becomes
  true again.
- **R21-10 (S21-10, TDD)**: the pin FIRST — page-titles.test.ts's
  consumer list gains `src/app/reset-password/page.tsx`. RED (it's
  absent from the list). GREEN: the list entry.
- **R21-11 (S21-11 + S21-14 + the §12/A3-8 preamble, docs)**: PAD —
  ADR-004's "488-test gate" re-anchored to the live count; the heading
  ladder's TOC renumbered to match the headings (items 8–13, Glossary
  added — the heading numbers stay stable so the "§12" references
  hold); "Last Updated" refreshed; the `public/` tree entry fixed
  (og-image + hero-portrait only; screenshots live in `docs/`); the §12
  preamble's "at the session-19 ship" re-anchored.
- **R21-12 (S21-12, comment truth)**: the lineage batch —
  http-headers.test.ts's describes re-attributed (the CRM family's
  session-20 S20-P1..P4 → this repo's session-8 header-census
  attribution, matching the file's own top comment); the F10-4
  lineage-note pattern applied to `.env.example`, DEPLOYMENT.md,
  playwright.config.ts, boot-env/error-boundaries/login-views/auth-reset
  test headers, and the login/signup/reset-password page comments; the
  SKILL provenance note mapping the donor citation ranges.
- **R21-13 (S21-13 + S21-15, comment truth)**: the PT reword
  (a11y.spec.ts:34 "the dark hero/monetization surfaces", reveal.tsx:26
  "the monetization section's benefit rows"); the page-titles prose
  aligned to the S20-15 wording (the hard 70-char cut + comma
  normalization).
- **R21-14 (S21-16, config)**: the eslint phantom ignores pruned (the
  `skills` ignore STAYS — the doctrine).
- **R21-15 (S21-17, warning text)**: the boot warning extended to "a
  forged x-forwarded-for or x-real-ip value".
- **R21-16 (S21-18, comment)**: the tolerant-email posture comment in
  schemas.ts.
- **R21-17 (S21-19, refactor)**: reset-password's `findUnique` + single
  hash (the existing auth-reset suite is the characterization — 26/26
  before and after).
- **R21-18 (S21-20, a11y consistency)**: the Copy button joins the
  focus-visible family (`focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-teal-500` — keyboard-only,
  the reference's base classes untouched).
- **R21-19 (S21-21, consistency)**: floating-icons' matchMedia guard.
- **R21-20 (lockstep)**: the count ladder re-anchored at the ship
  census (UNIT 571 → the live count with the new pins, SUITES 37, E2E
  57→58/9→10-files, badge arithmetic); the PAD §12 line-count rows for
  every edited file; README (the session-21 row, the gate line, the
  badge); AGENTS (counts, the plans map's twenty-first round, the e2e
  phrasing precision); CLAUDE (counts); PAD (§8.1, §12 rows); SKILL
  v1.16.0 → v1.17.0 (frontmatter, §5 item 5's cure note, §7 if needed,
  Appendix A's session-21 row, Appendix B re-certified through session
  21 — S21-22); worklog Task 21; `docs/session_21.md` (the pre-round
  transcript replaced by this round's log); this plan's post-execution
  record.
- **R21-21**: captures 49/50 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited, the menu DOM-confirmed open before the shot),
  PIL-verified.
- **R21-22**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first, key shredded
  after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The five parity drifts cured and live-verified against the reference
   (the footer CTA, the Pro-card CTA, the menu pill, the menu-link
   affordances, the sRGB brand gradients — computed styles byte-match).
3. The reset screen's success swap manages focus; the OTP keystroke
   replaces in place (pastes still distribute).
4. `parseEnvFile` strips unquoted inline comments (pinned); `/signup`
   has an e2e leg; `/reset-password`'s metadata consumption is pinned.
5. The docs/comment batch landed (ADR-004 count, the lineage notes, the
   PT reword, the PAD hygiene, the eslint prune, the warning text, the
   schemas comment, the SKILL Appendix B header).
6. The docs lockstep at the final counts; captures 49/50 PIL-verified.

## Execution record

- **Baseline**: lint 0/0 · tsc 0 · unit 571/571 (37 files) on the merged
  tree; census MATCH; the DATABASE_URL contract re-verified end-to-end.
- **The audit**: 0 Critical / 0 High / 1 Medium / 11 Low / 14 Info;
  every load-bearing finding hand-verified in source by the lead.
- **The parity walk**: the reference live (five-route head census +
  floaters + sitemap/robots — no drift; the control census — five
  class-level drifts) + the clone's dev server.

## Post-execution record (appended at ship)

- **R21-1 (S21-1)**: the pin RED first, then footer.tsx:67 re-anchored
  to the reference's exact string (layout `inline-block`, gradient
  start teal-500, `text-white`, hover-shadow /30). landing-page 4-pin
  describe GREEN.
- **R21-2 (S21-2)**: the pin RED first, then sections.tsx's Pro-card
  CTA re-anchored (`block` + the shadow/lift hover family +
  `transition-all`). Both routes ride the shared `<PricingCards />`.
- **R21-3 (S21-3)**: the pin RED first (the unique menu-pill layout
  prefix + the hover family + the priced-text ban), then the pill text
  → "Upgrade to Pro" + the reference's hover classes; the e2e
  mobile-navigation name re-pinned in the same commit
  (`{ name: "Upgrade to Pro", exact: true }`).
- **R21-4 (S21-4)**: the pin RED first, then MENU_LINK_BASE = the
  touch-target layout prefix + the full LINK_BASE underline family,
  spelled out in full (not composed) so the pin owns one literal; the
  active/idle arms gain `after:w-full` / `after:w-0 hover:after:w-full`.
- **R21-5 (S21-5)**: three pins RED first (the exact sRGB string ×2
  sites + THE BAN), then the inline-style cures on logo.tsx:21,
  sections.tsx:81 (the headline span), and sections.tsx:486 (the CTA —
  the gradient moves to the style prop). **Mutation battery**: the
  wordmark reverted to the utility pair → exactly the logo pin + the
  ban RED → restored → GREEN. **Live-verified**: the computed
  `backgroundImage` byte-matches the reference's
  `linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`
  on all three surfaces. The Validation-Report trap-3 line re-anchored
  to describe THIS tree's inline cure.
- **R21-6 (S21-6)**: the pin RED first, then the done-view h1 gains
  `tabIndex={-1} data-view-focus` + the screenRef/prevDoneRef effect
  (the S19-10 doctrine). a11y-controls GREEN.
- **R21-7 (S21-7)**: three pins RED first, then the split —
  `onCodeDigit` = replace-in-place (the last digit, `\D` stripped) +
  auto-advance; `onCodePaste` = the ONLY distribution path
  (clipboardData + preventDefault + the trailing-window seam; a
  single-digit paste degrades to replace-in-place). otp.test.ts
  untouched, green (the seam's contract unchanged).
- **R21-8 (S21-8)**: the pin RED first, then `parseEnvFile` mirrors
  bun's scan order (live-verified isolated on bun 1.3.14: quote-opened
  values run to the matching quote — a `#` inside survives, the tail
  after the closing quote is discarded; unquoted values cut at the
  FIRST `#` anywhere — `abc#def` → `abc`, no whitespace guard). Four
  pins (the trailing comment, the quoted hash, the mid-token hash, the
  after-quote comment).
- **R21-9 (S21-9)**: the /signup leg in auth.spec.ts (the logged-out
  spec — title + the signup card heading + the "Back to login" button
  + no site chrome + the canonical). E2E 57 → 58.
- **R21-10 (S21-10)**: the page-titles consumer list gained
  `src/app/reset-password/page.tsx`.
- **R21-11 (S21-11 + S21-14 + A3-8)**: ADR-004's "488-test gate"
  re-anchored (de-numbered to "the unit gate — 586 tests at the
  session-21 ship"); the TOC renumbered to match the §7-less ladder
  (8–13 + Glossary, with the why-note); "Last Updated" → 2026-11-11;
  the public/ tree entry fixed; the §12 preamble → session-21.
- **R21-12 (S21-12)**: the lineage batch — http-headers.test.ts's
  describes + inner it() labels re-attributed (the CRM's session-20 →
  this repo's session-8); the F10-4 note on .env.example,
  DEPLOYMENT.md, playwright.config.ts, boot-env/error-boundaries/
  login-views/auth-reset headers, and the login/signup/reset-password
  page comments; the SKILL's new §0.5 Citation Provenance section.
- **R21-13 (S21-13 + S21-15)**: the PT reword (a11y.spec.ts:34,
  reveal.tsx:26); the page-titles prose aligned to the S20-15 wording
  (both the header comment and the derivation it()'s label + body).
- **R21-14 (S21-16)**: the eslint ignores pruned to the real set
  (node_modules, .next, next-env.d.ts, skills); lint re-verified 0/0.
- **R21-15 (S21-17)**: the boot warning names "x-forwarded-for or
  x-real-ip"; boot-env 37/37 green (no pin anchored the old string).
- **R21-16 (S21-18)**: the tolerant-email posture comment on
  loginSchema.
- **R21-17 (S21-19)**: `findUnique` + the single `tokenHash`
  computation; the two auth-reset pins re-anchored to the new shape +
  the vacuous ordering arm fixed (indexOf > -1 asserted first).
- **R21-18 (S21-20)**: the Copy button joins the focus-visible family
  (teal-500 ring, keyboard-only).
- **R21-19 (S21-21)**: the floating-icons matchMedia guard.
- **Count re-anchor**: UNIT 571 → 586 (+15: landing-page +4,
  design-tokens +3, a11y-controls +1, login-views +3, db-path +4),
  E2E 57 → 58 (the /signup leg; specs 9 unchanged), badge 628 → 644;
  the §12 rows (db-path 254, navbar 196, generator-card 206,
  floating-icons 122); every live-tense count site re-anchored in the
  same commit (the lockstep pins drove it — three census REDs appeared
  mid-round and were walked to GREEN site by site).
- **R21-20 (lockstep)**: README (the session-21 row, the gate line,
  the badge 644); AGENTS (counts, the plans map's twenty-first round,
  the e2e phrasing "incl. the setup project's 1"); CLAUDE (counts);
  PAD (§8.1, §12 rows, the hygiene batch); SKILL v1.16.0 → v1.17.0
  (frontmatter, §0.5, §5 item 5's cure note, Appendix A's session-21
  row, Appendix B re-certified through session 21); worklog Task 21;
  `docs/session_21.md` (the pre-round transcript replaced by the round
  log); this record.
- **R21-21**: captures 49/50 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified (49: 44.1% dark
  hero / 100% non-white; 50: 94.4% dark upper-third).
- **R21-22**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 586/586 (37 files) · build · smoke 15/15 · e2e
  58/58 (9 specs) · census MATCH.
- **Deferred**: the signup admin-bootstrap race (empty-DB edge behind
  the IP limiter), the logout-CSRF nuisance (the adjudicated S13-8
  posture, no in-tree caller), the landing's section-header
  duplication (byte-identical; the shared PricingCards carried the
  S21-2 cure to both routes), the Reveal no-JS trade-off (the
  reference's SPA renders nothing), the offscreen-rAF pause + the
  mid-session reduced-motion toggle (parity-neutral), the non-signin
  views' h2-only headings (the reference's own swap DOM), the
  per-account login lockout (carried), scryptSync-on-the-request-path
  (carried), the toast nested live regions (carried), the error.tsx
  axe battery (carried), the start tee pipe (carried) — each with its
  reason in the findings register.
