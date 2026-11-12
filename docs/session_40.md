# Session 40 — The Boot-Gate Six-Knob Case Arm + The Reveal Count Truth + The Dead-Surface Retirement + The Comment-Truth Batch (2026-11-13)

The round opened on the shipped tree (`220f29f` — session-39's commit;
the owner's narration commit `4270673` followed, carrying this file as
the round-39 narration — replaced now by this round's formal log). The
core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.35.0),
then the session-39 set (session_39.md, the session-39 plan, worklog
Task 39, the owner narration). This round is session 40. Baseline gate
GREEN at the documented counts (lint 0/0 · tsc 0 · unit 675/675, 40
files · build with the button-cursor rule in the emitted sheet · smoke
16/16 · e2e 65/65, 9 specs · census MATCH); the standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root; the vitest + playwright suites
in place and current; the sitemap/robots/manifest/OG family; `skills/`
excluded from every gate; the committed `.env.example` matching the
six-knob contract).

The web-application skill + the skills catalog internalized; tdd,
clone-app-pat-pro, and the agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout. The neo-crm
reference repo re-checked for pattern currency per the standing
instruction (its latest sessions 215–217 are the semantic-prose census
disciplines this repo already adopted at session 12 — patterns
current, nothing new to adopt).

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/6I · AUDIT-2: 0C/0H/0M/5L/4I · AUDIT-3:
0C/0H/0M/2L/3I** — combined **0 Critical / 0 High / 0 Medium / 10 Low
/ 13 Info**. The session-39 diff itself verified correct and complete
on all three passes (the typed casts, the case arm with its
load-bearing exclusions, the footer wiring, the prop retirements, the
re-anchors — all re-confirmed; the residuals the round left are the
Lows below).

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`, on the session-35..39 instrument lessons
applied from the start (`set viewport` + innerWidth confirms,
nav-anchored selectors calibrated against the reference's actual DOM —
no `<header>`, the bar is `<nav>`, the panel a nav div carrying
`md:hidden` + `overflow-hidden`). **ALL FACES MATCH, NO DRIFT — the
thirteenth consecutive fully-clean walk.** The mobile menu works as
expected (the owner's standing concern): open at a confirmed 390×844,
the panel anchors enumerated live on the reference and byte-verified
against ours — the four nav links (Home /Tool /Pricing /Contact; the
active link's teal `text-teal-400` face, the siblings'
`text-slate-300 hover:text-white`) + the Gumroad pill ("Upgrade to Pro
– $19", the same templixco href), classes, hrefs, texts, cursor
pointer all matching; panel mechanics identical both sides (display
block + max-height none + overflow hidden; the reference's
`bg-slate-900/98` still computing `rgba(0,0,0,0)` — dead in its own
build); the hamburger cursor pointer both sides; Escape leaves the
reference's panel open (our F11-11 superset, re-confirmed). The
desktop nav byte-identical (brand + 4 links + the Upgrade pill); the
five-route head census byte-identical modulo origin (titles,
og:title, canonicals; the unprefixed family on / and /login); sitemap
4 URLs both (identical modulo origin); robots identical modulo origin;
the generator probe symmetrically disabled/not-allowed (R 405
platform-side, L works — the documented superset); the login
round-trip both landing the landing (R `/Home`, its duplicate-of-`/`
route; L `/` — the documented 308 deviation), the clone session
verified live via /api/auth/me.

## The cures (TDD — every pin RED first or battery-planted, the mutation batteries per the house doctrine)

- **S40-1 (LOW, AUDIT-1 A1-2)** — the boot-gate six-knob case arm:
  the S39-13 arm matched only the viralpost_/neo_ prefixes, so a
  case-variant `AUTH_SECRET`/`NEXT_PUBLIC_SITE_URL`/`DATABASE_URL`
  spelling was invisible to every arm. The sharpest face was
  DATABASE_URL: zero signal in any mode — the seam silently falls to
  the `.env` value while the operator believes they configured the
  environment's knob. The arm now covers the whole six-knob contract
  via `SIX_KNOB_NAMES` (the three VIRALPOST_* + the other three); the
  `k !== key` guard is the exact-case exclusion on the name-set face.
  +3 RED-first pins (auth_secret, next_public_site_url, database_url
  case variants, each warning exactly once and mapping the canonical
  "Set X instead"); the strip battery on record — with the matcher
  stripped, exactly the three pins RED and the exact-case family +
  the S39-13a pins GREEN through it (the ownership separation).
- **S40-2 (LOW, AUDIT-1 A1-3)** — the NEO_ branch's canonical
  mapping now uppercases the tail: `NEO_Proxy_Hops` used to fail
  `KNOWN_VIRALPOST_VARS.has(mapped)` and land in the dead-end "no
  knob maps" branch instead of the actionable "Set
  VIRALPOST_PROXY_HOPS instead". +1 RED-first pin; the
  uppercase-strip battery on record (exactly the one pin RED).
- **S40-11 (INFO→cure, AUDIT-3 I1)** — the PAD §4.1 schema census:
  the model face joins the disk family (the one count family that
  lacked a census — how the photoUrl omission survived a green gate
  for the entire repo's life). The census extracts each model's field
  names from prisma/schema.prisma and demands each appears in PAD
  §4.1's mermaid block. +1 arm placed RED-first (photoUrl ∈ schema
  but ∉ PAD); the row-removal battery on record — with the in-round
  lesson that a planted defect must remove the substring entirely:
  the first sed form kept "photoUrl" inside the replacement string
  and the census rightly stayed GREEN; the correctly-planted form
  (the whole row removed) REDs naming the field. PAD §4.1 gained the
  `photoUrl` row (S40-9).
- **S40-13 (INFO→cure, AUDIT-1 A1-6)** — the generator dash-run
  guard: a `----` token survived `keywordsOf` as a "keyword" (the
  char class keeps `-`) and `toHashtag` rendered it as a BARE `#` on
  the hashtag line — one that `extractHashtags` would not count, so
  the window helper and hashtagCount disagreed on a pathological
  idea. The letter-or-digit guard in `keywordsOf`. +1 RED-first pin;
  the guard-strip battery on record (the first battery form was
  itself wrong — it stripped every token, not the guard; reverted to
  the exact pre-cure form and re-proven).
