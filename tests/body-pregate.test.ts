import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The bounded-reader family, re-anchored for ViralPost AI's API surface:
// every body-parsing route gates the declared Content-Length and the
// content-type BEFORE the parse (the composed THREE-layer seam:
// content-type CSRF gate → declared-length fast path → stream counter),
// and the parse precedes all DB work in its own handler. The pins stay
// ORDERING-aware (indexOf comparisons) so a seam placed after the parse
// or after DB work cannot satisfy them.
//
// Families:
//   - parseBody routes (the composed seam + schema): the six auth routes.
//   - route-local readBoundedJson + safeParse: generate + contact.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

// Session-48 (S48-1): the hardened form — line pass first, block
// opener anchored (the S47-10 idiom; the one-idiom doctrine, the
// family's only shape).
function stripComments(src: string): string {
  return src
    .replace(/\/\/[^\n]*/g, "")
    .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
}

// The parseBody-family routes (auth: login/signup/verify/resend/
// forgot-password/reset-password).
const PARSE_BODY_ROUTES = [
  "src/app/api/auth/login/route.ts",
  "src/app/api/auth/signup/route.ts",
  "src/app/api/auth/verify/route.ts",
  "src/app/api/auth/resend/route.ts",
  "src/app/api/auth/forgot-password/route.ts",
  "src/app/api/auth/reset-password/route.ts",
] as const;

// The route-local readBoundedJson-family routes.
const ROUTES = [
  "src/app/api/generate/route.ts",
  "src/app/api/contact/route.ts",
] as const;

const ALL_ROUTES = [...PARSE_BODY_ROUTES, ...ROUTES] as const;

function handlerStartBefore(src: string, seam: number): number {
  const starts = [...src.matchAll(/export async function (?:GET|POST|PUT|PATCH|DELETE)/g)]
    .map((m) => m.index ?? 0)
    .filter((i) => i < seam);
  return starts.length ? starts[starts.length - 1] : 0;
}

describe("the bounded-reader family (every body-parsing route)", () => {
  it("all body-parsing routes import the seam from the api module", () => {
    for (const rel of ALL_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/from "@\/lib\/api"/);
    }
  });

  it("no body-parsing route parses through a bare req.json() (the unbounded direct parse retired)", () => {
    for (const rel of ALL_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, `${rel}: the direct req.json()/request.json() parse must not survive`).not.toMatch(
        /\b(?:req|request)\.json\(\)/,
      );
    }
  });

  it("the parse seam precedes all DB work in its own handler (gate-before-DB ordering)", () => {
    for (const rel of PARSE_BODY_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("await parseBody(req");
      expect(seam, `${rel}: no parseBody call`).toBeGreaterThanOrEqual(0);
      const handlerStart = handlerStartBefore(src, seam);
      const between = src.slice(handlerStart, seam);
      expect(between.match(/\bdb\.\w+/g) ?? [], `${rel}: DB work before the seam`).toEqual([]);
    }
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("await readBoundedJson(req)");
      expect(seam, `${rel}: no readBoundedJson call`).toBeGreaterThanOrEqual(0);
      const handlerStart = handlerStartBefore(src, seam);
      const between = src.slice(handlerStart, seam);
      expect(between.match(/\bdb\.\w+/g) ?? [], `${rel}: DB work before the seam`).toEqual([]);
    }
  });

  it("the 400 vocabulary rides the seam (api.ts)", () => {
    const api = stripComments(read("src/lib/api.ts") ?? "");
    expect(api).toContain('ERR.BAD_REQUEST("Request body too large")');
    expect(api).toContain('ERR.BAD_REQUEST("Invalid request body")');
    for (const rel of ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/read\.tooLarge/);
      expect(src, rel).toMatch(/safeParse\(read\.value\)/);
    }
  });

  it("the CRM coercion-helper family is RETIRED from the api module (session-7, F7-1)", () => {
    // The scaffold's session-166 comment claimed these helpers "survive
    // on the URL-param surfaces" (events' from/to windows, the
    // reports/export/search period+q parses) with
    // tests/coercion-guards.test.ts as "the living record" — none of
    // those surfaces exist in this tree, and that battery never did.
    // THIS tree's body-parsing family is the six parseBody auth routes
    // + generate/contact's route-local readBoundedJson (the constants
    // above); every validation rides src/lib/schemas.ts through
    // parseBody/safeParse. The helpers had zero callers here — dead
    // code retired at session 7, pinned absent so it cannot drift back.
    const api = read("src/lib/api.ts") ?? "";
    for (const fn of [
      "asString",
      "isBadFK",
      "asFKId",
      "isBadString",
      "isBadDate",
      "isBadNumber",
      "isBadBool",
      "asNumber",
      "asInt",
      "asDate",
    ]) {
      expect(api, `export function ${fn} must stay retired`).not.toContain(`export function ${fn}`);
    }
  });
});
