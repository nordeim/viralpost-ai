# Session 46 — The force-dynamic Route Census + The Mobile-Menu Censused-Parity e2e Pins + The cwdFallbackUrl Wiring Pin + The Comment-Truth Batch (2026-11-13)

The round opened on the shipped tree (`e3d071a` — session-45's
commit; the owner's narration commit `1cb15e2` followed, carrying
session_46.md as the round-45 narration — replaced now by this
round's formal log). The core docs read in full (AGENTS, CLAUDE,
README, PAD, SKILL v1.41.0), then the session-45 set (session_45.md,
the session-45 plan, worklog Task 45, the owner narration). This
round is session 46. Baseline gate GREEN at the documented counts
(lint 0/0 · tsc 0 · unit 701/701, 40 files · build · smoke 16/16 ·
e2e 65/65, 9 specs · census MATCH); the standing asks re-verified up
front (the `.env` `DATABASE_URL="file:../db/custom.db"` contract
recreated on the fresh clone with `db/` at the repo root — db:push +
db:seed → census MATCH; the vitest + playwright suites in place and
current — the chromium-1248 gap cured with the documented one-time
`bunx playwright install chromium`; the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk;
`skills/` excluded from every gate; the committed `.env.example`
matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked for pattern currency per the standing
instruction (its latest round — its session-217 / file
session_459.md — continues the semantic-prose census genus with its
mutation-battery discipline catching a third consecutive pin
BIRTH-DEFECT, the REDUNDANT ARM; patterns current, stack pins
identical, the lesson APPLIED this round: every new arm checked for
single-tooth ownership, the batteries prove it).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead: the
force-dynamic grep across tests/ (only a login-views comment names
it), the join-math trace of the S45-1 artifact-only sentence (the
dirname check tests `<cwd>/db` — the trace EXCLUDES `db/**` and
ships `prisma/`; the on-disk artifact confirmed: `prisma/` present,
`db/` absent), the PAD §11 citation drift (the useLayoutEffect at
navbar.tsx:111, cited at :103), the prisma-env.ts un-hedged
bun-absolutization header, and the mobile-navigation spec's full
read (6 tests; no Logo/outside-tap pins)):
**AUDIT-1: 0C/0H/1M/4L/5I · AUDIT-2: 0C/0H/0M/1L/2I · AUDIT-3:
0C/0H/0M/2L/2I** — combined **0 Critical / 0 High / 1 Medium / 7 Low
/ 9 Info**. The session-45 diff itself verified correct and complete
on all three passes (the cwdFallbackUrl extraction
behavior-equivalent and consumed at one site; the census arms
single-tooth).

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL CLONE FACES
MATCH — the nineteenth consecutive clean walk — no clone-side drift,
no NEW reference-side drift** (the session-45 404-title bare posture
persists: /NoSuchRoute, /Dashboard, /page2 re-probed — bare
"ViralPost AI" + HTTP 200 on all; ours keeps the derived title as
the documented superset, the S23-1 flip-flop doctrine). One
reference-side DETAIL observed (not a drift): the reference's dead
generator now surfaces a failure toast — "Generation failed, so this
attempt didn't use one of your free tries. Please try again." — with
the button settling back (zero hashtags, no Copy; the 402-dead core
stands) — recorded on evidence-ledger D-1 (the S46-11 note).

