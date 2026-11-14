# Session 57 — The Spanned-Value Junk-DB Truth + The Parse Divergence Fixtures + The Reveal Either-Scope + The Register Batch (2026-11-14)

The round opened on the shipped tree (`3c4d8b1` — the owner's narration
commit carrying session_57.md as the round-56 working narration;
session-56's own commit was `7ec7f8e`). The core docs re-read and
re-verified (AGENTS, CLAUDE, README, PAD, SKILL v1.52.0 — every
lockstep site confirmed at the session-56 ship counts), then the
session-56 set (the formal session_56.md log, the session-56 plan's
post-execution record, worklog Task 56, the owner's narration). This
round is session 57, the standing instruction on the shipped tree.

Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
725/725, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH) — exactly the session-56 ship record, no drift; the standing
asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at
the repo root, census MATCH; `.env.example` committed at provenance
1..56; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family verified live against the reference
in this round's walk; `skills/` excluded from every gate — the
tsconfig/eslint/vitest configs + the smoke leg-16 hygiene mirror). The
workspace persisted between rounds (`node_modules`, the db files, the
chromium-1248 install, `.env`, and the dev server all in place — and
the agent-browser daemon survived between Bash calls this round, so
the walk ran in discrete probe steps for the first time since the
reaper pattern appeared). The neo-crm reference repo re-checked per
the standing instruction: unchanged since the session-48..56 checks —
its latest round is still its session-217 (HEAD `b3d0fbe`, fetch
confirmed zero new commits); no new lessons this round (the tenth
consecutive no-change check). The web-application skill + the skills
catalog internalized; tdd, clone-app-pat-pro, and the agent-browser
doctrine (computed styles as ground truth, never eyeballs) applied
throughout — the walk probes as JS files consumed via
`agent-browser eval --stdin`, the session-56 lesson.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/2L/0I · AUDIT-2
(components/pages/effects): 0C/0H/0M/1L/5I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/3I — combined **0 Critical / 0
High / 0 Medium / 3 Low / 8 Info**. The session-56 diff itself verified
correct on all three lanes at its shipped boundaries (AUDIT-3
re-derived every count from disk and declared the five-way lockstep
clean at 725/40/70/9/16/795, the plans map 1:1 with the 56 plan files,
the ten provenance sites at 1..56 — lag 1, the designed
owner-narration window; AUDIT-2 verified all seven Tailwind v4
mitigations present, exact, and test-pinned, the complete mobile-menu
mechanic set, and the React 19 discipline; AUDIT-1 re-verified the db
seam's every code path, the envelope discipline on all 13 handlers,
and the S56-1 collision-class sentence accurate against live probes).

**The decisive hand-verification — reproduced end-to-end by the lead
before acceptance (the reproduce-before-trusting doctrine):**

- **S57-1 (AUDIT-1 F1, LOW)** — the S56-3 docblock's final clause
  ("the raw-relative fallback re-anchors correctly through the module
  anchor") is FALSE on the exact divergence shape the note itself
  defines. The lead's four-shape bun 1.3.14 census (isolated temp dirs,
  the ambient DATABASE_URL unset so the .env loader runs): a
  single-line unclosed quote leaves seam and bun AGREEING (the
  leading `"` kept); a later UNCLOSED-quoted line does NOT span (each
  line keeps its own leading quote); a later mid-line-quoted line does
  NOT span; a later CLOSED quoted value is the ONE spanning shape —
  bun's DATABASE_URL becomes `file:../db/custom.db\nOTHER="quoted
  value` (the scan runs to the closing quote that ENDS its line,
  swallowing the newline and the intermediate quote). The seam's own
  line-based parse keeps the leading quote → the signature arm is
  skipped → the spanned value rides the tail arm → the module anchor
  re-anchors it into the JUNK-NAMED
  `<repo>/db/custom.db\nOTHER="quoted value` file. The engine ACCEPTS
  the URL (live-probed with the repo's own @prisma/client 6.19.3: the
  0-byte junk file is created under `<repo>/db/`, `SELECT 1` answers
  `[{"1":1}]`, the first `User` query throws P2021) — the S47-1
  artifact genus (a healthy 200 against a table-less empty DB). The
  S53-6 REGISTERED-not-cured posture stands (doubly-pathological
  operator typo — fix the .env); the defect was the doc-truth
  regression the comment-only round introduced, and the cure makes
  the claim executable.
