# Session-60 Plan — The Boot-Gate Control-Char Attribution Split + The Footer-Emoji Annotation + The Comment-Truth Batch (2026-11-15)

The round opened on the shipped tree (`a037906` = session-59's `2ecb34c` +
the owner's narration commit carrying `docs/session_60.md` as the round-60
working narration; this formal plan ships alongside the round). The core
docs re-read and re-verified at the session-59 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.55.0 — every lockstep site confirmed on disk), then
the session-59 set (the formal `docs/session_59.md` log, the session-59
plan's post-execution record, worklog Task 59, the owner's narration),
and the S59 cures verified in source (the five S59-1a pins at
tests/boot-env.test.ts:504-578; the arm + the leaf at boot-env.ts /
env-file.ts; the whitespace batch, whitespace-only per the session-59
record). This round is session 60, the standing instruction on the
shipped tree.

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 ·
unit 735/735, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs ·
census MATCH — zero drift from the session-59 ship record. The standing
asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root — created from the committed `.env.example`, census MATCH;
`.env.example` committed and code-verified at every comment claim; the
vitest + playwright suites in place and current (735/70 green this
round); the sitemap/robots/manifest/OG family verified live against the
reference in this round's walk #33; `skills/` excluded from every gate —
the tsconfig/eslint/vitest configs + the smoke leg-16 hygiene mirror).
The neo-crm reference repo re-checked per the standing instruction:
unchanged (HEAD `b3d0fbe` — the thirteenth consecutive no-change check).
The web-application skill + the skills catalog internalized; the tdd and
agent-browser doctrine (computed styles as ground truth, never eyeballs)
applied throughout — the walk probes as JS files consumed via
`agent-browser eval --stdin`, the session-56/57 lesson.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/1L/4I · AUDIT-2
(components/pages/effects): 0C/0H/0M/1L/4I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/2L/6I — combined **0 Critical / 0
High / 0 Medium / 4 Low / 14 Informational**. AUDIT-1 re-verified the
full standing-contract set on its lane (the envelope discipline on all
13 handlers, the db seam monopoly, the status discipline with Retry-After
on every 429, the transient classifier, the limiter, the auth family,
the ten-contract ledger 10/10). AUDIT-2 re-verified all seven Tailwind
v4 mitigations, the complete mobile-menu mechanic set, the React 19
pattern law, and the WCAG floor (7/7 contracts). AUDIT-3 re-derived every
count from disk (735/40/70/9/16/805, 59 plan files, the ten provenance
sites at 1..59, PAD §12 21/21 rows — all MATCH).

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 L1, verified in source AND probed live** — the S58-1
  warning's predicate (`/\p{Cc}/u || startsWith('"') || startsWith("'")`,
  boot-env.ts:229-232) fires on quote-free control-char values, but both
  branch messages headline "carries an unclosed quote residue" and
  prescribe "Fix the .env: close the quote" — a fix that does nothing
  for a stray tab. The round's live probe (bootEnvCheck with a
  tab-bearing `file:` value and a tab-bearing non-`file:` value, no
  quote anywhere): both answered the "unclosed quote" headline with the
  quote-specific fix. Sharper still: the `file:` branch is reachable
  ONLY by control-char values (a leading-quote value can never start
  with `file:`), so its "unclosed quote" headline is false for EVERY
  value that reaches it — the true part of its message is the
  parenthetical ("a control character rides the value"); the headline
  and the fix sentence are the misattribution. The newline face (the
  S57-1 span genus) is the one control-char shape whose unclosed-quote
  story IS true (an unclosed quote in .env spanning lines is the usual
  cause) — the split must keep its story while the tab face gets its
  own.
