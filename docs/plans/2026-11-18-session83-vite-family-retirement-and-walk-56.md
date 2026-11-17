# Session 83 Plan — The Vite-Family Retirement + Parity Walk #56

Date: 2026-11-18. Round opens on `189dfae5` (session-82's ship `8fc19a40` + the
owner's narration push carrying `docs/session_83.md` as this round's working
narration; the formal log replaces its content at ship). Baseline gate re-run
on a FRESH clone (the sandbox was reset between rounds — node_modules, the db
family, and the standalone build all re-established: `bun install` → 427
packages, `cp .env.example .env` + the dev AUTH_SECRET, `db:push` +
`db:seed` + `db:census` MATCH, `bunx playwright install chromium` — rev 1248,
matching the pinned `@playwright/test@1.64.1`): lint 0/0 · tsc 0 · unit
813/813 (41 files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census
MATCH — GREEN, lag 0. neo-crm pattern reference: UNCHANGED at `b3d0fbe`
(fresh clone re-verified) — recorded decisions stand.

## The standing asks (each Verified this round)

- **`.env` / db-folder contract**: held (`DATABASE_URL="file:../db/custom.db"`
  in `.env`, `db/` at the repo root, census MATCH — 1 user, 0 contact
  messages; the ambient-shell `DATABASE_URL` pollution
  (`file:/home/z/my-project/db/custom.db` in this sandbox) neutralized with
  `env -u DATABASE_URL` on every DB-touching command — the S63..S82 hazard
  still present in this shell).
- **Vitest + Playwright suites**: configs verified current and wired (vitest
  `*.test.ts`-only + skills exclusion + `@` alias; playwright setup project +
  storageState + single-source port + pinned `db/e2e.db`; the full e2e layer
  re-ran GREEN against the production build; chromium rev 1248 installed
  fresh this round, matching the pinned `@playwright/test@1.64.1`).
- **Sitemap + SEO**: verified live in walk #56 (both legs) — sitemap 4 URLs
  (weekly, 1.0/0.8/0.8/0.8) format-identical modulo origin at the nav order
  (/, /Tool, /Pricing, /Contact), robots byte-body (modulo origin), manifest
  + the three security headers on the SEO family (the smoke leg 14 family);
  the sitemap route's format contract re-read at its source
  (`force-static`, the explicit `application/xml`, no /Home duplicate — the
  308 fix).
- **Mobile navigation + Tailwind v4**: walk #56's mobile battery clean on
  both legs at 390×844 (hamburger byte-match + aria superset; panel at the
  byte-equal 265px; Escape close-with-focus-return on the clone vs R-OPEN on
  the reference — our superset; outside-tap both-open — the REF probe's
  first read (NO_PANEL_EL) diagnosed as the lead's OWN probe artifact (the
  unconditional openMenu() re-toggle after the no-op Escape CLOSED the
  still-open menu before the tap landed) and re-probed LIVE with the
  pre-tap state verified OPEN → R-OPEN at 400/900/1500ms settle times —
  no phantom finding recorded, the s78/s82 selector-doctrine precedent;
  the CLONE leg's gradient probe's navbarPill TEXT difference
  ("Upgrade to Pro – $19" vs the reference's "Upgrade to Pro") diagnosed as
  a probe DOM-scope artifact — the probe grabs the LAST nav <a> matching,
  and the clone's hidden-in-DOM mobile pill comes later in DOM order while
  the reference UNMOUNTS its closed panel; the gradient ENDPOINTS are
  identical (amber-400→amber-500) — the documented hidden-in-DOM vs
  SPA-unmount doctrine); route-change hidden-in-DOM vs the reference's SPA
  unmount — the documented pair). The COMPILED sheet re-verified
  independently: ZERO `(hover: hover)` media wraps (the `@custom-variant
  hover` unwrap live), the `button,[role=button]{cursor:pointer}` base rule
  live (the minified unquoted spelling), `md\:hidden` inside
  `@media (min-width:48rem)` — **no Tailwind v4 bug in the mobile menu**
  at the source, sheet, or live-DOM level.
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg (16/16).
- **Screenshots**: 173 (the mobile menu open at 390×844 on /Pricing — the
  dark superset panel over the page's own slate-900→teal-900 hero, the teal
  active link row dilution-detectable at y=192, the amber pill rows at
  y272–y308) and 174 (the landing hero at 1440×900) captured during walk
  #56's CLONE leg, PIL-verified (390×844 @ 82.79% non-white — the
  session-80..82 computation family (82.7%); the dark panel rows
  (19,28,46)/(17,31,49)/(24,33,51) ≈ slate-900/95 with light bleed, the
  amber pill rows (248,174,24), the y 330–430 band (36,90,89)→(19,78,74)
  is /Pricing's OWN `from-slate-900 to-teal-900` hero below the panel —
  page content, not panel; 1440×900 @ 99.96% non-white) — the same anatomy
  as captures 167/169/171, the session-80/81/82 twins.
