# Session 34 — The Contact-Persistence Pin + The Swap-View H1s + The Donor-Marker Completion + The Hygiene Batch (2026-11-12)

The round opened on the pulled tree (`6e2e6b0` — the owner's session log
update holding the session-33 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.29.0), then the session-33 set (session_33.md, the session-33 plan,
worklog Task 33, the owner's session_34.md narration). This round is
session 34. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 655/655, 38 files · build · smoke 16/16 · e2e 65/65, 9 specs ·
census MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family; `skills/` excluded from every gate;
the committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/2L/0I · AUDIT-2: 0C/0H/0M/1L/3I · AUDIT-3:
0C/0H/1M/2L/2I** — combined **0 Critical / 0 High / 1 Medium / 5 Low /
5 Info**. AUDIT-1 live-probed the db-path seam's every code path clean
across 40+ probes (the Windows drive-letter/UNC pass-through, the
`:memory:` families, whitespace re-anchoring, rate-limit keying, the
envelope discipline, the reset funnel's atomic consumption) and caught
the donor-marker strata the S33-3 sweep missed; AUDIT-2 traced the
mobile-menu state machine's four close arms, the effects lifecycles,
and empirically compiled the stylesheet through the installed
@tailwindcss/postcss 4.3.3 (the `@custom-variant hover` unwrap verified
to cover `group-hover:` too), catching the retired hover-ink comment
spellings; AUDIT-3 verified every count claim live (655/38 · 65/9 · 16
· badge 720) and caught the contact-persistence pin gap. The lead
hand-verified all eleven findings: the login-POST census (7/run —
setup 1 + auth.spec 5 + reset-funnel 1 — against the 10/15-min wall)
confirms the playwright-config arithmetic; the hover-prefixed
foreground-ink variant has zero live consumers while the base token is
live at five sites (toast.tsx, layout.tsx, login-reset ×3); the
contact e2e test titled "the row landed" asserted only `res.ok()` +
`body.ok` — no DB read at any layer. Every finding enters the working
register (all cured — S34-1..S34-7); the accepted register carries the
rest forward (the Iridescence static-degradation posture — the
documented S20-12 fallback; the footer h2→h4 heading skip —
parity-locked markup; the traced-src artifact face — benign in a
public repo; plus the standing register unchanged).

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`: the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (our aria family the documented
superset), the open panel computed transparent both sides at scrollY=0
(`max-height: none`, display block, the links + the Gumroad pill
byte-identical), the bar `bg-transparent` with the menu open, the
scrolled-bar class family byte-identical with the computed background
the same color in its two spellings (our oklab form = the reference's
`rgba(15, 23, 42, 0.95)`), the desktop nav family byte-identical
modulo the aria-label superset, the five-route head census — **NO
DRIFT** (titles, og:title, og:description, meta description,
twitter:card byte-identical across all five routes; canonical + og:url
differ by origin only; og:image the documented self-hosted superset;
the icon links the documented file-convention posture), sitemap.xml +
robots.txt identical modulo origin (the all-occurrence normalized
comparison), the login round-trip live on both sides (both land on
the landing — the reference's URL `/Home`, its duplicate-of-`/`
route; ours `/`, the documented 308 deviation; re-spelled
session-38, S38-4). The generator walk-probe returned null on BOTH sides
symmetrically — the known probe selector artifact (the clone's
generator round-trip is proven green by the e2e generator spec and
smoke leg 11; the reference's is the documented 402-dead face).
**NO DRIFT FOUND — the eighth consecutive fully-clean walk.** The
mobile menu works as expected (the full functional battery — open,
navigate+close, Escape close, history close + focus return —
e2e-pinned 65/65). The standing sitemap/SEO ask verified
contract-complete.

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S34-2 (MEDIUM)** — the contact-persistence pin: the vacuous-coverage
  genus. The e2e test titled "the row landed (the persistence
  superset)" asserted only the envelope, so deleting the create in
  contact/route.ts (the route still answers `ok({ sent: true })`)
  shipped green through every gate while the advertised core superset
  silently became false. The test now runs the read-back —
  `scripts/e2e-contact-readback.ts` (the NEW one-shot DB script, the
  third of the family: PrismaClient constructed through the sanctioned
  `runtimeDatabaseUrl()` seam, joined to the S26-7 pin's enumeration;
  the global-setup execSync idiom with `DATABASE_URL=file:../db/e2e.db`
  pinned) — and asserts exactly ONE row carrying the submitted payload
  (the seed clears the inbox; the test is the only writer of its probe
  email). GREEN on arrival (a coverage-gap pin — the create IS wired);
  the battery on record: the create commented out → rebuild → exactly
  the read-back REDs ("expected 1, received 0") while the envelope
  still passes — the exact silent-superset-death the pin exists to
  catch; restored → rebuild → GREEN.
- **S34-6 (INFO→cure)** — the swap-view sr-only h1s: the S33-5 genus
  generalized. Swapping the login card away from signin unmounts the
  card's h1 — the document lost its top level mid-funnel on the
  reset/sent/verify views. Each now carries an sr-only h1 mirroring
  its visible h2 ("Reset your password" / "Check your email" /
  "Verify your email") — the invisible-superset form (zero visual
  change, zero rendered-DOM drift, the reference's visible DOM
  untouched; the hamburger-aria and S25-16 focus-return precedents).
  +3 pins RED-first; the three-removal battery on record (each
  removal trips exactly its own it; restored → 57/57 GREEN). The
  mid-gate catch: the h1-mirrors-h2 design makes role+name heading
  queries ambiguous (strict mode failed four e2e tests — S33-5 never
  hit this because its h1 text differs from its h2's); the five
  affected query sites now encode their intent with `level: 2` (the
  VISIBLE heading) — restored → e2e 65/65 GREEN.
- **S34-1 (LOW)** — the donor-marker completion: the S33-3 sweep cured
  exactly 34/35/36 and stopped. The missed `Session-35 guard` cite
  inside `runtimeDatabaseUrl`'s launch-recovery arm (which made §0.5's
  "marked at every app-code site" claim false for that site), the ten
  `Session-37..41` envelope/sweep cites (api.ts, me/login/signup/
  verify/resend routes), and the 62/63/79/147 strata (toast, auth,
  login-reset, from-url, login-card) now carry their
  "(a donor-ledger number …)" markers at every high-traffic header
  cite; the lead's scope check surfaced four MORE sites than the
  audit's finding (login-card's 147 header + the 79 family's first
  cite + toast's 62 + auth's 63 — the S33-3 scope-check lesson
  repeating). §0.5's donor enumeration extended to the comprehensive
  list (23/34/35/36/37/38/39/40/41/62/63/67/79/80/88/96/111/131/145/
  147/163/164/165/166/169/170/173/194/195/212) — the resolver for
  every donor number in the tree.
- **S34-3 (LOW)** — the retired hover-ink re-spell: the toast comment
  block spelled the retired hover-prefixed foreground-ink form twice
  (the hover VARIANT has zero live consumers — the live form is the
  neutral-900 literal; the BASE token stays live at five sites), each
  spelling emitting a never-matched rule into every build. Both
  re-spelled prose-safe; the dead-token census's BANNED list gains its
  fifth member (the `hover:` prefix is the discriminator — the live
  base form passes by construction). The widened census RED-first
  (the existing "THE BAN" it trips on the toast spellings); the
  compile-probe battery on record with ONE live-learned correction:
  the probe imports the REPO's globals.css, not the bare default
  theme — the foreground family is theme-dependent, and a
  default-theme probe emits nothing for it at all (the live-className
  positive control caught the vacuous-mechanics shape). Cured toast
  CLEAN (no dead rule), the live forms still emit (positive
  controls), the synthetic pre-cure spelling fires (non-vacuity
  PROVEN).
- **S34-4 (LOW)** — the playwright-config comment truth fix: the N-69a
  hazard parenthetical said a third run trips resend/verify; THIS
  suite spends 7 login POSTs per run against the login wall of
  10/15-min — the SECOND run trips LOGIN at the 11th cumulative POST
  (14 > 10), failing the from_url arms first. The comment re-anchored
  to the real arithmetic (resend 1/run vs 5 and verify 2/run vs 20
  trip on later runs); the donor marker and the mitigation unchanged.
- **S34-5 (LOW)** — the provenance re-anchor + the census: the eight
  `docs/session_1..33` sites re-anchored to `1..34` (the S30-4
  convention), and the badge-drift genus's LAST hand-maintained count
  family made mechanical — the new provenance-range census asserts the
  on-disk ledger's contiguity AND the lag invariant (every live-tense
  `docs/session_1..N` site's bound ∈ {diskMax, diskMax − 1}: lag 0 at
  ship, lag 1 inside the owner's narration window — future baselines
  stay GREEN — and lag ≥ 2, the forgot-to-re-anchor drift, REDs; a
  leading bound REDs too). The census keys on the `docs/`-prefixed
  file-glob form (the live-tense shape) — historical prose (the
  S30-4 narrative's bare `session_1..21`) stays out by construction.
  GREEN on arrival (sites 33, disk 34 — lag 1); both defect shapes'
  batteries on record (lag-2 planted → RED; leading planted → RED;
  restored → GREEN).
- **S34-7 (INFO→cure)** — the artifact-hygiene mirror: smoke leg 16's
  11-entry enumeration extended to mirror next.config's
  outputFileTracingExcludes root files (28 entries now — the configs,
  the contract docs, the lockfiles), and the excludes themselves gain
  the four tracked root files they missed (`viralpost-ai_SKILL.md`,
  `neo-crm_SKILL.md`, `next.config.ts`, `LICENSE`) — the F-170a nft
  repo-root-drag tripwire in both places. The planted-entry logic
  proof on record (all seven planted entries detected by the loop);
  leg count unchanged (16); the error-boundaries hygiene-leg pin
  re-anchored with the widened loop in the same commit.

## The count re-anchor

UNIT 655 → **660** (+3 the S34-6 pins, +2 the S34-5 census pair), E2E
65 unchanged (the S34-2 read-back extends the existing contact test in
place — the S18-2 precedent; the S34-3 widening folds into the existing
dead-token it), SMOKE 16 unchanged (the S34-7 extension is in-place),
SUITES 38 unchanged, badge 720 → **725**. Constants re-anchored FIRST;
the census then walked the doc sites GREEN (8 count sites + the PAD
§12 rows re-anchored to the live `wc -l`: db-path.ts 333 → 335,
smoke-test.sh 258 → 263, from-url.ts 36 → 37, auth.ts 189 → 190 — the
latter two the donor-marker line additions).

## Verified

- The full gate on the exact commit tree (below)
- Captures 75/76 on the dev server (the owner-instructed posture, the
  session-29..33 precedent): the mobile-menu open clean-walk at
  390×844 (functionally verified open — display block, the links +
  the Gumroad pill, aria-expanded true) + the landing hero,
  PIL-verified
- Docs lockstep: README (the session-34 row, the gate line, badge 725,
  the counts); AGENTS (counts, the plans map's thirty-fourth round);
  CLAUDE (counts); PAD (§8.1 table, §12 rows, the counts); SKILL
  v1.29.0 → v1.30.0 (frontmatter, §0.5's comprehensive enumeration +
  the 1..34 range, Appendix A's session-34 row, the pre-ship
  checklist counts); the eight provenance sites re-anchored to 1..34;
  worklog Task 34; this session log; the plan's post-execution record

**Gate at the session-34 ship: lint 0/0 · tsc 0 · unit 660/660 (38
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**

**Deferred (accepted register, with reasons):** the Iridescence
static-degradation posture (context-loss stops the rAF with no restore
listener — the documented S20-12 fallback; the optional
re-init-on-restore rides the same posture); the footer's h2→h4 heading
skip (parity-locked markup — the reference's own DOM); the standalone
artifact carrying traced src/ sources (nft behavior, benign in a
public repo, no doc claims otherwise); the standing register carried
forward (the bun-absolutization causal model's non-reproduction on
this sandbox's bun; the natural-English prose-collision dead rules;
the test-pin literal faces; the in-app-delivery default flip — the
owner-level deferral; the me-route unthrottled read; the 36px touch
targets; the cross-tab quota staleness; the formatting nits; the
signup admin-bootstrap race; the Tailwind .md-scanner residual).
