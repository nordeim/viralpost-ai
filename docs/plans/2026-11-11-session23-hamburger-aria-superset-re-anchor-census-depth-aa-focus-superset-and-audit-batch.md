# Session 23 — The Hamburger-Aria Superset Re-Anchor + The Census Depth + The AA Focus Superset + The Audit Batch (2026-11-11)

## Context

Session 22 pushed `254cf9c` (the mobile-menu re-anchor + the chunk-recovery
storage + the panel scroll arm + the audit batch); the owner added `f4ae48c`
(the session-22 round log held as `docs/session_23.md`'s pre-round
transcript). This round re-ran the standing instruction against the merged
tree: docs review → baseline gate → the comprehensive audit (three parallel
subagents) → the neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session
12 — the recorded decisions stand) → the live reference parity walk → the
TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
599/599 (37 files) · `.env`'s `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root (the contract verified end-to-end on the clean
clone) · vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`)
suites in place and current ✓ · sitemap.xml / robots.txt / manifest /
OG family byte-verified against the live reference ✓ · `skills/` excluded
from every gate (tsconfig/eslint/vitest, all explicit) ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/3L/4I · AUDIT-2: 0C/0H/4L/3I · AUDIT-3: 0C/0H/0M/6L/7I**
— combined **0 Critical / 0 High / 0 Medium / 13 Low / 14 Info** at the
subagent reports; the lead's hand-verification then upgraded one finding
(S23-8 — the INTERNAL-envelope-answers-400 shape is a correctness bug on
TWO sites, not a style note on one), for a working register of
**0C / 0H / 1M / 12L / 14I**.

**The parity walk (live, both sides, logged into the reference):** the
five-route head census (title/description/og/twitter/canonical) — NO DRIFT
(the session-19 description family holds byte-for-byte). The desktop nav
family + the desktop pill — NO DRIFT. The mobile-menu control census at
390×844 — the pill text "Upgrade to Pro – $19" + the bare pill classes +
the bare link family ALL byte-identical to the session-22 re-anchors (the
reference's revert held). The panel over the hero — transparent on both
sides (the dead-/98 render). The three sRGB brand gradients (wordmark /
monetization headline / Get-Unlimited-Access CTA), the footer CTA, the
/Pricing CTA trio, the landing heading tree, the monetization floaters
(11 absolute-positioned lucide icons, same color families, live transforms)
— ALL byte-identical. Sitemap.xml + robots.txt — identical
(origin-difference only). The clone's generator round-trip green. The
clone's menu supersets live-verified: Escape-close with focus return,
route-change close, the scrolled-panel darkening (R22-4's cure).

**BUT the hamburger census found THE REFERENCE REMOVED ITS ARIA FAMILY**
(absent in both the open and closed states — the button carries ONLY
`class="md:hidden p-2 text-slate-300"`; session-22's S22-22 capture of
aria-expanded + the relabeling Open/Close label + aria-controls was another
transient deploy state, the mirror image of session-21's pill capture):

| ID | Severity | Surface | Drift |
|---|---|---|---|
| S23-1 | **MEDIUM** (comment-truth/parity) | `src/components/marketing/navbar.tsx:9-11` + SKILL §8 | The reference's hamburger NO LONGER ships the aria family — our session-22 re-anchor ("the LIVE reference now ships this family itself — ours is PARITY there") is stale. Decision: KEEP our aria family as a DOCUMENTED SUPERSET (the reference has now flip-flopped twice: absent sessions 1–21, present session 22, removed session 23 — chasing its deploy state would remove a WCAG 4.1.2 state/label contract the a11y doctrine holds; the Escape-close + route-change-close supersets already ride this genus). The comments re-anchor to the superset truth. |

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S23-1 | **MEDIUM** (comment-truth) | `navbar.tsx:9-11`, `viralpost-ai_SKILL.md` §8 | The hamburger-aria "parity" claims are stale (the reference removed the family — the drift table above). |
| S23-2 | **LOW** (comment-truth) | `src/components/marketing/hero.tsx:88-100` | The S22-20 rationale comment asserts the portrait "rides the hero's lazy default" — a plain `<img>` with no `loading` attribute is EAGER (the HTML missing-value default); only `next/image` defaulted to lazy. The comment added to fix the prior Info introduces a false behavioral claim. (AUDIT-2 A2-1.) |
| S23-3 | **LOW** (a11y, WCAG 2.4.1) | `src/app/(site)/layout.tsx:33` | The skip link targets `<main id="main-content">` without `tabIndex={-1}` — WebKit historically does not move sequential focus to non-focusable fragment targets (the link scrolls but the next Tab resumes at the document top, defeating the bypass for Safari keyboard users). (AUDIT-2 A2-3.) |
| S23-4 | **LOW** (React 19) | `src/components/ui/toast.tsx:56-64` | `useToasts()` seeds `useState(toasts)` + subscribes in an effect — a missed-update window (a toast pushed during a sibling's mount effect emits to zero listeners) and no tear protection under concurrent rendering. The designated primitive (`useSyncExternalStore`) is already used for the same-shaped store in `generator-card.tsx`. (AUDIT-2 A2-2.) |
| S23-5 | **LOW** (hygiene) | `src/lib/chunk-recovery.ts:92,111` | Redundant `storage?.` optional chaining downstream of the S22-4 `if (!storage) return false` guard — dead defensiveness contradicting the guard two statements above. (AUDIT-1 A1-1.) |
| S23-6 | **LOW** (hygiene) | `src/lib/boot-env.ts:135,154` | The `["VIRALPOST_DISABLE_IN_APP_OTP", …_RESET"]` literal is written out twice in back-to-back loops — a third knob joining the family must be edited in four places, two unnamed. (AUDIT-1 A1-2.) |
| S23-7 | **LOW** (hygiene) | `src/lib/db-path.ts:219-221` | `runtimeDatabaseUrl` inlines an exact duplicate of `effectiveDatabaseUrl`'s bun-signature check immediately before calling it — a future edit to one copy silently diverges the seam's two faces. (AUDIT-1 A1-3.) |
| S23-8 | **MEDIUM** (correctness) | `src/app/api/contact/route.ts:54`, `src/app/api/generate/route.ts:119` | Both catch arms return the INTERNAL envelope through `fail(...)` WITHOUT the status argument — `fail()`'s default is **HTTP 400**, so a server-side DB/generator failure answers as a CLIENT error, violating the house status discipline ("400 bad input… INTERNAL → 500" — every auth route uses `ERR.INTERNAL()`; the audit's A1-6 hand-verification found the contact site and the lead's re-read found the second + the true default-status shape). The generate arm's surface-specific message ("Generation failed…") is unpinned — the explicit-500 form keeps it. |
| S23-9 | **INFO** (comment-truth) | `src/components/effects/iridescence.tsx:12-13` | The header says reduced motion "renders its t=0 frame once" — the single frame sits at t≈mount-time (the rAF timestamp), not t=0. The observable contract holds; only the detail is wrong. (AUDIT-2 A2-7.) |
| S23-10 | **LOW** (census) | `tests/docs-counts.test.ts:262-265` | The unit census scans `tests/` FLAT while the runner matches `tests/**/*.test.ts` recursively — a nested suite would be executed by vitest but invisible to every census arm (UNIT, the forms-guard, the loop-guard all scan flat): the badge-drift genus one directory level deeper. The src side already scans recursively. (AUDIT-3 A3-1.) |
| S23-11 | **LOW** (smoke) | `scripts/smoke-test.sh:89,176` | The two health-wait loops retain bare `curl -sf` — the S22-12 bounding covered only the ladder's two helpers. A wedged server (TCP accept, no response) hangs curl indefinitely: the `seq 1 30` time bound is fiction. (AUDIT-3 A3-2.) |
| S23-12 | **LOW** (lockfile) | `bun.lock:6` | The workspace name is the scaffold's `"activity-map"` vs `package.json`'s `"viralpost-ai"` — stale since the initial scaffold, surviving every re-anchor. (AUDIT-3 A3-3.) |
| S23-13 | **LOW** (census) | `tests/docs-counts.test.ts:319` | The S22-15 anti-dodge regex's `[^)]*` cannot cross a `)` inside the loop head (`for (const p of paths.filter(x)) { test(…) }` evades); `while (`/`for await (` are uncovered. The comment asserts more than the regex delivers. (AUDIT-3 A3-4.) |
| S23-14 | **LOW** (coverage) | `src/app/manifest.json/route.ts` | The manifest body contract (name/short_name/description/icons/start_url/display/theme_color/background_color/scope — the route's own "field-for-field" parity claim) is pinned nowhere: a dropped theme_color ships green through every layer. (AUDIT-3 A3-5.) |
| S23-15 | **LOW** (coverage) | `src/app/sitemap.xml/route.ts` | The sitemap XML envelope (the `<?xml …?>` declaration + the sitemaps.org xmlns — the format layer the route handler exists to control) has no assertion at any layer. (AUDIT-3 A3-6.) |
| S23-16 | **INFO** (docs) | `tests/e2e/a11y.spec.ts:31-56` | The stats band's bare `text-white` over the teal gradient (values + labels, ≈2.49:1 on the teal-500 half — the reference's own design) is missing from the SANCTIONED register while its siblings (`text-teal-100/70`) are recorded — the adjudication record is incomplete for it. (AUDIT-2 A2-5.) |
| S23-17 | **INFO** (smoke) | `scripts/smoke-test.sh:63-64` | `db:push`/`db:seed` swallow ALL failure output under `set -euo pipefail` — a locked SQLite file aborts the gate with zero diagnostics. (AUDIT-3 A3-7.) |
| S23-18 | **INFO** (hygiene) | `next.config.ts:40`, `scripts/smoke-test.sh:187` | `server.log` (created by the `start` script) is absent from both artifact-hygiene lists while `dev.log` is in both. (AUDIT-3 A3-8.) |
| S23-19 | **INFO** (config) | `package.json` | No `packageManager` field — the whole gate assumes bun with no early signal in a node-only environment. (AUDIT-3 A3-11.) |
| S23-20 | **INFO** (e2e) | `tests/e2e/landing.spec.ts:68-73` | The "/Home 308-redirects" test never asserts 308 (`page.goto` follows redirects; the status is pinned only by smoke leg 05) — the test's name overstates its assertion. (AUDIT-3 A3-12.) |
| S23-21 | **LOW** (a11y, WCAG 1.4.11) | `generator-card.tsx:150`, `contact-form.tsx:22` | The two highest-traffic input surfaces' focus styles (`focus:ring-teal-500/20 focus:border-teal-400` on white — the border ≈1.86:1, the 20%-alpha ring ≈1.2:1) compute under the 3:1 focus-indicator floor. The classes are the reference's own (parity), but the house genus (S14-6/S15-8/S22-10) supersets a keyboard-only `focus-visible:` layer without touching the reference's base classes. (AUDIT-2 A2-4.) |
| S23-22 | **INFO** (e2e) | `tests/e2e/global-setup.ts`, `prisma/seed.ts` | The e2e scratch database accumulates funnel users across runs (`e2e-${Date.now()}@example.com` rows never pruned — 3 users after one gate run); harmless to correctness, unbounded growth + stale scratch rows. (AUDIT-3 A3-9.) |

**Verified, no action (the honest-deferred register):** the hex-prefixed
`VIRALPOST_PROXY_HOPS` radix-10 footnote (fail-safe direction, just
re-anchored S22-18 — A1-4); `detectNiche`'s bidirectional substring
matching (the module's own small-mapper design with the evergreen
fallback — A1-5); the whitespace-only `AUTH_SECRET` theoretical (both
gates agree; a coordinated change for a pathological input — A1-7);
the particle-text per-resize re-rasterization (transient churn during
window-drag storms only — A2-6); the manifest's 192x192-declared/
512x512-actual icon pair (the reference's own platform behavior — A3-10);
the lowercase `/home` 404 (the design-accepted casing doctrine — A3-13);
plus the register carried from session 22 unchanged (each with its
reason — re-read, nothing new to add).

## Remediation (TDD where a contract changes)

- **R23-1 (S23-1, comment-truth + live evidence)**: the navbar header
  comment + SKILL §8 re-anchor — the reference's hamburger aria family
  was a TRANSIENT deploy state (present session 22, removed session 23);
  ours is a DOCUMENTED SUPERSET again (WCAG 4.1.2 state/label + the
  Escape-close/route-change-close genus). The aria pins
  (`a11y-controls.test.ts` — OUR behavior) stay green unchanged.
- **R23-2 (S23-2, comment-truth)**: the hero portrait comment rewords to
  the eager truth (the plain-img default IS eager; the reference's SPA
  behaves identically — parity holds; non-LCP + explicit width/height
  carry the CLS contract).
- **R23-3 (S23-3, TDD)**: the pin FIRST — a11y-controls.test.ts's skip-link
  pin extends to `tabIndex={-1}` on the main. RED. GREEN: the target gains
  the attribute.
- **R23-4 (S23-4, TDD)**: the pin FIRST — a toast pin on the
  `useSyncExternalStore` call shape (the codebase's own generator-card
  precedent). RED. GREEN: `useToasts` converts — a stable exported
  `subscribe` over the listeners Set + `() => toasts` snapshot + `() => []`
  server snapshot.
- **R23-5 (S23-5, hygiene)**: the two `storage?.` sites drop the dead `?.`
  (the S22-4 guard owns the null face; the existing chunk-recovery pins
  stay green).
- **R23-6 (S23-6, hygiene)**: `DISABLE_KNOBS` hoisted as one const beside
  `KNOWN_VIRALPOST_VARS`; both loops consume it.
- **R23-7 (S23-7, TDD)**: the db-path fixtures stay green while the inline
  duplicate early-return is deleted (the tail `effectiveDatabaseUrl` call
  performs the same test — behavior-neutral consolidation, proven by the
  existing 263-line suite).
- **R23-8 (S23-8, TDD)**: the pins FIRST — an api-contract pin that both catch arms
  answer 500 (the status discipline: the INTERNAL envelope NEVER rides
  400). RED. GREEN: contact → `ERR.INTERNAL()` (the byte-identical
  sibling idiom); generate → the explicit-500 form (its surface-specific
  message preserved).
- **R23-9 (S23-9, comment-truth)**: the iridescence header rewords to
  "renders a single static frame and the loop stops".
- **R23-10 (S23-10, TDD)**: the planted-defect proof FIRST — a nested
  fixture `tests/nested-census-fixture.test.ts` (1 throwaway test)
  demonstrates the flat scan's blindness (the runner executes it, the
  census cannot see it), then the census's unit arm scans `tests/`
  recursively (mirroring the src arm) — the census now REDs until the
  fixture is counted, the fix's mutation battery. Fixture removed after
  the proof; the recursive scan stays.
- **R23-11 (S23-11)**: both smoke wait-loop curls gain `--max-time 2`
  (the cadence stays honest — a wedged server fails the leg in ≤2s/cycle).
- **R23-12 (S23-12)**: `bun install` regenerates the lock under the
  correct workspace name (the package-manager-sanctioned way; verified
  with `--frozen-lockfile --dry-run` after).
- **R23-13 (S23-13, TDD)**: the anti-dodge guard's loopShapes hardens —
  the loop head crosses parens (greedy same-line match), `while (` joins
  the family; the decoy shapes (a `paths.filter(x)` head, a
  const-first-statement body) verified RED before the regex lands.
- **R23-14 (S23-14, TDD)**: a new `tests/seo-surfaces.test.ts` pin — the
  manifest's nine fields + the content-type (import the route module, call
  GET, parse the JSON). RED. GREEN: (already green — the route is
  correct; the pin closes the coverage gap).
