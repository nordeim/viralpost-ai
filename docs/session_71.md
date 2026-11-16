# Session 71 — The Redaction Escape-Aware Containers Cure + The Pass-Reorder Cure + The Query Control-Char Run Cure + The Divergence Unification + The Loopback Grammar + The Toast Mount Probe + The Manifest-Link Pin and The Info Batch (2026-11-16)

The round opened on the refreshed workspace (`d85257e` = session-70's
`62c8eeb` + the owner's narration commit carrying `docs/session_71.md`
as the round-70 working narration; this formal log replaces its
content at ship). The core docs re-read and re-verified at the
session-70 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.66.0),
then the session-70 set (the formal `docs/session_70.md` log, the
session-70 plan's post-execution record, worklog Task 70, the owner's
narration `docs/session_71.md`), and the S70 cures verified in source
(the `\s*=\s*` widening + the bare-run quote drop in both redaction
passes, the bare-origin userinfo conjuncts, the toast mixed-modality
guards, the e2e-port canonical-integer guard).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); db:push + db:seed +
census MATCH (1 user + 0 contact messages). The ambient-shell
`DATABASE_URL` pollution (an absolute path OUTSIDE the repo — the
S63..S70 hazard) found live again and neutralized with `env -u
DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **788/788** (41 files — the
session-70 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..70 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on the
runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` (local HEAD === origin/main, re-fetched
this round) — the recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; the db-path seam monopoly
  re-verified — `process.env.DATABASE_URL` read ONLY inside the seam).
  No code change needed — the contract already holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port with the S70-5d
  guard, the pinned `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #44 AND by AUDIT-3's source
  read (the force-static trio, `/Home` never listed, byte-exact body
  pins; the family's suites green in the baseline run). The walk's
  sitemap/robots/canonical/description census identical modulo origin.
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs (every interaction face at its documented posture;
  hamburger byte-identical + the aria superset). **No Tailwind v4 bug
  found.**
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 6 Low / 6 Info**
(AUDIT-1 API/lib seams 0/0/2/3/1 · AUDIT-2 components/pages/effects
0/0/0/1/3 · AUDIT-3 SEO/configs/tests/docs 0/0/0/2/2). Every
load-bearing finding hand-verified by the lead through the REAL
exported warning builders (`bootEnvCheck` +
`databaseUrlInertValueWarning` + `databaseUrlFileResidueWarning` with
the escaped-quote, leading-DQ, @-in-quoted-password, @-in-bare-password,
and tab-in-query faces — 11/11 probe checks CONFIRMED, the scratch
probes deleted after; the URL-getter edge behaviors empirically probed
in bun: the empty `?`/`#` delimiter drops from the getters but SURVIVES
`toString()`, the `//` pathname fails the raw-getter gate while both
the shape arms and the normalizer fold it healthy, the IPv6 hostname
keeps its brackets, `127.0.0.2` misses the exact-match predicate; the
libpq escape grammar confirmed against the PostgreSQL docs — "Single
quotes and backslashes within a value must be escaped with a
backslash, i.e., \' and \\", and "Spaces around a setting's equal sign
are optional").

The findings this round cured:

- **S71-1 (AUDIT-1 M-1, live-probed)**: the quoted-value alternation
  closes at the FIRST same-quote char — libpq's sanctioned `\'` escape
  inside a single-quoted password (`password='p\'ass'`) printed its
  post-escaped-quote tail (`***ass'`), and a leading-`"` value
  (`password="ab"cd`) printed its post-close tail (`***cd`), through
  every warning arm (the boot residue arm, the file-residue arm, and
  the inert-value arm). The "the password never prints" doctrine
  defeated by the documented escape spelling itself.
- **S71-2 (AUDIT-1 M-2, live-probed)**: the scheme-less last-`@` mask
  runs BEFORE the keyword pass and DESTROYS the prefix that carries
  the `password=` key — a password containing `@` (needs no escaping
  in single quotes; one of the most common real-world spellings)
  leaked its post-`@` tail through every arm
  (`password='S3cr@tPass!'` → `***@tPass!'`; the bare spelling
  `password=p@ss dbname=x` → `***@ss dbname=x` — the key visibility
  destroyed AND the tail leaked), while the keyword pass that would
  have masked it never fires on the masked output.