- **AUDIT-1 L1's deeper tail, probed live this round** — the FILE-FACE
  arm (`databaseUrlFileResidueWarning`, boot-env.ts:458-486) carries the
  same misattribution AND a falsified mechanism claim: its comment
  (479-484) says "the only residue the line-based parse can carry is the
  leading quote (a span needs an embedded newline, which a line-based
  parse cannot produce), so the value is never file:-prefixed". The
  round's parseEnvFile census falsifies the first clause: an unquoted
  tab-bearing .env line (`DATABASE_URL=file:../db/custom.db<TAB>junk`)
  parses to the file:-prefixed, tab-bearing value — so the file-face
  CAN carry a control char, and THAT shape IS file:-prefixed. The seam
  probe (resolveDatabaseUrl on the tab-bearing value): re-anchored into
  the junk-named file `file:/home/z/my-project/viralpost-ai/db/custom.db\tjunk`
  — the junk-file re-anchor mechanism (the S57-1 genus, live-verified
  this round for the tab), NOT the raw pass-through +
  PrismaClientInitializationError the message claims for every face.
  The leading-quote face keeps the raw pass-through mechanism (its
  value is never file:-prefixed — that clause stays true); the
  control-char face needs the junk-file mechanism.
- **AUDIT-2 L-1, verified in source (cat -A)** — footer.tsx:108 ships
  `Made with ❤️ for creators` as a bare text character (UTF-8
  `M-bM-^]M-$M-oM-8M-^O`), no `aria-hidden` span — the only unannotated
  decorative glyph in the tree. No test pins the footer text (rg
  `Made with` across tests/ — zero hits), so the annotation is a
  pin-free one-line edit.
- **AUDIT-3 F-1/F-2, verified with wc -l + rg** — worklog.md:6478 (the
  Task 59 VERIFIED line) carries "§12's db-path 518" while the PAD row
  shipped at 458 (`wc -l src/lib/db-path.ts` = 458; the same entry's
  COUNTS paragraph narrates the full 512 → 518 → 458 chain); and
  docs/session_59.md:255 narrates "re-anchored 512 → 518" where the
  shipped chain is 512 → 518 → 458 (the S59-1b leaf extraction). Both
  are record-internal staleness — the live PAD row and the §12 census
  are correct; the two narration sites disagree with their own round's
  records.
