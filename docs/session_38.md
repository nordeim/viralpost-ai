# Session 38 — The requireSession Transient Arm + The Lineage-Note Refs + The Provenance-Count Truth + The Comment-Truth Batch (2026-11-12)

The round opened on the shipped tree (`30bdec6` — session-37's commit;
the owner's narration commit `8b39add` followed, carrying this file as
the round-37 narration — replaced now by this round's formal log). The
core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.33.0),
then the session-37 set (session_37.md, the session-37 plan, worklog
Task 37, the owner narration). This round is session 38. Baseline gate
GREEN at the documented counts (lint 0/0 · tsc 0 · unit 671/671, 39
files · build with the button-cursor rule in the emitted sheet · smoke
16/16 · e2e 65/65, 9 specs · census MATCH); the standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root; the vitest + playwright suites
in place and current; the sitemap/robots/manifest/OG family; `skills/`
excluded from every gate; the committed `.env.example` matching the
six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/3I · AUDIT-2: 0C/0H/0M/1L/4I · AUDIT-3:
0C/0H/4L/2I** — combined **0 Critical / 0 High / 0 Medium / 6 Low /
9 Info**. The session-37 diff itself verified correct and complete on
all three passes (the six-route adoption byte-verified, the reset
funnel's wire byte-identical through the helper, the inner-catch
chains' Promise semantics correct in all four cases, the lineage notes
present, the force-static pin real, every count claim live-verified —
671/39/65/16/736 all exact). AUDIT-1 caught the requireSession seam's
missing transient arm (the round's one code coherence gap); AUDIT-2
caught the login-card lineage note's line-ref drift; AUDIT-3 caught
the "nine provenance sites" miscount, the six-site both-land tail, the
auth.setup limiter summary, and the utils.test claim site.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, on the session-35/36/37 instrument
lessons applied from the start (`set viewport` + innerWidth confirms;
nav-anchored selectors calibrated against the reference's actual DOM —
no `<header>`, the bar is `<nav>`, the panel a nav div carrying
`md:hidden` + `overflow-hidden`). **ALL FACES MATCH, NO DRIFT — the
eleventh consecutive fully-clean walk.** The mobile menu works as
expected (the user's standing concern): open at a confirmed 390×844,
the panel display block + max-height none + overflow hidden, the five
links + the Gumroad pill byte-identical (classes, hrefs, cursor
pointer — the S36-1 cure holding), the hamburger + the login submit
pointer both sides. The escape-close and focus-visible faces remain
the documented supersets (F11-11 — the reference's panel stays open on
Escape, re-confirmed; S15-8). The desktop nav 6|6 byte-identical; the
five-route head census byte-identical modulo origin; sitemap 4 URLs
both; robots byte-identical modulo origin; the generator probe
symmetrically disabled/not-allowed; the login round-trip both landing
the landing (R `/Home`, its duplicate-of-`/` route; L `/` — the
documented 308 deviation). One instrument note on the record: the
reference's open panel carries a `bg-slate-900/98` class ours does
not — probed both sides, the class is DEAD IN THE REFERENCE'S OWN
BUILD (the non-standard /98 opacity modifier is never generated;
computed background `rgba(0,0,0,0)` both sides) — observably
identical, the computed-style doctrine governs (the S35-1 dead-/98
lesson surfacing on the reference's side of the fence).

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S38-1 (LOW, AUDIT-1 A1)** — the requireSession transient arm: the
  S37-2 hoist adopted the classifier in the six routes + the reset
  funnel, but the shared seam's own catch (its `getSessionUser()`
  findUnique is "the one DB call EVERY protected route makes") still
  blanket-caught to `ERR.INTERNAL()` — logout surfaces the seam's
  envelope, so a P2024/P2028 on logout answered 500 INTERNAL while
  the identical failure on `/api/auth/me` answered 503 UNAVAILABLE
  (the exact two-incoherent-envelopes genus S37-2 closed, surviving
  at the seam). The catch now carries the arm — the shared
  `fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503)` ahead of the
  residual — making every protected route coherent by construction;
  generate's documented S17-3 discard of the gate response is
  unchanged; the api.ts comment tells the whole truth now (the seam
  included, the discard noted). +1 pin RED-first (the seam adoption
  arm in api-robustness, the S37-2b family form); the arm-removal
  battery on record (the arm stripped → exactly the S38-1 pin RED
  while the six-route adoption pin and the classifier spec stay
  GREEN — the ownership separation, one face per pin).
- **S38-2 (LOW, AUDIT-2 A2-1)** — the login-card lineage-note refs:
  the S37-3 note's five line references were each off by +6 against
  the shipped file (measured against a shorter draft of the note's
  own comment block). The cites are now referenced by ID with a
  one-phrase locator, not line numbers — the lesson demonstrated
  in-round: the cure's own first edit (re-pointing the refs) grew the
  note block and re-drifted them +3 before the ID form landed. Line
  refs drift with every edit above them; IDs don't.
- **S38-3 (LOW, AUDIT-3 A3-1 + the standing re-anchor)** — the
  provenance-count truth: the session-37 records claimed "the nine
  provenance sites re-anchored to 1..37" — the live census finds
  exactly EIGHT `docs/session_1..N` range sites (the lead had counted
  toast.tsx's "sessions run 1..37" phrase, a different form invisible
  to the census). The four records re-spelled to "eight"; the eight
  sites re-anchored `1..37 → 1..38` at this round's ship (the S30-4
  convention; the census's lag invariant owns the defense — lag 0 at
  ship).
- **S38-4 (LOW, AUDIT-3 A3-2)** — the both-land tail: S37-7
  re-spelled the eleven enumerated 35/36-era recordings but six
  32/33/34-era logs/plans still carried the imprecise "both land on
  `/`" phrase (the reference's post-login URL is `/Home`, its
  duplicate-of-`/` route; ours `/` via the documented 308 deviation).
  The six remaining sites re-spelled to the precise form; the three
  "at all eleven sites" action narrations scoped to "the eleven
  enumerated 35/36-era sites (the six 32/33/34-era recordings
  re-spelled session-38, S38-4)".
