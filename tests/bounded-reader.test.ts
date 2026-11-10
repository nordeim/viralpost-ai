import { describe, expect, it } from "vitest";
import { readBoundedJson, MAX_AUTH_BODY_BYTES } from "@/lib/api";

// Session-165 (WP-1 — the digma S148-A + S75-B port): the bounded body
// reader behind EVERY JSON parse site. Two closed classes:
//
// THE CONTENT-TYPE CSRF GATE (digma S148-A / B148-L1): a JSON-parse
// seam blocks unparseable bodies, never form-originated transports —
// an HTML <form method="POST" enctype="text/plain"> posts a body that
// parses as valid JSON, so req.json() alone never barred the
// cross-site form POST, and the public auth family MINTS cookies on
// POST (login/signup/verify): the login-CSRF class. SameSite=Lax
// gates cookie SENDING on cross-site POSTs, never cookie SETTING. A
// Content-Type not carrying application/json (case-insensitive; the
// "; charset=" suffix tolerated) is unparseable-by-policy — the
// null-on-unparseable contract, the call sites' 400 vocabulary
// untouched.
//
// THE STREAM COUNTER (digma S75-B / B75-F1): the pre-165 form (the
// isBodyTooLarge declared-length check before an unbounded
// req.json()) left the chunked-transfer family open — a
// Transfer-Encoding: chunked request carries NO Content-Length, so
// the gate passed and the parse buffered the whole body. The seam's
// reader counts the ACTUAL streamed bytes and rejects mid-read past
// MAX_AUTH_BODY_BYTES. isBodyTooLarge stays the DECLARED fast path
// (composed, not replaced — the N-67d lineage).

const JSON_HEADERS = { "content-type": "application/json" };

function jsonRequest(body: unknown, headers: Record<string, string> = JSON_HEADERS): Request {
  const serialized = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://x/api/accounts", { method: "POST", headers, body: serialized });
}

/** The chunked family: a ReadableStream body carries NO Content-Length
 *  (the exact shape Transfer-Encoding: chunked produces) — the stream
 *  counter is these bodies' only bound. */
function chunkedRequest(chunks: string[], headers: Record<string, string> = JSON_HEADERS): Request {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Request("http://x/api/accounts", {
    method: "POST",
    headers,
    body: stream,
    // The fetch spec's streaming-body requirement (Node undici + Bun
    // both honor it; the TS lib may not carry the field — runtime-first).
    ...({ duplex: "half" } as Record<string, unknown>),
  });
}

describe("readBoundedJson (session-165 — the digma S148-A/S75-B port)", () => {
  it("parses a valid application/json body", async () => {
    const read = await readBoundedJson(jsonRequest({ name: "Acme", n: 3 }));
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toEqual({ name: "Acme", n: 3 });
  });

  it("tolerates the charset suffix and the case-insensitive match", async () => {
    const suffixed = await readBoundedJson(
      jsonRequest({ a: 1 }, { "content-type": "application/json; charset=utf-8" }),
    );
    expect(suffixed.tooLarge).toBe(false);
    if (!suffixed.tooLarge) expect(suffixed.value).toEqual({ a: 1 });

    const upper = await readBoundedJson(jsonRequest({ a: 1 }, { "content-type": "APPLICATION/JSON" }));
    expect(upper.tooLarge).toBe(false);
  });

  it("THE CSRF GATE: a text/plain body carrying VALID JSON is unparseable-by-policy (the login-CSRF class)", async () => {
    // The exact attack shape: the enctype="text/plain" form POST whose
    // body parses as valid JSON. The parse seam must never reach the
    // schema — the 400 "Invalid request body" the call sites answer.
    const read = await readBoundedJson(
      jsonRequest('{"email":"attacker@example.com","password":"x"}', { "content-type": "text/plain" }),
    );
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toBeNull();
  });

  it("an ABSENT content-type is unparseable-by-policy too (the fetch spec's bare-string default is text/plain)", async () => {
    const read = await readBoundedJson(jsonRequest({ a: 1 }, {}));
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toBeNull();
  });

  it("multipart/form-data is not a JSON transport either (the upload route keeps its own formData() seam)", async () => {
    const read = await readBoundedJson(
      jsonRequest("--boundary\r\n", { "content-type": "multipart/form-data; boundary=boundary" }),
    );
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toBeNull();
  });

  it("THE MEDIA-TYPE PARSE (session-17, S17-5): substring-hostile content types are unparseable-by-policy — the media type is PARSED, never substring-matched", async () => {
    // The two faces of the loose-match genus, co-pinned (one owner):
    // `text/x-application/json` (a non-JSON media type that CONTAINS
    // the substring) and `application/jsonx` (a JSON-ish suffix token).
    // The pre-17 gate ran `.includes("application/json")` — both of
    // these passed it. Not exploitable for the CSRF class the gate
    // defends (cross-site forms can only send the three enctype types;
    // a JS-set Content-Type trips CORS preflight, which fails closed)
    // — this is gate hygiene: the transport contract is the EXACT
    // media type `application/json` (case-insensitive, `;`-suffix
    // tolerant), nothing else.
    const hostile = await readBoundedJson(
      jsonRequest('{"a":1}', { "content-type": "text/x-application/json" }),
    );
    expect(hostile.tooLarge).toBe(false);
    if (!hostile.tooLarge) expect(hostile.value).toBeNull();

    const suffixed = await readBoundedJson(
      jsonRequest('{"a":1}', { "content-type": "application/jsonx" }),
    );
    expect(suffixed.tooLarge).toBe(false);
    if (!suffixed.tooLarge) expect(suffixed.value).toBeNull();
  });

  it("the DECLARED fast path: a Content-Length over the ceiling answers tooLarge (the N-67d contract unchanged)", async () => {
    const read = await readBoundedJson(
      new Request("http://x/api/accounts", {
        method: "POST",
        headers: { "content-type": "application/json", "content-length": String(MAX_AUTH_BODY_BYTES + 1) },
        body: "x".repeat(64),
      }),
    );
    expect(read.tooLarge).toBe(true);
  });

  it("THE STREAM COUNTER: a chunked body UNDER the ceiling parses (the chunked family functional)", async () => {
    const read = await readBoundedJson(chunkedRequest(['{"a":', "1}"]));
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toEqual({ a: 1 });
  });

  it("THE STREAM COUNTER: a chunked body OVER the ceiling answers tooLarge (the S75-B bound — no Content-Length exists to gate it)", async () => {
    // 3 chunks x 6KB = 18KB > the 16KB ceiling; the read rejects
    // mid-stream, never buffering the whole body.
    const over = [0, 1, 2].map(() => "x".repeat(6 * 1024));
    const read = await readBoundedJson(chunkedRequest(over));
    expect(read.tooLarge).toBe(true);
  });

  it("the parse tail keeps the null-on-unparseable contract", async () => {
    const read = await readBoundedJson(jsonRequest("{not json"));
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toBeNull();
  });

  it("a body-less request passes through the body-less branch (no stream to bound)", async () => {
    const read = await readBoundedJson(new Request("http://x/api/accounts", { method: "POST", headers: JSON_HEADERS }));
    expect(read.tooLarge).toBe(false);
    if (!read.tooLarge) expect(read.value).toBeNull();
  });

  it("the ceiling stays the auth family's own 16KB (not digma's 32MB — the honest bodies are tiny)", () => {
    expect(MAX_AUTH_BODY_BYTES).toBe(16 * 1024);
  });
});
