# Session 3 — The Rename-Completion Audit (2026-11-09)

## Context

Session 2 pushed `1e6a341` (the /Dashboard decode + relic sweep + docs rebuild);
the owner added `a822770` (`docs/session_2.md`, the session log). This round
re-runs the standing instruction against the merged tree: docs review →
codebase validation → fresh audit (repo skills: `web-application` §15 gate +
§2 env contract, `security-and-hardening` three-tier boundary) → parity
re-verification → remediation → gate → push.

## Verified-clean (no action)

| Surface | Evidence |
|---|---|
| Reference parity — landing, mobile menu (390×844), /Dashboard 404 + derived title | Live spot-check 2026-11-09: structure + title byte-identical to the clone's contract; no drift since session 2 |
| Sitemap/robots/SEO | `src/app/sitemap.xml/route.ts` + `robots.txt/route.ts` (reference-exact formats), root layout metadata (OG/Twitter/PWA), `manifest.json`, icon file conventions, `/Home` 308 canonicalization |
| `.env` DATABASE_URL contract | `file:../db/custom.db`, `db/` at repo root, `db-path.ts` seam + fixture tests |
| Vitest/Playwright configs | Present, correct isolation (unit `*.test.ts` vs e2e `*.spec.ts`, own port + own `db/e2e.db`) |
| Docs count-lockstep | 29 files/402 unit, 8 specs/48 e2e, 9 runtime deps — all match the tree |
| Fast gates on HEAD | lint 0/0 · tsc 0 · unit 402/402 |

## Findings

The session-2 `NEO_*` → `VIRALPOST_*` env rename (F-4) was **incomplete at the
guard layer** — the knob *values* were renamed but the machinery that protects
them still speaks the old dialect:

| # | Finding | Severity |
|---|---|---|
| F3-1 | `boot-env.ts` flag-typo guard scans only the `NEO_` prefix (`key.startsWith("NEO_")`) — a typo'd `VIRALPOST_*` knob (e.g. `VIRALPOST_DISABLE_INAPP_OTP`) **silently no-ops with no warning**. The guard's entire purpose (catch mistyped kill-switch names) is defeated for the names the code now reads. | HIGH |
| F3-2 | `playwright.config.ts` webServer env pins `NEO_DISABLE_IN_APP_OTP/_RESET` — dead names; the D-195a3 e2e-isolation pin is inert (a polluted parent shell exporting the `VIRALPOST_*` spelling would now break e2e with confusing symptoms — the exact hazard the pin exists to prevent). | HIGH |
| F3-3 | `KNOWN_NEO_VARS` export name + stale comments (boot-env.ts lines 23/28/35/72, login-card.tsx line 89, tests/boot-env.test.ts header) still describe the "NEO_* family". | MED |
| F3-4 | `[...catchAll]/page.tsx` still carries its own `generateMetadata` — probe-verified dead (discarded by `notFound()`), superseded by the layout's copy in R-1's final architecture; its comment misattributes the mechanism. | LOW |
| F3-5 | `next.config.ts` `outputFileTracingExcludes` lists `neo-crm-homepage.png` — a file that does not exist in this repo (scaffold relic). | LOW |
| F3-6 | Local untracked `.env` still sets the `NEO_*` spellings + a `neo_crm` postgres example — behavior-neutral (all empty) but stale vs the contract; post-fix it would trip the new legacy warning on every boot. | LOW |
| F3-7 | No test pin for the unknown-`VIRALPOST_*` warning (the gap that let F3-1 through). | MED |

## Remediation (TDD)

- **R3-1** (F3-1/F3-3/F3-7): rewrite the guard seam —
  rename the export to `KNOWN_VIRALPOST_VARS`; scan the `VIRALPOST_` prefix
  for unknowns (the typo guard proper); scan the `NEO_` prefix as the legacy
  migration hint (maps `NEO_X` → `VIRALPOST_X` in the message; an unmappable
  legacy name gets the general typo guidance). RED pins first in
  `tests/boot-env.test.ts`, then GREEN, then comment sweep.
- **R3-2** (F3-2): `playwright.config.ts` env pins → the `VIRALPOST_*` spellings.
- **R3-3** (F3-4): delete the dead `generateMetadata` from the catch-all page;
  its comment now attributes the title to the segment layout. Protected by the
  13 route-title unit pins + the e2e derived-title assertion + a live
  production curl (title + 404 status).
- **R3-4** (F3-5): drop the `neo-crm-homepage.png` exclude entry.
- **R3-5** (F3-6): refresh the local `.env` to the current contract.
- **R3-6**: docs lockstep — PAD (boot-guard row), SKILL (§2 env contract note),
  AGENTS (env-name fact), worklog Task 3, this file's execution record.
- **R3-7**: full gate + production boot verification + evidence screenshots
  (the /Dashboard title through the layout-only metadata path).
- **R3-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run first).

## Execution record

- **R3-1** (TDD): RED — 3 failing pins added to `tests/boot-env.test.ts`
  (unknown-`VIRALPOST_*` typo form · legacy-mappable `NEO_PROXY_HOPS` hint ·
  legacy-unmappable guidance) + the `KNOWN_VIRALPOST_VARS` import rename +
  an unrelated-names no-false-positive pin; GREEN — `boot-env.ts` rewritten
  as the dual-prefix scan (typo warning for unknown `VIRALPOST_*`; legacy
  warning for any `NEO_*`, mapping `NEO_X` → `VIRALPOST_X` where one
  exists); 23/23 in the file. Comments swept (boot-env header,
  login-card, the test header).
- **R3-2**: `playwright.config.ts` pins renamed to
  `VIRALPOST_DISABLE_IN_APP_OTP/_RESET` (the D-195a3 guard re-armed — with
  a comment recording the disarm).
- **R3-3**: the dead `generateMetadata` deleted from
  `[...catchAll]/page.tsx`; comment now attributes the title to the segment
  layout.
- **R3-4**: `neo-crm-homepage.png` dropped from the excludes list.
- **R3-5**: local `.env` refreshed (live spellings + the `viralpost`
  postgres example).
- **R3-6**: docs lockstep — 402→405 unit count in README/AGENTS/CLAUDE/
  PAD/SKILL; the dual-prefix guard documented in the PAD security table +
  §6.2, the AGENTS env-name fact, the SKILL §2 env contract.
- **R3-7**: **FULL GATE GREEN** — lint 0/0 · tsc 0 · unit 405/405 (29
  files) · build · smoke 15/15 · e2e 48/48 (8 specs) · census MATCH
  (1 user + 0 messages). Live production verification (:3100): /Dashboard
  → 404 + `Dashboard | ViralPost AI` + noindex; /foo-bar, /userSettings,
  /page2, /nonexistent all derived per the reference's scheme. Captures
  `13-landing-post-session3.png` + `14-dashboard-404-layout-title-post-
  session3.png` — the latter **pixel-identical (0.0000% diff)** to
  session-2's `09`, the direct proof the layout-only title path renders
  byte-for-byte the same 404 after the dead-metadata removal.
- **R3-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run
  first).
