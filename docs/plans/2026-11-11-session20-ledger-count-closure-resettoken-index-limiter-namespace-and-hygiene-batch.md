# Session 20 — The Ledger-Count Closure + The ResetToken Index + The Limiter Namespace + The Hygiene Batch (2026-11-11)

## Context

Session 19 pushed `a47c50b` (the description-family re-anchor + the
monetization redesign + the reader-envelope closure + the a11y batch);
the owner added `d6e17f4` (the session-19 round transcript, retained as
`docs/session_20.md`'s pre-round content — replaced by this round's log
at ship, the established handoff pattern). This round re-ran the
standing instruction against the merged tree: docs review → baseline
gate → the comprehensive audit (three parallel subagents) → the neo-crm
re-review → the live reference parity walk → the TDD cures → the gate →
captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 ·
unit 561/561 (37 files) · census MATCH (1 user + 0 contact messages).
`.env` re-created from `.env.example` (AUTH_SECRET set for dev), `db/`
at the repo root with `custom.db` pushed + seeded — the DATABASE_URL
contract (`file:../db/custom.db` resolving against
`prisma/schema.prisma`) re-verified end-to-end on a clean clone. The
operator's standing asks re-verified: `.env` DATABASE_URL + `db/` at
root ✓ · vitest (`vitest.config.mts`) + playwright
(`playwright.config.ts`) suites in place ✓ · sitemap.xml / robots.txt /
manifest / OG family / per-route metadata byte-verified against the
live reference ✓ · `skills/` excluded from code checking/testing/
compilation ✓.

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review (verified live this round); the recorded adoption/deferral
decisions stand.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib
seams, AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs
— every load-bearing finding hand-verified in source by the lead):
**0 Critical / 0 High / 1 Medium / 9 Low / 16 Info.** The one Medium:
the SKILL's Appendix-B verification ledger still says `e2e 56/56` —
the session-19 commit bumped the unit count in the same paragraph but
missed the e2e count (the frontmatter, README, AGENTS, CLAUDE, PAD and
the commit message all say 57), and the docs-counts gate missed it
because its SKILL pin is satisfied by the frontmatter, not scoped to
Appendix B.

