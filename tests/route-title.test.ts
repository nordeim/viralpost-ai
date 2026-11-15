import { describe, expect, it } from "vitest";

import { unknownRouteTitle } from "@/lib/route-title";

// The unknown-route title derivation — the reference's own scheme,
// live-verified 2026-11-09 on viralpostai.base44.app in BOTH auth states
// (docs/plans/2026-11-09-session2-parity-audit-remediation.md §2):
//
//   <StartCase(last path segment)> | ViralPost AI
//
// The derivation is NOT lodash startCase — digits never split a word
// (verified: /page2 -> "Page2", /12ft -> "12ft", /a1b2 -> "A1b2"):
//   1. take the LAST non-empty path segment ("/a/b/c" -> "c")
//   2. split on non-alphanumeric runs (hyphen/underscore/space, collapsing)
//   3. split on camelCase transitions: [a-z0-9][A-Z] boundaries, and an
//      uppercase run keeps its final letter with the following lowercase
//      run ("XMLHttpRequest" -> "XML Http Request")
//   4. upperFirst each word (leading digits stay; all-caps words stay)
//   5. empty derivation (e.g. "/-") -> the BARE "ViralPost AI" title
describe("unknownRouteTitle: the reference's unknown-route scheme", () => {
  it("single-word segments capitalize", () => {
    expect(unknownRouteTitle("/Dashboard")).toBe("Dashboard | ViralPost AI");
  });

  it("hyphenated segments split and capitalize", () => {
    expect(unknownRouteTitle("/foo-bar")).toBe("Foo Bar | ViralPost AI");
  });

  it("camelCase segments split on the lower->upper boundary", () => {
    expect(unknownRouteTitle("/userSettings")).toBe("User Settings | ViralPost AI");
  });

  it("an uppercase run keeps its final letter with the following lowercase run", () => {
    expect(unknownRouteTitle("/XMLHttpRequest")).toBe("XML Http Request | ViralPost AI");
  });

  it("only the LAST segment counts", () => {
    expect(unknownRouteTitle("/a/b/c")).toBe("C | ViralPost AI");
  });

  it("all-caps words are preserved", () => {
    expect(unknownRouteTitle("/HELLO")).toBe("HELLO | ViralPost AI");
  });

  it("underscores split like hyphens", () => {
    expect(unknownRouteTitle("/with_underscore")).toBe("With Underscore | ViralPost AI");
  });

  it("spaces split; lowercase words capitalize", () => {
    expect(unknownRouteTitle("/UPPER lowercase")).toBe("UPPER Lowercase | ViralPost AI");
  });

  it("digits never split a word (NOT lodash startCase)", () => {
    expect(unknownRouteTitle("/page2")).toBe("Page2 | ViralPost AI");
    expect(unknownRouteTitle("/12ft")).toBe("12ft | ViralPost AI");
    expect(unknownRouteTitle("/a1b2")).toBe("A1b2 | ViralPost AI");
  });

  it("consecutive separators collapse", () => {
    expect(unknownRouteTitle("/foo--bar")).toBe("Foo Bar | ViralPost AI");
  });

  it("an empty derivation falls back to the bare title (no separator)", () => {
    expect(unknownRouteTitle("/-")).toBe("ViralPost AI");
    expect(unknownRouteTitle("/---")).toBe("ViralPost AI");
  });

  it("deep paths with trailing separators use the last real segment", () => {
    expect(unknownRouteTitle("/nested/path/")).toBe("Path | ViralPost AI");
    expect(unknownRouteTitle("//x//")).toBe("X | ViralPost AI");
  });

  it("the root pathname (never a 404 in practice) is guarded anyway", () => {
    expect(unknownRouteTitle("/")).toBe("ViralPost AI");
  });
});

// Session-66 (S66-3, AUDIT-3-1 L — live-probed on the standalone
// build): the 404 head's SELF-CANONICAL. The catchAll layout's
// generateMetadata returned only the title, so Next shallow-merged
// over the root layout's metadata and every 404 shipped the LANDING's
// canonical (`<link rel="canonical" href="<origin>"/>`) + og:url at
// the origin root while simultaneously emitting noindex — a mixed
// signal with ZERO owners (the e2e 404 test asserted title/noindex/
// body; smoke leg 06 title/noindex). The cure: the layout declares
// the request path its own canonical (the pageMetadata factory's
// relative form — metadataBase resolves it); the root layout's og
// family stays (the shallow-merge replacement cost of rebuilding the
// full OG object buys nothing on a noindexed page — REGISTERED).
// Behavioral pin: the LAYOUT's own generateMetadata, called with the
// params shape Next passes — the title asserts the KNOWN literal (an
// independent source of truth, never a re-derivation through
// unknownRouteTitle), the canonical asserts the request path.
describe("session-66 (S66-3): the 404 head's self-canonical (the catchAll layout's metadata)", () => {
  it("generateMetadata carries the request path's canonical — never the landing's — beside the derived title", async () => {
    const { generateMetadata } = await import("@/app/[...catchAll]/layout");
    const meta = await generateMetadata({
      params: Promise.resolve({ catchAll: ["definitely-not-a-route"] }),
    });
    expect(meta.alternates?.canonical).toBe("/definitely-not-a-route");
    // The known literal (the e2e family's own probe route).
    expect(meta.title).toEqual({ absolute: "Definitely Not A Route | ViralPost AI" });
  });

  it("a deep path canonical joins every segment (the layout owns the join, not the title's last-segment rule)", async () => {
    const { generateMetadata } = await import("@/app/[...catchAll]/layout");
    const meta = await generateMetadata({
      params: Promise.resolve({ catchAll: ["nested", "not-a-route"] }),
    });
    expect(meta.alternates?.canonical).toBe("/nested/not-a-route");
  });
});
