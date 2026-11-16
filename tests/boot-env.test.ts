// Session-170 (WP-3): THE BOOT GATE — the instrumentation.ts fail-fast
// ported from the scandihaven reference (its parseServerEnv + flag-typo
// guard), recast in the house pure-seam form: bootEnvCheck(env) is PURE
// (returns { fatal, warnings } — no process access, fully unit-testable
// over env-shaped records), applyBootEnvReport applies it (prints the
// warnings via the injectable logger, throws the fatal — the [boot]
// message family mirroring the s169 secret() throw).
//
// The six-knob contract validated at boot:
//   AUTH_SECRET     production + missing/<16 chars -> FATAL (the s169
//                   runtime seam front-run: the server refuses to BOOT
//                   instead of failing at the first session op)
//   NEXT_PUBLIC_SITE_URL  production + unset/localhost -> WARNING (the
//                   metadata/robots/sitemap/OG family would advertise
//                   http://localhost:3000; dev is exempt — localhost IS
//                   the dev origin)
//   VIRALPOST_* unknown  any VIRALPOST_-prefixed var outside the closed
//                   3-knob set -> WARNING (the flag-typo guard: a
//                   mistyped knob silently no-ops — the code reads the
//                   closed set verbatim)
//   NEO_* legacy    any NEO_-prefixed var -> WARNING (the session-2
//                   rename's old spellings are inert; the warning maps
//                   the live VIRALPOST_* name where one exists)
//   VIRALPOST_DISABLE_*  values outside ""/"1" -> WARNING (every other
//                   value silently behaves as unset)
//   VIRALPOST_PROXY_HOPS  unparsable/negative -> WARNING (the rate-limit seam
//                   already fails CLOSED onto 1 — the boot warning adds
//                   the visibility)
//
// src/instrumentation.ts (the Next hook): register() skips the edge
// runtime (no fs/console contract) + the phase-production-build workers
// (next build must never need AUTH_SECRET — verified live), then
// dynamically imports the seam and applies it. Dev/test boot SOFT (the
// DX posture unchanged: the DEV fallback stays documented in auth.ts).
//
// RED at birth (the seam does not exist yet); GREEN when WP-3 lands it.
// Lineage note (session-21, S21-12): the session numbers in this suite
// (Session-170/WP-3, s169…) cite the NEO-CRM/digma donor ledgers — the
// template repos these seams were ported from. This repo's own sessions
// are docs/session_1..77.

import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyBootEnvReport, bootEnvCheck, databaseUrlFileResidueWarning, databaseUrlInertValueWarning, KNOWN_VIRALPOST_VARS, shadowingEnvFileWarnings, shadowingEnvFileWarningsForServer } from "../src/lib/boot-env";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// An env-record builder (the pure seam takes env-shaped records — no
// process access anywhere in the seam).
type Env = Record<string, string | undefined>;
const env = (over: Env = {}): Env => ({
  NODE_ENV: "production",
  AUTH_SECRET: "a".repeat(32),
  NEXT_PUBLIC_SITE_URL: "https://viralpost.example.com",
  DATABASE_URL: "file:../db/custom.db",
  // Session-9 (F9-1): a HEALTHY production env DECLARES its proxy
  // topology — the builder carries hops=1 so the unset-hops warning
  // (added the same session) stays opt-in to its own pins below.
  VIRALPOST_PROXY_HOPS: "1",
  // Session-13 (S13-1): a HEALTHY production env DECLARES its delivery
  // posture too — the builder carries both kill-switches at "1" (a real
  // mail transport owns delivery) so the unset-delivery warning (added
  // this session) stays opt-in to its own pins below.
  VIRALPOST_DISABLE_IN_APP_OTP: "1",
  VIRALPOST_DISABLE_IN_APP_RESET: "1",
  ...over,
});

describe("session-170 (WP-3): the production AUTH_SECRET boot gate (the s169 seam front-run)", () => {
  it("production + a healthy secret: no fatal, no warnings", () => {
    const report = bootEnvCheck(env());
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });

  it("production + MISSING secret: FATAL, the actionable message (openssl + the 16-char floor)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: undefined }));
    expect(report.fatal).toBeTypeOf("string");
    expect(report.fatal).toContain("[boot]");
    expect(report.fatal).toContain("AUTH_SECRET");
    expect(report.fatal).toContain("openssl rand -hex 32");
    expect(report.fatal).toContain("16");
  });

  it("production + a SHORT secret (15 chars): FATAL (the same floor secret() enforces)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: "a".repeat(15) }));
    expect(report.fatal).toContain("AUTH_SECRET");
  });

  it("production + the 16-char boundary secret: passes (>= 16, mirroring secret())", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: "a".repeat(16) }));
    expect(report.fatal).toBeNull();
  });

  it("development + missing secret: SOFT (no fatal — the DEV fallback posture documented in auth.ts)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development", AUTH_SECRET: undefined }));
    expect(report.fatal).toBeNull();
  });

  it("test + missing secret: SOFT (the unit/e2e batteries run secretless)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "test", AUTH_SECRET: undefined }));
    expect(report.fatal).toBeNull();
  });
});

describe("session-170 (WP-3): the NEXT_PUBLIC_SITE_URL misconfig warning", () => {
  it("production + UNSET site url: the metadata-family warning", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: undefined }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("sitemap");
  });

  it("production + localhost site url: the same warning (the advertised-origin trap)", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("localhost");
  });

  it("production + 127.0.0.1: the same warning", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3000" }));
    expect(report.warnings).toHaveLength(1);
  });

  it("session-42 (S42-6): production + a PUBLIC origin whose string merely contains \"localhost\": NO warning (the false-alarm cure)", () => {
    // The substring form /localhost|127\.0\.0\.1/ tripped this — a
    // real deploy on mylocalhost.example.com (or a query carrying the
    // word) warned "would advertise a localhost origin" falsely. The
    // S22-18 doctrine: a false alarm erodes the warning's authority.
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "https://mylocalhost.example.com" }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });

  it("session-43 (S43-1): production + the trailing-dot loopback spelling WARNS (the FQDN family the S42-6 predicate lost)", () => {
    // new URL("http://localhost.:3000").hostname keeps the trailing
    // dot ("localhost."), so the S42-6 hostname-equality predicate went
    // SILENT on the FQDN spelling the old substring form caught — a
    // true-positive family lost to the false-alarm cure (live-probed:
    // old true / new false). The dot-strip restores it. The bare
    // no-port spelling rides the same arm.
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://localhost.:3000" }));
    expect(report.fatal).toBeNull();
    expect(report.warnings.length).toBeGreaterThan(0);
    expect(report.warnings.some((w) => w.includes("localhost"))).toBe(true);
  });

  it("development + localhost site url: NO warning (localhost IS the dev origin)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development" }));
    expect(report.warnings).toHaveLength(0);
  });
});

describe("session-10 (F10-11): the malformed NEXT_PUBLIC_SITE_URL shape warning", () => {
  // A schemeless/unschemable value used to pass this gate silently and
  // then throw inside `new URL(siteUrl())` in the ROOT LAYOUT's
  // metadataBase — every route 500s from one operator typo. Malformed is
  // ALWAYS wrong (unlike the unset/localhost family, which is a
  // production-only posture issue), so the warning fires in dev too —
  // the earliest moment the operator can see it.

  it("production + a schemeless value: the malformed-shape warning", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "viralpost.example.com" }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("could not be parsed");
  });

  it("development + a schemeless value: the SAME warning (malformed is always wrong)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development", NEXT_PUBLIC_SITE_URL: "viralpost.example.com" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("could not be parsed");
  });

  it("a non-http(s) scheme warns the same way (the metadata family only composes http origins)", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "ftp://viralpost.example.com" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("could not be parsed as an http(s) origin");
  });

  it("a well-formed https origin: no warning", () => {
    const report = bootEnvCheck(env());
    expect(report.warnings).toHaveLength(0);
  });
});

