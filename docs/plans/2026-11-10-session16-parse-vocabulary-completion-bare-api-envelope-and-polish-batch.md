# Session 16 — The Parse-Vocabulary Completion + The Bare-/api Envelope + The Polish Batch (2026-11-10)

## Context

Session 15 pushed `d2b2a12` (the resend P2025 sibling arm + the null-body
vocabulary + the API-envelope 404); the owner added `de6e238` (the
session-15 log). This round re-ran the standing instruction against the
merged tree: docs review → baseline gate → the comprehensive audit → the
neo-crm re-review → the live reference parity walk → the TDD cures → the
gate → captures → push.

**Baseline (the merged tree, verified in place):** the full gate GREEN at
the documented session-15 counts — lint 0/0 · tsc 0 · unit 543/543 (37
files) · build · smoke 15/15 · e2e 56/56 (9 specs) · census MATCH (1 user
+ 0 messages).

**The audit** (dispatched wide; every load-bearing finding hand-verified
in source, five surfaces live-probed on the dev API pre-cure):
0 Critical / 0 High / **1 Medium** / 2 Low / 8 Informational. The
session-15 cures re-verified clean (the P2025 arm, both null-body arms,
the API catch-all's five-method family, the aria-hidden pair, the
slate-300 focus ring, `prisma` in devDependencies + the zod resolutions
pin). The clean areas: the envelope discipline across all 13 handlers,
the Prisma race mapping (P2002/P2025/P2024/P2028 complete), the auth
posture (cookie flags, timing equalizers, enumeration posture, the
three-layer bounded reader), the effects cleanup, the Tailwind v4 token
discipline, the SEO surface byte-formats, and the PAD §12 line-count
table (19/19 rows live-matched).

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review; the recorded adoption/deferral decisions stand.

