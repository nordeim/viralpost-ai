// Session-170 (WP-4): THE ERROR-BOUNDARY FAMILY — the two resilience
// surfaces the repo never had (the scandihaven ports, the s169-deferred
// "new visual surface" rotation — this one):
//
//   src/app/error.tsx        the route-segment boundary — renders inside
//                             the root layout (which stays alive), wired
//                             to reloadOnStaleChunk + reset()
//   src/app/global-error.tsx the root boundary — replaces the root
//                             layout entirely (own <html lang="en"> +
//                             <body>), imports ./globals.css itself (a
//                             crashed root layout never loaded it)
//
// The house contract (source-pinned, the page-layout family idiom):
//   "use client" on both (reset/digest are client concerns)
//   the reloadOnStaleChunk(error) wiring in useEffect with [error] deps
//   the digest-ref conditional ((ref: ${error.digest}))
//   the reset() "Try again" button
//   ZERO component-tree imports beyond the recovery seam (a resilience
//   surface must not depend on the tree that might be broken)
//   the copy vocabulary: Something went wrong / An unexpected error
//   occurred / We have logged the issue / Try again
//
// Plus the smoke-script contract (WP-5's surface): the §13.4 skeleton
// pinned — the smoke db, the :3210 port, the assertion ladder, the
// artifact-hygiene block, the boot-gate probe.
//
// RED at birth (the files do not exist yet); GREEN when WP-4/WP-5 land.
// Lineage note (session-21, S21-12): the scandihaven/s169 citations
// are donor-ledger numbers (the template family's repos); this repo's
// own sessions are docs/session_1..34.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

