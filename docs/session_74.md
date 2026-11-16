# Session 74 — The Query-Pass Reorder Cure + The File-Stray-Quote Residue Face + The SiteUrl Redaction + The Touch-Pause Pointer Gate and The Register Batch (2026-11-16)

The round opened on the refreshed workspace (`15d852d` = session-73's
ship `c4392e8` + the owner's narration push carrying
`docs/session_74.md` as the round-73 working narration; this formal
log replaces its content at ship). The core docs re-read and
re-verified at the session-73 ship counts (AGENTS, CLAUDE, README,
PAD, SKILL v1.69.0), then the session-73 set (the formal
`docs/session_73.md`, the session-73 plan's post-execution record,
worklog Task 73) and the S73 cures verified in source (the
control-char keyword-prefix class, the one-home residue predicate,
the outline-hidden forced-colors rename, the toast exit arm).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); census MATCH. The
ambient-shell `DATABASE_URL` pollution (the S63..S73 hazard)
neutralized with `env -u DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **804/804** (41 files — the
session-73 ship counts, lag 0) · build · smoke 16/16 · e2e 71/71 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..73 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on
the runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` — the recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; the db-path seam monopoly
  re-verified — `process.env.DATABASE_URL` read ONLY inside the seam
  family). No code change needed — the contract holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port, the pinned
  `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #47 on BOTH legs (the
  sitemap's 4 URLs, the robots byte-body, the manifest composition;
  per-route heads identical modulo origin — the clone's per-route
  canonical is the documented SEO superset).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery
  clean on both legs at 390×844 (hamburger byte-match + the aria
  superset; Escape close-with-focus-return on the clone, R-OPEN on
  the reference — our superset; outside-tap both-open; route-change
  close; panel byte-equal inner classes at the byte-equal 265px
  open height). **No Tailwind v4 bug found** — AUDIT-2's independent
  read concurs (the hover unwrap, the `md:hidden` boundary, the
  `@theme` literal hex all sound in the compiled sheet).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg; the audit lanes
  excluded it entirely.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 4 Low / 9 Info**
(AUDIT-1 API/lib seams 0/0/2/2/2 · AUDIT-2 components/pages/effects
0/0/0/1/4 · AUDIT-3 SEO/configs/tests/docs 0/0/0/1/3). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams before any cure was designed:

- **A1-F1 (M, Verified live)**: a URI-query password carrying a raw
  `@` (`?password=Hunter2@Winter2024!`) leaked its post-`@` tail
  through BOTH file-side printers — the residue printer printed
  `***@Winter2024!`, the inert-value printer `postgresql://***@S3cr3t`
  — because the keyword pass's prefix class has no `?`/`&` (the
  S71-2b keyword-first reorder closed the keyword form and left the
  query form with the identical leak), and the scheme arm's token
  `lastIndexOf("@")` lands INSIDE the password, consuming the very
  `?password=` trigger the LAST-running query pass needed.
- **A1-F2 (M, Verified live incl. an engine probe)**: the residue
  predicate (control char || LEADING quote) missed the
  one-keystroke mirrored typo `file:../db/custom.db"` — the value
  parses clean through every loader, and the live probe resolved it
  to a junk-named 0-byte `custom.db"` under db/ with SELECT 1
  answering OK — a healthy-looking boot against a table-less DB with
  ZERO [boot] signal (the S57-1 junk-file genus, silent again).
- **A1-F3 (L, Verified live)**: the three NEXT_PUBLIC_SITE_URL shape
  arms printed the raw value; the queryCarrying arm explicitly
  covers credentials, so `http://user:secretpw@host` printed the
  password verbatim into the boot log.
- **A2-F1 (L, Reasoned)**: a touch tap on a toast fires the compat
  `mouseenter` and arms the pause with NO release on that path (the
  emulated hover parks until the NEXT tap elsewhere) — the pause was
  unbounded, not "a beat longer" as the S70-4 comment spelled it.
- **A3-F1 (L, Verified)**: the working `/signup` superset route was
  missing from the implementation plan's route list and the §6
  Deviations Ledger.
- **A1-F4/F5/F6 (L/Info/Info, Verified)**: the comment-truth trio —
  the reset-password header's overgeneralized token-before-password
  claim, the health-route register's false "fails client
  CONSTRUCTION" mechanism (it fails at the first query, caught —
  better than claimed), and `redactCredentials` referenced as a
  routing target while module-private.

## Parity walk #47 — the forty-seventh consecutive clean walk

