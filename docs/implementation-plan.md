# Implementation Plan — ViralPost AI clone (session 1)

**Round:** 2026-11-09 · session-1 of the `viralpost-ai` repo
**Input:** `docs/reference-investigation.md` (the evidence dossier)
**Mission:** transform the cloned NEO-CRM template (code at its session-198
state) into a complete, production-ready, enterprise-grade clone of
`https://viralpostai.base44.app/` — **functional superset, visual parity** —
on the repo's standing stack, then re-establish the full verification gate,
docs, captures, and the SSH-wrapper push.

---

## 1. Stack Decision Record

| # | Reference evidence | Clone decision | Confidence |
| :--- | :--- | :--- | :--- |
| S-1 | React SPA (`assets/index-*.js`, client router) on Base44 | Keep the repo's **Next.js 16 App Router + React 19 + TypeScript strict** (standing scaffold; SSR/SSG + metadata is the superset the platform can't give) | Reasoned |
| S-2 | Tailwind classes everywhere (`bg-slate-900`, `from-teal-500`…) | Keep **Tailwind v4 CSS-first** (`@theme` literal hex, `@custom-variant hover` unwrap, `tw-animate-css`) — the repo's validated v4 doctrine | Verified |
| S-3 | lucide-react icons (`svg.lucide` ×many) | Keep `lucide-react` | Verified |
| S-4 | framer-motion (`whileInView` reveals, entrance anims) | **No new dependency**: a ~70-line `Reveal` component (IntersectionObserver + CSS transitions, `prefers-reduced-motion`-aware) reproduces the observed motion vocabulary | Reasoned |
| S-5 | react-bits **Particles** hero title (canvas) | Independent vanilla-TS `ParticleText` canvas component (sample text → particle field → vaporize/fadeIn cycle; the reference's exact config shape) | Reasoned |
| S-6 | react-bits **Iridescence** WebGL hero bg (hue 174) | Independent compact WebGL fragment-shader component with the same props (hue/power/focus/distortion); CSS-gradient fallback when WebGL unavailable | Reasoned |
| S-7 | Base44 `/api/apps/{id}/entities/*` + `InvokeLLM` | Real backend: **Prisma + SQLite** (standing `db/`-at-root contract) + Next route handlers with the `{ok,data}` envelope | Verified |
| S-8 | `localStorage` JWT-ish token auth | **httpOnly HMAC-signed cookie** sessions (the repo's scrypt + HMAC seam, `viralpost_session` cookie) — security hardening | Reasoned |
| S-9 | `InvokeLLM` platform AI (402-dead at observation) | **AI-provider seam** (`src/lib/generator.ts`): deterministic local viral-formula engine (offline, testable, property-pinned); the OpenAI-compatible face is a DOCUMENTED WIRE-IN POINT, not a shipped knob — `generatorPrompt()` preserves the exact prompt for a future `generator-provider.ts` module; no provider env var is read today (session-9, F9-3 reword) | Reasoned |
| S-10 | Supabase-hosted logo/portrait PNGs | **Independently created assets**: SVG logo mark (teal gradient + spark) + generated portrait (image-generation skill), served from `/public` | Assumed |

## 2. Architecture

```
Layer 0  prisma/schema.prisma   — User, ContactMessage (SQLite, file:../db/custom.db)
Layer 1  src/lib/*              — pure seams: auth, password, api envelope, db-path,
                                  rate-limit, site/metadata, generator (+ the documented
                                  provider wire-in point),
                                  generation-counter, login-reset view machine, reveal
Layer 2  src/app/api/*          — route handlers: auth (login/logout/signup/verify/
                                  forgot/reset/me), generate, contact, health
Layer 3  src/components/*       — ui kit (kept), layout (nav/footer/mobile-nav),
                                  landing sections, generator card, effects
                                  (particle-text, iridescence, reveal)
Layer 4  src/app/*              — routes: / (+/Home redirect), /Tool, /Pricing,
                                  /Contact, /login, /reset-password, 404,
                                  sitemap/robots/manifest
```

Routes and their parity sources live in §3 of the investigation dossier.

## 3. Feature sequence (vertical slices, TDD where logic is non-trivial)

1. **Schema + seed** — Prisma models (User w/ tokenVersion + email verification,
   ContactMessage), seed = demo user only (`sepnetflix2023@outlook.com` /
   `$Abcd1234`, matching the reference demo login), census script adapted.
2. **Lib seams** — generator engine (hook/paragraphs/hashtags/word-cap rules as
   property-tested contract), generation counter (daily-reset pure functions),
   site/metadata rebrand, auth rename (`viralpost_session`), rate-limit reuse.
3. **API routes** — `/api/generate` (session-aware, rate-limited; the
   provider face is the documented wire-in point), `/api/contact` (zod-validated persistence), auth family (ported from
   the template's battle-tested routes), `/api/health`.
4. **App shell** — root layout (Inter-less system stack — the reference ships
   zero webfonts), nav + mobile menu + footer, globals.css retheme (teal/amber
   tokens, `@custom-variant hover`, reveal keyframes).
5. **Effects** — `ParticleText` + `Iridescence` + `Reveal` (reduced-motion
   aware, SSR-safe, cleanup-safe).
6. **Pages** — landing (10 sections), Tool, Pricing, Contact, login (3 views),
   reset-password, 404, `/Home` → `/` redirect, sitemap/robots/manifest.
7. **Tests** — unit: generator contract (fast-check), counter, auth, api,
   metadata, nav-config, page-parity source pins; e2e: journeys (generate →
   copy, limit wall, contact, auth ladder, mobile nav, 404, SEO endpoints,
   a11y axe on all routes ×2 widths).
8. **Ops** — sweep/probe/census scripts re-anchored to the new route set;
   smoke ladder; gate chain green.
9. **Docs + captures + push** — the 4 root docs via their skills, session_1
   log, worklog, screenshots, SSH-wrapper push to `main`.

## 4. Acceptance criteria

- [ ] Every route in §1 of the dossier renders with parity structure
      (headings, nav, sections, footer) at 1280×800 and 390×844.
- [ ] Mobile menu opens/closes; links navigate; no horizontal overflow at
      390px on any route (the operator's standing ask).
- [ ] Generator: empty→disabled; generating spinner; **working** result with
      copy round-trip; limit wall after 3/day; error state + retry (superset).
- [ ] Contact form persists a ContactMessage row and shows "Message Sent!".
- [ ] Auth: signup → verify → login → logout → forgot/reset round-trips.
- [ ] 404 page on unknown routes; "Go Home" navigates.
- [ ] `lint 0/0 · tsc 0 · unit suite GREEN · build · smoke · e2e GREEN`.
- [ ] `.env` `DATABASE_URL="file:../db/custom.db"`, `db/` at repo root,
      census MATCH; `.env.example` in sync.
- [ ] Sitemap (all routes) + robots + manifest reachable; per-route titles
      match the reference's (`<Page> | ViralPost AI`).
- [ ] No CRM residue: no dead routes, no stale tests, no stale docs claims.

## 5. Risks

| Risk | Mitigation |
| :--- | :--- |
| Canvas/WebGL effects misbehave in SSR/hydration | Client-only mount, `useEffect` lifecycle, `prefers-reduced-motion` static fallback, cleanup on unmount |
| Generator quality (local engine) | Property-tested contract (the reference's own 8 rules — tests/property.test.ts, session-9) + curated hook/hashtag banks; an LLM provider remains the documented wire-in lift |
| Test-suite shrink vs the template's 2817 | Expected and honest: the new app's surface is smaller; docs state live counts; the gate is the contract, not the historical number |
| Owner's docs (s199-210 sections) describe CRM-era work | Preserved as template lineage in git history; the new root docs describe the live app; a lineage note explains the scaffold origin |

## 6. Deviations Ledger (clone vs reference)

| Area | Reference behavior | Clone behavior | Rationale | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| Brand assets | Supabage-hosted PNG logo/portrait | Independent SVG logo + generated portrait | Asset licensing | Assumed |
| `/Home` route | Serves a duplicate of `/` | 308 redirect to `/` (nav hrefs unchanged) | SEO duplicate-content | Reasoned |
| Auth | localStorage token, platform OAuth | httpOnly cookie session; Google button → "not configured" toast when unset | Security hardening | Reasoned |
| AI backend | Base44 `InvokeLLM` (observed 402-dead) | Local deterministic engine (a documented provider wire-in point — no provider env is read today) | Must actually work offline | Reasoned |
| Contact form | Client-side stub, no persistence | POST → SQLite ContactMessage | Advertised action must be real | Reasoned |
| Generation errors | 402-dead generator; now settles with a failure toast, no generation ever lands (the session-46 D-1 re-verification — the infinite-hang posture is stale) | Error toast + retry affordance — and a WORKING generation | Reliability | Reasoned |
| Footer socials | `href="#"` dead stubs | Real platform homepages | Dead controls are a defect | Reasoned |
| Free-quota source | localStorage only (client-trustworthy) | Same UX, plus server-side IP rate limit on `/api/generate` | Abuse resistance | Reasoned |
| Unknown-route titles | SPA derived `<StartCase(last segment)> \| ViralPost AI` at session-2's capture (17 live path shapes); **stopped deriving by session-45's walk** — bare "ViralPost AI" on every probed unknown route (SSR + settled SPA title alike), the first reference-side drift since session-23's hamburger-aria flip | Keeps the derived title (13 unit pins + e2e + smoke leg 06, ADR-006) — the documented superset | SEO-meaningful titles; the S23-1 flip-flop doctrine (never chase a reference deploy that removes a superset) | Verified |
| Scroll reveals | framer-motion `whileInView` | `Reveal` (IntersectionObserver + CSS) | No new dependency; reduced-motion first | Reasoned |
| Soft-nav titles | SPA leaves `document.title` stale on client-side navigation (menu-click → /Pricing keeps the landing's bare "ViralPost AI"; per-route titles appear only on full loads — live-verified session 7) | Next.js Metadata API updates the title on every navigation ("Pricing \| ViralPost AI" immediately) | Correct behavior kept as a superset; crawlers do full loads either way | Verified |
| Platform badge | "Edit with Base44" floating badge | Absent (platform chrome, not app) | Not part of the product | Reasoned |

## 7. Verification plan (the gate)

1. `bun run lint && bun run typecheck && bun run test` — unit layer.
2. `bun run build && bun run smoke` — standalone artifact + boot ladder.
3. `CI=1 bun run test:e2e` — Playwright journeys on the standalone server.
4. agent-browser parity walk: every route × {1280×800, 390×844}, mobile menu
   open/close, generator round-trip, VLM screenshot comparison vs the
   reference captures.
5. Drift tools re-anchored (`sweep`, `probe:ref`, `census`) — run once to
   baseline the new surfaces.
6. Delivery Bar (skills/replicate-web-app §Phase 5): dev server boots, login
   works, primary journey (generate → copy) completes, direct-nav on every
   route works, coherent with empty data + failed network.
