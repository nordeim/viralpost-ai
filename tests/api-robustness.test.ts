import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The API robustness battery, re-anchored for ViralPost AI's surface:
// every mutating handler wraps its DB work in try/catch (the { ok, error }
// envelope survives a SQLITE_BUSY-class failure), every public write
// route is rate-limited, validation failures answer the envelope's 400s,
// and the sessioned routes guard through requireSession.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const MUTATING_ROUTES = [
  "src/app/api/contact/route.ts",
  "src/app/api/generate/route.ts",
  "src/app/api/auth/login/route.ts",
  "src/app/api/auth/signup/route.ts",
  "src/app/api/auth/verify/route.ts",
  "src/app/api/auth/resend/route.ts",
  "src/app/api/auth/forgot-password/route.ts",
  "src/app/api/auth/reset-password/route.ts",
] as const;

describe("the { ok, error } envelope family", () => {
  it("every mutating route imports the envelope helpers", () => {
    for (const rel of MUTATING_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/from "@\/lib\/api"/);
    }
  });

  it("every DB-touching handler wraps its writes in try/catch → the envelope survives", () => {
    for (const rel of MUTATING_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: no try/catch around the DB work`).toMatch(
        /try\s*\{[\s\S]*?catch/,
      );
      expect(src, `${rel}: no fail()/ERR inside the catch`).toMatch(
        /catch[\s\S]*?(?:fail\(|ERR\.)/,
      );
    }
  });

  it("the public write routes are rate-limited before the parse", () => {
    for (const rel of ["src/app/api/generate/route.ts", "src/app/api/contact/route.ts"]) {
      const src = stripComments(read(rel) ?? "");
      const limit = src.indexOf("rateLimit(");
      const seam = src.indexOf("readBoundedJson(req)");
      expect(limit, `${rel}: no rateLimit call`).toBeGreaterThanOrEqual(0);
      expect(seam, `${rel}: no seam call`).toBeGreaterThan(limit);
    }
  });

  it("the generate route keys its limiter on session-or-IP", () => {
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toContain("generate:${user?.id ?? clientKey(req)}");
  });

  it("the contact route keys its limiter per IP", () => {
    const src = stripComments(read("src/app/api/contact/route.ts") ?? "");
    expect(src).toContain("contact:${clientKey(req)}");
  });

  it("validation failures answer the envelope's 400s (no raw throws)", () => {
    for (const rel of MUTATING_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: schema-validated input`).toMatch(
        /safeParse\(|parseBody\(/,
      );
    }
  });

  it("the generate route's rate-limit denial carries Retry-After", () => {
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toMatch(/Retry-After/);
    expect(src).toMatch(/limited\.retryAfterSec/);
  });

  it("sanitizeIdea failures answer BAD_REQUEST (the friendly error surface)", () => {
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toMatch(/sanitizeIdea/);
    expect(src).toMatch(/BAD_REQUEST/);
  });
});

describe("the sessioned me/logout family", () => {
  it("the me route answers the envelope with the session user", () => {
    const src = stripComments(read("src/app/api/auth/me/route.ts") ?? "");
    expect(src).toMatch(/requireSession|getSessionUser/);
  });

  it("the health route is an honest 503 when the db is down", () => {
    const src = stripComments(read("src/app/api/health/route.ts") ?? "");
    expect(src).toMatch(/SERVICE_UNAVAILABLE/);
    expect(src).toMatch(/503/);
  });
});

describe("session-9 (F9-7): the reset funnel's DB-OUTAGE honesty (the read path joins the write path)", () => {
  // The update paths already classify the transient-abort family
  // (P2024 pool timeout / P2028 transaction timeout) as the 503
  // envelope; the READ paths used `.catch(() => null)` — an outage
  // indistinguishable from "no such user/token", answering the
  // no-enumeration 200 (forgot) or the invalid-token 400 (reset) for a
  // SERVER condition. And the residual `else { throw error; }` escaped
  // the envelope as a raw Next 500 — contradicting reset-password's own
  // "never a bare 500 past it" comment.
  it("both reset-funnel routes classify the transient-abort family on their READ path as the 503 envelope", () => {
    for (const rel of [
      "src/app/api/auth/forgot-password/route.ts",
      "src/app/api/auth/reset-password/route.ts",
    ]) {
      const src = stripComments(read(rel) ?? "");
      // the read path carries the same classification the write path has
      const readIdx = src.search(/findUnique\(|findFirst\(/);
      expect(readIdx, `${rel}: no db read`).toBeGreaterThan(0);
      const readWindow = src.slice(readIdx, readIdx + 700);
      expect(
        readWindow,
        `${rel}: the db read must classify P2024/P2028 as UNAVAILABLE`,
      ).toMatch(/P2024[\s\S]{0,120}P2028|P2028[\s\S]{0,120}P2024/);
      expect(readWindow).toMatch(/UNAVAILABLE|503/);
    }
  });

  it("neither route carries a bare re-throw past its catch (the envelope is absolute)", () => {
    for (const rel of [
      "src/app/api/auth/forgot-password/route.ts",
      "src/app/api/auth/reset-password/route.ts",
    ]) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: the bare re-throw must not survive`).not.toMatch(
        /throw error;/,
      );
      expect(src, `${rel}: the residual class answers ERR.INTERNAL()`).toMatch(
        /ERR\.INTERNAL\(\)/,
      );
    }
  });
});
