# Session 35 — The Tailwind Source Scoping + The Script Teardown Idiom + The Donor-Marker Tail + The Comment-Truth Batch (2026-11-12)

The round opened on the pulled tree (`b508502` — the owner's session
log update holding the session-34 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD,
SKILL v1.30.0), then the session-34 set (session_34.md, the session-34
plan, worklog Task 34, the owner's session_35.md narration). This round
is session 35. Baseline gate GREEN at the documented counts (lint 0/0 ·
tsc 0 · unit 660/660, 38 files · build · smoke 16/16 · e2e 65/65, 9
specs · census MATCH); the standing asks re-verified up front (the
`.env` `DATABASE_URL="file:../db/custom.db"` contract with `db/` at the
repo root; the vitest + playwright suites in place and current; the
sitemap/robots/manifest/OG family; `skills/` excluded from every gate;
the committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/6I · AUDIT-2: 0C/0H/0M/1L/5I · AUDIT-3:
0C/0H/1M/3L/4I** — combined **0 Critical / 0 High / 1 Medium / 7 Low /
15 Info**. AUDIT-1 live-probed the db-path seam clean again (40+
probes) and caught the one-shot script family's teardown gap (the
synchronous exit call inside `.catch` preempting the chained `.finally`
disconnect) plus ten more bare donor cites; AUDIT-2 empirically
compiled the stylesheet through the installed @tailwindcss/postcss
4.3.3 with the methodology validated against the real build artifact
(159,088 B), surfacing the aggregate never-matched-rule mass the
accepted register's per-rule framing never captured; AUDIT-3 verified
every count claim live and caught the playwright-config contact-bucket
omission (the suite's only 60-minute wall) plus the partial
hygiene-leg pin. The lead hand-verified all findings: the contact
bucket confirmed at `RATE_LIMIT = 5` / 60-min with the limiter BEFORE
the Zod parse (invalid POSTs count) and 3 POSTs/run in contact.spec;
the docs-only classes confirmed riding the real build CSS (`bada55`
×2, `laravel-worker` ×2, `to-amber-400` ×1 — none occur anywhere in
src/); the `process.exit(1)`-inside-catch preempt confirmed in all
three chained scripts; the ten bare donor cites confirmed by the
§0.5-scoped grep. Every finding enters the working register (all
cured — S35-1..S35-7); the accepted register carries the rest forward
(the `.env.local` unmodeled face — the absolutization causal model's
non-reproduction stands, a behavioral change to the most load-bearing
module is not justified by an unreproduced shape; the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login-response
photoUrl asymmetry, the in-app-delivery default — the owner-level
deferral; the footer heading skip, the breakpoint-crossing open state,
the ParticleText inline duplication, the Reveal SSR opacity, the
worklog's structural inconsistencies).

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com` — **NO DRIFT, the ninth consecutive
fully-clean walk**, on an instrument-hardened walk script (eight runs
to green, the probe lessons on record):

- The viewport: the `--viewport` flag on `open` and a bare `viewport`
  command are NOT real — innerWidth silently stayed 1280 and the whole
  mobile battery read desktop-width states (`md:hidden` computed
  display none; the panel probe found the bar container instead of the
  panel). `agent-browser set viewport <w> <h>` with an innerWidth
  confirm is the reliable form.
- The toggle verify must be side-agnostic: our aria-expanded superset
  does not exist on the reference, so verifying the open against it
  made the census "retry" on the reference and CLOSE the menu the
  first click had opened. The visible-non-bar-div-with-links signal
  works on both sides.
- The oklab→sRGB equivalence is now NUMERICAL: the walk's color
  canonicalizer implements Ottosson's transform and
  oklab(0.207678 −0.00293915 −0.0397103 / 0.95) lands exactly on
  rgb(15,23,42)@0.95 — the reference's `rgba(15, 23, 42, 0.95)` in its
  other spelling.
- The mobile battery at a CONFIRMED 390×844: the open panel computed
  display **block** both sides at scrollY=0 (max-height none, the
  links + the Gumroad pill byte-identical, the reference's dead-98
  family its own render), the bar `bg-transparent` with the menu open,
  the scrolled-bar family byte-identical, the hamburger base classes
  byte-identical (our focus-visible family the documented S15-8
  superset), the desktop nav family byte-identical at 6|6 links, the
  five-route head census byte-identical (canonical + og:url by origin
  only; og:image the documented self-hosted superset), sitemap.xml +
  robots.txt identical modulo origin (the all-occurrence normalized
  comparison), the login round-trip live on both sides (both land on
  the landing — the reference's URL `/Home`, its duplicate-of-`/`
  route; ours `/`, the documented 308 deviation; re-spelled
  session-37, S37-7), the generator walk-probe null on BOTH sides symmetrically (the
  known probe selector artifact).
- The focus-return face stays E2E-OWNED (mobile-navigation.spec.ts
  :67/:80, `toBeFocused` with real keyboard events against the
  production build, 65/65): the agent-browser daemon cannot drive
  focus from eval — a direct `.focus()` leaves activeElement=BODY, an
  instrument limitation probed this round, not app behavior. The
  observable Escape-close transition verified live (expandedAfter
  false, panelHidden true).

**The mobile menu works as expected** — the user's standing concern,
verified live and e2e-pinned.

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S35-1 (LOW, the round's headline)** — the Tailwind source scoping:
  v4's auto source detection anchors at the repo ROOT, and the ~170
  docs/tests/root text files PLUS the ~3,150-file skills/ catalog
  (92% of the non-src tree — the magnitude re-anchored session-36,
  S36-5b, the register rounded to one form session-37, S37-6b; the
  original narrative here said "300+" — a figure that
  matched no countable corpus) fed class-shaped prose into the
  scanner — every candidate compiled into
  a rule no element carries (~60% of the shipped sheet; the real build
  verifiably carried `.bg-[#bada55]`, `[program:laravel-worker]`,
  `.to-amber-400`, and the dead /98 family, none of which occur
  anywhere in src/). The cure is one line in globals.css:
  `@import "tailwindcss" source("../");` — the scanner loses the
  repo-root anchor and scopes to src/. Probe-proven through the
  installed 4.3.3 (the control form emitted the dead classes at
  192,442 B; both scoped forms emitted only the scoped source's
  classes at 4,812 B — non-vacuity by construction); real-build
  verified: the sheet dropped 159,088 → 64,053 bytes (−59.7%), every
  live class still emits, the @theme survives, zero `@media (hover:
  hover)`. +1 pin RED-first; the planted-bare-import battery on
  record (revert → exactly the pin REDs; restored → GREEN). The S28-4
  prose-safe doctrine stays as defense in depth.
- **S35-3 (LOW)** — the script teardown idiom: the documented S25-18b
  idiom ("the disconnect is AWAITED") was never implemented on the
  failure path — the synchronous exit call inside `.catch` terminated
  the process before the promise chain continued, so the chained
  `.finally` never ran and `$disconnect()` was skipped exactly when a
  run failed; census.ts had no catch at all (a thrown count = an
  unhandled rejection). The fix sets `process.exitCode = 1` (the
  finally runs; the process still exits 1 after the chain settles),
  gives census.ts the family form, and moves readback's usage check
  BEFORE the client construction (a usage error builds nothing).
  +1 pin; the N-53a guard's drift-exit assertion re-anchored in the
  same commit (the pin follows the code); the three planted defects
  each proven independently (exit back in seed → RED; bare void
  main() in census → RED; argv-after-client in readback → RED);
  restored → GREEN. The failure-path sanity verified live (readback's
  usage error exits 2 with the message, nothing constructed; the
  census still MATCHes).
- **S35-2 (MEDIUM)** — the playwright-config contact-bucket census:
  the webServer comment omitted the suite's only 60-minute wall —
  contact is `5/HOUR` with the limiter BEFORE the Zod parse (invalid
  POSTs count), and the suite spends 3 contact POSTs/run (the
  spec's browser form + the two API POSTs), so a second run within
  the hour fails "the row landed" at the 6th cumulative POST. The
  comment's "wait out the window (self-heals in 15 min)" remediation
  was materially false for this bucket. The census completed: contact
  3/run vs 5/hour (the 60-min self-heal), generate 6/run vs 20,
  reset 3/run vs 10, signup 2/run vs 10, forgot 2/run vs 10 — LOGIN
  still trips on the SECOND run (the 11th cumulative POST).
- **S35-4 (LOW)** — the donor-marker tail: the S34-1 sweep stopped at
  the 35/37-41/62/63/79/147 strata. Nine marker blocks covering the
  ten bare sites marked at their
  block-header cites (login-reset:106 covering :114 — the S36-5d
  wording precision): api.ts:24 (Session-67) and :64 (session-67 +
  session-165), auth.ts:143 (N-67j), verify/route.ts:39 (N-67h) and
  :92 (N-67c), login-reset.ts:106 (the M-79c1 block covering :114),
  :133 (Session-111), :179 (Session-96), rate-limit.ts:7 (Session-173
  — §0.5's 173 claim now true at its only site).
- **S35-5 (LOW)** — the hygiene-pin completion: the artifact-hygiene
  pin's two partial toContain chunks (the first-11 prefix + the 4-entry
  S34-7 chunk) left the middle 4 + the tail 10 entries — 14 of 29 —
  unpinned; deleting any of them from the loop shipped the pin green.
  The full 29-entry loop line as ONE `toContain` now owns every
  entry. The planted-removal battery on record (`tests` removed →
  exactly the pin REDs; restored → GREEN).
- **S35-6 (LOW)** — the comment-truth batch: gate-script.test.ts's
  stale "a third run inside 15 minutes" (the S34-4 arithmetic already
  corrected everywhere else — the second run trips LOGIN at the 11th
  cumulative POST); the SKILL Appendix B header ("re-certified through
  session 33" while its own body carried the session-34 counts);
  AGENTS' plans-map stray paren (the session-30 entry's paren plus the
  final one); the smoke header's leg-16 summary re-anchored to name
  the families (the in-loop enumeration is the authority — the header
  must never enumerate exhaustively again).
- **S35-7 (INFO→cure)** — the census widening: the provenance census's
  documented blind spots closed — `scripts/`, `worklog.md`, and the
  root config files join SITE_ROOTS/SITE_FILES. Today zero range
  sites exist in them (the worklog's only cite is the single-session
  `docs/session_19.md` reference, out by construction); the widening
  owns the future.

## The count re-anchor

UNIT 660 → **662** (+1 the S35-1 pin in design-tokens, +1 the S35-3
pin in db-census), E2E 65 unchanged, SMOKE 16 unchanged, SUITES 38
unchanged, badge 725 → **727**. Constants re-anchored FIRST; the census
walked the doc sites GREEN (the PAD §12 rows re-anchored to the live
`wc -l`: auth 190→191, rate-limit 134→135, api 263→265, globals.css
226→238, smoke 263→269; the eight provenance sites re-anchored to
1..35 — lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The real-build sheet checks: 64,053 bytes; no `bada55`, no
  `laravel-worker`, no `to-amber-400`, no dead /98 rule; `.bg-slate-900`
  ×3, `.sr-only` ×1, `#0f172a` ×10 — every live class emitting
- The parity walk re-run post-cure (the computed-style faces hold on
  the scoped sheet)
- Captures 77/78 on the dev server (the owner-instructed posture, the
  session-29..34 precedent): the mobile-menu open clean-walk at
  390×844 (functionally verified open — display block, the links + the
  Gumroad pill) + the landing hero, PIL-verified
- Docs lockstep: README (badge 727, the session-35 row, the gate line,
  the Design-system note); AGENTS (counts, the plans map's
  thirty-fifth round, the stray-paren cure); CLAUDE (counts, the
  source-scoping line in the trap catalog); PAD (§8.1, §12 rows, Last
  Updated); SKILL v1.30.0 → v1.31.0 (frontmatter, §0.5 1..35, §4's
  trap-8 entry, Appendix A's session-35 row, Appendix B's header
  "through session 35" + body, the pre-ship checklist counts); the
  eight provenance sites re-anchored to 1..35; worklog Task 35; this
  session log; the plan's post-execution record

**Gate at the session-35 ship: lint 0/0 · tsc 0 · unit 662/662 (38
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**

**Deferred (accepted register, with reasons):** the `.env.local`
unmodeled face in the db-path signature check (the absolutization
causal model never reproduced on this sandbox's bun; a behavioral
change to the repo's most load-bearing module is not justified by an
unreproduced shape — the next round may pick it up with fresh
fixtures); the signup admin-bootstrap TOCTOU (the standing session-27
adjudication; no authorization gate reads `role` today); the scryptSync
cost/synchronous posture (the documented demo posture, rate limits
bounded); the login-response `photoUrl` asymmetry (no consumer reads it
from login); the in-app OTP/reset delivery default (the owner-level
deferral, boot-warned); the footer h2→h4 heading skip (parity-locked
markup); the mobile-menu open state surviving a breakpoint crossing
(the S26-3 posture); the ParticleText sr-only inline-style duplication
(belt-and-braces); the Reveal SSR opacity posture (the documented
tradeoff); the worklog's structural inconsistencies (sessions 28-31's
header form, no session-1 entry — cosmetic in a historical record); the
standing register carried forward unchanged.
