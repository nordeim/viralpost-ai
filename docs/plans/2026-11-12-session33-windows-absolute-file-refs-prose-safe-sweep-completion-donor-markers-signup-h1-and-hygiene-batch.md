# Session 33 — The Windows-Absolute File Refs + The Prose-Safe Sweep Completion + The Donor-Ledger Markers + The Signup H1 + The Hygiene Batch (2026-11-12)

## Context

Session 32 pushed `dd98b3d`; the owner added `02c9735` (the session-32
execution narration held as `docs/session_33.md`, the established pattern).
This round re-ran the standing instruction against the merged tree: docs
review → baseline gate → the comprehensive audit (three parallel subagents)
→ the live reference parity walk → the TDD cures → the gate → captures →
push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
649/649 (38 files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census
MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the
repo root ✓ (the seam re-anchors the ambient shell override to
`<repo>/db/custom.db` — the census prints the resolved URL) · the vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in place
and current ✓ · the sitemap/robots/manifest/OG family verified live against
the reference (this round's walk) ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/1L/1I · AUDIT-3:
0C/0H/0M/1L/2I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
4 Info** at the subagent reports. The lead's adjudication merges AUDIT-1's
A1-L1 with AUDIT-2's A2-1 (the same doctrine face — the incomplete
prose-safe sweep) and takes every finding into the working register (all
cured this round — S33-1..S33-7); the accepted register carries forward
unchanged.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`): the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (our aria family the documented
superset), the open panel computed transparent both sides at scrollY=0
(`max-height: none`, display block, the four links + the Gumroad pill
byte-identical), the scrolled-bar class family byte-identical with the
computed background the same color in its two spellings (our oklab form =
the reference's `rgba(15, 23, 42, 0.95)`), the desktop nav family
byte-identical modulo the aria-label superset, the five-route head census —
**NO DRIFT** (titles, og:title, og:description, meta description,
twitter:card byte-identical across all five routes; canonical + og:url
differ by origin only; the icon links the documented file-convention
posture), sitemap.xml + robots.txt identical modulo origin (the walk
script's first-occurrence-only `.replace` artifact ruled out by the
all-occurrence normalized comparison — MATCH), the login round-trip live on
both sides (both land on the landing — the reference's URL `/Home`,
its duplicate-of-`/` route; ours `/`, the documented 308 deviation;
re-spelled session-38, S38-4; the reference's localStorage-token posture vs
our httpOnly `viralpost_session` cookie the documented superset).
**NO DRIFT FOUND — the seventh consecutive fully-clean walk.** The mobile
menu works as expected (the full functional battery — open, navigate+close,
Escape close, history close + focus return — e2e-pinned 65/65). The
generator walk-probe returned null on BOTH sides symmetrically (a probe
selector artifact — the clone's generator round-trip is proven green by the
e2e generator spec and smoke leg 11, and the reference's is the documented
402-dead face).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S33-1 | **LOW** (the S28-4/S31-5a/S32-4 doctrine, the sweep incomplete) | `src/lib/login-reset.ts:178` · `src/lib/page-layout.ts:42` · `src/components/ui/toast.tsx:124` · `src/app/(site)/layout.tsx:13,22` · `src/components/marketing/navbar.tsx:5` | The S32-4 prose-safe sweep cured `-mb-2`/`focus:ring-slate-400`/`opacity-0` but left FOUR more retired utility tokens spelled verbatim in src comments — each emits a never-matched rule into the production CSS (~1.5 KB total, probe-attributed by AUDIT-2's per-file recompile): `space-y-1.5` (login-reset.ts:178 + page-layout.ts:42 — zero live consumers; the live sibling is `[&>*+*]:mt-1.5`), bare `max-w-[420px]` (toast.tsx:124 — the live form is `md:max-w-[420px]`), bare `z-[60]` ((site)/layout.tsx:13,22 — the live form is `focus:z-[60]`), bare `backdrop-blur` (navbar.tsx:5 — the live form is `backdrop-blur-xl`). The session-32 register's "the src/ face is cured" claim was narrower than the genus. (AUDIT-1 A1-L1 + AUDIT-2 A2-1, merged.) |
| S33-2 | **LOW** (the S30/S31/S32 wrong-DB genus, the one platform the seam didn't model) | `src/lib/db-path.ts:94` (`resolveDatabaseUrl` absoluteness test) + `:155-160` (`isRelativeFileUrl`) | Windows-absolute `file:` refs are misclassified as RELATIVE: the absoluteness test is POSIX-only (`ref.startsWith("/")`), so a drive-letter `file:C:\db\custom.db` or UNC `file:\\server\share\db.db` falls through to the anchors and re-anchors into `<repo>/prisma/C:\…` junk (live-probed by AUDIT-1: `resolveDatabaseUrl("file:C:\db\custom.db")` → `file:<repo>/prisma/C:\db\custom.db`, junk directories created) — violating the seam's own header contract ("absolute URLs are passed through by design … for production deployments"). No live caller on this Linux deployment (DEPLOYMENT.md documents POSIX absolutes); on a Windows bun host the documented production form would resolve to a corrupted path. (AUDIT-1 A1-L2.) |
| S33-3 | **LOW** (the S30-4/S31-4 donor-collision genus, the next three rounds) | `tests/db-path.test.ts:227,296,337,341` (cross-noted: `viralpost-ai_SKILL.md` §0.5's donor enumeration) | The standalone-launch describe cites the donor ledger's `session-34`/`session-35`/`session-36` BARE — no "(a donor-ledger number)" marker, no lineage note — while this repo's own sessions are `docs/session_1..32` and the NEXT THREE engineering rounds are this repo's sessions 34/35/36. A future reader (or a lockstep `rg "session-34"` sweep) will misattribute the donor's standalone-launch-recovery work to this repo's own imminent sessions — the exact genus §0.5 exists to prevent (S31-4 cured auth.ts's S30-P3 the same way). The sibling suites follow the convention (boot-env's lineage note, playwright.config's markers); §0.5's enumeration (23/67/96/111/145/163/169/170/195/212) omits 34/35/36. (AUDIT-3 A3-1.) |
| S33-4 | **INFO→cure** (the most-tested-module's one unpinned composed face) | `tests/db-path.test.ts` (the `effectiveDatabaseUrl` describe) | The dev/cwd-shape `file::memory:` composition has no pin: the process env carrying bun's absolutization of a `.env`'s `file::memory:` (`file:<repo>/:memory:`) while the cwd `.env` carries the raw spelling — `effectiveDatabaseUrl` must return `"file::memory:"` (the signature arm routes through `resolveDatabaseUrl`'s S26-9 guard). The two component behaviors are individually pinned; the composition is not (traced correct under both bun models by AUDIT-1). (AUDIT-1 A3-I1.) |
| S33-5 | **INFO→cure** (the document-outline polish on the superset route) | `src/components/layout/login-card.tsx:505` (the signup view's heading stack) | `/signup` — our superset route (the reference 404s it) — renders no `h1`: the card's h1 ("Welcome to ViralPost AI") belongs to the signin column, which unmounts in signup mode; the signup view's top heading is the reference's own h2 ("Create your account" — the parity DOM, kept). The reset-password screen HAS h1s; only the signup view lacks one. No WCAG 2.2 AA failure (axe's page-has-heading-one is best-practice, not AA) — an sr-only h1 cures the outline with zero visual change (the aria-superset family's invisible form). (AUDIT-2 A2-2.) |
| S33-6 | **INFO→cure** (the S19-17/S20-3 trap family, three uncovered paths) | `scripts/smoke-test.sh:58-63` (the EXIT trap) vs `:72-83` (`SMOKE_PUSH_LOG`) and `:198-211` (`rl_body`/`rl_headers`) | The trap's `rm -f` covers only `COOKIE_JAR`/`SERVER_LOG`/`GATE_LOG`; the push/seed log leaks when leg 00 fails (cat+exit before the `rm -f` at :83) and the 429 leg's body/headers leak when leg 13 fails (exit at :210 before the `rm -f` at :211). Non-secret `/tmp` artifacts, failure-path-only — the cosmetic end of the trap family the S19-17/S20-3 cures own. The born-empty idiom (S20-3) extends naturally: `rm -f ""` exits 0 (verified on this sandbox), so the three vars join the born-empty block and the trap's `rm -f` list. (AUDIT-3 A3-2.) |
| S33-7 | **INFO→cure** (a docs-truth nit, pre-existing since session-2) | `README.md:172` (the API table's me row) | The table labels `/api/auth/me` "Auth: session" — the route is public-by-design (`me/route.ts`: "NOT requireSession-gated by design — a logged-out caller gets data:null, not a 401"); smoke leg 12 and session.spec both rely on the 200+`data:null` face. Every other row states the requirement; an operator reading the table would expect a 401. (AUDIT-3 A3-3.) |

**Accepted register (carried forward unchanged):** the bun-absolutization
causal model's non-reproduction on this sandbox's bun 1.3.14 (re-verify on
the deployment bun first); the natural-English prose-collision dead rules
(~150 B/rule from ordinary words — the inherent cost of v4's comment
scanning); the test-pin literal faces (tests' own comments spelling banned
forms — `tests/a11y-controls.test.ts`'s `.opacity-0`, `tests/design-tokens.test.ts`'s
`.to-amber-400`, the S33-1 tokens' tests-side mentions) and the .md-scanner
residual (`docs/*.md`'s `.bg-slate-900/98`); the standing register (the
in-app-delivery default flip — the owner-level deferral; the me-route
unthrottled read; the 36px touch targets; the cross-tab quota staleness;
the formatting nits; the signup admin-bootstrap race). AUDIT-2's signup-h1
sibling faces (the /login in-place swap views) ride the reference's own
DOM — parity protects them; only the superset route gains the sr-only h1.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins:**
- **S33-2a**: `tests/db-path.test.ts` — the `resolveDatabaseUrl` describe
  gains TWO its:
  1. "passes through a Windows drive-letter absolute file URL untouched
     (S33-2)" — `resolveDatabaseUrl("file:C:\\db\\custom.db")` must equal
     the input (RED now: re-anchors to `<repo>/prisma/C:\db\custom.db`
     with junk directories).
  2. "passes through a Windows UNC absolute file URL untouched (S33-2)" —
     `resolveDatabaseUrl("file:\\\\server\\share\\custom.db")` must equal
     the input (RED now).
- **S33-2b**: the standalone-launch describe gains ONE it: "keeps a
  Windows drive-letter launch .env value as-is (S33-2 — never
  re-anchored)" — `buildStandaloneRepo()` + launch `.env`
  `DATABASE_URL="file:C:\\data\\prod.db"` + `withEnv("file:C:\\data\\prod.db")`
  (what Windows-bun exports for an absolute value — `path.resolve` of an
  absolute is the absolute); `runtimeDatabaseUrl(standalone)` must equal
  the drive-letter form AND no `prisma/C:` junk directory may exist under
  the module repo root afterward (RED now: re-anchors through the module
  anchor into `<real-repo>/prisma/C:\data\prod.db`).
- **S33-4**: the `effectiveDatabaseUrl` describe gains ONE it: "returns
  the RAW :memory: spelling when the process env carries bun's
  absolutization of it (S33-4 — the dev-shape composition)" —
  `effectiveDatabaseUrl({envUrl: "file:/repo/:memory:", envFileUrl:
  "file::memory:", envFileDir: "/repo"})` → `"file::memory:"`. GREEN now
  (a coverage-gap pin — the battery plants the defect instead; the
  co-pinned faces documented in the pin's comment per the N12-2 doctrine).
- **S33-5**: `tests/login-views.test.ts` — ONE source pin: "the signup
  view carries an sr-only h1 (S33-5 — the superset route's document
  outline)" asserting login-card.tsx contains
  `<h1 className="sr-only">Sign up</h1>` (RED now).
- **S33-1**: `tests/design-tokens.test.ts` — ONE census arm (the S21-5
  BAN genus, generalized to the comment-spelled dead tokens): a new
  describe "session-33 (S33-1) — the dead-token comment census" walking
  `src/**` with the four banned spellings — `space-y-1\.5` outright;
  `max-w-\[420px\]` not `:`-prefixed (the live `md:` form passes);
  `z-\[60\]` not `:`-prefixed (the live `focus:` form passes);
  `backdrop-blur` not suffix-bearing (the live `-xl` form passes).
  RED now (the six sites spell them).

**Batch 2 — the GREEN cures:**
- **S33-2**: `src/lib/db-path.ts` — one shared predicate above
  `resolveDatabaseUrl`:
  `const WINDOWS_ABSOLUTE_REF = /^[A-Za-z]:[\\/]|^\\\\/;` and
  `function isAbsoluteFileRef(ref) { return ref.startsWith("/") || WINDOWS_ABSOLUTE_REF.test(ref); }`
  with the S33-2 lineage comment (a literal regex, not `path.isAbsolute` —
  platform-dependent; the seam recognizes BOTH platform forms on ANY
  host). Line 94 becomes
  `if (!ref || isAbsoluteFileRef(ref) || ref.startsWith(":memory:")) return rawUrl;`
  and `isRelativeFileUrl`'s return becomes
  `ref.length > 0 && !isAbsoluteFileRef(ref)`. Both predicates and the
  launch arm (which routes through `isRelativeFileUrl`) see the fix; no
  existing live ref shape matches the new arms (verified against the
  `../db/*`, `:memory:`, and POSIX-absolute families). All three pins
  GREEN. The RED runs' transient junk directories (`prisma/C:` under the
  real repo) are removed after the RED proof.
- **S33-5**: `src/components/layout/login-card.tsx` — immediately before
  the signup view's h2:
  `{/* Session-33 (S33-5): the superset /signup route's document outline — the reference 404s the route, so the visible h2 (its own swap-view DOM, parity) rides under an sr-only h1 echoing the page title ("Sign up | ViralPost AI"). */}`
  + `<h1 className="sr-only">Sign up</h1>`. The /login in-place swap
  views are untouched (the reference's own DOM).
- **S33-1**: the six prose-safe re-spells (word-level, line-structure
  preserved):
  - `login-reset.ts:178`: "the v3 `space-y-1.5` string is v4-FALSIFIED"
    → "the v3 6px vertical-gap space-y step (the margin-BOTTOM form) is
    v4-FALSIFIED"
  - `page-layout.ts:42`: "v3's `space-y-1.5` is v4-FALSIFIED on the auth
    fields" → "v3's 6px vertical-gap space-y step (margin-BOTTOM form) is
    v4-FALSIFIED on the auth fields"
  - `toast.tsx:124`: "max-w-[420px] at md" → "the 420px max-width cap at
    md"
  - `(site)/layout.tsx:13` and `:22`: "z-[60] sits above the navbar's
    z-50" → "the z-index-60 layer sits above the navbar's z-50" (both
    sites; `z-50` stays — a live class)
  - `navbar.tsx:5`: "backdrop-blur once scrolled" → "backdrop blur once
    scrolled" (the hyphen is the emitter)
  All five files GREEN under the new census; the four tokens no longer
  demand rules from src.

**Batch 3 — the mutation batteries:**
- **S33-2**: revert both predicate call sites to the POSIX-only forms →
  ALL THREE pins RED; restore → GREEN.
- **S33-4**: plant the signature-arm defect (`return envUrl;` instead of
  `return resolveDatabaseUrl(envFileUrl);` in effectiveDatabaseUrl) → the
  composed pin REDs (returning the absolutized `file:/repo/:memory:`)
  while the S26-9 guard pin stays green — the composed face's own
  battery; restore → GREEN. (The co-pin documented in the pin's
  comment: a `:memory:`-guard removal trips both the S26-9 pin and this
  one — the sanctioned N12-2 form.)
- **S33-5**: remove the sr-only h1 → the login-views pin REDs; restore
  → GREEN.
- **S33-1**: the compile probe — per-file recompile
  (`@import "tailwindcss" source(none); @source <file>`, the installed
  @tailwindcss/postcss 4.3.3) of the five re-spelled files, asserting the
  emitted CSS no longer carries `.space-y-1\.5`, bare
  `.max-w-\[420px\]`, bare `.z-\[60\]`, or bare `.backdrop-blur` from src
  demand (the tests/.md residual faces stay in the accepted register —
  the probe attributes each rule to its source).

**Batch 4 — the donor markers (S33-3):**
- `tests/db-path.test.ts` — the standalone-launch describe's title gains
  " (the NEO-CRM donor ledger's session-34 — a donor-ledger number)"; the
  two bare it-titles' `session-35`/`session-36` cites gain "(a donor-ledger
  number)"; a lineage note joins the describe's opening comment (the
  boot-env pattern): the 34/35/36 numbers cite the donor ledger, this
  repo's own sessions are `docs/session_1..33`.
- `viralpost-ai_SKILL.md` §0.5 — the donor enumeration gains 34/35/36:
  "(session-23/34/35/36/67/96/111/145/163/169/170/195/212, …)".

**Batch 5 — the hygiene pair (S33-6 + S33-7):**
- `scripts/smoke-test.sh` — the born-empty block gains
  `SMOKE_PUSH_LOG=""`, `rl_body=""`, `rl_headers=""` (with the S33-6
  note extending the S20-3 comment); the trap's `rm -f` list gains the
  three vars (`rm -f ""` exits 0 — verified). The mid-script `rm -f`
  calls at :83/:211 stay (idempotent). Leg count unchanged (16).
- `README.md:172` — the me row becomes
  `| /api/auth/me | GET | public (session-reported) | The session envelope (data:null when logged out, never 401) |`
  (the "public (IP-limited)" precedent's qualified form). No pin holds
  the row (verified — the census pins counts, api-robustness pins the
  route source).

**Batch 6 — the docs batch + the count re-anchor (constants FIRST — the session-29..32 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-33
  entry; UNIT 649 → **655** (+3 S33-2, +1 S33-4, +1 S33-5, +1 S33-1
  census), E2E 65 unchanged, SMOKE 16 unchanged, SUITES 38 unchanged,
  badge 714 → **720** (UNIT + E2E).
- PAD: §8.1 table (655/65/16); §12 rows re-anchored to the live `wc -l`
  (db-path.ts + the predicate block; smoke-test.sh + the born-empty/trap
  lines; the census walks them RED→GREEN).
- README: the session-33 status row (prose-safe — no banned token
  spellings in the row itself, the session-32 lesson), the gate line,
  badge 720, the counts.
- AGENTS: the counts, the plans map's thirty-third round.
- CLAUDE: the counts.
- SKILL v1.28.0 → v1.29.0: frontmatter (version, date, project_state),
  §0.5's range `1..32` → `1..33` + the donor enumeration extension
  (Batch 4), Appendix A's session-33 row, Appendix B's counts, the
  pre-ship checklist counts.
- The five provenance sites re-anchored `session_1..32` → `session_1..33`
  (SKILL §0.5, `.env.example`, `tests/boot-env.test.ts`,
  `tests/error-boundaries.test.ts`, `tests/auth-reset.test.ts`).
- worklog Task 33; `docs/session_33.md` replaced with this round's log;
  this plan's post-execution record.

**Batch 7 — the verification + the captures (the owner-instructed dev-server posture):**
- The full gate on the exact commit tree: lint → typecheck → unit 655/655
  → build → smoke 16/16 → e2e 65/65 → census MATCH.
- Captures 73/74 under `docs/screenshots/` — (73) the mobile-menu open
  clean-walk at 390×844 (the round's priority surface, functionally
  verified open), (74) the landing hero. PIL-verified (dimensions +
  color depth). The dev server is stopped before the gate (the
  session-32 EADDRINUSE lesson).

**Batch 8 — the commit + the push:**
- Conventional Commit on main: `fix: the windows-absolute file refs + the
  prose-safe sweep completion + the donor-ledger markers + the signup h1
  + the hygiene batch (session-33 audit)`; `.env.example` rides the
  commit (tracked, six-knob current).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the authority):
  paramiko + the Appendix-A shim on PATH (this sandbox has no OpenSSH
  binary), the operator key materialized 0600 OUTSIDE the repo (never
  printed), dry-run first, real push, remote ref verified, key + temp
  material shredded.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record
   (S33-4's battery plants the defect — the pin is a coverage gap; the
   S33-1 cure's battery IS the compile probe).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 655/655 (38 files) · build ·
   smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
3. The db-path seam passes Windows-absolute refs through on both
   predicates; the wrong-DB hazard classes stay closed; the S26-9/S27-2/
   S30-1/S31-1/S32-1 pins stay green.
4. The four dead tokens no longer demand rules from src (probe-verified);
   the census arm holds the genus; the accepted tests/.md residual
   documented.
5. The donor 34/35/36 cites carry their markers + lineage note; §0.5's
   enumeration extended.
6. The signup view carries the sr-only h1; the /login swap views
   untouched; the battery on record.
7. The smoke trap covers the three temp files on every exit path; leg
   count unchanged.
8. Captures 73/74 PIL-verified under `docs/screenshots/`.
9. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit; the docs-counts
   constants re-anchored FIRST.
10. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The plan's projection was exact: UNIT 649 → 655 (+3 S33-2, +1
  S33-4, +1 S33-5, +1 S33-1 census), E2E 65 unchanged, SMOKE 16
  unchanged, badge 714 → 720.** The reality census confirmed 655/38 on
  disk before any doc site was touched.
- **The plan-validation pass paid for itself**: the RED predictions
  were live-probed BEFORE Batch 1 (drive-letter →
  `file:<repo>/prisma/C:\db\custom.db` junk; UNC → junk; the composed
  :memory: GREEN; every live shape unchanged; the census regexes
  flagging all four current sites while passing the live
  prefixed/suffixed forms + the planned re-spells) — the pins landed
  RED/GREEN exactly as projected, no surprises.
- **The S33-2 battery on record**: both predicates reverted to the
  POSIX-only forms → EXACTLY the 3 new pins RED (all 36 pre-existing
  pins GREEN); restored → 39/39 GREEN. The RED runs create no junk
  directories (the backslash refs are single filename segments on
  POSIX — dirname lands on the existing `prisma/`), so no transient
  cleanup was needed.
- **The S33-4 battery on record**: the signature-arm defect planted
  (`return envUrl;` for the arm's `return resolveDatabaseUrl(envFileUrl);`)
  → the composed pin REDs together with the three documented co-pinned
  re-anchor arms (the shared-arm genus, documented in the pin's
  comment per N12-2); restored → 39/39 GREEN.
- **The S33-5 battery on record**: the h1 removed → exactly the one
  login-views pin REDs; restored → 54/54 GREEN. (A mid-battery sed
  lesson: the restore sed with regex metachars in the pattern silently
  no-op'd — the Edit tool restored it; the suite re-verified GREEN.)
- **The S33-1 battery on record**: all five re-spelled files
  per-file-compile CLEAN (no `.space-y-1\.5`, bare `.max-w-\[420px\]`,
  bare `.z-\[60\]`, or bare `.backdrop-blur` emitted from src demand),
  and the probe's vacuity PROVEN on a synthetic pre-cure source (all
  four regexes fire on the old comment spellings; the live forms pass).
  The vacuity probe needed its `from` anchored INSIDE the repo
  (tailwindcss resolves from the postcss `from` — the /tmp probe
  couldn't resolve the import).
- **The S33-3 scope check found two MORE sites than the audit's
  finding**: db-path.ts's STANDALONE LAUNCH RECOVERY header and
  health/route.ts's S36-P5 comment (the audit scoped tests only; a
  repo-wide `session-3[456]` census surfaced the src faces — both
  marked; the historical-record cites stay immutable, resolved by the
  extended §0.5 enumeration).
- **Count-re-anchor order held**: constants FIRST; the census walked
  the doc sites GREEN in one pass (9 transient REDs between the
  constants edit and the walk — resolved in one pass; the PAD §12 rows
  re-anchored: db-path 308 → 333, smoke-test 246 → 258).
- **The parity-walk artifact diagnosed in-round**: the SITEMAP "DIFF"
  in the walk output is the script's first-occurrence-only `.replace`
  — the all-occurrence normalized comparison proves the sitemaps
  identical modulo origin. The generator walk-probe null on both sides
  is a selector artifact (the e2e generator spec + smoke leg 11 prove
  the clone's generator green).

**Final state:** lint 0/0 · tsc 0 · unit **655/655** (38 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **720**. Captures 73/74 PIL-verified on the dev server (the
mobile-menu open clean-walk at 390×844 + the landing hero). Docs
lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.28.0 → v1.29.0 +
the five provenance sites re-anchored to 1..33 + worklog Task 33 +
docs/session_33.md + this post-execution record. Pushed to main via
the SSH wrapper (dry-run first, key shredded after).
