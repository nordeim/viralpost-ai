# Session-64 Plan — The Redaction Raw-@ Tail Cure + The Census Union Read Fix + The E2E Mid-Line Arm + The x/f Alias Guard + The Mirror Pin + The Splice Modulo and the Register Batch

The round opened on the shipped tree (`802f049` = session-63's `462f763` +
the owner's narration commit carrying `docs/session_64.md` as the round-64
working narration; the formal log replaces its content at ship). The core
docs re-read and re-verified at the session-63 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.59.0 — every lockstep site confirmed on disk), then
the session-63 set (the formal `docs/session_63.md` log, the session-63
plan's post-execution record, worklog Task 63, the owner's narration in
`docs/session_64.md`), and the S63 cures verified in source (the S63-1
inert-value seam + wrapper wiring; the S63-2 redaction at all three
interpolation sites; the S63-3 health-catch log; the S63-6 re-emit wiring;
the S63-7 sr-only retirement; the S63-8a mid-line census arm). This round
is session 64, the standing instruction on the shipped tree.

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 · unit
750/750, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH — zero drift from the session-63 ship record. The standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract recreated on the fresh clone with `db/` at the repo root, census
MATCH; the ambient-shell `DATABASE_URL` pollution (the S63 methodology
lesson) found live in the sandbox and neutralized with `unset` + the
`env -u` discipline on every DB-touching command; the vitest + playwright
suites in place and current (750/70 green this round, chromium-1248
installed one-time); the sitemap/robots/manifest/OG family verified live
against the reference in this round's walk #37; `skills/` excluded from
every gate; `.env.example` committed and byte-identical to the working
`.env` at round open). `bun audit` answers the SAME 9 dev-toolchain
advisories as the session-55..63 records (3H/5M/1L — minimatch,
deepmerge-ts, vite×4/launch-editor×2 via vitest, source-map-js; none on
the runtime request path). The web-application skill + the skills catalog
internalized; the tdd and agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout — the walk probes as JS
consumed via `agent-browser eval`.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/1L/3I · AUDIT-2
(components/pages/effects): 0C/0H/0M/0L/3I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/2L/1I — combined **0 Critical / 0
High / 0 Medium / 3 Low / 7 Informational**. All three lanes re-verified
the full standing-contract set (the envelope discipline on all 13
handlers, the db seam monopoly, the status discipline with Retry-After on
every 429, the transient classifier, the limiter at all eight documented
buckets, the auth family, the scripts; all seven Tailwind v4 mitigations
verified AT THE COMPILER by AUDIT-2, the complete mobile-menu mechanic
set, the React 19 pattern law across every effect, the WCAG floor; every
count re-derived from disk and the full unit suite re-run green as a
system-level lockstep check). The S62–S63 cures verified holding in
source and by live suite runs on all three lanes.

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 L1 (the round's headline), verified by a DIRECT LIVE PROBE**
  — `redactCredentials('"postgresql://admin:p@ssw0rd@db.example.com/prod')`
  answers `'"postgresql://***@ssw0rd@db.example.com/prod'` — the regex
  `[^@/\s"']+@` replaces only up to the FIRST `@`, so a password
  containing a raw (unencoded) `@` leaks everything after the first `@`
  to stdout (and `tee server.log` persists it) — defeating exactly what
  the S63-2 cure shipped. The pinned shapes (`s3cret-pw`, no inner `@`)
  stay clean; the S63-2a pin's own name ("the password never prints")
  only fixtures an `@`-free password. Fires only on the malformed-
  DATABASE_URL residue class AND a raw-`@` password (technically invalid
  userinfo — should be `%40`), hence Low; but the one-owner doctrine
  ("the password never prints") makes it a cure, not a register.
- **AUDIT-3 F-1, verified verbatim in source** — the S63-8a mid-line
  census arm (tests/docs-counts.test.ts:1673) re-prefixes every path
  with `tests/` (`read(\`tests/${f.replace(/^tests\//, "")}\`)`) instead
  of using the repo-relative path the shared `allUnitTestFiles()` helper
  returns; a future `src/foo.test.ts` (which vitest admits and whose
  appearance the S50-5 union doctrine declares "joins every census and
  every strip-chain arm the day it appears") makes the replace a no-op
  and the read resolve to `tests/src/foo.test.ts` → ENOENT. Fails CLOSED
  (the census REDs with a cryptic read error rather than scanning); zero
  `src/` suites exist today — latent, but the union contract is broken
  in letter.
- **AUDIT-3 F-2, verified by direct read** — the e2e reality census
  counts line-start `test(` only (:984) and the S63-8a arm iterates
  `allUnitTestFiles()` only; a mid-line `test(` in an e2e spec (the
  exact S56-4 genus the session-63 cure names) would execute in the
  Playwright runner while the census count stays line-start-only —
  decoupling `E2E = 70` from reality through a green census. Zero live
  instances (independently replicated by both AUDIT-3 and the lead).
- **AUDIT-3 F-3, verified by direct read** — the forms-guard
  (:1058) bans only the dot-forms (`.each/.skip/.only/.todo/.concurrent/.
  fails`); a line-start `xit(`/`xtest(` evades the census regex
  (`^\s*(?:it|test)\(`), the forms-guard, AND the S63-8a lookbehind
  (which deliberately excludes word-char-prefixed forms) — a silently
  skipped test while every census says 750. Self-evident at ship (the
  runner summary shows the skip), hence Info; the one-line widening
  closes the genus.
- **AUDIT-1 I1, verified by direct read** — boot-env.ts:637's inert-value
  exemption literal `"file:../db/custom.db"` deliberately mirrors
  db-path.ts's `DEFAULT_DATABASE_URL` (importing db-path would balloon
  the instrumentation trace — the S59-1b lightweight-trace doctrine);
  no test couples the two literals. A future edit to either alone
  silently drifts the exemption.
- **AUDIT-1 I3, verified by direct read** — `pick()` carries the
  `% arr.length` belt-and-braces (the S28-8/S42-3 doctrine); the two
  `hashtagsFor` splice sites (:411, :416) do not (both provably safe
  under mulberry32's strict `[0,1)` — the inconsistency is against the
  repo's own guard-the-index-even-where-dead doctrine).
- **AUDIT-2 I3, verified by direct read** — `src/app/not-found.tsx`
  places its ~25-line docblock INSIDE the function body (between the
  signature and the return), unlike every sibling's above-the-export
  convention.
- **AUDIT-2 I1 (rounded-full infinity calc) — already registered**
  (the worklog parity-walk census; visually identical in evergreen
  browsers). **AUDIT-2 I2 (flex-shrink-0 v3 alias)** — still generated
  by Tailwind 4.3.3 (compile-verified), zero live impact; register.
  **AUDIT-1 I2 (the limiter's memory face)** — the bucket-rotation AUTH
  hazard is documented (S9-1); the memory/CPU face of the same vector
  (a sustained rotating-key attack mints R×900s buckets) is not named
  anywhere; register (one sentence at the module header + a §11 row).

## The parity walk (walk #37 — the thirty-seventh consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home`. The hamburger base `md:hidden p-2 text-slate-300` (cursor
pointer, block, 8px padding, rgb(203,213,225), transparent bg — NO aria
family — the documented face). The panel `md:hidden bg-slate-900/98
border-b border-white/10 overflow-hidden` (maxHeight none, transparent
bg) with the inner `px-6 py-4 space-y-3` byte-identical (16px/24px pad,
transparent bg, 12px child spacing); the panel carries NO id (our
`mobile-menu` id is the documented superset); linkTexts identical (5
links; Home teal rgb(45,212,191) 14px/500; the siblings
rgb(203,213,225) 14px/500; the pill rgb(15,23,42) 14px/600, 9999px
radius, the gumroad href). Escape (a REAL key press) leaves the panel
open; the outside-tap (a genuine non-nav H2) leaves it open; the
route-change at /Pricing UNMOUNTS the panel (count 0), title "Pricing |
ViralPost AI". Desktop census: 6 VISIBLE links IDENTICAL (ViralPost AI
brand, Home, Tool, Pricing, Contact, Upgrade to Pro); the brand
wordmark gradient byte-identical (linear-gradient(to right,
rgb(45,212,191), rgb(251,191,36)), 18px/700, background-clip text).
The five-route head census identical (the bare `/` + `/login` titles +
the 170-char plain descriptions; the `<Page> | ViralPost AI` family +
the 92/95/95 prefixed descriptions; the canonicals; the single shared
ogImage; twCard summary_large_image). Sitemap exactly 4 URLs (no
`/Home`) + robots Allow-all + the Sitemap line. The generator DEAD
(the "Generation failed, so this attempt didn't use one of your free
tries. Please try again." face — no generation, no copy button, the
button re-enabled — the documented 402 posture).

CLONE leg (the dev server on :3000, quota cleared): the login landed at
`/` (the documented 308 deviation), title "ViralPost AI". The hamburger
base identical + the aria superset ACTIVE and live-verified (aria-label
"Open menu"→"Close menu", aria-expanded false→true, aria-controls
mobile-menu). The panel inner byte-identical on every computed face
(16px/24px pad, transparent bg; the 12px child rhythm via v4's
margin-block-end on :not(:last-child) — the identical rendering; the
pill 3.35544e+07px — v4's infinity calc rendering the identical
capsule; the same 5 linkTexts incl. the gumroad pill). Escape closes
OUR menu with focus returned to the toggle (expanded false, label
"Open menu", panel hidden, focusOnToggle true — the documented
superset). The outside-tap leaves it open (parity). The route-change
(a genuine menu-link click to /Pricing) hides in-DOM (panel mounted,
hidden true, aria false, inner links intact — the S26-1 design), title
"Pricing | ViralPost AI". Desktop census: 6 VISIBLE links IDENTICAL;
the brand gradient byte-identical. The five-route head census identical
modulo origin (canonicals + the shared local og-image — the documented
same-src deviation). Sitemap 4 URLs + robots identical modulo origin.
The generator LIVE: the post generated with 6 hashtags (the 5-8
family) + the Copy button, quota 0→1 (the `viralpost_generations`
counter `{"date":"Sun Nov 15 2026","count":1}`). **ALL CLONE FACES
MATCH — no clone-side drift, no reference-side drift. Mobile nav
verified working as expected on both sides; all seven Tailwind v4
mitigations verified present and test-pinned (AUDIT-2's own compiler
probe).** Captures 135/136 on the dev server PIL-verified (100.0% /
99.9% non-white, teal 13.19% / 10.21%).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S64-1a — the raw-@ redaction pin** (tests/boot-env.test.ts, a new
  session-64 describe beside the S63-2 family): a credentialed residue
  value whose password contains a RAW `@`
  (`'"postgresql://admin:p@ssw0rd@db.example.com/prod`) answers `***@`
  with the tail never printing (`ssw0rd` absent), on BOTH arms (the
  process-env residue arm + the file-face arm); the host stays visible
  (`db.example.com`); the clean-shape and file: faces hold unchanged.
  Born RED (the current seam prints the tail). The battery: the
  redaction-revert plant (restore the first-`@` regex) REDs exactly it
  (1 failed / N passed); restored GREEN.
- **S64-1b — the last-@ redaction cure** (src/lib/boot-env.ts): the
  `redactCredentials` regex replaced by the authority-scoped form —
  capture the scheme + the full `[^/?#\s"']*` authority, redact up to
  the LAST `@` in the authority (no `@` → verbatim). Byte-identical on
  every pinned shape (the `s3cret-pw` faces, the `file:` contract, the
  userinfo-free URL); the branch conditions still test the RAW value
  (unchanged — only the interpolation changes).
- **S64-2a — the census union read fix** (tests/docs-counts.test.ts,
  the S63-8a arm): line 1673's `read(\`tests/${f.replace(/^tests\//,
  "")}\`)` → `read(f)` — the repo-relative path the shared helper
  returns (the same idiom every sibling consumer uses). The arm now
  honors the S50-5 union contract in letter: a future `src/` suite
  joins the scan the day it appears.
