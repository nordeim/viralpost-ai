# Session 37 — The Transient-DB Classifier Hoist + The Teardown Inner-Catch + The Donor-Marker Completion + The Comment-Truth Batch (2026-11-12)

The round opened on the shipped tree (`2222697` — session 36's commit;
no owner narration commit followed, so this round runs directly on it).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.32.0),
then the session-36 set (session_36.md, the session-36 plan, worklog
Task 36). This round is session 37. Baseline gate GREEN at the
documented counts (lint 0/0 · tsc 0 · unit 665/665, 39 files · build
with the button-cursor rule in the emitted sheet · smoke 16/16 · e2e
65/65, 9 specs · census MATCH); the standing asks re-verified up front
(the `.env` `DATABASE_URL="file:../db/custom.db"` contract with `db/`
at the repo root; the vitest + playwright suites in place and current;
the sitemap/robots/manifest/OG family; `skills/` excluded from every
gate; the committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/3L/3I · AUDIT-3:
0C/0H/2L/4I** — combined **0 Critical / 0 High / 0 Medium / 7 Low /
8 Info**. The session-36 diff itself verified correct and complete on
all three passes (the cursor rule's placement + composition, the
teardown reorders' Promise semantics re-probed under bun 1.3.14 +
node, the donor markers' completeness at the enumerated cites, the
VALIDATION pin, the census widening — all honest against source).
AUDIT-1 caught the teardown both-fail masking and the transient-db
classification's reset-funnel-only scoping; AUDIT-2 caught the
donor-marker sweep's toast.tsx miss and the login-card note's
under-enumeration; AUDIT-3 verified every count claim live again and
caught the force-static posture's zero assertions, the lint-posture
under-disclosure, and the comment-truth tail.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, on the session-35/36 instrument lessons
applied from the start (`set viewport` + innerWidth confirms;
nav-anchored selectors calibrated against the reference's actual DOM —
no `<header>`, the bar is `<nav>`, the panel a nav div carrying
`md:hidden` + `overflow-hidden`, mounted only while open on the
reference). **21/21 faces raw MATCH, NO DRIFT — the tenth consecutive
fully-clean walk.** The mobile menu works as expected (the user's
standing concern): open at a confirmed 390×844, the panel display
block + max-height none, the five links + the Gumroad pill
byte-identical, both cursor faces pointer (the S36-1 cure holding),
the escape-close and focus-visible faces the documented supersets
(F11-11, S15-8 — the reference's panel stays open on Escape,
re-confirmed). Two instrument notes on the record: the desktop-nav
probe's raw output included OUR side's mounted-but-hidden panel
anchors (the reference unmounts its panel when closed) — the
comparator filters to the desktop family, 6|6 byte-identical,
observably identical either way; and **the login-lands face was
recorded at its precise form for the first time (S37-7)**: the
reference's post-login URL is `/Home` — its duplicate-of-`/` route
(which itself carries `canonical → /`, their own duplicate-content
mitigation; the investigation dossier's auth row has said "redirect
to `/Home`" since session 1) — while OURS is `/` via the documented
308 deviation (the Deviations Ledger's SEO duplicate-content row).
The sessions-35/36 recordings' "both land on `/`" were imprecise on
the reference's URL; the content parity was and remains true (both
render the landing, title `ViralPost AI`). The eight-plus-three sites
re-spelled this round; no behavior change (pushing `/Home` instead of
`/` would 308 to `/` anyway — identical end state — and serving
`/Home` as a duplicate would reverse a documented Ledger decision).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S37-1 (LOW)** — the teardown inner-catch: in the both-fail case
  (main rejects AND the awaited `$disconnect()` rejects), Promise
  `.finally` semantics made the finally's rejection SUPERSEDE main's —
  the trailing catch printed only the disconnect failure and the root
  cause never surfaced (probe-verified by the audit). All four
  one-shot chains (`prisma/seed.ts`, `scripts/e2e-prune.ts`,
  `scripts/e2e-contact-readback.ts`, `scripts/census.ts`) now
  inner-catch the disconnect inside the finally (logged +
  `process.exitCode = 1`) — the trailing catch only ever sees main's
  rejection, and both failures print. +1 pin RED-first (the inner-catch
  arm in db-census, all four scripts); the S35-3 arm's awaited-disconnect
  regex re-anchored to the prefix form (one face per pin — the S35-3
  arm owns "awaited in the finally", the S37-1 arm owns "the
  disconnect's own failure handled"); the planted-strip battery on
  record (seed's inner catch stripped → exactly the S37-1 arm RED, the
  S35-3 arm GREEN — the ownership separation proven).
- **S37-2 (LOW, pre-existing — F9-7 scoped the doctrine to the reset
  funnel)** — the transient-abort classifier hoist: the P2024
  (pool-connection timeout) / P2028 (transaction timeout) → 503
  `UNAVAILABLE` classification existed ONLY in the reset funnel; the
  other six DB-touching routes (login, signup, verify, resend, me,
  contact) blanket-caught to 500 `INTERNAL` — the same
  SQLITE_BUSY-class failure answered with two incoherent envelopes.
  The classifier (`isTransientDbFailure`) + the shared copy
  (`TRANSIENT_DB_MESSAGE`) now live in ONE place — `src/lib/api.ts`,
  the codes' one home; the six routes carry the arm ahead of
  `ERR.INTERNAL()` (login/me/contact also gained the `catch (error)`
  binding); the reset funnel's four local sites route through the
  shared helper with the wire byte-identical. +2 pins RED-first (the
  behavioral classifier spec — the codes owned behaviorally, true for
  P2024/P2028, false for P2002/generic/null/string — and the six-route
  adoption pin, the arm ahead of the residual); the F9-7 read-window
  assertion and the two auth-reset 503 pins re-anchored to the helper
  form (the pin-follows-the-code doctrine); the batteries on record
  (the classifier's P2024→P2029 inversion → exactly the spec RED; the
  login arm removal → exactly the adoption pin RED; the reset-funnel
  pins GREEN throughout the switch).
- **S37-3 (LOW, the S31-4/…/S36-2 donor-collision genus, completed)**
  — the donor-marker completion: toast.tsx (missed by the S36-2 sweep
  outright — the file's bare Session-131/D-131a0/a1, F-128c1/F-131c1,
  D-124a7, s128-s130, walk22 cites) gains its file-level lineage note
  at the first bare cite; login-card:85's enumeration extends to the
  file's remaining bare cites (the Session-147/s142/s145 family, S79-P2,
  M-79c3, L-79c6/c7/c11 — the last pointed at the mid-file L-79c8
  lineage note).
- **S37-4 (LOW, the S27-6 genus — a docs claim with zero assertions)**
  — the force-static SEO pin: the three SEO routes'
  `export const dynamic = "force-static"` posture (claimed at four doc
  sites) had ZERO test assertions — deleting the export would flip the
  routes to per-request rendering with every layer green. +1
  coverage-gap pin in seo-surfaces (GREEN-on-arrival, the S36-6a
  precedent); the planted-removal battery on record (robots' export
  deleted → exactly the pin RED).
- **S37-5 (LOW)** — the lint-posture disclosure: PAD §10.3's "both
  gates, never weakened" under-disclosed the config's deliberate
  27-rule off-list (the self-documented S25-18c posture in
  `eslint.config.mjs`'s header). Both PAD §10.3 and CLAUDE's
  anti-pattern line now name the off-list's breadth and its home; the
  gates always run as configured.
- **S37-6 (INFO→cure, the hygiene batch)** — (a) the seed comment's
  "no message" reworded to the precise form (the runtime prints its
  own unhandled-rejection diagnostic; what was missing is the
  application-level message); (b) the corpus register rounded to ONE
  form at the five live-truth sites — "the ~170 docs/tests/root text
  files plus the ~3,150-file skills/ catalog (92% of the non-src
  tree)", live-counted (167 text files + 3,157 skills at this round),
  the basis definable (`git ls-files`, non-src, non-skills, non-png);
  (c) the signup page's "the the" typo; (d) the iridescence
  early-return GL releases — the compile-fail, no-program, and
  link-fail paths now delete the shaders/program they created (+1 pin
  RED-first, the battery on record); (e) the verification-server
  pass-through pin (the S36-6b claim "utils.ts was the only src/lib
  module with zero test references" was loose — verification-server
  had only a prose-comment mention; closed for real with a behavioral
  round-trip pin in password-seam, GREEN-on-arrival, the wrong-wrapper
  battery on record); (f) README's session-35 row joins the S36-5d
  re-spell ("ten more sites marked" → the nine-blocks/ten-cites
  wording).
- **S37-7 (WALK-SOURCED comment-truth)** — the login-lands face
  re-spelled at all eleven enumerated 35/36-era sites (the two session
  logs, the two plans, worklog ×2, README ×2, the SKILL's Appendix-A
  rows ×3; the six 32/33/34-era recordings the enumeration missed
  re-spelled session-38, S38-4): "both land on the landing — the reference's URL `/Home`, its
  duplicate-of-`/` route; ours `/`, the documented 308 deviation". No
  behavior change (the Deviations Ledger row already governs).

**Accepted register (this round's tail, with reasons):** the
prefers-reduced-motion live-toggle gap (AUDIT-2 A2-3 — all four effect
components read the media query once at mount; a mid-session toggle
keeps the full-motion loops until reload. Parity-consistent: the
reference's react-bits effects handle it not at all — ours is already
a documented superset; the MediaQueryList-change subscription is a
behavioral change to four effect loops, deferred); the JSON-LD /
og:locale / twitter:site family (AUDIT-3 A3-6 — the reference ships
none of them; the head-census parity contract governs, the superset
opportunity recorded and deferred); the standing register carried
forward unchanged (the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the footer heading skip, the
S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The count re-anchor

UNIT 665 → **671** (+1 the S37-1 inner-catch arm in db-census, +2 the
S37-2 classifier spec + adoption pin in api-robustness, +1 the S37-4
force-static pin in seo-surfaces, +1 the S37-6d GL-release arm in
effects-motion, +1 the S37-6e pass-through pin in password-seam),
SUITES 39 unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 730 →
**736**. Constants re-anchored FIRST; the census walked the doc sites
RED→GREEN (the PAD §12 rows re-anchored to the live `wc -l`: api.ts
268→289, iridescence.tsx 254→269; the eight provenance sites (the count re-spelled session-38, S38-3 — the live census finds eight, the lead had counted toast.tsx's then-non-census phrase)
re-anchored to 1..37 — lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The six mutation batteries on record (S37-1's strip, S37-2's code
  inversion + arm removal, S37-4's export removal, S37-6d's delete
  removal, S37-6e's wrong wrapper — each exactly the designed pin RED,
  restored → GREEN)
- The parity walk post-cure: the twenty-one faces hold, the three
  superset faces adjudicated as documented — no drift
- Captures 81/82 on the dev server (the owner-instructed posture, the
  session-29..36 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero, PIL-verified
- Docs lockstep: README (badge 736, the session-37 row, the gate
  line, the two S37-6f/S37-7 re-spells in the history rows); AGENTS
  (counts, the plans map's thirty-seventh round); CLAUDE (counts, the
  status-discipline 503 line, the lint-posture anti-pattern scoping);
  PAD (§8.1, §8.2, §10.3, §12 rows, the api.ts row's classifier
  mention); SKILL v1.32.0 → v1.33.0 (frontmatter, §0.5 1..37, the
  Appendix-A session-37 row, Appendix B's header + body, the pre-ship
  checklist); the eight provenance sites re-anchored to 1..37; worklog
  Task 37; this session log; the plan's post-execution record

**Gate at the session-37 ship: lint 0/0 · tsc 0 · unit 671/671 (39
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
