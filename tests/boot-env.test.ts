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
// are docs/session_1..21.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyBootEnvReport, bootEnvCheck, KNOWN_VIRALPOST_VARS } from "../src/lib/boot-env";

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
});
