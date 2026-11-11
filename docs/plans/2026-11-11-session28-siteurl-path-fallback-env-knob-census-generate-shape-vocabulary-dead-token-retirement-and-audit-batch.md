# Session 28 — The siteUrl Path-Fallback + The .env-Example Knob Census + The Generate Shape Vocabulary + The Dead-Token Retirement + The Audit Batch (2026-11-11)

## Context

Session 27 pushed `0dd57ca`; the owner added `af63c73` (the session-27
execution log held as `docs/session_28.md`, the established pattern). This
round re-ran the standing instruction against the merged tree: docs review
→ baseline gate → the comprehensive audit (three parallel subagents) → the
neo-crm re-review (HEAD `b3d0fbe`, UNCHANGED since session 12 — the
recorded decisions stand) → the live reference parity walk → the TDD cures
→ the gate → captures → push.

**Baseline (the merged tree, verified in place):** lint 0/0 · tsc 0 · unit
631/631 (38 files) · census MATCH · `.env`'s
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ✓ ·
vitest (`vitest.config.mts`) + playwright (`playwright.config.ts`) suites
in place and current ✓ · sitemap.xml / robots.txt / manifest / OG family
verified live against the reference ✓ · `skills/` excluded from every
gate (tsconfig/eslint/vitest, all pinned) ✓ · `.env.example` present,
committed, and matching the codebase's six-knob contract ✓.

**The audit** (three parallel dispatched subagents — AUDIT-1 API/lib seams,
AUDIT-2 components/pages/effects, AUDIT-3 SEO/configs/tests/docs — every
load-bearing finding hand-verified in source by the lead):
**AUDIT-1: 0C/0H/1M/3L/4I · AUDIT-2: 0C/0H/0M/2L/4I · AUDIT-3:
0C/0H/2M/3L/2I** — combined **0 Critical / 0 High / 3 Medium / 8 Low /
10 Info** at the subagent reports. The lead's adjudication holds the two
SEO/census Mediums (A3-M1, A3-M2), elevates one API Low (A1-L1 — the
generate vocabulary, re-adjudicated against the S16-1 exemption note
below), and takes three of the remaining Lows plus two comment-truth
items into the working register (all cured this round — S28-1..S28-9
below); the rest moves to the accepted register with reasons (see below).