describe("session-170 (WP-3) + session-3 (F3-1): the flag-typo guard (the scandihaven port, warn form)", () => {
  it("the closed known set is the documented 3-knob family", () => {
    expect([...KNOWN_VIRALPOST_VARS].sort()).toEqual([
      "VIRALPOST_DISABLE_IN_APP_OTP",
      "VIRALPOST_DISABLE_IN_APP_RESET",
      "VIRALPOST_PROXY_HOPS",
    ]);
  });

  it("an UNKNOWN VIRALPOST_* var warns (a mistyped kill switch would silently no-op — the session-3 gap)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_INAPP_OTP: "1" })); // the typo form
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_INAPP_OTP");
    expect(report.warnings[0]).toContain("known knobs");
  });

  it("a LEGACY NEO_* knob warns with the rename hint and its live spelling (the code reads VIRALPOST_*)", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "2" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_PROXY_HOPS");
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
    expect(report.warnings[0]).toContain("instead");
  });

  it("an unmappable legacy NEO_* name gets the general known-knob guidance", () => {
    const report = bootEnvCheck(env({ NEO_DISABLE_INAPP_OTP: "1" })); // legacy prefix + the typo form
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_DISABLE_INAPP_OTP");
    expect(report.warnings[0]).toContain("known knobs");
  });

  it("unrelated env names (NODE_ENV, DATABASE_URL, NEXT_*) never trip the prefix scans", () => {
    const report = bootEnvCheck(
      env({ NODE_ENV: "production", DATABASE_URL: "file:../db/custom.db", NEXT_RUNTIME: "nodejs" }),
    );
    expect(report.warnings).toHaveLength(0);
  });

  it("the KNOWN knobs at their documented values: no warning", () => {
    const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: "2", VIRALPOST_DISABLE_IN_APP_OTP: "1" }));
    expect(report.warnings).toHaveLength(0);
  });

  it("VIRALPOST_DISABLE_IN_APP_OTP with an off-vocabulary value warns (only ''/'1' are meaningful)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_OTP: "true" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_OTP");
    expect(report.warnings[0]).toContain("true");
  });

  it("VIRALPOST_PROXY_HOPS unparsable warns (the seam fails closed onto 1 — the boot warning adds visibility)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: "abc" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
  });

  it("VIRALPOST_PROXY_HOPS negative warns the same way", () => {
    const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: "-1" }));
    expect(report.warnings).toHaveLength(1);
  });

  // Session-39 (S39-13): the case-variant arm — env keys are
  // case-sensitive, so a lower/mixed-case spelling is invisible to BOTH
  // the exact-case reader and the two prefix scans above: an operator
  // can believe delivery is disabled while the OTP keeps riding the
  // responses, with no [boot] warning (the S13-1 polarity genus, one
  // spelling away).
  it("a case-variant viralpost knob warns with the canonical ALL-CAPS spelling (the silent-inert class)", () => {
    // The base env keeps the canonical knobs at "1" — the operator ADDED
    // the lowercase spelling alongside (the realistic copy-paste shape),
    // so exactly ONE warning fires (the case-variant; the canonical key
    // stays known and valid).
    const report = bootEnvCheck(env({ viralpost_disable_in_app_otp: "1" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("viralpost_disable_in_app_otp");
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_OTP");
    expect(report.warnings[0]).toContain("case-sensitive");
  });

  it("a case-variant legacy neo knob warns and maps the live VIRALPOST spelling", () => {
    const report = bootEnvCheck(env({ neo_proxy_hops: "2" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("neo_proxy_hops");
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
  });

  // Session-40 (S40-1): the case-variant arm now covers the WHOLE
  // six-knob contract — the S39-13 arm matched only the viralpost_/
  // neo_ prefixes, so a case-variant spelling of AUTH_SECRET /
  // NEXT_PUBLIC_SITE_URL / DATABASE_URL was invisible to every arm
  // (the DATABASE_URL face was the sharpest: zero signal in any mode
  // — runtimeDatabaseUrl() silently falls to the .env value while the
  // operator believes they configured the environment's knob). The
  // realistic shape is the lowercase spelling ADDED alongside the
  // healthy canonical knobs (the builder's base), so exactly ONE
  // warning fires per pin.
  it("S40-1: a case-variant AUTH_SECRET warns and maps the canonical spelling", () => {
    const report = bootEnvCheck(env({ auth_secret: "b".repeat(32) }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("auth_secret");
    expect(report.warnings[0]).toContain("AUTH_SECRET");
    expect(report.warnings[0]).toContain("case-sensitive");
    expect(report.warnings[0]).toContain("Set AUTH_SECRET instead");
  });

  it("S40-1: a case-variant NEXT_PUBLIC_SITE_URL warns and maps the canonical spelling", () => {
    const report = bootEnvCheck(env({ next_public_site_url: "https://viralpost.example.com" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("next_public_site_url");
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("Set NEXT_PUBLIC_SITE_URL instead");
  });

  it("S40-1: a case-variant DATABASE_URL warns and maps the canonical spelling", () => {
    const report = bootEnvCheck(env({ database_url: "file:../db/other.db" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("database_url");
    expect(report.warnings[0]).toContain("DATABASE_URL");
    expect(report.warnings[0]).toContain("Set DATABASE_URL instead");
  });

  // Session-40 (S40-2): the NEO_ branch's canonical mapping now
  // uppercases the tail — an exact-NEO_-prefix mixed-tail key
  // (NEO_Proxy_Hops) previously failed KNOWN_VIRALPOST_VARS.has(mapped)
  // and landed in the dead-end "no knob maps" branch instead of the
  // actionable mapping (the S39-13 arm's uppercase, one spelling away).
  it("S40-2: an exact-prefix mixed-tail NEO_ key maps the canonical spelling (not the dead-end branch)", () => {
    const report = bootEnvCheck(env({ NEO_Proxy_Hops: "2" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_Proxy_Hops");
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
    expect(report.warnings[0]).toContain("Set VIRALPOST_PROXY_HOPS instead");
    expect(report.warnings[0]).not.toContain("no knob maps");
  });

  // Session-41 (S41-4): the exact-prefix mixed-tail shape on the
  // VIRALPOST_ face — the S40-2 cure's sibling. An exact
  // VIRALPOST_-prefix key with a mixed-case tail (VIRALPOST_proxy_hops)
  // used to land in the "Unknown VIRALPOST_*" arm ("A typo here
  // silently no-ops") instead of the case-variant vocabulary's
  // actionable mapping — the operator configured a REAL knob with the
  // wrong casing and got the generic typo guidance without the exact
  // spelling the code reads.
  it("S41-4: an exact-prefix mixed-tail VIRALPOST_ key maps the canonical spelling (not the Unknown arm)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_proxy_hops: "2" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_proxy_hops");
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
    expect(report.warnings[0]).toContain("Set VIRALPOST_PROXY_HOPS instead");
    expect(report.warnings[0]).not.toContain("Unknown VIRALPOST_*");
  });
});

describe("session-9 (F9-1): the UNSET-proxy-hops trust-default warning (the direct-exposure hazard)", () => {
  // The gap: unset (the shipped default) = trust depth 1 — "exactly one
  // appending proxy." On a DIRECT-exposure deployment the whole
  // x-forwarded-for header is client-supplied, so rotating fake XFF
  // values mints a fresh limiter bucket per request — every per-IP wall
  // bypassable. The seam cannot know the topology; the boot gate CAN
  // make the operator declare it (the NEXT_PUBLIC_SITE_URL precedent —
  // warn, never fatal).
  it("production + UNSET hops: the declare-your-topology warning (names the direct-exposure fix)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: undefined }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("[boot]");
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
    expect(report.warnings[0]).toContain("0");
    expect(report.warnings[0]).toMatch(/direct exposure/i);
  });

  it("production + EMPTY hops: the same warning (the .env.example default is the empty string)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: "" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_PROXY_HOPS");
  });

  it("production + DECLARED hops (0, 1, 2): no warning — the topology is explicit", () => {
    for (const hops of ["0", "1", "2"]) {
      const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: hops }));
      expect(report.warnings, `hops=${hops}`).toHaveLength(0);
    }
  });

  it("development + unset hops: NO warning (dev boots behind no proxy contract)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development", VIRALPOST_PROXY_HOPS: undefined }));
    expect(report.warnings).toHaveLength(0);
  });
});

describe("session-13 (S13-1): the unset in-app-delivery warning (the live-token-in-response hazard)", () => {
  // The polarity gap: both kill-switches ship "" (ENABLED) in
  // .env.example — the self-hosted demo posture. On a production boot
  // with them unset, forgot-password returns a LIVE reset link for any
  // known email and resend returns a fresh OTP for any unverified
  // account (verify then signs in) — anyone who can reach the API can
  // take over any known account. The boot gate warned for strictly less
  // dangerous knobs (the unset-hops direct-exposure hazard, F9-1) but
  // not these. The cure mirrors that precedent exactly: warn, never
  // fatal (the demo posture is a legitimate deployment — "a bad toggle
  // must never take a working deployment down"); production must
  // DECLARE the posture.
  it("production + UNSET OTP knob: the warning (names the knob, the hazard, and the =1 fix)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_OTP: undefined }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("[boot]");
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_OTP");
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_OTP=1");
  });

  it("production + EMPTY reset knob: the same warning for the reset side (the .env.example default)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_RESET: "" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_RESET");
    expect(report.warnings[0]).toContain("VIRALPOST_DISABLE_IN_APP_RESET=1");
  });

  it("production + BOTH knobs unset: one warning each (per-knob arms, like the off-vocab family)", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_OTP: undefined, VIRALPOST_DISABLE_IN_APP_RESET: undefined }));
    expect(report.warnings).toHaveLength(2);
  });

  it("production + both knobs at \"1\" (the declared mail-transport posture): no warning", () => {
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_OTP: "1", VIRALPOST_DISABLE_IN_APP_RESET: "1" }));
    expect(report.warnings).toHaveLength(0);
  });

  it("development + unset knobs: NO warning (the demo posture IS the dev default)", () => {
    const report = bootEnvCheck(
      env({ NODE_ENV: "development", VIRALPOST_DISABLE_IN_APP_OTP: undefined, VIRALPOST_DISABLE_IN_APP_RESET: undefined }),
    );
    expect(report.warnings).toHaveLength(0);
  });

  it("production + an off-vocabulary value: no SECOND warning (the off-vocab arm owns that face — one owner)", () => {
    // "true" behaves as unset (= delivery enabled), but the off-vocab
    // arm already warns for it and its message explains the value is
    // meaningless — this arm must not double-pin that face.
    const report = bootEnvCheck(env({ VIRALPOST_DISABLE_IN_APP_OTP: "true" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("silently behaves as unset");
  });
});

// ---------------------------------------------------------------------------
// Session-58 (S58-1; the census tail re-spelled session-62, S62-1):
// the DATABASE_URL unclosed-quote residue warning.
// The S57-1 span genus was SILENT at boot — the one standing genus with
// zero boot-level signal while every lesser hazard warns. The loader
// census (this round's own probes, ambient env unset, both quote
// chars): bun 1.3.14 SPANS the S3 shape (an embedded NEWLINE rides the
// value) and keeps the leading quote on the single-line-unclosed shape;
// @next/env NEVER spans — TRUE — and the single-line-unclosed value
// rides the process env when a loader consumed the file (the S61-1
// probe truth; the file-face arm's real coverage is the unloaded-.env
// postures). Both residues are loader
// spellings of the ONE operator typo; the pins split by residue face
// (and by mode) so each plant REDs exactly its own pin.
// ---------------------------------------------------------------------------
describe("session-58 (S58-1): the DATABASE_URL unclosed-quote residue warning (the S57-1 span genus made loud)", () => {
  it("the SPAN residue (bun's census: an embedded newline in the value, both quote-char spellings) warns", () => {
    // bun's S3-span values — the double- and single-quote spellings.
    const doubleQuoted = bootEnvCheck(env({ DATABASE_URL: 'file:../db/custom.db\nOTHER="quoted value' }));
    expect(doubleQuoted.warnings).toHaveLength(1);
    expect(doubleQuoted.warnings[0]).toContain("[boot] DATABASE_URL=");
    expect(doubleQuoted.warnings[0]).toContain("unclosed quote");
    expect(doubleQuoted.warnings[0]).toContain("P2021");

    const singleQuoted = bootEnvCheck(env({ DATABASE_URL: "file:../db/custom.db\nOTHER='quoted value" }));
    expect(singleQuoted.warnings).toHaveLength(1);
    expect(singleQuoted.warnings[0]).toContain("unclosed quote");
  });

  it("the LEADING-QUOTE residue (@next/env's census: the quote kept on the value, both chars) warns; every documented clean shape stays silent", () => {
    // @next/env's kept-residue — the double- and single-quote spellings.
    expect(bootEnvCheck(env({ DATABASE_URL: '"file:../db/custom.db' })).warnings).toHaveLength(1);
    const singleQuote = bootEnvCheck(env({ DATABASE_URL: "'file:../db/custom.db" }));
    expect(singleQuote.warnings).toHaveLength(1);
    expect(singleQuote.warnings[0]).toContain("unclosed quote");
    // The clean shapes never warn: the .env contract value, the e2e
    // override, the :memory: pass-through, an absolute override.
    expect(bootEnvCheck(env()).warnings).toHaveLength(0);
    expect(bootEnvCheck(env({ DATABASE_URL: "file:../db/e2e.db" })).warnings).toHaveLength(0);
    expect(bootEnvCheck(env({ DATABASE_URL: "file::memory:" })).warnings).toHaveLength(0);
    expect(bootEnvCheck(env({ DATABASE_URL: "file:/var/lib/viralpost/custom.db" })).warnings).toHaveLength(0);
  });

  it("development mode warns TOO (the F10-11 doctrine: a malformed value is always wrong — the operator edits .env in dev)", () => {
    // Co-pin note (the N12-2 doctrine): this pin rides the LEADING-QUOTE
    // residue's fixture by choice — its OWN face is the MODE (a
    // prod-only gate is the plausible "cure" that would regress it; the
    // mode-gate plant REDs exactly this pin, the production-defaulted
    // span/leading pins staying green under it). The quote-disjunct
    // plant trips this pin alongside the leading-quote pin (the
    // documented co-pinning, battery on record session-58).
    const report = bootEnvCheck(env({ NODE_ENV: "development", DATABASE_URL: '"file:../db/custom.db' }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("unclosed quote");
  });
});

// ---------------------------------------------------------------------------
// Session-59 (S59-1; the premise re-spelled session-62, S62-1): the
// .env-FILE-face residue arm + the mechanism-truth
// split. The S58-1 warning reads only the PROCESS-ENV face — but
// there are UNLOADED-.env postures the process env cannot see (no
// sanctioned loader consumed the file — the S62-1 re-spell; the
// session-58 census's loader-drops tail was falsified by the
// session-61 probe), and in those postures the db-path
// seam's own .env parse keeps the leading quote and hands the engine
// the value RAW (the session-59 live probe: resolved
// `"file:../db/custom.db`, PrismaClientInitializationError at the
// first invocation). Two cures, one seam: the file-face arm (the pure
// databaseUrlFileResidueWarning + the server wrapper) and the per-face
// mechanism split of the S58-1 message (the junk-file sentence is the
// bun SPAN face's truth; the leading-quote face never re-anchors).
// ---------------------------------------------------------------------------
describe("session-59 (S59-1): the .env-FILE-face residue arm (the unloaded-.env postures the process-env arm cannot see)", () => {
  it("the FILE-FACE residue (no sanctioned loader consumed this .env, the .env parse kept the quote — both quote chars) warns; clean file values with an unset env face stay silent", () => {
    // Session-61 (S61-1) re-anchor (the verbatim falsified quote
    // removed session-62, S62-1): the S58-1 loader census clause's
    // loader-drops tail was
    // FALSIFIED by a direct probe of the repo's own @next/env 16.4.2 —
    // it KEEPS the leading-quote value in process.env on every
    // unclosed shape (both quote chars, dev:true and dev:false). The
    // file-face arm's REAL coverage is the unloaded-.env postures
    // (the S51-1 launch-dir family): this pin fires with the process
    // env UNSET, the .env file value carrying the kept leading quote.
    const doubleQuoted = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db');
    expect(doubleQuoted).toContain("[boot]");
    expect(doubleQuoted).toContain("unclosed quote");
    expect(doubleQuoted).toContain("no sanctioned loader consumed this .env");
    expect(doubleQuoted).not.toContain("the env loader dropped the line");
    expect(doubleQuoted).toContain("PrismaClientInitializationError");
    expect(doubleQuoted).toContain("close the quote");

    const singleQuoted = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "'file:../db/custom.db");
    expect(singleQuoted).toContain("unclosed quote");

    // The clean file values never warn with an unset env face: the
    // .env contract value (the launch-recovery posture — the seam
    // consumes the clean .env value), the e2e override, an absolute
    // value, and no DATABASE_URL line at all.
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:../db/custom.db")).toBeNull();
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:../db/e2e.db")).toBeNull();
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:/var/lib/viralpost/custom.db")).toBeNull();
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production" }, undefined)).toBeNull();
  });

  it("the ENV-FACE guard: a SET process env keeps the file arm silent (the S58-1 arm owns the residue face; a clean override means the file value never reaches the engine)", () => {
    // Co-pin note (the N12-2 doctrine): the residue-in-env arm here is
    // the S58-1 leading-quote pin's face — this pin's OWN face is the
    // guard (dropping it double-warns the env face and false-alarms
    // the clean-override face; the envUrl-guard plant REDs exactly
    // this pin, the S58-1 pins staying green under it).
    const envResidue = bootEnvCheck(env({ DATABASE_URL: '"file:../db/custom.db' }));
    expect(envResidue.warnings).toHaveLength(1); // the S58-1 arm's warning — exactly one
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production", DATABASE_URL: '"file:../db/custom.db' }, '"file:../db/custom.db')).toBeNull();
    // A CLEAN override wins at runtime (effectiveDatabaseUrl's envUrl
    // ?? envFileUrl tail) — the file residue is inert, warning about
    // it would be a false alarm.
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production", DATABASE_URL: "file:../db/e2e.db" }, '"file:../db/custom.db')).toBeNull();
    expect(databaseUrlFileResidueWarning({ NODE_ENV: "production", DATABASE_URL: "file:/var/lib/viralpost/custom.db" }, "'file:../db/custom.db")).toBeNull();
  });

  it("development mode warns TOO (the F10-11 doctrine — the operator edits .env in dev)", () => {
    // This pin's OWN face is the MODE (a prod-only gate is the
    // plausible "cure" that would regress it; the mode-gate plant
    // REDs exactly this pin). Co-pin note (the N12-2 doctrine): the
    // quote-disjunct plant trips this pin alongside the file-face pin
    // — it rides the leading-quote fixture by choice, exactly the
    // session-58 dev pin's documented co-pinning shape (battery on
    // record this round: plant 1 REDs pins 1+3, plant 4 REDs exactly
    // pin 3).
    const warning = databaseUrlFileResidueWarning({ NODE_ENV: "development" }, '"file:../db/custom.db');
    expect(warning).toContain("unclosed quote");
  });

  it("the MECHANISM-TRUTH split: the leading-quote face names the raw pass-through + the engine rejection, NOT the junk-file sentence; the span face keeps its own truth", () => {
    // The session-59 live probe: the leading-quote value is NOT a
    // file: URL, so resolveDatabaseUrl passes it through raw and the
    // engine answers PrismaClientInitializationError — the S58-1
    // message's junk-file sentence (the bun span face's truth)
    // misdirects the operator toward a file that will not exist.
    const leading = bootEnvCheck(env({ DATABASE_URL: '"file:../db/custom.db' })).warnings[0];
    expect(leading).toContain("passes it through raw");
    expect(leading).toContain("PrismaClientInitializationError");
    expect(leading).not.toContain("junk-named file");
    expect(leading).not.toContain("P2021");

    // The span (control-char) face KEEPS the junk-file mechanism — the
    // S57-1 live-probed genus (the newline-embedded value still carries
    // the file: prefix, so the anchors re-anchor it into the junk-named
    // file; SELECT 1 answers; the first User query P2021s).
    const span = bootEnvCheck(env({ DATABASE_URL: 'file:../db/custom.db\nOTHER="quoted value' })).warnings[0];
    expect(span).toContain("junk-named file");
    expect(span).toContain("P2021");
  });
});

// ---------------------------------------------------------------------------
// Session-60 (S60-1): the control-char attribution split. The S58-1/S59-1
// messages headline "carries an unclosed quote residue" and prescribe
// "close the quote" for EVERY trigger face — but the predicate fires on
// quote-free control-char values too (a pasted tab in an unquoted .env
// line), and for THAT face the quote fix does nothing. The round's
// probes (bootEnvCheck + parseEnvFile + resolveDatabaseUrl, ambient env
// unset): a tab-bearing `file:` value re-anchors into the junk-named
// file exactly like the newline span (the S57-1 genus, same code path);
// a tab-bearing non-`file:` value passes through raw. The `file:`
// branch of the S58-1 arm is reachable ONLY by control-char values (a
// leading-quote value can never start with `file:`), so its "unclosed
// quote" headline was false for every value that reached it. The split:
// the NEWLINE face keeps the unclosed-quote story (an unclosed quote in
// .env spanning lines is the usual cause — TRUE for that face); every
// OTHER control-char face gets its own attribution + its own fix.
// ---------------------------------------------------------------------------
describe("session-60 (S60-1): the control-char attribution split (the tab face gets its own truth)", () => {
  it("Pin 1 — the PROCESS-ENV tab face (file: branch): the CONTROL-CHARACTER attribution, the junk-file mechanism, the remove-the-character fix; the NEWLINE face keeps the unclosed-quote story (the discriminator pair)", () => {
    // The round's probe: a tab-bearing file: value, no quote anywhere.
    const tab = bootEnvCheck(env({ DATABASE_URL: "file:../db/custom.db\tjunk" })).warnings[0];
    expect(tab).toContain("[boot] DATABASE_URL=");
    expect(tab).toContain("control character");
    expect(tab).not.toContain("unclosed quote");
    // The mechanism stays the S57-1 genus (the seam probe re-anchored the
    // tab-bearing value into the junk-named file — SELECT 1 answers, the
    // first User query P2021s).
    expect(tab).toContain("junk-named file");
    expect(tab).toContain("P2021");
    // The fix is the tab face's own — never the quote face's.
    expect(tab).toContain("remove the control character");
    expect(tab).not.toContain("close the quote");

    // The NEWLINE face (the S57-1 span genus) KEEPS the unclosed-quote
    // story — an unclosed quote in .env spanning lines IS the usual cause
    // of an embedded newline, and closing it is the working fix.
    const span = bootEnvCheck(env({ DATABASE_URL: 'file:../db/custom.db\nOTHER="quoted value' })).warnings[0];
    expect(span).toContain("unclosed quote");
    expect(span).toContain("close the quote");
    expect(span).toContain("P2021");
  });

  it("Pin 2 — the PROCESS-ENV tab face (non-file: branch): the CONTROL-CHARACTER attribution, the raw pass-through mechanism, the remove-the-character fix", () => {
    const tab = bootEnvCheck(env({ DATABASE_URL: "postgresql://u:p@h:5432/db\tjunk" })).warnings[0];
    expect(tab).toContain("control character");
    expect(tab).not.toContain("unclosed quote");
    // The mechanism stays the S59-1 leading-quote face's — a non-file:
    // residue passes through raw, the engine rejects it at first contact.
    expect(tab).toContain("passes it through raw");
    expect(tab).toContain("PrismaClientInitializationError");
    expect(tab).toContain("remove the control character");
    expect(tab).not.toContain("close the quote");
    expect(tab).not.toContain("junk-named file");
  });

  it("Pin 3 — the FILE-FACE tab arm: the CONTROL-CHARACTER attribution with the per-branch mechanism (file:-prefixed → junk-file re-anchor, the round's parseEnvFile + seam probes; non-file: → raw pass-through); the leading-quote face keeps its own truth", () => {
    // The round's parseEnvFile census: an unquoted tab-bearing .env line
    // parses to the file:-prefixed, tab-bearing value — so the file-face
    // CAN carry a control char (the S59-1 comment claimed only the
    // leading quote was possible), and THAT shape re-anchors into the
    // junk-named file (the seam probe), NOT the raw pass-through the
    // message claimed for every face.
    const tabFile = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:../db/custom.db\tjunk");
    expect(tabFile).toContain("control character");
    expect(tabFile).not.toContain("unclosed quote");
    expect(tabFile).toContain("junk-named file");
    expect(tabFile).toContain("P2021");
    expect(tabFile).not.toContain("passes it through raw");
    expect(tabFile).not.toContain("PrismaClientInitializationError");
    expect(tabFile).toContain("remove the control character");
    expect(tabFile).not.toContain("close the quote");

    // The non-file: control-char file-face sub-shape (an unquoted
    // postgres URL with a tab) rides the raw pass-through mechanism.
    const tabNonFile = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "postgresql://u:p@h:5432/db\tjunk");
    expect(tabNonFile).toContain("control character");
    expect(tabNonFile).not.toContain("unclosed quote");
    expect(tabNonFile).toContain("passes it through raw");
    expect(tabNonFile).toContain("PrismaClientInitializationError");
    expect(tabNonFile).not.toContain("junk-named file");
    expect(tabNonFile).toContain("remove the control character");
    expect(tabNonFile).not.toContain("close the quote");

    // The leading-quote face keeps its own story untouched (the existing
    // S59-1 pins own it; this is the pair's other side).
    const quote = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db');
    expect(quote).toContain("unclosed quote");
    expect(quote).toContain("close the quote");
    expect(quote).toContain("PrismaClientInitializationError");
  });
});

describe("session-170 (WP-3): applyBootEnvReport — the warnings print, the fatal throws", () => {
  it("the fatal throws the message verbatim (the [boot] family)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: undefined }));
    expect(() => applyBootEnvReport(report, { logger: console })).toThrow(report.fatal as string);
  });

  it("the warnings print once each via the injectable logger; a clean report prints nothing", () => {
    const printed: string[] = [];
    const logger = { warn: (msg: string) => printed.push(msg) };
    applyBootEnvReport(bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: undefined })), { logger });
    expect(printed).toHaveLength(1);
    applyBootEnvReport(bootEnvCheck(env()), { logger });
    expect(printed).toHaveLength(1); // no new lines
  });
});

