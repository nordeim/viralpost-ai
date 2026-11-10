# Session 19 — The Description-Family Re-Anchor + The Monetization-Section Redesign + The Reader-Envelope Closure + The A11y/Lockstep Batch (2026-11-10)

## Context

Session 18 pushed `7093e37` (the OPTIONS-envelope closure + the DEPLOYMENT
count re-anchor + the config-loader silence); the owner added `dab5aef`
(the session-18 log handoff, retained as `docs/session_19.md`'s
pre-round content). This round re-ran the standing instruction against
the merged tree: docs review → baseline gate → the comprehensive audit
(three parallel subagents) → the neo-crm re-review → the live reference
parity walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 550/550 (37 files) · census MATCH (1 user + 0 contact messages).
`.env` re-created from `.env.example` (AUTH_SECRET set for dev), `db/`
at the repo root with `custom.db` pushed + seeded — the DATABASE_URL
contract (`file:../db/custom.db` resolving against
`prisma/schema.prisma`) re-verified end-to-end on a clean clone. The
operator's standing asks re-verified: `.env` DATABASE_URL + `db/` at
root ✓ · vitest (`vitest.config.mts`) + playwright
(`playwright.config.ts`) suites in place ✓ · sitemap.xml / robots.txt /
manifest / OG family / per-route metadata in place ✓ ·
`skills/` excluded from code checking/testing/compilation ✓.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review (verified live this round); the recorded adoption/deferral
decisions stand.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**0 Critical / 0 High / 2 Medium / 10 Low / 26 Info.** The two Mediums:
the bounded-reader stream-error escape (live-reproduced) and the
proxyless-shared-bucket documentation gap.

**The parity walk (live, both sides):** the mobile menu family at
390×844 on BOTH sides (the reference's no-aria hamburger
`md:hidden p-2 text-slate-300`, 5 destinations, auto-close; the clone's
Escape + focus-return + auto-close + derived `Tool | ViralPost AI`
title — hydration clean via `localhost`); the five-route OG family via
direct loads; sitemap.xml + robots.txt. **TWO LIVE DRIFTS FOUND** (the
reference changed since the session-18 walk):

- **D-1 — the description family.** The reference's `/Tool`, `/Pricing`
  and `/Contact` now ship `"<Page> on ViralPost AI. " + <70-char
  truncated description tail>` on `meta[name=description]`,
  `og:description` AND `twitter:description` (all three byte-identical;
  the tail is `SITE_DESCRIPTION` cut at 70 chars on a word boundary,
  trailing comma normalized to a period: `"An AI-powered social media
  generator that helps creators, influencers."`). The `/` and `/login`
  families are UNCHANGED (the plain 170-char paragraph). og:title /
  og:url / canonical / og:image / twitter:card — unchanged. This is the
  exact prefix shape the session-8 census recorded as ABSENT (F8-1
  retired it from the clone) — the reference platform has since adopted
  it, with a truncation the CRM-family's helper never had.