- **AUDIT-1 I4 probed live this round** — the escape face:
  `KEY="a\"b"` parses to `a\` under parseEnvFile (the scan cuts at the
  first closing quote, keeping the backslash); @next/env's
  dotenv-style unescaping would yield `a"b` — a divergence face the
  module's header census never declared. No live-probed DATABASE_URL
  shape ever carries an escape; harmless for resolution (a missed
  bun-signature falls to the tail, which re-anchors relative values to
  the same file). One census line in the header declares the face
  out-of-scope (the module's own "a parser that disagrees" doctrine).
- **AUDIT-1 I2/I3, AUDIT-2 I-1..I-4, AUDIT-3's six registers
  adjudicated as registers** (below) — the `bun run start` tee pipe
  exit-code mask (dash has no pipefail; the gates boot the artifact
  directly, operators see the crash text — registered, not cured);
  the PWD-less process-manager boundary (the documented S51-1 register,
  confirmed live in-source); the file-face warning's dir-naming
  (doubly-pathological shape — the JSON.stringify'd value
  disambiguates); the historical Tailwind validation report's
  superseded gradient form (the frozen historical-record layer, the
  live mitigation is test-pinned); the sanctioned sub-AA contrast
  register (the reference's own palette); the aria-controls desktop
  posture (the S23-1 documented superset); the nbsp spacer (the
  reference's own live-extracted element); the e2e 69+1 composition;
  the manifest 192x192 same-src parity; the 13th convenience script;
  the framework-emitted 404 noindex; the lag-1 narration transient
  (re-anchored at THIS ship). The bun-audit triage (the AGENTS.md
  periodic duty): the SAME 9 advisories as the session-55..59 records
  (3 high / 5 moderate / 1 low) — ALL dev-toolchain/build-time, NONE on
  the runtime request path. No action.

## The parity walk (walk #33 — the thirty-third consecutive clean walk)

REF leg (live, logged in with the demo credentials): login settled at
`/Home`. The hamburger `md:hidden p-2 text-slate-300` base (cursor
pointer, block, 8px padding, transparent bg — NO aria family, all three
attributes null). The panel inner `px-6 py-4 space-y-3` byte-identical
(16px/24px padding, block, maxHeight none, transparent background — the
reference's own `bg-slate-900/98` dead class computing transparent, the
documented face); linkTexts identical (Home, Tool, Pricing, Contact,
Upgrade to Pro – $19); Home teal rgb(45,212,191) 14px/500 block; the
siblings rgb(203,213,225) 14px/500 block; the pill rgb(15,23,42)
14px/600 block (9999px radius — the v3-era spelling). Escape via a REAL
key press leaves the reference's panel open. The outside-tap face (a
genuine non-nav H1 tap) leaves it open. Route-change at /Pricing — the
reference UNMOUNTS the panel (panelDivCount 0), title "Pricing |
ViralPost AI". Desktop census: 6 VISIBLE links IDENTICAL (ViralPost AI,
Home, Tool, Pricing, Contact, Upgrade to Pro); the brand wordmark
gradient byte-identical (linear-gradient(to right, rgb(45,212,191),
rgb(251,191,36)), 18px/700, background-clip text). The five-route head
census identical (the per-route prefix family `<Page> | ViralPost AI`,
the bare `/` and `/login` titles, the 170-char plain description on `/`
+ the per-route `<Page> on ViralPost AI.` family, the canonicals, the
single shared ogImage, summary_large_image). Sitemap exactly 4 URLs
(weekly, 1.0/0.8/0.8/0.8) + robots Allow-all + Sitemap line. The
generator probe: the reference's generator DEAD (no generation lands, no
copy button, no quota keys, the generate button re-enabled with nothing
rendered — the documented 402 face).

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): the login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner 16px/24px, block,
maxHeight none, transparent bg; linkTexts + every link style identical;
the pill 3.35544e+07px radius — v4's infinity calc rendering the
identical capsule the reference's 9999px renders, the documented v3/v4
computed-value equivalence). The hamburger base identical
(`md:hidden p-2 text-slate-300` + our focus-ring superset) with the aria
superset ACTIVE and live-verified (aria-controls mobile-menu; expanded
false→true on the open panel; the Open/Close-menu relabel). Escape
closes OUR menu with focus returned to the toggle (panel display none,
hidden attr present, aria false, focusOnToggle true — the documented
superset). The outside-tap face leaves it open (parity). Route-change
close at /Pricing: ours hides in-DOM (panelCount 1, display none, hidden
attr, aria false — the S26-1 design; the documented R-unmount/L-hide
divergence), title "Pricing | ViralPost AI". Desktop census: 6 VISIBLE
links IDENTICAL; the brand gradient byte-identical. The five-route head
census identical modulo origin. Sitemap 4 URLs + robots identical
modulo origin. The generator LIVE: a 7-hashtag post (in the 5-8 family)
+ the Copy button, quota 0→1 (the `viralpost_generations` counter key
`{"date":"…","count":1}` — the D-1 documented superset). **ALL CLONE
FACES MATCH — no clone-side drift, no NEW reference-side drift. Mobile
nav verified working as expected on both sides; all seven Tailwind v4
mitigations verified present and test-pinned this round (the audit's
own lane).** Captures 127/128 on the dev server PIL-verified (99.9%/
100.0% non-white, teal present).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S60-1a — the three attribution pins** (tests/boot-env.test.ts, a
  new describe for the session-60 split):
  - Pin 1, the PROCESS-ENV tab face — a tab-bearing `file:` value
    (no quote anywhere) warns with the CONTROL-CHARACTER attribution:
    the warning contains "control character", does NOT contain "unclosed
    quote"; the junk-file mechanism sentence stays (contains
    "junk-named file" + "P2021" — the round's seam probe re-anchored the
    tab-bearing value into the junk-named file); the fix says "remove
    the control character", NOT "close the quote". The NEWLINE face
    keeps its own story in the same pin: the span fixture's warning
    still contains "unclosed quote" AND "close the quote" (the
    unclosed-quote-spanning-lines cause is true for the newline face) —
    the discriminator pair.
  - Pin 2, the PROCESS-ENV non-file: tab face — a tab-bearing
    non-`file:` value (a postgres URL with a tab): "control character"
    attribution, NOT "unclosed quote"; the raw pass-through mechanism
    stays (contains "passes it through raw" +
    PrismaClientInitializationError); the fix says "remove the control
    character", NOT "close the quote".
  - Pin 3, the FILE-FACE tab arm — `databaseUrlFileResidueWarning` on a
    tab-bearing .env file value: "control character" attribution, NOT
    "unclosed quote"; the JUNK-FILE re-anchor mechanism (contains
    "junk-named file" + "P2021" — the round's parseEnvFile + seam
    probes), NOT the raw pass-through claim ("passes it through raw"
    must be absent for this face); the fix "remove the control
    character", NOT "close the quote". The leading-quote file-face pin
    (the existing S59-1 pin) stays green untouched — its face's message
    is unchanged.
  - The batteries (each plant REDs exactly its own pin): the
    attribution-revert plant (every control-char face gets the quote
    headline again) REDs pins 1+2+3's attribution arms; the
    fix-sentence plant (every face gets "close the quote") REDs the
    three pins' fix arms; the mechanism-revert plant (the file-face
    control-char message gets the raw pass-through claim again) REDs
    exactly pin 3's mechanism arm.