describe("session-170 (WP-3): the instrumentation hook (the Next form, source-pinned)", () => {
  const hook = read("src/instrumentation.ts");

  it("exports register() and skips the edge runtime + the build workers", () => {
    expect(hook).toContain("export async function register()");
    expect(hook).toContain('NEXT_RUNTIME === "edge"');
    expect(hook).toContain('NEXT_PHASE === "phase-production-build"');
  });

  it("dynamically imports the seam (the standalone bundle traces it)", () => {
    expect(hook).toContain('import("./lib/boot-env")');
    expect(hook).toContain("applyBootEnvReport");
  });

  it("session-59 (S59-1): wires the file-face residue warnings after the shadow warnings", () => {
    expect(hook).toContain("databaseUrlFileResidueWarningsForServer");
  });
});

describe("session-22: the boot-warning precision batch", () => {
  it("S22-18: the hops warning fires ONLY on values the rate-limit seam cannot parse — parseInt-accepted forms stay silent", () => {
    // proxyHopDepth parses with Number.parseInt: "+1", " 1", and "0x2"
    // all resolve (2, 1, 2). The boot gate's old /^\\d+$/ predicate
    // warned "unparsable" for every one of them — a false alarm that
    // eroded the warning's authority. The predicate now mirrors the
    // seam's own parse.
    for (const hops of ["+1", " 1", "0x2"]) {
      const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: hops }));
      expect(report.warnings, `hops="${hops}" should not warn`).toHaveLength(0);
    }
    // The genuinely unparsable + negative faces still warn. ("1.5" and
    // "1abc" stay silent too — parseInt truncates exactly like the seam.)
    for (const hops of ["abc", "-1", "xyz2"]) {
      const report = bootEnvCheck(env({ VIRALPOST_PROXY_HOPS: hops }));
      expect(report.warnings.some((w) => w.includes("VIRALPOST_PROXY_HOPS")), `hops="${hops}" must warn`).toBe(true);
    }
  });

  it("S22-19: a path-carrying NEXT_PUBLIC_SITE_URL warns (the origin-only contract)", () => {
    // siteUrl() only strips trailing slashes — "https://x.com/base"
    // parses as an origin yet flows into metadataBase/canonical
    // composition as a PREFIX, and the two surfaces compose differently
    // (new URL path-resolution vs twitter:url string-concat). The boot
    // gate now names the shape.
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "https://viralpost.example.com/base" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("path");
  });

  it("S25-4: a query-carrying NEXT_PUBLIC_SITE_URL warns (the non-bare-origin contract)", () => {
    // The S22-19 blind spot: "https://x.com?utm=1" parses with
    // pathname "/" so the pathCarrying check passed silently — yet the
    // query rode unescaped into /sitemap.xml's <loc> (invalid XML) and
    // every og:url/canonical composition. The boot gate names the
    // shape; the site seam falls back (pinned in page-titles).
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "https://viralpost.example.com?utm=1&x=2" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("query");
  });
});

// ---------------------------------------------------------------------------
// Session-47 (S47-2): the shadowing-env-file warning seam — AUDIT-1's L2:
// the db-path seam's recovery signature reads only .env, so a DATABASE_URL
// in a shadowing .env.local/.env.<NODE_ENV> is honored as an unvalidated
// override with zero operator signal. The seam is pure over (dir, env,
// exists) — the injectable-exists pattern (cwdFallbackUrl's, session-45).
// ---------------------------------------------------------------------------
describe("session-47 (S47-2): the shadowing-env-file warning seam", () => {
  it("warns for each shadowing file found, never for .env itself, and de-dups the NODE_ENV candidate", () => {
    const found = new Set(["/repo/.env.local", "/repo/.env.development", "/repo/.env"]);
    const warnings = shadowingEnvFileWarnings(
      "/repo",
      { NODE_ENV: undefined },
      (p) => found.has(p),
    );
    // NODE_ENV unset → the candidate is .env.development; .env.local +
    // .env.development warn; the .env file itself NEVER warns.
    expect(warnings).toHaveLength(2);
    expect(warnings.some((w) => w.includes(".env.local"))).toBe(true);
    expect(warnings.some((w) => w.includes(".env.development"))).toBe(true);
    expect(warnings.some((w) => w.includes(".env "))).toBe(false);
  });

  it("derives the NODE_ENV candidate and warns empty when only .env exists", () => {
    const onlyDotEnv = (p: string) => p === "/repo/.env";
    expect(shadowingEnvFileWarnings("/repo", { NODE_ENV: "production" }, onlyDotEnv)).toEqual([]);
    const withProdLocal = (p: string) => p === "/repo/.env.production";
    const warnings = shadowingEnvFileWarnings("/repo", { NODE_ENV: "production" }, withProdLocal);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain(".env.production");
    // The doctrine sentence: the warning names the .env-only recovery
    // signature face (the operator's actionable bit).
    expect(warnings[0]).toContain("reads only .env");
  });

  // The S29-2 source-census idiom: the wiring — that register() actually
  // consumes the seam — is pinned textually (the unit environment cannot
  // boot instrumentation.ts; the edge-compile calibration moved the cwd
  // read into the server wrapper, so the wiring face is the wrapper call).
  it("the instrumentation wiring consumes the seam (the S29-2 source-census idiom)", () => {
    const src = readFileSync(
      join(import.meta.dirname, "..", "src", "instrumentation.ts"),
      "utf-8",
    );
    expect(src).toContain("shadowingEnvFileWarningsForServer(process.env)");
    // Warn-only: the wiring must print, never throw on the shadow face.
    expect(src).toContain("for (const warning of shadowingEnvFileWarningsForServer(process.env)) {");
    expect(src).toContain("console.warn(warning);");
    // And the cwd read lives behind the dynamic import boundary, never
    // in this file's own body (the edge-compile calibration) — asserted
    // against the comment-stripped source so this very pin's own
    // calibration prose (which names the API) cannot trip it.
    const stripped = src.replace(/\/\/[^\n]*/g, "");
    expect(stripped).not.toContain("process.cwd()");
  });
});

