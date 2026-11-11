# Session 30 — The db-Path Empty-String Normalization + The Sections Dead-Import Retirement + The Docs-Truth Batch (2026-11-12)

The round opened on the pulled tree (`250a1b4` — the owner's session log
update holding the session-29 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.25.0), then the session-29 set (session_29.md, the session-29 plan,
worklog Task 29, the owner's session_30.md narration). This round is
session 30. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 641/641, 38 files · e2e 63/63 · smoke 15/15 · census MATCH);
the standing asks re-verified up front (the .env DATABASE_URL contract
with `db/` at the repo root; the vitest + playwright suites current; the
sitemap/robots/manifest/OG family fresh against the live reference;
`skills/` excluded from every gate, all pinned; the committed
`.env.example` matching the six-knob contract). neo-crm re-checked at
HEAD `b3d0fbe` — UNCHANGED since session 12; the recorded decisions
stand.

The web-application skill + the skills catalog internalized (the family
skill every prior round internalized — the repo's own
viralpost-ai_SKILL.md is its distilled project form, read in full);
tdd, clone-app-pat-pro, agent-browser, webapp-testing-journey (the
mobile-navigation Class A–H doctrine), and nextjs16-tailwind4 consulted
for the audit and the walk. Playwright (the repo's own devDependency)
drove the parity walk. Three parallel audit subagents dispatched
(AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects, AUDIT-3
SEO/configs/tests/docs) while the findings were hand-verified in source.
The audit returned **AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/0M/1L/4I
· AUDIT-3: 0C/0H/0M/2L/1I** — combined 0 Critical / 0 High / 0 Medium /
4 Low / 7 Info at the subagent reports. The lead's adjudication took
all four Lows plus two Info docs items into the working register (all
cured this round — S30-1..S30-5), moving the rest to the accepted
register with reasons (the in-app-delivery default posture — the
standing owner-level deferral; the me-route unthrottled read — the
single-node limiter posture; the 36px touch targets — the documented
class-for-class parity decision with WCAG AA's 24px floor cleared; the
cross-tab quota staleness — the documented fail-open doctrine; the two
formatting nits — noted for the next touch of either file).

The parity walk (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`) ran the mobile-menu census at 390×844 with
the full FUNCTIONAL battery: the hamburger base classes byte-identical
(`md:hidden p-2 text-slate-300` + our documented superset arms; the
reference still ships the bare button), all five mobile links + the
Gumroad pill "Upgrade to Pro – $19" byte-identical, the link-click
navigate+close, the /Tool light-page dark-panel superset
(`oklab(0.95)` + `blur(24px)` — the S22-5 arm), the Escape close with
focus return, the history-navigation close (F10-10), the open panel
computed transparent both sides at scrollY=0 (the reference's dead
`bg-slate-900/98` vs our S22-5 replication — same render), the bar
`bg-transparent` with the menu open (the S26-3 cure holds), the
scrolled-bar class family byte-identical with the computed background
the same color in its two spellings (our
`oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the reference's
`rgba(15, 23, 42, 0.95)`), the desktop nav family byte-identical (the
walk's two reported active-state deltas adjudicated as sequencing
artifacts — the reference dumped on /Home-active, the clone on
/Tool-active; the ACTIVE and INACTIVE class strings are byte-identical
across sides), the five-route head census — NO DRIFT (titles, og:title,
og:description, meta description, twitter:card byte-identical; canonical
+ og:url differ by origin only; og:image the documented D-4 self-hosted
stand-in), sitemap.xml + robots.txt identical modulo origin, and the
clone's login round-trip verified live: 200 → `router.push("/")` → the
`viralpost_session` cookie → the `/api/auth/me` envelope. **NO DRIFT
FOUND — the fourth consecutive fully-clean walk.** The Tailwind v4 trap
catalog re-verified mitigated throughout (literal-hex `@theme`, the
`@custom-variant hover` unwrap, no banned gradient pair, the shadow
re-pins — the audits + the walk).

The session-30 plan written and validated against the codebase (the
anchor set — db-path.test.ts's effectiveDatabaseUrl describe,
landing-page.test.ts's section-composition describe, the PAD §11/§12
rows, the five provenance sites, the docs-counts constants), then
executed with TDD throughout:

- **S30-1 (the db-path empty-string normalization, the round's lead
  cure)**: the pins RED first (2 its), then the cure — an empty-string
  `DATABASE_URL` was "unset" for the bun-signature re-anchor arms but
  "set" for the tail `??` chain, so a `DATABASE_URL=""` process env (the
  docker-compose/CI empty-passthrough shape) MASKED a valid `.env`
  value, and an empty `.env` line skipped the documented
  DEFAULT_DATABASE_URL fallback a missing line gets (live-probed: the
  seam answered `""`; Prisma 6.19.3 fails at first query with "You must
  provide a nonempty URL"). The one-home normalization lives in
  `effectiveDatabaseUrl` (`|| undefined` at both boundaries — the pure
  seam every consumer already routes through; the `if (envUrl && …)`
  arms and `readDatabaseUrlFromEnvAt`'s call sites unchanged). Mutation
  battery: the normalization reverted → both pins RED.
- **S30-2 (the sections dead-import retirement)**: the pin RED first,
  then the cure — the dead `import Link from "next/link"` and the bare
  `Sparkles,` lucide line (zero consumers since the session-19 file
  introduction; gate-blind: noUnusedLocals off, no-unused-vars off —
  the F12-11 genus resurfacing) retired + the dead-import census pin
  (the two-space indent anchors the CONSUMED `WandSparkles,` line apart
  from the banned bare `Sparkles,`). Mutation battery: the dead import
  re-added → RED.
- **S30-3 (the PAD §11 logout-CSRF row retirement)**: the register
  still listed the S15-5 class the S29-1 cure had already closed,
  contradicting the same commit-set's session-29 records; the row now
  records the cure + its pin (the S27-6/S28-9 precedent).
- **S30-4 (the provenance range re-anchor)**: the five
  `session_1..21.md` sites (SKILL §0.5, `.env.example`,
  `tests/boot-env.test.ts`, `tests/error-boundaries.test.ts`,
  `tests/auth-reset.test.ts`) re-anchored to `1..30` + the explicit
  donor-marker rule, resolving the S22–S29 misattribution the ≤ 21
  discriminator produced (the donor family also has sessions numbered
  22–29).
- **S30-5 (the docs/hygiene batch)**: PAD §12's "at the session-25
  ship" phrase dropped (the live-wc-lp operative claim stays); the
  db-path §12 row re-anchored 280 → 292; the SKILL §15 z-index table
  gained the skip-link `z-[60]` (focus-only) row.

The count re-anchor: UNIT 641 → 644 (+3 pins — the plan's projection
exact, confirmed by the census before any doc site was touched), SUITES
38 unchanged, E2E 63 unchanged, badge 704 → 707; the docs-counts
constants re-anchored FIRST (the session-29 lesson), the census then
walked GREEN site by site.

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
644/644 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 67/68 taken on the dev server (the
owner-instructed posture, the session-29 precedent), PIL-verified
(390×844, ~19k unique colors each): the mobile-menu open clean-walk
(functionally verified open: display block + 5 links) + the landing
monetization section (the S30-2 surface). The cured surfaces
live-verified through the walk (the login round-trip; the full
mobile-menu battery). README (the session-30 row, the gate line, the
badge 707, the counts); AGENTS (counts, the plans map's thirtieth
round); CLAUDE (counts); PAD (the §11 row, the §12 phrase + the db-path
row, the test-distribution table, the counts); SKILL v1.25.0 → v1.26.0
(frontmatter, §0.5, §15, Appendix A's session-30 row, Appendix B, the
pre-ship checklist counts); worklog Task 30; this log; the plan's
post-execution record. The Conventional Commit and the SSH-wrapper
push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the pulled tree (`250a1b4`) passed lint 0/0 · tsc 0 ·
unit 641/641 (38 files) · e2e 63/63 · smoke 15/15; census MATCH.
neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 0 Medium / 4 Low / 7 Info.**

**The parity walk (both sides, live): NO DRIFT** — the fourth
consecutive fully-clean walk. The mobile menu verified working as
expected (the full functional battery); the two reported active-state
deltas were walk-sequencing artifacts; the oklab/rgba bar-spelling and
the dead /98 panel class the documented same-render deviations; the
clone's login round-trip verified live.

**The cures:** +3 unit pins — the db-path empty-string normalization
(S30-1 — the one-home `|| undefined` normalization, the wrong-DB hazard
classes stay closed), the sections dead-import retirement (S30-2 —
the F12-11 genus resurfacing, cured + the dead-import census); docs
truth — the PAD §11 logout-CSRF row retirement (S30-3), the
provenance range re-anchor (S30-4 — five sites to `1..30` + the
donor-marker rule), the docs/hygiene batch (S30-5 — the §12 phrase,
the §12 db-path row 280→292, the §15 skip-link row). Every mutation
battery on record.

**Verified:** unit **644/644** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 707 · captures 67/68 PIL-verified ·
the cured surfaces live-verified through the walk. Six docs + SKILL
v1.26.0 in lockstep.
**Deferred:** the accepted register carried forward (the in-app
delivery default flip — the standing owner-level deferral; the me-route
unthrottled read; the 36px touch targets — the standing parity-doctrine
adjudication; the cross-tab quota staleness; the formatting nits).
