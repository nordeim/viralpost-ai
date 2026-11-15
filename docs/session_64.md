# Session 64 — The Redaction Raw-@ Tail Cure + The Census Union-Read Fix + The E2E Mid-Line Arm + The x/f Alias Guard + The Mirror Pin + The Splice Mod and the Register Batch (2026-11-15)

The round opened on the shipped tree (`802f049` = session-63's `462f763` +
the owner's narration commit carrying `docs/session_64.md` as the round-64
working narration; this formal log replaces its content at ship). The core
docs re-read and re-verified at the session-63 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.59.0 — every lockstep site confirmed on disk), then
the session-63 set (the formal `docs/session_63.md` log, the session-63
plan's post-execution record, worklog Task 63, the owner's narration), and
the S63 cures verified in source (the S63-1 inert-value seam + wrapper
wiring; the S63-2 redaction at all three interpolation sites; the S63-3
health-catch log; the S63-6 re-emit wiring; the S63-7 sr-only retirement;
the S63-8a mid-line census arm). This round is session 64, the standing
instruction on the shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
750/750, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-63 ship record, no drift; the standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract recreated on the fresh clone with `db/` at the repo root, census
MATCH; the ambient-shell `DATABASE_URL` pollution — the S63 methodology
lesson — found live in the sandbox and neutralized with `unset` + the
`env -u` discipline on every DB-touching command; the vitest + playwright
suites in place and current (750/70 green this round, chromium-1248
installed one-time); the sitemap/robots/manifest/OG family verified live
against the reference in this round's walk #37; `skills/` excluded from
every gate; `.env.example` committed and byte-identical to the working
`.env` at round open). `bun audit` answered the SAME 9 dev-toolchain
advisories as the session-55..63 records (3H/5M/1L — minimatch,
deepmerge-ts, the vite/launch-editor family via vitest, source-map-js;
none on the runtime request path). The web-application skill + the skills
catalog internalized; the tdd and agent-browser doctrine (computed styles
as ground truth, never eyeballs) applied throughout.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/1L/3I · AUDIT-2
(components/pages/effects): 0C/0H/0M/0L/3I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/2L/1I — combined **0 Critical / 0 High /
0 Medium / 3 Low / 7 Informational**. All three lanes re-verified the
full standing-contract set (AUDIT-1: the envelope discipline on all 13
handlers, the db seam monopoly with the three-script exemption, the
status discipline with Retry-After on every 429, the transient
classifier, the limiter at all eight documented buckets, the auth
family, the scripts — plus the S62–S63 cures in code and by live suite
runs, a full unit/lint/tsc re-run green, and the parseEnvFile
bun-parity probe; AUDIT-2: all seven Tailwind v4 mitigations verified
AT THE COMPILER (an in-memory compile of the repo's own globals.css
through the installed @tailwindcss 4.3.3), the complete mobile-menu
mechanic set line-by-line against the e2e + a11y pins, the React 19
pattern law across every effect in scope, and the WCAG floor; AUDIT-3:
every count re-derived from disk (750/40/70/9/16/814, 64 session files
with provenance correctly at `1..63` = the designed lag-1 narration
window, 63 plan files, the ten provenance sites, PAD §12 21/21 rows —
all MATCH) and the full unit suite re-run green as a system-level
lockstep check).

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 L1 (the round's headline), verified by a DIRECT LIVE PROBE**
  — `redactCredentials('"postgresql://admin:p@ssw0rd@db.example.com/prod')`
  answered `'"postgresql://***@ssw0rd@db.example.com/prod'` — the
  S63-2 regex (`[^@/\s"']+@`) replaces only up to the FIRST `@`, so a
  password containing a raw (unencoded) `@` leaks everything after the
  first `@` (the bulk of the password) to stdout and `tee server.log` —
  defeating exactly what the session-63 cure shipped. The S63-2a pin's
  own name ("the password never prints") only fixtures an `@`-free
  password. Fires only on the malformed-DATABASE_URL residue class AND
  a raw-`@` password (technically invalid userinfo — should be `%40`),
  hence Low; but the one-owner doctrine makes it a cure, not a register.
- **AUDIT-3 F-1, verified verbatim in source** — the S63-8a mid-line
  census arm (tests/docs-counts.test.ts:1673) re-prefed every path with
  `tests/` instead of using the repo-relative path the shared
  `allUnitTestFiles()` helper returns; a future `src/foo.test.ts`
  (which vitest admits, and whose appearance the S50-5 union doctrine
  declares "joins every census and every strip-chain arm the day it
  appears") would make the replace a no-op and the read resolve to
  `tests/src/foo.test.ts` → ENOENT (failing CLOSED with a cryptic read
  error instead of scanning). Latent — zero `src/` suites exist — but
  the union contract broken in letter.
- **AUDIT-3 F-2, verified by direct read** — the e2e reality census
  counts line-start `test(` only and the S63-8a arm iterates the unit
  union only; a mid-line `test(` in an e2e spec (the exact S56-4 genus)
  would execute in the Playwright runner while the census stayed green
  — decoupling `E2E = 70` from reality. Zero live instances (verified
  twice: the audit's replica scan and the lead's grep — all 57 e2e
  `test(` occurrences line-start).
- **AUDIT-3 F-3, verified by direct read** — a line-start `xit(`/`xtest(`
  evades the census regex, the dot-forms guard, AND the S63-8a
  lookbehind; a silently skipped test while every census says 750.
  Self-evident at ship (the runner summary shows the skip), hence Info;
  the one-line widening closes the genus.
- **AUDIT-1 I1, verified by direct read** — boot-env.ts's inert-value
  exemption literal mirrors db-path.ts's `DEFAULT_DATABASE_URL` (the
  S59-1b no-import doctrine); no test coupled the two literals.
- **AUDIT-1 I3, verified by direct read** — `pick()` carries the
  `% arr.length` belt-and-braces; the two `hashtagsFor` splice sites do
  not (both provably safe under mulberry32's strict `[0,1)` — the
  inconsistency is against the repo's own S28-8/S42-3 doctrine).
- **AUDIT-2 I3, verified by direct read** — `src/app/not-found.tsx`
  placed its docblock inside the function body (the sibling convention
  is above the export).
- **AUDIT-2 I1 (rounded-full infinity calc) — already registered** (the
  worklog parity-walk census; visually identical in evergreen browsers).
  **AUDIT-2 I2 (flex-shrink-0 v3 alias)** — still generated by Tailwind
  4.3.3 (AUDIT-2's compile probe), zero live impact; register. **AUDIT-1
  I2 (the limiter's memory face)** — the bucket-rotation AUTH hazard is
  documented (S9-1/F9-1); the memory/CPU face of the same vector is not
  named; register.

## The parity walk (walk #37 — the thirty-seventh consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home`. The hamburger base `md:hidden p-2 text-slate-300` (cursor
pointer, block, 8px padding, rgb(203,213,225), transparent bg — NO aria
family, the documented face). The panel `md:hidden bg-slate-900/98
border-b border-white/10 overflow-hidden` (maxHeight none, transparent
bg) with the inner `px-6 py-4 space-y-3` byte-identical (16px/24px pad,
transparent bg, 12px child spacing); the reference's panel carries NO
id (our `mobile-menu` id is the documented superset); linkTexts
identical (5 links; Home teal rgb(45,212,191) 14px/500; the siblings
rgb(203,213,225) 14px/500; the pill rgb(15,23,42) 14px/600, 9999px
radius, the gumroad href). Escape (a REAL key press) leaves the panel
open; the outside-tap (a genuine non-nav H2) leaves it open; the
route-change at /Pricing UNMOUNTS the panel (count 0), title "Pricing |
ViralPost AI". Desktop census: 6 VISIBLE links IDENTICAL; the brand
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
OUR menu with focus returned to the toggle (the documented superset).
The outside-tap leaves it open (parity). The route-change (a genuine
menu-link click to /Pricing) hides in-DOM (panel mounted, hidden true,
aria false — the S26-1 design), title "Pricing | ViralPost AI".
Desktop census: 6 VISIBLE links IDENTICAL; the brand gradient
byte-identical. The five-route head census identical modulo origin
(canonicals + the shared local og-image — the documented same-src
deviation). Sitemap 4 URLs + robots identical modulo origin. The
generator LIVE: the post generated with 6 hashtags (the 5-8 family) +
the Copy button, quota 0→1 (the `viralpost_generations` counter
`{"date":"Sun Nov 15 2026","count":1}`). **ALL CLONE FACES MATCH — no
clone-side drift, no reference-side drift. Mobile nav verified working
as expected on both sides; all seven Tailwind v4 mitigations verified
present and test-pinned (AUDIT-2's own compiler probe).** Captures
135/136 on the dev server PIL-verified (100.0% / 99.9% non-white, teal
13.19% / 10.21%).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S64-1a — the raw-@ redaction pin** (tests/boot-env.test.ts, a new
  session-64 describe): a credentialed residue value whose password
  contains a RAW `@` answers `***@` with the tail never printing, on
  BOTH residue arms; the host stays visible; the file: contract holds.
  Born RED (the current seam printed the tail: 1 failed / 72 passed).
  The battery: the redaction-revert plant (restore the first-@ regex)
  REDs exactly it (1 failed / 72 passed); restored GREEN.
- **S64-1b — the last-@ redaction cure** (src/lib/boot-env.ts): the
  authority-scoped form — capture the scheme + the full `[^/?#\s"']*`
  authority, redact up to the LAST `@` in the authority (no `@` →
  verbatim). Byte-identical on every pinned S63-2 shape; the branch
  conditions still test the RAW value.
- **S64-2a — the census union read fix** (tests/docs-counts.test.ts,
  the S63-8a arm): the re-prefix read replaced by `read(f)` — the
  repo-relative path the shared helper returns, the same idiom every
  sibling consumer uses; the S50-5 union contract restored in letter.
- **S64-2b — the union-read pin**: a source-census `it` scoped to the
  S63-8a describe block (asserting the block reads `stripComments(read(f))`
  and carries no re-prefix — the re-prefix assertion composed from
  parts so the pin's own source cannot self-satisfy). The battery: the
  re-prefix-revert plant REDs exactly it; restored GREEN.
- **S64-3a — the e2e mid-line census arm** (tests/docs-counts.test.ts,
  the session-64 describe): the S56-4 blind-spot closure completed on
  the e2e side — `e2eCountedFiles()` scanned with the boundary-guarded
  `test(` regex, comment-stripped, line-start exempt. Zero live
  instances at birth (verified twice). The battery: the mid-line plant
  (a `const x = 1; test(…)` registration penned in seo.spec.ts) REDs
  exactly it; restored GREEN.
- **S64-4a — the x/f alias forms-guard widening** (the S13-10
  forms-guard): the regex widened to also ban the x/f-prefixed alias
  family (`(?<![A-Za-z0-9_.])[xf](?:it|test)\(` — the lookbehind
  mirrors the S63-8a boundary: `.test(` method calls and prose inside
  identifiers stay invisible). The battery: the `xit(` plant (penned in
  utils.test.ts) REDs exactly the forms-guard; restored GREEN.
- **S64-5a — the DEFAULT_DATABASE_URL mirror pin** (tests/boot-env.test.ts):
  a source-census asserting the exemption literal in boot-env.ts equals
  db-path.ts's exported constant — the S59-1b no-import doctrine stays;
  the pin is the coupling. The battery: the literal-divergence plant
  (edit the db-path constant) REDs exactly it (1 failed / 72 passed);
  restored GREEN.
- **S64-6a — the splice modulo pin** (tests/generator.test.ts, a new
  session-64 describe): a source-census asserting both `hashtagsFor`
  splice sites carry the `% length` guard. The battery: the
  modulo-removal plant REDs exactly it (1 failed / 14 passed); restored
  GREEN.
- **S64-6b — the splice modulo cure** (src/lib/generator.ts): the two
  splice index expressions gain `% pool.length` / `% evergreen.length`
  (in-line + the invariant comment; the deterministic + property
  suites prove behavior unchanged — the modulo is dead code by the
  range proof, the belt-and-braces is the point).
- **S64-7 — the not-found docblock move** (src/app/not-found.tsx,
  comment-only): the docblock moved above the export (the sibling
  convention), with the S64-7 provenance note.
- **S64-8 — the limiter memory-face register** (src/lib/rate-limit.ts
  + PAD §11): the module header sentence naming the memory/CPU face of
  the documented rotation hazard + the §11 register row.
- **S64-9 — the registers** (carried in this log + PAD §11): the
  flex-shrink-0 v3 alias (compile-verified still generated by 4.3.3;
  the normalize deferred to the next sections.tsx class-touch);
  the rounded-full infinity calc (already registered — no action); the
  round's zero live mid-line/x-f instances (the census arms' birth
  posture); the bun-audit triage (the same 9 dev-toolchain advisories).

## The count re-anchor and the docs lockstep

UNIT 750 → 755 (+5: S64-1a, S64-2b, S64-3a, S64-5a, S64-6a), SUITES 40
held, E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 820 → 825.
PAD §11 +2 rows (the memory face, the flex-shrink-0 alias); §12's
generator.ts row re-anchored 495 → 498 (the S64-6b invariant comment)
and rate-limit.ts 141 → 153 (the S64-8 sentence). The designed
count-lag faces fired at the lockstep exactly as the doctrine describes
(the UNIT-constant reality census 755 vs 750; the plans-map
tail-currency on the 64th plan file; the §12 inventory census on the
two re-anchored rows — including one mid-lockstep correction: the
rate-limit row was first penned at 157 and corrected to the live 153
before the gate). The ten provenance sites re-anchored to `1..64` —
lag 0 at ship. SKILL v1.59.0 → v1.60.0. README: the badge 825, the
session-64 row on the continuous table, the gate footer re-spelled to
the session-64 ship, the testing-table 755 sites. AGENTS: the plans
map's sixty-fourth round, the 755 in the testing conventions. CLAUDE:
the 755 line. PAD: §8.1's table + the carry line at 755/70/16, §11's
two new rows, §12's two re-anchored rows. The formal session log (this
file, replacing the owner's narration), the plan's post-execution
record, and worklog Task 64.

## The post-execution record (session-64 ship)

Executed as planned, with the deviations the record owes the truth:

- **The five pins landed first (TDD)** — S64-1a born RED (the raw-@
  tail: 1 failed / 72 passed), S64-6a born RED (the missing modulo: 1
  failed / 14 passed), S64-2b born RED after a mid-RED redesign, and
  the two designed count-lag faces fired alongside (the UNIT reality
  census 755 vs disk-constant 750; the plans-map tail-currency on the
  64th plan file). S64-3a and S64-5a were born GREEN as census/coupling
  arms (their RED faces are their plant batteries, per the S63-8a
  precedent).
- **One vacuous-pin redesign mid-RED (the S12-2 trap, caught before
  the cure landed)**: the S64-2b pin's first draft asserted the
  unscoped `stripComments(read(f)).split` form and PASSED at RED time —
  the file's strip-chain sweep at :1090 already carries that exact
  idiom, so the draft found IT instead of the arm under test. The pin
  was redesigned scoped to the S63-8a describe block (positive +
  composed-part negative assertions, self-satisfaction impossible), then
  born-RED-verified via the re-prefix battery. The pin's own comment
  records the trap.
- **The GREEN phase**: S64-1b (the last-@ redaction), S64-2a (read(f)),
  S64-6b (the two modulos), S64-7 (the docblock move), S64-8 (the
  memory-face sentence) — the full suite 755/755 with only the three
  designed count-lag faces, then the lockstep cured those at the
  constants + the doc sites.
- **All six batteries on record** — the redaction-revert plant (1
  failed / 72 passed), the re-prefix-revert plant (exactly the S64-2b
  pin), the e2e mid-line plant (exactly the S64-3a arm), the xit alias
  plant (exactly the forms-guard), the literal-divergence plant (1
  failed / 72 passed), the modulo-removal plant (1 failed / 14
  passed). All restored GREEN — the full suite 755/755 after the
  restores.
- **One lockstep arithmetic correction, caught by the inventory
  census itself**: the rate-limit.ts §12 row was first re-anchored at
  a miscounted 157 (a hand-sum of the added comment lines); the
  census's live-count assertion named the real figure (153) and the
  row was corrected before the gate — the census doing exactly its
  job.
- Counts at ship: UNIT 755 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 825 — the ten provenance sites at 1..64 (lag 0); SKILL
  v1.60.0; captures 135/136 on the dev server PIL-verified; the full
  gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.

**Gate at the session-64 ship: lint 0/0 · tsc 0 · unit 755/755 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
