import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-67 pins (the N-67 family, S67-P1..P8): the auth-seam contract —
// the 67-c fresh-eyes rotation on the AUTH/SESSION/UPLOAD seam found the
// family, the orchestrator validated every claim at file:line, and these
// pins freeze the closed surfaces. The house convention (the s46 dch +
// the s66 badge-contract precedent): source-contract pins read
// COMMENT-STRIPPED sources — a literal pinned by a record comment alone
// is a vacuous pin, and an absence pin must not fail on the retired
// form quoted inside its own documentation (the s64/s65/s66
// needle-in-own-docs lesson, thrice reborn).
//
// The pinned surfaces:
// - S67-P1 (N-67c): the verify attempt counter increments ATOMICALLY
//   server-side — the read-modify-write form could let concurrent
//   submissions overshoot the 5-wrong lockout against one code.
// - S67-P2 (N-67d): all four public auth routes pre-gate the declared
//   body size BEFORE req.json() buffers it (the S36-P3 upload precedent
//   extended to the auth family).
// - S67-P4 (N-67f): the /signup page carries no authenticated redirect
//   (the s23-P2 retirement /login already carries; the superset page is
//   a pure render).
// - S67-P5 (N-67h/j/k/l): the Retry-After family consistency; the
//   clear-cookie twin symmetry; the resend in-flight guard; the honest
//   envelope-data read on the resend confirmation.
// (Session-11, F11-6: the S67-P3 bullet — "the one route that writes user
// bytes to disk joins the rate-limit family" — and its uploadRoute helper
// were CRM-era phantoms: no upload route has ever existed in this tree.)

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const authLib = () => stripComments(read("src/lib/auth.ts") ?? "");
const apiLib = () => stripComments(read("src/lib/api.ts") ?? "");
const loginRoute = () => stripComments(read("src/app/api/auth/login/route.ts") ?? "");
const signupRoute = () => stripComments(read("src/app/api/auth/signup/route.ts") ?? "");
const verifyRoute = () => stripComments(read("src/app/api/auth/verify/route.ts") ?? "");
const resendRoute = () => stripComments(read("src/app/api/auth/resend/route.ts") ?? "");
const signupPage = () => stripComments(read("src/app/signup/page.tsx") ?? "");
const loginCard = () => stripComments(read("src/components/layout/login-card.tsx") ?? "");