- **R23-15 (S23-15, TDD)**: the same suite pins the sitemap envelope —
  the XML declaration, the sitemaps.org xmlns, the four `<url>` blocks
  with the priority split, LF-only, no trailing newline.
- **R23-16 (S23-16)**: the SANCTIONED register gains the stats band's
  `text-white` entries (the parity-doctrined divergence, now recorded).
- **R23-17 (S23-17)**: the smoke db:push/db:seed redirects route to a
  temp file `cat`ed on failure (the diagnostics survive the `set -e`).
- **R23-18 (S23-18)**: `server.log` joins both hygiene lists
  (`next.config.ts`'s excludes + the smoke leg's loop).
- **R23-19 (S23-19)**: `packageManager: "bun@1.3.14"` in package.json.
- **R23-20 (S23-20)**: the /Home e2e test owns the status itself —
  `request.get("/Home", { maxRedirects: 0 })` → 308 + the Location header
  (in place; counts unchanged — the S18-2 precedent).
- **R23-21 (S23-21, TDD)**: the pin FIRST — the focus-visible superset
  family (`focus-visible:ring-2 focus-visible:ring-teal-600`, ≈3.05:1 on
  white — the 1.4.11 floor) on both input surfaces, keyboard-only, the
  reference's base classes untouched. RED. GREEN: both surfaces gain the
  family.
