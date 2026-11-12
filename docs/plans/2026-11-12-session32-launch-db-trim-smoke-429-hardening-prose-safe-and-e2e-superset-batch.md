# Session 32 — The Launch-DB Trim + The Smoke 429 Leg + The Strengthened Session Arms + The Prose-Safe Batch + The E2E Superset (2026-11-12)

## Context

Session 31 pushed `bee936d`; the owner added `60259ca` (the session-31
execution narration held as `docs/session_32.md`, the established pattern).
This round re-ran the standing instruction against the merged tree: docs
review → baseline gate → the comprehensive audit (three parallel subagents)
→ the neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
648/648 (38 files) · build · smoke 15/15 · e2e 65/65 (9 specs — after the
one-time `bunx playwright install chromium`) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ (the
seam re-anchors the ambient shell override to `<repo>/db/custom.db` — the
census prints the resolved URL) · the vitest (`vitest.config.mts`) +
playwright (`playwright.config.ts`) suites in place and current ✓ (the
standing "add the test suites via the config files" ask has been fully
realized since the earlier rounds) · the sitemap/robots/manifest/OG family
verified live against the reference (this round's walk) ✓ · `skills/`
excluded from every gate ✓ · `.env.example` present, committed, matching
the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/1I · AUDIT-2: 0C/0H/0M/2L/3I · AUDIT-3:
0C/0H/0M/0L/2I** — combined **0 Critical / 0 High / 0 Medium / 5 Low /
6 Info** at the subagent reports. The lead's adjudication takes four Lows
plus four Info items into the working register (all cured this round —
S32-1..S32-8); the rest moves to the accepted register with reasons (see
below). AUDIT-2 compiled the real stylesheet with the installed
@tailwindcss/postcss 4.3.3 (per-file recompile probes attributing every
dead rule to its demand source) — all eight documented Tailwind v4 traps
verified mitigated in the COMPILED output.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`): the mobile-menu census at 390×844 — the
hamburger base classes byte-identical, the open panel computed transparent
both sides at scrollY=0 (`max-height: none`, display block, the four links
+ the Gumroad pill byte-identical), the bar `bg-transparent` with the menu
open, the scrolled-bar class family byte-identical with the computed
background the same color in its two spellings (our
`oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the reference's
`rgba(15, 23, 42, 0.95)`), the desktop nav family byte-identical, the
five-route head census — **NO DRIFT** (titles, og:title, og:description,
meta description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; the icon links the documented
file-convention posture — the reference ships a supabase-hosted logo.png,
ours the `icon.png`/`apple-icon.png` file conventions), sitemap.xml +
robots.txt identical modulo origin (curl-diffed both directions), the
login round-trip live on both sides (both land on the landing —
the reference's URL `/Home`, its duplicate-of-`/` route; ours `/`,
the documented 308 deviation; re-spelled session-38, S38-4; the reference's
localStorage-token posture vs our httpOnly `viralpost_session` cookie the
documented superset). **NO DRIFT FOUND — the sixth consecutive fully-clean
walk.** The Tailwind v4 trap catalog re-verified mitigated in the compiled
output (zero `(hover: hover)` queries, literal-hex `@theme`, the re-pinned
`--shadow-sm`/`--blur-sm`, no banned gradient pair). The standing asks
re-verified: sitemap/SEO complete, the mobile menu working as expected
(open/Escape-close verified live; the full functional battery —
navigate+close, history close + focus return — e2e-pinned 65/65).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S32-1 | **LOW** (the S30-1/S31-1 genus, one face deeper) | `src/lib/db-path.ts:238-291` (`runtimeDatabaseUrl`, the standalone launch-recovery arm) | The S30-1/S31-1 trims live ONLY in `effectiveDatabaseUrl`; the launch-recovery arm performs a THIRD signature comparison on UNTRIMMED faces: raw `process.env.DATABASE_URL` (:239) vs `bunAbsolutized(launchEnvUrl)` of the raw `.env` parse (:263), then re-anchors via `urlForRoot(launchDir, ref)` with the untrimmed ref (:286-288). A whitespace-PADDED quoted launch `.env` value (`DATABASE_URL="file:../db/custom.db "` — a one-keystroke typo) matches its own padded absolutization and resolves to `<repo>/db/custom.db ` — a trailing-space filename SQLite silently creates as a fresh empty DB (the exact S30-1/S31-1 wrong-DB class, reachable only through the launch arm). The padded `file::memory:` shape returns the RAW padded spelling through the S27-2 pass-through instead of the trimmed raw. Live-verified at seam level by the lead (fixture standalone repo; the dev shape resolves correctly via the tail seam — the defect is launch-arm-only). (AUDIT-1 A1-1.) |
| S32-2 | **LOW** (the smoke ladder's sessioned leg cannot fail on broken auth) | `scripts/smoke-test.sh:152-154` (leg 08), `:173-177` (leg 12) | Leg 08 greps only `'"ok":true'` — the logged-out face `{"ok":true,"data":null}` also produces it, so a regression in cookie VERIFICATION (HMAC change, tokenVersion bug) ships green through the whole ladder; leg 07 asserts minting (Set-Cookie), never verification. Leg 12 discards logout's status code entirely (the header's "-> 200 + **the user**" overclaims; the e2e layer alone catches it). The vacuous-pin class per the house mutation-battery doctrine. (AUDIT-1 A1-2.) |
| S32-3 | **LOW** (the smoke tier has no live rate-limit leg) | `scripts/smoke-test.sh` (the ladder as a whole) | The master skill's smoke-tier contract (skills/web-application §14.3) lists "rate limit (429)" among the curl checks; this repo's 15-leg ladder has NO live 429 leg (the CRM-era 11th-login leg was dropped at the session-1 transform with no recorded rationale — an undocumented deviation). Coverage of the 429/Retry-After face is source-pin-only; a runtime keying/window regression would ship green. Restore the live leg (the 11th-login shape on the isolated smoke instance — its own port + own scratch db, so the shared-bucket hazard AGENTS documents never contaminates the demo-login legs). (AUDIT-1 A1-3.) |
| S32-4 | **LOW→cure** (the S28-4/S31-5a prose-safe doctrine, three uncuried src sites) + a comment-truth nit | `src/lib/login-reset.ts:36,81,155-157,183-186` · `src/components/effects/reveal.tsx:8` · `src/components/layout/login-card.tsx:123-125` | (a) login-reset.ts's docblocks spell the reference's retired forms verbatim — `-mb-2` (×4 sites) and `focus:ring-slate-400` (×2 sites) — and reveal.tsx:8 spells `opacity-0`; each emits a never-matched rule into the production CSS (probe-compiled by the lead from the shipped build: `.focus\:ring-slate-400:focus`, `.-mb-2`, `.opacity-0` — zero live consumers). navbar.tsx got the S31-5a cure; these three files didn't. (b) login-card.tsx:123-125 claims "the card renders mid-page under the navbar on /login" — no navbar renders on /login (the route sits outside the `(site)` group); the S19-10 rationale should not cite a navbar that does not exist. (AUDIT-2 A2-1 + A2-4.) |
| S32-5 | **LOW→docs** (the agent contract inverts the hover-unwrap's mechanism) | `CLAUDE.md:93` | "The `@custom-variant hover` unwrap keeps hover styles off touch devices" is INVERTED: v4's DEFAULT `(hover: hover)` media wrap is what keeps hovers off touch; the unwrap RESTORES v3 bare-`:hover` semantics — hovers fire on touch sticky-tap, exactly like the reference's v3-era stylesheet (the parity intent). A future agent reading the contract could "fix" the code toward the doc and silently break the pinned touch-hover parity. The SKILL (§4 trap 3) and globals.css state the mechanism correctly; only CLAUDE.md is inverted. One-line cure. (AUDIT-2 A2-2.) |
| S32-6 | **INFO→cure** (the round's priority surface has no behavioral focus pin) | `tests/e2e/mobile-navigation.spec.ts:37-57` (the history-close arm) | The S31-2 history-close focus return is only regex-pinned (a11y-controls.test.ts) — the e2e test asserts the panel closes on `goBack()` but NOT that focus lands on the toggle; the Escape arm's return IS e2e-asserted (`:69 toBeFocused`). A regression in the `useLayoutEffect` wiring would pass e2e. Append the behavioral arm (folded in place — the S18-2 no-count-change precedent). (AUDIT-2 A2-5.) |
| S32-7 | **INFO→cure** (the head-level icon face is unpinned) | `tests/e2e/seo.spec.ts:230` (the S22-14 icon test) | layout.tsx correctly declares no `metadata.icons` (the file conventions own `link[rel=icon]`/`apple-touch-icon`) and the existing pins cover the asset IHDRs + manifest sizes + route resolution — but no pin asserts the SERVED HTML head carries the icon links. A regression adding `metadata.icons` (which REPLACES the file-convention links) would ship green while changing head output — the S29-5/S31-7a "rendered-DOM superset" genus (og:image/twitter:card/dims were closed on the served head; the icon links are the remaining face). Fold two arms into the S22-14 test in place. (AUDIT-3 A3-I1.) |
| S32-8 | **INFO→cure** (a vacuous test registration) | `tests/rate-limit.test.ts:113-116` | The it() "restores the environment after the battery" contains NO assertion — an env-restore side effect riding a test registration (always green by construction, counted in the 648 census). Convert to a proper `afterEach` teardown (strictly more robust: per-test isolation instead of file-order dependence); UNIT −1 in the same commit. (AUDIT-3 A3-I2.) |

**Accepted register (adjudicated this round, with reasons):** the bun
absolutization causal model's non-reproduction on THIS sandbox's bun
1.3.14 (A1-4 — AUDIT-1 probed 7 shapes: bun does not walk up parent dirs
for `.env` and does not forward `.env`-loaded vars to `bun run`'s
children; the header's model is recorded from the family's deployment
evidence and the seam is correct under BOTH models — defensive by design;
the ambient-shell face explains the founding bug identically. No reword
on single-sandbox evidence; re-verify on the deployment bun first). The
natural-English prose-collision dead rules (A2-3 — "margin collapse", "the
container announces": ~150 B/rule from ordinary words; accept-and-document
— the inherent cost of v4's comment scanning; the doctrine targets retired
class forms, not English). The test-pin literal face of S32-4
(tests/a11y-controls.test.ts's own regex + comments spell the banned forms
— the standing tests/.md residual family; the src/ face is the app-code
doctrine face and IS cured this round). The standing accepted register
carries unchanged (the in-app-delivery default flip — the owner-level
deferral; the me-route unthrottled read; the 36px touch targets; the
cross-tab quota staleness; the formatting nits; the signup admin-bootstrap
race; the Tailwind .md-scanner residual).

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins + the fixture hygiene:**
- **S32-1a**: `tests/db-path.test.ts` — the
  `runtimeDatabaseUrl (standalone launch contexts — session-34)` describe,
  after the S27-2 `:memory:` test (:366), gains TWO its:
  1. "a whitespace-padded launch .env value resolves to the CLEAN path
     (S32-1)" — `buildStandaloneRepo()` + `writeFileSync(<repo>/.env,
     'DATABASE_URL="file:../db/custom.db "\n')` + the process env carrying
     the PADDED absolutization (`file:${join(repo,"..","db","custom.db")} `);
     `runtimeDatabaseUrl(standalone)` must equal
     `file:${join(repo,"db","custom.db")}` and never match
     `/custom\.db $/`. RED now (returns the trailing-space path).
  2. "a whitespace-padded `:memory:` launch value returns the TRIMMED raw
     spelling (S32-1)" — launch .env `DATABASE_URL="file::memory: "` + the
     process env carrying `file:${join(repo,":memory:")} `; the S27-2 arm
     must return `"file::memory:"` (trimmed). RED now (returns the padded
     raw).
- **S32-8**: `tests/rate-limit.test.ts` — the empty it() (:113-116)
  removed; the restore moves to an `afterEach` inside the describe (the
  ORIGINAL capture at :50 is its source). Suite GREEN; UNIT 648 → 647 on
  this step alone (the census re-anchor lands in Batch 6).

**Batch 2 — the GREEN cures:**
- **S32-1**: `src/lib/db-path.ts` — `runtimeDatabaseUrl` trims its faces
  at the top: `const envUrl = process.env.DATABASE_URL?.trim() || undefined;`
  and, inside the launch-recovery arm,
  `const launchEnvUrl = readDatabaseUrlFromEnvAt(launchDir)?.trim() || undefined;`
  with the S32-1 lineage comment (the trim keeps the signature comparison,
  the `:memory:` pass-through and `urlForRoot` consistent on clean faces —
  the same one-home doctrine the tail seam already applies). The tail
  `effectiveDatabaseUrl` call is unchanged (its own trim is idempotent).
  Both pins GREEN.
- **S32-4**: `src/lib/login-reset.ts` (:36, :81, :155-157) — the four
  `-mb-2` prose mentions re-spelled prose-safe ("the reference's negative
  mb-2 margin form" — `mb-2` alone is a LIVE class, harmless); (:183-186)
  the two `focus:ring-slate-400` DOM-record mentions re-spelled ("the
  reference's own slate-400 focus ring, ≈2.57:1"); :86's
  `` `mb-2 sm:mb-4` `` inside the comment re-spelled likewise if the probe
  shows it dead (`mb-2 sm:mb-4` — both live classes, likely harmless;
  probe decides). `src/components/effects/reveal.tsx:8` — "opacity-0
  inline styles" → "the zero-opacity inline form".
  `src/components/layout/login-card.tsx:123-125` — "under the navbar"
  dropped from the S19-10 rationale ("the card renders mid-page on /login
  — no focus-steal on initial mount").
- **S32-5**: `CLAUDE.md:93` — the line becomes: "The `@custom-variant
  hover` unwrap restores v3 bare-`:hover` semantics — hover styles apply
  on touch devices, exactly like the reference's v3-era stylesheet (v4's
  default `(hover: hover)` media wrap would keep them off touch)."

**Batch 3 — the mutation batteries:**
- **S32-1**: revert the two trims (back to raw reads) → BOTH pins RED;
  restore → GREEN.
- **S32-4**: the compile probe — per-file recompile
  (`@import "tailwindcss" source(none); @source <file>`) of the re-spelled
  files, asserting the emitted CSS no longer carries
  `.focus\:ring-slate-400:focus`, `.-mb-2`, `.opacity-0` from src demand;
  the residual from tests/.md demand stays in the accepted register (the
  S31-5a precedent — the probe attributes each rule to its source).

**Batch 4 — the smoke ladder (S32-2 + S32-3):**
- Leg 08's grep strengthened from `'"ok":true'` to
  `'"email":"sepnetflix2023@outlook.com"'` (the me envelope carries the
  user row — the logged-out `data:null` face can never satisfy it).
- Leg 12 captures and asserts the logout STATUS (200 — the S29-1 gate
  answers 401 for cookie-less callers; with the jar it must be 200).
- The NEW leg 13 — the live 429: ten wrong-password login POSTs after the
  teardown; leg 07's login + the first nine answers (401) + the tenth
  additional (11th cumulative) must answer 429 with `Retry-After` and the
  `RATE_LIMITED` envelope body (`ERR.RATE_LIMITED` ships both). Assert the
  FIRST nine are 401 (broken-open and broken-closed both fail).
- Renumber: the SEO family 13→14, the boot-gate probe 14→15, the artifact
  hygiene 15→16; the header ladder comment + `SMOKE: 16/16 PASS`.
- `next.config.ts:20`'s comment (leg 15 → leg 16); `Project_Architecture_
  Document.md:517` (smoke leg 14 → leg 15, the boot gate).
- `tests/docs-counts.test.ts`: `SMOKE = 15` → `16`; the census REDs every
  stale site (AGENTS "(15 legs)", CLAUDE "15-leg curl ladder", README
  "15-leg curl ladder", PAD "| Smoke | 1 script | 15 legs |", SKILL
  "smoke 15/15" + "Gate green at the exact counts (… 15 smoke)") until
  they all say 16.

**Batch 5 — the e2e superset folds:**
- **S32-6**: `tests/e2e/mobile-navigation.spec.ts` — the history-close
  test appends `await expect(page.getByRole("button", { name: "Open menu"
  })).toBeFocused();` after the `goBack()` settle (the S31-2 arm's first
  behavioral pin; the label relabels on close, so the toggle is "Open
  menu" again).
- **S32-7**: `tests/e2e/seo.spec.ts` — the S22-14 test appends
  rendered-head arms: on `/`, `link[rel="icon"]` exists with an href
  starting `/icon.png`, and `link[rel="apple-touch-icon"]` exists with an
  href starting `/apple-icon.png` (a `page` fixture is added to the test's
  destructuring).
- Batteries: S32-6 — drop the layout effect (the S31-2 mechanism) → the
  e2e arm REDs (plus the unit pins, already proven at session 31); S32-7
  — plant `metadata.icons = { icon: "/planted.png" }` on layout.tsx → the
  arms RED (the file-convention links replaced); both restored → GREEN.

**Batch 6 — the docs batch + the count re-anchor (constants FIRST — the session-29/30/31 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-32
  entry; UNIT 648 → **649** (+2 S32-1a, −1 S32-8), E2E 65 unchanged (the
  two folds are in-place), SMOKE 15 → **16**, SUITES 38 unchanged, badge
  713 → **714** (UNIT + E2E).
- PAD: §8.1 table (649/65/16); §12 rows re-anchored to the live `wc -l`
  (db-path.ts + the trim lines; login-reset.ts + the re-spells; the
  census walks them RED→GREEN).
- README: the session-32 status row, the gate line, badge 714, the counts.
- AGENTS: the counts, the plans map's thirty-second round.
- CLAUDE: the counts + the S32-5 line (Batch 2).
- SKILL v1.27.0 → v1.28.0: frontmatter (version, date, project_state),
  §0.5's range `1..31` → `1..32`, Appendix A's session-32 row, Appendix
  B's counts, the pre-ship checklist counts.
- The five provenance sites re-anchored `session_1..31.md` →
  `session_1..32.md` (SKILL §0.5, `.env.example`, `tests/boot-env.test.ts`,
  `tests/error-boundaries.test.ts`, `tests/auth-reset.test.ts`).
- worklog Task 32; `docs/session_32.md` replaced with this round's log;
  this plan's post-execution record.

**Batch 7 — the verification + the captures (the owner-instructed dev-server posture):**
- The full gate on the exact commit tree: lint → typecheck → unit 649/649
  → build → smoke 16/16 → e2e 65/65 → census MATCH.
- Captures 71/72 under `docs/screenshots/` — (71) the mobile-menu open
  clean-walk at 390×844 (the round's priority surface, functionally
  verified open), (72) the landing hero. PIL-verified (dimensions + color
  depth).

**Batch 8 — the commit + the push:**
- Conventional Commit on main: `fix: the launch-db trim + the smoke 429
  leg + the strengthened session arms + the prose-safe batch + the e2e
  superset (session-32 audit)`; `.env.example` rides the commit (tracked,
  six-knob current).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the authority):
  paramiko + the Appendix-A shim on PATH (this sandbox has no OpenSSH
  binary), the operator key materialized 0600 OUTSIDE the repo (never
  printed), dry-run first, real push, remote ref verified, key + temp
  material shredded.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record
   (the S32-4 cure's battery IS the compile probe).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 649/649 (38 files) · build ·
   smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
3. The db-path launch arm sees trimmed faces end-to-end; the wrong-DB
   hazard classes stay closed; the S30-1/S31-1/S27-2 pins stay green.
4. The smoke ladder's sessioned leg can fail on broken verification; the
   429 leg exercises the live limiter + Retry-After on the isolated
   instance.
5. The src prose-safe face cured (probe-verified); the accepted residual
   documented.
6. The two e2e folds behavioral; both batteries on record.
7. CLAUDE.md states the hover-unwrap mechanism correctly.
8. Captures 71/72 PIL-verified under `docs/screenshots/`.
9. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit; the docs-counts
   constants re-anchored FIRST.
10. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The plan's projection was exact: UNIT 648 → 649 (+2 S32-1a, −1
  S32-8), E2E 65 (the two folds in place), SMOKE 15 → 16, badge 713 →
  714.** The reality census confirmed 649/38 and 16 legs on disk
  before any doc site was touched.
- **The S32-6 battery caught TWO of its own flaws** — the round's
  design lesson. (a) The e2e arm's first shape was VACUOUS: focus had
  never left the toggle in the test flow (the toggle was clicked to
  open the menu and nothing moved focus before goBack), so the arm
  could be deleted with the assertion still green — the exact genus
  the house mutation-battery doctrine exists to catch. Redesigned to
  focus a link INSIDE the open panel first (the keyboard/AT posture),
  so the history close unloads the focused link and only the
  layout-effect arm can land focus back on the toggle. (b) The
  battery's rebuild lesson: the e2e runs against the BUILD — a source
  mutation only REDs after `bun run build` (the first battery attempt
  passed green with the arm "removed" because the served artifact
  still carried it). Both batteries re-proven on the corrected
  sequence: arm removed from the build → the spec REDs (1 failed,
  toBeFocused); restored → 7 passed.
- **The S32-7 battery on record**: `metadata.icons` planted on
  layout.tsx → rebuilt → the icon test REDs (the file-convention
  links replaced); restored → 11 passed.
- **The S32-3 leg verified live**: the full ladder 16/16 PASS with the
  exact code sequence ` 401 401 401 401 401 401 401 401 401 429` +
  Retry-After + the RATE_LIMITED body.
- **The S32-4 probes**: all three re-spelled files CLEAN (per-file
  recompile: no `.focus\:ring-slate-400:focus`, no `.-mb-2`, no
  `.opacity-0` emitted from src demand).
- **A mid-round README lesson**: the freshly-written session-32 status
  row initially spelled the banned class tokens verbatim (the row is
  scanned as a .md source) — re-spelled prose-safe before commit (the
  S31-5 doctrine applied at authoring time, not after).
- **Count-re-anchor order held**: constants FIRST; the census then
  walked the doc sites GREEN in one pass (9 transient REDs between
  the constants edit and the walk — resolved in one pass; the PAD §12
  rows re-anchored: db-path 297 → 308, smoke-test 212 → 246).

**Final state:** lint 0/0 · tsc 0 · unit **649/649** (38 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **714**. Captures 71/72 PIL-verified on the dev server (the
mobile-menu open clean-walk at 390×844 + the landing hero). Docs
lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.27.0 → v1.28.0 +
the five provenance sites re-anchored to 1..32 + worklog Task 32 +
docs/session_32.md + this post-execution record. Pushed to main via
the SSH wrapper (dry-run first, key shredded after).
