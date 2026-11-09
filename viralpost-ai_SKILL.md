---
name: viralpost-ai
description: "The complete engineering skill for the ViralPost AI codebase: a Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS 4 (CSS-first) + Prisma/SQLite clone of viralpostai.base44.app built as a functional superset with visual parity. Covers the deterministic generator engine, the quota counter, the scrypt/HMAC auth family, the catch-all 404 title architecture, the Tailwind v4 trap catalog, the WebGL/canvas effects, the three-tier test suite, and the parity-walk methodology. Every rule traces to something that actually happened in this repo."
version: 1.0.0
last_updated: 2026-11-09
project_state: "Session-3 ship: lint 0/0 · tsc 0 · unit 405/405 (29 files) · build · smoke 15/15 · e2e 48/48 (8 specs) · census MATCH"
provenance: "Distilled at the session-2 remediation round (the /Dashboard parity audit) from the session-1 clone build and the session-2 audit. Scaffold lineage: the NEO-CRM template family's infrastructure seams (auth, db-path, rate-limit, the gate) — the domain is entirely ViralPost AI's."
---

# ViralPost AI — The Complete Engineering Skill

> **How to use this document:** the single-source engineering memory for
> building, extending, debugging, or auditing this codebase. §1–§3 get you
> oriented; §4–§8 are the contracts; §9–§16 are the hard-won lessons.
> **When code and this document disagree, the code wins — then fix this
> document in the same commit.**

---

## §1 Project Identity & Design Philosophy

**One sentence:** ViralPost AI is a self-hostable clone of
`https://viralpostai.base44.app/` — an AI social media post generator —
built as a **functional superset with visual parity** on one Next.js
deployable.

**The two doctrines everything serves:**

1. **Parity** — what the reference shows, we show: class-for-class
   marketing markup, the WebGL hero, the particle title, the mobile
   menu, per-route titles, even the 404 page's derived titles. Every
   parity claim cites a live capture (`docs/reference-investigation.md`
   is the evidence ledger; no eyeballs, always computed styles or
   screenshots).