- **D-2 — the monetization section redesign.** The reference's landing
  section 3 replaced the PT (Portuguese) copy with a redesigned EN
  section (live-extracted in full): badge "Free Access — No Strings
  Attached" (gift icon), H2 "Download Free. <teal→amber gradient>If It
  Helps You, Help Us Too.</gradient>", a new paragraph ("We believe in
  honesty. … you'll instantly receive the full Pro version unlocked."),
  four EN benefit cards (gift/zap/star/heart icons, the same card
  classes), BOTH CTAs now external Gumroad anchors ("Get Free Access
  Now" — white/10 bordered pill with a gift icon; "Support & Unlock
  Pro" — amber-gradient pill with heart + arrow-right), a new trust
  line (lock icon + "100% secure payment via Gumroad · Instant Pro
  access after contribution", `mt-6` flex gap-2 — was `mt-8` plain),
  and TEN absolutely-positioned floating lucide icons (hash/star/
  trending-up/instagram/twitter/sparkles/message-circle/hash/zap/star
  at pinned left/top percentages, pinned color steps and sizes
  18–28px, JS-driven bob/rotate/opacity animation — framer-motion on
  the reference). The clone still ships the PT section (the session-1
  clone of the then-live face). The section appears ONLY on the
  landing (`/Tool` `/Pricing` `/Contact` verified negative).

Also verified on the walk: the reference's pricing header ("Simple
Pricing") carries NO reveal wrapper on EITHER `/` or `/Pricing` (the
CARDS do reveal on both) — the clone's `/Pricing` header `<Reveal>` is
a motion-only drift from the reference (AUDIT-2 I-1 inverted by the
live evidence: the cure is to REMOVE the header wrapper, not add one).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S19-1 | **MEDIUM** (parity drift, live-verified) | reference `/Tool` `/Pricing` `/Contact` heads vs `src/lib/site.ts` | **The description family re-anchored on the reference.** All three description surfaces on the three inner routes now ship the `"<Page> on ViralPost AI. "` prefix + a 70-char word-boundary-truncated tail (terminal period). The clone ships the plain 170-char paragraph (the session-8 F8-1 retirement, now stale). `/` and `/login` unchanged. |
| S19-2 | **HIGH** (parity drift, live-verified) | reference landing section 3 vs `src/components/marketing/sections.tsx` `PtSection` | **The monetization section redesigned EN.** New badge/H2/paragraph/benefits copy, both CTAs → Gumroad (new classes + gift/heart/arrow-right icons), new trust line (lock icon, `mt-6`), and ten floating animated icons (pinned positions/colors/sizes). The clone ships the retired PT face. |
| S19-3 | **MEDIUM** (envelope escape, live-reproduced) | `src/lib/api.ts:162-179` | **A body-stream error rejects past `readBoundedJson`.** The Layer-3 reader loop's `await reader.read()` is the seam's only unguarded await — a client abort on a chunked body (or a proxy-induced read failure) rejects through the seam and out of the handler as a raw 500. Every other failure class funnels to the envelope. Cure: wrap the loop; a stream error ≡ an unparseable body (`{ tooLarge: false, value: null }`) + a regression test with an errored `ReadableStream`. |
| S19-4 | **MEDIUM** (docs gap) | `src/lib/boot-env.ts` warning + `docs/DEPLOYMENT.md` §3 | **The proxyless shared-bucket consequence is under-scoped.** With no XFF and no `x-real-ip`, `clientKey` returns `"unknown"` at ANY depth ≥ 1 — every honest browser client on a proxyless deployment shares ONE bucket per route (site-wide login ceiling 10/15 min), not just at the declared `HOPS=0`. The boot warning and DEPLOYMENT §3 tie the shared-bucket cost to depth 0 only. Cure: both surfaces state the any-proxyless-posture consequence. |
| S19-5 | **LOW** (timing oracle) | `src/app/api/auth/verify/route.ts:73-75` | **The lockout branch returns before any scrypt burn.** The miss branch (line 67) and the wrong-code branch (line 77) each burn one scrypt; the locked-out 429 burns none — a measurable fast-path on "email exists AND unverified AND ≥5 failures". The route's own S14-2 equalization doctrine missed this branch. Cure: burn the equalizer before the lockout return. |
| S19-6 | **LOW** (decision: document) | the 11 data routes | **OPTIONS on KNOWN API paths answers Next's bare 204** (the S18-2 cure covered only the unknown-path catch-alls). Decision: DOCUMENT as the deliberate exception — a CORS preflight benefits from the router-level 204 (no handler owns OPTIONS semantics), and the envelope doctrine's letter targets unknown paths and implemented methods. Recorded here + in the catch-all comment family; no code change, no e2e leg (pinning Next's internal auto-answer would pin the framework, not our contract). |
| S19-7 | **LOW** (a11y) | `src/components/ui/toast.tsx:66-70,150` | **The toast icons lack `aria-hidden`.** The only icon family in the tree without it (the S15-4 doctrine: empty lucide svgs are ignored by AT today, but the attribute is the latent-double-announcement guard). Cure: `aria-hidden` on the three ICONS entries + the dismiss `X`. |
| S19-8 | **LOW** (a11y) | `src/components/ui/toast.tsx:74-87` | **Dynamically inserted `role="status"` cards may go unannounced** — the viewport is `role="region"`, not a live region; the ARIA authoring guidance requires the live region to exist before the content change. Error toasts (`role="alert"`) are the safe arm. Cure: `aria-live="polite"` on the Toaster container (the sonner/Radix pattern). |
| S19-9 | **LOW** (reduced-motion defect) | `src/components/effects/particle-text.tsx:281-284` | **A resize blanks the particle title for up to ~3s in reduced-motion mode.** `onResize` runs `layout()` (which reassigns canvas width/height — clearing the canvas) + `buildParticles()`, but in reduced mode the ONLY redraw rides the phrase timer (`(wait + vaporize) × 1000`). Full-motion repaints via rAF immediately; the reduced path blanks. `buildParticles()` is also pure waste in reduced mode (the field is never drawn). Cure: in `onResize`, when `reduced`, `drawPlain()` immediately and skip `buildParticles()`. |
| S19-10 | **LOW** (a11y, WCAG 2.4.3) | `src/components/layout/login-card.tsx:118-122` | **In-place view swaps drop focus to `<body>`.** `goto()` unmounts the focused control (Forgot password? / Need an account? / the Back buttons); only the verify transition lands focus. The next Tab starts from the document top. Cure: extend the `view` effect to a per-view focus map (the incoming view's heading, `tabIndex={-1}`; verify keeps its code-box focus). |
| S19-11 | **INFO→cured** (motion parity, live-verified) | `src/components/marketing/sections.tsx:432` | **The `/Pricing` header `<Reveal>` is a drift from the reference** (the header is unfaded on BOTH reference routes; the cards reveal on both). AUDIT-2's I-1 read as "add Reveal to the landing"; the live walk inverted it — the parity-true cure is to REMOVE the header wrapper (both clone routes then match the reference's both-routes-unfaded header). |
| S19-12 | **LOW** (gate hole) | `tsconfig.json:42` | **`vitest.config.mts` fell out of the `tsc` program** — `**/*.ts` does not match `.mts`; the session-18 S18-5 rename checked every test pin but not the tsconfig include. Verified live: `tsc --listFiles` lists `playwright.config.ts` but not `vitest.config.mts`. Cure: add `"**/*.mts"` to `include`. |
| S19-13 | **LOW** (comment truth) | `tests/e2e/seo.spec.ts:109` | **The S18-2 comment still says "Next's own 405 + Allow"** — the disproved hypothesis (the RED run observed a bare 204; every other record says so). Cure: re-anchor the comment. |
| S19-14 | **LOW** (lockstep misses) | `next.config.ts:48`, `playwright.config.ts:19` | **Both still name `vitest.config.ts`** (the artifact-hygiene exclude entry and the cross-reference comment). Cure: `.mts` in both. |
| S19-15 | **LOW** (docs drift) | `Project_Architecture_Document.md` §3, `viralpost-ai_SKILL.md` | **"The runtime dependency surface is exactly [9 pkgs incl. `prisma`]"** — stale since session-15's `prisma` → devDependencies (live: 8 runtime packages). Cure: both docs re-anchored. |
| S19-16 | **INFO→cured** (dead code) | `scripts/install_packages.sh` | **A vestigial scaffold one-liner** (a raw floating `npm install …` — no shebang, not executable, referenced by nothing, bypasses the bun/lockfile discipline). Cure: retire the file (the dead-code retirement doctrine). |
| S19-17 | **INFO→cured** (robustness) | `scripts/smoke-test.sh:49,154` | **`GATE_PID` is never trapped** — a failure between the boot-gate spawn (line 154) and the inline kill (line 160) leaks the :3211 server. Cure: the cleanup trap kills `${GATE_PID:-}` too. |
| S19-18 | **INFO→cured** (docs nits) | `CLAUDE.md:90`, `.gitignore`, `Project_Architecture_Document.md` §12 header, `src/app/api/auth/resend/route.ts` | **The polish batch:** CLAUDE's `tw-animate-css` → `tw-animate.css` (the retired vendored FILE — the npm package was a separate session-9 retirement); the `.gitignore` duplicate `node_modules/` line; the PAD §12 header's "session-17 ship" label (re-anchor to the session-19 ship with the line-count census); the resend route's known-branch fsync residual (the one documenting sentence beside the S14-2 comment). |

**Verified, no action (the honest-deferred register):** forgot-password's
no-burn miss branch (documented — a burn would invert the fsync-scale
signal); the generate route's describe-first vocabulary for non-object
bodies (pinned deviation, S15-2); the generate route's
session-before-limiter ordering (negligible; the uid bucket needs the
session); the admin-bootstrap TOCTOU (theoretical demo posture);
`/api/health` unthrottled (the monitoring pattern); no CSP (documented
parity); the toast store's legacy-but-pinned pattern; the OTP
digit-distribution semantics (pinned); the inert `minLength` attrs under
`noValidate` (banner-over-bubble parity); the iridescence static frame's
timestamp vs t=0 (cosmetic); no explicit `WEBGL_lose_context` (GC
relied on; hero props constant); `prefers-reduced-motion` sampled once
at mount (parity posture); Reveal's no-JS opacity-0 (the reference's
framer `initial` parity); the landing's no-metadata export (the root
layout IS the landing head — pinned); the error boundaries' inferred
sanction (the register covers the identical 404 heading); the hero's
raw `<img>` (documented parity, dimensions provided); the mobile menu's
`open` state surviving the md crossing (invisible; harmless); the
eslint tree-wide off-switch register (S16-3, re-verified accurate);
SKILL Appendix A's row ordering + Appendix B's narrative tail
(cosmetic; refreshed in the v1.15.0 lockstep); `start`'s tee pipe
(operational nit; the gate boots the server directly); the smoke leg's
`uploads` absence assertion (defensive — catches a future upload
feature's artifact leak); the manifest's shallow pin (low churn,
`force-static`); `docs/session_19.md`'s pre-round content (this round's
log replaces it — the handoff narrative is preserved in the plan's
context and session_18.md).

