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
