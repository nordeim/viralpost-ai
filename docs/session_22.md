# Session 22 — The Mobile-Menu Re-Anchor + The Chunk-Recovery Storage + The Panel Scroll Arm + The Audit Batch (2026-11-11)

The round opened on a fresh `git clone` (the standing instruction's
reset path), `bun install`, `.env` re-created from `.env.example`
(AUTH_SECRET set for dev), `db:push` + `db:seed` + `db:census`
(MATCH). The operator's standing asks were re-verified up front:
`.env`'s `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root (the contract re-verified end-to-end on the clean machine), the
vitest + playwright suites in place and current, the sitemap/robots/
manifest/OG family byte-verified against the live reference, `skills/`
excluded from every gate. This file's pre-round content was the
session-21 transcript handoff (the established pattern — the content
is preserved in the session-21 record and the session-21 plan); this
round's log replaces it.

The core docs read in full (AGENTS, CLAUDE, README, PAD, SKILL), then
the session-21 set (session_21.md, the session-21 plan, worklog Task
21). This round is session 22. Baseline gate GREEN at the documented
counts (lint 0/0 · tsc 0 · unit 586/586 (37 files)). neo-crm re-cloned
at HEAD `b3d0fbe` — UNCHANGED since session 12's review; the recorded
decisions stand.

The web-application skill + the skills catalog internalized; the TDD
skill consulted for the loop discipline. Three parallel audit
subagents dispatched (API/lib seams, components/pages/effects,
SEO/configs/tests/docs) while the findings were hand-verified in
source. The audit returned **AUDIT-1: 0C/0H/1M/1L/5I · AUDIT-2:
0C/0H/1M/3L/3I · AUDIT-3: 0C/0H/0M/3L/4I** — combined **0 Critical /
0 High / 2 Medium / 7 Low / 12 Info**. The two Mediums: the
chunk-recovery cooldown inert in production (the boundaries never
handed the storage — A1-1) and the mobile-menu panel transparent on
the home route after scrolling into light sections (A2-1).

The parity walk (live, both sides, logged into the reference) ran the
five-route head census (NO DRIFT — the session-19 description family
holds byte-for-byte), the computed-style control census at desktop +
390×844 (footer CTA, Pro-card CTA, the three sRGB brand gradients, the
desktop nav, the landing heading tree — ALL byte-identical), the
monetization floaters (10 icons, identical classes, live transforms —
NO DRIFT), sitemap/robots (identical, origin-difference only), and
the clone's generator round-trip (green — the documented superset).
**But the mobile-menu control census found THE REFERENCE'S DROPDOWN
REVERTED to its session-1-era form** — the session-21 S21-3/S21-4
captures were a transient deploy state on the reference:

- **The pill text** — "Upgrade to Pro – $19" (the priced form; the
  DESKTOP pill keeps the bare "Upgrade to Pro" — the reference's own
  split).
