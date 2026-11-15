# Session 63 — The Launch-Env Inert-Value Divergence Warning + The Credential Redaction + The Health Catch Log + The Quota Rollover Re-Emit and the Register Batch (2026-11-15)

The round opened on the shipped tree (`1ed646e` = session-62's `15b8c93` +
the owner's narration commit carrying `docs/session_63.md` as the round-63
working narration; this formal log replaces its content at ship). The core
docs re-read and re-verified at the session-62 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.58.0 — every lockstep site confirmed on disk), then
the session-62 set (the formal session_62.md log, the session-62 plan's
post-execution record, worklog Task 62, the owner's narration), and the S62
cures verified in source (the S62-1a residue-sweep census; the S62-2
`runtimeConsumesFile` split + the `unseen` rename + the wrapper's
`d === process.cwd()` discriminator; the S62-3 photoUrl completion at
15/15; the S62-4 widened splice-guard). This round is session 63, the
standing instruction on the shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
744/744, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-62 ship record, no drift; the standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract intact with `db/` at the repo root, census MATCH; `.env.example`
committed and byte-identical to the working `.env` at round open, re-healed
identically after the round's probe incident — see the methodology record
below; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference in
this round's walk #36; `skills/` excluded from every gate). The neo-crm
reference repo re-checked per the standing instruction: unchanged (HEAD
`b3d0fbe` — the sixteenth consecutive no-change check). The
web-application skill + the skills catalog internalized; the tdd and
agent-browser doctrine (computed styles as ground truth, never eyeballs)
applied throughout.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/1M/1L/2I · AUDIT-2
(components/pages/effects): 0C/0H/0M/2L/5I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/4I — combined **0 Critical / 0
High / 1 Medium / 3 Low / 11 Informational**. AUDIT-1 re-verified the
full standing-contract set on its lane (the envelope discipline on all 13
handlers, the db seam monopoly, the status discipline with Retry-After on
every 429, the transient classifier, the limiter, the auth family, the
scripts — all hold; the S58–S62 cures verified in code and by live suite
runs). AUDIT-2 re-verified all seven Tailwind v4 mitigations, the
complete mobile-menu mechanic set, the React 19 pattern law across every
effect in scope, and the WCAG floor. AUDIT-3 re-derived every count from
disk (744/40/70/9/16/814, the session-ledger transient at 63 files with
provenance correctly at `1..62` = lag 1 inside the narration window, 62
plan files, the ten provenance sites, PAD §12 21/21 rows — all MATCH) and
re-ran the unit suite green as a system-level lockstep check.

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 M1 (the round's headline), verified by a DIRECT LIVE PROBE**
  — a clean, non-default `DATABASE_URL` in a launch-dir `.env` is
  SILENTLY IGNORED under a node-booted standalone server with an empty
  shell env; the file-face warning arm only speaks for MALFORMED values
  (the clean-value early return at boot-env.ts:517-519), and the
  db-path seam's launch-dir recovery is gated on a SET process env
  (`if (envUrl)` at db-path.ts:403) — in the unloaded posture the
  runtime reads only the server CWD's `.env` (removed from the artifact
  by the build's hygiene step) and falls to the DEFAULT. The decisive
  probe (the S62-2 shape, `env -u DATABASE_URL`, schema-only
  `db/alt.db` with 0 users behind a clean absolute value in the repo
  `.env`): `/api/health` answered `{"ok":true,...,"db":"up"}` AND the
  demo-credentials login answered **200 with the seeded user** — the
  engine served the DEFAULT db's user from a file the operator's `.env`
  never named — with **ZERO `[boot]` DATABASE_URL warnings** in the
  log. The operator's belief that `.env` is the source of truth is
  silently wrong, with zero signal — the S47-2 shadow-file genus, one
  face deeper (S47-2: a shadow FILE; this round: an inert VALUE).
- **AUDIT-1 L1, verified verbatim in source** — all four process-env
  residue variants (boot-env.ts:261-268) and the file-face prefix
  (:537) interpolated the FULL raw value; a malformed credentialed
  postgres URL would print its password to stdout (and `tee server.log`
  persists it).
- **AUDIT-1 I1, verified in source** — the health route's catch
  discarded the underlying error with no log line.
- **AUDIT-2 L1, verified against the built sheet** — ~20 dead
  single-word utility rules (~1.9-2.4 KB of the 64.5 KB sheet) ship,
  fed by unavoidable English prose and the literal `"resize"` DOM
  event-name string; every in-className token is a distinct compound —
  the bare rules are dead, and the S28-4 doctrine cannot cover
  dictionary words and API strings.
- **AUDIT-2 L2, verified through the render graph** — once
  `limitReached` mounts the paywall, nothing re-renders it: a tab left
  open across midnight shows the paywall indefinitely (the same-tab
  rollover sibling of the registered cross-tab face).
- **AUDIT-2 I1/I2/I3 + AUDIT-3 I3, verified in source** — the navbar's
  dangling Deviations-Ledger citation; the verbatim `hover:bg-teal-50`
  in a sections.tsx comment; the hand-rolled sr-only duplicate on the
  particle-text h1; the census's mid-line registration blind spot (the
  documented S56-4 residual, zero live instances).
- **AUDIT-1 I2 — superseded by the lead's own run**: `bun audit`
  answered the SAME 9 advisories as the session-55..62 records (all
  dev-toolchain/build-time, none on the runtime request path).

### The round's probe-methodology record (the deviations the record owes)

Three self-inflicted artifacts, all caught and healed within the round:

1. **The ambient-shell pollution** — the persistent sandbox shell
   carried a stale `DATABASE_URL` (a parent-of-repo absolute — the
   S56-1 collision family); every unpinned live boot first failed with
   `Error code 14` because the seam correctly honored the stale
   absolute as an intentional override pointing at a nonexistent path.
   Lesson: probe the unloaded posture with `env -u DATABASE_URL` and
   check `printenv` FIRST.
2. **The `&`-precedence incident** — `cd <repo> && … && node … &`
   backgrounds the WHOLE `&&` chain (the `cd` included), so the
   foreground tail (the "restore" `cp`) ran from the workspace root —
   writing the workspace `.env` and poisoning the backup chain; the
   repo `.env` was left a one-liner mid-round. Healed: the repo `.env`
   restored byte-identical to `.env.example`, census re-run MATCH.
   Lesson: background a subshell `( … & )` or put the `cd` outside
   the chain.
3. **The `tr -d ' \n'` artifact** — the walk's head-census output
   compaction stripped ALL spaces, briefly reading as a reference-side
   title drift; the raw re-probe proved both legs byte-identical on
   the with-spaces family. Lesson: compact JSON output with tooling
   that preserves string payloads, never `tr -d ' '`.

## The parity walk (walk #36 — the thirty-sixth consecutive clean walk)

REF leg (live, logged in with the demo credentials — the "Sign in"
email/password submit): login settled at `/Home`. The hamburger base
`md:hidden p-2 text-slate-300` (cursor pointer, block, 8px padding,
rgb(203,213,225), transparent bg — NO aria family). The panel inner
`px-6 py-4 space-y-3` byte-identical (16px/24px, block, maxHeight none,
transparent background, 12px child spacing); linkTexts identical; Home
teal rgb(45,212,191) 14px/500; the siblings rgb(203,213,225) 14px/500;
the pill rgb(15,23,42) 14px/600, 9999px radius. Escape via a REAL key
press leaves the panel open; the outside-tap (a genuine non-nav H2)
leaves it open; route-change at /Pricing UNMOUNTS the panel
(panelInnerCount 0), title "Pricing | ViralPost AI". Desktop census: 6
VISIBLE links IDENTICAL; the brand wordmark gradient byte-identical
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), 18px/700,
background-clip text). The five-route head census identical (the RAW
title re-probe — see the methodology record — the bare `/` + `/login`
titles, the `<Page> | ViralPost AI` family, the 170-char plain
descriptions + the 92/95/95 per-route family, the canonicals, the single
shared ogImage). Sitemap exactly 4 URLs (no `/Home`) + robots Allow-all +
Sitemap line. The generator DEAD (no generation, no copy button, the
button re-enabled, error text present — the documented 402 face).