- **R23-22 (S23-22)**: the e2e global setup prunes the scratch rows
  (`deleteMany({ where: { email: { startsWith: "e2e-" } } })` after the
  seed — the setup's own idempotency, the file stops growing).
- **R23-23 (lockstep)**: the count ladder re-anchored at the ship census
  (UNIT → the live count, SUITES 37 → 38, E2E unchanged 63, badge
  arithmetic); the PAD §12 line-count rows for every edited file; README
  (the session-23 row, the gate line, the badge); AGENTS (counts, the
  plans map's twenty-third round); CLAUDE (counts); PAD (§12 rows); SKILL
  v1.18.0 → v1.19.0 (frontmatter, §8's aria re-anchor, Appendix A's
  session-23 row); worklog Task 23; `docs/session_23.md` (the pre-round
  transcript replaced by this round's log); this plan's post-execution
  record.
- **R23-24**: captures 53/54 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited, the menu DOM-confirmed open before the shot),
  PIL-verified.
- **R23-25**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first, key shredded
  after).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The hamburger-aria claim re-anchored to the superset truth (comment +
   SKILL §8); no stale "parity" claim survives.
3. The census scans `tests/` recursively (the planted-defect proof on
   record); the anti-dodge shapes hardened with decoy-verified REDs.
4. The manifest + sitemap envelope contracts pinned; the skip-link target
   focusable; the toast store on useSyncExternalStore; the focus-visible
   superset on both input surfaces (pinned).
5. The config/script batch lands (bounded wait curls, the lockfile name,
   the hygiene lists, packageManager, the smoke diagnostics, the e2e
   prune).
6. The docs lockstep at the final counts; captures 53/54 PIL-verified.

## Post-execution record (appended at ship)

- **Baseline**: lint 0/0 · tsc 0 · unit 599/599 (37 files) on the
  merged tree (`f4ae48c`); census MATCH; the standing asks re-verified.
- **The audit**: 0C/0H/1M/12L/14I (the subagents' 0M/13L/14I upgraded
  by the lead's hand-verification — the INTERNAL-answers-400 shape on
  TWO sites); every load-bearing finding hand-verified in source.
- **The parity walk**: the reference live (the five-route head census +
  the control census + the floaters + sitemap/robots) + the clone's dev
  server — ONE drift (the hamburger aria family, removed again by the
  reference), everything else byte-identical.
- **R23-1 (S23-1)**: the navbar header comment + SKILL §8 re-anchored —
  the reference's aria family was a transient deploy state (the
  flip-flop twice-observed); ours STAYS as the documented superset.
