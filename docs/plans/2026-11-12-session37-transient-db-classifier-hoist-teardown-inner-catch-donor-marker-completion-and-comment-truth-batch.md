# Session 37 — The Transient-DB Classifier Hoist + The Teardown Inner-Catch + The Donor-Marker Completion + The Comment-Truth Batch (2026-11-12)

## Context

Session 36 shipped `2222697` (the button-cursor preflight cure, the
teardown-chain coverage, the donor-marker sweep, the comment-truth batch);
no owner narration commit followed, so this round runs directly on that
tree. The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `2222697`, verified in place):** lint 0/0 · tsc 0 ·
unit 665/665 (39 files) · build (the emitted sheet carries the
`button,[role=button]{cursor:pointer}` base rule; the disabled utility
composes) · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ · the
vitest + playwright suites in place and current ✓ · the
sitemap/robots/manifest/OG family verified live against the reference
(this round's walk) ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/3L/3I · AUDIT-3:
0C/0H/2L/4I** — combined **0 Critical / 0 High / 0 Medium / 7 Low /
8 Info**. The session-36 diff itself verified correct and complete on
all three passes (the cursor rule's placement + composition, the
teardown reorders' semantics, the donor markers' completeness at the
enumerated cites, the VALIDATION pin, the census widening — all honest
against source; the audit's own probes re-verified the Promise
semantics and the pin arithmetic).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; the session-35/36 instrument lessons
applied — `set viewport` + innerWidth confirms, nav-anchored selectors
calibrated against the reference's actual DOM: no `<header>`, the bar
is `<nav>`, the panel a nav div carrying `md:hidden` +
`overflow-hidden`, mounted only while open on the reference):
**21/21 faces raw MATCH, NO DRIFT — the tenth consecutive fully-clean
walk.** The three non-raw faces are the documented supersets (the
hamburger focus-visible arm ×2, S15-8; the escape-close, F11-11 — the
reference's panel stays open on Escape, re-confirmed). The mobile menu
works as expected (the user's standing concern): open at a confirmed
390×844, the panel display block + max-height none, the four links +
the Gumroad pill byte-identical, both cursor faces pointer (the S36-1
cure holding). One instrument note for the record: the desktop-nav
probe's raw output included OUR side's mounted-but-hidden panel anchors
(the reference unmounts its panel when closed) — the comparator filters
to the desktop family, 6|6 byte-identical; observably identical either
way (computed display none both sides). **One comment-truth catch from
the walk (S37-7): the reference's post-login URL is `/Home`** — its
duplicate-of-`/` route (which carries `canonical → /` — their own
duplicate-content mitigation), probed twice with settle time, stable,
landing content; OURS is `/` via the documented 308 deviation
(Deviations Ledger row: SEO duplicate-content). The sessions-35/36
recordings said "both land on `/`" — imprecise on the reference's URL;
the content parity holds (both render the landing, title
`ViralPost AI`), and the face is re-spelled this round.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S37-1 | **LOW** (AUDIT-1 A1-1) | `prisma/seed.ts`, `scripts/e2e-prune.ts`, `scripts/e2e-contact-readback.ts`, `scripts/census.ts` (all four teardown chains) | The S36-3 reorder left one diagnostic-fidelity gap: in the BOTH-fail case (main rejects AND the awaited `$disconnect()` rejects), Promise `.finally` semantics make the finally's rejection SUPERSEDE main's — the trailing catch logs only the disconnect failure, and the root cause that triggered the teardown never prints. Probe-verified by the audit under bun 1.3.14 + node. Exit code and the S36-3 coverage claim are correct; only the masking is wrong. Cure: inner-catch the disconnect inside the finally (log + `exitCode = 1`), so the trailing catch only ever sees main's rejection and both failures print. |
| S37-2 | **LOW** (AUDIT-1 A1-3, pre-existing — F9-7 scoped the doctrine to the reset funnel) | `src/lib/api.ts` (new seam export); `login`/`signup`/`verify`/`resend`/`me`/`contact` routes (the six blanket-500 DB catches); the reset funnel's four local sites (`forgot-password` ×2, `reset-password` ×2) | The transient-abort classification (P2024 pool timeout / P2028 transaction timeout → 503 `UNAVAILABLE` with human copy) exists ONLY in the reset funnel; the other six DB-touching routes blanket-catch to 500 `INTERNAL`. Same family, same SQLITE_BUSY-class failure, two incoherent envelopes: forgot-password answers "The request took too long — the database timed out. Try again." (503) while login answers "Something went wrong. Please try again." (500). Cure: hoist `isTransientDbFailure(error)` + `TRANSIENT_DB_MESSAGE` into `src/lib/api.ts` (the one place the codes live), the six routes gain the arm ahead of `ERR.INTERNAL()` (login/me/contact also gain the `catch (error)` binding), and the reset funnel's four local sites switch to the shared helper — the wire stays byte-identical. |
| S37-3 | **LOW** (AUDIT-2 A2-1 + A2-2, the S31-4/…/S36-2 donor-collision genus, the sweep still incomplete) | `src/components/ui/toast.tsx:156` (file-level note MISSING — the file carries bare `Session-131 (D-131a1)`, `walk22`, `F-131c1`, `D-124a7`, `Session-131 (D-131a0)`, `F-128c1`/`s128`/`s129`/`s130` cites; only the Session-62 cite at :6 carries a marker and claims no file-wide coverage); `src/components/layout/login-card.tsx:85` (the note's enumeration INCOMPLETE — the file also carries bare `Session-147`/`s142`/`s145` (:74), `S79-P2` (:501), `M-79c3` (:598), `L-79c7`/`L-79c11` (:637), `L-79c6` (:887); the mid-file L-79c8 lineage note (:631) covers the 79-family but the :85 note neither references it nor enumerates them, while including `N-79c13` which is EQUALLY covered by :631 — by its own standard the enumeration understates the residue) | The S36-2 sweep missed toast.tsx outright and under-enumerated login-card's note. Cure: ONE file-level lineage note at toast.tsx's first bare cite (the `.env.example` S21-12 / login-card:85 precedent) + the login-card:85 note's enumeration extended to name the remaining families and point at the L-79c8 mid-file note. |
| S37-4 | **LOW** (AUDIT-3 A3-1, the S27-6 genus — a docs claim with zero assertions) | `src/app/sitemap.xml/route.ts`, `src/app/robots.txt/route.ts`, `src/app/manifest.json/route.ts` vs `tests/` (absence) | The three SEO routes' `export const dynamic = "force-static"` posture — claimed at four doc sites ("prerendered at build time; NEXT_PUBLIC_SITE_URL is inlined — set it before `bun run build`") — has ZERO test assertions. Since Next 15+ GET handlers are uncached by default, deleting the export flips the routes to per-request rendering and every layer stays green (seo-surfaces invokes `GET()` directly; smoke leg 14 / e2e seo.spec check only 200+body). Cure: one pin in seo-surfaces (the SEO contract's home) asserting each route source carries the export — GREEN-on-arrival (a coverage-gap pin, the S36-6a precedent; the planted-removal battery owns the defense). |
| S37-5 | **LOW** (AUDIT-3 A3-2) | `Project_Architecture_Document.md` §10.3 + `CLAUDE.md` (the anti-patterns line) vs `eslint.config.mjs` (27 rules off — the deliberate, self-documented S25-18c posture) | The lint posture is under-disclosed: PAD §10.3 names only the two hook exemptions and then says "both gates, never weakened"; CLAUDE bans "weakening lint/types/tests to make a gate pass" — while the config's off-list carries 27 entries (base correctness rules among them), deliberate per the config header's own S25-18c rationale. Cure: scope the two doc sites' wording to the actual posture (name the off-list breadth and its home). Not re-enabling rules — the posture is deliberate; the docs must say what the config does. |
| S37-6 | **INFO→cure** (the hygiene batch, six genera) | (a) `prisma/seed.ts:73` — the S36-3 comment's "flipped a green run non-zero with no message": the non-zero half is probe-true, the no-message half overstated (bun/node print their own unhandled-rejection diagnostic; what's missing is the APPLICATION-level message) — reword; (b) the corpus register rounds inconsistently ("~160" vs the live-counted 167; "3,100-file" vs the same document's "3,157-file") — one register at the FIVE live-truth sites: `src/app/globals.css:2-3`, `tests/design-tokens.test.ts:35-36`, `viralpost-ai_SKILL.md:216-217` (§4's trap catalog — missed by the S36-5b sweep), `docs/session_35.md:105-106`, the session-35 plan's S35-1 row (:75) — the new form "the ~170 docs/tests/root text files plus the ~3,150-file skills/ catalog (92% of the non-src tree)", the basis definable (`git ls-files` non-src, non-skills, non-png text files = 167 at this round; skills/ = 3,157); the session-36 action narrations (session_36.md:39/:154-155, the SKILL/README session-36 rows) keep their register — they quote what S36-5b wrote at the time; (c) `src/app/signup/page.tsx:22` — "the the" typo; (d) `src/components/effects/iridescence.tsx:137/:142/:144` — the three early-return paths (compile-fail, `!prog`, link-fail) return without releasing the GL objects they created (vs/fs/prog — `buf` is created only after the link check, so it is NOT live at these returns; the audit's mention of it over-reached); add the guarded deletes; (e) `src/lib/verification-server.ts` — the S36-6b claim "utils.ts was the only src/lib module with zero test references" is loose: verification-server has zero test imports/reads (only a prose comment in password-seam names it) — close it for real with a pass-through pin in password-seam (the S36-6b shape) + re-spell the claim; (f) `README.md:286` — the S36-5d re-spell ("ten more sites marked" → the nine-blocks/ten-cites wording) skipped README's session-35 row while retro-editing the worklog/SKILL rows of the same class. | (a) reword to "…non-zero with only the runtime's unhandled-rejection diagnostic — no application-level message from the chain"; (b) the rounded register ("the ~170 docs/tests/root text files plus the ~3,150-file skills/ catalog — 92% of the non-src tree"), live-counted (167 text files + 3,157 skills at this round), applied at the five live-truth sites; (c) drop the duplicate "the"; (d) `gl.deleteShader`/`gl.deleteProgram` with null guards before each bare return (+1 source arm in effects-motion, battery on record); (e) +1 it in password-seam (the round-trip through the wrappers + the scrypt format + the negative); (f) apply the S36-5d wording to README:286. |
| S37-7 | **WALK-SOURCED comment-truth** (no code change — the Deviations Ledger row already governs the behavior) | `docs/session_35.md:88`, `docs/session_36.md:84`, the session-35 plan:63, the session-36 plan:63, `worklog.md:3752`/:3853, `README.md:286`/:288 (the eight "both land on `/`" recordings) | The reference's post-login URL is `/Home` — its duplicate-of-`/` route (canonical → `/`, their own duplicate-content mitigation; the dossier's auth row has said "redirect to `/Home`" since the investigation), probed twice this round with settle time, stable, landing content. OURS is `/` via the documented 308 deviation. The prior recordings' "both land on `/`" were imprecise on the reference's URL (content parity was and remains true — both render the landing). Cure: re-spell the eight sites to the precise form ("both land on the landing — the reference's URL `/Home`, its duplicate-of-`/` route; ours `/`, the documented 308 deviation"); this round's log records the face at the precise form. NO behavior change: pushing `/Home` instead of `/` would 308 to `/` anyway (identical end state), and serving `/Home` as a duplicate would reverse a documented Ledger decision. |

