import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";
import { describe, expect, it } from "vitest";

import {
  LOGGED_OUT_SURFACES as A11Y_LOGGED_OUT,
  SURFACES as A11Y_SURFACES,
  WIDTHS as A11Y_WIDTHS,
} from "./e2e/a11y-matrix";

// The docs-counts gate (session-9, F9-13 — the neo-crm session-102/S102-P1
// pattern adopted for this repo). The badge-drift genus has recurred THREE
// times here (F8-8 twice: 450→455; F9-6 once: 455→457) because the count
// lockstep was prose discipline — prose drifts. These pins put every
// LIVE-TENSE count site under the unit gate: a stale count anywhere now
// fails `bun run test`.
//
// Scope discipline (the neo-crm history-record doctrine): the pins assert
// the LIVE-TENSE sites only. The SKILL's Appendix A round-history rows,
// the worklog's per-session records, and the session plans keep their
// historical numbers BY DESIGN — records of what was true then, not living
// count sites — so the negatives below use the scoped retired-badge forms,
// never a bare whole-file number ban.
//
// The count ladder (re-anchored in the same commit whenever the suite
// grows): s8 409/29 files → s9 442/31 files (+4 the F9-1 boot-env pins,
// +2 the F9-9 role pins, +2 the F9-7 reset-funnel pins, +15 the F9-5
// property suite, +10 this suite). s10: 463/32 files (+2 the F10-17
// dev-origins pins, +5 the F10-1 palette-completion + census pins, +2 the
// F10-11 siteUrl fallback pins, +4 the F10-11 boot-env shape pins, +1 the
// F10-13 hashtag-window pin, +4 the F10-3 NOT_FOUND_LAYOUT pins, +3 the
// F10-2 count-site pins below) and the e2e 48 → 49 (+1 the F10-10
// history-nav close pin). s11: 488/34 files (+2 the F11-18 hygiene-shape
// db-path fixtures, +5 the design-tokens censuses/retirements, +4 the
// verification seam suite, +4 the funnel/double-submit source pins, +1
// the over-length message pin, +1 the navbar a11y pin, +1 the signup
// P2002 pin, +5 the gate-script pins, +2 the doctrine/inventory censuses
// below) and the e2e 49 → 50 (+1 the full-funnel e2e). s12: 507/36 files
// (+7 the otp seam suite, +3 the effects-motion pins, +2 the login-views
// UX-boundary pins, +2 the verification invalid-copy pins −1 the F12-14
// dedup, +1 the stepped-semantic census arm, +5 the reality +
// semantic-prose censuses below) and the e2e 50 → 52 (+2 the
// reset-funnel e2e — F12-2, the funnel's first behavioral coverage),
// the specs 8 → 9. s13: 528/37 files (Session-52, S52-8, AUDIT-3 L1:
// the header said 526 — the mid-iteration stale CENSUS number the
// note below itself describes; the session-13 ship record reads
// "final arithmetic: UNIT 528, badge 582" — 507+21=528, and s14's
// 538 only closes from 528) (+6 the S13-1 boot-env delivery-
// polarity pins, +3 the S13-2/S13-5 auth-contract pins, +2 the S13-3/
// S13-7 effects-motion pins, +8 the from-url seam suite — S13-4, the
// resolver's first behavioral coverage, +1 the S13-10 forms-guard census
// arm below) and the e2e 52 → 54 (+2 the from_url round-trip legs —
// S13-4's wiring proof). ONE post-lockstep iteration: the OTP-log pins
// were first written inside a for-of (one source block, two runner
// tests — census 526 vs runner 527, caught at ship time); unrolled to
// explicit its + the loop-guard arm (its own +1 rides this ladder:
// +6 boot-env, +3 auth-contract, +2 effects-motion, +8 from-url,
// +2 the forms-guard + loop-arm censuses). s14: 538/37 files (+3 the
// S14-1 from-url escape pins, +3 the S14-2 equalizer pins, +1 the
// S14-3 wiring pin, +1 the S14-4 schemas pin, +1 the S14-5 login-views
// re-anchor, +1 the S14-6 toast pin, +1 the S14-7 effects-motion pin;
// Session-52, S52-8: the enumeration sums +11 but the ship arithmetic
// is +10 — 528→538 — the S14-5 "+1" is the over-count, a RE-ANCHOR
// updates an existing pin in place; the ship count is the authority)
// and the e2e 55 (+1 the S14-1 escape leg). s15: 543/37 files (+1 the
// S15-1 resend P2025 pin, +2 the S15-2 null-body vocabulary pins, +1
// the S15-4 signin-icon pin, +1 the S15-8 hamburger focus-ring pin) and
// the e2e 56 (+1 the S15-7 api-envelope 404 leg; the S15-9 Escape
// focus assertion strengthens an existing leg — no count change).
// s16: 548/37 files (+1 the S16-1 parse-body non-object pin, +3 the
// S16-1 schema field-type pins, +1 the S16-1 contact object-guard
// source pin) and the e2e 56 unchanged (the S16-2 bare-/api assertions
// extend the existing S15-7 leg in place — its purpose is exactly this
// doctrine).
// s17: 550/37 files (+1 the S17-5 bounded-reader media-type pin, +1
// the S17-6 timer-hygiene source pin) and the e2e 56 unchanged.
// s19: 561/37 files (+11 the session-19 pins) and the e2e 57 (+1 the
// description-family leg). s20: 571/37 files (+2 the docs-counts pins —
// the Appendix-B ledger pin S20-1 + the PT-negative S20-13, +1 the
// resetToken @unique pin, +1 the smoke GATE_PID-init pin, +1 the hero
// server-component pin, +2 the effects-motion pins — the init reduced
// skip S20-5 + the iridescence context-lost pair S20-12 (the loseContext
// negative rides the same describe), +1 the toast focus-pause pin, +1
// the generator bank-cap pin; Session-52, S52-8: the enumeration
// names nine and sums +9 but the session-20 ship record reads +10
// ("UNIT 561 → 571 (+10 pins)") — the unnamed tenth rides the
// record's own cure family; the ship count is the authority) and
// the e2e 57 unchanged (the api-
// robustness key pin re-anchored in place — no count change).
// s21: 586/37 (+15 the session-21 pins — Session-52, S52-8: the
// header said +13; the session-21 ship record reads "+15 unit pins"
// and 571→586=+15) and the e2e 57 → 58 (Session-53, S53-5, AUDIT-3
// L1: the +1 step this ladder never narrated — session_21.md:123
// records "E2E 57 → 58"; s22's pre-state 58 is reconstructible from
// the ladder alone now). s22: 599/37 (+13 the
// session-22 pins) and the e2e 58 → 63 (the a11y matrix's logged-out
// family + the icon leg). s23: 606/38 (+7 — the seo-surfaces suite's
// manifest/sitemap pins, the skip-link tabIndex pin, the toast
// useSyncExternalStore pin, the INTERNAL-status-discipline pin, the
// focus-visible superset pin; +1 FILE — tests/seo-surfaces.test.ts) and
// the e2e 63 unchanged (the /Home 308 assertion extends its test in
// place — the S18-2 precedent; the a11y register's stats-band entry is
// data, not a test).
// s24: 613/38 (+8 the session-24 pins — the Appendix-B unit-count arm,
// the contact status-announcement pin, the Copy-ring family pin, the
// toast cached-snapshot pin, the iridescence seed pin, the landing
// order co-update, the seo-surfaces loc/robots/og-dims trio; −1 the
// page-titles ROUTES face retired to seo-surfaces) and the e2e 63
// unchanged (the census-depth conversion — recursive helpers, no
// count change; the S18-2 in-place precedent again).
// s25: 620/38 (+14 the session-25 pins — the footer Product-column
// parity pin, the generator status-announcement pin, the auth-ring AA
// pin, the paywall-focus pin, the menu-click focus-return pin, the
// boundary role=alert pair, the toast glyph pin, the toast store-init
// pin, the siteUrl non-bare-origin pin, the boot-env query-carrying
// pin, the OG_IMAGE one-declaration pin, the ContactSection dedup pin,
// the client-crypto boundary pin; −7 the retired faces — the auth.test
// password-hashing describe (−4, S25-5) and the http-headers
// content-type trio (−3, S25-12)) and the e2e 63 unchanged (the
// og:url/twitter:url arms fold into the existing seo test in place —
// the S18-2 precedent).
// s26: 629/38 (+9 the session-26 pins — the panel height-cap parity
// pin (S26-1), the bar scrolled-key parity pin (S26-3), the generator
// busy-announcement pin (S26-2), the FOUR config-mechanics pins
// (S26-6: the .mts include, the tsconfig skills exclude, the eslint
// skills ignore, the vitest skills exclude), the one-shot-script
// URL-seam pin (S26-7), the :memory: passthrough pin (S26-9); the
// S26-4 roster→census conversion and the S26-5 twitter arms fold into
// existing tests in place — no count change) and the e2e 63
// unchanged.
// s27: 631/38 (+2 the session-27 pins — the core-submit focus-ring pin
// (S27-1, both buttons co-pinned — the S25-3 family form) and the
// launch-shape :memory: passthrough pin (S27-2); the S27-4
// negative-arm re-anchor, the S27-5 frozen literal, and the S27-7
// census hardening fold into existing tests in place — no count
// change) and the e2e 63 unchanged (the S27-6 noindex arm folds into
// the existing unknown-route test in place — the S25-17 precedent).
// s28: 636/38 (+5 the session-28 pins — the siteUrl path-fallback pin
// (S28-1), the .env.example knob-set census (S28-2), the generate
// object-shape vocabulary pin (S28-3), the minLength family pin
// (S28-5), and the smoke-leg disk census (S28-6); the S28-4
// comment-blind dead-token census hardening folds into the existing
// dead-token it in place) and the e2e 63 unchanged.
// s29: 641/38 (+5 the session-29 pins — the logout session-gate (S29-1),
// the shared shape-guard (S29-2), the generator-card parse mirror
// (S29-3), the db operator-script wiring census (S29-6), and the icon
// IHDR pins (S29-7); the S29-4 comment-truth arm rides the existing
// loginSchema it in place) and the e2e 63 unchanged (the S29-5 head-DOM
// superset folds into the existing unknown-route e2e in place — the
// S25-17 precedent). Written at session-51, S51-7 (AUDIT-3 L3): the
// comment-lag genus — the s29 ship grew the suite +5 and never wrote
// this entry, breaking the ladder's arithmetic chain (the s30 entry's
// "+3" closes 636→644 only through this entry; the s49 catch-up's
// "contiguous" claim held for s49 itself, never for the range).
// s30: 644/38 (+3 the session-30 pins — the db-path empty-string pair
// (S30-1) and the sections dead-import census (S30-2)) and the e2e 63
// unchanged.
// s31: 648/38 (+4 the session-31 pins — the db-path whitespace pair
// (S31-1), the history-close focus-return pin (S31-2), the generalized
// dead-import census (S31-6); the S25-16 focus-count arm re-anchored
// 2 → 3 in place — the family-census face of the S31-2 cure) and the
// e2e 63 → 65 (+2 the session-31 superset legs — the authed /login
// render (S31-7b) and the reset-screen API-rejected banner (S31-7c);
// the og:image dims arms fold into the existing seo test in place —
// the S18-2 precedent).
// s32: 649/38 (+2 the session-32 pins — the db-path launch-arm trim pair
// (S32-1); the S32-8 vacuous env-restore it() converted to afterEach
// −1 in the same commit) and the e2e 65 unchanged (the S32-6 history-
// close focus arm and the S32-7 head-level icon arms fold into existing
// tests in place — the S18-2 precedent). SMOKE 15 → 16 (the S32-3
// live-429 leg; the S32-2 leg-08/leg-12 strengthening is in-place).
// s33: 655/38 (+6 the session-33 pins — the Windows-absolute trio (S33-2:
// the drive-letter resolve pair + the launch-arm leg), the composed
// :memory: dev-shape pin (S33-4), the signup sr-only h1 source pin
// (S33-5), and the dead-token comment census (S33-1)) and the e2e 65
// unchanged (no e2e legs this round). SMOKE 16 unchanged (the S33-6
// trap extension is in-place).
// s34: 660/38 (+5 the session-34 pins — the swap-view sr-only h1 trio
// (S34-6), the provenance-range census pair (S34-5: the ledger
// contiguity + the lag invariant); the S34-3 census widening (the
// fifth banned token) folds into the existing dead-token it in place,
// and the S34-2 e2e read-back extends the existing contact test in
// place — the S18-2 precedent) and the e2e 65 unchanged. SMOKE 16
// unchanged (the S34-7 leg-16 extension is in-place).
// s35: 662/38 (+2 the session-35 pins — the Tailwind source-scoping pin
// (S35-1, design-tokens) and the one-shot teardown idiom pin (S35-3,
// db-census); the N-53a guard's drift-exit assertion re-anchored in
// place to the exitCode form; the S35-5 hygiene pin and the S35-7
// census widening are in-place — +0 tests) and the e2e 65 unchanged.
// SMOKE 16 unchanged (the S35-6 header re-anchor is comment-only).
// s36: 665/39 (+3 the session-36 pins — the base-layer button-cursor
// pin (S36-1, design-tokens), the VALIDATION envelope-code pin (S36-6a,
// auth-reset), and the cn() seam spec (S36-6b, the NEW utils.test.ts);
// the S36-3 ordering arm folds into the existing S35-3 it in place, and
// the S36-4 smoke-test.sh scan joins SITE_FILES in place — +0 tests)
// and the e2e 65 unchanged. SMOKE 16 unchanged.
// s37: 671/39 (+6 the session-37 pins — the teardown inner-catch arm
// (S37-1, db-census), the transient-classifier behavioral spec + the
// six-route adoption pin (S37-2a/b, api-robustness), the force-static
// SEO pin (S37-4, seo-surfaces), the GL-release arm (S37-6d,
// effects-motion), and the verification-server pass-through pin
// (S37-6e, password-seam); the S35-3 awaited-disconnect regex and the
// F9-7 read-window assertion re-anchor in place — +0 tests) and the
// e2e 65 unchanged. SMOKE 16 unchanged.
// s38: 672/39 (+1 the session-38 pin — the requireSession seam
// adoption arm (S38-1a, api-robustness); the S37-4 force-static pin
// comment-strips in place (S38-7f) and the stripComments helper joins
// seo-surfaces — +0 tests) and the e2e 65 unchanged. SMOKE 16
// unchanged.
// s39: 675/40 (+3 the session-39 pins — the typed-envelope census
// (S39-5a, the NEW client-envelope.test.ts — the 40th suite) and the
// two boot-gate case-variant arms (S39-13a, boot-env); the S38-1a
// slice-bound hardening (S39-11) and the dead-fallback retirement
// (S39-12) are in-place — +0 tests; the landing-page footer pin
// re-pins in place (S39-9) — +0 tests) and the e2e 65 unchanged.
// SMOKE 16 unchanged.
// s40: 681/40 (+6 the session-40 pins — the three boot-gate six-knob
// case-variant arms (S40-1a) and the NEO_ mixed-tail mapping arm
// (S40-2a) in boot-env; the PAD §4.1 schema-field census (S40-11a)
// in THIS suite; the generator dash-run guard pin (S40-13a) in
// generator; the login-views signup pin re-pins in place (S40-6) —
// +0 tests) and the e2e 65 unchanged. SMOKE 16 unchanged.
// s41: 683/40 (+2 the session-41 pins — the boot-gate exact-prefix
// mixed-tail VIRALPOST_ arm (S41-4a, boot-env) and the stepped
// dead-literal census (S41-5a, design-tokens); the S41-3 arm
// restructure is in-place — +0 tests) and the e2e 65 unchanged.
// SMOKE 16 unchanged.
// s42: 686/40 (+3 the session-42 pins — the boot-gate localhost
// false-alarm cure pin (S42-6a, boot-env), the toast call-site census
// (S42-7a, toast-anatomy), and the README closing-footer lockstep pin
// (S42-9a, docs-counts)) and the e2e 65 unchanged. SMOKE 16 unchanged.
// s43: 692/40 (+6 the session-43 pins — the boot-gate trailing-dot
// loopback pin (S43-1a, boot-env), the db-path query/fragment-tail pin
// (S43-6a, db-path), and the four docs-counts arms: the README
// table-integrity arm (S43-3a), the DEPLOYMENT API-route count census
// (S43-4a), the SKILL Appendix-B route-title-pin count census
// (S43-4b), and the footer session-label lockstep pin (S43-5a — the
// label tie shipped as its OWN pin, not an in-place edit of S42-9a:
// the unit count and the session label are two contracts, two owners,
// the N12-2 one-owner doctrine)) and the e2e 65 unchanged. SMOKE 16
// unchanged.
// s44: 696/40 (+4 the session-44 pins — the db-path launch-arm tail
// pin (S44-1b) and the emptied-path guard pin (S44-2a); the S44-1a
// re-spell of S43-6a is IN PLACE (+0 — its query arms reversed on the
// engine-probe evidence, its fragment arms keep their teeth); the two
// docs-counts arms: the three-site smoke-leg prose census (S44-4a)
// and the eslint off-list count census (S44-5a)) and the e2e 65
// unchanged. SMOKE 16 unchanged.
// s45: 701/40 (+3 the db-path cwdFallbackUrl seam pins — S45-1: the
// CWD last-resort arm's dirname-join/query/neither-exists faces, the
// arm previously unpinnable through resolveDatabaseUrl (the module
// anchor always wins); +2 the docs-counts arms: the runtime-dependency
// surface census (S45-6a) and the model-LIST census (S45-7a)) and the
// e2e 65 unchanged (the S45-8 HSTS fold is IN PLACE inside the
// existing headers test, +0; the S45-5a PAD §12 smoke-leg site joins
// the S44-4a arm IN PLACE, +0). SMOKE 16 unchanged.
// s46: 703/40 (+1 the api-robustness force-dynamic route census — S46-1:
// the API route family's dynamic posture, previously unpinned (the
// S37-4 arm owns the SEO family's force-static over a disjoint file
// set); +1 the db-path wiring pin — S46-6: resolveDatabaseUrl's
// consumption of the cwdFallbackUrl seam, source-pinned (the S29-2
// idiom — the seam's logic pins cannot reach the wiring face in the
// unit environment)) and the e2e 65 → 67 (+2 the mobile-navigation
// censused-parity pins — S46-5: the same-route Logo face and the
// outside-tap face, both walk-verified live on both sides). SMOKE 16
// unchanged.
// s47: 711/40 (+3 boot-env — the shadowing-env-file seam's behavior
// pair + the instrumentation wiring source pin, S47-2; +1 db-path —
// the anchor-order source pin, S47-3; +1 effects-motion — the
// reveal settle source pin, S47-4; +1 landing-page — the hero
// portrait CLS pin, S47-5; +2 docs-counts — the generator-hang
// stale-prose census pair, S47-9) and the e2e 67 → 70 (+2 landing —
// the reveal-settle computed-opacity leg + the skip-link keyboard
// leg, S47-4b/S47-6; +1 generator — the toast auto-dismiss leg,
// S47-7). SMOKE 16 unchanged. (The plan's draft said +7 unit / 710 /
// 780 — an arithmetic slip the census's own BADGE = UNIT + E2E guard
// caught at the constants walk: the S47-9 census is a PAIR. 711+70 =
// 781.)
// s48: 718/40 (+7 — the census's own disk-walk corrected the plan's
// draft +6/717: the toast dep-array pin shipped as its OWN it, the
// plan had counted it in-place; the badge-drift guard caught the
// slip, the sessions-46/47 genus a third consecutive round): +2
// docs-counts — the stripComments one-idiom census pair, S48-1; +1
// docs-counts — the Appendix-B header bound census, S48-8; +2
// boot-env — the shadow-env cascade mirror pair, S48-2 (co-pinned on
// the shared candidate, documented in the describe); +1
// landing-page — the hero-portrait IHDR pin, S48-5; +1
// toast-anatomy — the pause re-arm dep-array pin, S48-4) and the e2e
// 70 unchanged (the S48-6 wrapper anchor is in-place on the existing
// leg). SMOKE 16 unchanged.
// s49: 720/40 (+2 — the S49-3 strip-chain SWEEP replaced the S48-1
// carriers arm (its own it re-titled, the enumeration retired) +1;
// the S49-4 plans-map tail-currency census arm +1; the S49-2
// copied-reset pin extended the landing-page S17-6 family it IN
// PLACE and the S49-8 resend face extended the S22-6 family it IN
// PLACE — +0; this ladder entry itself was MISSED at the s49 ship
// and is written at session-50, contiguous — the comment-lag genus,
// named) and the e2e 70 unchanged. SMOKE 16 unchanged.
// s50: 724/40 (+4 — the S50-1 launch-dir shadow-union pin (boot-env,
// behavioral: real temp dirs + chdir + PWD); the S50-2
// envprod-gitignore arm (docs-counts); the S50-6 excludes↔smoke
// mirror-set arm (docs-counts, the config-side tripwire); the S50-11
// contact Sending… face (a11y-controls, the pending family's sixth
// member); the S50-4 copy-epoch guard, the S50-5 src-sweep closure,
// the S50-7 redundant-arm cure, the S50-9 duplicates face, and the
// S50-12 raw-bound message all extend existing its IN PLACE) and the
// e2e 70 unchanged (the S50-10 proxy-hops pin is the playwright
// config's env edit — doctrine closure only, no count change).
// SMOKE 16 unchanged.
// s51..s54: unit 724/40 held (every cure extends an existing it in
// place — no growth, the ladder's own convention; s54's own entry
// says so). s55: 725/40 (+1 — the S55-1 float-field motion-arm pin
// (effects-motion, the AUDIT-2 F-1 coverage gap: floating-icons.tsx
// was the fourth effects file whose motion arms carried no pin)) and
// the e2e 70 unchanged. SMOKE 16 unchanged.
// s56: 725/40 held (the comment-truth round — every cure is a
// docblock/doc/comment note (the S55-3 precedent); no new it, no
// behavior change) and the e2e 70 unchanged. SMOKE 16 unchanged.
// s57: 727/40 (+2 — the S57-1a pins (the parseEnvFile unclosed-quote
// divergence fixtures + the resolveDatabaseUrl spanned-value junk-tail
// face; the S56-3 docblock's falsified "re-anchors correctly" clause
// made executable; battery on record: the quote-strip plant REDs the
// fixtures pin, the newline-truncate plant REDs the resolve pin)) and
// the e2e 70 unchanged. SMOKE 16 unchanged.
// s58: 730/40 (+3 — the S58-1 pins (the boot-gate DATABASE_URL
// unclosed-quote residue warning: the SPAN face (bun's census: an
// embedded newline, both quote chars), the LEADING-QUOTE face
// (@next/env's census: the quote kept, both chars, with every
// documented clean shape silent), and the dev-mode face (the F10-11
// doctrine — a mode-gate plant REDs exactly it; the leading-quote
// co-pin documented in the pin's comment)) and the e2e 70 unchanged.
// SMOKE 16 unchanged.