// ---------------------------------------------------------------------------
// Session-48 (S48-2, AUDIT-1 M2): the shadow-env cascade mirror. Next's
// CO-PIN MAP (the N12-2 doctrine): both pins below consume the SAME
// `.env.${mode}.local` candidate — a defect in that candidate trips
// BOTH (the battery proved exactly 2 RED on the candidate-drop plant);
// the shared candidate IS the cascade mirror, so the co-pin is by
// design, documented here.
// actual env-file order (verified in the installed @next/env loadEnvConfig)
// is [.env.${d}.local, d!=="test"&&.env.local, .env.${d}, ".env"] — the
// S47-2 seam checked two of the four files, so an operator following the
// standard convention (a DATABASE_URL in .env.production.local, the FIRST
// file loaded, beating .env.local and .env) got ZERO warning — the exact
// case the seam exists to name. The candidates now mirror the cascade
// minus .env itself; the test-mode skip mirrors Next exactly.
// ---------------------------------------------------------------------------
describe("session-48 (S48-2): the shadow-env cascade mirror", () => {
  it("the highest-priority member warns: .env.production.local (the file the S47-2 seam missed)", () => {
    // Only .env.production.local exists — the first file in Next's real
    // cascade. Under the S47-2 candidates this warned NOTHING (the seam's
    // primary documented case, live-missed).
    const onlyProdModeLocal = (p: string) => p === "/repo/.env.production.local";
    const warnings = shadowingEnvFileWarnings("/repo", { NODE_ENV: "production" }, onlyProdModeLocal);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain(".env.production.local");
    expect(warnings[0]).toContain("reads only .env");
  });

  it("the test-mode skip mirrors Next: .env.local is not a candidate under NODE_ENV=test (and .env.test still is)", () => {
    // Next skips .env.local when d==="test" (loadEnvConfig's
    // d!=="test"&&".env.local" arm) — a test run never loads it, so a
    // stray .env.local cannot shadow anything there; warning for it
    // would be noise. .env.test.local and .env.test stay candidates.
    const found = new Set(["/repo/.env.local", "/repo/.env.test", "/repo/.env.test.local", "/repo/.env"]);
    const warnings = shadowingEnvFileWarnings("/repo", { NODE_ENV: "test" }, (p) => found.has(p));
    expect(warnings.some((w) => w.includes(".env.local ") || w.includes(" .env.local"))).toBe(false);
    expect(warnings.some((w) => w.includes(".env.test.local"))).toBe(true);
    expect(warnings.some((w) => w.includes(".env.test"))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Session-50 (S50-1, AUDIT-1 M1): the launch-dir shadow union. The
// standalone server.js runs process.chdir(__dirname) BEFORE next loads,
// so at register() time the cwd sits in .next/standalone — a cwd-only
// probe never sees the LAUNCH dir (the repo root) where bun loaded the
// env files, and the S47-2 warning was inert for repo-root shadow files
// in the flagship bun-run-start posture (the exact "operator believes
// .env is the source of truth, silently wrong, zero signal" hazard the
// seam exists to surface). The wrapper now probes the DEDUPED union of
// the cwd and PWD (bun inherits PWD = the launch cwd; the chdir never
// updates it). Behavioral pin: real temp dirs + chdir + PWD, restored
// in finally.
// ---------------------------------------------------------------------------
describe("session-50 (S50-1): the launch-dir shadow union", () => {
  it("the server wrapper warns for a launch-dir shadow file even after the standalone chdir moved the cwd", () => {
    const launchDir = mkdtempSync(join(tmpdir(), "s50-launch-"));
    const artifactDir = mkdtempSync(join(tmpdir(), "s50-artifact-"));
    writeFileSync(join(launchDir, ".env.production"), "AUTH_SECRET=launch-dir-value\n");
    writeFileSync(join(artifactDir, ".env.local"), "AUTH_SECRET=artifact-dir-value\n");
    const prevCwd = process.cwd();
    const prevPwd = process.env.PWD;
    try {
      // The standalone posture: cwd moved into the artifact dir; PWD
      // still names the launch dir (bun inherited it at spawn).
      process.chdir(artifactDir);
      process.env.PWD = launchDir;
      const warnings = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(warnings.some((w) => w.includes(launchDir) && w.includes(".env.production")), "the launch-dir shadow file must warn (the S47-2 hazard, inert pre-S50-1)").toBe(true);
      expect(warnings.some((w) => w.includes(artifactDir) && w.includes(".env.local")), "the cwd-side shadow file keeps warning").toBe(true);
      // The dedupe face: PWD === cwd probes the dir exactly ONCE —
      // an undeduped union would emit the same warning twice.
      process.env.PWD = artifactDir;
      const deduped = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(deduped.filter((w) => w.includes(artifactDir))).toHaveLength(1);
      // Session-51 (S51-1, AUDIT-1 L1): the normalization faces — the
      // same physical dir must not warn twice however PWD spells it,
      // and an uninterpretable relative PWD must never probe at all.
      // The alias face: a symlink spelling of the cwd (pre-cure: the
      // string compare pushed it — two warnings for one physical
      // file; the fs probe follows the symlink).
      const alias = join(launchDir, "s51-alias");
      symlinkSync(artifactDir, alias);
      process.env.PWD = alias;
      const aliased = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(aliased.filter((w) => w.includes(".env.local")), "an alias-spelled PWD of the cwd must not duplicate the warning").toHaveLength(1);
      // The trailing-slash face: resolve() normalizes it onto the
      // cwd (pre-cure: the string compare pushed it as a distinct dir).
      process.env.PWD = `${artifactDir}/`;
      const slashed = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(slashed.filter((w) => w.includes(".env.local")), "a trailing-slash PWD is the same dir — one warning").toHaveLength(1);
      // The dotdot face (Session-52, S52-6; Session-53, S53-1, AUDIT-1
      // F1+F2 — the arm re-spelled to the nonexistent-intermediate
      // form, the mechanism claim corrected): resolve() folds ..
      // segments onto the canonical form — a PWD spelling the cwd
      // through a child-and-back path is the SAME dir, one warning.
      // The fs probe's join() folds the .. lexically in userland (the
      // kernel never sees the dotdot), so the pre-cure tooth needs
      // no real segment: the raw-string form pushed the unfolded
      // spelling and the probe joined THROUGH it, double-warning one
      // physical file whether or not the intermediate exists. The
      // intermediate is deliberately MISSING so the arm owns the
      // resolve()-fold face outright: with resolve() removed the raw
      // spelling survives, statSync ENOENTs on the missing segment
      // (a missing path is real to the kernel), the raw dir is
      // pushed, and the join()-fold probe double-warns — RED; the
      // Session-52 sub form could never RED there (sub resolves —
      // the statSync dedupe masked every resolve-only plant; its
      // battery truth recorded then, the stronger design taken now).
      // The no-dedupe plant still trips this it at the FIRST dedupe
      // arm (the alias face) — the co-pinned family unchanged; the
      // S52-5 statSync identity dedupe folds every alias spelling
      // too — belt-and-braces.
      // Session-54 (S54-6, AUDIT-1 F2): the precondition pin — the
      // arm's exclusive ownership of the resolve()-fold RED tooth
      // depends on the intermediate NOT existing; the invariant was
      // guaranteed only by the arm's own spelling. A future sibling
      // arm that creates a `missing` dir (or a rename colliding with
      // one) would silently re-mask the resolve-only plant — the
      // exact S52→S53 genus. The expect makes the invariant
      // mechanical: the plant REDs HERE first, at the precondition.
      expect(existsSync(join(artifactDir, "missing")), "the dotdot arm's missing intermediate must not exist — the resolve()-fold tooth depends on it (S54-6)").toBe(false);
      process.env.PWD = `${artifactDir}/missing/..`;
      const dotted = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(dotted.filter((w) => w.includes(".env.local")), "a ..-segment PWD folds onto the cwd — one warning").toHaveLength(1);
      // The relative face: uninterpretable (a relative PWD names the
      // SHELL's dir at spawn time) — skipped, never probed. Pre-cure
      // it probed "." and emitted a second, misleading warning.
      process.env.PWD = ".";
      const relative = shadowingEnvFileWarningsForServer({ NODE_ENV: "production" });
      expect(relative.filter((w) => w.includes(".env.local")), "a relative PWD must be skipped, never probed").toHaveLength(1);
    } finally {
      process.chdir(prevCwd);
      if (prevPwd === undefined) delete process.env.PWD;
      else process.env.PWD = prevPwd;
      rmSync(launchDir, { recursive: true, force: true });
      rmSync(artifactDir, { recursive: true, force: true });
    }
  });
});

// ---------------------------------------------------------------------------
// Session-62 (S62-2, AUDIT-1 L3 — live-probed): the PWD-leg
// mechanism-truth split. The wrapper probes the cwd ∪ PWD union, but
// the RUNTIME tail (runtimeDatabaseUrl → readDatabaseUrlFromEnvAt(cwd))
// reads ONLY the server CWD's .env — so a residue found on the PWD leg
// never reaches the engine. The round's live probe (node-booted
// .next/standalone/server.js from the repo root — server.js chdirs
// into the artifact dir while PWD stays at the repo root — a
// single-line-unclosed DATABASE_URL residue .env at the repo root,
// ambient DATABASE_URL unset): the PWD-leg warning FIRED naming
// PrismaClientInitializationError AND the server booted HEALTHY against
// the REAL db (/api/health answered ok:true, db:up) — the predicted
// engine failure never happened; the engine resolved the default URL.
// The consumed-leg (CWD) message stays true — session-59's probe shape.
// The split: the pure seam's third parameter (runtimeConsumesFile,
// default true — every two-arg call is the consumed leg, so the
// S59-1/S60-1/S61-1 pins hold verbatim), the wrapper passing
// d === process.cwd().
// ---------------------------------------------------------------------------
describe("session-62 (S62-2): the PWD-leg mechanism-truth split (the runtime reads only the server CWD's .env)", () => {
  it("the PWD leg names the INERT-RESIDUE truth (the engine never sees it); the CWD leg keeps the per-face mechanism sentences", () => {
    // The PWD-leg quote face: the headline + cause clause + fix stay;
    // the mechanism sentence becomes the posture truth.
    const quotePwd = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db', false);
    expect(quotePwd).toContain("unclosed quote");
    expect(quotePwd).toContain("PWD leg");
    expect(quotePwd).toContain("never sees the residue");
    expect(quotePwd).toContain("no sanctioned loader consumed this .env");
    expect(quotePwd).toContain("close the quote");
    // The mechanism sentences that are false in this posture are absent.
    expect(quotePwd).not.toContain("PrismaClientInitializationError");
    expect(quotePwd).not.toContain("junk-named file");

    // The PWD-leg control-char face keeps its own headline + fix,
    // the same inert-residue mechanism (the canonical S60-1
    // embedded-tab fixture — a trailing tab alone is trimmed clean by
    // the seam's documented parse contract, so the census family
    // carries the tab mid-value with the junk tail).
    const tabPwd = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:../db/custom.db\tjunk", false);
    expect(tabPwd).toContain("control character");
    expect(tabPwd).toContain("PWD leg");
    expect(tabPwd).toContain("remove the control character");
    expect(tabPwd).not.toContain("PrismaClientInitializationError");
    expect(tabPwd).not.toContain("junk-named file");

    // The CWD leg (the two-arg DEFAULT — every existing pin's form —
    // and the explicit true) keeps the S60-1b per-face mechanism
    // verbatim.
    const quoteCwd = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db');
    expect(quoteCwd).toContain("PrismaClientInitializationError");
    expect(quoteCwd).toBe(databaseUrlFileResidueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db', true));
    const tabCwd = databaseUrlFileResidueWarning({ NODE_ENV: "production" }, "file:../db/custom.db\tjunk");
    expect(tabCwd).toContain("junk-named file");
  });

  it("the WRAPPER passes the leg discriminator (d === process.cwd()) — the S29-2 source-census idiom", () => {
    // The wrapper's loop is the only place the leg is knowable; the
    // plant (restore the two-arg call) REDs exactly this pin while
    // S62-2a holds — the pure seam's split untouched.
    const src = readFileSync(join(root, "src", "lib", "boot-env.ts"), "utf8");
    expect(src).toContain("d === process.cwd()");
    expect(src).toContain("runtimeConsumesFile");
  });
});

// Session-63 (S63-1, AUDIT-1 M1 — live-probed): the inert-VALUE divergence
// warning. The S62-2 split's live probe (a healthy boot against the default
// db while a PWD-leg RESIDUE warning fired) left one face unpinned: a CLEAN
// non-default value in a launch-dir .env never warns anywhere — the
// clean-value early return at the residue seam — while the runtime (under a
// node boot with an empty shell env) reads only the server CWD's .env
// (removed from the artifact by the build's hygiene step) and resolves the
// DEFAULT. This round's decisive probe (env -u DATABASE_URL, a schema-only
// db/alt.db with 0 users behind a clean absolute value in the repo .env):
// /api/health answered db:up AND the demo-credentials login answered 200
// with the SEEDED user — the engine served the default db's user from a
// file the operator's .env never named — with ZERO [boot] warnings. The
// S47-2 shadow-file genus, one face deeper: not a shadow FILE, an inert
// VALUE.
describe("session-63 (S63-1): the inert-value divergence warning (a clean non-default .env value the runtime never reads)", () => {
  it("fires ONLY on the non-consumed leg, unset env, clean non-default value — naming the divergence truth + the fix", () => {
    // The firing face: the PWD leg (runtimeConsumesFile: false), the
    // process env unset, a clean non-default value.
    const w = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "file:/srv/viralpost/production.db",
      false,
    );
    expect(w).toContain("file:/srv/viralpost/production.db");
    expect(w).toContain("never read by this server");
    expect(w).toContain("resolves the default");
    expect(w).toContain("file:../db/custom.db");
    expect(w).toContain("bun run start");

    // The non-firing faces, each its own boundary:
    // (a) the consumed leg — the runtime honors the file value there.
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, "file:/srv/x.db", true)).toBeNull();
    // (b) the two-arg default (every legacy call form) — consumed leg.
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, "file:/srv/x.db")).toBeNull();
    // (c) a SET process env owns the signal (the one-owner doctrine —
    // the runtime honors the override; warning would be a false alarm).
    expect(
      databaseUrlInertValueWarning({ NODE_ENV: "production", DATABASE_URL: "file:/env/x.db" }, "file:/srv/x.db", false),
    ).toBeNull();
    // (d) the raw DEFAULT spelling — it lands on the same file the
    // default resolves to (the schema rule), so there is no divergence.
    // The designed approximation: a non-repo PWD carrying the default
    // spelling is the documented false-negative corner (named in the
    // seam's comment) — the .env.example spelling must never warn.
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, "file:../db/custom.db", false)).toBeNull();
    // (e) residue values — the RESIDUE seam owns them (one face one
    // pin); the inert seam stays silent on malformed values.
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, '"file:../db/custom.db', false)).toBeNull();
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, "file:../db/custom.db\tjunk", false)).toBeNull();
    // (f) empty / missing values — nothing to say.
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, undefined, false)).toBeNull();
    expect(databaseUrlInertValueWarning({ NODE_ENV: "production" }, "", false)).toBeNull();
  });

  it("the WRAPPER wires the inert-value seam with the same leg discriminator — the S29-2/S62-2b source-census idiom", () => {
    // The wrapper's loop is the only place the leg is knowable; the
    // plant (drop the call) REDs exactly this pin while the residue
    // arms hold.
    const src = readFileSync(join(root, "src", "lib", "boot-env.ts"), "utf8");
    expect(src).toContain("databaseUrlInertValueWarning(env, envFileUrl, d === process.cwd())");
  });
});

// Session-63 (S63-2, AUDIT-1 L1): the credential redaction. Both residue
// arms interpolate the FULL raw value — and the db-path seam passes
// non-file: URLs through verbatim by design (the documented PostgreSQL
// path), where URLs commonly embed credentials. A malformed credentialed
// URL would print its password to stdout (and `tee server.log` persists
// it). The redaction replaces only the userinfo segment; the residue
// shape (the diagnostic) stays visible.
describe("session-63 (S63-2): the residue-warning credential redaction (the password never prints)", () => {
  it("a credentialed malformed value answers ***@, not the password — on both arms; file: values stay verbatim", () => {
    // The process-env arm: the unclosed-quote residue on a credentialed
    // postgres URL (the leading quote is the residue; the password is
    // the secret).
    const report = bootEnvCheck(env({ DATABASE_URL: '"postgresql://admin:s3cret-pw@db.example.com/prod' }));
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("***@");
    expect(joined).not.toContain("s3cret-pw");
    expect(joined).toContain("db.example.com");

    // The file-face arm (the consumed leg — the CWD .env shape): the
    // same redaction through the prefix.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      '"postgresql://admin:s3cret-pw@db.example.com/prod',
    );
    expect(fileFace).toContain("***@");
    expect(fileFace).not.toContain("s3cret-pw");

    // The file: SQLite contract carries no userinfo — no false
    // redaction (the residue stays verbatim, the S60-1b faces hold).
    const fileValue = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "file:../db/custom.db\tjunk",
    );
    expect(fileValue).toContain("file:../db/custom.db\\tjunk");
  });
});

// Session-64 (S64-1, AUDIT-1 L1 — live-probed): the raw-@ tail. The
// S63-2 regex replaced only up to the FIRST @ in the userinfo, so a
// password containing a raw (unencoded) @ — technically invalid
// userinfo (it should be %40), but exactly the malformed-value class
// these arms print — leaked everything after the first @ (the bulk of
// the password) to stdout, defeating the cure the S63-2a pin names
// ("the password never prints"). The probe:
// redactCredentials('"postgresql://admin:p@ssw0rd@db.example.com/prod')
// answered '"postgresql://***@ssw0rd@db.example.com/prod'. The cure
// redacts up to the LAST @ inside the authority segment; every pinned
// S63-2 shape is byte-identical under it.
describe("session-64 (S64-1): the raw-@ password tail never prints (the first-@ redaction leak)", () => {
  it("a raw-@ password answers ***@ with the tail absent — on both residue arms; the host stays visible", () => {
    // The process-env arm: the unclosed-quote residue on a credentialed
    // postgres URL whose password embeds a raw @.
    const report = bootEnvCheck(
      env({ DATABASE_URL: '"postgresql://admin:p@ssw0rd@db.example.com/prod' }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("***@");
    expect(joined).not.toContain("ssw0rd");
    expect(joined).not.toContain("p@ssw0rd");
    expect(joined).toContain("db.example.com");

    // The file-face arm: the same raw-@ shape through the prefix.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      '"postgresql://admin:p@ssw0rd@db.example.com/prod',
    );
    expect(fileFace).toContain("***@");
    expect(fileFace).not.toContain("ssw0rd");
    expect(fileFace).not.toContain("p@ssw0rd");
    expect(fileFace).toContain("db.example.com");
  });
});

// Session-64 (S64-5, AUDIT-1 I1): the DEFAULT_DATABASE_URL mirror pin.
// The inert-value exemption's literal (boot-env.ts) deliberately
// MIRRORS db-path's exported DEFAULT_DATABASE_URL — importing the
// constant would drag the seam's heavyweight trace into the
// instrumentation artifact (the S59-1b lightweight-trace doctrine), so
// the mirror stands. No test coupled the two literals: a future edit
// to either alone would silently turn the exemption into a false
// negative (a divergent default spelling would no longer warn) or a
// spurious-exemption drift. This pin is the coupling — the literals
// can no longer drift independently.
describe("session-64 (S64-5): the inert-value exemption literal mirrors db-path's DEFAULT_DATABASE_URL", () => {
  it("the boot-env exemption literal equals the db-path constant (the S59-1b no-import coupling)", () => {
    const dbConst = read("src/lib/db-path.ts").match(
      /export const DEFAULT_DATABASE_URL = "([^"]+)"/,
    )?.[1];
    const exemption = read("src/lib/boot-env.ts").match(
      /if \(fileUrl === "([^"]+)"\) return null;/,
    )?.[1];
    // Both literals exist (the regexes found their lines) and agree.
    expect(dbConst).toBe("file:../db/custom.db");
    expect(exemption).toBe(dbConst);
  });
});