- **The pill's classes** — the bare form (`block w-full text-center
  px-5 py-2.5 text-sm font-semibold text-slate-900
  bg-gradient-to-r from-amber-400 to-amber-500 rounded-full`) with NO
  hover family.
- **The menu links** — the bare mobile family (`block w-full text-left
  text-sm font-medium py-2 transition-colors` + the color states) with
  NO underline affordances (and `py-2` rides the reference's own base
  now, so its touch target matches ours at 36px).

Plus a comment-truth find: the reference's hamburger NOW SHIPS the
aria family itself (aria-expanded + the relabeling Open/Close label +
aria-controls — both sides byte-identical), so our long-standing "the
reference ships neither — our superset" claim is stale; ours is parity
there, with the Escape-close + route-change-close supersets standing.

The session-22 plan written and validated against the codebase (the
pin landscape — the landing-page session-21 describe, the e2e
mobile-navigation name pin, the error-boundaries wiring pin; the
matrix's census arithmetic), then executed with TDD throughout:

- **R22-1/R22-2 (the three drifts)**: the pins RED first (the
  landing-page session-21 describe re-anchored to the live reference
  forms — the priced pill text + the bare class with the closing-quote
  no-hover pin, the bare MENU_LINK_BASE declaration pin + the
  underline-ban negative), then the cures — the pill and the links
  re-anchored, the e2e name re-pinned to the priced text in the same
  commit. **Live-verified**: the menu family is byte-identical to the
  reference at 390×844 (pill text/classes, link classes, panel over
  the hero).
- **R22-3 (the chunk-recovery storage)**: the pins RED first (the
  seam's absent-storage arm + the error-boundaries storage-handed
  call shape), then the two-half cure — the seam's
  `if (!storage) return false` fail-safe and both boundaries'
  `safeSessionStorage()` guarded accessor. The cooldown and the
  crash-mid-reload loop guard are LIVE in production shape.
- **R22-4 (the panel scroll arm)**: the pin RED first, then
  `(!onHero || scrolled)` on the panel (mirroring the bar's own key);
  the e2e scrolled test extended in place with the panel assertions
  (counts unchanged — the S18-2 precedent). **Live-verified**: home
  scrolled + menu open → the panel carries `bg-slate-900/95
  backdrop-blur-xl`.
- **R22-5..R22-10 (the UX/a11y batch)**: the forgot-submit pending
  face (pinned; the four-sibling count), the signup name message
  (pinned + live-verified on the dev API — "Name must be reasonably
  sized", no Zod leak), the trustedDependencies move (pinned in
  type-gate; the lock synced through the package manager), the a11y
  matrix's LOGGED_OUT_SURFACES (+4 legs; the "every route" docs claim
  true again), the error boundaries' AA floor + keyboard-only focus
  rings (pinned ×2, unrolled per the census's source-block contract),
  and the skip-to-content link (pinned; the fixed-position reveal —
  the absolute form placed the pill off-viewport at scroll depth,
  caught in the live verification and cured mid-round).
- **R22-11..R22-15 (the config/script batch)**: the smoke ladder's
  GNU/BSD portability (`grep .` for the empty-input no-op + the lsof
  availability guard) + the bounded curls (`--max-time 10`), the
  WAL-sidecar gitignore, the manifest icon-resolution e2e leg, and
  the census anti-dodge guard's registration-loop shapes (the
  first-statement heuristic — assertion-only loops stay legitimate;
  the initial 400-char window form false-positived on landing.spec's
  assertion loop and was refined to the registration shape).
- **R22-16..R22-19 (the seams batch)**: the iat shape guard, the
  standalone anchor's basename-pair gate (the decoy-layout fixture),
  the hops-warning predicate aligned to proxyHopDepth's parseInt (the
  "1.5" case re-anchored mid-round — parseInt truncates exactly like
  the seam, so it stays silent), and the path-carrying-origin boot
  warning (the bare-origin pathname "/" subtlety caught by the
  existing healthy-env pins).
- **R22-19..R22-22 (the comment-truth batch)**: the hero portrait's
  plain-img rationale, the reset-password Suspense note, and the
  hamburger-aria parity re-anchor (the navbar header + SKILL §8).

The round's own discipline notes: two comment drafts tripped the
step-less color census (the prose "skip-to-content" matched
`to-content`; "string-concat" matched `ring-concat` via the st-ring
substring) — reworded; the error-boundaries loop registration unrolled
per the census's source-block contract. The census guards bit the
round's own drafts exactly as designed.

The same-family amber gradient re-adjudicated with data: the
oklab-vs-sRGB midband delta for amber-400→amber-500 computes to
(0,0,2) — sub-threshold confirmed, the utilities stay (the session-21
adjudication now has its arithmetic on record).

The count re-anchor: UNIT 586 → 599 (+13 pins), E2E 58 → 63 (the a11y
matrix's logged-out family + the icon leg), badge 644 → 662; the PAD
§12 rows (auth 188, db-path 263, navbar 206, smoke 194); SKILL v1.17.0
→ v1.18.0. The docs-counts census walked RED-to-GREEN site by site
(the count sweep initially touched the session-21 historical row's
badge — restored; the census's own inventory rows surfaced the navbar
and smoke line-count drifts mid-round).

The full gate on the exact commit tree: **lint 0/0 · tsc 0 · unit
599/599 (37 files) · build · smoke 15/15 · e2e 63/63 (9 specs)** ·
census MATCH. Captures 51/52 taken on the dev server (the landing
1280×800 + the OPEN mobile menu 390×844, via `localhost`, hydration
awaited, the menu DOM-confirmed open before the shot), PIL-verified
(51: 100% non-white, 66.9% dark hero; 52: 95.6% dark upper-third).
README (the session-22 row, the gate line, the badge 662); AGENTS
(counts, the plans map's twenty-second round); CLAUDE (counts); PAD
(§8.1, §12 rows); SKILL v1.18.0 (frontmatter, §8's aria re-anchor,
Appendix A's session-22 row); worklog Task 22; this log; the plan's
post-execution record. The Conventional Commit and the SSH-wrapper
push follow (dry-run first, key shredded after).

## The round (summary)

**Baseline:** the merged tree (`fa18dcf`) passed lint 0/0 · tsc 0 ·
unit 586/586 (37 files); census MATCH. neo-crm unchanged (`b3d0fbe`).

**The audit** (three parallel subagents, every load-bearing finding
hand-verified): **0 Critical / 0 High / 2 Medium / 7 Low / 12 Info.**

**The parity walk (both sides, live): THREE MOBILE-MENU DRIFTS** — the
reference's dropdown reverted to its session-1-era form (the pill text
"Upgrade to Pro – $19", the bare pill classes, the bare link family).
All three cured with TDD, live-verified byte-identical. The hamburger's
aria family is parity now (the reference ships it — the superset claim
re-anchored).

**The cures:** +13 unit pins, +5 e2e tests — the three mobile-menu
re-anchors, the chunk-recovery storage (the seam fail-safe + the
boundary wiring — the cooldown LIVE in production shape), the panel
scroll arm (the ~1.48:1 home-scrolled contrast gap), the forgot-submit
pending face, the signup name message, the trustedDependencies move,
the a11y matrix's /signup + /reset-password legs, the error boundaries'
AA floor + focus-visible family, the skip-to-content link, the smoke
portability + bounded curls, the WAL gitignore, the icon-resolution
leg, the census anti-dodge shapes, the iat guard, the standalone
anchor's pair gate, the hops predicate, the path-carrying-origin
warning, and the comment-truth batch.

**Verified:** unit **599/599** (37 files) · e2e **63/63** (9 specs) ·
smoke 15/15 · census MATCH · badge 662 · captures 51/52 PIL-verified ·
the cured surfaces re-verified live against the reference · six docs +
SKILL v1.18.0 in lockstep. **Deferred:** the honest register carried
from session 21 unchanged (each with its reason).
