import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The dev-origin hydration lock (session-10, F10-17 — live-reproduced):
// Next 16's blockCrossSiteDEV rejects the HMR WebSocket upgrade whenever
// the browser's Origin hostname is not on the dev allowlist (defaults:
// `localhost`, its subdomains, and the hostname the server was started
// with). Opening the dev server at http://127.0.0.1:3000 — the loopback
// IP the repo's own curl probes use — therefore kills ONLY the HMR
// socket: the page's HTML/chunks/CSS all load (same-origin sec-fetch
// passes), the Turbopack dev client never completes its boot, and React
// NEVER HYDRATES. Symptom: the mobile menu and every client island
// (generator, login form, toasts) render as inert SSR with ZERO console
// errors — via http://localhost:3000 the same tree works, and the
// production build is immune (blockCrossSiteDEV is dev-only; the e2e
// menu pins run against the standalone build and pass).
//
// Raw-socket reproduction (this round): an upgrade probe with
// `Origin: http://127.0.0.1:3000` received the bare body `Unauthorized`
// (not even a status line — Chromium logs ERR_INVALID_HTTP_RESPONSE),
// while `Origin: http://localhost:3000` received the clean 101.
//
// The cure: allowedDevOrigins — Next's documented knob for exactly this.
// Entries are BARE HOSTNAMES (no scheme, no port — only the Origin's
// hostname is matched, per Next's bundled allowedDevOrigins docs).

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The comment-stripped view (the type-gate s46 idiom — a config comment
// can never masquerade as a live directive).
const stripComments = (s: string) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/[^\n]*$/gm, "$1");

const nextConfig = () => stripComments(read("next.config.ts"));

describe("session-10: THE DEV-ORIGIN HYDRATION LOCK (F10-17)", () => {
  it("next.config.ts allowlists the 127.0.0.1 dev origin (the loopback IP must hydrate)", () => {
    expect(nextConfig()).toMatch(/allowedDevOrigins\s*:\s*\[[^\]]*"127\.0\.0\.1"[^\]]*\]/);
  });

  it("the entry is the BARE HOSTNAME form (scheme/port are never matched — the bundled-docs contract)", () => {
    // A scheme-qualified entry would silently never match: the allowlist
    // compares the Origin's HOSTNAME against the entry string verbatim.
    expect(nextConfig()).not.toMatch(/allowedDevOrigins\s*:\s*\[[^\]]*https?:\/\//);
  });
});
