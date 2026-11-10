// API envelope + guards for route handlers.
// Every handler returns { ok, data } | { ok, error: { code, message } }.

import { NextResponse } from "next/server";
import type { z } from "zod";
import { getSessionUser, type SessionUser } from "./auth";

export type ApiError = { code: string; message: string };
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export function ok<T>(data: T, init?: number): NextResponse {
  return NextResponse.json({ ok: true, data } satisfies ApiResult<T>, { status: init ?? 200 });
}

export function fail(code: string, message: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error: { code, message } } satisfies ApiResult<never>, {
    status,
  });
}

export const ERR = {
  UNAUTHORIZED: () => fail("UNAUTHORIZED", "Sign in required", 401),
  BAD_REQUEST: (msg: string) => fail("BAD_REQUEST", msg, 400),
  // Session-67 (N-67h): the 429 family carries Retry-After consistently —
  // login used to hand-build its own (bypassing fail()) while the
  // siblings shipped no header at all. The optional param keeps the
  // zero-arg calls valid; the envelope shape is identical either way.
  // THE ONE DELIBERATE EXCEPTION (noted session 10, F10-7): the verify
  // route's VERIFICATION_LOCKED 429 sends NO Retry-After — that lockout
  // lifts on RESEND (which resets the attempt counter), not on time, so
  // any Retry-After value would be a lie to the client.
  RATE_LIMITED: (retryAfterSec?: number): NextResponse =>
    retryAfterSec === undefined
      ? fail("RATE_LIMITED", "Too many attempts. Try again later.", 429)
      : NextResponse.json(
          { ok: false, error: { code: "RATE_LIMITED", message: "Too many attempts. Try again later." } } satisfies ApiResult<never>,
          { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfterSec)) } },
        ),
  INTERNAL: () => fail("INTERNAL", "Something went wrong. Please try again.", 500),
};

/** Guard: returns the session user or a 401 response (callers must return it). */
export async function requireSession(): Promise<{ user: SessionUser } | { response: NextResponse }> {
  // Session-41 (S41-P4): the shared session read joined the envelope —
  // getSessionUser()'s findUnique is the one DB call EVERY protected route
  // makes, and a SQLITE_BUSY-class failure here used to answer a raw
  // non-JSON 500. The 401 path (no session / bad cookie) is unchanged.
  let user: SessionUser | null;
  try {
    user = await getSessionUser();
  } catch {
    return { response: ERR.INTERNAL() };
  }
  if (!user) return { response: ERR.UNAUTHORIZED() };
  return { user };
}

export function isGuarded(x: { user: SessionUser } | { response: NextResponse }): x is { response: NextResponse } {
  return "response" in x;
}

// ---- the auth-family body pre-gate (session-67, N-67d) ---------------------

/** Session-67 (N-67d), session-165: the declared-size ceiling for JSON
 * bodies — the ONE bound every body-parsing route rides through
 * readBoundedJson/parseBody. In THIS tree that family is the six public
 * auth routes (signup/verify/resend/login/forgot-password/reset-password
 * via parseBody + src/lib/schemas.ts) plus generate and contact's
 * route-local readBoundedJson + safeParse — the census tests/
 * body-pregate.test.ts pins. The honest bodies are tiny (email capped
 * at 160 chars + password + a 6-digit code / an idea or contact
 * message), so 16KB is beyond generous. Documented limitation
 * (inherited from the upload gate): a chunked body without a
 * Content-Length header bypasses the declared-length fast path — the
 * stream counter below is that family's bound. */
export const MAX_AUTH_BODY_BYTES = 16 * 1024;

/** True when the request DECLARES a body larger than the auth ceiling —
 * call before `req.json()` so an oversized body is rejected without ever
 * being read into memory. */
export function isBodyTooLarge(req: Request): boolean {
  return Number(req.headers.get("content-length") ?? 0) > MAX_AUTH_BODY_BYTES;
}

// ---- the bounded body reader (session-165 — the digma S148-A/S75-B -----
// port): the ONE seam every JSON body parse site consumes.

/** The bounded read result: `tooLarge` answers the shared "Request body
 *  too large" 400; `value` carries the parsed JSON (null when
 *  unparseable OR unparseable-by-policy — the sites' historical
 *  `.catch(() => null)` contract, digma's documented form). */
export type BoundedJson =
  | { tooLarge: true }
  | { tooLarge: false; value: Record<string, unknown> | null };

