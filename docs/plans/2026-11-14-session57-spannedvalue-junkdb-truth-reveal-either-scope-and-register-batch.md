# Session 57 — The Spanned-Value Junk-DB Truth + The Parse Divergence Fixtures + The Reveal Either-Scope + The Register Batch

## Context

Session 56 shipped `7ec7f8e` (the comment-truth round: the dbpath
collision sentence, the reveal mechanism re-spell, the parseEnvFile
cross-line note, the census registration-form note, the registers);
the owner's narration commit `3c4d8b1` followed, carrying
`docs/session_57.md` as the round-56 working narration — replaced at
this round's ship by the formal log. The standing instruction re-ran
end to end: docs review → baseline gate → the comprehensive audit →
the live reference parity walk → the TDD cures → the gate → captures →
push.

**Baseline (the tree at `3c4d8b1`, verified in place):** lint 0/0 · tsc 0 ·
unit 725/725 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH — zero drift from the session-56 ship record. The workspace
persisted between rounds (`node_modules`, `db/custom.db`/`e2e.db`/
`smoke.db`, the chromium-1248 install, `.env`, and the dev server all in
place); the standing asks re-verified up front: the `.env`
`DATABASE_URL="file:../db/custom.db"` contract intact with `db/` at the
repo root (census MATCH); `.env.example` committed at provenance 1..56;
the vitest + playwright suites in place and current (40 files/725 unit,
9 specs/70 e2e); the sitemap/robots/manifest/OG family verified live
against the reference in this round's walk (walk #30); `skills/`
excluded from every gate (tsconfig/eslint/vitest configs + the smoke
leg-16 hygiene mirror). The neo-crm reference repo re-checked per the
standing instruction: unchanged since the session-48..56 checks — its
latest round is still its session-217 (HEAD `b3d0fbe`, `git fetch` zero
new commits); no new lessons (the tenth consecutive no-change check).
The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout — the walk probes as JS
files consumed via `eval --stdin` with absolute capture paths (the
session-56 lesson).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) — every
load-bearing finding hand-verified in source by the lead before
adjudication, and the one behavioral claim reproduced end-to-end with
the lead's own probes before it was accepted. **AUDIT-1: 0C/0H/0M/2L/0I ·
AUDIT-2: 0C/0H/0M/1L/5I · AUDIT-3: 0C/0H/0M/0L/3I** — combined
**0 Critical / 0 High / 0 Medium / 3 Low / 8 Info**. The session-56 diff
itself verified correct on all three lanes at its shipped boundaries
(AUDIT-3 re-derived every count from disk and declared the five-way
lockstep clean at 725/40/70/9/16/795, the plans map 1:1 with the 56 plan
files, the ten provenance sites at 1..56 — lag 1, the designed
owner-narration window; AUDIT-2 verified all seven Tailwind v4
mitigations present, exact, and test-pinned, the complete mobile-menu
mechanic set, and the React 19 discipline — 0C/0H/0M on the whole lane;
AUDIT-1 re-verified the db seam, the envelope discipline on all 13
handlers, and the session-56 S56-1 collision-class sentence accurate
against live probes).

