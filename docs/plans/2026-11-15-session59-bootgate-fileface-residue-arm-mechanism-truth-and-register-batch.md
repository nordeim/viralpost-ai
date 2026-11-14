# Session-59 Plan — The Boot-Gate File-Face Residue Arm + The Mechanism-Truth Split + The Register Batch (2026-11-15)

The round opened on the shipped tree (`90db7af` = session-58's `84d3608` +
the owner's narration commit carrying `docs/session_59.md` as the round-59
working narration; this formal plan ships alongside the round). The core
docs re-read at the session-58 ship counts (UNIT 730 / SUITES 40 / E2E 70 /
E2E_SPECS 9 / SMOKE 16 / BADGE 800; SKILL v1.54.0; provenance
`docs/session_1..58.md`; PAD §12 db-path 512, generator-card 319 — every
site re-verified against disk), the session-58 set re-read (the formal
`docs/session_58.md` log, the session-58 plan's post-execution record,
worklog Task 58, the owner's narration), and the S58 cures verified in
source (the three S58-1a pins at tests/boot-env.test.ts:449-489; the
S58-1b arm at boot-env.ts:185-216; the S58-2 re-indent, whitespace-only
per `git show -w`).

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 · unit
730/730 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census
MATCH — zero drift from the session-58 ship record. The standing asks
re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root — created from the committed `.env.example`, census MATCH;
`.env.example` committed and code-verified (AUDIT-3: exactly six vars,
every comment claim true); the vitest + playwright suites in place and
current (730/70 green this round); the sitemap/robots/manifest/OG family
verified live against the reference in this round's walk; `skills/`
excluded from tsconfig/eslint/vitest + the smoke leg-16 hygiene mirror).
The neo-crm reference repo re-checked per the standing instruction:
unchanged (HEAD `b3d0fbe` — the twelfth consecutive no-change check).
The web-application skill + the skills catalog internalized; the tdd and
agent-browser doctrine (computed styles as ground truth, never eyeballs)
applied throughout — the walk probes as JS files consumed via
`agent-browser eval --stdin`, the session-56/57 lesson.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/2L/3I · AUDIT-2
(components/pages/effects): 0C/0H/0M/0L/2I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/5I — combined **0 Critical / 0 High /
0 Medium / 2 Low / 10 Informational**. AUDIT-1 re-verified the session-58
ship on its lane (the envelope discipline on all 13 handlers, the db seam
monopoly, the limiter, the transient classifier, PAD §12 line pins 21/21).
AUDIT-2 re-verified all seven Tailwind v4 mitigations (present, exact,
test-pinned) and the complete mobile-menu mechanic set, and re-ran the ten
source-pin suites covering its scope (248/248 green). AUDIT-3 re-derived
every count from disk (730/40/70/9/16/800, 58 plan files, the ten
provenance sites at 1..58, PAD §12 21/21 rows — all MATCH) and
re-verified the session-58 commit `84d3608` against its session log.

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 L1, verified in source AND probed live** — the S58-1 warning
  is blind to the @next/env single-line-unclosed shape. The arm's guard
  (`dbUrl !== undefined && dbUrl !== ""`, boot-env.ts:209-210) cannot
  fire when the loader DROPS the line to undefined (the round's own
  census, @next/env via the standalone server.js posture); meanwhile the
  db-path seam's own `.env` parse keeps the leading quote
  (parseEnvFile, db-path.ts:310-313 — no closing quote ⇒ the slice never
  runs) and `resolveDatabaseUrl` passes a non-`file:` value through RAW
  (db-path.ts:204). The live probe (this round,
  `runtimeDatabaseUrl(scratch)` with ambient env unset and a
  single-line-unclosed `.env`): resolved = `"file:../db/custom.db`
  (leading quote, NOT file:-prefixed), and the repo's own
  @prisma/client 6.19.3 answers `PrismaClientInitializationError` at the
  first invocation — a loud request-time failure with ZERO boot signal.
  The "no longer silent, in EVERY mode" claim (boot-env.ts:200-201) has
  a hole for this sub-shape.
