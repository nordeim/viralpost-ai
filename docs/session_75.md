# Session 75 — The Loopback Redaction + The Residue-Face One-Home + The Predicate Widening + The Login-Card Gate + The Blur Geometry and The Header Arm (2026-11-16)

The round opened on the refreshed workspace (`544f724` = session-74's
ship `cd888b6` + the owner's narration push carrying
`docs/session_75.md` as this round's working narration; this formal
log replaces its content at ship). The core docs re-read and
re-verified at the session-74 ship counts (AGENTS, CLAUDE, README,
PAD, SKILL v1.70.0), then the session-74 set (the formal
`docs/session_74.md`, the session-74 plan's post-execution record,
worklog Task 74) and the S74 cures verified in source (the
query-pass reorder, the file:-scoped stray-quote arm + faces, the
siteUrl shape-arm redaction, the toast pointer-modality gate).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); census MATCH. The
ambient-shell `DATABASE_URL` pollution (the S63..S74 hazard,
still present in this shell) neutralized with `env -u DATABASE_URL`
on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **808/808** (41 files — the
session-74 ship counts, lag 0) · build · smoke 16/16 · e2e 71/71 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as sessions 55–74 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on
the runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` — the recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; the db-path seam monopoly
  re-verified). No code change needed — the contract holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port, the pinned
  `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #48 on BOTH legs (the
  sitemap's 4 URLs, the robots byte-body, the manifest composition;
  per-route heads identical modulo origin — the clone's per-route
  canonical is the documented SEO superset). The security-header
  superset live-verified on the SEO family via the standalone build
  (all three headers on every route) and the live e2e arm extended
  to own the whole family (S75-6).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery
  clean on both legs at 390×844 (hamburger byte-match + the aria
  superset + the session-73 `outline-hidden` rings live; Escape
  close-with-focus-return on the clone, R-OPEN on the reference —
  our superset; outside-tap both-open — re-tested from an OPEN state
  after a first-pass test-order artifact; route-change
  hidden-in-DOM vs the reference's SPA unmount — the documented
  pair; panel byte-equal inner classes at the byte-equal 265px open
  height). **No Tailwind v4 bug found** — AUDIT-2's independent read
  concurs (the hover unwrap, the `md:hidden` boundary, the `@theme`
  literal hex, the space-y rewrite, the banned gradient pair all
  sound in the compiled sheet).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg; the audit lanes
  excluded it entirely.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 10 Low / 12
Info** (AUDIT-1 API/lib seams 0/0/1/4/3 · AUDIT-2 components/pages
0/0/1/4/5 · AUDIT-3 SEO/configs/tests/docs 0/0/0/2/4). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams before any cure was designed:

