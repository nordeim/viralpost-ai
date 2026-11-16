# Session 71 — The Redaction Escape-Aware Containers Cure + The Pass-Reorder Cure + The Query Control-Char Run Cure + The Divergence Unification Cure + The Loopback Grammar Cure + The Toast Mount Probe + The Info Batch and the Register Batch (2026-11-16)

## Baseline (the round opened on d85257e)

Workspace refreshed via `git pull` (`d85257e` = session-70's `62c8eeb` + the
owner's narration commit carrying `docs/session_71.md` as the round-70
working narration; the formal log this round writes at ship replaces its
content). Core docs re-read and re-verified at the session-70 ship counts
(AGENTS, CLAUDE, README, PAD, SKILL v1.66.0), then the session-70 set (the
formal `docs/session_70.md` log, the session-70 plan's post-execution
record, worklog Task 70, the owner's narration `docs/session_71.md`), and
the S70 cures verified in source (the `\s*=\s*` widening + the bare-run
quote drop in both redaction passes, the bare-origin userinfo conjuncts,
the toast mixed-modality guards, the e2e-port canonical-integer guard).
`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`, `db/`
at the repo root, `AUTH_SECRET` set); db:push + db:seed + census MATCH
(1 user + 0 contact messages). The ambient-shell `DATABASE_URL` pollution
(an absolute path OUTSIDE the repo — the S63..S70 hazard) found live again
and neutralized with `env -u DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **788/788** (41 files — the
session-70 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain advisories
as session-55..70 (3H/5M/1L — minimatch/eslint,
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

The findings this round cures:

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
  what this server serves": the empty delimiter drops from
  `u.search` but survives `toString()`) and a false NEGATIVE
  (`http://example.com//` vs a DIFFERENT served host answered ZERO
  warnings: the raw pathname `//` fails the bare gate while both the
  shape arms and the normalizer fold the spelling healthy). The
  S69-3 "exactly one warning per bad posture" law, broken at both
  edges by three spellings-lenses disagreeing.
- **S71-5 (AUDIT-1 L-3, live-probed)**: the loopback predicate misses
  the IPv6 and 127/8 families — `http://[::1]:3000` (the hostname
  keeps its brackets) and `http://127.0.0.2:3000` both pass as
  healthy production origins (no unset/loopback warning;
  `servedIsHealthy` counts them healthy).
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

## The cures (the plan, TDD — the pins first, born RED)

### Phase 1 — the pins (born RED, before any cure)

- **S71-1a** the escape-aware-container pin (boot-env.test.ts, a new
  S71 describe beside the S70 battery, 1 it): the escaped-quote
  password (`password='p\'ass'` — keyword form), the leading-DQ
  value (`password="ab"cd`), and their query-form mirrors
  (`?password='p\'ass'`, `?password="qu"oted123`) never print their
  post-quote tails through ANY warning arm (the inert-value arm, the
  file-residue arm, and the boot residue arm via an interior control
  char vehicle); the controls — the S69-1 plain containers
  (`password='my secret'`, `password="ab"`) still mask
  byte-identically to their pinned shapes.
- **S71-2a** the pass-reorder pin (the same describe, 1 it): the
  @-in-quoted-password keyword form (`password='S3cr@tPass!'` —
  inert + residue vehicles) and the @-in-bare form
  (`password=p@ss dbname=x` — inert) never print their post-`@`
  tails AND the visibility doctrine holds (the `host=`, `user=`,
  `dbname=` keys stay visible in the redacted output); the control —
  the scheme-less NON-KEY @ face (`admin:pass@host`) still masks to
  `***@host` (the S66-1 face-2 posture).
- **S71-3a** the query control-char pin (the same describe, 1 it):
  the tab-in-query-password residue vehicle
  (`postgresql://app:secret@db.example.com/prod?password=pa\tss`)
  never prints its post-char tail (the `ss` after the tab).
