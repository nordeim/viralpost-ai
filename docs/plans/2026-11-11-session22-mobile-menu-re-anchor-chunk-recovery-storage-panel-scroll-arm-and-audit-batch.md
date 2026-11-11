# Session 22 — The Mobile-Menu Re-Anchor + The Chunk-Recovery Storage + The Panel Scroll Arm + The Audit Batch (2026-11-11)

## Context

Session 21 pushed `a8b1c27` (the CTA-class re-anchor + the oklab→sRGB
gradient cure + the mobile-menu pill + the audit batch); the owner added
`fa18dcf` (the session-21 round log, held as `docs/session_22.md`'s
pre-round transcript). This round re-ran the standing instruction against
the merged tree: docs review → baseline gate → the comprehensive audit
(three parallel subagents) → the neo-crm re-review → the live reference
parity walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
586/586 (37 files) · census MATCH (1 user + 0 contact messages). `.env`
re-created from `.env.example` (AUTH_SECRET set for dev), `db/` at the
repo root with `custom.db` pushed + seeded — the DATABASE_URL contract
(`file:../db/custom.db` resolving against `prisma/schema.prisma`)
re-verified end-to-end on a clean clone. The operator's standing asks
re-verified: `.env` DATABASE_URL + `db/` at root ✓ · vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in
place and current ✓ · sitemap.xml / robots.txt / manifest / OG family /
per-route metadata byte-verified against the live reference ✓ · `skills/`
excluded from every gate (tsconfig/eslint/vitest, all explicit) ✓.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review (re-cloned and verified this round); the recorded
adoption/deferral decisions stand.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs —
every load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/1M/1L/5I · AUDIT-2: 0C/0H/1M/3L/3I · AUDIT-3:
0C/0H/0M/3L/4I** — combined **0 Critical / 0 High / 2 Medium / 7 Low /
12 Info.**

**The parity walk (live, both sides, logged into the reference):** the
five-route head census (title/description/og/twitter/canonical) — NO
DRIFT (the session-19 description family holds byte-for-byte). The
monetization floaters (10 icons, identical class families, live rotation
transforms) — NO DRIFT. Sitemap.xml + robots.txt — identical
(origin-difference only). The clone's generator round-trip green (the
reference's LLM stays platform-dead — the documented superset). The
footer CTA, the /Pricing Pro-card CTA, the three sRGB brand gradients
(wordmark / monetization headline / Get-Unlimited-Access CTA), the
desktop nav family, the hamburger's aria contract (both sides relabel
Open/Close menu, both carry aria-expanded + aria-controls), the landing
heading tree, and the login card — ALL byte-identical.

**BUT the mobile-menu control census found THREE LIVE DRIFTS — the
reference has REVERTED its dropdown to the session-1-era form** (the
session-21 S21-3/S21-4 captures caught a transient deploy state; today's
live reference shows the pre-session-21 form again):

