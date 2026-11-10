---
name: viralpost-ai
description: "The complete engineering skill for the ViralPost AI codebase: a Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS 4 (CSS-first) + Prisma/SQLite clone of viralpostai.base44.app built as a functional superset with visual parity. Covers the deterministic generator engine, the quota counter, the scrypt/HMAC auth family, the catch-all 404 title architecture, the Tailwind v4 trap catalog, the WebGL/canvas effects, the three-tier test suite, and the parity-walk methodology. Every rule traces to something that actually happened in this repo."
version: 1.9.0
last_updated: 2026-11-10
project_state: "Session-13 ship: lint 0/0 · tsc 0 · unit 528/528 (37 files) · build · smoke 15/15 · e2e 54/54 (9 specs) · census MATCH"
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
| `eslint.config.mjs` | next/core-web-vitals + next/typescript (`rules-of-hooks` an error via the preset; `exhaustive-deps`/`purity` deliberately off); `skills/` ignored |
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
(Session-11, F11-18 — the standalone-launch lock: bun ABSOLUTIZES a
relative `file:` value from the launch-dir `.env` at `bun run start`,
and the build's hygiene step deletes the `.next/standalone/.env` the
session-34 recovery nested behind — the hoisted launch-dir signature
check in `runtimeDatabaseUrl()` now runs in that shape too; pinned by
the hygiene-shape fixtures in tests/db-path.test.ts.)

## §4 The Design System (Code-First)

All tokens in `src/app/globals.css` `@theme` — **literal hex values
only**:

```css
--color-primary: #0f172a;        /* slate-900 — stock button face */
--color-input: #e2e8f0;          /* the OTP inputs' border-input token */
--color-line: #e2e8f0;           /* slate-200 border family */
--color-muted: #64748b; --color-subtle: #94a3b8;
--color-success: #10b981; --color-danger: #ef4444;
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);  /* v4's rename re-pinned */
--blur-sm: 4px;                                /* same rename family */
--font-sans: ui-sans-serif, system-ui, sans-serif, ...;  /* ZERO webfonts */
```