- **S71-3 (AUDIT-1 L-1, live-probed)**: the query pass's bare run
  `[^&\s]*` stops at whitespace — an interior control char in a URI
  query password (`?password=pa\tss`) printed its post-char tail
  (`***\tss`); in URI form libpq's value scan runs to `&`/end, so the
  control char is VALUE material (distinct from the registered
  unencoded-`&` tail, where libpq genuinely stops).
- **S71-4 (AUDIT-1 L-2, live-probed)**: the divergence arm's predicate
  (raw-URL getters) and its comparison (the normalizer's
  strip+serialize) disagree on edge spellings — a false POSITIVE
  (`http://example.com?` vs the identical served origin warned "NOT
  what this server serves") and a false NEGATIVE
  (`http://example.com//` vs a DIFFERENT served host answered ZERO
  warnings). The S69-3 "exactly one warning per bad posture" law,
  broken at both edges by three spellings-lenses disagreeing.
- **S71-5 (AUDIT-1 L-3, live-probed)**: the loopback predicate misses
  the IPv6 and 127/8 families — `http://[::1]:3000` (the hostname
  keeps its brackets) and `http://127.0.0.2:3000` both pass as healthy
  production origins (no unset/loopback warning; `servedIsHealthy`
  counts them healthy).
- **S71-6 (AUDIT-2 L-1, code-read)**: the toast pause machinery is
  entirely transition-event-driven — a card that MATERIALIZES under a
  stationary pointer receives no `mouseenter` (browsers only fire it
  on pointer movement), so the 4s timer arms and auto-dismisses the
  card mid-read with the pause affordance never engaging; the
  bottom-right viewport is exactly where cursors idle. Pre-existing
  (not an S70 regression); the S70-4 guards bound but did not close
  it.
- **S71-7 (AUDIT-3 L-1, rg-verified)**: the manifest discovery link
  (`<link rel="manifest">`, the root layout's `manifest:` field) has
  NO pin at any layer (unit pins the body, e2e pins the endpoint,
  smoke pins the 200s — nobody owns the head-level link or the source
  field) — a single-line deletion ships green through the whole 858-
  check gate while PWA discoverability silently degrades (the
  S29-5/S31-7a rendered-DOM doctrine's last open face).
- **S71-8 (AUDIT-3 L-2, rg-verified)**: seo-surfaces carries a
  duplicated sub-arm — the S25-6 `it` re-asserts the S24-11
  OG_IMAGE-declaration regex verbatim (an OG_IMAGE-const deletion
  trips two `it`s — the N12-2 exactly-one-pin doctrine).
- **S71-9 (the cheap-Info batch)**: AUDIT-2 INFO-1 — the
  `@custom-variant hover` comment claims only "every `hover:`
  utility" while the unwrap verifiably restores the compound family
  too (group-hover/peer-hover compile bare with the custom variant —
  probe- and artifact-verified; a future auditor could "find" a
  phantom missing mitigation); AUDIT-2 INFO-2 — the a11y battery's
  `text-slate-300` sanctioned-register entry cites "the dark
  marketing surfaces" but its substring match also silently covers
  the 404's light-surface `text-7xl text-slate-300` h1 (a face the
  citation doesn't own); AUDIT-3 INFO-1 — the eslint ignores lack
  `db/**`/`docs/**` (zero live face — no lintable files there today —
  but symmetry with next.config's excludes is the belt-and-braces
  posture); AUDIT-3 INFO-2 — the layout's viewport export rides no
  pin while the layout's own comment lists it among the DOM-verified
  faces (it equals Next's built-in default byte-for-byte — zero drift
  surface; the comment overstates); AUDIT-1 I-1 — the empty-userinfo
  origin (`http://@example.com`) passes the S70-3 conjuncts as a
  healthy bare origin (parse-invisible: the URL parser drops the
  empty userinfo; zero credentials ride it — a REGISTER, not a cure).

## Parity walk #44 — the forty-fourth consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`, bare title): the hamburger byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the priced amber CTA
pill ("Upgrade to Pro – $19"), NO panel id, open height 265; Escape
R-OPEN; the outside-tap R-OPEN; the route-change R-UNMOUNT (via the
Pricing link); the desktop census 6 visible at 1440 (burger
display:none, the desktop pill bare "Upgrade to Pro"); the brand
gradient byte-identical (`linear-gradient(to right, rgb(45, 212, 191),
rgb(251, 191, 36))`); the five-route head census (bare `/` + `/login`
titles, the `<Page> |` family, the canonicals, desc lengths
170/170/92/95/95); sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all
+ the sitemap pointer; the generator DEAD at the 30s probe (no post,
no Copy) — the failure face DRIFTED again: the reference now renders
a `div.mt-3.flex.items-start.gap-2.text-xs.text-red-500` banner
("Generation failed, so this attempt didn't use one of your free
tries. Please try again.") — the session-68..70 silent-rest face is
superseded by a red failure banner (a reference-side 402-defect face;
the clone's LIVE generator is the documented superset and never shows
it in the happy path — the drift is recorded, not replicated).
CLONE leg (logged in, landed `/` — the documented /Home deviation):
the aria superset ACTIVE (Open/Close-menu relabel, expanded
true→false, `aria-controls="mobile-menu"` with the panel `id`); the
panel inner byte-identical with the transparent-over-hero posture,
open height 265 (byte-equal); Escape L-CLOSE-WITH-FOCUS-RETURN (focus
observed back on the toggle); the outside-tap BOTH-OPEN (parity with
the reference); the route-change L-HIDDEN-IN-DOM (panel in DOM,
display:none, expanded=false); the desktop census identical; the
gradient byte-identical; the head census + sitemap/robots identical
modulo origin; the generator LIVE (a real post — 6 hashtags incl.
the idea-derived #Sustainable #Fashion pair, the Copy button, the
quota counter 3→2). **No Tailwind v4 bug in the mobile menu** —
every mechanic live-verified at 390×844 on both legs. Captures
149/150 on the dev server PIL-verified (390×10718 mobile menu open
full-page, the amber-CTA field pixel-scanned present; 1440×6971
landing full-page).

## The cures (TDD — the pins first, born RED, then the batteries)

Phase 1 — six unit pins born RED exactly as designed (S71-1a the
escape-aware-container pin, S71-2a the pass-reorder pin, S71-3a the
query control-char pin, S71-4a the divergence-unification pin, S71-5a
the loopback-grammar pin, S71-6a the toast mount-probe pin; the
S71-3a tab-face assertion fixed in-commit to match JSON.stringify's
two-char `\t` escape rendering — the born-RED shape confirmed
non-vacuous), plus the S71-7a manifest-link e2e arm inside the
S22-14 icon-contract test.

Phase 2 — the cures:

- **S71-1b** the escape-aware + trailing-junk quoted arms in BOTH
  passes (boot-env.ts): the SQ arm `'(?:[^'\\]|\\.)*'?[^\s]*`
  (keyword) / `'(?:[^'\\]|\\.)*'?[^&]*` (query) and the DQ mirror —
  libpq's documented escape grammar (`\'` and `\\` inside a
  single-quoted value) consumes escaped quotes as pairs, and the
  trailing run consumes any post-close material to the run's end
  (over-redact, the S65-1 doctrine; a `"` is not a libpq container —
  the DQ arm is the pinned S69-1 over-redaction posture, kept and
  widened identically).
- **S71-2b** the pass reorder (boot-env.ts): the KEYWORD pass runs
  FIRST on the raw value, then the scheme/userinfo arms, then the
  query pass — the keyword pass masks the password region before the
  destructive scheme-less last-`@` prefix-drop can destroy the key
  (the masked region carries no `@`, so the scheme-less arm finds
  nothing to mask and the identity/host visibility survives); the
  S67-1 disjointness argument re-verified for the new order (a URI
  query key rides `?`/`&`, never whitespace — the keyword pass never
  matches a URI-query password, so the reorder changes nothing for
  the scheme-full family).
- **S71-3b** the query bare-run widening (boot-env.ts):
  `[^&\s]*` → `[^&]*` — in URI form the value scan runs to `&`/end;
  a control char inside the run is value material (the residue
  warning still fires on the raw face; the printed redaction now
  masks the whole run — the `&`-stop and the registered
  unencoded-`&` tail boundary are unchanged).
- **S71-4b** the unification (src/lib/site.ts + boot-env.ts): the
  normalizer's post-serialization strip widens from `/\/+$/` to
  `/[\/?#]+$/` (an empty query/hash delimiter survives `toString()`
  but carries nothing — it folds to the bare origin the getters
  already report), and the divergence predicate folds the spelling
  the same way before parsing (`trim().replace(/[\/?#]+$/, "")`) —
  ONE normalizer, one law: the predicate, the shape arms, and the
  comparison now agree on every spelling.
- **S71-5b** the loopback grammar (boot-env.ts isLoopbackOrigin):
  the hostname strips its IPv6 brackets, and the predicate adds
  `::1`, the mapped family, and `/^127\./`-prefixed hosts — the
  loopback family the S42-6 hostname-parse cure always meant. **The
  mid-execution catch** (the plan's one falsified assumption,
  probe-caught inside the battery): the URL parser NORMALIZES the
  dotted mapped input `[::ffff:127.0.0.1]` into its compressed hex
  form `::ffff:7f00:1`, so the plan's `::ffff:127.` dotted prefix
  alone never fired — the `::ffff:7f` hex prefix added (any hex
  continuation of `7f` in the first mapped hextet IS `127.x.x.x`),
  the dotted spelling kept for robustness, the normalization truth
  documented at the site.
- **S71-6b** the toast mount probe (toast.tsx, before the timer
  effect): a mount-time `useEffect` probing
  `rootRef.current?.matches(":hover")` into `setPaused(true)` (the
  `:hover` pseudo-class is live at hit-test time regardless of event
  delivery — the mount face is the one state the transition pairs
  cannot observe); the S20-6/S70-4 claim comment extended to name
  the mount face.
- **S71-7b** the seo.spec arm (the S22-14 icon-contract test): the
  served head's `link[rel="manifest"]` href pins to `/manifest.json`
  (the file-convention family's discovery face, owned beside the
  icon links it already pins).
- **S71-8b** the S25-6 duplicate drop (seo-surfaces.test.ts): the
  verbatim OG_IMAGE-declaration `expect` retired from the S25-6 `it`
  (S24-11 owns the declaration face; S25-6 keeps the
  layout-consumption + twitter-consumption arms it uniquely owns) —
  the N12-2 exactly-one-pin doctrine.
- **S71-9b** the cheap-Info cures: the globals.css hover-unwrap
  comment widens to name the compound family (group-hover/peer-hover
  compile bare with the custom variant — probe-verified); the a11y
  register's `text-slate-300` entry's cite gains the 404-h1 face
  (the light-surface `text-7xl` heading rides the entry's
  over-breadth — now owned by the citation); the eslint ignores gain
  `db/**` + `docs/**` (the next.config excludes symmetry); the
  layout.tsx comment's viewport clause respelled to the truth
  (byte-identical to Next's built-in default — unpinned by design,
  zero drift surface); PAD §11 gains the empty-userinfo register
  row (the parse-invisible `http://@example.com` face — the S70-3
  conjuncts' documented boundary).

Phase 3 — the revert-plant battery, every NEW pin proven failable:
the quoted-arms revert plant REDs exactly S71-1a; the reorder revert
plant (keyword pass restored to LAST) REDs exactly S71-2a; the
query-run revert plant REDs exactly S71-3a; the unification revert
plant (predicate unfolded + the post-strip narrowed back to slashes)
REDs exactly S71-4a; the loopback revert plant REDs exactly S71-5a;
the mount-probe revert plant (the effect deleted) REDs exactly
S71-6a; the manifest-field revert plant (the layout's `manifest:`
line deleted, rebuilt) REDs exactly the S22-14 arm's
`link[rel="manifest"]` assertion (the deletion that shipped green
through every layer at session-70 now ships RED). All restored
GREEN.

## The lockstep

UNIT 788 → **794** (+6 its: S71-1a/2a/3a/4a/5a/6a ×1 each), SUITES
41 held (no new file), E2E 70 held (the S71-7a arm rides the
existing S22-14 test), E2E_SPECS 9 held, SMOKE 16 held, BADGE 858 →
**864**. The ten provenance sites re-anchored `1..70` → `1..71` (all
ten at diskMax, lag 0, uniform — the S65-6a posture); the local
untracked `.env`'s provenance note refreshed to match. The
docs-counts ladder's s71 rung appended with its +6/0 breakdown. The
plans map gained the seventy-first round (the AGENTS.md line + the
plan file on disk, 1:1). PAD: §8.1's table + §8.3's carry line at
794/41/70/16; §11 gained the empty-userinfo register row; §12
re-anchored (site.ts 219 → 228, globals.css 259 → 266 — both rows'
notes extended). README's badge + the session-71 row + the gate
footer; AGENTS's plans-map seventy-first round + the 794/41; CLAUDE's
794/41; SKILL v1.66.0 → v1.67.0 (frontmatter, §0.5 range,
Appendix-A session-71 row, Appendix-B re-certification through 71 +
the gate line's 794/41).

## The ship

The full gate green on the final tree; captures 149/150 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-71 ship: lint 0/0 · tsc 0 · unit 794/794 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
