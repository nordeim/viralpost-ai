# Session-63 Plan — The Launch-Env Inert-Value Divergence Warning + The Credential Redaction + The Health Catch Log + The Quota Rollover Re-Emit and the Register Batch (2026-11-15)

The round opened on the shipped tree (`1ed646e` = session-62's `15b8c93` +
the owner's narration commit carrying `docs/session_63.md` as the round-63
working narration; the formal log replaces its content at ship). The core
docs re-read and re-verified at the session-62 ship counts (AGENTS, CLAUDE,
README, PAD, SKILL v1.58.0 — every lockstep site confirmed on disk), then
the session-62 set (the formal `docs/session_62.md` log, the session-62
plan's post-execution record, worklog Task 62, the owner's narration in
`docs/session_63.md`), and the S62 cures verified in source (the S62-1a
residue-sweep census; the S62-2 `runtimeConsumesFile` split + the `unseen`
rename + the wrapper's `d === process.cwd()` discriminator; the S62-3
photoUrl completion at 15/15; the S62-4 widened splice-guard). This round is
session 63, the standing instruction on the shipped tree.

**Baseline gate GREEN at the documented counts** — lint 0/0 · tsc 0 · unit
744/744, 40 files · build · smoke 16/16 · e2e 70/70, 9 specs · census
MATCH — zero drift from the session-62 ship record. The standing asks
re-verified up front (the `.env` `DATABASE_URL="file:../db/custom.db"`
contract with `db/` at the repo root, census MATCH; `.env.example`
committed and byte-identical to the working `.env` at round open, re-healed
identically after the round's probe incident — see the methodology record
below; the vitest + playwright suites in place and current (744/70 green
this round); the sitemap/robots/manifest/OG family verified live against
the reference in this round's walk #36; `skills/` excluded from every
gate — the tsconfig/eslint/vitest configs + the smoke leg-16 hygiene
mirror). The neo-crm reference repo re-checked per the standing
instruction: unchanged (HEAD `b3d0fbe` — the sixteenth consecutive
no-change check). The web-application skill + the skills catalog
internalized; the tdd and agent-browser doctrine (computed styles as
ground truth, never eyeballs) applied throughout — the walk probes as JS
consumed via `agent-browser eval`.

## The audit (three parallel subagents + the lead's hand-verification)

AUDIT-1 (API/lib seams): 0C/0H/1M/1L/2I · AUDIT-2
(components/pages/effects): 0C/0H/0M/2L/5I · AUDIT-3
(SEO/configs/tests/docs): 0C/0H/0M/0L/4I — combined **0 Critical / 0
High / 1 Medium / 3 Low / 11 Informational**. AUDIT-1 re-verified the
full standing-contract set on its lane (the envelope discipline on all
13 handlers, the db seam monopoly, the status discipline with Retry-After
on every 429, the transient classifier, the limiter, the auth family, the
scripts — all hold; the S58–S62 cures verified in code and by live suite
runs). AUDIT-2 re-verified all seven Tailwind v4 mitigations, the
complete mobile-menu mechanic set, the React 19 pattern law across every
effect in scope, and the WCAG floor. AUDIT-3 re-derived every count from
disk (744/40/70/9/16/814, the session-ledger transient at 63 files with
provenance correctly at `1..62` = lag 1 inside the narration window, 62
plan files, the ten provenance sites, PAD §12 21/21 rows — all MATCH) and
re-ran the unit suite green as a system-level lockstep check.

**The lead's hand-verification before adjudication (the
reproduce-before-trusting doctrine):**