**The decisive hand-verifications (the lead's own probes in source):**

- **S57-1 (AUDIT-1 F1, LOW — reproduced end-to-end by the lead before
  acceptance)** — the S56-3 docblock's final clause claims the
  unclosed-quote divergence's "raw-relative fallback re-anchors
  correctly through the module anchor." That is FALSE for the exact
  divergence shape the note itself defines (an unclosed quote on the
  DATABASE_URL line + a later quoted value). The lead's live probes on
  bun 1.3.14 (four shapes, isolated temp dirs, ambient env unset):
  a single-line unclosed quote leaves BOTH parsers agreeing (the
  leading `"` kept — the accurate half of the note); a later
  UNCLOSED-quoted line does NOT span (bun keeps each line's own
  leading quote); a later mid-line-quoted line does NOT span; a later
  CLOSED quoted value DOES span — bun's DATABASE_URL becomes
  `file:../db/custom.db\nOTHER="quoted value` (the scan runs to the
  closing quote that ENDS its line, consuming intermediate quotes and
  the newline). The seam's line-based parse of the same file keeps
  `"file:../db/custom.db` (leading quote — NOT a relative file: URL),
  so `effectiveDatabaseUrl`'s signature arm is skipped and the
  spanned value rides the tail: `resolveDatabaseUrl` re-anchors it
  through the module anchor into
  `<repo>/db/custom.db\nOTHER="quoted value` — a JUNK-NAMED file, not
  the clean repo db. The engine ACCEPTS the URL (live-probed with the
  repo's own @prisma/client 6.19.3 this round: the 0-byte
  junk-named file is created under `<repo>/db/`, `SELECT 1` answers
  `[{"1":1}]`, the first `User` query throws P2021) — the S47-1
  artifact genus exactly (a healthy 200 against a table-less empty
  DB). The defect is the doc-truth regression the comment-only round
  introduced: the S53-6 register's own text honestly called this
  "REGISTERED, not cured"; the S56-3 clause re-framed it as a correct
  recovery. A maintainer reading the docblock would believe the
  doubly-pathological typo is handled. The behavior itself stays
  uncured BY DESIGN (the S53-6 posture — the input is an operator
  typo in a doubly-pathological shape, not a reachable runtime input;
  intent and derivation are indistinguishable at the seam, and a
  newline-stripping "cure" would silently mask OTHER genuinely
  malformed shapes). Cure: re-spell the clause to the truth + pin the
  two faces (the parse divergence fixtures + the resolve junk-tail
  face) so the claim is executable and can never re-drift silently.
- **S57-2 (AUDIT-1 F2 + AUDIT-2 F1 — the same one-word precision gap
  found independently by two lanes, LOW)** — the reveal.tsx S56-2
  re-spell says a call site that changes **either** `direction` or
  `delay` after mount "re-applies the transform offset." Accurate for
  `direction` (the style diff rewrites the changed `transform` key
  while the settled opacity survives — the substance of the S56-2
  re-spell is verified correct); over-broad for `delay`: a
  delay-only change rewrites just `transitionDelay` (the `transform`
  key's value is unchanged, so react-dom's style diffing skips it —
  no offset re-application, no visible drift on that face). Cure:
  scope the sentence to its face (a one-word comment edit in the
  S54-3/S56-2 family).
- **S57-3 (AUDIT-2 F2, register)** — error toasts are `role="alert"`
  cards inside the viewport's own `aria-live="polite"` region:
  ancestor live regions observe descendant mutations, so some AT
  pairs may announce an error twice. The S19-8 comment documents this
  as the deliberate sonner/Radix pattern (F11-17 made errors
  assertive); pinned by tests/toast-anatomy.test.ts. REGISTERED with
  the reason: documented design, pinned; if AT testing ever observes
  doubling, drop the viewport's `aria-live` and let the per-card roles
  own announcements.
- **S57-4 (AUDIT-2 F3, register)** — reveal's IntersectionObserver
  `threshold: 0.15` can never fire for an element taller than
  ~6.67× the viewport (the ratio never reaches 0.15) — its content
  would stay at opacity 0. Unreachable today (every live call site
  is a small block — headers, cards, benefit rows — and the
  reduced-motion/no-IO arms settle immediately). REGISTERED with the
  reason: a latent trap only a future full-page-tall Reveal wrapper
  could trip; a `rootMargin` note joins the contract comment if that
  ever happens.
- **S57-5 (AUDIT-2 F4, register)** — the mobile menu's `open` state
  survives an md breakpoint cross (open at mobile, widen to desktop,
  narrow again — the panel reappears open). The S26-3 comment already
  documents this as the deliberate parity posture (only the
  dark-bar visual consequence was cured). REGISTERED (documented
  posture, cosmetic resize/rotation face).
- **S57-6 (AUDIT-2 F5, register)** — the login-card `onCodeDigit`
  keystroke/paste heuristic: a digit typed with the caret placed
  BEFORE an existing digit inverts the `startsWith(current)` test
  and rides the paste-distribution path (the old digit spills into
  the next box). Obscure, recoverable by normal typing; the arm's
  own comment frames it as a heuristic. REGISTERED (a
  `selectionStart` check would disambiguate if ever wanted).
- **S57-7 (AUDIT-2 F6, register)** — the canvas effects
  (iridescence, particle-text) size their drawing buffers on mount
  and window `resize` only — a container-size change that fires no
  window resize (a late layout shift growing the hero) stretches
  the CSS box while the buffer keeps the old resolution. The hero is
  `min-h-screen` (viewport changes — the dominant case — covered).
  REGISTERED (a ResizeObserver is the documented lift if it ever
  matters).
- **S57-8 (AUDIT-3 F1/F2/F3, registers)** — the lockfile on disk is
  `bun.lock` (bun ≥1.2's text lockfile; packageManager pins
  bun@1.3.14) — the repo consistently references the text form
  (next.config excludes, smoke leg-16 mirror); no site anywhere
  spells `bun.lockb` — a no-finding recorded for the audit brief's
  terminology only. `docs/session_57.md` exists on disk while the
  live-tense sites hold 1..56 — the designed lag-1 owner-narration
  window (the S34-5 invariant sanctions bound ∈ {diskMax,
  diskMax−1}); this round's ship re-anchors the ten sites to 1..57
  (lag 0). The vitest `isolate: false` hint (~3.4s on a 5.65s suite)
  — cosmetic; REGISTERED, leave as-is unless suite growth makes it
  matter.
- **S57-9 (the AGENTS.md periodic duty, INFO)** — `bun audit` reports
  the SAME 9 advisories as the session-55/56 records: minimatch
  (moderate, the eslint chain), deepmerge-ts (high, prisma CLI ›
  @prisma/config), the vite 8.3.0–8.3.2 family incl. three
  launch-editor advisories (vitest › @vitest/mocker › vite),
  source-map-js (high, the postcss chain — reached via next and
  @tailwindcss/postcss). Lead triage re-verified: NONE ride the
  runtime request path (all dev-toolchain/build-time; the runtime
  dependency diet — EIGHT packages — unaffected). Recorded here per
  the duty's own form; no runtime action.

## The parity walk (walk #30 — the thirtieth consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home` (the documented path). The hamburger `md:hidden p-2
text-slate-300` base with cursor pointer, transparent background, block
display, 8px padding — and NO aria family (the reference still ships
none; ours the documented superset). The panel inner `px-6 py-4
space-y-3` byte-identical (16px/24px padding, block, maxHeight none,
transparent background); linkTexts identical (Home, Tool, Pricing,
Contact, Upgrade to Pro – $19); Home teal rgb(45,212,191) 14px/500
block; the siblings rgb(203,213,225) 14px/500 block; the pill
rgb(15,23,42) 14px/600 block (9999px radius — the v3-era spelling).
Escape via a REAL key press leaves the reference's panel open. The
outside-tap face (a genuine non-nav H1 tap) leaves it open. Route-change
close verified at /Pricing — the reference UNMOUNTS the panel
(panelCount 0). Desktop census: 6 VISIBLE links IDENTICAL; the brand
wordmark gradient byte-identical (linear-gradient(to right,
rgb(45,212,191), rgb(251,191,36)), 18px/700, background-clip text). The
five-route head census identical (titles + descriptions + canonicals,
the per-route prefix family, the single shared ogImage). Sitemap 4 URLs
(weekly, 1.0/0.8/0.8/0.8) + robots Allow-all + Sitemap line — identical
modulo origin. The generator probe: the reference's generator DEAD (no
copy button, no generation lands, no quota keys, the generate button
re-enabled with nothing rendered — the documented 402 face). The login
round-trip: R settled /Home.

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): the login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner 16px/24px, block,
maxHeight none, transparent bg; linkTexts + every link style identical;
the pill 33554432px radius — v4's infinity calc rendering the identical
capsule the reference's 9999px renders, the documented v3/v4
computed-value equivalence). The hamburger base identical (`md:hidden
p-2 text-slate-300` + our focus-ring/aria superset: expanded
Open-menu→true, controls mobile-menu). Escape closes OUR menu with
focus returned to the toggle (panel display none, hidden attr present,
aria false — the documented superset). The outside-tap face leaves it
open (parity). Route-change close at /Pricing: ours hides in-DOM
(panelCount 1, display none, hidden attr, aria false — the S26-1
design; the reference unmounts — the documented R-unmount/L-hide
divergence). Desktop census: 6 VISIBLE links IDENTICAL, CLONE total 11
= 6 visible + 5 hidden panel anchors; the brand gradient
byte-identical. The five-route head census identical modulo origin.
Sitemap 4 URLs + robots identical modulo origin. The generator LIVE: a
7-hashtag post + the Copy button, quota 0→1 (the D-1 documented
superset). **ALL CLONE FACES MATCH — no clone-side drift, no NEW
reference-side drift.**

## The cures (TDD — the two pins first, RED→GREEN at the planted defect)

- **S57-1a — the two behavioral pins** (tests/db-path.test.ts):
  1. parseEnvFile keeps the leading quote on an unclosed single-line
     quote, and parses the cross-line shape line-by-line (bun spans,
     this parser cannot — the divergence fixtures, live-probed on
     1.3.14: single-line unclosed → both keep the leading `"`; later
     unclosed-quoted / mid-line-quoted lines → bun does NOT span;
     later CLOSED quoted value → bun's span consumes the newline +
     intermediate quote and terminates at the line-end closing
     quote).
  2. resolveDatabaseUrl on bun's SPANNED value re-anchors through
     the module anchor with the junk tail preserved — it lands on
     `<repo>/db/custom.db\nOTHER="quoted value`, NEVER the clean
     custom.db (the S47-1 genus face the docblock must tell the
     truth about).
  Mutation battery (the doctrine — every new pin ships with a
  planted-defect proof): for pin 1, plant the "strip the leading
  quote when unclosed" defect in parseEnvFile → pin 1 REDs; restore.
  For pin 2, plant the "truncate the ref at the first newline"
  defect (the plausible cure that would re-anchor to the clean path)
  in resolveDatabaseUrl → pin 2 REDs; restore. Each pin owns exactly
  one face (the parse face; the resolve face — no co-pinning).
