# Session 44 — The db-path Query-Tail Truth Cure + The Navbar Annotation Truth + The Smoke-Site & Off-List Census Batch + The Comment-Truth Tail (2026-11-13)

The round opened on the shipped tree (`622e0e8` — session-43's
commit; the owner's narration commit `d2ac93a` followed, carrying
session_44.md as the round-43 narration — replaced now by this
round's formal log). The core docs read in full (AGENTS, CLAUDE,
README, PAD, SKILL v1.39.0), then the session-43 set (session_43.md,
the session-43 plan, worklog Task 43, the owner narration). This
round is session 44. Baseline gate GREEN at the documented counts
(lint 0/0 · tsc 0 · unit 692/692, 40 files · build · smoke 16/16 ·
e2e 65/65, 9 specs · census MATCH); the standing asks re-verified up
front (the `.env` `DATABASE_URL="file:../db/custom.db"` contract with
`db/` at the repo root; the vitest + playwright suites in place and
current; the sitemap/robots/manifest/OG family verified live against
the reference in this round's walk; `skills/` excluded from every
gate; the committed `.env.example` matching the six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked for pattern currency per the standing
instruction (its latest sessions — its own 213–217 — continue the
semantic-prose census genus on its own docs, the genus this repo
adopted at session-12 and polices as its comment-truth batches;
patterns current, nothing new to adopt).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead: a FRESH
live engine probe on the repo's own @prisma/client 6.19.3 that
falsified session-43's own S43-6 premise (param-carrying file: URLs
open the CLEAN file — params are connector config, never filename
characters — while only #fragments bake junk filenames), a full
state-graph trace of the navbar's menuWasOpen writes (the S43-2
annotation's consequence clause false — the transitions are a strict
subset of pathname's), and mechanical re-counts of the three
smoke-leg prose sites + the 27-entry eslint off-list):
**AUDIT-1: 0C/0H/1M/2L/3I · AUDIT-2: 0C/0H/0M/1L/1I · AUDIT-3:
0C/0H/0M/2L/2I** — combined **0 Critical / 0 High / 1 Medium / 5 Low
/ 6 Info**. The session-43 diff itself verified correct and complete
on all three passes except the S43-6 query half — this round's
claim; the residuals are pre-existing debt this round claims.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, viewport confirmed 390×844 before every
mobile probe, computed styles as ground truth. **ALL FACES MATCH, NO
DRIFT — the seventeenth consecutive fully-clean walk.** The mobile
menu works as expected (the owner's standing concern): the reference
panel enumerated live (the four nav links — Home's teal
`text-teal-400` rgb(45,212,191) active face, the siblings'
`text-slate-300` rgb(203,213,225) — plus the Gumroad pill "Upgrade
to Pro – $19", the same templixco href) and byte-verified against
ours (identical hrefs, colors, 14px/500-600 typography); panel
mechanics identical both sides (display block + max-height none, the
transparent-over-hero bg chain); the hamburger cursor pointer both
sides (the Tailwind v4 standing concern holding); the reference's
hamburger still ships NO aria family (our expanded
aria-expanded/controls/label is the documented superset); Escape
leaves the reference's panel open (our F11-11 superset — ours
verified closing: panel display none + focus returned to the
toggle). The desktop nav byte-identical (brand + 4 links + the
Upgrade pill, teal active face); the five-route head census
identical modulo origin; sitemap 4 URLs both (the
changefreq/priority format byte-parity, re-verified live both
sides); robots identical modulo origin (allow-all + the Sitemap
line); the generator probe symmetrically dead/live (R: no generation
lands — zero hashtags after the probe, the 402-dead posture; L
works — 5 hashtags + the copy button, the documented superset); the
login round-trip both landing the landing (R `/Home`, its
duplicate-of-`/` route; L `/` — the documented 308 deviation), the
clone session verified live via /api/auth/me
(`sepnetflix2023@outlook.com`, role admin).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S44-1 (MEDIUM, AUDIT-1 A1)** — the db-path query-tail truth
  cure: the S43-6 strip rested on a false premise ("the `?params`
  grammar is Prisma's PostgreSQL connector's, never the SQLite
  file: connector's") — the live engine probe (the repo's own
  @prisma/client 6.19.3, reproduced by the lead after the
  subagent's probe) shows param-carrying file: URLs open the CLEAN
  file (connection_limit/socket_timeout compound, unknown params
  ignored) while only #fragments bake junk filenames (the literal
  `x.db#frag` file). The strip silently DROPPED params the engine
  honors on relative refs while the absolute pass-through arm kept
  them — the inconsistent matrix at the one-home seam — AND the
  launch-recovery arm never received any tail handling at all (its
  fragment still baked junk). The corrected contract: preserve the
  `?query` at all three consumption sites through one shared
  `decomposeFileRef` helper, strip only the `#fragment`. The
  S43-6a pin re-spelled in place (the query arms reversed on the
  engine evidence, the fragment arms keep their teeth) + the NEW
  launch-arm pin (S44-1b). Four batteries on record: the
  resolveDatabaseUrl query revert (exactly 1 RED / 41 GREEN), the
  launch query revert (1/41), the launch raw-ref fragment revert
  (1/41), the shared-helper fragment revert (3/39 — every consumer
  pin trips on the one-home helper's defect, the documented shape).
- **S44-2 (LOW, AUDIT-1 A2)** — the emptied-path guard:
  `resolveDatabaseUrl("file:?x")` / `("file:#")` answered
  `file:<repo>/prisma` — urlForRoot(root, "") joins to the prisma
  FOLDER itself, pointing the operator's Error-14 debugging at a
  directory. Now raw pass-through (the `!ref` arm's own posture).
  +1 RED-first pin; the guard-removal battery on record (exactly 1
  RED / 41 GREEN).
- **S44-3 (LOW, AUDIT-2 L1)** — the navbar annotation truth: the
  S43-2 note's consequence clause ("widening the array would re-run
  the focus arm on menu toggles it must not touch") was false —
  `setMenuWasOpen` is written only inside the pathname-change adjust
  block, so `menuWasOpen` transitions are a STRICT SUBSET of
  `pathname`'s and the widening is behaviorally inert (toggles
  mutate `open`, which the effect neither reads nor lists).
  Re-spelled to the true invariant; the PAD §11 register line
  re-anchored `:95` → `:103` (the comment re-spell shifted the
  flag; the live dry-run re-count confirms exactly 3 flags);
  navbar 265 → 268 lines (PAD §12 re-anchored).
- **S44-4 (LOW, AUDIT-3 D1)** — the smoke-site census: the three
  prose smoke-leg sites (README's quickstart `16-leg curl ladder`,
  CLAUDE's command-table cell, CLAUDE's testing-section `16 legs`)
  join the disk family — a new census arm asserts all three derive
  from the SMOKE constant (itself disk-pinned by the S28-6 arm).
  The planted-drift battery on record (README re-spelled to 15 →
  exactly the arm RED).
- **S44-5 (LOW, AUDIT-3 D2)** — the off-list census: the "27
  correctness-tier rules" count (CLAUDE's anti-patterns note + PAD
  §10.3) derives from eslint.config.mjs's `: "off"` entries on disk
  through a new census arm. The planted-28th battery on record
  (exactly the arm RED).
- **S44-6 (INFO→cure, AUDIT-3 D3)** — the XFO/CSP
  deliberate-absence note in next.config.ts: the reference's edge
  ships neither (the session-8 census); the absence is the parity
  posture, now named, with the self-hoster's proxy layer as the
  addition point.
- **S44-7 (INFO→cure, AUDIT-1 A3)** — the signup first-user-admin
  race accepted + registered: `findUnique → count → create` is not
  atomic (two concurrent first signups on a never-seeded table can
  both mint admin — live-reproduced on a scratch db); `role` is
  inert in this tree (echoed by login/me, consumed by no gate) and
  any seeded deployment already carries the admin demo user — the
  in-route comment + the PAD §11 register row spell the
  containment; the `$transaction` lift deliberately not taken.
- **S44-8 (INFO→cure, AUDIT-2 I1)** — both v3/v4 margin-direction
  mirrors re-spelled (page-layout.ts + login-reset.ts): v3's
  space-y is margin-TOP on the following child; the margin-BOTTOM
  form is exclusively v4's compilation (the old parenthetical
  mislabeled v3).