// ---- THE COUNT CONSTANTS (re-anchor here + every doc site below) ---------

/** Vitest unit checks (tests/*.test.ts — the exact `bun run test` total).
 *  Session-12 (F12-1): the constants are pinned to the LIVE SUITES ON
 *  DISK by the reality census below — a test added without re-anchoring
 *  here fails `bun run test` before any doc site is consulted. */
const UNIT = 730;
/** Vitest suite files. */
const SUITES = 40;
/** Playwright e2e checks (incl. the setup project's 1). */
const E2E = 70;
/** Playwright e2e spec files. */
const E2E_SPECS = 9;
/** Smoke ladder legs. */
const SMOKE = 16;
/** The README badge total (unit + e2e). */
const BADGE = UNIT + E2E;

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// Session-45 (S45-9): the house idiom for textual pins (the S38-7f
// form, the seo-surfaces spelling) — comments stripped before the
// assertion so a commented-out entry cannot satisfy (or inflate) a
// disk-derived count.
// Session-48 (S48-1): the hardened form — line pass first, block
// opener anchored (the S47-10 idiom; the one-idiom doctrine, the
// family's only shape).
function stripComments(src: string): string {
  return src
    .replace(/\/\/[^\n]*/g, "")
    .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
}

// Session-23 (S23-10): RECURSIVE — the runner's include is
// tests/**/*.test.ts, and a flat scan left a nested suite EXECUTED but
// INVISIBLE to every census arm (the planted-defect proof: the fixture
// ran green in the runner while the census's on-disk count never saw
// it — the badge-drift genus one directory level deeper). Mirrors the
// src arm's own recursive scan; the returned paths carry their subpath
// so every `tests/${f}` read stays valid.
function unitTestFiles(): string[] {
  return readdirSync(join(root, "tests"), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith(".test.ts"))
    .sort();
}

