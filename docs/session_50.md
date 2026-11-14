# Session 50 — The Launch-Dir Shadow Union + The Envprod Gitignore Closure + The Smoke-Tail Truth + The Copy-Epoch Guard + The Src-Sweep Closure + The Mirror-Set Pin + The Redundant-Arm Cure + The Prose Batch (2026-11-14)

The round opened on the shipped tree (`5663c63` — session-49's commit;
the owner's narration commit `f74d434` followed, carrying session_50.md
as the round-49 narration — replaced now by this round's formal log).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.45.0), then the session-49 set (session_49.md, the session-49 plan,
worklog Task 49, the owner narration). This round is session 50. The
round resumed mid-flight after a context-window stop: the cures
S50-1/2/3/8 were verified in place in the working tree (the audit, the
parity walk, and the plan already on record), and the TDD execution
continued from S50-4.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
720/720, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root — census MATCH; the vitest + playwright suites in place
and current — chromium-1248 present; the sitemap/robots/manifest/OG
family verified live against the reference in this round's walk;
`skills/` excluded from every gate; the committed `.env.example`
matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked per the standing instruction: unchanged
since the session-48/49 checks — its latest round is still its
session-217 (HEAD b3d0fbe); stack pins identical; no new lessons this
round.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead.
**AUDIT-1: 0C/0H/1M/1L/3I · AUDIT-2: 0C/0H/0M/1L/5I · AUDIT-3:
0C/0H/1M/3L/6I** — combined **0 Critical / 0 High / 2 Medium / 5 Low /
14 Info**. The session-49 diff itself verified correct on all three
passes; the two Medium findings are standing gaps the prior rounds
left open.

