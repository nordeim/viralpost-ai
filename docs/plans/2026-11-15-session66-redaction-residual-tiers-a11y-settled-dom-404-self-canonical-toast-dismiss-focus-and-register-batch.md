# Session 66 — The Redaction Residual Tiers + The A11y Settled-DOM Register + The 404 Self-Canonical + The Toast Dismiss Focus Arm + The stripComments Generalization and the Register Batch (2026-11-15)

## Baseline (the round opened on 28746e6)

`git pull` fast-forward `0c6e39a..28746e6` (the owner's narration commit
carrying `docs/session_66.md`, the round-65 working narration — this
formal log replaces its content at ship). Core docs re-read at the
session-65 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.61.0);
the session-65 set re-verified (the formal `docs/session_65.md` log,
the session-65 plan's post-execution record, worklog Task 65, the
narration `docs/session_66.md`); the S65 cures verified in source (the
manual-scan redaction, the spawn-error arm, the uniform-lag ship arm,
the stripComments pin hardening, the ten-site re-anchor at `1..65`).
The ambient-shell `DATABASE_URL` pollution (an absolute path OUTSIDE
the repo — the S63/S64/S65 hazard) was found live and neutralized with
`env -u DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **758/758** (40 files — the
uniform lag-1 baseline: every provenance site at `1..65` against the
disk ledger at 66, exactly the S65-6a-sanctioned post-narration state)
· build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.
`bun audit`: the same 9 dev-toolchain advisories as session-55..65
(3H/5M/1L, none on the runtime request path).

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 3 Low / 7 Info**
(AUDIT-1 API/lib seams 0/0/1/0/3 · AUDIT-2 components/pages/effects
0/0/1/2/2 · AUDIT-3 SEO/configs/tests/docs 0/0/0/2/5). Every
load-bearing finding hand-verified by the lead (reproduce-before-
trusting) — the two Mediums live-probed through the REAL exported
warning builders, the 404 canonical live-probed against the standalone
build, the two component Lows verified by code read. The standing
contracts all held (the envelope on 13 handlers, the db seam monopoly,
the bounded reader 8/8, the limiter's buckets, the auth/revocation
family, the boot gate arms, all seven Tailwind v4 mitigations, the
mobile-menu mechanic set, the React 19 laws, the SEO family, every
docs count re-derived from disk).

### F-1 (AUDIT-1-1, Medium, Verified live) — the redaction residual tiers

The S65-1b manual scan closed the delimiter-bypass class, but the
scheme-anchored design leaves three classes unmasked (every probe
below fired through the REAL exported warning builders):

1. **Query-param credentials on an otherwise VALID URL** —
   `postgresql://db.example.com:5432/prod?user=admin&password=SuperSecret9`
   is a documented libpq/Prisma-supported spelling; the scan masks only
   the `@`-token run, so `password=SuperSecret9` printed VERBATIM
   through the inert-value warning (the S63-1 posture this arm exists
   to diagnose — a node-booted standalone with a clean non-default
   .env value), and the tab-paste residue variant printed `TopSecret99`
   through bootEnvCheck's process-env arm while naming the control
   char it was printing.
2. **Scheme-less credentialed values** — `user:supersecret@host/db`
   printed verbatim through the inert-value arm; the leading-quote and
   tab-in-password residue variants printed verbatim through their arms
   (the exact malformed class these arms exist to print).
3. **Credentials before the first scheme** —
   `"admin:pass@host\npostgres://x/y` — the `restAt > afterScheme`
   guard declines to mask when the last `@` sits before the scheme.

The one-owner doctrine ("the password never prints") still has
unmasked faces; face 1 is MORE realistic than the S65-1 trigger (a
valid URL in a documented spelling — no typo required beyond the
posture the warning exists to diagnose). Controls re-verified: every
pinned S63-2/S64-1/S65-1 shape answers `***@…` (the existing cures
hold on their shapes).

### F-2 (AUDIT-2-1, Medium, Verified — probe + code) — the a11y battery never scans the settled DOM + the testimonial-handle register gap

