# Session 21 — The CTA-Class Re-Anchor + The oklab→sRGB Gradient Cure + The Mobile-Menu Pill + The Audit Batch (2026-11-11)

The round opened on a fresh `git clone` (the standing instruction's
reset path), `bun install`, `.env` re-created from `.env.example`
(AUTH_SECRET set for dev), `db:push` + `db:seed` + `db:census`
(MATCH). The operator's standing asks were re-verified up front:
`.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root (the contract re-verified end-to-end on the clean machine), the
vitest + playwright suites in place and current, the sitemap/robots/
manifest/OG family byte-verified against the live reference, `skills/`
excluded from every gate. This file's pre-round content was the
session-20 transcript handoff (the established pattern — the content
is preserved in the session-20 record and the session-20 plan); this
round's log replaces it.

The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL), then
the session-20 set (session_20.md, the session-20 plan, worklog Task
20). This round is session 21. Baseline gate GREEN at the documented
counts (lint 0/0 · tsc 0 · unit 571/571 (37 files)). neo-crm re-cloned
at HEAD `b3d0fbe` — UNCHANGED since session 12's review; the recorded
decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit
subagents dispatched (API/lib seams, components/pages/effects,
SEO/configs/tests/docs) while the findings were hand-verified in
source. The audit returned **0 Critical / 0 High / 1 Medium / 11 Low /
14 Info** — the one Medium being the oklab-gradient doctrine
unimplemented (A2-1: the house rule says "use inline styles where the
reference's blend must be exact"; zero inline gradients existed in
src/).

The parity walk (live, both sides, logged into the reference) started
clean — the five-route head census byte-matches the session-19
description family; the monetization floaters (10 icons, identical
class families, live transforms); sitemap/robots identical
(origin-difference only); the generator round-trip green — **but the
computed-style control census found FIVE LIVE CLASS-LEVEL DRIFTS, the
first since session 19**:

- **The footer CTA** — the reference's
  `inline-block … from-teal-500 to-teal-600 text-white …
  hover:shadow-teal-500/30` vs our `inline-flex … from-teal-400 …
  text-slate-900 … /25` (four deltas).
- **The Pro-card CTA** — its `hover:shadow-lg hover:-translate-y-0.5
  transition-all` vs our `hover:bg-teal-50 transition-colors
  inline-block`.
- **The mobile-menu pill** — the reference's text is now "Upgrade to
  Pro" (the priced "Upgrade to Pro – $19" was its session-1-era
  capture — the dossier's own record), and its pill carries the
  desktop hover family.
- **The mobile-menu links** — the reference's dropdown re-renders the
  DESKTOP link family (the LINK_BASE underline affordances); ours were
  mobile-specific without them.
- **The gradients** — the walk's decisive find: EVERY v4
  `bg-gradient-to-*` compiles `linear-gradient(… in oklab, …)` while
  the live reference (v3) blends sRGB. Same endpoints, different
  midband — and on the hue-crossing `from-teal-400 to-amber-400`
  brand family (the navbar/footer wordmark, the monetization
  headline, the Get-Unlimited-Access CTA) the computed drift is
  ΔR≈26. The audit's A2-1 Medium elevated to a live parity drift; the
  Tailwind-V4-Validation-Report's "the hero gradient ships the
  sRGB-equivalent arbitrary form" claim is a template leftover false
  for this tree.

The session-21 plan written and validated against the codebase (the
pin landscape — no existing pins anchored the cure sites; the e2e
placement — auth.spec.ts for the /signup leg), then executed with TDD
throughout:

- **R21-1..R21-4 (the class re-anchors)**: four pins RED first in
  landing-page.test.ts's new session-21 describe, then the cures —
  the footer CTA, the Pro-card CTA, the menu pill (text + hover
  family; the e2e name re-pinned in the same commit), and the menu
  links (LINK_BASE underline family + the touch-target layout kept as
  the documented superset — the reference's bare text-sm links
  measure ~20px, under the WCAG 2.5.8 24px floor; ours 36px).
- **R21-5 (the gradient cure)**: three pins RED first in
  design-tokens.test.ts (the exact sRGB string on the three sites +
  THE BAN on the utility pair), then the inline-style cures per the
  house doctrine. **Mutation battery**: the wordmark reverted to the
  utility pair → exactly the two pins RED (the logo pin + the ban) →
  restored → GREEN. **Live-verified**: the computed `backgroundImage`
  is now `linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191,
  36))` — byte-identical to the reference, no `in oklab`.
- **R21-6 (the reset focus map)**: the pin RED first, then the S19-10
  pattern on the reset screen (the done-view h1 +
  `data-view-focus` + the prev-state ref guard).
- **R21-7 (the OTP triage, refined mid-round)**: three pins RED
  first, then the split — and when the first e2e run failed (the
  funnels' fill() legs route through onChange), the design was refined
  rather than the e2e bent: a strict split would have broken the
  browser OTP autofill (`autoComplete="one-time-code"` fills box 1
  through the input event). The landed contract: append-onto-own-digit
  or single digit → replace in place + advance; longer values → the
  shared distribution arm (the autofill face); real pastes intercepted
  by onPaste (preventDefault — the F12-6 stale-prefix genus). The pins
  re-anchored; otp.test.ts untouched, green; both funnel legs green on
  their original fill() code.
- **R21-8 (the bun env parity)**: the pin RED first, then
  `parseEnvFile` mirrors bun's scan order exactly (live-verified
  isolated on bun 1.3.14: `K=v # note` → `v`; `K=abc#def` → `abc`
  — bun cuts at ANY hash, no whitespace guard; quoted hashes
  survive; `KEY="v" # note` → `v`). Four pins including the
  quoted-hash and after-quote-comment faces.
