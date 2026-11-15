# Session 65 — The Redaction Delimiter-Bypass Cure + The Pin-Vacuity Cure + The Spawn-Error Arm + The Uniform-Lag Ship Arm and the Register Batch (2026-11-15)

The round opened on the shipped tree (`47730cb` = session-64's
`fb2cdf0` + the owner's narration commit carrying `docs/session_65.md`
as the round-65 working narration; this formal log replaces its
content at ship). The core docs re-read and re-verified at the
session-64 ship counts (AGENTS, CLAUDE, README, PAD, SKILL v1.60.0),
then the session-64 set (the formal `docs/session_64.md` log, the
session-64 plan's post-execution record, worklog Task 64), and the
S64 cures verified in source (the last-@ redaction, the census union
read, the e2e mid-line arm, the x/f alias guard, the
DEFAULT_DATABASE_URL mirror pin, the splice modulos). This round is
session 65, the standing instruction on the shipped tree.

## Baseline

Fresh clone; `.env` recreated (`DATABASE_URL="file:../db/custom.db"`,
`db/` at the repo root, a fresh `AUTH_SECRET`); db push + seed +
census MATCH (1 user + 0 contact messages). The ambient-shell
`DATABASE_URL` pollution (an absolute path OUTSIDE the repo — the
S63/S64 hazard) was found live and neutralized with `env -u
DATABASE_URL` on every DB-touching command.

Baseline gate: lint 0/0 · tsc 0 · unit **754/755** (the ONE RED: the
lag invariant — `.env.example` at `docs/session_1..63` with the disk
ledger at 65, lag 2) · build · smoke 16/16 · e2e 70/70 (9 specs) ·
census MATCH. `bun audit`: the same 9 dev-toolchain advisories as
session-55..64 (3H/5M/1L, none on the runtime request path).

## The audit (three parallel lanes + the lead's hand-verification)

Combined profile: **0 Critical / 0 High / 2 Medium / 3 Low / 10 Info**
(AUDIT-1 API/lib seams 0/0/1/1/3 · AUDIT-2 components/pages/effects
0/0/0/0/3 · AUDIT-3 SEO/configs/tests/docs 0/0/1/2/4). The standing
contracts all held (the envelope discipline on all 13 handlers, the
db seam monopoly, the status discipline, the limiter's eight buckets,
the bounded reader at 8/8 body-parsing sites, all seven Tailwind v4
mitigations compiler-verified, the complete mobile-menu mechanic set,
the React 19 laws, the SEO family byte-pinned, every count re-derived
from disk — the cleanest combined profile since the register began,
with exactly two Mediums and both live-verified by the lead).

**S65-1 (AUDIT-1 M-1, Medium — live-probed): the redaction delimiter
bypass.** The S64-1 authority-scoped capture `[^/?#\s"']*` stops at
`/ ? #` whitespace and quotes — a password carrying one of those
BEFORE its `@` left the captured segment `@`-less, and the
`at === -1` arm printed it verbatim: `postgresql://admin:p/ss@host/db`
printed `p/ss`; the tab form printed `pa<TAB>ss` while its own residue
warning named the very control char it was printing. The exact
malformed-value class these arms exist to diagnose is the class that
defeated their redaction.

**S65-2 (AUDIT-3 M-1, Medium — verified; with L-1's record
correction): the provenance straggler.** Round 64's lockstep
re-anchored NINE sites 63→64, not the ten its records claim —
`fb2cdf0` contains no `.env.example` hunk; the ship-time lag-1 window
masked the miss and the owner's narration commit exposed it.

**S65-4 (AUDIT-3 L-2, Low — verified): the login pin's comment
satisfiability.** `page-titles`'s consumption pin read the RAW source
and login's docblock mentions `pageMetadata()` by name — deleting the
export shipped green (the other five consumers carry exactly one
occurrence, the export itself).

**S65-5 (AUDIT-1 L-1, Low — verified by read): the silent spawn
failure.** `prisma-env.ts` never inspected `result.error`; a spawn
failure (ENOENT/EACCES) exited 1 with zero diagnostics.

**The RETRACTION (the round's methodology lesson).** The lead's
interim finding — "the health log's `[h` prefix was eaten" — was a
FALSE POSITIVE: the sandbox's tool-output display layer mangles
`[h…` sequences, and grep, cat -A, AND python-repr renders ALL showed
the truncated form while ordinal-level byte inspection (printing
`ord()` per byte) proved both `src/app/api/health/route.ts` and the
S63-3 pin carry the FULL `[health] db probe failed:` prefix. The
session-64 round's "false alarm" call was correct all along; its
record stands. The lesson is registered: byte-level claims about
`[`-prefixed tokens are verified with ordinal output, never rendered
text — the display layer cannot be trusted to carry bracket-prefixed
bytes faithfully.

## Parity walk #38 — the thirty-eighth consecutive clean walk

Both legs at every documented posture: the hamburger base
byte-identical (`md:hidden p-2 text-slate-300`, NO aria family on the
reference vs our ACTIVE superset — Open/Close-menu relabel,
aria-expanded, `aria-controls="mobile-menu"`); the panel inner
byte-identical (`px-6 py-4 space-y-3`, 16px/24px) with the 12px
rhythm in each side's engine form (the reference's margin-top v3 /
our margin-block-end v4) and the pill radius (9999px / the v4
infinity calc); Escape R-open / L-close-with-focus-return; the
outside-tap both open (censused parity); the route-change
R-unmount / L-hidden-in-DOM; the desktop census 6 visible identical;
the brand gradient byte-identical (the inline sRGB dodge); the
five-route head census identical (bare `/` + `/login` titles, the
`<Page> |` family, the prefixed descriptions, the canonicals);
sitemap 4 URLs + robots identical modulo origin; the generator DEAD
on the reference (error face, no copy button, no post) / LIVE on the
clone (5 hashtags, Copy button, quota 0→1 — the documented superset).
**No Tailwind v4 bug in the mobile menu** — every class on the
toggle/panel/links/pill compiles in the installed 4.3.3 (AUDIT-2's
compiler probe), and the walk verified the mechanics live at 390px.

## The cures (TDD — the pins first, born RED where the defect lives)

- **S65-1a** the delimiter-bypass pin (boot-env.test.ts) born RED —
  the live warning printed `admin:p/ss` verbatim. The first draft's
  clean-value process-env arm proved shape-wrong mid-RED (a clean
  postgres URL fires no print) and was re-ridden on the
  unclosed-quote residue vehicle — the S64-1 pattern.
- **S65-6a** the uniform-lag ship arm (docs-counts.test.ts) born RED
  on the live mixed state: every provenance site must carry the SAME
  bound — the two legitimate states are exactly all-at-diskMax (a
  ship) and all-at-diskMax−1 (a baseline after the owner's
  narration); ANY mixed state REDs at the gate, before the push. The
  round-64 straggler class (ship-green inside the lag-1 window,
  exposed one narration cycle later) is mechanically retired.
- **S65-5a** the spawn-error arm pin (gate-script.test.ts) born RED.
- **S65-4a** the page-titles consumption pin hardened with the house
  stripComments idiom (born GREEN as a census arm; the battery is its
  RED face).
- **S65-1b** the manual-scan redaction cure: mask to the LAST `@` of
  the token run (the whitespace/quote-bounded run after the scheme),
  falling back to the LAST `@` of the whole input (the whole input is
  one env value); over-redacting rather than under-redacting (an
  @-in-path token mangles to `***@tail` — the safe direction; no
  pinned shape covers it). Every pinned S63-2/S64-1 shape
  byte-identical. The replace() form could not express the extended
  tiers — a replacement cannot consume past its match, so the
  delimiter face duplicated the tail; the manual scan has no boundary.
- **S65-5b** the `result.error` arm — prints the spawn error before
  the status exit.
- The health-catch register note (comment-only — AUDIT-1 I-1: no
  reachable error family carries a credential under the sqlite
  provider; a future provider face routes through the redaction seam
  first). The "NINTH site" census comment respell (count-free
  wording). The ten-site provenance re-anchor to `1..65` (S65-2's
  cure, at lockstep, uniform — the S65-6a posture).

## The batteries (all four on record — each plant RED exactly its pin, all restored)

1. The redaction-revert plant (the S64-1b form restored) → REDs
   exactly S65-1a (1 failed / 73 passed).
2. The export-delete plant (login's metadata export deleted) → REDs
   exactly S65-4a — the vacuity the old pin could not catch.
3. The error-arm-removal plant → REDs exactly S65-5a.
4. The mixed-lag plant (one site back to 64) → REDs exactly S65-6a.

## The lockstep

UNIT 755 → **758** (+3 its), SUITES 40 held, E2E 70 held, E2E_SPECS 9
held, SMOKE 16 held, BADGE 825 → **828**. The docs-counts constants;
PAD §11 +2 rows (the noValidate advisory attrs; the reveal no-JS
face) + §8.1's table + carry line; README's badge + the session-65
row (one table-continuity slip caught and fixed by the S43-3 arm
mid-lockstep — the row first landed after the table/footer blank
line) + the gate footer; AGENTS's plans-map sixty-fifth round + the
758; CLAUDE's 758; SKILL v1.60.0 → v1.61.0 (frontmatter, §0.5 range,
Appendix-A session-65 row, Appendix-B re-certification through 65).
The registers: the detectNiche substring over-match (quality-only),
the playwright webServer NEXT_PUBLIC_SITE_URL ambient passthrough
(zero determinism impact), the vitest exclude-defaults footnote, the
login-card signin-branch indentation (normalize-on-next-touch), and
the round-64 nine-vs-ten record correction (carried here — history
files keep their text, the S51-7 catch-up precedent).

## The ship

The full gate green on the final tree; captures 137/138 on the dev
server PIL-verified; the Conventional Commit to main and the push via
the SSH wrapper runbook.

**Gate at the session-65 ship: lint 0/0 · tsc 0 · unit 758/758 (40
files) · build · smoke 16/16 · e2e 70/70 (9 specs) · census MATCH.**
