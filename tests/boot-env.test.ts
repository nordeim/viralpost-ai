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
// are docs/session_1..47.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyBootEnvReport, bootEnvCheck, KNOWN_VIRALPOST_VARS, shadowingEnvFileWarnings } from "../src/lib/boot-env";

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
