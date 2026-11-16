# Session 72 — The Redaction Quote-Residue Keyword-Prefix Cure + The Divergence Slash-Fold Cure + The Loopback Hextet-Grammar Cure + The Toast Geometry Probe + The Ignores Pin and The Register Batch (2026-11-16)

The round opened on the refreshed workspace (`5e8fa6a` = session-71's
`ff0a513` + the owner's two narration commits carrying
`docs/session_72.md` as the round-71 working narration; this formal
log replaces its content at ship). The core docs re-read and
re-verified at the session-71 ship counts (AGENTS, CLAUDE, README,
PAD, SKILL v1.67.0), then the session-71 set (the formal
`docs/session_71.md` log, the session-71 plan's post-execution
record, worklog Task 71, the owner's narration `docs/session_72.md`),
and the S71 cures verified in source (the escape-aware quoted arms +
the keyword-first reorder + the query `[^&]*` widening in both
redaction passes, the `::ffff:7f` loopback grammar, the site.ts
`[\/?#]` post-serialization strip, the toast mount probe, the
manifest-link e2e arm).

## Baseline

`.env` held at the contract (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, `AUTH_SECRET` set); db:push + db:seed +
census MATCH (1 user + 0 contact messages). The ambient-shell
`DATABASE_URL` pollution (an absolute path OUTSIDE the repo — the
S63..S71 hazard) found live again and neutralized with `env -u
DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **794/794** (41 files — the
session-71 ship counts, lag 0) · build · smoke 16/16 · e2e 70/70 (9
specs) · census MATCH. `bun audit`: the same 9 dev-toolchain
advisories as session-55..71 (3H/5M/1L — minimatch/eslint,
deepmerge-ts/prisma, vite/vitest, source-map-js/postcss — none on the
runtime request path). The neo-crm pattern reference re-checked:
UNCHANGED at HEAD `b3d0fbe` (local HEAD === origin/main, re-fetched
this round) — the recorded decisions stand.

## The standing asks (the owner's work-order items, each verified)

- **The `.env` / db-folder contract**: held and live-verified (census
  MATCH; every gate leg green against it; the db-path seam monopoly
  re-verified by both audit lanes — `process.env.DATABASE_URL` read
  ONLY inside the seam). No code change needed — the contract holds.
- **Vitest + Playwright suites**: both configs verified current and
  correctly wired (vitest matches `*.test.ts` only, excludes
  `skills/**`, `@` alias, node env; playwright carries the setup
  project + storageState, the single-source port with the S70-5d
  guard, the pinned `db/e2e.db`, CI=1 fresh-boot; AUDIT-3 re-pinned
  the gate-script order). No drift to fix.
- **Sitemap + SEO**: verified live in walk #45 AND by AUDIT-3's
  source read (the force-static trio, `/Home` never listed, byte-exact
  body pins; the built artifact byte-identical to the sources). The
  walk's sitemap/robots/canonical/description census identical modulo
  origin (4 URLs, weekly 1.0/0.8; heads 170/170/92/95/95).
- **Mobile navigation + Tailwind v4**: the walk's mobile battery clean
  on both legs (every interaction face at its documented posture;
  hamburger byte-identical + the aria superset; Escape
  close-with-focus-return, outside-tap both-open, route-change
  hidden-in-DOM). **No Tailwind v4 bug found** — AUDIT-2's
  independent navbar read concurs (the hover unwrap, `md:hidden`
  boundary, and transition-class axes all sound).
- **`skills/` exclusion**: verified in the tsconfig/eslint/vitest
  excludes and the smoke artifact-hygiene leg.

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 2 Low / 3 Info**
(AUDIT-1 API/lib seams 0/0/1/1/1 · AUDIT-2 components/pages/effects
0/0/1/1/1 · AUDIT-3 SEO/configs/tests/docs 0/0/0/0/1). Every
load-bearing finding hand-verified by the lead through the REAL
exported seams and the REAL dev-server UI before any cure was
designed: the unclosed-quote keyword-first leak (`SuperSecret123` in
clear through `bootEnvCheck`; the `@`-bearing tail; the passfile path
through `databaseUrlFileResidueWarning`), the `#/?` double-warn (2
site-url warnings where the law demands 1), the loopback over-match
(identical public pairs answering the spurious localhost warning),
and the toast mount face (the over-length error toast card
auto-dismissing with the pointer inside its rect and
`matches(":hover")` reading false) — all CONFIRMED LIVE; the audit
lanes' probe inventories ran outside the repo, the tree clean at
every check.

The findings this round cured:

- **S72-1 (AUDIT-1 M-1, live-probed)**: the keyword pass's `(^|\s)`
  prefix class rejects a key that sits directly behind a residue
  QUOTE — the unclosed-quote `.env` malformation class the boot
  residue and file-residue arms exist to print, with the password
  FIRST, printed the whole value VERBATIM
  (`"password=SuperSecret123 host=localhost user=admin` → the boot
  warning carried `SuperSecret123` in clear to stdout + server.log;
  the `@`-bearing variant `"password=S3cr@tPass host=localhost` →
  `***@tPass` — the tail misattributed as host by the mask-to-last-@
  fallback; `"passfile=/etc/ssl/private.key host=h` → the key path
  verbatim through the file-residue arm). The keyword-first spelling
  is a real operator form; both sanctioned loaders keep the leading
  quote (the S61-1 census), so the face is live in every loaded
  posture.
- **S72-2 (AUDIT-1 L-1, live-probed)**: the S71-4b divergence
  predicate's pre-parse fold strips the trailing `[\/?#]+` run —
  which REMOVES a `#`/`?` that OPENS a non-empty fragment/query
  (`https://x.com/#/?` — fragment `/?`): the predicate reads bare,
  the shape arms correctly warn, the normalizer correctly falls back
  — and the divergence arm fires TOO. Two warnings, one root cause —
  the S69-3 "exactly one warning per bad posture" law broken at the
  edge the S71 probes never covered (the empty delimiters and `//`
  pass; `#/?` and `?/?` double-warn).
- **S72-3 (AUDIT-1 I-1, live-probed)**: the S71-5b loopback grammar
  over-matches — `startsWith("::ffff:7f")` accepts short-hextet
  forms (`::ffff:7f0:1` = 7.240.0.1, `::ffff:7f:1` = 0.127.0.1 —
  public addresses; only the FULL 4-hex-digit hextet `7fXX` is the
  mapped 127/8 range) and `/^127\./` matches any `127.`-prefixed DNS
  name (`127.0.0.1.example.com` — a public name): an identical
  runtime=served pair at those origins fires the spurious "would
  advertise a localhost origin" warning (probed: 1 warning where a
  genuinely-public identical pair answers 0).
- **S72-4 (AUDIT-2 M-1, live-probed, the round's mechanism catch)**:
  the S71-6b toast mount probe is INERT in Chromium — the engine
  does not update the `:hover` pseudo-class for an element inserted
  under a stationary pointer until its own re-evaluation
  (`matches(":hover")` read false at the mount call in every observed
  context). The auto-dismiss FACE is timing-dependent: a fast-mount
  harness (insertion ~41ms after the last input) dismissed the card
  6/6 (the synthetic boundary pass never reaching it), while this
  app's slow-mount face (fetch latency ~800ms) was rescued by the
  engine's later re-evaluation ~1.5s in — the rescue is
  engine-scheduled, not contractual, and the fast-mount window (a
  fetch-failure catch arm, a client-side toast) mounts inside it.
  The lead's mid-battery probe falsified the plan's own "the
  pre-cure tree REDs the e2e leg" assumption (the engine rescued the
  planted tree's card too) — the plant's record and the leg's
  comment respelled to the born-green contract posture (the S71-7a
  precedent).
- **S72-5 (AUDIT-2 L-1)**: the comment-truth residue of S72-4 — the
  toast.tsx S71-6 comment block, the S71-6a pin's comment, and the
  S47-7 leg's "hover-pause stays source-pinned" clause all asserted
  the false mechanism or stale postures; all respelled to the
  verified truths (the historical session_71.md log stays as shipped
  — this log records the correction).
- **S72-6 (AUDIT-2 I-1, code-read)**: floating-icons' rAF loop runs
  for the page's lifetime regardless of visibility (no
  IntersectionObserver gate). Parity-neutral (the reference drives
  the same field per-frame); REGISTERED, not chased — PAD §11 gains
  the row, the observer gate is the named lift.
- **S72-7 (AUDIT-3 I-1, rg-verified)**: the S71-9b eslint ignores
  widening (`db/**`, `docs/**`) rode no pin — the S26-6 describe
  pinned only the `skills` exclusion; a revert of the
  generated-artifact family shipped green through the whole gate. The
  S26-6 comment's ignores-array spelling was also stale.

## Parity walk #45 — the forty-fifth consecutive clean walk

Both legs at every documented posture. REF leg (logged in, landed
`/Home`, bare title): the hamburger byte-identical (`md:hidden p-2
text-slate-300`, NO aria family) with pointer cursor; the panel
`md:hidden bg-slate-900/98 border-b border-white/10 overflow-hidden`
with the inner `px-6 py-4 space-y-3`, 4 links + the priced amber CTA
pill ("Upgrade to Pro – $19"), NO panel id, open height 265; Escape
R-OPEN; the outside-tap R-OPEN; the route-change R-UNMOUNT (via the
Pricing link); the desktop census 6 visible at 1440 (burger
display:none, the desktop pill bare "Upgrade to Pro"); the brand text
gradient byte-identical (`linear-gradient(to right, rgb(45, 212, 191),
rgb(251, 191, 36))`); the five-route head census (bare `/` + `/login`
titles, the `<Page> |` family, the canonicals, desc lengths
170/170/92/95/95); sitemap 4 URLs (weekly 1.0/0.8) + robots allow-all
+ the sitemap pointer; the generator DEAD at the 30s probe — the red
`text-xs` failure banner ("Generation failed, so this attempt didn't
use one of your free tries. Please try again."), the session-71
drifted face UNCHANGED. CLONE leg (logged in, landed `/` — the
documented /Home deviation): the aria superset ACTIVE (Open/Close-menu
relabel, expanded true→false, `aria-controls="mobile-menu"` with the
panel `id`); the panel inner byte-identical with the
transparent-over-hero posture, open height 265 (byte-equal); Escape
L-CLOSE-WITH-FOCUS-RETURN (focus observed back on the toggle); the
outside-tap BOTH-OPEN (parity with the reference); the route-change
L-HIDDEN-IN-DOM (panel in DOM, display:none, expanded=false); the
desktop census identical (+ the skip-link superset); the gradient
byte-identical; the head census + sitemap/robots identical modulo
origin; the generator LIVE (a real post — 6 hashtags incl. the
idea-derived #Sustainable #Fashion pair, the Copy button, the quota
counter 3→2). **No Tailwind v4 bug in the mobile menu** — every
mechanic live-verified at 390×844 on both legs. Captures 151/152 on
the dev server PIL-verified (390×844 mobile menu open full-page, the
amber-CTA field pixel-scanned present; 1440×900 landing full-page).

## The cures (TDD — the pins first, born RED, then the batteries)

Phase 1 — four unit pins + one e2e leg born RED exactly as designed
(S72-1a the quote-residue keyword-prefix pin, S72-2a the
divergence slash-fold pin, S72-3a the loopback hextet-grammar pin,
S72-4a the geometry-probe pin [the S71-6a pin REWRITTEN in place,
count-neutral — the N12-2 one-owner law], the S72-4b behavioral
contract leg in generator.spec.ts; the S72-7a ignores-family pin born
GREEN on the existing config — the S71-7a precedent, its teeth proven
by the Phase-3 plant; the S72-3a control's one-arg posture fixed
in-commit to the S71-5a convention — with a healthy served face the
false-alarm cure silences the loopback warning by design).

Phase 2 — the cures:

- **S72-1b** the prefix widening (boot-env.ts, the keyword pass):
  `(^|\s)` → `(^|[\s"'])` — a residue quote is a libpq-meaningful
  delimiter before a keyword exactly as whitespace is; the masked
  `password=***` output carries no quote, so the arms below are
  unchanged. REGISTERED boundary (in the cure comment): a
  backslash-preceded keyword stays unmasked — a double-malformation
  face; adding `\\` to the class is the named lift.
- **S72-2b** the slash-only pre-parse fold (boot-env.ts, the
  divergence predicate): the refined law — slash-fold pre-parse (the
  `//` pathname edge), getter semantics for the empty delimiters (the
  empty `?`/`#` drop from `u.search`/`u.hash`), and the site.ts
  post-serialization `[\/?#]` strip for the comparison; the `#/?` and
  `?/?` faces answer the shape arm's warning ALONE (the S71-4b
  comment respelled to name the refined law and the catch).
- **S72-3b** the hextet grammar (boot-env.ts, isLoopbackOrigin): the
  mapped arm `/^::ffff:7f[0-9a-f]{2}:/` (only a 4-hex-digit first
  mapped hextet `7fXX` is 127/8), the dotted arm
  `/^127(?:\.\d{1,3}){3}$/` (a `127.`-prefixed DNS name is a public
  name), the `::ffff:127.` dotted spelling kept for robustness; the
  S71-5b comment extended with the over-match catch and the
  exact-hextet law.
- **S72-4c** the geometry probe (toast.tsx): the module-level
  `lastMousePos` tracker (null until the first mouse move), ONE
  passive `pointermove` listener armed in the Toaster's mount effect
  with cleanup (page-lifetime pairing), the `pointerType === "mouse"`
  modality gate (touch/pen drags never park a phantom cursor); the
  ToastCard's mount effect reads the rect containment into
  `setPaused(true)` — deterministic and engine-independent. The S71-6
  comment block, the S71-6a pin, the S47-7 leg comment, and the
  S71-4b/S71-5b code comments respelled to the verified truths.
- **S72-7b** the ignores pin (type-gate.test.ts): the S26-6 describe
  gains the generated-artifact + hygiene family `it`
  (`test-results/**`, `playwright-report/**`, `coverage/**`, `db/**`,
  `docs/**`); the describe's stale ignores-array comment respelled to
  the live family.

Phase 3 — the revert-plant battery, every NEW pin proven failable:
the prefix revert plant (`(^|[\s"'])` narrowed back to `(^|\s)`)
REDs exactly S72-1a; the fold revert plant (`/\/+$/` widened back to
`/[\/?#]+$/`) REDs exactly S72-2a; the grammar revert plant (the
exact-hextet + dotted-quad arms narrowed back to the loose prefixes)
REDs exactly S72-3a; the geometry revert plant (the rect-containment
probe replaced back by the `:hover`-only probe, the tree REBUILT)
REDs exactly S72-4a — and the S72-4b e2e leg stayed GREEN on the
planted tree (the plan's one falsified assumption: the engine's
re-evaluation rescued the slow-mount card; the leg respelled to the
born-green contract posture, both-writers-deleted its documented
plant); the ignores revert plant (the `db/**` + `docs/**` entries
dropped) REDs exactly S72-7a. All restored GREEN.

## The lockstep

UNIT 794 → **798** (+4 its: S72-1a/2a/3a/7a ×1 each; the S72-4a
rewrite count-neutral), SUITES 41 held (no new file), E2E 70 → **71**
(+1: the S72-4b contract leg), E2E_SPECS 9 held, SMOKE 16 held,
BADGE 864 → **869**. The ten provenance sites re-anchored `1..71` →
`1..72` (all ten at diskMax, lag 0, uniform — the S65-6a posture);
the local untracked `.env`'s provenance note refreshed to match. The
docs-counts ladder's s72 rung appended with its +4/+1 breakdown. The
plans map gained the seventy-second round (the AGENTS.md line + the
plan file on disk, 1:1). PAD: §8.1's table + §8.3's carry line at
798/71/16; §11 gains the floating-icons rAF register row (S72-6);
§12's site.ts/globals.css rows held (both files untouched). README's
badge + architecture table + quickstart + the session-72 row + the
gate footer; AGENTS's plans-map seventy-second round + the 798/41 +
71; CLAUDE's 798/41 + 71; SKILL v1.67.0 → v1.68.0 (frontmatter,
§0.5 range, Appendix-A session-72 row, Appendix-B re-certification
through 72 + the gate line's 798/71 + the pre-ship checklist's
798/71/16); the formal `docs/session_72.md` (replacing the owner's
narration); the plan's post-execution record; worklog Task 72.

## The ship

The full gate green on the final tree; captures 151/152 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-72 ship: lint 0/0 · tsc 0 · unit 798/798 (41
files) · build · smoke 16/16 · e2e 71/71 (9 specs) · census MATCH.**
