# Session 29 — The Logout Session-Gate + The Shared Shape-Guard + The Head-DOM SEO Superset + The Wiring Pins + The Audit Batch (2026-11-11)

## Context

Session 28 pushed `fd6c75b`; the owner added `edde18f` (the session-28
execution log held as `docs/session_29.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs review
→ baseline gate → the comprehensive audit (three parallel subagents) → the
neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
636/636 (38 files) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ · the
vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`) suites in
place and current ✓ · the sitemap/robots/manifest/OG family verified live
against the reference ✓ · `skills/` excluded from every gate (tsconfig/
eslint/vitest, all pinned) ✓ · `.env.example` present, committed, matching
the six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/4L/3I · AUDIT-2: 0C/0H/0M/2L/6I · AUDIT-3:
0C/0H/0M/2L/4I** — combined **0 Critical / 0 High / 0 Medium / 8 Low /
13 Info** at the subagent reports. The lead's adjudication takes five Lows
plus two Info hardening items into the working register (all cured this
round — S29-1..S29-8 below); the rest moves to the accepted register with
reasons (see below). Notable adjudications: the logout CSRF (A1-L1) is the
round's lead cure — the only ungated side-effecting route in the tree; the
generate vocabulary's S16-1 exemption family closed at S28-3 leaves the
triplicated guard as a divergence hazard with a demonstrated drift history
(A1-L2); the og:image/twitter:card rendered-DOM gap (A3-L1) is the
most-shared URL's unpinned face; the sub-AA tone family (A2-L1) was
re-adjudicated AGAINST a cure with fresh live evidence captured this walk
(byte-identical classes on the reference — see the parity walk record).