The a11y spec runs `goto → networkidle → axe` with NO scroll: every
below-fold Reveal wrapper sits at `opacity: 0` and axe SKIPS opacity-0
nodes — the sanctioned-contrast register's coverage claim is validated
only against the unscrolled DOM. The live probe (axe 4.13 on the
standalone build, slow-scroll + 1.5s settle, all 17 wrappers verified
at opacity 1): 9 settled violations — 6 match the register (the quota
label, the pricing Free family, the footer pair) and **3 do not**: the
testimonial handles (`text-teal-600 text-xs` on the light cards,
#0d9488 on #f8fafc = 3.57:1, under the 4.5:1 AA floor — the
reference's own palette, class-for-class parity). A scroll-settle pass
+ the missing register entry closes both halves (adjudicate, never
restyle — the parity doctrine). The same `text-teal-600` ink rides the
post-generation "Generated Post" label (generator-card.tsx:278, a
state-only surface no static scan sees) — the register entry's cite
covers the family.

### F-3 (AUDIT-3-1, Low, Verified live) — the 404 head's foreign canonical

The catchAll layout's `generateMetadata` returns only the title, so
Next shallow-merges over the root layout's metadata: every 404 ships
`<link rel="canonical" href="<origin>"/>` (the LANDING's canonical)
and `og:url` at the origin root while simultaneously emitting
`noindex` — a mixed signal on a surface the repo otherwise pins
byte-tight, with zero owners (the e2e 404 test asserts title/noindex/
body; smoke leg 06 asserts title/noindex). Live-probed on the
standalone build: `/definitely-not-a-route` → 404 + derived title +
noindex + `<link rel="canonical" href="http://localhost:3000"/>` +
`og:url` at the origin root.

### F-4 (AUDIT-2-2, Low, Verified by read) — the toast dismiss focus drop

The only per-card control is the icon-only Dismiss button; activating
it unmounts the focused card and focus falls to `<body>` (the next
Tab resumes at the document top). The same genus was deliberately
cured on the navbar (F11-11/S25-16/S31-2), the paywall swap (S25-15),
the login view swaps (S19-10), and the reset success swap (S21-6) —
but not here. The focus-pause arm (S20-6) means an auto-dismiss never
fires while focus is inside the card — the dismiss click is the sole
focus-drop path (plus the `slice(-4)` eviction of a focused card on a
5th push — REGISTERED, `push()` has no DOM seam).

### F-5 (AUDIT-3-2, Low, Verified) — the raw-read positive pins (the latent S65-4 genus)

The house stripComments idiom (S48-1 hardened form) is applied in
page-titles (the S65-4 cure), toast-anatomy, seo-surfaces, and
type-gate — but the positive source pins in `tests/landing-page.test.ts`
(112 `toContain`), `tests/error-boundaries.test.ts` (39), and
`tests/http-headers.test.ts` (4) read files RAW. A future explanatory
comment quoting a pinned literal would silently disarm the pin (the
S65-4 vacuity: deleting the real export shipped green). Spot-checked:
no live vacuous instance today — the class is latent. The cure is the
S65-4 generalization: route the positive pins through the stripped
read; negative pins stay on the raw read (the stricter form — their
intent is "never appears", comment mentions included where they RED
today).

### F-6 (AUDIT-2-4, Info, upgraded to a cure) — the copy catch arm bypasses the S51-2 gate

`copy()`'s success continuation is double-gated
(`!mounted.current || epochAtCopy !== genEpoch.current`), but the
`catch` arm fires `toast.error(...)` unconditionally — a clipboard
rejection landing after an unmount or regeneration still surfaces a
toast on whatever page the user is now on. The S51-2/S50-4 comment
blocks describe the gate as covering the continuation generally.

### The registers (documented, no code change)

- AUDIT-1-2 (Info): the auth gates key on exact
  `NODE_ENV === "production"` — a `NODE_ENV=staging` boot silently
  gets the DEV session secret (forgeable by anyone who reads the
  public source; one console.warn as signal). The documented postures
  are dev/test/production (DEPLOYMENT.md); the fail-closed cure is a
  behavior change beyond this round's scope — REGISTER (the PAD row
  names the lift: treat unknown values as production for the secret
  gate).
- AUDIT-1-3 (Info): scrypt rides Node defaults (N=16384), below
  current OWASP guidance (N=2^17); a change requires format versioning
  + rehash-on-login migration — REGISTER as a future hardening item.
- AUDIT-2-3 (Low): the mobile menu survives an md-crossing rotation
  (open at 390 portrait → 844 landscape crosses md; both toggle and
  panel go `display:none` while `open` stays true; rotating back
  re-reveals the still-open menu) — reference-identical behavior, and
  the S26-3 cure consciously left `open` surviving the crossing —
  REGISTER (reference-identical; the matchMedia close is the documented
  superset lift if ever wanted).
- AUDIT-2-5 (Info): particle-text rebuilds the particle field on every
  undebounced resize event (~1-2ms per event, desktop drag only; the
  S13-7 posture) — REGISTER (accepted).
- AUDIT-3-3 (Info): the auth pages' `export const dynamic =
  "force-dynamic"` is unpinned — but dropping `/login`'s export trips
  Next's useSearchParams-without-Suspense prerender error at `next
  build` (fails closed at the gate) — REGISTER (documented
  build-caught).
- AUDIT-3-4 (Info): zero structured data (no JSON-LD anywhere) — the
  parity posture (the reference ships none; its SPA head has no
  structured data) — REGISTER as the future organic-search superset
  opportunity.
- AUDIT-3-5 (Info): robots.txt allows all on all paths — byte-mirrors
  the reference's allow-all body (the parity posture) — no action.
- AUDIT-3-6 (Info): `Number(e2ePort())` has no NaN guard — a
  non-numeric `E2E_PORT` fails loudly-but-opaquely at webServer boot
  (a 60s timeout + `http://localhost:NaN`) — REGISTER (operator-error
  class; the validation throw is the documented lift).
