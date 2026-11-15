# Session 70 — The Redaction Spaced-Equals Cure + The Interior-Quote Bare-Run Cure + The Bare-Origin Userinfo Gate + The Toast Mixed-Modality Pause Guard + The Cheap-Info Batch and the Register Batch (2026-11-16)

## Baseline (the round opened on 6985f32)

Workspace refreshed via `git pull` (`6985f32` = session-69's `f398402` +
the owner's narration commit carrying `docs/session_70.md` as the
round-69 working narration; the formal log this round writes at ship
replaces its content). Core docs re-read and re-verified at the
session-69 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.65.0),
then the session-69 set (the formal `docs/session_69.md` log, the
session-69 plan's post-execution record, worklog Task 69, the owner's
narration `docs/session_70.md`), and the S69 cures verified in source
(the quoted-tail alternation in both redaction passes, the verify
submit both-flags mirror gate, the bare-origin divergence gate, the
residue arm's trimmed face). `.env` held at the contract
(`DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root,
`AUTH_SECRET` set); db:push + db:seed + census MATCH (1 user + 0
contact messages). The ambient-shell `DATABASE_URL` pollution (an
absolute path OUTSIDE the repo — the S63..S69 hazard) found live again
and neutralized with `env -u DATABASE_URL` on every DB-touching
command.

Baseline gate: lint 0/0 · tsc 0 · unit **782/782** (40 files — the
session-69 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..69 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on the
runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` since session-22's re-review — the
recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; AUDIT-1 re-verified the
  db-path seam monopoly — `process.env.DATABASE_URL` read ONLY inside
  the seam, at db-path.ts:382). No code change needed — the contract
  already holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (AUDIT-3: vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port, the pinned
  `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #43 AND by AUDIT-3's source
  read (the force-static trio, `/Home` never listed, byte-exact body
  pins; seo-surfaces, page-titles, route-title, http-headers suites
  green in the baseline run).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs (the hamburger byte-identical + the aria superset; all
  three interaction faces at their documented postures); AUDIT-2
  re-verified all documented v4 mitigations in source AND in the
  compiled artifact (source scoping, zero `@media (hover:hover)` in
  the built sheet, literal-hex `@theme`, the button-cursor base rule,
  no banned gradient pair, no `tailwind.config.js`). **No Tailwind v4
  bug found.**
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 1 Medium / 3 Low / 8 Info**
(AUDIT-1 API/lib seams 0/0/1/2/2 · AUDIT-2 components/pages/effects
0/0/0/1/3 · AUDIT-3 SEO/configs/tests/docs 0/0/0/0/3). Every
load-bearing finding hand-verified by the lead through the REAL
exported warning builders (`bootEnvCheck` + `databaseUrlInertValueWarning`
with the spaced-equals, interior-quote, and credentialed-origin faces —
10/10 probe checks PASS, scratch script deleted after); AUDIT-2's toast
finding verified by direct code read at the cited lines (:225 the
unguarded `onMouseLeave`, :175-177 the claim it falsifies); AUDIT-3's
docs-lockstep table independently re-derived (all counts MATCH). The
standing contracts all held (the envelope on 13 handlers, the db seam
monopoly, the bounded reader, the limiter's buckets, the auth/revocation
family, the boot gate arms, all Tailwind v4 mitigations, the
mobile-menu mechanic set, the React 19 laws, the SEO family;
docs-counts 56/56, PAD §12's rows intact, the ten provenance sites
uniformly at `1..69` with diskMax 70 — the designed narration-window
lag-1 transient, unit 782/782 re-run live in the baseline).

The findings this round cures:

- **S70-1 (AUDIT-1 M-1, live-probed)**: the redaction passes' key face
  requires a TIGHT `=` — libpq's documented keyword grammar makes
  spaces around the equals sign OPTIONAL ("keyword = value"), and the
  spaced spelling `password = topsecret` printed the password verbatim
  through every warning arm (the inert-value leg fires on CLEAN
  values, so a working spaced-form password qualifies). The
  one-owner doctrine ("the password never prints") defeated by one
  optional-whitespace keystroke inside the family the S67-1 keyword
  pass claims to own.
- **S70-2 (AUDIT-1 L-1, live-probed)**: an interior quote in a BARE
  value (`password=ab'cd`) stopped the bare run at the quote and
  printed the post-quote tail (`***'cd`) — password material under the
  repo's own container model (a quote only opens a container when it
  LEADS the value; the leading-opener arms already own that case).
  Distinct from the registered unencoded-& tail (whose leaked tail is
  NOT password — libpq stops at `&`; here it does not stop).
- **S70-3 (AUDIT-1 L-2, live-probed)**: `runtimeIsBareOrigin` ignores
  userinfo — a credentialed origin (`http://user:pass@example.com`)
  passed the S69-3 gate (pathname "/", no search, no hash) and
  double-warned (the S25-4 shape warning PLUS the divergence warning),
  the exact "two warnings, one root cause" genus S69-3 cured for the
  path/non-http(s) faces; and `normalizeSiteUrl` degrades the
  credentialed value to the localhost default, manufacturing a
  spurious mismatch even when the served host is IDENTICAL.
- **S70-4 (AUDIT-2 L-1, code-read)**: the toast card's `onMouseLeave`
  unpauses unconditionally — a keyboard user who focused the Dismiss
  button (`onFocus` → paused) and then sweeps the mouse across and out
  of the card re-arms the 4s auto-dismiss WHILE FOCUS IS STILL INSIDE,
  the timer unmounts the focused card, and focus falls to `<body>` —
  the exact WCAG 2.4.3 genus the S66-4 arm cured for the click path,
  falsifying the S20-6 claim at toast.tsx:175-177 ("an auto-dismiss
  never fires while focus is inside the card"). The mirror face rides
  `onBlur` (focus leaves while the pointer still hovers → unpause →
  dismiss mid-hover, violating the hover-hold contract).
- **S70-5 (the cheap-Info batch)**: AUDIT-1 I-2 — the file-face arm's
  comment says "the branch conditions below still test the RAW value"
  while `fileUrl` is the TRIMMED face (the post-S69-4 world; the word
  invites misreading); AUDIT-2 INFO-1 — the S21-5 cure's scope note
  does not name the accepted dark cross-family gradients (the
  slate↔teal utilities interpolate in oklab; sub-perceptual at L*<25,
  42 clean walks — a future auditor re-derives it); AUDIT-3 INFO-1 —
  the eslint ignores lack the generated-artifact dirs
  (`test-results/`, `playwright-report/`, `coverage/` ride .gitignore
  but not the lint sweep; zero live face today, a future
  HTML-reporter/coverage switch would break the 0/0 gate); AUDIT-3
  INFO-3 — the registered `E2E_PORT` NaN-guard lift (a non-numeric
  value yields `http://localhost:NaN` and fails at webServer boot
  after the 60s timeout with an opaque URL; PAD §11 row, the named
  lift).

## Parity walk #43 — the forty-third consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`, bare title): the hamburger byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the priced amber CTA
pill ("Upgrade to Pro – $19"), NO panel id, open height 265; Escape
R-OPEN; the outside-tap R-OPEN; the route-change R-UNMOUNT (via the
Pricing link); the desktop census 6 visible at 1440 (burger hidden,
the desktop pill bare "Upgrade to Pro"); the brand gradient
byte-identical (`linear-gradient(to right, rgb(45, 212, 191), rgb(251,
191, 36))`); the five-route head census (bare `/` + `/login` titles,
the `<Page> |` family, the canonicals, desc lengths 170/170/92/95/95);
sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all + the sitemap
pointer; the generator DEAD — no post, no Copy button, the button at
rest with NO error surface at the 5s/30s probes (the session-68/69
silent-rest face, re-confirmed). CLONE leg (logged in, landed `/` —
the documented /Home deviation): the aria superset ACTIVE (Open/Close
-menu relabel, expanded true→false, `aria-controls="mobile-menu"` with
the panel `id`); the panel inner byte-identical with the
transparent-over-hero posture (the reference's `bg-slate-900/98` is a
dead class in its own build — correctly not shipped), open height 265
(byte-equal); Escape L-CLOSE-WITH-FOCUS-RETURN (focus observed back on
the toggle); the outside-tap BOTH-OPEN (parity with the reference);
the route-change L-HIDDEN-IN-DOM (panel in DOM, `display:none`,
expanded=false); the desktop census identical; the gradient
byte-identical; the head census + sitemap/robots identical modulo
origin; the generator LIVE (a real post — 7 hashtags incl. the
idea-derived pair — the Copy button, the quota counter 3→2). **No
Tailwind v4 bug in the mobile menu** — every mechanic live-verified at
390×844 on both legs. Captures 147/148 on the dev server PIL-verified
(1440×6871 landing full-page; 390×844 mobile menu open, the amber-CTA
field present — pixel-scanned).

## The cures (the plan, TDD — the pins first, born RED)

### Phase 1 — the pins (born RED, before any cure)

- **S70-1a** the spaced-equals pin (boot-env.test.ts, a new S70
  describe beside the S69-1 battery, 1 it): the keyword-form spaced
  password (`password = topsecret`, closed and unclosed-quote
  variants) and the query-param spaced password (`?password =
  topsecret`) never print through ANY warning arm (the inert-value
  arm + the residue arm via `bootEnvCheck` with an interior control
  char vehicle); the controls — the tight-equals forms still mask;
  the S69-1 quoted spaced forms (`password = 'my secret'`) mask with
  their quoted tails; the identity/host visibility doctrine holds
  (`user=admin`, `host=localhost` stay visible).
- **S70-2a** the interior-quote pin (the same describe, 1 it): a bare
  value carrying an interior single quote (`password=ab'cd`) or
  double quote (`password=a"b`) never prints its post-quote tail
  through any arm; the control — the LEADING-quote containers (the
  S69-1 faces) still mask as containers, byte-identical to their
  pinned shapes.
- **S70-3a** the userinfo pin (the same describe, 1 it): a
  credentialed runtime origin against a healthy served face answers
  EXACTLY ONE warning (the S25-4 shape arm owns it — it names the
  username/password — and the divergence arm stays silent); the
  same-host spurious-mismatch face (credentialed origin vs the
  identical served host) also answers exactly one; the control — the
  S69-3a path/non-http(s)/well-formed faces re-verified untouched in
  the same run (their pins already own them; this it adds only the
  userinfo faces).
- **S70-4a** the toast mixed-modality pin (toast-anatomy.test.ts, 1
  new it beside the S20-6 pair): the `onMouseLeave` unpauser carries
  the focus-containment guard (`rootRef.current?.contains(
  document.activeElement)`) and the `onBlur` unpauser carries the
  pointer guard (`rootRef.current?.matches(":hover")`) — the pause
  doctrine "focus inside OR pointer over" mechanically spelled; the
  two existing S20-6 seam pins RE-ANCHORED in the same commit to the
  guarded spellings (the designed co-pin coupling, documented in both
  pins — the S69-2a precedent).
- **S70-5d** the e2e-port guard pin (a NEW file tests/e2e-port.test.ts,
  2 its): the malformed faces throw naming the knob (`"nan"`, `"0"`,
  `"70000"`, `"31.5"`, `"abc"`, `""`, `" 3100"`-with-space,
  zero-padded `"03100"` — the canonical-form check); the healthy
  faces return verbatim (`"3200"` set; the `"3100"` default unset)
  with the env restored in a finally.

### Phase 2 — the cures

- **S70-1b** the spaced-equals widening in BOTH passes
  (boot-env.ts:800 + :833): the key face `((?:password|passfile|
  sslpassword)=)` widens to `((?:password|passfile|sslpassword)
  \s*=\s*)` — libpq's optional-whitespace grammar. The bounded
  over-redaction documented at the site (an empty spaced password
  masks the following token; `password\n= value` on a newline rides
  the same acceptance — `\s` is the faithful libpq whitespace class;
  over-redact, never under).
- **S70-2b** the bare-run quote drop in BOTH passes: the bare-run
  alternation tails `[^&\s"']*` → `[^&\s]*` (query) and `[^\s"']*` →
  `[^\s]*` (keyword) — a quote only opens a container when it LEADS
  the value (the first two alternation arms own that case); an
  interior quote is value material, so the run consumes it. Every
  pinned S63-2/S64-1/S65-1/S66-1/S67-1/S69-1 shape re-verified
  byte-identical under the widening (none carries an interior quote
  in a bare value).
- **S70-3b** the bare-origin userinfo gate (boot-env.ts
  runtimeIsBareOrigin): `u.username === "" && u.password === ""`
  joins the conjuncts — a credentialed origin is not a well-formed
  bare origin (the S25-4 shape arms own its warning; "exactly one
  warning per bad posture" now mechanically true for the userinfo
  face too).
- **S70-4b** the toast mixed-modality guards (toast.tsx:224-231):
  `onMouseLeave={() => { if
  (!rootRef.current?.contains(document.activeElement))
  setPaused(false); }}` and `onBlur={() => { if
  (!rootRef.current?.matches(":hover")) setPaused(false); }}` — the
  S20-6 comment re-spelled to the two-modality doctrine; the sticky
  touch-hover residual named at the site (the failure direction is
  "the card stays a beat longer" — the safe direction).
- **S70-5b** the cheap-Info cures: the boot-env file-face comment's
  "RAW value" respelled to "the un-redacted, trimmed face" (the
  S69-4 world); the design-tokens S21-5 comment gains the
  dark-cross-family acceptance sentence (the slate↔teal utilities
  interpolate oklab; L*<25 sub-perceptual; the S70-2 walk re-corroboration
  noted); the eslint ignores array gains `"test-results/**"`,
  `"playwright-report/**"`, `"coverage/**"` (the type-gate skills pin
  is regex-anchored — stays green); the e2e-port.ts guard
  (the canonical integer 1..65535 check, the throw naming the knob
  and the received value, the S66-AUDIT-3-I-6 register row retired
  from PAD §11).

### Phase 3 — the batteries (every NEW pin proven failable)

1. The spaced-equals revert plant (the `\s*=\s*` narrowed back to
   `=`) → REDs exactly S70-1a; restored GREEN.
2. The bare-run revert plant (the quote chars restored to the
   exclusion sets) → REDs exactly S70-2a; restored GREEN.
3. The userinfo-gate revert plant (the username/password conjunct
   dropped) → REDs exactly S70-3a; restored GREEN.
4. The toast-guard revert plant (the unguarded spellings restored) →
   REDs exactly S70-4a + the two re-anchored S20-6 co-pins (the
   designed coupling); restored GREEN.
5. The e2e-port revert plant (the guard dropped) → REDs exactly
   S70-5d's throw it; restored GREEN.

### Phase 4 — the lockstep

UNIT 782 → **788** (+6 its: S70-1a ×1, S70-2a ×1, S70-3a ×1, S70-4a
×1, S70-5d ×2), SUITES 40 → **41** (the new tests/e2e-port.test.ts),
E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 852 → **858**.
The ten provenance sites re-anchored `1..69` → `1..70` (all ten at
diskMax, lag 0, uniform — the S65-6a posture); the local untracked
`.env`'s provenance note refreshed to match. The docs-counts ladder's
s70 rung appended with its +6/+1 breakdown; the plans map gains the
seventieth round (the AGENTS.md plans-map line + the plan file on
disk, 1:1). PAD: §8.1's table + §8.3's carry line at 788/41/70/16;
§11 — the E2E_PORT register row RETIRED (the cure landed), the toast
mixed-modality face NOT registered (cured), any residual faces
registered as needed; §12 re-anchored if the touched files' line
counts drifted. README's badge + the session-70 row + the gate
footer; AGENTS's plans-map seventieth round + the 788/41; CLAUDE's
788/41; SKILL v1.65.0 → v1.66.0 (frontmatter, §0.5 range,
Appendix-A session-70 row, Appendix-B re-certification through 70);
the formal `docs/session_70.md` (replacing the owner's narration);
the plan's post-execution record; worklog Task 70.

## The ship

The full gate green on the final tree; captures 147/148 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-70 ship: lint 0/0 · tsc 0 · unit 788/788 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**

## The post-execution record (session-70 ship)

Executed as planned. The deviations and catches the record owes the
truth:

- **The count arithmetic landed exactly at the plan's projection**:
  UNIT 782 → **788** (+6 its: S70-1a, S70-2a, S70-3a, S70-4a, S70-5d
  ×2), SUITES 40 → **41** (the new tests/e2e-port.test.ts), BADGE
  852 → **858**. No deviation.
- **The battery-1 plant's own birth-defect**, caught in-round (the
  S69-7a precedent): the first revert plant dropped the key group's
  closing paren — an INVALID REGEX that failed at MODULE level (the
  whole file errored, not the targeted test). The corrected plant
  isolates the cure exactly: `\s*=\s*` → `=`, REDs exactly S70-1a.
  A plant must fail the PIN, not the parser.
- **All pins born RED exactly as designed** (S70-1a: 1 RED; S70-2a:
  1 RED; S70-3a: 1 RED; S70-4a: 1 RED + the two designed S20-6
  re-anchor faces; S70-5d: 2 RED). All five revert plants verified
  (the spaced-equals revert REDs exactly S70-1a; the bare-run revert
  REDs exactly S70-2a; the userinfo-gate revert REDs exactly S70-3a;
  the toast-guard revert REDs exactly S70-4a + the two co-pins; the
  e2e-port revert REDs exactly both S70-5d its); all restored GREEN.
- **The designed count-lag faces fired exactly as projected** (the
  UNIT/SUITES reality census, the plans map, the badge/footer/
  frontmatter/Appendix-B sites — 12 doc-site REDs surfaced at the
  lockstep, all cured; docs-counts 56/56 after).
- **The parity walk's mid-walk instrument catch**: the first
  mobile-panel probe used an overflow-hidden + links heuristic that
  picked the HERO CARD (h:527) instead of the menu panel (h:265) on
  the reference — the three interaction faces re-measured against
  the correct `div.md\\:hidden.bg-slate-900\\\\/98` selector before
  any posture was recorded (the measure-the-right-element doctrine;
  the computed-style law one face over).
- The toast's S20-6 claim comment re-spelled WITH the cure (not just
  the guards): "mechanically true since the mixed-modality guards
  landed" — the comment-lag genus closed in the same commit.
- Counts at ship: UNIT 788 / SUITES 41 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 858; the ten provenance sites at 1..70 (lag 0,
  uniform — the S65-6a posture); SKILL v1.66.0; captures 147/148
  PIL-verified; the full gate green on the final tree; push to main
  via the SSH wrapper runbook.

**Gate at the session-70 ship: lint 0/0 · tsc 0 · unit 788/788 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
