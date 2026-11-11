# Session 26 — The Mobile-Menu Cap Parity + The Busy-State Announcement + The Bar Open-Arm Retirement + The Pin-Doctrine Batch (2026-11-11)

## Context

Session 25 pushed `8856303`; the owner added `6a096fc` (the session-25 round
log held as `docs/session_26.md`, the established pattern). This round re-ran
the standing instruction against the merged tree: docs review → baseline gate
→ the comprehensive audit (three parallel subagents) → the neo-crm re-review
(HEAD `b3d0fbe`, UNCHANGED since session 12 — the recorded decisions stand) →
the live reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
620/620 (38 files) · `.env`'s `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root (pushed + seeded, census MATCH) · vitest
(`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in place
and current ✓ · sitemap.xml / robots.txt / manifest / OG family verified live
against the reference ✓ · `skills/` excluded from every gate
(tsconfig/eslint/vitest, all explicit) ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/1M/2L/2I · AUDIT-3: 0C/0H/3L/1I**
— combined **0 Critical / 0 High / 1 Medium / 6 Low / 5 Info** at the
subagent reports. The lead's adjudication holds the Medium and five of the
Lows in the working register (all cured this round — S26-1..S26-9 below),
and moves three subagent findings to the accepted register with reasons
(the 3rd-generation result discard is reference parity, e2e-pinned; the
h2-first auth views are best-practice tier, not WCAG A/AA; the vitest
exclude-replaces-configDefaults note is moot under the include scope). The
standing accepted register carries unchanged.

**The parity walk (live, both sides, logged into the reference):** the
five-route head census — NO DRIFT (the session-19 description family holds
byte-for-byte). The mobile-menu control census at 390×844 — the pill text +
bare classes + the bare link family + the Gumroad href ALL byte-identical
(the session-22 re-anchors hold); the hamburger aria family remains absent
on the reference (the session-23 superset stance stands); Escape-close with
focus return + link-click close with focus return (S25-16) + route-change
auto-close all live-verified on the clone. The desktop nav family —
byte-identical. The footer Product column — 3 links both sides (the S25-1
cure holds). Sitemap.xml + robots.txt — identical (origin-difference only).
The clone's generator round-trip — green, node A announcing "Post generated
— 2 free generations remaining today."
**TWO LIVE-CENSUSED DIVERGENCES on the mobile-menu surface (both cured this
round, see S26-1/S26-3):** (1) the reference's open panel computes
`max-height: none` — ours capped at `max-h-96` (384px) with `overflow-hidden`
and no scroll path; (2) the reference's bar stays `bg-transparent` with the
menu OPEN at scrollY=0 — ours keys its dark arm on `scrolled || open`.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S26-1 | **MEDIUM** (parity + a11y, WCAG 1.4.4 family) | `src/components/marketing/navbar.tsx:160-173` | The mobile-menu panel ships `max-h-96` (384px) + `overflow-hidden` with NO scroll path. The reference's open panel computes `max-height: none` (live-verified both sides this round — the class family `md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden` carries no max-h/opacity/transition anywhere; the reference UNMOUNTS the closed panel while ours keeps the `hidden` attribute, behaviorally equivalent). Our panel content computes ≈264px at 100% text size, so the cap is invisible today — but Safari/Chrome text-size scaling grows the rem-based `text-sm` links past 384px at ≈145%+, clipping the Contact link + the Upgrade pill with no way to scroll to them (the WCAG 1.4.4 reflow family; the axe battery cannot see zoom). The file's own comment (:153-159) calls the height/opacity classes "harmless dead classes… no transition can play" — true for the transition, FALSE for `max-h-96`: it is live as a hard layout cap whenever the panel displays. (AUDIT-2 A2-M1.) |
| S26-2 | **LOW** (a11y, WCAG 4.1.3 — the S24-3/S25-2 genus) | `src/components/marketing/generator-card.tsx:133-139` | The busy state is never announced: node A renders `""` during the pending window (`setPost("")` clears any prior result at :83, `limitReached` is false — the guard early-returns), and the button's `Generating…` label swap is exactly the "button label changes are NOT re-announced" form the S24-3 comment itself calls out. No `aria-busy`. AT users get zero feedback between clicking Generate and the result/error. Completion (node A) and failure (toast role=alert) ARE announced — only the start is silent. (AUDIT-2 A2-L1.) |
| S26-3 | **LOW** (parity + correctness) | `src/components/marketing/navbar.tsx:100-103` | The bar's dark arm keys on `scrolled || open` — but the live reference's bar stays `bg-transparent` with the menu OPEN at scrollY=0 (live-censused this round: open-menu + scrollY=0 → `bg-transparent`; scrolled 600px → `bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20`). The `|| open` half ships from session 1 and was never side-by-side censused against the reference's bar-with-menu-open state until this round. It is a visible parity drift on mobile (our bar darkens the moment the menu opens over the hero; the reference's stays transparent), AND its side effect paints the DESKTOP bar dark after a mobile→desktop breakpoint cross with the menu open (the panel + toggle go `md:hidden` but `open` stays true, so the unscrolled desktop page renders the scrolled arm). (AUDIT-2 A2-L2, live-refined by the lead's parity walk.) |
| S26-4 | **LOW** (pin quality) | `tests/landing-page.test.ts:288-307` | The S25-14 client-crypto boundary pin hardcodes a 13-file roster. A 14th client component importing `@/lib/generator` ships green through the pin; a deleted roster file fails loudly (ENOENT) but a NEW file is invisible. The repo's own docs-counts reality-census idiom (scan, never hardcode) is the cure. (AUDIT-3 A3-L1.) |
| S26-5 | **LOW** (one-declaration doctrine) | `src/lib/site.ts:192` + `src/app/layout.tsx:39` | The twitter images literals `"/og-image.png"` are hand-written in BOTH twitter blocks (pageMetadata's + the root layout's) — outside the `OG_IMAGE` const the S25-6 round just declared as the ONE dims declaration. An asset rename edited only in `OG_IMAGE.url` drifts both twitter cards to a stale path with a green gate (preview-card-only risk; the openGraph consumption IS pinned, the twitter families are not). (AUDIT-3 A3-L2.) |
| S26-6 | **LOW** (config-mechanics pin) | `tsconfig.json:46-57` · `eslint.config.mjs:57` · `vitest.config.mts:19` | The three-config skills-exclusion doctrine and the `**/*.mts` tsconfig include are comment-only — no test asserts any of the four mechanics (tsconfig include + exclude, eslint ignores, vitest exclude). Silent-regression surfaces with precedent: dropping `**/*.mts` re-creates the documented S18-5 silent gap (vitest.config.mts leaves `tsc --noEmit` green while a type error there surfaces only as a Vite runtime failure); dropping the eslint/vitest skills entries is likewise silent. (AUDIT-3 A3-L3.) |
| S26-7 | **LOW** (contract codification) | `prisma/seed.ts:18-20` + `scripts/e2e-prune.ts:27-29` | `PrismaClient` is constructed outside the sanctioned `src/lib/db.ts` site in two one-shot scripts — a deliberate posture (explicit datasource URL through the sanctioned `runtimeDatabaseUrl()` resolver, with in-file rationale), but the AGENTS.md contract wording says "only in src/lib/db.ts". The scripts CAN import the singleton (no next/headers transitive) but the explicit datasource form is the safer one-shot idiom (the engine's URL is pinned visibly at the construction site). Cure: codify the exemption in the contract wording AND pin the URL-seam-mandatory form for both scripts (the db-census pin's own idiom — it already bans `new PrismaClient` for census.ts specifically). (AUDIT-1 A1-L1.) |
| S26-8 | **LOW** (comment-truth) | `prisma/seed.ts:23-28` | The comment claims the update path "resets every seeded field" — but the update branch omits `avatarColor` (seeded at create as `"#14b8a6"`), and `photoUrl` is never seeded at all. No API surface mutates `avatarColor` today, so the drift is comment-vs-code only; it becomes real if an avatar-edit surface ever ships and the "pristine demo state" claim is relied on. (AUDIT-1 A1-I1.) |
| S26-9 | **LOW** (comment-truth + latent misroute) | `src/lib/db-path.ts:87-89` | The guard comment says "absolute or in-memory" — but the standard SQLite in-memory spelling `file::memory:` yields `ref = ":memory:"`, which does NOT start with `/`, so it falls through to the validated anchors and re-anchors to a literal `prisma/:memory:` file. No live caller (dev `.env` and e2e both use `file:../db/*.db`), so the impact is theoretical — but the comment misdescribes the code and the latent misroute is real. (AUDIT-1 A1-I2.) |

**Accepted register (adjudicated this round, with reasons):** the 3rd free
generation's result is discarded at the limit swap (AUDIT-2 A2-I1) — the
reference's own behavior, e2e-pinned as such in generator.spec.ts:68-73; a
superset cure (show the 3rd result above the wall, or defer the paywall to
the NEXT attempt) is an owner-level deviations-ledger decision, recorded
here for the ledger. The /signup and swapped auth views render h2-first
(AUDIT-2 A2-I2) — axe's heading-order rule is best-practice tier, the
wcag2a/2aa battery the house runs does not fail it, and the swap
focus-target doctrine (data-view-focus) already owns the AT path. The
vitest `exclude` replaces `configDefaults.exclude` note (AUDIT-3 A3-I1) —
moot under the include scope (`src|tests/**/*.test.ts` can never reach
dist/.git/coverage). The optional hardening notes (the `__Host-` cookie
prefix, per-route `no-store` on `/api/auth/me` — AUDIT-1) — beyond the
stated contracts; recorded for the owner. The standing accepted register
(the parity-doctrine text-ink + UA-default-focus adjudications, S13-1
in-app-delivery, offscreen-rAF pause, particle resize churn,
admin-bootstrap race, Reveal no-JS trade-off, oklab family, E2E_PORT NaN,
scryptSync single-node, stateless logout, parseInt fail-closed, manifest
declared sizes, login-views tautology) carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the mobile-menu parity pair (the round's parity cures):**
- **S26-1**: the panel's class family re-anchored to the reference's own:
  `md:hidden border-b border-white/10 overflow-hidden` + the S22-5 arm
  unchanged + `hidden={!open}` — the `transition-all duration-300`, the
  `max-h-96 opacity-100`/`max-h-0 opacity-0` arms, and the now-false
  "inert dead classes" comment RETIRED (the reference computes
  max-height:none; the panel grows with content — the WCAG 1.4.4 clipping
  cure and the class parity in one edit). Pin (a11y-controls.test.ts):
  the `max-h-96` form BANNED in navbar.tsx (class-string literal context)
  + the bare panel base present. Mutation battery: re-plant `max-h-96` →
  the pin REDs.
- **S26-3**: the bar's arm `scrolled || open` → `scrolled` (the
  reference's own key, live-verified transparent-with-menu-open). The
  desktop-cross artifact dies with the same edit (`open` no longer paints
  anything at md+ — the panel and toggle are both `md:hidden`). Pin
  (a11y-controls.test.ts): the `scrolled || open` form BANNED in
  navbar.tsx (string-literal context). Mutation battery: re-plant → RED.

**Batch 2 — the busy-state announcement (the round's a11y cure):**
- **S26-2**: node A gains the generating arm — the ternary chain
  `limitReached ? … : generating ? "Generating your post…" : post ? … : ""`
  (the pending window announces; the success/limit arms unchanged). The
  visible surface untouched (the button's own `Generating…` label is the
  visual arm — distinct string). Pin (a11y-controls.test.ts — a NEW it
  owning the busy arm; the S25-2 pin keeps the success/limit arms, one
  face per pin): the ternary form pinned. Mutation battery: drop the arm →
  RED.

**Batch 3 — the SEO one-declaration completion:**
- **S26-5**: both twitter blocks ride `OG_IMAGE.url`
  (site.ts:192 → `images: [OG_IMAGE.url]`, layout.tsx:39 →
  `images: [OG_IMAGE.url]`) — rendered output byte-identical, the
  rename-drift vector closed. The S25-6 pin (seo-surfaces.test.ts)
  extends to the two twitter consumption faces (co-pinned with the
  openGraph face, documented in the pin's comment). Mutation battery:
  revert one literal → RED.

**Batch 4 — the pin-doctrine batch:**
- **S26-4**: the client-crypto boundary pin's 13-file roster becomes a
  DISK CENSUS — scan src/ for files whose content starts with
  `"use client"` (the docs-counts reality-census idiom), assert each
  carries no `from "@/lib/generator"`. The floor assertion
  `≥ 13` documents today's census without failing legitimate growth.
  Same it() block — no count change.
- **S26-6**: type-gate.test.ts gains the config-mechanics pin —
  tsconfig's `**/*.mts` include + `"skills"` exclude, eslint's `skills`
  ignore, vitest's `skills/**` exclude (all four mechanics asserted from
  source). Mutation battery: plant a missing exclude in a scratch copy →
  RED (the S18-5 precedent's regression surface).

**Batch 5 — the contract + comment-truth batch:**
- **S26-7**: the AGENTS.md contract wording gains the one-shot-script
  exemption ("the app server constructs only via db.ts; one-shot scripts
  — seed, e2e-prune — construct directly through the sanctioned
  runtimeDatabaseUrl() resolver"); db-census.test.ts gains the pin: both
  scripts' `new PrismaClient` construction must carry
  `datasources: { db: { url: runtimeDatabaseUrl() } }` (the
  URL-seam-mandatory form). Mutation battery: point a script's datasource
  at a bare env read → RED.
- **S26-8**: the seed's update branch gains `avatarColor: "#14b8a6"` +
  `photoUrl: null` — the comment's "resets every seeded field" claim
  becomes true (the full pristine reset).
- **S26-9**: the db-path guard gains the `:memory:` pass-through arm
  (`ref.startsWith(":memory:")`) and the comment keeps its
  "absolute or in-memory" wording TRUTHFULLY. Pin (db-path.test.ts):
  `resolveDatabaseUrl("file::memory:")` returns the raw URL.
  Mutation battery: remove the arm → RED.

**Batch 6 — the count re-anchor + docs lockstep:**
- Live count walk after the batches: UNIT 620 → 626 (+6 new pins:
  S26-1, S26-2, S26-3, S26-6, S26-7, S26-9), SUITES 38 unchanged, E2E 63
  unchanged, badge 683 → 689; the PAD §12 rows re-anchored (navbar loses
  lines to the retirement); the census walked RED-to-GREEN site by site.
- SKILL v1.21.0 → v1.22.0 (frontmatter, Appendix A's session-26 row);
  the session-26 plan's post-execution record; worklog Task 26;
  `docs/session_26.md` replaced with this round's log. README (badge,
  gate line, the session-26 row), AGENTS (counts, the plans map's
  twenty-sixth round), CLAUDE (counts), PAD (§12 rows, counts) in the
  same commit.

## Acceptance criteria

1. Every pin above ships RED-first with its mutation battery on record.
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 626/626 (38 files) · build ·
   smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The two live-censused divergences cured and re-verified live on the dev
   server: the open panel computes max-height none (the cap retired), the
   bar stays transparent with the menu open at scrollY=0.
4. The busy window announces "Generating your post…" (live-verified).
5. Captures taken on the dev server (the cured surfaces), PIL-verified,
   under `docs/screenshots/`.
6. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
7. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## Post-execution record

Executed as planned, with the mid-round deviations on record:

- **The plan's count projection was +6 pins (626); the executed count is
  +9 (629)** — S26-6 shipped as FOUR its (one per config mechanic: the
  .mts include, the tsconfig skills exclude, the eslint skills ignore,
  the vitest skills exclude) rather than the single composite pin the
  plan sketched. Four independent faces, four independent mutation
  batteries — the exactly-one-pin doctrine's spirit (one face, one
  RED), one count difference from the plan's arithmetic.
- **S26-6 surfaced and cured a LATENT BUG in type-gate's shared
  stripper**: the regex block-comment pass treated the `/*` inside
  tsconfig's glob strings (`"@/*"` in paths) as a phantom comment OPEN
  and swallowed everything to the next `*/` — the include array
  vanished from the stripped view (the mts pin REDed against a
  correct tsconfig; the strict/exclude pins had survived only because
  they sit outside the swallowed span). Root cause fixed in place: the
  stripper is STRING-AWARE now (a small state machine tracking
  in-string state, escaped quotes passed through). All pre-existing
  pins re-run green against the fixed stripper.
- **Two pin-drafting trips, both caught by the RED run and fixed in the
  pin's own discipline**: the S26-1/S26-3 ban arms initially
  false-positived on the cure's OWN comments (the comment text spelled
  the retired forms in literal-adjacent positions) — the comments were
  reworded per the S25-3 precedent (comments may spell retired forms
  only when they cannot false-positive the literal-context bans).
- **S26-3's cure collapsed to the arm retirement alone**: the plan
  sketched a matchMedia listener as one option; the live reference
  census showed the reference's own bar keys on `scrolled` alone, so
  removing the `|| open` half is BOTH the parity cure and the
  desktop-cross cure (the stale-open state at md+ no longer paints
  anything visible — matching the reference's own rotate behavior). No
  listener needed.
- **Appendix A's tail inversion (23, 25, 24 — the session-25 S25-18e
  re-sort's residue) was fixed in the same commit** — the rows run
  23 → 24 → 25 → 26 chronologically now.

**Final state:** lint 0/0 · tsc 0 · unit **629/629** (38 files; +9
pins) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH ·
badge **692**. Captures 59/60 PIL-verified; the cured surfaces
live-verified on the dev server (the panel's max-height:none + height
265 + the transparent bar with the menu open at scrollY=0; the busy →
success → limit announcement sequence; the paywall's data-view-focus
landing). Docs lockstep: README + AGENTS (counts + the db-path
exemption wording + the plans map's twenty-sixth round) + CLAUDE + PAD
(§12 rows + counts) + SKILL v1.22.0 (frontmatter, Appendix A's
session-26 row + the chronological tail fix, Appendix B both counts +
the session-26 re-certification) + worklog Task 26 + the session log.
Pushed to main via the SSH wrapper (dry-run first, key shredded
after).
