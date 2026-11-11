# Session 28 — The SiteUrl Path-Fallback + The .env-Example Knob Census + The Generate Shape Vocabulary + The Dead-Token Retirement + The Audit Batch (2026-11-11)

The round opened on the pulled tree (`af63c73` — the owner's session log
update holding the session-27 execution narration, the established
pattern). The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL
v1.23.0), then the session-27 set (session_27.md, the session-27 plan,
worklog Task 27, the owner's session_28.md narration). This round is
session 28. Baseline gate GREEN at the documented counts (lint 0/0 · tsc
0 · unit 631/631, 38 files); the standing asks re-verified up front (the
.env DATABASE_URL contract with `db/` at the repo root, census MATCH;
the vitest + playwright suites current; the sitemap/robots/manifest/OG
family fresh; `skills/` excluded from every gate, all pinned;
`.env.example` present, committed, matching). neo-crm re-checked at HEAD
`b3d0fbe` — UNCHANGED since session 12; the recorded decisions stand.

The web-application skill + the skills catalog internalized (the same
family skill every prior round internalized — the repo's own
viralpost-ai_SKILL.md is its distilled project form, read in full).
Playwright (the repo's own devDependency) drove the parity walk. Three
parallel audit subagents dispatched (AUDIT-1 API/lib seams, AUDIT-2
components/pages/effects, AUDIT-3 SEO/configs/tests/docs) while the
findings were hand-verified in source. The audit returned **AUDIT-1:
0C/0H/1M/3L/4I · AUDIT-2: 0C/0H/0M/2L/4I · AUDIT-3: 0C/0H/2M/3L/2I** —
combined 0 Critical / 0 High / 3 Medium / 8 Low / 10 Info at the
subagent reports. The lead's adjudication held the two SEO/census
Mediums, re-adjudicated the generate vocabulary Low (the S16-1
exemption note addressed the dev-message leak, not the vocabulary
consistency — the cure completes the S15-2 doctrine), and took the
minLength family, the smoke disk census, and the comment-truth items
into the working register (all cured this round — S28-1..S28-9), moving
the rest to the accepted register with reasons (the in-app delivery
default — the documented S13-1 posture, an owner-level decision
recorded for the ledger; the first-signup admin TOCTOU — the session-27
adjudication stands; the parseEnvFile unterminated-quote divergence; the
400-not-413 vocabulary; the FILE: case note; the uncached getSnapshot;
the reference-inherited sub-AA tones; the toast live-region pattern;
Reveal's no-JS posture; the manifest 192/512 parity; the e2e
canonical-host regex compensation).

The parity walk (live, both sides, logged into the reference) ran the
mobile-menu control census at 390×844 (the hamburger base classes with
our documented superset arms; the four links + the Gumroad pill
"Upgrade to Pro – $19" byte-identical; the open panel's max-height none
+ both surfaces transparent at scrollY=0; the bar's bg-transparent with
the menu open — the S26-3 cure holds; the scrolled-bar class family
byte-identical, the computed background re-derived in-session with the
gamma-encoding step to EXACTLY rgb(15,23,42) = the reference's
rgba(15, 23, 42, 0.95) slate-900), the five-route head census (NO DRIFT
— the session-19 description family holds byte-for-byte, og:url +
canonical differ by origin only), the footer Product column (3 links
both sides — the S25-1 cure holds; the social family our documented
real-links superset), sitemap.xml + robots.txt (identical modulo
origin), the desktop nav family (byte-identical — all four
underline-family links + the desktop pill + the bar class), and the
reference's `cdn.tailwindcss.com` console message (the v3-era CDN
posture, unchanged — the documented context for the hover/aria
doctrine). **NO DRIFT FOUND — the second consecutive fully-clean walk.**

The session-28 plan written and validated against the codebase (the
anchor set — site.ts's guard, page-titles' S25-4 arm, api-robustness's
S16-1 describe, design-tokens' dead-token census, docs-counts' env arm
+ reality-census describe, a11y-controls' reset-screen arm), then
executed with TDD throughout:

- **S28-1 (the siteUrl path-fallback, the round's Medium cure)**: the
  pin RED first, then the cure — the pathname arm
  (`parsed.pathname !== "/"`) joins the S25-4 fallback family (a
  path-carrying canonical origin used to pass verbatim while the boot
  gate warned on the shape since S22-19; a path carrying & rode
  unescaped into the sitemap's `<loc>`, and the prefix composed
  inconsistently across metadataBase/canonical vs the twitter:url
  cards). The boot warning's text + comment updated to the post-cure
  truth. Mutation battery: the pathname arm reverted → RED.
- **S28-2 (the .env-example knob census, the second Medium)**: the
  six-knob arm's name claimed "both directions with .env.example"
  while its body read only README — the mirror direction now parses
  the file's assignment keys and demands exact set equality both ways
  (a planted 7th knob REDs; a dropped knob REDs).
- **S28-3 (the generate shape vocabulary, the S16-1 exemption
  re-adjudicated)**: a valid-JSON-non-object body ("hello", 42, [])
  answered "Describe your post idea first." while every sibling route
  answered "Invalid request body" — the widened object-shape arm
  (contact's exact form) mirrored; the empty-idea and over-length arms
  unchanged (the F11-7 posture); the hand-built 429 gains the
  Math.max(1, …) retry floor (S28-8). Live-verified on the dev server
  post-cure: `curl -d '"hello"' /api/generate` → "Invalid request
  body"; the happy-path round-trip unchanged. Mutation battery: the
  widened guard reverted → RED.
- **S28-4 (the dead-token retirement + the census comment-blindness)**:
  the subtle-ink token's only "consumer" was a toast.tsx COMMENT the
  prose-blind census read as live. The census strips comments before
  its consumer regex now (a mis-strip can only false-RED at gate
  time); the token retired from `@theme`; both comments reworded to
  prose-safe spellings (the raw-text step-less census would read the
  class-shaped spelling as a consumer demand — the S25-3 rule).
  Mutation battery: the token re-planted with only the comment
  "consumer" → RED (the proof of the hardening).
- **S28-5 (the minLength family)**: the reset screen's two password
  inputs gain the signup pair's `minLength={8}` — one it co-pinning
  all four inputs (the S25-3 family form). Live-probed through a real
  minted reset token: both inputs carry minLength 8. Mutation battery:
  one dropped → RED.
- **S28-6 (the smoke disk census)**: the last count site without a
  disk census — the ladder's `ok NN` leg markers + the
  `SMOKE: 15/15 PASS` echo literal pinned to the SMOKE constant.
  Mutation battery: one leg marker removed → RED (14 vs 15).
- **S28-7/S28-9 (the comment-truth batch)**: site.ts's stale
  "dashboard" bullet (no dashboard page exists — /Dashboard 404s
  through the catch-all), schemas.ts's overstated "constant-shape"
  claim (the unverified 403 fires only after the password verifies),
  and the PAD's ADR-006 unit-pin overreach reworded to the truth.

The count re-anchor: UNIT 631 → 636 (+5 pins), SUITES 38 unchanged,
E2E 63 unchanged, badge 694 → 699; the PAD §12 rows (site.ts 202 →
219, globals.css 222 → 226); the census walked RED-to-GREEN site by
site. Mid-round deviations on record in the plan's post-execution
record: one comment-prose trip (the S28-1 comment spelled
"string-concat" — the raw-text step-less census read substRING-concat
as a ring-<word> utility, the documented S17-5 English-fragment genus;
reworded the same hour, and the S28-4 comments reworded proactively).
The plan's count projection was exact this round (636, confirmed by
the census before any doc site was touched).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
636/636 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 63/64 taken on the dev server (the
reset-password token-view minLength family + the mobile-menu open
clean-walk re-verification, both at 390×844), PIL-verified; the cured
surfaces live-verified. README (the session-28 row, the gate line, the
badge 699, the counts); AGENTS (counts, the plans map's twenty-eighth
round); CLAUDE (counts); PAD (the §12 rows, the test-distribution
table, the ADR-006 reword, the counts); SKILL v1.23.0 → v1.24.0
(frontmatter, §4's token block, Appendix A's session-28 row, Appendix
B both counts + the session-28 re-certification, the pre-ship
checklist counts); worklog Task 28; this log; the plan's
post-execution record. The Conventional Commit and the SSH-wrapper
push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the pulled tree (`af63c73`) passed lint 0/0 · tsc 0 ·
unit 631/631 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 3 Medium / 8 Low / 10 Info.**

**The parity walk (both sides, live): NO DRIFT** — the second
consecutive fully-clean walk. Every control surface byte-identical;
the scrolled bar's computed background re-derived in-session to the
exact same color; the reference's hamburger aria family remains absent
(our documented superset stands); the reference still rides the
Tailwind CDN.

**The cures:** +5 unit pins — the siteUrl path-fallback (S28-1), the
.env-example knob census (S28-2), the generate shape vocabulary
(S28-3 + the S28-8 retry floor), the minLength family (S28-5), the
smoke disk census (S28-6); in-place — the dead-token census hardening
+ the retirement (S28-4), the comment-truth batch (S28-7 + the PAD
S28-9 reword), the boot-env warning truth update. Every mutation
battery on record.

**Verified:** unit **636/636** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 699 · captures 63/64 PIL-verified ·
the cured surfaces live-verified (the generate vocabulary probe; the
minLength inputs through a minted reset token). Six docs + SKILL
v1.24.0 in lockstep. **Deferred:** the accepted register carried
forward (the in-app delivery default flip — an owner-level
deviations-ledger decision; the scryptSync async lift; the
`__Host-` cookie/no-store hardening notes; the parseEnvFile
unterminated-quote robustness).
