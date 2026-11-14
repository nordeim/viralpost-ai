# Session 50 — The Launch-Dir Shadow Union + The Envprod Gitignore Closure + The Smoke-Tail Truth + The Copy-Epoch Guard + The Src-Sweep Closure + The Mirror-Set Pin + The Redundant-Arm Cure + The Prose Batch

## Context

Session 49 shipped `5663c63` (the envprod artifact closure, the copied-flag
reset, the strip-chain sweep, the plans-map truth, the prose batch); the
owner's narration commit `f74d434` followed, carrying session_50.md as the
round-49 narration — replaced at this round's ship by the formal log. The
standing instruction re-ran end to end: docs review → baseline gate → the
comprehensive audit (three parallel subagents + the neo-crm currency check)
→ the live reference parity walk → the TDD cures → the gate → captures →
push.

**Baseline (the tree at `f74d434`, verified in place):** lint 0/0 · tsc 0 ·
unit 720/720 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
intact with `db/` at the repo root ✓ · the vitest + playwright suites in
place and current (chromium-1248 present) ✓ · the sitemap/robots/manifest/
OG family verified live against the reference in this round's walk ✓ ·
`skills/` excluded from every gate ✓ · `.env.example` committed, matching
the six-knob contract ✓. The neo-crm reference repo re-checked: unchanged
since the session-48/49 checks (HEAD b3d0fbe, still its session-217 /
session_459.md); no new lessons.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead, the decisive
probes below): **AUDIT-1: 0C/0H/1M/1L/3I · AUDIT-2: 0C/0H/0M/1L/5I ·
AUDIT-3: 0C/0H/1M/3L/6I** — combined **0 Critical / 0 High / 2 Medium /
5 Low / 14 Info**. The session-49 diff itself verified correct on all
three passes (both S49-6/S49-11 hedges live-probed against the installed
@next/env and bun 1.3.14); the two Medium findings are standing gaps the
prior rounds left open, both at the S49-1 persona's boundaries.

**The decisive hand-verifications:**
- **S50-1 (AUDIT-1 M1)**: `shadowingEnvFileWarningsForServer` derives its
  probe directory from `process.cwd()` at register() time — but the
  standalone `server.js` runs `process.chdir(__dirname)` BEFORE requiring
  next (read at .next/standalone/server.js:5), so in the flagship
  `bun run start` posture the cwd at register() is
  `<repo>/.next/standalone`, NOT the repo root — while bun loads env
  files from the LAUNCH cwd (the repo root). A repo-root
  `.env.local`/`.env.production` shadow file therefore lands in
  process.env with ZERO boot warning — exactly the hazard the S47-2 seam
  was built to surface — and instrumentation.ts's justification ("one dir
  probe: the cwd is the repo root in every documented launch posture")
  is factually false for this posture. Live-probed by the subagent
  (shadow file in the artifact dir warns; the same file in the launch dir
  only does NOT, while its DATABASE_URL demonstrably reaches the server).
- **S50-2 (AUDIT-3 M1)**: `git check-ignore .env.production` exits 1 —
  the ignore block carries only `.env` + `.env*.local`. The S49-1 closure
  (the persona: an operator's `.env.production` carrying the real
  AUTH_SECRET per DEPLOYMENT.md §4) stopped at the ARTIFACT boundary;
  the GIT boundary stays open — one `git add -A` stages the secrets file.
  AGENTS's never-commit list and the SKILL §11 checklist line (both
  re-spelled by S49-5 in the same commit) omit it too.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe; computed styles as ground truth, Playwright as the engine):
