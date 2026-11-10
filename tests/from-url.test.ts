import { describe, expect, it } from "vitest";

// Session-13 (S13-4): the from_url resolver's FIRST behavioral coverage.
// The guard lived inline in login-card.tsx (module-private, reading
// window.location.origin directly) — exercised only by source regex pins;
// a regression in its logic (dropping the origin check, mishandling the
// protocol-relative form) passed the whole gate. The cure: the pure seam
// src/lib/from-url.ts (origin is a PARAMETER — no DOM access, fully
// unit-testable), the card wiring thin.
//
// The contract (the reference's auth-wall round-trip, session-147 /
// F-147c2): its wall lands guests on /login?from_url=<absolute-url> and
// returns them to the target after a successful sign-in. The param is
// UNTRUSTED query input — only a SAME-ORIGIN URL navigates; everything
// else falls back to the plain-login target "/".

import { resolveFromUrl } from "../src/lib/from-url";

const ORIGIN = "http://localhost:3000";

describe("session-13 (S13-4): resolveFromUrl — the open-redirect guard, behavioral", () => {
  it("a same-origin relative path passes through verbatim", () => {
    expect(resolveFromUrl("/Tool", ORIGIN)).toBe("/Tool");
  });

  it("path + search both survive (the query rides the round-trip)", () => {
    expect(resolveFromUrl("/Tool?idea=hello", ORIGIN)).toBe("/Tool?idea=hello");
  });

  it("a same-origin ABSOLUTE url reduces to its path + search (the reference's own auth-wall form)", () => {
    expect(resolveFromUrl("http://localhost:3000/Pricing", ORIGIN)).toBe("/Pricing");
    expect(resolveFromUrl(`${ORIGIN}/Tool?x=1`, ORIGIN)).toBe("/Tool?x=1");
  });

  it("a FOREIGN origin falls back to the plain-login target", () => {
    expect(resolveFromUrl("https://evil.example/x", ORIGIN)).toBe("/");
    expect(resolveFromUrl("http://localhost:3000.evil.example/", ORIGIN)).toBe("/");
  });

  it("the protocol-relative form falls back too (the classic //evil bypass)", () => {
    expect(resolveFromUrl("//evil.example/x", ORIGIN)).toBe("/");
  });

  it("a foreign SCHEME on the same host falls back (only http(s) origins compose here)", () => {
    expect(resolveFromUrl("javascript:alert(1)", ORIGIN)).toBe("/");
    expect(resolveFromUrl("data:text/html,hi", ORIGIN)).toBe("/");
  });

  it("malformed input falls back (the URL constructor throws, the guard catches)", () => {
    expect(resolveFromUrl("http://", ORIGIN)).toBe("/");
  });

  it("empty input and the bare origin both land on the plain target", () => {
    expect(resolveFromUrl("", ORIGIN)).toBe("/");
    expect(resolveFromUrl(ORIGIN, ORIGIN)).toBe("/");
  });

  // Session-14 (S14-1): the protocol-relative ESCAPE — a same-origin
  // ABSOLUTE url whose path starts with "//" passes the origin check
  // (the url IS same-origin) but the returned string "//evil.com?x=1"
  // is protocol-relative AT THE ROUTER. Live-verified pre-cure on the
  // dev server: /login?from_url=http://127.0.0.1:3000//evil.com?x=1
  // signed in and landed the browser on https://evil.com/?x=1.
  it("a same-origin url with a LEADING // path falls back (the protocol-relative escape)", () => {
    expect(resolveFromUrl("http://localhost:3000//evil.com", ORIGIN)).toBe("/");
    expect(resolveFromUrl(`${ORIGIN}//evil.com?x=1`, ORIGIN)).toBe("/");
  });

  it("a backslash path normalizes to // in the URL parser and falls back too", () => {
    // "/\evil.com" → the parser normalizes the backslash to a slash →
    // pathname "//evil.com" → the leading-// arm catches it.
    expect(resolveFromUrl(`${ORIGIN}/\\evil.com`, ORIGIN)).toBe("/");
    // A backslash DIRECTLY after the host ("host\evil.com") normalizes
    // to the SINGLE-slash path "/evil.com" — a plain same-origin path
    // (the browser requests /evil.com from OUR origin), so it passes.
    expect(resolveFromUrl(`${ORIGIN}\\evil.com`, ORIGIN)).toBe("/evil.com");
  });

  it("a deep path with an INNER // still passes (the guard targets the leading form only)", () => {
    expect(resolveFromUrl("/a//b?x=1", ORIGIN)).toBe("/a//b?x=1");
  });
});
