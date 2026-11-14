# Session 56 — The DB-Path Collision Truth + The Reveal Mechanism Re-Spell + The ParseEnv Cross-Line Note + The Census Registration-Form Note + The Register Batch

## Context

Session 55 shipped `b5c5d92` (one pin + the audit-triage record + the
sitemap comment symmetry + the register batch); the owner's narration
commit `9b5e76c` followed, carrying `docs/session_56.md` as the
round-55 working narration — replaced at this round's ship by the formal
log. The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit → the live reference parity walk → the
TDD cures → the gate → captures → push.

**Baseline (the tree at `9b5e76c`, verified in place):** lint 0/0 · tsc 0 ·
unit 725/725 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH — zero drift from the session-55 ship record. The workspace
persisted between rounds (no sandbox reset this time — `node_modules`,
`db/custom.db`/`e2e.db`/`smoke.db`, the chromium-1248 install, and
`.env` all in place); the standing asks re-verified up front: the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at the
repo root (census MATCH); `.env.example` committed at provenance 1..55;
the vitest + playwright suites in place and current (40 files/725 unit,
9 specs/70 e2e); the sitemap/robots/manifest/OG family verified live
against the reference in this round's walk; `skills/` excluded from every
gate. The neo-crm reference repo re-checked per the standing instruction:
unchanged since the session-48..55 checks — its latest round is still its
session-217 (HEAD `b3d0fbe`, `git fetch` zero new commits); no new
lessons (the ninth consecutive no-change check). The web-application
skill + the skills catalog internalized; tdd, clone-app-pat-pro, and the
agent-browser doctrine (computed styles as ground truth, never eyeballs)
applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead before
adjudication. **AUDIT-1: 0C/0H/0M/1L/1I · AUDIT-2: 0C/0H/0M/0L/4I ·
AUDIT-3: 0C/0H/0M/0L/4I** — combined **0 Critical / 0 High / 0 Medium /
1 Low / 9 Info**. The session-55 diff itself verified correct on all
three lanes at its shipped boundaries (AUDIT-1 re-verified the S55-3
sibling-sentence comment truth in all three SEO routes and the
comment-only diff shape; AUDIT-2 verified the S55-1 pin coherent with
the source at all three needles plus all seven Tailwind v4 mitigations
present, exact, and test-pinned, the complete mobile-menu mechanic set,
and the React 19 discipline — 0C/0H/0M on the whole lane; AUDIT-3
re-derived every count in the lockstep census from disk and declared the
docs five-way lockstep clean at 725/40/70/9/16/795, the plans map 1:1
with the 55 plan files, the ten provenance sites at 1..55 — lag 1,
inside the designed owner-narration window).

**The decisive hand-verifications (the lead's own probes in source):**

- **S56-1 (AUDIT-1 F1, LOW)** — `docs/DEPLOYMENT.md:75` promises absolute
  `DATABASE_URL` values "pass through untouched — immune to any
  working-directory ambiguity." That is FALSE for exactly one input
  class: an intentional absolute process-env value that byte-equals
  bun's absolutization of the `.env`'s relative value — the signature
  arm in `effectiveDatabaseUrl` (`src/lib/db-path.ts:344-348`) treats
  it as derived and re-anchors it inside the repo. Live shape on this
  machine: the sandbox shell exports
  `DATABASE_URL=file:/home/z/my-project/db/custom.db` while the repo
  `.env` carries the default `file:../db/custom.db`; from the repo root,
  `bunAbsolutized(.env value)` produces exactly the shell value → the
  re-anchor fires (probed live: the effective URL resolved to
  `<repo>/db/custom.db`, the DESIGNED recovery — the shell value is a
  bun-derived artifact, not an intentional override; bun's `.env`
  loader does not override a pre-set process env var, probed on
  1.3.14). The defect is the undocumented exception, not the behavior:
  an operator deliberately pointing the env var at the parent-of-repo
  location (the ONE path that collides with the default `.env`) gets a
  different DB file than intended, silently. Doc-truth cure only — a
  behavior change is not warranted (intent and derivation are
  information-theoretically indistinguishable at the collision, and in
  the rewrite regime the same signature IS the correct recovery).
- **S56-2 (AUDIT-2 I2, INFO)** — the `reveal.tsx` S31-5b contract
  comment (`src/components/effects/reveal.tsx:32-42`) overstates the
  hazard mechanism: it claims a post-mount `direction`/`delay` change
  would "re-apply the hidden style to an element whose observer has
  already disconnected (stuck invisible)." React's style diffing
  compares the previous style PROP (opacity: 0 → 0, unchanged) — it
  does not reset the DOM opacity that `settle()` wrote directly, so a
  settled element would remain visible; the realistic symptom of the
  (forbidden) prop change is a re-applied `transform` offset, not
  invisibility. Comment-truth cure (the same behavior is what keeps the
  generator-card's card→paywall `Reveal` swap visible — both branches
  render `<Reveal>` at the same position, the instance reconciles, the
  settled opacity survives the re-render).
- **S56-3 (AUDIT-1 I1, INFO)** — `parseEnvFile` is line-based; bun's
  unclosed-quote parsing spans lines. For an unclosed quote on a single
  line the seam and bun agree (live-probed on 1.3.14: both keep the
  leading `"` in the value — so the signature comparison stays
  consistent on the realistic typo); divergence appears only when a
  LATER line carries a quote character: bun scans forward across
  newlines to the next `"` while the line-based parser cannot. The
  S53-6 registered residual's own face — the docblock note completes
  the register's record (a malformed `.env` with an unclosed quote on
  the DATABASE_URL line PLUS a later quoted value is doubly
  pathological; the raw-relative fallback re-anchors correctly through
  the module anchor).
