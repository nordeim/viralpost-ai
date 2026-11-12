# Session 34 — The Contact-Persistence Pin + The Swap-View H1s + The Donor-Marker Completion + The Hygiene Batch (2026-11-12)

## Context

Session 33 shipped `59d3c52`; the owner added `6e2e6b0` (the session-33
execution narration held as `docs/session_34.md`, the established
pattern). This round re-ran the standing instruction against the merged
tree: docs review → baseline gate → the comprehensive audit (three
parallel subagents) → the live reference parity walk → the TDD cures →
the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 655/655 (38 files) · build · smoke 16/16 · e2e 65/65 (9 specs) ·
census MATCH · `.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/`
at the repo root ✓ (the census prints the resolved URL) · the vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in
place and current ✓ · the sitemap/robots/manifest/OG family verified
live against the reference (this round's walk) ✓ · `skills/` excluded
from every gate ✓ · `.env.example` present, committed, matching the
six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/0I · AUDIT-2: 0C/0H/0M/1L/3I · AUDIT-3:
0C/0H/1M/2L/2I** — combined **0 Critical / 0 High / 1 Medium / 5 Low /
5 Info**. AUDIT-1 live-probed the db-path seam's every code path clean
(40+ probes: Windows drive-letter/UNC pass-through, `:memory:`
families, whitespace re-anchoring, rate-limit keying, the envelope
discipline, the reset funnel's atomic consumption); AUDIT-2 traced the
mobile-menu state machine's four close arms, the effects lifecycles,
and empirically compiled the stylesheet through the installed
@tailwindcss/postcss 4.3.3 (the `@custom-variant hover` unwrap verified
to cover `group-hover:` too); AUDIT-3 verified every count claim live
(655/38 · 65/9 · 16 · badge 720) and caught the contact-persistence pin
gap. The lead hand-verified all eleven findings: the login-POST census
(7/run vs the 10/15-min wall) confirms A3-L1's arithmetic; the
`hover:text-foreground` hover-variant has zero live consumers (the base
`text-foreground` is live at five sites — toast.tsx:182,
layout.tsx:65, login-reset.ts:137/285/300); the contact e2e test titled
"the row landed" asserts only `res.ok()` + `body.ok` — no DB read at
any layer. Every finding enters the working register (S34-1..S34-7);
the accepted register carries the rest forward.

**The parity walk** (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`): the mobile-menu census at 390×844 — the
hamburger base classes byte-identical, the open panel computed
transparent both sides at scrollY=0 (`max-height: none`, display block,
the links + the Gumroad pill byte-identical), the bar `bg-transparent`
with the menu open, the scrolled-bar class family byte-identical with
the computed background the same color in its two spellings (our oklab
form = the reference's `rgba(15, 23, 42, 0.95)`), the desktop nav
byte-identical modulo the aria-label superset, the five-route head
census — **NO DRIFT** (titles, og:title, og:description, meta
description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; og:image the documented
self-hosted superset; the icon links the documented file-convention
posture), sitemap.xml + robots.txt identical modulo origin (the
all-occurrence normalized comparison — the walk script's
first-occurrence-only `.replace` artifact pre-diagnosed and excluded),
the login round-trip live on both sides (both land on `/`), the
generator walk-probe null on BOTH sides symmetrically (the known probe
selector artifact — the clone's generator round-trip is proven green by
the e2e generator spec and smoke leg 11). **NO DRIFT FOUND — the
eighth consecutive fully-clean walk.** The mobile menu works as
expected (the full functional battery — open, navigate+close, Escape
close, history close + focus return — e2e-pinned 65/65).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S34-1 | **LOW** (the S31-4/S33-3 donor-collision genus, the sweep incomplete at both ends) | `src/lib/db-path.ts:300` (the bare `Session-35 guard` cite) + ten `Session-37..41` sites (`src/lib/api.ts:44`, `src/app/api/auth/me/route.ts:7`, `login/route.ts:25`, `signup/route.ts:31/35/56`, `verify/route.ts:35/49`, `resend/route.ts:36/49`) + `src/lib/login-reset.ts:35` (Session-79) + `src/lib/from-url.ts:3` (session-147) | The S33-3 marker sweep cured exactly the next-three-rounds set (34/35/36) and stopped. The `Session-35 guard` cite inside `runtimeDatabaseUrl`'s launch-recovery arm was left BARE — making §0.5's "marked at every app-code site since session-33 S33-3" claim false for that site. And the 37–41 stratum (five more donor sessions, rounds 4–8 away) plus the 79/147 strata carry no markers; §0.5's donor enumeration (23/34/35/36/67/96/111/145/163/169/170/195/212) omits them all. When this repo reaches its own sessions 37–41, every one of those ten comments becomes ambiguous the same way 34/35/36 did pre-S33-3 — the exact genus §0.5 exists to prevent. (AUDIT-1 A1-L1 + A1-L2, merged — the same doctrine face.) |
| S34-2 | **MEDIUM** (a headline superset claim with zero behavioral coverage — the vacuous-coverage genus the N12-2/mutation-battery doctrine polices) | `tests/e2e/contact.spec.ts:42-50` (the test titled "the row landed (the persistence superset)") vs `src/app/api/contact/route.ts:54` (the unpinned `db.contactMessage.create`) | The Deviations Ledger / README headline superset claim is "the contact form actually persists (POST → SQLite ContactMessage)". NO test verifies a row lands: the e2e test's body asserts only `res.ok()` + `body.ok === true` (the title claims the row landed — the reader assumes the face is covered); smoke leg 10 asserts only the 200; the unit layer (api-robustness) pins the envelope/try-catch/limiter/shape-guard but not the create. Deleting the `create` (the route still returns `ok({ sent: true })`) ships green through every gate while the advertised core superset silently becomes false. The create IS wired today — a coverage gap, not a defect. (AUDIT-3 A3-M1.) |
| S34-3 | **LOW** (the S28-4/S31-5a/S32-4/S33-1 doctrine, the sweep still incomplete) | `src/components/ui/toast.tsx:189,195` | The retired `hover:text-foreground` utility is spelled verbatim in the Session-131/S25-9 comment block (twice) — the hover VARIANT has zero live consumers (the live form is `hover:text-neutral-900`; the BASE `text-foreground` is live at five sites), so each spelling emits a never-matched `.hover\:text-foreground:hover` rule into every build (~60–70 dead bytes; AUDIT-2 compile-probe-verified through the installed 4.3.3). The S33-1 census bans four other spellings but not this one; the same comment block already applies the S28-4 prose-safe treatment to a different retired token three lines below. |
| S34-4 | **LOW** (a comment-truth nit in a config — the session-17 genus) | `playwright.config.ts:67-73` (the N-69a donor cite) | The comment says a reused server "can trip resend (6>5) or verify (21>20)" on a THIRD run. This repo's suite spends 7 login POSTs per run (setup 1 + auth.spec 5 + reset-funnel 1) against the login wall of 10/15min — the SECOND run inside the window trips LOGIN at the 11th cumulative POST (14 > 10), earlier and on a different route than named. Resend (1/run vs 5) and verify (2/run vs 20) cannot trip on runs 2–3. An operator diagnosing local 429s is pointed at the wrong route and the wrong run count. |
| S34-5 | **LOW** (the badge-drift genus's last unpinned member) | The eight `docs/session_1..33` provenance-range sites (`.env.example:5`, `viralpost-ai_SKILL.md` §0.5, `src/lib/db-path.ts:250`, `src/app/api/health/route.ts:6`, `tests/boot-env.test.ts:40`, `tests/auth-reset.test.ts:18`, `tests/error-boundaries.test.ts:30`, `tests/db-path.test.ts:255`) | HEAD (`6e2e6b0`) adds `docs/session_34.md` (the owner's narration of round 33) — the on-disk ledger is now session_1..34 (verified contiguous) while eight sites enumerate `session_1..33`. The standard post-ship transient this round cures by the S30-4 convention — but the range is the LAST hand-maintained count family (docs-counts pins every other count; nothing mechanical owns the range), so the stale-by-one window recurs after every owner post-ship commit. |
| S34-6 | **INFO→cure** (the S33-5 genus, deliberately scoped to the superset route last round) | `src/components/layout/login-card.tsx` — the reset (`:451`), sent (`:694`), and verify (`:606`) swap views | S33-5 added the sr-only h1 to the signup view only, leaving "The /login in-place swap views are untouched (the reference's own DOM)" as the recorded reason. Consequence: on `/login`, swapping to reset/sent/verify leaves the document with ZERO h1 (the signin view's h1 unmounts with the column) — the outline loses its top level mid-funnel, inconsistent with the precedent the same card now establishes. Not a WCAG failure (the h2s are descriptive; axe's page-has-heading-one is best-practice) — but the sr-only h1 is the house's established INVISIBLE superset form (zero visual change, zero rendered-DOM drift, the hamburger-aria and S25-16 focus-return precedents), so the parity constraint on the reference's own DOM is not violated by an sr-only addition. (AUDIT-2 A2-I2.) |
| S34-7 | **INFO→cure** (the S19-17/S23-18 trap family, the enumeration narrower than the excludes) | `scripts/smoke-test.sh:251` (leg 16's 11-entry loop) vs `next.config.ts:26-55` (the ~24-entry excludes list) | Leg 16 asserts absence of `.env .git db skills docs uploads worklog.md test-results dev.log server.log`; the tracing excludes additionally name `.env.example`, `AGENTS.md`, `CLAUDE.md`, `README.md`, the PAD, `bun.lock`, `package-lock.json`, the four config files, `tsconfig.tsbuildinfo`, `scripts/**`, `tests/**`. And the excludes themselves omit four tracked root files (`viralpost-ai_SKILL.md`, `neo-crm_SKILL.md`, `next.config.ts`, `LICENSE`). If the F-170a nft repo-root-drag hazard resurfaced in a shape that ships any of those, leg 16 stays green. Current artifact verified clean — defense-in-depth asymmetry only. (AUDIT-3 A3-I1.) |

**Accepted register (this round's tail, with reasons):** the Iridescence
static-degradation posture (context-loss stops the rAF with no restore
listener — the documented S20-12 fallback; the optional
re-init-on-restore and the partial-compile shader-object residue ride
the same posture); the footer's h2→h4 heading skip (parity-locked
markup — the reference's own DOM); the standalone artifact carrying
traced src/ sources (nft behavior, benign in a public repo, no doc
claims otherwise); the login-card sr-only-h1 text choice (h1 mirrors
its visible h2 — the standard outline-continuity pattern). The standing
register carries forward unchanged (the bun-absolutization causal
model's non-reproduction on this sandbox's bun; the natural-English
prose-collision dead rules; the test-pin literal faces; the
in-app-delivery default flip — the owner-level deferral; the me-route
unthrottled read; the 36px touch targets; the cross-tab quota
staleness; the formatting nits; the signup admin-bootstrap race; the
Tailwind .md-scanner residual).

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins:**
- **S34-6a**: `tests/login-views.test.ts` — the S33-5 describe block
  gains THREE its (one per view, each face independently owned):
  1. "the reset view carries an sr-only h1 (S34-6 — the swap-view
     outline, the S33-5 genus generalized)" asserting login-card.tsx
     contains `<h1 className="sr-only">Reset your password</h1>` (RED
     now).
  2. the sent view's: `<h1 className="sr-only">Check your email</h1>`
     (RED now).
  3. the verify view's: `<h1 className="sr-only">Verify your
     email</h1>` (RED now).
- **S34-3a**: `tests/design-tokens.test.ts` — the S33-1 census's
  `BANNED_TOKEN_SPELLINGS` gains a fifth entry:
  `[/hover:text-foreground/, "the retired toast hover-ink form (the live form is the neutral-900 literal)"]`
  — the regex passes the live base form (`text-foreground`) by
  construction (the `hover:` prefix is the discriminator). The
  EXISTING "THE BAN" it goes RED now (toast.tsx spells the retired
  form twice) — a scope-widened RED, not a new test.
- **S34-2a**: `tests/e2e/contact.spec.ts` — "the row landed" test
  gains the read-back: after the envelope asserts, an `execSync` of
  `bun scripts/e2e-contact-readback.ts api-probe@example.com` with
  `DATABASE_URL=file:../db/e2e.db` pinned (the global-setup idiom)
  returns the matching rows as JSON; the test asserts length 1 AND the
  row's name ("API Probe") and message ("Direct API check.") — the
  persistence superset's first behavioral owner. GREEN on arrival (the
  create IS wired — a coverage-gap pin; the battery plants the defect
  instead, per the S33-4 precedent).
- **S34-5a**: `tests/docs-counts.test.ts` — ONE census arm (the
  provenance-range census): enumerate `docs/session_*.md` on disk,
  assert the ledger is contiguous 1..N, and assert every one of the
  eight range sites carries `session_1..<bound>` where
  `bound ∈ {N, N-1}` (lag 0 at ship; lag 1 in the owner's
  narration window — the invariant that keeps future baselines GREEN
  while catching lag ≥ 2, the forgot-to-re-anchor drift, and any
  leading bound, the claims-a-session-that-doesn't-exist drift).
  GREEN on arrival (sites say 33, disk is 34 — lag 1; a coverage-gap
  pin; the battery plants both defect shapes).

**Batch 2 — the GREEN cures:**
- **S34-6**: `src/components/layout/login-card.tsx` — immediately
  before each of the three swap views' h2s, the S34-6 comment (the
  invisible-superset form, the S33-5 precedent, one comment per view)
  + the sr-only h1: "Reset your password" (reset), "Check your email"
  (sent), "Verify your email" (verify) — each mirroring its visible
  h2. The h2s, their `data-view-focus` wiring, and the verify view's
  `codeRefs` focus arm are untouched.
- **S34-3**: `src/components/ui/toast.tsx` — the two prose-safe
  re-spells (line-structure preserved):
  - `:189`: "the neutral-900 literal (hover:text-foreground #0a0a0a →
    hover:text-neutral-900 #171717)" → "the neutral-900 literal (the
    retired foreground-token hover ink #0a0a0a → the neutral-900 form
    #171717)"
  - `:195`: "the LAST live hover:text-foreground ride in src/." → "the
    last live ride of that retired hover-ink form in src/."
- **S34-2**: `scripts/e2e-contact-readback.ts` — the NEW one-shot
  read-only script (the e2e-prune idiom): PrismaClient constructed
  with `datasources: { db: { url: runtimeDatabaseUrl() } }` (the
  sanctioned seam — NEVER a bare env read), takes the target email as
  argv[2], prints the matching rows' `{name, email, message}` as JSON
  to stdout, awaited `$disconnect` in the finally (the S25-18b
  idiom). Lineage comments cite S34-2 + the S26-7 exemption doctrine.
- **S34-1**: the thirteen donor-marker edits (word-level,
  line-structure preserved) — db-path.ts:300's `Session-35 guard`
  gains "(a donor-ledger number — the NEO-CRM seam's
  absolute-launch-value guard)"; the ten 37–41 cites gain
  "…(donor-ledger numbers — the NEO-CRM family's own envelope/sweep
  sessions)" folded into their existing cite lines;
  login-reset.ts:35's `Session-79 (M-79c2)` and from-url.ts:3's
  `session-147 / F-147c2` gain their markers. §0.5's donor enumeration
  extends to
  `session-23/34/35/36/37/38/39/40/41/67/79/96/111/145/147/163/169/170/195/212`
  and its "marked at every app-code site" sentence re-anchored to the
  completed sweep.
- **S34-4**: `playwright.config.ts` — the N-69a comment's hazard
  parenthetical re-anchored to this suite: "the suite spends 7
  logins/run against the 10/15-min wall — a SECOND run inside the
  window trips LOGIN at the 11th cumulative POST; resend (1/run vs 5)
  and verify (2/run vs 20) trip on later runs" (the donor marker and
  the mitigation unchanged).
- **S34-5**: the eight provenance sites re-anchored
  `session_1..33` → `session_1..34` (the S30-4 convention).
- **S34-7**: `next.config.ts`'s excludes gain the four missing root
  files (`viralpost-ai_SKILL.md`, `neo-crm_SKILL.md`,
  `next.config.ts`, `LICENSE` — never runtime-traced, belt-and
  suspenders symmetry) with the S34-7 lineage comment;
  `scripts/smoke-test.sh` leg 16's loop extends to the full union
  (the next.config excludes' root files + `uploads`), and the ok/fail
  messages re-anchored ("no repo-root drag — the excludes mirror").
  Leg count unchanged (16).

**Batch 3 — the mutation batteries:**
- **S34-6**: remove any one sr-only h1 → exactly its pin REDs
  (three-removal sweep: each removal trips exactly its own it);
  restore → 57/57 GREEN.
- **S34-3**: revert the two re-spells → the widened census RED; the
  compile probe — per-file recompile of toast.tsx (`@import
  "tailwindcss" source(none); @source <file>`, the installed
  @tailwindcss/postcss 4.3.3, the S33-1 method) asserting the emitted
  CSS carries no `.hover\:text-foreground` rule; the probe's vacuity
  PROVEN on the pre-cure spellings (the synthetic source fires).
- **S34-2**: the e2e battery — comment out the `create` in
  contact/route.ts → rebuild → the read-back test REDs (the envelope
  still passes; the DB read returns zero rows — the exact
  silent-superset-death the pin exists to catch) → restore → rebuild →
  GREEN.
- **S34-5**: plant lag-2 (one site → `session_1..32` with disk at 34)
  → the census REDs; plant the leading bound (`session_1..35`) → REDs
  (claims a session that doesn't exist); restore → GREEN.
- **S34-7**: the leg-16 logic proof (the S33-6 method — no full-ladder
  run): plant each of the four NEW entries under `.next/standalone/`
  and run the loop's check inline → every planted entry fails the
  `[ -e ]` test → remove.

**Batch 4 — the docs batch + the count re-anchor (constants FIRST — the session-29..33 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-34
  entry; UNIT 655 → **659** (+3 S34-6), E2E 65 unchanged (the
  read-back extends an existing test), SMOKE 16 unchanged, SUITES 38
  unchanged, badge 720 → **724** (UNIT + E2E).
- The S26-7 pin's one-shot-script enumeration gains
  `scripts/e2e-contact-readback.ts` (the new script joins the
  seam-mandatory form's pin — +0 tests, the existing it covers it).
- PAD: §8.1 table (659/65/16); §12 rows re-anchored to the live
  `wc -l` (smoke-test.sh + the leg-16 block; next.config.ts + the
  excludes block; login-card.tsx + the three h1 blocks; db-path.ts;
  docs-counts.test.ts; the census walks them RED→GREEN).
- README: the session-34 status row (prose-safe — no banned token
  spellings in the row itself, the session-32 lesson), the gate line,
  badge 724, the counts, the API table's scripts note if needed.
- AGENTS: the counts, the plans map's thirty-fourth round.
- CLAUDE: the counts.
- SKILL v1.29.0 → v1.30.0: frontmatter (version, date, project_state),
  §0.5's donor enumeration extension (Batch 2) + the
  provenance-range census note, Appendix A's session-34 row, Appendix
  B's counts, the pre-ship checklist counts.
- The eight provenance sites re-anchored `session_1..33` →
  `session_1..34` (Batch 2, S34-5) — the census (Batch 1) walks them
  GREEN at lag 0.
- worklog Task 34; `docs/session_34.md` replaced with this round's
  log; this plan's post-execution record.

**Batch 5 — the verification + the captures (the owner-instructed dev-server posture):**
- The full gate on the exact commit tree: lint → typecheck → unit
  659/659 → build → smoke 16/16 → e2e 65/65 → census MATCH. The dev
  server is stopped before the gate (the session-32 EADDRINUSE
  lesson) and rebooted for the captures.
- Captures 75/76 under `docs/screenshots/` — (75) the mobile-menu
  open clean-walk at 390×844 (the round's priority surface,
  functionally verified open), (76) the landing hero. PIL-verified
  (dimensions + color depth).

**Batch 6 — the commit + the push:**
- Conventional Commit on main: `fix: the contact-persistence pin + the
  swap-view h1s + the donor-marker completion + the hygiene batch
  (session-34 audit)`; `.env.example` rides the commit (tracked,
  six-knob current, the provenance note re-anchored).
- Push via `docs/ssh_git_wrapper_v3.py` (the runbook is the authority):
  the Appendix-A shim on PATH (this sandbox has no OpenSSH binary),
  the operator key materialized 0600 OUTSIDE the repo (never printed),
  dry-run first, real push, remote ref verified, key + temp material
  shredded.

## Acceptance criteria

1. Every new pin ships with its mutation battery on record (S34-2's
   and S34-5's batteries plant the defects — both pins are coverage
   gaps, GREEN on arrival; S34-6's three pins and the S34-3
   scope-widened census are RED-first).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 659/659 (38 files) ·
   build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.
3. The contact persistence superset is behaviorally owned: the e2e
   read-back fails when the create is removed (the battery on record).
4. The retired hover-ink form no longer demands a rule from src
   (compile-probe-verified); the census owns the spelling; the
   existing four bans stay.
5. The thirteen donor cites carry their markers; §0.5's enumeration
   extended; the "every app-code site" claim true again.
6. The three swap views carry sr-only h1s; the h2s and focus wiring
   untouched; the three-removal battery on record.
7. The provenance range is 1..34 everywhere; the census arm holds the
   lag invariant; both defect shapes' batteries on record.
8. Leg 16 fails on every excludes-mirror entry (the planted-entry
   logic proof); leg count unchanged (16); the four root files join
   the excludes.
9. Captures 75/76 PIL-verified under `docs/screenshots/`.
10. Docs lockstep: six documents + worklog + session log + this plan's
    post-execution record, all in the same commit; the docs-counts
    constants re-anchored FIRST.
11. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The count projection was off by one — the census is the truth:**
  the S34-5 census landed as TWO its (the ledger-contiguity arm + the
  lag-invariant arm — separate failure granularity), so UNIT 655 →
  **660** (+3 S34-6, +2 S34-5), not the plan's 659; badge 720 →
  **725**. The reality census confirmed 660/38 on disk before any doc
  site was touched; the constants were re-anchored FIRST.
- **The plan-validation pass paid for itself twice.** First: the
  validation script's own digit-stripping bug surfaced the SKILL's
  HISTORICAL `session_1..21` cite (the S30-4 narrative) — the census
  design keys on the `docs/`-prefixed file-glob form so historical
  prose stays out by construction. Second: the S34-3 compile probe
  initially ran vacuous (the synthetic didn't fire) — the isolation
  sweep (the s33 token fires, the s34 token doesn't, a live className
  doesn't either) found the root cause: the foreground family is
  THEME-dependent, and a bare `@import "tailwindcss"` probe emits
  nothing for it at all. The corrected probe imports the repo's
  globals.css; the live-className positive control now guards the
  mechanics.
- **The S34-1 scope check surfaced FOUR more sites than the audit's
  finding** (the S33-3 scope-check lesson repeating): login-card's
  Session-147 header cite, the Session-79 family's first cite in
  login-card, toast's Session-62 header, and auth's Session-63 — all
  marked; §0.5's enumeration extended to the comprehensive list
  (the 62/63/80/88/131/166/194 strata that carried inline
  "the template's/the scaffold's/the CRM's/the digma" attributions
  stay as-is — the convention's accepted form).
- **The S34-2 battery on record**: the create commented out → rebuild
  → exactly the read-back REDs ("expected 1, received 0") while the
  envelope still passes; restored → rebuild → GREEN (2 passed incl.
  the setup login). The e2e read-back is the persistence face's ONLY
  pin by design — no unit source pin (the N12-2 exactly-one-owner
  doctrine; the e2e owns the behavioral face, the fast proxy would
  co-pin the same defect).
- **The S34-6 battery on record**: the three-removal sweep — each
  h1's attribute-broken form trips exactly its own it; restored →
  57/57 GREEN.
- **The S34-3 battery on record**: the re-spells reverted → the
  widened census RED; restored → 27/27 GREEN. The compile probe:
  CURED toast emits no dead hover rule; the live hover:text-neutral-900
  and base text-foreground still emit (positive controls); the
  synthetic pre-cure spelling fires (non-vacuity PROVEN).
- **The S34-5 battery on record**: lag-2 planted (.env.example →
  1..32) → the lag invariant REDs; the leading bound planted
  (db-path → 1..35) → REDs; restored → GREEN.
- **The S34-7 battery on record**: seven entries planted under
  .next/standalone/ (the four new + three pre-existing from the
  widened set) — all detected by the leg's loop logic; the artifact
  cleaned back to its pristine six-entry root.
- **A pre-existing pin surfaced by the S34-7 cure**:
  tests/error-boundaries.test.ts's hygiene-leg pin held the OLD
  8-entry enumeration prefix — re-anchored with the widened loop in
  the same commit (the source-pinned contract).
- **The PAD §12 rows re-anchored**: db-path 333 → 335, smoke-test
  258 → 263, from-url 36 → 37, auth 189 → 190 (the latter two the
  donor-marker line additions); the census walked them GREEN.
- **The S34-6 mid-gate lesson (the one gate catch of the round)**: the
  h1-mirrors-h2 design makes role+name heading queries ambiguous —
  `getByRole("heading", { name: "Verify your email" })` resolved to
  BOTH the sr-only h1 and the visible h2, and strict mode failed four
  e2e tests (the two funnel specs + the two reset-view swap tests).
  S33-5 never hit this because its h1 text ("Sign up") differs from
  its h2's ("Create your account"). The five query sites now encode
  their intent with `level: 2` (the VISIBLE heading — the queries are
  MORE precise than before, not weakened); restored → e2e 65/65
  GREEN.
- **The parity walk**: NO DRIFT — the eighth consecutive fully-clean
  walk; the mobile menu works as expected (byte-identical classes
  across every family; the full functional battery e2e-pinned).

**Final state:** lint 0/0 · tsc 0 · unit **660/660** (38 files) ·
build · smoke **16/16** · e2e **65/65** (9 specs) · census MATCH ·
badge **725**. Captures 75/76 PIL-verified on the dev server (the
mobile-menu open clean-walk at 390×844 + the landing hero). Docs
lockstep: README + AGENTS + CLAUDE + PAD + SKILL v1.29.0 → v1.30.0 +
the eight provenance sites re-anchored to 1..34 + worklog Task 34 +
docs/session_34.md + this post-execution record. Pushed to main via
the SSH wrapper (dry-run first, key shredded after).
