# Session 36 — The Button-Cursor Preflight Cure + The Teardown-Chain Coverage + The Donor-Marker Sweep + The Comment-Truth Batch (2026-11-12)

## Context

Session 35 shipped `1cf3a22`; the owner added `467db9b` (the session-35
execution narration held as `docs/session_36.md`, the established
pattern). This round re-ran the standing instruction against the merged
tree: docs review → baseline gate → the comprehensive audit (three
parallel subagents) → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 662/662 (38 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/`
at the repo root ✓ · the vitest (`vitest.config.mts`) + playwright
(`playwright.config.ts`) suites in place and current ✓ · the
sitemap/robots/manifest/OG family verified live against the reference
(this round's walk) ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/3I · AUDIT-2: 0C/0H/1M/1L/3I · AUDIT-3:
0C/0H/0M/4L/3I** — combined **0 Critical / 0 High / 1 Medium / 7 Low /
9 Info**. The session-35 diff itself verified clean on all three passes
(the source-scoping form, the teardown exitCode idiom, the donor
markers, the full-loop pin, the census widening all honest against
source). AUDIT-2's Medium (the v4 button-cursor preflight gap) was
cross-flagged by AUDIT-1 as an undocumented deviation — and the lead's
walk then confirmed it LIVE on both sides.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the session-35 instrument lessons applied
from the start — `set viewport` + innerWidth confirms, nav-anchored
selectors calibrated against the reference's actual DOM before the run):
**16/20 raw MATCH, ONE real drift** — the round's headline:

- **The cursor drift (S36-1, confirmed live both sides)**: the reference
  renders `cursor: pointer` on every enabled button (the hamburger at
  390px: R=pointer; the login submit: R=pointer) — our side renders the
  UA default arrow (L=default both faces). The /Tool Generate button
  matched only because both sides disable it when the form is empty
  (L=R=not-allowed via the `disabled:cursor-not-allowed` utility). The
  reference is v3-era (v3's preflight ships `button, [role="button"] {
  cursor: pointer }`); v4's preflight ships no cursor rule — the
  family's own SKILL §12 prescribes exactly this base-layer cure, and
  its validation notes confirm the source codebases carry it ("the
  `cursor: pointer` rule in zb's base layer").
- **The two adjudicated non-drifts**: the hamburger class (our
  focus-visible arm — the documented S15-8 superset) and the
  escape-close face. The escape face was ISOLATED this round: the
  reference's panel STAYS OPEN on Escape (`display: block` before and
  after, the button focused — probed twice; the reference has no
  keyboard close at all) — our Escape-close is the documented F11-11
  superset, the mirror of the aria family. Session-35's walk had probed
  the escape transition on OUR side only (`expandedAfter` is our aria
  superset's key); this round's side-by-side face is the completion.
- The rest byte-identical: the bar closed/open families at a confirmed
  390×844, the open panel display block + max-height none + the links +
  the Gumroad pill, the desktop nav 6|6, the five-route head census
  modulo origin, sitemap.xml + robots.txt modulo origin, the login
  round-trip both landing `/`, the generator probe symmetrically null.

**The mobile menu works as expected** — the user's standing concern,
verified live again (open at a confirmed 390px, links + pill
byte-identical, escape-close superset, focus-return e2e-owned).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S36-1 | **MEDIUM** (AUDIT-2 A2-M1 + AUDIT-1 A1-I2, merged) | `src/app/globals.css` `@layer base` (no cursor rule); blast radius = every enabled button app-wide | Tailwind v4's preflight ships no `cursor` rule for buttons — every enabled button renders the UA default arrow where the reference's v3-era preflight renders pointer. Confirmed LIVE this round (hamburger R=pointer L=default; login submit R=pointer L=default; the disabled Generate button matched only via the `disabled:cursor-not-allowed` utility both sides carry). The built sheet carries exactly one cursor declaration (the disabled utility). The family SKILL §12 prescribes the cure: `button, [role="button"] { cursor: pointer }` in `@layer base`; the repo's trap catalog (CLAUDE.md) omits it. A systematic desktop parity divergence on the primary affordance class, invisible to every gate (no computed-cursor census existed). |
| S36-2 | **LOW** (the S31-4/S33-3/S34-1/S35-4 donor-collision genus, the sweep still incomplete) | ~24 bare cites: the N-67h twins at `login/route.ts:13`, `resend/route.ts:40`, `signup/route.ts:40` (verify's twin got its S35-4 marker; these three didn't); the `Session-163` Zod-parse shorthands at login:18, signup:44, resend:44, verify:44, reset-password:38/:42, forgot-password:48/:52, `api.ts:212`, `auth.ts:58/:111`, `password.ts:61`; `api.ts:63` (the section divider, N-67d); login-card.tsx:85 (N-67k), :261 (N-67k/N-67l), :430/:509 (Session-111 D3), :722/:899 (N-79c13), :772 (Session-96) | §0.5's claim "the 80/88/163/164/165/166/173/194 sites carry their inline attributions" is FALSE at the 163 route sites (bare `Session-163: the Zod parse seam` shorthands). The S35-4 batch fixed ten sites and stopped; the genus continues. Cure via the `.env.example` S21-12 file-level precedent: ONE lineage note per file at the first bare cite, covering the recurring donor numbers — cheaper and equally unambiguous. |
| S36-3 | **LOW** (the S35-3 idiom's own gap — the finally's rejection) | `prisma/seed.ts:69-76`, `scripts/e2e-prune.ts:43-50`, `scripts/e2e-contact-readback.ts:51-58`, `scripts/census.ts:68-76` | All four chains are `main().catch(A).finally(B)`: A covers only main's rejection — if B (the awaited disconnect) itself rejects, the overall promise rejects UNHANDLED; on the success path a disconnect rejection flips a green run to a non-zero exit with no coherent message (a green `db:seed` could fail the smoke gate). Cure: reorder to `main().finally(B).catch(A)` — the finally runs on both paths, the catch then covers main's rejection AND the disconnect's. |
| S36-4 | **LOW** (the S35-7 widening's own blind spot) | `tests/docs-counts.test.ts:691` (the extension filter) vs the widening comment's "scripts/ … a future docs/session_1..N range claim there must trip the same lag invariant" | The filter admits only `.ts/.tsx/.mts` under SITE_ROOTS — `scripts/smoke-test.sh`, the scripts/ file most likely to carry provenance prose, is excluded. The widening comment's "must trip" is false for it. Cure: `SITE_FILES` gains `scripts/smoke-test.sh` (the SITE_FILES path reads regardless of extension); the planted-site battery proves the trip. |
| S36-5 | **LOW** (the comment-truth batch, four genera) | (a) `tests/error-boundaries.test.ts:146` + `docs/session_35.md:159` + `worklog.md:3779` + `viralpost-ai_SKILL.md:567` + the session-35 plan: the S35-5 narrative's "13 of 29" — the old pin covered the first-11 prefix + the 4-entry chunk = 15 of 29, so **14** were unpinned (the middle 4 + the tail 10), and the sentence contradicts its own 11+4 arithmetic; (b) `src/app/globals.css:2-5` + `tests/design-tokens.test.ts:35` + `docs/session_35.md:105` + the session-35 plan: the "300+ docs/session/plan/worklog/*_SKILL.md files plus tests/" corpus claim — the countable non-src corpus is ~160 files (92 md outside skills/ + tests + prisma + scripts + root configs), and the root-anchored scanner's actual corpus also included the 3,157-file `skills/` catalog (92% of the non-src tree — tracked, hence not gitignore-excluded; `.bg-[#bada55]` verifiably occurs in skills/ui-styling/references/), which the enumeration never names; (c) `tests/error-boundaries.test.ts:143`: "mirrors next.config's outputFileTracingExcludes root files" drops smoke's own "plus uploads" qualifier (29 vs 28 — `scripts/smoke-test.sh:257` carries the precise form); (d) `docs/session_35.md:150-156` + `worklog.md:3772-3774` + `viralpost-ai_SKILL.md:567`: "ten sites marked at their block-header cites" — 9 marker blocks cover the 10 cites (login-reset:106 covering :114); re-spell to the S35-4 truth. |
| S36-6 | **INFO→cure** (the hygiene batch) | (a) `src/app/api/auth/reset-password/route.ts:79/:107`: the bespoke `fail("VALIDATION", …, 400)` code (the digma-measured contract) has NO pin — only the message is asserted; (b) `src/lib/utils.ts`: the only src/lib module with zero test references (PAD §8.3's "every seam has a spec" holds only via the glossary's circular definition); (c) `playwright.config.ts:13-15` + `AGENTS.md:50`: the limiter summaries enumerate 4 of the 6 fifteen-minute auth buckets (forgot 10 / reset 10 omitted — an operator could conclude they are unthrottled) | (a) +1 source pin in auth-reset.test.ts (the code string + the digma lineage note — the wire stays byte-identical); (b) +1 spec (tests/utils.test.ts — the cn() clsx passthrough + the tailwind-merge precedence, closing the PAD claim mechanically); (c) the two summaries gain the missing buckets. |

**Accepted register (this round's tail, with reasons):** the `start`
script's `tee` masking the exit code (AUDIT-1 A1-I1 — smoke boots the
server directly via `node .next/standalone/server.js`, never through
`bun run start`; the mask is operator-convenience-only and visible in
the log — changing the documented local-workflow script shape for a
non-gate face is not justified); the canvas/rAF loops animating while
scrolled out of view (AUDIT-2 A2-L1 — parity-consistent: the
reference's own loops behave identically; the IO-gate is a superset
OPPORTUNITY, deferred as a behavioral change to three effect loops
outside this round's scope); the plain `@theme` vs the rubric's
`@theme inline` (AUDIT-2 A2-I1 — code-wins: the two hazards the
inline+literal rule guards are independently prevented, the
design-tokens censuses + nine clean walks are the proof); the Reveal
`as` polymorphic prop's zero consumers (AUDIT-2 A2-I2 — vendored
scaffold; retirement is a behavior-neutral refactor touching 9 call
sites' shared component, deferred); the ParticleText un-debounced
resize rebuild (AUDIT-2 A2-I3 — the acknowledged S13-7 in-code
tradeoff, hero-only and transient); the standing register carried
forward unchanged (the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the footer heading skip, the
S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S36-1a**: `tests/design-tokens.test.ts` — the "Tailwind v4
  doctrine" describe block gains ONE it: "the base-layer button cursor
  rule (S36-1 — v4's preflight ships no cursor: pointer; the
  reference's v3-era preflight renders pointer on every enabled
  button, walk-verified both sides)" asserting globals.css contains
  `button, [role="button"] { cursor: pointer; }` inside the @layer
  base block. RED now (the rule does not exist).
- **S36-3a**: `tests/db-census.test.ts` — the S35-3 teardown it gains
  the ordering arm: each of the four script sources must match
  `/main\(\)\s*\.finally\(/` (the chain STARTS with the finally — the
  catch that follows covers main's rejection AND the disconnect's).
  RED now (all four chains start with `.catch`).
- **S36-6a**: `tests/auth-reset.test.ts` — the reset-password describe
  block gains ONE it pinning the bespoke envelope code:
  `fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400)` with the digma
  lineage note (S46/S124's measured contract — the code, not just the
  message). RED now (no pin asserts the code).

**Batch 2 — the GREEN cures:**
- **S36-1**: `src/app/globals.css` `@layer base` — after the body
  rule: `button, [role="button"] { cursor: pointer; }` with the S36-1
  lineage comment (the walk evidence; the SKILL §12 prescription; the
  disabled utilities compose — the utility layer beats the base
  layer). The trap joins CLAUDE.md's catalog + AGENTS' mitigation
  line + the SKILL §4 trap catalog (Batch 4).
- **S36-3**: the four chain reorders — `main().catch(A).finally(B)` →
  `main().finally(B).catch(A)` (seed.ts, e2e-prune.ts,
  e2e-contact-readback.ts, census.ts), each with the one-line why
  comment extension (the finally's own rejection now caught).
- **S36-2**: the per-file lineage notes at the first bare cite of each
  file (the .env.example S21-12 file-level precedent): login/signup/
  resend routes (N-67h + Session-163), verify:44 (163 — the :39/:92
  markers from S35-4 stand), reset-password (163), forgot-password
  (163), api.ts:63 divider + :212, auth.ts:58 (covering :111),
  password.ts:61, login-card.tsx:85 (covering the file's N-67k/N-67l/
  Session-111/N-79c13/Session-96 family). §0.5's 163 claim becomes
  true at its route sites.
- **S36-4**: `tests/docs-counts.test.ts` — SITE_FILES gains
  `scripts/smoke-test.sh`.
- **S36-5**: the comment-truth edits: (a) "13 of 29" → "14 of 29" +
  "tail 9" → "tail 10" at the five sites; (b) the corpus claims
  re-anchored to the real numbers ("the ~160 docs/tests/root prose
  files plus the 3,100-file skills/ catalog — 92% of the non-src
  tree") at the four sites; (c) the "(plus uploads, the pre-existing
  tripwire)" qualifier restored in the error-boundaries comment;
  (d) "ten sites marked" → "nine marker blocks covering the ten bare
  cites (login-reset:106 covering :114)" at the three sites.
- **S36-6**: (a) covered by Batch 1's RED pin; (b) the new
  `tests/utils.test.ts` — ONE it (the cn() clsx conditional
  passthrough + the tailwind-merge precedence) with the vendored-
  scaffold lineage note; (c) playwright.config.ts + AGENTS.md limiter
  summaries gain "forgot 10 / reset 10".

**Batch 3 — the mutation batteries:**
- **S36-1**: remove the cursor rule from globals.css → exactly the
  new pin REDs; restored → GREEN. The real-build verification: the
  emitted sheet carries the `cursor:pointer` declaration on the
  button/[role="button"] selector; the disabled utility still
  composes. The definitive proof is the walk re-run (the two cursor
  faces flip to MATCH).
- **S36-3**: revert seed.ts's chain to `.catch(...).finally(...)` →
  the ordering arm REDs; restored → GREEN. (One planted revert proves
  the regex arm — the four scripts share the single defect shape; the
  pin reads all four.)
- **S36-4**: plant a `docs/session_1..99` range claim in
  scripts/smoke-test.sh → the lag-invariant census REDs (bound 99 >
  diskMax); restored → GREEN. This also proves the .sh file is now
  actually scanned.
- **S36-6a**: plant `fail("BAD_REQUEST"` in reset-password:79 → the
  code pin REDs; restored → GREEN.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST — the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-36
  entry; UNIT 662 → **665** (+1 S36-1 in design-tokens, +1 S36-6a in
  auth-reset, +1 S36-6b in the new utils.test.ts), SUITES 38 → **39**,
  E2E 65 unchanged, SMOKE 16 unchanged, badge 727 → **730**.
- README: badge 730, the gate line, the session-36 status row, the
  Design-system note gains the cursor rule.
- AGENTS: the counts (662→665, 38→39), the plans map's thirty-sixth
  round, the Tailwind-traps mitigation line gains the cursor rule,
  the limiter-summary completion (S36-6c).
- CLAUDE: the counts; the Tailwind v4 trap catalog gains the
  cursor-preflight line (the catalog's newest member).
- PAD: §8.1 table (665/65/16, 39 files); §12 rows re-anchored to the
  live `wc -l` (globals.css, the marked route files, api.ts, auth.ts,
  password.ts, login-card.tsx); Last Updated.
- SKILL v1.31.0 → v1.32.0: frontmatter (version, date, project_state),
  §0.5's range 1..35 → 1..36, §4's trap catalog gains the
  cursor-preflight entry, Appendix A's session-36 row, Appendix B's
  body counts, the pre-ship checklist counts.
- The eight provenance sites re-anchored `session_1..35` →
  `session_1..36` (the S30-4 convention; lag 0 at ship).
- worklog Task 36; `docs/session_36.md` replaced with this round's
  formal log; this plan's post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  665/665 (39 files) → build (with the S36-1 sheet check: the emitted
  CSS carries the cursor rule) → smoke 16/16 → e2e 65/65 → census
  MATCH.
- The parity walk RE-RUN post-cure (one invocation): the two cursor
  faces must flip to MATCH (pointer both sides), the eighteen standing
  faces hold, the two superset faces (S15-8 focus-visible, F11-11
  escape-close) adjudicate as documented. Captures 79/80 re-taken
  post-cure (the mobile-menu open at 390×844 with the cursor rule
  live + the landing hero at 1280×800), PIL-verified.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the button-cursor preflight cure
  + the teardown-chain coverage + the donor-marker sweep + the
  comment-truth batch (session-36 audit)`; `.env.example` rides the
  commit (tracked, six-knob current, the provenance note re-anchored
  to 1..36).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. Every new pin ships with its mutation battery on record (S36-1's
   and S36-3's and S36-6a's pins RED-first; S36-4's planted-site
   battery proves the .sh scan).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 665/665 (39 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
3. The built sheet carries `cursor: pointer` on the button/
   [role="button"] base rule; the disabled utility still composes;
   the walk re-run's cursor faces MATCH (pointer both sides).
4. The four teardown chains start with `.finally`; the ordering pin's
   battery on record.
5. The ~24 bare donor cites carry their per-file lineage notes; §0.5's
   163 claim true at its route sites.
6. The census scans scripts/smoke-test.sh (the planted-site battery).
7. The four comment-truth genera re-anchored (14 of 29; the corpus
   numbers; plus uploads; nine blocks/ten cites).
8. The hygiene batch: the VALIDATION pin, the utils.ts spec, the two
   limiter summaries completed.
9. Captures 79/80 PIL-verified under `docs/screenshots/` (post-cure).
10. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the eight provenance sites at 1..36.
11. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 662 → 665 (+1 S36-1 in
  design-tokens — 29 tests in the file now; +1 S36-6a in auth-reset —
  27; +1 S36-6b in the new tests/utils.test.ts), SUITES 38 → 39,
  badge 727 → 730. The reality census confirmed 665/39 on disk before
  any doc site was touched; the constants were re-anchored FIRST.
- **The cn() spec's first draft was wrong and the test itself taught
  the boundary**: `text-sm` (font-size) and `text-teal-400`
  (text-color) are DIFFERENT tailwind-merge groups — the first
  assertion expected the font-size to be dropped and RED'd against the
  real behavior. The pin now documents both faces precisely: the
  same-group text-color conflict resolves last-win
  (`text-slate-300` + `text-teal-400` → `text-teal-400`), the
  different-group font-size coexists. A better pin than the draft.
- **The prose-safe doctrine applies to narratives too (the S28-4
  genus, struck again)**: the worklog's Task-36 entry spelled the
  S36-4 battery's planted literal (`docs/session_1..99`) verbatim —
  and the lag-invariant census, now scanning worklog.md since S35-7,
  caught it at the full-gate unit leg (exactly the census doing its
  job on its own author). Re-spelled prose-safe ("a
  docs/session_1 dot-dot (beyond-disk) claim").
- **The S36-1 verification chain, end to end**: the pin RED-first
  (exactly 1 failed / 28 passed planted); the rule-removal battery on
  record (removed → exactly the pin RED; restored → 29/29 GREEN); the
  real-build sheet check (the emitted CSS carries
  `button,[role=button]{cursor:pointer}` — the sheet's only
  cursor:pointer declaration, the disabled utility composing at
  `cursor:not-allowed`); and the definitive proof — the walk re-run
  post-cure: **both cursor faces flipped to MATCH (L=pointer R=pointer
  on the hamburger AND the login submit)**, the eighteen standing
  faces hold, the two superset faces adjudicated as documented
  (S15-8, F11-11) — effectively no drift.
- **The S36-3 battery on record**: seed.ts's chain reverted to the
  old order → RED on the ordering arm (exactly the designed RED);
  restored → 7/7 GREEN. The failure paths verified live: readback's
  usage error exits 2 with the message and nothing constructed; the
  seed exits 0 through the finally-first chain; the census still
  MATCHes.
- **The S36-4 battery on record**: the planted range claim in
  scripts/smoke-test.sh trips the lag-invariant census (proving both
  the trip AND that the .sh is scanned); restored → GREEN.
- **The S36-6a battery on record**: `fail("BAD_REQUEST"` planted →
  exactly the new pin RED (1 failed / 26 passed); restored → 27/27
  GREEN. The pin is GREEN-on-arrival by design (a coverage-gap pin —
  the S35-5 precedent; the battery owns the defense).
- **The escape-face completion on the record**: the reference's panel
  STAYS OPEN on Escape (probed in isolation this round — display
  block before and after, the button focused; the reference has no
  keyboard close at all). Session-35's walk had probed the escape
  transition on OUR side only; this round's side-by-side face
  completes the census, and our Escape-close is adjudicated as the
  documented F11-11 superset — the mirror of the aria family.
- **The walk's instrument posture**: the session-35 lessons (set
  viewport + innerWidth confirm; side-agnostic open-verify;
  nav-anchored selectors) were sufficient from the first run this
  round — one audit walk, one verification walk, no
  probe-hardening iterations needed.

**Final state:** lint 0/0 · tsc 0 · unit **665/665** (39 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **730**. The emitted sheet carries the button-cursor base rule.
Captures 79/80 PIL-verified on the dev server (post-cure, the menu
functionally verified open before the shot). Docs lockstep: README +
AGENTS + CLAUDE + PAD + SKILL v1.31.0 → v1.32.0 + the eight
provenance sites re-anchored to 1..36 + worklog Task 36 +
docs/session_36.md + this post-execution record. Pushed to main via
the SSH wrapper (dry-run first, key shredded after).
