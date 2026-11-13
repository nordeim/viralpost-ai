# Session 47 — The Artifact-Anchor Truth + The Reveal-Settle Pins + The Shadow-Env Boot Warning + The Stale-Prose Batch (2026-11-14)

## Context

Session 46 shipped `151eb6f` (the force-dynamic route census, the
mobile-menu censused-parity e2e pins, the cwdFallbackUrl wiring pin,
the comment-truth batch); the owner's narration commit `77ca641`
followed (session_47.md carries the round-46 narration — this round
replaces it with the formal log). The standing instruction re-ran end
to end: docs review → baseline gate → the comprehensive audit (three
parallel subagents + the neo-crm currency check) → the live reference
parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `77ca641`, verified in place):** lint 0/0 · tsc 0 ·
unit 703/703 (40 files) · build · smoke 16/16 · e2e 67/67 (9 specs) ·
census MATCH · the `.env` `DATABASE_URL="file:../db/custom.db"` contract
recreated on the fresh clone with `db/` at the repo root (db:push +
db:seed → census MATCH) ✓ · the vitest + playwright suites in place and
current — the chromium-1248 gap cured with the documented one-time
`bunx playwright install chromium` (the neo-crm s212/s217 proactive
preflight lesson, adopted) ✓ · the sitemap/robots/manifest/OG family
verified live against the reference in this round's walk ✓ · `skills/`
excluded from every gate ✓ · `.env.example` present, committed, matching
the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead, the
decisive probe below): **AUDIT-1: 0C/0H/1M/2L/1I · AUDIT-2:
0C/0H/1M/3L/3I · AUDIT-3: 0C/0H/0M/1L/3I** — combined
**0 Critical / 0 High / 2 Medium / 6 Low / 7 Info**. The session-46
diff itself verified correct and complete on all three passes (the
only tail findings were the S46-11 cure's four missed derivation
sites — S47-9 — and the wiring pin's raw read — S47-10).

**The decisive hand-verification (S47-1, AUDIT-1's Medium):** the
cwdFallbackUrl docblock's artifact-deploy claim was LIVE-FALSIFIED on
the built artifact — `.next/standalone` copied to `/tmp/vp-artifact`,
booted with a clean env: `/api/health` answered
`{"ok":true,"data":{"status":"healthy","db":"up"}}` while
`/tmp/vp-artifact/db/custom.db` was created as a **0-byte file**. In
the artifact-only shape the MODULE anchor owns resolution (Turbopack
compiles `import.meta.url` into the runtime getter
`e.F("src/lib/db-path.ts")` — verified in the shipped chunks — which
resolves to the REAL `<artifact>/src/lib/db-path.ts` at boot; the
artifact ships both `src/` and `prisma/schema.prisma`), `urlForRoot`
mkdirs `<artifact>/db` on demand, and a fresh artifact answers a
healthy 200 against a table-less empty DB (SELECT 1 succeeds; the
first User query P2021s) — NOT the raw pass-through + Error-14 posture
the comment prescribes. The header's "the standalone bundle rewrites
import.meta.url into a virtual path that must be ignored" premise is
false for this build. The CWD arm's true reachability: both validated
anchors miss (a stripped artifact / import.meta.url failure).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth): **ALL CLONE FACES
MATCH — the twentieth consecutive clean walk, no clone-side drift, no
new reference-side drift** (the session-45 404-title bare posture
persists — /NoSuchRoute, /Dashboard, /page2 re-probed: HTTP 200 + the
bare "ViralPost AI" title + the 404 h1 body; ours keeps the derived
title as the documented superset; the D-1 failure-toast posture
re-verified — "Generation failed, so this attempt didn't use one of
your free tries. Please try again.", zero hashtags, the button settled
back). The mobile menu works exactly as expected (the owner's standing
concern): the panel byte-identical both sides (Home's teal
rgb(45,212,191) active face, the siblings' rgb(203,213,225), the
Gumroad pill "Upgrade to Pro – $19" at the templixco href, 14px/500-600,
display block + max-height none, the transparent-over-hero bg); the
hamburger cursor pointer both sides (the Tailwind v4 standing concern
holding; the reference's hamburger still ships NO aria family — our
superset); Escape leaves the reference's panel open (our F11-11
superset closes with the focus returned to the toggle, live-verified);
the same-route Logo click leaves the panel open on BOTH sides; the
outside-tap face leaves it open on BOTH sides (the hero paragraph);
route-change close + auto-close verified; the desktop nav byte-identical
(brand + 4 links + the Upgrade pill, the active face following the
route); the five-route head census identical modulo origin (the
reference's og/canonical render client-side — its SPA posture; ours
ship SSR); sitemap 4 URLs both + robots identical modulo origin; the
generator probe symmetrically dead/live (R: the failure toast, no
generation; L works — 5 hashtags + the copy button, the documented
superset); the login round-trip both landing the landing (R `/Home`,
L `/` — the documented 308 deviation), the clone session verified live
via /api/auth/me (Demo Creator, role admin).