- **S64-2b — the union-read pin**: a source-census `it` asserting the
  mid-line arm reads the union paths directly (the `stripComments(read(f))`
  form present; the `tests/`-re-prefix idiom absent from the file). The
  battery: the re-prefix-revert plant REDs exactly it; restored GREEN.
- **S64-3a — the e2e mid-line census arm** (tests/docs-counts.test.ts,
  the session-64 describe): the S63-8a blind-spot closure completed on
  the e2e side — scan `e2eCountedFiles()` (the 9 specs + auth.setup.ts)
  for boundary-guarded mid-line `test(` registrations
  (`(?<![A-Za-z0-9_.])test\(`), comment-stripped, line-start exempt
  (the countable shape the census above counts). Zero live instances
  at birth (verified twice this round). The battery: the mid-line plant
  (a `const x = 1; test(…)` registration penned in a spec copy) REDs
  exactly it; restored GREEN.
- **S64-4a — the x/f alias forms-guard widening**
  (tests/docs-counts.test.ts, the S13-10 forms-guard): the regex
  widened from `/\.(each|skip|only|todo|concurrent|fails)\(/` to also
  ban the `[xf](?:it|test)(` family — `xit(`/`xtest(` silently skip,
  `fit(`/`ftest(` focus; both decouple the census from the runner.
  Comment-stripped (unchanged); the existing dot-forms faces hold.
  The battery: the `xit(` plant REDs exactly the forms-guard arm;
  restored GREEN.
