# Session 73 — The Control-Char Keyword-Prefix Cure + The Residue-Predicate One-Home + The Outline-Hidden Forced-Colors Cure + The Toast Exit-Arm Cure + The Pin Batch (2026-11-16)

## Baseline (the round opened on c3711e4)

Workspace refreshed via `git clone` (the fresh-sandbox intake: `bun
install`, a fresh `.env` at the contract — `DATABASE_URL="file:../db/
custom.db"`, `db/` at the repo root, a fresh 64-char `AUTH_SECRET` —
plus `bunx playwright install chromium`, the one-time documented step).
Core docs re-read and re-verified at the session-72 ship counts
(AGENTS, CLAUDE, README, PAD, SKILL v1.68.0), then the session-72 set
(the formal `docs/session_72.md` log, the session-72 plan's
post-execution record, worklog Task 72, the owner's narration
`docs/session_73.md`), and the S72 cures verified in source (the
`(^|[\s"'])` keyword-prefix widening, the slash-fold divergence
predicate, the hextet loopback grammar, the toast geometry probe, the
eslint ignores pin).

The ambient-shell `DATABASE_URL` pollution (an absolute path OUTSIDE
the repo — the S63..S72 hazard) found live again and neutralized with
`env -u DATABASE_URL` on every DB-touching command; db:push + db:seed +
census MATCH (1 user + 0 contact messages).

Baseline gate: lint 0/0 · tsc 0 · unit **798/798** (41 files — the
session-72 ship counts, lag 0) · build · smoke 16/16 · e2e 71/71 (9
specs). `bun audit`: the same 9 dev-toolchain advisories as
session-55..72 (3H/5M/1L — minimatch/eslint, deepmerge-ts/prisma,
vite/vitest, source-map-js/postcss — none on the runtime request path).
The neo-crm pattern reference re-checked: UNCHANGED at HEAD `b3d0fbe`
— the recorded decisions stand.

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
  source read + census suite run (the force-static trio, `/Home` never
  listed, byte-exact body pins; the walk's sitemap/robots/canonical/
  description census identical modulo origin — 4 URLs, weekly
  1.0/0.8; heads 170/170/92/95/95).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs at 390×844 (hamburger byte-identical + the aria
  superset; Escape close-with-focus-return, outside-tap both-open,
  route-change hidden-in-DOM; panel byte-equal inner classes with the
  transparent-over-hero posture, height 265). **No Tailwind v4 bug
  found** — AUDIT-2's independent navbar/globals read concurs (the
  hover unwrap, `md:hidden` boundary, transition-class axes, `@theme`
  literal hex all sound).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg; the audit lanes and the
  review scope excluded it entirely.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 3 Low / 3 Info**
(AUDIT-1 API/lib seams 0/0/1/1/3 · AUDIT-2 components/pages/effects
0/0/1/1/0 · AUDIT-3 SEO/configs/tests/docs 0/0/0/3/1). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams before any cure was designed:

- **A1-1 (AUDIT-1 M-1, CONFIRMED LIVE both printers)**: the keyword
  pass's `(^|[\s"'])` prefix class misses every control character that
  JS `\s` does not match — `\x00-\x08`, `\x0e-\x1f`, `\x7f` (DEL),
  C1 `\x80-\x9f` (~65 chars; the realistic pasted controls `\t \n \v
  \f \r` ARE `\s` and mask correctly — the boundary is exactly `\s`
  membership). A control char preceding `password=` defeats the
  keyword pass, and with no scheme `://` match on the value every
  downstream pass misses too, so the secret prints VERBATIM through
  BOTH residue printers: `bootEnvCheck({DATABASE_URL:
  "postgresql://host/db\x01password=Secret123 user=admin"})` → the
  report's warning carries `Secret123` in clear (stdout + server.log);
  `databaseUrlFileResidueWarning` → the same clear print through the
  file arm. Probed live through the real exported seams; the `\t`
  control masks `password=***` (the mechanism control).