// Session-65 (S65-1, AUDIT-1 M-1 — live-probed): the delimiter bypass.
// The S64-1b authority-scoped regex captures the authority with
// [^/?#\s"']* (RFC 3986 grammar scope). A password carrying a URL
// delimiter (/, ?, #) or a control char BEFORE the @ stops the capture
// early — the captured segment carries no @ at all, the at === -1 arm
// returns it verbatim, and the password prints to stdout (bun run
// start's tee server.log persists it). The probes:
//   redactCredentials('postgresql://admin:p/ss@host/db')    → unchanged (prints p/ss)
//   redactCredentials('"postgresql://admin:pa\tss@host/db') → unchanged (prints pa<TAB>ss — the
//     tab simultaneously fires the residue warning, so the diagnostic arm
//     printed the very bytes it was diagnosing)
// The exact malformed-value class these arms exist to print is the
// class that defeated the cure. The malformed arm masks from the scheme
// to the LAST @ of the raw remainder; every pinned S63-2/S64-1 shape is
// byte-identical under it.
describe("session-65 (S65-1): a delimiter/control char inside the password never prints (the grammar-scope bypass)", () => {
  it("a /-in-password and a tab-in-password value answer ***@… on both residue arms — the password fragment is absent everywhere", () => {
    // The process-env arm: the unclosed-quote residue (the print
    // vehicle) on a value whose password embeds a slash — the capture
    // stops at the /, before the @.
    const slash = bootEnvCheck(env({ DATABASE_URL: '"postgresql://admin:p/ss@db.example.com/prod' }));
    const slashJoined = (slash.warnings ?? []).join("\n");
    expect(slashJoined).toContain("***@");
    expect(slashJoined).not.toContain("p/ss");
    expect(slashJoined).not.toContain("admin:p");

    // The file-face arm: the same slash shape through the prefix.
    const slashFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      '"postgresql://admin:p/ss@db.example.com/prod',
    );
    expect(slashFace).toContain("***@");
    expect(slashFace).not.toContain("p/ss");

    // The tab face: the control char both defeats the grammar-scoped
    // capture AND fires the residue warning — the redaction must hold
    // on the same print that names the control char.
    const tabFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      '"postgresql://admin:pa\tss@db.example.com/prod',
    );
    expect(tabFace).toContain("***@");
    expect(tabFace).not.toContain("pa\tss");
    expect(tabFace).not.toContain("admin:pa");

    // The clean file: contract stays verbatim (no userinfo — no false
    // redaction; the S60-1b faces hold).
    const fileValue = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "file:../db/custom.db\tjunk",
    );
    expect(fileValue).toContain("file:../db/custom.db\\tjunk");
  });
});

// Session-66 (S66-1, AUDIT-1-1 M — live-probed through the REAL
// exported warning builders): the residual tiers the S65-1b manual scan
// still left unmasked. The scheme-anchored design has three verbatim
// classes: (1) QUERY-PARAM credentials on an otherwise VALID URL —
// 'postgresql://host/db?user=u&password=p' is a documented
// libpq/Prisma spelling, and the @-anchored scan never sees the
// password (the most realistic face yet: no typo required, only the
// inert-value posture this warning family exists to diagnose); (2)
// SCHEME-LESS credentialed values ('user:pass@host/db') returned
// verbatim by the !schemeMatch early return; (3) credentials BEFORE
// the first scheme, where the restAt > afterScheme guard declines to
// mask. The probes: SuperSecret9/TopSecret99 printed verbatim through
// the inert-value and tab-paste residue arms; supersecret printed
// through the scheme-less inert-value, leading-quote, and control-char
// faces; admin:pass printed through the pre-scheme face. The
// one-owner doctrine ("the password never prints") has no unmasked
// face left after the cure.
describe("session-66 (S66-1): the residual redaction tiers (query-param, scheme-less, pre-scheme)", () => {
  it("a query-param password never prints (a VALID libpq spelling) — on the inert-value and residue arms; the user= identity stays visible", () => {
    // Face 1 — the inert-value arm (the S63-1 posture: a node-booted
    // standalone, a clean non-default .env value the runtime never
    // reads). The URL is VALID; only the posture is wrong — the exact
    // diagnostic class of this arm.
    const inert = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://db.example.com:5432/prod?user=admin&password=SuperSecret9",
      false,
    );
    expect(inert).toContain("password=***");
    expect(inert).not.toContain("SuperSecret9");
    // The user= identity is not a secret — the host/user stay visible
    // where parseable (the S65-1b visibility doctrine).
    expect(inert).toContain("user=admin");
    expect(inert).toContain("db.example.com");

    // Face 1b — the tab-paste residue arm (the S60-1 print vehicle):
    // the control char fires the warning, the query password must
    // still mask on the same print that names the char. (Session-69,
    // S69-4 re-anchor: the vehicle's control char must be INTERIOR —
    // the old trailing-tab form was exactly the edge-only class the
    // S69-4 trim cure silences, because the engine consumes the
    // trimmed face and boots healthy.)
    const report = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://db.example.com:5432/prod?user=admin&password=TopSecret99&tag=a\tb" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("TopSecret99");
  });

  it("a scheme-less credentialed value never prints — on the inert-value arm and both residue faces", () => {
    // The clean scheme-less shape through the inert-value arm.
    const inert = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "user:supersecret@host/db",
      false,
    );
    expect(inert).toContain("***@");
    expect(inert).not.toContain("supersecret");
    expect(inert).not.toContain("user:");

    // The leading-quote residue face (the unclosed-quote print
    // vehicle) on the same scheme-less shape.
    const quoteFace = bootEnvCheck(env({ DATABASE_URL: '"user:supersecret@host/db' }));
    const quoteJoined = (quoteFace.warnings ?? []).join("\n");
    expect(quoteJoined).toContain("***@");
    expect(quoteJoined).not.toContain("supersecret");
    expect(quoteJoined).not.toContain("user:");

    // The control-char residue face: the tab both defeats the token
    // run AND fires the warning — the redaction holds on the same
    // print that names the char (the S65-1 doctrine, one tier down).
    const tabFace = bootEnvCheck(env({ DATABASE_URL: "user:pa\tss@host/db" }));
    const tabJoined = (tabFace.warnings ?? []).join("\n");
    expect(tabJoined).toContain("***@");
    expect(tabJoined).not.toContain("pa\tss");
    expect(tabJoined).not.toContain("user:pa");
  });

  it("a credential before the first scheme never prints (the whole prefix masks)", () => {
    // The contrived-but-real shape: the userinfo rides BEFORE any
    // scheme run, so both the token arm (no @ after the scheme) and
    // the restAt > afterScheme guard decline — the S65-1b design's
    // last verbatim face. The cure masks the WHOLE prefix to the last
    // @ (masking from afterScheme would keep the credential in the
    // prefix it slices over).
    const report = bootEnvCheck(
      env({ DATABASE_URL: '"admin:pass@host\npostgres://x/y' }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("***@");
    expect(joined).not.toContain("admin:pass");
    expect(joined).not.toContain('"admin');

    // The control: the clean file: contract stays verbatim under the
    // cure (no @, no query params — nothing to mask).
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "file:../db/custom.db\tjunk",
    );
    expect(fileFace).toContain("file:../db/custom.db\\tjunk");
  });
});

// Session-67 (S67-1, AUDIT-1 M-1 — live-probed through the REAL
// exported warning builder): the KEYWORD-VALUE libpq connection string
// — the space-separated form ('host=localhost user=admin password=…',
// the habitual psql spelling) — carries no scheme, no @, and no ?/&,
// so every S63..S66 arm passed it through and the inert-value warning
// printed the password VERBATIM (the live probe: 'secretpw' visible
// through databaseUrlInertValueWarning while the S66-1 query-param
// control redacted in the same run). The realism: this face needs
// ZERO malformation — a psql-habit operator's clean .env value on a
// node-booted standalone is enough; Prisma itself rejects the keyword
// form (the value is inert), which is exactly when the warning fires.
// The cure: a keyword-form pass riding every arm's output beside the
// S66-1 query-param pass — the (^|\s) prefix keeps the two passes
// disjoint (a password= key rides either a ?/& or whitespace, never
// both).
describe("session-67 (S67-1): the keyword-value libpq form never prints the password", () => {
  it("a keyword-form password never prints — on the inert-value arm and the tab-paste residue arm; the user= identity and host stay visible", () => {
    // Face 1 — the inert-value arm (the S63-1 posture: a node-booted
    // standalone, a clean non-default .env value the runtime never
    // reads — the keyword form IS a clean value; only the engine
    // rejects its grammar).
    const inert = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password=secretpw dbname=app",
      false,
    );
    expect(inert).toContain("password=***");
    expect(inert).not.toContain("secretpw");
    // The identity doctrine (the S65-1b visibility posture): user= is
    // an identity, not a secret; the host tail is the diagnostic.
    expect(inert).toContain("user=admin");
    expect(inert).toContain("host=localhost");

    // Face 2 — the tab-paste residue arm (the S60-1 print vehicle):
    // the control char fires the warning on the same print that must
    // mask the keyword password (the S65-1 doctrine, one tier down).
    // (Session-69, S69-4 re-anchor: the vehicle's control char must
    // be INTERIOR — the old trailing-tab form was exactly the
    // edge-only class the S69-4 trim cure silences.)
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=localhost password=TopSecret99 dbname=a\tb" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("TopSecret99");
  });

  it("the controls hold — the S66-1 query-param face byte-identical, the file: contract verbatim, and the two forms compose", () => {
    // Control 1 — the S66-1 query-param face is unchanged under the
    // new arm (its password= rides a ?, never whitespace — the passes
    // are disjoint; no double-mask artifact like password=****).
    const query = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://db.example.com:5432/prod?user=admin&password=SuperSecret9",
      false,
    );
    expect(query).toContain("password=***");
    expect(query).not.toContain("password=****");
    expect(query).not.toContain("SuperSecret9");

    // Control 2 — the clean file: contract stays verbatim (its only
    // = faces ride the path and the outer quoting, never a
    // whitespace-preceded secret key).
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "file:../db/custom.db\tjunk",
    );
    expect(fileFace).toContain("file:../db/custom.db\\tjunk");

    // Control 3 — the composition: a URL carrying BOTH a query-param
    // password AND a keyword password masks both (a value can carry
    // two secret spellings; one mask must never satisfy the other).
    const both = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://u:p@host/db?password=QSecret1 host=h password=KSecret2",
      false,
    );
    expect(both).toContain("password=***");
    expect(both).not.toContain("QSecret1");
    expect(both).not.toContain("KSecret2");
  });
});

// ---------------------------------------------------------------------------
// Session-69 (S69-1, AUDIT-1 F1 — live-probed): the QUOTED-VALUE tail.
// libpq's documented keyword form uses a single-quoted value as a
// CONTAINER (password='my secret' is the sanctioned spelling for values
// with spaces; Prisma accepts libpq connection strings) — but the
// S67-1/S66-1 passes' value runs treated quotes as TERMINATORS
// ([^\s"']* / [^&\s"']*), so the run matched zero characters at the
// opening quote, the replacement inserted ***, and the ENTIRE quoted
// tail printed verbatim (the live probe: password=***'my secret').
// The one-owner doctrine ("the password never prints") defeated by the
// one spelling an operator with a space in their password is told to
// use. The cure: the value alternation consumes a quoted tail before
// the bare run. REGISTERED boundary (named, not cured — the S67-1
// precedent): a percent-encoded query key ('%70assword=' — libpq
// percent-decodes query keys, so the decoded key IS the password)
// stays visible; the literal-spelling match is the chosen posture.
// ---------------------------------------------------------------------------
describe("session-69 (S69-1): a quoted libpq value never prints (the quoted-tail redaction)", () => {
  it("keyword-form and query-param quoted passwords mask with their quoted tails — closed, unclosed, and double-quoted; identity and host stay visible", () => {
    // Face 1 — the keyword-form single-quoted value, closed and
    // unclosed (an unclosed quote is exactly the residue class these
    // warnings print).
    const kwClosed = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password='my secret' dbname=app",
      false,
    );
    expect(kwClosed).toContain("password=***");
    expect(kwClosed).not.toContain("my secret");
    const kwUnclosed = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password='my secret",
      false,
    );
    expect(kwUnclosed).toContain("password=***");
    expect(kwUnclosed).not.toContain("my secret");
    // The identity doctrine (the S65-1b visibility posture): user=
    // and host stay visible.
    expect(kwClosed).toContain("user=admin");
    expect(kwClosed).toContain("host=localhost");

    // Face 2 — the query-param quoted value (the S66-1 pass's quoted
    // tail; the run must consume past the quote, not stop at it).
    const queryQuoted = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://db.example.com:5432/prod?password='my secret'",
      false,
    );
    expect(queryQuoted).toContain("password=***");
    expect(queryQuoted).not.toContain("my secret");

    // Face 3 — the double-quoted form over-redacts the same way (an
    // unmatched double quote rides the unclosed-residue class; the
    // container doctrine does not care which quote char opened it).
    const dbl = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      'host=localhost password="my secret',
      false,
    );
    expect(dbl).toContain("password=***");
    expect(dbl).not.toContain("my secret");

    // Face 4 — the tab-paste residue arm (the S60-1 print vehicle):
    // the control char fires the warning on the same print that must
    // mask the quoted keyword password. (Session-69, S69-4
    // re-anchor: the vehicle's control char must be INTERIOR — a
    // trailing tab is the edge-only class the S69-4 trim cure
    // silences, and this pin was born before that cure was designed.)
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=localhost password='my secret' dbname=a\tb" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("my secret");

    // The control — every prior pinned shape is byte-identical under
    // the quoted-tail alternation (the bare-run faces keep their
    // masks; no quoted artifact rides an unquoted value).
    const bare = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password=secretpw dbname=app",
      false,
    );
    expect(bare).toContain("password=***");
    expect(bare).not.toContain("secretpw");
  });
});

