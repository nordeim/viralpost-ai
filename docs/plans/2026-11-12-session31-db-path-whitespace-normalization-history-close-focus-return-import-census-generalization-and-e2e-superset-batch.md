# Session 31 — The db-Path Whitespace Normalization + The History-Close Focus Return + The Import-Census Generalization + The E2E Superset Batch (2026-11-12)

## Context

Session 30 pushed `75b3135`; the owner added `98912fa` (the session-30
execution log held as `docs/session_31.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs review
→ baseline gate → the comprehensive audit (three parallel subagents) → the
neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
644/644 (38 files) · build · smoke 15/15 · e2e 63/63 (9 specs — AUDIT-3's
live gate leg, after `bunx playwright install chromium`; the
browser-download gap is itself a finding, S31-3) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ · the
vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`) suites
in place and current ✓ · the sitemap/robots/manifest/OG family verified
live against the reference (this round's walk) ✓ · `skills/` excluded from
every gate ✓ · `.env.example` present, committed, matching the six-knob
contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/0M/1L/2I · AUDIT-2: 0C/0H/0M/1L/3I · AUDIT-3:
0C/0H/0M/1L/3I** — combined **0 Critical / 0 High / 0 Medium / 3 Low /
8 Info** at the subagent reports. The lead's adjudication takes all three
Lows plus five Info items into the working register (all cured this round
— S31-1..S31-7); the rest moves to the accepted register with reasons
(see below).

**The parity walk (live, both sides, logged into the reference with
`sepnetflix2023@outlook.com`):** the mobile-menu census at 390×844 — the
hamburger base classes byte-identical (`md:hidden p-2 text-slate-300` +
our documented S15-8/S23 superset arms; the reference still ships the
bare button, no aria family), all five mobile links + the Gumroad pill
"Upgrade to Pro – $19" byte-identical (classes, hrefs — `/Home` and the
Gumroad URL — and texts), the bar `bg-transparent` with the menu open at
scrollY=0 (byte-identical classes, both computed `rgba(0, 0, 0, 0)` —
the S26-3 cure holds), the scrolled-bar class family byte-identical with
the computed background the same color in its two spellings (our
`oklab(0.207678 -0.00293915 -0.0397103 / 0.95)` = the reference's
`rgba(15, 23, 42, 0.95)`), the open panel computed transparent both sides
at scrollY=0 (the reference's dead `bg-slate-900/98` vs our S22-5
replication — same render), the desktop nav family byte-identical, the
five-route head census — **NO DRIFT** (titles, og:title, og:description,
meta description, twitter:card byte-identical across all five routes;
canonical + og:url differ by origin only; og:image the documented D-4
self-hosted stand-in; our og:image:width/height the documented superset —
the reference ships no dims), sitemap.xml + robots.txt identical modulo
origin. **NO DRIFT FOUND — the fifth consecutive fully-clean walk.** The
functional battery passed on the clone: the login round-trip (200 →
`router.push("/")` → the `viralpost_session` cookie → the `/api/auth/me`
envelope), the aria family, the open panel (display block + 5 links),
the link-click navigate+close, the Escape close with focus return, the
history-navigation close (F10-10). The Tailwind v4 trap catalog
re-verified mitigated (AUDIT-2 compiled the real `globals.css` with the
installed tailwindcss 4.3.3 and probed the OUTPUT: zero `(hover: hover)`
queries, literal-hex `@theme`, the re-pinned `--shadow-sm`/`--blur-sm`,
no banned gradient pair, zero unmatched v4 classes across the 475-token
census).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S31-1 | **LOW** (the ops-robustness seam's residual — the S30-1 genus, one notch deeper) | `src/lib/db-path.ts:193-194` (the S30-1 `|| undefined` normalization), `:201` (the `??` tail) | The session-30 cure normalizes only the literal empty string. A WHITESPACE-only value (`" "`) is truthy on both boundary faces and passes through as a "set" value — the exact masking/skipping behavior S30-1 cured for `""`: a `DATABASE_URL=" "` process env (a quoted-space passthrough) MASKS a valid `.env` value, and a whitespace `.env` line skips the `DEFAULT_DATABASE_URL` fallback a missing line gets. Live-probed by the lead: `effectiveDatabaseUrl({envUrl: " ", envFileUrl: "file:../db/custom.db", …})` answers `" "`; `resolveDatabaseUrl(" ")` passes it through raw (not `file:`-prefixed) and Prisma fails at first query — the same loud failure shape as the pre-cure S30-1 (no wrong-DB risk; the S30-1 rationale "Prisma has no valid empty URL" applies verbatim — a whitespace URL is never legitimate). Rarer trigger than the docker `""` shape (a quoted space is a one-keystroke `.env` typo). (AUDIT-1 A1-L1; verified by a live seam probe.) |
| S31-2 | **LOW** (the a11y superset's missing third arm) | `src/components/marketing/navbar.tsx:65-69` (the history-close arm) vs `:84-94` (Escape) and `:200-203` (link-click) | The mobile menu has three close arms; two return focus to the hamburger toggle (Escape — F11-11; link-click — S25-16, added precisely because the close unloads the focused link and focus falls to `<body>`, WCAG 2.4.3). The third arm — the adjust-during-render pathname-change close (F10-10, browser back/forward) — closes the panel WITHOUT a focus return. A keyboard/AT user focused inside the open panel who triggers history navigation (iOS edge-swipe back, Alt+Left) loses their place: the panel becomes `hidden`, the focused link leaves the a11y tree, and the next Tab resumes at the document top — the exact genus S25-16 documented and cured for the click path. (AUDIT-2 A2-L1; verified in source.) |
| S31-3 | **LOW** (docs-truth: the gate's final leg is unbootable on a fresh machine) | `README.md` (the e2e testing line), `CLAUDE.md` (the setup/build table), `AGENTS.md` (the E2E commands row) | `bunx playwright install` appears NOWHERE in the doc set, and under this repo's own toolchain the browser download never happens implicitly: `package.json`'s `trustedDependencies` lists only `unrs-resolver, prisma, @prisma/client`, so bun never runs Playwright's postinstall. A fresh clone reaches the gate's final leg with zero browsers and fails with an opaque `browserType.launch: Executable doesn't exist` that reads like a suite failure — reproduced live by AUDIT-3's gate leg (first e2e attempt failed, 62 tests did not run; green after the one-time install). The repo's own convention treats operator-onboarding gaps as docs-truth defects. (AUDIT-3 A3-L1.) |
| S31-4 | **INFO→cure** (the S30-4 provenance convention, violated by a colliding number) | `src/lib/auth.ts:158-160` | The comment cites `Session-30 (S30-P3)` — a DONOR CRM-family finding id — without the explicit "(a donor-ledger number)" marker the S30-4 rule requires (the sibling sites `login/page.tsx:17` and `signup/page.tsx:17` follow it), and the number 30 COLLIDES with this repo's most recent round's finding range (S30-1..S30-5, the db-path round) — the worst-case ambiguity the convention exists to kill: a future agent auditing session-30 changes would chase a phantom `S30-P3` through this repo's plans. (AUDIT-1 A1-I1.) |
| S31-5 | **INFO→cure** (the S28-4 prose-safe doctrine + the effects contract) | (a) `src/components/marketing/navbar.tsx:19,162`; (b) `src/components/effects/reveal.tsx` (the effect's `[]` deps) | (a) Both verbatim prose mentions of the reference's dead `bg-slate-900/98` class cause the production CSS to include a never-matched `.bg-slate-900\/98` rule — Tailwind v4's candidate scanner reads comments. AUDIT-2 compiled the repo's real stylesheet and found the rule PRESENT while zero elements carry the class; the repo's own S28-4 doctrine (toast.tsx) already requires prose-safe spellings for retired class tokens. (b) `Reveal`'s observer effect closes over `direction`/`delay` with `[]` deps while the hidden style derives from them — unreachable today (every call site passes constants) but a latent stuck-hidden hazard for future dynamic usage; the contract should be pinned in the docstring (the exhaustive-deps off-switch posture). (AUDIT-2 A2-I1 + A2-I3.) |
| S31-6 | **INFO→cure** (the dead-import genus guard is one file deep) | `tests/landing-page.test.ts:151-164` (the S30-2 census); the blind spot is config-wide | The S30-2 pin retires dead imports in `sections.tsx` ONLY. With `noUnusedLocals` off and `no-unused-vars` off, a new dead import in ANY other `src/**` file passes the entire gate — the genus has struck twice (F12-11, S30-2) and is gate-blind by configuration. AUDIT-2 ran the mechanical import-vs-usage scan over all 47 `src/components` + `src/app` files: currently ZERO dead imports (the tree is clean; the guard just doesn't generalize). Cure: a general census pin in `tests/design-tokens.test.ts` (the census-owning suite — keeps SUITES at 38) that enumerates every import clause across `src/**/*.{ts,tsx}` and asserts each imported symbol occurs outside its import statement. (AUDIT-2 A2-I2.) |
| S31-7 | **INFO→cure** (the e2e superset batch — three documented postures with no behavioral pin) | (a) `tests/e2e/seo.spec.ts` (the S29-5 block); (b) `tests/e2e/session.spec.ts`; (c) `tests/e2e/reset-funnel.spec.ts` | (a) `og:image:width`/`og:image:height` are pinned at the const + asset level but not on the SERVED head (a framework metadata-rendering change would ship green while link previews degrade). (b) The docs pin "the reference serves the login card to AUTHENTICATED visitors too — no redirect" (s23-P2) but no spec navigates `/login` with the shared session cookie — a regression reintroducing `if (user) redirect("/")` would ship green. (c) The reset-password screen's failed-submit surfaces (`Passwords do not match`, the API-rejected banner, the network fallback) are e2e-unwalked — the screen's own error UI has no behavioral pin. Cures: (a) two `toHaveAttribute` arms folded into the existing S29-5 block in place (the S18-2 precedent — no count change); (b) +1 leg in session.spec (authed `/login` renders the card, no redirect); (c) +1 leg in reset-funnel.spec (garbage token → matching passwords → the `role="alert"` banner carries "Invalid or expired reset token"). (AUDIT-3 A3-I1 + A3-I2 + A3-I3.) |

**Accepted register (adjudicated this round, with reasons):** the signup
admin-bootstrap `count()` race (A1-I2 — the STANDING session-27
adjudication, re-confirmed: benign in the single-operator self-hosted
posture, requires a millisecond-window double-signup on a fresh
deployment, no security delta beyond "a second admin exists" among
first-party signups; documented, not cured). The two session-30
formatting nits (hero.tsx's stray space, generator-card's double blank
line) carry forward unchanged (the "next touch of either file" note
stands — neither file is touched this round). The standing accepted
register carries unchanged (the in-app-delivery default flip — the
owner-level deferral; the me-route unthrottled read; the 36px touch
targets; the cross-tab quota staleness).

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins first (4 new its):**
- **S31-1a**: `tests/db-path.test.ts` — the `effectiveDatabaseUrl (bun
  absolutization re-anchoring)` describe, after the S30-1 pair, gains TWO
  its:
  1. "a whitespace-only process env never masks the .env value (S31-1)" —
     `effectiveDatabaseUrl({envUrl: " ", envFileUrl: "file:../db/custom.db",
     envFileDir: "/repo"})` must resolve the `.env` value
     (`expect(url).toContain("/db/custom.db")`). RED now (returns `" "`).
  2. "a whitespace-only .env value falls back to the default (S31-1)" —
     `effectiveDatabaseUrl({envUrl: undefined, envFileUrl: " ",
     envFileDir: "/repo"})` must resolve `DEFAULT_DATABASE_URL`'s
     repo-anchored path. RED now (returns `" "`).
- **S31-2**: `tests/a11y-controls.test.ts` — the named-control source
  pins describe gains the it: "session-31 (S31-2): the history-close arm
  returns focus to the toggle (the third close arm's WCAG 2.4.3
  completion)" — pins the mechanism: the nav-close flag ref
  (`closedByNavRef`) set in the adjust-during-render block only when the
  menu was open, and the `useLayoutEffect` keyed on `pathname` that
  consumes it with `menuButtonRef.current?.focus()`. RED now (no such
  arm exists).
- **S31-6**: `tests/design-tokens.test.ts` — a new describe, "session-31
  (S31-6): the source tree's dead-import census (the F12-11/S30-2 genus,
  generalized)" — one it that walks every `src/**/*.{ts,tsx}` file,
  strips every import statement (multiline named/default/namespace/
  type-only/side-effect aware), and asserts each imported symbol's
  identifier occurs elsewhere in the file. GREEN on the current tree by
  construction (the tree is clean) — the planted-defect proof IS the
  mutation battery (below), the census-pin doctrine since session-11.

**Batch 2 — the GREEN cures:**
- **S31-1**: `src/lib/db-path.ts` — the one-home cure point gains the
  whitespace arm: `const envUrl = input.envUrl?.trim() || undefined;
  const envFileUrl = input.envFileUrl?.trim() || undefined;` with the
  S31-1 lineage comment (a whitespace-only URL is never legitimate;
  trimming at the one-home boundary keeps the bun-signature comparison
  consistent on both faces). The `if (envUrl && …)` arms and
  `readDatabaseUrlFromEnvAt`'s call sites are unchanged. Both pins GREEN.
- **S31-2**: `src/components/marketing/navbar.tsx` — the adjust-during-
  render block records `closedByNavRef.current = true` when the pathname
  changes with the menu open (an idempotent render-phase ref write, the
  adjust-during-render pattern's own escape hatch — never the banned
  `useEffect(() => setState)`); a `React.useLayoutEffect` keyed on
  `[pathname]` consumes the flag: reset it, then
  `menuButtonRef.current?.focus()`. A DOM-focus effect, not a state
  effect; fires never on mount (the flag starts false), never on the
  link-click path (the click closes before the navigation renders — the
  block sees `open === false`), exactly once per history-closed menu.
  The pin GREEN.
- **S31-4**: `src/lib/auth.ts:159` — the comment gains the donor marker:
  `// Session-30 (S30-P3 — a donor-ledger number): carried so the topbar
  avatar can render the uploaded photo (the reference's
  profile_picture).`
- **S31-5a**: `src/components/marketing/navbar.tsx:19,162` — the two
  prose mentions re-spelled prose-safe ("slate-900 at the 98-percent
  opacity step" / "its dead 98-percent panel token"), the S28-4
  doctrine. Verification: compile the repo's real `globals.css` with the
  installed `@tailwindcss/postcss` and assert the emitted CSS no longer
  carries the `bg-slate-900\/98` rule; if the rule persists (the .md
  sites under the repo root also feed the auto source detection),
  record the residual with the compile evidence in the accepted register
  (the historical-record docs are immutable by doctrine).
- **S31-5b**: `src/components/effects/reveal.tsx` — the docstring gains
  the mount-time-constants contract line (`direction`/`delay` are
  mount-time constants; the observer arms once — the exhaustive-deps
  off-switch posture documented).

**Batch 3 — the mutation batteries:**
- **S31-1**: revert the trim (back to `input.envUrl || undefined`) →
  BOTH pins RED; restore → GREEN.
- **S31-2**: remove the focus arm (drop the layout effect) → the pin
  RED; restore → GREEN.
- **S31-6**: plant a dead import (`import Link from "next/link";` in
  `footer.tsx`) → the census RED (and the S30-2 co-pin stays GREEN —
  the planted file is not sections.tsx, demonstrating the generalized
  face); remove → GREEN.

**Batch 4 — the e2e superset batch:**
- **S31-7a**: `tests/e2e/seo.spec.ts` — the S29-5 block gains two
  in-place arms: `og:image:width` = "1200", `og:image:height` = "630"
  (the S18-2 precedent — no count change).
- **S31-7b**: `tests/e2e/session.spec.ts` — +1 test: "the authenticated
  visitor still gets the login card (the s23-P2 no-redirect parity
  posture)" — `page.goto("/login")`, expect the `Welcome to ViralPost
  AI` h1 visible, expect the URL to remain `/login`.
- **S31-7c**: `tests/e2e/reset-funnel.spec.ts` — +1 test: "the
  reset-password screen surfaces the API-rejected branch (garbage token
  → the inline error banner)" — `page.goto("/reset-password?token=<garbage>")`,
  fill `#password` + `#confirmPassword` (matching), submit, expect the
  `role="alert"` banner to carry "Invalid or expired reset token".

**Batch 5 — the docs batch + the count re-anchor (constants FIRST — the session-29/30 lesson):**
- `tests/docs-counts.test.ts`: the count-ladder comment's session-31
  entry; UNIT 644 → **648** (+2 S31-1a, +1 S31-2, +1 S31-6), E2E 63 →
  **65** (+2 S31-7b/c), SUITES 38 unchanged, SMOKE 15 unchanged, badge
  707 → **713**.
- **S31-3**: the playwright browser-install line at three sites —
  README's e2e testing line, CLAUDE's build-commands table + setup
  note, AGENTS' Commands E2E row (`bunx playwright install chromium`,
  the one-time browser download; bun's `trustedDependencies` skips
  Playwright's postinstall).
- PAD: §8.1 test-distribution table (648/65); §12 rows re-anchored to
  the live `wc -l` (db-path.ts + the trim lines, navbar.tsx + the focus
  arm — the inventory census pins them); §11 unchanged (the accepted
  register items are adjudicated here, not new register rows).
- README: the session-31 status row, the gate line, badge 713, the
  counts.
- AGENTS: the counts, the plans map's thirty-first round, the S31-3
  line.
- CLAUDE: the counts, the S31-3 line.
- SKILL v1.26.0 → v1.27.0: frontmatter (version, date, project_state),
  §0.5's range `1..30` → `1..31`, Appendix A's session-31 row, Appendix
  B's counts, the pre-ship checklist counts.
- The five S30-4 provenance sites re-anchored `session_1..30.md` →
  `session_1..31.md` (SKILL §0.5, `.env.example`, `tests/boot-env.test.ts`,
  `tests/error-boundaries.test.ts`, `tests/auth-reset.test.ts`).
- worklog Task 31; `docs/session_31.md` replaced with this round's log;
  this plan's post-execution record.

**Batch 6 — the captures (the owner-instructed dev-server posture, the
session-29/30 precedent):** 69/70 under `docs/screenshots/` — (69) the
mobile-menu open clean-walk at 390×844 post-S31-2 (the cured surface,
functionally verified open), (70) the reset-password error banner (the
S31-7c surface). PIL-verified (non-trivial dimensions + color depth).

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record
   (S31-6's census: the planted-defect proof per the census-pin
   doctrine).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit 648/648 (38 files) · build ·
   smoke 15/15 · e2e 65/65 (9 specs) · census MATCH.
3. The db-path seam: a whitespace-only process env never masks a valid
   `.env` value; a whitespace-only `.env` value falls back to the
   default; both pinned; the wrong-DB hazard classes stay closed; the
   S30-1 empty-string pins stay green.
4. The mobile menu's third close arm (history navigation) returns focus
   to the toggle, pinned, without touching the Escape/click arms' focus
   contracts.
5. The dead-import census generalizes the genus guard across
   `src/**/*.{ts,tsx}`; the sections.tsx S30-2 co-pin documented.
6. The three e2e superset legs land (og dims in place; +2 tests); the
   authed-/login posture and the reset-error banner are behaviorally
   pinned.
7. The playwright browser-install prerequisite documented at the three
   operator sites.
8. Captures 69/70 on the dev server, PIL-verified, under
   `docs/screenshots/`.
9. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit; the docs-counts
   constants re-anchored FIRST.
10. Conventional Commit to main; SSH-wrapper push (dry-run first, key
    shredded after).

## Post-execution record

Executed as planned, with the mid-round notes on record:

- **The plan's projection was exact: UNIT 644 → 648 (+4 pins — S31-1a
  ×2, S31-2 ×1, S31-6 ×1), E2E 63 → 65 (+2 — S31-7b, S31-7c), SUITES
  38 unchanged, badge 707 → 713.** The reality census confirmed 648/38
  and 65/9 on disk before any doc site was touched.
- **One mid-cure lint catch (the round's design lesson)**: the S31-2
  cure first shipped as a render-phase ref write (`closedByNavRef` —
  the adjust-during-render one-shot-flag shape the plan described). The
  gate's lint leg rejected it: `react-hooks/refs` ("Cannot access refs
  during render" — the React-Compiler-era rule the repo's
  eslint-config-next carries). The redesigned cure records the
  pre-close open state as STATE (`setMenuWasOpen(open)` in the
  adjust-during-render block — a sanctioned state adjustment, never a
  ref write) and the pathname-keyed `useLayoutEffect` focuses the
  toggle when `menuWasOpen` is true. The pin re-anchored to the final
  mechanism in the same sequence; the mutation battery re-proven on
  the new shape (the effect removed → both the S31-2 pin and the
  S25-16 family-count pin RED; restored → GREEN).
- **One in-flight e2e locator catch**: the S31-7c leg's
  `getByRole("alert")` resolved to TWO elements — the screen's banner
  AND Next.js's own route announcer (`__next-route-announcer__`,
  aria-live assertive, also role="alert"). The banner itself worked
  (the strict-mode violation listed the banner first with the exact
  expected text); the locator now scopes to `form [role="alert"]`.
- **The S31-5a residual, adjudicated with compile evidence**: the src/
  comment sites are re-spelled prose-safe, but the compiled stylesheet
  STILL carries the `.bg-slate-900\/98` rule — Tailwind v4's auto
  source detection scans `.md` files too (isolated-test-verified: a
  markdown file carrying the literal emits the rule), and the
  immutable historical-record docs (worklog.md, docs/session_*.md —
  the records doctrine forbids re-spelling them) carry the verbatim
  spelling. The ~100-byte never-matched rule is ACCEPTED with this
  evidence; the src/ face (the app-code doctrine face) is cured.
- **Every mutation battery on record**: the S31-1 trim reverted → both
  pins RED; the S31-2 focus arm removed (both shapes) → the S31-2 pin
  + the S25-16 family-count pin RED; the S31-6 dead import planted
  (WandSparkles in footer.tsx) → the census RED with the file + symbol
  named. All restored → GREEN (footer.tsx byte-identical after the
  round-trip).
- **Live verification**: the parity walk (both sides, logged into the
  reference — NO DRIFT, the fifth consecutive fully-clean walk; the
  mobile-menu functional battery incl. the history close; the login
  round-trip) and the S31-1 seam probe (the whitespace `" "` answers
  reproduced pre-cure).
- **Count-re-anchor order held**: the docs-counts constants FIRST
  (644→648, 63→65), the census then walked the doc sites GREEN in one
  pass (10 transient REDs between the constants edit and the walk —
  resolved in two passes: the count sites, then the PAD §12 rows the
  cures' own line-count deltas produced: db-path 292→297, navbar
  233→260, auth 188→189).

**Final state:** lint 0/0 · tsc 0 · unit **648/648** (38 files; +4
pins) · build · smoke 15/15 · e2e **65/65** (9 specs; +2 legs) ·
census MATCH · badge **713**. Captures 69/70 PIL-verified on the dev
server (the mobile-menu open clean-walk — functionally verified open:
display block + 5 links + aria-expanded — and the reset-password error
banner with the exact API-rejected text). Docs lockstep: README (the
session-31 row, the gate line, badge 713, the counts, the
playwright-install line) + AGENTS (counts, the plans map's thirty-first
round, the E2E row's install note) + CLAUDE (counts, the install note)
+ PAD (§8.1 table, §12 rows, the counts) + SKILL v1.26.0 → v1.27.0
(frontmatter, §0.5's range 1..31, Appendix A's session-31 row,
Appendix B, the pre-ship checklist counts) + the five provenance sites
re-anchored to `1..31` + worklog Task 31 + the session log + this
post-execution record. Pushed to main via the SSH wrapper (dry-run
first, key shredded after).
