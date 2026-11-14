# Session-58 Plan — The Boot-Gate Unclosed-Quote-Residue Warning + The Whitespace Re-Indent + The Register Batch (2026-11-14)

The round opened on the shipped tree (`a214ebf` = session-57's `fc76b49`
+ the owner's narration commit carrying `docs/session_58.md` as the
round-58 working narration). The core docs re-read at the session-57
ship counts (UNIT 727 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE 16 /
BADGE 797; SKILL v1.53.0; provenance `docs/session_1..57.md`; PAD §12
db-path 509 — every site re-verified against disk), the session-57 set
re-read (the formal log, the plan's post-execution record, worklog Task
57, the owner's narration), and the S57 cures verified in source (the
two S57-1a pins at tests/db-path.test.ts:127/667; the S57-1b docblock
re-spell at db-path.ts:274-300; the S57-2 either-word at reveal.tsx:35).

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 ·
unit 727/727 (40 files) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH — zero drift from the session-57 ship record. The standing
asks re-verified (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root; `.env.example` committed at
provenance 1..57; the vitest + playwright suites current; the
sitemap/robots/manifest/OG family verified live in this round's walk;
`skills/` excluded from tsconfig/eslint/vitest). neo-crm re-checked per
the standing instruction: unchanged (HEAD `b3d0fbe`, eleventh
consecutive no-change check).

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/0M/0L/2I · AUDIT-2
(components/pages/effects): 0C/0H/0M/0L/2I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/2I — combined **0 Critical / 0
High / 0 Medium / 0 Low / 6 Informational**. AUDIT-1 re-verified the
session-57 comment-truth re-spell end-to-end (its own probes: the bun
span, the seam parse, `effectiveDatabaseUrl` end-to-end, the engine
accepting the junk-named URL, SELECT 1 / P2021 / the 0-byte file) and
the full standing-contract set (the db seam monopoly, the envelope
discipline on all 13 handlers, the status discipline, the env-name
family, the generator contract, force-dynamic 13/13). AUDIT-2
re-verified all seven Tailwind v4 mitigations (present, exact, and
test-pinned — including the shipped-build-CSS check that zero
`@media (hover: hover)` blocks survive) and the complete mobile-menu
mechanic set. AUDIT-3 re-derived every count from disk (727/40/70/9/16/
797, 57 plan files, the ten provenance sites at 1..57, PAD §12 21/21
rows — all MATCH).

The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):

- **AUDIT-1 I-1 verified in source**: boot-env.ts (527 lines) carries
  the shadow-env, exact-case, typo, off-vocab, unset-in-prod, and hops
  arms — NO arm detects the unclosed-quote residue. The S57-1 genus
  (the junk-named DB serving healthy-200/P2021) is the one standing
  genus with zero boot-level signal while every lesser hazard warns.
- **The decisive loader census (the round's own probes, both
  quote chars, ambient env unset)**: the SAME one-keystroke typo
  leaves DIFFERENT residues in the two sanctioned loaders — bun 1.3.14
  SPANS on the S3 shape (DATABASE_URL becomes
  `file:../db/custom.db\nOTHER="quoted value` — an embedded NEWLINE)
  and keeps the leading quote on the single-line-unclosed shape;
  @next/env (next dev via node / the standalone server.js) NEVER spans
  (the S3 shape keeps the LEADING QUOTE — `"file:../db/custom.db` —
  and OTHER parses clean; the single-line shape is dropped to
  undefined). The single-quote spellings mirror the double-quote faces
  exactly (bun spans/keeps, @next/env keeps/drops). Both residues are
  detectable in the AMBIENT env record — the pure bootEnvCheck seam's
  own input — with zero false positives on every documented shape
  (clean file URL, e2e override, `file::memory:`, absolute override,
  postgres URL: no control chars, no leading quote).
- **AUDIT-2 I-2 verified in source**: generator-card.tsx:233-314 — the
  else-branch's children sit at the OUTER indent (6 spaces) inside the
  8-space `<Reveal>` wrapper (lines 231/315), while the limit-branch
  twin nests correctly. Whitespace-only, zero behavior change, the
  substring pins are indentation-independent.
