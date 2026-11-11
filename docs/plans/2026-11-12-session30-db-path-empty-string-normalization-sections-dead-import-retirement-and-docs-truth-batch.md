# Session 30 — The db-Path Empty-String Normalization + The Sections Dead-Import Retirement + The Docs-Truth Batch (2026-11-12)

## Context

Session 29 pushed `04e96f3`; the owner added `250a1b4` (the session-29
execution log held as `docs/session_30.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs review
→ baseline gate → the comprehensive audit (three parallel subagents) → the
neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
641/641 (38 files) · e2e 63/63 (9 specs) · smoke 15/15 · census MATCH ·
`.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root
✓ · the vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`)
suites in place and current ✓ · the sitemap/robots/manifest/OG family
verified live against the reference ✓ · `skills/` excluded from every gate
(tsconfig/eslint/vitest, all pinned) ✓ · `.env.example` present, committed,
matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/0M/1L/4I · AUDIT-3:
0C/0H/0M/2L/1I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
7 Info** at the subagent reports. The lead's adjudication takes all four
Lows plus two Info docs items into the working register (all cured this
round — S30-1..S30-5); the rest moves to the accepted register with
reasons (see below).

**The parity walk (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`):** the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (`md:hidden p-2 text-slate-300` +
our documented S15-8/S23 superset arms; the reference still ships the
bare button, no aria family), all five mobile links + the Gumroad pill
"Upgrade to Pro – $19" byte-identical, the open panel computed transparent
both sides at scrollY=0 (the reference's dead `bg-slate-900/98` vs our
S22-5 replication — same render, the class strings differ by the dead
token only), the bar `bg-transparent` with the menu open (the S26-3 cure
holds), the scrolled-bar class family byte-identical with the computed
background the same color in its two spellings (ours
`oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the session-28-verified
conversion of the reference's `rgba(15, 23, 42, 0.95)`), the desktop nav
family byte-identical (the walk's two reported active-state deltas are
sequencing artifacts — the reference dumped on /Home-active, the clone on
/Tool-active; the ACTIVE and INACTIVE class strings are byte-identical
across sides), the five-route head census — NO DRIFT (titles, og:title,
og:description, meta description, twitter:card byte-identical; canonical
+ og:url differ by origin only; og:image the documented D-4 self-hosted
stand-in), sitemap.xml + robots.txt identical modulo origin. **NO DRIFT
FOUND — the fourth consecutive fully-clean walk.** The functional
mobile-menu battery passed on the clone: the aria family
(expanded/label), the link-click navigate+close, the /Tool light-page
dark-panel superset (`oklab(0.95)` + `blur(24px)` — the S22-5 arm), the
Escape close with focus return, the history-navigation close (F10-10).
The clone's login round-trip verified live: 200 → `router.push("/")` →
the `viralpost_session` cookie → the `/api/auth/me` envelope. The
Tailwind v4 trap catalog re-verified mitigated (literal-hex `@theme`, the
`@custom-variant hover` unwrap, no banned gradient pair, the shadow
re-pins — audit-2 + this walk).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S30-1 | **LOW** (the ops-robustness seam inconsistency) | `src/lib/db-path.ts:184-190` (the `??` chain), `:222` (`process.env.DATABASE_URL`), `:193-199` (`readDatabaseUrlFromEnvAt`) | The seam treats an empty-string `DATABASE_URL` inconsistently: the bun-signature re-anchor arm and the standalone launch recovery treat `""` as unset (`if (envUrl && …)` — falsy), but the tail `resolveDatabaseUrl(envUrl ?? envFileUrl ?? DEFAULT_DATABASE_URL)` treats it as a SET override (`??` skips only null/undefined). Two live-verified failure shapes: (B) a process env carrying `DATABASE_URL=""` (the docker-compose/CI empty-passthrough shape) MASKS a valid `.env` value — the seam answers `""` and Prisma 6.19.3 fails at first query with `PrismaClientInitializationError: "You must provide a nonempty URL"` (health 503s, every auth route 500s) despite the valid `.env`; (A) a `.env` carrying `DATABASE_URL=` (empty) answers `""` instead of the documented `DEFAULT_DATABASE_URL` fallback a MISSING line gets. Loud, not silent (no wrong-DB risk), but it masks the `.env` value the seam's own docstring promises to combine, and no `tests/db-path.test.ts` case pins the empty-value family. (AUDIT-1 A1-L1; verified by a live seam probe + Prisma repro.) |
| S30-2 | **LOW** (the F12-11 genus resurfacing — dead imports) | `src/components/marketing/sections.tsx:10` (`Sparkles,` in the lucide block) + `:17` (`import Link from "next/link";`) | Both imports are dead — zero JSX/consumer references since the session-19 monetization redesign introduced the file (verified against the introducing commit `a47c50b`; the only Sparkles-shaped symbol consumed is the distinct `WandSparkles` at line 238; the only `Link` occurrences are the import, prose comments, and `LinkedIn` substrings). Gate-blind: `noUnusedLocals` is not in tsconfig, `no-unused-vars` is off in eslint's documented posture — exactly the residue that posture leaves. Session-12's F12-11 register claim ("the one unused import in src/") predates this file; the class is now 10 sessions un-swept. (AUDIT-2 A2-L1; mechanically verified.) |
| S30-3 | **LOW** (docs-truth: the register contradicts cured code) | `Project_Architecture_Document.md:671` (§11) | §11 still lists the S15-5 logout-CSRF class as a live ACCEPTED issue, but session-29 (S29-1, the most recent commit) cured exactly this class: the route now gates through `requireSession()` — a cross-site `<form method="POST">` carries no Lax cookie and answers the envelope's 401; the cure is pinned by `tests/api-robustness.test.ts` and narrated in README/SKILL — only the PAD's live register was not swept. A future agent may re-adjudicate the class as accepted or skip auditing it. (AUDIT-3 A3-L1.) |
| S30-4 | **LOW** (docs-truth: the stale provenance range) | `viralpost-ai_SKILL.md:23` (§0.5) + `.env.example:5` + `tests/boot-env.test.ts:40` + `tests/error-boundaries.test.ts:30` + `tests/auth-reset.test.ts:18` | Five live-tense sites describe this repo's own session ledger as `docs/session_1..21.md` with the rule "the numbers ≤ 21 with this repo's plan files". This repo now carries its own sessions 22–29 (findings S22-*…S29-*), so the ≤ 21 discriminator, applied literally, attributes this repo's own recent findings to the DONOR family — the opposite of §0.5's purpose, and the donor family also has sessions numbered 22–29, so the ambiguity is real. (AUDIT-3 A3-L2.) |
| S30-5 | **INFO→cure** (the docs/hygiene batch) | `Project_Architecture_Document.md:681` (§12 header) + `viralpost-ai_SKILL.md` §15 (the z-index table) | (a) §12's "The Lines column is the live `wc -l` of each file **at the session-25 ship**" — the rows themselves are live-anchored (several carry session-28/29 edits); only the timestamp phrase is stale. (b) §15's z-index table lists navbar z-50 + toast z-[100] but omits the session-22 skip-link's `z-[60]` (focus-only) layer that sits between them — fully documented in code, missing from the doc table. (AUDIT-3 A3-I1 + AUDIT-2 A2-I2.) |

**Accepted register (adjudicated this round, with reasons):** the in-app
delivery default posture (A1-I1 — the standing owner-level deferral;
knob-gated, production-boot-warned, the `.env.example` S13-1 note); the
`/api/auth/me` unthrottled read (A1-I2 — defense-in-depth only, no
oracle, no write; the single-node in-process posture the limiter family
already documents); the 36px mobile touch targets (A2-I1 — the documented
class-for-class parity decision; WCAG 2.2 AA's 2.5.8 floor is 24px,
cleared with margin; the axe e2e battery passes); the quota store's
missing cross-tab `storage` notification (A2-I3 — the documented
fail-open doctrine; the server rate limit is the wall; cosmetic staleness
that self-heals); the two formatting nits (A2-I4 — hero.tsx's stray space
and generator-card's double blank line; noted for the next touch of
either file). The standing accepted register carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins first (3 new its):**
- **S30-1a**: `tests/db-path.test.ts` — the `effectiveDatabaseUrl (bun
  absolutization re-anchoring)` describe gains TWO its, after the existing
  "falls back to the .env value when the process env is unset" arm:
  1. "an empty-string process env never masks the .env value (S30-1)" —
     `effectiveDatabaseUrl({envUrl: "", envFileUrl: "file:../db/custom.db",
     envFileDir: "/repo"})` must resolve the `.env` value
     (`expect(url).toContain("/db/custom.db")`). RED now (returns `""`).
  2. "an empty .env value falls back to the default (S30-1)" —
     `effectiveDatabaseUrl({envUrl: undefined, envFileUrl: "", envFileDir:
     "/repo"})` must resolve `DEFAULT_DATABASE_URL`'s repo-anchored path
     (`expect(url).toContain("/db/custom.db")`). RED now (returns `""`).
- **S30-2**: `tests/landing-page.test.ts` — the "landing: the section
  composition" describe (the monetization neighborhood, after the
  FloatingIcons it) gains the it: the sections dead-import census —
  `sections.tsx` carries no `import Link from "next/link";` line, no bare
  `  Sparkles,` import line, and KEEPS the consumed `  WandSparkles,`
  line (the one-owner doctrine: this census owns the dead-import face).
  RED now (both dead imports are on disk).

**Batch 2 — the GREEN cures:**
- **S30-1**: `src/lib/db-path.ts` — normalize empty to undefined at the
  top of `effectiveDatabaseUrl` (the one-home cure point — the pure seam
  every consumer already routes through):
  `const envUrl = input.envUrl || undefined; const envFileUrl =
  input.envFileUrl || undefined;` with the S30-1 lineage comment (an
  empty string is "unset", never an intentional override — Prisma has no
  valid empty URL). The `if (envUrl && …)` arms and
  `readDatabaseUrlFromEnvAt`'s call sites are unchanged (their falsy
  guards already treat `""` as unset; the tail `??` chain now never sees
  an empty string). Both pins GREEN.
- **S30-2**: `src/components/marketing/sections.tsx` — delete
  `import Link from "next/link";` (line 17) and the `Sparkles,` line
  (line 10) from the lucide block. The census pin GREEN.

**Batch 3 — the mutation batteries:**
- **S30-1**: revert the normalization (drop the two `|| undefined`
  lines) → BOTH pins RED; restore → GREEN.
- **S30-2**: re-add `import Link from "next/link";` → the census pin
  RED; restore → GREEN.

**Batch 4 — the docs-truth batch + the count re-anchor + docs lockstep:**
- **S30-3**: `Project_Architecture_Document.md` §11 — retire the
  logout-CSRF row; replace with the cured record (the S29-1
  requireSession gate + its pin; the S27-6/S28-9 precedent).
- **S30-4**: the provenance re-anchor at all five sites — the range
  becomes `docs/session_1..30.md` (at commit time this round's log
  exists), the rule reworded to "this repo's session range is 1..30
  (S\<n\>-\<id\> with this repo's plan files); donor-ledger numbers carry
  their explicit '(a donor-ledger number)' marker" — the convention the
  newer files (playwright.config.ts, api.ts) already follow.
- **S30-5**: PAD §12 — drop the "at the session-25 ship" phrase (the
  operative claim — live `wc -l`, inventory-census-pinned — stays); the
  `src/lib/db-path.ts` row re-anchored to the live count (the cure adds
  lines). SKILL §15 — the z-index table gains the skip-link row
  (`z-[60]`, focus-only, the (site) layout).
- **Count re-anchor** (constants FIRST — the session-29 lesson):
  `tests/docs-counts.test.ts` UNIT 641 → 644 (+3 pins), SUITES 38
  unchanged, E2E 63 unchanged, badge 704 → 707; then the doc sites walk
  GREEN site by site.
- **Docs lockstep** (same commit): README (the session-30 row, the gate
  line, badge 707, the counts), AGENTS (counts, the plans map's
  thirtieth round), CLAUDE (counts), PAD (§11 row, §12 phrase + db-path
  row, the test-distribution table, the counts), SKILL v1.25.0 → v1.26.0
  (frontmatter, §0.5, §15, Appendix A's session-30 row, the pre-ship
  checklist counts), worklog Task 30, `docs/session_30.md` replaced with
  this round's log, this plan's post-execution record.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record.
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 644/644 (38 files) · build ·
   smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The db-path seam: an empty-string process env never masks a valid
   `.env` value; an empty `.env` value falls back to the default; both
   pinned; the wrong-DB hazard classes stay closed.
4. `sections.tsx` carries no dead imports; the census pin freezes the
   class; `WandSparkles` (the consumed symbol) untouched.
5. PAD §11 matches the cured reality (no live CSRF row); the five
   provenance sites carry the 1..30 range + the donor-marker rule; PAD
   §12's stale phrase dropped and the db-path row re-anchored; SKILL
   §15's z-index table complete.
6. Captures on the dev server (the owner-instructed posture, the
   session-29 precedent): the mobile-menu open clean-walk at 390×844 +
   the landing monetization section (the S30-2 surface), PIL-verified,
   under `docs/screenshots/` (continuing the numbering at 67).
7. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
8. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The plan's projection was exact: UNIT 641 → 644 (+3 pins — S30-1a
  ×2, S30-2 ×1), SUITES 38 unchanged, E2E 63 unchanged, badge 704 →
  707.** The reality census confirmed 644/38 on disk before any doc
  site was touched.
- **One mid-cure typecheck catch**: the S30-1 edit initially dropped
  `envFileDir` from the destructuring (the `bunAbsolutized(envFileUrl,
  envFileDir)` call would not compile) — restored via
  `const { envFileDir } = input;` in the same edit sequence, caught by
  the typecheck gate before proceeding.
- **One environmental lint catch, not a repo defect**: the parity-walk
  scratch script (a gitignored test-results/ file) tripped
  `no-unused-expressions` — eslint scans that dir though git does not.
  The scratch scripts moved outside the repo tree (the workspace
  scripts dir) in the same round; lint re-ran clean.
- **Every mutation battery on record**: the S30-1 normalization
  reverted → both pins RED; the S30-2 dead import re-added → the
  census pin RED. Both restored → GREEN.
- **Live verification**: the parity walk's functional battery (the
  mobile menu open/navigate/Escape/history; the login round-trip 200 →
  router.push("/") → the session cookie → the me envelope) and the
  S30-1 seam probe (the pre-cure `""` answers reproduced against
  Prisma 6.19.3's "You must provide a nonempty URL" failure).
- **Count-re-anchor order held**: the docs-counts constants FIRST
  (641→644 + the PAD §12 db-path row 280→292), the census then walked
  GREEN site by site (no simultaneous-failure window this round — only
  8 transient REDs between the constants edit and the doc-site walk,
  resolved by the lockstep batch in one pass).

**Final state:** lint 0/0 · tsc 0 · unit **644/644** (38 files; +3
pins) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH ·
badge **707**. Captures 67/68 PIL-verified on the dev server (the
mobile-menu open clean-walk with the functional open-state check +
the landing monetization section). Docs lockstep: README (the
session-30 row, the gate line, badge 707) + AGENTS (counts, the plans
map's thirtieth round) + CLAUDE (counts) + PAD (the §11 row, the §12
phrase + db-path row, the test-distribution table) + SKILL v1.25.0 →
v1.26.0 (frontmatter, §0.5, §15, Appendix A's session-30 row, Appendix
B, the pre-ship checklist counts) + worklog Task 30 + the session log
+ this post-execution record. Pushed to main via the SSH wrapper
(dry-run first, key shredded after).