2. **Superset** — what the reference advertises actually works here:
   the generator generates (the reference's LLM is 402-dead and hangs
   forever), the contact form persists (the reference's is a stub),
   unknown routes answer a true 404 (the reference's SPA answers 200).
   Every deviation is recorded in the Deviations Ledger
   (`docs/implementation-plan.md` §6) — a deviation nobody wrote down
   is a bug nobody can defend.

**Non-negotiables:** no webfonts (the reference ships none); the system
font stack is pinned; brand colors come only from the token block; no
`tailwind.config.js` ever; no new dependency without a live import in
the same commit; the gate (`bun run gate`) is the definition of done.

**The anti-generic mandate:** this is a *clone*, so "generic" here means
*drifting from the reference* — every bespoke-looking surface must trace
to a captured class list, not to taste.

## §2 Tech Stack & Environment

| Layer | Technology | Version | Critical Note |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.4.2 | `output: "standalone"`; the build is the type gate — `ignoreBuildErrors` never set |
| UI runtime | React | 19.3.1 | `"use client"` islands only; no `forwardRef` needed |
| Language | TypeScript | 5.9.3 | `strict: true`; `unknown` over `any` |
| Styling | Tailwind CSS | 4.3.3 | CSS-first; literal hex in `@theme`; see §4 for the trap catalog |
| ORM / DB | Prisma / SQLite | 6.19.3 | `db/custom.db` at repo root; `db push` dev, `migrate` prod |
| Validation | Zod | 4.6.7 | Every API boundary, no exceptions |
| Icons | lucide-react | 0.525.0 | The reference's own family; stroke-2 defaults |
| Unit tests | Vitest | 5.0.5 | Node env; `*.test.ts` only; `@` alias |
| E2E | @playwright/test | 1.64.1 | Against the PRODUCTION build, own port + own db |
| A11y | axe-core | 4.x | Inside the e2e suite, two widths |
| Runtime | Bun | 1.3.14 | Everything runs from the repo root |

**The exact dependency diet (session-2):** runtime =
`@prisma/client, clsx, lucide-react, next, prisma, react, react-dom,
tailwind-merge, zod` — nine packages. The CRM-era eleven
(`zustand, recharts, jspdf, html2canvas-pro, class-variance-authority`,
six `@radix-ui/*`) were removed after a usage census found zero imports.
The toast is a from-scratch subscribe/store hook; the effects are
dependency-free.

**Env contract (exactly six vars):** `DATABASE_URL` (required),
`AUTH_SECRET` (production-required — the boot gate refuses to serve
without ≥ 16 chars), `NEXT_PUBLIC_SITE_URL` (build-time-inlined),
`VIRALPOST_PROXY_HOPS`, `VIRALPOST_DISABLE_IN_APP_OTP`,
`VIRALPOST_DISABLE_IN_APP_RESET`. The `VIRALPOST_` prefix is the
session-2 rename from the template's `NEO_` — if you see a `NEO_` env
name in a doc, the doc is stale. The boot gate (`boot-env.ts`) warns on
BOTH a typo'd `VIRALPOST_*` name and any legacy `NEO_*` spelling
(session-3 closed the gap where the typo guard still scanned only the
old prefix while the knobs had been renamed).

## §3 Bootstrapping & Configuration

```bash
bun install
cp .env.example .env
bun run db:push && bun run db:seed
bun run dev                    # :3000
```

Demo login: `sepnetflix2023@outlook.com` / `$Abcd1234` (mirrors the
reference app).

The config files that carry non-obvious weight:

| File | Locks in |
|---|---|
| `next.config.ts` | standalone output, the `/Home` → `/` redirect, artifact hygiene |
| `tsconfig.json` | strict; `@/*` → `src/*`; `skills/` excluded |
| `eslint.config.mjs` | next/core-web-vitals + next/typescript; hook rules as errors; `skills/` ignored |
| `vitest.config.ts` | `src/**/*.test.ts` + `tests/**/*.test.ts` — never Playwright's `*.spec.ts` |
| `playwright.config.ts` | setup project (one login → storageState), webServer = standalone build on its own port with `db/e2e.db` |
| `postcss.config.mjs` | `@tailwindcss/postcss` only |
| `src/lib/db-path.ts` | THE database path resolver — the only sanctioned one |

**The DATABASE_URL contract (read twice — it bit the whole template
family):** a relative `file:` URL resolves against `prisma/schema.prisma`
for the Prisma CLI, against the CWD for a shell-inherited env, and the
standalone server `chdir`s before modules load. `db-path.ts` normalizes
all of it. Symptom of a break: `Error code 14: Unable to open the
database file`. Never construct a PrismaClient anywhere but `src/lib/db.ts`.

## §4 The Design System (Code-First)

All tokens in `src/app/globals.css` `@theme` — **literal hex values
only**:

```css
--color-primary: #0f172a;        /* slate-900 — stock button face */
--color-brand: #14b8a6;          /* teal-500 — the marketing accent */
--color-brand-strong: #0d9488;   /* teal-600 */
--color-line: #e2e8f0;           /* slate-200 border family */
--color-muted: #64748b; --color-subtle: #94a3b8;
--color-success: #10b981; --color-warning: #f59e0b;
--color-danger: #ef4444; --color-info: #06b6d4;
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);  /* v4's rename re-pinned */
--blur-sm: 4px;                                /* same rename family */
--font-sans: ui-sans-serif, system-ui, sans-serif, ...;  /* ZERO webfonts */
```

The marketing surfaces consume the STOCK palette classes directly
(`bg-slate-900`, `from-teal-500`, `text-amber-300`) exactly like the
reference; the semantic tokens exist for the login card, toasts, and the
404 shell.

**The Tailwind v4 trap catalog (all mitigated in-repo — the operator's
standing concern):**

1. **Bare HSL in `@theme` silently resolves to transparent** — literal
   hex only.
2. **v4's default palette is oklch** and drifts 1–3 sRGB units from
   intended hexes — brand colors are literals.
3. **The hover wrap:** v4 compiles `hover:` inside
   `@media (hover: hover)`, so ALL hover affordances no-op on touch
   devices. The reference's v3-era stylesheet has zero `(hover: hover)`
   queries. Fix (in `globals.css`): `@custom-variant hover (&:hover);`
4. **The shadow rename:** v3 `shadow-sm` → v4 `shadow-xs`, so v4's
   `shadow-sm` compiles one step heavier — `--shadow-sm` re-pinned.
5. **Brand gradients interpolate in oklab** and visibly shift — use
   inline `style` backgrounds where the blend must be byte-exact.
6. **`tw-animate-css`** is vendored at `src/app/vendor/tw-animate.css`
   (the npm import breaks under this bundler).
7. The reference's `bg-slate-900/98` is a **DEAD class in its own build**
   (computed transparent — /98 isn't a generated opacity step), so its
   mobile menu shows the hero glow through the panel. We replicate that
   (transparent panel over the hero) and SUPERSET a dark blurred panel
   on light pages where the reference leaves slate-300 links unreadable.

Typography: the system stack, pinned in `@theme` so a Tailwind default
change can't drift it. Layout geometry constants live in one test-pinned
module (`src/lib/page-layout.ts`) — hand-placed classes drift.

## §5 Component Architecture & Patterns

**The layer model — imports point DOWN only:**

```
src/app/**        pages (thin RSC) + API routes + layouts
src/components/** marketing shell · effects · layout cards · ui/toast
src/lib/**        pure seams (no upward imports)
prisma/**         schema + idempotent seed
```

Client/server split: server components render shells and metadata;
everything interactive is `"use client"`. The `(site)` layout resolves
NO session (all marketing pages are public, by the reference's own
behavior); `/login` renders for authenticated visitors too (verified).

**Patterns that are law here:**

- **Remount-via-key** for prop-derived state; NEVER
  `useEffect(() => setState(...))` (React 19's `set-state-in-effect` is
  an error rule — and it's racy in hydration).
- **`useSyncExternalStore`** for persisted UI state (the quota counter):
  server snapshot 0, client settles — no hydration mismatch.
- **Auth navigation uses `router.refresh()`**, never `window.location`.
- **Real buttons** with `aria-label` when icon-only; `<div onClick>` is
  banned.
- **Effects lifecycle:** every observer/timer/rAF is cleaned up;
  `prefers-reduced-motion` collapses all motion (the globals.css block).

**The effects inventory** (`src/components/effects/`): `Reveal`
(IntersectionObserver + CSS), `ParticleText` (canvas; renders a real
`<h1>` with sr-only text first — the a11y contract), `Iridescence`
(WebGL fragment shader, hue 174; aspect-aware: desktop radial burst +
mist + top band, mobile dark field + flow-band + bottom pool; CSS
fallback when WebGL is unavailable).

## §6 The Domain Seams (the app's heart)

- **`generator.ts`** — `generatePost(idea, seed)`: pure, deterministic
  (same inputs → same post; the API passes crypto-random seed). Satisfies
  the reference's prompt rules: hook first line, 1-2 sentence paragraphs,
  emotional tone, blank-line separated, 5-8 hashtags (2-3 derived from
  the idea's own keywords), < 200 words, no labels. Eight niche banks +
  evergreen fallback; `sanitizeIdea` bounds at 500 chars.
  `generatorPrompt(idea)` preserves the reference's exact LLM prompt for
  the provider face.
- **`generation-counter.ts`** — the reference's localStorage contract
  verbatim (`viralpost_generations`, `toDateString()` day key, 3/day,
  daily reset) as pure functions + guarded adapters that fail OPEN
  (the server rate limit is the wall, never the client store).
- **`route-title.ts`** — `unknownRouteTitle(pathname)`: last segment →
  split non-alnum runs → split camelCase (`XMLHttp` → `XML Http`) →
  upperFirst per word; digits NEVER split (`/page2` → "Page2", NOT
  lodash semantics); empty derivation → the bare title.
- **`auth.ts` / `password.ts`** — the template family's crown jewels,
  ported wholesale (see §10 Security).
- **`site.ts`** — `pageMetadata()`: every page's metadata through one
  factory (per-route `<Page> | ViralPost AI` titles, OG/Twitter,
  canonical; `page: null` = the unprefixed family for `/` and `/login`).

## §7 Content & Data

- `prisma/seed.ts` upserts the demo user BY EMAIL (ids survive reseeds
  so live sessions keep resolving) and clears the contact inbox.
- The marketing copy (testimonials, pricing, FAQ) lives in
  `src/components/marketing/sections.tsx` — extracted verbatim from the
  reference's DOM (session-1 captures); changing it is a parity decision,
  not copywriting.
- `nav-config.ts` is the shared vocabulary: brand strings, the
  capitalized route table (`/Home /Tool /Pricing /Contact` — the
  reference's own paths), the Gumroad product URL, the social links
  (ours are real platform links; the reference ships dead `#` stubs —
  the documented fix).

## §8 Accessibility

- WCAG 2.2 AA is the floor; the e2e suite runs axe-core on every route
  at 1280×800 and 390×844.
- The particle hero renders a REAL `<h1>` (sr-only text) — the canvas is
  decorative (`aria-hidden`).
- The mobile menu: `aria-expanded` + `aria-label` on the hamburger
  (the reference ships neither — our superset), Escape closes, route
  change closes.
- Focus states: visible rings throughout (`focus:ring-2` families);
  `prefers-reduced-motion` collapses every animation and the shader's
  motion.
- Icon-only controls carry `aria-label`; decorative SVGs are
  `aria-hidden`.
- The 404's Go Home is a real `<Link>` (the reference renders a
  href-less `<button>` — its own platform gap, never mirrored).

## §9 Anti-Patterns & Common Bugs (each one bit this repo)

1. **Client-side `document.title` mutation in an effect** — React's
   metadata hydration STOMPS it (observed live: title set at load,
   reverted a beat later). The SSR-correct home for derived titles is a
   segment layout's `generateMetadata` (§12 Pattern 3).
2. **A page's `generateMetadata` + `notFound()`** — Next DISCARDS the
   page's metadata when the page throws `notFound()` (probe-verified:
   the same metadata applied while the page rendered, vanished once
   `notFound()` entered). Put it in the LAYOUT.
3. **Bare HSL triplet in `@theme`** — silently transparent. Literal hex.
4. **`hover:` without the unwrap** — all hovers dead on touch. The
   `@custom-variant hover (&:hover);` line is load-bearing.
5. **`shadow-sm`/`blur-sm` drift** — the v4 rename; re-pinned tokens.
6. **Per-test e2e logins** — trips the auth rate limiter mid-suite. One
   setup login, shared storageState.
7. **Reseed then diagnose "empty views"** — live cookies point at
   deleted rows; re-login first.
8. **`rm` a db under a running server** — the process serves the
   deleted inode. Reseed in place.
9. **CWD-dependent db paths** — always the seam.
10. **Eyeball parity** — screenshots and VLM misread ~30% of
    micro-styling; computed styles are ground truth.
11. **Stale browser chunks during a dev-server parity walk** — the
    browser caches broken-period chunks; verify the served bytes match
    disk before concluding the fix failed (this cost a full morning once).
12. **EADDRINUSE ghosts** — kill by port before booting; a stale server
    serves OLD html against NEW chunk names and looks like template
    corruption.
13. **The `hidden` attribute + transition classes** — `hidden` removes
    display, so the transition never plays; harmless (the reference's
    menu has no transition either) but know it when you read the navbar.
14. **Bundling `skills/` into the artifact** — the smoke hygiene leg
    asserts it never ships; keep tsconfig/eslint/vitest exclusions
    intact.

## §10 Debugging Guide (symptom → cause → fix)

| Symptom | Root cause | Fix |
|---|---|---|
| `Error code 14: Unable to open the database file` | Wrong anchor (server started outside repo root) or shell-inherited absolute `DATABASE_URL` | Start via npm scripts from repo root; check `env \| rg DATABASE`; the seam handles the rest |
| App reads the WRONG database | Shell env beats `.env` (dotenv never overrides) | Scripts pin/strip the env inside themselves |
| Standalone server resolves db into `.next/standalone/db/` | `server.js` chdirs before modules load | `db-path.ts` stays in the import chain — never inline resolution |
| Login loops to `/login` | `AUTH_SECRET` changed between restarts | Keep the secret stable (prod: the boot gate surfaces it loudly) |
| Sudden 429s in tests | The fixed-window limiter counts your own suite | One shared login; wait `Retry-After`; restart clears buckets |
| Title reverts after client navigation | Effect mutation stomped by React metadata | Title belongs in a layout's `generateMetadata` (§12) |
| 404 title bare despite the catch-all | generateMetadata on the PAGE (discarded with notFound) | Move it to the segment LAYOUT |
| E2e flaky after reseed | Cookies point at deleted user rows | The setup project re-logins; specs that cache state re-login too |
| WebGL hero black | Shader compile error (check the console) — one uniform-name mismatch shipped silently | Console first; `gl: true` probe second; pixel-sample the screenshot third |
| Mobile menu tint differs from the reference | The reference's `bg-slate-900/98` is a dead class — its panel is transparent, the glow bleeds through | Keep the panel transparent over the hero (that IS the reference's render) |
| Dev badge in screenshots | Captured from `next dev` | Capture docs screenshots from the production build |
| Unit suite fails on markup pins | Source-pinned suites (page-titles, design-tokens, typography) | Update the pin in the same commit as the markup |

## §11 Pre-Ship Checklist

```bash
bun run lint && bun run typecheck && bun run test && bun run build \
  && ./scripts/smoke-test.sh && CI=1 bun run test:e2e
bun run db:census                       # pristine: MATCH
git status                              # no .env, *.key, db/*.db, logs
```

- [ ] Gate green at the exact counts (405 unit / 48 e2e / 15 smoke — and
      the doc set carries the same numbers in the same commit).
- [ ] Changed visual surfaces walked live against the reference at
      1280×800 AND 390×844, both auth states.
- [ ] The mobile menu opened/closed/navigated in the walk.
- [ ] Empty/loading/error paths exercised for every changed surface.
- [ ] Security checklist re-read for anything the change touched.
- [ ] Docs lockstep: README / AGENTS / CLAUDE / PAD / this SKILL.
- [ ] Session log + worklog written; the known-issues register swept.
- [ ] Push via `docs/ssh_git_wrapper_v3.py` (main only; the runbook is
      the authority).

## §12 Coding Patterns (copy-paste-ready)

**Pattern 1 — the pure seam:**
```typescript
// src/lib/*.ts — pure functions over inputs; DOM adapters are guarded tails.
export function usedToday(record: QuotaRecord | null, today: string): number {
  if (!record || record.date !== today) return 0;
  return record.count;
}
```

**Pattern 2 — the envelope + bounded reader (every route):**
```typescript
const read = await readBoundedJson(req);          // Content-Type gate + length
if (read.tooLarge) return fail("BAD_REQUEST", "Request body too large");
const parsed = bodySchema.safeParse(read.value);  // Zod at the boundary
if (!parsed.success) return fail("BAD_REQUEST", "Describe your post idea first.");
```

**Pattern 3 — the catch-all 404 (title in the LAYOUT, notFound in the page):**
```typescript
// src/app/[...catchAll]/layout.tsx
export async function generateMetadata({ params }) {
  const { catchAll } = await params;
  return { title: { absolute: unknownRouteTitle(`/${catchAll.join("/")}`) } };
}
// src/app/[...catchAll]/page.tsx
export default function CatchAllPage(): never { notFound(); }
```

**Pattern 4 — useSyncExternalStore over persisted state:**
```typescript
const used = React.useSyncExternalStore(subscribeUsage, getUsedTodayLive, () => 0);
```

**Pattern 5 — the metadata factory (never hand-roll page metadata):**
```typescript
export const metadata: Metadata = pageMetadata({ page: "Tool", route: "/Tool" });
// page: null → the unprefixed family (/, /login)
```

## §13 Pitfalls to Avoid

- **Don't** read `process.env.DATABASE_URL` outside `db-path.ts`.
- **Don't** hand-roll metadata on a page — `pageMetadata()`.
- **Don't** use lodash-style `startCase` semantics for route titles —
  digits never split here (live-verified on the reference).
- **Don't** add a dependency without a live import in the same commit
  (the census is standing).
- **Don't** weaken lint/types/tests to pass a gate — the debt gets
  documented instead, every time.
- **Don't** edit `skills/` — the owner's catalog, not app code.
- **Don't** trust VLM reads over computed styles.
- **Don't** create feature branches — main only, gate as the bouncer.
- **Don't** push with a resident `~/.ssh` identity — the wrapper only.

## §14 Best Practices

- TDD at the seams: write the failing test, then the module (the
  route-title suite was 13 red tests before `route-title.ts` existed).
- Source-pinned tests for the parity surface; update pins with markup.
- Comments explain WHY with the session/finding reference — the repo's
  comments are its archaeology.
- Conventional Commits, atomic, main only.
- The evidence doctrine: Verified / Reasoned / Assumed / Unverifiable —
  label every non-trivial claim in handoffs.
- Count-lockstep: when any count changes, `rg "<old number>"` the doc
  set in the same commit.

## §15 Responsive & Z-Index Reference

**Breakpoints:** Tailwind stock — `sm` 640, `md` 768 (the nav's
desktop/mobile switch), `lg` 1024, `xl` 1280. The hero's shader composes
differently below `md` (aspect-aware, §5). No horizontal overflow at
390px on ANY route — e2e-pinned (`scrollWidth - clientWidth <= 0`).

**Z-index layers (flat, documented, no wars):**

| Layer | Value | Element |
|---|---|---|
| Navbar | `z-50` | `fixed` nav bar |
| Toast viewport | `z-[100]` | the toast stack |
| (nothing higher) | — | no `z-[9999]` anywhere |

## §16 The Complete Interface Reference

```typescript
// The envelope (absolute — never throw across a handler)
type ApiEnvelope<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } };

// The generator
interface GeneratedPost { text: string; wordCount: number; hashtagCount: number; niche: string }
function generatePost(idea: string, seed?: number): GeneratedPost
function generatorPrompt(idea: string): string          // the reference's exact prompt
const FREE_LIMIT = 3;

// The quota
interface QuotaRecord { date: string; count: number }   // localStorage "viralpost_generations"
function usedToday(record: QuotaRecord | null, today: string): number
function incremented(record: QuotaRecord | null, today: string): QuotaRecord

// The route title
function unknownRouteTitle(pathname: string): string    // "Dashboard | ViralPost AI" | "ViralPost AI"

// The session (auth.ts)
const SESSION_COOKIE = "viralpost_session";             // 7-day TTL, httpOnly, lax
// payload: base64url({uid,iat,exp,v}) + "." + hex HMAC-SHA256

// The models (prisma)
// User { id, email, name, passwordHash, avatarColor, role, verificationCodeHash,
//        verificationAttempts, verificationExpiresAt, tokenVersion, resetToken,
//        resetTokenExpiresAt, createdAt, updatedAt }
// ContactMessage { id, name, email, message, createdAt }

// The env (six, exactly)
// DATABASE_URL · AUTH_SECRET · NEXT_PUBLIC_SITE_URL · VIRALPOST_PROXY_HOPS ·
// VIRALPOST_DISABLE_IN_APP_OTP · VIRALPOST_DISABLE_IN_APP_RESET
```

---

## Appendix A — The Round History

| Round | Delivered |
|---|---|
| Session 1 (2026-11-09) | The clone build: CRM domain out, ViralPost AI in; the generator + quota (TDD); the marketing shell + effects; the parity walk (hero shader driven to Δ≤(7,6,8) mean RGB; /Tool /Pricing /Contact /login at (2,2,2)); the gate green; 8 screenshots; push #1 |
| Session 2 (2026-11-09) | The parity audit: the /Dashboard decode (the reference's 404 + its derived-title scheme → the catch-all architecture); the unknown-route title seam (13 TDD tests); the `NEO_` → `VIRALPOST_` env rename; the CRM-relic sweep (reset-password text, chunk flag, db key, comments); the 11-package dep diet; `data-scroll-behavior`; the docs rebuild (README/AGENTS/CLAUDE/PAD/this SKILL); worklog; push #2 |

## Appendix B — The Verification Ledger (session-2 ship)

- Gate: lint 0/0 · tsc 0 · unit 405/405 (29 files) · build · smoke
  15/15 · e2e 48/48 (8 specs) — all executed, all green.
- The title derivation: 13 unit pins + live curl across 11 path shapes
  (matching the reference's live table) + the e2e title assertion.
- The route precedence after the catch-all: every real route 200
  (curl-verified); unknown routes 404 + derived title + noindex.
- The mobile menu: live open/close/navigate at 390×844 against the
  reference (no drift since session 1).
- Census: MATCH (1 user, 0 messages) after pruning the probe residue.

*End of skill. Produced by following the six-phase distillation process
(to-distill-project-into-skill + distill-codebase-skill) over the
session-1 build and the session-2 audit.*