- **A2-1 (AUDIT-2 M-1, verified on the compiled artifact + the
  tailwindcss 4.3.3 lib definition)**: every focus indicator pairs
  `focus(-visible):outline-none` with `ring-2` (box-shadow) — 18
  focus-paired occurrences across 9 files. In Tailwind v4,
  `outline-none` sets `outline-style: none`; v3's `outline-none` (2px
  solid transparent — still rendered under forced-colors mode) was
  renamed `outline-hidden`. Under forced-colors (Windows High
  Contrast) box-shadows are suppressed, so the ring vanishes and the
  outline is gone: keyboard users in that mode get NO visible focus
  indicator on every primary control (login/signup/reset submits, OTP
  boxes, Generate/Copy, contact submit, hamburger, toast dismiss,
  error-boundary "Try again"). The compiled CSS confirms
  `.outline-none{--tw-outline-style:none;outline-style:none}`; the
  tailwindcss 4.3.3 lib confirms `outline-hidden` carries
  `@media (forced-colors: active){outline:2px solid transparent;
  outline-offset:2px}`. Zero `outline-hidden` in src today; not
  covered by any gate (the axe battery runs normal colors only). The
  reference's v3 build emits the transparent outline — a parity drift
  of the exact genus the repo re-pins elsewhere (`--shadow-sm`,
  `--blur-sm`, the `@custom-variant hover` unwrap).
- **A2-2 (AUDIT-2 L-1, code-read CONFIRMED)**: the S72-4 geometry
  probe's tracker is never nulled when the mouse LEAVES the viewport —
  a mouse exiting the window parks the tracker at its exit coordinates
  (desktop toasts mount at the bottom-right corner, the most common
  exit path). A toast mounting over that stale position while the
  pointer is out-of-window probes "inside" → `setPaused(true)` → the
  dismiss timer never arms, and no mouseenter/mouseleave pair on the
  card can unpause it (the engine never marks the inserted card
  hovered; the pointer is outside). The card sticks until manually
  dismissed. No mouseleave/pointerout/relatedTarget listener exists
  anywhere in toast.tsx (rg-verified).
- **A3-1 (AUDIT-3 L-1, pin-inventory verified)**: the S71-4b seam-side
  `[\/?#]` post-serialization strip in `site.ts` is UNPINNED — the
  shipped pins (S71-4a, S72-2a) exercise `bootEnvCheck`'s mirror only
  (injected servedSiteUrl); `tests/page-titles.test.ts`'s siteUrl
  describe pins the trailing-slash strip but NO empty-delimiter case
  (`https://example.com?` → bare). A widening revert in site.ts ships
  green through the whole gate while an empty-delimiter
  NEXT_PUBLIC_SITE_URL composes garbage canonicals — the seam strip is
  that spelling's single line of defense and owns zero pins.
- **A3-2 (AUDIT-3 L-2, pin-inventory verified)**: the manifest route's
  origin composition is the one unpinned SEO composition face (the
  S24-10 genus, unclosed): the manifest arm's pins are loose
  `toContain("http")` / `toContain("/icon.png")` — any origin passes.
  No layer pins `manifest.icons[0].src === \`${siteUrl()}/icon.png\``.
- **A3-3 (AUDIT-3 L-3, rg-verified)**: the PAD header's "Last Updated:
  2026-11-14" trails its own session-72 body (the floating-icons row,
  the 798/71/16 carry lines) by two days/eight ship rounds.
- **A1-2 (AUDIT-1 L-1, structural)**: the DB-residue predicate
  (`/\p{Cc}/u.test(v) || v.startsWith('"') || v.startsWith("'")`) is
  triplicated with no one home — three independent literals at
  boot-env.ts:441 (process-env arm), :725 (file-residue arm), :1032
  (the inert-value seam's negated form). A future widening must be
  edited in three places or the arms silently diverge — the exact
  drift hazard the one-home doctrine (S29-2, S59-1) exists to prevent.
- Registered, NOT cured (the Informational set): the S72-3b dotted
  mapped-IPv4 arm is unreachable through the URL parser (the hostname
  normalizes to compressed hex — the comment's "pre-normalization
  inputs" rationale cannot occur; kept as belt-and-braces, its comment
  respelled by the S73-2 extraction in passing); the S72-2b
  slash-fold erases a lone-slash fragment/query (`#/`, `?/` — the
  three lenses stay mutually consistent by design, the S71-4a
  healthy-empty-delimiter posture extended to a one-char non-empty
  face — REGISTERED as the S72-2b boundary note in this plan); the
  owner's narration pad numbering (the session_73.md pad carries the
  prior round's baseline numbers — the formal log written at ship
  replaces its content, the standing convention).

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
the five-route head census (bare `/` + `/login` titles, the `<Page> |`
family, the canonicals, desc lengths 170/170/92/95/95); sitemap 4
URLs (weekly 1.0/0.8) + robots allow-all + the sitemap pointer; the
generator DEAD at the 30s probe (the button stuck disabled, no post
landed — the D-1 drifted failure face: no banner visible this walk).
CLONE leg (logged in, landed `/` — the documented /Home deviation):
the aria superset ACTIVE (Open/Close-menu relabel, expanded
true→false, `aria-controls="mobile-menu"` with the panel `id`); the
panel inner byte-identical with the transparent-over-hero posture,
open height 265 (byte-equal); Escape L-CLOSE-WITH-FOCUS-RETURN (focus
observed back on the toggle); the outside-tap BOTH-OPEN (parity with
the reference); the route-change L-HIDDEN-IN-DOM (panel in DOM,
display:none, expanded=false); the desktop census identical (+ the
skip-link superset); the gradient byte-identical; the head census +
sitemap/robots identical modulo origin; the generator LIVE (a real
post — hashtags incl. the idea-derived #Sustainable #Fashion pair,
the Copy button). **No Tailwind v4 bug in the mobile menu** — every
mechanic live-verified at 390×844 on both legs.

