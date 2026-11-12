# Session 32 — The Launch-DB Trim + The Smoke 429 Leg + The Strengthened Session Arms + The Prose-Safe Batch + The E2E Superset (2026-11-12)

The round opened on the pulled tree (`60259ca` — the owner's session log
update holding the session-31 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.27.0), then the session-31 set (session_31.md, the session-31 plan,
worklog Task 31, the owner's session_32.md narration). This round is
session 32. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 648/648, 38 files · build · smoke 15/15 · e2e 65/65, 9 specs ·
census MATCH); the standing asks re-verified up front (the `.env`
`DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo
root — the seam re-anchors the ambient shell override to
`<repo>/db/custom.db`; the vitest + playwright suites in place and
current — the standing "add the test suites via the config files" ask
has been fully realized since the earlier rounds; the
sitemap/robots/manifest/OG family; `skills/` excluded from every gate;
the committed `.env.example` matching the six-knob contract). neo-crm
re-checked at HEAD `b3d0fbe` — UNCHANGED since session 12; the recorded
decisions stand.

The web-application skill + the skills catalog internalized (the family
skill every prior round internalized); tdd, clone-app-pat-pro, and the
agent-browser doctrine (computed styles as ground truth, never
eyeballs) applied throughout.

## The audit

Three parallel dispatched subagents (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/1I · AUDIT-2: 0C/0H/0M/2L/3I · AUDIT-3:
0C/0H/0M/0L/2I** — combined **0 Critical / 0 High / 0 Medium / 5 Low /
6 Info**. AUDIT-2 compiled the real stylesheet with the installed
@tailwindcss/postcss 4.3.3 using per-file recompile probes
(`@import "tailwindcss" source(none); @source <file>`) that attribute
every dead CSS rule to its demand source — all eight documented
Tailwind v4 traps verified mitigated in the COMPILED output (zero
`(hover: hover)` queries, literal-hex `@theme`, the re-pinned
`--shadow-sm`/`--blur-sm`, no banned gradient pair, zero dead rules
emitted from src/navbar). The lead's adjudication took four Lows plus
four Info items into the working register (all cured — S32-1..S32-8);
the rest moved to the accepted register with reasons.

## The parity walk

Live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`: the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (the reference still ships the
bare button; our aria family the documented superset), the open panel
computed transparent both sides at scrollY=0 (`max-height: none`,
display block, the four links + the Gumroad pill "Upgrade to Pro – $19"
byte-identical), the bar `bg-transparent` with the menu open, the
scrolled-bar class family byte-identical with the computed background
the same color in its two spellings (our oklab form = the reference's
`rgba(15, 23, 42, 0.95)`), the desktop nav family byte-identical, the
five-route head census — **NO DRIFT** (titles, og:title, og:description,
meta description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; the icon links the documented
file-convention posture — the reference ships a supabase-hosted
logo.png, ours the `icon.png`/`apple-icon.png` conventions), sitemap.xml
+ robots.txt identical modulo origin (curl-diffed both directions), the
login round-trip live on both sides (both land on
the landing — the reference's URL `/Home`, its duplicate-of-`/`
route; ours `/`, the documented 308 deviation; re-spelled
session-38, S38-4; the reference's
localStorage-token posture vs our httpOnly `viralpost_session` cookie
the documented superset). **NO DRIFT FOUND — the sixth consecutive
fully-clean walk.** The mobile menu works as expected; the standing
sitemap/SEO ask verified contract-complete.

## The cures (TDD — every pin RED first, mutation battery per the house doctrine)

- **S32-1 (LOW)** — the launch-db trim: the S30-1/S31-1 trim doctrine
  extended one face deeper. The launch-recovery arm compared UNTRIMMED
  faces (`process.env.DATABASE_URL` vs `bunAbsolutized(launchEnvUrl)`,
  then `urlForRoot` with the untrimmed ref), so a whitespace-PADDED
  quoted launch `.env` value matched its own padded absolutization and
  resolved to a trailing-space filename SQLite silently creates as a
  fresh empty DB; the padded `file::memory:` shape returned the RAW
  padded form through the S27-2 pass-through. Both faces now trim at
  the top of `runtimeDatabaseUrl`. +2 pins (both RED-first); the
  mutation battery on record (both trims reverted → both pins RED;
  restored → GREEN).
- **S32-2 (LOW)** — the smoke session-arm strengthening: leg 08's grep
  carried only `ok:true`, which the logged-out `data:null` face also
  produces — a cookie-VERIFICATION regression shipped green through
  the whole ladder. The grep now carries the USER row
  (`"email":"sepnetflix2023@outlook.com"`); leg 12 asserts the logout
  200 (the S29-1 gate answers 401 for cookie-less callers).
- **S32-3 (LOW)** — the live 429 leg: the master skill's smoke-tier
  rate-limit contract (§14.3 "rate limit (429)"), restored from the
  CRM-era 11th-login shape the session-1 transform dropped. Leg 07's
  login + 10 wrong-password POSTs: the first nine answer 401, the
  tenth additional (the 11th cumulative) answers 429 with Retry-After
  + the RATE_LIMITED envelope. Broken-OPEN and broken-CLOSED both
  fail the exact code sequence. SMOKE 15 → 16; the SEO family
  renumbered to 14, the boot-gate probe to 15, the hygiene leg to 16;
  PAD's boot-gate row and next.config.ts's hygiene comment
  re-anchored in the same commit.
- **S32-4 (LOW)** — the prose-safe + comment-truth batch: login-reset's
  negative-mb-2 and slate-400-ring comment spellings and Reveal's
  zero-opacity mention re-spelled (the S28-4/S31-5a doctrine), per-file
  recompile-probe-verified CLEAN; the login-card /login "under the
  navbar" rationale corrected (no navbar renders on /login).
- **S32-5 (LOW)** — the CLAUDE hover-unwrap fix: CLAUDE.md:93 had
  stated the INVERTED mechanism ("keeps hover styles off touch
  devices"); the unwrap restores v3 bare-`:hover` semantics — hovers
  apply on touch exactly like the reference's v3-era stylesheet. A
  future agent could have "fixed" the code toward the doc and broken
  the pinned touch-hover parity.
- **S32-6 (INFO→cure)** — the history-close focus-return's first
  BEHAVIORAL pin. The battery caught TWO of its own flaws: its first
  shape was VACUOUS (focus had never left the toggle, so the arm could
  be deleted with the assertion green) — redesigned to focus a link
  INSIDE the open panel first; and the battery's rebuild lesson — the
  e2e runs against the BUILD, so a source mutation only REDs after a
  rebuild. Both on record; the final battery: arm removed from the
  build → RED; restored → GREEN.
- **S32-7 (INFO→cure)** — the head-level icon face: the SERVED head
  now asserted to carry `link[rel=icon]` + `link[rel=apple-touch-icon]`
  with the file-convention hrefs (a `metadata.icons` declaration would
  REPLACE them). The battery: `metadata.icons` planted → RED (the
  links replaced); restored → GREEN. The S29-5/S31-7a rendered-DOM
  genus, its last open face.
- **S32-8 (INFO→cure)** — the rate-limit fixture hygiene: the
  assertion-free env-restore it() converted to a proper afterEach
  (per-test isolation); UNIT −1 in the same commit.

## The count re-anchor

UNIT 648 → **649** (+2 the S32-1 pins, −1 the S32-8 vacuous
registration), E2E 65 unchanged (the S32-6/S32-7 folds are in-place —
the S18-2 precedent), SMOKE 15 → **16**, SUITES 38 unchanged, badge 713
→ **714**. Constants re-anchored FIRST; the census then walked the doc
sites GREEN in one pass. The PAD §12 rows re-anchored to the live
`wc -l`: db-path.ts 297 → 308, smoke-test.sh 212 → 246.

## Verified

- The full gate on the exact commit tree (below)
- Captures 71/72 on the dev server (the owner-instructed posture, the
  session-29/30/31 precedent): the mobile-menu open clean-walk at
  390×844 + the landing hero, PIL-verified
- Docs lockstep: README (the session-32 row, the gate line, badge 714,
  the counts); AGENTS (counts, the plans map's thirty-second round);
  CLAUDE (counts, the S32-5 line); PAD (§8.1 table, §12 rows, the
  counts); SKILL v1.27.0 → v1.28.0 (frontmatter, §0.5's range 1..32,
  Appendix A's session-32 row, Appendix B, the pre-ship checklist
  counts); the five provenance sites re-anchored to 1..32; worklog
  Task 32; this session log; the plan's post-execution record

**Gate at the session-32 ship: lint 0/0 · tsc 0 · unit 649/649 (38
files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH.**

**Deferred (accepted register, with reasons):** the bun-absolutization
causal model's non-reproduction on this sandbox's bun 1.3.14 (probed
across 7 shapes — the header's model stands, defensive under both
models; re-verify on the deployment bun before any rewording); the
natural-English prose-collision dead rules (~150 B/rule from ordinary
words — the inherent cost of v4's comment scanning); the test-pin
literal face of the S32-4 cure (the standing tests/.md residual family
— the src/ face is the app-code doctrine face and IS cured); the
standing accepted register carried forward (the in-app-delivery default
flip — the owner-level deferral; the me-route unthrottled read; the
36px touch targets; the cross-tab quota staleness; the formatting nits;
the signup admin-bootstrap race; the Tailwind .md-scanner residual).
