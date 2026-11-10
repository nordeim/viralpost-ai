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

  // Session-20 (S20-7): the uid and IP buckets used to share ONE string
  // namespace (`generate:${user?.id ?? clientKey(req)}`) — under the
  // documented mis-declared-proxy hazard, an attacker who knows a
  // victim's cuid could set x-forwarded-for: <cuid> to share/exhaust
  // that user's 20/15min bucket. The families are namespaced now.
  it("the generate route keys its limiter on session-or-IP (namespaced families — S20-7)", () => {
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toContain("generate:uid:${user.id}");
    expect(src).toContain("generate:ip:${clientKey(req)}");
    // The retired shared-namespace form can never return.
    expect(src).not.toContain("generate:${user?.id ?? clientKey(req)}");
  });

  // Session-14 (S14-3): the guard shape reads like an auth wall but
  // enforces nothing — anonymous generation is BY DESIGN (the
  // reference's logged-out tool, ADR-003); the session read only
  // SELECTS the limiter bucket (uid vs IP). The wiring pin freezes the
  // null-fallback face so the route can neither silently grow a 401
  // wall nor lose the uid bucket.
  it("session-14 (S14-3): the generate route's session guard only selects the bucket (guests generate — no 401 wall)", () => {
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toContain("const user = isGuarded(guard) ? null : guard.user;");
    // The guard's 401 response is never returned anywhere in the route.
    expect(src).not.toMatch(/return\s+guard\.response/);
    expect(src).not.toMatch(/return\s+(?:await\s+)?guard\b/);
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

  it("session-11 (F11-7): an over-length idea answers the SHORTER message, not the empty-idea one (both schema and seam ceilings)", () => {
    // Two ceilings used to give two messages: 501–1000 raw chars passed
    // the schema and failed sanitizeIdea with "Keep the idea a little
    // shorter (500 characters max).", while >1000 chars failed the Zod
    // max(1000) FIRST and answered "Describe your post idea first." —
    // misleading for a user who did describe their idea (the textarea
    // has no maxLength; a paste reaches the boundary). The pin: the
    // schema-failure branch distinguishes over-length from empty through
    // the SAME exported message the seam owns.
    const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
    expect(src).toMatch(/ideaTooLongMessage\(\)/);
    expect(src).toMatch(/"Describe your post idea first\."/);
    const gen = stripComments(read("src/lib/generator.ts") ?? "");
    expect(gen).toMatch(/export function ideaTooLongMessage/);
  });

  // Session-15 (S15-2): the two route-local parse sites (generate +
  // contact) used to feed readBoundedJson's null (the content-type CSRF
  // gate's unparseable-by-policy class, or unparseable JSON) straight to
  // safeParse — contact answered Zod's dev-facing "Invalid input:
  // expected object, received null" (live-confirmed) and generate
  // answered the describe-first message for a malformed body. The auth
  // family's parseBody seam answers the pinned "Invalid request body"
  // for this class; the route-local sites join the vocabulary.
  describe("session-15 (S15-2): the route-local parse sites answer the parseBody null-body vocabulary", () => {
    it("both routes null-check read.value ahead of safeParse (the pinned Invalid request body)", () => {
      for (const rel of ["src/app/api/generate/route.ts", "src/app/api/contact/route.ts"]) {
        const src = stripComments(read(rel) ?? "");
        // The null arm sits between the tooLarge arm and the safeParse.
        const tooLarge = src.indexOf("read.tooLarge");
        const nullArm = src.indexOf("read.value === null");
        const parse = src.indexOf("safeParse(");
        expect(nullArm, `${rel}: no read.value === null arm`).toBeGreaterThan(-1);
        expect(tooLarge, `${rel}: no tooLarge arm`).toBeGreaterThan(-1);
        expect(parse, `${rel}: no safeParse`).toBeGreaterThan(-1);
        expect(nullArm, `${rel}: the null arm must precede safeParse`).toBeLessThan(parse);
        const armWindow = src.slice(nullArm, nullArm + 160);
        expect(armWindow, `${rel}: the null arm must answer the parseBody vocabulary`).toContain(
          '"Invalid request body"',
        );
      }
    });

    it("generate's over-length message fires only for STRING ideas (a non-string idea is the empty-idea branch)", () => {
      // A JSON body like {"idea": 999999} fails the schema on TYPE, but
      // String(999999) is non-empty — the old branch answered the
      // over-length message for a type error. Only a genuine string idea
      // can be over-length.
      const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
      const branch = src.match(
        /typeof rawIdea === "string" && rawIdea\.trim\(\)\.length > 0\s*\?\s*ideaTooLongMessage\(\)/,
      );
      expect(branch, "the over-length arm must gate on typeof rawIdea === 'string'").toBeTruthy();
    });
  });

  // Session-16 (S16-1): the S15-2 route-local vocabulary completed for
  // the NON-OBJECT class. The contact route's null-check guarded the
  // null face only — a JSON body parsing to a string/array/number fed
  // safeParse and leaked Zod's dev-facing "Invalid input: expected
  // object, received string" (live-confirmed with '"hello"'). The
  // widened arm owns the whole malformed-SHAPE class; generate needs no
  // mirror (its narrowing bypasses the issue message — the pinned
  // describe-first contract).
  describe("session-16 (S16-1): the contact site's object-shape guard", () => {
    it("contact widens the null arm to the non-object class (null OR non-object OR array, ahead of safeParse)", () => {
      const src = stripComments(read("src/app/api/contact/route.ts") ?? "");
      const arm = src.match(
        /read\.value === null \|\| typeof read\.value !== "object" \|\| Array\.isArray\(read\.value\)/,
      );
      expect(arm, "the widened object-shape arm must be present").toBeTruthy();
      // The arm sits ahead of safeParse (the null arm's S15-2 ordering).
      const armIdx = src.indexOf("read.value === null");
      const parse = src.indexOf("safeParse(");
      expect(armIdx).toBeGreaterThan(-1);
      expect(parse).toBeGreaterThan(armIdx);
      // The arm answers the parseBody vocabulary.
      const armWindow = src.slice(armIdx, armIdx + 240);
      expect(armWindow).toContain('"Invalid request body"');
    });
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