- **S60-1b — the message split in both arms** (src/lib/boot-env.ts):
  - `bootEnvCheck`'s S58-1 arm: compute the trigger face (leading
    quote / newline / other control char) and build the message per
    (branch × face). The `file:` branch (control-char-only reach):
    newline → the current message verbatim (the unclosed-quote
    spanning-lines story is true; "close the quote" fix); other
    control char → "carries a control character" attribution, the
    junk-file mechanism verbatim (true for every file:-prefixed
    residue), "remove the control character" fix. The non-`file:`
    branch: leading quote → the current message verbatim; other
    control char → "carries a control character" attribution, the raw
    pass-through mechanism verbatim, "remove the control character"
    fix. The existing span pin (:455) and leading-quote pins (:468,
    :487) stay green untouched — their faces' messages are unchanged.
  - `databaseUrlFileResidueWarning`: the same trigger-face split —
    leading quote → the current message verbatim (raw pass-through +
    PrismaClientInitializationError + "close the quote", true for this
    face); other control char → "carries a control character"
    attribution + the junk-file re-anchor mechanism (the round's
    probes: the tab-bearing unquoted line parses file:-prefixed and the
    seam re-anchors it into the junk-named file) + "remove the control
    character" fix. The falsified comment block (479-484) re-spells to
    the per-face truth: the line-based parse carries the leading quote
    AND a control char on an unquoted line; the leading-quote face is
    never file:-prefixed; the control-char face CAN be (the tab probe).