**Accepted register (this round's tail, with reasons):** the
prefers-reduced-motion live-toggle gap (AUDIT-2 A2-3 — all four effect
components read the media query once at mount; a mid-session toggle
keeps the full-motion loops until reload. Parity-consistent: the
reference's react-bits effects handle it not at all — ours is already
a documented superset; the MediaQueryList-change subscription is a
behavioral change to four effect loops, deferred); the JSON-LD /
og:locale / twitter:site family (AUDIT-3 A3-6 — the reference ships
none of them; the head-census parity contract governs, the superset
opportunity recorded and deferred); the standing register carried
forward unchanged (the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the footer heading skip, the
S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S37-1a**: `tests/db-census.test.ts` — the S35-3 teardown it gains
  the inner-catch arm: each of the four script sources must match
  `/await db\.\$disconnect\(\)\.catch\(\(e\) => \{\s*console\.error\(e\);\s*process\.exitCode = 1;\s*\}\)/`
  (the disconnect's own failure is caught, logged, and flips the exit
  code — main's rejection is never masked). RED now (no inner catch
  exists). The S35-3 arm's awaited-disconnect regex re-anchors to the
  prefix form `/\.finally\(async \(\) => \{\s*await db\.\$disconnect\(\)/`
  (the pin follows the code — the S36-3 precedent); face ownership
  stays one-per-pin (the S35-3 arm owns "awaited in the finally"; the
  S37-1 arm owns "the disconnect's own failure handled").
- **S37-2a**: `tests/api-robustness.test.ts` — a new behavioral
  describe: `isTransientDbFailure` classifies the family (true for
  P2024 + P2028 `PrismaClientKnownRequestError`s; false for P2002, a
  generic `Error`, and non-objects). RED now (the export does not
  exist).
- **S37-2b**: `tests/api-robustness.test.ts` — the six-route adoption
  pin (source-pinned): each of login/signup/verify/resend/me/contact
  carries `isTransientDbFailure(` ahead of `ERR.INTERNAL()`. RED now
  (no route calls it).
- **S37-4a** (GREEN-on-arrival, a coverage-gap pin — the S36-6a
  precedent; the battery owns the defense):
  `tests/seo-surfaces.test.ts` — each of the three SEO route sources
  carries `export const dynamic = "force-static";`.
- **S37-6d** (GREEN-on-arrival, same doctrine):
  `tests/effects-motion.test.ts` — the WebGL hero describe gains the
  GL-release arm: the link-fail path releases the program + both
  shaders before its return.
- **S37-6e** (GREEN-on-arrival, same doctrine):
  `tests/password-seam.test.ts` — the verification-server pass-through
  pin: `hashVerificationCode` produces the seam's scrypt format,
  `verifyVerificationCode` round-trips true on the matching code and
  false on a mismatch.

**Batch 2 — the GREEN cures:**
- **S37-1**: the four chains become
  `main().finally(async () => { await db.$disconnect().catch((e) => { console.error(e); process.exitCode = 1; }); }).catch((e) => { console.error(e); process.exitCode = 1; })`
  with the one-line why-comment extension per file (the both-fail case
  now prints both messages).
- **S37-2**: `src/lib/api.ts` gains `TRANSIENT_DB_MESSAGE` +
  `isTransientDbFailure` (the `Prisma.PrismaClientKnownRequestError`
  instanceof + P2024/P2028 check — the one place the codes live, with
  the F9-7→S37-2 lineage note); the six routes gain the arm ahead of
  `ERR.INTERNAL()` (login/me/contact also gain the `catch (error)`
  binding); the reset funnel's four sites switch to the shared helper
  (wire byte-identical — same code, message, status); the F9-7 pin's
  read-window assertion re-anchors from the literal codes to
  `isTransientDbFailure\(` (the pin follows the code; the codes are
  now owned by the behavioral classifier spec).
- **S37-3**: toast.tsx's file-level lineage note at :156 (covering
  Session-131/D-131a0/a1, F-128c1/F-131c1, D-124a7, s128-s130, walk22)
  + the login-card:85 enumeration extension (the other bare 79-family
  cites — see the L-79c8 note at :631 — and the Session-147/s142/s145
  cites at the file-top docblock).
- **S37-6**: (a) the seed.ts reword; (b) the corpus register re-spell
  at the five sites (live-counted at execution); (c) the signup typo;
  (d) the iridescence GL releases (guarded deletes on the three
  early-return paths); (f) the README:286 re-spell.
- **S37-7**: the eight "both land on `/`" re-spells (docs-only).

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S37-1: strip seed.ts's inner catch (back to the bare
  `await db.$disconnect();`) → the S37-1 arm REDs, the S35-3 arm stays
  GREEN (the await is still there — the ownership separation proven).
