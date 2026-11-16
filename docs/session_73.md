# Session 73 — The Control-Char Keyword-Prefix Cure + The Residue-Predicate One-Home + The Outline-Hidden Forced-Colors Cure + The Toast Exit-Arm Cure and The Pin Batch (2026-11-16)

The round opened on the refreshed workspace (`c3711e4` = session-72's
ship + the owner's narration commits carrying `docs/session_73.md` as
the round-72 working narration; this formal log replaces its content
at ship). The core docs re-read and re-verified at the session-72
ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.68.0), then the
session-72 set (the formal `docs/session_72.md` log, the session-72
plan's post-execution record, worklog Task 72, the owner's narration
`docs/session_73.md`), and the S72 cures verified in source (the
`(^|[\s"'])` keyword-prefix widening, the slash-fold divergence
predicate, the hextet loopback grammar, the toast geometry probe, the
eslint ignores pin).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); db:push + db:seed +
census MATCH (1 user + 0 contact messages). The ambient-shell
`DATABASE_URL` pollution (an absolute path OUTSIDE the repo — the
S63..S72 hazard) found live again and neutralized with `env -u
DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **798/798** (41 files — the
session-72 ship counts, lag 0) · build · smoke 16/16 · e2e 71/71 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..72 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on the
runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` — the recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; the db-path seam monopoly
  re-verified — `process.env.DATABASE_URL` read ONLY inside the seam
  family: db-path.ts ×2 + the boot gate's own read). No code change
  needed — the contract holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port with the S70-5d
  guard, the pinned `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #46 AND by AUDIT-3's
  source read + census suite run (the force-static trio, `/Home`
  never listed, byte-exact body pins; the walk's sitemap/robots/
  canonical/description census identical modulo origin — 4 URLs,
  weekly 1.0/0.8; heads 170/170/92/95/95).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery
  clean on both legs at 390×844 (hamburger byte-identical + the aria
  superset; Escape close-with-focus-return, outside-tap both-open,
  route-change hidden-in-DOM; panel byte-equal inner classes with
  the transparent-over-hero posture, height 265). **No Tailwind v4
  bug found** — AUDIT-2's independent navbar/globals read concurs
  (the hover unwrap, `md:hidden` boundary, transition-class axes,
  `@theme` literal hex all sound).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg; the audit lanes and
  the review scope excluded it entirely.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 3 Low / 3 Info**
(AUDIT-1 API/lib seams 0/0/1/1/3 · AUDIT-2 components/pages/effects
0/0/1/1/0 · AUDIT-3 SEO/configs/tests/docs 0/0/0/3/1). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams before any cure was designed: the control-char leak
live-probed through BOTH residue printers (`\x01` and `\x7f` carrying
`Secret123` in clear where the `\t` control — a `\s` member — masked
`password=***`: the boundary is exactly `\s` membership), the outline
semantics verified on the compiled artifact AND the tailwindcss
4.3.3 lib definition (`.outline-none{--tw-outline-style:none;
outline-style:none}`; `outline-hidden` carrying the forced-colors
transparent-outline arm), the stale tracker and both pin absences
rg-verified in source.

The findings this round cured:

- **S73-1 (AUDIT-1 M-1, live-probed on both printers)**: the keyword
  pass's `(^|[\s"'])` prefix class misses every control character
  that JS `\s` does not match — `\x00-\x08`, `\x0e-\x1f`, `\x7f`
  (DEL), C1 `\x80-\x9f` (~65 chars; the realistic pasted controls
  `\t \n \v \f \r` ARE `\s` and mask correctly). A control char
  preceding `password=` defeats the keyword pass, and with no scheme
  `://` match on the value every downstream pass misses too, so the
  secret prints VERBATIM through BOTH residue printers:
  `bootEnvCheck({DATABASE_URL: "postgresql://host/db\x01password=
  Secret123 user=admin"})` → the report's warning carried `Secret123`
  in clear (stdout + server.log); `databaseUrlFileResidueWarning` →
  the same clear print through the file arm.
- **S73-2 (AUDIT-1 L-1, structural)**: the DB-residue predicate
  (`\p{Cc}` test + the two quote-opener arms) was TRIPLICATED with
  no one home — three independent literals in boot-env.ts (the
  process-env arm, the file-residue arm, the inert-value seam's
  negated form) plus the arm's own face classifier spelling the
  class a FOURTH time (the audit lanes found three; the lead's
  manual site map found all four). A future widening must be edited
  in four places or the arms silently diverge — the exact drift
  hazard the one-home doctrine (S29-2, S59-1) exists to prevent.
- **S73-3 (AUDIT-2 M-1, verified on the compiled CSS + the pinned
  tailwindcss 4.3.3)**: every focus indicator pairs
  `focus(-visible):outline-none` with `ring-2` (box-shadow) — 18
  focus-paired occurrences across 9 files. In Tailwind v4,
  `outline-none` sets `outline-style: none`; v3's `outline-none`
  (2px solid transparent — still rendered under forced-colors mode)
  was renamed `outline-hidden`. Under forced-colors (Windows High
  Contrast) box-shadows are suppressed, so the ring vanishes and the
  outline is gone: keyboard users in that mode got NO visible focus
  indicator on every primary control (login/signup/reset submits,
  OTP boxes, Generate/Copy, contact submit, hamburger, toast
  dismiss, error-boundary "Try again"). Zero `outline-hidden` in
  src at the audit; not covered by any gate (the axe battery runs
  normal colors only). The reference's v3 build emits the
  transparent outline — a parity drift of the exact genus the repo
  re-pins elsewhere (`--shadow-sm`, `--blur-sm`, the `@custom-variant
  hover` unwrap).
- **S73-4 (AUDIT-2 L-1, code-read CONFIRMED)**: the S72-4 geometry
  probe's tracker is never nulled when the mouse LEAVES the viewport
  — a mouse exiting the window parks the tracker at its exit
  coordinates (desktop toasts mount at the bottom-right corner, the
  most common exit path). A toast mounting over that stale position
  while the pointer is out-of-window probes "inside" →
  `setPaused(true)` → the dismiss timer never arms, and no
  mouseenter/mouseleave pair on the card can unpause it (the engine
  never marks the inserted card hovered; the pointer is outside).
  The card sticks until manually dismissed. No
  mouseleave/pointerout/relatedTarget listener existed anywhere in
  toast.tsx (rg-verified).
- **S73-5 (AUDIT-3 L-1, pin-inventory verified)**: the S71-4b
  seam-side `[\/?#]` post-serialization strip in `site.ts` was
  UNPINNED — the shipped pins (S71-4a, S72-2a) exercise
  `bootEnvCheck`'s mirror only; `tests/page-titles.test.ts`'s
  siteUrl describe pinned the trailing-slash strip but NO
  empty-delimiter case (`https://example.com?` → bare). A widening
  revert in site.ts shipped green through the whole gate while an
  empty-delimiter `NEXT_PUBLIC_SITE_URL` composed garbage
  canonicals — the seam strip is that spelling's single line of
  defense and owned zero pins.
- **S73-6 (AUDIT-3 L-2, pin-inventory verified)**: the manifest
  route's origin composition was the one unpinned SEO composition
  face (the S24-10 genus, unclosed): the manifest arm's pins were
  loose `toContain("http")` / `toContain("/icon.png")` — any origin
  passes. No layer pinned `manifest.icons[0].src ===
  \`${siteUrl()}/icon.png\``.
- **S73-7 (AUDIT-3 L-3, rg-verified)**: the PAD header's "Last
  Updated: 2026-11-14" trailed its own session-72 body (the
  floating-icons row, the 798/71/16 carry lines) by two days/eight
  ship rounds.

Registered, NOT cured (the Informational set): the S72-3b dotted
mapped-IPv4 arm is unreachable through the URL parser (the hostname
normalizes to compressed hex — the comment's "pre-normalization
inputs" rationale cannot occur; kept as belt-and-braces, its comment
respelled to the honest rationale by the S73-2 extraction in
passing); the S72-2b slash-fold erases a lone-slash fragment/query
(`#/`, `?/` — the three lenses stay mutually consistent by design,
the S71-4a healthy-empty-delimiter posture extended to a one-char
non-empty face — REGISTERED as the S72-2b boundary note in the
session-73 plan); the owner's narration pad numbering (this file's
prior content carried the round-72 baseline numbers — the formal log
written at ship replaces its content, the standing convention).