describe("session-170 (WP-4): the route-segment boundary (src/app/error.tsx)", () => {
  const src = read("src/app/error.tsx");

  it('is a client component ("use client")', () => {
    expect(src).toContain('"use client"');
  });

  it("wires the stale-chunk self-heal in useEffect with the [error] deps + the guarded storage (S22-4)", () => {
    // Session-22 (S22-4): the bare reloadOnStaleChunk(error) call left
    // storage null — the cooldown and the loop guard were inert in
    // production. The boundary now hands the guarded sessionStorage
    // accessor (a throwing access still disables the reload).
    expect(src).toContain("reloadOnStaleChunk(error, { storage: safeSessionStorage() })");
    expect(src).toMatch(/useEffect\(\(\) => \{[\s\S]*?reloadOnStaleChunk\(error[\s\S]*?\}, \[error\]\)/);
    expect(src).toMatch(/function safeSessionStorage\(\)[\s\S]*?try[\s\S]*?window\.sessionStorage[\s\S]*?catch[\s\S]*?return null/);
  });

  it("carries the reset() Try-again affordance + the digest ref", () => {
    expect(src).toContain("reset");
    expect(src).toContain("Try again");
    expect(src).toContain("error.digest");
  });

  it("carries the copy vocabulary", () => {
    expect(src).toContain("Something went wrong");
    expect(src).toContain("An unexpected error occurred");
    expect(src).toContain("We have logged the issue");
  });

  it("imports NOTHING from the component tree beyond the recovery seam (the resilience posture)", () => {
    const imports = [...src.matchAll(/^import .* from "([^"]+)"/gm)].map((m) => m[1]);
    expect(imports).toContain("@/lib/chunk-recovery");
    for (const imp of imports) {
      expect(imp.startsWith("@/components/")).toBe(false); // no tree deps
    }
  });

  it("does NOT render html/body (the root layout stays alive around it)", () => {
    expect(src).not.toContain("<html");
    expect(src).not.toContain("<body");
  });
});

describe("session-170 (WP-4): the root boundary (src/app/global-error.tsx)", () => {
  const src = read("src/app/global-error.tsx");

  it('is a client component ("use client")', () => {
    expect(src).toContain('"use client"');
  });

  it("renders its own <html lang> + <body> (it replaces the crashed root layout)", () => {
    expect(src).toMatch(/<html lang="en">/);
    expect(src).toMatch(/<body/);
  });

  it("imports ./globals.css itself (a crashed root layout never loaded it)", () => {
    expect(src).toContain('import "./globals.css"');
  });

  it("wires the same recovery + copy + reset contract as the segment boundary", () => {
    expect(src).toContain("reloadOnStaleChunk(error, { storage: safeSessionStorage() })");
    expect(src).toContain("reset");
    expect(src).toContain("Try again");
    expect(src).toContain("error.digest");
    expect(src).toContain("Something went wrong");
    expect(src).toContain("An unexpected error occurred");
  });

  it("imports NOTHING from the component tree beyond the recovery seam", () => {
    const imports = [...src.matchAll(/^import .* from "([^"]+)"/gm)].map((m) => m[1]);
    expect(imports).toContain("@/lib/chunk-recovery");
    for (const imp of imports) {
      expect(imp.startsWith("@/components/")).toBe(false);
    }
  });
});

describe("session-170 (WP-5): the smoke leg (scripts/smoke-test.sh, the §13.4 skeleton)", () => {
  const script = read("scripts/smoke-test.sh");

  it("pins its own database + port + secret (immune to the shell-env trap)", () => {
    expect(script).toContain('file:../db/smoke.db');
    expect(script).toContain("3210");
    expect(script).toMatch(/AUTH_SECRET/);
    expect(script).toContain("set -euo pipefail");
  });

  it("boots the STANDALONE artifact + health-waits before asserting", () => {
    expect(script).toContain(".next/standalone/server.js");
    expect(script).toContain("/api/health");
    expect(script).toContain("NODE_ENV=production");
  });

  it("asserts the ladder: pages, the 308 alias, the 404, the login round-trip, the 400, the generator, the page greps", () => {
    expect(script).toMatch(/viralpost_session/);
    expect(script).toContain("400");
    expect(script).toContain("308");
    expect(script).toContain("404");
    expect(script).toContain("api/generate");
    expect(script).toMatch(/<title>/);
  });

  it("carries the artifact-hygiene assertions (the F-170a cure policed at every smoke run)", () => {
    expect(script).toContain(".next/standalone/$entry");
    // Session-34 (S34-7): the enumeration now mirrors next.config's
    // outputFileTracingExcludes root files — the pin re-anchored with
    // the widened loop.
    expect(script).toContain(
      "for entry in .env .env.example .git db skills docs uploads worklog.md test-results dev.log server.log",
    );
    expect(script).toContain("viralpost-ai_SKILL.md neo-crm_SKILL.md next.config.ts LICENSE");
  });

  it("carries the boot-gate probe (a secretless production boot must refuse to serve)", () => {
    expect(script).toContain("AUTH_SECRET=\"\"");
    expect(script).toContain("refuses");
  });

  it("kills its own server on exit (the trap)", () => {
    expect(script).toContain("trap");
  });
});

describe("session-22 (S22-10): the error boundaries hold the AA floor on their own superset surface", () => {
  // The h1 mirrored the 404's text-slate-300 (parity-protected THERE —
  // the reference's own designed page) but the boundaries are superset
  // surfaces with no reference to protect the choice: slate-300 over
  // bg-slate-50 computes ~1.48:1, under the 3:1 large-text floor. The
  // h1 steps to slate-500 (~4.6:1 — passes even normal-text AA); the
  // Try-again buttons join the house keyboard-only focus-visible family
  // (S14-6/S15-8/S21-20). (Unrolled per-file — the census counts
  // source it( blocks, so no loop registration.)
  it("src/app/error.tsx: the h1 holds large-text AA + the button is keyboard-only focus ring", () => {
    const src = read("src/app/error.tsx");
    expect(src).toContain('<h1 className="text-4xl font-light text-slate-500">');
    expect(src).not.toContain("text-slate-300");
    expect(src).toMatch(
      /focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/,
    );
    expect(src).not.toMatch(/[^-]focus:outline-none/);
  });

  it("src/app/global-error.tsx: the h1 holds large-text AA + the button is keyboard-only focus ring", () => {
    const src = read("src/app/global-error.tsx");
    expect(src).toContain('<h1 className="text-4xl font-light text-slate-500">');
    expect(src).not.toContain("text-slate-300");
    expect(src).toMatch(
      /focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/,
    );
    expect(src).not.toMatch(/[^-]focus:outline-none/);
  });
});

// Session-25 (S25-8): both boundary cards render as plain div/h1/h2
// trees — when an uncaught error swaps the page for the card, AT users
// got silence (focus stays on the removed content / <body>; the swap
// itself is not announced — WCAG 2.2 AA 4.1.3 on the crash path). The
// house family (ErrorCallout role="alert", the toast viewport's alert
// cards) speaks the idiom; the boundary roots now carry it. The visible
// surface is untouched.
describe("session-25 (S25-8): the boundary cards ANNOUNCE themselves (role=alert on the crash root)", () => {
  it("src/app/error.tsx: the route-segment card root carries role=alert", () => {
    const src = read("src/app/error.tsx");
    expect(src).toMatch(/role="alert"/);
  });

  it("src/app/global-error.tsx: the root card carries role=alert", () => {
    const src = read("src/app/global-error.tsx");
    expect(src).toMatch(/role="alert"/);
  });
});
