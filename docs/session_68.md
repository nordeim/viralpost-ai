# Session 68 — The Live Reduced-Motion Subscribe + The Resend Single-In-Flight Gate + The Boot-Gate Site-URL Leg Split + The Comment-Truth Batch and the Register Batch (2026-11-16)

The round opened on a fresh clone (`d62ab1e` = session-67's `1cf881c` +
the owner's narration commits carrying `docs/session_68.md` as the
round-67 working narration; this formal log replaces its content at
ship). The core docs re-read and re-verified at the session-67 ship
counts (AGENTS, CLAUDE, README, PAD, SKILL v1.63.0), then the
session-67 set (the formal `docs/session_67.md` log, the session-67
plan's post-execution record, worklog Task 67), and the S67 cures
verified in source (the keyword-form redaction pass, the four
fetch-toast mount gates, the s65/s66 ladder rungs, the settle teeth +
the `behavior: "instant"` cure).

## Baseline

`.env` re-created from `.env.example` at the contract
(`DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root,
`AUTH_SECRET` set); db:push + db:seed + census MATCH (1 user + 0
contact messages). The ambient-shell `DATABASE_URL` pollution (an
absolute path OUTSIDE the repo — the S63..S67 hazard) found live again
and neutralized with `env -u DATABASE_URL` on every DB-touching
command.

Baseline gate: lint 0/0 · tsc 0 · unit **769/769** (40 files — the
session-67 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs; the one-time `bunx playwright install chromium` re-run — the
sandbox cache carried build 1200, the repo's Playwright 1.64.1 needs
1248) · census MATCH. `bun audit`: the same 9 dev-toolchain advisories
as session-55..67 (3H/5M/1L — minimatch/eslint, deepmerge-ts/prisma,
vite/vitest, source-map-js/postcss — none on the runtime request
path).

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; AUDIT-1 re-verified the
  db-path seam monopoly — `process.env.DATABASE_URL` read ONLY inside
  the seam).
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (AUDIT-3); no drift to fix.
- **Sitemap + SEO**: verified live in walk #41 AND by AUDIT-3's source
  read (the force-static trio, `/Home` never listed, byte-exact body
  pins).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs; AUDIT-2 re-verified all seven documented v4
  mitigations. **No Tailwind v4 bug found.**
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 0 Medium / 5 Low / 10 Info**
(AUDIT-1 API/lib seams 0/0/0/2/3 · AUDIT-2 components/pages/effects
0/0/0/2/5 · AUDIT-3 SEO/configs/tests/docs 0/0/0/1/2). Every
load-bearing finding hand-verified by the lead: A-1-2 and A-2 L-2 by
direct code read at the cited lines, A-2 L-1 by the four mount-time
`matchMedia(...).matches` reads (no `change` listener anywhere in
`src/components/effects/`), A-1-1 by the lane's compiled-artifact probe
plus the warning-text's own "inlined at build time" admission, A3-1
and A3-2 by direct text evidence. The standing contracts all held
(the envelope on 13 handlers, the db seam monopoly, the bounded
reader, the limiter's buckets, the auth/revocation family, the boot
gate arms, all seven Tailwind v4 mitigations, the mobile-menu mechanic
set, the React 19 laws, the SEO family; docs-counts 55/55, PAD §12's
21 rows intact, the ten provenance sites uniformly at `1..67`, unit
769/769 re-run live).

The five Lows: **S68-1** the `keywordsOf` doc-comment's "longest
first" claim (no sort exists or ever did — the comment-truth genus);
**S68-2** the verify view's Resend clickable during a verification
submit (the concurrent resend re-mints the code under the in-flight
comparison's feet — a guaranteed confusing failure plus one burned
resend against the 5/15-min budget); **S68-3** the effects family's
mount-time-only `prefers-reduced-motion` read (a mid-session toggle to
reduce never collapses the animation); **S68-4** the boot gate
validating the wrong face for `NEXT_PUBLIC_SITE_URL` (the runtime env
face, while every served surface consumes the build-time-inlined
face — wrong in both directions where they diverge); **S68-5** the
donor-worklog pointer's 18-round-stale "Task IDs 1..49" claim.

## Parity walk #41 — the forty-first consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`): the hamburger base byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the amber CTA pill;
Escape R-OPEN (verified with the class-anchored panel probe — the
walk's own correction: the reference carries no `id="mobile-menu"`,
that ID is OUR aria superset; the first probes anchored on the ID and
mis-read closed); the outside-tap R-OPEN; the route-change R-UNMOUNT
(via the Pricing link); the desktop census 6 visible at 1440 (burger
hidden); the brand gradient byte-identical
(`linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`);
the five-route head census (bare `/` + `/login` titles, the
`<Page> |` family, the prefixed descriptions, the canonicals);
sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all + the sitemap
pointer; the generator DEAD — no post ever lands, no Copy button, the
button returns to rest state with NO error surface at the 4s/15s/40s
probes (a failure-face drift from session-46's "settles with a
failure toast" re-verification — the load-bearing DEAD posture
unchanged; recorded in the Deviations Ledger row, S68-7b). CLONE leg
(logged in, landed `/` — the documented /Home deviation): the aria
superset ACTIVE (Open/Close-menu relabel, expanded true→false,
`aria-controls="mobile-menu"`); the panel inner byte-identical with
the transparent-over-hero posture; Escape L-CLOSE-WITH-FOCUS-RETURN
(focus observed back on the toggle); the outside-tap BOTH-OPEN; the
route-change L-HIDDEN-IN-DOM (panel in DOM, `display:none`,
expanded=false); the desktop census identical (the mobile panel's
links ride hidden-in-DOM — the documented posture); the gradient
byte-identical; the head census + sitemap/robots identical modulo
origin; the generator LIVE (a real post, the Copy button, the quota
counter 3→2 — the 0→1 used face). **No Tailwind v4 bug in the mobile
menu** — every mechanic live-verified at 390×844 on both legs.
Captures 143/144 on the dev server PIL-verified (1440×6971 landing
full-page; 390×844 mobile menu open, the amber-CTA field present).

## The cures (TDD — the pins first, born RED, batteries on record)

- **S68-2a** the Resend single-in-flight pin (login-views.test.ts, 1
  it) born RED; **S68-2b** the both-flags gate — `disabled={resending
  || pending}` on the button, `if (resending || pending) return;` in
  `onResend`, the label staying keyed on `resending` alone (the
  pending face is the submit's own relabel, never the secondary
  affordance's).
- **S68-3a** the live-subscribe pin (effects-motion.test.ts, 1 it
  owning the four-island family — the S67-2 doctrine) born RED;
  **S68-3b** the one-way live subscribe on every island — reveal
  settles + disconnects on change-to-reduce; floating-icons stops the
  loop and resets every wrapper's transform/opacity to the static
  face; iridescence flips its `reduced` binding (the render loop's own
  `if (!reduced)` re-arm arm stops the chain at the next frame) and
  repaints the S24-6 static seed; particle-text cancels the pending
  raf/timeout chain and hands control to `frame()`'s reduced branch
  (drawPlain + the timeout cadence) from whatever phase the field was
  in. The un-reduce direction stays the documented reload face (each
  file's comment names the boundary). The S47-4/S55-1 cleanup-shape
  pins re-anchored in the same commit (the cures grew the cleanups).
- **S68-4a** the served-face leg-split pins (boot-env.test.ts, 4 its)
  born RED on the three behavior faces; **S68-4b** the leg split —
  `bootEnvCheck(env, options?)` gains an OPTIONAL injected
  `{ servedSiteUrl }` (the seam stays PURE — both faces injected; the
  one-arg calls behave exactly as before, so every prior pin held
  untouched); the unset/loopback warning SUPPRESSES when the served
  face is a healthy non-loopback origin (the false-alarm cure —
  silence is correct: the surfaces are healthy and the runtime face is
  inert); a NEW divergence warning names BOTH values when a
  well-formed runtime face disagrees with the served face (loopback
  spellings included — the S63-1 inert-value genus completed for this
  knob; malformed runtime values stay owned by the F10-11 shape arms,
  exactly one warning per bad posture); `instrumentation.ts` passes
  `siteUrl()` — the build-time-inlined literal in the artifact (the
  compiled-chunk probe), the live env in dev (identical to the record
  face there — no dev behavior change).
- **S68-1b** the `keywordsOf` comment re-spelled to the
  first-occurrence truth + the header's "always join" corrected to
  "the first two join" (comment-truth only, zero behavior change — the
  shipped selection is 67 sessions old and property-pinned).
- **S68-5b** the donor-worklog pointer re-spelled count-free (the
  S65-8 precedent).
- **S68-6b** the cheap-Info batch: the e2e-port donor annotations (the
  N-69g/S68-P4 cites), the nav-config `canonical` BY-DESIGN sentence,
  the login-card spacer's `aria-hidden="true"` (the S60-2/S61-2
  family), the reset hint's `id` + `aria-describedby` association.
- **S68-7b** the Deviations Ledger generator row's re-verification
  clause updated to session-68 (the silent-rest failure face; the DEAD
  posture unchanged).

## The batteries (all on record — each plant REDs exactly its pin, all restored)

1. The resend-gate revert plant (the `|| pending` dropped from both
   arms) → REDs exactly S68-2a + its documented co-pin S67-P5 (the
   S12-2 co-pinned form); restored GREEN.
2. The listener-removal plant (one island's `change` listener
   dropped) → REDs exactly S68-3a; restored GREEN.
3. The legs-dropped plant (`servedSiteUrl` forced undefined) → REDs
   exactly the three behavior S68-4a its; restored GREEN.
4. The normalization-removal plant (raw-string compare) → REDs
   exactly the S68-4a control — the born-green pin's vacuity battery
   (the S65-4 doctrine: a pin that cannot be made to fail is
   vacuous); restored GREEN.
5. The prose cures (S68-1b, S68-5b, S68-6b, S68-7b) — no unit pin can
   fail by construction (the comment-lag genus); the battery is the
   round's own audit finding, recorded as such.

**The round's mid-execution catches** (the designed-lag faces and the
two unplanned pin interactions, both cured in-commit): the S67-P5 pin
(auth-contract) and the S55-1/S47-4 cleanup-shape pins needed
same-commit re-anchors when the cures changed the shapes they pin; the
design-tokens step-less census flagged the word `reduce` — the new
comment compound "change-to-reduce" scanned as a `to-reduce` utility
(the S28-4 prose-safe doctrine: re-spelled, no exemption added); the
docs-counts census's countable-registration contract rejected the
first draft's `it.each` form (rewritten as the one-it loop the plan
specified).