- **S40-3 (LOW, AUDIT-1 A1-1)** — the resend-side accepted race
  documented beside the update (the undocumented mirror of verify's
  S39-8): a concurrent verify-clear between resend's findUnique and
  its unconditional update re-writes a fresh verificationCodeHash
  onto a row that no longer owes verification. Accepted for the
  S39-8 reason — a conditional WHERE would drop a legitimate re-arm
  for an account whose code was valid at read time.
- **S40-4 (LOW, AUDIT-2 L1)** — the reveal count truth: "all 19" →
  17 at all three carrying sites (reveal.tsx's S39-10 docblock,
  session_39.md, the session-39 plan's S39-10 row) — generator-card
  ×2, hero ×1, sections ×14, one sections hit a prose mention; the
  count-truth genus shipped inside the count-truth commit itself
  (the S39-4 precedent, one round deeper).
- **S40-5 (LOW, AUDIT-2 L2)** — the dead-prop retirement the
  session-39 round stopped one census short of: Logo's `className`,
  Iridescence's `className`, and PricingSection's `children` — all
  zero-consumer (the S39-10 doctrine); static classes stay
  byte-identical, the dead cn imports gone with the merge arms.
- **S40-6 (LOW, AUDIT-2 L3)** — the login-reset dead vocabulary:
  `LOGIN_VERIFY_LAYOUT.viewColumn`/`viewStack` (dead in every commit
  — the verify view rides the reset family's column/stack, values
  identical) and `LOGIN_SIGNUP_LAYOUT.viewColumn` (unwired in src,
  read only by its pin). Retired; login-views.test.ts:199 re-pinned
  in place (the viewColumn assertion dropped, the title re-spelled);
  the docblock re-spelled to the wired truth.
- **S40-7 (LOW, AUDIT-2 L4)** — route-title's mechanism comment:
  NotFoundBody sets no title anywhere in its history; the catch-all
  segment LAYOUT's generateMetadata derives it (ADR-006). Both files
  now describe the one mechanism the same way.
- **S40-8 (LOW, AUDIT-2 L5)** — the focus-ring comments re-spelled
  to the signup sibling's accurate form: the reference's own
  slate-400 ring computes ≈2.57:1 (under the WCAG 1.4.11 3:1 floor);
  ours rides slate-600 ≈7.5:1 — the S25-3 superset. The border goes
  slate-400, the ring slate-600.
- **S40-10 (LOW, AUDIT-3 L2)** — the README + PAD §3.2 scripts/ tree
  lines extended to all five scripts (e2e-prune, e2e-contact-readback
  joined).
- **S40-12 (INFO→cure, AUDIT-1 A1-5)** — the import hygiene: signup's
  Prisma import moved to the sibling position (first behind a blank
  line); the crypto specifier normalized to `node:crypto` everywhere
  (auth.ts, generator.ts, generate/route.ts were the bare-`"crypto"`
  stragglers).
- **S40-14 (INFO→cure, AUDIT-1 A1-7)** — the OTP console logs derive
  the TTL phrase from `VERIFICATION_TTL_MS` (the literal "15" was
  hand-coupled to the constant).

**Accepted register (this round's tail, with reasons):** the dual 503
code strings `UNAVAILABLE` vs health's `SERVICE_UNAVAILABLE` (pinned
deliberate, both in the behavioral spec); the anchor CTAs' UA-default
focus outline (parity — the reference ships the same; WCAG 2.4.7/
1.4.11 pass via the UA rings, no global outline reset exists); the
negative quota text on hand-tampered storage (unreachable through the
UI — the counter guards limitReached at entry; no paywall bypass); the
footer h4 skip (parity doctrine, on the standing register); the
cross-breakpoint history-nav focus edge (the focus-on-body fallback
is the navigation default); the rate-limit prose hand-maintained
across four sites (all nine values verified against the route code
this round; the `rg "<old number>"` doctrine is the standing
backstop); the provenance range's designed lag-1 window (the owner's
narration commit; cured by this round's standard re-anchor — the
S30-4 convention, lag 0 at ship); the standing register carried
forward unchanged.

