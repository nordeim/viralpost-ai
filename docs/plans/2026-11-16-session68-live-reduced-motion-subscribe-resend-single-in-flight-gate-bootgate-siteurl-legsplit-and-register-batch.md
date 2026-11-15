# Session 68 — The Live Reduced-Motion Subscribe + The Resend Single-In-Flight Gate + The Boot-Gate Site-URL Leg-Split + The Comment-Truth Batch and the Register Batch (2026-11-16)

## Baseline (the round opened on d62ab1e)

Fresh `git clone` (the workspace had been reset). Core docs re-read at
the session-67 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.63.0);
the session-67 set re-verified (the formal `docs/session_67.md` log, the
session-67 plan's post-execution record, worklog Task 67, the owner's
narration `docs/session_68.md` — replaced by the formal log this round
writes at ship); the S67 cures verified in source (the keyword-form
redaction pass riding every arm, the four fetch-toast mount gates, the
s65/s66 ladder rungs, the :285 cite, the settle teeth + the
`behavior: "instant"` cure). `.env` re-created from `.env.example` at
the contract (`DATABASE_URL="file:../db/custom.db"`, `db/` at the repo
root, `AUTH_SECRET` set); db:push + db:seed + census MATCH (1 user + 0
contact messages). The ambient-shell `DATABASE_URL` pollution (an
absolute path OUTSIDE the repo — the S63..S67 hazard) found live again
and neutralized with `env -u DATABASE_URL` on every DB-touching
command.

Baseline gate: lint 0/0 · tsc 0 · unit **769/769** (40 files — the
session-67 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs; the one-time `bunx playwright install chromium` re-run — the
sandbox cache carried build 1200, the repo's Playwright 1.64.1 needs
1248) · census MATCH. `bun audit`: the same 9 dev-toolchain advisories
as session-55..67 (3H/5M/1L — minimatch/eslint, deepmerge-ts/prisma,
vite/vitest, source-map-js/postcss — none on the runtime request path).

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: `.env` created at
  `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root;
  census MATCH; every gate leg green against it. The code references
  already route exclusively through `src/lib/db-path.ts` (the AUDIT-1
  monopoly re-verification: `process.env.DATABASE_URL` read ONLY inside
  the seam; the three one-shot scripts hold the documented exemption).
  No code change needed — the contract already holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (AUDIT-3: vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port, the pinned
  `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in parity walk #41 (sitemap 4 URLs,
  robots allow-all + the sitemap pointer, manifest nine fields, the
  OG/Twitter family, per-route canonicals) AND by AUDIT-3's source
  read (force-static trio, `/Home` never listed, byte-exact body pins).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs (below); AUDIT-2 re-verified all seven documented v4
  mitigations hold (source scoping, the `@custom-variant hover`
  unwrap, literal-hex `@theme`, the button-cursor base rule, no
  `tailwind.config.*`). **No Tailwind v4 bug found.**
- **`skills/` exclusion**: verified in tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 0 Medium / 5 Low / 10 Info**
(AUDIT-1 API/lib seams 0/0/0/2/3 · AUDIT-2 components/pages/effects
0/0/0/2/5 · AUDIT-3 SEO/configs/tests/docs 0/0/0/1/2). Every
load-bearing finding hand-verified by the lead — A-1-2 and A-2 L-2 by
direct code read at the cited lines, A-2 L-1 by the four mount-time
`matchMedia(...).matches` reads (no `change` listener anywhere in
`src/components/effects/`), A-1-1 by the lane's compiled-artifact probe
(the `site_ts` chunk carries the build-time literal; no
`process.env.NEXT_PUBLIC_SITE_URL` read survives in it) plus the
warning-text's own "inlined at build time" admission, A3-1/A3-2 by
direct text evidence. The standing contracts all held (the envelope on
13 handlers, the db seam monopoly, the bounded reader, the limiter's
buckets, the auth/revocation family, the boot gate arms, all seven
Tailwind v4 mitigations, the mobile-menu mechanic set, the React 19
laws, the SEO family; docs-counts 55/55, PAD §12's 21 rows intact, the
ten provenance sites uniformly at `1..67`, unit 769/769 re-run live).