The mobile menu works exactly as expected (the owner's standing
concern): the panel byte-identical both sides (the four nav links —
Home's teal `text-teal-400` rgb(45,212,191) active face, the
siblings' `text-slate-300` rgb(203,213,225) — plus the Gumroad pill
"Upgrade to Pro – $19" at the templixco href; identical colors,
14px/500-600 typography, display block + max-height none, the
transparent-over-hero bg chain); the hamburger cursor pointer both
sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded family the
documented superset); Escape leaves the reference's panel open (our
F11-11 superset verified closing with focus returned to the toggle);
the same-route Logo click leaves the panel open on BOTH sides
(re-censused live: the reference's own /Home logo on /Home, ours
pathname-inert through the /Home→308→/ round-trip); a real click on
page content below the open panel leaves it open on BOTH sides
(re-censused live: the hero paragraph on both sides); route-change
close + auto-close verified; the desktop nav byte-identical (brand +
4 links + the Upgrade pill, the active face following the route);
the five-route head census identical modulo origin (the reference's
og/canonical render client-side — its SPA posture; ours ship SSR);
sitemap 4 URLs both + robots identical modulo origin; the generator
probe symmetrically dead/live (R: the failure toast, no generation;
L works — 7 hashtags + the copy button, the documented superset);
the login round-trip both landing the landing (R `/Home`, L `/` —
the documented 308 deviation), the clone session verified live via
/api/auth/me (`sepnetflix2023@outlook.com`, role admin).

## The cures (TDD — every census arm battery-planted, the mutation batteries per the house doctrine; the neo-crm session-217 redundant-arm lesson applied — every new arm single-tooth)

- **S46-1 (MEDIUM, AUDIT-1 M1)** — the force-dynamic route census:
  the API route family's dynamic posture was pinned NOWHERE (the
  SEO family's force-static was — S37-4) while all 13 route files
  carry the export by convention. Cure: a disk-derived recursive
  walk over `src/app/api/**/route.ts` in
  `tests/api-robustness.test.ts` (comment-stripped assertion — a
  NEW route missing the export trips the arm on its first gate
  run). Battery on record: health's export dropped → exactly the
  arm RED / 24 GREEN; restored byte-identical.
- **S46-5 (LOW, AUDIT-2 L1)** — the mobile-menu censused-parity e2e
  pins: the session-45 do-not-"fix" postures (the same-route Logo
  face + the outside-tap face) were comment-guarded only. Cure: +2
  e2e pins in `mobile-navigation.spec.ts`, both faces walk-verified
  live on both sides this round. One calibration at birth: the
  first shape tripped strict mode (the Logo renders in BOTH the
  navbar and the footer — the same aria-label twice; scoped to the
  navigation, the multi-subtree DOM trap).
- **S46-6 (INFO→cure, AUDIT-1 I1)** — the cwdFallbackUrl wiring
  pin: the session-45 seam-logic pins cannot reach the consumption
  face (the module anchor always wins in the unit environment). Cure:
  the S29-2 source-census idiom — the call shape
  `cwdFallbackUrl(process.cwd(), pathRef, query)` + the
  null→rawUrl fall-through + the no-re-inline negative, asserted
  textually in `tests/db-path.test.ts`. Battery on record: the seam
  consumption removed (the arm inlined back) → exactly the wiring
  pin RED / 45 GREEN — the 3 seam-logic pins stay GREEN, the
  single-tooth split proven.
- **S46-2 (LOW, AUDIT-1 L1)** — the artifact-only sentence re-spell:
  the S45-1 header's mechanism was wrong for the mandated ref (the
  dirname check tests `<cwd>/db` — excluded from the trace — not
  the traced `prisma/`); the arm fires only when the operator
  supplies the db folder; the traced-prisma shape satisfies it only
  for a `file:custom.db`-style ref. Comment-truth only — the
  seam's never-mkdir posture is itself the documented, correct
  behavior.
- **S46-3 (LOW, AUDIT-3 L2)** — the bun-header hedges: the S45-2
  conditional truth applied to the three un-hedged sites
  (prisma-env.ts's header — the strongest — plus the seed.ts
  parenthetical and the e2e-prune.ts historical mention).
- **S46-4 (LOW, AUDIT-3 L1)** — the PAD §11 citation re-anchor: the
  brittle navbar line-number retired for the stable effect-name
  form (the 95→103→111 drift genus noted in the row).
- **S46-7/S46-8/S46-9 (INFO→cure)** — the comment-truth notes: the
  api.ts two-code 503 taxonomy (UNAVAILABLE vs the health route's
  pinned SERVICE_UNAVAILABLE), the auth.ts re-export consumer
  census (signup/login ride it; the four siblings import the seam
  directly), the db-path.ts `.env`-only-face note on
  readDatabaseUrlFromEnvAt.