- **AUDIT-3 I-1/I-2 and AUDIT-2 I-1 adjudicated as registers** (below)
  — the vitest `--reporter=basic` incantation is retired upstream (no
  repo file references it); the react-dom peer is the documented
  framework-required posture; the toast double-announce face is
  already REGISTERED as S57-3 (the documented sonner/Radix pattern —
  act only if AT testing observes doubling).

## The parity walk (walk #31 — the thirty-first consecutive clean walk)

REF leg (live, logged in): login settled at `/Home`. The hamburger
`md:hidden p-2 text-slate-300` base (cursor pointer, block, 8px
padding, transparent bg — NO aria family). The panel inner
`px-6 py-4 space-y-3` byte-identical (16px/24px, block, maxHeight
none, transparent); linkTexts identical; Home teal rgb(45,212,191)
14px/500; siblings rgb(203,213,225) 14px/500; the pill rgb(15,23,42)
14px/600 9999px (the v3-era spelling). Escape via a REAL key press:
panel OPEN. Outside-tap (a genuine non-nav H1 tap): panel OPEN.
Route-change at /Pricing: the reference UNMOUNTS (panelDivCount 0).
Desktop census: 6 VISIBLE links identical; the brand wordmark gradient
byte-identical (linear-gradient(to right, rgb(45,212,191),
rgb(251,191,36)), 18px/700, clip text); the Upgrade pill's
amber-to-amber gradient with slate-900 ink. The five-route head census
identical (the per-route prefix family, canonicals, the single shared
ogImage). Sitemap exactly 4 URLs + robots Allow-all + Sitemap line.
The generator probe: DEAD (no generation lands, no copy button, no
quota keys, the generate button re-enabled — the documented 402 face).

CLONE leg (the dev server on :3000, quota cleared per the walk
protocol): login landed at `/` (the documented 308 deviation). The
panel byte-identical on every computed face (inner 16px/24px, block,
maxHeight none, transparent bg; linkTexts + every link style
identical; the pill 33554432px — v4's infinity calc rendering the
identical capsule). The hamburger base identical + our aria
superset active (aria-controls mobile-menu, expanded, the
Open/Close-menu relabel). Escape closes OUR menu with focus returned
to the toggle (panel display none, hidden attr, aria false — the
documented superset). Outside-tap: panel OPEN (parity). Route-change
at /Pricing: ours hides in-DOM (panelCount 1, display none, hidden
attr — the S26-1 design; the documented R-unmount/L-hide divergence).
Desktop census: 6 VISIBLE identical, CLONE total 11; the brand
gradient byte-identical. The five-route head census identical modulo
origin; sitemap 4 URLs + robots identical modulo origin. The
generator LIVE: a 6-hashtag post (in the 5-8 family) + the Copy
button, quota 0→1 (`viralpost_generations` `{"count":1}` — the
documented counter key). **ALL CLONE FACES MATCH — no clone-side
drift, no NEW reference-side drift. Mobile nav verified working as
expected on both sides; all seven Tailwind v4 mitigations verified
present and test-pinned (the audit's own lane).**

## The cures (TDD — the pins first, each with its planted-defect battery)

- **S58-1a — the two behavioral pins** (tests/boot-env.test.ts, a new
  describe): Pin A, the SPAN face — `bootEnvCheck` with the bun-census'd
  spanned DATABASE_URL (the embedded-newline residue, both quote-char
  spellings) returns the unclosed-quote warning; Pin B, the
  LEADING-QUOTE face — the @next/env-census'd kept-quote residue (both
  quote chars) warns, and the clean shapes stay SILENT (the clean
  `file:../db/custom.db`, the e2e `file:../db/e2e.db` override,
  `file::memory:`, and an absolute override — no warning). The
  batteries: the control-char plant (the predicate's control-char
  disjunct dropped) REDs exactly Pin A (Pin B green — its fixtures
  carry no control char); the leading-quote plant (the quote disjunct
  dropped) REDs exactly Pin B (Pin A green — its fixtures carry the
  newline). Both restored GREEN. Each pin owns exactly one face.