- AUDIT-1-4 (Info, local-only): the local untracked `.env`'s
  provenance note still reads `1..63` — refreshed locally at lockstep
  (no commit; the tracked `.env.example` is the surface that counts).

## Parity walk #39 — CLEAN (both legs, every documented posture)

REF leg (logged in, landed /Home): hamburger base
`md:hidden p-2 text-slate-300` with NO aria family; the panel inner
`px-6 py-4 space-y-3` with 4 nav links + the amber CTA pill
(`rounded-full`, computed 9999px); Escape R-OPEN; the outside-tap
R-OPEN; the route-change R-UNMOUNT (via the Pricing link); the desktop
census 6 visible links (hamburger hidden at 1440); the brand gradient
`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`; the
five-route head census (bare / + /login titles, the `<Page> |` family,
the prefixed descriptions, the canonicals); sitemap 4 URLs + robots
allow-all + the sitemap pointer; the generator DEAD (error face, no
copy button, no post — the documented 402 posture). CLONE leg (logged
in, landed `/` — the documented /Home deviation): the aria superset
ACTIVE (Open/Close-menu relabel, expanded true→false,
`aria-controls="mobile-menu"`); the panel inner byte-identical with
the 12px rhythm in v4's margin-block-end form and the infinity-calc
pill (33554432px); Escape L-CLOSE-WITH-FOCUS-RETURN (focus observed
back on the toggle); the outside-tap BOTH-OPEN (censused parity); the
route-change L-HIDDEN-IN-DOM; the desktop census identical; the brand
gradient byte-identical (the inline sRGB dodge); the head census
identical modulo origin; sitemap/robots identical modulo origin; the
generator LIVE (7 hashtags, the Copy button, the quota counter 3→2
remaining — the 0→1 used face). **No Tailwind v4 bug in the mobile
menu** — every mechanic live-verified at 390×844 on both legs.
Captures 139/140 on the dev server PIL-verified (1440×6871 landing
full-page; 390×10718 mobile menu open — teal present, non-blank).

## The TDD worklist (pins first, born RED, batteries on record)

### Phase 1 — the pins

- **S66-1a** (tests/boot-env.test.ts, new describe after S65-1, born
  RED): the residual-tiers redaction pin — face 1 (the query-param
  password, a VALID URL spelling) through BOTH the inert-value arm and
  the tab-paste residue arm answers `password=***` and never prints
  the password; face 2 (the scheme-less userinfo) through the
  inert-value arm AND both residue faces (leading-quote, tab) answers
  `***@` with the password absent; face 3 (the pre-scheme credential)
  answers `***@` with `admin:pass` absent; the controls — the clean
  `file:` contract verbatim and the S63-2/S64-1/S65-1 pinned shapes
  byte-identical (the existing suites own those; the new pin's control
  arm re-asserts the file: face).