// Session-24 (S24-2): the e2e sibling of unitTestFiles — Playwright's
// testDir discovery is RECURSIVE, so a spec at tests/e2e/<subdir>/
// executes in the runner while a flat readdirSync cannot see it (the
// planted-defect proof: the fixture sat green through the flat census).
// The uncured half of S23-10 — the unit arm went recursive in session
// 23; these three arms convert the same way. Returned paths carry
// their subpath so every `tests/e2e/${f}` read stays valid.
function e2eSpecFiles(): string[] {
  return readdirSync(join(root, "tests", "e2e"), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith(".spec.ts"))
    .sort();
}

/** The e2e surface the forms-guard scans: specs + the setup project. */
function e2eCountedFiles(): string[] {
  return [...e2eSpecFiles(), "auth.setup.ts"].sort();
}

// Session-50 (S50-5, AUDIT-3 L1): the src-side unit surface, ONE HOME.
// The vitest config admits src/**/*.test.ts (none exist today); the
// census carried an inline scan of the same directory while the
// strip-chain arms (the S48-1 ban, the S13-10 forms-guard + loop-arm,
// the S49-3 sweep) iterated tests/ only — a src suite would execute in
// the runner while escaping every textual arm. The scan extracts to
// this helper; the union helper below feeds every census and sweep.
function srcUnitTestFiles(): string[] {
  return existsSync(join(root, "src"))
    ? readdirSync(join(root, "src"), { recursive: true })
        .filter((f) => String(f).endsWith(".test.ts"))
        .map(String)
        .sort()
    : [];
}

/** The FULL unit surface every census and sweep arm iterates:
 *  tests/ ∪ src/, each entry its repo-relative path (tests/…, src/…)
 *  so every read(f) stays valid — a src suite joins every census and
 *  every strip-chain arm the day it appears (S50-5). */
function allUnitTestFiles(): string[] {
  return [
    ...unitTestFiles().map((f) => `tests/${f}`),
    ...srcUnitTestFiles().map((f) => `src/${f}`),
  ].sort();
}

