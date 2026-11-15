# Session 70 — The Redaction Spaced-Equals Cure + The Interior-Quote Bare-Run Cure + The Bare-Origin Userinfo Gate + The Toast Mixed-Modality Pause Guard + The Info Batch and the Register Batch (2026-11-16)

The round opened on the refreshed workspace (`6985f32` = session-69's
`f398402` + the owner's narration commit carrying `docs/session_70.md`
as the round-69 working narration; this formal log replaces its
content at ship). The core docs re-read and re-verified at the
session-69 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.65.0),
then the session-69 set (the formal `docs/session_69.md` log, the
session-69 plan's post-execution record, worklog Task 69, the owner's
narration `docs/session_70.md`), and the S69 cures verified in source
(the quoted-tail alternation in both redaction passes, the verify
submit both-flags mirror gate, the bare-origin divergence gate, the
residue arm's trimmed face).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); db:push + db:seed +
census MATCH (1 user + 0 contact messages). The ambient-shell
`DATABASE_URL` pollution (an absolute path OUTSIDE the repo — the
S63..S69 hazard) found live again and neutralized with `env -u
DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **782/782** (40 files — the
session-69 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..69 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on the
runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` since session-22's re-review — the
recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; AUDIT-1 re-verified the
  db-path seam monopoly — `process.env.DATABASE_URL` read ONLY inside
  the seam). No code change needed — the contract already holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (AUDIT-3: vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port, the pinned
  `db/e2e.db`, CI=1 fresh-boot). No drift to fix.
- **Sitemap + SEO**: verified live in walk #43 AND by AUDIT-3's
  source read (the force-static trio, `/Home` never listed, byte-exact
  body pins; the family's suites green in the baseline run).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs; AUDIT-2 re-verified all documented v4 mitigations in
  source AND in the compiled artifact (the source-scoped import, ZERO
  `@media (hover:hover)` queries in the built sheet — all hover rules
  bare `:hover`, literal-hex `@theme`, the button-cursor base rule
  verbatim in the built CSS, no banned gradient pair, no
  `tailwind.config.js`). **No Tailwind v4 bug found.**
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 1 Medium / 3 Low / 8 Info**
(AUDIT-1 API/lib seams 0/0/1/2/2 · AUDIT-2 components/pages/effects
0/0/0/1/3 · AUDIT-3 SEO/configs/tests/docs 0/0/0/0/3). Every
load-bearing finding hand-verified by the lead through the REAL
exported warning builders (`bootEnvCheck` +
`databaseUrlInertValueWarning` with the spaced-equals,
interior-quote, and credentialed-origin faces — 10/10 probe checks
PASS, the scratch script deleted after); AUDIT-2's toast finding by
direct code read at the cited lines (:225 the unguarded
`onMouseLeave`, :175-177 the claim it falsifies); AUDIT-3's
docs-lockstep table independently re-derived (all counts MATCH; the
provenance lag-1 the designed narration-window transient). The
standing contracts all held (the envelope on 13 handlers, the db seam
monopoly, the bounded reader, the limiter's buckets, the
auth/revocation family, the boot gate arms, all Tailwind v4
mitigations, the mobile-menu mechanic set, the React 19 laws, the SEO
family; docs-counts 56/56, PAD §12's rows intact, the ten provenance
sites uniformly at `1..69`, unit 782/782 re-run live in the
baseline).

The findings the round cured: **S70-1** the spaced-equals redaction
miss (the Medium — libpq's optional-whitespace keyword grammar left
`password = topsecret` printing verbatim through every arm);
**S70-2** the interior-quote bare-run leak (`password=ab'cd` printed
`***'cd`); **S70-3** the bare-origin gate's userinfo face (a
credentialed origin double-warned + manufactured a spurious mismatch
against an identical served host); **S70-4** the toast
mixed-modality pause leak (the unconditional `onMouseLeave` unpause
re-armed the timer while focus was still inside — the S20-6 claim
falsified; the mirror face on `onBlur`); **S70-5** the info batch
(the "RAW value" comment respell, the dark cross-family oklab
acceptance note, the eslint generated-artifact ignores, the
registered E2E_PORT NaN-guard lift landed).