/** Session-165: read + bound a JSON request body. Two closed classes,
 *  both digma ports (the s163 doctrine: the auth-mechanics reference
 *  is the port donor):
 *
 *  THE CONTENT-TYPE CSRF GATE (digma S148-A / B148-L1): a JSON-parse
 *  seam blocks unparseable bodies, never form-originated transports —
 *  an HTML `<form method="POST" enctype="text/plain">` (the classic
 *  name/value trick) posts a body that parses as valid JSON, so
 *  req.json() alone never barred the cross-site form POST, and the
 *  public auth family MINTS cookies on POST (login/signup/verify) —
 *  the login-CSRF class: the attacker's session planted in the
 *  victim's jar (SameSite=Lax gates cookie SENDING on cross-site
 *  POSTs, never cookie SETTING). The gate: a Content-Type not
 *  carrying application/json (case-insensitive; the "; charset="
 *  suffix tolerated) is unparseable-by-policy — the null contract
 *  below, the call sites' 400 vocabulary untouched, zero call-site
 *  changes. First-party consumers all send application/json (the
 *  lead-verified census: the store's call() seam, the five
 *  login-card fetches, the reset screen, the e2e in-page fetch
 *  headers, Playwright's object-data default, the sweep's UI-form
 *  login). The stream is cancelled like the tooLarge path — a
 *  kept-open stream would hold the connection.
 *
 *  THE STREAM COUNTER (digma S75-B / B75-F1): the pre-165 form (the
 *  isBodyTooLarge declared-length check before an unbounded
 *  req.json()) left the chunked-transfer family open — a
 *  Transfer-Encoding: chunked request carries NO Content-Length, so
 *  the gate passed and the parse buffered the whole body before any
 *  per-field cap ran. The counter: request.body read chunk-by-chunk,
 *  rejecting + cancelling the read past MAX_AUTH_BODY_BYTES. The
 *  declared fast path (isBodyTooLarge — the N-67d lineage, unchanged)
 *  stays ahead of it so an over-declared body rejects before ANY read. */
export async function readBoundedJson(req: Request): Promise<BoundedJson> {
  // Layer 1 — the content-type CSRF gate, ahead of every byte read.
  // Session-17 (S17-5): the media type is PARSED, never
  // substring-matched — the pre-17 `.includes("application/json")`
  // accepted `text/x-application/json` and `application/jsonx` (not
  // exploitable for the CSRF class this gate defends — cross-site
  // forms can only send the three enctype types and a JS-set
  // Content-Type trips CORS preflight — but the transport contract is
  // the EXACT media type, nothing else). The parse keeps the
  // case-insensitive and `;`-parameter tolerance the family relies on.
  const contentType = req.headers.get("content-type") ?? "";
  const mediaType = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
  if (mediaType !== "application/json") {
    await req.body?.cancel().catch(() => {});
    return { tooLarge: false, value: null };
  }
  // Layer 2 — the declared-length fast path (an over-declared body
  // rejects before any byte is read; the unconsumed stream is
  // cancelled — the symmetric twin of the counter's own cancel below).
  if (isBodyTooLarge(req)) {
    await req.body?.cancel().catch(() => {});
    return { tooLarge: true };
  }
  const body = req.body;
  if (!body) {
    // No stream to bound (a body-less request): the standard parse,
    // guarded the same way the sites' old form was.
    try {
      return { tooLarge: false, value: (await req.json()) as Record<string, unknown> };
    } catch {
      return { tooLarge: false, value: null };
    }
  }
  // Layer 3 — the stream counter: the chunked family's only bound.
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (total > MAX_AUTH_BODY_BYTES) {
        // Stop the producer before returning — a kept-open stream
        // would hold the connection and buffer the remaining chunks
        // server-side.
        await reader.cancel().catch(() => {});
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  }
  // The decode+parse tail keeps the null-on-unparseable contract, so
  // the call sites' field narrowing is untouched.
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { tooLarge: false, value: JSON.parse(new TextDecoder().decode(merged)) as Record<string, unknown> };
  } catch {
    return { tooLarge: false, value: null };
  }
}

// ---- the Zod parse seam (session-163 — the auth family's validation) ----

/** Session-163: parse + validate a JSON body against a Zod schema.
 *  Session-165: composes the bounded reader (readBoundedJson — the
 *  content-type CSRF gate + the declared fast path + the stream
 *  counter) ahead of safeParse, and maps the first schema issue onto
 *  the BAD_REQUEST envelope as a ready-made response — the route
 *  returns it verbatim. The schemas live in src/lib/schemas.ts (the
 *  seam). */
export async function parseBody<S extends z.ZodTypeAny>(
  req: Request,
  schema: S,
): Promise<{ ok: true; data: z.output<S> } | { ok: false; response: NextResponse }> {
  const read = await readBoundedJson(req);
  if (read.tooLarge) return { ok: false, response: ERR.BAD_REQUEST("Request body too large") };
  const raw: unknown = read.value;
  // Session-16 (S16-1): the S15-2 null guard widened to the whole
  // malformed-SHAPE class — a JSON body that parses to a string, array,
  // number, or boolean used to feed safeParse and leak Zod's dev-facing
  // "Invalid input: expected object, received string" to the client
  // (live-confirmed on the auth family). Every non-object shape answers
  // the same pinned vocabulary the null class owns.
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, response: ERR.BAD_REQUEST("Invalid request body") };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = first?.message ?? "Invalid request body";
    return { ok: false, response: ERR.BAD_REQUEST(message) };
  }
  return { ok: true, data: parsed.data };
}

// ---- the retired coercion-helper family (session-7, F7-1) ---------------
// The scaffold (the CRM's session-166 form of this file) carried ten
// hand-rolled body-coercion helpers (asString/isBadFK/asFKId/isBad*/
// asNumber/asInt/asDate) whose comment claimed they "survive on the
// URL-param surfaces" — the CRM's events/reports/export/search GET
// family and a tests/coercion-guards.test.ts battery. None of those
// surfaces exist in this tree: every body validation rides Zod through
// parseBody + src/lib/schemas.ts (the six auth routes) or the
// route-local readBoundedJson + safeParse (generate, contact), and this
// repo has no query-param GET surfaces. The helpers had zero callers —
// retired at session 7, absence-pinned by tests/body-pregate.test.ts.
