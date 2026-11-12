---
name: viralpost-ai
description: "The complete engineering skill for the ViralPost AI codebase: a Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS 4 (CSS-first) + Prisma/SQLite clone of viralpostai.base44.app built as a functional superset with visual parity. Covers the deterministic generator engine, the quota counter, the scrypt/HMAC auth family, the catch-all 404 title architecture, the Tailwind v4 trap catalog, the WebGL/canvas effects, the three-tier test suite, and the parity-walk methodology. Every rule traces to something that actually happened in this repo."
version: 1.32.0
last_updated: 2026-11-12
project_state: "Session-36 ship: lint 0/0 · tsc 0 · unit 665/665 (39 files) · build · smoke 16/16 · e2e 65/65 (9 specs) · census MATCH"
provenance: "Distilled at the session-2 remediation round (the /Dashboard parity audit) from the session-1 clone build and the session-2 audit. Scaffold lineage: the NEO-CRM template family's infrastructure seams (auth, db-path, rate-limit, the gate) — the domain is entirely ViralPost AI's."
---

# ViralPost AI — The Complete Engineering Skill

> **How to use this document:** the single-source engineering memory for
> building, extending, debugging, or auditing this codebase. §1–§3 get you
> oriented; §4–§8 are the contracts; §9–§16 are the hard-won lessons.
> **When code and this document disagree, the code wins — then fix this
> document in the same commit.**

---

## §0.5 Citation Provenance (session-21, S21-12; the range re-anchored session-30, S30-4)