- **`.env.example`**: verified matching the codebase (all six knobs —
  DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL, VIRALPOST_PROXY_HOPS,
  VIRALPOST_DISABLE_IN_APP_OTP, VIRALPOST_DISABLE_IN_APP_RESET; the
  provenance comment rides the 1..82 bound — re-anchored in the lockstep
  below).

## The audit (direct lead reads — the session-76..82 precedent continues)

Code findings: **0 Critical / 0 High / 0 Medium / 0 Low** — the fifth
consecutive zero-finding code round (session-78 the first, session-80/81/82
the second through fourth). The lane reads:

- The session-82 narration push (`189dfae5`) diffed in full against the
  session-82 ship `8fc19a40` — exactly one file added
  (`docs/session_83.md`, 70 lines, the owner's narration window); no
  collateral.
- `src/components/marketing/navbar.tsx` read IN FULL — the aria superset
  (label/expanded/controls), the S26-1 `hidden`-attribute mechanics, the
  S26-3 `scrolled`-alone bar key, the S31-2 history-close focus arm, the
  S45-3/S45-4 censused-parity postures, the S22-1/S22-2 priced pill, the
  S22-3 bare mobile family, the S22-5 scrolled panel arm all at their
  sites; no drift.
- `src/components/ui/toast.tsx` read IN FULL — the S72-4 geometry tracker +
  mount probe, the S73-4 exit arm, the S74-4b pointer-typed enter, the
  S70-4 mixed-modality unpausers, the S75-5 compound blur guard, the S76-1
  hoisted rect all at their sites; the `1..82` range at line 294; no drift.
- The hazard sweep clean: direct DATABASE_URL reads confined to the seam
  family (db-path.ts the resolver, env-file.ts comment-only, boot-env.ts
  the warning face; `db.ts` routes through `runtimeDatabaseUrl()` —
  verified at the import); zero secrets in logs; zero TODO/FIXME/XXX
  markers; zero `console.log` in src; the mounted-gate doctrine consistent
  across generator-card / contact-form / login-card / toast.
- The config layer verified: next.config.ts (the artifact-hygiene excludes +
  the /Home 308 + the three-header superset), vitest.config.mts (the
  `*.test.ts` include + the skills exclusion + the `@` alias),
  tsconfig/eslint skills excludes, the sitemap route's format contract
  (`force-static` + the explicit `application/xml`).
- The compiled sheet's TW4 cures re-verified (zero `(hover: hover)` wraps;
  the `button,[role=button]{cursor:pointer}` base rule in its minified
  spelling; the md boundary at min-width:48rem).
- The dependency census verified (exactly 8 runtime + 13 devDeps; the
  registered LOW `flex-shrink-0` in sections.tsx untouched this round).
- The ten provenance sites verified at `1..82` uniform (the session-82
  lockstep state, lag 0).

### AUDIT-1 M-1 — the standing `bun audit` duty caught the advisory-database drift (the round's one live finding, and its cure)

The fresh-clone `bun audit` returned **10 advisories (4H/5M/1L)** — the
documented 9-advisory family PLUS one newly-matching HIGH:
**GHSA-587h-7wmj-h5pm** (launch-editor's `fs.existsSync()` existence-check
bypass on Windows, CVSS 7.5 — published 2026-10-06, updated 2026-10-20),
matching the tree's `vite@8.3.0` (installed transitively via
`vitest 5.0.5 › @vitest/mocker 5.0.5 › vite`, the `^8.0.0` peer range).
The advisory's affected vite ranges (≤8.3.2) had not matched the
sessions-79..82 census runs (the advisory-database propagation lag); today
they do. Triage: dev-toolchain ONLY (vitest's transform layer — the
production standalone artifact carries no vite, per the smoke hygiene
leg), Windows-only attack vector, not on the runtime request path — but
the cure is a patch-level bump inside the existing peer range, cheaper
than carrying the HIGH.