- **R21-9/R21-10 (the coverage pins)**: the /signup route's FIRST
  e2e leg (title + card + canonical — e2e 57 → 58) and
  /reset-password's pageMetadata consumption pinned.
- **R21-11..R21-19 (the batch)**: ADR-004's stale "488-test gate"
  re-anchored; the PAD's TOC renumbered to match the §7-less heading
  ladder + the date + the public/ tree; the donor-ledger lineage
  notes (the CRM's OWN session-20 S20-P1..P4 describes re-attributed
  to this repo's session-8 — they actively collided with OUR
  session-20 findings; the F10-4 note pattern on .env.example,
  DEPLOYMENT.md, playwright.config.ts, four test headers, three page
  comments; the SKILL's new §0.5 Citation Provenance section); the
  PT reword + the page-titles S20-15 prose; the eslint phantom-ignore
  prune; the x-real-ip warning face; the tolerant-email note; the
  findUnique + single-hash refactor (the auth-reset pins re-anchored,
  the vacuous ordering arm fixed); the Copy focus ring; the
  floating-icons matchMedia guard.

The count re-anchor: UNIT 571 → 586 (+15 pins), E2E 57 → 58, badge
628 → 644; the PAD §12 rows re-anchored (db-path 254, navbar 196,
generator-card 206, floating-icons 122); SKILL v1.16.0 → v1.17.0.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
586/586 (37 files) · build · smoke 15/15 · e2e 58/58 (9 specs)** ·
census MATCH. Captures 49/50 taken on the dev server (the landing
1280×800 + the OPEN mobile menu 390×844, via `localhost`, hydration
awaited, the menu DOM-confirmed open before the shot), PIL-verified
(49: 44.1% dark hero, 100% non-white; 50: 94.4% dark upper-third).
README (the session-21 row, the gate line, the badge 644); AGENTS
(counts, the plans map's twenty-first round, the e2e phrasing);
CLAUDE (counts); PAD (§8.1, §12 rows, the hygiene batch); SKILL
v1.17.0 (frontmatter, §0.5, §5 item 5's cure note, Appendix A's
session-21 row, Appendix B re-certified through session 21); worklog
Task 21; this log; the plan's post-execution record. The Conventional
Commit and the SSH-wrapper push follow (dry-run first, key shredded
after).

## The round (summary)

**Baseline:** the merged tree (`8c2fdcf`) passed lint 0/0 · tsc 0 ·
unit 571/571 (37 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents, every load-bearing finding
hand-verified): **0 Critical / 0 High / 1 Medium / 11 Low / 14 Info.**

**The parity walk (both sides, live): FIVE CLASS-LEVEL DRIFTS** — the
footer CTA, the Pro-card CTA, the mobile-menu pill + links, and the
oklab-vs-sRGB gradient interpolation on the hue-crossing brand family
(the audit's Medium, elevated by the walk). All five cured with TDD,
live-verified byte-identical.

**The cures:** +15 unit pins, 1 mutation battery, +1 e2e leg — the
five parity re-anchors, the reset focus map, the OTP keystroke/paste
split, the bun env-comment parity, the /signup coverage, the
metadata pin, and the eleven-item docs/comment batch.

**Verified:** unit **586/586** (37 files) · e2e **58/58** (9 specs) ·
smoke 15/15 · census MATCH · badge 644 · captures 49/50
PIL-verified · the cured surfaces re-verified live against the
reference · six docs + SKILL v1.17.0 in lockstep. **Deferred:** the
honest register recorded in the plan (the signup admin-bootstrap
race, the logout-CSRF posture, the landing section-header
duplication, the Reveal no-JS trade-off, the offscreen-rAF pause,
the h2-only swap headings, the per-account login lockout, and four
carried postures — each with its reason).