## The count re-anchor

UNIT 675 → **681** (+3 the S40-1a case-variant pins, +1 the S40-2a
mixed-tail pin in boot-env; +1 the S40-11a schema census in
docs-counts; +1 the S40-13a dash-run pin in generator), SUITES 40
unchanged, E2E 65 unchanged, SMOKE 16 unchanged, badge 740 → **746**.
Constants re-anchored FIRST; the census walked the doc sites
RED→GREEN (PAD §12: generator 457→467, route-title 56→62, auth
193→196, iridescence 269→273; the ten provenance sites + toast's
owned tenth re-anchored to 1..40 — lag 0 at ship).

## Verified

- The full gate on the exact commit tree (below)
- The mutation batteries on record: S40-1 (the six-knob matcher
  stripped → exactly the three pins RED, the exact-case family +
  S39-13a GREEN), S40-2 (the uppercase stripped → exactly the one
  pin RED), S40-11 (the photoUrl row removed → the census REDs naming
  the field), S40-13 (the guard stripped → exactly the dash pin RED)
- The in-round battery lessons: the S40-11 planted defect must remove
  the substring entirely (the first sed form kept "photoUrl" inside
  the replacement and the census rightly stayed GREEN); the S40-13
  battery's first form stripped every token instead of the guard —
  reverted to the exact pre-cure form and re-proven
- The parity walk post-cure: all faces hold, the superset faces
  adjudicated as documented — no drift
- Captures 87/88 on the dev server (the owner-instructed posture, the
  session-29..39 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero at 1280×800, PIL-verified
- Docs lockstep: README (badge 746, the 40/681 rows, the session-40
  row, the gate line, the five-script tree line); AGENTS (counts, the
  plans map's fortieth round); CLAUDE (counts); PAD (§4.1 photoUrl,
  §3.2 scripts line, §8.1 40/681, §8.3 681/65/16, §12 rows); SKILL
  v1.35.0 → v1.36.0 (frontmatter, §0.5 1..40, Appendix A's
  session-40 row, Appendix B's header + counts, the pre-ship
  checklist); worklog Task 40; this session log; the plan's
  post-execution record

**Gate at the session-40 ship: lint 0/0 · tsc 0 · unit 681/681 (40
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**
