# Session 42 — The Boot-Gate Localhost False-Alarm Cure + The Subsumed-Arm Annotations + The Toast Call-Site Census + The Comment-Truth Batch (2026-11-13)

## Context

Session 41 shipped `b8072f3` (the boot-gate exact-prefix case arm, the dead
stepped-stock retirement, the toast-kit BY-DESIGN note, the comment-truth
batch); the owner's narration commit `3cb1aa0` followed (session_42.md
carried the round-41 narration — this round replaces it with the formal
log). The standing instruction re-ran end to end: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the tree at `3cb1aa0`, verified in place):** lint 0/0 · tsc 0 ·
unit 683/683 (40 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at
the repo root ✓ · the vitest + playwright suites in place and current ✓ ·
the sitemap/robots/manifest/OG family verified live against the reference
in this round's walk ✓ · `skills/` excluded from every gate ✓ ·
`.env.example` present, committed, matching the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs —
every load-bearing finding hand-verified in source by the lead, including
a probe of the built CSS sheet that settled AUDIT-2's L2 tree-shaking
claim and a byte-level re-read of the three subsumed arms):
**AUDIT-1: 0C/0H/0M/3L/4I · AUDIT-2: 0C/0H/0M/2L/0I · AUDIT-3:
0C/0H/0M/1L/3I** — combined **0 Critical / 0 High / 0 Medium / 6 Low /
7 Info**. The session-41 diff itself verified correct and complete on all
three passes; the residuals are pre-existing debt the round's own doctrine
claims this round (three of the six Lows are comment-truth misses INSIDE
the session-41 comment-truth batch itself — the S42-1/S42-7/S42-8 irony
the genus always ships).

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`; viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth): **ALL FACES MATCH, NO
DRIFT — the fifteenth consecutive fully-clean walk.** The mobile menu
works as expected (the owner's standing concern): the reference panel
enumerated live (the four nav links — Home's teal `text-teal-400`
rgb(45,212,191) active face, the siblings' `text-slate-300
hover:text-white` — plus the Gumroad pill, same templixco href, same
classes) and byte-verified against ours; panel mechanics identical
(display block + max-height none; the reference's `bg-slate-900/98`
still computing `rgba(0,0,0,0)` — dead in its own build, the transparent
over-hero posture replicated); the hamburger cursor pointer both sides
(the Tailwind v4 standing concern holding); the reference's hamburger
still ships NO aria family (our expanded aria-expanded/controls/label is
the documented superset); Escape leaves the reference's panel open (our
superset, re-confirmed live — ours closes, `hidden` attr verified,
links invisible). The desktop nav byte-identical (brand + 4 links + the
Upgrade pill); the five-route head census byte-identical modulo origin
(titles, og:title, canonicals; the unprefixed family on / and /login);
sitemap 4 URLs both (identical modulo origin); robots identical modulo
origin; the generator probe symmetrically disabled/not-allowed (R 405
platform-side, L works — the documented superset); the login round-trip
both landing the landing (R `/Home`, L `/` — the documented 308
deviation), the clone session verified live via /api/auth/me
(`sepnetflix2023@outlook.com`, role admin).

**The neo-crm reference repo re-checked** (the standing instruction):
its latest sessions 212–217 — the standalone bun-launch DB re-anchor
(the s212 hoist, ALREADY ADOPTED here at session-11/F11-18 with the
in-code citation) and the semantic-prose census genus deepening on its
OWN docs (sessions 213–217; this repo adopted the genus at session-12) —
patterns current, nothing new to adopt.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S42-1 | **LOW** (AUDIT-1 A1) | `src/lib/db-path.ts:40-43` (the S41-14 note's tail) | The session-41 comment-truth batch's own note ships a false tail: "Line-in-place; PAD §12's row is unchanged." The same commit's PAD diff walked the row 335→339 and the file measures 339 (the note block itself added four lines) — the note asserts the plan's prediction instead of the shipped state, precisely the genus S41-2/S41-10 were curing. Cure: re-spell the tail to the truth (the note block grew the file 335→339; PAD §12's row re-anchored in the same commit). |
| S42-2 | **LOW** (AUDIT-1 A3) | `src/app/api/auth/verify/route.ts:30-31` (the route docbook) | The docbook's last line: "A correct code signs the account in and redirects to the dashboard." No `/dashboard` route exists in this tree (site.ts's own S28-7 bullet cured this exact phantom donor-era claim); the handler returns the 200 envelope (`setSessionCookie` + `ok({id, email, verified:true})`) and the CLIENT navigates (login-card's `router.push(resolveFromUrl(...))` to `/` or the from_url target). Cure: re-spell to the truthful flow. |
| S42-3 | **LOW** (AUDIT-1 A2) | `src/lib/from-url.ts:33`, `src/lib/rate-limit.ts:87`, `src/lib/db-path.ts:300` | Three pre-existing subsumed fallback arms (the S41-3 genus): (a) from-url's `` return `${u.pathname}${u.search}` \|\| "/"` `` — the leading-"/" guard two lines up guarantees the template never evaluates empty, so `\|\| "/"` is unreachable (dynamically probed: 0 empty returns across a 24-input adversarial battery); (b) rate-limit's `return hops[hops.length - depth] ?? "unknown"` — `depth ≥ 1` (the depth-0 early return) and `hops.length ≥ depth` (the short-list guard) guarantee an in-bounds index, so `?? "unknown"` never fires; (c) db-path's `if (launchDir && launchDir !== cwd)` — `repoRootFromStandaloneCwd` returns non-null only for a `<root>/.next/standalone` cwd and always a strict two-level ancestor, so `launchDir !== cwd` is always true when `launchDir` is non-null. Adjudication: **ANNOTATE, not retire** — all three sit in security/correctness seams (the open-redirect guard, the rate-limit IP key, the most-bitten db-path contract) where the repo's own belt-and-braces doctrine (the S14-1 comment at from-url; the S28-8 annotated-floor precedent) keeps defensive arms WITH the subsumption named. Cure: the one-line S28-8-style annotation at each of the three (the subsumption named, the keep rationale cited). |
| S42-4 | **INFO→cure** (AUDIT-1 A4) | `src/lib/generation-counter.ts:55-58` (`limitReached`) | The S41-13 "Kept" annotation batch missed this sibling: `limitReached()` has zero in-src callers (generator-card.tsx:60 inlines `used >= FREE_LIMIT`); the only consumer is its own pin. The docblock "True when the free limit is reached (the card swaps to the paywall)" implies the card consumes it — false. Cure: the one-line "Kept: pin-owned" annotation + the docblock parenthetical re-spell (the card inlines the comparison — the extractHashtags/emailSchema/countWords precedent). |
| S42-5 | **INFO→cure** (AUDIT-1 A5) | `src/lib/api.ts:23-28` (the N-67h comment), `:12-14` (`ok()`) | Two donor-vestige affordance arms without disclosure: (a) the N-67h comment justifies `retryAfterSec?`'s optionality with "The optional param keeps the zero-arg calls valid" — this tree's seven call sites ALL pass the value; the zero-arg calls the comment names exist only in the NEO-CRM donor (a donor-context-stale claim); (b) `ok<T>(data, init?)` — none of the 13 call sites (nor any test) passes `init`; the non-200 arm of `init ?? 200` is uncalled. Cure: the donor-context disclosure at both (retiring the optionality would churn the S67-P5 pin and shrink the API face — the annotation is the affordable form). |
| S42-6 | **INFO→cure** (AUDIT-1 A6) | `src/lib/boot-env.ts:147` (the production localhost check) | The production localhost check is a substring test over the raw origin: `/localhost\|127\.0\.0\.1/.test(siteUrl)` — a legitimately PUBLIC origin whose string merely contains "localhost" (`https://mylocalhost.example.com`, `localhost.ge`) trips the "would advertise a localhost origin" warning falsely; a path/query carrying the substring double-warns after the shape arms already fired. Warn-only, production-only — but a false alarm erodes the warning's authority (the repo's own S22-18 rationale). Cure: the parsed-hostname predicate (`hostname === "localhost" \|\| hostname === "127.0.0.1"` — input-equivalent for every true positive: the two pinned forms keep warning; the malformed shapes stay owned by the F10-11 shape arms via the try/catch miss); +1 RED-first pin (a public origin containing the substring warns NOTHING). |
| S42-7 | **LOW** (AUDIT-2 L1) | `src/components/ui/toast.tsx:79` (the S41-6 note), `docs/session_41.md:126` (the mirror) | The session-41 BY-DESIGN note's census is wrong: "only toast.error ×6 and toast.info ×1 are live" — the actual call sites are toast.error ×5 (generator-card ×3, contact-form ×2) + toast.info ×1 (login-card) = 6 TOTAL; the ×6 figure counts the total and mis-attributes it to error. The S41-6 adjudication (success/dismiss stay BY DESIGN) remains sound; only the count is wrong — the count-truth genus the repo polices (the same session's own S41-10). Cure: re-spell to "×5 + ×1 (6 live call sites total)" + the session_41.md mirror + the NEW toast call-site census arm in toast-anatomy.test.ts (comment-stripped src/ scanned for `toast.<member>` call sites; the live multiset pinned exactly — error 5 / info 1 / success 0 — making the note mechanically true and the genus impossible); the plant-a-7th-call battery on record. |
| S42-8 | **LOW** (AUDIT-2 L2) | `tests/design-tokens.test.ts:378-379` (the S41-5 rationale), `docs/session_41.md:92-93` (the mirror) | The S41-5 census arm's recorded impact class is empirically false: "incomplete-subset pins beside their used siblings, shipping as dead :root custom properties in every build" — the installed `@tailwindcss/postcss` 4.3.3 TREE-SHAKES unused @theme variables (lead-verified this round: the built sheet carries `--color-*` only for used tokens; the whole-family zero-consumer pins `--color-teal-800`/`--color-amber-200` are absent from the artifact). The 11 retired literals were dead SOURCE pins, never dead shipped bytes. The retirement stays correct (source hygiene + the bidirectional invariant); only the impact narrative is wrong. Cure: re-spell to the tree-shaken truth at both sites (the retirement is source hygiene owned by the census — the compiler emits only used theme variables). |
| S42-9 | **LOW** (AUDIT-3 I1) | `README.md:301-303` (the closing gate footer) | README's document-final footer is one round stale: "Gate at the session-40 ship: lint 0/0 · tsc 0 · unit **681/681** · build · smoke 16/16 · e2e 65/65." while the session-41 ship ran 683/683 (recorded in session_41.md:187, the SKILL frontmatter, and README's own session-41 row four lines above) — the footer was the one live-tense gate-state site the docs-counts census does not pin (it pins the badge, the tables, the quickstart, the hierarchy — never the footer), so it shipped green through the session-41 re-anchor. Cure: re-anchor the footer to the session-42 ship state + the NEW docs-counts footer lockstep pin (the footer's unit count mechanically tied to the census UNIT constant — RED-first at 681 vs 683; the genus retired). |

**Accepted/observed register (this round's tail, with reasons):** the
dependency-contract belt-and-braces (AUDIT-1 A7 — `split("@")[0] ?? ""`,
the Zod `first?.message ??` fallbacks guard a DEPENDENCY's contract
rather than an own-code guard two lines up; real defensive value, no
action); the sitemap's no-lastmod/changefreq posture (AUDIT-3 I2 —
byte-parity with the reference's live format, Google ignores the hints, a
stale lastmod is worse than none); the manifest's same-src icon pair
(AUDIT-3 I3 — the reference platform's own posture, documented S29-7);
the e2e SEO arms' presence-level shape (AUDIT-3 I4 — the unit layer owns
the byte-exact contracts; the doctrine is EXACTLY ONE pin); the standing
register carried forward unchanged.

## The cure set (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

**Batch 1 — the RED pins:**
- **S42-6a**: `tests/boot-env.test.ts` — inside the session-170
  NEXT_PUBLIC_SITE_URL describe, one pin: production +
  `https://mylocalhost.example.com` (a PUBLIC origin whose string merely
  contains "localhost") produces NO localhost warning (warnings
  length 0 — never "would advertise a localhost origin"). RED now (the
  substring test trips it).
- **S42-7a**: `tests/toast-anatomy.test.ts` — a new describe ("session-42
  — the toast call-site census (S42-7)"): the comment-stripped src/ walk
  collects every `toast.<member>` call site; the live multiset pinned
  exactly (error 5, info 1, success 0 — success/dismiss BY DESIGN per
  S41-6). BORN-GREEN is impossible for the genus — the arm is born RED
  against the NOTE (the census re-derives the truth the note misstates);
  the battery below plants the proof.
- **S42-9a**: `tests/docs-counts.test.ts` — inside the live-tense count
  sites describe, one pin: the README closing footer ("Gate at the
  session-N ship: … unit X/X …") carries the census UNIT constant
  (regex-extract the footer's unit count; assert === UNIT). RED now
  (the footer reads 681; UNIT is 683).

**Batch 2 — the GREEN cures:**
- **S42-6**: the parsed-hostname predicate at boot-env.ts:147 (a
  try/catch URL parse; hostname equality against "localhost" and
  "127.0.0.1"; the catch-miss leaves malformed values to the F10-11
  shape arms) with the S22-18 false-alarm-doctrine comment.
- **S42-7**: toast.tsx:79 re-spell ("toast.error ×5 + toast.info ×1 — 6
  live call sites; the toast-anatomy census owns the count") + the
  session_41.md:126 mirror.
- **S42-9**: README footer re-anchor ("Gate at the session-42 ship: lint
  0/0 · tsc 0 · unit 686/686 · build · smoke 16/16 · e2e 65/65.").
- **S42-1**: the db-path note-tail truth re-spell.
- **S42-2**: the verify-route docbook re-spell (signs in; the envelope
  returns; the card navigates).
- **S42-3**: the three S28-8-style subsumption annotations (from-url's
  `\|\| "/"`, rate-limit's `?? "unknown"`, db-path's `!== cwd` conjunct).
- **S42-4**: the limitReached "Kept: pin-owned" annotation + docblock
  re-spell.
- **S42-5**: the api.ts donor-context disclosures (the N-67h zero-arg
  claim + ok()'s init param).
- **S42-8**: the design-tokens S41-5 rationale re-spell (tree-shaken
  truth) + the session_41.md:92-93 mirror.

**Batch 3 — the mutation batteries (planted defect → exactly the
designed pin RED → restore → GREEN):**
- S42-6: revert the predicate to the substring form → exactly the
  S42-6a pin RED (the two standing true-positive pins stay GREEN).
- S42-7: plant a 7th `toast.error("…")` call in any src file → exactly
  the census RED naming the multiset.
- S42-9: re-anchor the footer back to 681 → exactly the footer pin RED
  (the badge/table pins stay GREEN).

**Batch 4 — the docs batch + the count re-anchor (constants FIRST —
the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-42
  entry; UNIT 683 → **686** (+1 S42-6a in boot-env, +1 S42-7a in
  toast-anatomy, +1 S42-9a in docs-counts), SUITES 40 unchanged, E2E 65
  unchanged, SMOKE 16 unchanged, badge 748 → **751**.
- README: badge 751, the "40 files / 686 tests" rows, the session-42
  status row, the re-anchored footer.
- AGENTS: the counts (686); the plans map's forty-second round.
- CLAUDE: the counts (686).
- PAD: §8.1 table (40 files / 686 tests); §8.3's "683/65/16" →
  686/65/16; §12's affected rows re-anchored to the live `wc -l`
  (from-url, rate-limit, db-path, generation-counter, api — measured
  post-cure); Last Updated stays 2026-11-13.
- SKILL v1.37.0 → v1.38.0: frontmatter (version, date, project_state),
  §0.5's range 1..41 → 1..42, Appendix A's session-42 row, Appendix
  B's header + counts, the pre-ship checklist counts.
- The ten provenance sites re-anchored `session_1..41` →
  `session_1..42` (.env.example, the five test files, db-path.ts,
  health/route.ts, toast.tsx, SKILL §0.5 — the S30-4 convention; lag 0
  at ship).
- worklog Task 42; `docs/session_42.md` (this round's formal log,
  replacing the owner-carried round-41 narration); this plan's
  post-execution record.

**Batch 5 — the verification + the captures:**
- The full gate on the exact commit tree: lint → typecheck → unit
  686/686 (40 files) → build → smoke 16/16 → e2e 65/65 → census MATCH.
- The parity walk RE-RUN post-cure: the standing faces hold (the
  fifteenth walk's battery), no drift.
- Captures 91/92 on the dev server (the owner-instructed posture, the
  session-29..41 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified, under
  `docs/screenshots/`.

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the boot-gate localhost false-alarm
  cure + the subsumed-arm annotations + the toast call-site census + the
  comment-truth batch (session-42 audit)`;
  `.env.example` rides the commit (tracked, six-knob current, the
  provenance note re-anchored to 1..42).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the
  authority): the Appendix-A shim on PATH, the operator key
  materialized 0600 OUTSIDE the repo (never printed), dry-run first,
  real push, remote ref verified, key + temp material shredded.

## Acceptance criteria

1. The production localhost check tests the parsed hostname; a public
   origin containing the "localhost" substring warns nothing (+1
   RED-first pin; the two standing true-positive pins untouched); the
   battery on record.
2. The toast call-site census is GREEN and planted-defect-proven (a 7th
   call → RED); the S41-6 note and its session_41.md mirror read
   ×5 + ×1.
3. The README footer carries the session-42 ship state and is
   mechanically lockstepped to the census UNIT constant (+1 RED-first
   pin; the badge/table pins untouched); the battery on record.
4. The db-path note-tail, the verify-route docbook, the limitReached
   docblock, the api.ts N-67h/ok() comments, and the design-tokens
   S41-5 rationale all tell the truth (with the session_41.md mirrors).
5. The three subsumed arms carry the S28-8-style annotations (the
   subsumption named, the keep rationale cited).
6. Full gate GREEN: lint 0/0 · tsc 0 · unit 686/686 (40 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
7. The walk re-run: no drift.
8. Captures 91/92 PIL-verified under `docs/screenshots/` (post-cure).
9. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit; the constants
   re-anchored FIRST; the ten provenance sites at 1..42 — lag 0 at
   ship.
10. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## ToDo list (execution order)

- [x] 1. Batch 1: place the RED pins — S42-6a in boot-env.test.ts;
      S42-7a (the toast call-site census describe) in
      toast-anatomy.test.ts; S42-9a (the footer lockstep pin) in
      docs-counts.test.ts
- [x] 2. Verify Batch 1 RED state (exactly the two designed REDs —
      S42-6a, S42-9a — and the census born as designed; the 683
      existing GREEN)
- [x] 3. Batch 2: S42-6 (the parsed-hostname predicate, GREEN) + S42-9
      (the footer re-anchor, GREEN) + S42-7 (the note re-spell + the
      session_41.md mirror)
- [x] 4. S42-8 (the design-tokens rationale re-spell + the
      session_41.md mirror)
- [x] 5. S42-1/S42-2 (the db-path note-tail + the verify docbook)
- [x] 6. S42-3 (the three subsumed-arm annotations)
- [x] 7. S42-4/S42-5 (the limitReached annotation + the api.ts
      donor-context disclosures)
- [x] 8. Intermediate gate check (lint/tsc/unit — expect only the
      designed Batch-4 census REDs)
- [x] 9. Batch 3: the mutation batteries (S42-6, S42-7, S42-9)
- [x] 10. Batch 4: constants FIRST (UNIT 686, badge 751), the census
       doc-site walk RED→GREEN, PAD §12 affected rows, SKILL v1.38.0,
       the ten provenance sites 1..42, worklog Task 42, README/AGENTS/
       CLAUDE rows, session_42.md, the plan record
- [x] 11. Batch 5: the full gate + the walk re-run + captures 91/92
- [x] 12. Batch 6: commit + SSH-wrapper push (dry-run first, remote
       verified, key shredded)

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection held exactly**: UNIT 683 → 686 (+1 S42-6a in
  boot-env, +1 S42-7a in toast-anatomy, +1 S42-9a in docs-counts),
  SUITES 40, badge 748 → 751. The reality census confirmed 686 on disk
  before any doc site was touched; the constants were re-anchored
  FIRST; the census walked the doc sites RED→GREEN (PAD §12: from-url
  37→43, rate-limit 135→141, db-path 339→349, generation-counter
  110→113, api 303→310 — the S42-3 annotations and the S42-1/S42-4/S42-5
  comment blocks carried the growth).
- **The three batteries all proved single-tooth**: S42-6 (the
  substring revert → exactly the one pin RED, 47 GREEN), S42-7 (the
  planted 7th call → exactly the census RED, "expected 6 to be 5"),
  S42-9 (the stale footer → exactly the footer pin RED, the badge and
  table pins GREEN through it).
- **The toast census design held**: the internal bare `dismiss(`
  calls in toast.tsx never match the member-anchored regex, so the
  census counts only external call sites — error 5 / info 1 / success
  0 exactly as shipped.
- **The provenance re-anchor walked all ten sites** to 1..42 in one
  pass; zero `session_1..41` strings survive anywhere the census
  scans. Lag 0 at ship.

**Final state:** lint 0/0 · tsc 0 · unit **686/686** (40 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **751**. Captures 91/92 PIL-verified on the dev server
(post-cure, the menu functionally verified open — the
aria-expanded/panel-mechanics/Escape battery re-run — before the
shot). Docs lockstep: README + AGENTS + CLAUDE + PAD + SKILL
v1.37.0 → v1.38.0 + the ten provenance sites re-anchored to 1..42
(toast.tsx the owned tenth) + worklog Task 42 + docs/session_42.md +
this post-execution record. Pushed to main via the SSH wrapper
(dry-run first, key shredded after).