- S37-2: (i) invert a code in the classifier (P2024 → P2029) → the
  classifier spec REDs; (ii) remove the arm from login → the adoption
  pin REDs; (iii) the reset-funnel equivalence — the re-anchored F9-7
  pin + the existing auth-reset pins stay GREEN through the helper
  switch (the wire byte-identical, verified by the suite).
- S37-4: delete the robots.txt route's force-static export → the
  force-static pin REDs.
- S37-6d: remove the link-fail `deleteProgram` → the GL-release arm
  REDs.
- S37-6e: plant `hashPassword(code + "x")` in the wrapper → the
  pass-through pin REDs.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-37
  entry; UNIT 665 → **671** (+1 S37-1 arm in db-census, +2 S37-2 in
  api-robustness, +1 S37-4 in seo-surfaces, +1 S37-6d in
  effects-motion, +1 S37-6e in password-seam), SUITES 39 unchanged,
  E2E 65 unchanged, SMOKE 16 unchanged, badge 730 → **736**.
- README: badge 736, the session-37 status row, the gate line, the
  two retro re-spells (S37-6f at :286; the both-land wording at
  :286/:288).
- AGENTS: the counts (665→671); the plans map's thirty-seventh round;
  the status-discipline line gains the 503 transient family (S37-2).
- CLAUDE: the counts; the API-design status line gains 503; the
  anti-patterns line's lint wording scoped (S37-5).
