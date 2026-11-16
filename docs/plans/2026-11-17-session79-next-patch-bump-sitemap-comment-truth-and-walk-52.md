# Session 79 Plan — The Next Patch Bump + The Sitemap Comment Truth + Parity Walk #52

Date: 2026-11-17. Round opens on `ab9c270` (session-78's ship `0bab7eb` + the
owner's narration push carrying `docs/session_79.md` as this round's working
narration; the formal log replaces its content at ship). Baseline gate re-run
on the fresh clone: lint 0/0 · tsc 0 · unit 813/813 (41 files) · build ·
smoke 16/16 · e2e 71/71 (9 specs) · census MATCH — GREEN, lag 0 (the one-time
chromium reinstall via the repo-local
`./node_modules/.bin/playwright install chromium`; the headless-shell rev
1248 matches the pinned `@playwright/test@1.64.1`). neo-crm pattern
reference: UNCHANGED at `b3d0fbe` — recorded decisions stand.

## The standing asks (each Verified this round)

- **`.env` / db-folder contract**: held (`DATABASE_URL="file:../db/custom.db"`
  copied from `.env.example`, `db/` at the repo root, `db:push` + `db:seed` +
  census MATCH — 1 user, 0 contact messages; the ambient-shell
  `DATABASE_URL` pollution (`file:/home/z/my-project/db/custom.db` in this
  sandbox) neutralized with `env -u DATABASE_URL` on every DB-touching
  command — the S63..S78 hazard still present in this shell).
- **Vitest + Playwright suites**: configs verified current and wired (vitest
  `*.test.ts`-only + skills exclusion + `@` alias; playwright setup project +
  storageState + single-source port + pinned `db/e2e.db`; the full e2e layer
  ran GREEN against the production build).
- **Sitemap + SEO**: verified live in walk #52 (both legs) — sitemap 4 URLs
  (weekly, 1.0/0.8/0.8/0.8) format-identical modulo origin, robots
  byte-body, manifest + the three security headers on the SEO family; the
  sitemap route's format contract re-read at its source (`force-static`, the
  explicit `application/xml`, no /Home duplicate — the 308 fix).
- **Mobile navigation + Tailwind v4**: walk #52's mobile battery clean on
  both legs at 390×844 (hamburger byte-match + aria superset; panel at the
  byte-equal 265px; Escape close-with-focus-return on the clone vs R-OPEN on
  the reference — our superset; outside-tap both-open; route-change
  hidden-in-DOM vs the reference's SPA unmount — the documented pair). The
  COMPILED sheet re-verified independently: ZERO `(hover: hover)` media
  wraps (the `@custom-variant hover` unwrap live), the
  `button,[role="button"]{cursor:pointer}` base rule live, `md\:hidden`
  inside `@media (min-width:48rem)` — **no Tailwind v4 bug in the mobile
  menu** at the source, sheet, or live-DOM level.
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg (16/16).
- **Screenshots**: 165 (the mobile menu open at 390×844 on /Pricing — the
  dark superset panel over a light page) and 166 (the landing hero at
  1440×900) captured during walk #52's CLONE leg, PIL-verified (390×844 @
  82.7% non-white; 1440×900 @ 100.0%).
- **`.env.example`**: verified matching the codebase (all six knobs —
  DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL, VIRALPOST_PROXY_HOPS,
  VIRALPOST_DISABLE_IN_APP_OTP, VIRALPOST_DISABLE_IN_APP_RESET; the
  provenance comment rides the 1..78 bound — re-anchored in the lockstep
  below).

## The audit (direct lead reads — the session-76/77/78 precedent continues)

Combined profile: **0 Critical / 0 High / 1 Medium / 1 Low / the standing
Info postures re-confirmed**. The lane reads:

- The session-78 commit (`0bab7eb`) diffed in full — the ten provenance
  re-anchors + the docs-counts s78 rung, pure comment-only lockstep, no
  functional changes; the narration push (`ab9c270`) added only
  `docs/session_79.md`.
- `src/components/marketing/navbar.tsx` read IN FULL — the aria superset
  (label/expanded/controls), the S26-1 `hidden`-attribute mechanics, the
  S26-3 `scrolled`-alone bar key, the S31-2 history-close focus arm, the
  S45-3/S45-4 censured-parity postures all at their sites; no drift.
- `src/components/ui/toast.tsx` read IN FULL — the S72-4 geometry tracker +
  mount probe, the S73-4 exit arm, the S74-4b pointer-typed enter, the
  S70-4 mixed-modality unpausers, the S75-5 compound blur guard, the S76-1
  hoisted rect all at their sites; no drift.