- **S57-1b — the docblock re-spell** (src/lib/db-path.ts, the S56-3
  parenthetical): keep the single-line agreement face; re-spell the
  span mechanism (bun's scan runs to the closing quote that ENDS its
  line — the later line must carry a CLOSED quoted value; later
  unclosed-quoted or mid-line-quoted lines do not span); replace the
  false "re-anchors correctly" clause with the truth (the spanned
  value re-anchors through the module anchor into the junk-named
  `<repo>/db/custom.db\nOTHER="quoted value` file — the engine
  ACCEPTS it, live-probed end-to-end this round: a 0-byte junk file
  is created, SELECT 1 answers, the first User query P2021s — the
  S47-1 genus; the S53-6 REGISTERED-not-cured posture stands: fix
  the .env).
- **S57-2 — reveal.tsx's S56-2 sentence re-scope**: "a call site that
  changes `direction` after mount re-applies the transform offset (a
  delay-only change rewrites the transition delay alone — no offset
  re-application); both stay mount-time constants regardless."
- **S57-3..S57-8** — the registers recorded above, carried into the
  session log's accepted/observed register.
- **S57-9** — the bun-audit triage recorded above (this plan's own
  hand-verification section — the AGENTS duty's form).

## The count re-anchor (the census's own guards own the truth)

UNIT 725 → 727 (+2 — the two S57-1a pins), SUITES 40 unchanged, E2E 70
unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged, BADGE 795 → 797.
The ten provenance sites re-anchored to 1..57 — lag 0 at ship
(session_57.md exists on disk as the owner's narration; this round's
formal log replaces its content). SKILL v1.52.0 → v1.53.0. PAD §12:
db-path.ts's row updates in the same commit (the re-spelled docblock
changes the line count); reveal.tsx and tests/db-path.test.ts are not
§12 files.