## The lockstep

UNIT 769 → **775** (+6 its: S68-2a ×1, S68-3a ×1, S68-4a ×4 — the
plan projected +5; the fourth S68-4a it is the same-face control,
added for the vacuity battery), SUITES 40 held, E2E 70 held,
E2E_SPECS 9 held, SMOKE 16 held, BADGE 839 → **845**. The ten
provenance sites re-anchored `1..67` → `1..68` (all ten at diskMax,
lag 0, uniform — the S65-6a posture). The docs-counts ladder's s68
rung appended with its +6 breakdown. PAD: §8.1's table + §8.3's carry
line at 775/70/16; §11 +5 register rows (the scryptSync blocking face,
the detectNiche bidirectional substring, the count-per-signup scan,
the nested-live-region watch, the WebKit coverage boundary); §12's
generator/iridescence/particle-text/floating-icons rows re-anchored
to the live line counts. README's badge + the session-68 row + the
gate footer; AGENTS's plans-map sixty-eighth round + the 775;
CLAUDE's 775; SKILL v1.63.0 → v1.64.0 (frontmatter, §0.5 range,
Appendix-A session-68 row, Appendix-B re-certification through 68 +
the gate line's 775). The local untracked `.env`'s provenance note
refreshed to match `.env.example`.

## The ship

The full gate green on the final tree; captures 143/144 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-68 ship: lint 0/0 · tsc 0 · unit 775/775 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
