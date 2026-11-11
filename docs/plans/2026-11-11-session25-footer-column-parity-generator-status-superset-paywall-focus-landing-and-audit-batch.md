# Session 25 — The Footer-Column Parity + The Generator-Status Superset + The Paywall Focus + The Landing Dedup + The Audit Batch (2026-11-11)

## Context

Session 24 pushed `939358a`; the owner added `20c8468` (the session-24
round log held as `docs/session_25.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs
review → baseline gate → the comprehensive audit (three parallel
subagents) → the neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since
session 12 — the recorded decisions stand) → the live reference parity
walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
613/613 (38 files) · `.env`'s `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root (pushed + seeded, census MATCH) · vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in
place and current ✓ · sitemap.xml / robots.txt / manifest / OG family
verified live against the reference ✓ · `skills/` excluded from every
gate (tsconfig/eslint/vitest, all explicit) ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/1M/2L/7I · AUDIT-2: 0C/0H/2M/5L/2I · AUDIT-3:
0C/0H/2M/5L/4I** — combined **0 Critical / 0 High / 5 Medium / 12 Low /
13 Info** at the subagent reports. The lead's adjudication holds the
five Mediums in the working register (all verified in source, all
cured this round), moves the reference-inherited text-ink family
(AUDIT-2-6) and the UA-default focus posture on reference-owned link
families (AUDIT-2-7) to the accepted register (the parity doctrine —
the house cures NON-TEXT contrast on house-owned arms and leaves the
reference's own extracted classes byte-identical; documented below),
and carries the standing accepted register (the in-app-delivery
posture S13-1, the offscreen-rAF pause, the particle resize churn,
the admin-bootstrap race, the Reveal no-JS trade-off, the oklab
family, the E2E_PORT NaN theoretical, scryptSync's documented
single-node posture, the stateless-logout design note, the
parseInt fail-closed quirk, the manifest 192/512 declared-sizes
reference parity, the documented login-views type-annotation
tautology) unchanged.

**The parity walk (live, both sides, logged into the reference):** the
head census (title/description/og/twitter/canonical) — NO DRIFT (the
session-19 description family holds byte-for-byte). The mobile-menu
control census at 390×844 — the pill text "Upgrade to Pro – $19" + the
bare pill classes + the bare link family + the Gumroad href ALL
byte-identical (the session-22 re-anchors hold). The hamburger aria
family remains ABSENT on the reference (the session-23 superset stance
stands). The desktop nav family (the underline `after:` family + the
active/inactive splits) — NO DRIFT. The landing heading tree —
identical (all 21 headings, same order). Sitemap.xml + robots.txt —
identical (origin-difference only). The clone's generator round-trip
green; Escape-close with focus return live-verified.
**ONE DRIFT: the footer's Product column** — the reference ships
Home / Tool / Pricing (3 links; live-censused 2026-11-11, and the
dossier `docs/reference-investigation.md` §"footer" has recorded
exactly that family since session 1); ours maps ALL FOUR NAV_ROUTES
(Contact included — shipped since session 1, never censused
side-by-side until this round). S25-1 below.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S25-1 | **MEDIUM** (parity) | `src/components/marketing/footer.tsx:52` | The footer's Product column maps all four `NAV_ROUTES` — Contact included — while the reference's footer ships Home/Tool/Pricing only (live-verified both sides this round; the dossier has recorded the 3-link family since session 1). The navs (desktop + mobile) correctly keep all four; the footer is its own surface. The extra link is a parity drift shipped since session 1 — the footer column was never in the side-by-side census set until now. |
| S25-2 | **MEDIUM** (a11y, WCAG 2.2 AA 4.1.3) | `src/components/marketing/generator-card.tsx:79,92,100-124,129-131,170-207` | The generator card — the app's core surface — announces NONE of its async success states: the generated-post card mounts silently (`setPost`, :79), the Copy confirmation is a button-label swap only (`Copy` ⇄ `Copied!`, :189-199 — the exact form the S24-3 comment calls out as not re-announced by AT), the quota counter text mutates unannounced (:129-131), and the free-limit paywall swap replaces the whole card silently (:100-124). Error paths ARE announced (toast `role="alert"`). The S24-3 genus, one file over — the very file the round's cure was patterned on. (AUDIT-2 A2-M1.) |
| S25-3 | **MEDIUM** (a11y, WCAG 1.4.11) | `src/lib/page-layout.ts:53` + `src/lib/login-reset.ts:114,186` (rendered on /login, /signup, /reset-password) | The auth input constants carry `focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2` — slate-400 (#94a3b8) computes ≈2.57:1 against the white card + white ring-offset, under the 3:1 focus-indicator floor. The same constants' SUBMIT buttons correctly carry `focus-visible:ring-ring` (≈14:1). The last surviving member of the sub-3:1 focus family the S23-3/S24-4 rounds eliminated. (AUDIT-2 A2-M2.) |
| S25-4 | **MEDIUM** (correctness/SEO) | `src/lib/site.ts:47-62` + `src/lib/boot-env.ts:80-106` | `siteUrl()` accepts any absolute http(s) URL — including a query/hash/userinfo-carrying one (`https://example.com?utm=1&x=2` parses with pathname `"/"`, so the boot gate's `pathCarrying` check passes silently). The query then rides unescaped into every surface the seam feeds: the sitemap interpolates a raw `&` into `<loc>` (invalid XML, served 200), and og:url/twitter:url/canonical/manifest icons compose the garbage path. The F10-11 malformed-input family's own blind spot. (AUDIT-1 A1-M1.) |
| S25-5 | **MEDIUM** (pin doctrine) | `tests/auth.test.ts:5-26` vs `tests/password-seam.test.ts:24-46` | The four password-hashing behavioral faces (round-trip, wrong-password rejection, unique salts, malformed-hash rejection) are pinned twice with near-identical bodies — once via the `@/lib/auth` re-export, once via the seam. The re-export WIRING face is already source-pinned in password-seam (:118-124). Violates the exactly-one-pin doctrine (AGENTS:100); session-24's "doctrine restored" claim (S24-9) was overbroad — this older duplicate survived. (AUDIT-3 A3-M1.) |
| S25-6 | **MEDIUM** (pin coverage + comment-truth) | `tests/seo-surfaces.test.ts:173-192` vs `src/app/layout.tsx:31-37` | The S24-11 og-dims pin asserts the `site.ts` literal + the asset IHDR — but the ROOT LAYOUT declares its own `openGraph.images` block (multiline literal, unseen by the `toContain`), and the landing `/` — the most-shared URL — takes its OG family from the LAYOUT, not `pageMetadata()`. A dims edit in layout.tsx ships green through every layer; the pin's "both directions" claim is half-true. (AUDIT-3 A3-M2.) |
| S25-7 | **LOW** (React 19 + comment-truth) | `src/components/ui/toast.tsx:32,39` | The S24-5 cure declared the module-level `EMPTY_TOASTS` — but the store's own `let toasts: ToastItem[] = []` (:32) is a DIFFERENT array object. At hydration `getSnapshot()` returns the `[]` literal while `getServerSnapshot()` returns `EMPTY_TOASTS`; `Object.is` fails → React still forces the one post-hydration re-render the S24-5 ledger lists as cured. Only the dev-console `===` warning was truly fixed. The store only ever REASSIGNS (`toasts = toasts.filter(...)`, `toasts = [...toasts, item]`) — never mutates — so seeding from the const is safe. (AUDIT-2 A2-L3.) |
| S25-8 | **LOW** (a11y, WCAG 4.1.3 edge path) | `src/app/error.tsx:50-78` + `src/app/global-error.tsx:45-79` | Both error boundaries render their crash card as a plain div/h1/h2 tree — no `role="alert"`, no focus move. When an uncaught error swaps the page, AT users get silence (focus stays on the removed content). The house family (`ErrorCallout` role="alert", toast alerts) speaks the idiom; the boundary cards predate it. (AUDIT-2 A2-L4.) |
| S25-9 | **LOW** (a11y, WCAG 1.4.11) | `src/components/ui/toast.tsx:191` | The dismiss glyph rests at `text-subtle` (#94a3b8 = 2.57:1 on the white card) — the icon-only control's visible glyph sits under the 3:1 graphical-object floor in its resting state (hover lifts it to neutral-900). The toast's own description text already uses `text-muted` (#64748b, 4.76:1). (AUDIT-2 A2-L5.) |
| S25-10 | **LOW** (comment-truth) | `tests/docs-counts.test.ts:26-87` | The count ladder narrates s8→s23 (ending "s23: 606/38") — the s24 row (606→613, +8 pins −1 retired face) was never appended, despite the header's own same-commit rule and despite session-24 re-anchoring every constant and doc site. The count-gate's own memory is one session behind. (AUDIT-3 A3-L3.) |
| S25-11 | **LOW** (pin quality) | `tests/docs-counts.test.ts:206-207,214-215` | `skill.slice(skill.indexOf("## Appendix B"))` — when the header is missing, `indexOf` returns −1 and `slice(-1)` yields the file's LAST CHARACTER (truthy), so the `expect(appendixB, "Appendix B must exist").toBeTruthy()` guard can never fail. The following `toContain` arms carry the real protection, but the existence guard is decorative — a literal instance of "a pin that cannot fail is vacuous" inside the flagship count-gate. (AUDIT-3 A3-L6.) |
| S25-12 | **LOW** (pin doctrine) | `tests/http-headers.test.ts:88-104` vs `tests/seo-surfaces.test.ts:35,99,163` | The content-type faces of sitemap.xml/robots.txt/manifest.json are each owned by TWO pins: the session-8 SOURCE-literal guards and the session-23/24 RUNTIME body contracts (strictly stronger — they GET the route and assert the served header). An intentional content-type change trips both suites. (AUDIT-3 A3-L5.) |
| S25-13 | **LOW** (maintainability, the S24-8 genus) | `src/app/(site)/page.tsx:42-53` vs `src/app/(site)/Contact/page.tsx:27-38` | The landing's contact section hand-inlines the identical `id="contact"` block the /Contact page renders — exactly the duplication genus S24-8 cured for pricing. Zero today; the next contact-surface cure applies in two places. (AUDIT-2 A2-L8.) |
| S25-14 | **LOW** (seam discipline) | `src/lib/generator.ts:25,27` + `src/components/marketing/generator-card.tsx:18` | `generator.ts` imports node `crypto` (for `ideaSeed`) yet the CLIENT card imports `FREE_LIMIT` from it — dragging the node builtin into the client module graph. Green today only via bundler tolerance; any future client import of a hash-touching export breaks the build. The house doctrine marks client-safe libs zero-import; `generation-counter.ts` (the quota module, zero imports) is FREE_LIMIT's natural home. (AUDIT-1 A1-L2.) |
| S25-15 | **LOW** (a11y, WCAG 2.4.3 — the S19-10 genus) | `src/components/marketing/generator-card.tsx:100-124` | The free-limit paywall swap UNMOUNTS the focused control (the textarea / Generate button) — focus falls to `<body>` and the next Tab starts at the document top. The login card's S19-10 focus map cures exactly this genus for view swaps; the generator's card swap is the uncured sibling. The mount-settle path (a returning limited-out user) must stay silent — only an in-session swap (a completed 3rd generation) takes focus. |
| S25-16 | **LOW** (a11y, WCAG 2.4.3) | `src/components/marketing/navbar.tsx:176-191` | The mobile menu's link-click path closes the panel via `onClick={() => setOpen(false)}` — the panel becomes `display:none`, unloading the focused link; focus falls to `<body>` and the soft navigation does not relocate it. The Escape path returns focus to the toggle (:89); the click path has no counterpart. Post-navigation Tab resumes at the document top. (AUDIT-2 A2-L9.) |
| S25-17 | **INFO** (coverage) | `tests/e2e/seo.spec.ts:19-31` | og:url / twitter:url runtime absoluteness is unpinned on the rendered DOM (canonical absoluteness IS pinned; the sitemap-loc family is pinned). One expect line inside the EXISTING e2e test — no count change — closes the residual. (AUDIT-3 A3-I3.) |
| S25-18 | **INFO** (hygiene batch) | `scripts/e2e-prune.ts:21-23,37-39` · `eslint.config.mjs` · `tests/a11y-controls.test.ts:182,193` · `viralpost-ai_SKILL.md:508-531` | (a) e2e-prune's manual-run target (the DEV db, not e2e.db) is undocumented — one comment line; (b) its `$disconnect` is fire-and-forget (`void`) while the seed awaits — the idiom divergence; (c) the eslint config runs with ~25 correctness rules off (the type gate + census pins own correctness) — the posture is undocumented in the config header; (d) a11y-controls' S22-11 test asserts the skip-link face its comment says the S23-3 pin below owns — the ownership claim is not true; (e) the SKILL's Appendix A round-history rows are scrambled around the s18 insertion point (1-7, 18-24, then 17-8). (AUDIT-1 A1-I4/I5 · AUDIT-3 A3-L4/L2/A3-I2.) |

**Accepted register (adjudicated this round, with reasons):** the
reference-inherited text-ink family (slate-400/500 copy at sub-4.5:1 —
AUDIT-2-6): the parity doctrine wins for the reference's own extracted
classes; the house cures NON-TEXT contrast (focus rings, glyphs) on
house-owned arms (S23-3, S24-4, S25-3, S25-9) and leaves text ink at
parity — an owner-level call if ever revisited. The UA-default focus
posture on reference-owned link families (AUDIT-2-7): 2.4.7 passes via
browser defaults (nothing strips outlines); adding house arms to
LINK_BASE/MENU_LINK_BASE would break the byte-parity pins on the
reference's own link classes — the same parity-wins adjudication. The
standing register (S13-1 in-app-delivery, offscreen-rAF, particle
resize churn, admin-bootstrap race, Reveal no-JS, oklab family,
E2E_PORT NaN, scryptSync, stateless logout, parseInt fail-closed,
manifest declared sizes, login-views tautology) carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the parity cure:**
- **S25-1**: footer.tsx's Product column maps
  `NAV_ROUTES.filter((r) => r.id !== "contact")` with a WHY-comment
  (the reference's 3-link family, dossier-recorded); the navs keep all
  four. Pin (landing-page.test.ts, the footer describe): the filtered
  form present + the bare `{NAV_ROUTES.map` form BANNED in footer.tsx.
  Mutation battery: revert the filter → the pin REDs.

**Batch 2 — the a11y superset cures:**
- **S25-2**: two sr-only `role="status" aria-live="polite"` nodes ride
  the generator card ABOVE the limit branch (present in the DOM before
  every flip — the S24-3 doctrine): node A carries the generation/limit
  text ("Post generated — N free generations remaining today." /
  "Daily free limit reached — upgrade to keep generating."), node B the
  copy confirmation ("Copied to clipboard." — clears to empty on the 2s
  reset, and empty text is not announced). Pin (a11y-controls.test.ts).
  Mutation battery: drop node A → RED.
- **S25-3**: the three input constants upgrade
  `focus:ring-slate-400` → `focus:ring-slate-600` (#334155 ≈7.5:1; the
  S24-4 in-place upgrade form — deterministic, no variant-cascade
  fragility, resting classes untouched); the login-reset DOM-record
  comments co-note the superset deviation. Pin (a11y-controls.test.ts):
  the sub-3:1 form BANNED in all three constants + the AA form present.
  Mutation battery: plant slate-400 → RED.
- **S25-8**: `role="alert"` on both boundary cards' root. Pin
  (error-boundaries.test.ts). Mutation battery: drop → RED.
- **S25-9**: the dismiss glyph `text-subtle` → `text-muted`. Pin
  (toast-anatomy.test.ts). Mutation battery: revert → RED.
- **S25-15**: the paywall heading gains `tabIndex={-1}
  data-view-focus` + a transition-guarded focus effect (the S19-10
  idiom, prev-limit ref; a `generatedThisMount` ref keeps the
  mount-settle path silent — only an in-session swap lands focus). Pin
  (a11y-controls.test.ts).
- **S25-16**: the mobile-menu link click focuses the toggle before
  closing (the Escape path's counterpart). Pin (a11y-controls.test.ts —
  the existing `menuButtonRef.current?.focus()` regex gains its second
  call site, asserted by count).

**Batch 3 — the correctness cures:**
- **S25-4**: `siteUrl()` treats a non-bare origin (any
  username/password/search/hash) as malformed → the F10-11
  `DEFAULT_SITE_URL` fallback; `boot-env`'s shape check extends to
  query/hash (the operator warning). Pins: page-titles' siteUrl
  describe gains the query/hash/userinfo cases; boot-env gains the
  warning arm. Mutation battery: remove the guard → RED.
- **S25-7**: `let toasts: ToastItem[] = EMPTY_TOASTS;` (the store only
  reassigns — verified). Pin (toast-anatomy.test.ts): the S24-5 pin
  extends to ban the bare `let toasts: ToastItem[] = []` form. Mutation
  battery: revert → RED.

**Batch 4 — the pin-doctrine cures:**
- **S25-5**: retire auth.test.ts's "password hashing" describe (−4
  tests; password-seam owns the faces, the wiring is source-pinned
  there).
- **S25-6**: `site.ts` exports `OG_IMAGE` (the frozen 1200×630
  literal); the root layout consumes `images: [OG_IMAGE]`; the
  seo-surfaces og-dims pin extends to both the const and the layout's
  consumption. Mutation battery: point the layout at a different
  literal → RED.
- **S25-10**: the count-ladder gains the s24 row (606→613).
- **S25-11**: the Appendix-B guards become
  `expect(skill.indexOf("## Appendix B")).toBeGreaterThanOrEqual(0)`.
  Mutation battery: rename the header in a scratch copy → RED (the
  toBeGreaterThanOrEqual form; the slice form stays for the content
  arms).
- **S25-12**: retire the http-headers content-type trio (−3 tests;
  seo-surfaces' runtime pins own the faces — verified to assert the
  exact served header incl. the no-charset negative before retiring).
- **S25-17**: the e2e seo spec's existing test gains the og:url +
  twitter:url absoluteness expects (inside the current block — no count
  change).
- **S25-18d**: drop a11y-controls' redundant skip-link assertion (the
  S23-3 pin below owns the face).

**Batch 5 — the maintainability cures:**
- **S25-13**: `ContactSection` extraction in sections.tsx (the
  PricingSection pattern); both pages render it; the landing-page
  order pin co-updates in the same commit.
- **S25-14**: `FREE_LIMIT` moves to `generation-counter.ts` (the
  client-safe quota module); generator.ts, generator-card.tsx,
  generator.test.ts, property.test.ts co-update; a boundary pin bans
  `@/lib/generator` imports from client components (the
  crypto-in-client-graph genus). Mutation battery: re-add the import →
  RED.
- **S25-18a/b/c/e**: the e2e-prune manual-run comment + awaited
  disconnect; the eslint posture comment; the SKILL Appendix A
  chronological re-sort.

**Batch 6 — the count re-anchor + docs lockstep:**
- Live count walk after the batches: the pins added/retired net out;
  UNIT / SUITES / E2E / badge re-anchored in docs-counts constants and
  every doc site (README/AGENTS/CLAUDE/PAD/SKILL) in the same commit;
  the census walked RED-to-GREEN site by site.
- SKILL v1.20.0 → v1.21.0 (frontmatter, Appendix A's session-25 row,
  Appendix B both counts); the session-25 plan's post-execution
  record; worklog Task 25; `docs/session_25.md` replaced with this
  round's log.

## Acceptance criteria

1. Every pin above ships RED-first with its mutation battery on record.
2. Full gate GREEN: lint 0/0 · tsc 0 · unit (re-anchored count) ·
   build · smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The parity drift cured: the footer Product column live-verified at
   3 links against the reference.
4. Captures taken on the dev server (the cured surfaces), PIL-verified,
   under `docs/screenshots/`.
5. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
6. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## Post-execution record

Executed as planned, with the mid-round deviations on record:

- **S25-3's pin tightened twice during the RED→GREEN walk**: the
  initial `not.toContain("focus:ring-slate-400")` ban tripped on the
  DOM-record comments (which legitimately spell the reference's own
  captured classes) — the ban now targets CLASS-STRING literals only
  (`/"[^"\n]*focus:ring-slate-400/`), and the S24-4 upgrade form is
  documented in login-reset's input docblock.
- **The generator-card restructure hit two of its own traps, both
  caught by the gates**: a TDZ ordering bug (the focus effect's dep
  array referenced `limitReached` before its declaration — moved the
  const above the effect) and a missing ternary close (tsc TS1005) —
  both fixed before any suite ran green.
- **S25-2's status node A collided with the e2e quota locator**
  (strict mode: "2 free generations remaining" matched both the
  visible span and the sr-only announcement) — the e2e assertion
  co-disambiguated with `{ exact: true }` in the same commit.
- **S25-6's S24-11 co-update**: the factory literal moved into the
  OG_IMAGE const, so the S24-11 declared-side assertion was co-anchored
  to the const's declaration (the S25-6 arm owns the consumption face —
  one face per pin preserved).
- **Two `/s` regex flags tripped the pre-es2018 tsc target** — replaced
  with `[\s\S]` character classes.
- **Playwright's chromium build was absent in the fresh sandbox** —
  `npx playwright install chromium` (environment setup, not a code
  change; the suite itself needed no alteration beyond the S25-2
  locator co-update).

**Final state:** lint 0/0 · tsc 0 · unit **620/620** (38 files; +14
pins − 7 retired) · build · smoke 15/15 · e2e **63/63** (9 specs) ·
census MATCH · badge **683**. Captures 57/58 PIL-verified; the cured
surfaces live-verified on the dev server (the footer's 3-link Product
column, the paywall's data-view-focus heading with the silent
mount-settle, the "Post generated — 2 free generations remaining
today." announcement). Docs lockstep: README + AGENTS + CLAUDE + PAD
(§12 rows + counts) + SKILL v1.21.0 (frontmatter, Appendix A's
session-25 row + the chronological re-sort, Appendix B both counts +
the session-25 re-certification) + worklog Task 25 + the session log.
Pushed to main via the SSH wrapper (dry-run first, key shredded
after).