- **S64-5a — the DEFAULT_DATABASE_URL mirror pin**
  (tests/db-path.test.ts, a session-64 describe): a source-census
  asserting the exemption literal in boot-env.ts equals db-path.ts's
  exported `DEFAULT_DATABASE_URL` (both spell `file:../db/custom.db`)
  — the two literals can no longer drift independently (the S59-1b
  no-import doctrine stays; the pin is the coupling). The battery: the
  literal-divergence plant (edit one) REDs exactly it; restored GREEN.
- **S64-6a — the splice modulo pin** (tests/generator.test.ts, a
  session-64 describe): a source-census asserting both `hashtagsFor`
  splice sites carry the `% pool.length` belt-and-braces (the S28-8/
  S42-3 doctrine — guard the index even where the mulberry32 `<1`
  invariant makes it dead, so a future PRNG swap can't mint
  `undefined` tags). The battery: the modulo-removal plant REDs
  exactly it; restored GREEN.
- **S64-6b — the splice modulo cure** (src/lib/generator.ts): the two
  splice index expressions gain `% pool.length` (in-line; the
  deterministic + property suites prove behavior unchanged — the
  modulo is dead code by the range proof, the belt-and-braces is the
  point).
- **S64-7 — the not-found docblock move** (src/app/not-found.tsx,
  comment-only): the docblock moved above the export (the sibling
  convention); zero content change.