- **S66-3a** (tests/route-title.test.ts, new describe, born RED): the
  catchAll layout's generateMetadata carries the request path's
  self-canonical — `alternates.canonical === "/definitely-not-a-route"`
  for that params shape, and the absolute title equals the known
  literal "Definitely Not A Route | ViralPost AI" (the independent
  source of truth — never a re-derivation through unknownRouteTitle).
- **S66-4a** (tests/toast-anatomy.test.ts, new it, born RED): the
  dismiss-focus source pin — ToastCard carries a rootRef +
  handleDismiss that (a) checks `root.contains(document.activeElement)`
  before the store mutation and (b) focuses the next remaining card's
  dismiss control (`nextElementSibling ?? previousElementSibling` →
  the dismiss button) — the navbar/paywall/login focus-return doctrine
  applied to the toast's own unmount path.
- **S66-6a** (tests/landing-page.test.ts, new it beside the S50-4/
  S51-2 gate pin, born RED): the copy catch arm rides the same gate —
  the clipboard await is followed by a catch containing the
  `!mounted.current || epochAtCopy !== genEpoch.current` return BEFORE
  the clipboard toast (the regex anchors on the clipboard await so the
  generate() catch cannot satisfy it).
- **S66-5a** (the three suites, in-place edits, born GREEN as census
  arms — the batteries are their RED faces): the stripComments
  generalization — landing-page / error-boundaries / http-headers gain
  the S48-1 hardened idiom and route their POSITIVE pins through the
  stripped read; negative pins stay raw (the stricter form).

### Phase 2 — the cures

- **S66-1b** (src/lib/boot-env.ts): the residual tiers — (1) the
  scheme-less arm: no scheme + an `@` anywhere → `***` + the tail from
  the LAST `@` (over-redact; a no-@ value stays verbatim); (2) the
  pre-scheme arm: `restAt <= afterScheme` but `restAt !== -1` → mask
  the WHOLE prefix (`***` + the tail from the last `@`) — masking from
  afterScheme would keep the credential in the prefix; (3) the
  query-param pass on EVERY arm's output:
  `replace(/([?&](?:password|passfile|sslpassword)=)[^&\s"']*/gi,
  "$1***")` (a URL can carry BOTH userinfo and a query password).
  Every pinned S63-2/S64-1/S65-1 shape byte-identical (no pinned shape
  carries a query param or a scheme-less/pre-scheme form).
- **S66-2b** (tests/e2e/a11y.spec.ts): the scroll-settle pass — a
  `revealSettle(page)` helper steps through the page at
  half-viewport steps (every Reveal is one-way: settle() +
  disconnect, reveal.tsx — the settle is permanent), polls until no
  div carries inline `opacity: 0` (serialization-independent — reads
  `el.style.opacity`), then returns to top; applied in the main
  describe's per-surface tests and the 404 test (the logged-out auth
  surfaces carry no Reveals — unchanged). Plus the SANCTIONED register
  gains the `text-teal-600` light-card family entry (the testimonial
  handles + the post-generation label — the reference's own palette,
  adjudicated never restyled). No new `test()` blocks: A11Y_SOURCE_TESTS
  stays 3, E2E stays 70.
- **S66-3b** (src/app/[...catchAll]/layout.tsx): `alternates:
  { canonical: \`/${catchAll.join("/")}\` }` in generateMetadata — the
  404 head declares itself its own canonical (noindex + self-canonical
  is the clean signal; the landing's og:url/og:image family stays —
  the shallow-merge replacement cost of rebuilding the full OG object
  buys nothing on a noindexed page, REGISTERED as the documented
  posture). The e2e seo.spec 404 test gains the canonical assertion
  (runtime teeth over the head the unit pin owns).
- **S66-4b** (src/components/ui/toast.tsx): the handleDismiss focus
  arm (the pin's shape); the 5th-push eviction face REGISTERED (push()
  has no DOM seam — the PAD row names it).
- **S66-6b** (src/components/marketing/generator-card.tsx): the catch
  arm gated identically to the success continuation; the S51-2 comment
  respelled to claim both arms truthfully.

### Phase 3 — the batteries (each plant REDs exactly its pin, all restored)