- **R23-2 (S23-2)**: the hero portrait comment reworded to the eager
  truth (the "lazy default" claim was false for a plain `<img>`).
- **R23-3 (S23-3)**: the pin RED first, then `tabIndex={-1}` on the
  main (the old pin co-updated). Live-verified: the focus lands ON the
  main.
- **R23-4 (S23-4)**: the pin RED first, then the useSyncExternalStore
  conversion (subscribeToasts + the stable snapshots; the Listener
  simplified to the bare change signal).
- **R23-5..R23-7 (the hygiene batch)**: the chunk-recovery `?.`
  retired, the DISABLE_KNOBS const, the db-path duplicate early return
  consolidated (behavior-neutral, the fixture suite green).
- **R23-8 (S23-8)**: the pin RED first (the no-INTERNAL-at-400 census
  arm), then contact → `ERR.INTERNAL()` + generate → the explicit 500.
- **R23-9 (S23-9)**: the iridescence header reworded (the static frame
  sits at mount-time, not t=0).
- **R23-10 (S23-10)**: the planted-defect proof on record (the nested
  fixture executed invisibly to the flat census), then the recursive
  `unitTestFiles()` scan across all three arms; the fixture removed
  after the proof.
- **R23-11 (S23-11)**: `--max-time 2` on both smoke health-wait loops;
  `bash -n` clean; the 15-leg count unchanged.