REF leg (logged in, landed `/Home`): hamburger byte-match
(`md:hidden p-2 text-slate-300`, no aria family — ours the active
superset), panel open at the byte-equal 265px height with the
documented classes, Escape R-OPEN, outside-tap R-OPEN, route-change
unmounts (SPA), desktop gradient census byte-identical (the brand
title's teal→amber `linear-gradient(to right, rgb(45, 212, 191),
rgb(251, 191, 36))`), five-route heads at the documented flat
canonical posture, sitemap/robots byte-body modulo origin, the
generator DEAD at the 30s probe (no post, no toast — the D-1 drifted
silent-rest face). CLONE leg: logged in (landed `/` — the documented
/Home deviation), the mobile battery clean (hamburger + aria
superset + the session-73 `outline-hidden` rings live; panel at 265
with the transparent-over-hero posture; Escape closes with
focus-return; outside-tap open; route-change hidden-in-DOM), the
brand gradient byte-identical, heads/SEO identical modulo origin
plus the per-route-canonical superset, and the generator LIVE (the
idea-derived `#Motivational #Morning #SelfCareDaily...` hashtag
family landed). **No Tailwind v4 bug in the mobile menu.**

## The cures (TDD — the pins first, born RED, then the batteries)

- **S74-1**: the query pass moved between the keyword pass and the
  scheme arm (keyword → query → scheme). The S71-2b disjointness
  argument inverts cleanly: the keyword output never carries
  `[?&]password=`, and the query output never carries a bare `@` for
  the scheme arm to misattribute — every pinned shape byte-identical
  (the 263-line fixture suite is the gate); only the leak shapes
  change. The tail return's dead second application retired (the
  one-idiom doctrine).
- **S74-2**: `dbUrlCarriesResidue` gained the file:-scoped
  stray-quote arm (NEVER a blanket includes — libpq's sanctioned
  quoted keyword containers are clean values carrying quotes; the
  false-positive guard pinned); both warning printers gained the
  stray-quote faces with the junk-file mechanism (the live engine
  probe — the P2021 genus, not PrismaClientInitializationError).
- **S74-3**: the three siteUrl shape arms print through
  `redactCredentials` (the shape stays visible; the userinfo never
  prints — the S63-2 doctrine applied to the family's one
  unredacted printer).
- **S74-4**: the toast's pause arm switched to `onPointerEnter`
  gated `pointerType === "mouse"` (the mouse path behaviorally
  identical — pointerenter fires at the same boundary crossing with
  the same enter semantics; the S72-4b e2e leg's real-mouse path
  unchanged); the unpauser keeps its guarded `onMouseLeave` spelling.
- **S74-5**: the `/signup` ledger row + the §2 route-list entry.
- **S74-6**: the comment-truth respells (no speculative export added
  for the module-private `redactCredentials` — the wording fixed).

## The battery

4/4 plants RED exactly their pins and restored GREEN (the
deterministic Python battery). The pass-disabled plant trips 7 —
the new pin plus the S66-1 @-less query fixtures the same revert
breaks (the documented co-RED family); each of the other three
plants trips exactly its one pin. The battery's own parse bug was
found and fixed before the recorded run: vitest's fail marker rides
inside a mix of bare ESC bytes and full CSI sequences (852 ESCs in
one capture) — the naive strip left `[31m` remnants prefixing the
marker and reported phantom GREENs (0 failing while planted) on the
first two runs; the ANSI-regex strip went in and every plant
verified. An operator-side mishap mid-round (a `git checkout` while
hand-verifying the third plant) wiped the boot-env cures to disk;
they were re-applied verbatim and the full suite + battery re-ran
GREEN before anything else proceeded (the tree was never committed
in the wiped state).

## The lockstep

SKILL v1.69.0 → **v1.70.0** (frontmatter, §0.5 range, Appendix-A
session-74 row, Appendix-B re-cert, pre-ship checklist), the
provenance bound 1..73 → 1..74 uniform across every live-tense site
(incl. the eight straggler comments the mixed-bound census caught),
UNIT 804 → 808 (the docs-counts s74 rung), README badge 875 → 879 +
tables + quickstart + the session-74 row + the gate footer, AGENTS's
plans-map seventy-fourth round + counts, CLAUDE counts, PAD §8.1 +
§8.3 + the header date, the formal `docs/session_74.md` (this log,
replacing the owner's narration window), the plan's post-execution
record, and worklog Task 74.

## The ship

Captures **155/156** (a fresh dev-server boot after the cures; the
mobile menu open at 390×844 + the landing hero at 1440×900,
PIL-verified), the full gate GREEN (lint 0/0 · tsc 0 · unit
**808/808** (41 files) · build · smoke 16/16 · e2e 71/71), census
MATCH, the Conventional Commit on `main`, the push via the SSH
wrapper (`docs/ssh_git_wrapper_v3.py`), the operator key shredded
after use.