- **S71-4a** the divergence-unification pin (the same describe, 1
  it): the false-positive face (runtime `http://example.com?` vs the
  identical served `http://example.com` in production → ZERO
  site-url warnings) and the false-negative face (runtime
  `http://example.com//` vs the diverging served `http://other.com`
  → EXACTLY ONE site-url warning, the divergence arm's); the
  controls — the S69-3/S70-3 faces (path-carrying, non-http(s),
  credentialed) re-verified untouched in the same run.
- **S71-5a** the loopback-grammar pin (the same describe, 1 it): the
  IPv6 loopback (`http://[::1]:3000`), the 127/8 range
  (`http://127.0.0.2:3000`), and the IPv4-mapped face
  (`http://[::ffff:127.0.0.1]:3000`) as a production
  NEXT_PUBLIC_SITE_URL each answer the unset/loopback warning (no
  healthy served face); the control — the healthy
  `http://example.com` with a healthy served face stays silent.
- **S71-6a** the toast mount-probe pin (toast-anatomy.test.ts, 1 new
  it beside the S70-4 pair): the card source carries the mount-time
  hover probe — a `useEffect` reading
  `rootRef.current?.matches(":hover")` into `setPaused(true)` with an
  empty dep array (the transition-event pairs cannot see the
  mount-under-stationary-cursor state; the probe is the only writer
  at mount).
- **S71-7a** the manifest-link arm (tests/e2e/seo.spec.ts, a new arm
  inside the S22-14 icon-contract test — the same head-level genus):
  the served head carries `link[rel="manifest"]` whose href ends
  `/manifest.json` (the root layout's `manifest:` field is the sole
  source; deleting it currently ships green through every layer).

### Phase 2 — the cures

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
  comparison now agree on every spelling (the `//` face is bare, the
  `?` face is bare, and both compare through the folded
  serialization).
- **S71-5b** the loopback grammar (boot-env.ts isLoopbackOrigin):
  the hostname strips its IPv6 brackets, and the predicate adds
  `::1`, `::ffff:127.`-prefixed, and `/^127\./`-prefixed hosts —
  the loopback family the S42-6 hostname-parse cure always meant
  (the parsed-hostname law, extended to the families it missed).
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
  verbatim OG_IMAGE-declaration `expect` retires from the S25-6 `it`
  (S24-11 owns the declaration face; S25-6 keeps the
  layout-consumption + twitter-consumption arms it uniquely owns) —
  the comment already credits S24-11 as the declaration owner.
- **S71-9b** the cheap-Info cures: the globals.css hover-unwrap
  comment widens to name the compound family (group-hover/peer-hover
  compile bare with the custom variant — probe-verified); the a11y
  register's `text-slate-300` entry's cite gains the 404-h1 face
  (the light-surface `text-7xl` heading rides the entry's
  over-breadth — now owned by the citation, the entry's own
  over-broad-direction note generalized); the eslint ignores gain
  `db/**` + `docs/**` (the next.config excludes symmetry); the
  layout.tsx comment's viewport clause respelled to the truth
  (byte-identical to Next's built-in default — unpinned by design,
  zero drift surface); PAD §11 gains the empty-userinfo register
  row (the parse-invisible `http://@example.com` face — the S70-3
  conjuncts' documented boundary).

### Phase 3 — the batteries (every NEW pin proven failable)

1. The escape-aware revert plant (the quoted arms narrowed back to
   `'[^']*'?` / `"[^"]*"?`) → REDs exactly S71-1a; restored GREEN.
2. The reorder revert plant (the keyword pass restored to LAST) →
   REDs exactly S71-2a; restored GREEN.
3. The query-run revert plant (`[^&]*` narrowed back to `[^&\s]*`) →
   REDs exactly S71-3a; restored GREEN.
4. The unification revert plant (the predicate unfolded + the
   post-strip narrowed back to slashes) → REDs exactly S71-4a;
   restored GREEN.
5. The loopback revert plant (the grammar narrowed back to
   localhost/127.0.0.1) → REDs exactly S71-5a; restored GREEN.
6. The mount-probe revert plant (the effect deleted) → REDs exactly
   S71-6a; restored GREEN.
7. The manifest-arm revert plant (the arm deleted) → REDs exactly
   S71-7a's test; restored GREEN.

### Phase 4 — the lockstep

UNIT 788 → **794** (+6 its: S71-1a/2a/3a/4a/5a/6a ×1 each), SUITES
41 held (no new file), E2E 70 held (the S71-7a arm rides the
existing S22-14 test), E2E_SPECS 9 held, SMOKE 16 held, BADGE 858 →
**864**. The ten provenance sites re-anchored `1..70` → `1..71` (all
ten at diskMax, lag 0, uniform — the S65-6a posture); the local
untracked `.env`'s provenance note refreshed to match. The
docs-counts ladder's s71 rung appended with its +6/0 breakdown. The
plans map gains the seventy-first round (the AGENTS.md line + the
plan file on disk, 1:1). PAD: §8.1's table + §8.3's carry line at
794/41/70/16; §11 gains the empty-userinfo register row (+ any
residual faces the cures surface); §12 re-anchored if the touched
files' line counts drifted. README's badge + the session-71 row +
the gate footer; AGENTS's plans-map seventy-first round + the 794/41;
CLAUDE's 794/41; SKILL v1.66.0 → v1.67.0 (frontmatter, §0.5 range,
Appendix-A session-71 row, Appendix-B re-certification through 71 +
the gate line's 794/41); the formal `docs/session_71.md` (replacing
the owner's narration); the plan's post-execution record; worklog
Task 71.

## The ship

The full gate green on the final tree; captures 149/150 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-71 ship: lint 0/0 · tsc 0 · unit 794/794 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**

---

## The post-execution record (the plan vs the execution)

- **All six unit pins born RED exactly as designed** (S71-1a: 1 RED;
  S71-2a: 1 RED; S71-3a: 1 RED; S71-4a: 1 RED; S71-5a: 1 RED;
  S71-6a: 1 RED; the S71-3a tab-face assertion re-anchored in-commit
  to the JSON.stringify two-char `\t` escape rendering — the born-RED
  shape confirmed non-vacuous; the S71-7a e2e arm born GREEN on the
  existing served head by design — its teeth proven by the Phase-3
  source-side plant).
- **All seven revert plants verified** (the quoted-arms revert REDs
  exactly S71-1a — the plant's first bundled form also tripped
  S71-3a, re-applied SURGICALLY to the quoted arms alone per the
  one-plant-one-pin law; the reorder revert — keyword pass restored
  to LAST, the S71 regexes kept — REDs exactly S71-2a; the query-run
  revert REDs exactly S71-3a; the unification revert — predicate
  unfolded + the site.ts post-strip narrowed back to slashes — REDs
  exactly S71-4a with page-titles green; the loopback revert REDs
  exactly S71-5a; the mount-probe revert REDs exactly S71-6a; the
  manifest-field revert — the layout's `manifest:` line deleted, the
  tree REBUILT, the seo spec run against the standalone server —
  REDs exactly the S22-14 arm's `link[rel="manifest"]` assertion,
  restored + rebuilt + GREEN).
- **The plan's one falsified assumption, probe-caught in-battery**
  (the S71-5b mapped family): the URL parser NORMALIZES the dotted
  IPv4-mapped input `[::ffff:127.0.0.1]` into its compressed hex
  form `::ffff:7f00:1` — the plan's `::ffff:127.` dotted prefix
  never fires on any parsed hostname in this engine. The cure
  adjusted to the empirical truth: the `::ffff:7f` hex prefix added
  (any hex continuation of `7f` in the first mapped hextet IS
  127.x.x.x — the mapped 127/8 range exactly), the dotted spelling
  kept for robustness, the normalization truth documented at the
  predicate's site.
- **The reorder's compound-face delta recorded**: the exotic
  keyword-password-after-a-scheme face (`postgresql://app
  password=x@host/db`) now answers `postgresql://app password=***`
  (the keyword pass eats the @-bearing value before the scheme arms
  run) where the old order dropped the middle segment entirely
  (`postgresql://***@host/db`) — the new output is the visibility
  doctrine honored (no pin covered the face; the change is in the
  safe direction).
- **The designed count-lag faces fired exactly as projected** (the
  UNIT/SUITES reality census, the plans map, the badge/footer/
  architecture/frontmatter/Appendix-B/pre-ship-checklist sites, the
  PAD §12 inventory rows — 11 doc-site REDs surfaced at the
  lockstep, all cured; docs-counts 56/56 after).
- Counts at ship: UNIT 794 / SUITES 41 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 864; the ten provenance sites at 1..71 (lag 0,
  uniform — the S65-6a posture); SKILL v1.67.0; captures 149/150
  PIL-verified; the full gate green on the final tree; push to main
  via the SSH wrapper runbook.

**Gate at the session-71 ship: lint 0/0 · tsc 0 · unit 794/794 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
