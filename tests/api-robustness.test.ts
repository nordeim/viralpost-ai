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
    it("both routes shape-check read.value ahead of safeParse through the shared seam (the pinned Invalid request body)", () => {
      for (const rel of ["src/app/api/generate/route.ts", "src/app/api/contact/route.ts"]) {
        const src = stripComments(read(rel) ?? "");
        // Session-29 (S29-2): the arm is the SEAM's predicate call now —
        // the inline three-clause guard moved into api.ts's isJsonObject
        // (the one-home cure); the ordering contract is unchanged.
        const tooLarge = src.indexOf("read.tooLarge");
        const shapeArm = src.indexOf("!isJsonObject(read.value)");
        const parse = src.indexOf("safeParse(");
        expect(shapeArm, `${rel}: no !isJsonObject(read.value) arm`).toBeGreaterThan(-1);
        expect(tooLarge, `${rel}: no tooLarge arm`).toBeGreaterThan(-1);
        expect(parse, `${rel}: no safeParse`).toBeGreaterThan(-1);
        expect(shapeArm, `${rel}: the shape arm must precede safeParse`).toBeLessThan(parse);
        const armWindow = src.slice(shapeArm, shapeArm + 160);
        expect(armWindow, `${rel}: the shape arm must answer the parseBody vocabulary`).toContain(
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
  // Session-28 (S28-3): the exemption above is RE-ADJUDICATED. The
  // S16-era reasoning addressed the Zod dev-message LEAK (true —
  // generate's narrowing never leaked); the vocabulary half of the
  // S15-2 doctrine ("the route-local sites join the vocabulary") was
  // never completed for generate: a valid-JSON-non-object body
  // ("hello", 42, []) answered the describe-first message while
  // contact answered "Invalid request body" for the same shape class.
  // The mirror closes it; the empty-idea and over-length arms above
  // are unchanged (an OBJECT body's non-string idea field still takes
  // the describe-first branch — the F11-7 posture).
  describe("session-16 (S16-1): the contact site's object-shape guard", () => {
    it("contact guards the non-object class through the shared seam predicate, ahead of safeParse", () => {
      const src = stripComments(read("src/app/api/contact/route.ts") ?? "");
      // Session-29 (S29-2): the widened arm is the seam's predicate call
      // now (api.ts's isJsonObject — null OR non-object OR array, the
      // S15-2/S16-1/S28-3 lineage owned in one place).
      const arm = src.match(/!isJsonObject\(read\.value\)/);
      expect(arm, "the shared object-shape arm must be present").toBeTruthy();
      // The arm sits ahead of safeParse (the null arm's S15-2 ordering).
      const armIdx = src.indexOf("!isJsonObject(read.value)");
      const parse = src.indexOf("safeParse(");
      expect(armIdx).toBeGreaterThan(-1);
      expect(parse).toBeGreaterThan(armIdx);
      // The arm answers the parseBody vocabulary.
      const armWindow = src.slice(armIdx, armIdx + 240);
      expect(armWindow).toContain('"Invalid request body"');
    });

    // Session-28 (S28-3): generate joins the widened vocabulary — the
    // same object-shape arm contact carries, ahead of safeParse.
    // Session-29 (S29-2): the arm is the seam's predicate call now.
    it("S28-3: generate guards the non-object class through the shared seam predicate too (the S16-1 exemption re-adjudicated)", () => {
      const src = stripComments(read("src/app/api/generate/route.ts") ?? "");
      const arm = src.match(/!isJsonObject\(read\.value\)/);
      expect(arm, "generate's shared object-shape arm must be present").toBeTruthy();
      const armIdx = src.indexOf("!isJsonObject(read.value)");
      const parse = src.indexOf("safeParse(");
      expect(armIdx, "generate: no object-shape arm").toBeGreaterThan(-1);
      expect(parse, "generate: the arm must precede safeParse").toBeGreaterThan(armIdx);
      const armWindow = src.slice(armIdx, armIdx + 240);
      expect(armWindow, "generate: the arm must answer the parseBody vocabulary").toContain(
        '"Invalid request body"',
      );
    });

    // Session-29 (S29-2): the shape-guard's ONE-HOME census — the
    // three-clause predicate (null OR non-object OR array) lived in
    // three byte-identical copies (api.ts + contact + generate) that had
    // already drifted once (contact widened in S16-1, generate only in
    // S28-3 — twelve sessions of different vocabularies for the same
    // malformed body). The predicate is exported from the seam now; the
    // route-local sites call it. The census counts the guard's
    // Array.isArray clause across all three files — exactly one is the
    // contract (the S23-7 divergence-hazard genus retired).
    it("S29-2: the malformed-shape guard lives in exactly one place (the api.ts seam, not forked across the route-local sites)", () => {
      const sites = [
        "src/lib/api.ts",
        "src/app/api/contact/route.ts",
        "src/app/api/generate/route.ts",
      ];
      let copies = 0;
      for (const rel of sites) {
        const src = stripComments(read(rel) ?? "");
        copies += (src.match(/Array\.isArray\(/g) ?? []).length;
      }
      expect(
        copies,
        "the shape-guard's Array.isArray clause must exist only in the api.ts predicate (a forked copy is the S23-7 divergence hazard)",
      ).toBe(1);
      // And the seam exports the predicate the sites consume.
      const api = stripComments(read("src/lib/api.ts") ?? "");
      expect(api).toMatch(/export function isJsonObject\(/);
    });
  });
});

describe("the sessioned me/logout family", () => {
  it("the me route answers the envelope with the session user", () => {
    const src = stripComments(read("src/app/api/auth/me/route.ts") ?? "");
    expect(src).toMatch(/requireSession|getSessionUser/);
  });

  // Session-29 (S29-1): the CSRF-logout cure — logout was the ONLY
  // side-effecting route a classic cross-site <form method="POST"> could
  // hit (it reads no body, so the family's content-type CSRF gate never
  // fires, and the response's Set-Cookie cleared the victim's session
  // regardless of SameSite=Lax, which gates cookie SENDING, not SETTING).
  // requireSession closes the vector (the Lax cookie never rides a
  // cross-site POST — the gate answers 401) and makes the no-op call
  // honest (an already-signed-out caller gets the envelope's 401, not a
  // meaningless 200 + a cookie clear that changed nothing).
  it("S29-1: the logout route gates on a live session (the CSRF-logout cure)", () => {
    const src = stripComments(read("src/app/api/auth/logout/route.ts") ?? "");
    expect(src, "the requireSession gate must own the clear").toMatch(/requireSession/);
    expect(src, "the gate's response branch must return ahead of the clear").toMatch(
      /isGuarded\(gate\)\) return gate\.response/,
    );
    // The clear still happens after the gate (the happy path is unchanged).
    const gateIdx = src.indexOf("requireSession()");
    const clearIdx = src.indexOf("clearSessionCookie()");
    expect(gateIdx).toBeGreaterThan(-1);
    expect(clearIdx).toBeGreaterThan(gateIdx);
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
      // (Session-37, S37-2: the hoisted classifier call — the literal
      // P2024/P2028 codes now live in src/lib/api.ts, owned by the
      // behavioral spec in the session-37 describe below; this pin
      // follows the code, the S36-3 precedent)
      const readIdx = src.search(/findUnique\(|findFirst\(/);
      expect(readIdx, `${rel}: no db read`).toBeGreaterThan(0);
      const readWindow = src.slice(readIdx, readIdx + 700);
      expect(
        readWindow,
        `${rel}: the db read must classify the transient family as UNAVAILABLE`,
      ).toMatch(/isTransientDbFailure\(/);
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

  // Session-23 (S23-8): the status discipline — the INTERNAL envelope
  // code NEVER rides the 400 default. fail()'s status argument defaults
  // to 400, so `fail("INTERNAL", …)` without the third argument answers
  // a SERVER-side failure as a CLIENT error (the contact + generate
  // catch arms shipped exactly that shape). The discipline: INTERNAL →
  // ERR.INTERNAL() (500) or the explicit fail(…, 500) when the surface
  // carries its own message.
  it("session-23 (S23-8): no route answers the INTERNAL envelope at the 400 default (the status discipline)", () => {
    const routes = [
      "src/app/api/contact/route.ts",
      "src/app/api/generate/route.ts",
      ...MUTATING_ROUTES,
      "src/app/api/auth/me/route.ts",
      "src/app/api/auth/logout/route.ts",
    ];
    for (const rel of routes) {
      const src = stripComments(read(rel) ?? "");
      expect(
        src,
        `${rel}: fail("INTERNAL", …) without an explicit status answers HTTP 400`,
      ).not.toMatch(/fail\(\s*"INTERNAL"\s*,\s*"[^"]*"\s*\)/);
    }
  });
});

// Session-37 (S37-2): the transient-abort classifier, hoisted. F9-7
// scoped the P2024/P2028 → 503 doctrine to the reset funnel; the other
// six DB-touching routes blanket-caught to 500 INTERNAL — the same
// SQLITE_BUSY-class failure answered with two incoherent envelopes
// (forgot-password: "The request took too long…" 503; login: "Something
// went wrong." 500). The classifier now lives in ONE place (src/lib/api.ts
// — the codes owned by the behavioral spec below), the six routes carry
// the arm ahead of ERR.INTERNAL(), and the reset funnel's four local
// sites route through the shared helper (the wire byte-identical — the
// F9-7 read-path pin above re-anchored to the helper call with the pin-
// follows-the-code doctrine).
describe("session-37 (S37-2): the transient-abort classifier (P2024/P2028 → the shared 503, hoisted from the reset funnel)", () => {
  it("isTransientDbFailure classifies the family (the codes live here and nowhere else)", async () => {
    const { Prisma } = await import("@prisma/client");
    const { isTransientDbFailure } = await import("@/lib/api");
    const transient = (code: string) =>
      new Prisma.PrismaClientKnownRequestError("pool timed out", {
        code,
        clientVersion: "6.19.3",
      });
    // the family
    expect(isTransientDbFailure(transient("P2024"))).toBe(true);
    expect(isTransientDbFailure(transient("P2028"))).toBe(true);
    // everything else — a known-request error OUTSIDE the family, a
    // generic Error, and non-objects — stays the residual 500's
    expect(isTransientDbFailure(transient("P2002"))).toBe(false);
    expect(isTransientDbFailure(new Error("generic"))).toBe(false);
    expect(isTransientDbFailure(null)).toBe(false);
    expect(isTransientDbFailure(undefined)).toBe(false);
    expect(isTransientDbFailure("P2024")).toBe(false);
  });

  it("every DB-touching route outside the reset funnel carries the transient arm ahead of ERR.INTERNAL()", () => {
    for (const rel of [
      "src/app/api/auth/login/route.ts",
      "src/app/api/auth/signup/route.ts",
      "src/app/api/auth/verify/route.ts",
      "src/app/api/auth/resend/route.ts",
      "src/app/api/auth/me/route.ts",
      "src/app/api/contact/route.ts",
    ]) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: the transient arm must be present`).toMatch(/isTransientDbFailure\(/);
      const armIdx = src.indexOf("isTransientDbFailure(");
      const internalIdx = src.indexOf("ERR.INTERNAL()");
      expect(armIdx, `${rel}: the arm must exist`).toBeGreaterThan(-1);
      expect(internalIdx, `${rel}: the residual must exist`).toBeGreaterThan(-1);
      expect(armIdx, `${rel}: the arm must sit ahead of the residual`).toBeLessThan(internalIdx);
    }
  });
});