(Session-11, F11-5: the token block is now EXACTLY the consumed set —
`--color-brand`/`--color-warning`/`--color-info`/the `-soft` variants
and friends retired with the dead-token census; every semantic token in
`@theme` has a live consumer or a base-layer var() reference, enforced
by tests/design-tokens.test.ts.)

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
6. **The vendored `tw-animate.css` is RETIRED** (session-11, F11-2) — it
   shipped dead `@keyframes enter/exit/accordion-down` + `@property`
   bytes on a phantom "the Radix dialog family rides it" claim (no Radix
   package has existed since the session-2 diet; the only consuming class
   family retired at session-131).
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
  emotional tone, blank-line separated, 5-8 hashtags (up to 2 derived
  from the idea's own keywords), < 200 words, no labels. Eight niche banks +
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
- **`verification.ts`** — the email-verification machinery. Session-11
  closed the funnel: `unverifiedAccount(verificationCodeHash)` is the
  enforceability seam — the login route refuses while the stored hash is
  non-null (regardless of the code's TTL; the old gate let a
  never-verified account sign in by waiting out the 15 minutes), the
  resend route re-mints for ANY unverified account (the resend IS the
  re-arm for an expired code), and the login card swaps to the verify
  view on the 403 (the return-visitor re-entry — full-funnel e2e-pinned).
- **`site.ts`** — `pageMetadata()`: every page's metadata through one
  factory (per-route `<Page> | ViralPost AI` titles, OG/Twitter,
  canonical; `page: null` = the unprefixed family for `/` and `/login`).

## §7 Content & Data

- `prisma/seed.ts` upserts the demo user BY EMAIL (ids survive reseeds
  so live sessions keep resolving) and clears the contact inbox.
- The marketing copy (testimonials, pricing, the PT pay-what-you-want section) lives in
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

- [ ] Gate green at the exact counts (528 unit / 54 e2e / 15 smoke — and
      the doc set carries the same numbers in the same commit; the
      reality census pins the constants to the live suites on disk).
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
| Session 3 (2026-11-09) | The rename completion: the `NEO_` → `VIRALPOST_` sweep finished at the guard layer — the boot gate's dual-prefix scan (unknown `VIRALPOST_*` warns on typos; any `NEO_*` warns and maps its live spelling), the e2e isolation pins re-armed with the live spellings, the catch-all page's dead `generateMetadata` deleted (the segment layout owns the title); +3 unit pins; captures 13/14 (14 pixel-identical to 09 — the layout-only title path renders byte-for-byte); push #3 |
| Session 4 (2026-11-09) | The phantom-reference audit: the CRM-era commentary sweep — the typography contract re-attributed to the unit source-pins (the phantom `crm.spec.ts` pointer deleted), the vitest surface description corrected to the real seams, e2e-port's single-consumer shape, the fixture renamed; the dev-capture lessons recorded (never `bun run build` under a live dev server — Fast-Refresh churn; the burger RELABELS on open — verify through the nav links); captures 15/16; push #4 |
| Session 5 (2026-11-09) | The docs-freshness audit: the session-tracking surfaces synced (this appendix, the frontmatter state, the README status table, the AGENTS plans map); DEPLOYMENT.md's env table gained the `VIRALPOST_*` hardening knobs (the reverse-proxy audience); captures 17/18; push #5 |
| Session 6 (2026-11-09) | The clean-tree re-certification: the widened fresh-eyes pass (the session-1-era secondary docs, `scripts/`, the tool configs) found ZERO defects — the S3–S5 cure sequence exhausted the long tail; parity re-verified live (mobile menu open/close/navigate, /Tool, /login, /Dashboard, landing); captures 19/20; push #6 |
| Session 7 (2026-11-09) | The dev-script feedback loop + the phantom-comment long tail: the dev script tee-returned request logs into the watched root — a self-sustaining ~3.3-loads/s Fast-Refresh reload loop under any open browser tab (A/B-verified live; the tee retired, the exact script form pinned by type-gate); the api.ts coercion-helper family (10 dead functions, zero callers) retired with its phantom CRM claims (THIRTEEN routes / twelve body routes / coercion-guards.test.ts); site.ts, not-found.tsx and not-found-body.tsx re-attributed to THIS repo’s evidence (the D-4 OG superset, the derived-title architecture, the e2e message pin); the description’s 405/141-char labels corrected to 170 (live re-verified byte-identical); the soft-nav-titles superset ledgered (the reference’s SPA leaves document.title stale on soft navigation); AGENTS maps the historical-record layer; captures 21/22; push #7 |
| Session 13 (2026-11-10) | The in-app-delivery polarity warning + the OTP log gate + the from_url seam: THE DELIVERY-POLARITY BOOT WARNING (S13-1, HIGH — both kill-switches ship "" (ENABLED) in .env.example, so a default-configured production deploy returns a LIVE reset link for any known email and a fresh OTP for any unverified account; the boot gate warned for the strictly-less-dangerous unset-hops hazard but not these — the per-knob production warning now fires, mirroring the F9-1 precedent: warn, never fatal, the off-vocab arm keeps its own face); THE OTP LOG GATE (S13-2, MED — signup/resend logged the live verification code to stdout UNCONDITIONALLY; the console.info now rides the SAME inAppOtpEnabled gate as the response payload — the mail-transport posture writes no codes to logs); THE FROM_URL SEAM (S13-4 — the open-redirect resolver was module-private in login-card with ZERO behavioral coverage; extracted to the pure seam `src/lib/from-url.ts` (origin a parameter), 8 behavioral pins + the card wiring pinned + 2 e2e legs — the /Tool round-trip and the foreign-origin fallback, both live-verified in the audit walk); the reduced-motion phrase cadence cured (S13-3 — advance-then-draw; the old order painted the retiring phrase at every window boundary, the first phrase holding ~2x its window); the verify route's P2025 → the 400 VERIFICATION_INVALID mapping (S13-5, the forgot-password route's own known-error doctrine); the font-family hoist out of both font-fit loops (S13-7 — up to ~42 redundant computed-style reads per rasterize retired); THE CENSUS FORMS-GUARD (S13-10 — no .each(/.skip(/.only(/.todo(/.concurrent( registration form in any suite: shapes the reality census's regex cannot count, the badge-drift genus one notch deeper; zero live instances, planted-defect proof); 7 mutation batteries (every new pin proven non-vacuous); badge 582 = 528+54; captures 33/34; push #13 |
| Session 12 (2026-11-10) | The count-reality census + the reset-funnel e2e + the UX-boundary batch: THE REALITY CENSUS (F12-1, MED — the docs-counts constants were pinned to doc SITES, never to test reality; a test added without bumping UNIT left every doc stale while the gate stayed green — the badge-drift genus the suite claimed to have retired) — the constants now count the LIVE SUITES ON DISK (files + it/test blocks regex-counted; the a11y spec's width-loop expansion computed from the extracted `tests/e2e/a11y-matrix.ts` both the spec and the census import; the width-loop pattern pinned a11y-only; mutation-batteried with a scratch test file); THE RESET-FUNNEL E2E (F12-2, MED — the password-reset funnel had ZERO behavioral coverage while its verification sibling got the full e2e at s11: signup → verify → forgot → the in-app link → new password → session → the single-use replay → 400, plus the invalid-link state); the UX-boundary batch (F12-3 the 403 re-entry clears the stale demo-code hint; F12-4 BOTH authed submits honor from_url — the verify submit's bare "/" retired; F12-6 the OTP paste takes the trailing six digits via the new pure seam `src/lib/otp.ts` — a paste into a filled box used to shift right and drop the last digit; F12-10 the expired-code 400 answers `verificationInvalidMessage()` "no longer valid" — not "Too many failed attempts" for a user who never failed); the effects hygiene (F12-8 the reduced-motion branch schedules by setTimeout, no 60 fps rAF redraw loop; F12-9 the hero re-reads devicePixelRatio inside resize — the cross-monitor stale-DPR cure); the stepped-semantic census arm (F12-7 — text-success-500-shaped classes escape both existing censuses; zero live instances, pinned zero); the retirement sweep (F12-11 hero's dead React import; F12-12 ERR.FORBIDDEN/NOT_FOUND + the generateVerifyCode re-export; F12-13 the Logo → next/link; F12-14 the duplicate verification assertion dedup); the PAD's stale tw-animate references (F12-5 — ADR-005 + the file tree described the retired file as live architecture for a full session) + the "409+" prose cured; THE NEO-CRM ADOPTIONS (the s208–s217 semantic-prose census STARTER — negative pins on retired doc forms + the fresh-clone cp line + the one-owner doctrine line in AGENTS); badge 559 = 507+52; captures 31/32; push #12 |
| Session 11 (2026-11-10) | The standalone-launch DB re-anchor + the dead-CSS retirement + the verification-funnel closure: THE HEADLINE (F11-18, live root-caused) — `bun run start` with the default relative `.env` could NOT open the database (bun absolutizes the relative `file:` value against the repo root → parent-of-repo path; the standalone server chdirs into `.next/standalone`; the session-34 launch-dir recovery sat nested behind a guard requiring the `.env` the session-7 hygiene step deletes — Error code 14 on a clean machine, a SILENT EMPTY WRONG DB where the parent `db/` exists; the neo-crm session-212 hoist cured it, TDD + mutation battery + a live A/B); the dead-CSS retirement (F11-2/F11-5/F11-16 — the vendored tw-animate.css + 13 dead `@theme` tokens + the fade-in/reveal keyframes + the input-base/scrollbar-thin utilities + components.json, ALL phantom-justified) + THE STEP-LESS CENSUS (F11-1: `border-input` compiled to nothing — the color census's family-step regex blind spot) + THE DEAD-TOKEN CENSUS (every semantic token must have a live consumer); the verification funnel CLOSED (F11-3/F11-4 — the login gate keys on the stored hash so an expired code no longer bypasses verification; resend re-mints for any unverified account; the 403 re-enters the verify view; the full-funnel e2e: signup → refusal → view swap → resend → paste-distributed code → session); the signup P2002 race → the 400 duplicate; the over-length idea answers the shorter-message; the menu a11y increments (aria-controls + the panel id + Escape focus-return); the OTP paste distribution; the gate-script pins + the doctrine census (AGENTS commands ↔ package.json, read live) + the PAD §12 inventory census + the mutation-battery convention + the bun audit duty adopted from neo-crm; captures 29/30; push #11 |
| Session 10 (2026-11-10) | The dev-origin hydration lock + the palette re-pin completion + the phantom-reference tail: THE HEADLINE — dev opened at `http://127.0.0.1:3000` never hydrated (Next 16's blockCrossSiteDEV rejects the HMR WebSocket from the loopback origin with a bare `Unauthorized`; the page LOOKS loaded while the mobile menu and every client island sit inert — live root-caused via raw-socket probes; production immune) — cured by `allowedDevOrigins: ["127.0.0.1"]` (Next's documented bare-hostname knob) + the dev-origins source-pin suite + a live A/B; the v3 palette re-pin COMPLETED (F10-1: 11 used-but-unpinned steps found by an exhaustive census — green-700 computed v4's #008236 on the reference-parity callout text whose v3 render is #15803d; blue-600/700, red-700, emerald-600, rose-200, green-50/200, emerald-200, red-200, neutral-900 — all pinned at the v3 hexes) + THE MECHANICAL CENSUS PIN (design-tokens enumerates every color utility in src/ and fails on any pair without a @theme literal — the "every literal" invariant is now tested, not asserted); the malformed-NEXT_PUBLIC_SITE_URL brick cured (siteUrl falls back to the default on unparseable/non-http(s) input + the boot gate warns in dev AND prod — a schemeless typo used to 500 every route via the root layout's metadataBase); the menu closes on HISTORY navigation too (the adjust-during-render prev-pathname pattern + the e2e pin — "closes on route change" was click-only before); the hashtag window exercised (the seeded target varies 5-7 — the "5-8" contract was always exactly 5); the raw-anchor CTAs → Link (hero, the PT CTA, the footer Product column — soft nav like the navbar); NOT_FOUND_LAYOUT pinned (page-layout.ts cited a phantom test file while the 404 body had zero class pins); the toast-anatomy/type-gate CRM-lineage headers re-attributed (tabs.tsx/mobile-nav.tsx/sweep.ts never existed here); the three count sites the docs-counts gate missed (README tree, PAD tree, the SKILL's OWN §11 checklist) fixed + pinned; VERIFICATION_LOCKED's missing Retry-After documented as the deliberate exception (the lockout lifts on resend, not time); DEPLOYMENT.md gained the first-signup-admin rule; the dead dompurify override + a raw NUL byte in generator.test.ts retired; captures 27/28; push #10 |
| Session 9 (2026-11-09) | The rate-limiter trust-default warning + the phantom-claim retirement + the docs-counts gate: the unset-VIRALPOST_PROXY_HOPS production boot warning (F9-1 HIGH — the direct-exposure XFF-rotation hazard, the NEXT_PUBLIC_SITE_URL warn precedent, TDD +4 pins); the signup role "rep"→"user" CRM relic cured (the schema's documented vocabulary, pinned); the reset funnel's read-path DB-outage honesty (P2024/P2028 → 503 on the reads, the bare re-throw → ERR.INTERNAL, pinned); the phantom property-suite claim made TRUE (tests/property.test.ts — 15 fast-check properties over the generator contract + the fixed-window limiter; the PAD's claim and rate-limit.ts's citation now point at a real file); contact/generate joined the sweep family (the unbounded-bucket gap); the dead-code retirement (src/types module, resetLive, the unused tw-animate-css dep — extractHashtags KEPT: the type gate caught the audit's zero-caller error, it has a test caller); the phantom provider claims reworded to the documented wire-in point (GENERATOR_PROVIDER/OPENAI_API_KEY read nowhere); DEPLOYMENT.md rewritten for ViralPost AI (it still described ORBITAL — wrong name, stale 29/41 route census, the retired pre-boot-gate AUTH_SECRET semantics); the @theme-inline doc drift cured (six sites → @theme, the code + pin's own form); the neo-crm docs-counts pattern ADOPTED (tests/docs-counts.test.ts — every live-tense count site under the unit gate; the 450→455→457 badge genus retired mechanically; badge now 490 = 442 unit + 48 e2e); the stale scaffold-comment sweep (next.config uploads, tsconfig sweep/.jsx, .gitignore walk5x, db-census CRM prose, the navbar transition-class overstatement); captures 25/26; push #9 |
| Session 8 (2026-11-09) | The live OG-parity discovery + the phantom-evidence provenance sweep: the reference NOW ships the full per-route OG/Twitter family (live census on all five routes — og:title mirrors the title scheme, the PLAIN 170-char description, absolute og:url, per-route canonical, the static image + PWA metas) SUPERSEDING dossier D-4; the clone's CRM-family OG-description prefix retired to match (TDD: 2 pins, the helper retired with a note); the 2026-10-01 census-claim long tail re-attributed (verification.ts/verify route's "eleven wrong-code submissions" that never ran here — the dossier's signup probe was platform-rejected; the headers census's nosniff-everywhere claim corrected to the live HTML-routes-only truth, ours kept as the documented superset; manifest/robots/sitemap re-verified live byte-for-byte; the verify-view claims marked Reasoned platform-family); site.ts's phantom test-file pointers fixed (the real pin home is page-titles.test.ts); typography re-fetch 79,690 bytes; README badge 450→455; captures 23/24; push #8 |

## Appendix B — The Verification Ledger (session-2 ship; re-certified through session 13)

- Gate: lint 0/0 · tsc 0 · unit 528/528 (37 files — the property suite
  + the docs-counts gate joined at session 9; the dev-origins,
  palette-census, siteUrl-fallback, and NOT_FOUND_LAYOUT pins at
  session 10; the hygiene-shape db-path fixtures, the step-less +
  dead-token censuses, the verification seam, the funnel/source pins,
  the gate-script pins, and the doctrine/inventory censuses at
  session 11; the otp seam, the effects-motion pins, the invalid-copy
  pins, the stepped-semantic census arm, and the reality +
  semantic-prose censuses at session 12; the delivery-polarity boot-env
  pins, the OTP-log-gate + P2025 auth-contract pins, the effects-motion
  order/hoist pins, the from-url seam suite, and the census forms-guard
  at session 13) · build · smoke 15/15 · e2e
  54/54 (9 specs — the reset-funnel e2e joined at session 12; the
  from_url round-trip legs at session 13) — all
  executed, all green.
- The title derivation: 13 unit pins + live curl across 11 path shapes
  (matching the reference's live table) + the e2e title assertion.
- The route precedence after the catch-all: every real route 200
  (curl-verified); unknown routes 404 + derived title + noindex.
- The mobile menu: live open/close/navigate at 390×844 against the
  reference (no drift since session 1).
- Census: MATCH (1 user, 0 messages) after pruning the probe residue.
- Re-certification: sessions 3–7 each re-ran the full gate on their exact
  commit trees (the counts held at 405/48/15 through session 6, 407 at session 7, 409 from
  session 7) with live parity
  re-verification each round — no reference drift since session 1.
  Session 7's re-certification ran on the FIXED dev script (the tee
  feedback loop cured): the mobile menu walk, /Tool, /login, /Dashboard,
  sitemap/robots/manifest — all live-verified again. Session 10's
  re-certification walked BOTH sides: the reference live (logged-in,
  the mobile menu at 390×844, /Dashboard's derived title, the OG
  family — no drift since session 9) and the clone's dev server via
  localhost AND the loopback IP (the allowedDevOrigins cure verified
  end-to-end: the menu opens at 127.0.0.1 post-fix). Session 12's
  re-walk: the reference live (logged-in → /Home, the mobile menu at
  390×844 with its 5 destinations + auto-close, /Tool's hard-nav title
  + og:title + canonical + the 170-char description — no drift since
  session 11) and the clone's dev server (the menu open/close, Escape
  WITH the focus return, navigate + auto-close, the title superset).
  Session 13's re-walk: the reference live (logged-in → /Home, the
  mobile menu at 390×844 — 5 destinations, auto-close, the no-aria
  hamburger; /Tool's hard-nav title + og:title + canonical + the
  170-char description — no drift since session 12) and the clone's
  dev server (hydration clean, the menu open/close, Escape WITH the
  focus return — focusIsToggle verified, navigate + auto-close, the
  title, the from_url round-trip BOTH directions, sitemap/robots/
  manifest/404-noindex).

*End of skill. Produced by following the six-phase distillation process
(to-distill-project-into-skill + distill-codebase-skill) over the
session-1 build and the session-2 audit.*