// ---------------------------------------------------------------------------
// Session-68 (S68-4, AUDIT-1 A-1-1): the boot gate's NEXT_PUBLIC_SITE_URL
// leg split (the S62-2 doctrine mirrored). The served surfaces consume
// the BUILD-TIME-INLINED face — Turbopack replaces site.ts's
// default-param process.env.NEXT_PUBLIC_SITE_URL read with the literal
// at build (compiled-chunk-probed: `function(e="http://localhost:3000")`,
// no env read survives) — while bootEnvCheck validated only the RUNTIME
// record face. Wrong in both directions where the faces diverge:
// (a) FALSE ALARM — origin set at build, runtime env unset (the
//     node-booted-standalone family): surfaces correct, warning fired;
// (b) FALSE NEGATIVE — origin set only at runtime: gate silent while
//     every served OG/canonical/sitemap URL advertised the inlined
//     localhost.
// The cure: an OPTIONAL injected servedSiteUrl face. The seam stays
// PURE (both faces injected; the one-arg calls behave exactly as
// before — every prior pin in this file holds untouched, verified by
// the suite's own run). The instrumentation caller passes siteUrl()
// — the build-inlined literal in the artifact, the live env in dev
// (identical to the record face there — no dev behavior change).
// ---------------------------------------------------------------------------
describe("session-68 (S68-4): the NEXT_PUBLIC_SITE_URL served-face leg split", () => {
  it("production + runtime UNSET + a healthy injected served face: NO site-url warning (the false-alarm cure)", () => {
    // The artifact serves the build-inlined origin; the runtime env
    // face is inert for this knob (nothing reads it at serve time).
    // Surfaces healthy + nothing actionable = silence (the S22-18
    // no-false-alarm doctrine; the S62-2 leg-split precedent).
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: undefined }),
      { servedSiteUrl: "https://built.example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });

  it("production + runtime LOOPBACK + a healthy injected served face: the divergence warning replaces the generic loopback warning", () => {
    // The runtime face is set-but-loopback while the artifact serves a
    // real origin: the generic "would advertise a localhost origin"
    // warning would be a lie (the surfaces advertise the healthy
    // build-inlined origin). The divergence warning names BOTH values —
    // the actionable truth.
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }),
      { servedSiteUrl: "https://built.example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("http://localhost:3000");
    expect(report.warnings[0]).toContain("https://built.example.com");
    expect(report.warnings[0]).not.toContain("would advertise a localhost origin");
  });

  it("production + a healthy runtime face the artifact does NOT serve: the divergence warning (the false-negative cure)", () => {
    // The operator set the origin only at runtime — the artifact was
    // built without it and serves the inlined localhost. The old gate
    // stayed SILENT (runtime set + non-loopback) while every served
    // OG/canonical/sitemap URL advertised localhost.
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://runtime.example.com" }),
      { servedSiteUrl: "http://localhost:3000" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("https://runtime.example.com");
    expect(report.warnings[0]).toContain("http://localhost:3000");
    expect(report.warnings[0]).toContain("bun run build");
  });

  it("the control: runtime face and injected served face AGREE (normalized) — no divergence warning, no unset warning", () => {
    // Trailing-slash equivalence: the seam normalizes both faces the
    // same way before comparing (a trailing slash is not a divergence).
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://viralpost.example.com/" }),
      { servedSiteUrl: "https://viralpost.example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Session-69 (S69-3, AUDIT-1 F2 — live-probed): the divergence arm's
// bare-origin gate. The S68-4 arm's URL-parseability gate admitted ANY
// URL-parseable value — a path-carrying, query-carrying, or non-http(s)
// runtime value fired the divergence warning IN ADDITION to the F10-11
// shape warning (the live probe: BOTH warnings for
// https://example.com/base), falsifying the arm's own "fires only on a
// WELL-FORMED runtime origin" claim and session-68's "exactly one
// warning per bad posture" record. The cure: the arm fires only when
// the runtime face is a bare http(s) ORIGIN (parses, http/https, no
// path beyond "/", no search, no hash) — every other class stays owned
// by the shape arms. (S69-5's two boundary postures are this pin's
// faces: the malformed-runtime + served-face posture and the
// path-carrying double-warning face were both unpinned.)
//
// Session-69 (S69-4, AUDIT-1 F3 — live-probed): the residue
// predicate's TRIMMED face. runtimeDatabaseUrl() trims the process-env
// DATABASE_URL before resolving; the predicate tested the UNTRIMMED
// value — a value whose only malformation is an EDGE control char (a
// trailing tab) fired the warning while the engine consumed the
// cleaned value and booted healthy (the junk-file / raw-pass-through
// mechanism sentences FALSE for that face). The cure: the arm reads
// the trimmed face throughout — mirroring the engine's consumption
// exactly. Interior control chars and leading quotes survive the trim
// as the engine sees them (the file-face arm at :601 already trimmed;
// the two arms of the family are now aligned).
// ---------------------------------------------------------------------------
describe("session-69 (S69-3/S69-4): the divergence arm's bare-origin gate + the residue predicate's trimmed face", () => {
  it("S69-3a: a path-carrying runtime value against a healthy served face answers EXACTLY ONE warning — the shape arm owns it, the divergence arm stays silent", () => {
    // The F10-11 path shape arm carries the whole posture (one
    // warning per bad posture — the S22-18 warning-authority
    // doctrine); the divergence arm must not pile on.
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://example.com/base" }),
      { servedSiteUrl: "https://example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("carries a path");
    expect(report.warnings.join("\n")).not.toContain("is NOT what this server serves");
  });

  it("S69-3a (the sibling face): a non-http(s) runtime value against a healthy served face answers EXACTLY ONE warning — the malformed-protocol arm owns it, the divergence arm stays silent", () => {
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "ftp://example.com" }),
      { servedSiteUrl: "https://example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("could not be parsed as an http(s) origin");
    expect(report.warnings.join("\n")).not.toContain("is NOT what this server serves");
  });

  it("S69-3a (the control): a WELL-FORMED bare runtime origin the served face disagrees with still answers the divergence warning (the S68-4 false-negative cure intact)", () => {
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://runtime.example.com" }),
      { servedSiteUrl: "https://built.example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("is NOT what this server serves");
    expect(report.warnings[0]).toContain("https://runtime.example.com");
    expect(report.warnings[0]).toContain("https://built.example.com");
  });

  it("S69-4a: an EDGE-only control character is silent (the engine consumes the trimmed face; the boot is healthy), while an INTERIOR control character still fires", () => {
    // The trailing tab inside a quoted .env value survives both
    // loaders — but the engine's face is the TRIMMED value, and that
    // face is clean: no warning (the false-alarm cure; the old
    // predicate fired with a junk-file mechanism text that was false
    // for this face).
    const edge = bootEnvCheck(
      env({ DATABASE_URL: "file:../db/custom.db\t" }),
    );
    expect(edge.fatal).toBeNull();
    expect(edge.warnings).toHaveLength(0);

    // The interior control char reaches the engine (the raw resolve
    // bakes it into the resolved path) — the warning still fires.
    const interior = bootEnvCheck(
      env({ DATABASE_URL: "file:../db/cu\tstom.db" }),
    );
    expect(interior.warnings.length).toBeGreaterThanOrEqual(1);
    expect(interior.warnings.join("\n")).toContain("control character");
  });
});

// ---------------------------------------------------------------------------
// Session-70 (S70-1, AUDIT-1 M-1 — live-probed): the SPACED-EQUALS libpq
// keyword form. PostgreSQL's documented keyword/value grammar makes
// spaces around the equals sign OPTIONAL ("each parameter setting is
// in the form keyword = value"), and the S67-1/S69-1 passes' key face
// required a TIGHT `=` — so the sanctioned spaced spelling
// (password = topsecret) matched ZERO characters of the key group and
// the password printed VERBATIM through every warning arm (the
// inert-value leg fires on CLEAN values, so a working spaced-form
// password qualifies — the live probe printed it on all three arms).
// The one-owner doctrine ("the password never prints") defeated by
// one optional-whitespace keystroke inside the family the keyword
// pass claims to own. The cure: the key face widens to `\s*=\s*` in
// BOTH passes (the query form accepts the same paste-residue shape).
// REGISTERED acceptance (the over-redaction doctrine): an EMPTY
// spaced password (`password = ` at the run's end) masks the
// following token, and a newline-adjacent `=` rides the same `\s`
// class — over-redact, never under (the S65-1 direction).
// ---------------------------------------------------------------------------
// Session-70 (S70-2, AUDIT-1 L-1 — live-probed): the INTERIOR-QUOTE
// bare value. The bare runs ([^&\s"']* / [^\s"']*) treated a quote
// ANYWHERE as a terminator, but a quote only opens a CONTAINER when
// it LEADS the value (the S69-1 alternation's first two arms own that
// case) — so `password=ab'cd` matched the bare run only up to `ab`,
// inserted ***, and printed the post-quote tail (`***'cd`) — password
// material under the repo's own container model. Distinct from the
// registered unencoded-& tail (whose leaked tail is NOT password —
// libpq stops the query value at `&`; a quote does not stop a
// keyword value). The cure: the bare-run tails drop the quote chars
// (`[^&\s]*` / `[^\s]*`) — an interior quote is value material.
// ---------------------------------------------------------------------------
// Session-70 (S70-3, AUDIT-1 L-2 — live-probed): the bare-origin
// gate's USERINFO face. runtimeIsBareOrigin checked protocol/path/
// search/hash but not credentials — a credentialed origin
// (http://user:pass@example.com) passed the gate and double-warned
// (the S25-4 shape warning PLUS the divergence warning), the exact
// "two warnings, one root cause" genus S69-3 cured for the path and
// non-http(s) faces; worse, normalizeSiteUrl degrades the credentialed
// value to the localhost default, manufacturing a spurious mismatch
// even when the served host is IDENTICAL. The cure: the gate requires
// empty username AND password (a credentialed origin is not a
// well-formed bare origin; the shape arms own its warning).
// ---------------------------------------------------------------------------
describe("session-70 (S70-1/S70-2/S70-3): the spaced-equals key face + the interior-quote bare run + the bare-origin userinfo gate", () => {
  it("S70-1a: a spaced-equals libpq password never prints — keyword form and query form, tight and quoted controls beside", () => {
    // Face 1 — the keyword-form spaced password (the libpq-sanctioned
    // spelling; the live probe printed it verbatim on this arm).
    const kwSpaced = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost password = topsecret dbname=app",
      false,
    );
    expect(kwSpaced).toContain("password = ***");
    expect(kwSpaced).not.toContain("topsecret");
    // The identity doctrine: user= and host stay visible.
    expect(kwSpaced).toContain("host=localhost");

    // Face 2 — the spaced QUOTED form (the S69-1 container under the
    // S70-1 widening: the key group consumes the spaces, the container
    // arm consumes the quoted tail).
    const kwSpacedQuoted = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost password = 'my secret' dbname=app",
      false,
    );
    expect(kwSpacedQuoted).toContain("password = ***");
    expect(kwSpacedQuoted).not.toContain("my secret");

    // Face 3 — the residue arm (the S60-1 print vehicle, interior
    // control char per the S69-4 re-anchor doctrine): the warning that
    // fires on the same print must mask the spaced password.
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=localhost password = topsecret dbname=a\tb" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password = ***");
    expect(joined).not.toContain("topsecret");

    // Face 4 — the query-param spaced form (the paste-residue shape;
    // a space is not valid in a query, but the residue class is
    // exactly what these arms print).
    const querySpaced = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://db.example.com:5432/prod?password = topsecret",
      false,
    );
    expect(querySpaced).toContain("password = ***");
    expect(querySpaced).not.toContain("topsecret");

    // The controls — the TIGHT forms still mask (the S67-1/S66-1
    // postures byte-identical under the widening).
    const tight = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost password=topsecret dbname=app",
      false,
    );
    expect(tight).toContain("password=***");
    expect(tight).not.toContain("topsecret");
  });

  it("S70-2a: an interior quote in a BARE value never prints its post-quote tail — single and double faces, the leading-container controls beside", () => {
    // Face 1 — the interior single quote (the live probe printed
    // `password=***'cd`).
    const interiorSingle = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=h password=ab'cd dbname=x",
      false,
    );
    expect(interiorSingle).toContain("password=***");
    expect(interiorSingle).not.toContain("'cd");
    expect(interiorSingle).not.toContain("ab'cd");

    // Face 2 — the interior double quote (the same face one quote
    // char over).
    const interiorDouble = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      'host=h password=a"b dbname=x',
      false,
    );
    expect(interiorDouble).toContain("password=***");
    expect(interiorDouble).not.toContain('"b');

    // Face 3 — the residue arm (the interior control-char vehicle).
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=h password=ab'cd dbname=a\tb" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("'cd");

    // The controls — the LEADING-quote containers (the S69-1 faces)
    // still mask as containers, and the quote-free bare values still
    // mask their whole runs.
    const leadingContainer = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=h password='my secret' dbname=x",
      false,
    );
    expect(leadingContainer).toContain("password=***");
    expect(leadingContainer).not.toContain("my secret");
    const bare = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=h password=secretpw dbname=x",
      false,
    );
    expect(bare).toContain("password=***");
    expect(bare).not.toContain("secretpw");
  });

  it("S70-3a: a credentialed runtime origin answers EXACTLY ONE warning (the shape arm owns it, the divergence arm stays silent) — and the identical-host face too", () => {
    // The credentialed origin against a healthy served face: the
    // S25-4 shape arm carries the posture (one warning per bad
    // posture); the divergence arm must not pile on with the
    // localhost-default mismatch normalizeSiteUrl manufactures for
    // credentialed values.
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://user:pass@example.com" }),
      { servedSiteUrl: "https://example.com" },
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("carries a query string (or fragment/credentials)");
    expect(report.warnings.join("\n")).not.toContain("is NOT what this server serves");

    // The identical-host face: the credentialed origin's HOST equals
    // the served host — the spurious-mismatch manufacture is exactly
    // what the gate must suppress.
    const sameHost = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://u:p@example.com" }),
      { servedSiteUrl: "http://example.com" },
    );
    expect(sameHost.fatal).toBeNull();
    expect(sameHost.warnings).toHaveLength(1);
    expect(sameHost.warnings.join("\n")).not.toContain("is NOT what this server serves");
  });
});