### F-1 (AUDIT-1 A-1-2, Low, Verified) — the `keywordsOf` doc-comment claims "longest first"; no sort exists

`src/lib/generator.ts:357` — the comment reads "Meanful keywords from
the idea, longest first, capped" but the implementation returns
first-occurrence order (Set insertion order, then `.slice(0, 6)`); no
length sort anywhere. The adjacent header sentence "the idea's own
keywords always join the hashtags" overstates the same way (only the
first two ride `hashtagsFor`'s `kws.slice(0, 2)`). The comment-truth
genus; the code wins (SKILL's own header doctrine), the comment
re-spells.

### F-2 (AUDIT-2 L-2, Low, Verified by read) — the verify view's Resend is not disabled while a verification submit is in flight

`src/components/layout/login-card.tsx:300` (`onResend` guards only
`if (resending) return;`) and `:728` (`disabled={resending}`). While a
verify request is in flight (`pending`), Resend stays clickable; the
concurrent resend re-mints the code (replacing the stored hash) and
resets the digit boxes mid-submit — the in-flight verify then compares
the OLD code against the NEW hash and fails "This verification code is
no longer valid" — a guaranteed confusing error plus one burned resend
against the 5/15-min budget the N-67k guard exists to protect. The
cure mirrors the card's own single-in-flight doctrine.

### F-3 (AUDIT-2 L-1, Low, Reasoned — code-verified) — the effects family reads `prefers-reduced-motion` once at mount

All four effect islands (`iridescence.tsx:207`,
`particle-text.tsx:73`, `floating-icons.tsx:77`, `reveal.tsx:82`) read
`matchMedia("(prefers-reduced-motion: reduce)").matches` a single time
inside the mount effect and never subscribe to `change` — a user who
enables reduce mid-session keeps the full WebGL/particle/rAF motion
until reload. The CSS-level arm (`globals.css:239`) responds live; only
the JS loops are frozen at the mount-time read. The cure: the live
subscribe, ONE-WAY (change-to-reduce collapses each island to its
documented static face; un-reduce mid-session stays a reload face —
the boundary documented in each file's comment).

### F-4 (AUDIT-1 A-1-1, Low, Verified — compiled-chunk evidence) — the boot gate validates the wrong face for `NEXT_PUBLIC_SITE_URL`

`bootEnvCheck` reads the RUNTIME env face
(`env.NEXT_PUBLIC_SITE_URL`), but every served surface consumes the
BUILD-TIME-INLINED face (Turbopack replaces the default-param
`process.env.NEXT_PUBLIC_SITE_URL` read in the compiled `site_ts`
chunk — the lane's probe: `function(e="http://localhost:3000"){…}`,
no env read survives). The warning is wrong in both directions where
the faces diverge: (a) FALSE ALARM — origin set at build, runtime env
unset (the node-booted-standalone family): the surfaces are correct
yet the gate prints the unset warning; (b) FALSE NEGATIVE (worse) —
origin set only at runtime: the gate stays silent while every served
OG/canonical/sitemap URL advertises the inlined localhost. The cure
mirrors the S62-2 leg-split doctrine: model BOTH faces.

### F-5 (AUDIT-3 A3-1, Low, Verified) — the donor-worklog pointer's stale live-tense count

`docs/worklog.md:7` claims the root worklog carries "Task IDs 1..49"
(written at session-48, never re-anchored); disk reality is Tasks
2..67. The count-free re-spell (the S65-8 precedent).

### The cheap-Info batch (all Verified)

- **A3-2**: `tests/e2e/e2e-port.ts:1` cites "Session-69 (N-69g)" /
  "S68-P4" without the donor-ledger annotation the convention requires
  (this repo's own ledger ends at 67/68).
- **AUDIT-2 I-2**: `nav-config.ts`'s header documents the
  no-runtime-consumer doctrine for `BRAND.name/description` but not
  `NavRoute.canonical` (same status, unmentioned).
- **AUDIT-2 I-3**: the login card's mobile-only `<p>&nbsp;</p>` spacer
  (`login-card.tsx:928`) is the one un-applied instance of the repo's
  own S60-2/S61-2 aria-hidden genus.
- **AUDIT-2 I-4**: the reset screen's "Must be at least 8 characters"
  hint is not programmatically associated with its input
  (`aria-describedby`).

### The registers (documented, PAD §11 — no action)

- AUDIT-1 I-3: `scryptSync` blocks the event loop per auth op (the
  timing equalizers double it) — the sync-blocking face, distinct from
  the registered cost row; the async+queue lift named.
- AUDIT-1 I-4: `detectNiche`'s bidirectional substring match
  (`k.includes(nk) || nk.includes(k)`) misroutes short idea keywords
  ("art" → business via "startup"; "car" → lifestyle via "care") —
  content-relevance only; the word-boundary/length-gate lift named.
- AUDIT-1 I-5: `db.user.count()` full-scans per signup (the
  color-rotation + first-user-admin faces) — demo-scale fine.
- AUDIT-2 I-1: the toast's nested live regions (polite viewport +
  per-card alert/status) may double-announce in some AT — the
  documented S19-8 doctrine's known edge; a watch item, no reproduced
  face.
- AUDIT-3 I-3: the WebKit-motivated cures (the S23-3
  `tabIndex={-1}` family) are runtime-unverifiable in the
  Chromium-only e2e matrix — the coverage boundary registered.

## Parity walk #41 — the forty-first consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`): the hamburger base byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the amber CTA pill;
Escape R-OPEN (verified with the class-anchored panel probe — the
panel ID probe was corrected mid-walk: the reference carries no
`id="mobile-menu"`, that is OUR superset); the outside-tap R-OPEN;
the route-change R-UNMOUNT (via the Pricing link); the desktop census
6 visible at 1440 (burger hidden); the brand gradient byte-identical
(`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`);
the five-route head census (bare `/` + `/login` titles, the
`<Page> |` family, the prefixed descriptions, the canonicals);
sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all + the sitemap
pointer; the generator DEAD — no post ever lands, no Copy button, the
button returns to rest state with NO error surface at the 4s/15s/40s
probes (a failure-face drift from the session-46 re-verification's
"settles with a failure toast" — the load-bearing DEAD posture
unchanged; recorded in the Deviations Ledger row this round). CLONE
leg (logged in, landed `/` — the documented /Home deviation): the
aria superset ACTIVE (Open/Close-menu relabel, expanded true→false,
`aria-controls="mobile-menu"`); the panel inner byte-identical with
the transparent-over-hero posture (the reference's `bg-slate-900/98`
is a dead class in its own build); Escape L-CLOSE-WITH-FOCUS-RETURN
(focus observed back on the toggle); the outside-tap BOTH-OPEN; the
route-change L-HIDDEN-IN-DOM (panel in DOM, `display:none`,
expanded=false); the desktop census identical (the mobile panel's
links ride hidden-in-DOM — the documented posture); the gradient
byte-identical; the head census + sitemap/robots identical modulo
origin; the generator LIVE (a real post, the Copy button, the quota
counter 3→2 — the 0→1 used face). **No Tailwind v4 bug in the mobile
menu** — every mechanic live-verified at 390×844 on both legs.
Captures 143/144 on the dev server PIL-verified (1440×6971 landing
full-page; 390×844 mobile menu open, the amber-CTA field present).

## The TDD worklist (pins first, born RED, batteries on record)

### Phase 1 — the pins

- **S68-2a** (tests/login-views.test.ts, one it beside the N-67k
  in-flight family): the Resend single-in-flight gate — the button's
  disabled expression is `disabled={resending || pending}` AND
  `onResend`'s guard reads `if (resending || pending) return;` (the
  two-arm face, one pin — the S67-2 doctrine).
- **S68-3a** (tests/effects-motion.test.ts, one it owning the
  four-island family): the live reduced-motion subscribe — each of
  the four effect islands carries `addEventListener("change"` on its
  `matchMedia("(prefers-reduced-motion: reduce)")` handle AND the
  paired `removeEventListener("change"` in its cleanup.
- **S68-4a** (tests/boot-env.test.ts, a new describe, three its):
  the boot gate's served-face leg split —
  1. the false-alarm cure: production + runtime UNSET + the injected
     served face a healthy origin → NO site-url warning (the
     surfaces advertise the build-inlined origin; the runtime face is
     inert for this knob);
  2. the divergence warning: production + runtime a healthy origin +
     the injected served face a DIFFERENT value → the warning names
     BOTH values and the build-inlining mechanism;
  3. the control: production + runtime healthy + the injected served
     face the SAME normalized value → no divergence warning (and no
     unset warning).

### Phase 2 — the cures

- **S68-1b** (src/lib/generator.ts): the `keywordsOf` comment
  re-spelled to the truth ("first six distinct keywords, order of
  appearance") + the header's "always join" sentence corrected to
  "the first two join". Comment-truth only — zero behavior change
  (the shipped selection behavior is 67 sessions old and
  property-pinned).
- **S68-2b** (src/components/layout/login-card.tsx):
  `disabled={resending || pending}` on the Resend button +
  `if (resending || pending) return;` in `onResend`. The label stays
  keyed on `resending` alone (a disabled Resend during a verify
  submit reads "Resend", not "Please wait…" — the pending face is the
  SUBMIT's relabel, not the secondary affordance's).
- **S68-3b** (the four effect islands): the one-way live subscribe —
  - `reveal.tsx`: the mq handle + `onMotionChange` →
    `settle(); io.disconnect();` on change-to-reduce; the listener
    removed in cleanup;
  - `floating-icons.tsx`: the listener armed only on the
    full-motion path (the reduced mount keeps its early static
    return); change-to-reduce cancels the raf and resets each
    wrapper's transform/opacity to the static face;
  - `iridescence.tsx`: `const reduced` → `let reduced`
    (the render loop's `if (!reduced) raf = …` arm already stops the
    chain at the next frame boundary); change-to-reduce repaints the
    S24-6 static seed frame;
  - `particle-text.tsx`: `let reduced`; change-to-reduce cancels the
    pending raf/timeout and calls `frame(performance.now())` — the
    reduced branch (drawPlain + the timeout cadence) takes over from
    whatever phase the field was in.
  Each file's comment documents the ONE-WAY boundary (un-reduce
  mid-session is the documented reload face).
- **S68-4b** (src/lib/boot-env.ts + src/instrumentation.ts): the
  leg-split —
  - `bootEnvCheck(env, options?)` gains an OPTIONAL injected
    `{ servedSiteUrl }` (the seam stays PURE — both faces are
    injected; the one-arg calls behave EXACTLY as before, so every
    existing pin holds untouched);
  - the unset/loopback arm suppresses when the served face is a
    healthy non-loopback origin (the false-alarm cure — silence is
    correct: the surfaces are healthy and the runtime face is inert);
  - a NEW divergence arm: production + a well-formed non-loopback
    runtime face whose `siteUrl()`-normalized value differs from the
    served face's → the warning names both values and the
    build-inlining mechanism (the S63-1 inert-value genus completed
    for this knob); malformed runtime values stay owned by the
    F10-11 shape arms (no double warning);
  - `instrumentation.ts` passes
    `bootEnvCheck(process.env, { servedSiteUrl: siteUrl() })` — in
    the BUILT artifact `siteUrl()` returns the build-time-inlined
    literal (the compiled-chunk probe), in dev it reads the live
    process env (identical to the record face — no dev behavior
    change).
- **S68-5b** (docs/worklog.md): the pointer re-spelled count-free.
- **S68-6b** (the cheap-Info batch): the e2e-port donor annotations
  (two cites), the nav-config `canonical` sentence, the spacer's
  `aria-hidden="true"`, the reset hint's `id` +
  `aria-describedby` pair.
- **S68-7b** (docs/implementation-plan.md §6): the generator
  deviation row's re-verification clause updated to session-68 (the
  silent-rest failure face; the DEAD posture unchanged).