**Accepted/observed register (this round's tail, with reasons):** the
S43-1 cure verified correct and complete, with the multi-dot loopback
spellings (`localhost..`) joining the IPv6/`127.0.0.2+` family as
register items for a future loopback-extension round (the pre-S42
substring form caught multi-dot; the current dot-strip catches the
real FQDN spelling — single trailing dot — which is the form that
matters); the duplicated 6-method 404 handler bodies (the S16-2
documented deliberation — a shared module is a cosmetic refactor);
the unthrottled `/api/health` (the monitoring-probe standard; the
honest-503 posture is correct); the residual prose-only numeric sites
(the 3-flag exhaustive-deps register count, the six limiter walls,
the generator's 20/15-min wall — all live-true, re-verified this
round; the const-module hoist + census widening is the documented
future round); the standing register carried forward unchanged.

## The count re-anchor

UNIT 692 → **696** (+1 the S44-1b launch-arm tail pin in db-path; +1
the S44-2a emptied-path guard pin in db-path; +2 in docs-counts —
the S44-4a smoke-site census, the S44-5a off-list census; the S44-1a
re-spell of S43-6a is in place, +0), SUITES 40 unchanged, E2E 65
unchanged, SMOKE 16 unchanged, badge 757 → **761**. The plan
projected 696/761 and the reality census confirmed it first-pass;
constants re-anchored FIRST; the census walked the doc sites RED→GREEN
(PAD §12: db-path 362→400, navbar 265→268; PAD §11: the
exhaustive-deps register line :95 → :103, the new S44-7 row); the ten
provenance sites re-anchored to 1..44 — lag 0 at ship.

## Verified

- The full gate on the exact commit tree (below)
- The seven mutation batteries on record: S44-1 (four forms — the
  resolveDatabaseUrl query revert → exactly 1 RED / 41 GREEN, the
  launch query revert → 1/41, the launch raw-ref fragment revert →
  1/41, the shared-helper fragment revert → 3/39, every consumer
  pin), S44-2 (the guard removal → exactly 1 RED / 41 GREEN),
  S44-4a (the README smoke-site drift → exactly the census arm RED),
  S44-5a (the planted 28th off-switch → exactly the census arm RED)
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 95/96 on the dev server (the owner-instructed posture,
  the session-29..43 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 761, the 40/696 rows, the session-44
  row on the continuous table, the re-anchored footer); AGENTS
  (counts, the plans map's forty-fourth round); CLAUDE (counts); PAD
  (§8.1 40/696, §8.3 696/65/16, §11's exhaustive-deps register line
  + the new S44-7 row, §12 rows); SKILL v1.39.0 → v1.40.0
  (frontmatter, §0.5 1..44, Appendix A's session-44 row, Appendix
  B's header + counts, the pre-ship checklist); worklog Task 44;
  this session log; the plan's post-execution record

**Gate at the session-44 ship: lint 0/0 · tsc 0 · unit 696/696 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