- **AUDIT-1 M1 (the round's headline), verified by a DIRECT LIVE PROBE**
  — a clean, non-default `DATABASE_URL` in a launch-dir `.env` is
  SILENTLY IGNORED under a node-booted standalone server with an empty
  shell env; the file-face warning arm only speaks for MALFORMED values
  (the clean-value early return at boot-env.ts:517-519), and the
  db-path seam's launch-dir recovery is gated on a SET process env
  (`if (envUrl)` at db-path.ts:403) — in the unloaded posture the
  runtime reads only the server CWD's `.env` (removed from the artifact
  by the build's hygiene step) and falls to the DEFAULT. The decisive
  probe (the S62-2 shape, `env -u DATABASE_URL`, schema-only
  `db/alt.db` with 0 users behind a clean absolute value in the repo
  `.env`): `/api/health` answered `{"ok":true,...,"db":"up"}` AND the
  demo-credentials login answered **200 with the seeded user** — the
  engine served the DEFAULT db's user from a file the operator's `.env`
  never named — with **ZERO `[boot]` DATABASE_URL warnings** in the
  log. The operator's belief that `.env` is the source of truth is
  silently wrong, with zero signal — exactly the S47-2 shadow-file
  genus, one face deeper (S47-2: a shadow FILE; this round: an inert
  VALUE). Evidence-backed: Verified.
- **AUDIT-1 L1, verified verbatim in source** — all four process-env
  residue variants (boot-env.ts:261-268) and the file-face prefix
  (:537) interpolate the FULL raw value via `JSON.stringify(...)`;
  db-path passes non-`file:` URLs through verbatim by design (the
  documented PostgreSQL path), and such URLs commonly embed credentials
  — a malformed credentialed URL would print its password to stdout
  (and `bun run start`'s `tee server.log` persists it). The SQLite
  contract carries no credentials, so the shipped configuration is
  unaffected — a narrow but plausible typo shape.
- **AUDIT-1 I1, verified in source** — the health route's catch
  discards the underlying error (`catch { return fail(...) }`) with no
  log line; the 503 envelope is correct, the CAUSE is nowhere.
- **AUDIT-2 L1, verified against the built sheet** — ~20 dead
  single-word utility rules (`.collapse`, `.visible`, `.table`,
  `.container`×5, `.ring`, `.transition`, `.resize`, …) ship in the
  64.5 KB built stylesheet (~1.9-2.4 KB), fed by unavoidable English
  prose ("the ContactMessage table", "grow your audience", "the only
  ring that reads") and the literal `"resize"` DOM event-name string;
  the in-className tokens are all distinct compounds (`resize-none`,
  `ring-2`) — the bare rules are dead. The S35-1 source-scoping cure
  eliminated the root scan; the candidate scanner still reads all
  src/ text. The S28-4 prose-safe doctrine cannot cover dictionary
  words and API strings.
- **AUDIT-2 L2, verified through the render graph** — once
  `limitReached` mounts the paywall, the textarea/submit/result
  unmount, no in-component state change re-renders the card, and the
  store emits only on `incrementLive` — a tab left open across
  midnight shows "You reached the free limit" indefinitely (the
  same-tab date-rollover sibling of the registered cross-tab
  staleness face; the server limiter is unaffected).
- **AUDIT-2 I1/I2/I3, verified in source** — the navbar comment cites
  a "Deviations Ledger" row set that `docs/implementation-plan.md` §6
  does not carry (the mobile-menu supersets live in the session
  records + test pins — a dangling pointer); the S21-2 comment in
  sections.tsx spells `hover:bg-teal-50` verbatim (a latent dead-rule
  feeder the S28-4 doctrine bans — its liveness today is borrowed from
  generator-card's Copy button); the sr-only h1 in particle-text.tsx
  carries both the utility class and a hand-rolled inline duplicate of
  it.
- **AUDIT-3 I3, verified in source** — the docs-counts census counts
  only line-start `/^\s*(?:it|test)\(/gm` registrations; a mid-line
  registration would evade it (the documented S56-4 residual; zero
  live mid-line registrations today — runner 744 == census 744).
- **AUDIT-3 I4** — the designed narration-window transient (63 session
  files, provenance at `1..62`); the re-anchor to `1..63` rides this
  round's lockstep per the S30-4 convention.
- **AUDIT-1 I2 — superseded by the lead's own run**: `bun audit` in
  this environment answers the SAME 9 advisories as the session-55..62
  records (3 high / 5 moderate / 1 low — all dev-toolchain/build-time,
  none on the runtime request path). Register stands, no action.

### The round's probe-methodology record (the deviations the record owes)

Three self-inflicted artifacts, all caught and healed within the round,
recorded here so the next round does not repeat them:

1. **The ambient-shell pollution** — the persistent sandbox shell carried
   a stale `DATABASE_URL=file:/home/z/my-project/db/custom.db`
   (a parent-of-repo absolute — a leftover from the workspace-root
   `.env` family the S56-1 collision truth documents). Every unpinned
   live boot this round first FAILED with `Error code 14` because the
   seam correctly honored the stale absolute as an intentional
   override pointing at a nonexistent parent path. Lesson: probe the
   unloaded posture with `env -u DATABASE_URL` and check `printenv`
   FIRST (the S62-2 single-invocation lesson, one face deeper).
   The ambient is now unset in the shell; the workspace `.env` healed
   to the repo-correct absolute.
2. **The `&`-precedence incident** — the probe commands'
   `cd <repo> && ... && node server.js ... & PID=$!` backgrounding
   binds the WHOLE `&&` chain (the `cd` included), so the foreground
   tail (the "restore" `cp`) ran from the workspace root — writing the
   WORKSPACE `.env` and poisoning the backup chain; the repo `.env`
   was left a one-liner mid-round. Healed: the repo `.env` restored
   byte-identical to `.env.example` (the S61 F-2 posture, re-verified
   by `diff`), census re-run MATCH. Lesson: background a subshell
   `( ... & )` or put the `cd` outside the chain.
3. **The `tr -d ' \n'` artifact** — the walk's head-census output
   compaction stripped ALL spaces from the JSON, briefly reading as a
   reference-side title drift ("Pricing|ViralPostAI"); the raw re-probe
   proved both legs byte-identical on the with-spaces family. Lesson:
   compact output with `jq -c`-style tooling that preserves string
   payloads, never `tr -d ' '`.

## The parity walk (walk #36 — the thirty-sixth consecutive clean walk)

REF leg (live, logged in with the demo credentials — the "Sign in"
email/password submit): login settled at `/Home`. The hamburger base
`md:hidden p-2 text-slate-300` (cursor pointer, block, 8px padding,
rgb(203,213,225), transparent bg — NO aria family, all three attributes
null). The panel inner `px-6 py-4 space-y-3` byte-identical (16px/24px,
block, maxHeight none, transparent background, 12px child spacing);
linkTexts identical (Home, Tool, Pricing, Contact, Upgrade to Pro – $19);
Home teal rgb(45,212,191) 14px/500; the siblings rgb(203,213,225)
14px/500; the pill rgb(15,23,42) 14px/600, 9999px radius. Escape via a
REAL key press leaves the panel open; the outside-tap (a genuine non-nav
H2) leaves it open; route-change at /Pricing UNMOUNTS the panel
(panelInnerCount 0), title "Pricing | ViralPost AI". Desktop census: 6
VISIBLE links IDENTICAL; the brand wordmark gradient byte-identical
(linear-gradient(to right, rgb(45,212,191), rgb(251,191,36)), 18px/700,
background-clip text). The five-route head census identical (the bare
`/` + `/login` titles, the `<Page> | ViralPost AI` family, the 170-char
plain descriptions + the 92/95/95 per-route family, the canonicals, the
single shared ogImage). Sitemap exactly 4 URLs (no `/Home`) + robots
Allow-all + Sitemap line. The generator DEAD (no generation, no copy
button, the button re-enabled, error text present — the documented 402
face).

CLONE leg (the dev server on :3000, quota cleared): the login landed at
`/` (the documented 308 deviation). The panel byte-identical on every
computed face (the pill 3.35544e+07px — v4's infinity calc rendering the
identical capsule). The hamburger base identical + the aria superset
ACTIVE and live-verified (aria-controls mobile-menu, expanded
false→true, the Open/Close-menu relabel). Escape closes OUR menu with
focus returned to the toggle (focusOnToggle true — the documented
superset). The outside-tap leaves it open (parity). Route-change at
/Pricing hides in-DOM (panelInnerCount 1, aria false — the S26-1
design), title "Pricing | ViralPost AI". Desktop census: 6 VISIBLE
links IDENTICAL; the brand gradient byte-identical. The five-route head
census identical modulo origin (raw re-probe — titles, 170/92/95/95
descriptions, canonicals, the single shared og-image.png). Sitemap 4
URLs + robots identical modulo origin. The generator LIVE: hashtags in
the 5-8 family + the Copy button, quota 0→1 (the `viralpost_generations`
counter key `{"date":"Sun Nov 15 2026","count":1}`). **ALL CLONE FACES
MATCH — no clone-side drift, no reference-side drift. Mobile nav
verified working as expected on both sides; all seven Tailwind v4
mitigations verified present and test-pinned (the audit's own lane).**
Captures 133/134 on the dev server PIL-verified (99.9% non-white both,
teal present 1.48%/1.70%).

## The cures (TDD — the pins first, born RED, each with its planted-defect battery)

- **S63-1a — the inert-value pure-seam pin** (tests/boot-env.test.ts, a
  new session-63 describe): the new seam
  `databaseUrlInertValueWarning(env, envFileUrl, runtimeConsumesFile)`
  fires ONLY when (1) the process env is UNSET (a set env owns the
  signal — the one-owner doctrine), (2) the file value is present and
  CLEAN (residue values belong to the residue seam — one face one
  pin), (3) the leg is NOT consumed by the runtime
  (`runtimeConsumesFile: false` — the S62-2 leg discriminator), and
  (4) the value differs from the raw default spelling
  `file:../db/custom.db` (the designed approximation: the default
  spelling lands on the same file the default resolves to — a
  non-repo PWD carrying the default spelling is the documented
  false-negative corner, named in the pin's comment). The message
  names the divergence truth: the `.env` value is never read by this
  server (no sanctioned loader consumed it; the db-path runtime reads
  only the server CWD's `.env`), the engine resolves the default
  instead (the session-63 live probe: the seeded user served from the
  default db while the operator's file carried none), and the fix
  guidance (export DATABASE_URL in the server's environment, or boot
  with `bun run start` which loads this .env). Born RED against the
  pre-cure tree (the seam does not exist). The battery: the
  branch-revert plant (the inert branch disabled — always null) REDs
  exactly the pin; restored GREEN.
- **S63-1b — the wrapper wiring pin** (source-census, the S29-2/S62-2b
  idiom): `databaseUrlFileResidueWarningsForServer`'s loop calls the
  inert-value seam with the same leg discriminator
  (`d === process.cwd()`). The battery: the wiring plant (drop the
  call) REDs exactly this pin while the residue arms hold; restored
  GREEN.
- **S63-1c — the inert-value seam** (src/lib/boot-env.ts): the pure
  seam as pinned, placed beside the residue seam in the same family
  (the S59-1/S62-2 lineage); the wrapper wires it per S63-1b. The
  default-URL reference rides a literal with the provenance comment
  (boot-env must not import db-path — the S59-1b lightweight-trace
  doctrine; the literal mirrors `DEFAULT_DATABASE_URL`).
- **S63-2a — the credential-redaction pin** (tests/boot-env.test.ts):
  the process-env residue arm fed a malformed CREDENTIALED url (the
  unclosed-quote shape on a
  `postgresql://admin:s3cret@db.example.com/prod` value) answers a
  warning containing `***@` and NOT the password; a `file:` residue
  value stays verbatim (no false redaction — no userinfo to hide).
  Born RED (the prints interpolate raw). The battery: the
  redaction-revert plant REDs exactly the pin; restored GREEN.
- **S63-2b — the redaction helper** (src/lib/boot-env.ts): a
  `redactCredentials` pure helper
  (`/<scheme>:\/\/[^@/\s"']+@/ → <scheme>://***@`) applied at the
  interpolation sites — the four process-env variants + the file-face
  prefix. The residue shape (the quote/control-char face) stays
  visible; only the userinfo segment goes. The `file:` SQLite
  contract is untouched (no `@` before the first `/`).
- **S63-3a — the health-catch log pin** (tests/api-robustness.test.ts,
  source-census): the health route's catch logs the cause
  (`console.error("[health] db probe failed:", error)`) before the
  503 — the S36-P5 monitoring doctrine's diagnosis half. The battery:
  the log-line removal plant REDs exactly the pin; restored GREEN.
- **S63-4 — the comment-truth pair** (comment-only, the S35+ batch
  genus, no pins): navbar.tsx:17's "The supersets (Deviations Ledger)"
  citation re-pointed to its real home (the session-11/23/25/31
  records + tests/a11y-controls.test.ts + tests/e2e/
  mobile-navigation.spec.ts — the ledger carries no mobile-menu row);
  sections.tsx:458's verbatim `hover:bg-teal-50` respelled prose-safe
  ("the teal-50 hover tint") per the S28-4 doctrine.
- **S63-5 — the dead single-word utility-rule register** (register
  only, no code change): the genus accepted and WRITTEN — a PAD §12
  row (the known-issues register) recording ~20 dead single-word
  rules at ~1.9-2.4 KB of the 64.5 KB sheet, fed by unavoidable
  English prose + the literal `"resize"` DOM event-name string, zero
  functional impact, the S28-4 doctrine's documented limit (dictionary
  words are not prose-safe-able); the globals.css source-scoping
  comment gains the genus note with the measured figure. The
  docs-counts PAD §12 arm re-anchors 21 → 22 rows in the same commit.
- **S63-6a — the quota re-emit wiring pin** (tests/generation-counter.
  test.ts, source-census): `subscribeUsage`'s wiring adds (1) a
  `storage` listener guarded on the counter key (the cross-tab face —
  another tab's increment re-emits), and (2) `focus` +
  `visibilitychange` re-emitters (the same-tab date-rollover face —
  the AUDIT-2 L2 cure: a tab left open across midnight re-reads the
  day-rolled counter and the paywall unmounts), both firing through a
  change-guard (re-emit only when the live value actually moved — no
  focus-event render spam), browser-guarded, StrictMode-safe (a
  module-level wired flag — the listeners share the store's own
  page-lifetime class, documented in the pin's comment). The battery:
  the listener-removal plant REDs exactly the pin; restored GREEN.
- **S63-6b — the re-emit wiring** (src/lib/generation-counter.ts): the
  listeners wired lazily on first subscribe; `emitUsage` paths update
  the module-level last-seen value the change-guard reads.
- **S63-7 — the sr-only h1 inline-style retirement**
  (src/components/effects/particle-text.tsx): the hand-rolled inline
  duplicate of `sr-only` dropped (the utility class owns the face —
  belt-and-braces duplication removed; no behavior change; the e2e
  a11y battery re-run green).
- **S63-8a — the mid-line registration census arm**
  (tests/docs-counts.test.ts): the S56-4 blind spot closed — the
  comment-stripped source's TOTAL `(?:it|test)\(` occurrences must
  equal the line-start census count (a mid-line registration decouples
  UNIT from reality; today both are 744). If any legitimate mid-line
  string-literal occurrence exists at implementation time, the arm
  documents and exempts it explicitly (the census's own
  exemption-comment doctrine) — verified empirically before the pin
  lands. The battery: a mid-line `it(` plant REDs exactly the arm;
  restored GREEN.
- **S63-9 — the registers** (carried in this plan + the session log):
  the bun-audit triage (the SAME 9 advisories as session-55..62 — all
  dev-toolchain, none on the runtime request path); AUDIT-2 I4 (the
  footer h4 heading-level skip — parity-owned, class-for-class DOM
  extraction); AUDIT-3 I1/I2 (the explicit SEO route handlers + the
  manifest same-src icon — both documented by-design deviations); the
  round's three probe-methodology artifacts (the ambient pollution,
  the `&`-precedence incident, the `tr -d` artifact — recorded above).

## The count re-anchor and the docs lockstep

UNIT 744 → 750 (+6 — the S63-1a inert-value pin, the S63-1b wrapper
wiring pin, the S63-2a redaction pin, the S63-3a health-log pin, the
S63-6a quota re-emit pin, the S63-8a mid-line census arm), SUITES 40
held, E2E 70 held, E2E_SPECS 9 held, SMOKE 16 held, BADGE 814 → 820.
PAD §12 21 → 22 rows (the S63-5 register row — the docs-counts §12 arm
re-anchors in the same commit). The designed count-lag faces will fire
at the lockstep per the doctrine (the UNIT-constant reality census; the
plans-map tail-currency on the 63rd plan file). The ten provenance
sites re-anchor to `1..63` — lag 0 at ship. SKILL v1.58.0 → v1.59.0.
README: the badge 820, the session-63 row on the continuous table, the
gate footer re-spelled to the session-63 ship, the testing-table 750
sites. AGENTS: the plans map's sixty-third round, the 750 in the testing
conventions. CLAUDE: the 750 line. PAD: §8.1's table + the carry line at
750/70/16, §12's new row. The formal session log (docs/session_63.md,
replacing the owner's narration), the plan's post-execution record, and
worklog Task 63 (this round's own set).

## The post-execution record (session-63 ship)

Executed as planned, with the deviations the record owes the truth:

- **The six pins landed first (TDD)** — the three boot-env pins (S63-1a,
  S63-1b, S63-2a) born RED together (3 failed / 68 passed on the first
  boot-env run) plus the api-robustness, generation-counter, and
  docs-counts arms; the two designed count-lag faces fired alongside
  (the UNIT reality census 744 vs disk 750; the plans-map
  tail-currency on the 63rd plan file). The GREEN phase: S63-1c (the
  seam + the wrapper wiring), S63-2b (the redaction at both arms'
  interpolation sites), S63-3b (the health log), S63-4 (the
  comment-truth pair), S63-5 (the PAD §11 register row + the
  globals.css genus note + the §12 live-count re-anchors), S63-6b (the
  store's external-change re-emit), S63-7 (the sr-only
  inline-duplicate retirement), S63-8b (the census arm's
  boundary-guarded scan); the count-lag faces held until the lockstep
  per the doctrine, then cured at the constants + the doc sites (UNIT
  750, the s63 ladder entry, the AGENTS plans-map sixty-third round).
- **Three RED-face repairs mid-round, all before their batteries**: the
  S63-2a pin's first call shape wrapped the env record the wrong way
  (the suite's `env()` builder is the sanctioned form); the S63-6a
  pin's first append missed the fs/path imports (a ReferenceError, not
  the designed assertion); the S63-8a arm's first file-exclusion
  compared the wrong path form (the census returns `tests/`-prefixed
  paths) and false-fired on the census file's own prose — fixed with
  the prefix-aware exemption.
- **All six batteries on record** — the branch-revert plant (1 failed /
  70 passed — exactly the seam pin, the wrapper pin holding), the
  call-drop plant (1 failed / 70 passed — exactly the wiring pin), the
  redaction-revert plant (1 failed / 70 passed), the health-log
  removal plant (1 failed / 25 passed), the listener-removal plant (1
  failed / 10 passed), the mid-line plant (exactly the census arm,
  alongside the two designed count-lag faces). All restored GREEN —
  the full suite 750/750 after the restores.
- **One lockstep tooling incident, repaired in-round**: a sed BRE
  escaping error (`\|` is alternation in BRE, not a literal pipe)
  briefly prefixed 734 PAD lines with a bogus table row; repaired
  mechanically (the prefix stripped from every mangled line, the one
  legitimate `| Unit | 40 | 750 |` row preserved), and the PAD diff
  verified back to exactly the designed change set (13 lines:
  §8.1's Unit row, the §8.3 carry line, §11's register row, §12's
  four live-count rows) before the gate.
- **The probe before the prose**: the S63-1 message's mechanism
  sentences name the inert-value truth because the round's live probe
  observed it (`env -u DATABASE_URL`, the schema-only alt.db, the
  seeded user served from the default db, zero warnings) — the cure is
  evidence-backed, not reasoned. The S63-2 redaction and the S63-6
  re-emit are code-verified by their pins and batteries.
- Counts at ship: UNIT 750 / SUITES 40 / E2E 70 / E2E_SPECS 9 / SMOKE
  16 / BADGE 820 — the ten provenance sites at 1..63 (lag 0); SKILL
  v1.59.0; captures 133/134 on the dev server PIL-verified; the full
  gate re-run green on the final tree; push to main via the SSH
  wrapper runbook.