- **S56-4 (AUDIT-3 I1, INFO)** — the census's UNIT count
  (`tests/docs-counts.test.ts:838-845`) counts only line-start
  `it(`/`test(` registrations. A plain (non-`.each`/`.skip`/loop-body)
  registration written mid-line — `cond ? it("a") : it("b")` — would
  execute in the runner while evading the census, decoupling UNIT from
  reality. Recount: exactly 725 line-start registrations = the
  runner's 725/725; zero live mid-line instances. The forms-guard
  bans `.each/.skip/.only/.todo/.concurrent/.fails`; the loop-arm guard
  scans `^(?:it|test)\(` inside loop bodies — neither covers a
  mid-line plain form. The runner-vs-census ship diff is the standing
  backstop; the note names the shape in the census's own contract
  comment (belt-and-braces awareness, no new guard arm — the repo's
  style conventions own the shape in practice).
- **S56-5 (AUDIT-1 I2-family duty, INFO)** — `bun audit` (the AGENTS.md
  PERIODIC pre-ship duty) reports the SAME 9 advisories as the
  session-55 record: minimatch (moderate, the eslint chain),
  deepmerge-ts (high, prisma CLI › @prisma/config), the vite
  8.3.0–8.3.2 family incl. three launch-editor advisories (vitest ›
  @vitest/mocker › vite), source-map-js (high, the postcss chain —
  reached via next and @tailwindcss/postcss). Lead triage re-verified:
  NONE ride the runtime request path (the postcss/source-map usage is
  build-time CSS compilation; prisma CLI/vitest/vite/eslint are
  devDependencies; the runtime dependency diet — EIGHT packages —
  unaffected). Recorded here per the duty's own form; no runtime
  action.
- **S56-6 (AUDIT-2 I1, register)** — the three effects loops
  (floating-icons, iridescence, particle-text) run whenever mounted —
  no IntersectionObserver pause when their section scrolls out of view.
  Battery/CPU only; zero visual or correctness impact; the reference's
  own framer-motion/WebGL effects behave identically (the parity
  posture); the unmount-cleanup contract is fully test-pinned (the
  S47-4/S55-1 family). REGISTERED with the reason: the IO-gate lift is
  a sound future superset (the reveal.tsx idiom is the template) —
  deliberately not taken this round (three effects files + their test
  pins for a battery-only face the reference itself carries).
- **S56-7 (AUDIT-2 I3, reconcile-the-ask)** — the footer's column
  headings are `h4` under a deepest-preceding `h2` (a heading-level
  skip). The markup is class-for-class the reference's own footer
  (documented DOM extraction); heading-level skipping is a best-practice
  (axe "moderate") issue, NOT a WCAG 2.2 A/AA failure; the e2e
  axe floor (A/AA) passes both widths. The ask RE-CONCILED in this
  record: fixing it would be a parity divergence on a
  reference-owned surface; the sr-only `h3` superset stays available
  if the doctrine is ever extended here.