**ALL CLONE FACES MATCH — the twenty-third consecutive clean walk, no
clone-side drift, no NEW reference-side drift.** The mobile menu works
exactly as expected (the owner's standing concern): the panel
byte-identical both sides (class-for-class `px-6 py-4 space-y-3`
container, px24/py16 display block + max-height none + transparent bg;
Home's teal rgb(45,212,191) 14px/500 block, the siblings'
rgb(203,213,225) 14px/500 block, the Gumroad pill "Upgrade to Pro – $19"
14px/600 at the templixco href — the targeted div probe after the walk's
first outer-wrapper read proved it); the hamburger cursor pointer both
sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded family the documented
superset); Escape leaves the reference's panel open (our superset
closes); the outside-tap face leaves it open on BOTH sides; route-change
close verified both sides (the reference UNMOUNTS the closed panel — its
links vanish from the DOM; probed directly after the walk's first
marker collided with a page-content Home link); the desktop nav
identical (6 links both sides); the five-route head census identical
(titles + descriptions); sitemap 4 URLs both + robots identical modulo
origin; the generator probe symmetrically dead/live (R: no copy button,
no generation lands; L: a 5-hashtag post + the copy button — the D-1
documented superset); the login round-trip both landing the landing
(R /Home, L / — the documented 308 deviation); the clone session
verified live via /api/auth/me (Demo Creator, role admin).

## The cures (TDD — every new arm battery-planted; every new arm single-tooth, the redundant-arm check enumerated at birth)

- **S50-1 (MEDIUM, AUDIT-1 M1)** — the launch-dir shadow union:
  `shadowingEnvFileWarningsForServer` probes the DEDUPED UNION of
  `process.cwd()` and `process.env.PWD` (bun inherits PWD = the launch
  cwd; the standalone chdir never updates it — live-verified). The
  instrumentation.ts "one dir probe" sentence re-spells to the two-dir
  truth (the union covers the standalone chdir posture). NEW PIN in
  boot-env.test.ts: a behavioral wrapper test (real temp dirs + chdir +
  PWD manipulation, restored in finally) — (a) a launch-dir shadow file
  warns while the cwd sits in a clean artifact dir; (b) PWD === cwd
  probes exactly once (the dedupe face). Battery: the union reduced back
  to the cwd-only probe → exactly the pin RED.
- **S50-2 (MEDIUM, AUDIT-3 M1)** — the envprod gitignore closure: the
  `.gitignore` env block gains `.env.production` + `.env.development` +
  `.env.test` (the Next-convention mode files the cascade mirror and the
  S47-2/S49-1 personas anticipate; `.env*.local` already covered above).
  The AGENTS never-commit list and the SKILL §11 checklist line gain the
  production family in the same commit. NEW PIN in docs-counts (the
  gitignore env-block arm). Battery: the entry removed → exactly the pin
  RED.
- **S50-3 (LOW, AUDIT-1 L1)** — the smoke-tail truth: smoke-test.sh's
  header leg-16 summary re-spells (the full 31-entry mirror, naming the
  env-files family); error-boundaries' S34-7 census comment re-anchors
  (31 entries vs the config's 30); the S49-1 comment's "the census
  comment above re-anchored in the same commit" claim corrected to the
  truth (re-anchored at session-50, S50-3 — the session-49 ship left it
  stale, the docs-lie genus). Prose only.
- **S50-4 (LOW, AUDIT-2 L1)** — the copy-epoch guard: a `genEpoch` ref
  closes the one remaining interleaving edge of the S49-2 cure —
  `generate()` bumps the epoch beside the reset; `copy()` captures the
  epoch BEFORE the clipboard await and its continuation applies the
  copied state + arms the timer only when no regeneration started
  meanwhile (the late-continuation face: a slow clipboard promise
  re-arming the stale state after the reset). The landing-page S49-2 pin
  extends IN PLACE with the epoch assertion. Battery: the guard removed
  → exactly the pin RED.
- **S50-5 (LOW, AUDIT-3 L1)** — the src-sweep closure: the S48-1 ban,
  the S13-10 forms-guard, the loop-arm, and the S49-3 sweep iterate the
  UNION of tests/ and src/ unit test files (vitest admits
  `src/**/*.test.ts`; none exist today — the census already counts them,
  the strip-chain arms did not). The census's inline src scan extracts
  into the shared `srcUnitTestFiles()` helper (one home). Battery: a
  planted `src/*.test.ts` carrying a block-only strip → exactly the
  sweep RED naming the src file (the census count-lag RED alongside is
  the designed face).
- **S50-6 (LOW, AUDIT-3 L2)** — the mirror-set pin: a NEW docs-counts
  arm parses `next.config.ts`'s outputFileTracingExcludes and
  smoke-test.sh's leg-16 list (normalizing `x/**` → `x`) and asserts
  SET EQUALITY — the smoke list === the excludes list + `uploads` (the
  sanctioned S34-7 extra, documented in the arm). The config-side
  tripwire the mirror doctrine claimed but never enforced. Battery: an
  exclude dropped from next.config only → exactly the arm RED.
- **S50-7 (LOW, AUDIT-3 L3)** — the redundant-arm cure: gate-script's
  smoke regex re-scopes from the `.env.production` membership face
  (owned by error-boundaries' full-line pin since S36-5a — two pins on
  one defect, the N12-2 genus) to the loop-shape face
  (`/for entry in [^']*\.env /`). The ownership handoff documented in
  both comments. Verification battery: removing `.env.production` from
  the smoke list trips exactly error-boundaries (gate-script stays
  green); removing the loop line trips exactly gate-script.
- **S50-8 (INFO→cure, AUDIT-3 I1)** — the ok-16 message re-spell: "the
  excludes mirror: … uploads …" → the hygiene-mirror truth (uploads is
  the sanctioned S34-7 extra, not an exclude). Prose only.
