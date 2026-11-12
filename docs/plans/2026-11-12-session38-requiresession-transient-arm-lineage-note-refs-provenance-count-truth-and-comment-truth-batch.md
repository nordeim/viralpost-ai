# Session 38 — The requireSession Transient Arm + The Lineage-Note Refs + The Provenance-Count Truth + The Comment-Truth Batch (2026-11-12)

## Context

Session 37 shipped `30bdec6` (the transient-db classifier hoist, the
teardown inner-catch, the donor-marker completion, the comment-truth
batch); the owner's narration commit `8b39add` followed (session_38.md
carries the round-37 narration — this round replaces it with the formal
log). The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `8b39add`, verified in place):** lint 0/0 · tsc 0 ·
unit 671/671 (39 files) · build (the emitted sheet carries
`button,[role=button]{cursor:pointer}`) · smoke 16/16 · e2e 65/65 (9
specs) · census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root ✓ · the vitest + playwright suites in place
and current ✓ · the sitemap/robots/manifest/OG family verified live
against the reference (this round's walk) ✓ · `skills/` excluded from
every gate ✓ · `.env.example` present, committed, matching the six-knob
contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/3I · AUDIT-2: 0C/0H/0M/1L/4I · AUDIT-3:
0C/0H/4L/2I** — combined **0 Critical / 0 High / 0 Medium / 6 Low /
9 Info**. The session-37 diff itself verified correct and complete on
all three passes (the six-route adoption, the byte-identical reset
funnel switch, the inner-catch chains, the lineage notes, the
force-static pin, every count claim live-verified). AUDIT-1 caught the
requireSession seam's missing transient arm (the round's one code
coherence gap); AUDIT-2 caught the login-card lineage note's line-ref
drift; AUDIT-3 caught the "nine provenance sites" miscount, the
six-site both-land tail, the auth.setup limiter summary, and the
utils.test claim site.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the session-35/36/37 instrument lessons
applied — `set viewport` + innerWidth confirms, nav-anchored selectors,
computed styles as ground truth): **ALL FACES MATCH, NO DRIFT — the
eleventh consecutive fully-clean walk.** The mobile menu works as
expected (the user's standing concern): open at a confirmed 390×844,
the panel display block + max-height none + overflow hidden, the five
links + the Gumroad pill byte-identical (classes, hrefs, cursor pointer
— the S36-1 cure holding), the hamburger + login submit pointer both
sides. One instrument note on the record: the reference's open panel
carries a `bg-slate-900/98` class ours does not — probed both sides,
the class is DEAD IN THE REFERENCE'S OWN BUILD (non-standard /98
opacity modifier, never generated; computed background
`rgba(0,0,0,0)` both sides) — observably identical, the computed-style
doctrine governs. The desktop nav 6|6 byte-identical; the five-route
head census byte-identical modulo origin; sitemap 4 URLs both; robots
byte-identical modulo origin; the generator probe symmetrically
disabled/not-allowed; the login round-trip both landing the landing (R
`/Home`, its duplicate-of-`/` route; L `/` — the documented 308
deviation); the escape-close (F11-11) and focus-visible (S15-8) faces
the documented supersets, re-confirmed.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S38-1 | **LOW** (AUDIT-1 A1) | `src/lib/api.ts:64-75` (requireSession's catch), surfaced at `src/app/api/auth/logout/route.ts:24`; overclaiming comments at `src/lib/api.ts:44-50` + `CLAUDE.md:181-183` | The S37-2 hoist adopted the classifier in the six routes + the reset funnel, but `requireSession()` — whose `getSessionUser()` findUnique is "the one DB call EVERY protected route makes" (its own comment) — blanket-catches to `ERR.INTERNAL()` with no arm. The logout route surfaces the seam's envelope: a P2024/P2028 on logout answers 500 INTERNAL while the identical failure on `/api/auth/me` answers 503 UNAVAILABLE — the exact two-incoherent-envelopes genus S37-2 closed, surviving at the shared seam the round didn't touch. The api.ts:49 comment ("every DB-touching route calls this ahead of its residual ERR.INTERNAL()") and CLAUDE.md's line ("every DB-touching route answers the shared 503") both overclaim. Cure: adopt the arm inside requireSession's catch (one branch — the shared `fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503)`), making every protected route coherent by construction; the api.ts comment gains the seam-adoption lineage note. generate is unaffected (its documented S17-3 discard of the gate response stands — the no-auth degradation). +1 pin RED-first. |
| S38-2 | **LOW** (AUDIT-2 A2-1, the S37-3 note's own accuracy) | `src/components/layout/login-card.tsx:92-94` | The S37-3 lineage note's five line references are each off by +6 against the shipped file: claims S79-P2 `:501` (actual `:507`), M-79c3 `:598` (`:604`), L-79c6 `:887` (`:893`), L-79c7/L-79c11 `:637` (`:643`), and the L-79c8 note `:631` (`:637`) — measured against a 6-line-shorter draft of the note's own comment block. Comment-truth only (a reader following `:631` lands on the verify view's email line instead of the L-79c8 note), but the note's entire function is precise donor-cite pointing. Cure: re-point the five refs (+6 each). |
| S38-3 | **LOW** (AUDIT-3 A3-1, the S37 records' own count truth) | `docs/session_37.md:185`/:207, `worklog.md:4004`, the session-37 plan:313 (all say "nine"; the same plan's :191/:251 correctly say "eight") | The session-37 records claim "the nine provenance sites re-anchored to 1..37" — the live census finds exactly EIGHT `docs/session_1..N` range sites (`.env.example:5`, `viralpost-ai_SKILL.md:23`, `src/lib/db-path.ts:250`, `src/app/api/health/route.ts:7`, `tests/auth-reset.test.ts:18`, `tests/boot-env.test.ts:40`, `tests/db-path.test.ts:255`, `tests/error-boundaries.test.ts:30`); sessions 34/35/36's worklog rows all correctly said "eight". Nothing added a ninth site in 37 (the lead likely counted toast.tsx's "sessions run 1..37" phrase — a different form, invisible to the census regex). Cure: re-spell the four records to "eight"; this round's ship then re-anchors the eight live sites `1..37 → 1..38` (the S30-4 convention; the census's lag invariant owns the defense — at ship the on-disk ledger is 1..38 with this round's log, lag 0). |
| S38-4 | **LOW** (AUDIT-3 A3-2, the S37-7 sweep's own completeness) | Stale: `docs/session_32.md:62`, `docs/session_33.md:57`, `docs/session_34.md:68-69`, the session-32 plan:54, the session-33 plan:48, the session-34 plan:61; over-reaching wording: `README.md:290`, `worklog.md:3971`, `docs/session_37.md:153` | S37-7 re-spelled the eleven enumerated 35/36-era "both land on `/`" recordings but six 32/33/34-era logs/plans still carry the identical imprecise phrase (the reference's post-login URL is `/Home`, its duplicate-of-`/` route; ours `/` via the documented 308 deviation — content parity was and remains true, both render the landing). The records' "re-spelled at all eleven carrying sites" overstates — seventeen sites carried the phrase repo-wide. Cure: re-spell the six remaining sites to the precise form; scope the three action narrations ("the eleven enumerated 35/36-era sites (the six 32/33/34-era recordings re-spelled session-38, S38-4)"). |
| S38-5 | **LOW** (AUDIT-3 A3-3, the S36-6c sweep's own miss) | `tests/e2e/auth.setup.ts:5-6` | The S36-6c cure completed the limiter summaries at playwright.config.ts + AGENTS.md to all six fifteen-minute buckets but missed the third summary site: auth.setup.ts's parallel comment still lists four ("login 10 / signup 10 / resend 5 / verify 20, the per-route budgets") — forgot 10 / reset 10 absent, an operator could conclude they are unthrottled. Cure: complete the comment to all six buckets. |
| S38-6 | **LOW** (AUDIT-3 A3-4, the S36-6b/S37-6e claim's own site) | `tests/utils.test.ts:2-4` | The claim "utils.ts was the only src/lib module with zero test references" is still false at its own site: `src/lib/db.ts` (the impure Prisma singleton) also has zero test imports/reads. S37-6e closed the verification-server gap and re-spelled the password-seam narration but left the utils.test.ts header untouched (the plan row promised "+ re-spell the claim"). Cure: re-spell to the precise form ("the only PURE src/lib module with zero test references — db.ts, the impure client singleton, holds the documented exemption"). |
| S38-7 | **INFO→cure** (the hygiene batch, seven genera) | (a) `scripts/census.ts:50`/:58 — the in-main `await db.$disconnect()`s are dead weight under the S37-1 chain form (the chain's inner-caught finally owns teardown; `$disconnect` is idempotent so harmless, but the file owns two teardown idioms while its three siblings own exactly one) — retire the in-main calls; (b) `src/app/api/auth/signup/route.ts:2` — `fail` sits last in the import member order, every sibling orders it among the leading members (introduced by the S37-2 diff) — reorder; (c) `src/components/ui/toast.tsx:161-162` — "this repo's sessions run 1..37" ages every session and is invisible to the census regex (the `docs/session_1..N` form is what the lag invariant scans) — re-spell to the census-legible form (`this repo's own ledger is docs/session_1..38.md`) so the census owns it going forward; (d) the corpus register's basis label under-names its counted basis at the five live-truth sites (`src/app/globals.css:2-3`, `tests/design-tokens.test.ts:35-36`, `viralpost-ai_SKILL.md:216-217`, `docs/session_35.md:107-108`, the session-35 plan:77): "the ~170 docs/tests/root text files" — the live count (167→169 at this round) includes scripts/ (5) and prisma/ (2) which the label does not name — complete the label ("docs/tests/scripts/prisma/root"), the rounded magnitude and the 92% figure unchanged; (e) `src/components/effects/reveal.tsx:36-37` — "Every live call site passes literals" is imprecise: five call sites pass computed delays (`i * 100`, `(i % 3) * 100`, `i * 150`) — mount-time constants riding keyed instances (the prescribed remount-via-key form), the contract's substance holds — re-word to "mount-time constants (computed delays ride keyed instances)"; (f) `tests/seo-surfaces.test.ts:288-292` — the S37-4 force-static pin reads the raw source without `stripComments` (a commented-out export plus a deleted real one would still satisfy it) — align with the house idiom (the S37-2b/S37-6d pins both strip first); (g) `src/components/layout/login-card.tsx:85-96` — the note's blanket clause subsumes the file's six Session-163 cites but never names them (A2-2) — extend the enumeration to name the Session-163 family (each cite already carries its inline "the digma" attribution). |

**Accepted register (this round's tail, with reasons):** the
exact-source-shape GL-release regexes (AUDIT-3 A3-6 — the accepted
source-pin doctrine, the batteries own the defense; noted for the
record); the generate route's guard-envelope discard (AUDIT-1 A2 — the
documented S17-3 degradation posture, unchanged by S38-1 and now noted
in the api.ts comment); the standing register carried forward unchanged
(the prefers-reduced-motion live-toggle gap, the JSON-LD/og:locale/
twitter:site family, the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the footer heading skip, the
S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S38-1a**: `tests/api-robustness.test.ts` — inside the session-37
  classifier describe, the seam adoption pin (source-pinned, the
  S37-2b family form): `src/lib/api.ts`'s requireSession catch region
  carries `isTransientDbFailure(` ahead of `ERR.INTERNAL()` (the seam
  is the seventh adoption site — the one DB call every protected route
  makes). RED now (the catch has no arm).

**Batch 2 — the GREEN cures:**
- **S38-1**: `src/lib/api.ts` requireSession's catch gains the arm:
  `catch (error) { if (isTransientDbFailure(error)) return { response: fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503) }; return { response: ERR.INTERNAL() }; }`
  — logout (and every protected route surfacing the gate envelope)
  now answers the shared 503 on the transient family, coherent with
  me/contact by construction; the S37-2 comment block gains the
  S38-1 lineage note (the seam adoption + generate's documented
  discard unchanged).
- **S38-2**: login-card:92-94's five refs re-pointed (+6 each —
  :507/:604/:893/:643/:637).
- **S38-4**: the six stale both-land sites re-spelled to the S37-7
  precise form; the three action narrations scoped.
- **S38-5**: auth.setup.ts's summary completed ("…login 10 / signup 10
  / resend 5 / verify 20 / forgot 10 / reset 10, the per-route budgets").
- **S38-6**: utils.test.ts:2-4 re-spelled to the precise form.
- **S38-7**: (a) census.ts's in-main disconnects retired; (b) signup's
  import member order; (c) toast.tsx's census-legible range claim;
  (d) the corpus label completed at the five sites; (e) reveal.tsx's
  re-word; (f) the force-static pin comment-stripped; (g) the
  Session-163 enumeration extension.

**Batch 3 — the mutation battery (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S38-1: remove the arm from requireSession's catch → the seam
  adoption pin REDs while the six-route adoption pin and the
  classifier spec stay GREEN (the ownership separation, one face per
  pin).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-38
  entry; UNIT 671 → **672** (+1 S38-1 in api-robustness), SUITES 39
  unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 736 → **737**.
- README: badge 737, the session-38 status row, the gate line, the
  session-37 row's "all eleven sites" scoping (S38-4).
- AGENTS: the counts (671→672); the plans map's thirty-eighth round.
- CLAUDE: the counts; the 503 line stays true (S38-1 makes it so).
- PAD: §8.1 table (672/65/16, 39 files); §12 rows re-anchored to the
  live `wc -l` (api.ts gains the arm; auth.setup.ts if tracked);
  Last Updated.
- SKILL v1.33.0 → v1.34.0: frontmatter (version, date,
  project_state), §0.5's range 1..37 → 1..38, Appendix A's session-38
  row, Appendix B's header + body counts, the pre-ship checklist
  counts.
- The eight provenance sites re-anchored `session_1..37` →
  `session_1..38` (the S30-4 convention; lag 0 at ship).
- The four "nine provenance sites" records re-spelled to "eight"
  (S38-3).
- worklog Task 38; `docs/session_38.md` (this round's formal log,
  replacing the owner narration); this plan's post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  672/672 (39 files) → build → smoke 16/16 → e2e 65/65 → census
  MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  eleventh walk's battery), no drift.
- Captures 83/84 on the dev server (the owner-instructed posture, the
  session-29..37 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the requireSession transient arm
  + the lineage-note refs + the provenance-count truth + the
  comment-truth batch (session-38 audit)`; `.env.example` rides the
  commit (tracked, six-knob current, the provenance note re-anchored
  to 1..38).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. requireSession carries the transient arm (the shared 503 on
   P2024/P2028, the residual INTERNAL otherwise); the seam adoption pin
   RED-first with its battery on record; the ownership separation
   proven (the six-route pin + classifier spec GREEN through the
   battery); the api.ts comment tells the truth (every DB-touching
   route, the seam included).
2. login-card's five line refs point at the actual cites.
3. The four "nine" records say "eight"; the eight provenance sites at
   1..38, census lag 0 at ship.
4. The six stale both-land recordings re-spelled; the three "all
   eleven" narrations scoped.
5. auth.setup's limiter summary lists all six buckets.
6. utils.test.ts's claim precise (pure module; db.ts's exemption
   named).
7. The seven hygiene genera cured (census idiom, import order, the
   census-legible toast range claim, the corpus label, the reveal
   re-word, the comment-stripped pin, the Session-163 enumeration).
8. Full gate GREEN: lint 0/0 · tsc 0 · unit 672/672 (39 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
9. The walk re-run: no drift.
10. Captures 83/84 PIL-verified under `docs/screenshots/` (post-cure).
11. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST.
12. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. S38-1a: place the seam adoption pin (RED) in api-robustness
- [x] 2. Verify Batch 1 RED state
- [x] 3. S38-1: the requireSession arm + the comment lineage note (GREEN)
- [x] 4. S38-2: the login-card ref re-points
- [x] 5. S38-4: the six both-land re-spells + the three scoping re-spells
- [x] 6. S38-5: the auth.setup limiter summary
- [x] 7. S38-6: the utils.test claim re-spell
- [x] 8. S38-7a-g: the hygiene batch
- [x] 9. Batch 3: the S38-1 mutation battery (arm removal → pin RED → restore)
- [x] 10. Batch 4: constants FIRST (UNIT 672, badge 737), the census
      doc-site walk RED→GREEN, PAD §12 rows, SKILL v1.34.0, the eight
      provenance sites 1..38, the four "nine" re-spells, worklog Task
      38, README/AGENTS/CLAUDE rows, session_38.md, the plan record
- [x] 11. Batch 5: the full gate + the walk re-run + captures 83/84
- [x] 12. Batch 6: commit + SSH-wrapper push (dry-run first, remote
      verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 671 → 672 (+1 S38-1a in
  api-robustness), SUITES 39, badge 736 → 737. The reality census
  confirmed 672 on disk before any doc site was touched; the
  constants were re-anchored FIRST.
- **The S38-2 lesson, demonstrated in-round**: the cure's first edit
  re-pointed the five line refs (+6 each) — but the edit itself grew
  the note block three lines, re-drifting every ref below it +3
  before the battery could even run. The final cure references the
  cites by ID with one-phrase locators (search-stable), and the note
  records the lesson: line refs drift with every edit above them.
- **The S38-7e prose-safe catch on its own cure**: the reveal.tsx
  re-word's first draft used "remount-via-key" — the hyphenated prose
  scanned as a phantom `via-key` color utility and REDed the
  design-tokens step-less census (the S28-4 doctrine catching the
  round's own comment). Re-spelled "keyed-remount" → GREEN.
- **The S38-7c site-count effect**: toast.tsx's range claim,
  re-spelled to the census-legible `docs/session_1..38.md` form,
  became the NINTH provenance site — owned automatically by the
  census (its `>= 8` assertion stays GREEN; the claim now ages with
  the lag invariant instead of by hand).
- **The S38-1 ownership separation, proven in the battery**: the seam
  arm stripped → exactly the S38-1 pin RED while the six-route
  adoption pin and the classifier spec stayed GREEN — the seventh
  adoption site owns its own face, disjoint from the routes'.
- **The both-land site census**: the plan enumerated six stale sites;
  the execution re-spelled exactly those six (session_32.md:62,
  session_33.md:57, session_34.md:68-69, the session-32/33/34 plans)
  plus the three over-reaching narrations (README:290, worklog:3971,
  session_37.md:153) — the repo-wide grep confirms zero stale forms
  remain outside the owner-narration quotes (replaced by this round's
  formal log).

**Final state:** lint 0/0 · tsc 0 · unit **672/672** (39 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **737**. Captures 83/84 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.33.0 →
v1.34.0 + the eight provenance sites re-anchored to 1..38 (toast.tsx
the owned ninth) + worklog Task 38 + docs/session_38.md + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