### Phase 3 — the batteries (each plant REDs exactly its pin, all restored)

1. The resend-gate revert plant (drop the `|| pending` from both
   arms) → REDs exactly S68-2a.
2. The listener-removal plant (drop one island's `change` listener)
   → REDs exactly S68-3a.
3. The leg-split revert plant (drop the `servedSiteUrl` options arm)
   → REDs exactly the S68-4a its.
4. The comment/prose cures (S68-1b, S68-5b, S68-6b, S68-7b) — no
   unit pin can fail by construction (the comment-lag genus);
   the battery is the round's own audit finding, recorded as such.

### Phase 4 — the lockstep

- UNIT 769 → **774** (+5 its: S68-2a ×1, S68-3a ×1, S68-4a ×3);
  SUITES 40 held; E2E 70 held; E2E_SPECS 9 held; SMOKE 16 held;
  BADGE 839 → **844**.
- The ten provenance sites re-anchored `1..67` → `1..68` (lag 0,
  uniform — the S65-6a posture).
- PAD: §8.1's table + carry line at 774/70/16; §11 +5 register rows
  (the scryptSync blocking face, the detectNiche bidirectional
  substring, the count-per-signup scan, the nested-live-region watch,
  the WebKit coverage boundary); §12's re-anchored line counts for
  every touched file (the inventory census REDs otherwise — the
  designed count-lag face).
- README (badge 844, the session-68 row, the gate footer), AGENTS
  (the plans map's sixty-eighth round, the 774), CLAUDE (the 774),
  SKILL v1.63.0 → v1.64.0 (frontmatter, §0.5 range, Appendix-A
  session-68 row, Appendix-B re-certification through 68).
- The formal `docs/session_68.md` (replacing the owner's narration),
  this plan's post-execution record, worklog Task 68, the local
  untracked `.env`'s provenance note refreshed.

### Phase 5 — the ship

The full gate green on the final tree (lint 0/0 · tsc 0 · unit 774/774
· build · smoke 16/16 · e2e 70/70 · census MATCH), captures 143/144
already on disk, then the Conventional Commit to main and the push via
the SSH wrapper runbook.

## Validation (the plan checked against the codebase before execution)

- `keywordsOf` (generator.ts:357-375) and the header's hashtag
  sentence read in full — the re-spell changes no executable token.
- `onResend` (login-card.tsx:300-325) and the Resend button (:728)
  read in full — the `pending` state exists in scope; the gate slots
  with no control-flow consequence (the finally still settles
  `resending`; the submit's own `pending` relabel is untouched).
- All four effect islands read in full — each collapse path composes
  with the existing arms (reveal's settle/disconnect pair;
  floating-icons' early static return; iridescence's per-frame
  `!reduced` re-arm + the S24-6 seedT; particle-text's frame()
  branch structure with the raf/phraseTimer cancel discipline).
- `bootEnvCheck`'s site-URL arm (boot-env.ts:105-191) read in full —
  the options param slots after the record param with a
  backward-compatible default; the loopback predicate extracts to a
  shared helper used for both faces; the divergence arm's
  well-formedness gate reuses the same URL-parse shape; `siteUrl(x)`
  is only ever called with NON-EMPTY strings (the default-param
  process.env read never triggers inside the seam).
- `instrumentation.ts` read in full — the dynamic-import idiom
  extends to `./lib/site` (both modules are server-safe; the edge
  skip precedes the import).
- The pin homes read: login-views.test.ts's `readOr` helper and the
  N-67k comment block (the S68-2a it slots beside it);
  effects-motion.test.ts's `read` helper and the S55-1 describe (the
  S68-3a it slots after it); boot-env.test.ts's `env()` builder
  (defaults NEXT_PUBLIC_SITE_URL healthy — the S68-4a its inject
  both faces explicitly, no process.env stubbing needed).
- The a11y-controls S28-5 pin (`minLength={8}` count) verified
  unaffected by the reset-hint association; no test pins the `&nbsp;`
  spacer block; the docs-counts inventory census will flag every
  line-count drift (designed count-lag faces, cured in the lockstep).

## The post-execution record (session-68 ship)

Executed as planned. The deviations and mid-execution catches the
record owes the truth:

- **The count arithmetic deviated +1 from the plan's projection**: the
  S68-4a describe shipped FOUR its, not three — the fourth is the
  same-face control (runtime and served AGREE normalized → no
  warning), added because the S65-4 vacuity doctrine demands every
  born-green pin carry a failable battery (the normalization-removal
  plant REDs exactly it). UNIT 769 → **775** (+6, not +5); BADGE
  839 → **845**.
- **Two unplanned same-commit pin re-anchors** (both the designed
  doctrine, neither a weakening): auth-contract's S67-P5 pin (the
  resend in-flight guard) pinned the old single-flag shapes and was
  re-anchored to the two-flag shapes with the S12-2 co-pin annotation
  (login-views' S68-2a owns the family face; S67-P5 keeps the
  auth-seam contract view — documented co-pins, the sanctioned form);
  effects-motion's S47-4/S55-1 cleanup-shape pins re-anchored to the
  grown cleanups (`return () => { … io.disconnect();
  mq?.removeEventListener(…) }` / the floating-icons block form).
- **The design-tokens step-less census caught the round's own comment
  prose**: the first-draft "change-to-reduce" compound in reveal.tsx
  scanned as a `to-reduce` utility (the S28-4 prose-safe doctrine —
  the `to-` prefix + `reduce`); re-spelled to "a change toward
  reduce", no exemption added to the census.
- **The docs-counts census's countable-registration contract rejected
  the first draft's `it.each` form** (the shape contract counts
  `^\s*(?:it|test)\(` registrations); the S68-3a pin was rewritten as
  the one-it loop the plan itself specified (one pin owning the
  four-island family — the form the plan wanted all along).
- All pins born RED exactly as designed (S68-2a: 1 RED at birth;
  S68-3a: 4 island-faces RED under the it.each draft — the converted
  single-it form REDs as one; S68-4a: 3 RED / 80 GREEN at birth, the
  control green by construction with its vacuity battery on record).
  All four revert plants verified (the resend-gate revert REDs S68-2a
  + the documented co-pin S67-P5; the listener-removal REDs S68-3a;
  the legs-dropped REDs the three behavior its; the
  normalization-removal REDs the control); all restored GREEN.
- The designed count-lag faces fired exactly as projected (13 doc-site
  REDs at the mid-round run: README ×3, AGENTS, CLAUDE, PAD ×2, SKILL
  ×4, the plans map — all cured at the lockstep; docs-counts 55/55
  after).
- Counts at ship: UNIT 775 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 845; the ten provenance sites at 1..68 (lag 0,
  uniform — the S65-6a posture); SKILL v1.64.0; captures 143/144
  PIL-verified; the full gate green on the final tree; push to main
  via the SSH wrapper runbook.

**Gate at the session-68 ship: lint 0/0 · tsc 0 · unit 775/775 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
