# Session 42 — The Boot-Gate Localhost False-Alarm Cure + The Subsumed-Arm Annotations + The Toast Call-Site Census + The Comment-Truth Batch (2026-11-13)

The round opened on the shipped tree (`b8072f3` — session-41's commit;
the owner's narration commit `3cb1aa0` followed, carrying session_42.md
as the round-41 narration — replaced now by this round's formal log).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.37.0), then the session-41 set (session_41.md, the session-41 plan,
worklog Task 41, the owner narration). This round is session 42.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
683/683, 40 files · build · smoke 16/16 · e2e 65/65, 9 specs · census
MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate; the
committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked for pattern currency per the standing
instruction (its sessions 212–217: the s212 standalone bun-launch DB
re-anchor — already adopted here at session-11/F11-18 with the
in-code citation — and the semantic-prose census genus deepening on
its own docs; this repo adopted the genus at session-12; patterns
current, nothing new to adopt).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead, including a
built-sheet probe that settled AUDIT-2's tree-shaking claim (the
artifact carries `--color-*` custom properties only for used tokens;
the zero-consumer whole-family pins `--color-teal-800`/`--color-amber-200`
are absent — the installed compiler tree-shakes unused @theme
variables) and a byte-level re-read of the three subsumed arms):
**AUDIT-1: 0C/0H/0M/3L/4I · AUDIT-2: 0C/0H/0M/2L/0I · AUDIT-3:
0C/0H/0M/1L/3I** — combined **0 Critical / 0 High / 0 Medium / 6 Low
/ 7 Info**. The session-41 diff itself verified correct and complete
on all three passes (the exact-prefix case arm, the six-knob
restructure, the 11-literal retirement, the Kept annotations, the
docs batch — all re-confirmed; the residuals are pre-existing debt
this round claims, and three of the six Lows are comment-truth misses
INSIDE the session-41 comment-truth batch itself — the recurring
irony the genus always ships).

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL FACES MATCH, NO
DRIFT — the fifteenth consecutive fully-clean walk.** The mobile menu
works as expected (the owner's standing concern): the reference panel
enumerated live and byte-verified against ours — the four nav links
(Home /Tool /Pricing /Contact; the active link's teal `text-teal-400`
rgb(45,212,191) face, the siblings' `text-slate-300
hover:text-white`) + the Gumroad pill ("Upgrade to Pro – $19", the
same templixco href), classes, hrefs, texts, cursor pointer all
matching; panel mechanics identical both sides (display block +
max-height none; the reference's `bg-slate-900/98` still computing
`rgba(0,0,0,0)` — dead in its own build, the transparent-over-hero
posture replicated); the hamburger cursor pointer both sides (the
Tailwind v4 standing concern holding); the reference's hamburger
still ships NO aria family (our expanded aria-expanded/controls/label
is the documented superset); Escape leaves the reference's panel open
(our F11-11 superset — ours verified closing: the `hidden` attribute
set, computed display none, links invisible). The desktop nav
byte-identical (brand + 4 links + the Upgrade pill); the five-route
head census byte-identical modulo origin (titles, og:title,
canonicals; the unprefixed family on / and /login); sitemap 4 URLs
both (identical modulo origin); robots identical modulo origin; the
generator probe symmetrically disabled/not-allowed (R 405
platform-side, L works — the documented superset); the login
round-trip both landing the landing (R `/Home`, its duplicate-of-`/`
route; L `/` — the documented 308 deviation), the clone session
verified live via /api/auth/me (`sepnetflix2023@outlook.com`, role
admin).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S42-6 (LOW, AUDIT-1 A6)** — the boot-gate localhost false-alarm
  cure: the production localhost check was a substring test over the
  raw origin (`/localhost|127\.0\.0\.1/.test(siteUrl)`) — a
  legitimately PUBLIC origin whose string merely contains "localhost"
  (`mylocalhost.example.com`, or a query carrying the word —
  double-warned after the shape arms already fired) tripped the
  "would advertise a localhost origin" warning falsely. The S22-18
  doctrine: a false alarm erodes the warning's authority. The
  parsed-hostname predicate cures it (`hostname === "localhost" ||
  hostname === "127.0.0.1"` — input-equivalent for every true
  positive; the parse miss stays with the F10-11 shape arms). +1
  RED-first pin; the revert battery on record (exactly the one pin
  RED, the 47 standing pins GREEN through it).
- **S42-7 (LOW, AUDIT-2 L1)** — the toast call-site census: the
  S41-6 BY-DESIGN note's "only toast.error ×6 and toast.info ×1 are
  live" was a mis-attribution — the actual call sites are error ×5
  (generator-card ×3, contact-form ×2) + info ×1 (login-card) = 6
  TOTAL; the ×6 counted the total and mis-attributed it to error (the
  count-truth genus, the same session's own S41-10). The note
  re-spelled + the session_41.md mirror; the NEW comment-stripped
  call-site census arm in toast-anatomy.test.ts re-derives the live
  multiset every run (error 5 / info 1 / success 0 — success pinned
  at zero BY DESIGN per the S41-6 adjudication; the internal bare
  `dismiss(` calls never match the member-anchored regex). The
  plant-a-7th-call battery on record ("expected 6 to be 5").
- **S42-9 (LOW, AUDIT-3 I1)** — the README footer lockstep pin: the
  closing gate footer shipped one round stale ("Gate at the
  session-40 ship … unit 681/681" while the session-41 row four lines
  above read 683 and the gate ran 683) because it was the one
  live-tense gate-state site the docs-counts census never pinned —
  the badge-drift genus one document region deeper. The footer
  re-anchored + the census now mechanically ties its unit count to
  the UNIT constant. +1 RED-first pin; the revert battery on record
  (the stale form REDs exactly the footer pin, the badge/table pins
  untouched).
- **S42-3 (LOW, AUDIT-1 A2)** — the subsumed-arm annotations: three
  pre-existing provably-subsumed fallback arms — from-url's `|| "/"`
  (the leading-"/" guard guarantees a non-empty template; probed: 0
  empty returns across a 24-input adversarial battery), rate-limit's
  `?? "unknown"` (depth ≥ 1 + hops.length ≥ depth guarantee an
  in-bounds index), db-path's `!== cwd` conjunct (the helper returns
  only strict two-level ancestors) — all three KEPT with the
  subsumption named, the S28-8 belt-and-braces doctrine: these sit in
  security/correctness seams (the open-redirect guard, the rate-limit
  IP key, the family's most-bitten contract) where defensive arms
  stay annotated, not retired (the S41-3 retirement precedent applied
  to a round's OWN dead surface; these are long-standing seam
  defenses).
- **S42-1 (LOW, AUDIT-1 A1)** — the db-path note-tail truth: the
  S41-14 note shipped "Line-in-place; PAD §12's row is unchanged"
  while the same commit's PAD diff walked the row 335→339 and the
  file measures 339 (the note block itself added four lines) — the
  note asserted the plan's prediction, not the shipped state.
  Re-spelled to the truth with the correction noted.
- **S42-2 (LOW, AUDIT-1 A3)** — the verify-route docbook truth: "A
  correct code signs the account in and redirects to the dashboard" —
  no dashboard route exists (the S28-7 phantom-route genus); the
  handler returns the 200 envelope and the CLIENT navigates (the
  login card's router.push to the landing or the from_url target).
  Re-spelled to the truthful flow.
- **S42-4 (INFO→cure, AUDIT-1 A4)** — the limitReached "Kept:
  pin-owned" annotation + docblock re-spell (the S41-13 batch's
  missed sibling; the card inlines the comparison at its call site).
- **S42-5 (INFO→cure, AUDIT-1 A5)** — the api.ts donor-vestige
  disclosures: the N-67h comment's "The optional param keeps the
  zero-arg calls valid" names zero-arg calls that exist only in the
  NEO-CRM donor (this tree's seven call sites all pass the value);
  ok()'s `init` param carries no caller (all 13 sites default 200).
  Both annotated with the donor context — the affordable form over
  pin churn and API-face shrinkage.
- **S42-8 (LOW, AUDIT-2 L2)** — the design-tokens S41-5 rationale
  corrected at both sites: the 11 retired literals were dead SOURCE
  pins, never dead shipped bytes — the installed
  `@tailwindcss/postcss` 4.3.3 tree-shakes unused @theme variables
  (lead-verified against the built sheet, where the zero-consumer
  whole-family pins are absent). The retirement remains correct
  (source hygiene owned by the census); only the impact narrative was
  wrong. The session_41.md mirror re-spelled with the correction
  noted.

**Accepted/observed register (this round's tail, with reasons):** the
dependency-contract belt-and-braces (AUDIT-1 A7 — signup's
`split("@")[0] ?? ""` and the Zod `first?.message ??` fallbacks guard
a DEPENDENCY's contract rather than an own-code guard two lines up;
real defensive value, no action); the sitemap's
no-lastmod/changefreq posture (byte-parity with the reference's live
format — Google ignores the hints, a stale lastmod is worse than
none); the manifest's same-src icon pair (the reference platform's
own posture, documented S29-7); the e2e SEO arms' presence-level
shape (the unit layer owns the byte-exact contracts — the EXACTLY
ONE pin doctrine); the standing register carried forward unchanged.

## The count re-anchor

UNIT 683 → **686** (+1 the S42-6a localhost false-alarm pin in
boot-env; +1 the S42-7a toast call-site census in toast-anatomy; +1
the S42-9a footer lockstep pin in docs-counts), SUITES 40 unchanged,
E2E 65 unchanged, SMOKE 16 unchanged, badge 748 → **751**. Constants
re-anchored FIRST; the census walked the doc sites RED→GREEN (PAD
§12: from-url 37→43, rate-limit 135→141, db-path 339→349,
generation-counter 110→113, api 303→310; the ten provenance sites
(toast.tsx the owned tenth) re-anchored to 1..42 — lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The mutation batteries on record: S42-6 (the predicate reverted to
  the substring form → exactly the one pin RED, the true-positive
  pins GREEN), S42-7 (a planted 7th toast.error call → exactly the
  census RED), S42-9 (the footer re-anchored back to 681 → exactly
  the footer pin RED)
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 91/92 on the dev server (the owner-instructed posture, the
  session-29..41 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 751, the 40/686 rows, the session-42
  row, the closing footer + its lockstep pin); AGENTS (counts, the
  plans map's forty-second round); CLAUDE (counts); PAD (§8.1 40/686,
  §8.3 686/65/16, §12 rows); SKILL v1.37.0 → v1.38.0 (frontmatter,
  §0.5 1..42, Appendix A's session-42 row, Appendix B's header +
  counts, the pre-ship checklist); worklog Task 42; this session log;
  the plan's post-execution record

**Gate at the session-42 ship: lint 0/0 · tsc 0 · unit 686/686 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
