# ViralPost AI

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tests](https://img.shields.io/badge/tests-694%20checks-brightgreen)](#testing)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

A complete, self-hostable clone of
[`viralpostai.base44.app`](https://viralpostai.base44.app/) — the AI social
media post generator — built as a single Next.js application. It is a
**functional superset** of the reference (the generator actually works, the
contact form actually persists, unknown routes answer a true 404) while
holding **visual parity** (class-for-class pages, the WebGL hero, the
particle title, the mobile menu).

## Overview

The reference app sells one thing: describe a post idea, get a
viral-ready social media post. This clone reproduces the whole product —
marketing landing, generator tool, pricing, contact, and the auth funnel —
on a self-hostable stack, and fixes the reference's own defects where it
found them (see [Deviations from the reference](#deviations-from-the-reference)).

## Key features

| Feature | What it does |
|---|---|
| ✨ AI post generator | Deterministic viral-formula engine (hook → 1-2 sentence paragraphs → 5-8 hashtags, < 200 words) — works offline, no API key needed |
| 📊 Free quota | 3 free generations/day with teal fill-dots UI, daily reset, a paywall swap at the limit — plus a server-side IP rate limit the reference lacks |
| 📋 Copy round-trip | One-click copy of the generated post with a Copied! state |
| 🔐 Auth funnel | Email/password signup with verification, login, logout, forgot/reset password — scrypt hashes, HMAC-signed httpOnly cookies, tokenVersion revocation |
| ✉️ Contact form | Persists messages to SQLite (the reference's form is a client-side stub) |
| 🌊 WebGL hero | Iridescence background shader + canvas particle title (4 cycling phrases) — the reference's signature hero, rebuilt dependency-free |
| 📱 Mobile menu | The reference's working dropdown menu, plus Escape/route-change close and readable panels on light pages |
| 🚫 True 404s | Unknown routes answer HTTP 404 with the reference's designed page and its derived `<Route> | ViralPost AI` title (the reference's SPA answers 200 for everything) |
| 🔎 SEO | Per-route metadata, sitemap.xml, robots.txt, PWA manifest, OG/Twitter cards |

## Architecture

One deployable unit: a Next.js App Router application + a SQLite file.
`next build` produces a standalone server.

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js (App Router, standalone output) | 16.4 | Pages, API route handlers, SSR metadata |
| UI runtime | React | 19.3 | Server components by default; client islands for interactivity |
| Language | TypeScript (strict) | 5.9 | `tsc --noEmit` is a gate — the build is the type gate |
| Styling | Tailwind CSS (CSS-first) | 4.3 | `@theme` literal hex in `globals.css`; no `tailwind.config.js` |
| ORM / DB | Prisma + SQLite | 6.19 | `db/custom.db` at the repo root; PostgreSQL swap documented |
| Validation | Zod | 4.6 | Every API boundary |
| Icons | lucide-react | 0.525 | The reference's own icon family |
| Unit tests | Vitest | 5.0 | 38 files / 631 tests, node env, pure seams |
| E2E | Playwright | 1.64 | 9 specs / 63 tests against the production build |
| A11y | axe-core | 4.x | A11y assertions inside the e2e suite |
| Runtime | Bun | 1.3 | Scripts run from the repo root |

```mermaid
flowchart TB
    subgraph Client
        B[Browser]
    end
    subgraph App["Next.js standalone server"]
        P[Pages: / /Tool /Pricing /Contact /login /signup /reset-password]
        A[API: /api/generate /api/contact /api/auth/* /api/health]
        L[Lib seams: generator, counter, auth, rate-limit, db-path]
    end
    DB[(SQLite db/custom.db)]
    B --> P
    B --> A
    A --> L
    L --> DB
```

## File hierarchy

```
📂 viralpost-ai/
├── 📂 prisma/                 schema + idempotent seed (demo user)
├── 📂 db/                     SQLite databases (gitignored, .gitkeep'd)
├── 📂 public/                 og-image, hero portrait (screenshots live in docs/)
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 (site)/         landing, Tool, Pricing, Contact (+ shared chrome)
│   │   ├── 📂 [...catchAll]/  the 404: derived title + true status
│   │   ├── 📂 api/            generate, contact, health, auth family
│   │   ├── 📂 login/ signup/ reset-password/
│   │   ├── layout.tsx         root layout, metadata, viewport
│   │   └── globals.css        the Tailwind v4 theme (teal/amber tokens)
│   ├── 📂 components/
│   │   ├── 📂 marketing/      navbar, footer, hero, sections, generator card
│   │   ├── 📂 effects/        iridescence (WebGL), particle-text, reveal
│   │   ├── 📂 layout/         login card, reset-password screen
│   │   └── 📂 ui/             toast
│   └── 📂 lib/                the pure seams (generator, counter, auth,
│                              rate-limit, db-path, site, route-title, …)
├── 📂 tests/                  38 unit suites + 📂 e2e/ (9 Playwright specs)
├── 📂 scripts/                smoke-test.sh, census, prisma-env
├── 📂 docs/                   plans, reference investigation, screenshots
├── 📂 skills/                 the owner's skill catalog (not app code)
└── 📄 AGENTS.md · CLAUDE.md · worklog.md · Project_Architecture_Document.md
```

## Quick start

Requirements: **Bun ≥ 1.3** (or Node ≥ 20), a POSIX shell.

```bash
git clone https://github.com/nordeim/viralpost-ai.git
cd viralpost-ai
bun install
cp .env.example .env           # then set AUTH_SECRET for anything non-dev
bun run db:push                # schema → db/custom.db
bun run db:seed                # idempotent demo data
bun run dev                    # http://localhost:3000
```

**Verify setup:**

```bash
bun run db:census              # → "pristine: MATCH (1 user + 0 contact messages)"
curl -s localhost:3000/api/health   # → {"ok":true,"data":{"status":"healthy",...}}
```

Demo login (mirrors the reference app):
`sepnetflix2023@outlook.com` / `$Abcd1234`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `file:../db/custom.db` (SQLite; resolves against `prisma/schema.prisma`). PostgreSQL example in `.env.example` |
| `AUTH_SECRET` | **production: yes** | HMAC key for session cookies (≥ 16 chars, `openssl rand -hex 32`). Missing/short in production = the server refuses to boot |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin for metadata/sitemap/robots — inlined at build time, set before `bun run build` |
| `VIRALPOST_PROXY_HOPS` | behind a proxy | Trusted proxy depth for rate-limit IP keying (unset = 1; unparsable fails closed) |
| `VIRALPOST_DISABLE_IN_APP_OTP` | production | Set to `1` when a real mail transport owns verification-code delivery (unset in production prints a boot warning — the code rides the responses) |
| `VIRALPOST_DISABLE_IN_APP_RESET` | production | Set to `1` when a real mail transport owns reset-link delivery (unset in production prints a boot warning — the link rides the response) |

## Testing

```bash
bun run test            # Vitest unit suite (38 files / 631 tests)
bun run test:e2e        # Playwright e2e (9 specs / 63 tests) — needs bun run build first
./scripts/smoke-test.sh # 15-leg curl ladder against the standalone build
bun run gate            # lint + typecheck + unit + build + smoke + e2e, in order
```

The e2e suite boots the **production standalone build** on its own port
with its own scratch database (`db/e2e.db`) — the dev server lies about
production hydration. One setup project signs the demo user in once and
shares the session via `storageState` (per-test logins would trip the auth
rate limiter).

## API reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/generate` | POST | public (IP-limited) | The generator — `{idea}` → `{ok, data:{text}}` |
| `/api/contact` | POST | public | Persist a contact message (Zod-validated) |
| `/api/health` | GET | public | Liveness + db round-trip |
| `/api/auth/signup` | POST | public | Create account, start verification |
| `/api/auth/verify` | POST | public | Verify the email code |
| `/api/auth/resend` | POST | public | Resend the code (own limit) |
| `/api/auth/login` | POST | public | Session cookie |
| `/api/auth/logout` | POST | session | Clear the session |
| `/api/auth/me` | GET | session | The session envelope |
| `/api/auth/forgot-password` | POST | public | No-enumeration reset request |
| `/api/auth/reset-password` | POST | public | Atomic single-use token consume |
| `/api/*` (unknown) | any | public | The envelope's JSON 404 — subpaths via the `[...path]` catch-all, the bare `/api` via its own route (never the HTML 404 body) |

All bodies are JSON, validated with Zod, read through a bounded reader
(Content-Type gate + length checks). Responses use the envelope
`{ok, data} | {ok:false, error:{code, message}}`.

## Design system

- **Tokens** (in `src/app/globals.css`, `@theme` with literal hex):
  teal primary (`#14b8a6` family), amber accent (`#f59e0b` family), slate
  neutrals, white surfaces.
- **Type**: the system font stack (the reference ships zero webfonts).
- **Motion**: `Reveal` (IntersectionObserver + CSS transitions,
  `prefers-reduced-motion` aware), the hero's canvas particle cycle and
  WebGL shader; reduced-motion collapses all of it.
- **Layout constants** live in one test-pinned module (`src/lib/page-layout.ts`).

## Deviations from the reference

Recorded in full in `docs/implementation-plan.md` §6. The headline items:

| Area | Reference | Clone | Why |
|---|---|---|---|
| Generator backend | Platform LLM — observed **402-quota-dead**, hangs at "Generating…" forever | Working local engine (a documented provider wire-in point — the exact prompt preserved by `generatorPrompt()`; no provider env is read today) | The core feature must work |
| Unknown routes | SPA answers 200 everywhere; title `startCase(path)` | True 404 status + the same derived title + `noindex` | SEO; the title parity is byte-verified |
| Contact form | Client-side stub, no persistence | Persists to SQLite | The advertised action must be real |
| Auth | localStorage token | httpOnly HMAC cookie + tokenVersion revocation | Security |
| `/Home` | Serves a duplicate of `/` | 308 redirect to `/` | Duplicate content |
| Dead UI | Footer `href="#"` socials | Real platform links | Dead controls are defects |
| Free quota | localStorage only | Same UX + server-side IP rate limit | Abuse resistance |

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — standalone output, the
`AUTH_SECRET` boot gate, the absolute-`DATABASE_URL` recommendation, and
the PostgreSQL swap.

## Project status

| Phase | Status | Delivered |
|---|---|---|
| Session 1 — the clone build | ✅ done | Full app, parity walk, 8 screenshots, first push |
| Session 2 — the parity audit | ✅ done | The `/Dashboard` title decode, env rename, dep diet (−11), docs rebuild, the SKILL distillation |
| Session 3 — the rename completion | ✅ done | Guard-layer `NEO_*` → `VIRALPOST_*` finish (dual-prefix boot gate, re-armed e2e pins, dead page metadata removed); captures 13/14 |
| Session 4 — the phantom-reference audit | ✅ done | CRM-era commentary sweep (typography contract, vitest surface, e2e-port shape, fixture); dev-server captures 15/16 |
| Session 5 — the docs-freshness audit | ✅ done | Session-tracking surfaces synced (SKILL round history, status tables, plans map); DEPLOYMENT env table gained the `VIRALPOST_*` knobs; captures 17/18 |
| Session 6 — the clean-tree re-certification | ✅ done | Widened fresh-eyes audit (secondary docs, scripts, configs): zero findings; parity re-verified live; captures 19/20 |
| Session 7 — the dev-script loop + phantom comments | ✅ done | The `dev` tee reload loop cured (A/B-verified, pinned); api.ts dead helpers retired; phantom CRM claims re-attributed (site.ts, not-found, 405/141→170); captures 21/22 |
| Session 8 — the live OG parity + evidence provenance | ✅ done | The reference's per-route OG family discovered live (D-4 superseded) — the prefixed OG description retired to the plain paragraph (TDD, pinned); the 2026-10-01 phantom-census claims re-attributed (verify funnel, headers census, SEO routes, typography); README badge 450→455; captures 23/24 |
| Session 9 — the rate-limiter trust warning + the docs-counts gate | ✅ done | The unset-`VIRALPOST_PROXY_HOPS` production boot warning (the direct-exposure XFF-rotation hazard); the signup `"rep"` role relic → the schema's `"user"`; the reset funnel's read-path outage honesty (503, never a bare 500); the property suite landed (fast-check over the generator + limiter contracts — the PAD claim made true); contact/generate joined the sweep family; the dead-code + phantom-provider retirement; DEPLOYMENT.md rewritten for ViralPost AI (was ORBITAL-era); the neo-crm docs-counts gate adopted (badge 490 = 442+48, unit-pinned); captures 25/26 |
| Session 10 — the dev-origin hydration lock + the palette re-pin completion | ✅ done | The dev server at `127.0.0.1` never hydrated (Next 16 blocks the loopback origin's HMR socket → the mobile menu and every client island inert — live root-caused) — `allowedDevOrigins` cured it (pinned + live A/B); the v3 palette re-pin completed (11 unpinned steps, green-700 visibly drifted) + the mechanical color-census pin; the malformed-`NEXT_PUBLIC_SITE_URL` brick cured (fallback + boot warning); history-navigation menu close (e2e-pinned); the hashtag window exercised (5-7); CTAs → Link; NOT_FOUND_LAYOUT pinned; CRM-lineage test headers re-attributed; the three straggler count sites pinned; badge 512 = 463+49; captures 27/28 |
| Session 11 — the standalone-launch DB re-anchor + the dead-CSS retirement + the verification-funnel closure | ✅ done | `bun run start` with the default relative `.env` could not open the database (bun's absolutization + the session-7 hygiene step had silently killed the session-34 launch-dir recovery — live root-caused; the neo-crm session-212 hoist cured it, TDD + live A/B); the dead-CSS retirement (the vendored tw-animate.css + 13 dead `@theme` tokens + the dead keyframes/utilities — all phantom-justified) + the step-less color census (`border-input` compiled to nothing) + the dead-token census; the verification funnel closed (enforceable login gate on the stored hash, resend re-mints for expired codes, the 403 re-enters the verify view — full-funnel e2e); the signup P2002 race → 400; the over-length idea message; the menu a11y increments (aria-controls + Escape focus return); the OTP paste distribution; the gate-script + doctrine/inventory censuses adopted from neo-crm; badge 538 = 488+50; captures 29/30 |
| Session 12 — the count-reality census + the reset-funnel e2e + the UX-boundary batch | ✅ done | The count constants pinned to the LIVE SUITES ON DISK (the reality census — constants vs reality, not constants vs docs; the a11y matrix extracted so the loop expansion is computed, not assumed); the password-reset funnel's FIRST behavioral e2e (signup → verify → forgot → the in-app link → new password → session → the single-use replay → 400 — the sibling of session-11's verification-funnel e2e); the UX-boundary batch (the 403 re-entry clears the stale demo-code hint, the verify submit honors `from_url`, the OTP paste takes the trailing six digits via the new `otp.ts` seam, the expired-code 400 answers "no longer valid" not "too many attempts"); the effects hygiene (the reduced-motion branch schedules by timeout — no 60 fps rAF redraw loop; the hero re-reads `devicePixelRatio` per resize); the stepped-semantic census arm; the Logo → Link; the dead-export retirement (ERR.FORBIDDEN/NOT_FOUND, the generateVerifyCode re-export); the PAD's stale tw-animate references retired + the semantic-prose census starter + the one-owner doctrine from neo-crm; badge 559 = 507+52; captures 31/32 |
| Session 13 — the in-app-delivery polarity warning + the OTP log gate + the from_url seam | ✅ done | The delivery-polarity boot warning (production + an unset `VIRALPOST_DISABLE_IN_APP_OTP`/`_RESET` now warns — the live-token-in-response hazard, the unset-hops precedent extended); the OTP log line rides the delivery gate (a mail-transport deployment stops writing codes to stdout); the from_url resolver extracted to the pure seam `src/lib/from-url.ts` (the open-redirect guard's FIRST behavioral coverage: 8 unit pins + 2 e2e legs — the `/Tool` round-trip and the foreign-origin fallback, both live-verified); the reduced-motion phrase cadence cured (advance-then-draw — each phrase exactly one window); the verify route's P2025 → 400 mapping; the font-family hoist out of both fit loops; the census forms-guard (no `.each(`/`.skip(`/`.only(` shapes the count regex cannot see); badge 582 = 528+54; captures 33/34 |
| Session 14 — the from_url escape closure + the resend equalizer + the UX-boundary batch | ✅ done | The from_url protocol-relative ESCAPE closed (a same-origin `from_url` with a leading `//` path passed the origin check but navigated cross-origin at the router — live-verified pre-cure, the browser landed on `https://evil.com`; the leading-`//` pathname arm + 3 unit pins + the e2e leg); the resend/verify no-enumeration equalizer (the no-op branch ships the uniform `verificationCode: null` shape; both miss branches burn one scrypt — login's S72-C shape, closing the verification-state oracle signup cannot reveal); the generate route's guests-allowed wiring pinned (the guard only selects the limiter bucket — no phantom 401 wall); the password ceiling symmetry (signup's shared schema gains the 200-char max reset always owned — a 201+ char signup password could never be replaced at reset); InfoCallout's polite `role="status"`; the toast dismiss keyboard focus ring; the reduced-motion inclusive boundary; the depth-0 availability note in DEPLOYMENT.md; badge 593 = 538+55; captures 35/36 |
| Session 15 — the resend P2025 sibling arm + the null-body vocabulary + the API-envelope 404 | ✅ done | The resend route's vanished-row P2025 race joined the sibling doctrine (verify's S13-5 arm / forgot's stored=false — the no-op 200, never a raw 500); the route-local parse sites' null-body vocabulary (contact's Zod dev-message leak retired, generate's non-string idea no longer answers the over-length message — both live-confirmed pre-cure); the API subtree's unknown paths answer the JSON envelope 404 (the true-404 doctrine extended — the HTML 404 body retired, e2e-proven); the signin icons' aria-hidden; the hamburger's house keyboard focus ring (slate-300 — reads on the dark navbar); the Escape focus-return e2e assertion; `prisma` → devDependencies + the zod advisory chain retired via the resolutions pin (audit 10 → 9, all remaining dev-toolchain); badge 599 = 543+56; captures 37/38 |
| Session 16 — the parse-vocabulary completion + the bare-/api envelope + the polish batch | ✅ done | The S16-1 parse-vocabulary completion (the S15-2 genus closed: non-object JSON bodies — string/array/number/boolean — answer the pinned "Invalid request body" on the auth family AND contact; the three schema fields (verify's code, reset's new_password, signup's password) gain `{ message }` type-faces — no Zod dev-message reaches any client, 5 live-confirmed surfaces cured, 5 mutation batteries); the bare `/api` envelope 404 (S16-2 — the one shape a required catch-all can't match, `src/app/api/route.ts` closes the doctrine's last escaping shape, e2e-proven); the polish batch (S16-4 the dead `reducedRef` retired, S16-5 the footer-year build-time freeze documented as a deviation, S16-7 the generate-429 deviation comment, S16-3 the eslint off-switch blast radius re-recorded, S16-6 the PAD §12 header refreshed); badge 604 = 548+56; captures 39/40 |
| Session 17 — the comment-truth batch + the README table repair + the CSRF media-type parse + the timer hygiene | ✅ done | The audit round at 0 Critical / 0 High / 0 Medium (2 Low / 6 Info, all cured or verified): the forgot-password rationale's phantom "409" (signup answers 400); the Project status table repaired (the interior blank lines had broken GFM rendering — sessions 13–16 rendered as prose); the content-type CSRF gate now PARSES the media type (`text/x-application/json` / `application/jsonx` never pass — TDD + mutation battery); the two marketing reset timers ref-tracked (the toast's unmount idiom mirrored, source-pinned); the generate route's discarded-500 degradation documented; the DEPLOYMENT re-seed note; the "exactly 2 exhaustive-deps flags" register claim independently re-verified live; badge 606 = 550+56; captures 41/42 |
| Session 18 — the OPTIONS-envelope closure + the DEPLOYMENT count re-anchor + the config-loader silence | ✅ done | The audit round at 0 Critical / 0 High / 0 Medium (1 Low / 10 Info; the Zod-leak candidate disproved live against the pinned zod 4.6.7): `OPTIONS` on unknown API paths now answers the JSON envelope 404 — Next's own bare 204 (live-observed) retired from both catch-alls, the TRACE exclusion documented, the S15-7 e2e leg extended in place (TDD: RED pre-cure, GREEN post, 2 mutation batteries — one per face); DEPLOYMENT §1's stale "11 API route files" re-anchored to 13; the logout route's bare-call reasoning documented; the `E2E_PORT` knob gained its AGENTS doc face; `vitest.config.ts` → `vitest.config.mts` (the Vite config-loader warning retired from every gate run); counts UNCHANGED (the OPTIONS leg extended an existing test — 550/37 + 56/9, badge 606); captures 43/44 |
| Session 19 — the description-family re-anchor + the monetization redesign + the reader-envelope closure + the a11y batch | ✅ done | The audit round at 0 Critical / 0 High / 2 Medium / 10 Low / 26 Info; THE PARITY WALK FOUND TWO LIVE DRIFTS — the reference adopted the per-route description prefix (`"<Page> on ViralPost AI. "` + a 70-char word-boundary-truncated tail on meta/og/twitter alike) on /Tool /Pricing /Contact (cured: `pageDescription()` + the top-level field, byte-pinned + the e2e leg + mutation battery) and redesigned the monetization section EN with ten floating icons (cured: `MonetizationSection` + the `FloatingIcons` rAF island, pink-400/sky-400 joined the palette pins, 2 mutation batteries); the errored-body-stream envelope closure (a raw-500 class, live-reproduced — the bounded reader now catches, cancels, and answers the null contract); the verify lockout scrypt burn (timing-oracle closure); the toast aria-hidden + polite-live-region pair; the reduced-motion resize repaint; the login view-swap focus map; the pricing-header reveal retired (live-verified unfaded on both reference routes); `vitest.config.mts` re-admitted to the `tsc` program; the proxyless shared-bucket warning; the lockstep batch (runtime-deps 8, `install_packages.sh` retired, the smoke `GATE_PID` trap, the 405→204 comment truth); unit 561/37 + e2e 57/9, badge 618; captures 45/46 |
| Session 20 — the ledger-count closure + the resetToken index + the limiter namespace + the hygiene batch | ✅ done | The audit round at 0 Critical / 0 High / 1 Medium / 9 Low / 16 Info; the parity walk found NO drift (the session-19 description family + monetization redesign + mobile menu family all hold byte-for-byte on both sides). Cured with TDD (+10 pins, 2 mutation batteries): the SKILL Appendix-B ledger's stale e2e count (56→57, the docs-counts gate hole closed with the scoped pin), the `resetToken @unique` index (the schema's only unindexed lookup path), the smoke trap's `GATE_PID` init (early-leg failures aborted cleanup under `set -u`), the hero's superfluous `"use client"` retired (server composition, live-verified), the S19-9 mount residual (reduced-mode `init()` skips the never-drawn particle build), the toast focus-pause pair (keyboard/AT parity with the hover pause), the generate limiter's uid/ip namespace split (the forged-XFF bucket-collision class), the two bare CSPRNG calls inside their try blocks, the generator's bank-capped paragraph count (latent infinite loop), the iridescence `webglcontextlost` guard + the loseContext-why comment, the comment-truth batch (verify fsync residual, seed tokenVersion claim, SKILL §7 EN re-anchor, type-gate scripts note, site.ts truncation mechanism), and the explicit vitest `skills/**` exclude. Unit 571/37 + e2e 57/9, badge 628; captures 47/48 |
| Session 21 — the CTA-class re-anchor + the oklab→sRGB gradient cure + the mobile-menu pill + the audit batch | ✅ done | The audit round at 0 Critical / 0 High / 1 Medium / 11 Low / 14 Info; THE PARITY WALK FOUND FIVE LIVE CLASS-LEVEL DRIFTS (the first since session 19), all cured TDD-style (+15 pins, 1 mutation battery) and live-verified: the footer CTA re-anchored to the reference's from-teal-500/text-white form (S21-1), the Pro-card CTA's hover family (S21-2), the mobile-menu pill — the reference's text is now "Upgrade to Pro" (S21-3) — plus the menu links' desktop underline family with our touch-target layout kept as the documented superset (S21-4), and the oklab→sRGB gradient cure: every v4 gradient compiles `in oklab` while the reference blends sRGB — the hue-crossing teal-400→amber-400 brand family (wordmark, monetization headline, the Get-Unlimited-Access CTA) drifted ΔR≈26 midband; the three surfaces now carry the inline sRGB form and the utility pair is banned by census (S21-5, mutation-batteried); the audit batch: the reset screen's success-swap focus map (S21-6), the OTP keystroke/paste split — typing into a filled box replaces in place, only pastes distribute (S21-7), parseEnvFile strips unquoted inline comments for bun parity (S21-8), the /signup route's first e2e leg (S21-9), the reset-password metadata pin (S21-10), and the docs/comment batch (ADR-004's stale 488, the donor-ledger lineage notes with the CRM S20-P1..P4 collision re-attributed, the PT reword, the PAD TOC/date/tree hygiene, the eslint phantom-ignore prune, the x-real-ip warning face, the tolerant-email note, the findUnique refactor, the Copy focus ring, the floating-icons matchMedia guard); unit 586/37 + e2e 58/9, badge 644; captures 49/50 |
| Session 22 — the mobile-menu re-anchor + the chunk-recovery storage + the panel scroll arm + the audit batch | ✅ done | The audit round at 0 Critical / 0 High / 2 Medium / 7 Low / 12 Info; THE PARITY WALK FOUND THE REFERENCE'S MOBILE DROPDOWN REVERTED to its session-1-era form (the session-21 captures were a transient deploy state) — three drifts cured TDD-style and live-verified byte-identical: the pill text back to "Upgrade to Pro – $19" (S22-1), the pill's bare class form (S22-2), and the menu links' bare mobile family (S22-3); the chunk-recovery cooldown is LIVE in production shape — the boundaries never handed the storage, so the 10s cooldown and the crash-mid-reload loop guard were inert (S22-4, seam + wiring + pins); the mobile-menu panel darkens when the home route scrolls into light sections (S22-5, the ~1.48:1 contrast gap); the audit batch: the forgot-submit pending face (S22-6), the signup name message (S22-7, live-verified), the Bun trustedDependencies move retiring the dead allowScripts block (S22-8), the a11y matrix extended to /signup + /reset-password — the "every route" docs claim true again (S22-9, e2e 58→63 via +4 a11y legs + the icon-resolution leg), the error boundaries' AA floor + keyboard-only focus rings (S22-10), the skip-to-content link (S22-11), the smoke ladder's portability + bounded curls (S22-12), the WAL-sidecar gitignore (S22-13), the manifest icon e2e leg (S22-14), the census anti-dodge guard's registration-loop shapes (S22-15), the iat shape guard (S22-16), the standalone anchor's basename-pair gate (S22-17), the hops-warning predicate aligned to the seam's parse (S22-18), the path-carrying-origin boot warning (S22-19), and the comment-truth batch (the hero portrait rationale, the reset-password Suspense note, the hamburger-aria parity re-anchor — the reference now ships the family itself); unit 599/37 + e2e 63/9, badge 662; captures 51/52 |

| Session 23 — the hamburger-aria superset re-anchor + the census depth + the AA focus superset + the audit batch | ✅ done | The audit round at 0 Critical / 0 High / 1 Medium / 12 Low / 14 Info (the lead's hand-verification upgraded the INTERNAL-answers-400 shape from style note to correctness bug); THE PARITY WALK FOUND THE REFERENCE REMOVED ITS HAMBURGER ARIA FAMILY — session-22's "parity" capture was another transient deploy state (the reference has flip-flopped: absent 1–21, present 22, absent 23) — ours STAYS as the documented superset rather than stripping a WCAG 4.1.2 contract (S23-1, comment + SKILL re-anchored); the INTERNAL-envelope status discipline: contact + generate answered server failures at HTTP 400 (fail()'s default) — contact now answers ERR.INTERNAL(), generate the explicit 500 (S23-8, pinned); the census DEPTH: the unit census scans tests/ recursively (a nested suite used to execute invisibly to every count arm — the planted-defect proof on record) + the anti-dodge shapes hardened with a decoy battery (S23-10/S23-13); the manifest + sitemap envelope contracts pinned field-for-field (the new seo-surfaces suite, S23-14/S23-15); the a11y batch: the skip-link target programmatically focusable (S23-3), the input surfaces' keyboard-only focus-visible rings over the reference's sub-3:1 focus styles (S23-21), the stats-band text-white recorded in the SANCTIONED register (S23-16); the toast store on useSyncExternalStore (S23-4, the missed-update window closed); the config/script batch: the bounded smoke wait-loops (S23-11), the smoke db-push diagnostics (S23-17), server.log in both hygiene lists (S23-18), the bun.lock workspace name re-anchored (S23-12), packageManager pinned (S23-19), the /Home 308 owned at e2e (S23-20), the e2e scratch-user prune (S23-22); unit 606/38 + e2e 63/9, badge 669; captures 53/54 |

| Session 24 — the Appendix-B ledger closure + the e2e census depth + the status-announcement superset + the audit batch | ✅ done | The audit round at 0 Critical / 0 High / 5 Medium / 11 Low / 11 Info (the lead's hand-verification; AUDIT-1's in-app-delivery Medium re-adjudicated to the accepted register — the documented S13-1 posture); THE PARITY WALK FOUND NO DRIFT — the first fully-clean walk since the mobile-menu re-anchor rounds began (every control surface byte-identical; the reference's hamburger aria family remains absent — our documented superset stands); the Appendix-B ledger closure (S24-1 — the S20-1 docs-counts genus recurred: the session-23 re-anchor missed the UNIT count in the same ledger bullet whose e2e count was pinned; both counts pinned with retired-form negatives); the e2e census depth (S24-2 — the spec census scanned tests/e2e flat while Playwright's discovery is recursive; the recursive helpers + the planted-defect proof on record); the status-announcement superset (S24-3 — the contact form's success swap is announced to AT via a visually-hidden role="status" region, WCAG 2.2 AA 4.1.3); the Copy-ring AA unification (S24-4 — teal-500 ≈2.49:1 upgraded to the S23-3 teal-600 family, the sub-3:1 form banned); the audit batch: the toast server snapshot cached (S24-5), the iridescence reduced-resize mount-time seed (S24-6), the e2e-prune datasource pinned through the seam (S24-7), the landing pricing duplication retired (S24-8 — the DOM byte-identical by construction), the ROUTES pin made ordered + the page-titles duplicate face retired (S24-9 — the exactly-one-pin doctrine), the sitemap loc-absoluteness + robots body + og-dims pins (S24-10/S24-11, four mutation batteries); unit 613/38 + e2e 63/9, badge 676; captures 55/56 |
| Session 25 — the footer-column parity + the generator-status superset + the paywall focus + the landing dedup + the audit batch | ✅ done | The audit round at 0 Critical / 0 High / 5 Medium / 12 Low / 13 Info (the lead's hand-verification and adjudication — the reference-inherited text-ink family and the UA-default focus posture on reference-owned link families moved to the accepted register, the parity doctrine); THE PARITY WALK FOUND ONE DRIFT — the footer's Product column shipped all four NAV_ROUTES while the reference ships Home/Tool/Pricing only (live-censused both sides this round; the dossier had recorded the 3-link family since session 1) — cured (S25-1, the filter form pinned + the unfiltered map banned); the generator-status superset (S25-2 — the core surface's async success states were visual-only: two sr-only role="status" regions ride the card, the S24-3 genus one file over); the auth-ring AA upgrade (S25-3 — the auth inputs' slate-400 focus ring ≈2.57:1 under the 1.4.11 floor, upgraded to slate-600 in place, the S24-4 form); the siteUrl non-bare-origin cure (S25-4 — a query-carrying NEXT_PUBLIC_SITE_URL slipped past every check and rode unescaped into the sitemap's <loc> as invalid XML; the seam falls back to the default + the boot gate warns); the pin-doctrine batch (S25-5 the auth.test password duplicate retired, S25-6 the OG_IMAGE one-declaration const + layout consumption pinned, S25-10 the count-ladder s24 row, S25-11 the Appendix-B existence guard made real, S25-12 the http-headers content-type trio retired to seo-surfaces' runtime pins); the correctness batch (S25-7 the toast store seeded from EMPTY_TOASTS — the S24-5 post-hydration render actually cured; S25-8 the error boundaries announce via role="alert"; S25-9 the dismiss glyph rests at text-muted); the maintainability batch (S25-13 the ContactSection dedup — the S24-8 genus completed; S25-14 FREE_LIMIT moved to the client-safe quota module + the client-crypto boundary pinned; S25-15 the paywall swap lands focus, mount-settle silent; S25-16 the menu link-click returns focus to the toggle; S25-17 the og:url/twitter:url e2e arms folded in place; S25-18 the hygiene batch); unit 620/38 (+14 pins −7 retired) + e2e 63/9, badge 683; captures 57/58 |
| Session 26 — the mobile-menu cap parity + the busy-state announcement + the bar open-arm retirement + the pin-doctrine batch | ✅ done | The audit round at 0 Critical / 0 High / 1 Medium / 6 Low / 5 Info (three parallel subagents + the lead's hand-verification; the 3rd-generation result discard, the h2-first auth views, and the vitest exclude note adjudicated to the accepted register with reasons); THE PARITY WALK found TWO LIVE-CENSUSED DIVERGENCES on the mobile-menu surface — both cured: (1) the panel's max-h-96 cap (S26-1, MEDIUM — the reference's open panel computes max-height:none; ours capped at 384px with overflow-hidden and no scroll path, clipping the Contact link + Upgrade pill unreachable at text sizes ≈145%+, the WCAG 1.4.4 reflow family; the class family re-anchored to the reference's own, the "inert dead classes" claim corrected — the cap was live); (2) the bar's dark arm keyed on scrolled \|\| open (S26-3 — the live reference's bar stays bg-transparent with the menu OPEN at scrollY=0; the open half also painted the desktop bar dark after a mobile→desktop cross — the arm now keys on scrolled alone, the reference's own key); the busy-state announcement (S26-2 — the generator's pending window rendered "": node A gains the generating arm, WCAG 4.1.3); the SEO one-declaration completion (S26-5 — both twitter blocks ride OG_IMAGE.url, the rename-drift vector closed); the pin-doctrine batch (S26-4 the client-crypto roster pin converted to a dynamic "use client" disk census; S26-6 the four config-mechanics pinned — the .mts include, the tsconfig/eslint/vitest skills exclusions — which surfaced and cured a latent type-gate stripper bug: the regex block-comment pass misfired on glob strings like "@/*" and swallowed the include array; the stripper is string-aware now); the contract batch (S26-7 the one-shot-script PrismaClient exemption codified + the URL-seam-mandatory form pinned; S26-8 the seed's update branch gains avatarColor + photoUrl — the "resets every seeded field" claim true; S26-9 the db-path :memory: pass-through arm); unit 629/38 (+9 pins) + e2e 63/9, badge 692; captures 59/60 |

Gate at the session-26 ship: lint 0/0 · tsc 0 · unit 629/629 · build ·
smoke 15/15 · e2e 63/63.

| Session 27 — the generator-submit focus rings + the launch `:memory:` pass-through + the pin-hardening batch | ✅ done | The audit round at 0 Critical / 0 High / 1 Medium / 5 Low / 10 Info (three parallel subagents + the lead's hand-verification; the scryptSync request-path posture, the first-signup admin TOCTOU, the start-script pipeline, the seed/prune disconnect skip, the forgot-password residual, the quota cross-tab sync, and the stripper single-quote footnote adjudicated to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the first fully-clean walk since session 24 (the mobile-menu family, the five-route head census, the footer Product column, sitemap/robots, the desktop nav — all byte-identical; the scrolled bar's computed background differs only in color-space spelling, our oklab form numerically verified to convert to the reference's exact rgba(15, 23, 42, 0.95)); THE CURES: the core-submit focus rings (S27-1, MEDIUM — the Generate Post + Send Message buttons carried no focus-visible arm while every sibling control one element away carries the house family; the S21-20 teal-600 family appended, resting classes untouched), the launch-shape `:memory:` pass-through (S27-2 — the S26-9 genus on the standalone-launch recovery arm: a launch .env carrying `file::memory:` was re-anchored into a literal `<repo>/prisma/:memory:` file, live-reproduced in a /tmp sandbox pre-cure), the pin-hardening batch (S27-4 the S26-5 negative arms re-anchored to block-scoped forms that can actually reach the twitter images position — the shipped {0,200}-windows were geometrically unreachable; S27-5 the Appendix-B negative frozen at the historical literal; S27-7 the client-crypto census admits the single-quoted `'use client'` spelling), the noindex superset pinned (S27-6 — the 404 noindex claim rode Next's built-in meta with zero assertions in src/ or tests/; the e2e unknown-route test gains the meta-robots arm in place), and the login-card comment-truth fix (S27-3 — "ZERO toasts fire on the auth flows" scoped to outcomes, the Google button's info notice acknowledged); unit 631/38 (+2 pins) + e2e 63/9, badge 694; captures 61/62 |

Gate at the session-27 ship: lint 0/0 · tsc 0 · unit 631/631 · build ·
smoke 15/15 · e2e 63/63.

## License

[MIT](LICENSE) — the scaffold's original license carries over.