- The hazard sweep clean: direct DATABASE_URL reads confined to the seam
  family (db-path.ts the resolver, boot-env.ts the warning face, env-file.ts
  the parser leaf; `db.ts` routes through `runtimeDatabaseUrl()` — verified
  at the import); zero secrets in logs; zero TODO/FIXME/XXX markers; zero
  `console.log` in src; the mounted-gate doctrine consistent across
  generator-card / contact-form / login-card / toast.
- The config layer verified: next.config.ts (the artifact-hygiene excludes +
  the /Home 308 + the three-header superset + the type-gate hardening
  posture), vitest.config.mts (the `*.test.ts` include + the skills
  exclusion + the `@` alias), tsconfig/eslint skills excludes, the sitemap
  route's format contract.
- The compiled sheet's TW4 cures re-verified (zero `(hover: hover)` wraps;
  the button-cursor base rule; the md boundary at min-width:48rem).
- **AUDIT-1 M-1 (the round's one live finding — the standing
  `bun audit` duty caught it)**: `next@16.4.2` (the direct runtime
  dependency, installed via `^16.4.2`) sits inside the
  GHSA-mfr8-8qww-v76h vulnerable range (>=16.3.0 <=16.4.4 — "information
  disclosure across root params when a 'use cache' function is called
  through unstable_cache()"). Zero usage of the vulnerable API family in
  this tree (verified: no `unstable_cache` / `'use cache'` anywhere in
  src/) — a LATENT exposure, not on the live request path today. The
  audit census moved 9 → 10 advisories (3H/6M/1L): the other nine are the
  documented dev-toolchain family (eslint-chain minimatch, prisma-chain
  deepmerge-ts, the vite/launch-editor/source-map-js dev-server set) —
  unchanged; the next advisory is the ONLY runtime-path-class item, and it
  is on a DIRECT dependency. Cure: the patch-level bump to 16.4.6 (the
  latest stable 16.4.x — within the existing `^16.4.2` range, so
  `bun update next` pins the lockfile without touching the manifest range;
  also re-aligning `next` with `eslint-config-next@^16.4.6` already in
  devDependencies).
- **AUDIT-2 L-1 (comment-truth)**: the sitemap route comment's
  provenance claim "the reference lists them /, /Contact, /Pricing,
  /Tool; ours keeps the nav order" has DRIFTED — the LIVE reference
  (walk #52's fetch) now lists `/`, `/Tool`, `/Pricing`, `/Contact` —
  the same order as ours. The code is correct and the difference was
  always semantically null (priorities are explicit), but the comment
  claims a reference state that no longer reproduces — the comment-truth
  genus this repo cures. Comment-only re-anchor.

## The cure (TDD posture: the gate is the test for a dependency bump)

- **S79-1 — the next patch bump (AUDIT-1 M-1)**: `bun update next` →
  16.4.6 in the lockfile (the package manager owns the manifest; the
  `^16.4.2` range stays). Verification: the installed version reads
  16.4.6 (both `next` and `@next/env`); `bun audit` returns to the
  documented 9-advisory all-dev-toolchain family; the FULL gate re-runs
  GREEN on the bumped runtime (lint → typecheck → unit → build → smoke →
  e2e — the e2e and smoke layers re-prove the standalone artifact, the
  db-path anchors, and the boot gate against 16.4.6); the PAD §1.2 and
  SKILL §2 stack-table version cites re-anchor 16.4.2 → 16.4.6 in the
  same commit (the frozen historical records — README's session-61 row,
  SKILL Appendix-A's session-61 row, the two @next/env probe comments in
  tests — keep their 16.4.2 cites: they are history, not live claims).
- **S79-2 — the sitemap comment truth re-anchor (AUDIT-2 L-1)**:
  comment-only — the route header's reference-order clause re-spelled to
  the live census (the reference lists them in the nav order; ours
  matches). No functional change; the sitemap format contract is already
  pinned by the seo-surfaces suite (no new pin needed — the comment is
  prose, not a pinned surface).
- **S79-3 — the session-79 lockstep**: counts HOLD at the ship (+0 new
  `it()` blocks): UNIT 813 / SUITES 41 / E2E 71 / E2E_SPECS 9 / SMOKE
  16 / BADGE 884. The docs-counts test gains the s79 rung comment. The
  ten provenance sites set `1..78` → `1..79` uniform:
  1. `.env.example` (the provenance note's range)
  2. `src/app/api/health/route.ts` (the lineage note)
  3. `src/components/ui/toast.tsx` (the S38-7c census-legible range)
  4. `src/lib/db-path.ts` (the standalone-launch-recovery note)
  5. `tests/auth-reset.test.ts` (the lineage note)
  6. `tests/boot-env.test.ts` (the lineage note)
  7. `tests/client-envelope.test.ts` (the lineage note)
  8. `tests/db-path.test.ts` (the donor-ledger note)
  9. `tests/error-boundaries.test.ts` (the lineage note)
  10. `viralpost-ai_SKILL.md` §0.5 (the range bound + the frontmatter
      `last_updated` + `project_state` + the version bump v1.74.0 →
      v1.75.0 + the Appendix-A session-79 row + the Appendix-B re-cert
      through 79)
  Plus the doc-family sites: README's session-79 row + the gate-footer
  label ("Gate at the session-79 ship"); AGENTS's plans-map
  seventy-ninth round + the session-79 plan title; PAD's header date +
  the §1.2 stack-table version; worklog's Task 79 entry; the formal
  `docs/session_79.md` (replacing the owner's narration window); this
  plan's post-execution record; the docs-counts s79 rung.

## Parity walk #52 — clean (the fifty-second consecutive)

Both legs at every documented posture:

- **REF leg** (390×844, logged in as `sepnetflix2023@outlook.com` →
  lands on `/Home`): hamburger `md:hidden p-2 text-slate-300` with no
  aria family (our documented superset), cursor pointer, slate-300 ink;
  panel at 265px with the reference's `md:hidden bg-slate-900/98
  border-b border-white/10 overflow-hidden` family (the dead /98 token
  computing transparent); Escape stays OPEN (R-OPEN); outside-tap on
  real page content stays OPEN (R-OPEN); route-change unmounts the panel
  (R-unmount); the desktop gradient census on /Pricing — the navbar
  `Upgrade to Pro` amber-400→amber-500 (rgb(251,191,36)→rgb(245,158,11)),
  the pricing page's `Get Unlimited Access` teal-400→amber-400
  (rgb(45,212,191)→rgb(251,191,36)), the plan CTA `Upgrade – $19`
  teal-500→teal-600 (rgb(20,184,166)→rgb(13,148,136)); sitemap 4 URLs
  (weekly, 1.0/0.8/0.8/0.8) + robots byte-body; the generator DEAD at
  the 30s probe (0 hashtag nodes, the button restored — the D-1
  silent-rest face).
- **CLONE leg** (the production standalone build on :3200, ONE single
  script — boot + drive browser + teardown; the sandbox's
  background-server reaping re-confirmed): login lands on `/` (the /Home
  308 pair); hamburger byte-match + the aria superset
  (label/expanded/controls) + the focus-visible family; panel at the
  byte-equal 265px with the same 5 links + the $19 pill (transparent
  over the unscrolled hero — the dead-token replication); Escape CLOSES
  with focus returned to the toggle (our superset); outside-tap stays
  OPEN (parity); route-change hidden-in-DOM (the documented pair); the
  `Get Unlimited Access` CTA gradient byte-identical
  (`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))` —
  the inline-style hue-crossing form); the same-family gradients' oklab
  spellings (the documented sub-threshold doctrine); the generator LIVE
  — postPresent=true with 63 words and 7 hashtags at the 8s probe after
  the client-quota reset, the counter incremented (count=1); screenshots
  165/166 captured, PIL-verified.

No Tailwind v4 bug in the mobile menu — verified at the source, the
compiled sheet, and the live DOM on both legs.

## The ship

Full gate GREEN on the final tree (post-bump); census MATCH; captures
165/166 PIL-verified; `.env.example` verified matching (included in the
commit); Conventional Commit on `main`; push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py` per the runbook); the operator key
shredded after the verified push.

## The post-execution record (the plan vs the execution)

- The bump executed exactly as planned: `bun update next` installed
  16.4.6 (both `next` and `@next/env`; bun re-pinned the manifest range
  to `^16.4.6` — the package-manager-owned form, within the family's
  patch-level doctrine); `bun audit` returned to the documented
  9-advisory all-dev-toolchain census (3H/5M/1L) — the
  GHSA-mfr8-8qww-v76h advisory GONE; the full gate re-ran GREEN on the
  bumped runtime (lint → typecheck → unit 813/813 → build → smoke
  16/16 → e2e 71/71 — the standalone artifact, the db-path anchors,
  and the boot gate all re-proven against 16.4.6).
- The sitemap comment re-anchored to the live census (S79-2, the
  session-79 attribution riding the re-spell; comment-only).
- The lockstep executed with zero collateral: the residual `1..78`
  grep returned none after the ten-site re-anchor; the docs-counts s79
  rung shipped in the same commit; PAD header date + §1.2 version;
  README session-79 row + gate footer; AGENTS plans-map; SKILL
  v1.74.0 → v1.75.0 + §2 version + Appendix-A row + Appendix-B re-cert
  through 79; worklog Task 79; the formal session_79.md replacing the
  narration window.
- Counts at ship: 813/41 + 71/9 + 16, badge 884 — ALL HELD (the
  dependency-cure + comment-cure form, +0 new its). SKILL v1.75.0.