**The parity walk (live, both sides):** the reference (login → `/Home`
with the "ViralPost AI" title; the mobile menu at 390×844 — the no-aria
hamburger `md:hidden p-2 text-slate-300`, 5 destinations, auto-close on
navigation — the post-nav visible `/Tool` link is the FOOTER's, the menu
panel itself closed; the per-route OG family re-captured on all five
routes — prefixed `og:title` + per-route canonical on `/Tool` `/Pricing`
`/Contact`, the unprefixed family on `/` and `/login`, the plain
description everywhere, matching the clone byte-for-byte; sitemap.xml +
robots.txt unchanged) and the clone's dev server (hydration clean at
390×844; the menu open — 5 destinations + the brand link; Escape WITH
the focus return; navigate → auto-close + the derived `Tool | ViralPost
AI` title; the hamburger carries the reference's base classes + the
S15-8 slate-300 focus ring). NO drift since session 15. (Footnote: the
session-15 plan's walk phrase "og:title 'ViralPost AI' + the root
canonical" for `/Tool` was a transcription slip — it describes the `/`
family; today's five-route live capture settles the record: the clone
matches the reference exactly.)

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S16-1 | **MEDIUM** (message discipline; live-confirmed ×5) | `src/lib/api.ts:202`; `src/app/api/contact/route.ts:37`; `src/lib/schemas.ts:35,67,87` | **The S15-2 genus, incompletely closed: Zod's dev-facing messages still reach clients for non-null malformed bodies.** The S15-2 cure guards `raw === null` only — a JSON body that parses to a STRING/ARRAY/NUMBER passes the guard and feeds safeParse → `"Invalid input: expected object, received string"` on all six auth routes (via parseBody) and contact's route-local site (live-probes: login `"hello"`/`[1,2]`, contact `"hello"`). Field-level: `verifySchema.code`, `resetPasswordSchema.new_password`, and `passwordSchema` (signup) lack the `{ message }` param → `"Invalid input: expected string, received number/undefined"` (live-probes: verify `{"code":12345}`, reset `{"reset_token":"abc"}`, signup `{"password":12345678}`). Unpinned, version-dependent vocabulary at the API boundary — exactly what S15-2 retired for the null class. Generate is clean (its narrowing bypasses the issue message — the S15-2 pin's own contract). |
| S16-2 | **LOW** (doctrine closure; routing-verified) | routing — no `src/app/api/route.ts` | **The bare `/api` path (zero segments) escapes the envelope-404 catch-all.** `[...path]` is a REQUIRED catch-all — it never matches `/api` itself, which falls through to the page tree's `[...catchAll]` → the HTML 404 (title "Api \| ViralPost AI"). The S15-7 doctrine ("unknown `/api/*` answers the JSON envelope 404") holds for every subpath — e2e-proven — but the bare path is the one shape that slips back to HTML. Cure: `src/app/api/route.ts` with the same five-method envelope-404 family. |
| S16-3 | **LOW** (deferral re-record) | `eslint.config.mjs:20` | **The S15-6 deferral's blast radius is wider than recorded.** `react-hooks/exhaustive-deps` is off for the WHOLE tree (the PAD §11 row names "2 flags in particle-text"); also off tree-wide: `no-console`, `no-unused-vars`, `no-undef`, `no-unreachable` — the lint gate cannot catch a future stray console.log or dead write anywhere. The 2 documented exhaustive-deps flags remain the only live ones (re-verified). DEFERRED again with the true scope recorded: scoping the off-switch per-file requires restructuring particle-text's join-key idiom first. |
| S16-4 | INFO→cured (dead code) | `src/components/effects/particle-text.tsx:65,75` | **`reducedRef` is a dead write** — assigned, never read (invisible only because `no-unused-vars` is off). Delete. |
| S16-5 | INFO (documented deviation) | `src/components/marketing/footer.tsx:78` | **The footer's © year freezes at build time** — a server component inside the statically-prerendered `(site)` pages (`new Date().getFullYear()` evaluates at `next build`). The reference's SPA computes it client-side every load. Divergence begins only after a calendar-year boundary crosses the last deploy. ACCEPTED + documented (PAD §11 + the code comment): every code cure (a client island / dynamic rendering) trades hydration risk or un-statics the marketing pages for zero current-day value. |
| S16-6 | INFO→cured (docs staleness) | `Project_Architecture_Document.md:668` | **The PAD §12 header still says "at the session-11 ship"** while the table's rows were re-anchored through session 15 — stale prose. Refresh to the session-16 ship. |
| S16-7 | INFO→cured (comment) | `src/app/api/generate/route.ts:42-51` | **The generate route's 429 is hand-built** (`NextResponse.json` with the deliberately different "Too many generations." message) instead of `ERR.RATE_LIMITED` — the family's only deviation from the ERR factory, with no WHY comment. Add the one-line rationale (the client-facing copy is the pinned generator vocabulary, distinct from the auth family's "Too many attempts."). |

## Remediation (TDD where a contract changes)

- **R16-1 (RED→GREEN, S16-1)**: the pins first — (a) parse-body.test.ts:
  one behavioral pin owning the four non-object JSON forms (string /
  array / number / boolean — co-pinned faces, documented in the pin's
  comment) → all answer `"Invalid request body"`; (b) schemas.test.ts:
  three field-level pins (verify's non-string code → "Please enter all
  6 digits"; reset's missing/non-string new_password → "Password must
  be at least 8 characters long"; signup's non-string password →
  "Password must be at least 8 characters"); (c) api-robustness.test.ts:
  the contact site's widened object-guard source pin. Then the cures:
  parseBody's guard widens to `raw === null || typeof raw !== "object"
  || Array.isArray(raw)`; contact mirrors the same arm; the three schema
  fields gain `{ message }`. Mutation batteries: each arm's removal (and
  each `{ message }`'s removal) REDs exactly its pin.
- **R16-2 (RED→GREEN, S16-2)**: the e2e leg FIRST — the S15-7 leg gains
  the bare `/api` (GET + the content-type + envelope assertions),
  proven RED against the pre-cure build (the HTML 404 answers today),
  then `src/app/api/route.ts` — the five-method envelope 404 (the
  `[...path]` route's exact family). GREEN at the e2e layer.
- **R16-3 (S16-4)**: delete `reducedRef` (the declaration + the
  assignment). No pins reference it (verified).
- **R16-4 (S16-7)**: the generate-429 WHY comment.
- **R16-5 (S16-5)**: the footer-year deviation comment + the PAD §11 row.
- **R16-6 (S16-3 + S16-6)**: the PAD §11 S15-6 row re-recorded with the
  true blast radius; the PAD §12 header phrase refreshed.
- **R16-7 (lockstep)**: the count constants re-anchored AFTER all test
  changes land (unit 543 → 548: +1 the parse-body non-object pin, +3
  the schema field pins, +1 the contact source pin; e2e stays 56 — the
  S16-2 leg extends the existing S15-7 test in place, its purpose being
  exactly this doctrine); the badge 599 → 604; README (status row,
  testing section); AGENTS (counts, the plans map's sixteenth round);
  CLAUDE; PAD (§8.1 distribution, §11's two rows, §12's inventory —
  api.ts/contact/schemas/particle-text line counts re-anchored + the
  new api/route.ts row); SKILL v1.11.0 → v1.12.0; worklog Task 16; this
  plan's execution record.
- **R16-8**: captures 39/40 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R16-9**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. No Zod-generated message reaches any client: non-object JSON bodies
   answer `"Invalid request body"` on the auth family AND contact;
   non-string codes/passwords answer their pinned field messages
   (behaviorally pinned; mutation batteries RED exactly their pins).
3. The bare `/api` answers the JSON envelope 404 (e2e-proven); known
   paths and their 405/404 semantics unchanged.
4. `reducedRef` gone; the generate-429 + footer-year comments in; the
   PAD §11 register carries the S16-3 re-record and the S16-5 deviation;
   the PAD §12 header matches the ship.
5. Docs lockstep at the final counts (548/56, badge 604); SKILL v1.12.0;
   captures 39/40 PIL-verified.

## Execution record

- **Baseline**: the full gate green at the documented session-15 counts
  on the merged tree (543/37 files · 56/9 specs · 15 legs · census
  MATCH).
- **The audit**: 0 Critical / 0 High / 1 Medium / 2 Low / 8
  Informational; S16-1 live-confirmed on five dev-API probes; S16-2
  routing-verified; the rest hand-verified in source.
- **The parity walk**: the reference live (NO drift; the OG family
  re-captured on all five routes — the clone matches byte-for-byte) +
  the clone's dev server (the menu family, the derived titles).

## Post-execution record (appended at ship)

- **R16-1 (S16-1)**: the pins first (RED — exactly 5: the parse-body
  non-object behavioral pin over the four forms, the three schema
  field-type pins, the contact object-guard source pin), then the
  cures (the widened parseBody guard, contact's mirror, the three
  `{ message }` type-faces). **Mutation batteries**: the parseBody
  arm disabled to the null-only form, the contact arm disabled, and
  each of the three `{ message }` params removed — each RED exactly
  its pin → restored → GREEN (57/57 across the three suites).
- **R16-2 (S16-2)**: the S15-7 e2e leg extended in place with the
  bare-`/api` assertions FIRST — RED against the pre-cure build (the
  content-type assertion failed on the HTML 404), then
  `src/app/api/route.ts` (the five-method envelope 404) → GREEN; the
  full seo.spec 9/9 post-cure.
- **R16-3 (S16-4)**: `reducedRef` deleted (the declaration + the
  assignment; zero pin references — verified).
- **R16-4 (S16-7)**: the generate-429 WHY comment (the deliberate
  ERR.RATE_LIMITED deviation — the generator's own client-facing
  copy, the shape + Retry-After identical).
- **R16-5 (S16-5)**: the footer-year deviation comment + the PAD §11
  row (accepted: a client-side island trades hydration risk for zero
  current-day value).
- **R16-6 (S16-3 + S16-6)**: the PAD §11 S15-6 row re-recorded with
  the tree-wide blast radius; the PAD §12 header refreshed to the
  session-16 ship.
- **R16-7 (lockstep)**: unit 543 → 548/37 files (+1 the parse-body
  non-object pin, +3 the schema field pins, +1 the contact source
  pin), e2e 56 unchanged (the in-place leg extension), badge 604 =
  548+56; the reality census re-anchored FIRST (UNIT; the PAD §12
  rows api.ts 222→230, particle-text 315→313, + the new api/route.ts
  row at 34 — one incidental: api.ts's trailing newline restored after
  the edit left it unterminated); README (badge, architecture +
  testing counts, the API table's catch-all row naming both routes,
  the session-16 status row, the gate line); AGENTS (counts, the
  plans map's sixteenth round); CLAUDE; PAD (§8.1, §8.3, §11's two
  rows, §12's inventory + header); the SKILL v1.11.0 → v1.12.0
  (frontmatter, the §11 checklist counts, Appendix A's session-16
  row, Appendix B re-certified through session 16); worklog Task 16;
  this record.
- **R16-8**: captures 39/40 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `localhost`,
  hydration awaited), PIL-verified.
- **R16-9**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).
- **Deferred (documented in the PAD §11 register)**: S16-3 (the eslint
  off-switches stay tree-wide-off; scoping requires restructuring
  particle-text's join-key idiom first), S16-5 (the footer-year
  build-time freeze — accepted with the divergence window documented).
