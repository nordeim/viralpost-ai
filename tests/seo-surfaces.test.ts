import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-23 (S23-14/S23-15): the SEO route handlers' body contracts.
// The manifest and sitemap routes exist specifically to control FORMAT
// (Next's serializers re-order keys / drop number formatting — the route
// headers document both), yet the format layer was the least-pinned
// aspect of the tree: a dropped theme_color or a missing xmlns shipped
// green through every layer. These pins close the gap by invoking the
// route modules directly (GET() → parse → assert the field-for-field
// contract the headers claim).

// The site origin seam: NEXT_PUBLIC_SITE_URL inlines at build time; the
// unit layer pins the SHAPE, so any stable value works (the factory's
// own fallback covers unset).
process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";

import { siteUrl } from "@/lib/site";

async function getRouteBody(rel: string): Promise<{ body: string; contentType: string }> {
  // Route handlers are pure ESM modules — import fresh so env tweaks in
  // this file apply (Next's module caching never runs here).
  const mod = (await import(path.resolve(import.meta.dirname, "..", rel))) as {
    GET: () => Response;
  };
  const res = mod.GET();
  return {
    body: await res.text(),
    contentType: res.headers.get("content-type") ?? "",
  };
}

describe("session-23 (S23-14): the manifest body contract (field-for-field, the reference's key order)", () => {
  it("the nine fields + the content-type (the route's own parity claim, pinned)", async () => {
    const { body, contentType } = await getRouteBody("src/app/manifest.json/route.ts");
    const manifest = JSON.parse(body) as Record<string, unknown>;

    // The field-for-field family (the reference's platform manifest).
    expect(manifest.name).toBe("ViralPost AI");
    expect(manifest.short_name).toBe("ViralPost AI");
    expect(typeof manifest.description).toBe("string");
    expect((manifest.description as string).length).toBeGreaterThan(100);
    expect(Array.isArray(manifest.icons)).toBe(true);
    const icons = manifest.icons as Array<{ src: string; sizes: string; type: string }>;
    expect(icons).toHaveLength(2);
    expect(icons[0]?.sizes).toBe("192x192");
    expect(icons[1]?.sizes).toBe("512x512");
    expect(icons[0]?.type).toBe("image/png");
    expect(icons[0]?.src).toContain("/icon.png");
    expect(manifest.start_url).toContain("http");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#000000");
    expect(manifest.background_color).toBe("#ffffff");
    expect(manifest.scope).toContain("http");

    // The reference's exact key order (JSON.stringify preserves it —
    // the route's stated reason for hand-building the object).
    expect(Object.keys(manifest)).toEqual([
      "name",
      "short_name",
      "description",
      "icons",
      "start_url",
      "display",
      "theme_color",
      "background_color",
      "scope",
    ]);

    // The reference serves application/json (no charset suffix).
    expect(contentType).toBe("application/json");
  });
});

describe("session-23 (S23-15): the sitemap envelope contract (the sitemaps.org format layer)", () => {
  it("the XML declaration + the xmlns + the four-route body + the exact formatting", async () => {
    const { body, contentType } = await getRouteBody("src/app/sitemap.xml/route.ts");

    // The envelope a crawler validates against (the layer Next's
    // sitemap.ts serializer owns in a normal app — this route exists to
    // control it, so it carries the pin).
    expect(body.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true);
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    // The four-route body with the priority split + the 4-space indent.
    expect(body).toContain("    <url>");
    expect((body.match(/<loc>/g) ?? []).length).toBe(4);
    expect(body).toContain("<priority>1.0</priority>");
    expect((body.match(/<priority>0.8<\/priority>/g) ?? []).length).toBe(3);
    expect(body).toContain("<changefreq>weekly</changefreq>");

    // The reference's exact format (live re-verified session 8): LF-only,
    // no trailing newline after </urlset>, "1.0" keeps its decimal (the
    // serializer-drop the header documents).
    expect(body.endsWith("</urlset>")).toBe(true);
    expect(body.includes("\r")).toBe(false);

    // The reference's exact content-type (no charset suffix).
    expect(contentType).toBe("application/xml");
  });
});

