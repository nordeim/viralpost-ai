# Session 27 — The Generator-Submit Focus Rings + The Launch `:memory:` Pass-Through + The Pin-Hardening Batch (2026-11-11)

The round opened on the pulled tree (`899ec82` — the owner's session log
update holding the session-26 execution log, the established pattern).
The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL v1.22.0),
then the session-26 set (session_26.md, the session-26 plan, worklog
Task 26, the prior session_27.md notes). This round is session 27.
Baseline gate GREEN at the documented counts (lint 0/0 · tsc 0 · unit
629/629, 38 files); the standing asks re-verified up front (the .env
DATABASE_URL contract with `db/` at the repo root, pushed + seeded,
census MATCH; the vitest + playwright suites current; the
sitemap/robots/manifest/OG family fresh; `skills/` excluded from every
gate, all pinned; `.env.example` present, committed, matching). neo-crm
re-checked at HEAD `b3d0fbe` — UNCHANGED since session 12; the recorded
decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline; Playwright (the repo's own
devDependency) drove the parity walk. Three parallel audit subagents
dispatched (AUDIT-1 API/lib seams, AUDIT-2 components/pages/effects,
AUDIT-3 SEO/configs/tests/docs) while the findings were hand-verified
in source. The audit returned **AUDIT-1: 0C/0H/0M/1L/5I · AUDIT-2:
0C/0H/1M/1L/2I · AUDIT-3: 0C/0H/3L/3I** — combined 0 Critical /
0 High / 1 Medium / 5 Low / 10 Info at the subagent reports. The
lead's adjudication held the Medium, four of the Lows, and one
hardening Info in the working register (all cured this round —
S27-1..S27-7), and moved the rest to the accepted register with
reasons (the scryptSync request-path posture, the first-signup admin
TOCTOU, the start-script pipeline exit mask, the seed/prune
disconnect skip, the forgot-password non-transient residual, the
reference-inherited sub-AA text tones, the quota cross-tab sync
— reference parity, an owner-ledger decision — and the stripper
single-quote footnote).

The parity walk (live, both sides, logged into the reference) ran the
mobile-menu control census at 390×844 (the hamburger base classes; the
panel family with max-height none; the bar transparent with the menu
open at scrollY=0 — the S26-1/S26-3 cures hold; the four links + the
Gumroad pill byte-identical; the bar's scrolled family byte-identical,
the computed background differing only in color-space spelling — our
Tailwind v4 oklab form numerically converts to the reference's exact
rgba(15, 23, 42, 0.95), verified), the five-route head census (NO
DRIFT — the session-19 description family holds), the footer Product
column (3 links both sides — the S25-1 cure holds), sitemap + robots
(identical, origin-difference only), the desktop nav family
(byte-identical), and the clone's generator round-trip (green, node A
announcing "Post generated — 2 free generations remaining today.").
**NO DRIFT FOUND — the first fully-clean walk since session 24.**