- **S58-1b — the bootEnvCheck arm + the docblock clause**
  (src/lib/boot-env.ts + src/lib/db-path.ts): the arm sits after the
  NEXT_PUBLIC_SITE_URL family — `DATABASE_URL` set, non-empty, and
  (a C0/DEL control char OR a leading `"`/`'`) warns in the `[boot]`
  vocabulary, in EVERY mode (the F10-11 doctrine: a malformed value is
  always wrong, dev included — the operator edits .env in dev). The
  message names the genus (the S57-1 span lineage), the junk-file
  consequence (a healthy boot against a table-less DB; the first User
  query P2021s), and the fix (close the quote on the DATABASE_URL
  line). The value prints JSON.stringify'd — the residue is malformed
  by definition, and the escaped one-line form (the newline visible as
  `\n`) is the diagnostic itself. The db-path.ts S57-1b docblock's
  REGISTERED clause extends: the genus is no longer SILENT — the boot
  gate names the residue BOTH loaders leave (bun's span embeds a
  newline; @next/env keeps the leading quote), session-58, S58-1. The
  S53-6 REGISTERED-not-cured posture itself STANDS (the server still
  boots and serves; the operator fixes the .env).
- **S58-2 — the whitespace re-indent**
  (src/components/marketing/generator-card.tsx:233-314): the
  else-branch's children re-indented one level to nest correctly
  inside the `<Reveal>` wrapper, matching the limit-branch twin.
  Whitespace-only — the line count stays 319 (PAD §12 unchanged), the
  substring pins are indentation-independent, zero behavior change.
- **S58-3..S58-6 — the registers** (carried in the session log):
  the vitest `--reporter=basic` retirement (the incantation fails on
  vitest 5 — no repo file references it; future audits use
  `bunx vitest run`), the react-dom peer note (the one runtime dep
  with no direct import — Next's own hard peer requirement; the
  dependency diet unaffected), the toast double-announce cross-ref
  (already REGISTERED as S57-3 — two audit lanes finding it twice
  confirms the register's accuracy), and the loader-divergence census
  itself (the S3-span residue differs by loader — bun embeds the
  newline, @next/env keeps the leading quote or drops the line; both
  quote chars mirror; now pinned at the boot seam).
- **S58-7 — the bun-audit triage** (the AGENTS.md periodic duty): the
  SAME 9 advisories as the session-55/56/57 records (minimatch
  moderate / the eslint chain; deepmerge-ts high / the prisma CLI; the
  vite 8.3.0–8.3.2 family incl. three launch-editor advisories / the
  vitest chain; source-map-js high / the postcss chain via next and
  @tailwindcss/postcss) — ALL dev-toolchain/build-time, NONE on the
  runtime request path (the runtime dependency diet — EIGHT packages —
  unaffected). No action.

## The count re-anchor (the census's own guards own the truth)

UNIT 727 → 729 (+2 — the two S58-1a pins), SUITES 40 unchanged, E2E 70
unchanged, E2E_SPECS 9 unchanged, SMOKE 16 unchanged, BADGE 797 → 799.
The ten provenance sites re-anchored to 1..58 — lag 0 at ship
(session_58.md exists on disk as the owner's narration; this round's
formal log replaces its content). SKILL v1.53.0 → v1.54.0. PAD §12:
db-path.ts's row re-anchors 509 → 512 (the docblock clause adds three
lines) with the session-58 clause appended to the row's purpose;
boot-env.ts is NOT a §12 file (verified this round); generator-card.tsx
stays 319 (whitespace-only). The designed count-lag faces fire at the
lockstep exactly as the doctrine describes (the census drives the
docs).

## Docs lockstep at ship

