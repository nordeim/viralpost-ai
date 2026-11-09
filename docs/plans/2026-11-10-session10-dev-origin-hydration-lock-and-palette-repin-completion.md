# Session 10 — The Dev-Origin Hydration Lock + The Palette Re-Pin Completion + The Phantom-Reference Tail (2026-11-10)

## Context

Session 9 pushed `07e8a42` (the rate-limiter trust warning + the docs-counts
gate); the owner added `b325ef9` (the session-9 log). This round re-ran the
standing instruction against the merged tree: docs review → pristine-clone
verification (the full baseline gate green at the documented counts —
lint 0/0 · tsc 0 · unit 442/442 (31 files) · build · smoke 15/15 · e2e
48/48 (8 specs) · census MATCH, after installing the Playwright
chromium-headless-shell the fresh sandbox lacked) → a comprehensive audit
(the web-application skill's dimensions; the load-bearing findings
hand-verified) → the live reference parity walk (logged-in: the mobile menu
at 390×844, /Tool, /Dashboard's derived title + 404 h1, the OG family —
NO drift since session 9) → the clone-side dev-server walk (routes, titles,
auth round-trip, generate round-trip — green). The neo-crm repo was
re-reviewed for tech-stack patterns (AGENTS/CLAUDE/PAD/SKILL + its skills
catalog): the infra seams remain fully inherited, the docs-counts gate is
already adopted, and its sessions 213–217 (semantic-prose censuses) carry
nothing transferable to this round's findings — no new adoption.