- **S56-8 (AUDIT-2 I4, register)** — the toast's pause arm rides
  `onMouseEnter/onMouseLeave` (+ the deliberate focus pair, S20-6); on
  touch browsers a tap on the toast body fires a synthetic `mouseenter`
  and the compensating `mouseleave` timing varies by engine/gesture —
  a toast can linger briefly beyond its 4s window. REGISTERED with the
  reason: negligible impact (the dismiss button remains available, the
  viewport caps at 4 cards), and the reference's toast surface is
  DOM-dead (F-131c1) — ours is superset-by-design; the
  `matchMedia("(hover: hover)")` gate is documented as the lift.
- **S56-9 (AUDIT-3 I4, register)** — vitest's `exclude` REPLACES the
  default exclusion set (dist/.git/coverage...). Harmless here: the
  include globs (`src/**/*.test.ts`, `tests/**/*.test.ts`) cannot
  reach those trees and node_modules is re-listed explicitly. REGISTERED
  as awareness for any future include-widening.

## The parity walk (walk #29 — the twenty-ninth consecutive clean walk)

REF leg (live, logged in with the demo credentials): the panel inner
`px-6 py-4 space-y-3` byte-identical (24px/16px padding, block, maxHeight
none, transparent background — the reference's `bg-slate-900/98`
dead-class render); linkTexts identical (Home, Tool, Pricing, Contact,
Upgrade to Pro – $19); Home teal rgb(45,212,191) 14px/500 block; the
siblings rgb(203,213,225) 14px/500 block; the pill rgb(15,23,42)
14px/600 block. The hamburger `md:hidden p-2 text-slate-300` base with
cursor pointer (the reference still ships NO aria family — our expanded
family the documented superset). Escape leaves the reference's panel
open (a REAL key press). The outside-tap face (a genuine non-nav H1 tap)
leaves it open. Route-change close verified at /Pricing — the reference
UNMOUNTS the closed panel (panelCount 0). Desktop census: 6 VISIBLE
links IDENTICAL; the brand wordmark gradient byte-identical
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), 18px/700,
transparent fill). The five-route head census identical (titles +
descriptions + canonicals, the per-route prefix family). Sitemap 4 URLs
(weekly, 1.0/0.8/0.8/0.8) + robots Allow-all + Sitemap line — identical
modulo origin. The generator probe: the reference's generator DEAD (no
copy button, no generation lands, quota unchanged — the documented 402
face). The login round-trip: R settled /Home.

CLONE leg (dev server, quota cleared per the walk protocol): the login
landed at `/` (the documented 308 deviation). The panel byte-identical
on every computed face (inner 16px/24px, block, maxHeight none,
transparent bg; linkTexts + every link style identical). The hamburger
base identical (`md:hidden p-2 text-slate-300` + our focus superset).
Escape closes OUR menu with focus returned to the toggle (hidden attr
true, aria false — the documented superset). The outside-tap face leaves
it open (parity). Route-change close at /Pricing: ours hides in-DOM
(panelCount 1, hidden attr true, aria false — the S26-1 design). Desktop
census: 6 VISIBLE links IDENTICAL, CLONE total 11 = 6 visible + 5 hidden
panel anchors; the brand gradient byte-identical. The five-route head
census identical modulo origin. Sitemap 4 URLs + robots identical modulo
origin. The generator LIVE: a 5-hashtag post + the copy button, quota
0→1 (the D-1 documented superset). **ALL CLONE FACES MATCH — no
clone-side drift, no NEW reference-side drift.**

## The cures (all doc/comment-truth + registers — no behavior change; the S55-3 comment-only precedent)

- **S56-1** — `docs/DEPLOYMENT.md` §4 item 2 gains the collision-class
  sentence (the ONE absolute path that byte-equals bun's absolutization
  of the `.env`'s relative value is re-anchored — the signature arm's
  designed recovery; every other absolute value passes through
  untouched), and the `effectiveDatabaseUrl` docblock's "anything else
  wins as an intentional override" line gains the same-named exception.