1. The redaction-revert plant (revert S66-1b to the S65-1b form) →
   REDs exactly S66-1a (all three faces print verbatim again).
2. The register-entry-deletion plant (drop the `text-teal-600` entry,
   keep the settle) → REDs exactly the a11y surface tests (the 3
   handle nodes answer "unadjudicated a11y violation" on the settled
   DOM — the arm's teeth).
3. The canonical-revert plant (drop the alternates from the layout) →
   REDs exactly S66-3a (+ the e2e 404 canonical assertion).
4. The focus-arm-removal plant (handleDismiss → plain dismiss) →
   REDs exactly S66-4a.
5. The catch-gate-removal plant → REDs exactly S66-6a.
6. The vacuity-proof plants for S66-5 (one per suite: plant a comment
   carrying a pinned literal + delete the real code line) → the OLD
   raw-read form GREEN (the vacuity), the NEW stripped form RED — the
   S65-4 battery pattern, three times.

### Phase 4 — the lockstep

- **The provenance re-anchor**: all ten sites `1..65` → `1..66`
  (`.env.example`, the SKILL frontmatter/§0.5, db-path.ts,
  health/route.ts, toast.tsx, and the five test files) — all ten at
  diskMax, lag 0 at ship, the S65-6a uniform posture.
- UNIT 758 → **762** (+4 its: S66-1a, S66-3a, S66-4a, S66-6a);
  SUITES 40 held; E2E 70 held (no new test() blocks); E2E_SPECS 9
  held; SMOKE 16 held; BADGE 828 → **832**.
- PAD: §8.1's table + carry line at 762/70/16; §11 +register rows
  (the NODE_ENV staging posture, the scrypt cost, the md-crossing
  rotation, the resize debounce, the auth force-dynamic build-caught
  posture, the JSON-LD parity posture, the e2ePort NaN guard, the
  toast eviction focus face, the 404 og:url posture); §12's
  catchAll/layout.tsx row re-anchored to the live line count (the
  inventory census REDs otherwise — the designed count-lag face).
- README (badge 832, the session-66 row inside the table, the gate
  footer), AGENTS (the plans map's sixty-sixth round, the 762),
  CLAUDE (the 762 line), SKILL v1.61.0 → v1.62.0 (frontmatter + the
  §0.5 range + Appendix A's session-66 row + Appendix B's
  re-certification through 66).
- The formal `docs/session_66.md` (replacing the narration), this
  plan's post-execution record, worklog Task 66.
- The local untracked `.env`'s provenance note refreshed to match
  `.env.example` (AUDIT-1-4 — local hygiene, no commit).

### Phase 5 — the ship

The full gate green on the final tree (lint 0/0 · tsc 0 · unit 762/762
· build · smoke 16/16 · e2e 70/70 · census MATCH), the standing asks
re-verified (the `.env` `DATABASE_URL="file:../db/custom.db"` contract
with `db/` at the repo root; vitest + playwright current; sitemap/
robots/manifest/OG verified live in walk #39 + the 404 canonical cure
probed; `.env.example` committed and current; `skills/` excluded from
every gate), then the Conventional Commit to main and the push via the
SSH wrapper runbook.

## Validation (the plan checked against the codebase before execution)

- The S63-2/S64-1/S65-1 pin neighborhood (boot-env.test.ts:1094-1237)
  read in full — the new describe slots after S65-1; the
  `databaseUrlInertValueWarning` import already present (line 46); the
  `env()` builder and the both-arm print vehicles confirmed.
- `redactCredentials` (boot-env.ts:598-631) read in full with all
  three call sites (265, 546, 678) — the cure composes on the existing
  scheme/token/restAt structure; every pinned shape's path through the
  new arms traced (no pinned shape reaches the scheme-less or
  pre-scheme arms; none carries a query param).
- a11y.spec.ts (152 lines) + a11y-matrix.ts read in full — the settle
  slots into both main-describe test bodies; the register entry's
  matcher verified against the handle markup
  (`className.includes("text-teal-600")` — the only text nodes in the
  family are the 3 handles + the state-only label; the other
  `text-teal-600` rides aria-hidden icons axe never flags as text, and
  the copy button's `hover:text-teal-600` computes slate-500 at rest);
  the docs-counts A11Y_SOURCE_TESTS pin (3 source test() blocks)
  unaffected — no new blocks.
- reveal.tsx read in full — the one-way settle (settle() +
  io.disconnect) makes the stepwise scroll permanent; the poll reads
  `el.style.opacity === "0"` (the hidden inline form React wrote —
  serialization-independent).
- The catchAll layout (32 lines, PAD §12-pinned) + site.ts's
  pageMetadata canonical form + the root layout's `alternates:
  { canonical: "/" }` read — the cure mirrors the factory's relative
  form (metadataBase resolves it); the og:url/og:image inheritance
  traced (the root layout's openGraph stands — the REGISTER posture).
- toast.tsx read in full — the module store's `dismiss` has no DOM
  seam; the cure rides ToastCard (rootRef + handleDismiss before the
  store mutation); the S20-6 focus-pause arm confirms the dismiss
  click is the sole focus-drop path; the eviction face is push()-side
  (REGISTERED).
- The S50-4/S51-2 gate pin (landing-page.test.ts:264-279) read in
  full — the S66-6a pin slots beside it; the regex anchors on the
  clipboard await (the generate() catch cannot satisfy it).
- The stripComments idiom (api-robustness's S48-1 hardened form) + the
  three target suites' read patterns surveyed — the positive pins
  assert code literals (JSX attributes, component tags, config keys);
  the negative pins stay raw; smoke-test.sh reads stay raw (bash
  comments are a different grammar).
- The docs-counts inventory census checked — the PAD §12 row for
  catchAll/layout.tsx (32 lines) rides the same-commit re-anchor.

## The post-execution record (session-66 ship)

Executed as planned. The deviations the record owes the truth:

- **One battery-found finding DEEPENED the S66-5 cure mid-round (the
  round's headline lesson)**: the first vacuity plant (hero's
  width={512} deleted from code, planted in a JSX comment) stayed
  GREEN under the two-pass idiom — the S48-1 hardened form's (^|\s)
  block opener never strips a brace-preceded {/*. The JSX-comment arm
  joined the house idiom family-wide (the eight TSX-reading named
  helpers: page-titles, toast-anatomy, seo-surfaces, auth-contract,
  docs-counts, and the S66-5 trio), and the arm-order correction
  landed mid-battery: the arm rides FIRST (a // inside a JSX comment
  — the footer's "text-slate-900//25" prose — eats the closing */}
  under the line pass, leaving an unterminated {/* whose non-greedy
  late arm over-ate live code to the next */}, the footer's
  Upgrade – $19 face). The one-idiom census gained the JSX-pass
  enforcement arm (runtime-constructed needles — the contiguous
  "function stripComments" literal self-matched the arm's own first
  run, the S64-2 union-read genus reborn and caught same-round). The
  a11y-controls raw-TSX reads and the design-tokens JSX false-alive
  face are REGISTERED (PAD §11, next-touch).
- **The plan's UNIT arithmetic corrected at lockstep**: the plan
  projected +4 its (describes counted, not its) — the round added
  EIGHT (S66-1a ×3, S66-3a ×2, S66-4a ×1, S66-6a ×1, the JSX-pass
  census arm ×1): UNIT 766, BADGE 836.
- **The PAD §12 inventory carried a second drifted row** beyond the
  planned layout row: generator-card.tsx 318 → 325 (the S66-6
  catch-arm gate) — both rows re-anchored in the same commit.
- All six battery families landed and are on record (the
  redaction-revert, the register-entry-deletion on the built tree,
  the canonical-revert, the focus-arm-removal, the
  catch-gate-removal, the three vacuity plants — each RED exactly
  its pin, all restored); the designed count-lag faces (UNIT census,
  the plans map, the Appendix-B route-title count, the PAD §12 rows,
  the README/AGENTS/CLAUDE count sites, the Appendix-B header) fired
  and were cured at the lockstep.
- Counts at ship: UNIT 766 / SUITES 40 / E2E 70 / E2E_SPECS 9 /
  SMOKE 16 / BADGE 836; the ten provenance sites at 1..66 (lag 0,
  uniform — the S65-6a posture); SKILL v1.62.0; captures 139/140
  PIL-verified; the full gate green on the final tree; push to main
  via the SSH wrapper runbook.

**Gate at the session-66 ship: lint 0/0 · tsc 0 · unit 766/766 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