**The parity walk (live, both sides, logged into the reference):** the
five-route head census (title/description/og/twitter/canonical on
`/` `/Tool` `/Pricing` `/Contact` `/login`) — **NO DRIFT** (the
session-19 description family holds byte-for-byte: the prefixed
70-char-truncated tail on the three inner routes, the plain 170-char
paragraph on `/` and `/login`); the mobile menu family at 390×844 on
BOTH sides (the reference's no-aria hamburger `md:hidden p-2
text-slate-300`, 5 destinations, NO Escape close; the clone's parity
panel + the superset Escape-with-focus-return + route-change
auto-close + the derived `Tool | ViralPost AI` title — hydration clean
via `localhost`); the monetization section (the EN redesign with the
ten floaters live-animating inside the observed envelope — translateY
≈ −20..−70px, rotate ≈ ±10°, opacity 0..1); sitemap.xml + robots.txt
identical (origin-difference only); the clone's generator round-trip
green (the reference's LLM stays platform-dead — the documented
superset). The Tailwind v4 trap catalog re-verified mitigated in
`globals.css` (literal hex `@theme`, the `@custom-variant hover`
unwrap, no `tailwind.config.js`, the censuses green).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S20-1 | **MEDIUM** (docs drift + gate hole) | `viralpost-ai_SKILL.md:522-523` (Appendix B) | **The verification ledger's e2e count is stale.** The session-19 commit re-anchored the unit count in the same paragraph (`550/550` → `561/561`) but left `e2e 56/56 (9 specs` — the live suite is 57 (the session-19 description-family leg). The frontmatter, README, AGENTS, CLAUDE, PAD and the session-19 commit message all carry 57; the ledger contradicts its own document. The docs-counts gate missed it: its SKILL pin (`e2e ${E2E}/${E2E} (9 specs)`) is satisfied by the frontmatter — the gate's own header claims every LIVE-TENSE count site is pinned, so this is also a coverage hole. |
| S20-2 | **LOW** (data integrity) | `prisma/schema.prisma:43` | **`resetToken` carries no index** — the reset funnel's two token lookups (`findFirst` by hash + the atomic `updateMany` consume) are full-table scans; the only unindexed lookup path in the schema (`email` is `@unique`, `ContactMessage.createdAt` is `@@index`-ed). A `@unique` also structurally pins the one-live-token-per-row invariant the 256-bit random guarantees probabilistically (SQLite unique indexes treat NULLs as distinct — the "no reset pending" rows coexist). |
| S20-3 | **LOW** (gate hygiene) | `scripts/smoke-test.sh:38-41` vs `:49` | **`GATE_PID` is unbound in the EXIT trap on early-failure paths.** The S19-17 cure added the kill to the trap but no `GATE_PID=""` init; the script runs `set -euo pipefail`, so any exit in legs 00–13 aborts the cleanup function mid-trap (unbound-variable expansion) and the temp files — including the cookie jar — leak. |
| S20-4 | **LOW** (convention violation) | `src/components/marketing/hero.tsx:1` | **A superfluous `"use client"` on the Hero.** No hooks, no handlers, no browser APIs — it only composes already-client islands (`Iridescence`, `ParticleText`, `Reveal`) with static markup and a `Link`. The hero's entire static subtree ships in the client bundle and joins the hydration tree instead of rendering as server HTML; violates the repo's own "`"use client"` only where interactivity demands it" standard (CLAUDE.md). |
| S20-5 | **LOW** (wasted work) | `src/components/effects/particle-text.tsx:267-276` | **The S19-9 cure's mount-time residual: `init()` still builds the particle field in reduced mode.** The session-19 plan itself recorded "`buildParticles()` is also pure waste in reduced mode (the field is never drawn)" but the cure only guarded `onResize`; the mount path still runs the offscreen rasterize + full-canvas pixel sampling whose result is never rendered. |
| S20-6 | **LOW** (a11y, WCAG 2.2.1-adjacent) | `src/components/ui/toast.tsx:132-133` | **The toast auto-dismiss pauses on hover only.** A keyboard user tabbing to the Dismiss button, or a screen-reader user still reading the announced message, gets a hard 4s window — no focus-pause equivalent to the mouse affordance the component already ships. |
| S20-7 | **LOW** (key-space collision) | `src/app/api/generate/route.ts:40` | **The generate limiter's uid and IP keys share one namespace.** `generate:${user?.id ?? clientKey(req)}` — under the documented mis-declared-proxy hazard, an attacker who knows a victim's cuid can set `x-forwarded-for: <cuid>` to share/exhaust that user's 20/15min bucket. Namespacing the families (`generate:uid:` / `generate:ip:`) removes the collision class outright. |
| S20-8 | **INFO→cured** (comment truth) | `src/app/api/auth/verify/route.ts:73-78` | **The lockout-burn comment overclaims envelope-wide timing equality.** Scrypt is equalized on every branch (S19-5 verified), but the wrong-code branch additionally pays one atomic `update` (fsync-scale) the miss/lockout branches don't — the exact residual class the resend route documents for itself (S19-18). One comment-sentence parity. |
| S20-9 | **INFO→cured** (comment truth) | `prisma/seed.ts:23-25` vs `:35` | **The seed's header comment overclaims cookie survival.** The update path explicitly resets `tokenVersion: 0` (deliberate — "resets every seeded field"), so only v=0 cookies survive a reseed while the comment says "session cookies minted before the reseed keep resolving" unconditionally. Amend the comment to the precise claim. |
| S20-10 | **INFO→cured** (envelope belt-and-braces) | `src/app/api/auth/forgot-password/route.ts:95`, `src/app/api/generate/route.ts:105` | **Two CSPRNG calls sit outside any try block** (`randomBytes(32)`, `randomInt(1 << 30)`) — the "no realistic throw" class the logout route documents for its own bare handler. Moving both inside their routes' existing try blocks is zero-cost envelope absoluteness. |
| S20-11 | **INFO→cured** (latent hang) | `src/lib/generator.ts:428-435` | **The paragraph loop's termination is implicit.** `while (paragraphs.length < paragraphCount)` with a `used`-set dedupe terminates only while `bodyBank.length >= paragraphCount` (today safe by 2× margin; nothing enforces it — a future bank edit below 3 entries spins the request thread forever). Cap the count by the bank size. |
| S20-12 | **INFO→cured** (robustness) | `src/components/effects/iridescence.tsx:197-212` | **No `webglcontextlost` handling.** On GPU context loss (mobile backgrounding) the canvas blanks silently while the rAF loop keeps issuing no-op `drawArrays` calls forever. Separately, the cleanup deliberately NOT calling `WEBGL_lose_context.loseContext()` is actually required (React StrictMode's dev remount re-`getContext`s the same canvas) — but that invariant is implicit. Add the listener + the why-comment. |
| S20-13 | **LOW** (docs drift) | `viralpost-ai_SKILL.md:255-257` (§7) | **§7 still describes the retired PT monetization section in the present tense** ("the PT pay-what-you-want section … session-1 captures") — the section is the EN redesign since session 19. The semantic-prose census only scans the PAD, so this class escapes the gate. |
| S20-14 | **LOW** (comment truth) | `tests/type-gate.test.ts:16,42,91` | **The lineage note cites the retired `install_packages` as a live scripts/ member** (three present-tense sites) — `scripts/` has held exactly three files since the session-19 retirement. |
| S20-15 | **INFO→cured** (comment truth) | `src/lib/site.ts:98-99` | **The truncation comment describes an algorithm that isn't implemented.** `slice(0, 70)` + trailing-comma normalization is a hard cut that lands on a word boundary only because the pinned description's 70th character happens to be the comma after "influencers". The comment (and the audit trail behind it) should state the mechanism precisely — the byte-pins carry the contract, not the prose. |
| S20-16 | **INFO→cured** (config symmetry) | `vitest.config.mts:13` | **`skills/` is excluded from vitest only by include-scope**, while tsconfig (`"exclude": ["skills"]`) and eslint (`ignores: [..., "skills"]`) exclude it explicitly — the AGENTS claim "excluded from tsconfig/eslint/vitest" is true in effect but asymmetric in mechanism; a future include-widening would silently admit the owner's catalog. Add the explicit `exclude`. |

**Verified, no action (the honest-deferred register):** the per-account
login lockout (LOW per AUDIT-1 — a per-email counter is itself an
enumeration oracle unless carefully shaped; the per-IP limiter +
scrypt equalizer is the documented family posture; needs its own
design round); the landing's inline pricing/contact duplication
(AUDIT-2 L4 — byte-identical DOM today, verified; the cure is a
maintainability refactor with source-pin churn; the drift risk it
predicts is bounded by the byte-pins on both copies); the
malformed-hash scrypt fast-fail (requires manual DB tampering);
`scryptSync` on the request path (the family convention; an at-scale
lift); the toast's nested live regions (the documented S19-8
belt-and-braces trade-off); the toast store's dormant subscribe race
(all six call sites are event handlers — verified); the skip-to-content
link (a visual superset over the reference; an a11y design round, not
a drive-by); the error boundaries' exclusion from the axe battery
(needs a forced-error surface); `bun run start`'s tee pipe (operational
nit, accepted at session 19); the 404 body's client-rendered posture
(ADR-006); the verify route's SQLite-write residual itself (documented
at S20-8 now — the burn would invert the fsync-scale signal, the
resend precedent).

## Remediation (TDD where a contract changes)

- **R20-1 (S20-1, TDD + mutation battery)**: the pin FIRST —
  docs-counts.test.ts gains the Appendix-B scoped pin (the ledger's
  Appendix B section must carry `57/57 (9 specs` and the retired
  `56/56 (9 specs` form must never return — the README retired-badge
  ladder pattern). RED against the current tree. GREEN: SKILL.md:523
  `56/56` → `57/57` + the parenthetical extended with the session-19
  e2e legs (the description-family leg). Mutation battery: revert
  57 → 56 in Appendix B → exactly the new pin REDs → restore → GREEN.
- **R20-2 (S20-2, TDD)**: the pin FIRST — auth-reset.test.ts pins
  `resetToken String? @unique` in the schema. RED. GREEN: the
  `@unique` + `bun run db:push` (the dev db; the e2e/smoke DBs are
  scratch-created by their own legs).
- **R20-3 (S20-3, TDD)**: the pin FIRST — gate-script.test.ts pins the
  `GATE_PID=""` init beside `SERVER_PID=""`. RED. GREEN: the one-line
  init in smoke-test.sh.
- **R20-4 (S20-4, TDD)**: the pin FIRST — landing-page.test.ts pins
  the hero as a Server Component (no `"use client"` directive). RED.
  GREEN: delete line 1 of hero.tsx (all props to the client islands
  are serializable — verified). Live-verify the landing on the dev
  server (the hero renders identically; the client islands hydrate).
- **R20-5 (S20-5, TDD)**: the pin FIRST — effects-motion.test.ts pins
  the init reduced-skip (the mount path mirrors the S19-9 resize
  guard). RED. GREEN: the `init()` guard.
- **R20-6 (S20-6, TDD)**: the pin FIRST — toast-anatomy.test.ts pins
  the focus-pause pair. RED. GREEN: `onFocus`/`onBlur` on the
  ToastCard root (the existing paused-effect re-arms correctly).
- **R20-7 (S20-7, TDD + mutation battery)**: the pin FIRST —
  api-robustness.test.ts's generate-key pin re-anchored to the
  namespaced families. RED. GREEN: `generate:uid:${user.id}` /
  `generate:ip:${clientKey(req)}`. Mutation battery: revert to the
  shared namespace → the pin REDs → restore.
- **R20-8 (S20-8)**: the verify route's lockout comment gains the
  fsync-scale write-residual sentence (the resend S19-18 precedent).
- **R20-9 (S20-9)**: the seed's header comment amended to the precise
  claim (v=0 cookies keep resolving; the update path resets every
  seeded field — the tokenVersion reset included, by design).
- **R20-10 (S20-10)**: the two bare CSPRNG calls moved inside their
  routes' existing try blocks.
- **R20-11 (S20-11, TDD)**: the pin FIRST — generator.test.ts pins the
  bank-size cap on the paragraph count. RED. GREEN:
  `Math.min(2 + (rng() > 0.55 ? 1 : 0), bodyBank.length)`.
- **R20-12 (S20-12, TDD)**: the pin FIRST — effects-motion.test.ts
  pins the context-lost listener + its cleanup removal. RED. GREEN:
  the listener + the loseContext-why comment in iridescence.tsx.
- **R20-13 (S20-13)**: SKILL §7 reworded to the EN monetization
  section (the session-19 redesign) + the semantic-prose census gains
  the scoped negative (the PT present-tense form never returns).
- **R20-14 (S20-14)**: the type-gate lineage note's three sites
  re-anchored to the three-file scripts/ reality.
- **R20-15 (S20-15)**: the site.ts truncation comment reworded to the
  precise mechanism (the hard 70-char cut + comma normalization;
  word-boundary-correct for the pinned string).
- **R20-16 (S20-16)**: vitest.config.mts gains the explicit
  `exclude: ["skills/**", "**/node_modules/**"]`.
- **R20-17 (lockstep)**: the count ladder + constants re-anchored at
  the ship census (UNIT 561 → the live count, SUITES 37, E2E 57/9
  unchanged, badge arithmetic); the PAD §12 line-count rows for every
  edited file; README (the session-20 row, the gate line, the badge);
  AGENTS (counts, the plans map's twentieth round); CLAUDE (counts);
  PAD (§8.1 distribution, §12 rows); SKILL v1.15.0 → v1.16.0
  (frontmatter, §7, Appendix A's session-20 row, Appendix B
  re-certified); worklog Task 20; `docs/session_20.md` (the pre-round
  transcript replaced by this round's log — the transcript's content
  is preserved in the session-19 record and this plan's context);
  this plan's post-execution record.
- **R20-18**: captures 47/48 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited, the menu DOM-confirmed open before the shot),
  PIL-verified.
- **R20-19**: the full gate on the exact commit tree → the
  Conventional Commit on `main` → the SSH-wrapper push (dry-run
  first, key shredded after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The SKILL's Appendix B carries `e2e 57/57 (9 specs` with the scoped
   pin holding; the retired form cannot return.
3. `resetToken String? @unique` in the schema (db pushed); the reset
   funnel's lookups ride the index.
4. The smoke trap's `GATE_PID` is initialized (an early-leg failure
   cleans up completely).
5. The hero renders as a Server Component (the client islands
   hydrate; the landing is visually unchanged — dev-server verified).
6. The reduced-motion mount skips the particle build; the toast pauses
   on focus; the generate limiter's key families are namespaced; the
   iridescence guards context loss; the generator's paragraph count is
   bank-capped; the two CSPRNG calls sit inside their try blocks.
7. The comment-truth batch landed (verify fsync residual, seed
   tokenVersion, SKILL §7 EN, type-gate scripts note, site.ts
   truncation mechanism); vitest excludes `skills/**` explicitly.
8. The docs lockstep at the final counts; captures 47/48
   PIL-verified; the parity family re-verified live (no drift).

## Execution record

- **Baseline**: lint 0/0 · tsc 0 · unit 561/561 (37 files) on the
  merged tree; census MATCH; the DATABASE_URL contract re-verified
  end-to-end on a clean clone.
- **The audit**: 0 Critical / 0 High / 1 Medium / 9 Low / 16 Info;
  every load-bearing finding hand-verified in source by the lead.
- **The parity walk**: the reference live (NO drift — the five-route
  head census, the mobile menu family, the monetization floaters,
  sitemap/robots) + the clone's dev server (the menu family superset
  verified: Escape + focus return + auto-close + the derived title).

## Post-execution record (appended at ship)

- **R20-1 (S20-1)**: the scoped pin RED first (Appendix B missing the
  live count + the retired form present), then the ledger
  re-anchored (`56/56` → `57/57`) + the parenthetical extended with
  the session-19 description-family leg. **Mutation battery**: the
  count reverted in the ledger → exactly the new pin REDs → restored
  → GREEN. (An accidental first-battery mutation hit the frontmatter
  instead — demonstrating the pin's negative arm trips there too;
  restored, then the proper ledger-line battery run.)
- **R20-2 (S20-2)**: the `@unique` pin RED first, then
  `resetToken String? @unique` + `bun run db:push` (auth-reset 26/26
  GREEN). prisma/schema.prisma 60 → 64 lines (the §12 row
  re-anchored).
- **R20-3 (S20-3)**: the init-before-trap pin RED first, then the
  `GATE_PID=""` init + the why-comment (gate-script 6/6 GREEN,
  `bash -n` clean). smoke-test.sh 178 → 183 lines (the §12 row
  re-anchored).
- **R20-4 (S20-4)**: the server-component pin RED first, then the
  directive retired + the composition comment (landing-page 24/24,
  tsc clean). Live-verified on the dev server: the h1, both canvases,
  the WebGL context, the hero CTAs, and the ten floaters all render
  and hydrate — the DOM is byte-identical, the static subtree now
  ships as server HTML.
- **R20-5 (S20-5)**: the init-guard pin RED first, then the `!reduced`
  guard around the mount-time build + home-scatter (the onResize
  mirror). effects-motion GREEN.
- **R20-6 (S20-6)**: the focus-pair pin RED first, then
  `onFocus`/`onBlur` on the ToastCard root (a JSX-comment-in-attribute-position
  syntax slip caught by tsc and fixed to line comments — toast-anatomy
  13/13 GREEN).
- **R20-7 (S20-7)**: the pin re-anchored RED first (the namespaced
  families + the retired shared-namespace form banned), then the
  `generate:uid:` / `generate:ip:` split + the collision-class
  comment. **Mutation battery**: the retired shared form planted →
  exactly the pin REDs → restored → GREEN (api-robustness 17/17).
- **R20-8..R20-16**: the batch — the verify fsync-residual comment
  (S20-8), the seed tokenVersion comment (S20-9), the two CSPRNG
  calls inside their try blocks (S20-10), the generator bank cap
  pinned RED→GREEN (S20-11, generator + property suites 28/28), the
  iridescence context-lost listener + the loseContext-why comment
  pinned RED→GREEN (S20-12), the SKILL §7 EN reword + the
  semantic-prose negative (S20-13), the type-gate comment truth at
  three sites (S20-14), the site.ts truncation mechanism comment
  (S20-15), and the vitest `skills/**` exclude (S20-16 — the suite
  count held at 37 files, confirming no test surface changed).
- **Count re-anchor**: UNIT 561 → 571 (+10: docs-counts +2,
  auth-reset +1, gate-script +1, landing-page +1, effects-motion +2,
  toast-anatomy +1, generator +1 — the api-robustness key pin
  re-anchored in place), E2E 57/9 unchanged, badge 618 → 628; the
  §12 rows (schema 64, smoke 183, particle-text 330, iridescence
  241, generator 453, site 173); every live-tense count site
  re-anchored in the same commit (the lockstep pins drove it).
- **R20-17 (lockstep)**: README (the session-20 row, the gate line,
  the badge 628); AGENTS (counts, the plans map's twentieth round);
  CLAUDE (counts); PAD (§8.1, §12 rows); SKILL v1.14.0 → v1.16.0
  (frontmatter, §7, Appendix A's session-20 row, Appendix B
  re-anchored — NOTE: the session-19 plan's "v1.15.0" bump never
  landed in the frontmatter, an unpinned drift this round's bump
  covers; the version remains unpinned by the docs-counts gate,
  recorded here as the residual); worklog Task 20;
  `docs/session_20.md` (the pre-round transcript replaced by the
  round log); this record.
- **R20-18**: captures 47/48 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified (47: 1280×800,
  99.7% non-white, 71% dark hero; 48: 390×844, 95.5% dark
  upper-third).
- **R20-19**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 571/571 (37 files) · build · smoke 15/15 · e2e
  57/57 (9 specs) · census MATCH.
- **Deferred**: the per-account login lockout (enumeration-oracle
  hazard needs its own design round), the landing pricing/contact
  dedup (byte-identical DOM; pin churn), the malformed-hash
  fast-fail, scryptSync-on-the-request-path, the toast
  nested-live-region trade-off, the toast subscribe race (dormant),
  the skip link, the error.tsx axe battery, the start tee pipe —
  each with its reason in the findings register above.