- **S56-2** — `reveal.tsx`'s S31-5b contract parenthetical re-spelled to
  the accurate mechanism (a post-mount change re-applies the transform
  offset while the settled opacity survives React's unchanged-key style
  diffing — persistent-offset, opacity-preserving; NOT "stuck
  invisible").
- **S56-3** — `parseEnvFile`'s docblock gains the cross-line sentence
  (bun's unclosed-quote scan spans lines to the next `"`; the
  line-based parser models the single-line shape, where seam and bun
  agree — live-probed on 1.3.14; the S53-6 register's own face
  completed).
- **S56-4** — the docs-counts UNIT census's comment gains the
  registration-form note (line-start-only counting; the forms-guard +
  loop-arm coverage boundary; a mid-line plain `it(` token evades the
  census — the runner-vs-census ship diff is the standing backstop).
- **S56-5** — the bun-audit triage recorded above (this plan's own
  hand-verification section — the AGENTS duty's form).
- **S56-6/S56-7/S56-8/S56-9** — the registers/reconcile recorded above,
  carried into the session log's accepted/observed register.

No new unit tests this round (every cure is comment/doc-truth — the
S55-3 precedent: the seo-surfaces pins read comment-stripped; the
docs-counts census counts registrations, not comments). No mutation
battery (the doctrine binds NEW pins; no new pins ship).

## The count re-anchor (the census's own guards own the truth)

UNIT 725 unchanged, SUITES 40 unchanged, E2E 70 unchanged, E2E_SPECS 9
unchanged, SMOKE 16 unchanged, BADGE 795 unchanged (a comment-truth
round — the s56 ladder entry records the held run per the ladder's own
convention). The ten provenance sites re-anchored to 1..56 — lag 0 at
ship (session_56.md exists on disk as the owner's narration; this
round's formal log replaces its content). SKILL v1.51.0 → v1.52.0.
PAD §12: db-path.ts's line count row updates in the same commit (the
two docblock notes add lines); reveal.tsx, docs-counts.test.ts, and
DEPLOYMENT.md are not §12 files.

## Docs lockstep at ship

README (the session-56 row on the continuous table, the gate footer
re-spell to the session-56 ship); AGENTS (the plans map's fifty-sixth
round); CLAUDE (unchanged counts — no count change this round; the
SKILL reference version rides the SKILL's own frontmatter); PAD (§12's
db-path.ts row; the §8 counts unchanged); SKILL v1.51.0 → v1.52.0
(frontmatter, §0.5 1..56, project_state, §11 checklist — counts
unchanged, Appendix A's session-56 row, Appendix B's header); the ten
provenance sites at 1..56; worklog Task 56; docs/session_56.md (the
formal log replacing the owner's narration); this plan's post-execution
record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results. Conventional Commit to
`main` only, push via the SSH wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
119/120 on the dev server (the owner-instructed posture, the
session-29..55 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified.

## The post-execution record (session-56 ship)

Executed as planned, with the deviations the record owes the truth:

- **S56-1 through S56-9 all landed** as specified (S56-1 the DEPLOYMENT.md
  §4 collision-class sentence + the effectiveDatabaseUrl docblock
  exception; S56-2 the reveal mechanism re-spell; S56-3 the parseEnvFile
  cross-line note; S56-4 the census registration-form note; S56-5 the
  bun-audit triage riding this plan's hand-verification section;
  S56-6/S56-7/S56-8/S56-9 the registers/reconciles recorded above and
  in the formal session log).
- **No new pins, no batteries** — the comment-truth round (the S55-3
  precedent); the mutation-battery doctrine binds NEW pins and none
  shipped. The verification that mattered was executed instead: the
  full gate re-run green on the final tree.
- **The designed count-lag faces on record**: the PAD §12 inventory
  RED on the db-path line-count drift (477 → the live 492) and the
  plans-map tail-currency RED on the 56th plan file — both GREEN at
  the lockstep (the census driving the docs, its own doctrine); the
  README footer-label face (S43-5) and the continuous-table face
  (S43-3 — an interior blank line briefly split the GFM table, the
  S17-2 genus striking again in the round's own edit; cured in the
  same commit) both GREEN at the lockstep.
- **The walk-script heredoc lesson** (the round's one tooling
  deviation, recorded for the next round's script): a
  mismatched heredoc terminator (`JSEEOF` vs the opener's `JSEOF`)
  swallowed every subsequent command silently — bash consumed the
  script body as heredoc text and jumped to the first unbound
  variable; the cure moved every probe to a JS FILE consumed via
  `agent-browser eval --stdin` (no nested heredoc-in-substitution at
  all), and the screenshots needed ABSOLUTE paths (agent-browser
  resolves relative paths against the daemon's cwd, not the
  invoking shell's).
- Counts at ship: UNIT 725 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 795 — ALL HELD; the ten provenance sites at 1..56
  (lag 0); SKILL v1.52.0; captures 119/120 PIL-verified (99.9% /
  100.0% non-white, the panel-open link families confirmed in the
  panel region — the session-55 precedent's exact numbers); the
  viewport-crop form (390×844 + 1280×800) matches the 117/118
  precedent's dimensions; push to main via the SSH wrapper runbook.