## The cures (TDD — the pins first, born RED, then the batteries)

Phase 1 — six unit pins born RED exactly as designed:

- **S73-1a** (boot-env.test.ts): the control-char keyword-prefix pin —
  the `\x01` face through BOTH printers (the process-env arm's
  report.warnings AND the file arm's returned warning) asserting the
  masked `password=***` output; the `\t` mechanism control already
  pinned by the S72-1a family (one owner per face).
- **S73-2a** (boot-env.test.ts): the one-home pin — the residue
  predicate exists at EXACTLY ONE site in boot-env.ts (the `\p{Cc}`
  census over the source: the helper's own body), the three inline
  literals gone.
- **S73-3a** (a11y-controls.test.ts): the outline-hidden family pin —
  the retire census (`focus:outline-none` / `focus-visible:
  outline-none` spellings GONE from src/, the bare resting container
  `outline-none` at the ToastCard root EXEMPT — it is not a focus
  indicator) + the forced-colors family present at the census's sample
  carriers.
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
  keyword exactly as whitespace and a residue quote are (the C0 + DEL
  + C1 families; the `\s` members are subsumed — the overlap is
  harmless). The masked `password=***` output carries no control
  char, so the arms below are unchanged. The S72-1b boundary comment
  respelled: the backslash-preceded keyword stays the ONE registered
  unmasked face (a double-malformation; adding `\\` to the class is
  the named lift).
- **S73-2b** (boot-env.ts): the one-home extraction — a module-local
  `dbUrlCarriesResidue(value: string): boolean` consumed at all three
  sites (the process-env arm, the file-residue arm, the inert-value
  seam's negated form); the S72-3b dotted-arm comment respelled to the
  honest belt-and-braces rationale (unreachable through the URL
  parser — the hostname normalizes to compressed hex — kept for
  robustness against future non-URL callers).
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
  non-interactive container). The four pin suites updated in the same
  commit (toast-anatomy:67, a11y-controls:302/415, login-reset:86,
  error-boundaries:213/215/224/226).
- **S73-4b** (toast.tsx): the exit arm — the Toaster's mount effect
  gains the document-level `pointerout` listener beside the
  `pointermove` tracker, gated `e.pointerType === "mouse" &&
  e.relatedTarget === null` (the pointer left the window), nulling
  `lastMousePos`; the SAME cleanup pairing (the mount effect's return
  removes both). The S72-4 comment block extended with the exit-face
  mechanism (the stale exit position could phantom-pause a card
  mounting under it while the pointer is outside — the tracker now
  goes null at the boundary).
- **S73-5b/S73-6b**: no code change — the pins are the cures' teeth
  (the site.ts strip and the manifest composition already behave
  correctly; the pins close the mutation-battery gap).
- **S73-7**: the PAD header re-anchor (2026-11-14 → 2026-11-16) —
  docs lockstep.

Phase 3 — the revert-plant battery, every NEW pin proven failable:
the prefix revert plant (`(^|[\s"'\u0000-\u001f\u007f-\u009f])`
narrowed back to `(^|[\s"'])`) REDs exactly S73-1a; the one-home
revert plant (the helper inlined back to three literals) REDs exactly
S73-2a; the outline revert plant (`outline-hidden` narrowed back to
`outline-none` at the sample carriers) REDs exactly S73-3a; the
exit-arm revert plant (the pointerout listener dropped) REDs exactly
S73-4a; the seam-strip revert plant (site.ts `[\/?#]` narrowed back
to `/\/+/`) REDs exactly S73-5a; the manifest revert plant (the
composition broken — a hardcoded origin) REDs exactly S73-6a. All
restored GREEN.

## The lockstep

UNIT 798 → **804** (+6 its: S73-1a/2a/3a/4a/5a/6a ×1 each), SUITES 41
held (no new file), E2E 71 held (the exit face is source-pinned — a
behavioral e2e leg would depend on engine-specific synthetic
pointerout semantics, the S72-4 lesson's own doctrine: the
deterministic arm is the listener wiring), E2E_SPECS 9 held, SMOKE 16
held, BADGE 869 → **875**. The ten provenance sites re-anchored
`1..72` → `1..73`; the docs-counts ladder's s73 rung appended with
its +6/+0 breakdown. PAD: §8.1's table + §8.3's carry line at
804/71/16; §12's boot-env.ts/toast.tsx rows re-anchored to the live
line counts; the header date (S73-7). README's badge + session-73
row + gate footer; AGENTS's plans-map seventy-third round + the
804/41 + 71; CLAUDE's 804/41 + 71; SKILL v1.68.0 → v1.69.0
(frontmatter, §0.5 range, Appendix-A session-73 row, Appendix-B
re-certification through 73 + the gate line's 804/71 + the pre-ship
checklist's 804/71/16); the formal `docs/session_73.md` (replacing
the owner's narration); the plan's post-execution record; worklog Task
73.

## The ship

The full gate green on the final tree; captures on the dev server
PIL-verified (the mobile-menu open 390×844 + the landing 1440×900);
the Conventional Commit to main and the push via the SSH wrapper
runbook.

**Gate at the session-73 ship: lint 0/0 · tsc 0 · unit 804/804 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH.**

---

## The post-execution record (the plan vs the execution)

- **All six unit pins born RED exactly as designed** (S73-1a: the
  both-printer control-char pin 1 RED; S73-2a: the one-home census
  1 RED — census counted 4 `\p{Cc}` sites on the pre-cure tree, the
  plan's number, confirming the lead's manual site map against the
  audit lanes' 3; S73-3a: the retire census 1 RED with 13 offender
  entries; S73-4a: the exit-arm pin 1 RED; S73-5a: the seam-strip
  pin 1 RED; S73-6a: the manifest composition pin 1 RED).
- **All six revert plants verified, two with in-battery catches**
  (the prefix revert REDs exactly S73-1a; the one-home revert —
  see the first catch below — REDs exactly S73-2a; the outline
  revert REDs exactly S73-3a; the exit-arm listener revert REDs
  exactly S73-4a; the seam-strip revert REDs exactly S73-5a; the
  manifest-origin revert REDs exactly S73-6a; all restored GREEN —
  the battery run as a deterministic plant/test/unplant script
  after two ad-hoc plant attempts misfired).
- **The battery's first plant-design falsification (the S73-2a
  face)**: the one-home revert plant originally narrowed the
  HELPER's own predicate — the three consumer sites still routed
  through it, the file-wide census stayed 1, and the pin stayed
  GREEN: a plant with no teeth, exactly the vacuity the S25-11
  lesson exists to catch. The corrected plant re-inlines the
  literal at ONE consumer site (the regression the drift hazard
  predicts: one site widened, the other two silently left behind)
  — REDs exactly the census.
- **The battery's operational catch**: one interrupted ad-hoc plant
  run (a quoting-mangled shell command) left the toast.tsx
  exit-arm listener deleted on disk; caught by the 23/23 toast
  suite re-run, restored, and re-verified before the deterministic
  battery re-ran — no plant leaked into the final tree (the full
  gate's green is the backstop).
- **The one-home census's own mid-execution catch**: after routing
  the four consumers, the census still counted 3 — the helper's
  own doc comments spelled the `\p{Cc}` literal twice (the body's
  1 + the comments' 2); the comments respelled to prose that never
  spells the literal, the census settling at exactly 1 (the
  helper body's own site, the pin's designed anchor).
- **The designed count-lag faces fired exactly as projected** (the
  full unit run at the 804 reality showed exactly the 2 expected
  docs-counts lockstep REDs — the frontmatter/§8.1/§8.3/badge/
  plans-map sites ahead of their re-anchor; all cured by the
  lockstep; docs-counts GREEN after).
- Counts at ship: UNIT 804 / SUITES 41 / E2E 71 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 875; the ten provenance sites at 1..73 (lag 0,
  uniform — the S65-6a posture); SKILL v1.69.0; captures 153/154
  PIL-verified; the full gate green on the final tree; push to
  main via the SSH wrapper runbook.