## Docs lockstep at ship

README (the badge 797, the session-57 row on the continuous table, the
gate footer re-spell to the session-57 ship, the testing table 727);
AGENTS (the plans map's fifty-seventh round, the 727 in the testing
conventions); CLAUDE (the 727 line); PAD (§8.1's table + the carry line,
§12's db-path.ts row); SKILL v1.52.0 → v1.53.0 (frontmatter,
project_state, §0.5 1..57, Appendix A's session-57 row, Appendix B's
header); the docs-counts constants (UNIT/BADGE) + the census ladder's
s57 entry; the ten provenance sites at 1..57; worklog Task 57;
docs/session_57.md (the formal log replacing the owner's narration);
this plan's post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results. Conventional Commit to
`main` only, push via the SSH wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
121/122 on the dev server (the owner-instructed posture, the
session-29..56 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified, absolute capture paths (the
session-56 lesson — agent-browser resolves relative paths against the
daemon's cwd).

## The post-execution record (session-57 ship)

Executed as planned, with the deviations the record owes the truth:

- **S57-1a landed first (TDD)** — the two pins born GREEN with BOTH
  batteries on record: the quote-strip plant (parseEnvFile strips
  the leading quote when unclosed) REDed exactly the fixtures pin;
  the newline-truncate plant (resolveDatabaseUrl cuts the ref at the
  first newline — the plausible "cure" that would re-anchor to the
  clean path) REDed exactly the resolve pin (the fixtures pin stayed
  green through the second plant — one pin per face confirmed).
  Both restored, 49/49 in the db-path suite, the source
  byte-identical through the round except the designed docblock
  re-spell.
- **S57-1b/S57-2 landed** as specified (the docblock re-spell with
  the refined span model + the junk-DB truth + the
  REGISTERED-not-cured posture; the reveal either-word re-scope).
  PAD §12's db-path row re-anchored 492 → 509 in the same commit.
- **The lead-first reproduction discipline paid off**: the AUDIT-1
  subagent's end-to-end probe initially disagreed with the lead's
  first probe (the ambient-shell shape masked bun's .env loading —
  bun does not override a pre-set process env var). The four-shape
  census (isolated temp dirs, ambient env unset) settled the
  mechanism — ONLY the later-CLOSED-quoted-value shape spans — and
  the S2/S4 agreement faces are now fixture-pinned so the model
  cannot silently re-drift. The subagent's engine-acceptance claim
  (SELECT 1 / P2021 / the 0-byte junk file) was re-verified by the
  lead's own probes before acceptance (with the junk file cleaned
  up after each probe).
- **The designed count-lag faces fired and cured at the lockstep**:
  11 census RED arms at the count re-anchor (the badge, the README
  architecture/testing/footer sites, AGENTS, CLAUDE, the PAD table,
  the SKILL frontmatter/Appendix-B/checklist) + the PAD §12
  inventory row on the db-path drift + the plans-map tail-currency
  on the 57th plan file — all GREEN at the lockstep (the census
  driving the docs, its own doctrine).
- **The environment deviation this round**: the agent-browser daemon
  persisted between Bash calls (the first round since the reaper
  pattern appeared), so the walk ran in discrete probe steps
  instead of single persistent sessions — the session-56 JS-file
  `eval --stdin` + absolute-path discipline held throughout.
- Counts at ship: UNIT 727 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 797 — the ten provenance sites at 1..57 (lag 0);
  SKILL v1.53.0; captures 121/122 on the dev server PIL-verified;
  the full gate re-run green on the final tree; push to main via the
  SSH wrapper runbook.