## Parity walk #43 — the forty-third consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`, bare title): the hamburger byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the priced amber CTA
pill ("Upgrade to Pro – $19"), NO panel id, open height 265; Escape
R-OPEN; the outside-tap R-OPEN; the route-change R-UNMOUNT (via the
Pricing link); the desktop census 6 visible at 1440 (burger hidden,
the desktop pill bare "Upgrade to Pro"); the brand gradient
byte-identical (`linear-gradient(to right, rgb(45, 212, 191), rgb(251,
191, 36))`); the five-route head census (bare `/` + `/login` titles,
the `<Page> |` family, the canonicals, desc lengths 170/170/92/95/95);
sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all + the sitemap
pointer; the generator DEAD — no post, no Copy button, the button at
rest with NO error surface at the 5s/30s probes (the session-68/69
silent-rest face, re-confirmed). CLONE leg (logged in, landed `/` —
the documented /Home deviation): the aria superset ACTIVE
(Open/Close-menu relabel, expanded true→false,
`aria-controls="mobile-menu"` with the panel `id`); the panel inner
byte-identical with the transparent-over-hero posture (the
reference's `bg-slate-900/98` is a dead class in its own build —
correctly not shipped), open height 265 (byte-equal); Escape
L-CLOSE-WITH-FOCUS-RETURN (focus observed back on the toggle); the
outside-tap BOTH-OPEN (parity with the reference); the route-change
L-HIDDEN-IN-DOM (panel in DOM, `display:none`, expanded=false); the
desktop census identical; the gradient byte-identical; the head
census + sitemap/robots identical modulo origin; the generator LIVE
(a real post — 7 hashtags incl. the idea-derived pair — the Copy
button, the quota counter 3→2). **No Tailwind v4 bug in the mobile
menu** — every mechanic live-verified at 390×844 on both legs.
Captures 147/148 on the dev server PIL-verified (1440×6871 landing
full-page; 390×844 mobile menu open, the amber-CTA field present —
pixel-scanned).

## The cures (TDD — the pins first, born RED, batteries on record)

- **S70-1a** the spaced-equals pin (boot-env.test.ts, a new S70
  describe, 1 it: the keyword-form spaced password closed and
  unclosed, the spaced QUOTED form, the residue-arm vehicle, the
  query-param spaced form, and the tight-form controls) born RED;
  **S70-1b** the `\s*=\s*` widening in BOTH passes — libpq's
  optional-whitespace grammar; the bounded over-redaction documented
  at the site (an empty spaced password masks the following token;
  the S65-1 safe direction).
- **S70-2a** the interior-quote pin (1 it: the single-quote and
  double-quote faces through two arms, the leading-container and
  quote-free controls) born RED; **S70-2b** the bare-run quote drop
  in BOTH passes (`[^&\s]*` / `[^\s]*`) — a quote only opens a
  container when it LEADS the value (the alternation's first two arms
  own that case); every pinned S63-2/S64-1/S65-1/S66-1/S67-1/S69-1
  shape byte-identical under the widening.
- **S70-3a** the userinfo pin (1 it: the credentialed origin against
  a healthy served face answers EXACTLY ONE warning — the shape arm
  owns it; the identical-host spurious-mismatch face too) born RED;
  **S70-3b** the `u.username === "" && u.password === ""` conjuncts
  in `runtimeIsBareOrigin` — a credentialed origin is not a
  well-formed bare origin; "exactly one warning per bad posture" now
  mechanically true for the userinfo face.