- **S57-2 (AUDIT-1 F2 + AUDIT-2 F1 — the same one-word gap found
  independently by two lanes, LOW)** — the reveal S56-2 sentence
  over-generalizes: only a `direction` change re-applies the transform
  offset; a delay-only change rewrites just `transitionDelay` (the
  unchanged transform value is skipped — no visible drift).

## The parity walk (walk #30 — the thirtieth consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home`. The hamburger `md:hidden p-2 text-slate-300` base with cursor
pointer, block display, 8px padding, transparent background — and NO
aria family (the reference still ships none; ours the documented
superset). The panel inner `px-6 py-4 space-y-3` byte-identical
(16px/24px padding, block, maxHeight none, transparent background);
linkTexts identical (Home, Tool, Pricing, Contact, Upgrade to Pro –
$19); Home teal rgb(45,212,191) 14px/500 block; the siblings
rgb(203,213,225) 14px/500 block; the pill rgb(15,23,42) 14px/600 block
(9999px radius — the v3-era spelling). Escape via a REAL key press
leaves the reference's panel open. The outside-tap face (a genuine
non-nav H1 tap) leaves it open. Route-change close at /Pricing — the
reference UNMOUNTS the panel (panelCount 0). Desktop census: 6 VISIBLE
links IDENTICAL; the brand wordmark gradient byte-identical
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), 18px/700,
background-clip text). The five-route head census identical (titles +
descriptions + canonicals, the per-route prefix family, the single
shared ogImage). Sitemap 4 URLs (weekly, 1.0/0.8/0.8/0.8) + robots
Allow-all + Sitemap line — identical modulo origin. The generator
probe: the reference's generator DEAD (no copy button, no generation
lands, no quota keys, the generate button re-enabled with nothing
rendered — the documented 402 face). The login round-trip: R settled
/Home.

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): the login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner 16px/24px, block,
maxHeight none, transparent bg; linkTexts + every link style
identical; the pill 33554432px radius — v4's infinity calc rendering
the identical capsule the reference's 9999px renders, the documented
v3/v4 computed-value equivalence). The hamburger base identical
(`md:hidden p-2 text-slate-300` + our focus-ring/aria superset:
expanded Open-menu→true, controls mobile-menu). Escape closes OUR menu
with focus returned to the toggle (panel display none, hidden attr
present, aria false — the documented superset). The outside-tap face
leaves it open (parity). Route-change close at /Pricing: ours hides
in-DOM (panelCount 1, display none, hidden attr, aria false — the
S26-1 design; the documented R-unmount/L-hide divergence). Desktop
census: 6 VISIBLE links IDENTICAL, CLONE total 11 = 6 visible + 5
hidden panel anchors; the brand gradient byte-identical. The
five-route head census identical modulo origin. Sitemap 4 URLs +
robots identical modulo origin. The generator LIVE: a 7-hashtag post +
the Copy button, quota 0→1 (the D-1 documented superset). **ALL CLONE
FACES MATCH — no clone-side drift, no NEW reference-side drift.**
Mobile nav verified working as expected on both sides; all seven
Tailwind v4 mitigations verified present and test-pinned this round
(the audit's own lane).

## The cures (TDD — the pins first, each with its planted-defect battery)

- **S57-1a — the two behavioral pins** (tests/db-path.test.ts):
  the parseEnvFile unclosed-quote divergence fixtures (the
  single-line agreement face + the line-based cross-line parse: the
  seam keeps the leading quote on DATABASE_URL and parses OTHER to
  its own clean value where bun spans), and the resolveDatabaseUrl
  spanned-value junk-tail face (the module anchor fired — absolute,
  not raw; the junk tail rides — ends with
  `db/custom.db\nOTHER="quoted value`; NEVER the clean file). The
  batteries: the quote-strip plant (parseEnvFile strips the leading
  quote when unclosed) REDs exactly the fixtures pin; the
  newline-truncate plant (resolveDatabaseUrl cuts the ref at the
  first newline — the plausible "cure" that would re-anchor to the
  clean path) REDs exactly the resolve pin; both restored GREEN, the
  source byte-identical through the round. Each pin owns exactly one
  face (the parse face; the resolve face — no co-pinning).
- **S57-1b — the docblock re-spell** (src/lib/db-path.ts): the S56-3
  parenthetical re-spelled to the truth — the refined span model (the
  ONE divergent shape is the later CLOSED quoted value; the scan runs
  to the closing quote that ENDS its line), the junk-named-file truth
  (the engine ACCEPTS it — SELECT 1 answers, the first User query
  P2021s — the S47-1 genus), and the REGISTERED-not-cured posture
  (the S53-6 register stands: fix the .env).
- **S57-2 — the reveal either-word re-scope**
  (src/components/effects/reveal.tsx): direction re-applies the
  offset; a delay-only change rewrites just `transitionDelay` — no
  offset re-application, no visible drift on that face.
- **S57-3..S57-8 — the registers** (carried in the session-57 plan):
  the toast double-announce face (the documented sonner/Radix pattern,
  pinned — drop the viewport's aria-live if AT testing ever observes
  doubling), the reveal threshold tall-element trap (unreachable with
  current call sites — a rootMargin note if a full-page Reveal ever
  appears), the mobile-menu md-cross open-state (the S26-3 documented
  posture), the login-card caret-before-digit heuristic (recoverable
  by typing; a selectionStart check would disambiguate), the
  canvas-buffer no-ResizeObserver face (the hero is min-h-screen —
  viewport changes covered), the bun.lock terminology note (the text
  lockfile form is the repo's consistent spelling — a no-finding),
  the session-57 lag re-anchored at ship (the designed convention),
  the vitest isolate hint (cosmetic at 5.65s).
- **S57-9 — the bun-audit triage** (the AGENTS.md periodic duty):
  the SAME 9 advisories as the session-55/56 records (minimatch
  moderate/eslint chain, deepmerge-ts high/prisma CLI, the vite
  8.3.0–8.3.2 family incl. three launch-editor advisories/vitest
  chain, source-map-js high/the postcss chain via next and
  @tailwindcss/postcss) — ALL dev-toolchain/build-time, NONE on the
  runtime request path (the runtime dependency diet — EIGHT packages
  — unaffected). No action.

## The count re-anchor and the docs lockstep

UNIT 725 → 727 (+2 — the two S57-1a pins), SUITES 40 held, E2E 70
held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 795 → 797. The designed
count-lag faces fired exactly as the doctrine describes: the census
drove the docs (11 RED arms at the lockstep — the badge, the README
architecture/testing/footer sites, AGENTS, CLAUDE, the PAD table,
the SKILL frontmatter/Appendix-B/checklist, plus the PAD §12
inventory row on the db-path line-count drift 492 → 509 and the
plans-map tail-currency on the 57th plan file) — all GREEN at the
lockstep. The ten provenance sites re-anchored to 1..57 — lag 0 at
ship (session_57.md existed on disk as the owner's narration; this
formal log replaces its content). SKILL v1.52.0 → v1.53.0. PAD §12:
db-path.ts's row re-anchored 492 → 509 (the re-spelled docblock adds
lines); reveal.tsx and tests/db-path.test.ts are not §12 files.
README: the badge 797, the session-57 row on the continuous table, the
gate footer re-spell. AGENTS: the plans map's fifty-seventh round, the
727 in the testing conventions. CLAUDE: the 727 line. The formal
session log, the plan's post-execution record, and worklog Task 57
(this round's own set).

## The post-execution record (session-57 ship)

Executed as planned, with the deviations the record owes the truth:

- **S57-1a/S57-1b/S57-2/S57-3..S57-9 all landed** as specified — the
  two pins born GREEN with both batteries on record; the docblock
  re-spell; the reveal re-scope; the registers; the triage.
- **The lead-first reproduction discipline paid off this round**: the
  AUDIT-1 subagent's probe initially disagreed with the lead's own
  first probe (the ambient-shell shape masked bun's .env loading) —
  the multi-shape census (four shapes, ambient env unset) settled the
  mechanism: ONLY the later-CLOSED-quoted-value shape spans; the
  S2/S4 agreement faces are now fixture-pinned so the model cannot
  silently re-drift.
- Counts at ship: UNIT 727 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 797; the ten provenance sites at 1..57 (lag 0); SKILL
  v1.53.0; captures 121/122 on the dev server PIL-verified; the full
  gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.

**Gate at the session-57 ship: lint 0/0 · tsc 0 · unit 727/727 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