**The parity walk (live, both sides, logged into the reference):** the
mobile-menu control census at 390×844 — the hamburger base classes
(`md:hidden p-2 text-slate-300`; ours + the documented S15-8/S23
superset arms; the reference's aria family remains ABSENT — the
documented superset stands), the four mobile links + the Gumroad pill
("Upgrade to Pro – $19", the bare mobile class family) byte-identical,
the open panel's `max-height: none` + `overflow: hidden` both sides (the
reference's dead `bg-slate-900/98` vs our S22-5 arm — both rendering
transparent at scrollY=0), the bar's `bg-transparent` with the menu open
at scrollY=0 (the S26-3 cure holds), the scrolled-bar class family
byte-identical with the computed background verified THIS ROUND as the
same color in different spelling — our `oklab(0.207678 -0.00293915
-0.0397103 / 0.95)` converts numerically to EXACTLY `rgb(15,23,42)` =
the reference's `rgba(15, 23, 42, 0.95)` slate-900 (the conversion
re-derived in-session with the gamma-encoding step the session-27 note
implied). The five-route head census — NO DRIFT (titles, og:title,
og:description, twitter:card, meta description byte-identical; og:url +
canonical differ by origin only). The footer — the Product column's 3
links both sides (the S25-1 cure holds), the social family our documented
real-links superset over the reference's dead `#` stubs. sitemap.xml +
robots.txt — identical modulo origin. The desktop nav family —
byte-identical (all four underline-family links + the desktop pill +
the bar class). The reference still rides `cdn.tailwindcss.com` (the
v3-era CDN posture observed in the browser console — the documented
context for the hover/aria doctrine). **NO DRIFT FOUND — the second
consecutive fully-clean walk.**

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S28-1 | **MEDIUM** (the S25-4 genus, half-closed) | `src/lib/site.ts:47-72` | `siteUrl()` falls back to the default on query/hash/userinfo shapes (S25-4) but NOT on a path-carrying value — `https://x.com/base` parses absolute http(s) with all four guarded fields empty and passes VERBATIM. The S25-4 pin's own doctrine line ("a bare origin carries no credentials, query, or fragment — anything else is an operator paste error") logically includes the path; the boot gate has warned on the shape since S22-19, but the seam never took the fallback. The value interpolates into `/sitemap.xml`'s `<loc>` unescaped (a path carrying `&` is invalid XML, served 200 — the exact failure S25-4 retired for the query shape) and composes canonical/og:url (URL resolution) against twitter:url (string concat) inconsistently. (AUDIT-3 A3-M1.) |
| S28-2 | **MEDIUM** (pin quality — the arm's name overclaims its body) | `tests/docs-counts.test.ts:266-280` | The arm is named "the README env table carries the six-knob contract (**both directions with .env.example**)" but its body asserts only README rows. No test anywhere reads `.env.example`'s knob set; a 7th var (or a dropped knob) ships green through the gate. The task contract (".env.example mirrors the codebase") has no mechanical owner. (AUDIT-3 A3-M2.) |
| S28-3 | **LOW** (vocabulary consistency — the S16-1 exemption re-adjudicated) | `src/app/api/generate/route.ts:92-101` | A valid-JSON-non-object body (`"hello"`, `42`, `[]`) fails `safeParse` and the rawIdea extraction guard yields `""` — the route answers "Describe your post idea first." Contact (and the auth family via parseBody) answer "Invalid request body" for the same malformed-SHAPE class (S16-1). The S16-1 pin comment's exemption ("generate needs no mirror — its narrowing bypasses the issue message") addressed the Zod dev-message LEAK, which is true; the vocabulary half of the doctrine ("the route-local sites join the vocabulary") was never completed for generate. (AUDIT-1 A1-L1.) |
| S28-4 | **LOW** (dead weight + a census blind spot) | `src/app/globals.css:44` + `tests/design-tokens.test.ts:240-263` | `--color-subtle` has ZERO live consumers — the only occurrence of the utility form in src/ is a COMMENT in `toast.tsx:199` ("the text-subtle form (2.57:1)..."). The dead-token census scans RAW source text, so the comment keeps the token "alive" and the pin passes — the census is prose-blind, the exact shape the sibling arms already strip comments for. One dead custom property ships in every build. (AUDIT-2 A2-L1.) |
| S28-5 | **LOW** (validation-family consistency) | `src/components/layout/reset-password-screen.tsx:148,168` | The reset screen renders the "Must be at least 8 characters" hint but sets no `minLength` attribute; the sibling signup view (`login-card.tsx:539,559`) sets `minLength={8}` on both password fields. A sub-8-char password gets a network round-trip + banner here but the native inline affordance there. (AUDIT-2 A2-L2.) |
| S28-6 | **LOW** (the one count site without a disk census) | `tests/docs-counts.test.ts:137` + `scripts/smoke-test.sh` | UNIT/SUITES/E2E/E2E_SPECS all have reality censuses against disk; SMOKE does not — nothing counts the ladder's `ok NN` legs or the `SMOKE: 15/15 PASS` echo literal. Adding/removing a leg without re-anchoring the constant leaves every doc site green — the S27-6 genus ("claims ride X with zero assertions"). (AUDIT-3 A3-L1.) |
| S28-7 | **LOW** (comment-truth batch) | `src/lib/site.ts:150-152` + `src/lib/schemas.ts:45-50` | site.ts's pageMetadata docblock still describes "the dashboard" inheriting root metadata — no dashboard page exists; `/Dashboard` 404s through the catch-all with the derived title (ADR-006). schemas.ts's loginSchema comment claims "every downstream branch is constant-shape (login → 401 ...)" — valid-credentials-but-unverified answers the 403 VERIFICATION_REQUIRED (firing only after the password verifies, so no enumeration oracle — the comment just overstates). (AUDIT-3 A3-L2 + AUDIT-1 A1-I1.) |
| S28-8 | **INFO→cure** (one-line hardening) | `src/app/api/generate/route.ts:67` | The hand-built 429 twin omits the `Math.max(1, …)` retry-floor the `ERR.RATE_LIMITED` family carries — safe today (the limiter always returns ≥1 when denied) but a limiter refactor could regress the header floor silently. (AUDIT-1 A1-I3.) |
| S28-9 | **LOW→docs** (docs-truth) | `Project_Architecture_Document.md:194` | ADR-006's "verified across 13 unit pins and an e2e assertion" overreaches: the 13 route-title arms verify the title DERIVATION only; the title + true-404 status + noindex ride the e2e unknown-route test (S27-6) and smoke leg 06. (AUDIT-3 A3-L3.) |

**Accepted register (adjudicated this round, with reasons):** the in-app
OTP/reset delivery default (AUDIT-1 A1-M1 — the documented S13-1
posture: the boot warning is the operator's declare-your-posture signal;
flipping the production default is an owner-level decision recorded
here for the ledger); the first-signup admin TOCTOU (A1-L2 — the
session-27 adjudication stands: no admin-gated surface exists, the
seeded demo user makes count ≥ 1); `parseEnvFile`'s unterminated-quote
divergence (A1-L3 — pathological input; the bun-side behavior is
unverified this round and a blind "fix" could introduce a NEW
divergence); the oversized-body 400-not-413 vocabulary (A1-I2 — the
pinned, documented status family); the `FILE:` case-sensitivity note
(A1-I4 — a future boot-env shape arm, recorded; Prisma requires
lowercase anyway); the uncached `getSnapshot` read (A2-I1 — a
primitive-returning snapshot, no correctness risk, negligible cost);
the reference-inherited sub-AA text tones (A2-I2 — the standing
parity-doctrine adjudication); the toast's nested live-region pattern
(A2-I3 — the documented sonner/Radix family posture); Reveal's no-JS
trade-off (A2-I4 — the reference's own framer-motion posture, parity);
the manifest's 192-declaration-serving-512 (A3-I1 — the reference's
exact field-for-field manifest, pinned); the e2e canonical-host regex
permissiveness (A3-I2 — the build-time-inlining compensation, partially
covered by the unit loc-absoluteness pin). The standing accepted
register carries unchanged.

## The cure set (TDD — every pin RED first, mutation battery per the house doctrine)

**Batch 1 — the RED pins first (5 new its):**
- **S28-1**: `tests/page-titles.test.ts` — a NEW it beside the S25-4
  arm: `siteUrl("https://example.com/base")` → the default (the
  path-carrying shape).
- **S28-2**: `tests/docs-counts.test.ts` — a NEW it: parse
  `.env.example`'s `^[A-Z_]+=` assignment keys, assert the set equals
  the six-knob array EXACTLY (both directions — a 7th var or a dropped
  knob both RED). Born GREEN (the file carries exactly six today); the
  mutation battery plants a 7th knob → RED.
- **S28-3**: `tests/api-robustness.test.ts` — the S16-1 describe gains
  the generate arm: the widened object-shape guard
  (`read.value === null || typeof read.value !== "object" ||
  Array.isArray(read.value)`) present ahead of safeParse, answering
  "Invalid request body"; the S16-1 exemption comment updated in the
  same commit (the S28-3 completion).
- **S28-4**: `tests/design-tokens.test.ts` — the dead-token census
  comment-strips each scanned file BEFORE the consumer regex (the
  api-robustness `stripComments` idiom; a mis-strip can only false-RED,
  never silently pass). This arm REDs on `--color-subtle` immediately
  (the only comment-kept-alive token) — the designed RED.
- **S28-5**: `tests/a11y-controls.test.ts` — a NEW it co-pinning
  `minLength={8}` on all four password inputs (the signup pair +
  the reset pair — the S25-3 family form, co-pinned faces documented
  in the comment).
- **S28-6**: `tests/docs-counts.test.ts` — a NEW it: count the
  ladder's `ok NN "` leg markers in `scripts/smoke-test.sh`, assert
  equality with the SMOKE constant, plus the `SMOKE: ${SMOKE}/${SMOKE}
  PASS` echo literal. Born GREEN (15 legs today); the mutation battery
  deletes a leg → RED.

**Batch 2 — the GREEN cures:**
- **S28-1**: `src/lib/site.ts` — the guard gains the pathname arm:
  `parsed.pathname !== "/"` joins the fallback family (one guard, the
  S25-4 doctrine line extended to "no credentials, query, fragment, or
  path"); `src/lib/boot-env.ts`'s S22-19 warning text + comment
  updated to the post-cure truth (the path prefix no longer "flows"
  — the seam falls back to the default until the operator sets the
  bare origin).
- **S28-3/S28-8**: `src/app/api/generate/route.ts` — the null arm
  widened to the object-shape class (contact's exact form, the
  S15-2/S16-1 comment lineage extended); the hand-built 429 gains
  `Math.max(1, limited.retryAfterSec)` with the WHY comment.
- **S28-4**: `src/app/globals.css` — `--color-subtle` retired (zero
  live consumers; the stock slate-400 literal covers the family; the
  toast comment keeps its historical record — the comment-stripped
  census is the proof it cannot keep a token alive).
- **S28-5**: `src/components/layout/reset-password-screen.tsx` —
  `minLength={8}` on both password inputs (mirrors the signup pair).
- **S28-7**: `src/lib/site.ts`'s dashboard bullet reworded (the
  catch-all owns `/Dashboard` — 404 + the derived title; no dashboard
  page exists); `src/lib/schemas.ts`'s loginSchema comment scoped to
  the truth (the 401 shared by the malformed-email and
  unknown-account faces; the unverified 403 fires only after the
  password verifies).

**Batch 3 — the mutation batteries:** every new pin planted-defect
proven (revert the pathname arm → RED; plant a 7th env knob → RED;
remove the widened guard → RED; un-strip one comment mention /
re-plant the dead token → RED; drop one `minLength` → RED; delete one
smoke leg marker → RED).

**Batch 4 — the count re-anchor + docs lockstep:**
- Live count walk after the batches: UNIT 631 → 636 projected (+5
  pins: S28-1, S28-2, S28-3, S28-5, S28-6 — the S28-4 hardening folds
  into the existing dead-token it in place), SUITES 38 unchanged, E2E
  63 unchanged, badge 694 → 699 projected. The reality census is the
  authority — never the plan's arithmetic (the session-27 precedent).
- The PAD §12 rows re-anchored for the files whose line counts changed
  (site.ts, globals.css); the census walked RED-to-GREEN site by site.
- SKILL v1.23.0 → v1.24.0 (frontmatter, Appendix A's session-28 row);
  the session-28 plan's post-execution record; worklog Task 28;
  `docs/session_28.md` replaced with this round's log. README (badge,
  gate line, the session-28 row), AGENTS (counts, the plans map's
  twenty-eighth round), CLAUDE (counts), PAD (§12 rows, ADR-006's
  S28-9 reword, counts) in the same commit.

## Acceptance criteria

1. Every new pin ships RED-first with its mutation battery on record
   (S28-2/S28-6 census arms are born GREEN by design — their
   batteries prove they can fire).
2. Full gate GREEN: lint 0/0 · tsc 0 · unit (the live count) · build ·
   smoke 15/15 · e2e 63/63 (9 specs) · census MATCH.
3. The path-carrying origin falls back to the default (pin + battery);
   the malformed/query/hash/userinfo arms stay green (the existing
   S25-4 pins unchanged).
4. `curl -d '"hello"' /api/generate` answers "Invalid request body"
   (live-verified on the dev server); the empty-idea and over-length
   message arms unchanged (the F11-7 pins stay green).
5. The dead-token census passes with comments stripped; `--color-subtle`
   gone from `@theme`; the design-tokens pin set updated in the same
   commit.
6. Captures taken on the dev server (the cured surfaces — the
   path-fallback boot warning + the generate vocabulary probe), under
   `docs/screenshots/`.
7. Docs lockstep: six documents + worklog + session log + this plan's
   post-execution record, all in the same commit.
8. Conventional Commit to main; SSH-wrapper push (dry-run first, key
   shredded after).

## Post-execution record

Executed as planned, with the mid-round deviations on record:

- **The plan's projection was exact this round: UNIT 631 → 636 (+5
  pins — S28-1, S28-2, S28-3, S28-5, S28-6), the S28-4 census
  hardening folded into the existing dead-token it in place.** The
  reality census confirmed 636/38 on disk before any doc site was
  touched (the session-27 precedent: the live count is the authority).
