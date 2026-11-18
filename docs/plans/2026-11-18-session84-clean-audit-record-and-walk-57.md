# Session 84 Plan — The Zero-Finding Clean-Audit Record + Parity Walk #57

Date: 2026-11-18. Round opens on `46e26db5` (session-83's ship `0dd95aa4` + the
owner's narration push carrying `docs/session_84.md` as this round's working
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
  `env -u DATABASE_URL` on every DB-touching command — the S63..S83 hazard
  still present in this shell).
- **Vitest + Playwright suites**: configs verified current and wired (vitest
  `*.test.ts`-only + skills exclusion + `@` alias; playwright setup project +
  storageState + single-source port + pinned `db/e2e.db`; the full e2e layer
  re-ran GREEN against the production build; chromium rev 1248 installed
  fresh this round, matching the pinned `@playwright/test@1.64.1`).
- **Sitemap + SEO**: verified live in walk #57 (both legs) — sitemap 4 URLs
  (weekly, 1.0/0.8/0.8/0.8) format-identical modulo origin at the nav order
  (/, /Tool, /Pricing, /Contact), robots byte-body (modulo origin), manifest
  + the three security headers on the SEO family (the smoke leg 14 family);
  the sitemap route's format contract re-read at its source
  (`force-static`, the explicit `application/xml`, no /Home duplicate —
  the 308 fix).
