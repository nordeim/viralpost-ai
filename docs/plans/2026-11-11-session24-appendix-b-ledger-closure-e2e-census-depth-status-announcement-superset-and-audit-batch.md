# Session 24 — The Appendix-B Ledger Closure + The E2E Census Depth + The Status-Announcement Superset + The Audit Batch (2026-11-11)

## Context

Session 23 pushed `1bbb29f`; the owner added `846ba34` (the session-23
transcript held as `docs/session_24.md`'s pre-round handoff, the
established pattern). This round re-ran the standing instruction against
the merged tree: docs review → baseline gate → the comprehensive audit
(three parallel subagents) → the neo-crm re-review (HEAD `b3d0fbe`,
UNCHANGED since session 12 — the recorded decisions stand) → the live
reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
606/606 (38 files) · `.env`'s `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root · census MATCH · vitest (`vitest.config.mts`) +
playwright (`playwright.config.ts`) suites in place and current ✓ ·
sitemap.xml / robots.txt / manifest / OG family verified live against the
reference ✓ · `skills/` excluded from every gate (tsconfig/eslint/vitest,
all explicit) ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/1M/2L/4I · AUDIT-2: 0C/0H/2M/5L/3I · AUDIT-3:
0C/0H/3M/4L/4I** — combined **0 Critical / 0 High / 6 Medium / 11 Low /
11 Info** at the subagent reports. The lead's adjudication moves AUDIT-1's
Medium (the in-app-delivery posture) to the accepted register — it is the
documented S13-1 warn-not-fatal decision, re-adjudicated on its own terms
(the boot warning IS the operator's declare-your-posture signal; the
mail-less demo posture is a legitimate self-hosted deployment) — for a
working register of **0C / 0H / 5M / 11L / 11I**.