## Remediation (TDD where a contract changes)

- **R19-1 (S19-1, TDD + mutation battery)**: the pins FIRST — the
  page-titles description pins rewritten to the live-verified family
  (the three exact prefixed strings; the `/` and `/login` plain family;
  the F8-1 retirement pin inverted — the prefix RETURNS with the
  reference's own truncation). RED against the current tree. GREEN:
  `pageDescription(page)` in `src/lib/site.ts` — the prefix + the
  70-char word-boundary-truncated tail (trailing comma normalized to a
  period) — consumed by `pageMetadata()` for the description /
  og:description / twitter:description on the three inner routes. The
  e2e leg: seo.spec gains the `/Tool` og:description pin (the live
  byte-exact string). Mutation battery: break the truncation → the
  derivation pin REDs → restore.
- **R19-2 (S19-2, TDD + mutation battery)**: the pins FIRST —
  landing-page.test.ts's PT pins rewritten to the EN copy +
  `<MonetizationSection />` + the FloatingIcons structural pin (ten
  icons, the pinned positions/colors/sizes); the e2e landing heading
  pin "Baixe Agora de Graça." → "Download Free.". RED. GREEN: the
  section rewritten in `sections.tsx` (renamed `PtSection` →
  `MonetizationSection`, the live-extracted copy/classes/CTA family,
  the trust line with the lock icon) + `src/components/effects/
  floating-icons.tsx` (a new client island: ten pinned lucide icons, a
  rAF-driven bob/rotate/opacity float with staggered phases,
  `prefers-reduced-motion` static, full cleanup) + the landing page
  import updated. Mutation battery: remove a pinned copy string → RED →
  restore.
- **R19-3 (S19-3, TDD)**: the RED regression in bounded-reader.test.ts
  (an errored `ReadableStream` through `readBoundedJson` →
  `{ tooLarge: false, value: null }`, never a rejection). GREEN: the
  reader loop wrapped — a stream error cancels the reader and reads as
  an unparseable body (the sites' existing "Invalid request body"
  vocabulary answers).
- **R19-4 (S19-5, TDD)**: the RED pin (verification.test.ts — the
  lockout branch burns the equalizer; source-pinned the S14-2 way).
  GREEN: `verifyVerificationCode(code, timingEqualizerHash())` before
  the lockout return, with the doctrine comment.
- **R19-5 (S19-7/S19-8, TDD)**: the toast-anatomy pins extended (the
  icons' `aria-hidden`; the viewport's `aria-live="polite"`). GREEN:
  both in `toast.tsx`.
- **R19-6 (S19-9, TDD)**: the effects-motion pin (the reduced-mode
  resize redraws via `drawPlain()`). GREEN: the `onResize` guard.
- **R19-7 (S19-10, TDD)**: the a11y-controls pin (the per-view focus
  map on view swap). GREEN: the `view` effect extended + per-view
  headings focused (`tabIndex={-1}`, `data-view-focus`).
- **R19-8 (S19-11)**: the `/Pricing` header `<Reveal>` removed (the
  live-verified unfaded header on both reference routes; the cards'
  Reveals stay — they match).
- **R19-9 (S19-12)**: `"**/*.mts"` added to the tsconfig include —
  `vitest.config.mts` re-enters the `tsc --noEmit` program (verified
  via `--listFiles`).
- **R19-10 (S19-13/S19-14)**: the seo.spec comment re-anchored (204);
  `next.config.ts` exclude + the playwright comment renamed `.mts`.
- **R19-11 (S19-4)**: the boot warning + DEPLOYMENT §3 extended — any
  proxyless deployment (declared or default) shares one bucket per
  route for honest traffic; fronting with a proxy + declared depth is
  the per-client posture.
- **R19-12 (S19-6)**: the known-path OPTIONS 204 exception documented
  in the catch-all comment family (the CORS-preflight rationale).
- **R19-13 (S19-15/S19-16/S19-17/S19-18)**: the PAD/SKILL runtime-deps
  re-anchor (8 runtime + the prisma CLI devDep); `install_packages.sh`
  retired; the smoke trap kills `GATE_PID`; the polish batch (CLAUDE
  spelling, .gitignore dup, PAD §12 header, the resend fsync sentence).
- **R19-14 (lockstep)**: unit/e2e counts re-censused at ship; README
  (the session-19 row, the gate line, the badge); AGENTS (counts, the
  plans map's nineteenth round); CLAUDE (counts); PAD (§8.1
  distribution, §12 line pins, §3 runtime surface); SKILL v1.14.0 →
  v1.15.0; worklog Task 19; `docs/session_19.md` (this round's log);
  this plan's post-execution record.
- **R19-15**: captures 45/46 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R19-16**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first, key shredded
  after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. `/Tool`, `/Pricing`, `/Contact` ship the live-verified prefixed
   description family on all three surfaces (unit-pinned byte-exact +
   the e2e `/Tool` leg); `/` and `/login` keep the plain paragraph.
3. The landing's monetization section matches the reference's EN
   redesign (copy, classes, CTA family, trust line, ten floating
   icons) — unit source-pinned + the e2e heading pin; the PT copy is
   gone from the tree.
4. An errored body stream answers the 400 vocabulary (never a raw
   500); the verify lockout burns the equalizer; the toast icons
   carry `aria-hidden` and the viewport is a polite live region; a
   reduced-motion resize repaints the particle title; a login-card
   view swap lands focus on the incoming view's heading.
5. `vitest.config.mts` is inside the `tsc` program; the stale names
   and comments re-anchored; the docs lockstep at the final counts;
   captures 45/46 PIL-verified.

## Execution record

- **Baseline**: lint 0/0 · tsc 0 · unit 550/550 (37 files) on the
  merged tree; census MATCH; the DATABASE_URL contract re-verified
  end-to-end on a clean clone.
- **The audit**: 0 Critical / 0 High / 2 Medium / 10 Low / 26 Info;
  the M-1 stream-error escape live-reproduced (an errored
  ReadableStream through readBoundedJson rejected with the raw
  Error); every load-bearing finding hand-verified in source.
- **The parity walk**: the reference live (TWO drifts — the
  description family, the monetization redesign) + the clone's dev
  server (the menu family, no drift).

## Post-execution record (appended at ship)

- **R19-1 (S19-1)**: the pins RED first (exactly 3 failed), then
  `pageDescription()` + the derivation joined site.ts. The live dev
  re-verification caught the top-level-field gap — `og:description`
  was prefixed while the plain `meta[name=description]` still
  inherited the root layout's paragraph (Next's shallow merge); the
  `description` field joined the factory and the pins extended to all
  three surfaces (16/16 GREEN). The e2e leg added (the `/Tool`
  byte-exact family + the `/login` plain paragraph). **Mutation
  battery**: slice(0,70) → slice(0,60) REDs exactly the 2 derivation
  pins → restored → GREEN. site.ts 138 → 169 lines (the PAD §12 row
  re-anchored).
- **R19-2 (S19-2)**: the pins RED first (exactly 4 failed — one pin
  reflowed twice for prettier's line wrapping and the `&amp;` entity
  form, the pins adjusted to the copy not the wrapping), then
  `PtSection` → `MonetizationSection` (the live-extracted EN copy,
  the benefit family, BOTH CTAs as external Gumroad anchors, the
  lock trust line) + `src/components/effects/floating-icons.tsx` (ten
  pinned icons, one rAF loop, staggered phases, reduced-motion
  static, full cleanup). pink-400/sky-400 joined the v3 palette
  re-pin. The e2e heading pin re-anchored. **Mutation batteries**: the
  badge copy and a floater identity each RED exactly their pins →
  restored → GREEN (23/23). The live structure walk confirmed the
  clone's section matches the reference's byte-for-class (section
  classes, 10 floaters at pinned positions, CTA texts, trust line)
  and the animation live-samples inside the observed envelope
  (translateY −20..−70, rotate ±10°, opacity 0..1).
- **R19-3 (S19-3)**: 2 regression pins RED (the raw Errors crossed
  the seam), then the Layer-3 reader loop wrapped — a stream error
  cancels the producer and resolves `{ tooLarge: false, value: null }`
  (the reader-family suites 44/44 GREEN).
- **R19-4 (S19-5)**: the lockout-burn pin RED, then the equalizer
  scrypt precedes the locked-out 429 (verification 6/6 GREEN).
- **R19-5 (S19-7/S19-8)**: the toast pins RED, then the icons'
  `aria-hidden` + the viewport's `aria-live="polite"` (toast-anatomy
  12/12 GREEN; one pin corrected from the audit's `AlertCircle2`
  misnomer to the file's `AlertCircle`).
- **R19-6 (S19-9)**: the resize pin RED, then the `onResize` reduced
  guard (`drawPlain()` + the skipped particle build) (effects-motion
  7/7 GREEN).
- **R19-7 (S19-10)**: the focus-map pin RED, then the per-view focus
  map (a11y-controls 14/14 GREEN; the count pin tightened to the JSX
  attribute form — the querySelector and the comment also spell the
  string).
- **R19-8 (S19-11)**: the `/Pricing` header `<Reveal>` retired (the
  live-verified unfaded header on both reference routes).
- **R19-9 (S19-12)**: `"**/*.mts"` added to the tsconfig include —
  verified live: `tsc --listFiles` now carries `vitest.config.mts`.
- **R19-10 (S19-13/S19-14)**: the seo.spec S18-2 comment re-anchored
  (405 → the live-observed 204, + the S19-6 exception note); the
  next.config exclude + the playwright comment renamed `.mts`.
- **R19-11 (S19-4)**: the boot warning + DEPLOYMENT §3 extended —
  the any-proxyless shared-bucket consequence stated on both faces.
- **R19-12 (S19-6)**: the known-path OPTIONS-204 exception documented
  in the bare-`/api` catch-all's comment family (the
  CORS-preflight rationale; one comment rephrased when the color
  census flagged "auto-answer" — the to-answer genus).
