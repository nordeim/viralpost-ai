# Session 8 — The Live OG-Parity Discovery + The Phantom-Evidence Provenance Sweep (2026-11-09)

## Context

Session 7 pushed `739b2c2` (the dev-script tee cure + the phantom-comment
long tail); the owner added `262db32` (`docs/session_7.md`, the session
log). This round re-runs the standing instruction against the merged tree:
docs review → codebase validation → fresh audit (repo skills:
`web-application` §15/§16, `security-and-hardening`) → parity
re-verification → TDD remediation → gate → captures 23/24 → push.

The audit's fresh angle this round: **the evidence-provenance layer** —
every "live-verified / byte-verified / census" claim in `src/` and
`tests/` read against what THIS repo's dossier actually observed, plus a
full live re-census of the reference's SEO surface (the standing
sitemap/SEO check). The workspace was reset before this round, so the
round also organically re-ran the §15 pristine-clone verification
(clone → install → `cp .env.example .env` → db:push → db:seed → census
MATCH → lint/tsc/unit green at the documented counts).

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| F8-1 | **HIGH** (parity) | `src/lib/site.ts` (`pageOgDescription`) | The reference **ships per-route OG/Twitter metadata with the PLAIN 170-char description** — live-verified this round on `/`, `/Tool`, `/Pricing`, `/Contact`, `/login`: `og:title` mirrors the title scheme (bare on `/` and `/login`), `og:description` = the plain root paragraph, absolute `og:url`, per-route `canonical`, the twitter family mirrors, one static og:image (the platform's 1200×630 render), plus the PWA metas. This **contradicts dossier D-4** ("No SEO per-route canonical/OG on inner pages beyond title tag") — whether the app updated intra-day or the morning probe over-generalized is undetermined; live truth governs. Our inner pages prefix `"<Page> on ViralPost AI. "` onto the og/twitter description (a CRM-family convention adopted *because* D-4 said the reference ships none) — a live OG-card drift. Cure: inner og/twitter descriptions = `SITE_DESCRIPTION` plain; retire the now-dead `pageOgDescription` export (zero callers); TDD (RED pins first). Our per-route canonical (now parity), og:image stand-in (the S-10 brand-assets row), and og:image width/height attributes stay as documented expressions. |
| F8-2 | MED | `src/lib/site.ts:1-2, 11-16, 72-81` | The header cites **phantom test files** (`tests/metadata.test.ts`, `tests/pwa-metadata.test.ts` — neither exists; the real pin home is `tests/page-titles.test.ts`) and the retired serializer forms `app/sitemap.ts` / `app/robots.ts` (the real files are the route handlers). The header + factory blocks claim "the reference ships PER-ROUTE canonical/OG/Twitter … live-verified on all 10 routes 2026-10-01" — false provenance (10 routes is the CRM's vocabulary; 2026-10-01 predates this repo) and, after F8-1's discovery, wrong about the description shape too. The file's own S7-cured `pageOgDescription` block (D-4 superset) contradicts its own header — the F7-2 claim surviving in the blocks S7 never reached. |
| F8-3 | MED | `src/lib/verification.ts:7-14`, `src/app/api/auth/verify/route.ts:17-21` | "every string … live-verified against the reference (2026-10-01, eleven wrong-code submissions across two throwaway signups)" — contradicted by the dossier (§2: the one throwaway signup was platform-rejected, "success path not exercised"). The verify-view strings are the base44 platform-family inheritance (the CRM's census of its own base44 reference), not this-reference observations. Cure: honest re-attribution (Reasoned / platform-family; the signin banner re-verified live this round). |
| F8-4 | MED | `next.config.ts:79-86`, `tests/http-headers.test.ts:6-20` | "three-header security set on EVERY response … curl-verified on 10+ responses, 2026-10-01" + `nosniff` "on the same census" + a census list carrying CRM routes (/Leads, /settings, /Reports). Live census this round on the actual surfaces: `referrer-policy: strict-origin-when-cross-origin` + bare `strict-transport-security: max-age=31536000` on **every** probed response; `x-content-type-options: nosniff` **only on the HTML/SSR routes** (absent on /sitemap.xml, /robots.txt, the CSS asset). Our headers() ships all three on every route — the documented superset (keep; broader nosniff is strictly defensive). Cure: rewrite both blocks to the live census. |
| F8-5 | LOW | `src/app/manifest.json/route.ts`, `src/app/robots.txt/route.ts`, `src/app/sitemap.xml/route.ts` | Phantom dates + CRM session labels ("Session-19 (S19-P1)", "byte-verified 2026-10-01"). Content claims live-TRUE (re-verified this round: manifest field-for-field through the reference's 302 → `/api/apps/manifests/<id>/manifest.json` hop — key order, the 170-char description, dual same-src icons, standalone/#000000/#ffffff; robots byte-format 75 bytes, LF-only, no trailing newline; sitemap format identical incl. the newline-before-`</urlset>`, same four routes). Cure: re-attribute to this round's live verification; note the manifest redirect hop. |
| F8-6 | LOW | `src/app/api/auth/login/route.ts:44-49`, `signup/route.ts:70-75`, `resend/route.ts:10-16`, `src/components/layout/login-card.tsx:55-67, 105-112, 473-477`, `src/lib/login-reset.ts:200-215` | Verify-view strings/classes claimed "live-verified / live-measured / live-extracted on the reference" — the view was **never observed on this reference** (dossier-documented platform rejection). The signin error banner IS live-true (re-verified this round: wrong-password → `"Invalid email or password"`, correct → 200). Cure: re-attribute the verify-view claims to the platform-family inheritance; keep the live-true signin claim with the fresh date. |
| F8-7 | LOW | `tests/typography.test.ts:8-11` | "79.5KB stylesheet … byte-extracted … on 2026-10-01" — phantom date. Live re-fetch this round: **79,690 bytes**, zero `@font-face`, the stock sans stack (the reference's minifier leaves `Segoe UI Symbol` unquoted — computed-identical), no font smoothing, no `::selection`. Cure: update figure + date. |
| F8-8 | LOW | `README.md:8` | The `tests-450 checks` badge was computed at session 2 (402 unit + 48 e2e) and never advanced — now 407 + 48 = **455**. The S7 count-lockstep swept `405→407`, so this different-number drift escaped. |

**Verified at parity, no defect:** robots.txt byte-format; sitemap format
+ route set; the root OG family + PWA metas; the login error string; the
typography contract; the manifest shape; the env contract (`.env.example`
↔ code, all six knobs both directions); `skills/` excluded from
tsconfig/eslint/vitest/playwright; the S7 cures hold (dev script clean,
api.ts retirement accurate, 170-char labels correct, census MATCH).

## Remediation (TDD where a contract changes)

- **R8-1 (RED)**: `tests/page-titles.test.ts` gains (a) the
  live-OG parity pin — inner pages' `openGraph.description` +
  `twitter.description` === `SITE_DESCRIPTION` (plain); (b) the
  prefix-retirement pin — `pageOgDescription` absent from `src/lib/site.ts`
  (the S7 body-pregate absence pattern). Both fail against the current
  tree.
- **R8-2 (GREEN, F8-1/F8-2)**: `src/lib/site.ts` — retire `pageOgDescription`
  and the prefix (`pageMetadata` ships `SITE_DESCRIPTION` on every route);
  rewrite the header + factory comments to the live-verified OG contract
  (title-mirroring og:title, plain description, absolute og:url,
  per-route canonical, the static image; our `/og-image.png` is the S-10
  self-hosted stand-in); fix the phantom test-file pointers →
  `tests/page-titles.test.ts`; fix `app/sitemap.ts`/`app/robots.ts` → the
  route handlers.
- **R8-3 (F8-3)**: verification.ts + verify/route.ts — re-attribute the
  census claims (platform-family inheritance, dossier-documented
  rejection; the signin banner re-verified live 2026-11-09).
- **R8-4 (F8-4)**: next.config.ts + http-headers.test.ts — rewrite the
  census blocks to this round's live census (referrer-policy + bare HSTS
  everywhere; nosniff HTML-only on the reference; ours = the documented
  all-routes superset).
- **R8-5 (F8-5)**: the three SEO route handlers — re-attribute to this
  round's live verification (manifest via the 302 hop; robots byte-format;
  sitemap format).
- **R8-6 (F8-6)**: the auth-funnel verify-view claims re-attributed
  (login/signup/resend routes, login-card.tsx, login-reset.ts).
- **R8-7 (F8-7)**: typography.test.ts — 79,690 bytes, re-verified
  2026-11-09.
- **R8-8 (F8-8)**: README badge 450 → 455.
- **R8-9 (evidence ledger)**: the dossier's D-4 row gains the session-8
  re-verification annotation (the live contradiction, the undetermined
  cause, the cure).
- **R8-10 (lockstep)**: SKILL v1.3.0 → v1.4.0 (Appendix A Session 8 row,
  frontmatter state); README status table + gate line; AGENTS plans map
  (eight) + unit count; CLAUDE/PAD counts; worklog Task 8; this plan's
  execution record.
- **R8-11**: captures 23/24 (dev-server landing 1280×800 + the open
  mobile menu 390×844) on the standing dev script, before the gate build.
- **R8-12**: full gate on the exact commit tree → Conventional Commit on
  `main` → SSH-wrapper push (dry-run first).

## Acceptance criteria

1. Both new pins GREEN; the full gate green (lint 0/0 · tsc 0 · unit
   407+2 · build · smoke 15/15 · e2e 48/48 · census MATCH).
2. `rg "2026-10-01|pageOgDescription|on ViralPost AI\. |tests/metadata\.test\.ts|tests/pwa-metadata\.test\.ts"`
   over `src/ tests/` returns nothing.
3. Live parity re-verified on the dev server: our served `/Tool` head
   carries `og:title "Tool | ViralPost AI"`, the PLAIN 170-char
   og/twitter description, `/Tool` canonical; the mobile menu walk
   (closed/open/navigate/auto-close) at 390×844; sitemap/robots/manifest
   byte formats.
4. The dossier D-4 annotation records the live contradiction and the cure.

## Execution record

- **R8-1 (RED)**: both pins written and verified failing against the
  pre-cure tree — the plain-OG-description parity pin (Tool/Pricing/Contact
  og+twitter descriptions === SITE_DESCRIPTION) and the prefix-retirement
  absence pin (comment-stripped site.ts carries no `pageOgDescription`;
  the file carries no prefix string).
- **R8-2 (GREEN, F8-1/F8-2)**: `pageOgDescription` retired (zero external
  callers; the S7 api.ts retirement precedent) with an accurate retirement
  note; `pageMetadata` ships `SITE_DESCRIPTION` on every route; the header
  + factory comments rewritten to the live-verified OG contract; the
  phantom test-file pointers fixed (→ `tests/page-titles.test.ts`); the
  `app/sitemap.ts`/`app/robots.ts` references fixed (→ the route
  handlers).
- **R8-3 (F8-3)**: verification.ts + verify/route.ts re-attributed — the
  strings ride the base44 platform's shared auth component (the dossier's
  signup probe was platform-rejected); the signin banner marked
  live-re-verified.
- **R8-4 (F8-4)**: next.config.ts + http-headers.test.ts census blocks
  rewritten to the session-8 live census (referrer-policy + bare HSTS
  everywhere; nosniff HTML-only on the reference; ours = the documented
  all-routes superset).
- **R8-5 (F8-5)**: manifest/robots/sitemap route comments re-attributed
  to the session-8 live verification (the manifest's 302 hop noted; the
  sitemap's route-order difference noted).
- **R8-6 (F8-6)**: the auth-funnel verify-view claims re-attributed
  (login/signup/resend routes, login-card.tsx ×3 sites, login-reset.ts
  verify constants, login-views.test.ts header); the login error banner
  comment refreshed with the live re-verification.
- **R8-7 (F8-7)**: typography.test.ts — 79,690 bytes, session-8 re-fetch,
  the minifier's unquoted "Segoe UI Symbol" noted as computed-identical.
- **R8-8 (F8-8)**: README badge 450 → 455.
- **R8-9**: dossier D-4 annotated (SUPERSEDED; the live census; the
  undetermined cause; the cure).
- **R8-10**: SKILL v1.4.0 (Session 8 row, frontmatter, Appendix B
  re-certification advanced); README status table + gate line; AGENTS
  eight-plan map + 409; CLAUDE/PAD counts; worklog Task 8.
- **R8-11**: captures 23/24 on the standing dev script (stable — the S7
  cure holding), PIL-verified (99.7% / 99.9%).
- **R8-12**: **FULL GATE GREEN** on the exact commit tree — lint 0/0 ·
  tsc 0 · unit 409/409 (29 files, +2) · build · smoke 15/15 · e2e 48/48
  (8 specs) · census MATCH. Live parity re-verified: the reference's
  mobile menu walked (closed/open — the same 5 destinations + brand),
  the clone's walk (open → click-through → auto-close → correct title),
  /Tool + /Dashboard 404 + derived title, our served /Tool OG head
  byte-matching the reference post-cure, sitemap/robots/manifest
  byte-diffed (robots IDENTICAL origin-substituted).