**The parity walk (live, both sides, logged into the reference):** the
five-route head census (title/description/og/twitter/canonical) — NO DRIFT
(the session-19 description family holds byte-for-byte). The mobile-menu
control census at 390×844 — the pill text "Upgrade to Pro – $19" + the
bare pill classes + the bare link family + the Gumroad href ALL
byte-identical (the session-22 re-anchors hold; the reference's revert
held). The hamburger aria family remains ABSENT on the reference (the
session-23 superset stance stands — no new drift, no flip-flop this
round). The desktop nav family (the underline `after:` family + the
active/inactive splits) + the desktop pill — NO DRIFT. The footer CTA
("Upgrade – $19", the S21-1 form) — NO DRIFT. The landing heading tree —
identical. Sitemap.xml + robots.txt — identical (origin-difference only).
The clone's generator round-trip green; the clone's Escape-close with
focus return live-verified; the scrolled-panel darkening e2e-owned
(R22-4). **NO DRIFT ANYWHERE — the first fully-clean walk since the
mobile-menu re-anchor rounds began.**

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S24-1 | **MEDIUM** (docs-counts) | `viralpost-ai_SKILL.md:534` + `tests/docs-counts.test.ts:179-185` | TWO faces of one genus: (a) SKILL Appendix B's verification ledger still reads `unit 599/599 (37 files` while the live state is 606/38 — the session-23 count re-anchor updated the frontmatter, README/AGENTS/CLAUDE/PAD, and Appendix B's E2E count, but missed Appendix B's UNIT count in the same file; (b) the census's Appendix-B arm (S20-1) pins ONLY the e2e count — the unit count in the same ledger bullet is unpinned, which is exactly why the gate stayed green through (a). The S20-1 genus recurred one notch over. (AUDIT-3 A3-M1/A3-M2.) |
| S24-2 | **MEDIUM** (census) | `tests/docs-counts.test.ts:305-307, 380-384` | The e2e reality census scans `tests/e2e` FLAT while Playwright's `testDir` discovery is recursive — the uncured half of S23-10. A spec at `tests/e2e/subdir/foo.spec.ts` would execute in the runner yet be invisible to every e2e count arm (E2E_SPECS, the test-block count, the forms-guard, the anti-dodge loop): the badge-drift genus one directory level deeper, at the e2e layer. No live instance today (all 9 specs flat — verified); a defense gap, not active drift. (AUDIT-3 A3-M3.) |
| S24-3 | **MEDIUM** (a11y, WCAG 2.2 AA 4.1.3) | `src/components/marketing/contact-form.tsx:55,114-130` | A successful submit's only indication is the button label swap "Send Message" → "Message Sent!" — button label changes are not re-announced by AT, no live region wraps it, and no toast fires on success (only errors toast). The house's polite-live-region doctrine (toast.tsx S19-8, InfoCallout S14-5 role="status") has no member on this surface. (AUDIT-2 A2-M1.) |
| S24-4 | **MEDIUM** (a11y, WCAG 1.4.11) | `src/components/marketing/generator-card.tsx:186` | The Copy button's keyboard focus ring is `focus-visible:ring-teal-500` (≈2.49:1 on the near-white card — under the 3:1 focus-indicator floor) while the SAME FILE's textarea carries the S23-3 `ring-teal-600` (≈3.05:1) superset. The S21-20 superset ring predates the AA-floor standardization; the same-file inconsistency hides it. (AUDIT-2 A2-M2.) |
| S24-5 | **LOW** (React 19) | `src/components/ui/toast.tsx:79` | `getServerSnapshot` is the uncached `() => []` — React 19.3.1's hydration branch calls it TWICE and compares with `===`, tripping the dev-only "should be cached" console error on every Toaster hydration, plus one redundant post-hydration render (the store-consistency check sees a fresh `[]` ≠ the module `toasts`). No prod-visible effect; the generator-card precedent (`() => 0`) is value-cached. (AUDIT-2 A2-L1.) |
| S24-6 | **LOW** (comment-truth + reduced-motion) | `src/components/effects/iridescence.tsx:199-202` | In reduced mode the single static frame is seeded by the mount rAF timestamp (per the S23-2-era comment), but `onResize` calls `render(0)` — a resize re-seeds `u_time` to literal 0 and visibly re-flows the slow sine bands, contradicting the comment the last round wrote. (AUDIT-2 A2-L2.) |
| S24-7 | **LOW** (seam discipline) | `scripts/e2e-prune.ts:15` | The prune script constructs a bare `new PrismaClient()` — the only Prisma-consuming script that doesn't pin the datasource URL through `runtimeDatabaseUrl()` (seed.ts pins it; census rides the singleton; prisma-env pins the env). In the wired gate path it resolves correctly, but a manual run from the repo root follows bun's .env absolutization to the parent-of-repo path — the exact wrong-DB shape db-path.ts documents. Blast radius bounded by the `e2e-` prefix scope. (AUDIT-1 A1-L1.) |
| S24-8 | **LOW** (drift risk) | `src/app/(site)/page.tsx:34-42` vs `sections.tsx:455-472` | The landing page hand-inlines the pricing section that `PricingSection` already encapsulates — byte-identical today (including the S19-11 unfaded header), but the session-19 cure had to be applied in TWO places. The parity-pinned surface carries a duplication genus. (AUDIT-2 A2-L5.) |
| S24-9 | **LOW** (pin quality) | `tests/seo-surfaces.test.ts:102-118`, `tests/page-titles.test.ts:136-144` | TWO faces: (a) the S23-15b "order" pin is four independent `toContain`s — order-independent, so a ROUTES reorder ships green while the comment claims order is pinned (the comment-truth genus, in a test); (b) the ROUTES table face is pinned by BOTH suites with no co-pin documentation — the AGENTS EXACTLY-ONE-pin doctrine violated (a future ROUTES edit trips two suites and hides which one matters). (AUDIT-3 A3-L1/A3-L2.) |
| S24-10 | **LOW** (coverage) | `tests/seo-surfaces.test.ts` | The sitemap's `<loc>` absoluteness (sitemaps.org requires absolute URLs; the composition `siteUrl() + path` is pinned nowhere — an empty origin reaching the template ships relative locs green through every layer) and the robots.txt body contract (the route's own "byte-exact format" claim — LF-only, no trailing newline, the blank line before Sitemap, lowercase `User-agent` — unpinned at the format layer; only the content-type and three loose contains exist). (AUDIT-3 A3-L3/A3-L4.) |
| S24-11 | **INFO→pin** (coverage) | `public/og-image.png` + `src/lib/site.ts:160` | The declared og:image dimensions (1200×630) match the actual asset but are pinned nowhere — an asset swap with different dims ships green and mis-renders link previews. Cheap to pin (read the PNG IHDR). (AUDIT-3 A3-I2.) |