- PAD: §8.1 table (671/65/16, 39 files); §10.3's lint disclosure
  (S37-5); §12 rows re-anchored to the live `wc -l` (api.ts, the six
  routes, the four scripts, login-card, toast, effects files touched);
  Last Updated.
- SKILL v1.32.0 → v1.33.0: frontmatter (version, date,
  project_state), §0.5's range 1..36 → 1..37, Appendix A's session-37
  row, Appendix B's header + body counts, the pre-ship checklist
  counts.
- The eight provenance sites re-anchored `session_1..36` →
  `session_1..37` (the S30-4 convention; lag 0 at ship).
- worklog Task 37; `docs/session_37.md` (this round's formal log,
  created fresh — no owner placeholder this time); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  671/671 (39 files) → build → smoke 16/16 → e2e 65/65 → census
  MATCH.
- The parity walk RE-RUN post-cure (one invocation): the twenty-one
  standing faces hold, the three superset faces adjudicate as
  documented, the login-lands face records at the precise form (R
  `/Home` / L `/` — the documented deviation). Captures 81/82 re-taken
  post-cure (the mobile-menu open at 390×844 + the landing hero at
  1280×800), PIL-verified.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the transient-db classifier hoist
  + the teardown inner-catch + the donor-marker completion + the
  comment-truth batch (session-37 audit)`; `.env.example` rides the
  commit (tracked, six-knob current, the provenance note re-anchored
  to 1..37).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The both-fail teardown case prints BOTH messages (the inner-catch
   form in all four scripts); the S37-1 pin RED-first with its battery
   on record; the S35-3 arm's ownership separation proven in the
   battery (it stays GREEN when only the inner catch is stripped).
2. `isTransientDbFailure` + `TRANSIENT_DB_MESSAGE` live in api.ts; the
   six routes answer 503 `UNAVAILABLE` on the transient family ahead
   of `ERR.INTERNAL()`; the reset funnel's wire byte-identical through
   the shared helper (its existing pins GREEN throughout); the
   classifier spec + adoption pin RED-first, batteries on record.
3. toast.tsx carries its file-level lineage note; the login-card:85
   enumeration complete (the remaining 79-family + Session-147 cites
   named or pointed at).
4. The three SEO routes' force-static posture pinned (battery on
   record).
5. The lint-posture disclosure scoped at PAD §10.3 + CLAUDE (the
   off-list breadth named, the S25-18c home referenced).
6. The hygiene genera cured: the seed reword, the corpus register (one
   form, live-counted), the signup typo, the GL releases (pinned,
   battery on record), the verification-server pass-through pin, the
   README:286 re-spell.
7. The eight "both land on `/`" recordings re-spelled to the precise
   form; this round's log records the login-lands face at the precise
   form.
8. Full gate GREEN: lint 0/0 · tsc 0 · unit 671/671 (39 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
9. The walk re-run: no drift (the twenty-one faces hold; the three
   supersets adjudicated).
10. Captures 81/82 PIL-verified under `docs/screenshots/` (post-cure).
11. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the constants
    re-anchored FIRST; the eight provenance sites at 1..37.
12. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 665 → 671 (+1 S37-1 in
  db-census, +2 S37-2 in api-robustness, +1 S37-4 in seo-surfaces, +1
  S37-6d in effects-motion, +1 S37-6e in password-seam), SUITES 39,
  badge 730 → 736. The reality census confirmed 671 on disk before any
  doc site was touched; the constants were re-anchored FIRST.
- **The S37-1 ownership separation, proven in the battery**: seed's
  inner catch stripped → exactly the S37-1 arm RED while the
  re-anchored S35-3 arm stayed GREEN (the await still present) — one
  face per pin, demonstrated rather than asserted. The S35-3 arm's
  awaited-disconnect regex re-anchored to the prefix form
  (`await db.$disconnect(` — no trailing `;`), so the two arms own
  disjoint faces.
- **The S37-2 wire equivalence, proven by the suite**: the reset
  funnel's four sites switched to the shared helper with the
  F9-7 read-window assertion and the two auth-reset 503 pins
  re-anchored to the helper form (the pin-follows-the-code doctrine) —
  every existing pin GREEN through the switch; the classifier's codes
  are now owned behaviorally (the spec constructs real
  PrismaClientKnownRequestErrors; true for P2024/P2028, false for
  P2002/generic Error/null/undefined/string). reset-password's Prisma
  import retired with the switch (unused); forgot-password keeps its
  (the P2025 arm remains).
- **All six mutation batteries on record**: the S37-1 strip (the arm
  RED, S35-3 GREEN); the S37-2 code inversion P2024→P2029 (the spec
  RED) and the login arm removal (the adoption pin RED, the classifier
  spec GREEN — the separation again); the S37-4 robots export deletion
  (the force-static pin RED); the S37-6d link-fail delete removal (the
  GL-release arm RED); the S37-6e wrong-wrapper plant (the
  pass-through pin RED). Each restored → GREEN.
- **The S37-6d pin's own two drafts**: the first draft split the faces
  into two its and mis-counted the block indentation (the branches
  close at four spaces, not six) — rewritten as ONE it with the three
  branch regexes before any cure was applied (RED-first held: the
  releases did not exist yet; the plan's GREEN-on-arrival note
  corrected in the test's own comment — the releases are a code cure,
  not a coverage gap).
- **The S37-7 site census grew at execution**: the plan enumerated
  eight sites; the SKILL's Appendix-A rows carried the phrase at THREE
  more (the session-32, -35, and -36 rows — the lead's earlier site
  grep had not included the SKILL). Eleven sites re-spelled in total;
  the re-spell notes the S37-7 tag at each.
- **The corpus register, live-counted**: 167 non-src non-skills text
  files (the definable basis: `git ls-files`, non-src, non-skills,
  non-png — git's quotepath encoding of the skills/ catalog's CJK
  filenames was itself a counting trap, caught at execution) + the
  3,157-file skills/ catalog → the "~170 … ~3,150" rounded register at
  the five live-truth sites; the session-36 action narrations keep
  their register (they quote what S36-5b wrote at the time).

**Final state:** lint 0/0 · tsc 0 · unit **671/671** (39 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **736**. Captures 81/82 PIL-verified on the dev server
(post-cure, the menu functionally verified open before the shot).
Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.32.0 →
v1.33.0 + the eight provenance sites re-anchored to 1..37 + worklog (the "nine" at :191/:251 was correct; :313's "nine" re-spelled session-38, S38-3)
Task 37 + docs/session_37.md + this post-execution record. Pushed to
main via the SSH wrapper (dry-run first, key shredded after).