**The round's headline discovery (live, reproduced, root-caused):** the
dev server opened at `http://127.0.0.1:3000` — the loopback IP the repo's
own curl probes use — NEVER HYDRATES. Next 16's `blockCrossSiteDEV`
(default allowlist: `localhost` + its subdomains + the start hostname)
rejects the HMR WebSocket upgrade from the `127.0.0.1` origin with a bare
`Unauthorized` (invalid HTTP — Chromium logs `ERR_INVALID_HTTP_RESPONSE`),
the Turbopack dev client never completes its boot, and React never attaches:
the mobile menu (and every interactive surface — the generator, the login
form, the toasts) renders as inert SSR. Via `http://localhost:3000` the
same tree hydrates and the menu opens; the production build hydrates under
every browser tested (agent-browser's Chrome and Playwright's chromium —
the e2e suite's 5/5 mobile-navigation pins run there). This is the most
plausible root cause of the owner's standing "mobile menu must work"
concern: an operator (or agent) opening dev via the loopback IP sees a
dead menu with zero console errors. The audit's Mode-C register follows.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F10-17 | **HIGH** (DX/correctness) | `next.config.ts` (missing `allowedDevOrigins`); mechanism `next/dist/server/lib/router-utils/block-cross-site-dev.js` | **The dev-origin hydration lock.** Live-reproduced: a WS upgrade probe with `Origin: http://127.0.0.1:3000` receives the literal body `Unauthorized` (403, no status line — invalid HTTP) while `Origin: http://localhost:3000` receives the clean `101 Switching Protocols`. Only the HMR socket is blocked (`/_next/*` static assets pass — `sec-fetch-site: same-origin`), so the page LOOKS loaded while the Turbopack client silently fails → zero hydration → the mobile menu and every client island dead. Confirmed in BOTH browsers available (agent-browser Chrome 156 and Playwright chromium 1248), under BOTH `bun run dev` and `node next dev`. Production is unaffected (`blockCrossSiteDEV` is dev-only; the e2e suite boots the standalone build and its menu pins pass 5/5). Cure: `allowedDevOrigins: ["127.0.0.1"]` — Next's documented knob (hostname-only entries; scheme/port ignored), TDD + a live A/B re-verification. |
| F10-1 | MED (Tailwind v4 — the round's Tailwind bug) | `src/app/globals.css:87–143` (`@theme`); consumers `src/lib/login-reset.ts:134,136,273,275,288,290`, `src/components/layout/login-card.tsx:613`, `src/components/layout/reset-password-screen.tsx:103,169`, `src/components/ui/toast.tsx:117,140` | **The v3 palette re-pin is incomplete — 11 used steps unpinned.** globals.css:93 claims "EVERY literal (family, step) pair used in src/ is re-pinned to the v3 value," but an exhaustive census (color utilities in `src/**/*.{ts,tsx,css}` vs `@theme` literals) finds 11 gaps: `green-50/200/700`, `emerald-200/600`, `blue-600/700`, `rose-200`, `red-200/700`, `neutral-900`. They compile to v4's re-derived oklch palette. Quantified (oklch→sRGB conversion of the installed `tailwindcss/theme.css`): `green-700` v4 **#008236** vs v3 **#15803d** (the login/reset sent-callout TEXT — a DOM-extracted reference-parity surface); `blue-600` **#155dfc** vs **#2563eb** (the login-card reset link); `blue-700` **#1447e6** vs **#1d4ed8**; `red-700` **#c10007** vs **#b91c1c**; `emerald-600` **#009966** vs **#059669**; `green-200`/`emerald-200`/`rose-200` minor Δ≤2/channel; `green-50`/`neutral-900` match but stay unpinned (the invariant is false either way). globals.css:90 itself cites blue-600 as the canonical example of this bug class — unpinned. Cure: pin all 11 at the v3 hexes + a mechanical census pin in `tests/design-tokens.test.ts` (every color utility used in src/ must resolve to a `@theme` literal) so the "every literal" claim becomes TESTED rather than asserted. |
| F10-2 | MED (docs) | `README.md:99`, `Project_Architecture_Document.md:315`, `viralpost-ai_SKILL.md:321` | Three live-tense count sites the session-9 docs-counts gate doesn't pin still carry pre-session-9 numbers: README's file-hierarchy line "**29 unit suites**" (actual 31 — the same README's own table says 31: internally inconsistent), the PAD's file tree "**29 unit suites**" (actual 31), and the SKILL §11 pre-ship checklist "Gate green at the exact counts (**409 unit** / 48 e2e / 15 smoke…" (actual 442 — the checklist that exists to enforce count lockstep is itself stale). None are round-history/worklog records (the gate's documented scope exemption). Cure: fix the three sites + extend `tests/docs-counts.test.ts` to pin them (the README hierarchy line, the PAD tree line, the SKILL §11 line). |
| F10-3 | LOW (phantom + unpinned contract) | `src/lib/page-layout.ts:9` | The header cites `tests/page-layout.test.ts` — the file does not exist (the only reference to it in the tree). In practice only `LOGIN_LAYOUT` is pinned (via `tests/login-views.test.ts`); `NOT_FOUND_LAYOUT` has ZERO unit pins — the 404 body's class vocabulary is covered only structurally by e2e (heading/Go-Home), not class-for-class like every other layout family. Cure: fix the comment to the real pin home + land `NOT_FOUND_LAYOUT` class-vocabulary pins (login-views.test.ts gains the describe — the sibling-pin precedent). |
| F10-4 | LOW (phantom provenance) | `tests/toast-anatomy.test.ts:5–30`, `tests/type-gate.test.ts:24,70` | Test-layer headers cite artifacts that don't exist in this tree and evidence gathered against the WRONG reference app: toast-anatomy justifies the neutral-900 pin via "the **tabs.tsx** underline arm" / "**mobile-nav.tsx** arm" and headlines "THE REFERENCE'S TOAST SYSTEM IS DOM-DEAD … four Ix.* calls (all on the profile page: 'Photo uploaded successfully'…) … 103 probes … walk22" — that is the CRM reference's profile page (viralpostai.base44.app has no photo-upload profile); type-gate cites "**scripts/sweep.ts:862**" (no such file; scripts/ = census, prisma-env, smoke-test, install_packages). The session-7/8/9 sweeps cured this genus in `src/` but stopped at the test layer. Cure: re-attribute both headers (template-family lineage framing, the F8-6 precedent) and restate the toast evidence honestly for THIS reference. |
| F10-5 | LOW (doc drift) | `CLAUDE.md:185` | "Symptom table lives in AGENTS.md and the PAD §10" — PAD §10 is the Developer Handbook (no symptom table); the actual symptom→cause→fix table is `viralpost-ai_SKILL.md` §10. Cure: point at the SKILL §10 (+ DEPLOYMENT.md §7 for the production subset). |
| F10-6 | LOW (bootstrap policy) | `src/app/api/auth/signup/route.ts:68–87`, `docs/DEPLOYMENT.md` | `count === 0 ? "admin" : "user"` — on an UNSEEDED production database the first verified signup becomes admin (and the count read is TOCTOU-racy under concurrent first signups; bounded by SQLite single-process serialization + the documented seed-first workflow). No authorization gate reads `role` today, so the blast radius is a self-hosted operator finding an undocumented admin row. Cure: document the policy in DEPLOYMENT.md (seed before exposing; on an unseeded DB the first verified signup owns the admin role). Code change declined — the seed-first workflow is already the documented contract and a deterministic gate would add a migration for zero live consumers. |
| F10-7 | LOW (API consistency) | `src/app/api/auth/verify/route.ts:61,75`, `src/lib/api.ts:26–29` | `VERIFICATION_LOCKED` answers 429 without `Retry-After` — the only 429 in the tree without one. The lockout lifts on RESEND (which resets the attempt counter), not on time, so a `Retry-After` value would be a lie. Cure: document it as the deliberate exception in api.ts's N-67h comment (the honest fix; no behavior change). |
| F10-8 | LOW (perf/UX) | `src/components/marketing/hero.tsx:55`, `src/components/marketing/sections.tsx:97`, `src/components/marketing/footer.tsx:53` | The highest-traffic CTAs (hero "Try the Tool", the PT pay-what-you-want CTA, the footer's whole Product column) use raw `<a href="/…">` — every click is a full document reload while the navbar soft-navigates. DOM output is identical under `<Link>` (same tag, same href, same classes — class-for-class parity preserved). Cure: swap the internal anchors to `next/link`. |
| F10-9 | LOW (dead config) | `package.json:48` | `"overrides": { "dompurify": "3.4.17" }` — no dependency in the tree resolves dompurify (bun.lock carries it only inside the overrides block); a scaffold-family relic implying a sanitization story that doesn't exist (no HTML rendering of user input — React escaping only). Cure: drop the override, `bun install` to sync the lockfile. |
| F10-10 | LOW (a11y/UX edge) | `src/components/marketing/navbar.tsx:131` | "Closes on route change" is implemented solely via per-link `onClick` — a back/forward history navigation (no click) leaves the menu open over the new page. The documented superset behavior is only conditionally true. Cure: close on ANY pathname change via the repo's adjust-during-render doctrine (prev-pathname comparison during render — NOT `useEffect(() => setState)`, which CLAUDE.md bans) + one e2e pin (open menu → `history.back()` → closed). |
| F10-11 | LOW (robustness) | `src/lib/site.ts:40–46`, `src/app/layout.tsx:17` | `siteUrl()` returns the env verbatim (trailing slashes stripped) with no shape validation; `new URL("example.com")` throws in the ROOT LAYOUT's `metadataBase` → EVERY route 500s into the error boundary. A schemeless typo passes the boot gate silently (it warns on unset/localhost only) and takes the whole site down at first render — the exact operator-error blast radius the boot gate exists to prevent. Cure (TDD): `siteUrl()` falls back to `DEFAULT_SITE_URL` on input that doesn't parse as an http(s) URL + `boot-env.ts` warns on a malformed shape (dev AND production — malformed is always wrong). |
| F10-12 | INFO (doctrine tension, no action) | `src/lib/api.ts:23–24`, `src/lib/generation-counter.ts:48`, `src/components/effects/reveal.tsx:41` | `ERR.FORBIDDEN`/`ERR.NOT_FOUND` have zero callers; `limitReached()` is test-only; `Reveal`'s `as` prop is unused. Decision: KEEP — `ERR` is the envelope's status-vocabulary factory (completeness for future routes, unlike `resetLive` which had zero callers INCLUDING tests); `limitReached` has a live test caller; the `as` prop is churn to retire. Noted here so the next audit doesn't re-litigate. |
| F10-13 | INFO (honest-claim cure, small) | `src/lib/generator.ts:349–365` | The comment advertises "5-8 hashtags: 2-3 idea-derived" but the fill loops always stop at exactly 5 (`slice(0, 8)` never bites; own tags cap at 2). The 5-8 window is the reference's prompt contract; the engine satisfies it only at the minimum. Cure: make the seeded count vary in 5-7 (one loop-bound change riding the existing rng — deterministic per seed, the property suite's 5-8 window still holds) + the comment states the real window. |
| F10-14 | INFO (deferred) | `src/components/effects/particle-text.tsx:173–180` | The reduced-motion branch keeps a continuous rAF loop redrawing static text (the phrase cycles ~3 s). Cheap per frame but burns CPU on the users who asked for less motion. DEFERRED: touching the particle engine's timing carries visual-regression risk the e2e layer can't catch; recorded as deferred debt. |
| F10-15 | INFO (no action) | `src/components/ui/toast.tsx:56–64` | The toast store subscribes via `useState`+`useEffect` rather than `useSyncExternalStore`. Not persisted state — the React-19 rule targets persisted stores; no hydration issue (Toaster mounts with the root layout). No action. |
| F10-16 | INFO (accepted) | `src/components/marketing/footer.tsx:74` | `new Date().getFullYear()` in a server component under statically prerendered pages freezes at build time — a deployment crossing New Year's shows the stale year until the next build. Standard static-site semantics; accepted and recorded (the reference's SPA computes client-side — a superset-vs-parity non-issue for a footer year). |

**Verified at parity this round (live, logged-in on the reference; no drift
since session 9):** the login funnel; `/Home`'s landing (same nav + sections +
generator card); the mobile menu at 390×844 (the same 5 destinations + brand;
the reference's panel computes `rgba(0,0,0,0)` on BOTH dark and light pages —
the dead `bg-slate-900/98` class; our dark-panel superset on light pages
intact; the reference's hamburger still ships NO aria — our labeled superset
holds); menu navigation + auto-close; the SPA stale-title-on-soft-nav (our
ledgered superset — ours sets "Pricing | ViralPost AI" correctly);
`/Dashboard` derived title + 404 h1 + "Page Not Found"; the OG/Twitter
family (per-route og:title, the plain 170-char description, absolute og:url,
canonical, the static image). Clone-side: the dev-server walk green via
localhost (routes, titles incl. "Page2 | ViralPost AI", OG family, the
login/me round-trip, the generate round-trip); the production-build walk
green via agent-browser (the menu opens: burger relabels "Close menu",
expanded=true, all 5 destinations). The standing-instruction items verified
already-satisfied: `DATABASE_URL="file:../db/custom.db"` with `db/` at the
repo root (the seam + fixture tests hold; census MATCH); the vitest +
playwright configs (31 files/442 unit; 8 specs/48 e2e green against the
build — no config changes needed); the SEO surface (sitemap/robots/manifest
byte-parity formats, per-route `pageMetadata()`, the catch-all 404 noindex,
the 15-leg smoke's SEO legs); `.env.example` ↔ the six-knob contract, both
directions (exhaustively enumerated).

## Remediation (TDD where a contract changes)

- **R10-1 (RED→GREEN, F10-17) — THE HEADLINE**: new
  `tests/dev-origins.test.ts` pins: `next.config.ts` carries
  `allowedDevOrigins` including `"127.0.0.1"` (comment-stripped source
  pin, the type-gate style). Then `next.config.ts` gains
  `allowedDevOrigins: ["127.0.0.1"]` with the WHY comment (the HMR-block →
  no-hydration → dead-menu mechanism, live-reproduced this round). LIVE A/B
  after: the WS probe with `Origin: http://127.0.0.1:3000` → 101, and a
  browser at `http://127.0.0.1:3000` hydrates (menu opens).
- **R10-2 (RED→GREEN, F10-1)**: `tests/design-tokens.test.ts` gains (a) the
  11 step pins at the v3 hexes and (b) THE MECHANICAL CENSUS PIN — scan
  `src/**/*.{ts,tsx,css}` for stock color utilities; every `(family, step)`
  found must resolve to a `--color-<family>-<step>:` literal inside
  `@theme` (the "every literal pair" invariant becomes tested). Then pin
  the 11 steps in `@theme` (green-50/200/700, emerald-200/600, blue-600/700,
  rose-200, red-200/700, neutral-900) grouped by family, the doctrine
  comment updated to cite the census pin.
- **R10-3 (RED→GREEN, F10-11)**: `tests/page-titles.test.ts`'s siteUrl
  describe gains the fallback pins (unparseable/schemeless →
  DEFAULT_SITE_URL; valid http/https unchanged; trailing-slash strip
  preserved) and `tests/boot-env.test.ts` gains the malformed-shape warning
  pins (dev AND production). Then `site.ts` validates the shape
  (parseable + http/https, else DEFAULT_SITE_URL) and `boot-env.ts` warns on
  malformed `NEXT_PUBLIC_SITE_URL`.
- **R10-4 (RED→GREEN, F10-10)**: `tests/e2e/mobile-navigation.spec.ts` gains
  the history-nav pin (open the menu → `page.goBack()` → the menu is
  closed, `aria-expanded=false`). Then `navbar.tsx` closes on pathname
  change via adjust-during-render (the prev-pathname comparison — the
  CLAUDE.md doctrine, never `useEffect(() => setState)`). E2E count
  48 → 49.
- **R10-5 (F10-8)**: hero CTA, PT CTA, and the footer Product column swap
  raw `<a>` → `<Link>` (classNames verbatim; DOM-identical output). Sweep
  the source-pinned suites for any `<a`-markup pins in the same commit.
- **R10-6 (F10-13)**: `hashtagsFor`'s target varies 5-7 via the existing
  rng (deterministic per seed; the property suite's 5-8 window holds);
  the comment states the real window. Update any exact-output pins in
  `tests/generator.test.ts` in the same commit.
- **R10-7 (F10-3 + F10-4 + F10-5 + F10-6 + F10-7 + F10-9)**: the
  phantom/comment/doc sweep — `page-layout.ts:9` cites the real pin home;
  `login-views.test.ts` gains the NOT_FOUND_LAYOUT class-vocabulary pins;
  toast-anatomy + type-gate headers re-attributed (template-family lineage,
  this repo's surfaces); CLAUDE.md:185 → the SKILL §10; api.ts N-67h gains
  the VERIFICATION_LOCKED exception note; DEPLOYMENT.md gains the
  first-signup-admin note; the dompurify override dropped + `bun install`.
- **R10-8 (F10-2 + lockstep)**: fix the three count sites (README:99,
  PAD:315, SKILL:321) and extend `tests/docs-counts.test.ts` to pin them;
  then the full docs lockstep at the FINAL counts — README badge/status
  table, AGENTS counts + the plans map (ten rounds), CLAUDE/PAD counts,
  SKILL v1.5.0 → v1.6.0 (frontmatter state, §11 checklist, Appendix A
  session-10 row, Appendix B), worklog Task 10, this plan's execution
  record.
- **R10-9**: captures 27/28 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844 — via
  `http://127.0.0.1:3000`, proving the R10-1 cure end-to-end), PIL-verified.
- **R10-10**: the full gate on the exact commit tree (lint 0/0 · tsc 0 ·
  unit (442+Δ) · build · smoke 15/15 · e2e 49/49 · census MATCH) →
  Conventional Commit on `main` → the SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. `rg 'allowedDevOrigins' next.config.ts` → the entry; LIVE: the raw WS
   probe with `Origin: http://127.0.0.1:3000` answers `101`, and a browser
   at `127.0.0.1:3000` hydrates (the menu opens, `aria-expanded=true`).
3. The 11 palette steps pinned at the v3 hexes; the census pin green.
4. `siteUrl("example.com")` → `http://localhost:3000` (unit-pinned);
   malformed shape warns at boot (dev and production).
5. The menu closes on history navigation (e2e-pinned).
6. No raw internal `<a href="/…">` in hero.tsx / sections.tsx / footer.tsx.
7. The three count sites live (31/442 family) + pinned by docs-counts.
8. The sweep greps clean: `rg 'tabs\.tsx|mobile-nav\.tsx|sweep\.ts'
   tests/` → nothing; `rg 'page-layout\.test\.ts' src/` → nothing;
   `rg 'dompurify' package.json bun.lock` → nothing.
9. Captures 27/28 regenerated on the remediated tree, PIL-verified.

## Execution record

- **R10-1 (RED→GREEN, F10-17)**: `tests/dev-origins.test.ts` landed (2
  pins: the allowlist entry + the bare-hostname form negative — RED
  verified, then `allowedDevOrigins: ["127.0.0.1"]` in next.config.ts
  with the full WHY comment). **LIVE A/B verified post-cure**: the raw
  WS probe with `Origin: http://127.0.0.1:3000` answers
  `HTTP/1.1 101 Switching Protocols` (was the bare `Unauthorized`),
  and a Playwright browser at `http://127.0.0.1:3000` hydrates
  (reactProps attached) and opens the menu (burger relabels
  "Close menu", `aria-expanded=true`, all 5 destinations + brand).
- **R10-2 (RED→GREEN, F10-1)**: 5 RED pins (green/red/blue families +
  the emerald/rose/neutral group + THE CENSUS PIN — the mechanical
  walk over `src/**/*.{ts,tsx,css}` color utilities vs `@theme`
  literals), then the 11 steps pinned at the v3 hexes in `@theme`
  (green-50/200/700, emerald-200/600, blue-600/700, rose-200,
  red-200/700, neutral-900), the doctrine comment citing the census.
  GREEN.
- **R10-3 (RED→GREEN, F10-11)**: 2 siteUrl pins (the malformed-input
  fallback family + the valid-passthrough family) and 4 boot-env pins
  (production/dev malformed, the ftp scheme, the well-formed negative)
  — RED verified, then `siteUrl()` gained the parse + http(s)-scheme
  validation with the DEFAULT_SITE_URL fallback, and `boot-env.ts`
  gained the malformed-shape warning (dev AND production). GREEN.
- **R10-4 (RED→GREEN, F10-10)**: the e2e history-nav pin + the navbar
  adjust-during-render cure (the prev-pathname comparison, never
  `useEffect(() => setState)`). One spec iteration: the first RED run
  of the new e2e test exposed a TEST bug (it clicked the desktop Tool
  link at phone width with the menu closed — no visible link), fixed
  by walking to /Tool through the open menu first; the cure itself
  passed unchanged. E2E 48 → 49.
- **R10-5 (F10-8)**: hero CTA + PT CTA + the footer Product column →
  `<Link>` (DOM-identical output; the source-pin suites needed no
  updates — no `<a`-markup pins existed for these sites).
- **R10-6 (F10-13)**: the seeded hashtag target varies 5-7 (+1 pin
  over 100 seeds); no exact-output pins existed to update (the
  generator suite is property-based).
- **R10-7 (F10-3/4/5/6/7/9/18)**: page-layout.ts cites the real pin
  home; login-views.test.ts gained the NOT_FOUND_LAYOUT
  class-vocabulary pins (+4); the toast-anatomy + type-gate headers
  re-attributed to template-family lineage (this repo's actual
  surfaces; the session numbers stay as CRM-tree provenance);
  CLAUDE.md's symptom-table pointer → the SKILL §10 + DEPLOYMENT §7
  (+ the no-hydration symptom row); api.ts's N-67h comment documents
  the VERIFICATION_LOCKED exception; DEPLOYMENT.md gained the
  first-signup-admin rule; the dompurify override dropped + `bun
  install` synced; the raw NUL byte in generator.test.ts → the `\x00`
  escape.
- **R10-8 (F10-2 + lockstep)**: the three count sites fixed (README
  tree 29→32, PAD tree 29→32, SKILL §11 409→the live family) +
  docs-counts extended (+3 pins: the README hierarchy line, the PAD
  tree line, the SKILL checklist line). Full lockstep at the FINAL
  counts: unit 463/32 files (442 + 21: +2 dev-origins, +5
  design-tokens, +2 siteUrl, +4 boot-env, +1 generator, +4
  login-views, +3 docs-counts), e2e 49/8 specs, smoke 15, badge
  512 = 463 + 49. (One mid-flight re-anchor: the first lockstep pass
  wrote 460 before the +3 docs-counts pins were counted — the gate's
  own constants caught the arithmetic, exactly as designed.)
  SKILL v1.5.0 → v1.6.0 (frontmatter, §11, Appendix A session-10 row,
  Appendix B re-certification note); README status table + gate line;
  AGENTS counts + the ten-round plans map; CLAUDE/PAD counts; worklog
  Task 10; this execution record.
- **R10-9**: captures 27/28 regenerated on the remediated tree — the
  dev-server landing 1280×800 + the OPEN mobile menu 390×844, both via
  `http://127.0.0.1:3000` (the F10-17 cure proven end-to-end: the
  pre-cure tree could not hydrate at the loopback IP, so the menu-open
  capture would have been impossible). PIL-verified (100% non-white);
  the menu-open capture pixel-sampled (the slate-900 panel + the amber
  pill present).
- **R10-10**: the full gate on the exact commit tree — lint 0/0 · tsc
  0 · unit 463/463 (32 files, +21) · build · smoke 15/15 · e2e 49/49
  (8 specs, +1) · census MATCH — then the Conventional Commit on
  `main` and the SSH-wrapper push (dry-run first).