**The neo-crm reference repo re-checked** (the standing instruction):
its latest round (its session-217 / file session_459.md — the PAD
narrative-block semantic-prose census) continues the semantic-prose
census genus with its mutation-battery discipline catching a THIRD
consecutive pin birth-defect — the REDUNDANT ARM. Stack pins identical
(all 8). Three lessons ADOPTED this round: (1) the semantic-prose
doc-claim census idiom (stale-form bans + corrected asserts + the
wrap-blind flattened read — S47-9b applies it at birth); (2) the
constant-interpolation pin form (no new pin mirrors a mutable count as
a literal — the new arms assert structure, not counts); (3) the
Playwright browser-binary preflight (applied at baseline). The
redundant-arm lesson APPLIED: every new arm below checked for
single-tooth ownership, the batteries prove it.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S47-1 | **MEDIUM** (AUDIT-1 M1) | `src/lib/db-path.ts` (the anchor-order header) + the cwdFallbackUrl docblock | The artifact-deploy claim is live-falsified (the probe above): in the artifact-only shape the MODULE anchor wins (the runtime-resolved real `import.meta.url` + the traced `prisma/schema.prisma` → root = the artifact root; `urlForRoot` mkdirs `<artifact>/db` on demand), so a fresh artifact serves a healthy 200 against a 0-byte table-less DB — not the documented raw pass-through + operator-supplied-folder posture. The comment is the operator's wrong-DB playbook for the exact incident class it exists to serve (the healthy-200-while-every-DB-route-fails genus, the session-34 family). The CWD arm's true reachability (both validated anchors miss) is undocumented. Cure: comment-truth re-spell of both sites (the code's behavior is correct — artifact-root anchoring IS the intended standalone posture) + a DEPLOYMENT.md §7 fresh-artifact row recording the live probe. The optional health-route schema probe is DEFERRED (the e2e webServer's fresh-boot probe deliberately passes on the empty file — a schema-aware SELECT would 503 that leg; the docs row is the cure; recorded in the accepted register). |
| S47-2 | **LOW** (AUDIT-1 L2) | `src/lib/boot-env.ts` + `src/instrumentation.ts` | No boot-gate signal when a shadowing `.env.local`/`.env.<NODE_ENV>` exists: the db-path seam's recovery signature reads only `.env` (the S46-9 `.env`-only face), so a `DATABASE_URL` carried in a shadowing file is honored as an unvalidated override — potentially the absolutized parent-of-repo path (the founding wrong-DB shape) — with zero operator signal. Cure: a warn-only pure seam `shadowingEnvFileWarnings(dir, env, exists)` in boot-env.ts (the cwdFallbackUrl injectable-exists pattern) + the instrumentation.ts wiring (the [boot] warn family, never fatal — the S13-1 doctrine) + pins. |
| S47-3 | **LOW** (AUDIT-1 L3) | `tests/db-path.test.ts` | The artifact-only deploy shape has no pin ownership (how S47-1's false claim survived a comment-truth round): the S45-1 pins own the cwdFallbackUrl logic, the S46-6 pin owns the call-shape wiring — nothing pins the ANCHOR ORDER, which is the reachability contract (which arm owns which shape). Cure: a source-pinned arm asserting the order — `repoRootFromStandaloneCwd` before `repoRootFromModule` in the validated array, the cwdFallbackUrl consumption after the loop (the S29-2 idiom). |
| S47-4 | **MEDIUM** (AUDIT-2 M1) | `src/components/effects/reveal.tsx` + `tests/effects-motion.test.ts` + `tests/e2e/landing.spec.ts` | The scroll-reveal (17 live call sites — the whole landing page's content visibility) is unpinned, and BOTH existing oracles are blind to the stuck-hidden regression: Playwright's `toBeVisible()` passes on `opacity: 0` elements (visibility = non-empty box + not display:none/visibility:hidden), and axe-core does not fail headings at opacity 0. A regression in `hiddenStyle`, the IO settle flow, the reduced/no-IO early return, or the `[]`-deps arm ships green through the entire gate. Cure: (a) a source pin in effects-motion.test.ts (the hiddenStyle inline forms + both settle arms + the reduced/no-IO early return + the disconnect pair); (b) an e2e leg asserting the WRAPPER div (not the heading — child computed opacity reports its own 1) settles to `opacity: 1` after scroll on `/`. |
| S47-5 | **LOW** (AUDIT-2 L1) | `src/components/marketing/hero.tsx` + `tests/landing-page.test.ts` | The hero portrait's CLS contract (`width={512} height={512}` — the S22-20/S23-2 comment's own claim) is unpinned (only `alt` is pinned, a11y-controls:319). Cure: one source pin on the geometry. |
| S47-6 | **LOW** (AUDIT-2 L2) | `src/app/(site)/layout.tsx` + the e2e tree | The skip link (S22-11) + its `tabIndex={-1}` target (S23-3) are source-pinned only — no e2e focuses the link and asserts focus lands on `#main-content` (the WebKit-specific behavior the cure exists for; the S32-6 doctrine: a mechanism source-pinned only is insufficient for a behavior face). Cure: one e2e leg — Tab at load → the revealed skip pill focused → activate → `#main-content` holds focus. |
| S47-7 | **LOW** (AUDIT-2 L3) | `src/components/ui/toast.tsx` + `tests/e2e/generator.spec.ts` | The toast's 4s auto-dismiss and the hover-pause re-arm are source-pinned only (the anatomy suite is textual); the only incidental e2e toast render never waits out the timer. Cure: one e2e leg on `/Tool` — trigger the over-length error toast, assert it renders, assert it auto-dismisses (~4s + margin). |
| S47-8 | **INFO→cure** (AUDIT-2 I2) | `src/app/globals.css` (the hover-variant comment) | The comment typo "THE HOYVER-VARIANT UN-WRAP" (HOYVER → HOVER). Cure: the one-word comment edit (the rule itself is correct and pinned). |
| S47-9 | **LOW** (AUDIT-3 L1) | `docs/implementation-plan.md`, `README.md`, `CLAUDE.md`, `viralpost-ai_SKILL.md`, `tests/e2e/generator.spec.ts` | The S46-11 cure re-anchored only the D-1 evidence row; FIVE live-tense derivation sites still describe the reference's failure posture as an infinite "hangs forever" (the session-46 walk's own record: the reference now settles with a failure toast — the 402-dead core stands). The session-45 404-title drift WAS re-anchored at its derivation sites — the contrast case proving the house convention. Cure: the five-site re-spell to the D-1 posture + a semantic-prose census arm (the neo-crm s213–s217 idiom, adopted at birth): the wrap-blind flattened read bans the stale spellings in the five files and asserts the corrected form present. |
| S47-10 | **INFO→cure** (AUDIT-3 I2) | `tests/db-path.test.ts` (the S46-6 wiring pin) | The wiring pin reads db-path.ts RAW while asserting a negative arm (`not.toMatch(/existsSync\(/)`) whose slice includes the NEXT function's docblock — a future comment mentioning `existsSync(` there trips a false RED. The same session's S46-1 arm documented the comment-stripped idiom (S38-7f). Cure: wrap the read in the module's `stripComments` (the one-idiom doctrine; zero count change). |