- **S50-9 (INFO→cure, AUDIT-3 I2)** — the plans-map duplicates arm: the
  S49-4 tail-currency arm gains the Set-size assertion (a duplicated
  session-N token REDs — the "enumerates every round 1:1" claim gets
  mechanical teeth). Extends the arm IN PLACE. Battery: a duplicated
  entry → exactly the arm RED.
- **S50-10 (INFO→cure, AUDIT-3 I4)** — the e2e webServer env pins
  `VIRALPOST_PROXY_HOPS: "1"` (the D-195a3 polluted-shell doctrine
  completed — the one knob the config still inherited from the ambient
  shell; fails-closed parse, no determinism impact today, doctrine
  closure only).
- **S50-11 (INFO→cure, AUDIT-2 I4)** — the contact-form sending face:
  the submit relabels "Sending…" in flight (joining the S22-6/S49-8
  pending family; the reference's contact form is a stub — D-2 — no
  parity face constrains it). NEW PIN in a11y-controls (the pending-face
  home). Battery: the relabel removed → exactly the pin RED.
- **S50-12 (INFO→cure, AUDIT-1 I1)** — the honest raw-bound message:
  `collapseIdea` extracts one-home from sanitizeIdea (the seam's exact
  collapse); the generate route's schema-failure branch picks
  `ideaTooLongMessage()` (collapsed > the seam's 500 bound — the seam
  would reject) vs the NEW `ideaRawLengthMessage()` (raw > the schema's
  1000 pre-filter while the collapse fits — the pre-filter's own bound,
  never the seam's). MAX_IDEA_CHARS exports (one home). The
  api-robustness F11-7 pin and the S15-2 branch regex re-anchor in
  place. Battery: the branch reverted to the single-message form →
  exactly the F11-7 pin RED.
- **S50-13 (register)** — the accepted-residual additions, with reasons:
  the forgot-password link-clobber (each request overwrites a live reset
  token; rate-limited 10/IP/15min; subsumed by the demo in-app delivery
  posture — PAD §11 gains the row), ContactMessage.email's unindexed
  readback scan (no runtime query path; pristine-inbox contract),
  the failed-regeneration post discard (pre-diff deliberate; the idea
  survives for retry), the verify-digits wipe while a resend is in
  flight (fresh code → fresh entry, plausibly intended), the two
  sanctioned window.location.origin reads (the from-url guard's
  same-origin contract — never "fix" into a hardcoded origin), the
  novel strip idioms escaping the textual arms (inherent to textual
  pinning; the anchored forms are the live corpus), the local .env's
  stale provenance note (untracked-only; never ships), the
  implementation-plan §4 unticked checkboxes (plan-as-record
  convention).

**Accepted/observed register (the standing residuals carried forward
unchanged):** the nav links' UA-default focus outline; the reduced-motion
live-toggle gap; the quota store's midnight rollover; the classifier's
P1001/P1002 500 face; the api-robustness census's route.ts-only matcher;
the hero-portrait weight/resize; the workspace's ambient absolute
DATABASE_URL; the detectNiche substring shape; the proxyHopDepth parse
mirror; the setSessionCookie unit gap; the signup first-admin race; the
verify/resend read-then-write pair; the enumeration faces; the
single-node limiter; the 404/error main-landmark posture; the smoke-leg
retired-form negatives; the in-process limiter; the 404 client-render
body; the formula-driven generator; the in-app OTP delivery; the footer
© build-time year.

## The count re-anchor (draft — the census's own guards own the truth)

UNIT 720 → **724** (+4: the S50-1 boot-env wrapper pin, the S50-2
gitignore arm, the S50-6 mirror-set arm, the S50-11 sending face; S50-4,
S50-5, S50-7, S50-9, S50-12 extend existing its IN PLACE), SUITES 40
unchanged, E2E 70 unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged,
badge 790 → **794** (= 724 + 70 — the BADGE = UNIT + E2E guard
arbitrates). PAD §12's generator.ts + generator-card + smoke-test rows
re-anchor to the live wc -l. The ten provenance sites re-anchor to
1..50 — lag 0 at ship; SKILL v1.45.0 → v1.46.0.

## Docs lockstep at ship

README (badge 794, the 40/724 + 9/70 rows, the session-50 row on the
continuous table, the re-anchored footer); AGENTS (counts, the plans
map's fiftieth round, the never-commit list's production family); CLAUDE
(counts); PAD (§8.1 40/724 + 70, §8.3 724/70/16, §11's link-clobber row,
§12's re-anchored rows, Last Updated); SKILL v1.45.0 → v1.46.0
(frontmatter, §0.5 1..50, §11's checklist line, Appendix A's session-50
row, Appendix B's header + counts, the pre-ship checklist's counts); the
ten provenance sites at 1..50; worklog Task 50; docs/session_50.md (the
formal log replacing the owner's narration); this plan's post-execution
record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key. Conventional Commit to `main` only, push via the SSH
wrapper runbook (docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the
wrapper, the dry-run, the real push, the remote verification, the key
destruction.

## The post-execution record (session-50 ship)

Executed as planned, with the deviations the record owes the truth:

- **S50-4/S50-5/S50-6/S50-7/S50-9/S50-10/S50-11/S50-12/S50-13 all
  landed** exactly as specified above (S50-1/2/3/8 in the pre-stop
  window, verified in place at the resume; every battery on record at
  its cited step).
- **The S50-7 battery's second face, corrected**: the plan claimed
  "removing the loop line trips exactly gate-script." Observed: the
  deletion trips gate-script's loop-shape face AND error-boundaries'
  full-line pin (the literal died with the line) — the catastrophic
  case both owners cover, exactly as the ownership division predicts
  (the literal AND the shape were both destroyed). The DECISIVE face
  is the first: removing `.env.production` alone trips exactly
  error-boundaries with gate-script green — the redundancy retired,
  proven. The plan's wording was the docs-lie genus caught at its own
  verification step; the record keeps the observed truth.
- **The count ladder catch-up**: the docs-counts ladder comment
  carried no s49 entry (the s49 ship's miss — the comment-lag genus);
  both s49 and s50 entries written contiguous at this ship, the miss
  named in the s49 entry itself.
- **The S15-2 regex re-scope** (inside S50-12): the plan said "the
  api-robustness F11-7 pin and the S15-2 branch regex re-anchor in
  place"; the re-anchor deliberately DROPPED the old regex's
  `\?\s*ideaTooLongMessage\(\)` tail (the message choice is F11-7's
  face — the S50-7 one-owner lesson applied to the re-anchor at
  birth), which is what made the plan's battery claim ("exactly the
  F11-7 pin") exact rather than approximate.
- Counts at ship: UNIT 724 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 794; the ten provenance sites at 1..50 (lag 0);
  SKILL v1.46.0; captures 107/108; push to main via the SSH wrapper
  runbook.