The session-27 plan written and validated against the codebase (the
pin landscape — a11y-controls' control pins, db-path's session-34
standalone describe, seo-surfaces' S25-6/S26-5 arms, docs-counts'
census constants + ladder, landing-page's census walker, the e2e
landing spec's unknown-route test), then executed with TDD throughout:

- **S27-1 (the core-submit focus rings, the round's a11y cure)**: the
  pin RED first, then the cure — the S21-20 house family
  (`focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-teal-600`) appended to the Generate Post and Send
  Message class strings (the resting classes byte-untouched; the
  landing-page toContain pins survive appended arms). Both buttons
  co-pinned in one it() (the S25-3 family form). Live-verified on the
  dev server: `rgb(13, 148, 136) 0px 0px 0px 2px` on keyboard focus
  (the Generate verification needed the idea filled first — the
  disabled control is not tabbable; the trip is on record).
- **S27-2 (the launch-shape `:memory:` pass-through, the S26-9
  sibling)**: the pin RED first (reproducing AUDIT-1's live misroute
  exactly: `file:<repo>/prisma/:memory:`), then the cure — the
  launch-recovery arm returns the RAW launch value when its ref starts
  with `:memory:` (the arm's own purpose is replacing bun's corrupted
  absolutization with the .env's original; the operator's in-memory
  intent survives the launch shape).
- **S27-4/S27-5/S27-7 (the pin-hardening batch)**: the S26-5 negative
  arms re-anchored to block-scoped forms that can actually reach the
  twitter images position (the {0,200}-windows sat 291/233 chars
  short — geometrically unreachable; the negative arm now fires
  independently, proven against both the mutated and healthy forms);
  the Appendix-B negative frozen at the historical miss it exists to
  ban (the dynamic `UNIT-7` offset banned a form that never existed
  and drifted with every re-anchor); the client-crypto census admits
  the single-quoted `'use client'` spelling (the double-quote-only
  walker was blind to it — a planted single-quoted file importing
  `@/lib/generator` REDs the census now).
- **S27-6 (the noindex superset, pinned)**: the e2e unknown-route test
  gains the meta-robots arm in place (live-verified on the dev server
  pre-merge — `<meta name="robots" content="noindex"/>` with a true
  404); the README/PAD/SKILL claims become mechanically owned. The PAD
  ADR-006 wording becomes truthful via the pin.
- **S27-3 (the comment-truth fix)**: the login-card docblock's "ZERO
  toasts fire on the auth flows" scoped to outcomes — the
  unconfigured Google button's info notice is the card's one toast
  call site, acknowledged in the same docblock.

The count re-anchor: UNIT 629 → 631 (+2 pins), SUITES 38 unchanged,
E2E 63 unchanged, badge 692 → 694; the PAD §12 db-path row (272 →
280); the census walked RED-to-GREEN site by site. Mid-round
deviations on record in the plan's post-execution record: the plan's
630 projection was an arithmetic slip (the census caught it — the live
count is the authority); one redundant `/s`-flag assertion dropped
rather than weakening any gate; one S25-3 recurrence (the Appendix A
row spelled the newly-banned literal in prose — reworded the same
hour).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
631/631 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 61/62 taken on the dev server (the Generate +
Send submit buttons' keyboard focus rings at 390×844), PIL-verified;
the cured surfaces live-verified. README (the session-27 row, the gate
line, the badge 694, the counts); AGENTS (counts, the plans map's
twenty-seventh round); CLAUDE (counts); PAD (the §12 db-path row, the
test-distribution table, the counts); SKILL v1.22.0 → v1.23.0
(frontmatter, Appendix A's session-27 row, Appendix B both counts +
the session-27 re-certification, the pre-ship checklist); worklog Task
27; this log; the plan's post-execution record. The Conventional
Commit and the SSH-wrapper push follow (dry-run first, key shredded
after).

## The round (summary)

**Baseline:** the pulled tree (`899ec82`) passed lint 0/0 · tsc 0 ·
unit 629/629 (38 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents + the lead's hand-verification
and adjudication): **0 Critical / 0 High / 1 Medium / 5 Low / 10 Info.**

**The parity walk (both sides, live): NO DRIFT** — the first
fully-clean walk since session 24. Every control surface
byte-identical; the scrolled bar's computed background differs only in
color-space spelling (oklab → the reference's exact rgba(15, 23, 42,
0.95), numerically verified); the hamburger aria family remains our
documented superset.

**The cures:** +2 unit pins — the core-submit focus rings (S27-1, the
S21-20 family on both buttons), the launch-shape `:memory:` pass-through
(S27-2, the S26-9 sibling on the standalone-launch arm); in-place —
the S26-5 negative-arm re-anchor (S27-4), the Appendix-B literal freeze
(S27-5), the client-crypto census single-quote arm (S27-7), the e2e
noindex arm (S27-6), the login-card comment scoping (S27-3). Every
mutation battery on record.

**Verified:** unit **631/631** (38 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 694 · captures 61/62 PIL-verified ·
the cured surfaces live-verified (the teal-600 keyboard rings on both
submit buttons; the noindex meta with a true 404). Six docs + SKILL
v1.23.0 in lockstep. **Deferred:** the accepted register carried
forward (the quota cross-tab sync — an owner-level deviations-ledger
opportunity; the scryptSync async lift; the `__Host-` cookie/no-store
hardening notes).