**Verified, no action (the honest-deferred register):** the in-app-delivery
production posture (A1-M1 — the documented S13-1 warn-not-fatal
adjudication, re-read and re-affirmed: the boot warning is the
declare-your-posture signal, the mail-less demo posture is legitimate);
the first-user-admin signup race (A1-L2 — the register-carried item; `role`
gates no surface today, grep-verified); the FloatingIcons off-screen rAF
(A2-L3 — register-carried "the offscreen-rAF pause"; the reference's
framer-motion loops continuously too — parity-preserving); the
particle-text per-resize re-rasterization (A2-L4 — register-carried "the
particle resize churn"; transient drag-storm cost only); the Reveal no-JS
trade-off, the non-banned oklab gradient family (the walk shows no drift),
the reduced-motion read-once-at-mount posture, the manifest 192/512 icon
pair, the VALIDATION-vs-BAD_REQUEST vocab note (both pinned contracts),
IPv6 canonicalization, the demo-credentials seed parity, scryptSync's
design burn, the eslint off-switches register, and the E2E_PORT NaN
theoretical — each with its reason, re-read, nothing new to add. Plus the
register carried from session 23 unchanged.

## Remediation (TDD where a contract changes)

- **R24-1 (S24-1, TDD)**: the pin FIRST — the census's Appendix-B arm
  extends to the unit count: `expect(appendixB).toContain(`unit
  ${UNIT}/${UNIT} (${SUITES} files`)` + the scoped retired-form negative
  (`not.toContain("599/599 (37 files"` — the README retired-badge ladder
  pattern). RED (SKILL:534 is stale). GREEN: Appendix B's ledger line
  re-anchored to the live counts; the heading's "re-certified through"
  refreshed; at the count re-anchor the ladder walks it to the ship
  counts.
- **R24-2 (S24-2, TDD)**: the planted-defect proof FIRST — a nested
  fixture `tests/e2e/nested-spec-dir/e2e-census-fixture.spec.ts` (1
  throwaway test) demonstrates the flat scan's blindness (the census
  stays GREEN at 9 specs while the fixture sits one directory deeper —
  Playwright's testDir discovery is recursive, documented behavior),
  then the recursive scan lands (an `e2eSpecFiles()` helper mirroring
  `unitTestFiles()`; all three flat arms convert — the spec census, the
  forms-guard, the anti-dodge loop's iteration base) and the census REDs
  (10 ≠ 9 — the fix's mutation battery). Fixture removed after the
  proof; the recursive scan stays.
- **R24-3 (S24-3, TDD)**: the pin FIRST — a11y-controls.test.ts (the
  contact-form pin home) gains the status-announcement pin: a
  `role="status"` node coupled to the sent state (announced on the
  success swap, present-in-DOM before the change so AT catches the
  mutation). RED. GREEN: contact-form gains the visually-hidden status
  node (`sr-only`, the reference's surface untouched — the button label
  swap stays byte-identical).
- **R24-4 (S24-4, TDD)**: the pin FIRST — the S23-21 landing-page pin
  extends: the Copy button joins the AA family AND the sub-3:1 form is
  banned (`expect(card).not.toContain("focus-visible:ring-teal-500")`).
  RED (the Copy button carries teal-500 today). GREEN: the Copy button's
  superset ring upgrades to `ring-teal-600` (the S21-20 comment updated
  to the S23-3 family form).
- **R24-5 (S24-5, TDD)**: the pin FIRST — toast-anatomy's S23-4 pin
  extends to the cached server snapshot (the `EMPTY_TOASTS` const form;
  the uncached `() => []` literal banned in the call). RED. GREEN: the
  module-level `EMPTY_TOASTS: ToastItem[] = []` + the snapshot reads it.
- **R24-6 (S24-6)**: iridescence — the first `render(t)` timestamp is
  captured into a closure var; `onResize`'s reduced branch re-renders at
  the captured seed (the mount-time frame stays the mount-time frame).
  A small source pin in effects-motion.test.ts joins (the reduced
  resize arm no longer passes the literal 0).
- **R24-7 (S24-7)**: e2e-prune.ts pins the datasource URL through
  `runtimeDatabaseUrl()` — the seed.ts idiom, comment updated to the
  seam-pinned truth.
- **R24-8 (S24-8)**: the landing page renders `<PricingSection />` (the
  hand-inlined duplicate retired — the DOM is byte-identical by
  construction, the component IS the markup); landing-page.test.ts's
  order pin co-updates (`<PricingCards />` → `<PricingSection />`) in
  the same commit.
- **R24-9 (S24-9, TDD)**: seo-surfaces' ROUTES pin becomes ONE ordered
  assertion (a regex spanning the array body — `/`, `/Tool`, `/Pricing`,
  `/Contact` in sequence; a reorder now REDs with a readable message);
  page-titles' duplicate sitemap-ROUTES face RETIRED (seo-surfaces is
  the owner — the natural home post-S23; the /Home negative stays in
  seo-surfaces; page-titles keeps its OTHER faces — the /Home 308
  next.config pin stays). Net −1 test at page-titles, +0 at
  seo-surfaces (the edit is in place).
- **R24-10 (S24-10, TDD)**: seo-surfaces gains TWO describes — the
  robots body contract (the exact four-line body against
  `${siteUrl()}`: `User-agent: *` / `Allow: /` / the blank line /
  `Sitemap: <origin>/sitemap.xml`, LF-only, no trailing newline) and the
  sitemap loc-absoluteness arm (the four absolute `<loc>` values in
  order — which also nails the body-level order the R24-9 source pin
  guards). Coverage pins: GREEN at birth is expected ONLY if the routes
  are correct — the RED walk happens by planting the defect first (an
  empty-origin env probe) per the mutation doctrine.
- **R24-11 (S24-11)**: the og:image dims pin — read the PNG IHDR from
  `public/og-image.png` (width/height at bytes 16-23) and assert it
  equals the declared 1200×630 in site.ts's metadata (the declared
  numbers pinned against the actual asset bytes).
- **R24-12 (lockstep)**: the count ladder re-anchored at the ship census
  (UNIT/SUITES/E2E recomputed from the live tree; badge arithmetic; the
  PAD §12 line-count rows for every edited file with a row; README (the
  session-24 row, the gate line, the badge); AGENTS (counts, the plans
  map's twenty-fourth round); CLAUDE (counts); PAD (§12 rows); SKILL
  v1.19.0 → v1.20.0 (frontmatter, Appendix B, Appendix A's session-24
  row); worklog Task 24; `docs/session_24.md` (the pre-round transcript
  replaced by this round's log); this plan's post-execution record.
- **R24-13**: captures 55/56 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited, the menu DOM-confirmed open before the shot),
  PIL-verified.
- **R24-14**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first, key shredded
  after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. SKILL Appendix B carries the live counts; the census's Appendix-B arm
   pins BOTH counts (unit + e2e, with retired-form negatives).
3. The e2e census arms scan `tests/e2e` recursively (the planted-defect
   proof on record).
4. The contact-form success is announced (WCAG 4.1.3, pinned); the Copy
   button's focus ring meets the 3:1 floor (pinned, sub-3:1 form banned);
   the toast server snapshot is cached (pinned); the iridescence
   reduced-resize keeps its mount-time seed (pinned).
5. The seo-surfaces suite owns the ROUTES face (ONE ordered pin,
   exactly-one-pin doctrine restored), the absolute-loc contract, the
   robots body, and the og-image dims.
6. The landing pricing duplication retired (the DOM byte-identical, the
   order pin co-updated); e2e-prune rides the seam.
7. The docs lockstep at the final counts; captures 55/56 PIL-verified.

## Post-execution record (appended at ship)

- **Baseline**: lint 0/0 · tsc 0 · unit 606/606 (38 files) on the
  merged tree (`846ba34`); census MATCH; the standing asks re-verified.
- **The audit**: 0C/0H/5M/11L/11I (the subagents' 6M adjudicated by
  the lead — AUDIT-1's in-app-delivery Medium moved to the accepted
  register as the documented S13-1 posture); every load-bearing finding
  hand-verified in source.
- **The parity walk**: NO DRIFT — the first fully-clean walk since the
  mobile-menu re-anchor rounds began (every control surface
  byte-identical; the hamburger aria family remains our documented
  superset).
- **R24-1 (S24-1)**: the pin RED first (the census's Appendix-B arm
  extended to the unit count + the retired-form negative), then the
  ledger re-anchored (both counts, the lineage entries, the heading's
  re-certification at session 24).
- **R24-2 (S24-2)**: the planted-defect proof on record (the nested
  fixture GREEN through the flat census — the blindness demonstrated),
  then the recursive helpers + all three arms converted, the census RED
  at 10 ≠ 9 (the mutation battery), the fixture removed.
- **R24-3 (S24-3)**: the pin RED first, then the visually-hidden
  role="status" region keyed on the sent state — the contact form's
  success announced to AT for the first time (WCAG 2.2 AA 4.1.3).
- **R24-4 (S24-4)**: the pin RED first (the sub-3:1 form banned), then
  the Copy button's ring upgraded to the S23-3 teal-600 family.
- **R24-5 (S24-5)**: the pin RED first, then the module-level
  EMPTY_TOASTS const (the uncached `() => []` banned).
- **R24-6 (S24-6)**: the pin RED first, then the seedT capture — the
  reduced-motion resize repaints the mount-time frame, never t=0.
- **R24-7 (S24-7)**: the e2e-prune datasource pinned through the seam
  (the seed's idiom); live-run verified through the seam.
- **R24-8 (S24-8)**: the landing renders `<PricingSection />`; the
  order pin co-updated (`<PricingCards />` → `<PricingSection />`).
- **R24-9 (S24-9)**: the ROUTES pin made ONE spanning ordered regex;
  the page-titles duplicate face retired (−1 test; the /Home 308
  next.config pin stays).
- **R24-10/R24-11 (S24-10/S24-11)**: the loc-absoluteness arm, the
  robots body contract, and the og-dims pin — four mutation batteries
  (relative locs, the robots trailing newline, the dims mismatch, the
  ROUTES reorder), each exactly the new pin RED, restored, GREEN.
- **Count re-anchor**: UNIT 606 → 613 (+8 pins − 1 retired face:
  docs-counts +1, a11y-controls +1, landing-page +1, toast-anatomy +1,
  effects-motion +1, seo-surfaces +3, page-titles −1), SUITES 38
  unchanged, E2E 63 unchanged, badge 669 → 676; the PAD §12 rows
  (generator-card 210, iridescence 254).
- **R24-12 (lockstep)**: README (the session-24 row, the gate line,
  the badge 676, the counts); AGENTS (counts, the plans map's
  twenty-fourth round); CLAUDE (counts); PAD (§12 rows, the
  test-distribution table, the counts); SKILL v1.19.0 → v1.20.0
  (frontmatter, Appendix B, Appendix A's session-24 row); worklog Task
  24; `docs/session_24.md` (the pre-round transcript replaced by the
  round log); this record.
- **R24-13**: captures 55/56 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified.
- **R24-14**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 613/613 (38 files) · build · smoke 15/15 · e2e
  63/63 (9 specs) · census MATCH.
- **Deferred**: the honest register carried from session 23 unchanged
  (each with its reason) + the session-24 adjudications (the
  in-app-delivery posture re-affirmed as the documented S13-1
  warn-not-fatal decision, the offscreen-rAF pause, the particle
  resize churn, the admin-bootstrap race, the Reveal no-JS trade-off,
  the non-banned oklab family, the IPv6 canonicalization, the
  E2E_PORT NaN theoretical) — each recorded in the findings table.
