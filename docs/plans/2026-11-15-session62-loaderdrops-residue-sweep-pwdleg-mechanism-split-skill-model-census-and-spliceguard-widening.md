# Session-62 Plan — The Loader-Drops Residue Sweep + The PWD-Leg Mechanism Split + The SKILL Model Census and the Splice-Guard Widening (2026-11-15)

The round opened on the shipped tree (`ab1a535` = session-61's `21e1722` +
the owner's narration commit carrying `docs/session_62.md` as the round-62
working narration; the formal log replaces its content at ship). The core
docs re-read and re-verified at the session-61 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.57.0 — every lockstep site confirmed on disk), then
the session-61 set (the formal `docs/session_61.md` log, the session-61
plan's post-execution record, worklog Task 61, the owner's narration in
`docs/session_62.md`), and the S61 cures verified in source (the S61-1a
loader-census re-anchor at boot-env.test.ts:505+; the `dropped`-clause
respell at boot-env.ts:536; the stats-star annotation at sections.tsx:317;
the S61-3 splice-residue guard at docs-counts.test.ts:569+). This round is
session 62, the standing instruction on the shipped tree.

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 · unit
740/740, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH — zero drift from the session-61 ship record. The standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root, census MATCH — the .env rebuilt
from `.env.example` on the fresh clone per the documented bootstrap; the
`.env.example` committed and code-verified at every comment claim; the
vitest + playwright suites in place and current (740/70 green this
round); the sitemap/robots/manifest/OG family verified live against the
reference in this round's walk #35; `skills/` excluded from every gate —
the tsconfig/eslint/vitest configs + the smoke leg-16 hygiene mirror).
The neo-crm reference repo re-checked per the standing instruction:
unchanged (HEAD `b3d0fbe` — the fifteenth consecutive no-change check).
The web-application skill + the skills catalog internalized; the tdd and
agent-browser doctrine (computed styles as ground truth, never eyeballs)
applied throughout — the walk probes as JS consumed via `agent-browser
eval`, run in single Bash invocations against the sandbox's
process-reaping boundary.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/3L/2I · AUDIT-2
(components/pages/effects): 0C/0H/0M/0L/0I — the lane CLEAN · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/1I — combined **0 Critical / 0
High / 0 Medium / 3 Low / 3 Informational**. AUDIT-1 re-verified the
full standing-contract set on its lane (the envelope discipline on all
13 handlers, the db seam monopoly, the status discipline with
Retry-After on every 429, the transient classifier, the limiter, the
auth family, the scripts). AUDIT-2 re-verified all seven Tailwind v4
mitigations (with an empirical probe of the shipped sheet — zero dead
rules), the complete mobile-menu mechanic set, the React 19 pattern law
across every effect in scope, and the WCAG floor (the two rendered
decorative glyphs are exactly the two annotated ones). AUDIT-3
re-derived every count from disk (740/40/70/9/16/810, 62 session docs,
61 plan files, the ten provenance sites, PAD §12 21/21 rows — all
MATCH) and confirmed the docs-counts lockstep.

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 L1 (the round's headline), verified verbatim in source** —
  the session-61 S61-1 respell was scoped to `boot-env.ts` only; the
  same falsified loader-drops census ("@next/env … the single-line
  shape drops to undefined") survives in SIX live-tense sites outside
  that scope: `src/instrumentation.ts:27-32` (the S59-1 wiring
  comment), `src/lib/env-file.ts:53-57` (the docblock's S59-1
  clause), `tests/boot-env.test.ts:443-446` (the session-58 census
  header), `tests/boot-env.test.ts:491-504` (the session-59 describe
  header AND its describe title), and PAD §12's db-path row (the
  "no-silent-face completion — @next/env's drop-to-undefined shape"
  clause). Comment-truth of exactly the genus S61-1 itself was.
- **AUDIT-1 L3 (the mechanism-truth find), verified by a DIRECT live
  probe of the standalone artifact** — the file-face residue warning's
  mechanism sentence is DIR-LEG-ASYMMETRIC. The wrapper
  (`databaseUrlFileResidueWarningsForServer`) probes the cwd ∪ PWD
  union, but the runtime tail (`runtimeDatabaseUrl` →
  `readDatabaseUrlFromEnvAt(cwd)`) reads ONLY the server CWD's .env.
  The probe (node-booted `.next/standalone/server.js` from the repo
  root — the documented launch posture where server.js chdirs into
  the artifact dir while PWD stays at the repo root — with a
  single-line-unclosed `DATABASE_URL="file:../db/custom.db` residue
  .env at the repo root, ambient `DATABASE_URL` unset, `AUTH_SECRET`
  via the process env): the PWD-leg file-face warning FIRED
  ("…the db-path seam's own .env parse keeps the quote and hands the
  engine the value raw, and the Prisma engine answers
  PrismaClientInitializationError at the first DB-touching
  invocation…") AND the server booted HEALTHY against the REAL
  database — `/api/health` answered `{"ok":true,"data":{"status":
  "healthy","db":"up"}}`. The predicted engine failure NEVER HAPPENED:
  the PWD leg's residue is inert (the engine resolved the default
  URL). The sentence is true only on the CWD leg (the runtime's own
  consumption — session-59's probe shape). The S59-1 mechanism-truth
  genus, one dir-face deeper.
- **AUDIT-1 L2, verified in source** — SKILL §16's "Complete Interface
  Reference" User comment lists 14 of the 15 live schema fields:
  `photoUrl` (schema.prisma:23, wire-visible on /api/auth/me since
  session 1) is missing — the exact twin of PAD §4.1's S40-9 omission,
  on the one face the S40-11a census's scoping left unpinned.
- **AUDIT-3 I1, verified in source** — the S61-3 splice-residue guard
  bans only `unit \d+/\d+` fragments in the README post-footer region;
  a partial stale tail carrying only `smoke N/N`/`e2e N/N` fragments
  would evade it (prospective-only; the region on disk is clean).
- **AUDIT-1 I1/I2 + AUDIT-3's clean lane adjudicated** — the respelled
  cause clause's empty-ambient corner (a set-but-empty ambient
  `DATABASE_URL` where a loader consumed the .env but could not
  override the existing key — the S30-1 documented docker-compose/CI
  shape; the warning's fix guidance stays correct) is REGISTERED; the
  `dropped` constant's vestigial NAME is cured as part of S62-2 (the
  rename to `unseen`); instrumentation.ts's S47-2 comment-anchor
  displacement (session-59's loop insertion separated the comment from
  its loop) is cured as part of S62-1 (the re-anchor). The bun-audit
  triage (the AGENTS.md periodic duty): the SAME 9 advisories as the
  session-55..61 records (3 high / 5 moderate / 1 low — deepmerge-ts,
  source-map-js, the vite/vitest dev-toolchain family, minimatch) —
  ALL dev-toolchain/build-time, NONE on the runtime request path. No
  action.

## The parity walk (walk #35 — the thirty-fifth consecutive clean walk)

REF leg (live, logged in with the demo credentials — the "Sign in"
email/password submit, not the Google OAuth button): login settled at
`/Home`. The hamburger `md:hidden p-2 text-slate-300` base (cursor
pointer, block, 8px padding, rgb(203,213,225), transparent bg — NO aria
family, all three attributes null). The panel inner `px-6 py-4
space-y-3` byte-identical (16px/24px padding, block, maxHeight none,
transparent background — the reference's own `bg-slate-900/98` dead
class computing transparent, the documented face; the panel div carries
the dead class verbatim); linkTexts identical (Home, Tool, Pricing,
Contact, Upgrade to Pro – $19); Home teal rgb(45,212,191) 14px/500
block; the siblings rgb(203,213,225) 14px/500 block; the pill
rgb(15,23,42) 14px/600 block (9999px radius — the v3-era spelling).
Escape via a REAL key press leaves the reference's panel open. The
outside-tap face (a genuine non-nav H2 tap below the open panel) leaves
it open. Route-change at /Pricing — the reference UNMOUNTS the panel
(panelInnerCount 0), title "Pricing | ViralPost AI". Desktop census: 6
VISIBLE links IDENTICAL (ViralPost AI, Home, Tool, Pricing, Contact,
Upgrade to Pro); the brand wordmark gradient byte-identical
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), 18px/700,
background-clip text). The five-route head census identical (the bare
`/` and `/login` titles, the per-route `<Page> | ViralPost AI` family,
the 170-char plain description on `/` + `/login` and the 92/95/95-char
per-route family, the canonicals, the single shared ogImage, summary
_large_image). Sitemap exactly 4 URLs (weekly, 1.0/0.8/0.8/0.8) +
robots Allow-all + Sitemap line. The generator probe: the reference's
generator DEAD (no generation lands, no copy button, no quota keys,
the generate button re-enabled with nothing rendered — the documented
402 face).

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): the login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner `px-6 py-4
space-y-3` 16px/24px, block, maxHeight none, transparent bg; linkTexts
+ every link style identical; the pill 3.35544e+07px radius — v4's
infinity calc rendering the identical capsule the reference's 9999px
renders, the documented v3/v4 computed-value equivalence). The
hamburger base identical (`md:hidden p-2 text-slate-300` + our
focus-ring superset) with the aria superset ACTIVE and live-verified
(aria-controls mobile-menu — the panel id live; expanded false→true on
the open panel; the Open/Close-menu relabel). Escape closes OUR menu
with focus returned to the toggle (visiblePanelCount 0, hidden attr
present, aria false, focusOnToggle true, activeElement BUTTON — the
documented superset). The outside-tap face (a genuine non-nav H2 tap
below the open panel) leaves it open (parity). Route-change close at
/Pricing: ours hides in-DOM (panelInnerCount 1, aria false — the S26-1
design; the documented R-unmount/L-hide divergence), title "Pricing |
ViralPost AI" in the head census. Desktop census: 6 VISIBLE links
IDENTICAL; the brand gradient byte-identical (18px/700, clip text).
The five-route head census identical modulo origin (the bare titles,
the 170-char `/` description, the 92/95-char per-route family, the
canonicals, the single shared og-image.png, summary_large_image).
Sitemap 4 URLs + robots identical modulo origin. The generator LIVE:
a 7-hashtag post (in the 5-8 family) + the Copy button, quota 0→1
(the `viralpost_generations` counter key `{"date":"Sun Nov 15 2026",
"count":1}` — the D-1 documented superset). **ALL CLONE FACES MATCH —
no clone-side drift, no NEW reference-side drift. Mobile nav verified
working as expected on both sides; all seven Tailwind v4 mitigations
verified present and test-pinned this round (the audit's own lane,
with the shipped-sheet empirical probe).** Captures 131/132 on the dev
server PIL-verified (99.7%/99.9% non-white, teal present at
3.66%/1.52%).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S62-1a — the loader-drops residue-sweep census pin**
  (tests/docs-counts.test.ts, one new it): none of the five live-tense
  files (`src/instrumentation.ts`, `src/lib/env-file.ts`,
  `src/lib/boot-env.ts`, `tests/boot-env.test.ts`,
  `Project_Architecture_Document.md`) may carry the falsified
  loader-drops claim family — the regex
  `/drops? (the line|a single-line|to undefined)|drop-to-undefined/i`.
  The frozen history layer (README's session-58/59 rows, SKILL
  Appendix A's rows, the docs-counts ledger's own s59 entry — the
  round records) stays exempt, documented in the pin's comment. The
  battery: the claim-replant plant (re-plant the falsified clause in
  instrumentation.ts) REDs the census; restored GREEN.
