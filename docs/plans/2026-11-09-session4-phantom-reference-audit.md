# Session 4 — The Phantom-Reference Audit (2026-11-09)

## Context

Session 3 pushed `bce6e1b` (the rename-completion round); the owner added
`909d84c` (`docs/session_3.md`, the session log). This round re-runs the
standing instruction against the merged tree: docs review → codebase
validation → fresh audit (repo skills: `web-application` §15 gate,
`security-and-hardening`) → parity re-verification → remediation → gate →
captures → push.

## Verified-clean (no action)

| Surface | Evidence |
|---|---|
| Baseline gates on `909d84c` | lint 0/0 · tsc 0 · unit 405/405 (29 files) — matches documented counts |
| Session-3 changes re-audited | The dual-prefix guard reasoned through edge cases (prefix disjointness, NODE_ENV/NEST_* non-collisions, case sensitivity) — clean; catch-all/layout split confirmed by smoke leg 06 + e2e |
| Error boundaries + chunk recovery | `error.tsx` / `global-error.tsx` (self-heal, digest handle, zero tree imports) + the injectable `chunk-recovery.ts` seam — solid |
| Reference parity (live, this round) | Landing mobile 390×844 + the 5-destination menu · /Tool (Free Tool / AI Post Generator / 3-free-generations / quota strings) · /login (Welcome to ViralPost AI / Continue with Google / Need an account?) · /Dashboard (404 + derived title) — all byte-consistent with the clone; **no drift** |
| `.env` / db / configs / sitemap / SEO | Contract-correct (verified live this round; unchanged since session 3) |
| Doc-reference integrity | Every `docs/*.md` reference in src/tests resolves on disk — zero phantom docs |

## Findings

The rename-completion theme continues: the CRM-era **commentary** still
carries stale pointers and one false contract claim.

| # | Finding | Severity |
|---|---|---|
| F4-1 | `tests/typography.test.ts:25` claims computed-style typography parity is "pinned by the e2e typography checks (tests/e2e/crm.spec.ts)" — a **phantom file** (the 8 real specs contain zero font assertions; verified by rg). The typography contract is pinned ONLY by the unit source-pins; the comment misleads a maintainer hunting for a nonexistent e2e layer. | MED |
| F4-2 | `vitest.config.ts:4` describes the unit layer as "the pure domain seams of the CRM (…currency/date formatting, CSV codec…)" — the template's inventory, not this app's (no CSV/currency seams exist; the real surface is generator/route-title/login-views/db-path/rate-limit/…). | LOW |
| F4-3 | `tests/e2e/e2e-port.ts:3` — "Both consumers import this module now (playwright.config + the crm.spec 401 probe)": the probe consumer died with the CRM spec family; only `playwright.config.ts` imports the module today. Stale shape description. | LOW |
| F4-4 | `tests/boot-env.test.ts:52` — fixture URL `https://crm.example.com` (identity inconsistency; the test only needs a non-localhost https origin). | LOW |
| F4-5 | `tests/login-views.test.ts:391,447` "never the CRM dashboard (the pre-s142 target)" — legitimate session-provenance of the same class as `type-gate.test.ts`'s evaluation-report citation; the negative assertions remain meaningful guards. **Left intentionally.** | INFO |

## Remediation

- **R4-1** (F4-1): correct the typography comment — the unit source-pins
  ARE the typography contract; the e2e layer owns titles/SEO/a11y, not
  font rendering. No phantom pointer.
- **R4-2** (F4-2): describe the actual ViralPost unit surface in
  `vitest.config.ts`.
- **R4-3** (F4-3): update `e2e-port.ts` to the current single-consumer
  shape (keep the origin story, mark the probe as retired).
- **R4-4** (F4-4): fixture → `https://viralpost.example.com`.
- **R4-5**: docs lockstep — worklog Task 4 + this file's execution
  record. No count changes (comment/fixture fixes; the gate re-run is
  the verification — the source-pin suites must stay green over the
  edited files).
- **R4-6**: **dev-server** screenshots (the standing ask this round —
  `devIndicators: false` keeps them clean): landing desktop + the mobile
  menu open.
- **R4-7**: full gate on the exact commit tree.
- **R4-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run
  first).

## Execution record

- **R4-1**: typography.test.ts comment corrected — the suite itself is
  the typography contract; the phantom e2e pointer replaced with the
  truthful layer split (e2e owns titles/SEO/a11y/DOM, never font
  rendering) and the correction provenance (session-4, F4-1).
- **R4-2**: vitest.config.ts now describes the actual unit surface
  (db-path contract, auth helpers, generator engine, route-title
  derivation, rate limiting, login/reset views, boot gate, sitemap/SEO
  formats).
- **R4-3**: e2e-port.ts updated to the current single-consumer shape —
  the 401-probe consumer marked retired with the CRM spec family; the
  module stays the port literal's single source of truth.
- **R4-4**: the boot-env fixture URL → `https://viralpost.example.com`.
- **R4-5**: this record + worklog Task 4. No count changes (comment and
  fixture fixes only; the counts stay 405/48/15).
- **R4-6**: captures 15/16 — the dev-server landing (1280×800) and the
  open mobile menu (390×844). The capture debugging surfaced two
  root causes worth the record: (1) running `bun run build` while the
  dev server lives puts it into an endless Fast-Refresh churn (the
  .next/ overwrite) — restart the dev server after any gate run; (2)
  the burger RELABELS on open (`aria-label={open ? "Close menu" :
  "Open menu"}`) — an open-state probe through the "Open menu"
  locator is impossible by construction; verify through the nav links.
  Both PIL-verified non-blank; the menu capture verified through the
  e2e link contract before the shot.
- **R4-7**: **FULL GATE GREEN** on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 405/405 (29 files) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH (1 user + 0 messages).
- **R4-8**: Conventional Commit on `main` → SSH-wrapper push (dry-run
  first).
