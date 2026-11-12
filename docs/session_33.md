# Session 33 — The Windows-Absolute File Refs + The Prose-Safe Sweep Completion + The Donor-Ledger Markers + The Signup H1 + The Hygiene Batch (2026-11-12)

The round opened on the pulled tree (`02c9735` — the owner's session log
update holding the session-32 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.28.0), then the session-32 set (session_32.md, the session-32 plan,
worklog Task 32, the owner's session_33.md narration). This round is
session 33. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 649/649, 38 files · build · smoke 16/16 · e2e 65/65, 9 specs ·
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
**AUDIT-1: 0C/0H/0M/2L/1I · AUDIT-2: 0C/0H/0M/1L/1I · AUDIT-3:
0C/0H/0M/1L/2I** — combined **0 Critical / 0 High / 0 Medium / 4 Low /
4 Info**. AUDIT-1 live-probed the Windows misclassification through the
real seam (a drive-letter `file:` value re-anchoring into
`<repo>/prisma/C:\…` junk); AUDIT-2 per-file-compiled the stylesheet
with the installed @tailwindcss/postcss 4.3.3, attributing four dead
rules to src comments (~1.5 KB); AUDIT-3 caught the donor-ledger
collision (bare `session-34/35/36` cites in tests/db-path.test.ts
against this repo's imminent sessions 34/35/36). The lead merged
AUDIT-1's A1-L1 with AUDIT-2's A2-1 (the same doctrine face — the
incomplete prose-safe sweep) and took every finding into the working
register (all cured — S33-1..S33-7); the accepted register carried
forward unchanged.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`: the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (our aria family the documented
superset), the open panel computed transparent both sides at scrollY=0
(`max-height: none`, display block, the five links + the Gumroad pill
"Upgrade to Pro – $19" byte-identical), the bar `bg-transparent` with
the menu open, the scrolled-bar class family byte-identical with the
computed background the same color in its two spellings (our oklab form
= the reference's `rgba(15, 23, 42, 0.95)`), the desktop nav family
byte-identical modulo the aria-label superset, the five-route head
census — **NO DRIFT** (titles, og:title, og:description, meta
description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; the icon links the documented
file-convention posture), sitemap.xml + robots.txt identical modulo
origin (the walk script's first-occurrence-only `.replace` artifact
ruled out by the all-occurrence normalized comparison), the login
round-trip live on both sides (both land on `/`; the reference's
localStorage-token posture vs our httpOnly `viralpost_session` cookie
the documented superset). The generator walk-probe returned null on
BOTH sides symmetrically — a probe selector artifact (the clone's
generator round-trip is proven green by the e2e generator spec and
smoke leg 11; the reference's is the documented 402-dead face).
**NO DRIFT FOUND — the seventh consecutive fully-clean walk.** The
mobile menu works as expected (the full functional battery — open,
navigate+close, Escape close, history close + focus return —
e2e-pinned 65/65). The standing sitemap/SEO ask verified
contract-complete.

## The cures (TDD — every pin RED first, mutation battery per the house doctrine)

- **S33-1 (LOW)** — the prose-safe sweep completion: the S28-4/S31-5a/
  S32-4 doctrine, finished. Four MORE retired utility tokens were
  still spelled verbatim in src comments, each emitting a never-matched
  rule into the production CSS: the v3 6px vertical-gap space-y step
  (login-reset.ts + page-layout.ts — the live sibling is the
  `[&>*+*]:mt-1.5` mechanism), the bare 420px max-width cap (toast.tsx
  — the live form is the md:-prefixed one), the bare z-60 layer token
  ((site)/layout.tsx ×2 — the live form is the focus-gated one), and
  the bare backdrop-blur token (navbar.tsx — the live form is the -xl
  family). All six comment sites re-spelled prose-safe; per-file
  recompile probes CLEAN (the S31-5a/S32-4 method); the probe's
  vacuity PROVEN on a synthetic pre-cure source (all four regexes fire
  on the old spellings). The NEW dead-token comment census (the S21-5
  BAN genus) holds the four spellings out of src — its regexes pass
  the live prefixed/suffixed forms by construction (validated against
  the live classNames before landing). The tests/.md faces of the same
  tokens stay in the accepted register (the test-pin-literal residual;
  this census owns the src/ face).
- **S33-2 (LOW)** — the Windows-absolute file refs: the db-path seam's
  absoluteness tests were POSIX-only (`startsWith("/")`), so a
  drive-letter (`file:C:\db\custom.db`, both slash spellings) or UNC
  (`file:\\server\share\custom.db`) ref was misclassified as RELATIVE
  and re-anchored into `<repo>/prisma/C:\…` junk (live-probed pre-cure
  through the real seam) — the S30/S31/S32 wrong-DB genus on the one
  platform the seam didn't model. No live caller on this Linux
  deployment (DEPLOYMENT.md documents POSIX absolutes); the documented
  production form on a Windows host. The cure is ONE shared
  `isAbsoluteFileRef` predicate — a literal drive-letter/UNC regex,
  NOT the platform-dependent `path.isAbsolute` (the seam recognizes
  BOTH platform forms on ANY host) — consumed by BOTH
  `resolveDatabaseUrl` and `isRelativeFileUrl`; the standalone launch
  arm inherits it through `isRelativeFileUrl`. +3 pins (the
  drive-letter resolve pair incl. the forward-slash spelling + the
  launch-arm leg), all RED-first; the mutation battery on record (both
  predicates reverted to POSIX-only → exactly the 3 pins RED;
  restored → GREEN). No existing live ref shape matches the new arms
  (verified against the `../db/*`, `:memory:`, and POSIX-absolute
  families).
- **S33-3 (LOW)** — the donor-ledger markers: the standalone-launch
  describe's bare `session-34`/`session-35`/`session-36` cites collide
  with THIS repo's imminent sessions 34/35/36 (the exact genus §0.5
  exists to prevent — the S31-4 auth.ts precedent). The describe title
  and the session-35 it-title carry their "(a donor-ledger number)"
  markers; a boot-env-style lineage note joins the describe; the two
  SRC sites the audit's scope check surfaced (db-path's STANDALONE
  LAUNCH RECOVERY header + health's S36-P5 comment) carry theirs; and
  §0.5's donor enumeration gains 34/35/36. The historical-record cites
  (worklog rows, session logs, plan files) are immutable history — the
  extended enumeration is their resolver.
- **S33-4 (INFO→cure)** — the composed `:memory:` pin: the dev-shape
  composition (the process env carrying bun's absolutization of a cwd
  `.env`'s `file::memory:`) had both component behaviors individually
  pinned but the composition unpinned. +1 pin, GREEN on arrival (a
  coverage-gap pin — the battery plants the defect instead: the
  signature-arm routing broken → the pin REDs; the co-pinned faces
  documented in the pin's comment per the N12-2 doctrine).
- **S33-5 (INFO→cure)** — the signup sr-only h1: `/signup` is the
  superset route the reference 404s; its only heading was the
  reference's own swap-view h2 (parity, kept). An sr-only h1 ("Sign
  up", echoing the page title "Sign up | ViralPost AI") rides above it
  with zero visual change — the aria-superset family's invisible form.
  The /login in-place swap views are untouched (the reference's own
  DOM). +1 source pin; the battery on record (the h1 removed → exactly
  the pin REDs).
- **S33-6 (INFO→cure)** — the smoke trap extension: the S19-17/S20-3
  trap family's three uncovered paths — the push/seed log (leg 00's
  fail path) and the 429 leg's body/headers (leg 13's fail path) leaked
  on failure exits. The three vars join the born-empty block and the
  EXIT trap's `rm -f` list (`rm -f ""` verified to exit 0); the leg
  count unchanged (16).
- **S33-7 (INFO→cure)** — the README me-row truth fix: the API table
  labeled `/api/auth/me` "Auth: session" while the route is
  public-by-design (`data:null` when logged out, never 401 — smoke leg
  12 and session.spec both rely on the face). The row now reads
  "public (session-reported)" — the "public (IP-limited)" precedent's
  qualified form.

## The count re-anchor

UNIT 649 → **655** (+3 the S33-2 pins, +1 the S33-4 pin, +1 the S33-5
pin, +1 the S33-1 census), E2E 65 unchanged (no e2e legs this round),
SMOKE 16 unchanged (the S33-6 trap extension is in-place), SUITES 38
unchanged, badge 714 → **720**. Constants re-anchored FIRST; the census
then walked the doc sites GREEN in one pass (9 transient REDs between
the constants edit and the walk — the designed census behavior). The
PAD §12 rows re-anchored to the live `wc -l`: db-path.ts 308 → 333,
smoke-test.sh 246 → 258.

## Verified

- The full gate on the exact commit tree (below)
- Captures 73/74 on the dev server (the owner-instructed posture, the
  session-29/30/31/32 precedent): the mobile-menu open clean-walk at
  390×844 (functionally verified open — display block, the five links
  + the Gumroad pill, aria-expanded true) + the landing hero,
  PIL-verified
- Docs lockstep: README (the session-33 row, the gate line, badge 720,
  the counts, the me-row); AGENTS (counts, the plans map's
  thirty-third round); CLAUDE (counts); PAD (§8.1 table, §12 rows, the
  counts); SKILL v1.28.0 → v1.29.0 (frontmatter, §0.5's range 1..33 +
  the donor enumeration, Appendix A's session-33 row, Appendix B, the
  pre-ship checklist counts); the five provenance sites re-anchored to
  1..33; worklog Task 33; this session log; the plan's post-execution
  record

**Gate at the session-33 ship: lint 0/0 · tsc 0 · unit 655/655 (38
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**

**Deferred (accepted register, with reasons):** the bun-absolutization
causal model's non-reproduction on this sandbox's bun 1.3.14 (re-verify
on the deployment bun before any rewording); the natural-English
prose-collision dead rules (~150 B/rule from ordinary words — the
inherent cost of v4's comment scanning); the test-pin literal faces
(tests' own comments spelling the banned forms — the standing tests/.md
residual family; the src/ face IS cured and now census-held); the
standing accepted register carried forward (the in-app-delivery default
flip — the owner-level deferral; the me-route unthrottled read; the
36px touch targets; the cross-tab quota staleness; the formatting
nits; the signup admin-bootstrap race; the Tailwind .md-scanner
residual).