describe("docs-counts: the live-tense count sites (the badge-drift genus, retired)", () => {
  it("the README badge carries the live arithmetic (unit + e2e)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`tests-${BADGE}%20checks`);
  });

  it("the README architecture + testing sections carry the live suite counts", () => {
    const readme = read("README.md");
    expect(readme).toContain(`| Unit tests | Vitest | 5.0 | ${SUITES} files / ${UNIT} tests, node env, pure seams |`);
    expect(readme).toContain(`| E2E | Playwright | 1.64 | ${E2E_SPECS} specs / ${E2E} tests against the production build |`);
    expect(readme).toContain(`bun run test            # Vitest unit suite (${SUITES} files / ${UNIT} tests)`);
    expect(readme).toContain(`bun run test:e2e        # Playwright e2e (${E2E_SPECS} specs / ${E2E} tests) — needs bun run build first`);
  });

  it("the README badge's retired forms never return (the F8-8/F9-6 ladder)", () => {
    const readme = read("README.md");
    expect(readme).not.toContain("tests-450%20checks");
    expect(readme).not.toContain("tests-455%20checks");
    expect(readme).not.toContain("tests-457%20checks");
  });

  // Session-42 (S42-9): the closing gate footer — the ONE live-tense
  // gate-state site the census never pinned. It shipped one round stale
  // at session-41 ("unit 681/681" while the row four lines above read
  // 683 and the gate ran 683) because no pin owned it; the badge-drift
  // genus, one document region deeper. The footer's unit count is now
  // mechanically tied to the census UNIT constant.
// Session-48 (S48-11, AUDIT-3 I4): the footer census's count literals
// now interpolate from the constants (the constant-interpolation pin
// form, the neo-crm lesson adopted at session 47) — a count change no
// longer needs a manual e2e-literal re-pin in these regexes (the
// session-47 67/67→70/70 manual re-pin was the last).
const GATE_FOOTER_RE = new RegExp(
  `Gate at the session-(\\d+) ship: lint 0\\/0 · tsc 0 · unit (\\d+)\\/\\d+ · build ·\\nsmoke ${SMOKE}\\/${SMOKE} · e2e ${E2E}\\/${E2E}\\.`,
  "g",
);

  it("session-42 (S42-9): the README closing footer carries the live unit count (the one unpinned gate-state site, retired)", () => {
    const readme = read("README.md");
    // exec, not match: a /g regex through String.match returns bare
    // strings (no groups); exec returns the captures. lastIndex reset —
    // the shared /g source is stateful.
    GATE_FOOTER_RE.lastIndex = 0;
    const m = GATE_FOOTER_RE.exec(readme);
    expect(m, "the README closing gate footer exists (the 'Gate at the session-N ship' line)").not.toBeNull();
    expect(Number(m![2]), "the footer's unit count matches the census UNIT constant").toBe(UNIT);
  });

  // Session-43 (S43-5): the footer's session LABEL is now tied to the
  // SKILL §0.5 range bound — both sites update in the same commit at
  // ship, and a stale label ("session-42" after the session-43 ship)
  // is mechanically impossible. The S42-9a arm above keeps owning the
  // unit count; this arm owns the label (and the last-match anchor
  // closes the multi-footer shadow the first-match form carried).
  it("session-43 (S43-5): the footer's session label matches the SKILL §0.5 range bound (the stale-label genus)", () => {
    const readme = read("README.md");
    const skill = read("viralpost-ai_SKILL.md");
    GATE_FOOTER_RE.lastIndex = 0; // a fresh consumption of the shared /g source
    const footers = [...readme.matchAll(GATE_FOOTER_RE)];
    expect(footers.length, "exactly one full-shape gate footer (the S43-3a shape owns the general form)").toBe(1);
    const m = footers[footers.length - 1]!;
    const bound = skill.match(/session_1\.\.(\d+)/);
    expect(bound, "the SKILL §0.5 range claim exists (docs/session_1..N)").not.toBeNull();
    expect(
      Number(m[1]),
      "the footer's session label updates in lockstep with the SKILL §0.5 bound",
    ).toBe(Number(bound![1]));
  });

  // Session-43 (S43-3): the Project status table must render as ONE
  // table — the S17-2 defect class (interior blank lines breaking GFM
  // rendering, sessions 13-16 as prose) re-accumulated over sessions
  // 23-42 (25 interior blanks + six interleaved legacy gate footers;
  // sessions 23-42 rendered as header-less prose on GitHub). The
  // reflow retired the fragmentation; this arm keeps it retired: every
  // line from the | Phase header row through the LAST | Session row
  // must be a table row, and the whole file carries exactly ONE gate
  // footer line.
  it("session-43 (S43-3): the README Project status table is ONE continuous table (the S17-2 genus, re-cured + pinned)", () => {
    const readme = read("README.md");
    const start = readme.indexOf("## Project status");
    const end = readme.indexOf("## License");
    expect(start, "the Project status section exists").toBeGreaterThan(0);
    expect(end, "the License section follows").toBeGreaterThan(start);
    const lines = readme.slice(start, end).split("\n");
    const headerRow = lines.findIndex((l) => l.startsWith("| Phase"));
    let lastSessionRow = -1;
    lines.forEach((l, i) => {
      if (l.startsWith("| Session")) lastSessionRow = i;
    });
    expect(headerRow, "the table header row exists").toBeGreaterThan(0);
    expect(lastSessionRow, "at least one session row exists").toBeGreaterThan(headerRow);
    for (let i = headerRow; i <= lastSessionRow; i++) {
      expect(
        lines[i]!.startsWith("|"),
        `every line inside the table region must be a table row — line ${i} reads "${lines[i]!.slice(0, 60)}"`,
      ).toBe(true);
    }
    const footers = readme.match(/^Gate at the session-/gm) ?? [];
    expect(footers.length, "exactly one gate footer line (the closing footer)").toBe(1);
  });

  // Session-43 (S43-4a): DEPLOYMENT.md's API-route count is a
  // live-tense claim with drift precedent (session-18 re-anchored it
  // from a stale 11) that no census arm owned — the S42-9 genus, one
  // document deeper. The arm derives the count from the disk
  // (recursive route.ts walk under src/app/api) and asserts the
  // phrase derives from it; a 14th route file drifts the doc claim
  // through a green gate no longer.
  it("session-43 (S43-4a): DEPLOYMENT.md's API-route-file count derives from the disk", () => {
    const apiDir = join(root, "src", "app", "api");
    const routeFiles: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, entry.name);
        if (entry.isDirectory()) walk(p);
        else if (entry.isFile() && entry.name === "route.ts") routeFiles.push(p);
      }
    };
    walk(apiDir);
    expect(routeFiles.length, "src/app/api route.ts files on disk").toBeGreaterThanOrEqual(11);
    const deployment = read(join("docs", "DEPLOYMENT.md"));
    expect(deployment).toContain(`the ${routeFiles.length} API route files`);
    // The verb/catch-all arithmetic rides the same disk truth: the two
    // JSON-envelope catch-alls ([...path] + the bare /api) are the only
    // multi-method files, so verb handlers = total − 2.
    expect(deployment).toContain(`(${routeFiles.length - 2} verb`);
  });

  // Session-43 (S43-4b): SKILL Appendix B's "The title derivation: N
  // unit pins" — the other unpinned live-tense count site. The arm
  // counts route-title.test.ts's it( arms and asserts the Appendix-B
  // phrase derives from the live suite.
  it("session-43 (S43-4b): SKILL Appendix B's route-title pin count derives from the live suite", () => {
    const routeTitle = read(join("tests", "route-title.test.ts"));
    const pins = routeTitle.match(/^[ \t]*it\(/gm) ?? [];
    expect(pins.length, "route-title.test.ts it() arms on disk").toBeGreaterThanOrEqual(13);
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`The title derivation: ${pins.length} unit pins`);
  });

  // Session-44 (S44-4): the hand-maintained smoke-leg PROSE sites
  // (README's quickstart line, CLAUDE's command table + testing
  // section) join the disk family — the S28-6 census pins the ladder's
  // own ok-NN markers, but these prose spellings could drift
  // through a green gate on a 17th leg (the S42-9/S43-4 genus, three
  // sites deeper). Session-45 (S45-5): the FOURTH prose site — PAD
  // §12's smoke-test.sh row ("The 16-leg artifact ladder") — joins the
  // arm (the D1 find: pinned only for its line count, never for the
  // leg-count spelling).
  it("session-44 (S44-4) + session-45 (S45-5): the four prose smoke-leg sites derive from the constant (which the S28-6 disk census pins)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`./scripts/smoke-test.sh # ${SMOKE}-leg curl ladder`);
    const claude = read("CLAUDE.md");
    expect(claude).toContain(`| \`./scripts/smoke-test.sh\` | ${SMOKE}-leg curl ladder |`);
    expect(claude).toContain(`**Smoke (bash)**: ${SMOKE} legs`);
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`The ${SMOKE}-leg artifact ladder`);
  });

  // Session-44 (S44-5): the eslint off-list rule count — live-true
  // (exactly N `: "off"` entries) and carried by CLAUDE's anti-patterns
  // note + PAD §10.3, but owned by no arm (the same drift genus on the
  // config axis: a planted 28th off-switch ships green while both docs
  // say 27).
  it("session-44 (S44-5): the off-list rule count derives from eslint.config.mjs on disk", () => {
    // Session-45 (S45-9): comments stripped before the match (the
    // S38-7f idiom, the seo-surfaces form) — a future explanatory
    // comment carrying the `: "off"` literal would otherwise inflate
    // the count and false-RED the arm.
    const config = stripComments(read("eslint.config.mjs"));
    const offs = config.match(/:\s*"off"/g) ?? [];
    expect(offs.length, "off-list entries on disk (the floor guards the extraction itself)").toBeGreaterThanOrEqual(20);
    const claude = read("CLAUDE.md");
    expect(claude).toContain(`${offs.length} correctness-tier rules`);
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`${offs.length} rules (`);
  });

  // Session-45 (S45-6): the runtime-dependency count — live-true (the
  // dependency-diet sentence's EIGHT) and carried by PAD §1.2 + SKILL
  // §2, but owned by no arm (the S44-5 genus on the dependency axis: a
  // 9th dependency ships green while both docs say EIGHT). The
  // backticked names in the PAD sentence must set-equal
  // package.json's dependencies — both directions (the S28-2 exact-set
  // form) — and the word form derives through the one-home map.
  it("session-45 (S45-6): the runtime-dependency surface derives from package.json on disk", () => {
    const pkg = JSON.parse(read("package.json")) as { dependencies?: Record<string, string> };
    const deps = Object.keys(pkg.dependencies ?? {}).sort();
    expect(deps.length, "runtime deps on disk (the floor guards the extraction itself)").toBeGreaterThanOrEqual(8);
    const pad = read("Project_Architecture_Document.md");
    const start = pad.indexOf("runtime dependency surface");
    expect(start, "PAD's dependency-diet sentence must exist").toBeGreaterThanOrEqual(0);
    // The slice ends before the devDependency clause (its backticked
    // `prisma` is not a runtime dep).
    const sentence = pad.slice(start, pad.indexOf("plus the", start));
    const listed = [...sentence.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
    expect(listed.sort(), "the PAD sentence's backticked names set-equal package.json's runtime deps (both directions)").toEqual(deps);
    const DEP_WORDS: Record<number, string> = { 8: "EIGHT" };
    const word = DEP_WORDS[deps.length];
    expect(word, `a ${deps.length}-dependency surface is new — map the count to its word form in this arm and re-anchor both doc sites`).toBeDefined();
    // The sentence wraps across PAD's line width — normalize before
    // the phrase assertion (the neo-crm s167 whitespace lesson).
    expect(sentence.replace(/\s+/g, " ")).toContain(`exactly ${word} packages`);
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`— ${word} packages`);
  });

  // Session-45 (S45-7): the model LIST — the S40-11 schema census
  // iterates a hardcoded ["User", "ContactMessage"], so a third model,
  // a rename, or a missing PAD §4.1 block was invisible to it, and the
  // "Two models" prose (CLAUDE + PAD §4.2) had no owner. This arm
  // derives the list from schema.prisma on disk; the S40-11 arm keeps
  // the FIELDS face (the documented co-pin, the N12-2 form: a removed
  // PAD §4.1 block trips both).
  it("session-45 (S45-7): the model LIST derives from prisma/schema.prisma on disk (the S40-11 arm owns the fields)", () => {
    const schema = read("prisma/schema.prisma");
    const models = [...schema.matchAll(/^model (\w+) \{/gm)].map((m) => m[1]);
    expect(models.length, "models on disk (the floor guards the extraction itself)").toBeGreaterThanOrEqual(2);
    const pad = read("Project_Architecture_Document.md");
    const pad41 = pad.slice(pad.indexOf("### 4.1 Database Schema"), pad.indexOf("### 4.2"));
    expect(pad41.length, "PAD §4.1 must exist (the slice found it)").toBeGreaterThan(0);
    const claude = read("CLAUDE.md");
    for (const model of models) {
      expect(pad41, `PAD §4.1 must carry the ${model} entity block — add it in the same commit as any schema change`).toContain(`${model} {`);
      expect(claude, `CLAUDE's models sentence must carry \`${model}\``).toContain(`\`${model}\``);
    }
    const MODEL_WORDS: Record<number, string> = { 2: "Two" };
    const word = MODEL_WORDS[models.length];
    expect(word, `a ${models.length}-model schema is new — map the count to its word form in this arm and re-anchor both doc sites`).toBeDefined();
    expect(claude).toContain(`${word} models:`);
    expect(pad).toContain(`${word} models by design`);
  });

  it("AGENTS carries the live unit + e2e + smoke counts", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain(`(${SUITES} files, ${UNIT} tests)`);
    expect(agents).toContain(`${E2E_SPECS} specs / ${E2E} tests in`);
    expect(agents).toContain("`./scripts/smoke-test.sh` (" + SMOKE + " legs)");
  });

  it("CLAUDE carries the live unit + e2e counts (the agent contract)", () => {
    const claude = read("CLAUDE.md");
    expect(claude).toContain(`${SUITES} files / ${UNIT} tests`);
    expect(claude).toContain(`${E2E_SPECS} specs / ${E2E} tests`);
  });

  it("the PAD's test-distribution table + coverage doctrine carry the live counts", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`| Unit | ${SUITES} | ${UNIT} |`);
    expect(pad).toContain(`| E2E | ${E2E_SPECS} specs | ${E2E} |`);
    expect(pad).toContain(`| Smoke | 1 script | ${SMOKE} legs |`);
    expect(pad).toContain(`carry ${UNIT}/${E2E}/${SMOKE} and change together`);
  });

  it("the SKILL frontmatter carries the live gate state", () => {
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`unit ${UNIT}/${UNIT} (${SUITES} files)`);
    expect(skill).toContain(`e2e ${E2E}/${E2E} (${E2E_SPECS} specs)`);
    expect(skill).toContain(`smoke ${SMOKE}/${SMOKE}`);
  });

  // Session-20 (S20-1): the session-19 commit re-anchored the unit
  // count inside Appendix B's ledger paragraph but missed the e2e count
  // in the SAME paragraph — the frontmatter pin above stayed satisfied
  // while the ledger contradicted its own document (56 vs the live 57).
  // The verification ledger is a LIVE-TENSE count site: scoped pin, plus
  // the retired-form negative (the README retired-badge ladder pattern).
  // Session-24 (S24-1): the S20-1 genus RECURRED one notch over — the
  // session-23 re-anchor updated the frontmatter, the e2e count here,
  // and every other doc site but missed the UNIT count in this same
  // bullet (599/37 shipped green against the live 606/38 because only
  // the e2e face was pinned). BOTH counts in the ledger bullet are
  // pinned now, each with its retired-form negative.
  it("the SKILL's Appendix-B verification ledger carries the live e2e count (S20-1)", () => {
    const skill = read("viralpost-ai_SKILL.md");
    // Session-25 (S25-11): the guard was `expect(skill.slice(...)).toBeTruthy()`
    // — with the header missing, indexOf returns -1 and slice(-1) yields
    // the file's LAST CHARACTER (truthy), so the existence guard could
    // never fail. The indexOf form fails for real.
    expect(skill.indexOf("## Appendix B"), "Appendix B must exist").toBeGreaterThanOrEqual(0);
    const appendixB = skill.slice(skill.indexOf("## Appendix B"));
    expect(appendixB).toContain(`e2e\n  ${E2E}/${E2E} (${E2E_SPECS} specs`);
    expect(skill).not.toContain("56/56 (9 specs");
  });

  it("session-24 (S24-1): the Appendix-B ledger carries the live UNIT count too (the S20-1 recurrence, closed)", () => {
    const skill = read("viralpost-ai_SKILL.md");
    // S25-11: the real existence guard (see the S20-1 arm above).
    expect(skill.indexOf("## Appendix B"), "Appendix B must exist").toBeGreaterThanOrEqual(0);
    const appendixB = skill.slice(skill.indexOf("## Appendix B"));
    expect(appendixB).toContain(`unit ${UNIT}/${UNIT} (${SUITES} files`);
    // The retired form that shipped green through session 23 (the exact
    // miss this pin exists to make impossible). Session-27 (S27-5): the
    // literal FROZEN at the historical form — the shipped dynamic-offset
    // arm banned `unit ${UNIT - 7}/...` (a form that never existed on
    // disk; the offset drifted with every re-anchor, guarding nothing
    // real). The sibling arms freeze historical literals; this arm does
    // too now.
    expect(skill).not.toContain("unit 599/599 (37 files");
  });

  it("the README env table carries the six-knob contract (both directions with .env.example)", () => {
    const readme = read("README.md");
    for (const knob of [
      "DATABASE_URL",
      "AUTH_SECRET",
      "NEXT_PUBLIC_SITE_URL",
      "VIRALPOST_PROXY_HOPS",
      "VIRALPOST_DISABLE_IN_APP_OTP",
      "VIRALPOST_DISABLE_IN_APP_RESET",
    ]) {
      expect(readme, `the ${knob} row must sit in the README env table`).toContain(
        `| \`${knob}\` |`,
      );
    }
  });

  // Session-28 (S28-2): the arm above claimed "both directions with
  // .env.example" while its body read only README — the mirror face
  // had no mechanical owner (a 7th var or a dropped knob in
  // .env.example shipped green through the gate). This direction
  // parses the file's assignment keys and demands EXACT set equality:
  // both a missing knob and a stranger var RED. Commented examples
  // (the PostgreSQL line) never match — they start with '#'.
  it("S28-2: the .env.example carries the six-knob contract exactly (no missing knob, no stranger var)", () => {
    // (Session-39, S39-12: the dead `?? ""` retired — read() is
    // readFileSync and throws on a missing file, so the fallback could
    // never engage; a deleted .env.example still REDs, via the throw.)
    const envExample = read(".env.example");
    const keys = new Set(
      [...(envExample.match(/^[A-Z_]+=/gm) ?? [])].map((k) => k.slice(0, -1)),
    );
    expect(
      [...keys].sort(),
      ".env.example's assignment keys must equal the six-knob contract exactly",
    ).toEqual(
      [
        "AUTH_SECRET",
        "DATABASE_URL",
        "NEXT_PUBLIC_SITE_URL",
        "VIRALPOST_DISABLE_IN_APP_OTP",
        "VIRALPOST_DISABLE_IN_APP_RESET",
        "VIRALPOST_PROXY_HOPS",
      ].sort(),
    );
  });

  it("the AGENTS plans map carries the session-9 round (the living plans census)", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain("session-9 rate-limiter trust warning");
  });

  it("the property layer's doc claim is TRUE (the F9-5 cure: PAD cites fast-check, the suite exists)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain("Property tests (fast-check) on the generator contract");
    // and the suite itself is on disk (this file's own sibling)
    expect(read("tests/property.test.ts")).toContain("fast-check");
  });

  // Session-10 (F10-2): the three sites the s9 gate missed — the file-tree
  // prose in README + PAD and the SKILL's OWN pre-ship checklist line all
  // carried pre-s9 numbers while every table above them said the live
  // counts (README was internally inconsistent: "29" vs its own "31"
  // table row). The checklist item that exists to enforce lockstep was
  // itself the stale site — pinned here now.
  it("the README file-hierarchy line carries the live suite count", () => {
    const readme = read("README.md");
    expect(readme).toContain(`📂 tests/                  ${SUITES} unit suites + 📂 e2e/ (${E2E_SPECS} Playwright specs)`);
  });

  it("the PAD file-tree line carries the live suite count", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`← ${SUITES} unit suites + e2e/ (${E2E_SPECS} specs)`);
  });

  it("the SKILL's pre-ship checklist carries the live counts (the lockstep enforcer, itself locked)", () => {
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`Gate green at the exact counts (${UNIT} unit / ${E2E} e2e / ${SMOKE} smoke`);
  });

  // Session-11: the neo-crm doctrine-census mini adopted — every
  // command the AGENTS table advertises must exist in package.json's
  // scripts (read LIVE; a phantom command in the operator's quick
  // reference is the docs-lie genus), and the PAD §12 inventory rows
  // must carry their file's live line count (the F11-8 re-anchor made
  // mechanical).
  it("every AGENTS Commands-table command exists in package.json's scripts (the doctrine census, read live)", () => {
    const agents = read("AGENTS.md");
    const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
    // Every backticked `bun run …` form in a table row (cells may carry
    // trailing prose); the `-- args` suffix of the one-unit-file form maps
    // onto its base script.
    const cells = [...agents.matchAll(/\|.*?`([^`]+)`/g)].map((m) => m[1]);
    const commands = cells.filter((c) => c.startsWith("bun run "));
    expect(commands.length).toBeGreaterThanOrEqual(8);
    for (const cmd of commands) {
      const script = cmd.replace("bun run ", "").split(" --")[0].trim();
      expect(pkg.scripts[script], `AGENTS advertises '${cmd}' but package.json has no '${script}' script`).toBeDefined();
    }
  });

  it("the PAD §12 Key Files rows carry their files' LIVE line counts (the inventory census)", () => {
    const pad = read("Project_Architecture_Document.md");
    const rows = [...pad.matchAll(/^\| `([^`]+)` \| (\d+) \|/gm)];
    expect(rows.length).toBeGreaterThanOrEqual(17);
    for (const [, file, lines] of rows) {
      const full = join(root, file);
      expect(existsSync(full), `PAD §12 lists ${file} — it must exist`).toBe(true);
      const actual = readFileSync(full, "utf8").split("\n").length - (readFileSync(full, "utf8").endsWith("\n") ? 1 : 0);
      expect(actual, `PAD §12 says ${file} is ${lines} lines — live count is ${actual} (edit the row in the same commit)`).toBe(
        Number(lines),
      );
    }
  });
});