- **A1-F1 (M, Verified live)**: the loopback production site-URL arm
  — the ONE printer S74-3 left raw — interpolated `siteUrl`
  verbatim: a credentialed loopback value
  (`http://admin:hunter2@localhost:3000`) printed the password into
  the boot log while the shape arms beside it printed
  `http://***@localhost:3000` (both fire on the same value — the
  family's one remaining unredacted printer).
- **A1-F2 (L, Verified live)**: the file-face stray-quote classifier
  lacked the `!controlFace` gate its process-env twin carried — the
  SAME value carrying both a control char and a quote printed the
  control-char story through `bootEnvCheck` but the stray-quote
  story through `databaseUrlFileResidueWarning` (the two-homes drift
  the module's own S73-2b note warns about, realized one session
  later); the CONTROL faces' "no quote is involved" sentence was
  false for these combined values.
- **A1-F3 (L, Verified live)**: the stray-quote arm false-positived
  a LEGITIMATE quote inside an absolute `file:` path
  (`file:/opt/data/O'Brien.db` warned "the mirrored one-keystroke
  typo") — and the message's re-anchor mechanism sentence is false
  for absolute refs (passed through raw — no junk file under `db/`).
- **A1-F4 (L, Verified live)**: the residue predicate missed the
  invisible-whitespace family — an INTERIOR NBSP (`\u00a0`) or ZWSP
  (`\u200b`) in a `file:` path escaped the Cc-only class (edge
  occurrences are consumed by the trim); a trailing BACKTICK (the
  mirrored-typo genus on the neighboring key) was likewise missed —
  all three re-anchor into the junk-named file with ZERO boot signal
  (the S57-1 genus, alive for the web/chat-paste charset).
- **A2-F3 (L, Verified code)**: the login card — the one component
  whose success path performs NAVIGATION — lacked the mounted gate
  the S51-2 doctrine ships in generator-card/contact-form: a slow
  login/verify response resolving after the user pressed Back (the
  only exit from /login) executed `router.push(fromUrl ?? "/")` and
  yanked the browser to the funnel exit.
- **A2-F4 (L, Verified code)**: the toast's `onBlur` unpause guard
  tested only `matches(":hover")` — but the file's own S71-6/S72-4
  probe record documents Chromium does NOT live-update `:hover` for
  a card inserted under a stationary pointer: tab into that card's
  Dismiss and tab out, and the guard read false, re-armed the timer,
  and auto-dismissed while the pointer physically rested on the card
  — a residual hole in the machine-tested S20-6 hover-hold invariant.
- **A3-F1 (L, Verified live)**: the security-header superset DOES
  ship on the SEO route family today (live curl on the standalone
  build: all three headers on `/sitemap.xml`, `/robots.txt`,
  `/manifest.json`) — but the only LIVE e2e header arm probed `/`;
  the arm extended in place to the whole family (defense-in-depth,
  count-neutral).
- **Registered postures re-confirmed, NOT defects**: the sub-AA
  contrast family (session-25/29's registered-accepted parity — the
  extracted classes stay byte-identical by doctrine); the toast's
  double live regions (the S19-8 pin OWNS the viewport
  `aria-live="polite"` + per-card roles — the inserted-card
  announcement design); the landing's layout-family metadata; the
  reveal no-JS face; the mq `addEventListener` browser floor; the
  mobile-menu open-across-breakpoints; the lint off-list (the
  S25-18c standing posture); the manifest e2e looseness (unit-owned
  byte pins).

## Parity walk #48 — the forty-eighth consecutive clean walk

REF leg (logged in, landed `/Home`): hamburger byte-match
(`md:hidden p-2 text-slate-300`, no aria family — ours the active
superset), panel open at the byte-equal 265px height with the
documented classes, Escape R-OPEN, outside-tap R-OPEN, route-change
unmounts (SPA), desktop gradient census byte-identical (the brand
title's teal→amber `linear-gradient(to right, rgb(45, 212, 191),
rgb(251, 191, 36))`), five-route heads at the documented flat
canonical posture, sitemap/robots byte-body modulo origin, the
generator DEAD at the 30s probe (no post, no toast — the D-1 drifted
silent-rest face). CLONE leg (the battery against the PRODUCTION
standalone build — the dev server's HMR reload loop was diagnosed as
a dev-env artifact: the page reload-cycled on fresh profiles too,
the build battery is stable with a marker-stability check, and the
first CLONE-leg run against dev had already passed the full battery
before the loop appeared): logged in (landed `/` — the documented
/Home deviation), the mobile battery clean (hamburger + aria
superset + the session-73 `outline-hidden` rings live; panel at 265
with the transparent-over-hero posture; Escape closes with
focus-return — `focusOnToggle` verified true; outside-tap stays open
— re-tested from an OPEN state after a first-pass test-order
artifact; route-change hidden-in-DOM), the brand gradient
byte-identical, heads/SEO identical modulo origin plus the
per-route-canonical superset, and the generator LIVE (the
idea-derived hashtag family landed). **No Tailwind v4 bug in the
mobile menu.**

## The cures (TDD — the pins first, born RED, then the batteries)

- **S75-1**: the loopback arm interpolates `redactCredentials(siteUrl)`
  (healthy loopback values are byte-identical under the pass — every
  existing pin holds; only the credentialed shape changes). The
  false-positive guard pinned (a healthy `http://localhost:3000`
  prints byte-identical, never `***`).
- **S75-2**: the face-classifier quartet (quoteFace/controlFace/
  newlineFace/strayQuoteFace) single-homes as ONE shared classifier
  (`dbUrlFaceClassification`) consumed by BOTH printers and the
  residue predicate — the file-face seam gains the `!controlFace`
  precedence by construction, the quote-opener literal lives in
  exactly ONE place (census-pinned), and the CONTROL faces'
  "no quote is involved" falsehood is retired in the same respell
  (a combined control+quote value keeps the control-char story with
  the quote as named secondary residue).
- **S75-3**: the residue predicate widens — (a) the control-char
  class admits the invisible-whitespace family (`\u00a0` +
  `\u2000-\u200f` — NBSP/ZWSP paste, the S57-1 junk-DB genus closed
  for this charset; the S73-2a census count preserved by the
  in-place widen); (b) the stray-quote arm scopes to RELATIVE
  `file:` values (every S74-2a fixture is relative — the junk-file
  mechanism sentence is true for exactly that scope; the O'Brien
  absolute-path false positive cured); (c) the trailing BACKTICK
  joins the arm (the neighboring-key typo genus).
- **S75-4**: the login card gains the mounted ref (the S51-2/S52-1
  StrictMode re-arm body) and BOTH `router.push` success arms gate
  on it (the funnel's navigation no longer fires after the user
  left the card).
- **S75-5**: the toast `onBlur` guard consults the same truth as the
  mount probe — the unpause fires only when NEITHER `:hover` NOR the
  geometry (`lastMousePos` inside the card's rect, the same four
  comparisons) says the pointer rests on the card (the two S70-4-era
  pins re-anchored to the compound shape per the one-face-one-pin
  doctrine).
- **S75-6**: the security-header e2e arm extends IN PLACE (the
  S18-2/S45-8 house precedent, no count change) to loop over
  `/sitemap.xml`, `/robots.txt`, `/manifest.json` asserting the
  three headers.
- **S75-7**: the comment-truth respells — the playwright config's
  "the one knob" clause scoped to the assertions' sensitivity.

## The battery

5/5 plants RED exactly their pins and restored GREEN (the
deterministic Python battery, ANSI-stripped vitest output — the
session-74 parse lesson carried forward). The S75-5 plant trips its
pin + one documented co-RED: the re-anchored S70-4 mixed-modality
pin asserts `if (root.matches(":hover")) return;` — the compound
guard's first arm — so the revert trips it alongside the S75-5a pin
(the one-face-one-pin doctrine preserved: the S75-5a pin owns the
compound guard, the old pin owns the mouseLeave face + the bans).

## The lockstep

SKILL v1.70.0 → **v1.71.0** (frontmatter, §0.5 range, Appendix-A
session-75 row, Appendix-B re-cert, pre-ship checklist), the
provenance bound 1..74 → 1..75 uniform across every live-tense site
(the nine straggler sites + the frontmatter + `.env.example`), UNIT
808 → 813 (the docs-counts s75 rung), README badge 879 → 884 +
tables + quickstart + the session-75 row + the gate footer, AGENTS's
plans-map seventy-fifth round + counts, CLAUDE counts, PAD §8.1 +
§8.3 + the header date, the formal `docs/session_75.md` (this log,
replacing the owner's narration window), the plan's post-execution
record, and worklog Task 75.

## The ship

The full gate GREEN (lint 0/0 · tsc 0 · unit **813/813** (41 files)
· build · smoke 16/16 · e2e 71/71), census MATCH, the Conventional
Commit on `main`, the push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py`), the operator key shredded after use.
