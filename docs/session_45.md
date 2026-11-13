# Session 45 — The cwd-Fallback Seam Pins + The Bun-Header Truth Hedge + The Dep-Count & Model-List Census + The Reference 404-Title Drift Record + The Censused-Parity Batch (2026-11-13)

The round opened on the shipped tree (`3331945` — session-44's
commit; the owner's narration commit `89e8930` followed, carrying
session_45.md as the round-44 narration — replaced now by this
round's formal log). The core docs read in full (AGENTS, CLAUDE,
README, PAD, SKILL v1.40.0), then the session-44 set (session_44.md,
the session-44 plan, worklog Task 44, the owner narration). This
round is session 45. Baseline gate GREEN at the documented counts
(lint 0/0 · tsc 0 · unit 696/696, 40 files · build · smoke 16/16 ·
e2e 65/65, 9 specs · census MATCH); the standing asks re-verified up
front (the `.env` `DATABASE_URL="file:../db/custom.db"` contract with
`db/` at the repo root; the vitest + playwright suites in place and
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
BIRTH-DEFECT, the REDUNDANT ARM; patterns current, the lesson
APPLIED this round: every new arm checked for single-tooth
ownership, the batteries prove it).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead: a fresh
bun-absolutization probe on the pinned bun 1.3.14 reproducing
AUDIT-1's non-reproduction (`bun <file>`, `bun run <script>`,
`bun -e`, `bun x prisma` all see the RAW relative `file:` value), a
full trace of the Logo's close-arm family, and mechanical
verification of every unpinned count site against disk):
**AUDIT-1: 0C/0H/0M/2L/2I · AUDIT-2: 0C/0H/0M/1L/3I · AUDIT-3:
0C/0H/0M/3L/4I** — combined **0 Critical / 0 High / 0 Medium / 6 Low
/ 9 Info**. The session-44 diff itself verified correct and complete
on all three passes.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL CLONE FACES
MATCH — the eighteenth consecutive clean walk — with ONE
REFERENCE-SIDE DRIFT FOUND: the first since session-23's
hamburger-aria flip.** The reference's unknown-route derived title
NO LONGER REPRODUCES: four probed unknown routes (/NoSuchRoute,
/Dashboard, /Whatever, /page2) all ship the BARE "ViralPost AI"
title today — SSR HTML title and settled SPA document.title alike —
while session-2's capture pinned the `<StartCase(last segment)> |
ViralPost AI` derivation across 17 live path shapes. The known-route
title family still holds (`/Tool` → "Tool | ViralPost AI" both
sides); the 404 body still matches byte-for-byte. The S23-1
flip-flop doctrine governs: ours KEEPS the derived title
(test-pinned, ADR-006, SEO-meaningful) as the documented superset,
and the drift is RECORDED — the Deviations Ledger row
(implementation-plan §6), reference-investigation §3.7's bracketed
note, the README deviations-table re-anchor, the route-title.ts
header note, the ADR-006 context bracket. Never chase a reference
deploy that removes a superset.

**Three NEW censuses** closed the audit's uncensused surfaces (the
mobile menu works as expected — the owner's standing concern): (1)
the Logo click on the SAME route leaves the panel open on BOTH
sides (the reference's own `/Home` logo on `/Home`, probed live; our
`/Home`→308→`/` navigation resolves before the pathname commits, so
the adjust block never fires — pathname-inert, like the reference's
same-route face); the cross-page Logo click closes on both sides
(ours adds the focus-return superset, live-verified to the toggle);
(2) a real click/tap OUTSIDE the open panel leaves it open on BOTH
sides (synthetic + real click on the reference's hero portrait);
(3) the reference's own 404 page carries NO `<main>` landmark
(ours matches — parity). The standard battery re-verified: the panel
enumerated live and byte-verified against ours (the four nav links —
Home's teal `text-teal-400` rgb(45,212,191) active face, the
siblings' `text-slate-300` rgb(203,213,225) — plus the Gumroad pill
"Upgrade to Pro – $19", the same templixco href; identical colors,
14px/500-600 typography, display block + max-height none, the
transparent-over-hero bg chain); the hamburger cursor pointer both
sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded family the
documented superset); Escape leaves the reference's panel open (our
F11-11 superset verified closing with focus returned). The desktop
nav byte-identical (brand + 4 links + the Upgrade pill, teal active
face); the five-route head census identical modulo origin; sitemap
4 URLs both + robots identical modulo origin; the generator probe
symmetrically dead/live (R: no generation lands — zero hashtags
after the probe; L works — 7 hashtags + the copy button, the
documented superset); the login round-trip both landing the landing
(R `/Home`, L `/` — the documented 308 deviation), the clone session
verified live via /api/auth/me (`sepnetflix2023@outlook.com`, role
admin).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S45-1 (LOW, AUDIT-1 A1)** — the cwd-fallback seam pins: the CWD
  last-resort arm — the third of S44-1's "three consumption sites" —
  shipped with ZERO pin coverage (in the unit environment the module
  anchor always wins, so `resolveDatabaseUrl` tests never reach the
  arm; its query re-append and exists/dirname guard were revertable
  through a green gate). Cure: the arm's decision extracted as the
  exported pure `cwdFallbackUrl(cwd, pathRef, query, exists)` seam
  (the urlForRoot testing precedent), consumed by
  `resolveDatabaseUrl`; +3 RED-first pins (the dirname-join face —
  the `<cwd>/prisma/<ref>` mirror rule, the query-preserved face,
  the neither-exists→null face). Three batteries on record: the
  exists-check revert (exactly 1 RED / 44 GREEN), the query revert
  (exactly 1 RED), the prisma-join revert (2 RED — the documented
  path-base co-trip: both the dirname-join pin and the query pin
  assert the resolved base).
- **S45-2 (LOW, AUDIT-1 A2)** — the bun-header truth hedge: the BUN
  ABSOLUTIZATION header stated the rewrite as an unconditional fact;
  the lead's fresh probe on the pinned bun 1.3.14 (independently
  reproducing the audit's probe) saw the RAW relative value through
  every probed shape. Re-spelled to the invocation/version-
  conditional truth — historically real (F11-18 live-reproduced
  `bun run start` end-to-end; the parent-of-repo signature is real
  in deployed shapes) — with the regime-agnostic resolution spelled:
  no-rewrite → the raw relative value misses both signature arms and
  resolves through the anchor tail; rewrite → the signature arms
  catch it; both postures land on `<repo>/db/custom.db`.
- **S45-3/S45-4 (LOW/INFO→censused, AUDIT-2 L1/I2)** — the
  censused-parity comment batch: the Logo same-route and outside-tap
  faces were flagged as uncensused close-arm gaps; the live census
  proved both PARITY (see the walk). The navbar's comment block now
  records the censused postures with the do-not-"fix" warning (a
  future close arm on the same-route Logo face would DIVERGE from
  the reference's censused behavior). No code change.
- **S45-5 (LOW, AUDIT-3 D1)** — the PAD §12 smoke-leg site joins
  the S44-4a census arm in place (the fourth prose site — pinned
  only for its line count before). The planted-drift battery
  (16-leg → 15-leg → exactly the arm RED) on record.
- **S45-6 (LOW, AUDIT-3 D2)** — the dep-count census: the
  "EIGHT packages" runtime-dependency surface derives from
  package.json on disk — the PAD sentence's backticked names
  set-equal the deps both directions (the S28-2 exact-set form; the
  slice bounds exclude the `prisma` devDependency clause), and both
  word-form sites (PAD §1.2 + SKILL §2) derive through a one-home
  count→word map. The planted-9th battery on record (exactly the arm
  RED). One calibration at birth: the PAD sentence wraps across
  lines — the phrase assertion normalizes whitespace (the neo-crm
  s167 lesson).
- **S45-7 (LOW, AUDIT-3 D3)** — the model-list census: the model
  LIST derives from `prisma/schema.prisma` on disk (`/^model (\w+)
  \{/gm`, floor 2); each derived name must appear in PAD §4.1's
  mermaid slice AND CLAUDE's models sentence; both "Two models"
  word-form sites (CLAUDE §Data Layer + PAD §4.2) derive through a
  one-home count→word map. The S40-11 fields arm keeps the fields
  face — the documented co-pin (a removed PAD §4.1 block trips both,
  battery-proven). The third-model battery on record (a planted
  `model TempProbe` → exactly the arm RED).
- **S45-8 (INFO→cure, AUDIT-3 D4)** — the HSTS fold: the third
  security header (`strict-transport-security: max-age=31536000`)
  joins its two live-asserted siblings inside the existing e2e
  headers test (the S25-17 in-place form — no count change).
- **S45-9 (INFO→cure, AUDIT-3 D5)** — the S44-5a comment-strip: the
  off-list census reads comment-stripped `eslint.config.mjs` (the
  S38-7f idiom, the seo-surfaces spelling) — a future explanatory
  comment carrying the `: "off"` literal can no longer inflate the
  count.
- **S45-10 (INFO→cure, AUDIT-3 D6)** — the dead `?? ""` retired at
  its last site (the S39-12 genus; `read()` is `readFileSync` —
  non-nullable).
- **S45-11 (the walk's find)** — the reference 404-title drift
  record: five sites (the Deviations Ledger row, the evidence
  ledger's bracketed note, the README deviations-table re-anchor,
  the route-title.ts header note, the ADR-006 context bracket). No
  code change — ours keeps the derived title as the documented
  superset.

**Accepted/observed register (this round's tail, with reasons):** the
`#`-containing-POSIX-filename edge (A3 — the engine treats `#` as a
literal filename character while `decomposeFileRef` applies URL
semantics; pathological operator shape, the S44 junk-prevention
rationale sound); the Windows-form RELATIVE ref on a POSIX host (A4
— the S33-2 absolute family is modeled, the cross-platform shape is
not; no live caller); the 404/error main-landmark posture (I1 —
censused parity: the reference's own 404 carries none; axe's
landmark-one-main is a best-practice rule outside the wcag2* tag
set); the noValidate password-length posture (I3 — the server guard
owns the rule cleanly with the exact message; the helper text
describes the password requirement, not the client's enforcement);
the AGENTS plans-map tail (D7 — enumeration-drift genus, anchored
only at its head); the standing register carried forward unchanged.

## The count re-anchor

UNIT 696 → **701** (+3 db-path: the cwdFallbackUrl seam pins; +2
docs-counts: the S45-6a deps arm, the S45-7a model-list arm — the
S45-5a extension and the S45-8 HSTS fold are IN PLACE, +0), SUITES
40 unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 761 →
**766**. Constants re-anchored FIRST; the census walked the doc
sites RED→GREEN (PAD §12: db-path 400→437, navbar 268→280,
route-title 62→75 — the drift-record header); the ten provenance
sites re-anchored to 1..45 — lag 0 at ship; SKILL v1.40.0 →
v1.41.0.

## Verified

- The full gate on the exact commit tree (below)
- The eight mutation batteries on record: S45-1 (three forms — the
  exists-check revert → exactly 1 RED / 44 GREEN, the query revert →
  exactly 1 RED, the prisma-join revert → 2 RED, the documented
  path-base co-trip), S45-5a (the PAD 15-leg drift → exactly the
  extended arm RED), S45-6a (the planted 9th dep → exactly the arm
  RED), S45-7a (the PAD User-block removal → the arm + the S40-11
  co-pin RED, the documented shape; the planted third model →
  exactly the arm RED)
- The redundant-arm check (the neo-crm session-217 lesson): every
  new arm verified single-tooth — no existing pin duplicated, the
  co-pins documented in the arms' comments
- The parity walk post-cure re-run: all clone faces hold, the
  reference drift adjudicated as documented
- Captures 97/98 on the dev server (the owner-instructed posture,
  the session-29..44 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 766, the 40/701 rows, the session-45
  row on the continuous table, the re-anchored footer, the
  deviations-table re-anchor); AGENTS (counts, the plans map's
  forty-fifth round); CLAUDE (counts); PAD (§8.1 40/701, §8.3
  701/65/16, §12's db-path/navbar/route-title rows, the ADR-006
  bracket); SKILL v1.40.0 → v1.41.0 (frontmatter, §0.5 1..45,
  Appendix A's session-45 row, Appendix B's header + counts, the
  pre-ship checklist); worklog Task 45; this session log; the
  plan's post-execution record

**Gate at the session-45 ship: lint 0/0 · tsc 0 · unit 701/701 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
