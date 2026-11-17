# Session 83 — The Vite-Family Retirement + Parity Walk #56

**Round:** session-83 (the standing work order executed as the
eighty-third round). Opens on `189dfae5` (session-82's ship `8fc19a40` + the
owner's narration push carrying this file as the round's working
narration; this formal log replaces that content at ship).

**Continuity state:** the previous conversation delivered session-82
(the `8fc19a40` cure commit + the owner's narration push `189dfae5`);
this round executed the standing work order on a FRESH-CLONE workspace
(the sandbox WAS reset between rounds — node_modules, the db family, and
the standalone build all re-established from scratch: `bun install` 427
packages, `cp .env.example .env` + the dev AUTH_SECRET, `db:push` +
`db:seed` + `db:census` MATCH, `bunx playwright install chromium` rev
1248 matching the pinned `@playwright/test@1.64.1`).

## The baseline (Verified)

Gate GREEN on the fresh clone: lint 0/0 · tsc 0 · unit 813/813 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH —
exactly the session-82 ship state, lag 0. neo-crm UNCHANGED at `b3d0fbe`
(fresh clone re-verified) — recorded decisions stand.

## The standing asks (each Verified this round)

- `.env` `DATABASE_URL="file:../db/custom.db"` contract held; `db/` at
  the repo root; census MATCH (1 user, 0 contact messages); the
  ambient-shell `DATABASE_URL` pollution neutralized with `env -u
  DATABASE_URL` on every DB-touching command (the S63..S82 hazard still
  present in this shell).
- Vitest + Playwright suites verified current and wired (chromium rev
  1248 installed fresh this round, matching the pinned
  `@playwright/test@1.64.1`).
- Sitemap (4 URLs, weekly, 1.0/0.8/0.8/0.8, the nav order /, /Tool,
  /Pricing, /Contact — the S79-2 re-anchor still true) + robots
  (byte-body, modulo origin) + manifest + the three security headers on
  the SEO family verified live in walk #56; the sitemap route's format
  contract re-read at its source (`force-static`, the explicit
  `application/xml`, no /Home duplicate — the 308 fix).
- `skills/` excluded from tsconfig/eslint/vitest + the smoke
  artifact-hygiene leg.
- Mobile navigation + Tailwind v4: walk #56's battery clean on both
  legs; the compiled sheet independently re-verified (zero
  `(hover: hover)` media wraps — the `@custom-variant hover` unwrap
  live; the `button,[role=button]{cursor:pointer}` base rule live in
  its minified spelling; the `md` boundary at `min-width:48rem`).
  **No Tailwind v4 bug in the mobile menu.**
- `.env.example` verified matching the codebase (all six knobs:
  DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL, VIRALPOST_PROXY_HOPS,
  VIRALPOST_DISABLE_IN_APP_OTP, VIRALPOST_DISABLE_IN_APP_RESET).

## The audit (0 Critical / 0 High / 0 Medium / 0 Low on the code lanes)

The FIFTH consecutive zero-finding code round (session-78 the first,
session-80/81/82 the second through fourth). Direct lead reads — the
session-76..82 precedent continues: the session-82 narration push
(`189dfae5`) diffed in full against the ship `8fc19a40` (exactly one
file added, `docs/session_83.md` the owner's narration window, no
collateral); navbar.tsx read IN FULL (the aria superset, the S26-1
`hidden`-attribute mechanics, the S26-3 `scrolled`-alone bar key, the
S31-2 history-close focus arm, the S45-3/S45-4 censused-parity
postures, the S22-1/S22-2 priced pill, the S22-3 bare mobile family,
the S22-5 scrolled panel arm); toast.tsx read IN FULL (the S72-4
geometry tracker + mount probe, the S73-4 exit arm, the S74-4b
pointer-typed enter, the S70-4 mixed-modality unpausers, the S75-5
compound blur guard, the S76-1 hoisted rect); the hazard sweep clean
(direct DATABASE_URL reads confined to the seam family — db-path the
resolver, env-file comment-only, boot-env the warning face, with
`db.ts` routing through `runtimeDatabaseUrl()`; zero secrets in logs;
zero TODO/FIXME/XXX; zero `console.log` in src; the mounted-gate
doctrine consistent across generator-card / contact-form / login-card /
toast); the config layer verified (next.config hygiene excludes + /Home
308 + the three-header superset; vitest/tsconfig/eslint skills
exclusions; the sitemap format contract); the compiled sheet's TW4
cures re-verified; the dependency census at exactly 8 runtime + 13
devDeps (the registered LOW `flex-shrink-0` in sections.tsx untouched
this round); the ten provenance sites verified at `1..82` uniform
pre-lockstep.

### AUDIT-1 M-1 — the advisory-database drift caught and cured (the round's one live finding)

The standing `bun audit` duty returned **10 advisories (4H/5M/1L)** on
the fresh clone — the documented 9-advisory family PLUS one
newly-matching HIGH: **GHSA-587h-7wmj-h5pm** (launch-editor's
`fs.existsSync()` existence-check bypass on Windows, CVSS 7.5 —
published 2026-10-06, updated 2026-10-20), matching the tree's
`vite@8.3.0` (installed transitively via `vitest 5.0.5 › @vitest/mocker
5.0.5 › vite`, the `^8.0.0` peer range; the advisory's ≤8.3.2 vite
ranges had not matched the sessions-79..82 census runs — the
advisory-database propagation lag). Triage: dev-toolchain ONLY
(vitest's transform layer — the standalone artifact carries no vite,
per the smoke hygiene leg), Windows-only attack vector — but the cure
is a patch-level bump inside the existing peer range, cheaper than
carrying the HIGH.

**The cure (S83-1, the S15-3 zod precedent):** the `resolutions` pin
`"vite": "8.3.3"` in package.json. An initial `bun update vite`
attempt cascaded to 8.3.8 + dozens of unrelated transitive bumps
(rejected — the freshness-driven form; reverted via `git checkout
bun.lock`), and its stray `"vite": "^8.3.8"` entry in `dependencies`
was CAUGHT by the S45-6 docs-counts pin (the dependency-census arm RED
on the 9-dep surface, exactly the drift the pin exists to catch) and
removed — the surface stays at exactly 8 runtime + 13 devDeps; the
lockfile diff confined to the vite subtree (vite 8.3.0 → 8.3.3 + its
own floors: lightningcss 1.32.0→1.33.0, rolldown 1.2.9→1.2.19, the
platform binaries) + the overrides line. **Verification:** `bun audit`
at **4 advisories (3H/1M)** — the entire vite family RETIRED
(GHSA-587h, GHSA-9jrq, GHSA-rq7h, GHSA-698v, GHSA-r825, GHSA-vfpm all
gone), the census at its new floor of the pre-existing accepted family
(deepmerge-ts H prisma-CLI-chain, picomatch H eslint/vitest-chains,
source-map-js H postcss-chains, minimatch M eslint-chain — all
dev-toolchain, all documented); the FULL gate re-ran GREEN on the
bumped tree (the unit suite itself runs through vitest+vite — the
compatibility proof). No doc pin references the old census in live
tense (all 9-advisory mentions are frozen session-history records).

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
  state OPEN and read OPEN at 400/900/1500ms settle times; the first
  script's NO_PANEL_EL read was the lead's OWN unconditional-toggle
  artifact after the no-op Escape — no phantom finding recorded, the
  s78/s82 selector-doctrine precedent); route-change unmounts the panel
  (R-unmount at /Pricing); the desktop gradient census on /Pricing —
  the navbar `Upgrade to Pro` amber-400→amber-500
  (rgb(251,191,36)→rgb(245,158,11)), the pricing page's `Get Unlimited
  Access` teal-400→amber-400 (rgb(45,212,191)→rgb(251,191,36)), the
  plan CTA `Upgrade – $19` teal-500→teal-600
  (rgb(20,184,166)→rgb(13,148,136)); sitemap 4 URLs (weekly,
  1.0/0.8/0.8/0.8, the nav order) + robots byte-body; the generator
  DEAD at the 30s probe on /Tool (0 hashtag nodes, the button restored
  — the D-1 silent-rest face).
- **CLONE leg** (the production standalone build on :3200, ONE single
  script — boot + drive browser + teardown): login lands on `/` (the
  /Home 308 pair); hamburger byte-match + the aria superset
  (label/expanded/controls) + the focus-visible family; panel at the
  byte-equal 265px with the same 5 links + the $19 pill (transparent
  over the unscrolled hero — the dead-token replication); Escape CLOSES
  with focus returned to the toggle (our superset, focusOnToggle=true);
  outside-tap stays OPEN (parity, the same hero `<p>` at (30,349));
  route-change hidden-in-DOM (the documented pair); the `Get Unlimited
  Access` CTA gradient byte-identical (`linear-gradient(to right,
  rgb(45, 212, 191), rgb(251, 191, 36))` — the inline-style
  hue-crossing form); the same-family gradients' oklab spellings (the
  documented sub-threshold doctrine; the gradient probe's navbarPill
  TEXT difference ("Upgrade to Pro – $19" vs the reference's "Upgrade
  to Pro") diagnosed as a probe DOM-scope artifact — the probe grabs
  the LAST nav <a> matching, and the clone's hidden-in-DOM mobile pill
  comes later in DOM order while the reference UNMOUNTS its closed
  panel; the gradient ENDPOINTS identical — the documented
  hidden-in-DOM vs SPA-unmount doctrine); the generator LIVE —
  postPresent=true with 6 hashtags at the 8s probe after the
  client-quota reset (`viralpost_generations`, the source-verified
  GENERATIONS_KEY), the counter incremented (count=1); screenshots 173
  (the mobile menu open on /Pricing — the dark superset panel over the
  page's own dark hero band) and 174 (the landing hero) captured,
  PIL-verified, the mobile-menu capture's anatomy pixel-verified (the
  dark panel rows (19,28,46)/(17,31,49)/(24,33,51) ≈ slate-900/95 with
  light bleed, the amber pill rows at (248,174,24), the y 330–430 band
  (36,90,89)→(19,78,74) is /Pricing's OWN from-slate-900 to-teal-900
  hero below the panel — page content, not panel; 390×844 @ 82.79%
  non-white, 1440×900 @ 99.96% — the same anatomy as captures
  167/169/171, the session-80/81/82 twins).

No Tailwind v4 bug in the mobile menu — verified at the source, the
compiled sheet, and the live DOM on both legs.

## The lockstep

Counts HELD (the round's functional cure is dependency-level, +0 new
`it()` blocks by construction): UNIT 813 / SUITES 41 / E2E 71 /
E2E_SPECS 9 / SMOKE 16 / BADGE 884. The ten provenance sites set
`1..82` → `1..83` uniform; the docs-counts s83 rung; the PAD header
date (S83-2); README's session-83 row + gate footer; AGENTS's plans-map
eighty-third round; SKILL v1.78.0 → v1.79.0 + the Appendix-A
session-83 row + the Appendix-B re-cert through 83; worklog Task 83;
this formal log; the plan's post-execution record.

## The ship

Full gate GREEN on the final tree; census MATCH; captures 173/174;
`.env.example` verified matching the codebase (included in the
commit); Conventional Commit on `main`; push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py` per the runbook); the operator key
shredded after the verified push.

**Gate at the session-83 ship: lint 0/0 · tsc 0 · unit 813/813 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH.**

If you want the next round, re-send the work order — the flow resumes
at session-84 with a fresh audit + parity walk #57.