- **R23-12 (S23-12)**: the bun.lock name re-anchored (hand-edit + the
  frozen-lockfile dry-run verification — `bun install` reported no
  changes).
- **R23-13 (S23-13)**: the loopShapes hardened (paren-crossing heads +
  while/for-await) with the five-decoy battery pinned in the census.
- **R23-14/R23-15 (S23-14/S23-15)**: `tests/seo-surfaces.test.ts` —
  the manifest nine-field + key-order + content-type pin, the sitemap
  envelope + formatting pin, the ROUTES source-shape pin (coverage
  pins, GREEN at birth — the routes were correct; the gap was the
  missing pin).
- **R23-16 (S23-16)**: the stats band's `text-white` in the SANCTIONED
  register.
- **R23-17 (S23-17)**: the smoke db:push/seed output captured + cat-ed
  on failure.
- **R23-18 (S23-18)**: `server.log` in both hygiene lists
  (next.config.ts + the smoke leg).
- **R23-19 (S23-19)**: `packageManager: "bun@1.3.14"`.
- **R23-20 (S23-20)**: the /Home 308 owned at e2e (the no-redirect
  request → 308 + Location; counts unchanged).
- **R23-21 (S23-21)**: the pin RED first, then the
  `focus-visible:ring-2 focus-visible:ring-teal-600` superset on both
  input surfaces. Live-verified: the ring renders.