- **S46-10 (INFO→cure, AUDIT-3 I1)** — the docs-counts local
  stripComments copies retired (delegate to the module-level S45-9
  helper — the one-idiom doctrine).
- **S46-11 (the walk's observation)** — the D-1 evidence-ledger
  note: the reference's dead generator now surfaces a failure toast
  (the "hangs forever / no error UI" posture stale on the toast
  detail; the 402-dead core stands; the clone's superset rationale
  re-anchored — the working generation remains ours alone).

**Accepted/observed register (this round's tail, with reasons):** the
detectNiche bidirectional substring shape (I3 — "hair" contains
"ai" → the tech bank; deterministic, contract-compliant,
content-quality only); the proxyHopDepth parseInt semantics (I4 —
"0x2" → 0 silently; the boot gate deliberately mirrors the seam's
parse, unparsable fails closed); the setSessionCookie unit-pin gap
(I2 — a thin next/headers adapter exercised end-to-end by the e2e
auth/session specs; behavior covered); the standing accepted
residuals (I5 — the signup first-admin race, the verify/resend
read-then-write pair, the enumeration faces, the single-node
limiter); the 404/error main-landmark posture (censused parity —
the reference's own 404 carries none); the smoke-leg retired-form
negatives (theoretical — the S28-6 constant census owns the
number); the PAD §11 line-citation genus (noted in the row — the
S46-4 cure prefers the stable effect-name form).

## The count re-anchor

UNIT 701 → **703** (+1 api-robustness: the force-dynamic route
census; +1 db-path: the wiring pin), SUITES 40 unchanged, E2E 65 →
**67** (+2 mobile-navigation: the censused-parity pins), E2E_SPECS 9
unchanged, SMOKE 16 unchanged, badge 766 → **770**. Constants
re-anchored FIRST; the census walked the doc sites RED→GREEN (one
arithmetic slip caught by the census itself: the badge set to 769
first, the badge-drift pin demanded 770 = 703+67 — the census's own
arithmetic guard working exactly as designed); PAD §12 rows
re-anchored to the live `wc -l` (db-path 437→453, api 310→315, auth
196→202); the ten provenance sites re-anchored to 1..46 — lag 0 at
ship; SKILL v1.41.0 → v1.42.0.

## Verified

- The full gate on the exact commit tree (below)
- The two mutation batteries single-tooth on record: S46-1 (the
  health export-removal → exactly the census arm RED / 24 GREEN),
  S46-6 (the inline-back → exactly the wiring pin RED / 45 GREEN,
  the 3 seam-logic pins GREEN — the single-tooth split)
- The redundant-arm check (the neo-crm session-217 lesson): every
  new arm verified single-tooth — S46-1a owns the API family's
  dynamic axis (the S37-4 arm owns the SEO family's, disjoint file
  sets), S46-6a owns the wiring face (the session-45 pins own the
  logic faces), S46-5a owns the two interaction faces (the spec's
  six tests enumerated — no existing pin touches them)
- The parity walk post-cure re-run: the standing faces hold, no
  drift
- Captures 99/100 on the dev server (the owner-instructed posture,
  the session-29..45 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 770, the 40/703 + 9/67 rows, the
  session-46 row on the continuous table, the re-anchored footer);
  AGENTS (counts, the plans map's forty-sixth round); CLAUDE
  (counts); PAD (§8.1 40/703 + 67, §8.3 703/67/16, §12's
  db-path/api/auth rows, §11's stable-name citation); SKILL
  v1.41.0 → v1.42.0 (frontmatter, §0.5 1..46, Appendix A's
  session-46 row, Appendix B's header + counts, the pre-ship
  checklist); worklog Task 46; this session log; the plan's
  post-execution record

**Gate at the session-46 ship: lint 0/0 · tsc 0 · unit 703/703 (40
files) · build · smoke 16/16 · e2e 67/67 (9 specs) · census MATCH.**
