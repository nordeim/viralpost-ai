# Session 75 Plan — The Loopback Redaction + The Residue-Face One-Home + The Predicate Widening + The Login-Card Gate + The Blur Geometry and The Header Arm

Date: 2026-11-16. Round opens on `544f724` (session-74's ship `cd888b6` +
the owner's narration push carrying `docs/session_75.md` as this round's
working narration; the formal log replaces its content at ship). Baseline
gate re-run on the refreshed tree: lint 0/0 · tsc 0 · unit 808/808
(41 files) · build · smoke 16/16 · e2e 71/71 — GREEN, lag 0. `bun audit`:
the same 9 dev-toolchain advisories as sessions 55–74 (3H/5M/1L — none on
the runtime request path). neo-crm pattern reference: UNCHANGED at
`b3d0fbe` — recorded decisions stand.

## The standing asks (each verified this round)

- **`.env` / db-folder contract**: held (`DATABASE_URL="file:../db/custom.db"`,
  `db/` at the repo root, census MATCH, every gate leg green; the
  ambient-shell `DATABASE_URL` pollution neutralized with `env -u
  DATABASE_URL` on every DB-touching command — the S63..S74 hazard,
  still present in this shell).
- **Vitest + Playwright suites**: configs verified current and wired
  (vitest `*.test.ts`-only + skills exclusion + `@` alias; playwright
  setup project + storageState + single-source port + pinned `db/e2e.db`).
- **Sitemap + SEO**: verified live in walk #48 (both legs) — sitemap 4
  URLs, robots byte-body, manifest composition; per-route heads identical
  modulo origin.