- **S70-4a** the toast mixed-modality pin (toast-anatomy.test.ts, 1
  new it) born RED + the two S20-6 seam pins RE-ANCHORED to the
  guarded spellings (the designed co-pin coupling, documented in both
  pins — the S69-2a precedent); **S70-4b** the guards —
  `onMouseLeave` checks `rootRef.current?.contains(
  document.activeElement)`, `onBlur` checks
  `rootRef.current?.matches(":hover")` — pause = focus inside OR
  pointer over, mechanically; the S20-6 claim comment re-spelled with
  the cure note; the sticky touch-hover residual accepted at the site
  (the safe direction).
- **S70-5d** the e2e-port guard pins (a NEW file
  tests/e2e-port.test.ts, 2 its: the malformed faces throw naming the
  knob — NaN/range/float/empty/padded/garbage; the healthy faces
  return verbatim — set/trimmed/boundary/default) born RED;
  **S70-5b** the guard itself (the canonical integer 1..65535 check
  at the single source, `String(n) === raw` rejecting zero-padded
  spellings, the throw naming the knob AND the received value — the
  config fails LOUDLY at parse time instead of timing out at boot);
  the cheap-Info cures: the file-face "RAW value" comment respell
  (the un-redacted, trimmed face — the S69-4 world), the
  design-tokens S21-5 dark cross-family oklab acceptance sentence,
  the eslint ignores' generated-artifact dirs (test-results/,
  playwright-report/, coverage/ — the type-gate skills pin is
  regex-anchored, stays green).

## The batteries (all on record — each plant REDs exactly its pin, all restored)

1. The spaced-equals revert plant (the `\s*=\s*` narrowed back to the
   tight `=` in both passes) → REDs exactly S70-1a; restored GREEN.
   (The plant's first draft dropped the key group's closing paren —
   an invalid regex that failed at MODULE level, not test level; the
   corrected plant isolates the cure. The birth-defect caught
   in-round, the S69-7a precedent.)
2. The bare-run revert plant (the quote chars restored to the
   exclusion sets) → REDs exactly S70-2a; restored GREEN.
3. The userinfo-gate revert plant (the username/password conjuncts
   dropped) → REDs exactly S70-3a; restored GREEN.
4. The toast-guard revert plant (the unguarded spellings restored) →
   REDs exactly S70-4a + the two re-anchored S20-6 co-pins (the
   designed coupling); restored GREEN.
5. The e2e-port guard revert plant (the raw passthrough restored) →
   REDs exactly both S70-5d its (the throw it + the healthy it's trim
   face — the designed coupling: the trim behavior is part of the
   cure); restored GREEN.

## The lockstep

UNIT 782 → **788** (+6 its: S70-1a ×1, S70-2a ×1, S70-3a ×1, S70-4a
×1, S70-5d ×2), SUITES 40 → **41** (the new tests/e2e-port.test.ts),
E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 852 → **858**.
The ten provenance sites re-anchored `1..69` → `1..70` (all ten at
diskMax, lag 0, uniform — the S65-6a posture); the local untracked
`.env`'s provenance note refreshed to match. The docs-counts ladder's
s70 rung appended with its +6/+1 breakdown. The plans map gained the
seventieth round (the AGENTS.md line + the plan file on disk, 1:1).
PAD: §8.1's table + §8.3's carry line at 788/41/70/16; §11's E2E_PORT
register row re-anchored to the CURED posture's residual strictness
face (the zero-padded throw — the loud-throw doctrine); §12 needed no
re-anchor (no touched file rides the inventory). README's badge +
the session-70 row + the gate footer; AGENTS's plans-map seventieth
round + the 788/41; CLAUDE's 788/41; SKILL v1.65.0 → v1.66.0
(frontmatter, §0.5 range, Appendix-A session-70 row, Appendix-B
re-certification through 70 + the gate line's 788/41).

## The ship

The full gate green on the final tree; captures 147/148 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-70 ship: lint 0/0 · tsc 0 · unit 788/788 (41
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