The decisive hand-verifications: **S50-1 (AUDIT-1 M1)** — the
standalone `server.js` runs `process.chdir(__dirname)` BEFORE requiring
next (read at .next/standalone/server.js:5), so in the flagship
`bun run start` posture the cwd at register() time is
`<repo>/.next/standalone`, NOT the repo root — while bun loads env
files from the LAUNCH cwd (the repo root). A repo-root
`.env.local`/`.env.production` shadow file therefore landed in
process.env with ZERO boot warning — exactly the hazard the S47-2 seam
was built to surface — and instrumentation.ts's "one dir probe"
justification was factually false for this posture. Live-probed by the
subagent (the shadow file's DATABASE_URL demonstrably reached the
server with no warning; bun inherits PWD = the launch cwd and the
chdir never updates it — the union probe's second leg, verified live).
**S50-2 (AUDIT-3 M1)** — `git check-ignore .env.production` exited 1:
the S49-1 closure stopped at the ARTIFACT boundary; the GIT boundary
stayed open (one `git add -A` stages the operator's secrets file), and
both never-commit lists (AGENTS + SKILL §11, re-spelled by S49-5 in
the same session-49 commit) omitted it too.

## The parity walk

**ALL CLONE FACES MATCH — the twenty-third consecutive clean walk, no
clone-side drift, no NEW reference-side drift.** The mobile menu works
exactly as expected (the owner's standing concern): the panel
byte-identical both sides class-for-class (`px-6 py-4 space-y-3`
container, Home teal rgb(45,212,191) 14px/500 block, the siblings'
rgb(203,213,225), the Gumroad pill 14px/600 — the targeted div probe
after the walk's first outer-wrapper read); the hamburger cursor
pointer both sides (the Tailwind v4 standing concern holding); the
reference's hamburger still ships NO aria family (our expanded family
the documented superset); Escape leaves the reference's panel open
(our superset closes); the outside-tap face leaves it open on BOTH
sides; route-change close verified both sides (the reference UNMOUNTS
the closed panel — its links vanish from the DOM; the probe's first
marker collided with a page-content Home link and was re-scoped to the
panel); the desktop nav identical (6 links both sides); the five-route
head census identical; sitemap 4 URLs both + robots identical modulo
origin; the generator probe symmetrically dead/live (the D-1
documented superset); the login round-trip both landing the landing
(R /Home, L / — the documented 308 deviation).

## The cures (TDD — nine mutation batteries on record; every new arm single-tooth)

- **S50-1 (MEDIUM)** — the launch-dir shadow union:
  `shadowingEnvFileWarningsForServer` probes the DEDUPED UNION of
  `process.cwd()` and `process.env.PWD`; the instrumentation.ts
  "one dir probe" sentence re-spells to the two-dir truth. NEW
  behavioral pin (real temp dirs + chdir + PWD manipulation, restored
  in finally): the launch-dir shadow file warns while the cwd sits in
  a clean artifact dir; PWD === cwd probes exactly once (the dedupe
  face). Battery: the union reduced back to the cwd-only probe →
  exactly the pin RED.
- **S50-2 (MEDIUM)** — the envprod gitignore closure: the `.gitignore`
  env block gains `.env.production` + `.env.development` + `.env.test`;
  the AGENTS never-commit list and the SKILL §11 checklist line carry
  the production family in the same commit. NEW docs-counts arm.
  Battery: the entry removed → exactly the pin RED.
- **S50-3 (LOW)** — the smoke-tail truth: the header leg-16 summary
  re-spells (the full 31-entry mirror, naming the env-files family +
  the live count); error-boundaries' S34-7 census comment re-anchors
  (31 vs 30); the S49-1 "re-anchored in the same commit" claim
  corrected to the truth (session-50, S50-3 — the docs-lie genus).
  Prose only.
- **S50-4 (LOW)** — the copy-epoch guard: a `genEpoch` ref closes the
  async interleave the S49-2 reset left open — `generate()` bumps the
  epoch beside the reset; `copy()` captures the epoch BEFORE the
  clipboard await and its continuation applies the copied state + arms
  the timer only when no regeneration started meanwhile (the
  late-continuation face). The landing-page S49-2 pin extended IN
  PLACE. Battery: the guard removed → exactly the pin RED.
- **S50-5 (LOW)** — the src-sweep closure: the S48-1 ban, the S13-10
  forms-guard + loop-arm, and the S49-3 sweep iterate the UNION of
  tests/ and src/ unit test files (vitest admits `src/**/*.test.ts`;
  none exist today). The census's inline src scan extracted into the
  shared `srcUnitTestFiles()` helper (one home) + the
  `allUnitTestFiles()` union helper. Battery: a planted
  `src/*.test.ts` carrying a block-only strip — invisible to the sweep
  pre-cure (the gap demonstrated GREEN), flagged naming the src file
  post-cure (the census count-lag RED alongside is the designed face).
- **S50-6 (LOW)** — the mirror-set pin: a NEW docs-counts arm parses
  `next.config.ts`'s outputFileTracingExcludes and smoke-test.sh's
  leg-16 list (normalizing `x/**` → `x`) and asserts SET EQUALITY —
  the smoke list === the excludes list + `uploads` (the sanctioned
  S34-7 extra, documented in the arm). Battery: an exclude dropped
  from next.config only → exactly the arm RED.
- **S50-7 (LOW)** — the redundant-arm cure: gate-script's smoke regex
  re-scopes from the `.env.production` membership face (owned by
  error-boundaries' full-line pin since S36-5a — two pins on one
  defect, the N12-2 genus) to the loop-shape face. The ownership
  handoff documented in both comments. Battery: removing
  `.env.production` from the smoke list trips exactly error-boundaries
  (gate-script stays green — the redundancy retired); removing the
  loop line trips gate-script's shape face AND error-boundaries'
  literal (the catastrophic case both owners cover — the plan's
  "exactly gate-script" wording corrected here, the observed truth on
  record).
- **S50-8 (INFO→cure)** — the ok-16 message re-spell: the
  hygiene-mirror truth (uploads/worklog/test-results are the
  sanctioned S34-7 tripwires, never excludes). Prose only.
- **S50-9 (INFO→cure)** — the plans-map duplicates arm: the S49-4
  tail-currency arm gains the Set-size assertion (a duplicated
  session-N token REDs). Extends the arm IN PLACE. Battery: a
  duplicated entry → exactly the arm RED.
- **S50-10 (INFO→cure)** — the e2e webServer env pins
  `VIRALPOST_PROXY_HOPS: "1"` (the D-195a3 polluted-shell doctrine
  completed; fails-closed parse, no determinism impact today, doctrine
  closure only).
- **S50-11 (INFO→cure)** — the contact-form sending face: the submit
  relabels "Sending…" in flight (joining the S22-6/S49-8 pending
  family; the reference's contact form is a stub — D-2 — no parity
  face constrains it). NEW PIN in a11y-controls. Battery: the relabel
  removed → exactly the pin RED.
- **S50-12 (INFO→cure)** — the honest raw-bound message: `collapseIdea`
  extracts one-home from sanitizeIdea; the generate route's
  schema-failure branch picks `ideaTooLongMessage()` (collapsed > the
  seam's exported `MAX_IDEA_CHARS` — the seam would reject) vs the NEW
  `ideaRawLengthMessage()` (raw > the schema's 1000 pre-filter while
  the collapse fits — the pre-filter's own bound, never the seam's).
  The api-robustness F11-7 pin extended and the S15-2 branch regex
  re-scoped to the typeof gate alone IN PLACE (the one-owner lesson
  applied to the re-anchor at birth). Battery: the branch reverted to
  the single-message form → exactly the F11-7 pin RED.
- **S50-13 (register)** — the accepted-residual additions, with
  reasons: the forgot-password link-clobber (PAD §11 gains the row),
  ContactMessage.email's unindexed readback scan, the
  failed-regeneration post discard, the verify-digits wipe while a
  resend is in flight, the two sanctioned window.location.origin reads,
  the novel strip idioms escaping the textual arms, the local .env's
  stale provenance note, the implementation-plan §4 unticked
  checkboxes.

**Accepted/observed register:** the standing residuals carried forward
unchanged (the nav links' UA-default focus outline; the reduced-motion
live-toggle gap; the quota store's midnight rollover; the classifier's
P1001/P1002 500 face; the api-robustness census's route.ts-only
matcher; the hero-portrait weight/resize; the workspace's ambient
absolute DATABASE_URL; the detectNiche substring shape; the
proxyHopDepth parse mirror; the setSessionCookie unit gap; the signup
first-admin race; the verify/resend read-then-write pair; the
enumeration faces; the single-node limiter; the 404/error
main-landmark posture; the smoke-leg retired-form negatives; the
in-process limiter; the 404 client-render body; the formula-driven
generator; the in-app OTP delivery; the footer © build-time year).

## The count re-anchor

UNIT 720 → **724** (+4 — the S50-1 shadow-union pin, the S50-2
gitignore arm, the S50-6 mirror-set arm, the S50-11 sending face;
S50-4, S50-5, S50-7, S50-9, S50-12 extend existing its in place, the
one-face-one-pin doctrine), SUITES 40 unchanged, E2E 70 unchanged,
E2E_SPECS 9 unchanged, SMOKE 16 unchanged, badge 790 → **794**.
Constants re-anchored FIRST; the census walked the doc sites RED→GREEN.
PAD §12's generator.ts row re-anchored 470 → 495, generator-card 279 →
292, smoke-test 275 → 278; the ten provenance sites re-anchored to
1..50 — lag 0 at ship; SKILL v1.45.0 → v1.46.0. The docs-counts
count-ladder's missed s49 entry written at session-50, contiguous (the
comment-lag genus, named in the entry itself).

## Verified

- The full gate on the exact commit tree (below)
- The nine mutation batteries single-tooth on record: the
  shadow-union revert → exactly its pin; the gitignore entry removal →
  exactly its arm; the copy-epoch guard removal → exactly the extended
  pin; the planted src suite → the sweep RED naming the src file
  (invisible pre-cure); the exclude drop → exactly the mirror-set arm;
  the redundant-arm face 1 → exactly error-boundaries (gate-script
  green); the duplicate token → exactly the plans-map arm; the
  sending-face removal → exactly its pin; the raw-bound branch revert
  → exactly the F11-7 pin
- The redundant-arm check: every new arm verified single-tooth; the
  S15-2 regex re-scoped at birth so the S50-12 battery tripped exactly
  ONE pin (the one-owner lesson applied to the re-anchor itself)
- The parity walk post-cure: the standing faces hold, no drift
- Captures 107/108 on the dev server (the owner-instructed posture,
  the session-29..49 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 794, the 40/724 + 9/70 rows, the
  session-50 row on the continuous table, the re-anchored footer);
  AGENTS (counts, the plans map's fiftieth round, the never-commit
  list's production family); CLAUDE (counts); PAD (§8.1 40/724 + 70,
  §8.3 724/70/16, §11's link-clobber row, §12's re-anchored rows);
  SKILL v1.45.0 → v1.46.0 (frontmatter, §0.5 1..50, §11's checklist
  line, Appendix A's session-50 row, Appendix B's header + counts, the
  pre-ship checklist's counts); the ten provenance sites at 1..50;
  worklog Task 50; this session log; the plan's post-execution record

**Gate at the session-50 ship: lint 0/0 · tsc 0 · unit 724/724 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