// ---------------------------------------------------------------------------
// Session-12 (F12-1): THE REALITY CENSUS — the count constants are pinned
// to the LIVE SUITES ON DISK, not only to the doc sites above. The badge-
// drift genus retired at session 9 assumed the constants were honest; a
// test added without bumping UNIT left every doc stale while the gate
// stayed green (the constants and the docs agreed with each other and
// lied about reality together). These arms count the suites the way the
// runners do — a constant that drifts from disk now fails `bun run test`
// BEFORE any doc site is consulted.
// ---------------------------------------------------------------------------

describe("docs-counts: session-12 — the reality census (constants vs DISK, F12-1)", () => {
  it("UNIT/SUITES match the live vitest surface (files + it/test blocks counted on disk)", () => {
    // Session-50 (S50-5): the vitest config admits src/**/*.test.ts too
    // (none exist today) — the file and block counts both run over the
    // tests/ ∪ src/ UNION through the shared helpers, and every
    // strip-chain arm (the S48-1 ban, the S13-10 forms-guard + loop-arm,
    // the S49-3 sweep) iterates the same union below.
    // Session-56 (S56-4): the block count below counts LINE-START
    // `it(`/`test(` registrations only — the shape every suite here
    // writes. A plain registration penned MID-LINE (`cond ? it("a") :`
    // `it("b")` — not the .each/.skip family the forms-guard bans, not
    // a loop-body form the loop-arm guard scans) would execute in the
    // runner while evading this census, decoupling UNIT from reality.
    // Zero live instances at this writing (recount: 725 line-start =
    // the runner's 725); the runner-vs-census ship diff is the
    // standing backstop — write registrations at line start.
    const allUnit = allUnitTestFiles();
    expect(allUnit.length, `unit test files on disk (tests/ ∪ src/): ${allUnit.length} (SUITES says ${SUITES})`).toBe(SUITES);
    let unitTests = 0;
    for (const f of allUnit) {
      unitTests += (read(f).match(/^\s*(?:it|test)\(/gm) ?? []).length;
    }
    expect(unitTests, `it/test blocks on disk: ${unitTests} (UNIT says ${UNIT}) — re-anchor UNIT + every doc site above`).toBe(UNIT);
  });

  it("E2E/E2E_SPECS match the live Playwright surface (source test() + the a11y matrix expansion)", () => {
    const specFiles = e2eSpecFiles();
    expect(specFiles.length, `tests/e2e/**:/*.spec.ts on disk: ${specFiles.length} (E2E_SPECS says ${E2E_SPECS})`).toBe(E2E_SPECS);

    // Source test() blocks across the specs + the setup project (the
    // setup's 1 test is part of the E2E total by the constant's contract).
    const counted = [...specFiles, "auth.setup.ts"];
    let source = 0;
    for (const f of counted) {
      source += (read(`tests/e2e/${f}`).match(/^\s*test\(/gm) ?? []).length;
    }

    // The a11y spec registers tests inside width loops — its source
    // count (3) expands through the shared matrix (the single source
    // both the spec and this census import):
    //   (SURFACES + the 404) × WIDTHS  +  LOGGED_OUT_SURFACES × WIDTHS
    // (Session-22, S22-9: the logged-out family grew from the login
    // card alone to /signup + /reset-password — 12 → 16 a11y tests.)
    const A11Y_SOURCE_TESTS = 3;
    const a11ySource = (read("tests/e2e/a11y.spec.ts").match(/^\s*test\(/gm) ?? []).length;
    expect(a11ySource, `a11y.spec.ts carries ${A11Y_SOURCE_TESTS} source test() blocks — if you added or moved one, update A11Y_SOURCE_TESTS and the expansion formula`).toBe(A11Y_SOURCE_TESTS);
    const expansion =
      (A11Y_SURFACES.length + 1) * A11Y_WIDTHS.length + // + 1 = the 404 test
      A11Y_LOGGED_OUT.length * A11Y_WIDTHS.length; // the logged-out describe
    expect(source - A11Y_SOURCE_TESTS + expansion, `e2e tests on disk: ${source - A11Y_SOURCE_TESTS + expansion} (E2E says ${E2E}) — re-anchor E2E + every doc site above`).toBe(E2E);

    // Session-22 (S22-15): the anti-dodge guard matches TEST-REGISTRATION
    // loops, not one literal — a `for (…) { test(…) }`,
    // `.forEach(… => test(…))`, or `.map(… => test(…))` in another spec
    // would undercount the census the same way a copied width-loop
    // would. Assertion-only loops (seo.spec's `for (const path of …)`
    // with expects) are legitimate and stay invisible to this shape.
    // Comment-stripped so a prose mention is not a violation; a11y owns
    // the one sanctioned registration family.
    // Session-23 (S23-13): the heads cross parens now — `[^)]*` could not
    // see past a `)` inside the loop head (`for (const p of
    // paths.filter(x)) { test(…) }` evaded), and `while`/`for await`
    // were uncovered entirely. Same-line greedy heads + the while family;
    // the decoy battery below pins the shapes (a guard for the guard —
    // the S13-10 mutation doctrine).
    const loopShapes =
      /(?:for(?:\s+await)?|while)\s*\([^\n]*\)\s*\{\s*(?:\/\/[^\n]*\n\s*)*test\(|\.forEach\s*\(\s*[^\n]*=>\s*\{\s*(?:\/\/[^\n]*\n\s*)*test\(|\.map\s*\(\s*[^\n]*=>\s*(?:\{\s*)?(?:\/\/[^\n]*\n\s*)*test\(/;
    // The decoy battery (S23-13): every shape a dodge could take, each
    // asserted to MATCH — the old `[^)]*` form missed the first two.
    const loopDecoys = [
      "for (const p of paths.filter((x) => x.on)) { test(\"dodge\", () => {}); }", // paren-laden head
      "for (const w of [1280, 390].map((v) => v)) {\n  test(\"dodge\", () => {});\n}", // .map-fed head, multiline body
      "while (queue.length) { test(\"dodge\", () => {}); }", // the while family
      "for await (const chunk of stream) { test(\"dodge\", () => {}); }", // the await family
      ".forEach((p) => {\n  test(\"dodge\", () => {});\n})", // the forEach family
    ];
    for (const decoy of loopDecoys) {
      expect(decoy, `the anti-dodge shape must catch: ${decoy}`).toMatch(loopShapes);
    }
    // The legitimate assertion-only loop stays invisible (the seo.spec
    // shape — an expect, never a registration).
    expect('for (const path of ROUTES) {\n  expect(path).toContain("/");\n}').not.toMatch(loopShapes);
    for (const f of specFiles) {
      if (f === "a11y.spec.ts") continue;
      const bare = read(`tests/e2e/${f}`)
        .replace(/\/\/[^\n]*/g, "")
        .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
      expect(bare, `${f} registers tests inside a loop — extend the reality census's expansion formula`).not.toMatch(loopShapes);
    }
  });

  // Session-13 (S13-10): the forms-guard — the census counts `it(`/`test(`
  // source blocks, so a registration form the regex CANNOT see would
  // decouple the constants from the runner's executed count (the
  // badge-drift genus one notch deeper: .each( registers N tests per
  // block, .skip(/.only( change what runs, .todo( neither counts nor
  // runs). Zero live instances at birth (verified before the pin
  // landed); comment-stripped so a prose mention is not a violation.
  it("no uncountable registration form in any unit suite or e2e spec (the census's shape contract)", () => {
    // Session-46 (S46-10): the module-level stripComments (the S45-9
    // helper above) — the local copies retired (the one-idiom doctrine).
    // Session-50 (S50-5): the union — src suites join the guard.
    const unitFiles = allUnitTestFiles();
    // Session-24 (S24-2): recursive — a nested spec dodges a flat scan
    // (the forms-guard's own blind spot until now).
    const e2eFiles = e2eCountedFiles();
    for (const f of [...unitFiles, ...e2eFiles.map((f) => `tests/e2e/${f}`)]) {
      const src = stripComments(read(f));
      const form = src.match(/\.(each|skip|only|todo|concurrent|fails)\(/);
      expect(form, `${f} uses a "${form?.[0] ?? ""}" registration form the reality census cannot count — count it by hand and extend the census, or write plain it(/test( blocks`).toBeNull();
    }
  });

  // Session-13 (S13-10, the loop arm — born from a REAL instance): this
  // round's own OTP-log pin was first written inside a for-of over the
  // two routes — ONE source `it(` block, TWO runner tests; the census
  // said 526 while the runner said 527 (the exact badge-drift genus the
  // census exists to catch, caught by the runner-vs-census diff at
  // ship time). The guard: an it(/test( REGISTRATION at line start
  // inside a for-loop body (an indent-based scan — the loop's body
  // ends at the first non-blank line indented no deeper than the
  // `for` itself). Loops INSIDE a test body stay legal (they assert,
  // they don't register).
  it("no it(/test( registration inside a for-loop body in any unit suite (the census counts source blocks)", () => {
    // Session-46 (S46-10): the module-level stripComments (the S45-9
    // helper above) — the local copy retired (the one-idiom doctrine).
    // Session-50 (S50-5): the union — src suites join the guard.
    const unitFiles = allUnitTestFiles();
    for (const f of unitFiles) {
      const lines = stripComments(read(f)).split("\n");
      for (let i = 0; i < lines.length; i++) {
        const forLine = lines[i].match(/^(\s*)for \(.*\) \{/);
        if (!forLine) continue;
        const loopIndent = forLine[1].length;
        for (let j = i + 1; j < lines.length; j++) {
          const line = lines[j];
          if (line.trim() === "") continue;
          const indent = line.length - line.trimStart().length;
          if (indent <= loopIndent) break; // the loop body ended
          if (/^(?:it|test)\(/.test(line.trim())) {
            throw new Error(
              `${f}:${j + 1} registers a test inside a for-loop body (line ${i + 1}) — the census counts SOURCE blocks, so the runner would execute more tests than UNIT counts. Unroll the loop into explicit it( blocks (the S13-10 loop-arm precedent).`,
            );
          }
        }
      }
    }
  });

  // Session-28 (S28-6): the last count site joins the disk family.
  // UNIT/SUITES/E2E/E2E_SPECS all have reality censuses above; SMOKE
  // had none — the ladder's `ok NN` leg markers and its own
  // `SMOKE: 15/15 PASS` echo literal were hand-maintained (the S27-6
  // genus: a docs claim with zero assertions). The census counts the
  // leg markers on disk and demands equality with the constant, plus
  // the echo literal shape.
  it("SMOKE matches the live ladder on disk (the ok NN leg markers + the PASS echo literal)", () => {
    // Session-45 (S45-10): the dead `?? ""` retired — read() is
    // readFileSync (throws on a missing file, non-nullable), the
    // S39-12 genus at its last site.
    const smoke = read("scripts/smoke-test.sh");
    const legs = smoke.match(/\bok \d{2} "/g) ?? [];
    expect(legs.length, `smoke legs on disk: ${legs.length} (SMOKE says ${SMOKE}) — re-anchor SMOKE + every doc site above`).toBe(SMOKE);
    expect(smoke, "the ladder's own summary line must carry the constant").toContain(`SMOKE: ${SMOKE}/${SMOKE} PASS`);
  });

  // Session-40 (S40-11): the PAD §4.1 schema-field census — the model
  // face joins the disk family. The PAD's mermaid User block omits the
  // live `photoUrl` column (schema.prisma:23; wire-visible on
  // /api/auth/me since session 1) for the entire repo's life — the
  // badge-drift genus on the one count family ("models") that lacked a
  // census: every other face (tests, env, PAD §12 lines) owns a pin,
  // so schema drift survived a green gate. The arm extracts each
  // model's field names from prisma/schema.prisma and demands each
  // appears in PAD §4.1's mermaid block — the S24-9 one-spanning-pin
  // form. Planted-defect battery: remove the photoUrl row → this arm
  // REDs naming the field.
  it("the PAD §4.1 model blocks carry every live schema field (the schema-face census)", () => {
    const schema = read("prisma/schema.prisma");
    const pad = read("Project_Architecture_Document.md");
    const pad41 = pad.slice(pad.indexOf("### 4.1 Database Schema"), pad.indexOf("### 4.2"));
    expect(pad41.length, "PAD §4.1 must exist (the slice found it)").toBeGreaterThan(0);
    for (const model of ["User", "ContactMessage"]) {
      const block = schema.slice(schema.indexOf(`model ${model} {`), schema.indexOf("}", schema.indexOf(`model ${model} {`)));
      expect(block.length, `schema.prisma must carry model ${model}`).toBeGreaterThan(0);
      const fields = [...block.matchAll(/^\s{2}(\w+)\s+\w+/gm)].map((m) => m[1]);
      // User carries 15 live fields, ContactMessage 5 (the floor guards
      // the extraction itself — an empty match set can never pass).
      expect(fields.length).toBeGreaterThanOrEqual(5);
      for (const field of fields) {
        expect(pad41, `PAD §4.1's ${model} block omits the live schema field '${field}' — add the row in the same commit as any schema change`).toContain(field);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Session-12 (N12-1): the semantic-prose census STARTER — the neo-crm
// s208–s217 family, scoped to this repo's drift-prone sites. Doc prose
// that names RETIRED forms or carries load-bearing setup steps is pinned
// so the genus can't return (the PAD referenced the retired tw-animate
// file for a full session after its deletion — F12-5).
// ---------------------------------------------------------------------------

describe("docs-counts: session-12 — the semantic-prose census starter (N12-1)", () => {
  it("the PAD carries no retired-form references (tw-animate / the vendor tree line / the stale 409+ prose)", () => {
    const pad = read("Project_Architecture_Document.md");
    // Scoped to the PAD: AGENTS/CLAUDE/SKILL legitimately narrate the
    // session-11 retirement as history; the PAD's ADR-005 + file tree
    // described it as LIVE architecture — the exact drift F12-5 cured.
    expect(pad).not.toContain("tw-animate");
    expect(pad).not.toContain("vendor/");
    expect(pad).not.toContain("409+");
  });

  it("the README quickstart keeps the fresh-clone cp line before the first db command (the checkout leg)", () => {
    const readme = read("README.md");
    const cp = readme.indexOf("cp .env.example .env");
    const push = readme.indexOf("bun run db:push");
    expect(cp, "the quickstart must keep `cp .env.example .env`").toBeGreaterThan(-1);
    expect(push, "the quickstart must keep `bun run db:push`").toBeGreaterThan(-1);
    expect(cp, "the cp must precede the first db command (a pristine clone needs .env before db:push)").toBeLessThan(push);
  });

  it("AGENTS carries the one-owner doctrine (the mutation-battery refinement, N12-2)", () => {
    expect(read("AGENTS.md")).toContain("EXACTLY ONE pin");
  });

  // Session-20 (S20-13): the SKILL's §7 still described the retired PT
  // monetization section in the present tense ("the PT pay-what-you-want
  // section … session-1 captures") two full sessions after the session-19
  // EN redesign — the census scanned only the PAD for retired forms.
  // Appendix A's round-history rows may narrate the PT era as history;
  // the live-tense §7 may not name it as present architecture.
  it("the SKILL carries no live-tense PT-section reference (S20-13)", () => {
    expect(read("viralpost-ai_SKILL.md")).not.toContain("PT pay-what-you-want");
  });
});

// Session-34 (S34-5): the provenance-range census — the badge-drift
// genus's LAST hand-maintained count family made mechanical. The eight
// live-tense sites describe this repo's own session ledger as
// `docs/session_1..<bound>`; the on-disk ledger under docs/ is the
// truth. The lag invariant: bound ∈ {diskMax, diskMax − 1} — lag 0 at
// ship (every round re-anchors per the S30-4 convention), lag 1 inside
// the owner's narration window (the owner's post-ship commit adds
// session_<N+1>.md before the next round re-anchors — the designed
// transient every baseline rides through GREEN). Lag ≥ 2 means a round
// forgot to re-anchor (the real hazard — the S30-4 finding was a
// SEVEN-session lag); a leading bound claims a session that doesn't
// exist. The census keys on the `docs/`-prefixed file-glob form — the
// live-tense shape every site uses; historical prose (Appendix A rows,
// the S30-4 narrative's bare `session_1..21`) carries no docs/ prefix
// and stays out by construction. The docs/ tree itself (plans + session
// logs) is the immutable history-record layer — never censused.
// Battery: one site planted at diskMax − 2 → RED; a site planted at
// diskMax + 1 → RED; restored → GREEN.
describe("docs-counts: session-34 (S34-5) — the provenance-range census (the lag invariant)", () => {
  const RANGE_RE = /docs\/session_1\.\.(\d+)/g;
  // The live-tense site files (src/ + tests/ + the root contract docs).
  // A NINTH site in any of these roots is owned automatically; a site
  // in a NEW root would need the root added here (the census's own
  // comment is the contract).
  const SITE_ROOTS = [
    join(root, "src"),
    join(root, "tests"),
    // Session-35 (S35-7): the documented blind spots closed — scripts/,
    // worklog.md, and the root config files join the scan (a future
    // docs/session_1..N range claim there must trip the same lag
    // invariant; today zero such sites exist in them — the worklog's
    // only cite is the single-session reference docs/session_19.md,
    // out by construction).
    join(root, "scripts"),
  ];
  const SITE_FILES = [
    ".env.example",
    "viralpost-ai_SKILL.md",
    "README.md",
    "AGENTS.md",
    "CLAUDE.md",
    "Project_Architecture_Document.md",
    "worklog.md",
    "next.config.ts",
    "playwright.config.ts",
    "vitest.config.mts",
    "eslint.config.mjs",
    "postcss.config.mjs",
    // Session-36 (S36-4): the S35-7 widening's own blind spot — the
    // SITE_ROOTS extension filter admits only .ts/.tsx/.mts, so
    // scripts/smoke-test.sh (the scripts/ file most likely to carry
    // provenance prose) was excluded despite the widening comment's
    // "must trip" claim. SITE_FILES reads regardless of extension —
    // the .sh joins the scan here.
    "scripts/smoke-test.sh",
  ];

  function rangeSites(): Array<{ where: string; bounds: number[] }> {
    const sites: Array<{ where: string; bounds: number[] }> = [];
    const push = (where: string, text: string) => {
      const bounds = [...text.matchAll(RANGE_RE)].map((m) => Number(m[1]));
      if (bounds.length > 0) sites.push({ where, bounds });
    };
    for (const f of SITE_FILES) push(f, read(f));
    for (const dirRoot of SITE_ROOTS) {
      for (const f of readdirSync(dirRoot, { recursive: true }).map(String).sort()) {
        if (!f.endsWith(".ts") && !f.endsWith(".tsx") && !f.endsWith(".mts")) continue;
        push(join(basenameOf(dirRoot), f), readFileSync(join(dirRoot, f), "utf8"));
      }
    }
    return sites;
  }

  function basenameOf(p: string): string {
    return p.split(sep).pop() ?? p;
  }

  it("the session ledger on disk is contiguous 1..N (no missing session log)", () => {
    const nums = readdirSync(join(root, "docs"))
      .map(String)
      .filter((f) => /^session_\d+\.md$/.test(f))
      .map((f) => Number(f.replace(/\D/g, "")))
      .sort((a, b) => a - b);
    expect(nums.length, "docs/ carries session_1..N").toBeGreaterThan(0);
    nums.forEach((n, i) =>
      expect(n, `the ledger must be contiguous (gap before ${n})`).toBe(i + 1),
    );
  });

  it("every live-tense provenance site satisfies the lag invariant (bound ∈ {diskMax, diskMax − 1})", () => {
    const nums = readdirSync(join(root, "docs"))
      .map(String)
      .filter((f) => /^session_\d+\.md$/.test(f))
      .map((f) => Number(f.replace(/\D/g, "")));
    const diskMax = Math.max(...nums);
    const sites = rangeSites();
    expect(sites.length, "the provenance range sites exist (the S34-5 re-anchor set)").toBeGreaterThanOrEqual(8);
    for (const { where, bounds } of sites) {
      for (const b of bounds) {
        expect(
          b === diskMax || b === diskMax - 1,
          `${where} carries docs/session_1..${b} with the disk ledger at ${diskMax} — the lag must be 0 (ship) or 1 (the owner's narration window), never more`,
        ).toBe(true);
      }
    }
  });
});

// Session-47 (S47-9, AUDIT-3 L1 + the neo-crm s213–s217 idiom adopted
// at birth): the generator-hang stale-prose arm. The S46-11 cure
// re-anchored only the D-1 evidence row; FIVE live-tense derivation
// sites still described the reference's failure posture as an infinite
// hang two full sessions of doctrine after the walk's own record (the
// reference settles with a failure toast — the 402-dead core stands).
// The 404-title drift of session-45 WAS re-anchored at its derivation
// sites — the contrast case proving the house convention this arm now
// enforces mechanically: the wrap-blind FLATTENED read (the s208/s213
// lesson — prose wraps across lines, a plain toContain misses the
// wrapped spelling) bans the stale spellings in the five live-tense
// files and asserts the corrected form present. The immutable history
// layer (docs/session_*, docs/plans, the worklog's shipped rows) is
// never censused — by construction, this arm reads the five files by
// name. Ban-safe paraphrase doctrine (s216): this arm's own prose and
// the session-47 log PARAPHRASE the stale form — never quote it.
describe("docs-counts: session-47 (S47-9) — the generator-hang stale-prose census (the neo-crm idiom at birth)", () => {
  const STALE_FORMS = ["hangs forever", 'hangs at "Generating'];
  const FILES = [
    "docs/implementation-plan.md",
    "README.md",
    "CLAUDE.md",
    "viralpost-ai_SKILL.md",
    "tests/e2e/generator.spec.ts",
  ];
  // The wrap-blind read: flatten ALL whitespace so a phrase wrapped
  // across a line break matches its single-line spelling.
  const flatten = (text: string) => text.replace(/\s+/g, " ");

  it("no live-tense site claims the reference's infinite-hang posture (the D-1 drift, mechanically retired)", () => {
    for (const file of FILES) {
      const flat = flatten(read(file));
      for (const stale of STALE_FORMS) {
        expect(flat, `${file} must not carry the stale "${stale}" claim (the D-1 posture: the reference now settles with a failure toast)`).not.toContain(stale);
      }
    }
  });

  it("each site carries the corrected settled posture (the failure-toast record, present-form)", () => {
    for (const file of FILES) {
      const flat = flatten(read(file));
      expect(flat, `${file} must carry the corrected posture (the failure-toast form)`).toMatch(/failure toast/i);
    }
  });
});

// ---------------------------------------------------------------------------
// Session-48 (S48-1, AUDIT-1 M1+L2): the stripComments one-idiom census.
// The S47-10 cure hardened ONE helper (db-path's) while the family's other
// nine carriers kept the naive block-first form — a byte-level comparison
// proved live phantom-eating on the scanned files (719 chars on
// design-tokens, 271 on password-seam, 2295 here: whole describes and
// it-bodies eaten between a glob's `/*` and a distant `*/`). The census
// arms read these files through the helpers, so a violating form planted
// inside an eaten span ships GREEN — the exact comment-blind genus.
// The cure: the hardened form (line pass first; block opener anchored
// (^|\s) — db-path.test.ts's S47-10 idiom) becomes the family's ONLY
// shape (the one-idiom doctrine the S46-10 comments already declared).
// type-gate's string-aware state machine coexists (different genus —
// string-literal-aware; the canonical idiom for the block-first family
// is the hardened form).
// The needles are RUNTIME-CONSTRUCTED (the s216 ban-safe-paraphrase
// doctrine's code form): the contiguous signatures never appear in THIS
// file's own source, so the self-read stays honest — the pin can never
// satisfy itself vacuously.
// ---------------------------------------------------------------------------
describe("docs-counts: session-48 (S48-1) — the stripComments one-idiom census (the phantom-open genus retired family-wide)", () => {
  // Session-49 (S49-3, AUDIT-3 M1): the CARRIERS enumeration RETIRED —
  // the presence arm asserted the hardened two-pass shape only for the
  // ten named-helper files while ~25 further INLINE two-pass sites (the
  // S48-1 cure went 13 sites deeper than the audit enumerated) carried
  // no presence owner: a future edit dropping only the line pass from
  // an inline carrier re-opened the phantom-eating genus with the ban
  // still green. The arm is now a family-wide chain SWEEP (below) —
  // every anchored block-pass site in EVERY unit file must be
  // immediately chain-preceded by the line pass; future files cannot
  // escape (the enumeration gap closed the way the ban closed the
  // naive form).

  // The naive signature, assembled at runtime — never spelled
  // contiguously in this file (the s216 ban-safe-paraphrase doctrine's
  // code form: a RAW read of THIS file must not satisfy its own ban).
  const NAIVE = [
    "replace(/",
    "\\/",
    "\\*",
    "[\\s\\S]*?",
    "\\*",
    "\\/",
    "/g, \"\")",
  ].join("");
  // The hardened first pass, assembled the same way (runtime pieces,
  // never contiguous in this file).
  const LINE_PASS = ["replace(/", "\\/", "\\/", "[^\\n]*", "/g, \"\")"].join("");
  // The hardened second pass, assembled the same way.
  const BLOCK_PASS = [
    "replace(/",
    "(^|\\s)",
    "\\/",
    "\\*",
    "[\\s\\S]*?",
    "\\*",
    "\\/",
    "/g, \"$1\")",
  ].join("");

  const flatten = (text: string) => text.replace(/\s+/g, " ");

  it("no unit test file carries the naive block-first signature (the phantom-open genus, banned family-wide)", () => {
    for (const f of allUnitTestFiles()) {
      // RAW read (flattened): the needle itself contains // — a
      // comment-stripped read would line-eat the needle's own tail and
      // the ban could NEVER trip (the vacuous-pin genus the battery
      // caught at birth). A commented-out helper tripping the raw ban
      // is the desired stance: dead code gets retired, not commented
      // out (the repo's standing doctrine).
      const flat = flatten(read(f));
      expect(flat, `${f} must not carry the naive block-first strip form (line comments are eaten only after the block pass has already phantom-opened on their prose)`).not.toContain(NAIVE);
    }
  });

  it("every anchored block-pass site sits in a line-first chain (the one-idiom doctrine, enforced family-wide — S49-3)", () => {
    // The four documented CSS-only sites: design-tokens ×2, typography
    // ×2 — these strips read CSS text, where a // line pass would eat
    // https:// URLs; block-only is the CORRECT form there. The map is
    // an exact per-file orphan count, so the exemption can never go
    // vacuous (remove an entry → the live orphans trip the sweep; add
    // a phantom entry → nothing changes, the count is exact).
    // Session-50 (S50-5): the keys carry the union's repo-relative
    // paths (tests/…, src/…) — a src-side CSS suite would key as
    // "src/…" the day it appears.
    const CSS_ONLY_ORPHANS: Record<string, number> = {
      "tests/design-tokens.test.ts": 2,
      "tests/typography.test.ts": 2,
    };
    for (const f of allUnitTestFiles()) {
      const flat = flatten(read(f));
      let start = 0;
      let orphans = 0;
      let sites = 0;
      for (;;) {
        const blockAt = flat.indexOf(BLOCK_PASS, start);
        if (blockAt < 0) break;
        sites++;
        // A chain: the line pass's LAST occurrence before this block
        // pass must sit exactly one method-dot away — "." (the
        // single-line member-chain form) or " ." (the multi-line form,
        // flattened). The needles carry no leading dot (they predate
        // this arm — the S48-1 order check never needed one), so the
        // dot is asserted as the gap. Anything else — a lone block
        // pass, a block-first order, code or comments between the
        // passes — is an orphan.
        const lineAt = flat.lastIndexOf(LINE_PASS, blockAt);
        const gap =
          lineAt < 0 ? "" : flat.slice(lineAt + LINE_PASS.length, blockAt);
        if (gap !== "." && gap !== " .") {
          orphans++;
        }
        start = blockAt + 1;
      }
      const exempt = CSS_ONLY_ORPHANS[f] ?? 0;
      expect(
        orphans,
        `${f}: ${orphans} of ${sites} anchored block-pass site(s) lack the line-first chain (${exempt} CSS-only exempted) — the one-idiom doctrine (S48-1/S49-3) requires the line pass in every chain`,
      ).toBe(exempt);
    }
  });
});

// ---------------------------------------------------------------------------
// Session-48 (S48-8, AUDIT-3 L1): the SKILL Appendix-B header bound joins
// the lockstep census. The header shipped one round stale at session 47
// ("re-certified through session 46" while the frontmatter and Appendix-A
// row said 47) and the session-47 ship record claimed the re-anchor — the
// one live-tense site no census arm owned, the exact badge-drift genus the
// docs-counts census exists to catch. The S43-5 form: the header's bound
// is mechanically tied to the SKILL §0.5 range bound; both update in the
// same commit at ship, and a stale header is impossible.
// ---------------------------------------------------------------------------
describe("docs-counts: session-48 (S48-8) — the Appendix-B header bound census (the stale-header genus, mechanically retired)", () => {
  it("the SKILL Appendix-B header's re-certification bound matches the §0.5 range bound (the S43-5 form)", () => {
    const skill = read("viralpost-ai_SKILL.md");
    const header = skill.match(/re-certified through session (\d+)/);
    expect(header, "the Appendix-B header carries the re-certified-through bound").not.toBeNull();
    const bound = skill.match(/session_1\.\.(\d+)/);
    expect(bound, "the SKILL §0.5 range claim exists (docs/session_1..N)").not.toBeNull();
    expect(Number(header![1]), "the Appendix-B header updates in lockstep with the SKILL §0.5 bound — a stale header is mechanically impossible").toBe(Number(bound![1]));
  });
});

// ---------------------------------------------------------------------------
// Session-49 (S49-4, AUDIT-3 L1): the AGENTS plans-map tail-currency census.
// The session-48 ship appended session_48.md, the plan file, the worklog row,
// and every count — but NOT the AGENTS `docs/plans/` map entry (the
// enumeration ended at session-47) while session_48.md's lockstep list
// claimed "the plans map's forty-eighth round": the docs-lie genus on the
// one enumeration no census arm owned. The arm ties the map's round
// sequence to the plan files on disk — the map enumerates every round 1:1
// (one plan file per session since session 1), so a lagging tail or a
// skipped middle entry REDs with the fix named.
// Session-50 (S50-9, AUDIT-3 I2): the 1:1 claim's DUPLICATE face — a
// pasted round (session-42 twice) kept every contains-assertion green
// while the map stopped enumerating rounds 1:1 (matchAll counts tokens,
// not distinct rounds). The Set-size assertion gives the claim
// mechanical teeth.
// ---------------------------------------------------------------------------
describe("docs-counts: session-49 (S49-4) — the AGENTS plans-map tail-currency census (the missing-round genus, mechanically retired)", () => {
  it("the plans map enumerates every plan round: the last session-N equals the plan-file count, no skipped middles, no duplicates", () => {
    const agents = read("AGENTS.md");
    const mapLine = agents.match(/`docs\/plans\/`[^\n]*/)?.[0] ?? "";
    expect(mapLine.length, "AGENTS's docs/plans/ enumeration line must exist (the Key docs section's plans map)").toBeGreaterThan(0);
    const rounds = [...mapLine.matchAll(/session-(\d+)/g)].map((m) => Number(m[1]));
    expect(new Set(rounds).size, `the plans map carries a duplicated session-N token (${rounds.length} tokens vs ${new Set(rounds).size} distinct) — the map enumerates every round exactly once (the S50-9 1:1 teeth); remove the pasted duplicate`).toBe(rounds.length);
    expect(rounds.length, "the map must enumerate at least through the session-9 starter (the semantic-prose arm pins it)").toBeGreaterThanOrEqual(9);
    const last = Math.max(...rounds);
    const planFiles = readdirSync(join(root, "docs/plans")).filter((f) => f.endsWith(".md")).length;
    expect(last, `the plans map's last entry (session-${last}) does not match the ${planFiles} plan files on disk — append the round's entry to the map in the same commit as its plan file`).toBe(planFiles);
    for (let i = 1; i <= last; i++) {
      expect(rounds, `the plans map skips session-${i} — every round carries its entry (one plan file per session, 1:1)`).toContain(i);
    }
  });
});

// ---------------------------------------------------------------------------
// Session-50 (S50-2, AUDIT-3 M1): the envprod GIT-boundary closure. The
// S49-1 artifact closure (the persona: an operator's .env.production
// carrying the real AUTH_SECRET per DEPLOYMENT.md §4) stopped at the
// artifact boundary; the .gitignore carried only `.env` + `.env*.local`
// (git check-ignore .env.production exits 1), so the persona's file
// staged on the first `git add -A`. The env block now covers the
// Next-convention mode family, and the AGENTS never-commit list + the
// SKILL §11 checklist line (both re-spelled by S49-5 without it) carry
// the family in the same commit.
// ---------------------------------------------------------------------------
describe("docs-counts: session-50 (S50-2) — the envprod gitignore closure (the git boundary of the S49-1 persona)", () => {
  it("the .gitignore env block ignores the Next-convention mode files, and the never-commit lists name them", () => {
    const gi = read(".gitignore");
    for (const name of [".env.production", ".env.development", ".env.test"]) {
      expect(gi.includes(`\n${name}\n`), `the .gitignore must ignore ${name} (the S49-1 persona's secrets file staged on git add -A pre-S50-2)`).toBe(true);
    }
    expect(read("AGENTS.md"), "AGENTS's never-commit list must name .env.production").toContain("`.env`, `.env.production`");
    expect(read("viralpost-ai_SKILL.md"), "the SKILL §11 checklist's git-status line must name .env.production").toContain("no .env, .env.production, *.key");
  });
});

// ---------------------------------------------------------------------------
// Session-50 (S50-6, AUDIT-3 L2): the excludes↔smoke MIRROR-SET pin. The
// S34-7 doctrine claims the smoke ladder's leg-16 hygiene list "mirrors"
// next.config's outputFileTracingExcludes — but every pin sat on the
// SMOKE side (error-boundaries' S36-5a full-line pin owns the loop's
// literal; the smoke-leg prose censuses own the count prose): an exclude
// dropped from next.config ONLY (the smoke list keeping the stale entry,
// the artifact-hygiene posture silently diverging) shipped green — the
// config-side tripwire the mirror doctrine claimed but never enforced.
// This arm parses BOTH sides and asserts SET EQUALITY (normalizing
// `x/**` → `x`): the smoke list === the excludes list + `uploads` (the
// sanctioned S34-7 tripwire extra — the runtime uploads dir the tracer
// never sees, belt-and-suspenders on the smoke side only). Division of
// ownership (the N12-2 one-owner doctrine): S36-5a owns the smoke-side
// literal; THIS arm owns the config↔smoke relation.
// ---------------------------------------------------------------------------
describe("docs-counts: session-50 (S50-6) — the excludes↔smoke mirror-set pin (the config-side tripwire the doctrine claimed but never enforced)", () => {
  it("the smoke leg-16 list set-equals the outputFileTracingExcludes list + uploads (normalized x/** → x)", () => {
    // next.config.ts: the "*" array body, its line comments stripped,
    // its quoted strings collected. The strip runs on the BODY only —
    // never the whole file (a // inside a URL string elsewhere in the
    // config would be mangled by the line pass; the body's entries
    // carry no //).
    const rawBody = read("next.config.ts").match(/outputFileTracingExcludes:\s*\{\s*"\*":\s*\[([\s\S]*?)\]/)?.[1] ?? "";
    expect(rawBody.length, "next.config.ts must carry the outputFileTracingExcludes \"*\" array (the artifact-hygiene source of truth) — a zero-length body means the parse shape changed; fix the arm's regex in the same commit").toBeGreaterThan(0);
    const excludes = [...stripComments(rawBody).matchAll(/"([^"]+)"/g)].map((m) => m[1].replace(/\/\*\*$/, ""));

    // smoke-test.sh: the leg-16 `for entry in …` list.
    const smoke = read("scripts/smoke-test.sh").match(/for entry in ([^;]+); do/)?.[1]?.trim().split(/\s+/) ?? [];
    expect(smoke.length, "smoke-test.sh must carry the leg-16 for-entry loop (the hygiene mirror's consumer) — a zero-length list means the loop's shape changed; fix the arm's regex in the same commit").toBeGreaterThan(0);

    const exclSet = new Set(excludes);
    const smokeSet = new Set(smoke);
    // Direction 1 — every exclude mirrors into the smoke list.
    const missing = [...exclSet].filter((e) => !smokeSet.has(e));
    expect(missing, `the smoke leg-16 list must mirror every outputFileTracingExcludes entry (normalized) — missing: ${missing.join(", ")}. The two lists move TOGETHER: either restore the next.config exclude or drop the stale smoke entry in the same commit (S36-5a's full-line pin owns the smoke literal)`).toEqual([]);
    // Direction 2 — the smoke list carries nothing beyond the excludes
    // + the one sanctioned extra.
    const extra = [...smokeSet].filter((e) => e !== "uploads" && !exclSet.has(e));
    expect(extra, `the smoke leg-16 list carries entries beyond the excludes + the sanctioned S34-7 uploads extra — extra: ${extra.join(", ")}. The two lists move TOGETHER: either add the next.config exclude or drop the smoke entry in the same commit`).toEqual([]);
  });
});