CLONE leg (the dev server on :3000, quota cleared): the login landed at
`/` (the documented 308 deviation). The panel byte-identical on every
computed face (the pill 3.35544e+07px — v4's infinity calc rendering the
identical capsule). The hamburger base identical + the aria superset
ACTIVE and live-verified (aria-controls mobile-menu, expanded
false→true, the Open/Close-menu relabel). Escape closes OUR menu with
focus returned to the toggle (the documented superset). The outside-tap
leaves it open (parity). Route-change at /Pricing hides in-DOM
(panelInnerCount 1, aria false — the S26-1 design), title
"Pricing | ViralPost AI". Desktop census: 6 VISIBLE links IDENTICAL;
the brand gradient byte-identical. The five-route head census identical
modulo origin. Sitemap 4 URLs + robots identical modulo origin. The
generator LIVE: hashtags in the 5-8 family + the Copy button, quota 0→1
(the `viralpost_generations` counter key `{"date":"Sun Nov 15
2026","count":1}`). **ALL CLONE FACES MATCH — no clone-side drift, no
reference-side drift. Mobile nav verified working as expected on both
sides; all seven Tailwind v4 mitigations verified present and
test-pinned (the audit's own lane).** Captures 133/134 on the dev server
PIL-verified (99.9% non-white both, teal present 1.48%/1.70%).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S63-1a — the inert-value pure-seam pin** (tests/boot-env.test.ts, a
  new session-63 describe): `databaseUrlInertValueWarning` fires ONLY
  when (1) the process env is UNSET (a set env owns the signal), (2)
  the file value is present and CLEAN (residue values belong to the
  residue seam), (3) the leg is NOT consumed by the runtime (the
  S62-2 leg discriminator), and (4) the value differs from the raw
  default spelling `file:../db/custom.db` (the designed approximation
  — the .env.example contract never warns; the non-repo-PWD corner is
  the documented false negative). The message names the divergence
  truth (never read by this server; the engine resolves the default;
  the session-63 live probe) + the fix guidance (export DATABASE_URL in
  the environment, or boot with `bun run start`). The battery: the
  branch-revert plant REDs exactly it (1 failed / 70 passed); restored
  GREEN.
- **S63-1b — the wrapper wiring pin** (source-census, the S29-2/S62-2b
  idiom): the wrapper calls the inert seam with the same leg
  discriminator. The battery: the call-drop plant REDs exactly it (1
  failed / 70 passed) while the residue arms hold; restored GREEN.
- **S63-1c — the inert-value seam** (src/lib/boot-env.ts): the pure
  seam placed beside the residue seam in the S59-1/S62-2 lineage; the
  wrapper wires it per S63-1b. The default-URL reference rides a
  literal with the provenance comment (boot-env must not import
  db-path — the S59-1b lightweight-trace doctrine).
- **S63-2a — the credential-redaction pin**: a credentialed malformed
  value answers `***@`, never the password, on BOTH arms; a `file:`
  residue value stays verbatim. Born RED (the prints interpolated
  raw). The battery: the redaction-revert plant REDs exactly it (1
  failed / 70 passed); restored GREEN.
- **S63-2b — the redaction helper** (src/lib/boot-env.ts):
  `redactCredentials` (`scheme://***@`) applied at both arms'
  interpolation sites; the branch conditions still test the RAW value;
  the `file:` SQLite contract is untouched.
- **S63-3a — the health-catch log pin** (tests/api-robustness.test.ts,
  source-census): the catch logs the cause before the 503 — the
  S36-P5 doctrine's diagnosis half. The battery: the line-removal
  plant REDs exactly it (1 failed / 25 passed); restored GREEN.
- **S63-4 — the comment-truth pair** (comment-only): navbar.tsx's
  "Deviations Ledger" citation re-pointed to its real home (the
  session-11/23/25/31 records + tests/a11y-controls.test.ts +
  tests/e2e/mobile-navigation.spec.ts — the ledger carries no
  mobile-menu row); sections.tsx's verbatim `hover:bg-teal-50`
  respelled prose-safe ("the teal-50 hover tint").
- **S63-5 — the dead single-word utility-rule register** (register
  only, no code change): the genus accepted and WRITTEN — a PAD §11
  row with the measured figure (~20 rules, ~1.9-2.4 KB of 64.5 KB,
  zero functional impact) + the genus note at the `@import` scoping
  site in globals.css. The §12 live-count rows re-anchored in the same
  commit (generation-counter 150, navbar 284, particle-text 331,
  globals.css 259).
- **S63-6a — the quota re-emit wiring pin** (tests/generation-counter.
  test.ts, source-census): the store carries the key-guarded
  `storage` listener (the cross-tab face — registered session 30,
  cured at the store) + the `focus`/`visibilitychange` re-emitters
  (the same-tab date rollover — AUDIT-2 L2), both behind a
  change-guard, browser-guarded, StrictMode-safe (a module-level wired
  flag). The battery: the listener-removal plant REDs exactly it (1
  failed / 10 passed); restored GREEN.
- **S63-6b — the re-emit wiring** (src/lib/generation-counter.ts): the
  listeners wired lazily on first subscribe; `emitUsage` updates the
  change-guard's bookkeeping on every emit path.
- **S63-7 — the sr-only h1 inline-duplicate retirement**
  (src/components/effects/particle-text.tsx): the hand-rolled inline
  duplicate of `sr-only` dropped; the utility class owns the face.
- **S63-8a — the mid-line registration census arm**
  (tests/docs-counts.test.ts): the S56-4 blind spot closed — a
  boundary-guarded scan (`(?<![A-Za-z0-9_.])(?:it|test)\(`) over every
  unit file's comment-stripped source EXCEPT the census file's own
  prose (its guard messages name `it()` — exempt by construction),
  asserting ZERO mid-line registrations. The battery: the mid-line
  plant (a `const x = 1; it(…)` registration penned in another suite)
  REDs exactly it; restored GREEN.
- **S63-9 — the registers** (carried in this log): the bun-audit
  triage (the SAME 9 advisories as session-55..62 — all dev-toolchain,
  none on the runtime request path); the footer h4 heading-skip
  (parity-owned); the SEO route-handler + manifest same-src faces
  (documented by design); the round's three probe-methodology
  artifacts (the ambient-shell pollution, the `&`-precedence incident,
  the `tr -d` title artifact).

## The count re-anchor and the docs lockstep

UNIT 744 → 750 (+6), SUITES 40 held, E2E 70 held, E2E_SPECS 9 held,
SMOKE 16 held, BADGE 814 → 820. PAD §11 +1 row (the dead-rule register);
the §12 live-count rows re-anchored for the four touched files. The
designed count-lag faces fired and were cured at the lockstep exactly as
the doctrine describes (the UNIT-constant reality census; the plans-map
tail-currency on the 63rd plan file). The ten provenance sites
re-anchored to `1..63` — lag 0 at ship. SKILL v1.58.0 → v1.59.0. README:
the badge 820, the session-63 row on the continuous table, the gate
footer re-spelled to the session-63 ship, the testing-table 750 sites.
AGENTS: the plans map's sixty-third round, the 750 in the testing
conventions. CLAUDE: the 750 line. PAD: §8.1's table + the carry line at
750/70/16, §11's new row, §12's four re-anchored rows. The formal session
log (this file), the plan's post-execution record, and worklog Task 63.

## The post-execution record (session-63 ship)

Executed as planned, with the deviations the record owes the truth:

- **The six pins landed first (TDD)** — the three boot-env pins
  (S63-1a, S63-1b, S63-2a) born RED together with the
  api-robustness/generation-counter/docs-counts pins; the two designed
  count-lag faces fired alongside (the UNIT reality census 744 vs disk
  750; the plans-map tail-currency on the 63rd plan file). The GREEN
  phase: S63-1c (the seam + wiring), S63-2b (the redaction), S63-3b
  (the health log), S63-4 (the comment pair), S63-5 (the register),
  S63-6b (the re-emit wiring), S63-7 (the sr-only retirement); the
  count-lag faces held until the lockstep per the doctrine, then cured
  at the constants + the doc sites.
- **One RED-face repair mid-round**: the S63-2a pin's first call shape
  passed the env record in the wrong wrapper (the suite's `env()`
  builder is the sanctioned form — the assertion failed on an empty
  warnings array, not the redaction); re-anchored to the builder, then
  born-RED-verified via the plant battery. The S63-6a pin's first
  append missed the fs/path imports (a ReferenceError, not the
  designed assertion) — fixed before the battery. The S63-8a arm's
  first file-exclusion compared the wrong path form (the census
  returns `tests/`-prefixed paths) and false-fired on the census
  file's own prose — fixed with the prefix-aware exemption.
- **All six batteries on record** — the branch-revert plant (1 failed /
  70 passed), the call-drop plant (1 failed / 70 passed), the
  redaction-revert plant (1 failed / 70 passed), the health-log removal
  plant (1 failed / 25 passed), the listener-removal plant (1 failed /
  10 passed), the mid-line plant (exactly the census arm). All
  restored GREEN — the full suite 750/750 after the restores.
- **One lockstep tooling incident, repaired in-round**: a sed BRE
  escaping error (`\|` is alternation in BRE, not a literal pipe)
  briefly prefixed 734 PAD lines with a bogus table row; repaired
  mechanically (the prefix stripped from every mangled line, the one
  legitimate row preserved), the PAD diff verified back to exactly the
  designed change set before the gate. Lesson recorded: use Python or
  `#`-delimited sed with `python`-verified patterns for
  pipe-containing table edits.
- Counts at ship: UNIT 750 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 820 — the ten provenance sites at 1..63 (lag 0); SKILL
  v1.59.0; captures 133/134 on the dev server PIL-verified; the full
  gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.

**Gate at the session-63 ship: lint 0/0 · tsc 0 · unit 750/750 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