## Parity walk #46 — the forty-sixth consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`, bare title): the hamburger byte-identical (`md:hidden p-2
text-slate-300`, cursor pointer, NO aria family); the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the priced amber CTA
pill ("Upgrade to Pro – $19"), NO panel id, open height 265; Escape
R-OPEN; the outside-tap R-OPEN; the route-change R-UNMOUNT (via the
Pricing link); the desktop census 6 visible at 1440 (burger
display:none); the brand text gradient byte-identical
(`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`);
the five-route head census (bare `/` + `/login` titles, the
`<Page> |` family, the canonicals, desc lengths 170/170/92/95/95);
sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all + the sitemap
pointer; the generator DEAD at the 30s probe (the button stuck
disabled, no post landed — the D-1 drifted failure face: no banner
visible this walk). CLONE leg (logged in, landed `/` — the
documented /Home deviation): the aria superset ACTIVE (Open/Close-menu
relabel, expanded true→false, `aria-controls="mobile-menu"` with the
panel `id`); the panel inner byte-identical with the
transparent-over-hero posture, open height 265 (byte-equal); Escape
L-CLOSE-WITH-FOCUS-RETURN (focus observed back on the toggle); the
outside-tap BOTH-OPEN (parity with the reference); the route-change
L-HIDDEN-IN-DOM (panel in DOM, display:none, expanded=false); the
desktop census identical (+ the skip-link superset); the gradient
byte-identical; the head census + sitemap/robots identical modulo
origin; the generator LIVE (a real post — hashtags incl. the
idea-derived #Sustainable #Fashion pair, the Copy button). **No
Tailwind v4 bug in the mobile menu** — every mechanic live-verified
at 390×844 on both legs. Captures 153/154 on the dev server
PIL-verified (390×844 mobile menu open full-page, the amber-CTA
field pixel-scanned present; 1440×900 landing full-page).

## The cures (TDD — the pins first, born RED, then the batteries)

Phase 1 — six unit pins born RED exactly as designed:

- **S73-1a** (boot-env.test.ts): the control-char keyword-prefix pin
  — the `\x01` face through BOTH printers (the process-env arm's
  report.warnings AND the file arm's returned warning) asserting the
  masked `password=***` output; the `\t` mechanism control already
  pinned by the S72-1a family (one owner per face).
- **S73-2a** (boot-env.test.ts): the one-home pin — the residue
  predicate exists at EXACTLY ONE site in boot-env.ts (the `\p{Cc}`
  census over the source: the helper's own body), the three inline
  literals gone.
- **S73-3a** (a11y-controls.test.ts): the outline-hidden family pin
  — the retire census (`focus:outline-none` / `focus-visible:
  outline-none` spellings GONE from src/, the bare resting container
  `outline-none` at the ToastCard root EXEMPT — it is not a focus
  indicator) + the forced-colors family present at the census's
  sample carriers.
- **S73-4a** (toast-anatomy.test.ts): the exit-arm pin — the
  pointerout listener with the relatedTarget-null + mouse-modality
  gate nulls the tracker (extending the S72-4a pin's describe).
- **S73-5a** (page-titles.test.ts): the seam-side strip pin —
  `siteUrl("https://example.com?")` → `"https://example.com"` + the
  `#` mirror (the S71-4b seam face, one owner).