**The parity walk (live, both sides, logged into the reference):** the
mobile-menu control census at 390×844 — the hamburger base classes
(`md:hidden p-2 text-slate-300`; ours + the documented S15-8/S23 superset
arms; the reference's aria family ABSENT — the documented superset
stands), the four mobile links + the Gumroad pill ("Upgrade to Pro – $19",
the bare mobile class family) byte-identical, the open panel's
`max-height: none` + `overflow: hidden` + computed-transparent background
both sides (the reference's dead `bg-slate-900/98` vs our S22-5 arm — both
rendering transparent at scrollY=0), the bar's `bg-transparent` with the
menu open at scrollY=0 (the S26-3 cure holds), the scrolled-bar class
family byte-identical with the computed background the same color in its
two spellings (ours `oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the
session-28-verified conversion of the reference's
`rgba(15, 23, 42, 0.95)`), the five-route head census — NO DRIFT (titles,
og:title, og:description, meta description, twitter:card byte-identical;
canonical + og:image differ by origin only, og:image being the documented
D-4 self-hosted stand-in over the reference's platform supabase render),
the footer social family (our documented real-links superset over the
reference's five dead `#` stubs), the desktop nav family — byte-identical
(all four underline-family links + the desktop pill + the bar class),
sitemap.xml + robots.txt — identical modulo origin, and the pricing sub-AA
family live-captured for the A2-L1 adjudication (the reference ships
`text-lg font-bold text-slate-400`, `text-sm text-slate-400`, and
`text-teal-100/70 text-xs` byte-identical — class-for-class our own).
**NO DRIFT FOUND — the third consecutive fully-clean walk.**

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S29-1 | **LOW** (the CSRF-logout class — the round's lead cure) | `src/app/api/auth/logout/route.ts:6-16` | The family's CSRF defense (api.ts's content-type gate: a Content-Type not carrying application/json is unparseable-by-policy) blocks cross-site simple-form POSTs on every JSON-parsing route — including every cookie-*minting* auth route. `logout` is the ONLY side-effecting route a classic `<form method="POST">` can successfully hit: no body is read, so no gate fires, and the response's `Set-Cookie` (maxAge 0) clears the victim's session regardless of SameSite=Lax (which gates cookie SENDING, not SETTING). No UI call site exists (the navbar is purely marketing); the route's only consumers are smoke leg 12 + the e2e session spec, both WITH a session — the cure keeps them green. (AUDIT-1 A1-L1.) |
| S29-2 | **LOW** (the divergence hazard, already bitten once) | `src/lib/api.ts:230` + `src/app/api/contact/route.ts:41` + `src/app/api/generate/route.ts:87` | The malformed-shape guard (`raw === null \|\| typeof raw !== "object" \|\| Array.isArray(raw)`) exists in THREE byte-identical copies. The copies have already drifted historically: contact widened in S16-1, generate only in S28-3 — twelve sessions during which the same malformed body got different messages on sibling routes. The S23-7 genus ("a future edit to one copy silently forks the seam's faces"). (AUDIT-1 A1-L2.) |
| S29-3 | **LOW** (the family-idiom deviation) | `src/components/marketing/generator-card.tsx:90` | `const body = (await res.json()) as GenerateResponse;` — no `.catch`. Every sibling surface (login-card ×5, reset-password-screen, contact-form) parses with `await res.json().catch(() => null)`: a non-JSON error body (a proxy/CDN 502 HTML page) throws into the outer catch and renders the network-error toast, never reaching the generation-failed arm (`body.error?.message`). Settled either way (the button recovers), but the failure message is misleading for a server-side failure and inconsistent with the family. (AUDIT-2 A2-L2.) |
| S29-4 | **LOW** (comment-truth) | `src/lib/schemas.ts:41-56` | loginSchema's S21-18 comment claims the malformed-email and unknown-account faces share the 401 INVALID_CREDENTIALS shape — true for format-failing emails (no regex in loginSchema), but `emailField`'s shared 160-char cap answers a THIRD vocabulary (400 "Email must be reasonably sized") on a FOURTH status for an over-length email. No enumeration oracle exists (signup/forgot cap identically — no account can carry such an email); the comment just overstates. (AUDIT-1 A1-L4.) |
| S29-5 | **LOW** (the unpinned rendered-DOM face) | `tests/e2e/seo.spec.ts:19-45` | No test at ANY layer asserts that `meta[property="og:image"]` or `meta[name="twitter:card"]` actually RENDER in served HTML — the OG image is pinned only at the metadata-object level and the asset level (IHDR), never the served head. Inner-route canonicals (`/Tool`, `/Pricing`, `/Contact`) are DOM-asserted only as the object's `alternates.canonical`. A framework-level metadata rendering change would ship green while the most-shared URL's preview card degrades. Cure: fold the og:image + twitter:card arms into the existing home-head test + one `/Tool` canonical leg (the S18-2/S25-17 in-place precedent, NO count change). (AUDIT-3 A3-L1.) |
| S29-6 | **LOW** (the unwired-operator-path census gap) | `package.json:12-14` + `tests/gate-script.test.ts` | The `db:push` script routes through `scripts/prisma-env.ts` specifically to defeat bun's `.env` absolutization of the relative `file:` URL (the R-1 founding hazard — wrong-DB creation outside the repo). No test pins that wiring: a revert to a raw `prisma db push` ships green through every layer and the wrong-DB hazard returns silently. `db:seed`'s `prisma/seed.ts` mapping is likewise unpinned (db:census IS pinned — db-census.test.ts:78). (AUDIT-3 A3-L2.) |
| S29-7 | **INFO→cure** (the asset↔manifest contract asymmetry) | `src/app/icon.png` + `src/app/apple-icon.png` + `tests/seo-surfaces.test.ts:167` | The og-image dims are pinned both directions (S24-11 IHDR read) — but the icon family is NOT: an icon asset swap shipping a 64×64 file would pass every layer (only the 200 + image/png contract is pinned, e2e S22-14) while the manifest still declares 192/512 and apple-icon's 180 expectation floats. (AUDIT-3 A3-I1.) |
| S29-8 | **INFO→cure** (the docs/hygiene batch) | `CLAUDE.md:74` + `.gitignore:47-49` | CLAUDE's "`force-dynamic` on every data route" read literally would have an agent flip the three deliberately `force-static` SEO routes (sitemap/robots/manifest — the build-time NEXT_PUBLIC_SITE_URL inlining posture) and break the documented inlining. The `.gitignore` files `tests/e2e/.auth/` under the `# editor` heading instead of `# playwright`. (AUDIT-3 A3-I2 + A3-I3.) |

**Accepted register (adjudicated this round, with reasons):** the sub-AA
tone family (A2-L1 — RE-ADJUDICATED with fresh live evidence: the reference
ships `text-slate-400`/`text-teal-100/70` byte-identical on the live
pricing/landing surfaces, captured in this round's walk; the standing
parity-doctrine adjudication stands — fixing them trades visual parity on
class-for-class extractions); the scryptSync async lift (A1-L3 — the
standing owner-level deferral; ~32ms/hash measured, the sync form is
load-bearing for the seed-import story); the first-signup admin TOCTOU
(A1-I1 — the session-27/28 adjudication stands: no admin-gated surface,
the seeded demo user makes count ≥ 1); the forgot-password non-transient
read swallow (A1-I2 — the documented no-enumeration residual);
`parseEnvFile`'s unterminated-quote divergence (A1-I3 — the session-28
acceptance: a blind fix could introduce a NEW divergence); the
`noValidate` declarative-only `minLength` note (A2-I1 — the server
enforces the floor; the attributes ride as intent metadata for password
managers/AT); the dead stepped gray/neutral family (A2-I2 — the
stepped-pin doctrine: whole families pinned defensively, v4 prunes unused
`@theme` vars); the rAF offscreen continuation (A2-I3 — the reference's
own observable posture, correct teardown everywhere); the once-sampled
reduced-motion preference (A2-I4 — deliberate, CSS-level motion collapses
live); the eager 955KB hero portrait (A2-I5 — the documented S22-20/S23-2
standalone-parity choice, width/height carry the CLS contract); the
standalone surfaces' `<main>` landmark gap (A2-I6 — WCAG best practice
only, not an AA failure; single-card surfaces; axe passes); the
`allowedDevOrigins` IPv4-only scope (A3-I4 — `localhost` is
default-allowlisted, no probe or doc uses `::1`; the F10-17 genus is
closed for the literal that exists in practice). The standing accepted
register carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins first (5 new its):**
- **S29-1**: `tests/api-robustness.test.ts` — the "sessioned me/logout
  family" describe gains the it: the logout route's source
  (comment-stripped) matches `requireSession` (the family's own session
  gate — the me route's sibling idiom). RED now (the route is bare).
- **S29-2**: `tests/api-robustness.test.ts` — a NEW it (in the S16-1
  neighborhood): the shape-guard expression census. `Array.isArray(`
  appears EXACTLY ONCE across the three files (api.ts + contact +
  generate, comment-stripped) — the predicate lives in the seam, the two
  route-local sites call it. RED now (three copies on disk).
- **S29-3**: `tests/landing-page.test.ts` — the "landing: the generator
  card" describe gains the it: the response parse carries
  `res.json().catch(() => null)` (the family idiom census). RED now (the
  bare `await res.json()`).
- **S29-6**: `tests/gate-script.test.ts` — a NEW it: `db:push` contains
  `scripts/prisma-env.ts` and `db:seed` contains `prisma/seed.ts` (the
  operator-path wiring). Born GREEN (the wiring is live today); the
  mutation battery reverts the script string → RED.
- **S29-7**: `tests/seo-surfaces.test.ts` — the S24-11 describe gains the
  it: `src/app/icon.png`'s IHDR = 512×512 and `src/app/apple-icon.png`'s
  IHDR = 180×180 (the asset↔manifest/declaration contract). Born GREEN;
  the battery swaps a wrong-sized asset → RED.

**Batch 2 — the GREEN cures:**
- **S29-1**: `src/app/api/auth/logout/route.ts` — the requireSession
  gate: `const gate = await requireSession(); if (isGuarded(gate)) return
  gate.response;` ahead of the clear (requireSession owns its own
  DB-failure envelope internally — ERR.INTERNAL; the no-session face
  answers ERR.UNAUTHORIZED 401, which makes the no-op call honest AND
  blocks the cross-site form POST — the Lax cookie never rides it). The
  S18-3 bareness comment rewritten to the new truth (requireSession
  wraps the throwing read; clearSessionCookie still never throws).
- **S29-2**: `src/lib/api.ts` — the exported predicate (the S16-1 lineage
  comment moved to it): `isJsonObject(raw: unknown): raw is
  Record<string, unknown>` owning the three-clause guard; parseBody
  consumes it; contact + generate replace their inline copies with the
  call (the route-local comments keep their S15-2/S16-1/S28-3 lineage
  notes, now naming the shared seam). The vocabulary is byte-identical —
  the S15-2/S16-1/S28-3 pins stay green.
- **S29-3**: `src/components/marketing/generator-card.tsx:90` —
  `(await res.json().catch(() => null)) as GenerateResponse | null` —
  the sibling idiom; the `!res.ok \|\| !body?.ok` arm owns all
  HTTP-shaped failures (the network-error catch keeps the transport
  class).
- **S29-4**: `src/lib/schemas.ts` — the S21-18 comment gains the
  160-cap arm (the over-length email answers the 400 cap vocabulary —
  shared by every emailField consumer; no enumeration oracle: no account
  can carry such an email).
- **S29-5**: `tests/e2e/seo.spec.ts` — the home-head test gains the
  folded arms (og:image content ends with `/og-image.png`, twitter:card
  = `summary_large_image`) + the inner-route canonical leg (`/Tool`
  canonical ends with `/Tool`) — in-place, no count change.
- **S29-6/S29-7**: the pins above (born GREEN by design).
- **S29-8**: `CLAUDE.md`'s force-dynamic line scoped ("every API/auth
  data route; the SEO route family is deliberately `force-static` —
  build-time inlining"); `.gitignore`'s `tests/e2e/.auth/` re-filed under
  `# playwright`.

**Batch 3 — the mutation batteries:** every new pin planted-defect
proven (revert the requireSession gate → RED; re-inline one shape-guard
copy → RED; drop the `.catch(() => null)` → RED; revert db:push's
wrapper string → RED; swap icon.png for a wrong-sized PNG → RED). All
restored → GREEN. The S29-5 e2e fold's battery: break the OG_IMAGE const
(url → a wrong literal) → the folded arms RED against the build; restore.

**Batch 4 — the count re-anchor + docs lockstep:**
- Live count walk after the batches: UNIT 636 → 641 projected (+5 pins:
  S29-1, S29-2, S29-3, S29-6, S29-7), SUITES 38 unchanged, E2E 63
  unchanged (the S29-5 fold is in-place), badge 699 → 704 projected. The
  reality census is the authority — never the plan's arithmetic (the
  session-27 precedent).
- The PAD §12 row re-anchored for `src/lib/api.ts` (the predicate
  extraction changes its line count; the census walked RED-to-GREEN).
  generator-card.tsx's edit is intra-line (no line-count change). The
  other §12 rows are untouched by the cure set.
- SKILL v1.24.0 → v1.25.0 (frontmatter, Appendix A's session-29 row);
  the session-29 plan's post-execution record; worklog Task 29;
  `docs/session_29.md` replaced with this round's log. README (badge,
  gate line, the session-29 row), AGENTS (counts, the plans map's
  twenty-ninth round), CLAUDE (counts + the S29-8 wording cure), PAD
  (§12 api.ts row, the counts) in the same commit.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record
   (S29-6/S29-7 census arms are born GREEN by design — their batteries
   prove they can fire).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit (the live count) · build ·
   smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The logout route gates through requireSession; a logged-out POST
   answers the 401 envelope; the smoke logout leg + the e2e session spec
   stay green (both hold live sessions).
4. The shape-guard predicate is exported from api.ts and consumed at
   all three sites; the vocabulary ("Invalid request body") is
   byte-identical; the S15-2/S16-1/S28-3 pins stay green; the census
   counts exactly one `Array.isArray(` across the three files.
5. The generator-card parse carries the family `.catch(() => null)`.
6. The e2e home-head test asserts og:image + twitter:card on the rendered
   DOM and the /Tool canonical; the folded arms' battery breaks the
   OG_IMAGE const → RED.
7. The gate-script pin freezes db:push's prisma-env wrapper + db:seed's
   seed mapping; the seo-surfaces pin freezes the icon IHDRs.
8. Captures taken on the dev server (the cured surfaces — the logout
   gate's 401 face + the logged-in round-trip; the generator-card
   surface), under `docs/screenshots/`.
9. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
10. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The plan's projection was exact: UNIT 636 → 641 (+5 pins — S29-1,
  S29-2, S29-3, S29-6, S29-7), the S29-5 fold in-place (e2e 63
  unchanged), SUITES 38 unchanged, badge 699 → 704.** The reality
  census confirmed 641/38 on disk before any doc site was touched.