**Accepted/observed register (this round's tail, with reasons):** the
health-route schema probe (AUDIT-1's optional hardening) — DEFERRED:
the e2e webServer's fresh-boot probe deliberately passes on the empty
auto-created db file (the health route's own comment names it); a
schema-aware SELECT would 503 that leg — the DEPLOYMENT.md §7 row is
the cure, the probe stays `SELECT 1` (the operator's signal is the
docs row + the P2021 on first user query); AUDIT-2 I1 — the footer's
h2→h4 heading-order skip is class-for-class reference parity
(DOM-extracted; axe's heading-order rule is best-practice, not in the
AA tag set); AUDIT-2 I3 — the toast viewport's mobile clip edge (the
4-card cap bounds it; `overflow-y-auto` is optional polish deferred —
no parity constraint, the reference ships no toast); AUDIT-3 I3 — the
provenance range at the designed lag 1 (re-anchored to 1..47 this
round per the S30-4 convention); AUDIT-3 I4 — the footer census
regexes' count literals (the documented pinned-shape-updates-with-
the-count doctrine; re-anchored to 70/70 in this round's walk); the
standing accepted residuals (the detectNiche substring shape, the
proxyHopDepth parse mirror, the setSessionCookie unit gap, the signup
first-admin race, the verify/resend read-then-write pair, the
enumeration faces, the single-node limiter, the 404/error
main-landmark posture, the smoke-leg retired-form negatives) carried
forward unchanged.

## The cure set (TDD — every new pin battery-planted, the mutation batteries per the house doctrine; the neo-crm redundant-arm lesson applied — every new arm single-tooth)

**Batch 1 — the new pins:**
- **S47-2a**: `src/lib/boot-env.ts` — the `shadowingEnvFileWarnings`
  pure seam (the injectable-exists pattern; candidates
  `.env.local` + `.env.${NODE_ENV}`, never `.env` itself) + the
  `shadowingEnvFileWarningsForServer` wrapper (the edge-compile
  calibration — the cwd read behind the dynamic-import boundary) +
  the `src/instrumentation.ts` wiring (the [boot] warn family).
  Pins: `tests/boot-env.test.ts` +3 (the seam's found/not-found
  behavior, the warning's doctrine sentence, the wiring source pin —
  the S29-2 idiom, comment-stripped negative).
- **S47-3a**: `tests/db-path.test.ts` — the anchor-order source pin
  (the validated array's order + the post-loop cwdFallbackUrl
  consumption; the S29-2 idiom). +1.
- **S47-4a**: `tests/effects-motion.test.ts` — the reveal settle
  source pin (the hiddenStyle forms + the settle arms + the
  reduced/no-IO early return + the disconnect pair + the []-deps
  arm). +1.
- **S47-4b**: `tests/e2e/landing.spec.ts` — the reveal-settle e2e leg
  (scroll to a below-fold section, assert the WRAPPER div's computed
  opacity reaches "1"; the heading's own computed opacity is useless —
  the child reports 1 under a 0-opacity parent). +1 e2e.
- **S47-5a**: `tests/landing-page.test.ts` — the hero-portrait CLS
  source pin (`width={512} height={512}` on the hero-portrait img).
  +1.
- **S47-6a**: `tests/e2e/landing.spec.ts` — the skip-link e2e leg
  (Tab at load → the revealed skip pill focused → activate →
  `#main-content` holds focus). +1 e2e.
- **S47-7a**: `tests/e2e/generator.spec.ts` — the toast auto-dismiss
  e2e leg (the over-length error toast renders, then auto-dismisses
  at ~4s + margin). +1 e2e.
- **S47-9b**: `tests/docs-counts.test.ts` — the semantic-prose arm
  (the neo-crm idiom at birth): the wrap-blind flattened read of the
  five files bans the stale spellings + asserts the corrected form
  present. +2.

**Batch 2 — the comment-truth cures (no behavior change except
S47-2's warn-only seam):**
- **S47-1**: the db-path.ts header + cwdFallbackUrl docblock re-spell
  (the artifact-only truth: the module anchor owns it, healthy-200 on
  the empty db, the CWD arm = the both-anchors-miss shape) + the
  DEPLOYMENT.md §7 fresh-artifact row (the live probe recorded).
- **S47-8**: the globals.css HOYVER → HOVER comment fix.
- **S47-9a**: the five "hangs forever" re-spells (the implementation-
  plan Deviations row, README, CLAUDE, SKILL §1, the generator spec
  comment) to the D-1 settled posture.
- **S47-10**: the S46-6 wiring pin's stripComments wrap.

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S47-2: remove the instrumentation wiring → exactly the wiring pin
  RED.
- S47-3: swap the anchor order in the validated array → exactly the
  order pin RED.
- S47-4: break the settle arm (drop the `el.style.opacity = "1"`
  line) → exactly the reveal source pin RED.
- S47-9: re-plant the stale phrase in one file → exactly the
  semantic-prose arm RED.
- The redundant-arm check (the neo-crm session-217 lesson): S47-2a
  owns the shadow-file boot face (nothing exists), S47-3a owns the
  anchor-ORDER face (the S45-1 pins own the cwdFallbackUrl logic, the
  S46-6 pin owns the call-shape wiring — disjoint), S47-4a/b own the
  reveal settle face (the effects-motion suite covers particle-text +
  iridescence only — enumerated), S47-5a owns the hero img geometry
  (only alt is pinned), S47-9b owns the stale-prose face (no existing
  arm touches it).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-47
  entry; UNIT 703 → **711**, SUITES 40 unchanged, E2E 67 → **70**,
  E2E_SPECS 9 unchanged, SMOKE 16 unchanged, BADGE 770 → **781**.
- README: badge 781, the "40 files / 711 tests" rows, the "9 specs /
  70 tests" rows, the session-47 status row, the re-anchored footer
  counts.
- AGENTS: the counts (711 / 70); the plans map's forty-seventh round.
- CLAUDE: the counts (711 / 70).
- PAD: §8.1 table (40 files / 711 tests; 70 e2e); §8.3's counts;
  §12's db-path row re-anchored to the live `wc -l` (477); Last
  Updated → 2026-11-14.
- SKILL v1.42.0 → v1.43.0: frontmatter (version, project_state),
  §0.5's range 1..46 → 1..47, Appendix A's session-47 row, Appendix
  B's header + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..46` →
  `session_1..47` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; lag
  0 at ship).
- `docs/reference-investigation.md` §5 D-1: the session-47
  re-verification bracket (the failure-toast posture re-observed,
  no drift).
- `docs/DEPLOYMENT.md` §7: the fresh-artifact row (S47-1).
- worklog Task 47; `docs/session_47.md` (this round's formal log,
  replacing the owner-carried round-46 narration); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  711/711 (40 files) → build → smoke 16/16 → e2e 70/70 (9 specs) →
  census MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  twentieth walk's battery), no drift.
- Captures 101/102 on the dev server (the owner-instructed posture,
  the session-29..46 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the artifact-anchor truth + the
  reveal-settle pins + the shadow-env boot warning + the stale-prose
  batch (session-47 audit)`;
  `.env.example` rides the commit (tracked, six-knob current, the
  provenance note re-anchored to 1..47).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The db-path.ts artifact-deploy comments state the probed truth
   (module anchor owns the artifact shape; healthy-200-on-empty-db;
   the CWD arm's both-anchors-miss reachability); DEPLOYMENT.md §7
   carries the fresh-artifact row.
2. The shadow-env seam + wiring GREEN (found/not-found behavior +
   the doctrine sentence + the wiring pin); the warn-only posture
   (never fatal) stated in the seam's comment; the edge-compile
   calibration holds (no direct process.cwd in instrumentation.ts's
   body; the build carries no edge warning).
3. The anchor-order pin GREEN; the battery on record (swap → exactly
   the pin RED).
4. The reveal source pin + the settle e2e leg GREEN; the battery on
   record (settle break → exactly the source pin RED).
5. The hero CLS pin, the skip-link leg, the toast-dismiss leg GREEN.
6. The five stale-prose sites re-spelled; the semantic-prose arm
   GREEN (the wrap-blind ban + the corrected assert); the battery on
   record (re-plant → exactly the arm RED).
7. Full gate GREEN: lint 0/0 · tsc 0 · unit 711/711 (40 files) ·
   build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.
8. The walk re-run: no clone-side drift; the standing faces hold.
9. Captures 101/102 PIL-verified under `docs/screenshots/`
   (post-cure).
10. Docs lockstep: six documents + worklog + session log + this
    plan's post-execution record, all in the same commit; the
    constants re-anchored FIRST; the ten provenance sites at 1..47 —
    lag 0 at ship.
11. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: the shadow-env seam + wiring + pins (boot-env),
      the anchor-order pin (db-path), the reveal source pin
      (effects-motion) + the settle e2e leg + the skip-link leg
      (landing), the CLS pin (landing-page), the toast-dismiss leg
      (generator), the semantic-prose arm (docs-counts)
- [x] 2. Verify Batch 1 state (the new pins born GREEN against live
      truth; the 703 existing unit GREEN; the e2e pins GREEN on the
      current build)
- [x] 3. Batch 2: the comment-truth cures (S47-1 db-path re-spell +
      DEPLOYMENT row, S47-8 HOVER fix, S47-9a the five-site
      re-spell, S47-10 stripComments wrap)
- [x] 4. Intermediate gate check (lint/tsc/unit — all GREEN at 711)
- [x] 5. Batch 3: the mutation batteries (S47-2 wiring removal,
      S47-3 anchor swap, S47-4 settle break, S47-9 phrase re-plant —
      each exactly its designed pin RED, restores verified)
- [x] 6. Batch 4: constants FIRST (UNIT 711, E2E 70, BADGE 781), the
      census doc-site walk RED→GREEN, PAD §12 rows, SKILL v1.43.0,
      the ten provenance sites 1..47, worklog Task 47, README/AGENTS/
      CLAUDE rows, session_47.md, the plan record
- [x] 7. Batch 5: the full gate + the walk re-run + captures 101/102
- [x] 8. Batch 6: commit + SSH-wrapper push (dry-run first, remote
      verified, key shredded)

## Post-execution record

Executed as planned, with the round's shape on record:

- **One arithmetic slip caught by the census's own guard (Batch 4)**:
  the plan's draft said +7 unit / 710 / 780; the S47-9 semantic-prose
  census is a PAIR of its (the ban + the corrected assert), so the
  live count is 711 and the badge 781 — the BADGE = UNIT + E2E
  arithmetic guard demanded it at the constants walk (the session-46
  769→770 genus, caught two rounds running by the same guard). The
  ladder comment records the correction.
- **One birth-defect caught and cured at birth (S47-10, upgraded
  from the planned one-line idiom wrap)**: the naive S38-7f
  stripComments block regex phantom-OPENS on the `db/**` glob prose
  inside db-path.ts's own line comments — the lazy match pairs the
  glob's `/**` with a distant real `*/` closer and eats ~5KB of live
  code including the export the S46-6 pin asserts. Live-caught when
  the wrap false-REDDed the S46-6 pin; the cure (line-comments
  strip FIRST + the whitespace-anchored block opener) is proven on
  the exact file, and the helper's docblock records the trap.
- **One build calibration at birth (S47-2)**: a direct
  `process.cwd()` in instrumentation.ts's module body trips
  Turbopack's edge compile (the hook is compiled for BOTH runtimes —
  the warning named the API and its line). The cwd read moved into
  the dynamically-imported `shadowingEnvFileWarningsForServer`
  wrapper in boot-env.ts (behind register()'s edge guard), and the
  wiring pin's negative arm (comment-stripped: no process.cwd in
  instrumentation.ts's own body) owns the calibration. The build
  re-ran clean — no edge warning.
- **The decisive probe (S47-1)**: the artifact boot evidence is
  recorded in three places — the db-path.ts header (the code-side
  truth), the DEPLOYMENT §7 row (the operator's playbook), and the
  audit narrative above. The health-route schema probe was
  DEFERRED with the reason in the accepted register (the e2e
  webServer fresh-boot race — the probe deliberately passes on the
  empty auto-created file).
- **A mid-execution sandbox reset survived**: the workspace was
  wiped mid-round (Batch 5); the tree was rebuilt from this validated
  plan and every battery re-proven on the rebuilt tree before the
  final gate. The gate below ran on the exact shipped tree.

**Final state:** lint 0/0 · tsc 0 · unit **711/711** (40 files) ·
build · smoke **16/16** · e2e **70/70** (9 specs) · census MATCH ·
badge **781**. Captures 101/102 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.42.0 →
v1.43.0 + the ten provenance sites re-anchored to 1..47 + worklog
Task 47 + docs/session_47.md + this post-execution record. Pushed to
main via the SSH wrapper (dry-run first, key shredded after).