// Source-truth backstop: the ROUTES table is the single source the body
// test above exercises dynamically — the literal ORDER is pinned by ONE
// spanning assertion so a reorder (nav-order drift) fails with a
// readable message. Session-24 (S24-9): the four independent
// `toContain`s this block shipped with were order-INDEPENDENT — the
// comment claimed order was pinned while a reorder shipped green (the
// comment-truth genus, in a test). This block is also the ROUTES
// table's ONLY pin: the duplicate face in page-titles.test.ts (the
// pre-S23 home) was retired in the same commit — the AGENTS
// exactly-one-pin doctrine restored (a ROUTES edit trips ONE suite,
// and this one owns the readable message).
describe("session-23 (S23-15b): the sitemap route's source shape", () => {
  it("the ROUTES table carries the four canonical paths IN NAV ORDER (one spanning pin)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/app/sitemap.xml/route.ts"),
      "utf-8",
    );
    // One regex across the array body — sequence is the contract.
    expect(src).toMatch(
      /\{ path: "\/", priority: "1\.0" \},\s*\{ path: "\/Tool", priority: "0\.8" \},\s*\{ path: "\/Pricing", priority: "0\.8" \},\s*\{ path: "\/Contact", priority: "0\.8" \}/,
    );
    // /Home is the 308 alias — NEVER listed (duplicate content).
    expect(src).not.toContain('path: "/Home"');
  });
});

// Session-24 (S24-10): sitemaps.org REQUIRES <loc> to be an absolute
// URL — the composition siteUrl() + path was the one unpinned link in
// the sitemap contract chain (an empty origin reaching the template
// would ship relative locs green through unit, e2e, and smoke; the
// crawl engines reject them outright). The four absolute locs, in
// order — which also nails the body-level sequence the source pin
// above guards at the table.
describe("session-24 (S24-10): the sitemap locs are ABSOLUTE (the sitemaps.org hard requirement)", () => {
  it("every <loc> is origin-composed, in nav order", async () => {
    const { body } = await getRouteBody("src/app/sitemap.xml/route.ts");
    const origin = siteUrl();
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(
      ["/", "/Tool", "/Pricing", "/Contact"].map((p) => `${origin}${p}`),
    );
  });
});

// Session-24 (S24-10): robots.txt — the third SEO route, the one whose
// stated reason for existing is FORMAT control (Next's serializer emits
// "User-Agent"; the reference ships lowercase, LF-only, no trailing
// newline, one blank line before the Sitemap entry). Its body contract
// joins the manifest + sitemap pins: the exact body, byte-for-byte,
// against the same origin seam the route reads.
describe("session-24 (S24-10): the robots body contract (the format layer the route exists to control)", () => {
  it("the exact four-line body — lowercase User-agent, the blank line, LF-only, no trailing newline", async () => {
    const { body, contentType } = await getRouteBody("src/app/robots.txt/route.ts");
    const origin = siteUrl();
    expect(body).toBe(`User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml`);
    expect(body.includes("\r")).toBe(false);
    expect(contentType).toBe("text/plain; charset=utf-8");
  });
});

// Session-24 (S24-11): the declared og:image dimensions (1200×630, the
// openGraph images entry in site.ts) match the ACTUAL asset bytes — an
// asset swap with different dims would ship green through every layer
// and mis-render link previews. The PNG IHDR is read directly (bytes
// 16-23, big-endian) and pinned against both the declared pair and the
// site.ts literal.
describe("session-24 (S24-11): the og:image asset matches its declared dimensions", () => {
  it("public/og-image.png's IHDR equals the 1200×630 declared in site.ts", () => {
    const png = readFileSync(
      path.resolve(import.meta.dirname, "..", "public/og-image.png"),
    );
    // PNG: 8-byte signature, then the first chunk — IHDR — with width
    // at offset 16 and height at 20 (big-endian uint32).
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    // The declared side carries the same pair (the metadata ↔ asset
    // contract, both directions).
    const site = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/site.ts"),
      "utf-8",
    );
    expect(site).toContain('images: [{ url: "/og-image.png", width: 1200, height: 630 }]');
  });
});
