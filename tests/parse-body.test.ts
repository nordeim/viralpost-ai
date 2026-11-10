import { describe, expect, it } from "vitest";
import { parseBody } from "@/lib/api";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas";

// Session-163 (WP-6 — the Zod layer): the parse-and-validate helper the
// auth family consumes. It composes the EXISTING declared-size pre-gate
// (isBodyTooLarge — the session-67 N-67d contract) with safeParse, and
// maps the first zod issue onto the { ok, error: { code, message } }
// envelope as a ready-made BAD_REQUEST response.

function jsonRequest(body: unknown, contentLength?: number): Request {
  const serialized = typeof body === "string" ? body : JSON.stringify(body);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (contentLength !== undefined) headers["Content-Length"] = String(contentLength);
  return new Request("http://x/api/auth/login", { method: "POST", headers, body: serialized });
}

describe("parseBody (session-163)", () => {
  it("parses a valid body through the schema and returns the typed data", async () => {
    const result = await parseBody(jsonRequest({ email: " A@B.co ", password: "Demo1234!" }), loginSchema);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe("a@b.co");
      expect(result.data.password).toBe("Demo1234!");
    }
  });

  it("answers the invalid-body envelope when the JSON does not parse", async () => {
    const result = await parseBody(jsonRequest("{not json"), loginSchema);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      const body = await result.response.json();
      expect(body).toEqual({ ok: false, error: { code: "BAD_REQUEST", message: "Invalid request body" } });
    }
  });

  it("answers the too-large envelope when the DECLARED size exceeds the ceiling", async () => {
    const result = await parseBody(jsonRequest({ email: "a@b.co", password: "Demo1234!" }, 1024 * 1024), loginSchema);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      const body = await result.response.json();
      expect(body).toEqual({ ok: false, error: { code: "BAD_REQUEST", message: "Request body too large" } });
    }
  });

  it("maps the first schema issue onto the BAD_REQUEST envelope", async () => {
    const result = await parseBody(jsonRequest({ email: "a@b.co", password: "" }), loginSchema);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      const body = await result.response.json();
      expect(body.error.message).toBe("Email and password are required");
    }
  });

  it("carries the schema's transformation (normalized email) on success only", async () => {
    const schema = z.object({ email: z.string().toLowerCase() });
    const ok = await parseBody(jsonRequest({ email: "X@Y.CO" }), schema);
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.data.email).toBe("x@y.co");

    const bad = await parseBody(jsonRequest({ email: 42 }), schema);
    expect(bad.ok).toBe(false);
  });

  // Session-165 (WP-1 — the digma S148-A port): parseBody composes the
  // bounded reader, so the CONTENT-TYPE CSRF GATE sits ahead of the
  // schema. The login-CSRF class: an enctype="text/plain" cross-site
  // form POST whose body parses as valid JSON — the parse seam rejects
  // by policy BEFORE safeParse ever runs, the route's existing
  // "Invalid request body" vocabulary unchanged.
  it("THE CSRF GATE: a text/plain body carrying a VALID login body answers the invalid-body envelope (the schema never runs)", async () => {
    const result = await parseBody(
      new Request("http://x/api/auth/login", {
        method: "POST",
        headers: { "content-type": "text/plain" },
        body: JSON.stringify({ email: "a@b.co", password: "Demo1234!" }),
      }),
      loginSchema,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      const body = await result.response.json();
      expect(body).toEqual({ ok: false, error: { code: "BAD_REQUEST", message: "Invalid request body" } });
    }
  });

  it("THE CHUNKED BOUND: a stream body over the ceiling answers the too-large envelope (no Content-Length exists to pre-gate it)", async () => {
    // The S75-B family through the composed seam: a ReadableStream
    // body (no Content-Length) whose ACTUAL streamed bytes exceed
    // MAX_AUTH_BODY_BYTES — the stream counter's mid-read rejection.
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (let i = 0; i < 3; i++) controller.enqueue(encoder.encode("x".repeat(6 * 1024)));
        controller.close();
      },
    });
    const result = await parseBody(
      new Request("http://x/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: stream,
        ...({ duplex: "half" } as Record<string, unknown>),
      }),
      loginSchema,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      const body = await result.response.json();
      expect(body.error.message).toBe("Request body too large");
    }
  });

  // Session-16 (S16-1): the S15-2 null-body vocabulary completed for the
  // NON-OBJECT class. A JSON body that PARSES but not to an object — a
  // bare string, array, number, or boolean — used to pass the null-only
  // guard and feed safeParse, leaking Zod's dev-facing "Invalid input:
  // expected object, received string" to the client (live-confirmed on
  // /api/auth/login with '"hello"' and '[1,2]'). The widened guard owns
  // the whole malformed-SHAPE class with the same pinned message the
  // null class owns. The four forms are co-pinned faces of one contract:
  // "a body that is not a JSON object answers Invalid request body".
  it("session-16 (S16-1): a non-object JSON body (string/array/number/boolean) answers the invalid-body envelope (no Zod dev-message leak)", async () => {
    for (const serialized of ['"hello"', "[1,2]", "42", "true"]) {
      const result = await parseBody(
        jsonRequest(serialized),
        loginSchema,
      );
      expect(result.ok, `body ${serialized}`).toBe(false);
      if (!result.ok) {
        expect(result.response.status, `body ${serialized}`).toBe(400);
        const body = await result.response.json();
        expect(body, `body ${serialized}`).toEqual({
          ok: false,
          error: { code: "BAD_REQUEST", message: "Invalid request body" },
        });
      }
    }
  });
});
