# Session 20 — The Ledger-Count Closure + The ResetToken Index + The Limiter Namespace + The Hygiene Batch (2026-11-11)

The round opened on a fresh `git clone` (the standing instruction's
reset path), `bun install`, `.env` re-created from `.env.example`
(AUTH_SECRET set for dev), `db:push` + `db:seed` + `db:census`
(MATCH). The operator's standing asks were re-verified up front:
`.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root (the contract re-verified end-to-end on the clean machine), the
vitest + playwright suites in place and current, the sitemap/robots/
manifest/OG family byte-verified against the live reference, `skills/`
excluded from every gate.

The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL), then
the session-19 set (session_19.md, the session-19 plan, worklog Task
19, and the pre-round session_20.md transcript handoff — this round's
log replaces it, the established pattern; the transcript's content is
preserved in the session-19 record and the plan's context). This
round is session 20. Baseline gate GREEN at the documented counts
(lint 0/0 · tsc 0 · unit 561/561 (37 files)). neo-crm re-cloned at
HEAD `b3d0fbe` — UNCHANGED since session 12's review; the recorded
decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit
subagents dispatched (API/lib seams, components/pages/effects,
SEO/configs/tests/docs) while the findings were hand-verified in
source. The audit returned **0 Critical / 0 High / 1 Medium / 9 Low /
16 Info** — the one Medium being the SKILL's Appendix-B verification
ledger still saying `e2e 56/56` (the session-19 commit re-anchored
the unit count in the same paragraph but missed the e2e count, and
the docs-counts gate's SKILL pin was satisfied by the frontmatter,
not scoped to Appendix B — a gate coverage hole as well as a docs
drift).

The parity walk (live, both sides, logged into the reference) found
**NO DRIFT** — the first clean walk since session 17: the five-route
head census byte-matches the session-19 description family (the
prefixed 70-char-truncated tail on /Tool /Pricing /Contact, the plain
170-char paragraph on / and /login); the mobile menu family holds on
both sides at 390×844 (the reference's no-aria hamburger, 5
destinations, NO Escape close; the clone's parity panel + the
superset Escape-with-focus-return + route-change auto-close + the
derived title — hydration clean via `localhost`); the monetization
section's ten floaters animate inside the observed envelope;
sitemap.xml + robots.txt identical (origin-difference only); the
clone's generator round-trip green. The Tailwind v4 trap catalog
re-verified mitigated in `globals.css` (literal hex `@theme`, the
`@custom-variant hover` unwrap, no `tailwind.config.js`, the
censuses green).

The session-20 plan written and validated against the codebase (the
pin placements, the census mechanics, the count sites), then executed
with TDD throughout:

- **S20-1 (the ledger-count closure)**: the scoped pin RED first
  (Appendix B must carry `57/57 (9 specs`; the retired `56/56 (9
  specs` form banned), then the ledger re-anchored + the parenthetical
  extended with the session-19 description-family leg. Mutation
  battery: `57/57` → `56/56` planted in the ledger → exactly the new
  pin REDs → restored → GREEN.
- **S20-2 (the resetToken index)**: the pin RED first, then
  `resetToken String? @unique` + `db:push` (SQLite uniques treat
  NULLs as distinct — the "no reset pending" rows coexist; the
  funnel's two token lookups ride the index; the one-live-token
  invariant becomes structural).
- **S20-3 (the smoke trap init)**: the pin RED first (the init must
  precede the trap registration), then `GATE_PID=""` beside
  `SERVER_PID=""` — the S19-17 trap referenced an uninitialized
  variable under `set -u`, so an early-leg failure aborted cleanup
  mid-trap and leaked the temp files (including the cookie jar).
- **S20-4 (the hero server component)**: the pin RED first, then the
  superfluous `"use client"` retired — the hero composes client
  islands with serializable props and zero hooks; the static subtree
  renders as server HTML now. Live-verified on the dev server: the
  h1 + both canvases + the WebGL context + the floaters all render
  and hydrate.
- **S20-5 (the S19-9 mount residual)**: the pin RED first, then
  `init()` guards the particle build behind `!reduced` (mirroring the
  cured `onResize`) — the reduced face only ever calls `drawPlain`.
- **S20-6 (the toast focus pause)**: the pin RED first, then the
  `onFocus`/`onBlur` pair mirrors the hover pair on the ToastCard
  root — keyboard/AT users keep the card while reading (the existing
  paused effect re-arms the timer on both paths).
- **S20-7 (the limiter namespace)**: the pin re-anchored RED first
  (the namespaced families + the retired shared-namespace form
  banned), then `generate:uid:${user.id}` / `generate:ip:
  ${clientKey(req)}` — the shared form let a mis-declared-proxy
  attacker collide with a victim's bucket via a forged XFF cuid.
  Mutation battery: the retired form planted → exactly the pin REDs →
  restored → GREEN.
- **S20-8..S20-16 (the batch)**: the verify route's fsync-scale
  write-residual documented (the resend S19-18 precedent); the seed's
  tokenVersion claim made precise (the update path resets every
  seeded field by design — only v=0 cookies survive); the two bare
  CSPRNG calls (forgot-password's `randomBytes`, generate's
  `randomInt`) moved inside their try blocks; the generator's
  paragraph count bank-capped (`Math.min` — the used-set dedupe
  terminated only while the bank was big enough; pinned); the
  iridescence `webglcontextlost` guard (a lost GPU context spun the
  rAF loop forever) + the loseContext-why comment (the StrictMode
  remount invariant, pinned by negative); the SKILL §7 PT
  present-tense reworded to the EN monetization section + the
  semantic-prose census negative; the type-gate lineage note's three
  `install_packages` sites re-anchored to the three-file scripts/
  reality; the site.ts truncation comment describes the actual
  mechanism (the hard 70-char cut + comma normalization,
  word-boundary-correct for the pinned string); vitest.config.mts
  gains the explicit `skills/**` exclude (the three-config exclusion
  doctrine now mechanical).

The count re-anchor: UNIT 561 → 571 (+10 pins), E2E 57/9 unchanged,
badge 618 → 628; the PAD §12 rows re-anchored (schema 64, smoke 183,
particle-text 330, iridescence 241, generator 453, site 173); the
SKILL version v1.14.0 → v1.16.0 (the session-19 plan's 1.15.0 bump
never landed in the frontmatter — the version was unpinned; this
round's bump covers both, noted in the plan's record).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
571/571 (37 files) · build · smoke 15/15 · e2e 57/57 (9 specs)** ·
census MATCH. Captures 47/48 taken on the dev server (the landing
1280×800 + the OPEN mobile menu 390×844, via `localhost`, hydration
awaited, the menu DOM-confirmed open before the shot), PIL-verified.
README (the session-20 row, the gate line, the badge 628); AGENTS
(counts, the plans map's twentieth round); CLAUDE (counts); PAD (§8.1,
§12 rows); SKILL v1.16.0; worklog Task 20; this log; the plan's
post-execution record. The Conventional Commit and the SSH-wrapper
push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the merged tree (`d6e17f4`) passed lint 0/0 · tsc 0 ·
unit 561/561 (37 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents, every load-bearing finding
hand-verified): **0 Critical / 0 High / 1 Medium / 9 Low / 16 Info.**

**The parity walk (both sides, live): NO DRIFT** — the five-route head
census, the mobile menu family, the monetization floaters,
sitemap/robots, the generator superset.

**The cures (TDD, +10 pins, 2 mutation batteries):** the
ledger-count closure (the docs-counts gate's coverage hole closed
with it), the resetToken `@unique` index, the smoke trap's `GATE_PID`
init, the hero's `"use client"` retirement (live-verified), the
S19-9 mount residual, the toast focus-pause pair, the limiter
uid/ip namespace split, the envelope belt-and-braces (two bare
CSPRNG calls), the generator's bank cap, the iridescence
context-lost guard, the comment-truth batch (five sites), and the
vitest `skills/**` exclusion.

**Verified:** unit **571/571** (37 files) · e2e **57/57** (9 specs) ·
smoke 15/15 · census MATCH · badge 628 · captures 47/48 PIL-verified
· the cured surfaces re-verified live on the dev server · six docs +
SKILL v1.16.0 in lockstep. **Deferred:** the honest register recorded
in the plan (the per-account login lockout, the landing pricing/
contact dedup, and seven smaller postures — each with its reason).