describe("session-67: the auth-seam contract (the N-67 family)", () => {
  it("S67-P1: the verify attempt counter increments atomically server-side", () => {
    const src = verifyRoute();
    // The atomic form: the DB increments; the returned record carries the
    // post-increment value the lockout/remaining logic reads.
    expect(src).toContain("verificationAttempts: { increment: 1 }");
    // The retired form must stay retired (the read-modify-write race).
    expect(src).not.toContain("verificationAttempts + 1");
  });

  it("S67-P2: api.ts exports the auth body ceiling and its helper", () => {
    const src = apiLib();
    expect(src).toContain("MAX_AUTH_BODY_BYTES = 16 * 1024");
    expect(src).toContain("export function isBodyTooLarge");
  });

  it("S67-P2: all four public auth routes pre-gate the body size BEFORE the parse", () => {
    // Session-163 re-anchor: the pre-gate COMPOSED into parseBody()
    // (api.ts) when the auth family moved onto the Zod seam — the
    // behavioral contract (declared-size rejection before req.json()
    // buffers) is pinned in tests/parse-body.test.ts; this pin now
    // asserts every route parses through the seam (the four legacy
    // routes + the two session-163 reset routes).
    const routes: Array<[string, string]> = [
      ["login", loginRoute()],
      ["signup", signupRoute()],
      ["verify", verifyRoute()],
      ["resend", resendRoute()],
    ];
    for (const [name, src] of routes) {
      expect(src, `${name}: parses through the seam`).toMatch(/await parseBody\(req, \w+Schema\)/);
    }
    const apiSrc = apiLib();
    const gate = apiSrc.indexOf("isBodyTooLarge(req)");
    const parse = apiSrc.indexOf("req.json()");
    expect(gate).toBeGreaterThanOrEqual(0);
    expect(parse).toBeGreaterThan(0);
    expect(gate).toBeLessThan(parse);
  });


  it("S67-P4: the /signup page carries no authenticated redirect", () => {
    const src = signupPage();
    expect(src).not.toContain("getSessionUser");
    expect(src).not.toContain("redirect(");
    // The page stays the superset's signup-view render of the login card.
    expect(src).toContain('mode="signup"');
  });

  it("S67-P5: ERR.RATE_LIMITED carries the optional Retry-After", () => {
    const src = apiLib();
    expect(src).toMatch(/RATE_LIMITED:\s*\(retryAfterSec\?: number\)/);
    expect(src).toContain('"Retry-After"');
  });

  it("S67-P5: all four auth routes pass the limiter's retryAfterSec on denial", () => {
    for (const src of [loginRoute(), signupRoute(), verifyRoute(), resendRoute()]) {
      expect(src).toContain("ERR.RATE_LIMITED(limit.retryAfterSec)");
      // The hand-built 429 block is retired everywhere in the family.
      expect(src).not.toMatch(/NextResponse\.json/);
    }
  });

  it("S67-P5: clearSessionCookie mirrors the set-side flag family", () => {
    const src = authLib();
    const start = src.indexOf("async function clearSessionCookie");
    expect(start).toBeGreaterThanOrEqual(0);
    const block = src.slice(start, start + 500);
    expect(block).toContain("httpOnly: true");
    expect(block).toContain('sameSite: "lax"');
    expect(block).toContain('secure: process.env.NODE_ENV === "production"');
    expect(block).toContain('path: "/"');
    expect(block).toContain("maxAge: 0");
  });

  it("S67-P5: the resend link guards in-flight double-clicks", () => {
    const src = loginCard();
    expect(src).toContain("setResending");
    expect(src).toContain("disabled={resending}");
    expect(src).toMatch(/if \(resending\) return;/);
  });

  it("S67-P5: the resend confirmation reads the envelope data field", () => {
    const src = loginCard();
    expect(src).toContain("body?.data?.message");
    // The root-level read is retired (the envelope nests at .data).
    expect(src).not.toContain("body?.message");
  });
});

describe("session-67: the standing auth-seam records (the N-67 keep set)", () => {
  it("N-67b: the per-process limiter + clientKey shapes stay pinned (the deferred trusted-proxy ledger)", () => {
    const src = stripComments(read("src/lib/rate-limit.ts") ?? "");
    // session-173 (F-173a): the additive clock seam — the s164
    // sweepRateLimits form extended to the rateLimit path (now =
    // Date.now() default; the wall-clock call sites ride unchanged)
    expect(src).toContain("export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now())");
    expect(src).toContain("export function clientKey(req: Request): string");
  });

});

describe("session-9 (F9-9): the signup role vocabulary (the schema's documented set)", () => {
  // The schema documents `role String @default("user") // user | admin`
  // (prisma/schema.prisma) — but signup minted the CRM's "rep" value for
  // every non-first user, an undocumented third role no reader expects.
  // The pin: the bootstrap form stays (first signup on a fresh deploy
  // admin-boots), every other signup lands the schema's own default.
  it("signup assigns the documented vocabulary: admin bootstrap, otherwise the schema default", () => {
    const src = stripComments(read("src/app/api/auth/signup/route.ts") ?? "");
    expect(src).toContain('role: count === 0 ? "admin" : "user"');
  });

  it("no CRM-era role value survives in the app tree (comment-stripped)", () => {
    const src = stripComments(read("src/app/api/auth/signup/route.ts") ?? "");
    expect(src).not.toContain('"rep"');
  });
});

describe("session-11 (F11-13): the signup duplicate race answers the 400, not a raw 500", () => {
  // The findUnique→create gap: two concurrent same-email signups race
  // past the existence check and the loser's create throws the unique
  // constraint (P2002) into the generic catch — a 500 ERR.INTERNAL for
  // a plain duplicate. The cure mirrors the reset-password route's
  // Prisma known-error mapping: P2002 → the pinned 400 duplicate banner.
  it("the signup catch maps the unique-constraint error to the 400 duplicate message", () => {
    const src = stripComments(read("src/app/api/auth/signup/route.ts") ?? "");
    expect(src).toMatch(/PrismaClientKnownRequestError/);
    expect(src).toMatch(/P2002/);
    // The mapped message is the SAME pinned banner the existence check
    // answers (no second spelling).
    expect((src.match(/A user with this email already exists/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });
});