| ID | Severity | Surface | Drift |
|---|---|---|---|
| S22-1 | **MEDIUM** (parity) | `src/components/marketing/navbar.tsx:194` — the mobile-menu Upgrade pill | Reference text: **"Upgrade to Pro – $19"** (the priced form; the desktop pill keeps "Upgrade to Pro"). Clone text: "Upgrade to Pro" (the session-21 re-anchor). |
| S22-2 | **MEDIUM** (parity) | `src/components/marketing/navbar.tsx:190-194` — the pill's classes | Reference: `block w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full` — NO hover family. Clone carries `hover:shadow-lg hover:shadow-amber-400/30 transition-all hover:-translate-y-0.5` (the session-21 adoption). |
| S22-3 | **LOW** (parity) | `src/components/marketing/navbar.tsx:159-174` — the menu links | Reference: the bare mobile family `block w-full text-left text-sm font-medium py-2 transition-colors` + active `text-teal-400` / idle `text-slate-300 hover:text-white` — NO underline affordances (and `py-2` is now in the reference's own base, so its touch target is 36px like ours). Clone carries the full LINK_BASE underline family (the session-21 S21-4 adoption). |

Evidence: the agent-browser computed-style censuses (both sides, mobile
390×844, menu open) — full class strings + computed gradients, captured
in the round log.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S22-1 | **MEDIUM** (parity) | `navbar.tsx:194` | The mobile-menu pill text drift (above). |
| S22-2 | **MEDIUM** (parity) | `navbar.tsx:190-194` | The mobile-menu pill hover-family drift (above). |
| S22-3 | **LOW** (parity) | `navbar.tsx:159-174`, `MENU_LINK_BASE` at :38-45 | The mobile-menu link affordance drift (above). |
| S22-4 | **MEDIUM** | `src/app/error.tsx:33-35`, `src/app/global-error.tsx:29-31`, `src/lib/chunk-recovery.ts:69-111` | **The chunk-recovery cooldown is inert in production.** Both error boundaries call `reloadOnStaleChunk(error)` with NO deps — `storage` is `undefined → null`, the optional-chained read yields `null` without throwing (so the `catch { return false }` "unavailable storage disables the reload" arm never fires), `lastReloadAt` stays `null`, `shouldHardReload(..., null)` returns `true` unconditionally, and the flag write is a no-op. Every stale-chunk error reloads immediately — the 10s cooldown and the crash-mid-reload loop guard (the seam's two documented safety properties) never engage; a recurring chunk error traps the user in a reload loop and the error card is unreachable. `tests/error-boundaries.test.ts:47` pins the defective bare call shape. (AUDIT-1 A1-1; Verified by code trace + runtime probe.) |
| S22-5 | **MEDIUM** (a11y, WCAG 1.4.3) | `src/components/marketing/navbar.tsx:45,153-160` | **The mobile-menu panel stays transparent on the home route after scrolling into light sections.** `onHero = active === "home"` is scroll-independent, so on `/` the panel never gains `bg-slate-900/95 backdrop-blur-xl`. Six of the landing's ten sections are light; scroll the landing at 390px, open the menu: the bar goes dark (`scrolled || open`) but the panel below stays transparent — `text-slate-300` links (#cbd5e1) over #f8fafc compute ≈1.48:1, far under the 4.5:1 (and 3:1 large-text) floors. The file's own comment claims the dark-panel superset covers light pages — home-scrolled is exactly that situation and is missed. (AUDIT-2 A2-1; Verified — contrast computed.) |
| S22-6 | **LOW** (UX) | `src/components/layout/login-card.tsx:473-475` | The forgot-password submit has the in-flight logic guard but no `disabled={pending}` and no "Please wait…" label — the four sibling submits (signin/signup/verify + the reset screen) all carry both; the `disabled:pointer-events-none disabled:opacity-50` utilities in `LOGIN_RESET_LAYOUT.send` can never fire. (AUDIT-2 A2-2.) |
| S22-7 | **LOW** | `src/lib/schemas.ts:63-72` | `signupSchema.name`'s `.max(80)` carries no message — Zod's built-in English ("Too big: expected string to have <=80 characters") leaks on an 81+-char name, the exact S16-1 dev-message-leak genus; the module header claims "every message string is the pinned user-facing contract". (AUDIT-1 A1-2; probe-verified.) |
| S22-8 | **LOW** (config) | `package.json:47-53` | The `allowScripts` block is dead config under Bun (its postinstall-permission mechanism is `trustedDependencies`, which lists only `unrs-resolver`) — the documented "let prisma's postinstall run" permission never applied. (AUDIT-3 A3-1; binary-string-scan verified.) |
| S22-9 | **LOW** (coverage/docs) | `tests/e2e/a11y-matrix.ts`, `a11y.spec.ts` + CLAUDE.md:147, SKILL §8, PAD §8.2 | `/signup` and `/reset-password` are never axe-scanned while three docs claim "axe-core a11y assertions on every route at two widths". (AUDIT-3 A3-2.) |
| S22-10 | **LOW** (a11y) | `src/app/error.tsx:42,56`, `src/app/global-error.tsx:40,56` | The error boundaries' `text-slate-300` h1 over `bg-slate-50` computes ≈1.48:1 (under the 3:1 large-text floor) — unlike the 404's identical h1 (parity-protected), these are superset surfaces; plus their "Try again" buttons use `focus:` where the house doctrine is `focus-visible:`. (AUDIT-2 A2-3/A2-4.) |
| S22-11 | **LOW** (a11y, WCAG 2.4.1) | `src/app/(site)/layout.tsx` | No skip-to-content link on the marketing chrome — a keyboard user tabs through 6 nav controls before `<main>`; the project's own a11y-superset genus (aria hamburger, focus maps) has no bypass-blocks member. (AUDIT-2 A2-5.) |
| S22-12 | **LOW** (portability) | `scripts/smoke-test.sh:67,158,84-85` | `xargs -r` is GNU-only (BSD/macOS rejects it) while README claims "a POSIX shell" suffices; the ladder's curls carry no `--max-time` — a wedged server hangs the gate forever instead of failing it. (AUDIT-3 A3-3/A3-7.) |
| S22-13 | **INFO** | `.gitignore:34-35` | WAL sidecars (`db/*.db-wal`, `db/*.db-shm`) are not ignored (currently non-live — Prisma runs rollback-journal mode; a driver change would leak sidecars into `git status`). (AUDIT-3 A3-4.) |
| S22-14 | **INFO** (coverage) | `tests/e2e/seo.spec.ts` | No test at any layer asserts `GET /icon.png` (or `/apple-icon.png`) resolves — the manifest points at the file-convention route; a deleted icon or a convention break ships green. (AUDIT-3 A3-5.) |
| S22-15 | **INFO** | `tests/docs-counts.test.ts:309` | The e2e anti-dodge guard matches one literal substring (`for (const width`) — a `.map`/`.forEach` test-registration loop in another spec would dodge the census. (AUDIT-3 A3-6.) |
| S22-16 | **INFO** | `src/lib/auth.ts:106-118` | `verifySessionToken` shape-guards `uid`/`exp`/`v` but passes `payload.iat ?? 0` through any type — hygiene against the module's own "the parse must never widen" standard. (AUDIT-1 A1-3.) |
| S22-17 | **INFO** | `src/lib/db-path.ts:57-67,97-103` | The standalone anchor gates on a loose `.next` substring (not the `.next/standalone` folder pair); the last-resort comment says "only accept when the target already exists" but the dirname arm accepts a mere existing `db/` directory. (AUDIT-1 A1-4/A1-5.) |
| S22-18 | **INFO** | `src/lib/boot-env.ts:153-158` vs `src/lib/rate-limit.ts:94-100` | The hops warning fires on `!/^\d+$/` while `proxyHopDepth`'s `Number.parseInt` accepts `"+1"`/`" 1"`/`"0x2"` — the operator is warned "unparsable" for values that actually work. (AUDIT-1 A1-6.) |
| S22-19 | **INFO** | `src/lib/site.ts:47-62` | `siteUrl()` accepts path-carrying origins (`https://x.com/base`) — metadata-only misconfiguration class; the boot gate's shape warning doesn't cover it. (AUDIT-1 A1-7.) |
| S22-20 | **INFO** | `src/components/marketing/hero.tsx:88-94` | The hero portrait's plain-`<img>` choice (standalone parity) is undocumented — every other deliberate deviation carries its rationale. (AUDIT-2 A2-6.) |
| S22-21 | **INFO** | `src/app/reset-password/page.tsx:10-12` | The comment describes a Suspense fallback that never renders (the page is `force-dynamic`; `/login` and `/signup` correctly ship no boundary). (AUDIT-2 A2-7.) |
| S22-22 | **INFO** (comment truth) | `src/components/marketing/navbar.tsx:10`, SKILL §8 | The hamburger's aria comment says "the reference ships neither — our superset"; the LIVE reference now ships aria-expanded + the relabeling aria-label + aria-controls (matching ours) — the claim is stale; it is parity now, not superset. |

**Verified, no action (the honest-deferred register):** the same-family
gradient postures (amber-400→amber-500, teal-500→teal-600 stay on
utilities — the oklab delta is sub-threshold per the session-21
adjudication; re-checked live this round); the signup admin-bootstrap
race (empty-DB edge behind the IP limiter); the logout-CSRF nuisance
(the adjudicated S13-8 posture); the landing's section-header duplication;
the Reveal no-JS trade-off; the offscreen-rAF pause; the non-signin
views' h2-only headings; the per-account login lockout;
scryptSync-on-the-request-path; the toast nested live regions; the
error.tsx forced-error surface (the axe battery lands with S22-9's matrix
extension instead); the start tee pipe — each with its reason in the
session-21 register, re-read and carried.

## Remediation (TDD where a contract changes)

- **R22-1 (S22-1 + S22-2, TDD + live)**: the pin FIRST — landing-page
  .test.ts's session-21 menu-pill pin re-anchors to the reference's live
  form (text "Upgrade to Pro – $19" — the en-dash form; the bare-class
  string WITHOUT the hover family; a negative pin banning the hover
  family on the menu pill). RED. GREEN: navbar.tsx's pill re-anchored
  (text + classes; the `block w-full text-center` prefix stays — it is
  the reference's own). The e2e mobile-navigation name pin re-pins to
  the priced text in the same commit. The navbar comment re-anchors
  (the reference's live form is the priced text WITHOUT the hover
  family — the session-21 capture was a transient deploy state).
  Live-verify at 390×844.
- **R22-2 (S22-3, TDD + live)**: the pin FIRST — the MENU_LINK_BASE pin
  re-anchors to the reference's bare mobile family
  (`block w-full text-left text-sm font-medium py-2
  transition-colors`; the active/idle arms drop the `after:*`
  underline modifiers). RED. GREEN: MENU_LINK_BASE + the link arms
  re-anchored; the S21-4 comment rewritten (the reference's dropdown
  shows the bare family today; py-2 rides ITS base). Live-verify.
- **R22-3 (S22-4, TDD)**: the pins FIRST — (a) a new chunk-recovery
  seam test: `reloadOnStaleChunk(staleErr, {})` (no storage) returns
  `false` (the documented "unavailable storage disables the reload"
  contract, now honored for the absent-storage face too); (b) the
  error-boundaries source pin re-anchors to the storage-handed call
  shape. RED. GREEN: the seam gains `if (!storage) return false` after
  the stale-chunk check (a non-chunk error still short-circuits first);
  both boundaries hand `storage: safeSessionStorage()` — a module-local
  guarded accessor (`try { return window.sessionStorage } catch {
  return null }`).
- **R22-4 (S22-5, TDD + live)**: the pin FIRST — a landing-page source
  pin on the `(!onHero || scrolled)` panel condition. RED. GREEN: the
  panel gains the scrolled arm (top-of-hero unscrolled stays transparent
  — parity preserved; scrolled anywhere gets the dark panel, matching
  the bar's own `scrolled ||` key). The e2e scrolled test extends in
  place with the panel-class assertion (counts unchanged — the S18-2
  extend-in-place precedent). Live-verify: home scrolled + menu open.
- **R22-5 (S22-6, TDD)**: the pin FIRST — login-views.test.ts pins the
  reset submit's `disabled={pending}` + the "Please wait…" label (the
  four-sibling count becomes five). RED. GREEN: the submit mirrors the
  signin family exactly.
- **R22-6 (S22-7, TDD)**: the pin FIRST — schemas.test.ts gains the
  81-char name case asserting the house message. RED. GREEN:
  `.max(80, "Name must be reasonably sized")`.
- **R22-7 (S22-8, TDD)**: the pin FIRST — type-gate.test.ts pins
  `trustedDependencies` carrying `prisma` + `@prisma/client` and the
  `allowScripts` block's absence. RED. GREEN: package.json edited (the
  package-manager-sanctioned way — bun rewrites the lock's copy on the
  next `bun install`, which the gate's setup runs).
- **R22-8 (S22-9, TDD)**: the a11y matrix grows LOGGED_OUT_SURFACES
  (`/login`, `/signup`, `/reset-password`) — the logged-out describe
  loops it (+4 tests: 3 surfaces × 2 widths − the existing login's 2).
  The three docs claims ("every route") become true. The census
  arithmetic comment + E2E count re-anchor (58 → 62).
- **R22-9 (S22-10, TDD)**: the pin FIRST — error-boundaries.test.ts
  pins `text-slate-500` on both h1s + the `focus-visible:` family on
  both buttons. RED. GREEN: both boundaries re-anchored (the comment
  records the divergence-from-404 reason: the 404's slate-300 is
  parity-protected; the superset surface holds the AA floor).
- **R22-10 (S22-11, TDD)**: the pin FIRST — a11y-controls.test.ts pins
  the skip link (the sr-only anchor + `#main-content` on the main).
  RED. GREEN: the (site) layout gains the skip link (sr-only until
  focused, the focus:not-sr-only reveal, z-[60] above the navbar's
  z-50, the house dark-panel styling).
- **R22-11 (S22-12)**: smoke-test.sh — the squatter-kill becomes
  portable (`grep . |` before `xargs kill`), and the two curl helpers
  gain `--max-time 10`. The 15-leg count is unchanged (the legs
  themselves are untouched).
- **R22-12 (S22-13)**: .gitignore gains `db/*.db-wal` + `db/*.db-shm`.
- **R22-13 (S22-14, TDD)**: seo.spec.ts gains the icon request leg
  (`/icon.png` + `/apple-icon.png` → 200 + image/png; one test, two
  asserts). E2E 62 → 63.
- **R22-14 (S22-15, TDD)**: the docs-counts e2e guard ports the unit
  layer's indent-based loop-scan (extended to `test(` registrations and
  the `.forEach`/`.map` shapes).
- **R22-15 (S22-16, TDD)**: the pin FIRST — auth.test.ts gains the
  non-number `iat` case (a signed payload with `iat: "x"` normalizes to
  0, never widens the type). RED. GREEN: the typeof guard in
  verifySessionToken.
- **R22-16 (S22-17, TDD)**: the pin FIRST — db-path.test.ts gains the
  mid-path `.next` fixture (a cwd like `/x/.nextfoo/y` is NOT a
  standalone anchor). RED. GREEN: the standalone anchor gates on the
  `.next/standalone` folder pair; the last-resort comment aligns to the
  dirname-arm reality.
- **R22-17 (S22-18, TDD)**: the pin FIRST — boot-env.test.ts re-anchors
  the hops-warning cases (`" 1"` no longer warns). RED. GREEN: the
  warning predicate parses exactly like `proxyHopDepth` (parseInt, NaN
  → warn).
- **R22-18 (S22-19, TDD)**: the pin FIRST — boot-env.test.ts gains the
  path-carrying-origin warning case. RED. GREEN: the malformed-URL
  warning arm extends to non-empty pathnames.
- **R22-19 (S22-20 + S22-21, comments)**: the hero portrait's
  parity rationale comment; the reset-password Suspense comment
  reworded to the defensive-boundary truth.
- **R22-20 (S22-22, comment truth)**: the navbar's hamburger comment +
  SKILL §8 re-anchor — the reference now ships the aria family; ours is
  parity (the Escape-close + route-change-close supersets stand).
- **R22-21 (lockstep)**: the count ladder re-anchored at the ship
  census (UNIT → the live count, E2E 58 → 63, badge arithmetic); the
  PAD §12 line-count rows for every edited file; README (the
  session-22 row, the gate line, the badge); AGENTS (counts, the plans
  map's twenty-second round); CLAUDE (counts); PAD (§8.1, §12 rows);
  SKILL v1.17.0 → v1.18.0 (frontmatter, §5/§8 re-anchors, Appendix A's
  session-22 row); worklog Task 22; `docs/session_22.md` (the pre-round
  transcript replaced by this round's log); this plan's post-execution
  record.
- **R22-22**: captures 51/52 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited, the menu DOM-confirmed open before the shot),
  PIL-verified.
- **R22-23**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first, key shredded
  after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The three mobile-menu drifts cured and live-verified against the
   reference (the pill text + classes, the link family — computed
   styles byte-match at 390×844).
3. The chunk-recovery cooldown live in production shape (storage
   handed; the null-storage face fails safe; pinned both sides).
4. The menu panel darkens on home-scrolled (e2e-pinned + live-verified);
   the reset submit carries its pending face; the signup name message
   is house vocabulary.
5. The a11y matrix covers /signup + /reset-password; the skip link
   ships; the error boundaries hold the AA floor.
6. The config/script batch lands (trustedDependencies, the portable
   smoke ladder, the WAL gitignore, the icon legs, the census guard).
7. The docs lockstep at the final counts; captures 51/52 PIL-verified.

## Post-execution record (appended at ship)

## Post-execution record (appended at ship)

- **Baseline**: lint 0/0 · tsc 0 · unit 586/586 (37 files) on the merged
  tree (`fa18dcf`); census MATCH; the DATABASE_URL contract re-verified
  end-to-end on the clean clone.
- **The audit**: 0 Critical / 0 High / 2 Medium / 7 Low / 12 Info
  (combined across the three subagents); every load-bearing finding
  hand-verified in source by the lead.
- **The parity walk**: the reference live (five-route head census +
  floaters + sitemap/robots + the control census — the THREE
  mobile-menu drifts, the reference's dropdown reverted to its
  session-1-era form) + the clone's dev server.
- **R22-1 (S22-1/S22-2)**: the pin RED first (the priced text + the
  bare class with the closing-quote no-hover pin), then the pill
  re-anchored; the e2e name re-pinned to "Upgrade to Pro – $19"
  (exact). Live-verified byte-identical at 390×844.
- **R22-2 (S22-3)**: the pin RED first (the bare MENU_LINK_BASE
  declaration + the ternary arms + the underline-ban negative), then
  the links re-anchored (the S21-4 underline adoption retired; py-2
  rides the reference's own base). Live-verified.
- **R22-3 (S22-4)**: the pins RED first (the seam's absent-storage arm
  + both boundaries' storage-handed call shape), then the two-half
  cure — `if (!storage) return false` in the seam (after the
  stale-chunk short-circuit) + `safeSessionStorage()` in both
  boundaries. The cooldown and the crash-mid-reload loop guard are
  LIVE in production shape.
- **R22-4 (S22-5)**: the pin RED first, then `(!onHero || scrolled)`
  on the panel; the e2e scrolled test extended in place (counts
  unchanged). Live-verified: home scrolled + menu open → the dark
  glass classes on the panel.
- **R22-5 (S22-6)**: the pin RED first (the disabled + label face +
  the four-submit count), then the forgot submit mirrors the signin
  family. (The live in-flight sample is inconclusive on a fast local
  API — the wiring pin + the sibling-shared code path carry it.)
- **R22-6 (S22-7)**: the pin RED first, then
  `.max(80, "Name must be reasonably sized")`. Live-verified on the
  dev API: the 81-char name answers the house message.
- **R22-7 (S22-8)**: the pins RED first (trustedDependencies carries
  prisma + @prisma/client + unrs-resolver; allowScripts absent), then
  the package.json move + `bun install` (the lock's copy synced
  through the package manager; 432 installs — the postinstalls live).
- **R22-8 (S22-9)**: LOGGED_OUT_SURFACES = /login, /signup,
  /reset-password (the matrix + the spec's logged-out describe); the
  expansion formula re-anchored in the census; the three docs claims
  ("every route at two widths") true again.
- **R22-9 (S22-10)**: the pins RED first (unrolled per-file — the
  census counts source it( blocks), then the h1 → text-slate-500 +
  the focus-visible family on both boundaries (the divergence-from-404
  reason in the pin's comment).
- **R22-10 (S22-11)**: the pin RED first, then the skip link. The live
  verification caught the absolute-positioning off-viewport bug at
  scroll depth — cured to `focus:fixed` mid-round (the reveal now
  sits at the viewport's top-left regardless of scroll).
- **R22-11 (S22-12)**: `kill_port_squatters()` (grep . + the lsof
  guard) at both call sites + `--max-time 10` in both curl helpers;
  `bash -n` clean; the 15-leg count unchanged.
- **R22-12 (S22-13)**: `db/*.db-wal` + `db/*.db-shm` in .gitignore.
- **R22-13 (S22-14)**: the icon-resolution e2e leg (one test, both
  icons, status + content-type).
- **R22-14 (S22-15)**: the anti-dodge guard's registration-loop
  shapes — the first form (a 400-char window after any for-header)
  false-positived on landing.spec's assertion loop; refined to the
  test-as-first-statement shape (for/forEach/map), assertion-only
  loops stay legitimate. Documented in the guard's comment.
- **R22-15 (S22-16)**: the iat pin RED first (a crafted signed body
  with `iat: "x"` normalizes to 0), then the typeof guard.
- **R22-16 (S22-17)**: the decoy-layout fixture RED first
  (`.next-misc/standalone-ish` with a schema two levels up must NOT
  own the URL), then the basename-pair gate + the last-resort comment
  aligned.
- **R22-17 (S22-18)**: the pins RED first, then the predicate mirrors
  proxyHopDepth's parseInt (mid-round: the "1.5" expectation corrected
  — parseInt truncates, so it stays silent, exactly like the seam).
- **R22-18 (S22-19)**: the pin RED first, then the path-carrying
  warning (mid-round: the bare-origin pathname is "/" — the first
  `!== ""` form false-positived every healthy env; the existing
  healthy-env pins caught it).
- **R22-19 (S22-20 + S22-21)**: the hero portrait's plain-img
  rationale + the reset-password Suspense note.
- **R22-20 (S22-22)**: the hamburger-aria parity re-anchor (the
  navbar header comment + SKILL §8).
- **Count re-anchor**: UNIT 586 → 599 (+13: landing-page +2,
  chunk-recovery +1, error-boundaries +2, login-views +1, schemas +1,
  type-gate +2, a11y-controls +1, auth +1, db-path +1, boot-env +2),
  E2E 58 → 63 (the +4 matrix legs + the icon leg; specs 9 unchanged),
  badge 644 → 662; the §12 rows (auth 188, db-path 263, navbar 206,
  smoke 194 — the census surfaced the navbar/smoke drifts mid-round);
  the count sweep's touch on the session-21 historical row's badge
  restored (historical rows keep their ship-time numbers).
- **R22-21 (lockstep)**: README (the session-22 row, the gate line,
  the badge 662); AGENTS (counts, the plans map's twenty-second
  round); CLAUDE (counts); PAD (§8.1, §12 rows); SKILL v1.17.0 →
  v1.18.0 (frontmatter, §8's aria re-anchor, Appendix A's session-22
  row); worklog Task 22; `docs/session_22.md` (the pre-round
  transcript replaced by the round log); this record.
- **R22-22**: captures 51/52 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified (51: 100%
  non-white, 66.9% dark hero; 52: 95.6% dark upper-third).
- **R22-23**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 599/599 (37 files) · build · smoke 15/15 · e2e
  63/63 (9 specs) · census MATCH.
- **Deferred**: the honest register carried from session 21 unchanged
  (the signup admin-bootstrap race, the logout-CSRF posture, the
  section-header duplication, the Reveal no-JS trade-off, the
  offscreen-rAF pause, the h2-only swap headings, the per-account
  login lockout, scryptSync, the toast live regions, the error.tsx
  forced-error surface, the start tee pipe) — re-read, nothing new to
  add.