- **One comment-prose trip, caught by the step-less census the same
  hour**: the S28-1 cure's site.ts comment spelled "string-concat" —
  the raw-text scan reads substRING-concat as a `ring-<word>` utility
  (the documented S17-5 English-fragment genus) and demanded a
  `--color-concat` token. Reworded to "concatenate". The same lesson
  applied proactively to the S28-4 comments: both the globals.css
  retirement note and the toast.tsx S25-9 comment were reworded to
  prose-safe spellings (the raw-text step-less census would read the
  class-shaped spelling of the retired token as a live consumer
  demand — the S25-3 rule, now mechanically enforced by the same
  census that the dead-token arm hardened).
- **Every mutation battery on record**: the S28-1 pathname arm
  reverted → RED; a planted 7th env knob → RED; the S28-3 widened
  guard reverted → RED; the retired token re-planted with only the
  comment "consumer" → RED (the census's own proof of its new
  comment-blindness); one `minLength={8}` dropped → RED; one smoke
  leg marker removed → RED (14 vs 15). All restored → GREEN.
- **Live verification**: the generate vocabulary probe
  (`curl -d '"hello"'`) answered "Invalid request body" on the dev
  server post-cure (the happy-path round-trip unchanged); the
  reset-password token view's two inputs carry `minLength: 8`
  (live-probed through a real minted reset token); the parity walk's
  oklab→sRGB conversion re-derived in-session with the gamma-encoding
  step (the earlier quick check had omitted it — the corrected math
  yields EXACTLY rgb(15,23,42)).

**Final state:** lint 0/0 · tsc 0 · unit **636/636** (38 files; +5
pins) · build · smoke 15/15 · e2e **63/63** (9 specs) · census MATCH ·
badge **699**. Captures 63/64 PIL-verified (the reset-password
token-view inputs + the mobile-menu open clean-walk re-verification);
the generate vocabulary + minLength live-verified. Docs lockstep:
README (the session-28 row, the gate line, the badge 699, the counts) +
AGENTS (counts, the plans map's twenty-eighth round) + CLAUDE (counts) +
PAD (the §12 site.ts 202 → 219 + globals.css 222 → 226 rows, the
test-distribution table, the ADR-006 S28-9 reword, the counts) + SKILL
v1.23.0 → v1.24.0 (frontmatter, §4's token block, Appendix A's
session-28 row, Appendix B both counts + the session-28
re-certification, the pre-ship checklist counts) + worklog Task 28 +
the session log. Pushed to main via the SSH wrapper (dry-run first,
key shredded after).