- **The count-re-anchor order mattered**: the docs-counts constants
  (the census's own UNIT reality pointer) had to be re-anchored FIRST —
  the census's doc-site arms read the constants, so an inverted order
  walks RED against the freshly-updated docs (9 simultaneous failures
  observed and resolved by the constants-first order; the census then
  walked GREEN site by site).
- **The PAD §12 rows re-anchored for the two files whose line counts
  changed: api.ts 252 → 263 (the predicate extraction), generator-card
  266 → 271 (the S29-3 comment).** No other §12-pinned file was
  touched by the cure set.
- **One TS strictness trip, caught at the typecheck gate**: the S29-3
  cure's widened type (`GenerateResponse | null`) tripped TS18047 on
  the `body.error?.message` arm — fixed to `body?.error?.message` in
  the same edit (the null-conditional family the sibling surfaces
  already carry).
- **Every mutation battery on record**: the S29-1 requireSession gate
  reverted → RED; one shape-guard copy re-inlined in contact → RED
  (the census counts 2); the S29-3 `.catch` dropped → RED; the db:push
  wrapper string reverted to raw `prisma db push` → RED; the icon.png
  swapped for a 64×64 header → RED; the OG_IMAGE const's url broken →
  the folded e2e og:image arm RED against the production build
  (resolved to `<meta property="og:image" content=".../
  og-image-BROKEN.png"/>`). All restored → GREEN.
- **Live verification**: the logout gate's 401 face (a no-session POST
  answers the UNAUTHENTICATED envelope) and 200 face (the logged-in
  round-trip answers `signedOut: true`); the generate vocabulary
  probe (`curl -d '"hello"'`) still answers "Invalid request body"
  through the shared predicate — the S29-2 extraction preserved the
  S28-3 vocabulary byte-identically; the smoke leg-12 and e2e
  session-spec faces unchanged (both hold live sessions).

**Final state:** lint 0/0 · tsc 0 · unit **641/641** (38 files; +5
pins) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH ·
badge **704**. Captures 65/66 PIL-verified (the mobile-menu open
clean-walk re-verification at 390×844 + the generator-card surface).
Docs lockstep: README (the session-29 row, the gate line, the badge
704, the counts) + AGENTS (counts, the plans map's twenty-ninth
round) + CLAUDE (counts + the S29-8 wording cure) + PAD (the §12
api.ts 252 → 263 + generator-card 266 → 271 rows, the
test-distribution table, the counts) + SKILL v1.24.0 → v1.25.0
(frontmatter, Appendix A's session-29 row, Appendix B both counts +
the session-29 re-certification, the pre-ship checklist counts) +
worklog Task 29 + the session log + this post-execution record.
Pushed to main via the SSH wrapper (dry-run first, key shredded
after).