- **S60-2 — the footer-emoji annotation**
  (src/components/marketing/footer.tsx:108): the bare `❤️` wraps in
  `<span aria-hidden="true">❤️</span>` — zero visual change (text node
  content preserved, the reference's own copy), the a11y best-practice
  superset (screen readers stop announcing the decorative glyph
  mid-sentence). No pins to update (the footer text is unpinned; the
  a11y e2e battery is structural and unaffected).
- **S60-3 — the comment-truth batch**:
  - worklog.md:6478: "§12's db-path 518" → "§12's db-path 458" (the
    shipped value; the entry's own COUNTS paragraph already narrates
    the full 512 → 518 → 458 chain).
  - docs/session_59.md:255: "re-anchored 512 → 518" → "re-anchored
    512 → 518 → 458 (the S59-1b leaf extraction)" — the shipped chain.
  - src/lib/env-file.ts: one census line in the header declaring the
    backslash-escape face out-of-scope (the round's probe:
    `KEY="a\"b"` parses to `a\` under the line-based scan exactly like
    bun's loader; @next/env's dotenv-style unescaping would yield
    `a"b` — a divergence on a face no live-probed DATABASE_URL shape
    ever carries; harmless for resolution).
- **S60-4..S60-8 — the registers** (carried in the session log): the
  `bun run start` tee exit-code mask (dash has no pipefail — a set -o
  pipefail would break the script under /bin/sh; the gates boot the
  artifact directly, operators see the crash text live); the
  PWD-less process-manager boundary (the S51-1 register, inherited by
  the S59-1b wrapper); the file-face dir-naming (the
  doubly-pathological shape; the JSON.stringify'd value
  disambiguates); the historical Tailwind report's superseded gradient
  form (frozen record layer — the live mitigation is test-pinned);
  the parseEnvFile escape face (now declared in the header, S60-3);
  the e2e 69+1 / manifest 192x192 / 13th-script / 404-noindex / lag-1
  registers re-confirmed. The bun-audit triage: the SAME 9 advisories
  as the session-55..59 records — ALL dev-toolchain, NONE on the
  runtime request path. No action.

## The count re-anchor and the docs lockstep

UNIT 735 → 738 (+3 — the three S60-1a pins), SUITES 40 held, E2E 70
held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 805 → 808. NO PAD §12 row
changes (boot-env.ts, env-file.ts, footer.tsx are all non-§12 files —
re-verified this round). The designed count-lag faces fire at the
lockstep exactly as the doctrine describes (the UNIT-constant reality
census; the plans-map tail-currency on the 60th plan file). The ten
provenance sites re-anchor to 1..60 — lag 0 at ship (docs/session_60.md
exists on disk as the owner's narration; the formal log replaces its
content). SKILL v1.55.0 → v1.56.0.

Docs lockstep at ship: README (the badge 808, the session-60 row on the
continuous table, the gate footer re-spell to the session-60 ship, the
testing-table 738 sites); AGENTS (the plans map's sixtieth round, the
738 in the testing conventions); CLAUDE (the 738 line); PAD (§8.1's
table + the carry line at 738/70/16); SKILL v1.55.0 → v1.56.0
(frontmatter, project_state, §0.5 1..60, Appendix A's session-60 row,
Appendix B's header); the docs-counts constants (UNIT 738, BADGE 808) +
the census ladder's s60 entry; the ten provenance sites at 1..60;
worklog Task 60; docs/session_60.md (the formal log replacing the
owner's narration); this plan's post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results (db/custom.db is
gitignored). Conventional Commit to `main` only, push via the SSH
wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
127/128 on the dev server (the owner-instructed posture, the
session-29..59 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified, absolute capture paths (the
session-56 lesson).

## The post-execution record (session-60 ship)

Executed as planned, with the deviations the record owes the truth:

- **S60-1a landed first (TDD)** — the pins born RED against the
  pre-split messages: all 3 RED at birth, the 63 existing tests in the
  file green. The batteries: the attribution-revert plant (the split
  undone — `newlineFace = controlFace` in bootEnvCheck, the non-file:
  branch condition widened to `quoteFace || controlFace`, the
  file-face guard widened the same way) REDs pins 1+2+3 (the
  documented co-pinning of this round); the fix-sentence plant (4 fix
  sites swapped to the quote fix) REDs the three pins' fix arms with
  the attribution headlines staying green; the mechanism-revert plant
  (the file-face file: branch claims the raw pass-through again) REDs
  exactly pin 3, 65 others green. All restored GREEN — 66/66.
- **The probe before the prose**: both cure messages name the
  junk-file re-anchor for the tab face because the round's live probes
  observed it (parseEnvFile on the unquoted tab-bearing line → the
  file:-prefixed tab-bearing value; resolveDatabaseUrl on that value →
  the junk-named file `file:<repo>/db/custom.db\tjunk`) — the
  mechanism sentences are evidence-backed, not reasoned.
- **The falsified S59-1 comment clause — the finding's severity tail
  AUDIT-1 filed as one Low carried a second falsified claim**: the
  file-face arm's comment said "the only residue the line-based parse
  can carry is the leading quote" (the tab probe falsified it) and the
  message claimed "the value is never file:-prefixed" (the tab-bearing
  value IS). Both cured in the same S60-1b touch — the comment
  re-spelled to the per-face truth, the mechanism split per branch.
- **No unintended RED fired at the lockstep** (the session-59
  design-tokens lesson): the new prose introduced no class-shaped
  compounds. The two designed count-lag faces (the UNIT-constant
  reality census 735 vs disk 738, the plans-map tail-currency on the
  60th plan file) fired and were cured at the lockstep.
- **The footer annotation is DOM-structural but parity-neutral**: the
  walk's computed-style faces are unaffected (the text content is
  preserved verbatim inside the span); the a11y e2e battery
  (structural axe) is unaffected — verified by the full gate's e2e
  70/70 on the final tree.
- Counts at ship: UNIT 738 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 808 — the ten provenance sites at 1..60 (lag 0);
  SKILL v1.56.0; captures 127/128 PIL-verified; the full gate re-run
  green on the exact ship tree; push to main via the SSH wrapper
  runbook.