**The cure (S83-1)**: the `resolutions` pin `"vite": "8.3.3"` in
package.json — the S15-3 zod precedent exactly (a transitive advisory
chain retired via the resolutions block; the package manager owns the
lockfile). An initial `bun update vite` attempt cascaded to 8.3.8 +
dozens of unrelated transitive bumps (rejected — the freshness-driven
form; reverted via `git checkout bun.lock`), and its stray
`"vite": "^8.3.8"` entry in `dependencies` was CAUGHT by the S45-6
docs-counts pin (the dependency-census arm RED on the 9-dep surface,
exactly the drift the pin exists to catch) and removed — vite is
dev-toolchain, never a runtime dep; the surface stays at exactly 8
runtime + 13 devDeps. The lockfile diff is confined to the vite subtree
(vite 8.3.0 → 8.3.3 + its own dependency floors: lightningcss
1.32.0→1.33.0, rolldown 1.2.9→1.2.19, the platform binaries) + the
overrides line. **Verification**: `bun audit` returns **4 advisories
(3H/1M)** — the entire vite family RETIRED (GHSA-587h, GHSA-9jrq,
GHSA-rq7h, GHSA-698v, GHSA-r825, GHSA-vfpm all gone), the census at its
new floor of the pre-existing accepted family (deepmerge-ts H
prisma-CLI-chain, picomatch H eslint/vitest-chains, source-map-js H
postcss-chains, minimatch M eslint-chain — all dev-toolchain, all
documented); the FULL gate re-ran GREEN on the bumped tree (lint 0/0 ·
tsc 0 · unit 813/813 · build · smoke 16/16 · e2e 71/71 — the unit suite
itself runs through vitest+vite, the compatibility proof). No doc pin
references the old census in live tense (all "9-advisory" mentions are
frozen session-history records; this round's records carry the new
4-advisory census).

## Parity walk #56 — clean (the fifty-sixth consecutive)

Both legs at every documented posture:

- **REF leg** (390×844, logged in as `sepnetflix2023@outlook.com` →
  lands on `/Home`): hamburger `md:hidden p-2 text-slate-300` with no
  aria family (our documented superset), cursor pointer, slate-300 ink
  (rgb(203,213,225)); panel at 265px with the reference's `md:hidden
  bg-slate-900/98 border-b border-white/10 overflow-hidden` family (the
  dead /98 token computing transparent), 5 links + the $19 pill; Escape
  stays OPEN (R-OPEN); outside-tap on real page content (the hero `<p>`
  at (30,350)) stays OPEN (R-OPEN — the re-probe verified the pre-tap
  state OPEN and read OPEN at 400/900/1500ms; the first script's
  NO_PANEL_EL read was the lead's own unconditional-toggle artifact after
  the no-op Escape, no phantom finding recorded); route-change unmounts
  the panel (R-unmount at /Pricing); the desktop gradient census on
  /Pricing — the navbar `Upgrade to Pro` amber-400→amber-500
  (rgb(251,191,36)→rgb(245,158,11)), the pricing page's `Get Unlimited
  Access` teal-400→amber-400 (rgb(45,212,191)→rgb(251,191,36)), the plan
  CTA `Upgrade – $19` teal-500→teal-600 (rgb(20,184,166)→rgb(13,148,136));
  sitemap 4 URLs (weekly, 1.0/0.8/0.8/0.8, the nav order) + robots
  byte-body; the generator DEAD at the 30s probe on /Tool (0 hashtag
  nodes, the button restored — the D-1 silent-rest face).
- **CLONE leg** (the production standalone build on :3200, ONE single
  script — boot + drive browser + teardown; the sandbox's
  background-server reaping re-confirmed): login lands on `/` (the /Home
  308 pair); hamburger byte-match + the aria superset
  (label/expanded/controls) + the focus-visible family; panel at the
  byte-equal 265px with the same 5 links + the $19 pill (transparent
  over the unscrolled hero — the dead-token replication); Escape CLOSES
  with focus returned to the toggle (our superset, focusOnToggle=true);
  outside-tap stays OPEN (parity, spot (30,349) the same hero `<p>`);
  route-change hidden-in-DOM (the documented pair); the `Get Unlimited
  Access` CTA gradient byte-identical (`linear-gradient(to right, rgb(45,
  212, 191), rgb(251, 191, 36))` — the inline-style hue-crossing form);
  the same-family gradients' oklab spellings (the documented
  sub-threshold doctrine — the navbar pill's `in oklab` interpolation vs
  the reference's sRGB spelling, identical endpoints); the generator
  LIVE — postPresent=true with 6 hashtags at the 8s probe after the
  client-quota reset (`viralpost_generations`, the source-verified
  GENERATIONS_KEY), the counter incremented (count=1); screenshots 173
  (the mobile menu open on /Pricing) and 174 (the landing hero)
  captured, PIL-verified, the mobile-menu capture's anatomy
  pixel-verified (the same anatomy as captures 167/169/171, the
  session-80/81/82 twins).

No Tailwind v4 bug in the mobile menu — verified at the source, the
compiled sheet, and the live DOM on both legs.

## The cure

- **S83-1 — the vite-family retirement** (applied and gate-verified this
  round, the S15-3 zod precedent): the `resolutions` pin
  `"vite": "8.3.3"`; the census 10 → 4 (3H/1M); the runtime surface
  unchanged at 8 + 13 devDeps (the stray dep caught by the S45-6 pin and
  removed); the full gate GREEN on the bumped tree.
- **S83-2 — the session-83 lockstep**: counts HOLD at the ship (+0 new
  `it()` blocks — the dependency-cure form): UNIT 813 / SUITES 41 / E2E
  71 / E2E_SPECS 9 / SMOKE 16 / BADGE 884. The docs-counts test gains
  the s83 rung comment. The ten provenance sites set `1..82` → `1..83`
  uniform:
  1. `.env.example` (the provenance note's range, line 5)
  2. `src/app/api/health/route.ts` (the lineage note, line 7)
  3. `src/components/ui/toast.tsx` (the S38-7c census-legible range, line 294)
  4. `src/lib/db-path.ts` (the standalone-launch-recovery note, line 359)
  5. `tests/auth-reset.test.ts` (the lineage note, line 18)
  6. `tests/boot-env.test.ts` (the lineage note, line 40)
  7. `tests/client-envelope.test.ts` (the lineage note, line 22)
  8. `tests/db-path.test.ts` (the donor-ledger note, line 311)
  9. `tests/error-boundaries.test.ts` (the lineage note, line 30)
  10. `viralpost-ai_SKILL.md` §0.5 (the range bound + the frontmatter
      `last_updated` + `project_state` + the version bump v1.78.0 →
      v1.79.0 + the Appendix-A session-83 row + the Appendix-B re-cert
      through 83)
  Plus the doc-family sites: README's session-83 row + the gate-footer
  label ("Gate at the session-83 ship"); AGENTS's plans-map
  eighty-third round; PAD's header date; worklog's Task 83 entry; the
  formal `docs/session_83.md` (replacing the owner's narration window);
  this plan's post-execution record; the docs-counts s83 rung.

## The ship

Full gate GREEN on the final tree; census MATCH; captures 173/174
PIL-verified; `.env.example` verified matching the codebase (included in
the commit); Conventional Commit on `main`; push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py` per the runbook); the operator key
shredded after the verified push.

## The post-execution record (the plan vs the execution)

- The round executed exactly as planned: one live finding (AUDIT-1 M-1,
  the advisory-database drift) with its S83-1 cure (the vite 8.3.3
  resolutions pin, gate-verified), plus the S83-2 lockstep — no other
  functional changes.
- The probe-artifact records played out as documented in the plan's
  walk section: the REF outside-tap NO_PANEL_EL read (the lead's own
  unconditional-toggle artifact after the no-op Escape) re-probed LIVE
  with the pre-tap state verified OPEN → R-OPEN; the CLONE gradient
  probe's navbarPill text delta diagnosed as the DOM-scope artifact
  (hidden-in-DOM vs SPA-unmount). No phantom findings recorded.
- The lockstep executed with zero collateral: the residual `1..82`
  grep returned none after the ten-site re-anchor; the docs-counts s83
  rung shipped in the same commit; the PAD header date; README's
  session-83 row + gate footer; AGENTS's plans-map; SKILL v1.78.0 →
  v1.79.0 + the Appendix-A session-83 row + the Appendix-B re-cert
  through 83; worklog Task 83; the formal session_83.md replacing the
  narration window.
- Counts at ship: 813/41 + 71/9 + 16, badge 884 — ALL HELD (the
  dependency-cure form, +0 new its by construction). SKILL v1.79.0.
  The audit census at its new documented floor: 4 advisories (3H/1M,
  all dev-toolchain).