- **S62-1b — the loader-drops residue sweep** (six live-tense sites +
  three narration re-spells, comment-truth only — the S56-1/S61-1
  precedent): `instrumentation.ts` — the S59-1 wiring comment
  re-spelled to the unloaded-.env truth (NO sanctioned loader consumed
  the .env; the process env carries no value) AND the S47-2 comment
  block re-anchored to its own loop (the AUDIT-1 I2 cure —
  session-59's loop insertion had separated them);
  `src/lib/env-file.ts` — the docblock's S59-1 clause re-spelled the
  same way; `tests/boot-env.test.ts` — the session-58 census header's
  falsified tail re-spelled (@next/env NEVER spans — TRUE — and the
  single-line-unclosed value rides the process env when a loader
  consumed the file; the file-face arm's real coverage is the
  unloaded-.env postures), the session-59 describe header re-spelled
  to the unloaded-.env premise, the describe title re-anchored
  ("(the unloaded-.env postures the process-env arm cannot see)"),
  and the S61-1 pin's verbatim falsified quote re-spelled to the
  attribution-only form (the falsification story + the S61-1 citation
  stay; the verbatim spelling goes — the census's one exemption
  removed); `src/lib/boot-env.ts` — the two verbatim narrations
  (:203-204, :472-475) re-spelled to attribution-only the same way;
  PAD §12's db-path row — the S59-1 clause re-spelled to "the
  no-silent-face completion — the file-face arm for the
  unloaded-.env postures, session-59 S59-1". No behavior change.
- **S62-2a — the PWD-leg mechanism-truth pin** (tests/boot-env.test.ts,
  a new session-62 describe): the pure seam on the PWD leg
  (`runtimeConsumesFile: false`) names the INERT-RESIDUE truth —
  contains "PWD leg" + "never sees the residue" + the cause clause +
  the per-face fix guidance; does NOT contain
  "PrismaClientInitializationError" or "junk-named file" (both quote
  and control-char faces); the CWD leg (the two-arg default — every
  existing pin's form) KEEPS the S60-1b per-face mechanism sentences
  verbatim (the quote face names the raw pass-through +
  PrismaClientInitializationError; the file: control-char face names
  the junk-named file). Born RED against the pre-split seam (the
  PWD-leg form does not exist). The battery: the split-revert plant
  (the PWD-leg branch returning the consumed-leg message) REDs
  exactly the pin; restored GREEN.
- **S62-2b — the wrapper wiring pin** (source-census, the S29-2
  idiom): boot-env.ts's wrapper passes the leg discriminator
  (`d === process.cwd()`) — the wrapper's own loop is the only place
  the leg is knowable. The battery: the wrapper plant (drop the
  discriminator, restore the two-arg call) REDs exactly this pin
  while S62-2a holds (the pure seam's split untouched); restored
  GREEN.
- **S62-2c — the PWD-leg mechanism split** (src/lib/boot-env.ts): the
  pure seam gains `runtimeConsumesFile: boolean = true` (the default
  preserves every two-arg call verbatim — the S61-1/S59-1/S60-1 pins
  hold untouched); the PWD-leg branch emits the inert-residue truth
  ("this directory is the PWD leg and the db-path seam's runtime
  reads only the server CWD's .env, so the engine never sees the
  residue (it resolves the default URL and boots against the real
  database) — the malformed line is inert until a loader consumes
  this file"); the `dropped` local re-named `unseen` (the AUDIT-1 I1
  vestige — the constant's value stopped saying "dropped" at S61-1);
  the wrapper passes `d === process.cwd()`. The live probe's evidence
  (the healthy boot against the warning's predicted failure) is the
  cure's mechanism comment.
- **S62-3a — the SKILL §16 model census pin** (tests/docs-counts.
  test.ts, one new it): the S40-11a idiom extended to the SKILL's
  §16 "// The models (prisma)" comment block — every live schema
  field (User AND ContactMessage, derived from schema.prisma on disk)
  must appear there. The battery: the photoUrl-removal plant REDs
  exactly it; restored GREEN.
- **S62-3b — the SKILL §16 photoUrl completion**
  (viralpost-ai_SKILL.md §16): the User comment gains `photoUrl`
  (after avatarColor, the schema's own order) — the interface
  reference complete at 15/15 fields.
- **S62-4a — the splice-guard fragment-class widening**
  (tests/docs-counts.test.ts, the S61-3 guard's regex): the banned
  class widens from `unit \d+/\d+` to `unit \d+/\d+|smoke \d+/\d+|e2e
  \d+/\d+` (the AUDIT-3 I1 hardening — a partial stale tail carrying
  only smoke/e2e fragments joins the banned genus; the guard's
  comment gains the S62-4 note). The battery: the smoke-tail splice
  plant (a stale `build · smoke 17/17 · e2e 71/71.` tail with NO unit
  fragment — invisible to the old class) REDs the widened guard;
  restored GREEN.
- **S62-5..S62-6 — the registers** (carried in this log): the
  respelled cause clause's empty-ambient corner (a set-but-empty
  ambient DATABASE_URL where a loader consumed the .env but could not
  override the existing ambient key — the S30-1 documented shape; the
  warning and its fix guidance stay correct); the frozen history
  layer's loader-drops claims (README's session-58/59 rows, SKILL
  Appendix A, the docs-counts ledger's s59 entry — the correction
  lives in THIS round's records, never as history edits). The
  bun-audit triage: the SAME 9 advisories as session-55..61 — ALL
  dev-toolchain, NONE on the runtime request path. No action.

## The count re-anchor and the docs lockstep

UNIT 740 → 744 (+4 — the S62-1a residue-sweep census, the S62-2a
PWD-leg pin, the S62-2b wrapper wiring pin, the S62-3a SKILL model
census), SUITES 40 held, E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held,
BADGE 810 → 814. NO PAD §12 row changes (instrumentation.ts,
env-file.ts, boot-env.ts, boot-env.test.ts, docs-counts.test.ts, the
SKILL — all non-§12 files; the db-path §12 row's PROSE re-spell is
line-count-neutral, re-verified this round). The designed count-lag
faces fire at the lockstep exactly as the doctrine describes (the
UNIT-constant reality census; the plans-map tail-currency on the 62nd
plan file). The ten provenance sites re-anchor to 1..62 — lag 0 at
ship (docs/session_62.md exists on disk as the owner's narration; the
formal log replaces its content). SKILL v1.57.0 → v1.58.0. README: the
badge 814, the session-62 row on the continuous table, the gate footer
re-spelled to the session-62 ship, the testing-table 744 sites. AGENTS:
the plans map's sixty-second round, the 744 in the testing conventions.
CLAUDE: the 744 line. PAD: §8.1's table + the carry line at 744/70/16.
The formal session log (this round's docs/session_62.md), the plan's
post-execution record, and worklog Task 62 (this round's own set).

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results (db/*.db is gitignored).
Conventional Commit to `main` only, push via the SSH wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
131/132 on the dev server (the owner-instructed posture, the
session-29..61 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified, absolute capture paths (the
session-56 lesson).

## The post-execution record (session-62 ship)

Executed as planned, with the deviations the record owes the truth:

- **The four pins landed first (TDD)** — all four born RED together (the
  S62-1a census, the S62-2a PWD-leg pin, the S62-2b wrapper pin, the
  S62-3a model census) plus the S62-4a widening, alongside the two
  designed count-lag faces (the UNIT reality census 740 vs disk 744;
  the plans-map tail-currency on the 62nd plan file): 6 failed at the
  designed RED. The GREEN phase: S62-2c (the mechanism split), S62-1b
  (the residue sweep — instrumentation.ts, env-file.ts, boot-env.ts's
  two narrations, boot-env.test.ts's headers + title + the S61-1 pin's
  quote, PAD §12's db-path row), S62-3b (the photoUrl completion); the
  count-lag faces held until the lockstep per the doctrine, then cured
  at the constants + the doc sites (the lockstep failures enumerated
  their own sites — the census driving the docs, its own doctrine).
- **The S62-2a pin's tab-fixture repair (the round's one mid-round
  deviation)**: the pin's control-char fixtures first rode a TRAILING
  tab (`"file:../db/custom.db\t"`) — a shape the seam's documented
  parse contract trims clean (the `envFileUrl?.trim()` normalization),
  so the guard's `\p{Cc}` predicate never fired and the fixture
  returned null (1 unintended RED at the pin's tab arm, caught at the
  first GREEN run). The fixtures re-anchored to the canonical S60-1
  embedded-tab family (`"file:../db/custom.db\tjunk"` — the tab
  mid-value with the junk tail, exactly the session-60 census shape),
  with the pin's comment documenting why; the CWD-leg twin rides the
  same family. The restored suite: 744/744 GREEN.
- **All five batteries on record** — the claim-replant plant (1 failed
  / 49 passed, naming src/instrumentation.ts), the split-revert plant
  (1 failed / 67 passed — exactly the S62-2a pin, the wrapper pin
  holding), the wrapper two-arg-revert plant (1 failed / 67 passed —
  exactly the S62-2b pin, S62-2a holding), the photoUrl-removal plant
  (1 failed / 49 passed, naming the field), the smoke-tail splice
  plant (1 failed / 49 passed — the widened guard catching the tail
  the old unit-only class could not see). All restored GREEN — the
  full suite 744/744 after the restores.
- **The probe before the prose**: the PWD-leg mechanism sentence names
  the inert-residue truth because the round's live probe observed it
  (node-booted standalone server.js, the single-line-unclosed residue
  .env at the repo root, /api/health answering db:up while the PWD-leg
  warning fired) — the split is evidence-backed, not reasoned. The
  CWD-leg sentences stay verbatim (session-59/60's probe shapes).
- **No unintended RED fired at the lockstep** (the session-59
  design-tokens lesson): the new prose introduced no class-shaped
  compounds; the two designed count-lag faces fired and were cured at
  the lockstep exactly as the doctrine describes.
- Counts at ship: UNIT 744 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 814 — the ten provenance sites at 1..62 (lag 0); SKILL
  v1.58.0; captures 131/132 on the dev server PIL-verified; the full
  gate re-run green on the final tree; push to main via the SSH wrapper
  runbook.