- **S73-6a** (seo-surfaces.test.ts): the manifest composition pin —
  `icons[0].src`/`start_url`/`scope` equal the `${siteUrl()}/...`
  compositions at the DEFAULT env face (the S24-10 idiom, manifest
  face).

Phase 2 — the cures:

- **S73-1b** (boot-env.ts, the keyword pass): the prefix widening —
  `(^|[\s"'])` → `(^|[\s"'\u0000-\u001f\u007f-\u009f])`: every
  non-`\s` control char is a libpq-meaningful delimiter before a
  keyword exactly as whitespace and a residue quote are (the C0 +
  DEL + C1 families; the `\s` members are subsumed — the overlap is
  harmless). The masked `password=***` output carries no control
  char, so the arms below are unchanged. The S72-1b boundary comment
  respelled: the backslash-preceded keyword stays the ONE registered
  unmasked face (a double-malformation; adding `\\` to the class is
  the named lift).
- **S73-2b** (boot-env.ts): the one-home extraction — module-local
  `dbUrlCarriesControlChar(value)` + `dbUrlCarriesResidue(value)`
  helpers placed before the first consumer, consumed at every site
  (the process-env arm, the file-residue arm, the inert-value seam's
  negated form, the arm's face classifier); the S72-3b dotted-arm
  comment respelled to the honest belt-and-braces rationale
  (unreachable through the URL parser — the hostname normalizes to
  compressed hex — kept for robustness against future non-URL
  callers). The one-home census's mid-execution catch: the helper's
  own doc comments carried the `\p{Cc}` literal and would have
  tripped the S73-2a census — the comments respelled to prose that
  never spells the literal (the census counts exactly the helper
  body's one site).
- **S73-3b** (the 18 focus-paired sites across 9 files —
  page-layout.ts ×3, login-reset.ts ×5, generator-card.tsx ×3,
  contact-form.tsx ×2, toast.tsx ×1 focus-paired, navbar.tsx ×1,
  login-card.tsx ×1, error.tsx ×1, global-error.tsx ×1): the
  forced-colors rename — every `focus:outline-none` →
  `focus:outline-hidden` and every `focus-visible:outline-none` →
  `focus-visible:outline-hidden` (zero visual delta in normal
  rendering — `outline-style:none` either way; the forced-colors
  transparent outline restored exactly as the reference's v3-era
  `outline-none` rendered). The ToastCard root's bare resting
  `outline-none` KEPT (not a focus indicator — no ring follows it;
  renaming it would add a pointless forced-colors outline to a
  non-interactive container). The four pin suites updated in the
  same commit (toast-anatomy:67, a11y-controls:302/415,
  login-reset:86, error-boundaries:213/215/224/226).
- **S73-4b** (toast.tsx): the exit arm — the Toaster's mount effect
  gains the document-level `pointerout` listener beside the
  `pointermove` tracker, gated `e.pointerType === "mouse" &&
  e.relatedTarget === null` (the pointer left the window), nulling
  `lastMousePos`; the SAME cleanup pairing (the mount effect's
  return removes both). The S72-4 comment block extended with the
  exit-face mechanism (the stale exit position could phantom-pause a
  card mounting under it while the pointer is outside — the tracker
  now goes null at the boundary).
- **S73-5b/S73-6b**: no code change — the pins are the cures' teeth
  (the site.ts strip and the manifest composition already behave
  correctly; the pins close the mutation-battery gap).
- **S73-7**: the PAD header re-anchor (2026-11-14 → 2026-11-16) —
  docs lockstep.

Phase 3 — the revert-plant battery, every NEW pin proven failable:
the prefix revert plant (`(^|[\s"'\u0000-\u001f\u007f-\u009f])`
narrowed back to `(^|[\s"'])`) REDs exactly S73-1a; the one-home
revert plant (the helper's predicate inlined back at one consumer)
REDs exactly S73-2a — the battery's first plant design routed the
revert THROUGH the helper (the census stayed 1 and the pin stayed
GREEN: a plant with no teeth); the corrected plant re-inlines the
literal and REDs exactly the census; the outline revert plant
(`outline-hidden` narrowed back to `outline-none` at the sample
carriers) REDs exactly S73-3a; the exit-arm revert plant (the
pointerout listener dropped) REDs exactly S73-4a; the seam-strip
revert plant (site.ts `[\/?#]` narrowed back to `/\/+/`) REDs
exactly S73-5a; the manifest revert plant (the composition broken —
a hardcoded origin) REDs exactly S73-6a. All restored GREEN (the
battery run as a deterministic plant/test/unplant script; one
interrupted run's leaked plant — the toast exit-arm listener —
restored and re-verified 23/23 GREEN before the battery re-ran).

## The lockstep

UNIT 798 → **804** (+6 its: S73-1a/2a/3a/4a/5a/6a ×1 each), SUITES 41
held (no new file), E2E 71 held (the exit face is source-pinned — a
behavioral e2e leg would depend on engine-specific synthetic
pointerout semantics, the S72-4 lesson's own doctrine: the
deterministic arm is the listener wiring), E2E_SPECS 9 held, SMOKE 16
held, BADGE 869 → **875**. The ten provenance sites re-anchored
`1..72` → `1..73` (uniform, lag 0); the docs-counts ladder's s73 rung
appended with its +6/+0 breakdown. The plans map gained the
seventy-third round (the AGENTS.md line + the plan file on disk,
1:1). PAD: §8.1's table + §8.3's carry line at 804/71/16; §12's
inventory rows held at the live line counts (every S73-3b rename a
same-line substitution; boot-env.ts/toast.tsx carry no §12 rows);
the header date (S73-7). README's badge + architecture table +
quickstart + the session-73 row + the gate footer; AGENTS's
plans-map seventy-third round + the 804/41 + 71; CLAUDE's 804/41 +
71; SKILL v1.68.0 → v1.69.0 (frontmatter, §0.5 range, Appendix-A
session-73 row, Appendix-B re-certification through 73 + the gate
line's 804/71 + the pre-ship checklist's 804/71/16); the formal
`docs/session_73.md` (replacing the owner's narration); the plan's
post-execution record; worklog Task 73.

## The ship

The full gate green on the final tree; captures 153/154 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-73 ship: lint 0/0 · tsc 0 · unit 804/804 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH.**