- **R23-22 (S23-22)**: `scripts/e2e-prune.ts` + the global-setup call
  (the e2e- prefix scoped; the demo upsert untouched).
- **Count re-anchor**: UNIT 599 → 606 (+7: seo-surfaces +3,
  a11y-controls +1, toast-anatomy +1, api-robustness +1, landing-page
  +1), SUITES 37 → 38 (the new file), E2E 63 unchanged, badge 662 →
  669; the PAD §12 rows (db-path 267, navbar 210, iridescence 243,
  smoke 212); the ladder comment's s23 entry.
- **R23-23 (lockstep)**: README (the session-23 row, the gate line, the
  badge, the tree diagram); AGENTS (counts, the plans map's
  twenty-third round); CLAUDE (counts); PAD (§12 rows, the tree
  diagram); SKILL v1.18.0 → v1.19.0 (frontmatter, §8's aria
  re-anchor, Appendix A's session-23 row); worklog Task 23;
  `docs/session_23.md` (the pre-round transcript replaced by the round
  log); this record.
- **R23-24**: captures 53/54 (the landing 1280×800 + the OPEN mobile
  menu 390×844, via `localhost`, hydration awaited, the menu
  DOM-confirmed open before the shot), PIL-verified (53: 99.9%
  non-white, 75.1% dark hero; 54: 95.2% dark upper-third).
- **R23-25**: the full gate GREEN on the exact commit tree — lint
  0/0 · tsc 0 · unit 606/606 (38 files) · build · smoke 15/15 · e2e
  63/63 (9 specs) · census MATCH.
- **Deferred**: the honest register carried from session 22 unchanged
  (the signup admin-bootstrap race, the logout-CSRF posture, the
  section-header duplication, the Reveal no-JS trade-off, the
  offscreen-rAF pause, the h2-only swap headings, the per-account
  login lockout, scryptSync, the toast live regions, the error.tsx
  forced-error surface, the start tee pipe) + the session-23
  adjudications (the hex-hops radix-10 footnote, the detectNiche
  substring design, the whitespace AUTH_SECRET theoretical, the
  particle per-resize churn, the manifest icon-size parity, the
  lowercase-/home doctrine) — each with its reason in the findings
  table.