- **S38-5 (LOW, AUDIT-3 A3-3)** — the limiter summary completion:
  auth.setup.ts's parallel comment (the third summary site, missed by
  the S36-6c sweep) now lists all six fifteen-minute buckets —
  forgot 10 / reset 10 joined.
- **S38-6 (LOW, AUDIT-3 A3-4)** — the utils-claim re-spell: "utils.ts
  was the only PURE src/lib module with zero test references" —
  db.ts (the impure Prisma client singleton) holds the documented
  exemption, named at the claim's own site.
- **S38-7 (INFO→cure, the hygiene batch, seven genera)** — (a) the
  census.ts in-main disconnect retirement (the S37-1 chain's
  inner-caught finally owns teardown exclusively — one idiom per
  family; `$disconnect` idempotent, behavior identical); (b) the
  signup route's import member order (the family form — `fail` among
  the leading members); (c) the toast.tsx range claim re-spelled to
  the census-legible form (`this repo's own ledger is
  docs/session_1..38.md` — the docs-counts lag invariant now owns
  the claim; it ages with the census, not by hand); (d) the corpus
  register's basis label completed at the five live-truth sites
  ("docs/tests/scripts/prisma/root" — scripts/ and prisma/ were
  always in the counted basis but unnamed); (e) the reveal.tsx
  contract re-word ("mount-time constants — computed delays ride
  keyed instances"; the first draft's "remount-via-key" hyphenation
  tripped the design-tokens prose-safe census as a phantom `via-key`
  utility — the S28-4 doctrine catching its own cure, re-spelled
  "keyed-remount"); (f) the S37-4 force-static pin comment-stripped
  (the house idiom — a commented-out export can no longer satisfy
  it); (g) the login-card note's Session-163 enumeration extension
  (the six digma ADR-014/S46-port cites named; each already carries
  its inline attribution).

**Accepted register (this round's tail, with reasons):** the
exact-source-shape GL-release regexes (AUDIT-3 A3-6 — the accepted
source-pin doctrine, the batteries own the defense); the generate
route's guard-envelope discard (AUDIT-1 A2 — the documented S17-3
degradation posture, unchanged by S38-1 and now noted in the api.ts
comment); the standing register carried forward unchanged (the
prefers-reduced-motion live-toggle gap, the JSON-LD/og:locale/
twitter:site family, the `.env.local` unmodeled face, the signup
admin-bootstrap TOCTOU, the scryptSync posture, the login photoUrl
asymmetry, the in-app delivery default, the footer heading skip, the
S26-3 breakpoint-crossing posture, the ParticleText sr-only
duplication, the Reveal SSR opacity, the worklog's structural
inconsistencies).

## The count re-anchor

UNIT 671 → **672** (+1 the S38-1a seam adoption arm in
api-robustness), SUITES 39 unchanged, E2E 65 unchanged, SMOKE 16
unchanged, badge 736 → **737**. Constants re-anchored FIRST; the
census walked the doc sites RED→GREEN (the PAD §12 rows re-anchored
to the live `wc -l`: api.ts 289→303, globals.css 251→253; the eight
provenance sites re-anchored to 1..38 — plus toast.tsx's range claim
now census-legible as the ninth site, owned automatically — lag 0 at
ship).

## Verified

- The full gate on the exact commit tree (below)
- The S38-1 mutation battery on record (the arm stripped → exactly
  the seam adoption pin RED, the six-route pin + the classifier spec
  GREEN; restored → GREEN)
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 83/84 on the dev server (the owner-instructed posture, the
  session-29..37 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero, PIL-verified
- Docs lockstep: README (badge 737, the session-38 row, the gate
  line); AGENTS (counts, the plans map's thirty-eighth round); CLAUDE
  (counts, the 503 line's seam scoping); PAD (§8.1, §12 rows, Last
  Updated); SKILL v1.33.0 → v1.34.0 (frontmatter, §0.5 1..38,
  Appendix A's session-38 row, Appendix B's header + body, the
  pre-ship checklist); worklog Task 38; this session log; the plan's
  post-execution record

**Gate at the session-38 ship: lint 0/0 · tsc 0 · unit 672/672 (39
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
