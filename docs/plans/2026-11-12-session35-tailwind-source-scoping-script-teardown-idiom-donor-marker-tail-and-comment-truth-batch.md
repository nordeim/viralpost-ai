# Session 35 — The Tailwind Source Scoping + The Script Teardown Idiom + The Donor-Marker Tail + The Comment-Truth Batch (2026-11-12)

## Context

Session 34 shipped `74bc770`; the owner added `b508502` (the session-34
execution narration held as `docs/session_35.md`, the established
pattern). This round re-ran the standing instruction against the merged
tree: docs review → baseline gate → the comprehensive audit (three
parallel subagents) → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 660/660 (38 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/`
at the repo root ✓ · the vitest (`vitest.config.mts`) + playwright
(`playwright.config.ts`) suites in place and current ✓ · the
sitemap/robots/manifest/OG family verified live against the reference
(this round's walk) ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/6I · AUDIT-2: 0C/0H/0M/1L/5I · AUDIT-3:
0C/0H/1M/3L/4I** — combined **0 Critical / 0 High / 1 Medium / 7 Low /
15 Info**. AUDIT-1 live-probed the db-path seam clean again (40+ probes)
and caught the one-shot script family's teardown gap plus ten more bare
donor cites; AUDIT-2 empirically compiled the stylesheet through the
installed @tailwindcss/postcss 4.3.3 (methodology validated against the
real build artifact at 159,088 B) and surfaced the aggregate
never-matched-rule mass; AUDIT-3 verified every count claim live
(660/38 · 65/9 · 16 · badge 725) and caught the playwright-config
contact-bucket omission plus the partial hygiene-leg pin. The lead
hand-verified all findings: the `process.exit(1)`-inside-catch preempting
the chained `.finally` disconnect confirmed in all three scripts; the
ten bare donor cites confirmed by the §0.5-scoped grep; the contact
bucket confirmed at `RATE_LIMIT = 5` / `RATE_WINDOW_MS = 60*60*1000`
with the limiter BEFORE the Zod parse (invalid POSTs count) and 3
POSTs/run in contact.spec (the browser form + the two API POSTs); the
docs-only classes confirmed riding the real build CSS (`bada55` ×2,
`laravel-worker` ×2, `to-amber-400` ×1 — none occur anywhere in src/).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the instrument-hardened walk script —
eight runs to green, the probe lessons on record): the mobile-menu
census at 390×844 with a CONFIRMED viewport (`agent-browser set
viewport` — the `--viewport` flag and a bare `viewport` command are not
real; innerWidth silently stayed 1280 and the mobile battery read
desktop-width states) — the hamburger base classes byte-identical (our
focus-visible family the documented S15-8 superset), the open panel
computed display **block** both sides at scrollY=0 (max-height none, the
links + the Gumroad pill byte-identical, the reference's dead-98
class family its own render), the bar `bg-transparent` with the menu
open, the scrolled-bar family byte-identical with the computed
background the same color in its two spellings (the oklab→sRGB
conversion lands exactly on rgb(15,23,42)@0.95 — numerically proven, the
walk now canonicalizes it), the desktop nav family byte-identical at
6|6 links, the five-route head census byte-identical (titles,
og:title, og:description, meta description, twitter:card; canonical +
og:url differ by origin only; og:image the documented self-hosted
superset), sitemap.xml + robots.txt identical modulo origin (the
all-occurrence normalized comparison), the login round-trip live on
both sides (both land on `/`), the generator walk-probe null on BOTH
sides symmetrically. **NO DRIFT FOUND — the ninth consecutive
fully-clean walk.** The mobile menu works as expected (open, the
observable Escape-close transition verified live; the focus-return face
e2e-owned at mobile-navigation.spec.ts :67/:80 — the agent-browser
daemon cannot drive focus from eval, an instrument limitation probed
this round, not app behavior).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S35-1 | **LOW** (the accepted register's "the Tailwind .md-scanner residual" + "the natural-English prose-collision dead rules" + "the test-pin literal faces", three entries whose aggregate the register's framing never captured) | `src/app/globals.css:1` (`@import "tailwindcss";`) vs the shipped sheet `.next/static/chunks/*.css` (159,088 B) | v4's auto source detection anchors at the repo ROOT, not src/: the ~160 docs/session/plan/worklog/`*_SKILL.md` + tests + root-config files PLUS the 3,100-file skills/ catalog (the magnitude re-anchored session-36, S36-5b — the original text here said "300+", a figure matching no countable corpus) feed class-shaped prose into the scanner, and every candidate compiles into a rule no element carries. The real build verifiably ships `.bg-[#bada55]`, `[program:laravel-worker]`, `.to-amber-400`, `.bg-slate-900\/98` — none of which occur anywhere in src/ — at ~60% of the sheet (~95 KB, ~10–15 KB gzipped) on every page of the standalone artifact. The src/ face is fully cured (the S28-4/S33-1 prose-safe doctrine); the cure is the missing source scoping. The synthetic probe (this round): control form emits the dead classes at 192,442 B; `source(none)` + `@source` and `source("<dir>")` BOTH emit only the scoped source's classes at 4,812 B — the cure is one line in globals.css, mechanically proven against the installed 4.3.3. (AUDIT-2 A2-L1.) |
| S35-2 | **MEDIUM** (the S34-4 comment-truth genus, one bucket omitted) | `playwright.config.ts:67-76` (the webServer comment) | The S34-4 re-anchor fixed the login arithmetic but omits the suite's only 60-minute bucket: the contact route is `5/HOUR` with the limiter BEFORE the Zod parse (invalid POSTs count), and the suite spends 3 contact POSTs/run (contact.spec's browser form + the two API POSTs) — so a second run within the hour fails "the row landed" at the 6th cumulative POST. The comment's remediation "wait out the window (self-heals in 15 min)" is materially false for this bucket (60-min window). Also omitted: generate 6/run vs 20/15-min, reset 3/run vs 10, signup 2/run vs 10, forgot 2/run vs 10 (trip on later runs). An operator following the comment's own guidance hits a 429 the comment doesn't predict. (AUDIT-3 A3-M1.) |
| S35-3 | **LOW** (the S25-18b idiom's failure path, never actually implemented) | `prisma/seed.ts:62-69`, `scripts/e2e-prune.ts:42-49`, `scripts/e2e-contact-readback.ts:43-50`, `scripts/census.ts:61` | All three chained scripts call `process.exit(1)` INSIDE `.catch` — exit is synchronous, so the chained `.finally` never runs and `$disconnect()` is skipped exactly on the failure path, while the comments claim "the disconnect is AWAITED". census.ts has no `.catch` at all: a thrown count rejects into an unhandled rejection. readback constructs its PrismaClient at module scope BEFORE the argv check, so a usage error builds a client just to abandon it. The exit-code contract survives (bun prints the error, exits 1) — the gap is the documented teardown idiom being false on the failure path. (AUDIT-1 A1-L1 + A1-L2 + A1-I1, merged.) |
| S35-4 | **LOW** (the S31-4/S33-3/S34-1 donor-collision genus, the sweep still incomplete) | Ten bare sites: `src/lib/api.ts:24` (Session-67), `:64` (session-67/165), `src/lib/auth.ts:143` (N-67j), `src/app/api/auth/verify/route.ts:39` (N-67h), `:92` (N-67c), `src/lib/login-reset.ts:106` (M-79c1), `:133` (Session-111), `:179` (Session-96), `src/lib/rate-limit.ts:7` (Session-173, F-173a) | The S34-1 sweep marked the 35/37-41/62/63/79/147 strata and stopped. These ten sites carry bare higher donor numbers with no inline marker; §0.5's specific claim "the 80/88/163/164/165/166/173/194 sites carry their inline 'the template's/the scaffold's/the CRM's/the digma' attributions" is FALSE at its only Session-173 site (rate-limit.ts:7 — the file header's "same contract as the scaffold family" is a lineage note, not the claimed inline attribution). When this repo reaches its own sessions 96/111/173, the cites become ambiguous the exact way §0.5 exists to prevent. (AUDIT-1 A1-L3.) |
| S35-5 | **LOW** (the S34-7 mirror's pin polices only 15 of 29 faces) | `tests/error-boundaries.test.ts:141-150` vs `scripts/smoke-test.sh:256` (the 29-entry loop) | The hygiene-leg pin asserts the first-11 prefix + the 4-entry S34-7 chunk; the middle (AGENTS.md CLAUDE.md README.md Project_Architecture_Document.md) and tail (bun.lock package-lock.json eslint.config.mjs playwright.config.ts postcss.config.mjs tsconfig.json tsbuildinfo vitest.config.mts scripts tests) — 14 entries (the S36-5a arithmetic re-anchor; the original text here said 13, contradicting its own 11+4) — are covered by no `toContain`. Deleting any of them from the loop ships the pin green while the comment claims the enumeration mirrors the excludes. The on-disk mirror is complete; the pin must own the full loop. (AUDIT-3 A3-L1.) |
| S35-6 | **LOW** (the comment-truth batch, four sites) | `tests/gate-script.test.ts:10-13` · `viralpost-ai_SKILL.md:560` · `AGENTS.md:124` · `scripts/smoke-test.sh:28-30` | (a) gate-script's CI=1 comment still says "a third run inside 15 minutes fails the ladder" — under the S34-4 census the SECOND run trips LOGIN at the 11th cumulative POST; the sibling comment in playwright.config was re-anchored but this site was missed. (b) SKILL Appendix B's header says "re-certified through session 33" while its own body carries the session-34 counts — the header now contradicts its section. (c) AGENTS' plans-map line carries a stray ")" (the session-30 entry's paren plus the final one). (d) smoke-test.sh's file-header leg-16 summary still enumerates the pre-S34-7 8-entry subset; the loop now asserts 29. (AUDIT-3 A3-L2 + A3-L3 + A3-I1 + A3-I2, merged.) |
| S35-7 | **INFO→cure** (the S34-5 census's documented blind spots, closed while cheap) | `tests/docs-counts.test.ts:650-661` (SITE_ROOTS/SITE_FILES) | The provenance census scans src/, tests/ and the six root contract docs; a future `docs/session_1..N` range claim in scripts/, a root config, or worklog.md would evade it. Today zero such sites exist there (the worklog's only cite is a single-session reference, `docs/session_19.md` — not a range claim, out by construction). The census self-documents the limitation ("a site in a NEW root would need the root added here") — this round adds the roots. (AUDIT-3 A3-I4.) |

**Accepted register (this round's tail, with reasons):** the
`.env.local` unmodeled face (AUDIT-1 A1-I2 — the seam's signature check
models only `.env`; benign under bun 1.3.14's observed raw passthrough
and the absolutization causal model never reproduced on this sandbox —
a behavioral change to the repo's most load-bearing module is not
justified by an unreproduced shape; the next round may pick it up with
fresh fixtures); the signup admin-bootstrap TOCTOU (the standing
session-27 adjudication; no authorization gate reads `role` today); the
scryptSync cost/synchronous posture (the documented demo posture, rate
limits bounded); the login-response `photoUrl` asymmetry (no consumer
reads it from login — the avatar rides `/me`); the in-app OTP/reset
delivery default (the owner-level deferral, boot-warned); the footer
h2→h4 heading skip (parity-locked markup); the mobile-menu open state
surviving a breakpoint crossing (the S26-3 posture — no visible or a11y
consequence); the ParticleText sr-only inline-style duplication
(belt-and-braces); the Reveal SSR opacity posture (the documented
tradeoff); the worklog's structural inconsistencies (sessions 28-31's
header form; no session-1 entry — cosmetic in a historical record).

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins:**
- **S35-1a**: `tests/design-tokens.test.ts` — the "Tailwind v4 doctrine"
  describe block gains ONE it: "the source scan is scoped to src/
  (S35-1 — the repo-wide auto-detection shipped ~60% never-matched
  rules from docs/, tests/, and *.md prose)" asserting globals.css
  contains `@import "tailwindcss" source("../");` and does NOT contain
  the bare `@import "tailwindcss";` form. RED now (globals.css carries
  the bare form).
- **S35-3a**: `tests/db-census.test.ts` (the script-family pin file) —
  ONE it: "the one-shot family's teardown idiom (S35-3 — the awaited
  disconnect now runs on the failure path)": for each of
  prisma/seed.ts, scripts/e2e-prune.ts, scripts/e2e-contact-readback.ts:
  the text contains `process.exitCode = 1` (NOT `process.exit(1)`) and
  `.finally(async () =>` and `$disconnect()`; census.ts: the
  `invokedAsScript` arm carries the family form
  (`main().catch(…).finally(…)` — no bare `void main()`); readback: the
  argv check (`process.argv[2]`) appears BEFORE the `new PrismaClient`
  construction (a regex pin on the ordering). RED now.
- **S35-5a**: `tests/error-boundaries.test.ts` — the hygiene-leg pin's
  two partial chunks REPLACED by the full 29-entry loop line as ONE
  `toContain` (the exact `for entry in …; do` line verbatim). RED now
  (the current pin's two chunks are subsumed; the full-line form fails
  against the current pin text? No — the full line EXISTS on disk
  already; the pin is GREEN-on-arrival as a coverage-gap pin; the
  battery plants the defect: remove one entry from the loop → RED).

**Batch 2 — the GREEN cures:**
- **S35-1**: `src/app/globals.css:1` — `@import "tailwindcss";` →
  `@import "tailwindcss" source("../");` with the S35-1 lineage comment
  (the probe-proven form; `../` from src/app/ = src/ — the scanner
  loses the repo-root anchor; the S28-4 prose-safe doctrine stays as
  defense in depth). The winning form's definitive verification is the
  real build (the emitted sheet must drop the dead classes and keep
  every live class).
- **S35-3**: the four script edits — seed/e2e-prune/readback:
  `process.exit(1)` → `process.exitCode = 1` in the catch (the finally
  then runs on the failure path; the process still exits 1 after the
  chain settles); census.ts: `if (invokedAsScript) void main();` → the
  family form; readback: the argv check moves BEFORE the
  `new PrismaClient` construction (usage errors exit before anything is
  built; the usage path keeps `process.exit(2)` — nothing exists to
  tear down).
- **S35-2**: `playwright.config.ts` — the webServer comment's census
  sentence extended: contact 3/run vs the 5/**hour** wall (the one
  60-min window — a second run within the hour trips it at the 6th
  cumulative POST; self-heal is 60 min, or export CI=1); generate
  6/run vs 20, reset 3/run vs 10, signup 2/run vs 10, forgot 2/run vs
  10 (later runs); LOGIN still trips on the SECOND run (the 11th
  cumulative POST).
- **S35-4**: the ten donor-marker edits (word-level, line-structure
  preserved) — each cite gains its "(a donor-ledger number — …)"
  marker; §0.5's 173 claim becomes true at its only site
  (rate-limit.ts:7 carries the inline marker); the enumeration sentence
  unchanged (already comprehensive).
- **S35-5**: covered by Batch 1's RED pin (the pin IS the cure — the
  on-disk loop is already complete; the pin's battery owns the
  defense).
- **S35-6**: the four comment-truth edits — gate-script.test.ts
  ("a second run inside the window trips LOGIN at the 11th cumulative
  POST (7 logins/run vs the 10/15-min wall — the S34-4 census)"); SKILL
  Appendix B header → "re-certified through session 35" (with the body
  re-anchored to this round's counts in Batch 4); AGENTS.md's stray ")"
  removed; smoke-test.sh's header leg-16 summary re-anchored to the
  excludes-mirror families ("…logs, the contract docs, the configs,
  scripts/, tests/ — the in-loop enumeration is the authority").
- **S35-7**: `tests/docs-counts.test.ts` — SITE_ROOTS gains `scripts`;
  SITE_FILES gains `worklog.md`, `next.config.ts`,
  `playwright.config.ts`, `vitest.config.mts`, `eslint.config.mjs`,
  `postcss.config.mjs`. In-place (the existing its iterate the arrays);
  +0 tests.

**Batch 3 — the mutation batteries:**
- **S35-1**: revert globals.css to the bare import → the pin REDs; the
  compile probe (this round's synthetic form): the control emits the
  dead classes, the scoped forms do not (non-vacuity PROVEN — the
  mechanics, not the pin, remove the dead rules); restored → GREEN.
  The real-build verification: `bun run build` → the emitted sheet
  carries no `bada55`/`laravel-worker`/`to-amber-400` and every live
  class still emits; the sheet size drops ~60% (the pre-cure artifact
  is on record at 159,088 B).
- **S35-3**: plant `process.exit(1)` back into seed.ts → the teardown
  pin REDs; restore. Plant a bare `void main()` in census.ts → REDs;
  restore. Reorder readback's argv check after the client → the
  ordering regex REDs; restore.
- **S35-5**: remove `tests` (one tail entry) from the leg-16 loop →
  the full-line pin REDs; restore.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST — the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-35
  entry; UNIT 660 → **662** (+1 S35-1, +1 S35-3), E2E 65 unchanged,
  SMOKE 16 unchanged, SUITES 38 unchanged, badge 725 → **727**
  (UNIT + E2E).
- PAD: §8.1 table (662/65/16); §12 rows re-anchored to the live
  `wc -l` (globals.css — the S35-1 lines; smoke-test.sh — the header
  block; api.ts 263 stays unless the S35-4 markers move lines — the
  census walks them RED→GREEN).
- README: badge 727, the gate line, the session-35 status row, the
  Design-system note (the source scoping joins the documented Tailwind
  v4 posture).
- AGENTS: the counts (660→662 in Testing conventions), the plans map's
  thirty-fifth round, the stray-paren fix (Batch 2, S35-6).
- CLAUDE: the counts; the Tailwind v4 section gains the
  source-scoping line (the trap catalog's newest member).
- SKILL v1.30.0 → v1.31.0: frontmatter (version, date, project_state),
  §4's trap catalog gains the source-scoping entry, Appendix A's
  session-35 row, Appendix B's header ("through session 35") + body
  counts, the pre-ship checklist counts.
- The eight provenance sites re-anchored `session_1..34` →
  `session_1..35` (the S30-4 convention; lag 0 at ship).
- worklog Task 35; `docs/session_35.md` replaced with this round's
  formal log; this plan's post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  662/662 → build (with the S35-1 sheet-size and dead-class checks) →
  smoke 16/16 → e2e 65/65 (the axe-core a11y matrix is the visual
  regression net for the scoped sheet) → census MATCH.
- The parity walk RE-RUN post-cure (the computed-style faces must hold
  on the remediated sheet — the live classes' emission is unchanged by
  construction; the walk is the live proof).
- Captures 77/78 under `docs/screenshots/` on the dev server (the
  owner-instructed posture, the session-29..34 precedent): (77) the
  mobile-menu open clean-walk at 390×844 (the round's priority
  surface, functionally verified open — display block, the links + the
  Gumroad pill), (78) the landing hero. PIL-verified (dimensions +
  color depth). The dev server + the walk + the captures ride ONE
  invocation (the session-32 background-process lesson — this sandbox
  kills background processes between tool calls; probed twice this
  round).

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the tailwind source scoping + the
  script teardown idiom + the donor-marker tail + the comment-truth
  batch (session-35 audit)`; `.env.example` rides the commit (tracked,
  six-knob current, the provenance note re-anchored to 1..35).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the authority):
  the Appendix-A shim on PATH (this sandbox has no OpenSSH binary),
  the operator key materialized 0600 OUTSIDE the repo (never printed),
  dry-run first, real push, remote ref verified, key + temp material
  shredded.

## Acceptance criteria

1. Every new pin ships with its mutation battery on record (S35-1's
   and S35-3's pins RED-first; S35-5's pin is a coverage-gap completion
   whose battery plants the defect).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 662/662 (38 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
3. The shipped stylesheet carries no docs-sourced rules: the build's
   CSS contains none of `bada55`/`laravel-worker`/`to-amber-400`, every
   live class still emits, and the sheet dropped ~60% of its bytes —
   verified against the pre-cure 159,088 B artifact.
4. The visual faces hold on the scoped sheet: the e2e axe matrix green
   at both widths AND the parity walk re-run clean.
5. The four scripts' failure paths disconnect: the teardown pin + its
   three planted-defect batteries on record.
6. The ten donor cites carry their markers; §0.5's 173 claim true.
7. The hygiene pin owns the full 29-entry loop; the planted-removal
   battery on record.
8. The four comment-truth sites re-anchored; the census widened to
   scripts/ + the root configs + worklog.md.
9. Captures 77/78 PIL-verified under `docs/screenshots/`.
10. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST.
11. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 660 → 662 (+1 S35-1 in
  design-tokens — 28 tests in the file now; +1 S35-3 in db-census — 7
  tests), badge 725 → 727. The reality census confirmed 662/38 on disk
  before any doc site was touched; the constants were re-anchored
  FIRST.
- **A pre-existing pin surfaced by the S35-3 cure** — the S33-3 genus
  repeating: db-census's N-53a guard pinned the OLD drift-exit form
  (`process.exit(1)`) verbatim; re-anchored to the exitCode form in the
  same commit (the source-pinned contract: the pin follows the code).
  A second straggler: seed.ts's OWN S35-3 comment spelled the banned
  literal `process.exit(1)` verbatim — the prose-safe doctrine (the
  S28-4 lesson) applies to pin-banned literals too; re-spelled ("the
  synchronous exit call"). And census.ts carried a THIRD `process.exit`
  the audit's tail-read missed (the in-main drift-mismatch exit at
  :51, above the tail the audit read) — found by the pin's
  `.not.toContain` arm, exactly the pin doing its job; cured to the
  exitCode + return form.
- **The S35-1 battery on record**: the bare import planted → exactly
  the new pin RED (1 failed / 27 passed); restored → 28/28 GREEN. The
  non-vacuity proof is the synthetic probe (the control form emits the
  dead classes at 192,442 B; both scoped forms emit only the scoped
  source's classes at 4,812 B — through the installed 4.3.3, module
  resolution requiring the probe scratch to live INSIDE the repo).
  The real-build verification: the sheet dropped 159,088 → 64,053
  bytes (−59.7%); no `bada55`/`laravel-worker`/`to-amber-400`/dead-98
  rule; `.bg-slate-900` ×3, `.sr-only` ×1, `#0f172a` ×10 — every live
  class emitting, the theme surviving.
- **The S35-3 battery on record**: each of the three planted defects
  proven independently — (a) the synchronous exit back in seed → RED
  on the exitCode arm; (b) the bare void main() in census → RED on the
  family-form arm ("must own its failures"); (c) readback's argv check
  reordered after the client → RED on the ordering arm; restored →
  7/7 GREEN. The failure paths verified live: readback's usage error
  exits 2 with the message and nothing constructed; the census still
  MATCHes; `bun run db:census` green through the family form.
- **The S35-5 battery on record**: `tests` removed from the leg-16
  loop → exactly the hygiene pin RED (1 failed / 20 passed); restored
  → 21/21 GREEN.
- **The parity walk's instrument hardening (eight runs to green) is
  itself a finding of the round**: the `--viewport` flag on `open` and
  a bare `viewport` command are NOT real (innerWidth silently stayed
  1280 — `md:hidden` then computed display none and the entire mobile
  battery read desktop-width states, MATCHING vacuously); the reliable
  form is `agent-browser set viewport <w> <h>` + an innerWidth confirm.
  The toggle verify must be side-agnostic (our aria-expanded superset
  does not exist on the reference — verifying against ours made the
  census "retry" on the reference and CLOSE the menu the first click
  had opened). The oklab→sRGB equivalence is now numerical (Ottosson's
  transform in the walk's color canonicalizer —
  oklab(0.207678 −0.00293915 −0.0397103 / 0.95) lands exactly on
  rgb(15,23,42)@0.95, the reference's rgba spelling). The
  focus-return face stays e2e-owned: the daemon cannot drive focus
  from eval (a direct `.focus()` leaves activeElement=BODY — probed;
  an instrument limitation, not app behavior; mobile-navigation.spec.ts
  :67/:80 owns the behavioral face, 65/65).
- **The walk re-run post-cure**: 11/11 faces clean on the scoped sheet
  (login /, bar closed, hamburger, panel display block both sides,
  panel links, scrolled bar incl. the canonicalized oklab color,
  escape close, desktop 6|6, sitemap, robots, generator symmetry).
- **Captures 77/78**: the mobile-menu open at 390×844 — functionally
  verified open before the shot (open true, expanded 'true', the five
  links Home/Tool/Pricing/Contact/Upgrade to Pro – $19, panel display
  block) — plus the landing hero at 1280×800; both PIL-verified
  ((390,844) RGB; (1280,800) RGB).

**Final state:** lint 0/0 · tsc 0 · unit **662/662** (38 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **727**. The shipped sheet 64,053 bytes (was 159,088). Captures
77/78 PIL-verified on the dev server. Docs lockstep: README + AGENTS +
CLAUDE + PAD + SKILL v1.30.0 → v1.31.0 + the eight provenance sites
re-anchored to 1..35 + worklog Task 35 + docs/session_35.md + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
