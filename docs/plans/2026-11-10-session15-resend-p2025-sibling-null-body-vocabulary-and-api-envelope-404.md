# Session 15 — The Resend P2025 Sibling Arm + The Null-Body Vocabulary + The API-Envelope 404 (2026-11-10)

## Context

Session 14 pushed `f6212a1` (the from_url escape closure + the resend/verify
equalizer + the UX-boundary batch); the owner added `a73e941` (the session-14
log). This round re-ran the standing instruction against the merged tree:
docs review → baseline gate → the comprehensive audit → the neo-crm re-review
→ the live reference parity walk → the TDD cures → the gate → captures → push.

**Baseline (the merged tree, verified in place):** the full gate GREEN at the
documented session-14 counts — lint 0/0 · tsc 0 · unit 538/538 (37 files) ·
build · smoke 15/15 · e2e 55/55 (9 specs) · census MATCH (1 user + 0
messages). The Playwright browsers were already provisioned in this sandbox
(the session-14 fresh-sandbox note did not recur).

**The audit** (dispatched wide; every load-bearing finding hand-verified in
source, two live-probed on the dev server): 0 Critical / 0 High / 0 Medium /
3 Low / 6 Informational. The session-14 cures re-verified clean (the
leading-`//` pathname arm + its behavioral and e2e pins, the equalizer burns
on both miss branches, the uniform `verificationCode: null` shape, the
generate wiring pin, the password ceiling, InfoCallout's role, the toast ring,
the `>=` boundary).

**neo-crm re-review:** HEAD `b3d0fbe` — UNCHANGED since session 12's
re-review; the recorded adoption/deferral decisions stand.

**The parity walk (live, both sides):** the reference (login → `/Home` with
the "ViralPost AI" title; the mobile menu at 390×844 — the no-aria hamburger
`md:hidden p-2 text-slate-300`, 5 destinations, auto-close on navigation;
`/Tool` title "Tool | ViralPost AI" + og:title "ViralPost AI" + the plain
OG description + the root canonical — NO drift since session 14) and the
clone's dev server (hydration clean at 390×844; the menu open/Escape WITH the
focus return; navigate → auto-close + the derived title; `from_url=/Tool` →
signs in → `/Tool`; the S14-1 escape regression — the protocol-relative
`from_url` now lands on `/`, NOT evil.com; sitemap/robots/manifest healthy).

**The walk's own catches:** S15-2 and S15-7 live-confirmed on the clone —
`POST /api/contact` with a non-JSON Content-Type answers Zod's dev-facing
`"Invalid input: expected object, received null"`, and an unknown `/api/*`
path answers the HTML 404 body (content-type `text/html`), not the JSON
envelope.

## Findings