- **AUDIT-1 L2, verified in source AND probed live** — the S58-1
  warning's mechanism sentence ("the runtime re-anchors it into a
  junk-named file under db/ that still serves a healthy boot … SELECT 1
  answers; the first User query fails P2021", boot-env.ts:214) is true
  ONLY for the bun SPAN face (the newline-embedded value still carries
  the `file:` prefix, so the anchors re-anchor it into the junk-named
  file — the S57-1 live-probed genus). The LEADING-QUOTE face never
  starts with `file:` — the same live probe answers the raw pass-through
  + `PrismaClientInitializationError`: no re-anchor, no junk file, no
  healthy boot. An operator debugging the leading-quote face is
  misdirected toward a junk file under `db/` that will not exist — a
  comment-truth defect in an operator-facing diagnostic.
- **AUDIT-2 I-1 verified in source (cat -A)** — hero.tsx:33 carries a
  trailing space before `>`; contact-form.tsx:58-59 and
  generator-card.tsx:106-107 carry double blank lines between hook
  blocks. Whitespace-only.
- **AUDIT-1 I1 folded into the L2 cure** — the `\p{Cc}` disjunct's
  over-attribution ("carries an unclosed quote residue" for a
  control char from any cause) resolves naturally in the per-face
  message split: the control-char face's message names the span genus
  as the LIKELY cause, the leading-quote face names its own mechanism.
- **AUDIT-1 I2/I3, AUDIT-2 I-2, AUDIT-3 I-1..I-5 adjudicated as
  registers** (below) — readBoundedJson bounds memory not time (the
  16KB-capped stream counter can hold until the platform's request
  timeout); the forgot-password degradation-window distinguisher (a
  known email 500s while an unknown answers the no-enumeration 200
  during a non-transient WRITE-failure window — the F9-7 residual); the
  aria-controls desktop posture (already the censused superset, S23-1);
  the framework-emitted 404 noindex (S27-6 posture, e2e+smoke-pinned);
  the manifest 192x192 same-src parity (A3-I1); the provenance lag-1
  narration-window transient (re-anchors at THIS ship); the 13th
  convenience script; the e2e 70 = 69+1 composition (census-owned).

