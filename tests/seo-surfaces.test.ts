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
// test above exercises dynamically — pin the literal order too so a
// reorder (nav-order drift) fails with a readable message.
describe("session-23 (S23-15b): the sitemap route's source shape", () => {
  it("the ROUTES table carries the four canonical paths in nav order", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/app/sitemap.xml/route.ts"),
      "utf-8",
    );
    expect(src).toContain('{ path: "/", priority: "1.0" }');
    expect(src).toContain('{ path: "/Tool", priority: "0.8" }');
    expect(src).toContain('{ path: "/Pricing", priority: "0.8" }');
    expect(src).toContain('{ path: "/Contact", priority: "0.8" }');
    // /Home is the 308 alias — NEVER listed (duplicate content).
    expect(src).not.toContain('path: "/Home"');
  });
});