The codebase's comments cite two ledgers. **This repo's own** sessions
are `docs/session_1..36.md` + `docs/plans/*` (findings S\<n\>-\<id\>,
F\<n\>-\<id\> — every number in this repo's range carries one of this
repo's plan files). **The donor family's** sessions — the
NEO-CRM/digma/scandihaven template repos
the seams were ported from — appear as bare higher numbers or prefixed
ids (session-23/34/35/36/37/38/39/40/41/62/63/67/79/80/88/96/111/131/
145/147/163/164/165/166/169/170/173/194/195/212 — the comprehensive
enumeration, extended session-34 S34-1; the 34/35/36
standalone-launch-recovery family in db-path/health/tests, marked at
every app-code site since session-33 S33-3; the 37–41 envelope/sweep
family, 62/63/79/147, and the remaining strata marked at their
high-traffic header cites since session-34 S34-1 — the 80/88/163/164/
165/166/173/194 sites carry their inline "the template's/the
scaffold's/the CRM's/the digma" attributions, S21-P\*, N-69a,
D-195a3, WP-3/4, walk35/37, the CRM's OWN session-20 S20-P1..P4 in
`tests/http-headers.test.ts` — re-attributed session-8 at session-21)
and carry their explicit "(a donor-ledger number)" marker — the
convention the newer files (playwright.config.ts, api.ts) already
follow. (Session-30, S30-4: the range was `1..21` from session-21 to
session-29 — stale once this repo carried its own sessions 22–29, the
exact misattribution §0.5 exists to prevent.)
When code and a citation disagree about which ledger a number belongs
to, the file's lineage note (the session-10 F10-4 pattern) is the
resolver; the high-traffic sites carry one, and new donor ports must
add one in the same commit.

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

**The exact dependency diet (session-2, re-anchored session-19):**
runtime = `@prisma/client, clsx, lucide-react, next, react, react-dom,
tailwind-merge, zod` — EIGHT packages (the `prisma` CLI moved to
devDependencies at session-15, S15-3 — it is build-time tooling, never
ships in the standalone artifact). The CRM-era eleven (`zustand,
recharts, jspdf, html2canvas-pro, class-variance-authority`, six
`@radix-ui/*`) were removed after a usage census found zero imports.
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
| `vitest.config.mts` | `src/**/*.test.ts` + `tests/**/*.test.ts` — never Playwright's `*.spec.ts` (the `.mts` extension since session-18: the ESM file loaded as CommonJS printed Vite's config-loader warning on every run) |
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
--color-muted: #64748b;          /* session-28 S28-4: the subtle-ink
                                    neighbor was RETIRED (zero consumers,
                                    the dead-token census comment-blind) */
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
   (Session-21, S21-5: CURED for the hue-crossing brand family — the
   wordmark, the monetization headline, and the Get-Unlimited-Access
   CTA carry `linear-gradient(to right, #2dd4bf, #fbbf24)` inline;
   the utility pair `from-teal-400 to-amber-400` is BANNED from src/
   by the design-tokens census. Same-family gradients stay on
   utilities — their oklab delta is sub-threshold.)
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
8. **The source scan is scoped to src/** (session-35, S35-1): v4's auto
   source detection anchors at the repo ROOT — the ~160 docs/tests/root
   prose files PLUS the 3,100-file skills/ catalog (92% of the non-src
   tree — the magnitude re-anchored session-36, S36-5b) compiled into
   ~60% never-matched rules (the sheet was
   159,088 B). `@import "tailwindcss" source("../")` in globals.css
   scopes the scanner to src/ (probe-proven through the installed
   4.3.3; the real build dropped to 64,053 B with every live class
   still emitting). The S28-4 prose-safe doctrine stays as defense in
   depth.
9. **v4's preflight ships NO `cursor: pointer` for buttons**
   (session-36, S36-1): every enabled button rendered the UA default
   arrow while the reference's v3-era preflight renders pointer —
   walk-verified live both sides (the hamburger + the login submit).
   The base-layer rule `button, [role="button"] { cursor: pointer }`
   in globals.css is the cure (the family skill §12's exact
   prescription); the `disabled:cursor-not-allowed` utilities still
   compose (the utility layer beats the base layer).

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
- The marketing copy (testimonials, pricing, the EN monetization
  section — the session-19 redesign) lives in
  `src/components/marketing/sections.tsx` — extracted verbatim from the
  reference's DOM (session-19 captures); changing it is a parity decision,
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
  (session-23, S23-1: the reference's aria family was a TRANSIENT deploy
  state — present at session-22's capture, removed again by the
  session-23 walk; ours STAYS as the documented superset rather than
  chasing the flip-flop),
  Escape closes, route
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

- [ ] Gate green at the exact counts (665 unit / 65 e2e / 16 smoke — and
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
| Skip link | `z-[60]` (focus-only) | the (site) layout's jump-to-content link (session-22, S22-11; added to this table at session-30, S30-5) |
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
| Session 8 (2026-11-09) | The live OG-parity discovery + the phantom-evidence provenance sweep: the reference NOW ships the full per-route OG/Twitter family (live census on all five routes — og:title mirrors the title scheme, the PLAIN 170-char description, absolute og:url, per-route canonical, the static image + PWA metas) SUPERSEDING dossier D-4; the clone's CRM-family OG-description prefix retired to match (TDD: 2 pins, the helper retired with a note); the 2026-10-01 census-claim long tail re-attributed (verification.ts/verify route's "eleven wrong-code submissions" that never ran here — the dossier's signup probe was platform-rejected; the headers census's nosniff-everywhere claim corrected to the live HTML-routes-only truth, ours kept as the documented superset; manifest/robots/sitemap re-verified live byte-for-byte; the verify-view claims marked Reasoned platform-family); site.ts's phantom test-file pointers fixed (the real pin home is page-titles.test.ts); typography re-fetch 79,690 bytes; README badge 450→455; captures 23/24; push #8 |
| Session 9 (2026-11-09) | The rate-limiter trust-default warning + the phantom-claim retirement + the docs-counts gate: the unset-VIRALPOST_PROXY_HOPS production boot warning (F9-1 HIGH — the direct-exposure XFF-rotation hazard, the NEXT_PUBLIC_SITE_URL warn precedent, TDD +4 pins); the signup role "rep"→"user" CRM relic cured (the schema's documented vocabulary, pinned); the reset funnel's read-path DB-outage honesty (P2024/P2028 → 503 on the reads, the bare re-throw → ERR.INTERNAL, pinned); the phantom property-suite claim made TRUE (tests/property.test.ts — 15 fast-check properties over the generator contract + the fixed-window limiter; the PAD's claim and rate-limit.ts's citation now point at a real file); contact/generate joined the sweep family (the unbounded-bucket gap); the dead-code retirement (src/types module, resetLive, the unused tw-animate-css dep — extractHashtags KEPT: the type gate caught the audit's zero-caller error, it has a test caller); the phantom provider claims reworded to the documented wire-in point (GENERATOR_PROVIDER/OPENAI_API_KEY read nowhere); DEPLOYMENT.md rewritten for ViralPost AI (it still described ORBITAL — wrong name, stale 29/41 route census, the retired pre-boot-gate AUTH_SECRET semantics); the @theme-inline doc drift cured (six sites → @theme, the code + pin's own form); the neo-crm docs-counts pattern ADOPTED (tests/docs-counts.test.ts — every live-tense count site under the unit gate; the 450→455→457 badge genus retired mechanically; badge now 490 = 442 unit + 48 e2e); the stale scaffold-comment sweep (next.config uploads, tsconfig sweep/.jsx, .gitignore walk5x, db-census CRM prose, the navbar transition-class overstatement); captures 25/26; push #9 |
| Session 10 (2026-11-10) | The dev-origin hydration lock + the palette re-pin completion + the phantom-reference tail: THE HEADLINE — dev opened at `http://127.0.0.1:3000` never hydrated (Next 16's blockCrossSiteDEV rejects the HMR WebSocket from the loopback origin with a bare `Unauthorized`; the page LOOKS loaded while the mobile menu and every client island sit inert — live root-caused via raw-socket probes; production immune) — cured by `allowedDevOrigins: ["127.0.0.1"]` (Next's documented bare-hostname knob) + the dev-origins source-pin suite + a live A/B; the v3 palette re-pin COMPLETED (F10-1: 11 used-but-unpinned steps found by an exhaustive census — green-700 computed v4's #008236 on the reference-parity callout text whose v3 render is #15803d; blue-600/700, red-700, emerald-600, rose-200, green-50/200, emerald-200, red-200, neutral-900 — all pinned at the v3 hexes) + THE MECHANICAL CENSUS PIN (design-tokens enumerates every color utility in src/ and fails on any pair without a @theme literal — the "every literal" invariant is now tested, not asserted); the malformed-NEXT_PUBLIC_SITE_URL brick cured (siteUrl falls back to the default on unparseable/non-http(s) input + the boot gate warns in dev AND prod — a schemeless typo used to 500 every route via the root layout's metadataBase); the menu closes on HISTORY navigation too (the adjust-during-render prev-pathname pattern + the e2e pin — "closes on route change" was click-only before); the hashtag window exercised (the seeded target varies 5-7 — the "5-8" contract was always exactly 5); the raw-anchor CTAs → Link (hero, the PT CTA, the footer Product column — soft nav like the navbar); NOT_FOUND_LAYOUT pinned (page-layout.ts cited a phantom test file while the 404 body had zero class pins); the toast-anatomy/type-gate CRM-lineage headers re-attributed (tabs.tsx/mobile-nav.tsx/sweep.ts never existed here); the three count sites the docs-counts gate missed (README tree, PAD tree, the SKILL's OWN §11 checklist) fixed + pinned; VERIFICATION_LOCKED's missing Retry-After documented as the deliberate exception (the lockout lifts on resend, not time); DEPLOYMENT.md gained the first-signup-admin rule; the dead dompurify override + a raw NUL byte in generator.test.ts retired; captures 27/28; push #10 |
| Session 11 (2026-11-10) | The standalone-launch DB re-anchor + the dead-CSS retirement + the verification-funnel closure: THE HEADLINE (F11-18, live root-caused) — `bun run start` with the default relative `.env` could NOT open the database (bun absolutizes the relative `file:` value against the repo root → parent-of-repo path; the standalone server chdirs into `.next/standalone`; the session-34 launch-dir recovery sat nested behind a guard requiring the `.env` the session-7 hygiene step deletes — Error code 14 on a clean machine, a SILENT EMPTY WRONG DB where the parent `db/` exists; the neo-crm session-212 hoist cured it, TDD + mutation battery + a live A/B); the dead-CSS retirement (F11-2/F11-5/F11-16 — the vendored tw-animate.css + 13 dead `@theme` tokens + the fade-in/reveal keyframes + the input-base/scrollbar-thin utilities + components.json, ALL phantom-justified) + THE STEP-LESS CENSUS (F11-1: `border-input` compiled to nothing — the color census's family-step regex blind spot) + THE DEAD-TOKEN CENSUS (every semantic token must have a live consumer); the verification funnel CLOSED (F11-3/F11-4 — the login gate keys on the stored hash so an expired code no longer bypasses verification; resend re-mints for any unverified account; the 403 re-enters the verify view; the full-funnel e2e: signup → refusal → view swap → resend → paste-distributed code → session); the signup P2002 race → the 400 duplicate; the over-length idea answers the shorter-message; the menu a11y increments (aria-controls + the panel id + Escape focus-return); the OTP paste distribution; the gate-script pins + the doctrine census (AGENTS commands ↔ package.json, read live) + the PAD §12 inventory census + the mutation-battery convention + the bun audit duty adopted from neo-crm; captures 29/30; push #11 |
| Session 12 (2026-11-10) | The count-reality census + the reset-funnel e2e + the UX-boundary batch: THE REALITY CENSUS (F12-1, MED — the docs-counts constants were pinned to doc SITES, never to test reality; a test added without bumping UNIT left every doc stale while the gate stayed green — the badge-drift genus the suite claimed to have retired) — the constants now count the LIVE SUITES ON DISK (files + it/test blocks regex-counted; the a11y spec's width-loop expansion computed from the extracted `tests/e2e/a11y-matrix.ts` both the spec and the census import; the width-loop pattern pinned a11y-only; mutation-batteried with a scratch test file); THE RESET-FUNNEL E2E (F12-2, MED — the password-reset funnel had ZERO behavioral coverage while its verification sibling got the full e2e at s11: signup → verify → forgot → the in-app link → new password → session → the single-use replay → 400, plus the invalid-link state); the UX-boundary batch (F12-3 the 403 re-entry clears the stale demo-code hint; F12-4 BOTH authed submits honor from_url — the verify submit's bare "/" retired; F12-6 the OTP paste takes the trailing six digits via the new pure seam `src/lib/otp.ts` — a paste into a filled box used to shift right and drop the last digit; F12-10 the expired-code 400 answers `verificationInvalidMessage()` "no longer valid" — not "Too many failed attempts" for a user who never failed); the effects hygiene (F12-8 the reduced-motion branch schedules by setTimeout, no 60 fps rAF redraw loop; F12-9 the hero re-reads devicePixelRatio inside resize — the cross-monitor stale-DPR cure); the stepped-semantic census arm (F12-7 — text-success-500-shaped classes escape both existing censuses; zero live instances, pinned zero); the retirement sweep (F12-11 hero's dead React import; F12-12 ERR.FORBIDDEN/NOT_FOUND + the generateVerifyCode re-export; F12-13 the Logo → next/link; F12-14 the duplicate verification assertion dedup); the PAD's stale tw-animate references (F12-5 — ADR-005 + the file tree described the retired file as live architecture for a full session) + the "409+" prose cured; THE NEO-CRM ADOPTIONS (the s208–s217 semantic-prose census STARTER — negative pins on retired doc forms + the fresh-clone cp line + the one-owner doctrine line in AGENTS); badge 559 = 507+52; captures 31/32; push #12 |
| Session 13 (2026-11-10) | The in-app-delivery polarity warning + the OTP log gate + the from_url seam: THE DELIVERY-POLARITY BOOT WARNING (S13-1, HIGH — both kill-switches ship "" (ENABLED) in .env.example, so a default-configured production deploy returns a LIVE reset link for any known email and a fresh OTP for any unverified account; the boot gate warned for the strictly-less-dangerous unset-hops hazard but not these — the per-knob production warning now fires, mirroring the F9-1 precedent: warn, never fatal, the off-vocab arm keeps its own face); THE OTP LOG GATE (S13-2, MED — signup/resend logged the live verification code to stdout UNCONDITIONALLY; the console.info now rides the SAME inAppOtpEnabled gate as the response payload — the mail-transport posture writes no codes to logs); THE FROM_URL SEAM (S13-4 — the open-redirect resolver was module-private in login-card with ZERO behavioral coverage; extracted to the pure seam `src/lib/from-url.ts` (origin a parameter), 8 behavioral pins + the card wiring pinned + 2 e2e legs — the /Tool round-trip and the foreign-origin fallback, both live-verified in the audit walk); the reduced-motion phrase cadence cured (S13-3 — advance-then-draw; the old order painted the retiring phrase at every window boundary, the first phrase holding ~2x its window); the verify route's P2025 → the 400 VERIFICATION_INVALID mapping (S13-5, the forgot-password route's own known-error doctrine); the font-family hoist out of both font-fit loops (S13-7 — up to ~42 redundant computed-style reads per rasterize retired); THE CENSUS FORMS-GUARD (S13-10 — no .each(/.skip(/.only(/.todo(/.concurrent( registration form in any suite: shapes the reality census's regex cannot count, the badge-drift genus one notch deeper; zero live instances, planted-defect proof); 7 mutation batteries (every new pin proven non-vacuous); badge 582 = 528+54; captures 33/34; push #13 |
| Session 14 (2026-11-10) | The from_url escape closure + the resend equalizer + the UX-boundary batch: THE FROM_URL PROTOCOL-RELATIVE ESCAPE (S14-1, HIGH, live-verified — a same-origin ABSOLUTE from_url whose path starts with `//` passed the seam's origin check (the url IS same-origin) but the returned `//evil.com?x=1` navigated CROSS-ORIGIN at the router; the live repro landed the browser on https://evil.com — the session-13 seam's own gap, found by this round's audit walk; the leading-`//` pathname arm + 3 behavioral pins (the escape, the backslash normalization, the inner-`//` control) + the e2e leg; the backslash-directly-after-host shape normalizes to a SAFE single-slash path, pinned as such); THE RESEND/VERIFY NO-ENUMERATION EQUALIZER (S14-2, MED — resend's no-op branch omitted the `verificationCode` key the known branch shipped (the key's PRESENCE distinguished known-unverified emails even knob-off — a verification-state oracle signup's duplicate-email 400 cannot reveal) and both routes answered the miss branch immediately while the known branch burned scrypt; the uniform `verificationCode: null` shape + one scrypt burned on every miss branch — login's S72-C shape, which EQUALIZES here (unlike forgot-password's documented residual, the known branch already burns scrypt so the burn cannot invert the signal)); the generate route's guests-allowed wiring pinned (S14-3 — the guard only selects the limiter bucket; the dead-401 reading was a maintenance trap); the password ceiling symmetry (S14-4 — signup's shared schema gains the 200-char max reset always owned: a 201+ char signup password could never be REPLACED at reset); InfoCallout's polite role (S14-5 — the assertive alert role belongs to errors alone); the toast dismiss keyboard focus ring (S14-6 — the OTP inputs' own focus-visible family); the reduced-motion inclusive boundary (S14-7 — the timer fires at exactly the window edge; a strict `>` holds the phrase a second window); the depth-0 availability note in DEPLOYMENT.md (S14-8 — the shared-bucket ceiling stated where the operator acts); 9 mutation batteries; badge 593 = 538+55; captures 35/36; push #14 |
| Session 15 (2026-11-10) | The resend P2025 sibling arm + the null-body vocabulary + the API-envelope 404: THE RESEND P2025 ARM (S15-1, LOW — the vanished-row findUnique→update race fell into the blanket catch → the raw 500, while verify maps it to its 400 (S13-5) and forgot-password to stored=false; the arm now returns the SAME no-op 200 the unknown-account branch serves — unreachable via API today (no user-delete surface), the doctrine gap, pinned with the condition-form face after the mutation battery caught a `false &&` vacuity); THE NULL-BODY VOCABULARY (S15-2, LOW, live-confirmed — the two route-local parse sites fed readBoundedJson's null straight to safeParse: contact leaked Zod's dev-facing "Invalid input: expected object, received null" to the client, and generate answered the over-length message for a non-string idea (String(999) is non-empty); both sites now answer the parseBody vocabulary "Invalid request body", and the over-length arm gates on typeof string); THE API-ENVELOPE 404 (S15-7, INFO, live-confirmed — unknown /api paths answered the HTML 404 body (the root page catch-all wins where no route exists); `src/app/api/[...path]/route.ts` now owns the subtree's unmatched paths with the envelope's JSON 404 across all five methods — the true-404 doctrine extended, e2e-proven, specific routes and their 405s untouched); the signin icons' aria-hidden (S15-4 — the file's only two stragglers); the hamburger's house keyboard focus ring (S15-8 — slate-300, the toggle's OWN ink: the house ring-ring #0f172a is invisible on the dark navbar; the reference's base classes untouched, keyboard-only visibility); the Escape focus-return e2e assertion (S15-9 — `toBeFocused` after close, behavioral not just source-pinned); `prisma` → devDependencies + the zod advisory chain retired via the resolutions pin (S15-3 — audit 10 → 9, all remaining dev-toolchain: minimatch/eslint lint-time, deepmerge-ts/prisma-CLI build-time, vite/launch-editor test-runner); the S15-5 logout-CSRF + S15-6 eslint-off-switches deferrals recorded in the PAD §11 register with evidence; 5 mutation batteries; badge 599 = 543+56; captures 37/38; push #15 |
| Session 16 (2026-11-10) | The parse-vocabulary completion + the bare-/api envelope + the polish batch: THE PARSE-VOCABULARY COMPLETION (S16-1, MED, live-confirmed ×5 — the S15-2 genus closed: a JSON body parsing to a string/array/number/boolean passed the null-only guard and leaked Zod's dev-facing "Invalid input: expected object, received string" on the whole auth family, and the three schema fields without `{ message }` (verify's code, reset's new_password, signup's password) leaked "expected string, received number/undefined"; parseBody's guard widened to the whole malformed-SHAPE class, contact mirrors it, the three fields gain type-faces — 5 behavioral/schema pins + the contact source pin, 5 mutation batteries); THE BARE-/API ENVELOPE 404 (S16-2, LOW — the one shape a required `[...path]` catch-all can never match fell through to the page tree's HTML 404; `src/app/api/route.ts` closes the doctrine's last escaping shape with the same five-method family, the S15-7 e2e leg extended in place — RED pre-cure, GREEN post); the polish batch (S16-4 the dead `reducedRef` retired; S16-5 the footer-year build-time freeze documented as a deviation in PAD §11 + code; S16-7 the generate-429 deviation comment; S16-3 the eslint off-switch blast radius re-recorded TREE-WIDE in the PAD §11 register; S16-6 the PAD §12 header refreshed); the OG family live re-captured on all five routes — the clone matches the reference byte-for-byte (the session-15 plan's "og:title ViralPost AI + root canonical" phrase for /Tool was a transcription slip, settled by this walk); badge 604 = 548+56; captures 39/40; push #16 |
| Session 17 (2026-11-10) | The comment-truth batch + the README table repair + the CSRF media-type parse + the timer hygiene: THE AUDIT at 0 Critical / 0 High / 0 Medium (2 Low / 6 Info — every finding cured or verified, the cleanest audit yet); THE COMMENT TRUTH (S17-1, LOW — the forgot-password no-enumeration rationale cited "signup's 409", a status signup never sends: its already-exists branch answers ERR.BAD_REQUEST 400; a future auditor reasoning from the comment would mis-model the sibling surface); THE README TABLE REPAIR (S17-2, LOW — the Project status table's interior blank lines terminated the GFM table after session 12: the 13–16 rows rendered as header-less prose on GitHub; one continuous table + the single post-table gate line); THE CSRF MEDIA-TYPE PARSE (S17-5, INFO, TDD — the content-type gate's `.includes("application/json")` accepted `text/x-application/json` and `application/jsonx` (not exploitable for the defended class — cross-site forms send only the three enctype types and a JS-set Content-Type trips CORS preflight — pure gate hygiene); the gate now parses the media type (split `;`, trim, lowercase, strict equality) with the charset/case tolerance preserved; 1 behavioral pin owning both hostile faces, 1 mutation battery); THE TIMER HYGIENE (S17-6, INFO — the two fire-and-forget marketing resets (copy 2s, sent 2.6s) now ref-tracked with unmount clears, mirroring the toast's own idiom; the clear-before-re-arm gives a rapid re-copy its full 2s window; 1 co-pinned source pin, 2 mutation batteries — one per face); THE POLISH (S17-3 the generate route's discarded-500 degradation documented — the S14-3 401-discard's twin; S17-4 the DEPLOYMENT re-seed note — the seed's update path re-arms the demo password and resets tokenVersion; S17-7 the dead `noValidate={false}` removed; S17-8 the "exactly 2 exhaustive-deps flags" PAD §11 claim independently re-verified live — both flags particle-text.tsx:293); the parity walk re-verified both sides (the five-route OG family via DIRECT loads — the reference's SPA soft-navigation leaves the previous page's canonical/og in the head, observed and excluded as evidence; the mobile menu family; sitemap/robots); badge 606 = 550+56; captures 41/42; push #17 |
| Session 18 (2026-11-10) | The OPTIONS-envelope closure + the DEPLOYMENT count re-anchor + the config-loader silence: THE AUDIT at 0 Critical / 0 High / 0 Medium (1 Low / 10 Info; the audit's one Zod-leak candidate — signupSchema.name.max(80) possibly leaking default text — DISPROVED live against the pinned zod 4.6.7: the constructor's { message } inherits to .max(); do not re-report); THE OPTIONS CLOSURE (S18-2, INFO, TDD — both envelope-404 catch-alls exported only the five-method family, so an OPTIONS probe of an unknown path fell to Next's own bare 204 (live-observed in the RED run, not the 405 the doctrine's comment assumed): a non-envelope response on a path that does not exist; the OPTIONS export joins both catch-alls, the TRACE exclusion documented (not a supported route-handler method), the S15-7 e2e leg extended in place with both faces co-pinned — RED pre-cure, GREEN post, 2 mutation batteries, one per face); THE DEPLOYMENT COUNT (S18-1, LOW — §1 still said "11 API route files"; sessions 15–16 added the two catch-alls, 13 on disk now); THE LOGOUT COMMENT (S18-3 — the only cookie-mutating route without try/catch documents WHY it's bare: no crypto, no DB, cookies() cannot throw; login/verify wrap their MINT because secret() and the DB read CAN throw); THE E2E_PORT DOC FACE (S18-4 — the knob appears in AGENTS' e2e note; test-infra tooling, the six-knob app contract complete); THE CONFIG-LOADER SILENCE (S18-5 — vitest.config.ts → vitest.config.mts: the "ESM syntax in a file loaded as CommonJS" warning printed on every gate run and names a real future break when configLoader: 'native' becomes Vite's default); the parity walk re-verified both sides (the mobile menu family, the five-route OG family via direct loads, the PT section + the Gumroad link family, sitemap/robots — NO drift); counts UNCHANGED (the OPTIONS leg extended an existing test: 550/37 + 56/9, badge 606); captures 43/44; push #18 |
| Session 19 (2026-11-10) | The description-family re-anchor + the monetization redesign + the reader-envelope closure + the a11y/lockstep batch: THE AUDIT at 0 Critical / 0 High / 2 Medium / 10 Low / 26 Info (three parallel subagents; the Zod-leak genus already disproved at session 18 not re-reported); THE PARITY WALK found TWO live drifts — the reference's platform adopted the per-route description prefix with a 70-char word-boundary truncation on /Tool /Pricing /Contact (S19-1, the session-8 F8-1 retirement re-anchored — pageDescription() + the top-level description field, unit-pinned byte-exact + the e2e /Tool leg + the mutation battery) and REDESIGNED the monetization section EN with ten floating icons (S19-2 — PtSection → MonetizationSection + the FloatingIcons rAF island, pink-400/sky-400 joined the v3 palette pins, 2 mutation batteries); THE READER ENVELOPE (S19-3, MEDIUM — an errored body stream rejected past readBoundedJson as a raw 500, live-reproduced; the reader loop now catches → cancels → the null-on-unreadable contract, 2 regression pins); THE LOCKOUT BURN (S19-5 — the verify route's locked-out 429 skipped the scrypt equalizer, a timing oracle on the ≥5-failures state); THE TOAST A11Y PAIR (S19-7/8 — the icons' aria-hidden + the viewport's aria-live=polite); THE REDUCED-MOTION RESIZE (S19-9 — a resize blanked the particle title up to ~3s in reduced mode; drawPlain on resize, the particle build skipped); THE VIEW-SWAP FOCUS MAP (S19-10 — the login card's in-place swaps dropped focus to <body>; per-view heading focus, WCAG 2.4.3); THE PRICING-HEADER REVEAL RETIRED (S19-11 — live-verified unfaded on both reference routes); THE TSCONFIG .MTS HOLE (S19-12 — vitest.config.mts had fallen out of the typecheck program); the proxyless-shared-bucket warning (S19-4), the known-path OPTIONS-204 exception documented (S19-6), the lockstep batch (S19-13-18: the runtime-deps 8 re-anchor, install_packages.sh retired, the smoke GATE_PID trap, the 405→204 comment truth, the .mts renames, the PAD §12 re-anchor); counts 561/37 + 57/9, badge 618; captures 45/46; push #19 |
| Session 20 (2026-11-11) | The ledger-count closure + the resetToken index + the limiter namespace + the hygiene batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 9 Low / 16 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs; every load-bearing finding hand-verified); THE PARITY WALK (logged into the reference) found NO DRIFT — the five-route head census byte-matches the session-19 description family, the mobile menu family holds on both sides, the monetization floaters animate inside the envelope, sitemap/robots identical, the generator superset green; THE LEDGER COUNT (S20-1, MEDIUM — the session-19 commit bumped the unit count in Appendix B's own paragraph but missed the e2e count in the same paragraph: the ledger said 56/56 while every other site said 57; the docs-counts gate's SKILL pin was satisfied by the frontmatter, not scoped to Appendix B — the scoped pin + the retired-form negative close both); THE RESETTOKEN INDEX (S20-2 — the funnel's two token lookups were the schema's only unindexed path; @unique indexes them and structurally pins the one-live-token invariant); THE SMOKE TRAP INIT (S20-3 — the S19-17 trap referenced an uninitialized GATE_PID under set -u; early-leg failures aborted cleanup mid-trap); THE HERO SERVER COMPONENT (S20-4 — a superfluous use client shipped the whole static subtree in the client bundle; retired, the islands hydrate, live-verified); THE S19-9 MOUNT RESIDUAL (S20-5 — init() still built the never-drawn particle field in reduced mode); THE TOAST FOCUS PAUSE (S20-6 — the auto-dismiss paused for the mouse only; onFocus/onBlur mirror the hover pair); THE LIMITER NAMESPACE (S20-7 — generate:'s uid and IP buckets shared one string namespace; a mis-declared-proxy attacker could collide with a victim's bucket via a forged XFF cuid; generate:uid:/generate:ip: split); THE ENVELOPE BELT-AND-BRACES (S20-10 — the two bare CSPRNG calls moved inside their try blocks); THE GENERATOR BANK CAP (S20-11 — the paragraph loop's termination was implicit; Math.min caps it); THE IRIDESCENCE CONTEXT-LOST GUARD (S20-12 — a lost GPU context span the rAF loop forever; the listener stops it, the loseContext-why comment pins the StrictMode invariant); the comment-truth batch (S20-8 the verify fsync residual, S20-9 the seed tokenVersion claim, S20-13 the SKILL §7 PT present-tense, S20-14 the type-gate install_packages note, S20-15 the site.ts truncation mechanism); THE VITEST EXCLUDE (S20-16 — skills/** now excluded explicitly, the three-config doctrine mechanical); counts 571/37 (+10 pins) + 57/9, badge 628; captures 47/48; push #20 |
| Session 21 (2026-11-11) | The CTA-class re-anchor + the oklab→sRGB gradient cure + the mobile-menu pill + the audit batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 11 Low / 14 Info (three parallel subagents; every load-bearing finding hand-verified); THE PARITY WALK found FIVE LIVE CLASS-LEVEL DRIFTS — the first since session 19 — all cured and live-verified: the footer CTA (S21-1 — the reference's from-teal-500/text-white//30 form), the Pro-card CTA's hover family (S21-2), the mobile-menu pill (S21-3 — the reference's text is now "Upgrade to Pro", the priced form was its session-1-era capture) + the menu links' desktop underline family (S21-4 — the reference's dropdown re-renders LINK_BASE; our touch-target layout stays the documented superset), and THE OKLAB GRADIENT CURE (S21-5 — the MEDIUM A2-1 elevated by the walk: every bg-gradient-to-* compiles `in oklab` vs the reference's sRGB; the hue-crossing teal-400→amber-400 family drifted ΔR≈26 midband; the doctrine's inline-style cure landed on the three brand surfaces + the utility pair is banned, mutation-batteried); the audit batch (S21-6 the reset screen's success-swap focus map — the S19-10 genus; S21-7 the OTP keystroke/paste split — typing into a filled box now replaces in place; S21-8 parseEnvFile strips unquoted inline comments — bun parity, live-verified; S21-9 the /signup route's FIRST e2e leg; S21-10 the reset-password metadata pin; the docs/comment batch — ADR-004's 488, the donor-ledger lineage notes incl. the CRM S20-P1..P4 collision re-attribution, the PT reword, the PAD TOC/date/tree hygiene, the eslint phantom-ignore prune, the x-real-ip warning face, the schemas tolerant-email note, the findUnique refactor, the Copy focus ring, the floating-icons matchMedia guard); counts 586/37 (+15 pins) + 58/9, badge 644; captures 49/50; push #21 |
| Session 22 (2026-11-11) | The mobile-menu re-anchor + the chunk-recovery storage + the panel scroll arm + the audit batch: THE AUDIT at 0 Critical / 0 High / 2 Medium / 7 Low / 12 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs; every load-bearing finding hand-verified); THE PARITY WALK found the reference's MOBILE DROPDOWN REVERTED to its session-1-era form (the session-21 S21-3/S21-4 captures were a transient deploy state) — three drifts cured TDD-style and live-verified byte-identical: the pill text back to "Upgrade to Pro – $19" (S22-1), the pill's bare class form without the hover family (S22-2), and the menu links' bare mobile family — the underline adoption retired, py-2 rides the reference's own base now (S22-3); the hamburger's aria family is PARITY now (the live reference ships aria-expanded + the relabeling label + aria-controls — the "our superset" claim re-anchored); THE CHUNK-RECOVERY STORAGE (S22-4, MEDIUM — both error boundaries called reloadOnStaleChunk(error) with NO deps, so storage was null, the optional-chained read silently yielded null, and EVERY stale-chunk error reloaded immediately: the 10s cooldown and the crash-mid-reload loop guard were inert in production; the seam's absent-storage face now fails safe (return false), the boundaries hand a guarded safeSessionStorage(), the error-boundaries pin re-anchored + the seam pin added); THE PANEL SCROLL ARM (S22-5, MEDIUM — onHero keyed the dark-panel superset on the ROUTE alone; home scrolled into light sections left slate-300 links on a transparent panel at ~1.48:1; (!onHero || scrolled) now mirrors the bar's own key, e2e-pinned + live-verified); the audit batch: the forgot-submit pending face joining its three siblings (S22-6), the signup name message cured of the S16-1 genus (S22-7, live-verified), the Bun trustedDependencies move retiring the dead allowScripts block (S22-8, pinned), the a11y matrix extended to /signup + /reset-password — the "every route at two widths" docs claim true again (S22-9; e2e 58 → 63 via the +4 matrix legs + the manifest icon-resolution leg S22-14), the error boundaries' AA floor (h1 slate-500) + keyboard-only focus-visible rings (S22-10), the skip-to-content link (S22-11 — sr-only until focused, fixed-position reveal over the z-50 chrome), the smoke ladder's GNU/BSD portability + bounded curls (S22-12), the WAL-sidecar gitignore (S22-13), the census anti-dodge guard's registration-loop shapes (S22-15), the iat shape guard (S22-16), the standalone anchor's basename-pair gate (S22-17 — the loose .next substring accepted decoy layouts), the hops-warning predicate aligned to proxyHopDepth's parse (S22-18), the path-carrying-origin boot warning (S22-19), and the comment-truth batch (S22-20 the hero portrait's plain-img rationale, S22-21 the reset-password Suspense note, S22-22 the hamburger-aria parity re-anchor); the same-family amber gradient re-adjudicated live (oklab-vs-sRGB midband delta (0,0,2) — sub-threshold confirmed, utilities stay); counts 599/37 (+13 pins) + 63/9, badge 662; captures 51/52; push #22 |
| Session 23 (2026-11-11) | The hamburger-aria superset re-anchor + the census depth + the AA focus superset + the audit batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 12 Low / 14 Info (the lead's hand-verification UPGRADED one finding — the INTERNAL-envelope-answers-400 shape on TWO sites, contact + generate, not the style note the subagent framed); THE PARITY WALK found the reference REMOVED its hamburger aria family (session-22's S22-22 "parity" capture was another transient deploy state — the reference has flip-flopped: absent sessions 1–21, present 22, absent 23; ours STAYS as the documented superset, the WCAG 4.1.2 state/label contract + the Escape/route-close genus — chasing the deploy state would be the regression); THE STATUS DISCIPLINE (S23-8, MEDIUM — fail()'s default status is 400, so `fail("INTERNAL", …)` answered SERVER failures as CLIENT errors on both the contact and generate catch arms; contact → ERR.INTERNAL(), generate → the explicit 500 with its surface message; pinned by the no-INTERNAL-at-400 census arm); THE CENSUS DEPTH (S23-10 — the unit census scanned tests/ FLAT while the runner matches tests/**/*.test.ts recursively; a nested suite executed invisibly to every count arm; the recursive scan shipped with the planted-defect proof on record; S23-13 — the anti-dodge loopShapes' `[^)]*` could not cross a paren in the loop head and `while`/`for await` were uncovered; hardened with a five-decoy battery pinned in the census); THE SEO BODY CONTRACTS (S23-14/S23-15 — the manifest's nine fields + key order and the sitemap's declaration + xmlns + formatting pinned by the new tests/seo-surfaces.test.ts, closing the "field-for-field" parity claim's coverage gap); the a11y batch: the skip-link target programmatically focusable (S23-3 — tabIndex={-1}, the WebKit fragment-target gap), the input surfaces' keyboard-only focus-visible rings (S23-21 — the reference's focus styles compute ≈1.86:1; the S14-6/S15-8 genus extends, teal-600 ≈3.05:1), the stats-band text-white recorded in the SANCTIONED register (S23-16); THE TOAST STORE ON useSyncExternalStore (S23-4 — the useState+effect pair's missed-update window + tear risk closed; the generator-card precedent); the React/comment batch: the hero portrait's "lazy default" claim cured to the eager truth (S23-2), the iridescence "t=0" precision (S23-9); the config/script batch: the smoke wait-loop curls bounded (S23-11), the db-push/seed diagnostics surfaced (S23-17), server.log in both hygiene lists (S23-18), the bun.lock workspace name re-anchored from the scaffold's "activity-map" (S23-12), packageManager pinned (S23-19), the /Home 308 owned at the e2e layer via the no-redirect request (S23-20), the e2e scratch-user prune (S23-22 — scripts/e2e-prune.ts + the global-setup call); the hygiene batch: the chunk-recovery vestigial `?.` retired (S23-5), boot-env's DISABLE_KNOBS const (S23-6), db-path's duplicated bun-signature early return consolidated (S23-7); counts 606/38 (+7 pins, +1 file) + 63/9, badge 669; captures 53/54; push #23 |
| Session 24 (2026-11-11) | The Appendix-B ledger closure + the e2e census depth + the status-announcement superset + the audit batch: THE AUDIT at 0 Critical / 0 High / 5 Medium / 11 Low / 11 Info (three parallel subagents + the lead's hand-verification; AUDIT-1's in-app-delivery Medium re-adjudicated to the accepted register — the documented S13-1 warn-not-fatal posture); THE PARITY WALK found NO DRIFT — the first fully-clean walk since the mobile-menu re-anchor rounds began (the five-route head family, the mobile-menu pill/links, the desktop nav + pill, the footer CTA, the heading tree, sitemap/robots — all byte-identical; the reference's hamburger aria family remains absent, our documented superset stands); THE APPENDIX-B LEDGER CLOSURE (S24-1, MEDIUM — the S20-1 genus recurred one notch over: the session-23 re-anchor missed the UNIT count in the same ledger bullet whose e2e count WAS pinned; both counts pinned now with retired-form negatives); THE E2E CENSUS DEPTH (S24-2, MEDIUM — the spec census scanned tests/e2e FLAT while Playwright's testDir discovery is recursive; the e2eSpecFiles/e2eCountedFiles helpers convert all three arms, the planted-defect proof on record — the nested fixture sat GREEN through the flat scan and RED the recursive one); THE STATUS-ANNOUNCEMENT SUPERSET (S24-3, MEDIUM — the contact form's success swap was never announced: a button label change is invisible to AT; a visually-hidden role="status" region rides the sent state, WCAG 2.2 AA 4.1.3); THE COPY-RING AA UNIFICATION (S24-4, MEDIUM — the S21-20 superset ring on the Copy button rode teal-500 ≈2.49:1, under the 1.4.11 floor the same file's textarea cleared; teal-600 + the sub-3:1 form banned); the batch: the toast server snapshot cached (S24-5 — EMPTY_TOASTS, the uncached () => [] tripped React 19's hydration double-call compare), the iridescence reduced-resize keeps its mount-time seed (S24-6 — the old render(0) re-flowed the bands from t=0, contradicting the S23-2 comment), the e2e-prune datasource pinned through the seam (S24-7 — the seed's idiom; a manual run no longer follows bun's .env absolutization outside the repo), the landing pricing duplication retired (S24-8 — PricingSection renders on / now, the DOM byte-identical by construction), the ROUTES pin made ORDERED + the page-titles duplicate face retired (S24-9 — the exactly-one-pin doctrine restored; the four independent toContains were order-blind while the comment claimed order), the sitemap loc-absoluteness + the robots body + the og-dims pins (S24-10/S24-11 — the seo-surfaces suite completes the SEO route contracts; four mutation batteries); counts 613/38 (+7 pins) + 63/9, badge 676; captures 55/56; push #24 |
| Session 25 (2026-11-11) | The footer-column parity + the generator-status superset + the paywall focus + the landing dedup + the audit batch: THE AUDIT at 0 Critical / 0 High / 5 Medium / 12 Low / 13 Info (three parallel subagents + the lead's hand-verification and adjudication — the reference-inherited text-ink family and the UA-default focus posture on reference-owned links moved to the accepted register, the parity doctrine); THE PARITY WALK found ONE DRIFT — the footer's Product column shipped all four NAV_ROUTES while the reference ships Home/Tool/Pricing only (live-censused both sides; the dossier had recorded the 3-link family since session 1 — S25-1 cured, the footer column joins the census set); THE GENERATOR-STATUS SUPERSET (S25-2, MEDIUM — the app's core surface announced none of its async success states: two sr-only role="status" regions ride the card, the S24-3 genus one file over); THE AUTH-RING AA UPGRADE (S25-3, MEDIUM — the login/signup/reset input rings rode slate-400 ≈2.57:1, under the 1.4.11 floor; slate-600 in-place, the S24-4 form); THE SITEURL NON-BARE-ORIGIN CURE (S25-4, MEDIUM — a query-carrying NEXT_PUBLIC_SITE_URL parsed as a bare origin and rode unescaped into the sitemap's <loc> as invalid XML; the seam falls back + the boot gate warns); the pin-doctrine batch (S25-5 the auth.test password-hashing duplicate retired, S25-6 the OG_IMAGE one-declaration const + the layout's consumption pinned, S25-11 the Appendix-B existence guard made real — indexOf, mutation-batteried, S25-12 the http-headers content-type trio retired to seo-surfaces' runtime pins); the correctness batch (S25-7 the toast store seeded from EMPTY_TOASTS — the S24-5 post-hydration render actually cured, S25-8 the error boundaries announce via role="alert", S25-9 the dismiss glyph text-muted); the maintainability batch (S25-13 the ContactSection dedup — the S24-8 genus completed, S25-14 FREE_LIMIT moved to the client-safe quota module + the client-crypto boundary pinned, S25-15 the paywall swap lands focus with the mount-settle guard, S25-16 the menu link-click returns focus, S25-17 the og:url/twitter:url e2e arms folded in place, S25-18 the hygiene batch); counts 620/38 (+14 pins −7 retired) + 63/9, badge 683; captures 57/58; push #25 |
| Session 26 (2026-11-11) | The mobile-menu cap parity + the busy-state announcement + the bar open-arm retirement + the pin-doctrine batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 6 Low / 5 Info (three parallel subagents + the lead's hand-verification; the 3rd-generation result discard — reference parity, e2e-pinned — the h2-first auth views, and the vitest exclude-replaces-configDefaults note adjudicated to the accepted register with reasons); THE PARITY WALK found TWO LIVE-CENSUSED DIVERGENCES on the mobile-menu surface, both cured: THE PANEL HEIGHT-CAP PARITY (S26-1, MEDIUM — the reference's open panel computes max-height:none; ours capped at max-h-96/384px with overflow-hidden and no scroll path, clipping the Contact link + the Upgrade pill unreachable at text sizes ≈145%+, the WCAG 1.4.4 reflow family the axe battery cannot see; the "inert dead classes" comment claim corrected — the cap was LIVE as a hard layout bound; the class family re-anchored to the reference's own bare base + the S22-5 arm + the hidden-attribute mechanics) and THE BAR OPEN-ARM RETIREMENT (S26-3 — the live reference's bar stays bg-transparent with the menu OPEN at scrollY=0, live-censused both sides; the open half of our arm shipped from session 1 and was never side-by-side censused — it darkened the bar the moment the menu opened AND painted the desktop bar dark after a mobile→desktop breakpoint cross; the arm keys on scrolled alone now); THE BUSY-STATE ANNOUNCEMENT (S26-2 — the generator's pending window rendered "" while the button's label swap is the not-re-announced form the S24-3 comment calls out; node A gains the generating arm, the S24-3/S25-2 genus completed); THE SEO ONE-DECLARATION COMPLETION (S26-5 — both twitter blocks ride OG_IMAGE.url; the hand-written literals drifted greenly on asset renames); THE PIN-DOCTRINE BATCH (S26-4 the client-crypto boundary pin's 13-file roster converted to a dynamic "use client" DISK CENSUS — a planted 14th client file REDs it now; S26-6 the four config mechanics pinned — the tsconfig .mts include + skills exclude, the eslint skills ignore, the vitest skills exclude — which SURFACED AND CURED a latent type-gate stripper bug: the regex block-comment pass misfired on glob strings like "@/*" inside tsconfig's paths and swallowed the include array from the stripped view; the stripper is STRING-AWARE now); THE CONTRACT BATCH (S26-7 the one-shot-script PrismaClient exemption codified in AGENTS + the URL-seam-mandatory form pinned in db-census; S26-8 the seed's update branch gains avatarColor + photoUrl — the "resets every seeded field" claim true; S26-9 the db-path :memory: pass-through arm — the "absolute or in-memory" comment now true); counts 629/38 (+9 pins) + 63/9, badge 692; captures 59/60; push #26 |
| Session 27 (2026-11-11) | The generator-submit focus rings + the launch `:memory:` pass-through + the pin-hardening batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 5 Low / 10 Info (three parallel subagents + the lead's hand-verification; the scryptSync request-path posture, the first-signup admin TOCTOU, the start-script pipeline exit mask, the seed/prune disconnect skip, the forgot-password non-transient residual, the quota cross-tab sync — reference parity — and the stripper single-quote footnote adjudicated to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the first fully-clean walk since session 24 (the mobile-menu family at 390×844, the five-route head census, the footer Product column, sitemap/robots, the desktop nav — all byte-identical; the scrolled bar's computed background differs only in COLOR-SPACE SPELLING: our Tailwind v4 oklab form numerically converts to the reference's exact rgba(15, 23, 42, 0.95) slate-900 — verified, not a drift); THE CORE-SUBMIT FOCUS RINGS (S27-1, MEDIUM — the Generate Post + Send Message buttons carried NO focus-visible arm while every sibling control one element away carries the house family; the S21-20 teal-600 family appended, resting classes untouched, the toContain pins survive); THE LAUNCH-SHAPE :memory: PASS-THROUGH (S27-2 — the S26-9 genus on the STANDALONE-LAUNCH recovery arm: bun absolutizes a launch .env's `file::memory:` into `file:<repo>/:memory:` which MATCHES the arm's signature, and urlForRoot re-anchored it into a literal `<repo>/prisma/:memory:` file — live-reproduced in a /tmp sandbox pre-cure; the arm now returns the raw launch value, its own purpose); THE PIN-HARDENING BATCH (S27-4 the S26-5 negative arms re-anchored to block-scoped `twitter:\s*\{[^}]*…\}` forms that can actually reach the images position — the shipped {0,200}-windows sat 291/233 chars short, geometrically unreachable, only the positive arms could RED; S27-5 the Appendix-B negative frozen at the historical miss it exists to ban (the session-23 shipped count, spelled digit-for-digit inside the assertion only — comments never spell it, the S25-3 rule; the dynamic `UNIT-7` offset banned a form that never existed and drifted with every re-anchor); S27-7 the client-crypto census admits the single-quoted 'use client' spelling — the double-quote-only walker was blind to it); THE NOINDEX SUPERSET PINNED (S27-6 — the 404 noindex claim in README/PAD/SKILL rode Next's built-in not-found meta with ZERO assertions anywhere; the e2e unknown-route test gains the meta-robots arm in place, the S25-17 fold-in precedent); THE COMMENT-TRUTH FIX (S27-3 — the login-card docblock's "ZERO toasts fire on the auth flows" scoped to outcomes; the unconfigured Google button's info notice is the card's one toast call site); counts 631/38 (+2 pins) + 63/9, badge 694; captures 61/62; push #27 |
| Session 28 (2026-11-11) | The siteUrl path-fallback + the .env-example knob census + the generate shape vocabulary + the dead-token retirement + the audit batch: THE AUDIT at 0 Critical / 0 High / 3 Medium / 8 Low / 10 Info (three parallel subagents + the lead's hand-verification; the in-app delivery default — the documented S13-1 posture — the first-signup admin TOCTOU, the parseEnvFile unterminated-quote divergence, the oversized-body 400 vocabulary, and the standing parity-doctrine adjudications moved to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the second consecutive fully-clean walk (the mobile-menu family at 390x844 — hamburger base classes, links, pill, panel max-height none, bar transparent-when-open; the five-route head census; the footer Product column; sitemap/robots modulo origin; the desktop nav — all byte-identical; the scrolled bar's oklab background RE-DERIVED in-session with the gamma step to EXACTLY rgb(15,23,42) = the reference's slate-900; the reference still rides the cdn.tailwindcss.com v3-era posture); THE SITEURL PATH-FALLBACK (S28-1, MEDIUM — the S25-4 genus completed: a path-carrying NEXT_PUBLIC_SITE_URL parsed with all four guarded fields empty and passed VERBATIM while the boot gate warned on the shape since S22-19; the pathname joins the fallback family, the sitemap's <loc> XML-invalid genus closed for the last shape); THE ENV-KNOB CENSUS (S28-2, MEDIUM — the six-knob arm claimed 'both directions with .env.example' while reading only README; the mirror direction now parses the file's assignment keys and demands exact set equality); THE GENERATE SHAPE VOCABULARY (S28-3 — the S16-1 exemption re-adjudicated: a valid-JSON-non-object body answered the describe-first message while every sibling answered 'Invalid request body'; the widened object-shape arm mirrors contact's, the 429 Retry-After floor gained its Math.max twin (S28-8)); THE DEAD-TOKEN RETIREMENT (S28-4 — the subtle-ink token had zero live consumers, kept alive only by a toast.tsx COMMENT the prose-blind census read as a consumer; the census is comment-blind now (each scanned file stripped before the regex — a mis-strip can only false-RED) and the token retired; the S25-3 rule applied to both reworded comments — the class-shaped spelling banned from prose the raw-text step-less census would read); THE MINLENGTH FAMILY (S28-5 — the reset screen's two password inputs gain the signup pair's minLength={8}); THE SMOKE DISK CENSUS (S28-6 — the last count site without one: the ladder's ok NN leg markers + the PASS echo literal pinned to the SMOKE constant); THE COMMENT-TRUTH BATCH (S28-7 — site.ts's stale dashboard bullet + schemas.ts's overstated constant-shape claim reworded; S28-9 the PAD's ADR-006 unit-pin overreach corrected); counts 636/38 (+5 pins) + 63/9, badge 699; push #28 |
| Session 29 (2026-11-11) | The logout session-gate + the shared shape-guard + the head-DOM SEO superset + the wiring pins + the audit batch: THE AUDIT at 0 Critical / 0 High / 0 Medium / 8 Low / 13 Info (three parallel subagents + the lead's hand-verification; the sub-AA tone family RE-ADJUDICATED against fresh live evidence — the reference ships the exact slate-400/teal-100/70 classes on the live pricing/landing surfaces, captured in this round's walk, the standing parity-doctrine adjudication stands; the scryptSync async lift (the standing owner-level deferral), the first-signup admin TOCTOU, the forgot-password non-transient residual, the parseEnvFile unterminated-quote divergence, the noValidate declarative-minLength note, the dead stepped gray tokens, the rAF offscreen posture, the once-sampled reduced-motion, the eager hero portrait, the standalone surfaces' <main> gap, and the allowedDevOrigins IPv4-only scope moved to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the third consecutive fully-clean walk (the mobile-menu family at 390x844, the five-route head census, the footer social family, sitemap/robots modulo origin, the desktop nav — all byte-identical; the pricing sub-AA classes live-captured for the adjudication); THE LOGOUT SESSION-GATE (S29-1 — the CSRF-logout class: logout was the only ungated side-effecting route, a cross-site <form method="POST"> could hit it and the response's Set-Cookie cleared the victim's session regardless of SameSite=Lax (which gates cookie SENDING, not SETTING); requireSession now owns the clear — the Lax cookie never rides a cross-site POST so the gate answers the envelope's 401, and the no-op call is honest); THE SHARED SHAPE-GUARD (S29-2 — the malformed-shape guard lived in three byte-identical copies (api.ts + contact + generate) that had already drifted once (contact widened in S16-1, generate only in S28-3 — twelve sessions of different vocabularies for the same malformed body); the predicate is exported from the seam (isJsonObject) and consumed at all three sites, the vocabulary byte-identical, the S15-2/S16-1/S28-3 pins re-anchored to the call form in the same commit); THE GENERATOR-CARD PARSE MIRROR (S29-3 — the response parse carries the family's .catch(() => null) so a non-JSON error body (a proxy/CDN 502 HTML page) reaches the !res.ok arm and renders the server's own failure face, not the catch block's network-error toast); THE LOGINSCHEMA COMMENT-TRUTH ARM (S29-4 — the tolerant-email posture scoped: the 160-char cap answers a third vocabulary on a fourth status (400), shared by every emailField consumer, no enumeration oracle); THE HEAD-DOM SEO SUPERSET (S29-5 — og:image + twitter:card + the /Tool canonical now asserted on the RENDERED head, folded in-place into the home-head test, no count change; the og:image family was pinned only at the metadata-object and asset (IHDR) levels — a framework-level rendering change would have shipped green while the most-shared URL's preview card degraded); THE DB OPERATOR-SCRIPT WIRING CENSUS (S29-6 — db:push's prisma-env wrapper + db:seed's seed mapping pinned in gate-script; a hand-edit reverting the wrapper string would have shipped the R-1 wrong-DB hazard green); THE ICON IHDR PINS (S29-7 — icon.png 512x512 + apple-icon.png 180x180 join the S24-11 asset<->declaration doctrine, both manifest size declarations co-pinned); THE DOCS/HYGIENE BATCH (S29-8 — CLAUDE's force-dynamic line scoped to the SEO routes' deliberate force-static (the build-time inlining posture); the .gitignore .auth entry re-filed under # playwright); counts 641/38 (+5 pins) + 63/9 (the S29-5 fold in-place), badge 704; captures 65/66; push #29 |
| Session 30 (2026-11-12) | The db-path empty-string normalization + the sections dead-import retirement + the docs-truth batch: THE AUDIT at 0 Critical / 0 High / 0 Medium / 4 Low / 7 Info (three parallel subagents + the lead's hand-verification; the in-app-delivery default posture (the standing owner-level deferral), the me-route unthrottled read (single-node posture), the 36px touch targets (the documented class-for-class parity decision, WCAG AA's 24px floor cleared), the cross-tab quota staleness (the fail-open doctrine), and the two formatting nits moved to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the fourth consecutive fully-clean walk (the mobile-menu family at 390x844 with the full functional battery — the aria family, link-click navigate+close, the /Tool light-page dark-panel superset, Escape + focus return, history close; the five-route head census; sitemap/robots modulo origin; the desktop nav — the two reported active-state deltas were walk-sequencing artifacts, the class families byte-identical; the oklab/rgba bar-spelling and the dead /98 panel class the documented same-render deviations; the clone's login round-trip verified live: 200 → router.push("/") → the session cookie → the me envelope); THE DB-PATH EMPTY-STRING NORMALIZATION (S30-1 — an empty-string DATABASE_URL is now "unset" at both boundaries: it previously masked a valid .env value through the `??` chain (the docker-compose/CI empty-passthrough shape — live-probed: the seam answered `""` and Prisma 6.19.3 failed at first query with "You must provide a nonempty URL") and skipped the documented DEFAULT_DATABASE_URL fallback for an empty .env line; the one-home normalization lives in effectiveDatabaseUrl, +2 pins, the wrong-DB hazard classes stay closed); THE SECTIONS DEAD-IMPORT RETIREMENT (S30-2 — the dead `Link` + `Sparkles` imports, gate-blind since the session-19 file introduction (noUnusedLocals off, no-unused-vars off — the F12-11 genus resurfacing), retired + the dead-import census pin; `WandSparkles` (the consumed symbol) untouched); THE PAD §11 LOGOUT-CSRF ROW RETIREMENT (S30-3 — the register still listed the S15-5 class the S29-1 cure had already closed, contradicting the same commit-set's session-29 records); THE PROVENANCE RANGE RE-ANCHOR (S30-4 — the five `session_1..21` sites re-anchored to `1..30` + the donor-marker rule, resolving the S22–S29 misattribution the ≤ 21 discriminator produced); THE DOCS/HYGIENE BATCH (S30-5 — PAD §12's "at the session-25 ship" phrase dropped, the db-path §12 row 280→292 re-anchored to the live wc -l, the SKILL §15 z-index table gained the skip-link z-[60] row); counts 644/38 (+3 pins) + 63/9, badge 707; captures 67/68; push #30 |
| Session 31 (2026-11-12) | The db-path whitespace normalization + the history-close focus return + the import-census generalization + the e2e superset batch: THE AUDIT at 0 Critical / 0 High / 0 Medium / 3 Low / 8 Info (three parallel subagents + the lead's hand-verification — every load-bearing finding live-probed or source-verified; the signup admin-bootstrap race re-confirmed as the standing session-27 adjudication and the two formatting nits carried forward in the accepted register); THE PARITY WALK found NO DRIFT — the fifth consecutive fully-clean walk (the mobile-menu census at 390x844 — the hamburger base classes byte-identical + the documented superset arms, the five links + the Gumroad pill byte-identical, the bar-open and scrolled families byte-identical with the two documented same-color spellings, the open panel computed transparent both sides; the five-route head census — titles/og/descriptions/twitter byte-identical, canonical + og:url by origin only, og:image the documented D-4 stand-in, our og:image dims the documented superset; sitemap/robots modulo origin; the clone's login round-trip + the full mobile-menu functional battery incl. the history close); THE DB-PATH WHITESPACE NORMALIZATION (S31-1 — the S30-1 genus one notch deeper: a whitespace-only DATABASE_URL was truthy on both boundary faces and rode through the ?? chain as a SET override, masking a valid .env value and skipping the DEFAULT_DATABASE_URL fallback — live-probed pre-cure: the seam answered " "; the cure trims at the one-home boundary, +2 pins, both mutation batteries on record); THE HISTORY-CLOSE FOCUS RETURN (S31-2 — the mobile menu's THIRD close arm (browser back/forward, F10-10) closed the panel with no focus return while its two sibling arms (Escape F11-11, link-click S25-16) both restore focus to the toggle — the WCAG 2.4.3 genus S25-16 documented; the cure records the pre-close open state as STATE in the adjust-during-render block (the react-hooks/refs rule bans the render-phase ref write the first shape used — the gate's lint leg caught it, the state-flag redesign is the round's design lesson) and a pathname-keyed useLayoutEffect focuses the toggle; +1 pin + the S25-16 family-count arm re-anchored 2→3); THE PLAYWRIGHT BROWSER-INSTALL PREREQUISITE (S31-3 — bunx playwright install chromium appeared nowhere in the doc set while bun's trustedDependencies never runs Playwright's postinstall, so a fresh clone's gate fails at the final leg with an opaque browserType.launch error — reproduced live by the audit's gate leg; documented at the three operator sites: README's testing section, CLAUDE's build table, AGENTS' E2E row); THE DONOR MARKER (S31-4 — auth.ts's S30-P3 citation gained the "(a donor-ledger number)" marker, resolving the collision with this repo's own session-30 finding range); THE PROSE-SAFE /98 + REVEAL CONTRACT BATCH (S31-5 — the navbar's two verbatim dead-class comment mentions re-spelled per the S28-4 doctrine (Tailwind v4's candidate scanner reads comments; the compiled output carried a never-matched rule), with the residual ACCEPTED on compile evidence: the scanner also reads .md files (isolated-test-verified), so the immutable historical-record docs keep emitting the ~100-byte rule — the src/ face is cured; Reveal's docstring gains the mount-time-constants contract for direction/delay); THE GENERALIZED DEAD-IMPORT CENSUS (S31-6 — the S30-2 pin guarded one file while the genus is gate-blind tree-wide (noUnusedLocals off, no-unused-vars off; struck twice: F12-11, S30-2); the census walks every src/**/*.{ts,tsx} import clause and asserts each bound symbol occurs outside its import statement — the planted-defect battery (a dead WandSparkles in footer.tsx) names the file + symbol; the sections.tsx co-pin documented in the census's comment); THE E2E SUPERSET BATCH (S31-7 — the og:image dims arms folded in-place onto the S29-5 rendered-head block, the authed-visitor /login no-redirect posture (s23-P2, a donor-ledger number) gains its first behavioral leg, and the reset screen's API-rejected banner (garbage token → the form's role="alert" — scoped past Next's own route announcer, which also carries role=alert) gains its first leg); counts 648/38 (+4 pins) + 65/9 (+2 legs), badge 713; captures 69/70; push #31 |
| Session 32 (2026-11-12) | The launch-db trim + the smoke 429 leg + the strengthened session arms + the prose-safe batch + the e2e superset: THE AUDIT at 0 Critical / 0 High / 0 Medium / 5 Low / 6 Info (three parallel subagents + the lead's hand-verification; AUDIT-2 compiled the real stylesheet with per-file recompile probes attributing every dead rule to its demand source — all eight Tailwind v4 traps verified mitigated in the compiled output; the bun-absolutization causal model's non-reproduction on this sandbox's bun 1.3.14 (probed across 7 shapes — the header's model stands, defensive under both models, re-verify on the deployment bun first), the natural-English prose-collision dead rules, and the test-pin literal face of the prose-safe cure moved to the accepted register with reasons); THE PARITY WALK found NO DRIFT — the sixth consecutive fully-clean walk (the mobile-menu census at 390x844 — the hamburger base classes byte-identical, the open panel computed transparent both sides at scrollY=0 with the five links + the Gumroad pill byte-identical, the bar families byte-identical with the two documented same-color spellings; the five-route head census — titles/og/descriptions/twitter byte-identical, canonical + og:url by origin only, the icon links the documented file-convention posture; sitemap/robots identical modulo origin, curl-diffed both directions; the login round-trip live on both sides — both land on /, the reference's localStorage-token posture vs our httpOnly cookie the documented superset); THE LAUNCH-DB TRIM (S32-1 — the S30-1/S31-1 trim doctrine, one face deeper: the launch-recovery arm compared UNTRIMMED faces, so a whitespace-PADDED quoted launch .env value matched its own padded absolutization and re-anchored through urlForRoot with the untrimmed ref — resolving to a trailing-space filename SQLite silently creates as a fresh empty DB; the padded in-memory spelling returned the RAW padded form through the S27-2 pass-through; both faces now trim at the top of runtimeDatabaseUrl, +2 pins, the mutation battery on record (both trims reverted → both pins RED)); THE SMOKE SESSION-ARM STRENGTHENING (S32-2 — leg 08's grep carried only ok:true, which the logged-out data:null face also produces, so a cookie-VERIFICATION regression shipped green through the whole ladder; the grep now carries the USER row (the email) and leg 12 asserts the logout 200 (the S29-1 gate answers 401 for cookie-less callers)); THE LIVE 429 LEG (S32-3 — the master skill's smoke-tier rate-limit contract restored from the CRM-era 11th-login shape the session-1 transform dropped: leg 07's login + 10 wrong-password POSTs, the first nine answer 401, the tenth additional (the 11th cumulative) answers 429 with Retry-After + the RATE_LIMITED envelope; broken-OPEN and broken-CLOSED both fail the exact code sequence; SMOKE 15 → 16 with the SEO family renumbered to 14, the boot-gate probe to 15, the hygiene leg to 16 — PAD:517 and next.config.ts:20 re-anchored in the same commit); THE PROSE-SAFE + COMMENT-TRUTH BATCH (S32-4 — login-reset's negative-mb-2 and slate-400-ring comment spellings and Reveal's zero-opacity mention re-spelled, per-file recompile-probe-verified clean (the S31-5a method); the login-card /login "under the navbar" rationale corrected — no navbar renders on /login); THE CLAUDE HOVER-UNWRAP FIX (S32-5 — CLAUDE.md:93 had stated the INVERTED mechanism ("keeps hover styles off touch devices"); the unwrap restores v3 bare-:hover semantics — hovers apply on touch exactly like the reference's v3-era stylesheet; a future agent could have "fixed" the code toward the doc and broken the pinned touch-hover parity); THE E2E SUPERSET FOLDS (S32-6 — the S31-2 history-close focus return's first BEHAVIORAL pin (toBeFocused after goBack; the mechanism was source-pinned only) and S32-7 — the head-level icon links asserted on the SERVED head (link[rel=icon] + link[rel=apple-touch-icon] with the file-convention hrefs — a metadata.icons declaration would REPLACE them; the S29-5/S31-7a rendered-DOM genus, its last open face); both batteries on record); THE RATE-LIMIT FIXTURE HYGIENE (S32-8 — the assertion-free env-restore it() converted to a proper afterEach, per-test isolation, UNIT −1 in the same commit); counts 649/38 (+2 pins −1 vacuous) + 65/9 (folds in place), badge 714; captures 71/72; push #32 |
| Session 33 (2026-11-12) | The Windows-absolute file refs + the prose-safe sweep completion + the donor-ledger markers + the signup h1 + the hygiene batch: THE AUDIT at 0 Critical / 0 High / 0 Medium / 4 Low / 4 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs — every load-bearing finding hand-verified in source by the lead; AUDIT-1 live-probed the Windows misclassification, AUDIT-2 per-file-compiled the stylesheet attributing four dead rules to src comments, AUDIT-3 caught the donor-ledger collision with this repo's imminent sessions 34/35/36; the lead merged the two same-doctrine prose-safe findings — every finding cured S33-1..S33-7, the accepted register carried forward unchanged); THE PARITY WALK found NO DRIFT — the seventh consecutive fully-clean walk (the mobile-menu census at 390x844 — the hamburger base classes byte-identical + the documented aria superset, the open panel computed transparent both sides, the five links + the Gumroad pill byte-identical, the scrolled-bar class family byte-identical with the two documented same-color spellings; the desktop nav byte-identical modulo the aria-label superset; the five-route head census byte-identical; sitemap/robots identical modulo origin — the walk script's first-occurrence-only replace artifact diagnosed by the all-occurrence normalized comparison; the login round-trip live on both sides; the generator walk-probe null on BOTH sides symmetrically — a probe selector artifact, the clone's generator proven green by the e2e spec + smoke leg 11, the reference's the documented 402-dead face); THE WINDOWS-ABSOLUTE FILE REFS (S33-2 — the db-path seam's absoluteness tests were POSIX-only (startsWith("/")), so a drive-letter (file:C:\db\x.db, both slash spellings) or UNC (file:\\server\share\x.db) ref fell through to the anchors and re-anchored into <repo>/prisma/C:\… junk — live-probed pre-cure; the S30/S31/S32 wrong-DB genus on the one platform the seam didn't model, no live caller on the Linux deployment but the documented production form on a Windows host; the cure is one shared isAbsoluteFileRef predicate (a literal drive-letter/UNC regex, NOT platform-dependent path.isAbsolute) consumed by BOTH resolveDatabaseUrl and isRelativeFileUrl — the launch arm inherits it through isRelativeFileUrl; +3 pins (the drive-letter resolve pair incl. the forward-slash spelling + the launch-arm leg), the battery on record (both predicates reverted to POSIX-only → exactly the 3 pins RED)); THE PROSE-SAFE SWEEP COMPLETION (S33-1 — the S28-4/S31-5a/S32-4 doctrine, the sweep FINISHED: four more retired utility tokens were still spelled verbatim in src comments (~1.5 KB of dead CSS — the v3 6px vertical-gap space-y step in login-reset/page-layout, the bare 420px max-width cap in toast, the bare z-60 layer token in the (site) layout, the bare backdrop-blur token in navbar); all six comment sites re-spelled prose-safe, per-file recompile-probe-verified CLEAN, the probe's vacuity PROVEN on a synthetic pre-cure source; the new dead-token comment census (the S21-5 BAN genus) holds the four spellings out of src with regexes that pass the live prefixed/suffixed forms by construction); THE DONOR-LEDGER MARKERS (S33-3 — the standalone-launch describe's bare session-34/35/36 cites would collide with THIS repo's imminent sessions 34/35/36 (the exact genus SKILL §0.5 exists to prevent, the S31-4 precedent); the describe title + the session-35 it title carry their markers, a boot-env-style lineage note joins the describe, the two src sites (db-path's STANDALONE LAUNCH RECOVERY header + health's S36-P5 comment) carry theirs, and §0.5's donor enumeration gains 34/35/36); THE COMPOSED :memory: PIN (S33-4 — the dev-shape composition (bun's absolutization of a cwd .env's file::memory: in the process env) had both components individually pinned but the composition unpinned; +1 pin, GREEN on arrival (a coverage-gap pin — the battery plants the signature-arm defect instead, the co-pinned faces documented per N12-2)); THE SIGNUP SR-ONLY H1 (S33-5 — /signup is the superset route the reference 404s; its only heading was the reference's own swap-view h2 (parity, kept); an sr-only h1 ("Sign up", echoing the page title) rides above it with zero visual change — the aria-superset family's invisible form; the /login in-place swap views untouched; +1 source pin, battery on record); THE SMOKE TRAP EXTENSION (S33-6 — the S19-17/S20-3 trap family's three uncovered paths: the push/seed log and the 429 leg's body/headers now born empty + rm -f'd in the EXIT trap, rm -f "" verified to exit 0; leg count unchanged); THE README ME-ROW TRUTH FIX (S33-7 — the API table labeled /api/auth/me "session" while the route is public-by-design (data:null, never 401); the row now reads public (session-reported), the IP-limited precedent's qualified form); counts 655/38 (+6 pins) + 65/9, badge 720; captures 73/74; push #33 |
| Session 34 (2026-11-12) | The contact-persistence pin + the swap-view h1s + the donor-marker completion + the hygiene batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 5 Low / 5 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs — every load-bearing finding hand-verified in source by the lead; AUDIT-1 live-probed the db-path seam's every code path clean across 40+ probes, AUDIT-2 empirically compiled the stylesheet and traced the mobile-menu state machine's four close arms, AUDIT-3 verified every count claim live and caught the contact-persistence pin gap; the lead's login-POST census (7/run vs the 10/15-min wall) confirmed the playwright-config arithmetic; every finding cured S34-1..S34-7); THE PARITY WALK found NO DRIFT — the eighth consecutive fully-clean walk (the mobile-menu census at 390x844 byte-identical across every class family; the five-route head census byte-identical; sitemap + robots identical modulo origin by the all-occurrence normalized comparison; the login round-trip live on both sides; the generator walk-probe null on BOTH sides symmetrically — the known probe selector artifact); THE CONTACT-PERSISTENCE PIN (S34-2, the Medium — the vacuous-coverage genus: the e2e test titled "the row landed" asserted only res.ok + body.ok, so deleting the create in contact/route.ts shipped green through every gate while the advertised core superset silently became false; the test now runs the one-shot read-back script (scripts/e2e-contact-readback.ts — the third one-shot DB script, constructed through the sanctioned runtimeDatabaseUrl seam, joined to the S26-7 pin's enumeration) against db/e2e.db and asserts exactly one row with the submitted payload; GREEN on arrival (a coverage-gap pin — the create IS wired); the battery on record: the create commented out → rebuild → exactly the read-back REDs (expected 1, received 0) while the envelope still passes — the exact silent-superset-death the pin exists to catch; restored → GREEN); THE SWAP-VIEW SR-ONLY H1S (S34-6 — the S33-5 genus generalized to the /login swap views: swapping to reset/sent/verify unmounts the signin column's h1, leaving the document with ZERO h1 mid-funnel; each view now carries an sr-only h1 mirroring its visible h2 — the invisible-superset form, zero visual change, the reference's visible DOM untouched; +3 pins RED-first, the three-removal battery on record: each removal trips exactly its own it); THE DONOR-MARKER COMPLETION (S34-1 — the S33-3 sweep had cured exactly 34/35/36 and stopped: the missed Session-35 guard site inside runtimeDatabaseUrl's launch-recovery arm (making the "marked at every app-code site" claim false for that site), the ten 37–41 envelope/sweep cites, and the 62/63/79/147 strata now carry their markers at every high-traffic header cite; SKILL §0.5's donor enumeration extended to the comprehensive list — the resolver for every donor number in the tree); THE RETIRED HOVER-INK RE-SPELL (S34-3 — the toast comment block spelled the retired hover-prefixed foreground-ink form twice (the hover variant has zero live consumers; the base token is live at five sites), each spelling emitting a never-matched rule into every build; both re-spelled prose-safe, the census's BANNED list gains its fifth member (the hover prefix is the discriminator — the live base form passes by construction); the compile-probe battery on record with the theme-import correction (text-foreground is THEME-dependent — the probe imports the repo's globals.css, not the bare default theme) + positive controls + the synthetic non-vacuity proof); THE PROVENANCE CENSUS (S34-5 — the badge-drift genus's LAST hand-maintained count family made mechanical: the eight sites re-anchored to 1..34 and the new lag-invariant census (contiguity + bound ∈ {diskMax, diskMax − 1}) holds every future re-anchor — lag 0 at ship, lag 1 inside the owner's narration window, lag ≥ 2 RED; both defect shapes' batteries on record); THE PLAYWRIGHT-CONFIG COMMENT TRUTH FIX (S34-4 — the N-69a hazard parenthetical re-anchored to this suite's arithmetic: 7 logins/run against the 10/15-min wall, LOGIN trips on the SECOND run, not resend/verify on the third); THE ARTIFACT-HYGIENE MIRROR (S34-7 — smoke leg 16's enumeration now mirrors next.config's excludes list and both gain the four missing root files; the planted-entry logic proof on record; leg count unchanged); counts 660/38 (+5 pins) + 65/9, badge 725; captures 75/76; push #34 |
| Session 35 (2026-11-12) | The Tailwind source scoping + the script teardown idiom + the donor-marker tail + the comment-truth batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 7 Low / 15 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs — every load-bearing finding hand-verified in source by the lead; AUDIT-1 live-probed the db-path seam clean again (40+ probes) and caught the script-family teardown gap plus ten more bare donor cites; AUDIT-2 empirically compiled the stylesheet through the installed @tailwindcss/postcss 4.3.3 (methodology validated against the real build artifact at 159,088 B) and surfaced the aggregate never-matched-rule mass; AUDIT-3 verified every count claim live and caught the playwright-config contact-bucket omission plus the partial hygiene-leg pin; the lead verified the contact bucket at RATE_LIMIT 5 / 60-min with the limiter before the Zod parse, and the docs-only classes riding the real build CSS; every finding cured S35-1..S35-7); THE PARITY WALK found NO DRIFT — the ninth consecutive fully-clean walk, on an instrument-hardened walk script, eight runs to green (the `--viewport` flag and a bare `viewport` command are not real — `agent-browser set viewport` with an innerWidth confirm is; a side-agnostic open-verify replaced our aria-expanded superset as the reference's toggle signal — the reference carries no aria family, so verifying against ours made the census "retry" on the reference and CLOSE the menu the first click had opened; the oklab→sRGB conversion now canonicalizes the two-spellings equivalence numerically — oklab(0.207678…) lands exactly on rgb(15,23,42)@0.95; the mobile battery at a CONFIRMED 390px: the open panel computed display block both sides, the links + the Gumroad pill byte-identical, the desktop nav 6|6 byte-identical, the login round-trip both landing /, the generator probe symmetrically null; the focus-return face stays e2e-owned at mobile-navigation.spec.ts :67/:80 — the daemon cannot drive focus from eval (a direct .focus() leaves activeElement=BODY), an instrument limitation probed this round, not app behavior); THE TAILWIND SOURCE SCOPING (S35-1 — the sheet 159,088 → 64,053 bytes, −59.7%: v4's auto source detection anchors at the repo ROOT and the docs/tests/*.md prose compiled into ~60% never-matched rules (.bg-[#bada55], [program:laravel-worker], .to-amber-400, the dead /98 family — none occur anywhere in src/); `source("../")` scopes the scanner to src/, probe-proven through the installed 4.3.3 with the control form emitting the dead classes — non-vacuity — and the real build verified: every live class still emits, the theme survives, zero `@media (hover: hover)`; +1 pin RED-first, the planted-bare-import battery on record; the S28-4 prose-safe doctrine stays as defense in depth); THE SCRIPT TEARDOWN IDIOM (S35-3 — the synchronous exit call inside .catch preempted the chained .finally disconnect on every failure path while the comments claimed the disconnect is AWAITED; process.exitCode lets the finally run — the process still exits 1 after the chain settles; census.ts gets the family form (a thrown count was an unhandled rejection); readback's usage check precedes the client construction; +1 pin with each of the three planted defects proven independently); THE DONOR-MARKER TAIL (S35-4 — api.ts:24/:64, auth.ts:143, verify:39/:92, login-reset:106/:133/:179, rate-limit.ts:7 — nine marker blocks covering the ten bare cites, the :106 block covering :114 (the S36-5d wording precision); §0.5's 173 claim true at its only site); THE PLAYWRIGHT CONTACT-BUCKET CENSUS (S35-2 — 3 POSTs/run vs the 5/HOUR wall, the limiter before the Zod parse so invalid POSTs count, the 60-minute self-heal — the comment's "wait 15 min" remediation was materially false for this bucket); THE HYGIENE PIN COMPLETION (S35-5 — the two partial toContain chunks replaced by the full 29-entry loop line as ONE toContain; 14 of 29 entries were unpinned (the S36-5a arithmetic re-anchor); the planted-removal battery on record); THE COMMENT-TRUTH BATCH (S35-6 — gate-script's stale "third run" (the S34-4 arithmetic), the SKILL Appendix B header ("through session 33" vs its own session-34 body), AGENTS' plans-map stray paren, the smoke header's leg-16 summary re-anchored to name the families); THE CENSUS WIDENING (S35-7 — scripts/ + worklog.md + the root configs join the provenance scan's SITE_ROOTS/SITE_FILES; today zero range sites exist in them — the worklog's only cite is the single-session docs/session_19.md, out by construction); counts 662/38 (+2 pins) + 65/9, badge 727; captures 77/78; push #35 |
| Session 36 (2026-11-12) | The button-cursor preflight cure + the teardown-chain coverage + the donor-marker sweep + the comment-truth batch: THE AUDIT at 0 Critical / 0 High / 1 Medium / 7 Low / 9 Info (three parallel subagents — API/lib seams, components/pages/effects, SEO/configs/tests/docs — every load-bearing finding hand-verified in source by the lead; the session-35 diff itself verified clean on all three passes; every finding cured S36-1..S36-6); THE PARITY WALK found ONE real drift — the round's headline: the reference renders `cursor: pointer` on every enabled button (its v3-era preflight) while our v4 build rendered the UA default arrow (confirmed live both sides: the hamburger and the login submit R=pointer L=default; the disabled Generate button matched only via the shared disabled:cursor-not-allowed utility) — plus two adjudicated non-drifts (our focus-visible arm, the S15-8 superset; our Escape-close, the F11-11 superset — the reference's panel STAYS OPEN on Escape, probed in isolation: no keyboard close at all; session-35's walk had probed the escape transition on OUR side only) — with the other sixteen faces byte-identical (the bar families at a confirmed 390×844, the open panel display block + max-height none + the links + the Gumroad pill, the desktop nav 6\|6, the five-route head census modulo origin, sitemap + robots modulo origin, the login round-trip both landing /, the generator probe symmetrically null); THE BUTTON-CURSOR BASE RULE (S36-1, the Medium — `button, [role="button"] { cursor: pointer }` in the @layer base block, the family skill §12's exact prescription; +1 pin RED-first, the planted-removal battery on record, the real-build sheet check + the walk re-run flip to MATCH); THE TEARDOWN-CHAIN COVERAGE (S36-3 — the four one-shot scripts' chains reordered to `.finally(...).catch(...)`: the disconnect's own rejection was unhandled (a rejecting $disconnect flipped a green run non-zero with no message); the ordering arm joins the S35-3 pin, the planted-revert battery on record, the failure paths verified live (usage exit 2, seed 0, census MATCH)); THE DONOR-MARKER SWEEP (S36-2 — the N-67h twins at login/resend/signup, the Session-163 Zod-parse shorthands across six routes + api/auth/password, and login-card's N-67k/N-67l/Session-111/N-79c13/Session-96 family all carry their lineage notes — the .env.example S21-12 file-level precedent; §0.5's 163 claim true at its route sites); THE CENSUS .SH BLIND SPOT (S36-4 — scripts/smoke-test.sh joins SITE_FILES; the S35-7 widening's extension filter admitted only .ts/.tsx/.mts under SITE_ROOTS and excluded the one scripts/ file most likely to carry provenance prose; the planted-range battery on record); THE COMMENT-TRUTH BATCH (S36-5 — the S35-5 arithmetic 13→14 of 29 (the old pin covered the first-11 prefix + the 4-entry chunk = 15 of 29, so 14 were unpinned, and the narrative contradicted its own 11+4), the "300+" corpus magnitude re-anchored to the real numbers (~160 docs/tests/root files PLUS the 3,100-file skills/ catalog — 92% of the non-src tree; the original figure matched no countable corpus), the "plus uploads" qualifier restored (29 loop entries vs next.config's 28), and the nine-blocks/ten-cites wording (login-reset:106 covering :114)); THE HYGIENE BATCH (S36-6 — the VALIDATION envelope-code pin (the digma-measured wire, the planted-BAD_REQUEST battery on record), the cn() seam spec closing PAD §8.3's last uncovered module (+1 file: clsx passthrough + tailwind-merge precedence), the two limiter summaries completed to all six fifteen-minute buckets (forgot 10 / reset 10 joined)); counts 665/39 (+3) + 65/9, badge 730; captures 79/80; push #36 |

## Appendix B — The Verification Ledger (session-2 ship; re-certified through session 36)

- Gate: lint 0/0 · tsc 0 · unit 665/665 (39 files — the property suite
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
  at session 13; the from-url escape pins, the equalizer auth-contract
  pins, the guests-allowed wiring pin, the password-ceiling pin, the
  toast focus-ring pin, and the inclusive-boundary pin at session 14;
  the resend-P2025 sibling pin, the null-body vocabulary pins, the
  signin-icon pin, and the hamburger focus-ring pin at session 15; the
  parse-body non-object pin, the three schema field-type pins, and the
  contact object-guard source pin at session 16; the census-depth
  recursive scan, the anti-dodge decoy battery, and the seo-surfaces
  suite at session 23; the Appendix-B unit-count pin, the e2e-census
  depth, and the seo body-completion batch at session 24)
  · build · smoke 16/16 · e2e
  65/65 (9 specs — the reset-funnel e2e joined at session 12; the
  from_url round-trip legs at session 13; the protocol-relative-escape
  leg at session 14; the api-envelope 404 leg at session 15, its
  bare-/api extension at session 16, its OPTIONS closure at
  session 18; the description-family leg at session 19; the og-dims fold + the authed-/login and reset-banner superset legs at session 31) — all
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
  manifest/404-noindex). Session 14's re-walk: the reference live
  (logged-in → /Home, the mobile menu at 390×844 — 5 destinations,
  auto-close, the no-aria hamburger; /Tool's hard-nav title + og:title
  + canonical + the 170-char description — no drift since session 13)
  and the clone's dev server (hydration clean, the menu open/close,
  Escape WITH the focus return, navigate + auto-close + the title, the
  from_url round-trip + the foreign-origin fallback — and the
  protocol-relative escape LIVE-CONFIRMED pre-cure: the sign-in landed
  on https://evil.com, then closed post-cure at the e2e layer).
  Session 15's re-walk: the reference live (logged-in → /Home, the
  mobile menu at 390×844 — 5 destinations, auto-close, the no-aria
  hamburger byte-identical to the clone's base classes; /Tool's
  hard-nav title + og:title + the 170-char description + the root
  canonical — no drift since session 14) and the clone's dev server
  (hydration clean, the menu open/Escape WITH the focus return,
  navigate + auto-close + the derived title, the from_url=/Tool
  round-trip, the protocol-relative escape regression — lands on /
  post-cure, sitemap/robots/manifest, and the S15-2/S15-7 pre-cure
  live confirmations on the dev API).

  Session-19's re-walk: the reference live (logged-in → /Home, the
  mobile menu at 390×844 — the no-aria hamburger, 5 destinations,
  auto-close; the FIVE-ROUTE head census — og:title/og:url/canonical
  unchanged, but the DESCRIPTION FAMILY CHANGED: /Tool /Pricing
  /Contact now ship the prefixed "<Page> on ViralPost AI. " + the
  70-char truncated tail on meta/og/twitter alike, / and /login keep
  the plain paragraph; the landing's monetization section REDESIGNED
  EN with ten floating icons; sitemap/robots unchanged) and the
  clone's dev server post-cure (the prefixed family byte-matching on
  /Tool /Pricing /Contact, the EN monetization section structure
  matching — section classes, the ten floaters at their pinned
  positions, both Gumroad CTAs, the trust line — and the float
  animation live-sampled in the observed envelope; the menu family
  re-verified; the /login plain family intact). Two drifts cured
  same-round (S19-1, S19-2).

*End of skill. Produced by following the six-phase distillation process
(to-distill-project-into-skill + distill-codebase-skill) over the
session-1 build and the session-2 audit.*