// ---------------------------------------------------------------------------
// Session-71 (S71-1, AUDIT-1 M-1 — live-probed through the REAL
// exported warning builders): the ESCAPE-AWARE CONTAINERS. libpq's
// documented keyword grammar escapes single quotes and backslashes
// inside a single-quoted value with a backslash (\' and \\) — but the
// quoted arms closed at the FIRST same-quote char, so the sanctioned
// escape spelling itself printed the post-escaped-quote tail
// (password='p\'ass' → password=***ass'), and a leading-" value
// printed its post-close tail (password="ab"cdw0rd → ***cdw0rd),
// through every warning arm (the boot residue arm, the file-residue
// arm, and the inert-value arm). The cure: the quoted arms consume
// escape PAIRS and any post-close material to the run's end
// (over-redact, the S65-1 doctrine; a " is not a libpq container —
// the DQ arm is the pinned S69-1 over-redaction posture, widened
// identically).
// ---------------------------------------------------------------------------
// Session-71 (S71-2, AUDIT-1 M-2 — live-probed): the PASS REORDER.
// The scheme-less last-@ mask ran BEFORE the keyword pass and
// DESTROYED the prefix carrying the password= key — a password
// containing @ (no escaping required inside single quotes; among the
// most common real-world spellings) leaked its post-@ tail through
// every arm (password='S3cr@tPass!' → DATABASE_URL="***@tPass!'"),
// while the keyword pass that would have masked it never fired on
// the already-masked output. The cure: the keyword pass runs FIRST
// on the raw value — the masked region carries no @, the scheme-less
// arm finds nothing to drop, and the identity/host visibility
// survives.
// ---------------------------------------------------------------------------
// Session-71 (S71-3, AUDIT-1 L-1 — live-probed): the QUERY
// CONTROL-CHAR RUN. The query bare run stopped at whitespace, but in
// URI form libpq's value scan runs to &/end — an interior control
// char is VALUE material (?password=pa<TAB>ss printed
// password=***<TAB>ss on the residue arms while the message named
// the very char it was printing). The cure: the query bare run stops
// only at & (the registered unencoded-& tail boundary is unchanged —
// libpq genuinely stops there).
// ---------------------------------------------------------------------------
// Session-71 (S71-4, AUDIT-1 L-2 — live-probed): the DIVERGENCE
// UNIFICATION. The predicate (raw-URL getters) and the comparison
// (the normalizer's strip+serialize) disagreed on edge spellings:
// an empty ? delimiter DROPS from u.search but SURVIVES toString()
// (a spurious "NOT what this server serves" on IDENTICAL origins),
// and a // pathname FAILED the bare gate while both the shape arms
// and the normalizer folded the spelling healthy (an inert
// diverging value answering ZERO warnings). The cure: one
// normalizer, one law — the predicate folds the spelling the same
// way, and the normalizer's post-serialization strip drops empty
// delimiters (the S69-3 "exactly one warning per bad posture" law
// holds at both edges).
// ---------------------------------------------------------------------------
// Session-71 (S71-5, AUDIT-1 L-3 — live-probed): the LOOPBACK
// GRAMMAR. The predicate missed the IPv6 and 127/8 families —
// [::1] (the parsed hostname keeps its brackets) and 127.0.0.2 both
// passed as healthy production origins (no unset/loopback warning;
// servedIsHealthy counted them healthy). The cure: bracket-strip +
// ::1 + ::ffff:127. + the 127/8 prefix — the S42-6 parsed-hostname
// law extended to the families it missed.
// ---------------------------------------------------------------------------
describe("session-71 (S71-1/2/3/4/5): the escape-aware containers + the pass reorder + the query control-char run + the divergence unification + the loopback grammar", () => {
  it("S71-1a: an escaped-quote or leading-\" value never prints its tail — keyword and query forms, on every arm; the plain containers still mask", () => {
    // Face 1 — the escaped-quote keyword form (the inert-value arm):
    // libpq's sanctioned \' spelling. The live probe printed
    // password=***ass' on this arm.
    const kwEscaped = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=db.example.com port=5432 dbname=prod user=app password='p\\'ass'",
      false,
    );
    expect(kwEscaped).toContain("password=***");
    expect(kwEscaped).not.toContain("ass'");

    // Face 2 — the leading-double-quote keyword form: the container
    // closes at the second " and the post-close tail printed. The
    // distinctive tail keeps the not.toContain assertion unambiguous.
    const kwDQ = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      'host=db.example.com port=5432 dbname=prod user=app password="ab"cdw0rd',
      false,
    );
    expect(kwDQ).toContain("password=***");
    expect(kwDQ).not.toContain("cdw0rd");

    // Face 3 — the query-form mirrors, through the inert-value arm
    // (the scheme arm masks the userinfo; the query pass owns the
    // password).
    const queryEscaped = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "postgresql://app:secret@db.example.com/prod?password='p\\'ass'",
      false,
    );
    expect(queryEscaped).toContain("password=***");
    expect(queryEscaped).not.toContain("ass'");
    const queryDQ = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      'postgresql://app:secret@db.example.com/prod?password="qu"otedw0rd',
      false,
    );
    expect(queryDQ).toContain("password=***");
    expect(queryDQ).not.toContain("otedw0rd");

    // Face 4 — the boot residue arm (the interior-tab vehicle): the
    // control char fires the warning, the escaped-quote password must
    // still mask on the same print that names the char.
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=db.example.com user=app password='p\\'ass'\tdbname=x" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("ass'");

    // Face 5 — the file-residue arm (the uncalled-consumer leg): the
    // same faces through the prefix.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "host=db.example.com user=app password='p\\'ass'\tdbname=x",
      true,
    );
    expect(fileFace).toContain("password=***");
    expect(fileFace).not.toContain("ass'");

    // The control — the S69-1 plain containers still mask
    // byte-identically (the escape-aware widening must not disturb
    // the sanctioned no-escape spellings).
    const plainContainer = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password='my secret' dbname=app",
      false,
    );
    expect(plainContainer).not.toContain("my secret");
  });

  it("S71-2a: an @ inside a keyword password never prints its tail — the keys and identity stay visible; the scheme-less non-key @ face still masks", () => {
    // Face 1 — the @-in-QUOTED-password keyword form (the inert-value
    // arm): the scheme-less last-@ mask destroyed the key prefix and
    // printed the post-@ tail (the live probe: DATABASE_URL="***@tPass!'").
    const quotedAt = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=db.example.com port=5432 dbname=prod user=app password='S3cr@tPass!'",
      false,
    );
    expect(quotedAt).toContain("password=***");
    expect(quotedAt).not.toContain("tPass!");
    // The visibility doctrine: the reorder must not trade the leak for
    // the identity — the host/user keys stay readable in the redaction.
    expect(quotedAt).toContain("host=db.example.com");
    expect(quotedAt).toContain("user=app");
    expect(quotedAt).toContain("dbname=prod");

    // Face 2 — the @-in-BARE-password keyword form: the same
    // prefix-drop printed ***@ss dbname=x (the key destroyed AND the
    // tail leaked).
    const bareAt = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "password=p@ss dbname=x",
      false,
    );
    expect(bareAt).toContain("password=***");
    expect(bareAt).not.toContain("@ss");
    expect(bareAt).toContain("dbname=x");

    // Face 3 — the residue arm (the interior-tab vehicle): the
    // control char fires the warning, the @-bearing password still
    // masks on the same print.
    const report = bootEnvCheck(
      env({ DATABASE_URL: "host=db.example.com port=5432 user=app password='S3cr@tPass'\tdbname=x" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("tPass");

    // The control — the scheme-less NON-KEY @ face (the S66-1 face-2
    // posture): no password key, the whole credential masks to the
    // last @ exactly as before (the reorder changes nothing for the
    // key-free family).
    const schemeless = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "user:supersecret@host/db",
      false,
    );
    expect(schemeless).toContain("***@");
    expect(schemeless).not.toContain("supersecret");
  });

  it("S71-3a: a control char inside a URI-query password never prints its tail (the residue vehicles)", () => {
    // The process-env residue arm: the tab fires the warning; in URI
    // form the value scan runs to &/end, so the tab is VALUE material
    // and the post-char tail must mask on the same print that names
    // the char (the live probe printed password=***\tss — the warning
    // renders the control char as the two-char \t escape through
    // JSON.stringify, so the tail assertion matches that face).
    const report = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://app:secret@db.example.com/prod?password=pa\tss" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("password=***");
    expect(joined).not.toContain("\\tss");

    // The file-residue arm (the uncalled-consumer leg): the same face
    // through the prefix.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "postgresql://app:secret@db.example.com/prod?password=pa\tss",
      true,
    );
    expect(fileFace).toContain("password=***");
    expect(fileFace).not.toContain("\\tss");
  });

  it("S71-4a: the empty-delimiter origin never mismatches an identical served face, and the multi-slash origin answers the divergence warning", () => {
    // Face 1 — the false POSITIVE: an empty ? delimiter vs the
    // IDENTICAL served origin. The delimiter drops from u.search (the
    // predicate passed) but survives toString() (the comparison
    // mismatched) — the live probe warned "NOT what this server
    // serves" on semantically identical origins.
    const empty = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://example.com?" }),
      { servedSiteUrl: "http://example.com" },
    );
    expect(empty.fatal).toBeNull();
    const emptySite = (empty.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(emptySite).toHaveLength(0);

    // Face 2 — the false NEGATIVE: the multi-slash origin vs a
    // DIFFERENT served face. The raw pathname "//" failed the bare
    // gate while both the shape arms and the normalizer folded the
    // spelling healthy — the live probe answered ZERO warnings for an
    // inert diverging value. The divergence arm owns it now.
    const slashy = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://example.com//" }),
      { servedSiteUrl: "http://other.com" },
    );
    expect(slashy.fatal).toBeNull();
    const slashySite = (slashy.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(slashySite).toHaveLength(1);
    expect(slashySite[0]).toContain("is NOT what this server serves");
    expect(slashySite[0]).toContain("http://example.com//");
    expect(slashySite[0]).toContain("http://other.com");
  });

  it("S71-5a: the IPv6/127-family loopback origins answer the loopback warning; the healthy origin stays silent", () => {
    // Face 1 — the IPv6 loopback: the parsed hostname keeps its
    // brackets, so the exact-match predicate passed it as healthy.
    const v6 = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://[::1]:3000" }));
    const v6Site = (v6.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(v6Site).toHaveLength(1);
    expect(v6Site[0]).toContain("[::1]:3000");
    expect(v6Site[0]).toContain("localhost origin");

    // Face 2 — the 127/8 range: only 127.0.0.1 itself matched.
    const range = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://127.0.0.2:3000" }));
    const rangeSite = (range.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(rangeSite).toHaveLength(1);
    expect(rangeSite[0]).toContain("127.0.0.2:3000");

    // Face 3 — the IPv4-mapped loopback (the ::ffff:127.x.x.x family).
    const mapped = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://[::ffff:127.0.0.1]:3000" }));
    const mappedSite = (mapped.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(mappedSite).toHaveLength(1);
    expect(mappedSite[0]).toContain("::ffff:127.0.0.1");

    // The control — the healthy public origin with the same one-arg
    // posture stays silent (no false alarm from the widened grammar).
    const healthy = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://example.com" }));
    const healthySite = (healthy.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(healthySite).toHaveLength(0);
  });
});

describe("session-72 (S72-1/2/3): the quote-residue keyword prefix + the divergence slash-fold + the loopback hextet grammar", () => {
  it("S72-1a: a keyword-first value behind a residue quote never prints its secret — every key family, every residue arm; the controls unchanged", () => {
    // Face 1 — the unclosed-DQ boot residue arm, password FIRST: the
    // keyword pass's (^|\s) prefix rejected the leading quote, so no
    // pass matched and the whole value printed VERBATIM (the live
    // probe carried SuperSecret123 in clear through stdout +
    // server.log).
    const dqFirst = bootEnvCheck(
      env({ DATABASE_URL: '"password=SuperSecret123 host=localhost user=admin' }),
    );
    const dqJoined = (dqFirst.warnings ?? []).join("\n");
    expect(dqJoined).toContain("password=***");
    expect(dqJoined).not.toContain("SuperSecret123");

    // Face 2 — the SQ mirror through the same arm.
    const sqFirst = bootEnvCheck(
      env({ DATABASE_URL: "'password=QuotedSecret dbname=x" }),
    );
    const sqJoined = (sqFirst.warnings ?? []).join("\n");
    expect(sqJoined).toContain("password=***");
    expect(sqJoined).not.toContain("QuotedSecret");

    // Face 3 — the @-bearing variant: the tail after the last @ was
    // misattributed as host by the mask-to-last-@ fallback (the live
    // probe printed ***@tPass host=localhost).
    const atFirst = bootEnvCheck(
      env({ DATABASE_URL: '"password=S3cr@tPass host=localhost' }),
    );
    const atJoined = (atFirst.warnings ?? []).join("\n");
    expect(atJoined).toContain("password=***");
    expect(atJoined).not.toContain("tPass");

    // Face 4 — the passfile key family behind the same leading quote
    // (the key-set trio's other secret-bearing member; the live probe
    // printed the key path verbatim).
    const passfile = bootEnvCheck(
      env({ DATABASE_URL: '"passfile=/etc/ssl/private.key host=h' }),
    );
    const pfJoined = (passfile.warnings ?? []).join("\n");
    expect(pfJoined).toContain("passfile=***");
    expect(pfJoined).not.toContain("/etc/ssl");

    // Face 5 — the file-residue arm (the unloaded-.env posture): the
    // same keyword-first face through the other sanctioned printer.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      '"password=FileTailSecret host=h',
      true,
    );
    expect(fileFace).toContain("password=***");
    expect(fileFace).not.toContain("FileTailSecret");

    // Control 1 — the HOST-first keyword form behind the same leading
    // quote already masked (the key rides a whitespace prefix) and
    // must stay byte-identical under the widened class.
    const hostFirst = bootEnvCheck(
      env({ DATABASE_URL: '"host=localhost password=secret123"' }),
    );
    const hfJoined = (hostFirst.warnings ?? []).join("\n");
    expect(hfJoined).toContain("password=***");
    expect(hfJoined).not.toContain("secret123");

    // Control 2 — the S69-1 plain containers still mask byte-identically
    // (the prefix widening must not disturb the sanctioned spellings).
    const plainContainer = databaseUrlInertValueWarning(
      { NODE_ENV: "production" },
      "host=localhost user=admin password='my secret' dbname=app",
      false,
    );
    expect(plainContainer).not.toContain("my secret");
  });

  it("S72-2a: a trailing #/? (or ?/?) spelling answers EXACTLY ONE warning — the shape arm's; the empty delimiters and the multi-slash faces unchanged", () => {
    // Face 1 — the fragment-opening #/?: the pre-parse [/?#] fold
    // erased the delimiter and double-warned (the live probe fired
    // BOTH the "carries a query string (or fragment/credentials)"
    // shape arm AND the divergence arm for one root cause — the
    // S69-3 exactly-one-warning law broken at the edge).
    const hashSlash = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://runtime.example.com/#/?" }),
      { servedSiteUrl: "https://served.example.com" },
    );
    expect(hashSlash.fatal).toBeNull();
    const hsSite = (hashSlash.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(hsSite).toHaveLength(1);
    expect(hsSite[0]).toContain("query string (or fragment");
    expect(hsSite[0]).not.toContain("NOT what this server serves");

    // Face 2 — the query-opening ?/? mirror.
    const querySlash = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "https://runtime.example.com/?/?" }),
      { servedSiteUrl: "https://served.example.com" },
    );
    expect(querySlash.fatal).toBeNull();
    const qsSite = (querySlash.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(qsSite).toHaveLength(1);
    expect(qsSite[0]).toContain("query string (or fragment");
    expect(qsSite[0]).not.toContain("NOT what this server serves");

    // Controls — the S71-4a faces re-verified in the same run: the
    // empty delimiters never mismatch an identical served face, and
    // the multi-slash divergence still answers exactly the divergence
    // arm's warning.
    const empty = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://example.com?" }),
      { servedSiteUrl: "http://example.com" },
    );
    const emptySite = (empty.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(emptySite).toHaveLength(0);

    const slashy = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://example.com//" }),
      { servedSiteUrl: "http://other.com" },
    );
    const slashySite = (slashy.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(slashySite).toHaveLength(1);
    expect(slashySite[0]).toContain("is NOT what this server serves");
  });

  it("S72-3a: the short-hextet mapped forms and the 127.-prefixed DNS name are NOT loopback; the S71-5a families still are", () => {
    // Face 1 — the short-hextet public addresses as IDENTICAL
    // runtime=served production pairs: ::ffff:7f0:1 is 7.240.0.1 and
    // ::ffff:7f:1 is 0.127.0.1 (only the FULL 4-hex-digit first
    // mapped hextet 7fXX is the 127/8 range) — the loose prefix
    // classified them loopback and fired the spurious "would
    // advertise a localhost origin" warning (the live probe: 1
    // warning where a public identical pair answers 0).
    for (const origin of ["http://[::ffff:7f0:1]:3000", "http://[::ffff:7f:1]:3000"]) {
      const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: origin }), {
        servedSiteUrl: origin,
      });
      expect(report.fatal).toBeNull();
      const siteWarnings = (report.warnings ?? []).filter((w) =>
        w.includes("NEXT_PUBLIC_SITE_URL"),
      );
      expect(siteWarnings).toHaveLength(0);
    }

    // Face 2 — the 127.-prefixed DNS name: a PUBLIC name (hostname
    // parse cannot know DNS resolution; the loopback warning was
    // never about it) — same identical-pair posture.
    const dns = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://127.0.0.1.example.com" }),
      { servedSiteUrl: "http://127.0.0.1.example.com" },
    );
    expect(dns.fatal).toBeNull();
    const dnsSite = (dns.warnings ?? []).filter((w) =>
      w.includes("NEXT_PUBLIC_SITE_URL"),
    );
    expect(dnsSite).toHaveLength(0);

    // Controls — the S71-5a families re-verified in the same run
    // (the same one-arg posture: no served face modeled, so the
    // false-alarm cure cannot silence the loopback warning — the
    // S42-6/S68-4 posture the S71-5a pins ride): ::1, the 127/8
    // range, and the mapped family (both spellings — the dotted
    // input the parser normalizes to ::ffff:7f00:1 and the hex form
    // itself) still answer the loopback warning.
    for (const origin of [
      "http://[::1]:3000",
      "http://127.0.0.2:3000",
      "http://[::ffff:127.0.0.1]:3000",
      "http://[::ffff:7f00:1]:3000",
    ]) {
      const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: origin }));
      const siteWarnings = (report.warnings ?? []).filter((w) =>
        w.includes("NEXT_PUBLIC_SITE_URL"),
      );
      expect(siteWarnings).toHaveLength(1);
      expect(siteWarnings[0]).toContain("localhost origin");
    }
  });
});