- **R19-13 (S19-15..S19-18)**: the PAD/SKILL runtime-deps claims
  re-anchored (8 runtime + the prisma CLI devDep);
  `scripts/install_packages.sh` retired; the smoke trap kills
  `GATE_PID`; the resend fsync residual documented; the CLAUDE
  `tw-animate.css` spelling; the `.gitignore` duplicate; the PAD §12
  header + rows re-anchored (site.ts 169, api.ts 252, globals.css
  222, particle-text.tsx 323, api/route.ts 51, smoke-test.sh 178, +
  the floating-icons.tsx row at 117).
- **Census fallout cured in-commit**: pink-400/sky-400 (the v3 pins),
  the "auto-answer" comment (rephrased), the docs-counts lockstep
  (UNIT 550 → 561, E2E 56 → 57, badge 606 → 618, every count site).
- **R19-14 (lockstep)**: README (the session-19 row, the gate line,
  the badge); AGENTS (counts, the plans map's nineteenth round);
  CLAUDE (counts, the spelling); PAD (§3 runtime surface, §8
  distribution, §12 rows); SKILL v1.14.0 → v1.15.0 (frontmatter,
  §7, Appendix A's session-19 row, Appendix B re-certified through
  session 19 with the re-walk narrative); worklog Task 19;
  `docs/session_19.md` (the pre-round handoff replaced by this
  round's log — the handoff's content is preserved in session_18.md
  and this plan's context); the dossier re-captures (D-4's
  session-19 note + the PT section's SUPERSEDED note); this record.
- **R19-15**: captures 45/46 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified.
- **R19-16**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 561/561 (37 files) · build · smoke 15/15 · e2e
  57/57 (9 specs) · census MATCH. (The gate's first e2e leg needed
  the Playwright Chromium install — the fresh-sandbox step, the
  session-18 precedent; re-run clean end-to-end after.)
- **Deferred (none)**: every finding cured or verified; the 26 Info
  items recorded in the findings register above (the
  honest-deferred set).