- **Mobile navigation + Tailwind v4**: walk #57's mobile battery clean on
  both legs at 390×844 (hamburger byte-match + aria superset; panel at the
  byte-equal 265px; Escape close-with-focus-return on the clone vs R-OPEN on
  the reference — our superset; outside-tap both-open — parity, the pre-tap
  state verified OPEN before the tap; route-change hidden-in-DOM vs the
  reference's SPA unmount — the documented pair). The COMPILED sheet
  re-verified independently: ZERO `(hover: hover)` media wraps (the
  `@custom-variant hover` unwrap live), the
  `button,[role=button]{cursor:pointer}` base rule live (the minified
  unquoted spelling), `md` boundary at `min-width:48rem` — **no Tailwind v4
  bug in the mobile menu** at the source, sheet, or live-DOM level.
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest excludes
  and the smoke artifact-hygiene leg (16/16).
- **Screenshots**: 175 (the mobile menu open at 390×844 on /Pricing — the
  dark superset panel over the page's own slate-900→teal-900 hero, the amber
  pill rows) and 176 (the landing hero at 1440×900) captured during walk
  #57's CLONE leg, PIL-verified (390×844 @ 82.69% non-white — the
  session-80..83 computation family (82.7%); the panel link row
  (18,27,45) ≈ slate-900/95, the amber pill rows (251,190,35)/(249,175,26),
  the (30,380) band (19,71,70) is /Pricing's OWN `from-slate-900
  to-teal-900` hero below the panel — page content, not panel; 1440×900 @
  99.96% non-white) — the same anatomy as captures 167/169/171/173, the
  session-80/81/82/83 twins.
- **`.env.example`**: verified matching the codebase (all six knobs —
  DATABASE_URL, AUTH_SECRET, NEXT_PUBLIC_SITE_URL, VIRALPOST_PROXY_HOPS,
  VIRALPOST_DISABLE_IN_APP_OTP, VIRALPOST_DISABLE_IN_APP_RESET; the
  provenance comment rides the 1..83 bound — re-anchored in the lockstep
  below).

## The audit (direct lead reads — the session-76..83 precedent continues)

Code findings: **0 Critical / 0 High / 0 Medium / 0 Low** — the SIXTH
consecutive zero-finding code round (session-78 the first, session-80/81/82/83
the second through fifth). The lane reads:

- The session-83 narration push (`46e26db5`) diffed in full against the
  session-83 ship `0dd95aa4` — exactly one file added
  (`docs/session_84.md`, 90 lines, the owner's narration window); no
  collateral.
- `src/components/marketing/navbar.tsx` read IN FULL — the aria superset
  (label/expanded/controls), the S26-1 `hidden`-attribute mechanics, the
  S26-3 `scrolled`-alone bar key, the S31-2 history-close focus arm, the
  S45-3/S45-4 censused-parity postures, the S22-1/S22-2 priced pill, the
  S22-3 bare mobile family, the S22-5 scrolled panel arm all at their
  sites; no drift.
- `src/components/ui/toast.tsx` read at its documented sites — the S72-4
  geometry tracker + mount probe, the S73-4 exit arm, the S74-4b
  pointer-typed enter, the S70-4 mixed-modality unpausers, the S75-5
  compound blur guard, the S76-1 hoisted rect; the `1..83` range at line
  294; no drift.
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
- The ten provenance sites verified at `1..83` uniform (the session-83
  lockstep state, lag 0).
- The standing `bun audit` duty: the census at the documented post-S83-1
  floor — **4 advisories (3H/1M)**, all dev-toolchain (deepmerge-ts H
  prisma-CLI-chain, picomatch H eslint/vitest-chains, source-map-js H
  postcss-chains, minimatch M eslint-chain), zero runtime-path items —
  no advisory-database drift this round. `bun outdated` deltas all
  non-advisory (major-version jumps or advisory-free minor patches) — no
  dependency change warranted.

## Parity walk #57 — clean (the fifty-seventh consecutive)

Both legs at every documented posture:

- **REF leg** (390×844, logged in as `sepnetflix2023@outlook.com` →
  lands on `/Home`): hamburger `md:hidden p-2 text-slate-300` with no
  aria family (our documented superset), cursor pointer, slate-300 ink
  (rgb(203,213,225)); panel at 265px with the reference's `md:hidden
  bg-slate-900/98 border-b border-white/10 overflow-hidden` family (the
  dead /98 token computing transparent), 4 nav links + the $19 pill;
  Escape stays OPEN (R-OPEN); outside-tap on real page content (the hero
  `<p>` at (30,350), the pre-tap state verified OPEN) stays OPEN (R-OPEN);
  route-change unmounts the panel (R-unmount at /Pricing); the desktop
  gradient census on /Pricing — the navbar `Upgrade to Pro`
  amber-400→amber-500 (rgb(251,191,36)→rgb(245,158,11)), the pricing
  page's `Get Unlimited Access` teal-400→amber-400
  (rgb(45,212,191)→rgb(251,191,36)), the plan CTA `Upgrade – $19`
  teal-500→teal-600 (rgb(20,184,166)→rgb(13,148,136)); sitemap 4 URLs
  (weekly, 1.0/0.8/0.8/0.8, the nav order) + robots byte-body; the
  generator DEAD at the 30s probe on /Tool (0 hashtag nodes, the button
  restored — the D-1 silent-rest face).
- **CLONE leg** (the production standalone build on :3200, ONE single
  script — boot + drive browser + teardown): login lands on `/` (the
  /Home 308 pair); hamburger byte-match + the aria superset
  (label/expanded/controls) + the focus-visible family; panel at the
  byte-equal 265px with the same 5 links + the $19 pill (transparent
  over the unscrolled hero — the dead-token replication); Escape CLOSES
  with focus returned to the toggle (our superset, focusOnToggle=true);
  outside-tap stays OPEN (parity, the same hero `<p>` at (30,349));
  route-change hidden-in-DOM (the documented pair); the nav-scoped
  gradient census — the `Get Unlimited Access` CTA gradient
  byte-identical (`linear-gradient(to right, rgb(45, 212, 191),
  rgb(251, 191, 36))` — the inline-style hue-crossing form), the navbar
  pill and the plan CTA endpoint-equal with the documented oklab
  spellings (the sub-threshold doctrine); the initial probe's navPill
  "none" + planCta amber reads diagnosed as probe DOM-scope artifacts
  (the UNSCOPED probe grabbed the footer's plain "Upgrade to Pro" link
  and the first `– $19` match — the hidden-in-DOM mobile pill; the
  s78/s80/s83 selector-doctrine precedent; the nav-scoped re-probe read
  both at their documented endpoints); the generator LIVE — postPresent
  =true with 5 hashtags at the 8s probe after the client-quota reset
  (`viralpost_generations`, the source-verified GENERATIONS_KEY), 76
  words, hook first line, the Copy button present, the counter
  incremented (count=1); the initial probe's hashtag-node zero
  diagnosed as the lead's OWN selector artifact (the post renders as
  ONE whitespace-pre-line `<p>` — the s80 precedent; the corrected
  probe counts the hashtag substrings); screenshots 175 (the mobile
  menu open on /Pricing) and 176 (the landing hero) captured,
  PIL-verified, the mobile-menu capture's anatomy pixel-verified (the
  same anatomy as captures 167/169/171/173, the session-80/81/82/83
  twins).

No Tailwind v4 bug in the mobile menu — verified at the source, the
compiled sheet, and the live DOM on both legs.

## The cure

- **S84-1 — the session-84 lockstep** (the round's only change set; zero
  code findings, the clean-audit record form): counts HOLD at the ship
  (+0 new `it()` blocks — the docs-only form): UNIT 813 / SUITES 41 /
  E2E 71 / E2E_SPECS 9 / SMOKE 16 / BADGE 884. The docs-counts test gains
  the s84 rung comment. The ten provenance sites set `1..83` → `1..84`
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
      `last_updated` + `project_state` + the version bump v1.79.0 →
      v1.80.0 + the Appendix-A session-84 row + the Appendix-B re-cert
      through 84)
  Plus the doc-family sites: README's session-84 row + the gate-footer
  label ("Gate at the session-84 ship"); AGENTS's plans-map
  eighty-fourth round; PAD's header date; worklog's Task 84 entry; the
  formal `docs/session_84.md` (replacing the owner's narration window);
  this plan's post-execution record; the docs-counts s84 rung.

## The ship

Full gate GREEN on the final tree; census MATCH; captures 175/176
PIL-verified; `.env.example` verified matching the codebase (included in
the commit); Conventional Commit on `main`; push via the SSH wrapper
(`docs/ssh_git_wrapper_v3.py` per the runbook); the operator key
shredded after the verified push.

## The post-execution record (the plan vs the execution)

- The round executed exactly as planned: a zero-finding clean-audit
  record (the sixth consecutive) with parity walk #57 clean on both
  legs; no functional cures — the S84-1 lockstep is the round's entire
  change set.
- The walk's probe artifacts played out as documented in the plan's
  walk section: the CLONE gradient probe's initial unscoped navPill
  "none" + planCta amber reads (the footer link + the hidden-in-DOM
  mobile pill) and the generator probe's hashtag-NODE zero (the ONE
  whitespace-pre-line `<p>` anatomy) were both diagnosed as lead-probe
  artifacts and re-probed at their documented postures — no phantom
  findings recorded (the s78/s80/s83 selector-doctrine precedent).
- The lockstep executed with zero collateral: the residual `1..83`
  grep returned none after the ten-site re-anchor; the docs-counts s84
  rung shipped in the same commit; the PAD header date; README's
  session-84 row + gate footer; AGENTS's plans-map; SKILL v1.79.0 →
  v1.80.0 + the Appendix-A session-84 row + the Appendix-B re-cert
  through 84; worklog Task 84; the formal session_84.md replacing the
  narration window.
- Counts at ship: 813/41 + 71/9 + 16, badge 884 — ALL HELD (the
  clean-audit record form, +0 new its by construction). SKILL v1.80.0.
  The audit census at the documented post-S83-1 floor: 4 advisories
  (3H/1M, all dev-toolchain).