## The parity walk (walk #32 — the thirty-second consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home`. The hamburger `md:hidden p-2 text-slate-300` base (cursor
pointer, block, 8px padding, transparent bg — NO aria family, all three
attributes null). The panel inner `px-6 py-4 space-y-3` byte-identical
(16px/24px padding, block, maxHeight none, transparent background);
linkTexts identical (Home, Tool, Pricing, Contact, Upgrade to Pro –
$19); Home teal rgb(45,212,191) 14px/500 block; the siblings
rgb(203,213,225) 14px/500 block; the pill rgb(15,23,42) 14px/600 block
(9999px radius — the v3-era spelling; the panel's own
`bg-slate-900/98` dead class computing transparent, the documented
face). Escape via a REAL key press leaves the reference's panel open
(panelDivs 1, display block). The outside-tap face (a genuine non-nav
H1 tap) leaves it open. Route-change at /Pricing — the reference
UNMOUNTS the panel (panelDivCount 0), title "Pricing | ViralPost AI".
Desktop census: 6 VISIBLE links IDENTICAL (ViralPost AI, Home, Tool,
Pricing, Contact, Upgrade to Pro); the brand wordmark gradient
byte-identical (linear-gradient(to right, rgb(45,212,191),
rgb(251,191,36)), 18px/700, background-clip text). The five-route head
census identical (the per-route prefix family `<Page> | ViralPost AI`,
the bare `/` and `/login` titles, the 170-char plain description on `/`
+ the per-route `<Page> on ViralPost AI.` family, canonicals, the
single shared ogImage, summary_large_image). Sitemap exactly 4 URLs
(weekly, 1.0/0.8/0.8/0.8) + robots Allow-all + Sitemap line. The
generator probe: DEAD (no generation lands, no copy button, no quota
keys, the generate button re-enabled with nothing rendered — the
documented 402 face).

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): the login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner 16px/24px, block,
maxHeight none, transparent bg; linkTexts + every link style identical;
the pill 3.35544e+07px radius — v4's infinity calc rendering the
identical capsule the reference's 9999px renders, the documented v3/v4
computed-value equivalence). The hamburger base identical
(`md:hidden p-2 text-slate-300` + our focus-ring superset) with the
aria superset ACTIVE (aria-controls mobile-menu; expanded
false→true; the Open/Close-menu relabel — live-verified on the open
panel). Escape closes OUR menu with focus returned to the toggle (panel
display none, hidden attr present, aria false, focusOnToggle true — the
documented superset). The outside-tap face leaves it open (parity).
Route-change close at /Pricing: ours hides in-DOM (panelCount 1,
display none, hidden attr, aria false — the S26-1 design; the
documented R-unmount/L-hide divergence), title "Pricing | ViralPost
AI". Desktop census: 6 VISIBLE links IDENTICAL, CLONE total 11 = 6
visible + 5 hidden panel anchors; the brand gradient byte-identical.
The five-route head census identical modulo origin. Sitemap 4 URLs +
robots identical modulo origin. The generator LIVE: a 5-hashtag post
(in the 5-8 family) + the Copy button, quota 0→1 (the
`viralpost_generations` counter key `{"date":"…","count":1}` — the
D-1 documented superset). **ALL CLONE FACES MATCH — no clone-side
drift, no NEW reference-side drift. Mobile nav verified working as
expected on both sides; all seven Tailwind v4 mitigations verified
present and test-pinned (the audit's own lane).**

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S59-1a — the five behavioral/wiring pins** (tests/boot-env.test.ts,
  a new describe for the file-face arm + one pin extending the
  instrumentation source-pin family):
  - Pin 1, the FILE-FACE residue — `databaseUrlFileResidueWarning`
    with the @next/env single-line census (envUrl undefined, the .env
    file value `"file:../db/custom.db` — both quote-char spellings)
    returns the unclosed-quote warning naming the loader-dropped face,
    the raw pass-through + PrismaClientInitializationError mechanism,
    and the fix; a CLEAN file value (`file:../db/custom.db`, the e2e
    override, an absolute value) with envUrl undefined stays SILENT
    (the launch-recovery posture — the seam consumes the clean .env
    value with zero residue).
  - Pin 2, the ENV-FACE GUARD (one owner, the N12-2 doctrine) — envUrl
    SET (a clean override: the file residue never reaches the engine;
    OR the residue itself: the S58-1 arm already owns that face) keeps
    the file arm SILENT (exactly one warning total on the
    residue-in-env face — the S58-1 arm's).
  - Pin 3, the DEV-MODE face — NODE_ENV=development + envUrl undefined
    + the file residue warns (the F10-11 doctrine: the operator edits
    .env in dev).
  - Pin 4, the MECHANISM-TRUTH split — the process-env arm's
    LEADING-QUOTE warning names the raw pass-through +
    engine-rejection mechanism and does NOT carry the junk-file
    sentence; the SPAN (control-char) warning keeps the junk-file +
    P2021 sentence (the existing S58-1a span pin's P2021 assertion
    stays green untouched).
  - Pin 5, the WIRING pin (source-pinned) — instrumentation.ts calls
    `databaseUrlFileResidueWarningsForServer` after the shadow
    warnings.
  - The batteries (each plant REDs exactly its own pin): the
    quote-disjunct plant (the file arm's leading-quote disjunct
    dropped) REDs Pin 1's residue arm; the always-warn plant (the file
    arm fires on any file value) REDs Pin 1's clean-silent arm; the
    envUrl-guard plant (the guard dropped) REDs Pin 2; the mode-gate
    plant (a production-only "cure") REDs Pin 3; the split-revert
    plant (both faces get the junk-file sentence) REDs Pin 4; the
    unwire plant (the instrumentation call dropped) REDs Pin 5.
- **S59-1b — the arm + the mechanism truth** (src/lib/boot-env.ts +
  src/instrumentation.ts + src/lib/db-path.ts):
  - The S58-1 warning SPLITS per trigger face: the control-char (span)
    face keeps the current message verbatim (the junk-named file, the
    healthy boot, SELECT 1, P2021 — the live-probed bun genus); the
    leading-quote face gets its own message — the value does not start
    with `file:`, the db-path seam passes it through raw, and the
    engine answers PrismaClientInitializationError at the first
    DB-touching invocation (this round's live probe; no junk file is
    created) — both name the fix. The S58-1 comment block's mechanism
    sentence corrects with the split (comment truth).
  - The file-face arm: `databaseUrlFileResidueWarning(envFileUrl,
    envUrl)` — PURE over the two faces (the pin target). Fires ONLY
    when the process-env face is unset (the loader dropped the line —
    the ONLY posture where the file residue reaches the engine unseen)
    AND the .env file value carries a leading quote or a control
    character. The server wrapper `databaseUrlFileResidueWarningsForServer(env)`
    probes the SAME deduped cwd ∪ PWD union as the shadow wrapper (the
    S50-1/S51-1/S52-5 lineage — the dir logic extracted to one shared
    helper, a pure refactor the shadow pins hold green for), reads
    each dir's `.env` DATABASE_URL through `parseEnvFile` imported
    from `./db-path` (the one-home parse — the warning's predicate and
    the runtime consumption share one parser), and collects the
    warnings. The PWD-less process-manager boundary inherits the S51-1
    register (documented in the arm's comment).
  - instrumentation.ts wires the wrapper after the shadow warnings
    (warn-only, the `[boot]` family, printed after the report).
  - db-path.ts's S57-1b docblock tail updates: the genus is no longer
    silent on ANY loader face — the boot gate names the residue the
    process env carries (S58-1) AND the .env-file face the @next/env
    single-line shape drops to undefined (session-59, S59-1).
- **S59-2 — the whitespace batch** (the session-58 precedent):
  hero.tsx:33's trailing space before `>`; contact-form.tsx:58-59 and
  generator-card.tsx:106-107's double blank lines collapse to single.
  Whitespace-only — hero/contact-form are not §12 files; generator-card
  319 → 318 (PAD §12 re-anchors; the designed count-lag face).
- **S59-3..S59-9 — the registers** (carried in the session log):
  readBoundedJson's time-unbounded 16KB stream (the documented
  limitation extends to name it), the forgot-password write-failure
  enumeration window (the F9-7 residual), the aria-controls desktop
  posture cross-ref (S23-1), the framework-emitted 404 noindex (S27-6),
  the manifest 192x192 same-src parity (A3-I1), the 13th convenience
  script (the S44-4 census's advertised set unaffected), the e2e
  69+1 composition (census-owned), and the bun-audit triage: the SAME
  9 advisories as the session-55/56/57/58 records (3 high / 5 moderate
  / 1 low — minimatch/eslint, deepmerge-ts/prisma CLI, the vite
  family/vitest chain, source-map-js/postcss) — ALL dev-toolchain,
  NONE on the runtime request path. No action.

## The count re-anchor (the census's own guards own the truth)

UNIT 730 → 735 (+5 — the five S59-1a pins), SUITES 40 held, E2E 70
held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 800 → 805. PAD §12:
generator-card.tsx 319 → 318 (the double-blank collapse);
db-path.ts's row re-anchors by the docblock delta (measured at the
edit); boot-env.ts is NOT a §12 file (re-verified this round). The
designed count-lag faces fire at the lockstep exactly as the doctrine
describes (the census driving the docs). The ten provenance sites
re-anchor to 1..59 — lag 0 at ship (docs/session_59.md exists on disk
as the owner's narration; the formal log replaces its content). SKILL
v1.54.0 → v1.55.0.

## Docs lockstep at ship

README (the badge 805, the session-59 row on the continuous table, the
gate footer re-spell to the session-59 ship, the testing-table 735
sites); AGENTS (the plans map's fifty-ninth round, the 735 in the
testing conventions); CLAUDE (the 735 line); PAD (§8.1's table + the
carry line, §12's generator-card 318 + db-path delta rows); SKILL
v1.54.0 → v1.55.0 (frontmatter, project_state, §0.5 1..59, Appendix
A's session-59 row, Appendix B's header); the docs-counts constants
(UNIT 735, BADGE 805) + the census ladder's s59 entry; the ten
provenance sites at 1..59; worklog Task 59; docs/session_59.md (the
formal log replacing the owner's narration); this plan's
post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results (db/custom.db is
gitignored). Conventional Commit to `main` only, push via the SSH
wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
125/126 on the dev server (the owner-instructed posture, the
session-29..58 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified, absolute capture paths (the
session-56 lesson).

## The post-execution record (session-59 ship)

Executed as planned, with the deviations the record owes the truth:

- **S59-1a landed first (TDD)** — the pins born RED against the
  signature stub (the arm absent, the designed red→green flow): 4 of
  the 5 RED at birth; the ENV-FACE guard pin green-vacuous against
  the null stub BY DESIGN (a silence pin cannot fail while the arm
  returns null) — its teeth proven at the battery step (the
  envUrl-guard plant REDs exactly it post-GREEN). All six batteries
  on record: the quote-disjunct plant REDs pins 1+3 (the documented
  dev co-pin), the always-warn plant REDs exactly pin 1, the
  envUrl-guard plant REDs exactly pin 2, the mode-gate plant REDs
  exactly pin 3, the split-revert plant REDs exactly pin 4, the
  unwire plant REDs exactly pin 5 — all restored GREEN, the one
  co-pinning documented in the dev pin's comment (the N12-2
  doctrine).
- **The probe before the prose**: both cure messages name
  PrismaClientInitializationError because the round's live probe
  observed it (the seam's raw answer `"file:../db/custom.db` fed to
  the repo's own @prisma/client 6.19.3 — PrismaClientInitialization
  Error at the first invocation) — the mechanism sentences are
  evidence-backed, not reasoned. The mechanism discriminator is the
  `file:` prefix (the plan's drafted control-char-vs-quote split was
  refined at implementation to key on the actual mechanism: a
  file:-prefixed residue re-anchors into the junk-named file, a
  non-file: residue passes through raw — true for all four
  predicate/mechanism combinations).
- **The parseEnvFile leaf extraction (S59-1b's mid-gate deviation)**:
  the planned `import { parseEnvFile } from "./db-path"` in boot-env
  ballooned the instrumentation artifact trace 4 → 79 files
  (scripts/prisma-env.ts + prisma/seed.ts rode into .next/standalone —
  the smoke hygiene leg-16 RED, the guardrail holding). The root cure:
  parseEnvFile moved verbatim to the zero-import leaf
  src/lib/env-file.ts; db-path imports + re-exports it; boot-env
  imports the leaf. Trace 79 → 5 on the rebuilt artifact; the
  one-home doctrine holds (the warning and the runtime share the same
  parse); PAD §12's db-path row re-anchored again 518 → 458.
- **The shared serverEnvProbeDirs extraction** (the S50-1/S51-1/S52-5
  dir logic, one home for the shadow and file-face wrappers) was a
  deliberate pure refactor beyond the plan's drafted shape —
  duplicating the 30-line union logic in a second wrapper would have
  been the divergence hazard the S23-7 seam retirement cured once
  before; the shadow pins held the refactor green.
- **One unintended RED fired mid-lockstep and was cured at its
  root**: the design-tokens step-less census read the round's own new
  "shadow-seam" comment compound as a `shadow-<word>` utility —
  rephrased to "the shadow seam's pattern" (the S49-11 genus: English
  prose, never a class; the minimal cure for brand-new prose is
  rephrasing, not allowlist growth).
- **The designed count-lag faces fired and were cured at the
  lockstep**: the PAD §12 inventory rows on the db-path drift
  512 → 518 and the generator-card drift 319 → 318, the UNIT-constant
  reality census (730 vs disk 735), the plans-map tail-currency on
  the 59th plan file — all GREEN at the lockstep, plus the SKILL
  pre-ship checklist's 730 site (the lockstep enforcer's own pin).
- Counts at ship: UNIT 735 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 805 — the ten provenance sites at 1..59 (lag 0);
  SKILL v1.55.0; captures 125/126 on the dev server PIL-verified; the
  full gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.
