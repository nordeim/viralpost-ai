# Session 25 — The Footer-Column Parity + The Generator-Status Superset + The Paywall Focus + The Landing Dedup + The Audit Batch (2026-11-11)

The round opened on the pulled tree (`20c8468` — the owner's
session_25.md post holding the session-24 round log, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD,
SKILL v1.20.0), then the session-24 set (session_24.md, the
session-24 plan, worklog Task 24). This round is session 25. Baseline
gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit 613/613,
38 files); the standing asks re-verified up front (the .env
DATABASE_URL contract with `db/` at the repo root, census MATCH; the
vitest + playwright suites current; the sitemap/robots/manifest/OG
family fresh; `skills/` excluded from every gate). neo-crm re-checked
at HEAD `b3d0fbe` — UNCHANGED since session 12; the recorded decisions
stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit
subagents dispatched (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) while the
findings were hand-verified in source. The audit returned **AUDIT-1:
0C/0H/1M/2L/7I · AUDIT-2: 0C/0H/2M/5L/2I · AUDIT-3: 0C/0H/2M/5L/4I**
— combined 0 Critical / 0 High / 5 Medium / 12 Low / 13 Info at the
subagent reports. The lead's adjudication held the five Mediums in the
working register (all cured this round), moved the reference-inherited
text-ink family and the UA-default focus posture on reference-owned
link families to the accepted register (the parity doctrine — the
house cures NON-TEXT contrast on house-owned arms and leaves the
reference's own extracted classes byte-identical), and carried the
standing accepted register unchanged.

The parity walk (live, both sides, logged into the reference) ran the
head census (NO DRIFT — the session-19 description family holds), the
mobile-menu control census at 390×844 (the pill + the bare link
family + the Gumroad href byte-identical; the hamburger aria family
remains absent on the reference — our documented superset stands), the
desktop nav family (byte-identical), the landing heading tree
(identical), sitemap + robots (identical, origin-difference only), and
the clone's generator round-trip (green) + Escape-close with focus
return (live-verified). **ONE DRIFT: the footer's Product column** —
the reference ships Home/Tool/Pricing (3 links; the dossier has
recorded the family since session 1); ours mapped all four NAV_ROUTES
(Contact included, shipped since session 1 — the footer column was
never in the side-by-side census set until this round).

The session-25 plan written and validated against the codebase (the
pin landscape — landing-page's footer/order describes, a11y-controls'
control pins, error-boundaries' boundary pins, toast-anatomy's store
pins, page-titles' siteUrl describe, boot-env's shape pins,
seo-surfaces' og-dims arm, docs-counts' census constants), then
executed with TDD throughout:

- **S25-1 (the footer-column parity, the round's parity cure)**: the
  pin RED first (the filtered form + the unfiltered map banned), then
  the cure — the footer's Product column maps
  `NAV_ROUTES.filter((r) => r.id !== "contact")` (the navs keep all
  four routes); live-verified on the dev server post-cure (3 links).
- **S25-2 (the generator-status superset, the round's a11y cure)**:
  the pin RED first, then two sr-only `role="status"` regions ride the
  generator card OUTSIDE the limit branch — node A the generation/
  limit text, node B the copy confirmation. Live-verified end-to-end
  ("Post generated — 2 free generations remaining today."); the e2e
  quota locator co-disambiguated (`{ exact: true }`).
- **S25-3 (the auth-ring AA upgrade)**: the three input constants'
  `focus:ring-slate-400` (≈2.57:1) upgraded in place to slate-600
  (≈7.5:1) — the S24-4 form; the sub-3:1 form banned in the pin
  (string-literal context; the DOM-record comments co-noted).
- **S25-4 (the siteUrl non-bare-origin cure)**: the seam falls back
  to the default on any query/hash/userinfo-carrying origin (the
  sitemap-XML corruption vector), and the boot gate warns on the
  query-carrying shape; pinned both sides.
- **S25-5/S25-12 (the exactly-one-pin sweep)**: the auth.test.ts
  password-hashing describe (−4) and the http-headers content-type
  trio (−3) retired — password-seam and seo-surfaces own the faces.
- **S25-6 (the OG_IMAGE one-declaration)**: the dims live in ONE
  exported const the factory AND the root layout consume; the pin
  covers the declaration, the consumption, and bans the hand-declared
  block.
- **S25-7/S25-9 (the toast correctness pair)**: the store seeded from
  EMPTY_TOASTS (the S24-5 post-hydration render actually cured) and
  the dismiss glyph rests at text-muted (4.76:1).
- **S25-8 (the boundary announcements)**: both error boundaries carry
  `role="alert"` on the crash card root.
- **S25-10/S25-11 (the count-gate hygiene)**: the count-ladder's s24
  row appended; the Appendix-B existence guards made real (indexOf —
  mutation-batteried with a planted-absent header).
- **S25-13 (the ContactSection dedup)**: the S24-8 genus completed —
  both pages render the shared component; the order pin co-updated.
- **S25-14 (the client-crypto boundary)**: FREE_LIMIT moved to
  generation-counter.ts (the client-safe quota module); the boundary
  pinned across all 13 "use client" files.
- **S25-15/S25-16 (the focus-landing pair)**: the paywall swap lands
  focus on its heading (transition-guarded; the mount-settle path
  silent — live-verified), and the mobile menu's link-click returns
  focus to the toggle.
- **S25-17/S25-18 (the coverage + hygiene tail)**: the og:url/
  twitter:url e2e arms folded in place; the e2e-prune manual-run
  comment + awaited disconnect; the eslint posture documented; the
  skip-link redundant assertion dropped; the SKILL Appendix A rows
  re-sorted chronologically.

The count re-anchor: UNIT 613 → 620 (+14 new pins − 7 retired), SUITES
38 unchanged, E2E 63 unchanged, badge 676 → 683; the PAD §12 rows
(generator 457, generation-counter 110, site 199, navbar 219,
generator-card 259); the census walked RED-to-GREEN site by site.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
620/620 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 57/58 taken on the dev server (the landing
full-page with the cured 3-link footer at 1280×800; the mobile paywall
at 390×844), PIL-verified; the cured surfaces live-verified. README
(the session-25 row, the gate line, the badge 683, the counts); AGENTS
(counts, the plans map's twenty-fifth round); CLAUDE (counts); PAD
(§12 rows, the test-distribution table, the counts); SKILL v1.20.0 →
v1.21.0 (frontmatter, Appendix A's session-25 row + the chronological
re-sort, Appendix B both counts + the session-25 re-certification);
worklog Task 25; this log; the plan's post-execution record. The
Conventional Commit and the SSH-wrapper push follow (dry-run first,
key shredded after).

## The round (summary)

**Baseline:** the merged tree (`20c8468`) passed lint 0/0 · tsc 0 ·
unit 613/613 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 5 Medium / 12 Low /
13 Info.**

**The parity walk (both sides, live): ONE DRIFT** — the footer's
Product column (ours shipped Contact; the reference ships
Home/Tool/Pricing). Every other control surface byte-identical; the
hamburger aria family remains our documented superset.

**The cures:** +14 unit pins, −7 retired faces — the footer-column
parity, the generator-status superset, the auth-ring AA upgrade, the
siteUrl non-bare-origin cure, the exactly-one-pin sweep (the auth
password duplicate + the http-headers content-type trio retired), the
OG_IMAGE one-declaration, the toast store seed + the dismiss glyph,
the boundary announcements, the count-gate hygiene (the ladder row +
the real existence guards), the ContactSection dedup, the
client-crypto boundary, the paywall + menu-click focus landings, and
the coverage/hygiene tail.

**Verified:** unit **620/620** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 683 · captures 57/58 PIL-verified ·
the cured surfaces live-verified. Six docs + SKILL v1.21.0 in
lockstep. **Deferred:** the accepted register carried forward (the
parity-doctrine text-ink and UA-default-focus adjudications joined the
standing entries — each with its reason on record in the plan).
