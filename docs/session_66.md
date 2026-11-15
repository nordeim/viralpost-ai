# Session 66 — The Redaction Residual Tiers + The A11y Settled-DOM Register + The 404 Self-Canonical + The Toast Dismiss Focus Arm + The stripComments Generalization and the Register Batch (2026-11-15)

The round opened on the shipped tree (`28746e6` = session-65's
`0c6e39a` + the owner's narration commit carrying `docs/session_66.md`
as the round-65 working narration; this formal log replaces its
content at ship). The core docs re-read and re-verified at the
session-65 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.61.0),
then the session-65 set (the formal `docs/session_65.md` log, the
session-65 plan's post-execution record, worklog Task 65), and the
S65 cures verified in source (the manual-scan redaction, the
spawn-error arm, the uniform-lag ship arm, the stripComments pin
hardening, the ten-site provenance at `1..65`). This round is session
66, the standing instruction on the shipped tree.

## Baseline

`git pull` fast-forward `0c6e39a..28746e6` (the narration commit —
one file). `.env` on disk verified at the contract
(`DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root,
`AUTH_SECRET` set); census MATCH (1 user + 0 contact messages). The
ambient-shell `DATABASE_URL` pollution (an absolute path OUTSIDE the
repo — the S63/S64/S65 hazard) was found live and neutralized with
`env -u DATABASE_URL` on every DB-touching command. The `[health]`
display artifact re-confirmed harmless at baseline via ordinal byte
inspection (91 104 101 97 108 116 104 93 = the full prefix — the
S65 retraction's lesson applied, not re-litigated).

Baseline gate: lint 0/0 · tsc 0 · unit **758/758** (40 files — the
uniform lag-1 baseline: every provenance site at `1..65` against the
disk ledger at 66, exactly the S65-6a-sanctioned post-narration
state) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.
`bun audit`: the same 9 dev-toolchain advisories as session-55..65
(3H/5M/1L, none on the runtime request path).

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 3 Low / 7 Info**
(AUDIT-1 API/lib seams 0/0/1/0/3 · AUDIT-2 components/pages/effects
0/0/1/2/2 · AUDIT-3 SEO/configs/tests/docs 0/0/0/2/5). Every
load-bearing finding hand-verified by the lead — the two Mediums
live-probed through the REAL exported warning builders
(`bootEnvCheck` / `databaseUrlInertValueWarning`), the 404 canonical
live-probed against the standalone build, the two component Lows
verified by code read. The standing contracts all held (the envelope
on 13 handlers, the db seam monopoly, the bounded reader 8/8, the
limiter's buckets, the auth/revocation family, the boot gate arms,
all seven Tailwind v4 mitigations, the mobile-menu mechanic set, the
React 19 laws, the SEO family, every docs count re-derived from
disk).

**S66-1 (AUDIT-1-1, Medium — live-probed): the redaction residual
tiers.** The S65-1b manual scan left three verbatim classes: (1)
query-param credentials on an otherwise VALID URL —
`postgresql://db.example.com:5432/prod?user=admin&password=SuperSecret9`
is a documented libpq/Prisma spelling and printed `SuperSecret9`
verbatim through the inert-value warning (the tab-paste residue
variant printed `TopSecret99` while naming the control char it was
printing) — the most realistic face yet, no typo required; (2)
scheme-less credentialed values (`user:supersecret@host/db`) through
the `!schemeMatch` early return, on the inert-value, leading-quote,
and control-char faces alike; (3) credentials before the first
scheme, where the `restAt > afterScheme` guard declines. The
one-owner doctrine ("the password never prints") still had unmasked
faces.

**S66-2 (AUDIT-2-1, Medium — live-probed): the a11y battery never
scanned the settled DOM.** The spec ran goto → networkidle → axe
with NO scroll: every below-fold Reveal wrapper sat at opacity:0 and
axe SKIPS opacity-0 nodes — the sanctioned register's coverage claim
was validated only against the unscrolled DOM. The live probe (axe
4.13 on the standalone build, slow-scroll + settle, all 17 wrappers
at opacity 1): 9 settled violations, 6 register-matching and **3
unadjudicated** — the testimonial handles (`text-teal-600` #0d9488
at 12px on #f8fafc = 3.57:1, the reference's own palette,
class-for-class parity). Both halves cured: the scroll-settle pass
+ the register's `text-teal-600` light-card entry (adjudicated,
never restyled — the parity doctrine this register exists for).

**S66-3 (AUDIT-3-1, Low — live-probed): the 404 head's foreign
canonical.** The catchAll layout's generateMetadata returned only
the title, so Next shallow-merged over the root layout's metadata:
every 404 shipped `<link rel="canonical" href="<origin>"/>` (the
LANDING's canonical) + og:url at the origin root while emitting
noindex — a mixed signal with zero owners.

**S66-4 (AUDIT-2-2, Low): the toast dismiss focus drop** — the
genus cured on the navbar/paywall/login/reset but not the toast; the
dismiss click unmounted the focused card and focus fell to `<body>`.

**S66-5 (AUDIT-3-2, Low): the raw-read positive pins** — the latent
S65-4 genus in landing-page (112 toContains) / error-boundaries (39)
/ http-headers (4); no live vacuous instance (spot-verified), the
class latent.

**S66-6 (AUDIT-2 I-1, upgraded): the copy catch arm** bypassed the
S51-2 epoch/mount gate the comments claim for "the continuation".

**The registers (documented, PAD §11 + the plan):** the
NODE_ENV-staging DEV-secret posture, the scrypt cost, the
mobile-menu md-crossing rotation, the particle-text resize debounce,
the auth pages' build-caught force-dynamic, the JSON-LD/robots
parity postures, the e2ePort NaN guard, the toast eviction focus
face, the 404 og:url inheritance posture, and (found mid-cure) the
a11y-controls raw-TSX reads + the design-tokens JSX false-alive
face — both next-touch. The local untracked `.env`'s stale
provenance note refreshed (local hygiene, no commit).

## Parity walk #39 — the thirty-ninth consecutive clean walk

Both legs at every documented posture: the hamburger base
byte-identical (`md:hidden p-2 text-slate-300`, NO aria family on
the reference vs our ACTIVE superset — Open/Close-menu relabel,
aria-expanded, `aria-controls="mobile-menu"`); the panel inner
byte-identical (`px-6 py-4 space-y-3`, 4 links + the amber CTA
pill) with the 12px rhythm in each side's engine form (the
reference's margin-top v3 / our margin-block-end v4) and the pill
(9999px / the v4 infinity calc 33554432px); Escape R-open /
L-close-with-focus-return (focus observed back on the toggle); the
outside-tap both open (censused parity); the route-change
R-unmount / L-hidden-in-DOM; the desktop census 6 visible identical
at 1440; the brand gradient byte-identical
(`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`);
the five-route head census identical (bare `/` + `/login` titles,
the `<Page> |` family, the prefixed descriptions, the canonicals);
sitemap 4 URLs + robots identical modulo origin; the generator DEAD
on the reference (error face, no copy button, no post) / LIVE on the
clone (7 hashtags, the Copy button, the quota counter 3→2 remaining
— the 0→1 used face). **No Tailwind v4 bug in the mobile menu** —
every mechanic live-verified at 390×844 on both legs. Captures
139/140 on the dev server PIL-verified (1440×6871 landing full-page;
390×10718 mobile menu open).

## The cures (TDD — the pins first, born RED, batteries on record)

- **S66-1a** the residual-tiers redaction pin (boot-env.test.ts, 3
  its) born RED exactly as designed — all three faces printed
  verbatim through the real warning builders; the controls (the
  clean `file:` contract, the S63-2/S64-1/S65-1 pinned shapes)
  byte-identical.
- **S66-1b** the residual tiers: the scheme-less arm masks to the
  LAST `@` (a no-@ value stays verbatim); the pre-scheme arm masks
  the WHOLE prefix (slicing from afterScheme would keep the
  credential in the prefix it skips over); the query-param pass
  rides EVERY arm's output (`password|passfile|sslpassword`,
  case-insensitive — a URL can carry BOTH userinfo and a query
  password), with the user= identity and host tails staying visible.
- **S66-2b** the scroll-settle pass (a stepwise half-viewport walk +
  the inline-opacity poll reading `el.style.opacity` —
  serialization-independent; every Reveal is one-way so the settle is
  permanent) applied to the four marketing surfaces + the 404; the
  SANCTIONED register's `text-teal-600` light-card entry. No new
  `test()` blocks — A11Y_SOURCE_TESTS stays 3, E2E stays 70.
- **S66-3a** the 404 self-canonical pin (route-title.test.ts, 2 its)
  born RED — generateMetadata called directly with the params shape
  Next passes; the title asserts the KNOWN literal (never a
  re-derivation through unknownRouteTitle); **S66-3b** the cure (the
  pageMetadata factory's relative `alternates` form; the root og
  family stays — the registered posture) + the e2e leg asserting the
  RENDERED canonical.
- **S66-4a** the dismiss-focus source pin (toast-anatomy.test.ts)
  born RED; **S66-4b** the handleDismiss focus arm (rootRef +
  contains(activeElement) + the DOM-next card's dismiss control
  BEFORE the store mutation; DOM order = tab order — the viewport's
  flex-col-reverse reorders visuals, never tabs).
- **S66-6a** the catch-arm gate pin (landing-page.test.ts, anchored
  on the clipboard await so the generate() catch can never satisfy
  it) born RED; **S66-6b** the catch arm gated identically to the
  success continuation.
- **S66-5a** the stripComments generalization (the three suites'
  positives through the stripped read; negatives stay raw — the
  stricter form) — **which the battery then deepened**: the vacuity
  plant (hero's `width={512}` deleted from code, planted in a JSX
  comment) stayed GREEN — the S48-1 hardened form's `(^|\s)` block
  opener NEVER strips a brace-preceded `{/*`. The JSX-comment arm
  joined the house idiom FAMILY-WIDE (the eight TSX-reading named
  helpers), riding FIRST — a `//` inside a JSX comment (the footer's
  `text-slate-900//25` prose) eats the closing `*/}` under the line
  pass, leaving an unterminated `{/*` whose late arm would over-eat
  LIVE CODE to the next `*/}` (the footer's Upgrade – $19 face —
  caught and fixed mid-battery, the arm-order correction). The
  one-idiom census gained the JSX-pass enforcement arm
  (runtime-constructed needles — the contiguous literal self-matched
  the arm's own first run, the S64-2 union-read genus reborn and
  caught same-round).

## The batteries (all on record — each plant REDs exactly its pin, all restored)

1. The redaction-revert plant (S66-1b → the S65-1b form) → REDs
   exactly the 3 S66-1a its (74 others GREEN).
2. The register-entry-deletion plant (the `text-teal-600` entry
   dropped, the settle kept) → REDs the a11y surface tests on the
   settled DOM (run against the built tree — the arm's teeth).
3. The canonical-revert plant (the alternates dropped) → REDs
   exactly the 2 S66-3a its.
4. The focus-arm-removal plant (handleDismiss → plain dismiss) →
   REDs exactly S66-4a.
5. The catch-gate-removal plant → REDs exactly S66-6a.
6. The vacuity-proof plants ×3 (landing-page / error-boundaries /
   http-headers: a pinned literal deleted from code, planted in a
   comment) → each REDs exactly its pin under the armed idiom — the
   first plant's initial GREEN is the round's battery-found finding
   (the JSX-comment hole), cured family-wide mid-round.

## The lockstep

UNIT 758 → **766** (+8 its: S66-1a ×3, S66-3a ×2, S66-4a, S66-6a,
the JSX-pass census arm), SUITES 40 held, E2E 70 held (the canonical
assertion rides inside the existing 404 test), E2E_SPECS 9 held,
SMOKE 16 held, BADGE 828 → **836**. The ten provenance sites
re-anchored `1..65` → `1..66` (all ten at diskMax, lag 0, uniform —
the S65-6a posture). The docs-counts constants; PAD §8.1's table +
carry line; PAD §11 +10 register rows; PAD §12's catchAll layout row
(32 → 47, the self-canonical note) + the generator-card row (318 →
325); README's badge + the session-66 row (inside the table — the
S43-3 continuity arm green) + the gate footer; AGENTS's plans-map
sixty-sixth round + the 766; CLAUDE's 766; SKILL v1.61.0 → v1.62.0
(frontmatter, §0.5 range, Appendix-A session-66 row, Appendix-B
re-certification through 66 + the route-title pin count 13 → 15).

## The ship

The full gate green on the final tree; captures 139/140 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-66 ship: lint 0/0 · tsc 0 · unit 766/766 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