- **Mobile navigation + Tailwind v4**: walk #48's mobile battery clean on
  both legs at 390×844 (hamburger byte-match + aria superset + the
  session-73 outline-hidden rings live; panel at the byte-equal 265px;
  Escape close-with-focus-return on the clone, R-OPEN on the reference —
  our superset; outside-tap both-open; route-change hidden-in-DOM vs the
  reference's SPA unmount — the documented pair). **No Tailwind v4 bug in
  the mobile menu** (the compiled sheet's hover unwrap, `md:hidden`
  boundary, and `@theme` literal hex re-read independently by AUDIT-2).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg; the audit lanes excluded it entirely.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 10 Low / 12 Info**
(AUDIT-1 API/lib seams 0/0/1/4/3 · AUDIT-2 components/pages 0/0/1/4/5 ·
AUDIT-3 SEO/configs/tests/docs 0/0/0/2/4). Every load-bearing finding
hand-verified by the lead through the REAL exported seams before any cure
was designed:

- **A1-F1 (M, Verified live)**: the loopback production site-URL arm —
  the ONE printer S74-3 left raw — interpolates `siteUrl` verbatim: a
  credentialed loopback value (`http://admin:hunter2@localhost:3000`)
  prints the password into the boot log while the shape arms beside it
  print `http://***@…` (the S74-3 cure covered the three shape arms and
  missed the fourth member of the family — the loopback arm).
- **A1-F2 (L, Verified live)**: the file-face stray-quote classifier
  lacks the `!controlFace` gate its process-env twin carries — the SAME
  value carrying both a control char and a quote prints the control-char
  story through `bootEnvCheck` but the stray-quote story through
  `databaseUrlFileResidueWarning` (the two-homes drift the module's own
  S73-2b "one home" note warns about, realized one session later); the
  CONTROL faces' "no quote is involved" sentence is false for these
  combined values.
- **A1-F3 (L, Verified live)**: the stray-quote arm false-positives on a
  LEGITIMATE quote inside a `file:` path (`file:/opt/data/O'Brien.db`
  warns "the mirrored one-keystroke typo") — and the message's
  re-anchor mechanism sentence is false for absolute refs (passed
  through raw, no junk file under `db/`).
- **A1-F4 (L, Verified live)**: the residue predicate misses the
  invisible-whitespace family — an INTERIOR NBSP (`\u00a0`, `\p{Zs}`) or
  ZWSP (`\u200b`, Cf) in a `file:` path escapes the `\p{Cc}` class (edge
  occurrences are consumed by the trim); a trailing BACKTICK (the
  mirrored-typo genus on the neighboring key) is likewise missed — all
  three re-anchor into the junk-named file with ZERO boot signal (the
  S57-1 genus, alive for this charset; web/chat paste commonly carries
  NBSP).
- **A2-F3 (L, Verified code)**: the login card — the one component whose
  success path performs NAVIGATION — lacks the mounted gate the S51-2
  doctrine ships in generator-card/contact-form: a slow login/verify
  response resolving after the user pressed Back executes
  `router.push(fromUrl ?? "/")` and yanks the browser to the funnel exit.
- **A2-F4 (L, Verified code)**: the toast's `onBlur` unpause guard tests
  only `matches(":hover")` — but the file's own S71-6 probe record
  documents Chromium does NOT live-update `:hover` for a card inserted
  under a stationary mouse: tab into that card's Dismiss and tab out, and
  the guard reads false, re-arms the timer, and auto-dismisses while the
  pointer physically rests on the card — a residual hole in the
  machine-tested S20-6 hover-hold invariant (the compound
  stationary-mouse + keyboard path).
- **A3-F1 (L, Verified live)**: the security-header superset
  (Referrer-Policy / X-Content-Type-Options / HSTS) DOES ship on the SEO
  route family today (live curl on the standalone build: all three on
  `/sitemap.xml`, `/robots.txt`, `/manifest.json`) — but the only LIVE
  e2e header arm probes `/`; `http-headers.test.ts` pins the config
  source. A future Next behavior change would keep the gate green while
  the superset silently narrows to HTML routes (defense-in-depth only).
- **Registered postures re-confirmed, NOT defects**: the sub-AA contrast
  family (session-25/29's registered-accepted parity — extracted classes
  stay byte-identical by doctrine); the toast's double live regions
  (the S19-8 pin OWNS the viewport `aria-live="polite"` + per-card
  roles — the inserted-card announcement design); the landing's
  layout-family metadata; the reveal no-JS face; the mq
  `addEventListener` browser floor; the mobile-menu
  open-across-breakpoints; the lint off-list (the S25-18c standing
  posture); the manifest e2e looseness (unit-owned byte pins).

## The cures (TDD — the pins first, born RED, then the batteries)

- **S75-1**: the loopback arm interpolates `redactCredentials(siteUrl)`
  (healthy loopback values are byte-identical under the pass — every
  existing pin holds; only the credentialed shape changes). The pin: a
  credentialed loopback fixture asserting the printed value carries
  `***@` and never `hunter2`.
- **S75-2**: the face-classifier quartet
  (quoteFace/controlFace/newlineFace/strayQuoteFace) single-homes as one
  shared classifier consumed by BOTH printers (the S73-2b doctrine
  applied to the face lattice — the file-face seam gains the
  `!controlFace` gate by construction); the CONTROL faces' "no quote is
  involved" sentence respells to the combined-value truth. The pins: the
  combined control+quote fixture prints the CONTROL story through BOTH
  printers (the divergence face), plus the single-home shape.
- **S75-3**: the residue predicate widens: (a) the stray-quote arm
  scopes to the TRAILING quote on a relative `file:` value (the actual
  mirrored-typo shape live-probed in S74-2b — kills the O'Brien
  false positive while keeping the pinned trailing-quote face firing);
  (b) the control-char class admits the invisible-whitespace family
  (`\u00a0` NBSP and `\u200b`-`\u200f`) — interior occurrences, the
  trim-covered edge stays consumed; (c) the trailing BACKTICK joins the
  stray-quote arm (the neighboring-key typo genus). The pins: the
  O'Brien no-warning face, the NBSP/ZWSP warning faces, the
  trailing-backtick face, and the pinned existing faces stay GREEN
  (the false-positive guard).
- **S75-4**: the login card gains the mounted ref (the S51-2 StrictMode
  re-arm body) and the two `router.push` success arms gate on it (the
  source pin rides the landing-page pin family — the regex over the
  gated continuation).
- **S75-5**: the toast `onBlur` guard consults the same truth as the
  mount probe — unpause only when neither `:hover` NOR geometry
  (`lastMousePos` inside the card's rect) says the pointer rests on the
  card (the one-line rect mirror). The pin: the source regex over the
  compound guard.
- **S75-6**: the security-header e2e arm extends IN PLACE (the S18-2
  house precedent, no count change) to loop over `/sitemap.xml`,
  `/robots.txt`, `/manifest.json` asserting the three headers.
- **S75-7**: the comment-truth respells — the playwright config's "the
  one knob" clause scoped to the assertions' sensitivity (A3-F3); the
  S74-2b printer comments' combined-value claims now true by S75-2.

## The lockstep

SKILL version bump → v1.71.0 (frontmatter, §0.5 range, Appendix-A
session-75 row, Appendix-B re-cert, pre-ship checklist), README
badge/counts, AGENTS/CLAUDE/PAD counts in the same commit, the formal
`docs/session_75.md` (replacing the owner's narration window), the
plan's post-execution record, worklog Task 75.

## The ship

Captures (a fresh boot for the evidence trail; the mobile menu open at
390×844 + the landing hero at 1440×900, PIL-verified), full gate GREEN,
census MATCH, Conventional Commit on `main`, push via the SSH wrapper,
key shredded.

## The post-execution record (the plan vs the execution)

- S75-1..S75-7 executed exactly as planned; the pin count held at
  +5 (S75-1a/2a/3a in boot-env.test.ts, S75-4a in
  login-views.test.ts — the login card's source-pin family, not
  landing-page's, S75-5a in toast-anatomy.test.ts).
- The S75-3 design refined at VALIDATE: the stray-quote arm scopes
  to RELATIVE `file:` values (not trailing-only) — the S74-2a pin's
  Face 2 (the interior quote on a relative value) is a DELIBERATE
  posture the relative scope preserves exactly, while the O'Brien
  false positive (an ABSOLUTE ref passed through raw — no re-anchor,
  no junk file) dies at the scope boundary; the mechanism sentence
  is true for exactly the values that reach the arm.
- The two S70-4-era toast pins re-anchored in-commit (the compound
  guard replaced their asserted one-line spelling); the S75-5
  battery plant trips the new pin + one documented co-RED (the
  re-anchored mixed-modality pin shares the guard's first arm).
- The S73-2a one-home census initially tripped on the new
  class-widening COMMENT repeating the literal spelling — the
  doctrine's own "deliberately not repeated in this comment" rule,
  applied (the comment re-spelled to prose).
- The dev server's HMR reload loop (fresh profiles too — a
  dev-env artifact, page reload-cycling with `[Fast Refresh]
  rebuilding` repeats) moved the CLONE battery to the PRODUCTION
  standalone build (the e2e posture): all faces green + a
  marker-stability check proving no reload; the outside-tap face
  re-tested from an OPEN state after a first-pass test-order
  artifact (Escape had already closed the panel the vacuous
  outside-tap ran on).
- Counts at ship: 813/41 + 71/9 + 16, badge 884, provenance 1..75
  uniform, SKILL v1.71.0.
