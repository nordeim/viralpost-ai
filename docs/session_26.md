# Session 26 — The Mobile-Menu Cap Parity + The Busy-State Announcement + The Bar Open-Arm Retirement + The Pin-Doctrine Batch (2026-11-11)

The round opened on the pulled tree (`6a096fc` — the owner's session log
update holding the session-25 execution log, the established pattern).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.21.0),
then the session-25 set (session_25.md, the session-25 plan, worklog
Task 25, the prior session_26.md notes). This round is session 26.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
620/620, 38 files); the standing asks re-verified up front (the .env
DATABASE_URL contract with `db/` at the repo root, pushed + seeded,
census MATCH; the vitest + playwright suites current; the
sitemap/robots/manifest/OG family fresh; `skills/` excluded from every
gate). neo-crm re-checked at HEAD `b3d0fbe` — UNCHANGED since session
12; the recorded decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline; the agent-browser skill drove
the parity walk. Three parallel audit subagents dispatched (AUDIT-1
API/lib seams, AUDIT-2 components/pages/effects, AUDIT-3
SEO/configs/tests/docs) while the findings were hand-verified in source.
The audit returned **AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/1M/2L/2I ·
AUDIT-3: 0C/0H/3L/1I** — combined 0 Critical / 0 High / 1 Medium /
6 Low / 5 Info at the subagent reports. The lead's adjudication held the
Medium and five of the Lows in the working register (all cured this
round), and moved three findings to the accepted register with reasons
(the 3rd-generation result discard is reference parity, e2e-pinned; the
h2-first auth views are best-practice tier; the vitest
exclude-replaces-configDefaults note is moot under the include scope).

The parity walk (live, both sides, logged into the reference) ran the
head census (NO DRIFT — the session-19 description family holds), the
mobile-menu control census at 390×844 (the pill + the bare link family +
the Gumroad href byte-identical; the hamburger aria family remains
absent on the reference — our documented superset stands; the clone's
Escape-close + link-click close + focus returns + route-change
auto-close all live-verified), the desktop nav family (byte-identical),
the landing heading tree, the footer Product column (3 links both sides
— the S25-1 cure holds), sitemap + robots (identical, origin-difference
only), and the clone's generator round-trip (green, node A announcing
"Post generated — 2 free generations remaining today.").
**TWO LIVE-CENSUSED DIVERGENCES on the mobile-menu surface** (the round's
parity cures): the reference's open panel computes `max-height: none`
while ours capped at `max-h-96` (384px) with `overflow-hidden` and no
scroll path; and the reference's bar stays `bg-transparent` with the
menu OPEN at scrollY=0 while ours keyed its dark arm on
`scrolled || open`.

The session-26 plan written and validated against the codebase (the pin
landscape — a11y-controls' control pins, landing-page's order pins and
the client-boundary pin, seo-surfaces' og-dims arm, type-gate's config
pins, db-census's seam pins, db-path's fixture battery, docs-counts'
census constants), then executed with TDD throughout:

- **S26-1 (the panel height-cap parity, the round's parity cure)**: the
  pin RED first, then the cure — the panel's class family re-anchored
  to the reference's own (`md:hidden border-b border-white/10
  overflow-hidden` + the S22-5 superset arm + `hidden={!open}`); the
  max-h/opacity arms and transition-all RETIRED (the "inert dead
  classes" comment claim corrected — the cap was LIVE as a hard layout
  bound; the WCAG 1.4.4 clipping cured and the class parity landed in
  one edit). Live-verified post-cure: `max-height: none`, height 265.
- **S26-3 (the bar open-arm retirement)**: the pin RED first, then the
  cure — the bar's dark arm keys on `scrolled` alone (the reference's
  own key, live-verified transparent-with-menu-open); the
  desktop-cross artifact (the open state surviving a md breakpoint the
  panel/toggle do not, painting the unscrolled desktop bar dark) dies
  with the same edit. Live-verified post-cure: `rgba(0, 0, 0, 0)`.
- **S26-2 (the busy-state announcement, the round's a11y cure)**: the
  pin RED first, then the cure — node A gains the generating arm
  ("Generating your post…"); the pending window announces. Live-verified
  end-to-end: "Generating your post…" → "Post generated — 1 free
  generation remaining today." → "Daily free limit reached — upgrade to
  keep generating."
- **S26-5 (the SEO one-declaration completion)**: both twitter blocks
  ride `OG_IMAGE.url` (the hand-written literals retired; the S25-6 pin
  extends to the twitter consumption faces). Mutation-batteried.
- **S26-4 (the client-crypto census)**: the boundary pin's hardcoded
  13-file roster converted to a dynamic `"use client"` DISK CENSUS —
  a planted 14th client file REDs it where the roster was blind.
- **S26-6 (the config mechanics, pinned — and a latent bug cured)**:
  four pins added (the tsconfig `.mts` include, the tsconfig/eslint/
  vitest skills exclusions). Writing them SURFACED a latent bug in
  type-gate's shared stripper: the regex block-comment pass misfired on
  the `/*` inside tsconfig's glob strings (`"@/*"` opened a phantom
  block comment that swallowed the include array from the stripped
  view). Root cause fixed: the stripper is STRING-AWARE now (in-string
  state tracked; escaped quotes passed through); all existing pins
  re-run green.
- **S26-7/S26-8/S26-9 (the contract + comment-truth batch)**: the
  one-shot-script PrismaClient exemption codified in AGENTS + the
  URL-seam-mandatory form pinned (mutation-batteried); the seed's
  update branch gains `avatarColor` + `photoUrl` (the "resets every
  seeded field" claim true); the db-path `:memory:` pass-through arm
  (RED-first pin — the guard comment now truthful).

The count re-anchor: UNIT 620 → 629 (+9 pins), SUITES 38 unchanged,
E2E 63 unchanged, badge 683 → 692; the PAD §12 rows (db-path 272, site
202, navbar 233, generator-card 266); the census walked RED-to-GREEN
site by site. Appendix A's 25/24 tail inversion (the session-25
S25-18e re-sort's residue) fixed in the same commit.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
629/629 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 59/60 taken on the dev server (the cured open
mobile menu at 390×844 — the max-height:none panel + the transparent
bar; the generator paywall with the focus-landing heading), PIL-verified;
the cured surfaces live-verified. README (the session-26 row, the gate
line, the badge 692, the counts); AGENTS (counts, the db-path exemption
wording, the plans map's twenty-sixth round); CLAUDE (counts); PAD (§12
rows, the test-distribution table, the counts); SKILL v1.21.0 → v1.22.0
(frontmatter, Appendix A's session-26 row + the chronological tail fix,
Appendix B both counts + the session-26 re-certification); worklog Task
26; this log; the plan's post-execution record. The Conventional Commit
and the SSH-wrapper push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the merged tree (`6a096fc`) passed lint 0/0 · tsc 0 ·
unit 620/620 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 1 Medium / 6 Low / 5 Info.**

**The parity walk (both sides, live): TWO DIVERGENCES** — both on the
mobile-menu surface (the panel's 384px cap vs the reference's
max-height:none; the bar's open-keyed dark arm vs the reference's
transparent-with-menu-open render). Every other control surface
byte-identical; the hamburger aria family remains our documented
superset; the S25-1 footer cure holds.

**The cures:** +9 unit pins — the panel height-cap parity, the bar
open-arm retirement, the busy-state announcement, the SEO one-declaration
completion, the client-crypto disk census, the four config-mechanics
pins (which surfaced and cured the latent type-gate stripper bug — the
regex block-comment pass misfiring on glob strings), the one-shot-script
URL-seam pin, and the :memory: passthrough pin; the seed's pristine
reset completed.

**Verified:** unit **629/629** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 692 · captures 59/60 PIL-verified ·
the cured surfaces live-verified (panel max-height none + height 265 +
transparent bar with the menu open; the busy → success → limit
announcement sequence; the paywall's focus landing). Six docs + SKILL
v1.22.0 in lockstep. **Deferred:** the accepted register carried forward
(the 3rd-generation result discard — a superset opportunity for the
owner's ledger; the h2-first auth views; the vitest exclude note; the
__Host- cookie prefix + no-store hardening notes).