// Session-73 (S73-1/S73-2): the control-char keyword prefix + the
// residue-predicate one-home.
describe("session-73 (S73-1/S73-2): the control-char keyword prefix + the residue-predicate one-home", () => {
  it("S73-1a: a keyword behind a non-\\s control character never prints its secret — both residue arms; the \\t control unchanged", () => {
    // Face 1 — the process-env arm, \\x01 before the key: every Cc
    // char that JS \\s does NOT match (\\x00-\\x08, \\x0e-\\x1f, \\x7f,
    // C1 \\x80-\\x9f) defeated the keyword pass's (^|[\\s"']) prefix,
    // so the password printed VERBATIM through the report's warning
    // (the live probe carried Secret123 in clear — stdout +
    // server.log; the AUDIT-1 M-1 genus: one control char + one
    // space-separated keyword, a ONE-artifact shape).
    const soh = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://host/db\x01password=Secret123 user=admin" }),
    );
    const sohJoined = (soh.warnings ?? []).join("\n");
    expect(sohJoined).toContain("password=***");
    expect(sohJoined).not.toContain("Secret123");

    // Face 2 — the DEL mirror (\\x7f): the same leak face through
    // the same arm.
    const del = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://host/db\x7fpassword=DelSecret45 user=admin" }),
    );
    const delJoined = (del.warnings ?? []).join("\n");
    expect(delJoined).toContain("password=***");
    expect(delJoined).not.toContain("DelSecret45");

    // Face 3 — the file-residue arm (the unloaded-.env posture): the
    // same \\x01 face through the other sanctioned printer.
    const fileFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "production" },
      "postgresql://host/db\x01password=FileCtlSecret9 user=admin",
      true,
    );
    expect(fileFace).toContain("password=***");
    expect(fileFace).not.toContain("FileCtlSecret9");

    // Control — the \\t face (a control char that IS \\s) already
    // masked by the S72-1a class and must stay byte-identical under
    // the widened prefix (the mechanism control: the boundary is
    // exactly \\s membership).
    const tab = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://host/db\tpassword=TabSecret77 user=admin" }),
    );
    const tabJoined = (tab.warnings ?? []).join("\n");
    expect(tabJoined).toContain("password=***");
    expect(tabJoined).not.toContain("TabSecret77");

    // Control — the passfile key family behind the same control
    // char (the key-set trio's other secret-bearing member).
    const passfile = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://host/db\x0bpassfile=/etc/ssl/p.key user=u" }),
    );
    const pfJoined = (passfile.warnings ?? []).join("\n");
    expect(pfJoined).toContain("passfile=***");
    expect(pfJoined).not.toContain("/etc/ssl");
  });

  it("S73-2a: the DB-residue predicate lives in EXACTLY ONE place (the one-home doctrine — three inline literals collapsed)", () => {
    // The predicate (/\\p{Cc}/u.test(v) || v.startsWith('"') ||
    // v.startsWith("'")) was triplicated across boot-env.ts (the
    // process-env arm, the file-residue arm, the inert-value seam's
    // negated form) — a future widening edited one site and silently
    // diverged the other two (the S29-2/S59-1 drift hazard). The
    // cure: the module-local dbUrlCarriesResidue helper is the single
    // home; the census asserts its body is the ONLY \\p{Cc} test site
    // left in the file. The extraction's behavioral equivalence is
    // owned by the existing residue pins (S63-2/S72-1a/S73-1a); this
    // pin owns the shape.
    const src = readFileSync(
      join(import.meta.dirname, "../src/lib/boot-env.ts"),
      "utf8",
    );
    const cSites = src.match(/\\p\{Cc\}/gu) ?? [];
    expect(cSites.length, "the \\p{Cc} residue test lives in exactly one place").toBe(1);
    expect(src).toContain("function dbUrlCarriesResidue(");
  });
});

describe("session-74 (S74-1/S74-2/S74-3): the query-pass reorder + the file-stray-quote residue face + the siteUrl redaction", () => {
  it("S74-1a: a URI-query password carrying a raw @ fully masks on every printer (keyword → query → scheme reorder)", () => {
    // AUDIT-1 M-1 (session-74, live-probed through the real
    // printers): the keyword pass's prefix class has no ?/&, and the
    // scheme arm's token lastIndexOf("@") lands INSIDE the password
    // (a raw @ is legal in URI query values, RFC 3986), consuming the
    // ?password= trigger the query pass — running LAST — needed. The
    // residue printer printed "***@Winter2024!" (the password's
    // post-@ tail in clear); the inert-value printer printed
    // "postgresql://***@S3cr3t". The reorder (keyword → query →
    // scheme) closes the genus: the query output carries no bare @
    // for the scheme arm to misattribute.
    //
    // Face 1 — the file-residue printer (the unclosed-quote residue
    // shape, the exact typo class the arm exists to print).
    const residueFace = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      '"postgresql://host/db?password=Hunter2@Winter2024!',
    );
    expect(residueFace).toContain("password=***");
    expect(residueFace).not.toContain("Winter2024");

    // Face 2 — the inert-value printer (the clean-value shape; the
    // process-env-unset, launch-divergence posture).
    const inertFace = databaseUrlInertValueWarning(
      { NODE_ENV: "development" },
      "postgresql://host/db?password=Sup3r@S3cr3t",
      false,
    );
    expect(inertFace).toContain("password=***");
    expect(inertFace).not.toContain("S3cr3t");

    // Face 3 — userinfo AND a query password riding the same URL:
    // both mask, the host stays visible (the S65-1b visibility
    // doctrine).
    const both = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      '"postgresql://u:p@host/db?password=a@b',
    );
    expect(both).toContain("***@host/db");
    expect(both).toContain("password=***");
    expect(both).not.toContain("a@b");

    // Face 4 — the process-env arm (an interior non-whitespace control
    // char carrying the query password — a trailing tab would be
    // consumed by the S69-4 trim, so the arm never sees it; the S73-1a
    // companion face through the report's warning).
    const proc = bootEnvCheck(
      env({ DATABASE_URL: "postgresql://host/db?password=ProcQ@Secret9\x01" }),
    );
    const procJoined = (proc.warnings ?? []).join("\n");
    expect(procJoined).toContain("password=***");
    expect(procJoined).not.toContain("ProcQ");
    expect(procJoined).not.toContain("Secret9");
  });

  it("S74-2a: a non-leading quote on a file: value warns with the junk-file mechanism (the mirrored typo's silent wrong-DB boot)", () => {
    // AUDIT-1 M-2 (session-74, live-probed incl. the engine): the
    // residue predicate (control char || LEADING quote) missed the
    // one-keystroke mirrored typo file:../db/custom.db" — the engine
    // ACCEPTS it (the live probe resolved a junk-named custom.db",
    // created it 0-byte, SELECT 1 answered OK — a healthy-looking
    // boot against a table-less DB, ZERO [boot] signal). The widening
    // is file:-SCOPED (a blanket includes would false-positive
    // libpq's sanctioned quoted keyword containers).
    //
    // Face 1 — the trailing quote through the file-residue printer.
    const trailing = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      'file:../db/custom.db"',
    );
    expect(trailing).toContain("stray quote");
    expect(trailing).toContain("junk-named file");
    expect(trailing).toContain('custom.db\\"');

    // Face 2 — the interior quote (the same genus, mid-path).
    const interior = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      'file:../db/cu"stom.db',
    );
    expect(interior).toContain("stray quote");

    // Face 3 — the single-quote variant.
    const single = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom.db'",
    );
    expect(single).toContain("stray quote");

    // Face 4 — the process-env arm fires the same face.
    const proc = bootEnvCheck(
      env({ DATABASE_URL: 'file:../db/custom.db"' }),
    );
    const procJoined = (proc.warnings ?? []).join("\n");
    expect(procJoined).toContain("DATABASE_URL");
    expect(procJoined).toContain("stray quote");
    expect(procJoined).toContain("junk-named file");

    // Face 5 — the inert-value seam routes the face to the residue
    // seam (the negated form of the one-home predicate), never its
    // own divergence warning.
    const inert = databaseUrlInertValueWarning(
      { NODE_ENV: "development" },
      'file:../db/custom.db"',
      false,
    );
    expect(inert).toBeNull();

    // Control — libpq's sanctioned quoted keyword containers stay
    // CLEAN (no control char, no leading quote, NOT file:-prefixed:
    // the false-positive guard the file:-scoping exists for).
    const keyword = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "host=localhost password='my secret' user=admin",
    );
    expect(keyword).toBeNull();

    // Control — the healthy contract value stays silent (the
    // .env.example posture never warns).
    const healthy = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom.db",
    );
    expect(healthy).toBeNull();
  });

  it("S74-3a: the NEXT_PUBLIC_SITE_URL shape arms redact credentials (the family's one unredacted printer)", () => {
    // AUDIT-1 L-1 (session-74, live-probed): the queryCarrying arm
    // explicitly covers credentials (parsed.username/password), so
    // http://user:secretpw@host printed the password VERBATIM into
    // the boot log. The cure: the three shape arms print through
    // redactCredentials — the shape stays visible, the userinfo
    // segment never prints (the S63-2 doctrine).
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://user:secretpw@host" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("carries a query string");
    expect(joined).not.toContain("secretpw");
    expect(joined).toContain("***@host");
  });
});

describe("session-75 (S75-1/S75-2/S75-3): the loopback redaction + the residue-face one-home + the predicate widening", () => {
  it("S75-1a: the loopback production siteUrl arm redacts credentials (the family's one REMAINING unredacted printer)", () => {
    // AUDIT-1 A1-F1 (session-75, live-probed): S74-3 routed the three
    // SHAPE arms through redactCredentials and missed the fourth member
    // of the family — the loopback arm interpolated the raw value, so a
    // credentialed loopback paste printed the password VERBATIM while
    // the shape arm beside it printed http://***@… (both fire on the
    // same value). The cure: the loopback interpolation routes through
    // redactCredentials too — the family is uniformly redacted now.
    const report = bootEnvCheck(
      env({ NEXT_PUBLIC_SITE_URL: "http://admin:hunter2@localhost:3000" }),
    );
    const joined = (report.warnings ?? []).join("\n");
    expect(joined).toContain("in production");
    expect(joined).not.toContain("hunter2");
    expect(joined).toContain("***@localhost:3000");

    // The false-positive guard — a HEALTHY loopback value is
    // byte-identical under the pass (nothing to mask), so the existing
    // loopback-posture pins hold.
    const healthy = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }));
    const hj = (healthy.warnings ?? []).join("\n");
    expect(hj).toContain('is "http://localhost:3000" in production');
    expect(hj).not.toContain("***");
  });

  it("S75-2a: a combined control+quote value keeps the CONTROL story through BOTH printers (the one-home face quartet)", () => {
    // AUDIT-1 A1-F2 (session-75, live-probed): the file-face
    // stray-quote classifier lacked the !controlFace gate its
    // process-env twin carried — the SAME value carrying both a tab
    // and a trailing quote printed the control-char story through
    // bootEnvCheck but the STRAY-QUOTE story through
    // databaseUrlFileResidueWarning (the two-homes drift the module's
    // own S73-2b note warns about, realized one session later). The
    // cure: the face quartet (quoteFace/controlFace/newlineFace/
    // strayQuoteFace) single-homes in one classifier consumed by both
    // printers (and the predicate composes it) — the precedence is
    // identical everywhere: control wins a combined value.
    const combined = 'file:../db/custom.db\t"';

    // Face 1 — the process-env printer: the CONTROL story (the pinned
    // S60-1 precedence, unchanged by this round).
    const proc = bootEnvCheck(env({ DATABASE_URL: combined }));
    const procJoined = (proc.warnings ?? []).join("\n");
    expect(procJoined).toContain("control character");
    expect(procJoined).not.toContain("stray quote");

    // Face 2 — the file-side printer: the SAME story (the divergence
    // cure — this face was the stray-quote misattribution).
    const file = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      combined,
    );
    expect(file).toContain("control character");
    expect(file).not.toContain("stray quote");

    // Face 3 — the one-home SHAPE: the quote-opener face literal
    // (startsWith('"')) lives in exactly ONE place — the shared
    // classifier (the S73-2a one-home doctrine extended from the
    // predicate to the face quartet it feeds).
    const src = readFileSync(
      join(import.meta.dirname, "../src/lib/boot-env.ts"),
      "utf8",
    );
    const openerSites = src.match(/startsWith\('"'\)/gu) ?? [];
    expect(openerSites.length, "the quote-opener face test lives in exactly one place").toBe(1);
  });

  it("S75-3a: the residue predicate widens to the invisible-whitespace family + the backtick, and the stray-quote arm scopes to RELATIVE file: values (the O'Brien false-positive cure)", () => {
    // AUDIT-1 A1-F3/A1-F4 (session-75, live-probed): three predicate
    // gaps — (1) a LEGITIMATE quote inside an ABSOLUTE file: path
    // (file:/opt/data/O'Brien.db) false-positived the stray-quote arm
    // with a mechanism sentence that is false for absolute refs (no
    // re-anchor, no junk file under db/ — passed through raw); (2) the
    // \p{Cc} class missed the invisible-whitespace family (an INTERIOR
    // NBSP \u00a0 or ZWSP \u200b — web/chat paste — re-anchors into the
    // junk-named file with ZERO boot signal, the S57-1 genus); (3) a
    // trailing BACKTICK (the mirrored-typo genus on the quote's
    // neighboring key) sailed past every arm. The cures: the
    // stray-quote arm scopes to RELATIVE file: values (every S74-2a
    // fixture is relative — the junk-file mechanism sentence is true
    // for exactly that scope), the control-char class admits the
    // invisible-whitespace family, and the backtick joins the quote in
    // the stray-junk-char arm.

    // Face 1 — the absolute-ref false-positive cure: a legitimate
    // quote in an absolute path NEVER warns (either printer).
    const obrienFile = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:/opt/data/O'Brien.db",
    );
    expect(obrienFile).toBeNull();
    const obrienProc = bootEnvCheck(env({ DATABASE_URL: "file:/opt/data/O'Brien.db" }));
    expect((obrienProc.warnings ?? []).join("\n")).not.toContain("stray quote");

    // Face 2 — the interior NBSP warns through the file-side printer
    // (the invisible-whitespace paste family; the trimmed face keeps
    // the interior occurrence).
    const nbsp = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom\u00a0.db",
    );
    expect(nbsp).toContain("control character");

    // Face 3 — the interior ZWSP likewise.
    const zwsp = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom\u200bdb",
    );
    expect(zwsp).toContain("control character");

    // Face 4 — the process-env arm fires on the NBSP value too.
    const procNbsp = bootEnvCheck(env({ DATABASE_URL: "file:../db/custom\u00a0.db" }));
    expect((procNbsp.warnings ?? []).join("\n")).toContain("control character");

    // Face 5 — the trailing BACKTICK joins the stray-quote arm (the
    // neighboring-key mirrored typo; the junk-file genus applies).
    const btick = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom.db`",
    );
    expect(btick).toContain("stray quote");

    // Control — the healthy contract value stays silent (the
    // .env.example posture never warns; the widening admits no
    // healthy value).
    const healthy = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "file:../db/custom.db",
    );
    expect(healthy).toBeNull();

    // Control — libpq's sanctioned quoted keyword containers stay
    // clean (the standing S74-2b false-positive guard).
    const keyword = databaseUrlFileResidueWarning(
      { NODE_ENV: "development" },
      "host=localhost password='my secret' user=admin",
    );
    expect(keyword).toBeNull();
  });
});