- **S64-8 — the limiter memory-face note** (src/lib/rate-limit.ts,
  comment-only): one sentence at the module header naming the memory/
  CPU face of the documented rotation hazard (a sustained rotating-key
  attack mints R×window buckets; the S9-1 boot warning's
  "fresh rate-limit bucket per request" clause carries a map-growth
  cost too) + the §11 register row.
- **S64-9 — the registers** (carried in the log + PAD §11): the
  flex-shrink-0 v3 alias (still generated by 4.3.3 — compile-verified;
  a future major that drops it silently kills the no-shrink on 3
  sections.tsx sites; the normalize deferred to the next sections.tsx
  class-touch); the rounded-full infinity calc (already registered —
  no action); the S64-8 memory face; the round's zero live mid-line/
  x-f instances (the census arms' birth posture).

## The count re-anchor and the docs lockstep

UNIT 750 → 755 (+5: S64-1a, S64-2b, S64-3a, S64-5a, S64-6a), SUITES 40
held, E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 820 → 825.
PAD §11 +2 rows (the memory face, the flex-shrink-0 alias); §12's
rate-limit.ts row re-anchored 141 → 142 (the S64-8 sentence); the
generator.ts row holds at 495 (the S64-6b change is in-line). The
designed count-lag faces fire at the lockstep and are cured there (the
UNIT-constant reality census; the provenance tail-currency on the 64th
session log). The ten provenance sites re-anchored to `1..64` — lag 0
at ship (the disk ledger already carries session_64.md, so the sites
at `1..63` ride the designed lag-1 transient at baseline). SKILL
v1.59.0 → v1.60.0. README: the badge 825, the session-64 row on the
continuous table, the gate footer re-spelled to the session-64 ship,
the testing-table 755 sites. AGENTS: the plans map's sixty-fourth
round, the 755 in the testing conventions. CLAUDE: the 755 line. PAD:
§8.1's table + the carry line at 755/70/16, §11's two new rows, §12's
rate-limit row. The formal session log (`docs/session_64.md`, replacing
the owner's narration), this plan's post-execution record, and worklog
Task 64.

## The post-execution record (session-64 ship)

Executed as planned. The deviations the record owes the truth:

- **One vacuous-pin redesign mid-RED (the S12-2 trap, caught before
  the cure landed)**: the S64-2b pin's first draft asserted the
  unscoped `stripComments(read(f)).split` form and PASSED at RED time —
  the file's strip-chain sweep at :1090 already carries that exact
  idiom, so the draft found IT instead of the S63-8a arm under test.
  Redesigned scoped to the describe block (positive + composed-part
  negative assertions), then born-RED-verified via the re-prefix
  battery.
- **One lockstep arithmetic correction, caught by the inventory
  census itself**: the rate-limit.ts §12 row was first re-anchored at
  a miscounted 157; the census's live-count assertion named the real
  figure (153) and the row was corrected before the gate.
- All five pins landed (three born RED — S64-1a, S64-2b, S64-6a; two
  born GREEN as census/coupling arms with plant-battery RED faces —
  S64-3a, S64-5a); all six planted-defect batteries on record; the
  full suite 755/755 after the restores; the designed count-lag faces
  (UNIT census, plans-map tail, §12 inventory) fired and were cured at
  the lockstep.
- Counts at ship: UNIT 755 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 825; the ten provenance sites at 1..64 (lag 0); SKILL
  v1.60.0; captures 135/136 PIL-verified; the full gate green on the
  final tree; push to main via the SSH wrapper runbook.

**Gate at the session-64 ship: lint 0/0 · tsc 0 · unit 755/755 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
