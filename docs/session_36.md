# Session 36 — The Button-Cursor Preflight Cure + The Teardown-Chain Coverage + The Donor-Marker Sweep + The Comment-Truth Batch (2026-11-12)

The round opened on the pulled tree (`467db9b` — the owner's session
log update holding the session-35 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD,
SKILL v1.31.0), then the session-35 set (session_35.md, the session-35
plan, worklog Task 35, the owner's session_36.md narration). This round
is session 36. Baseline gate GREEN at the documented counts (lint 0/0 ·
tsc 0 · unit 662/662, 38 files · build · smoke 16/16 · e2e 65/65, 9
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
**AUDIT-1: 0C/0H/0M/2L/3I · AUDIT-2: 0C/0H/1M/1L/3I · AUDIT-3:
0C/0H/0M/4L/3I** — combined **0 Critical / 0 High / 1 Medium / 7 Low /
9 Info**. The session-35 diff itself verified CLEAN on all three
passes (the source-scoping form, the teardown exitCode idiom, the
donor markers, the full-loop pin, the census widening all honest
against source). AUDIT-1 confirmed the db-path seam and the auth
family clean again and caught the finally-chain coverage gap plus the
donor-marker genus's surviving ~24 bare cites; AUDIT-2 swept the class
emission (479/479 live classes found in the built sheet, zero dead
rules, zero misses) and surfaced the v4 button-cursor preflight gap
(the rubric's §12 names it; the repo's own trap catalog didn't);
AUDIT-3 verified every count claim live and caught the S35-5
arithmetic error ("13 of 29" — its own 11+4 makes 15 pinned, so 14
unpinned), the "300+" corpus figure (matching no countable corpus; the
real corpus also included the 3,157-file skills/ catalog, 92% of the
non-src tree, which the enumeration never named), the census's .sh
blind spot, and the mirrors-claim qualifier drop. The lead
hand-verified all findings; the Medium (the cursor) was then confirmed
LIVE on both sides by the walk.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, on the session-35 instrument lessons
applied from the start (no probe-hardening round needed this time —
`set viewport` + innerWidth confirms, and the selectors were
calibrated against the reference's actual DOM before the run: it has
NO `<header>` element, the bar is `<nav>`, the panel the nav div
carrying `md:hidden` + `overflow-hidden`). Twenty faces:

- **ONE real drift — the round's headline (S36-1)**: the reference
  renders `cursor: pointer` on every enabled button (its v3-era
  preflight ships the rule); our v4 build rendered the UA default
  arrow. Confirmed live both sides: the hamburger at a confirmed
  390×844 (R=pointer, L=default) and the login submit (R=pointer,
  L=default). The /Tool Generate button MATCHED (both
  `not-allowed`) — but only because both sides disable it when the
  form is empty, via the shared `disabled:cursor-not-allowed`
  utility. A systematic desktop parity divergence on the primary
  affordance class, invisible to every gate (no computed-cursor
  census existed).
- **Two adjudicated non-drifts**: the hamburger class (our
  focus-visible arm — the documented S15-8 superset) and the
  escape-close face. The escape face was ISOLATED this round: the
  reference's panel STAYS OPEN on Escape (`display: block` before and
  after, the button focused — probed twice) — the reference has NO
  keyboard close at all. Our Escape-close is the documented F11-11
  superset, the mirror of the aria family. Session-35's walk had
  probed the escape transition on OUR side only (`expandedAfter` is
  our aria superset's key); this round's side-by-side face is the
  completion, on the record.
- **Sixteen faces byte-identical**: the bar closed/open class
  families at scrollY=0 (bg-transparent both sides), the open panel
  computed display **block** both sides with max-height none, the
  five links + the Gumroad pill byte-identical, the desktop nav 6|6
  ("ViralPost AI, Home, Tool, Pricing, Contact, Upgrade to Pro"), the
  five-route head census byte-identical modulo origin (titles,
  og:title, og:description, meta description, twitter:card; canonical
  + og:url by origin only), sitemap.xml + robots.txt identical modulo
  origin, the login round-trip live on both sides (both land on `/`),
  the generator walk-probe null on BOTH sides symmetrically (the
  known probe artifact).

**The mobile menu works as expected** — the user's standing concern,
verified live again (open at a confirmed 390px, links + pill
byte-identical, escape-close superset, focus-return e2e-owned).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S36-1 (MEDIUM, the round's headline)** — the button-cursor
  preflight cure: `@layer base` in globals.css gains
  `button, [role="button"] { cursor: pointer; }` — the family skill
  §12's exact prescription, walk-verified live both sides. The
  `disabled:cursor-not-allowed` utilities still compose (the utility
  layer beats the base layer — the disabled Generate button keeps its
  matched not-allowed). +1 pin RED-first (1 failed / 28 passed
  planted, exactly the designed RED); the rule-removal battery on
  record (removed → exactly the pin RED; restored → 29/29 GREEN). The
  real-build sheet check: the emitted CSS carries the rule. The
  definitive proof: the walk re-run post-cure — both cursor faces
  flip to MATCH (pointer both sides). The trap joins CLAUDE.md's
  catalog, AGENTS' mitigation line, the README Design-system note,
  and the SKILL §4 trap catalog (trap 9).
- **S36-3 (LOW)** — the teardown-chain coverage: all four one-shot
  chains (`prisma/seed.ts`, `scripts/e2e-prune.ts`,
  `scripts/e2e-contact-readback.ts`, `scripts/census.ts`) reordered
  from `main().catch(A).finally(B)` to `main().finally(B).catch(A)` —
  A covered only main's rejection, so a rejecting disconnect (B) was
  an unhandled rejection, and on the success path it flipped a green
  run non-zero with no message (a green `db:seed` could fail the
  smoke gate). The trailing catch now covers main's rejection AND the
  disconnect's own. The ordering arm joins the S35-3 pin
  (`/main\(\)\s*\.finally\(/` for all four; the census arm
  re-anchored to the family form — the pin follows the code); the
  planted-revert battery on record (seed reverted to the old order →
  RED on the ordering arm; restored → 7/7 GREEN). The failure paths
  verified live: readback's usage error exits 2 with the message and
  nothing constructed; the seed exits 0 through the finally-first
  chain; the census still MATCHes.
- **S36-2 (LOW)** — the donor-marker sweep, the S31-4/S33-3/S34-1/
  S35-4 genus continued to its high-traffic completion: the N-67h
  twins at `login/route.ts:13`, `resend/route.ts:40`,
  `signup/route.ts:40` (verify's twin got its S35-4 marker; these
  three didn't); the `Session-163` Zod-parse shorthands at login:18,
  signup:44, resend:44, verify:44, reset-password:38/:42,
  forgot-password:48/:52, `api.ts:63` (the section divider) and
  `:212`, `auth.ts:58/:111`, `password.ts:61`; and login-card.tsx's
  N-67k/N-67l/Session-111/N-79c13/Session-96 family (the file-level
  note at :85 covering the file). All carry their lineage notes at
  the first bare cite per file (the `.env.example` S21-12 file-level
  precedent — cheaper than per-block markers and equally
  unambiguous). §0.5's claim "the 80/88/163/… sites carry their
  inline attributions" is now TRUE at the 163 route sites.
- **S36-4 (LOW)** — the provenance census's .sh blind spot:
  `scripts/smoke-test.sh` joins SITE_FILES. The S35-7 widening added
  `scripts/` to SITE_ROOTS, but the extension filter admits only
  `.ts/.tsx/.mts` — the one scripts/ file most likely to carry
  provenance prose was excluded, and the widening comment's "a future
  docs/session_1..N range claim there must trip the same lag
  invariant" was false for it. The planted-range battery on record:
  a `docs/session_1..99` claim planted in the .sh trips the
  lag-invariant census (bound 99 > diskMax) — proving both the trip
  AND that the file is scanned; restored → GREEN.
- **S36-5 (LOW)** — the comment-truth batch, four genera: (a) the
  S35-5 arithmetic re-anchored "13 of 29" → "14 of 29" (the old pin
  covered the first-11 prefix + the 4-entry chunk = 15 of 29, so 14
  were unpinned — the middle 4 + the tail 10 — and the narrative
  contradicted its own 11+4) at the five sites (error-boundaries,
  session_35.md, worklog, SKILL, the session-35 plan); (b) the
  "300+" corpus magnitude re-anchored to the real numbers — the ~160
  docs/tests/root prose files PLUS the 3,100-file skills/ catalog
  (92% of the non-src tree; the original figure matched no countable
  corpus, and the enumeration never named the largest member) at the
  four sites (globals.css, design-tokens.test.ts, session_35.md, the
  session-35 plan); (c) the "(plus uploads, the pre-existing
  tripwire)" qualifier restored in the error-boundaries comment (the
  smoke loop carries 29 entries vs next.config's 28);
  (d) the "ten sites marked" wording re-spelled to "nine marker
  blocks covering the ten bare cites (login-reset:106 covering
  :114)" at the three sites (session_35.md, worklog, SKILL).
- **S36-6 (INFO→cure)** — the hygiene batch: (a) the VALIDATION
  envelope-code pin — reset-password's bespoke
  `fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400)` (the digma-measured
  wire) had no pin (only the message was asserted); +1 it, GREEN on
  arrival (a coverage-gap pin — the planted-BAD_REQUEST battery owns
  the defense: planted → exactly the pin RED, restored → 27/27); (b)
  the cn() seam spec — `src/lib/utils.ts` was the only src/lib module
  with zero test references (PAD §8.3's "every seam has a spec" held
  only via the glossary's circular definition); +1 file
  (`tests/utils.test.ts`) pinning the clsx conditional passthrough +
  the tailwind-merge precedence (the same-group text-color conflict
  resolves last-win; the different-group font-size coexists — the
  first draft's expectation was wrong and the test itself taught the
  group boundary); (c) the two limiter summaries (playwright.config.ts
  + AGENTS.md) completed to all six fifteen-minute buckets — forgot
  10 / reset 10 joined (an operator could have concluded they were
  unthrottled).

**Accepted register (this round's tail, with reasons):** the `start`
script's `tee` masking the exit code (AUDIT-1 A1-I1 — smoke boots the
server directly via `node .next/standalone/server.js`, never through
`bun run start`; the mask is operator-convenience-only and visible in
the log; changing the documented local-workflow script shape for a
non-gate face is not justified); the canvas/rAF loops animating while
scrolled out of view (AUDIT-2 A2-L1 — parity-consistent: the
reference's own loops behave identically; the IO-gate is a superset
OPPORTUNITY, deferred as a behavioral change to three effect loops
outside this round's scope); the plain `@theme` vs the rubric's
`@theme inline` (AUDIT-2 A2-I1 — code-wins: the two hazards the
inline+literal rule guards are independently prevented, the
design-tokens censuses + the clean walks are the proof); the Reveal
`as` polymorphic prop's zero consumers (AUDIT-2 A2-I2 — vendored
scaffold; retirement is a behavior-neutral refactor touching the
shared component of 9 call sites, deferred); the ParticleText
un-debounced resize rebuild (AUDIT-2 A2-I3 — the acknowledged S13-7
in-code tradeoff, hero-only and transient); the standing register
carried forward unchanged (the `.env.local` unmodeled face, the
signup admin-bootstrap TOCTOU, the scryptSync posture, the login
photoUrl asymmetry, the in-app delivery default, the footer heading
skip, the S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The count re-anchor

UNIT 662 → **665** (+1 the S36-1 pin in design-tokens, +1 the S36-6a
pin in auth-reset, +1 the S36-6b cn() spec in the new
tests/utils.test.ts), SUITES 38 → **39**, E2E 65 unchanged, SMOKE 16
unchanged, badge 727 → **730**. Constants re-anchored FIRST; the
census walked the doc sites RED→GREEN (the PAD §12 rows re-anchored to
the live `wc -l`: auth 191→193, password 68→69, api 265→268,
globals.css 238→251; the eight provenance sites re-anchored to 1..36 —
lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The real-build sheet check: the emitted CSS carries the
  `button, [role="button"] { cursor: pointer }` base rule; the
  disabled utility still composes
- The parity walk re-run post-cure: the two cursor faces flip to
  MATCH (pointer both sides), the eighteen standing faces hold, the
  two superset faces adjudicated as documented — effectively clean
- Captures 79/80 on the dev server (the owner-instructed posture, the
  session-29..35 precedent): the mobile-menu open clean-walk at
  390×844 (functionally verified open — display block, the links +
  the Gumroad pill) + the landing hero, PIL-verified
- Docs lockstep: README (badge 730, the session-36 row, the gate
  line, the Design-system note); AGENTS (counts, the plans map's
  thirty-sixth round, the Tailwind-traps line, the limiter summary);
  CLAUDE (counts, the trap catalog's cursor entry); PAD (§8.1, §8.3,
  §12 rows); SKILL v1.31.0 → v1.32.0 (frontmatter, §0.5 1..36, §4's
  trap-9 entry, Appendix A's session-36 row, Appendix B's header +
  body, the pre-ship checklist counts); the eight provenance sites
  re-anchored to 1..36; worklog Task 36; this session log; the plan's
  post-execution record

**Gate at the session-36 ship: lint 0/0 · tsc 0 · unit 665/665 (39
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