| ID | Severity | Location | Finding |
|---|---|---|---|
| S15-1 | **LOW** (sibling doctrine) | `src/app/api/auth/resend/route.ts:92-94` | **The resend route's vanished-row race (P2025) answers the raw 500.** The verify route maps the findUnique→update P2025 race to its 400 branch (S13-5); forgot-password maps it to the no-op (`stored = false`). Resend's identical race (read at :50, `update` at :69) falls into the blanket catch → `ERR.INTERNAL()`. Unreachable via API today (no user-delete surface — the same class S13-5 closed), but the branch contract promises the rate-limited no-op 200. Cure: the P2025 arm returning the no-op shape (forgot-password's semantics), pinned like the S13-5 verify arm. |
| S15-2 | **LOW** (message discipline; live-confirmed) | `src/app/api/contact/route.ts:29-35`; `src/app/api/generate/route.ts:54-73` | **The two route-local parse sites answer non-pinned messages for null/unparseable bodies.** The auth family's `parseBody` answers the pinned `"Invalid request body"` when `readBoundedJson` yields `value: null` (the content-type CSRF gate or unparseable JSON). Contact instead feeds `null` to `contactSchema.safeParse` → Zod's dev-facing `"Invalid input: expected object, received null"` reaches the client (LIVE-CONFIRMED). Generate answers `"Describe your post idea first."` for a malformed body, and a non-string `idea` (e.g. `{"idea": 999}`) answers the over-length message for a TYPE error. Cure: both routes null-check `read.value` ahead of safeParse with the parseBody vocabulary; generate's over-length branch fires only for STRING ideas. |
| S15-3 | **LOW** (dependency hygiene) | `package.json` / `bun.lock` | **10 advisories, ALL dev-toolchain; the direct zod is already patched (4.6.7)** — the vulnerable `zod@4.6.5` is nested under `eslint-config-next › eslint-plugin-react-hooks` (lint-only); the rest ride postcss/vite/eslint/prisma-CLI chains (build/test/CLI). The `prisma` CLI package sits in `dependencies` though only `@prisma/client` is imported at runtime (the standalone artifact ships neither) — that placement is why `bun audit` surfaces `@prisma/config` in the runtime graph. Cure: move `prisma` to `devDependencies` (graph honesty), the targeted eslint-chain update if it lands clean, and the triage recorded here (the periodic duty). |
| S15-4 | INFO (a11y consistency) | `src/components/layout/login-card.tsx:731, 750` | **The signin view's Mail/Lock input icons are the only two in the file without `aria-hidden="true"`** (the reset/signup/verify siblings all carry it — lines 406, 452, 471, 491). Empty lucide svgs are ignored by AT today, but a future title-bearing icon would be announced on the signin view only. Cure: the two attributes + a source pin. |
| S15-5 | INFO (deferred — documented) | `src/app/api/auth/logout/route.ts` | **The logout endpoint has no CSRF defense** — a cross-site page can fire `POST /api/auth/logout` and the `Set-Cookie` clears the victim's session (SameSite=Lax gates cookie SENDING, never cookie CLEARING). Impact is forced logout only — no account takeover. DEFERRED to the PAD known-issues register: a strict Origin check risks breaking self-hosted deployments behind non-standard proxy topologies (Origin ≠ Host), and the family template's §16 checklist does not require it. |
| S15-6 | INFO (deferred — documented) | `eslint.config.mjs:12-45` | **20+ rules off, inherited from the family template** — `react-hooks/exhaustive-deps` has no compensating gate. Dry-run evidence: enabling it surfaces exactly 2 errors, both in `particle-text.tsx` — the deliberate `texts.join("|")` stability idiom (re-run on content change, not array identity), a false positive for the rule's model. DEFERRED with the evidence: re-enabling requires restructuring that idiom first. The tsc-strict build gate + the census tests compensate for the TS-rule family. |
| S15-7 | INFO→cured (API ergonomics; live-confirmed) | routing — no `src/app/api/[...path]/route.ts` | **Unknown `/api/*` paths answer the HTML 404 body** (the root page catch-all wins where no route exists — LIVE-CONFIRMED: `text/html` content-type on `/api/nonexistent-endpoint`). An API client hitting a typo'd endpoint gets HTML instead of the envelope. Cure: the API catch-all route answering the envelope 404 for every method + an e2e leg (the true-404 doctrine extended to the API subtree). |
| S15-8 | INFO→cured (a11y house family) | `src/components/marketing/navbar.tsx:115-123` | **The mobile menu toggle has no house focus-visible ring** — `md:hidden p-2 text-slate-300` (the reference's byte-identical class). The UA default ring still shows (no `outline-none` reset anywhere), so focus IS visible; the S14-6 toast cure set the house family precedent. Cure: the focus-visible family with `ring-slate-300` — the toggle's OWN ink, guaranteed to read on the dark navbar (the house `ring-ring` is `#0f172a`, invisible on slate-950) + a source pin. |
| S15-9 | INFO→cured (test strength) | `tests/e2e/mobile-navigation.spec.ts:55-62` | **The Escape focus-return is source-pinned only** — no e2e asserts `toHaveFocus` after Escape (grep: zero in `tests/`). Cure: the one-line strengthening of the existing Escape leg (no count change). |

## Remediation (TDD where a contract changes)

- **R15-1 (RED→GREEN, S15-1)**: the auth-contract pin first — the resend
  catch maps P2025 to the no-op envelope (the S13-5 verify pin's mirror).
  Then the arm: `Prisma.PrismaClientKnownRequestError` + `P2025` → the
  same `ok({ resent: true, message: verificationResentMessage(),
  verificationCode: null })` the unknown-account branch serves. Mutation
  battery: removing the arm REDs the pin.
- **R15-2 (RED→GREEN, S15-2)**: the api-robustness pins first — (a) both
  route-local sites carry the null-body arm with the parseBody vocabulary;
  (b) generate's over-length message fires only for STRING ideas. Then the
  cures: the null-checks in both routes + the `typeof rawIdea === "string"`
  narrowing. Mutation batteries: each arm's removal REDs exactly its pin.
- **R15-3 (S15-4)**: `aria-hidden="true"` on the two signin icons + the
  a11y-controls pin. Mutation battery: the revert REDs the pin.
- **R15-4 (S15-8)**: the toggle's `focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-slate-300` family + the
  a11y-controls pin (the dark-surface ring choice documented in the pin).
  Mutation battery: stripping the arm REDs the pin.
- **R15-5 (S15-7)**: the e2e leg FIRST (RED — the HTML 404 answers today),
  then `src/app/api/[...path]/route.ts` — GET/POST/PUT/PATCH/DELETE all
  answering `fail("NOT_FOUND", "Unknown API endpoint", 404)`,
  `force-dynamic` for the api family's uniform shape. Specific routes keep
  winning (the manifest order); unknown methods on KNOWN paths keep their
  405s.
- **R15-6 (S15-9)**: the Escape e2e leg gains `await expect(toggle)
  .toBeFocused()` after the close assertion.
- **R15-7 (S15-3)**: `prisma` → `devDependencies` (the runtime import is
  `@prisma/client`; the CLI is a dev/build duty); the targeted
  `eslint-config-next` chain update IF it lands clean (`bun update
  eslint-config-next` + gate re-run); the advisory triage recorded in this
  plan (the periodic duty).
- **R15-8 (docs)**: the S15-5 + S15-6 deferrals into the PAD's known-issues
  register (§11) with the evidence.
- **R15-9 (lockstep)**: the count constants re-anchored AFTER all test
  changes land; the badge; README (status row, testing section, the API
  table's catch-all row); AGENTS (counts, the plans map's fifteenth round);
  CLAUDE; PAD (§8 test distribution, §11 known issues, §12 re-anchor);
  SKILL v1.10.0 → v1.11.0; worklog Task 15; this plan's execution record.
- **R15-10**: captures 37/38 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`,
  hydration awaited), PIL-verified.
- **R15-11**: the full gate on the exact commit tree → `bun audit` (the
  periodic duty) → the Conventional Commit on `main` → the SSH-wrapper
  push (dry-run first).

## Acceptance criteria

1. The full gate green at the final counts; census MATCH.
2. The resend P2025 arm returns the no-op envelope (pinned; the raw 500
   unreachable for the race).
3. Both route-local parse sites answer `"Invalid request body"` for null
   bodies; generate's over-length message fires only for string ideas
   (pinned; the Zod dev-message leak retired).
4. Unknown `/api/*` paths answer the JSON envelope 404 (e2e-proven); known
   paths and their 405/404 semantics unchanged.
5. The signin icons carry `aria-hidden` (pinned); the mobile toggle shows
   the house keyboard focus ring in slate-300 (pinned).
6. The Escape e2e leg asserts the focus return (`toBeFocused`).
7. `prisma` in devDependencies; the advisory triage recorded; the gate
   green on the moved manifest.
8. Docs lockstep at the final counts; SKILL v1.11.0; captures 37/38
   PIL-verified.

## Execution record

- **Baseline**: the full gate green at the documented session-14 counts on
  the merged tree (538/37 files · 55/9 specs · 15 legs · census MATCH).
- **The audit**: 0 Critical / 0 High / 0 Medium / 3 Low / 6 Informational;
  S15-1..S15-4, S15-8, S15-9 hand-verified in source; S15-2 and S15-7
  live-confirmed on the dev server; S15-6 dry-run-probed (2 flags, both the
  deliberate join-key idiom).
- **The parity walk**: the reference live (NO drift) + the clone's dev
  server (the menu family, the from_url round-trip + the escape regression,
  the SEO surfaces).
- (Execution entries appended as each R-item lands.)

## Post-execution record (appended at ship)

- **R15-1 (S15-1)**: the auth-contract pin first (RED), then the P2025
  arm returning the no-op envelope. ONE battery-forced iteration: the
  first pin form (P2025-in-source + noOp≥2 + arm-inside-catch) survived
  a `false &&` sabotage — the condition-form face (the instanceof +
  code-literal regex) added. **Mutation batteries**: the disabled form
  AND the full removal each RED exactly the pin → restored → GREEN.
- **R15-2 (S15-2)**: the api-robustness pins first (RED — exactly 2),
  then the cures (both null-checks + the typeof-string narrowing). ONE
  iteration: the string-ideas pin's regex missed the ternary's line
  break — `\s*` added. **Mutation batteries**: the contact null-arm
  removal and the typeof-gate removal each RED exactly their pins →
  restored → GREEN.
- **R15-3 (S15-4)**: the aria-hidden pair + the a11y-controls pin.
  **Mutation battery**: the revert REDs the pin → restored → GREEN.
- **R15-4 (S15-8)**: the toggle's focus-visible family (slate-300) +
  the a11y-controls pin. **Mutation battery**: stripping the arm REDs
  the pin → restored → GREEN.
- **R15-5 (S15-7)**: the e2e leg first — RED against the pre-cure
  build (the HTML 404 answered), then `src/app/api/[...path]/route.ts`
  (the five-method envelope 404). GREEN at the e2e layer.
- **R15-6 (S15-9)**: the Escape leg's `toBeFocused` assertion (no count
  change — the strengthened leg).
- **R15-7 (S15-3)**: `prisma` → devDependencies; eslint-config-next
  16.4.2 → 16.4.6 (targeted; lint + tsc re-verified); the nested
  zod@4.6.5 under eslint-plugin-react-hooks retired via the
  `resolutions` pin (the lockfile's stale nested entry deduped away;
  the stale physical copy pruned). `bun audit`: 10 → 9 advisories, all
  dev-toolchain — minimatch/eslint (lint-time), deepmerge-ts/prisma-CLI
  (build-time), vite + launch-editor (test-runner). Zero runtime
  request-path exposure.
- **R15-8 (docs)**: the S15-5 + S15-6 deferrals in the PAD §11
  known-issues register, both with their evidence.
- **R15-9 (lockstep)**: unit 543/37 files (+1 the S15-1 sibling pin,
  +2 the S15-2 vocabulary pins, +1 the S15-4 icon pin, +1 the S15-8
  ring pin), e2e 56/9 specs (+1 the api-envelope 404 leg), badge 599 =
  543+56; the reality census re-anchored FIRST; README (badge,
  architecture + testing counts, the API table's catch-all row, the
  session-15 status row, the gate line); AGENTS (counts, the plans
  map's fifteenth round); CLAUDE; PAD (§8.1 distribution, §8.3, §11's
  two deferral rows, §12's inventory — navbar 174→179 + the new
  api-catch-all row); the SKILL v1.10.0 → v1.11.0 (frontmatter, the
  §11 checklist counts, Appendix A's session-15 row, Appendix B
  re-certified through session 15); worklog Task 15; this record.
- **R15-10**: captures 37/38 on the remediated tree (dev server: the
  landing 1280×800 + the OPEN mobile menu 390×844, via `127.0.0.1`,
  hydration awaited), PIL-verified.
- **R15-11**: the full gate on the exact commit tree → the Conventional
  Commit on `main` → the SSH-wrapper push (dry-run first).
- **Deferred (documented in the PAD §11 register)**: S15-5 (the logout
  CSRF nuisance — an Origin check risks breaking self-hosted proxy
  topologies), S15-6 (the eslint off-switches — re-enabling
  exhaustive-deps requires restructuring particle-text's join-key
  idiom first; 2 dry-run flags, both that idiom).