README (the badge 799, the session-58 row on the continuous table, the
gate footer re-spell to the session-58 ship, the testing table 729);
AGENTS (the plans map's fifty-eighth round, the 729 in the testing
conventions); CLAUDE (the 729 line); PAD (§8.1's table + the carry
line, §12's db-path.ts row); SKILL v1.53.0 → v1.54.0 (frontmatter,
project_state, §0.5 1..58, Appendix A's session-58 row, Appendix B's
header); the docs-counts constants (UNIT 729, BADGE 799) + the census
ladder's s58 entry; the ten provenance sites at 1..58; worklog Task
58; docs/session_58.md (the formal log replacing the owner's
narration); this plan's post-execution record.

## The tree check, commit, and push

The designed change set only — no stray files; `git status` clean of
.env/.db/.key/dev.log/server.log/test-results. Conventional Commit to
`main` only, push via the SSH wrapper runbook
(docs/how-to-git-push-using-ssh-wrapper_SKILL.md): the wrapper, the
dry-run (with `--remote git@github.com:nordeim/viralpost-ai.git`), the
real push, the remote verification, the key destruction. Captures
123/124 on the dev server (the owner-instructed posture, the
session-29..57 precedent): the mobile-menu open clean-walk at 390×844 +
the landing hero at 1280×800, PIL-verified, absolute capture paths (the
session-56 lesson).

## The post-execution record (session-58 ship)

Executed as planned, with the deviations the record owes the truth:

- **S58-1a landed first (TDD)** — the pins born RED (the arm did not
  exist — the designed red→green flow, unlike session-57's
  characterization pins), with all THREE batteries on record: the
  control-char plant (the predicate's `\p{Cc}` disjunct dropped) REDs
  exactly the span pin; the quote-disjunct plant REDs the
  leading-quote pin + the documented dev co-pin; the mode-gate plant
  (the plausible "cure" of gating the warning to production only)
  REDs exactly the dev pin. All restored GREEN — one pin per face,
  the one co-pinning documented in the pin's comment (the N12-2
  doctrine's own escape hatch).
- **The pins count is THREE, not the drafted TWO**: the dev-mode face
  earned its own pin during execution — without it the mode-gate
  plant would RED nothing (the other two pins ride the
  production-defaulted env builder). The count re-anchor follows the
  pins: the executed counts are UNIT 730 (+3) / BADGE 800,
  superseding the plan's drafted 729/799 — the census driving the
  docs, its own doctrine.
- **S58-1b/S58-2 landed** as specified (the bootEnvCheck arm in the
  `[boot]` family vocabulary, every mode, the value JSON.stringify'd —
  the escaped one-line form is the diagnostic itself; the db-path.ts
  REGISTERED clause extended — the genus is no longer SILENT, the
  S53-6 register stands: fix the .env; the generator-card
  re-indent — line-count-neutral at 319, the substring pins verified
  68/68, PAD §12's row untouched).
- **The loader-divergence census is the round's decisive probe**: the
  audit's suggested predicate (warn on the parsed .env line's
  unclosed opening quote) was refined by the lead's own probes into
  the ambient-record form (a C0/DEL control character OR a leading
  quote, both quote chars) — the @next/env face keeps the leading
  quote where bun's span carries none, and @next/env's single-line
  shape drops to undefined entirely (invisible to any
  file-parse-only warning family). The pure `bootEnvCheck(env)` arm
  catches BOTH loaders' residues without touching the filesystem —
  the injectable-exists pattern was not needed.
- **The designed count-lag faces fired and were cured at the
  lockstep**: 3 census RED arms (the PAD §12 inventory row on the
  db-path drift 509 → 512, the UNIT-constant reality census, the
  plans-map tail-currency on the 58th plan file) — all GREEN at the
  lockstep.
- Counts at ship: UNIT 730 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 800 — the ten provenance sites at 1..58 (lag 0);
  SKILL v1.54.0; captures 123/124 on the dev server PIL-verified
  (99.9%/99.7% non-white, the panel-open teal pixels confirmed); the
  full gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.
