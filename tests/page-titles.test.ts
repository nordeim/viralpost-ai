import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { pageMetadata, PWA_META, SITE_DESCRIPTION, siteUrl } from "@/lib/site";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The per-route title scheme — the reference's own (DOM-verified
// 2026-11-09): bare "ViralPost AI" on / and /login;
// "<Page> | ViralPost AI" on /Tool, /Pricing, /Contact.

describe("pageMetadata: the per-route family", () => {
  it("the description is the reference's 141-char meta description", () => {
    expect(SITE_DESCRIPTION).toBe(
      "An AI-powered social media generator that helps creators, influencers, and businesses draft high-engagement posts for Instagram, TikTok, Twitter, and LinkedIn in seconds.",
    );
  });

  it("inner pages build '<Page> | ViralPost AI'", () => {
    const tool = pageMetadata({ page: "Tool", route: "/Tool" });
    expect(tool.openGraph?.title).toBe("Tool | ViralPost AI");
    expect(tool.twitter?.title).toBe("Tool | ViralPost AI");
    expect(tool.alternates?.canonical).toBe("/Tool");
  });

  it("the unprefixed family (page: null) ships the bare title", () => {
    const login = pageMetadata({ page: null, route: "/login" });
    expect(login.openGraph?.title).toBe("ViralPost AI");
    expect(login.title).toEqual({ absolute: "ViralPost AI" });
  });

  it("every page re-declares the OG/Twitter/other sets (Next's shallow merge)", () => {
    for (const route of ["/Tool", "/Pricing", "/Contact", "/login"]) {
      const md = pageMetadata({ page: route === "/login" ? null : route.slice(1), route }) as {
        openGraph?: { images?: Array<{ url?: string }> | { url?: string } };
        twitter?: { card?: string };
        other?: Record<string, string>;
      };
      const ogImages = md.openGraph?.images;
      const firstOg = Array.isArray(ogImages) ? ogImages[0] : ogImages;
      expect(firstOg?.url).toBe("/og-image.png");
      expect(md.twitter?.card).toBe("summary_large_image");
      expect(md.other).toMatchObject(PWA_META);
    }
  });

  it("the PWA metas are the installable trio", () => {
    expect(PWA_META["mobile-web-app-capable"]).toBe("yes");
    expect(PWA_META["apple-mobile-web-app-title"]).toBe("ViralPost AI");
  });
});

describe("pageMetadata: the pages consume the factory", () => {
  it("the three inner pages + the auth pages export pageMetadata-built metadata", () => {
    for (const p of [
      "src/app/(site)/Tool/page.tsx",
      "src/app/(site)/Pricing/page.tsx",
      "src/app/(site)/Contact/page.tsx",
      "src/app/login/page.tsx",
      "src/app/signup/page.tsx",
    ]) {
      expect(read(p), p).toContain("pageMetadata(");
    }
  });

  it("the landing page exports NO metadata (the root layout IS the landing head)", () => {
    const page = read("src/app/(site)/page.tsx");
    expect(page).not.toMatch(/export const metadata/);
  });
});

describe("the sitemap route", () => {
  it("lists the canonical routes and never the /Home alias", () => {
    const sitemap = read("src/app/sitemap.xml/route.ts");
    expect(sitemap).toContain('{ path: "/", priority: "1.0" }');
    expect(sitemap).toContain('{ path: "/Tool", priority: "0.8" }');
    expect(sitemap).toContain('{ path: "/Pricing", priority: "0.8" }');
    expect(sitemap).toContain('{ path: "/Contact", priority: "0.8" }');
    expect(sitemap).not.toContain('"/Home"');
  });

  it("the /Home → / redirect lives in next.config.ts", () => {
    const config = read("next.config.ts");
    expect(config).toContain('{ source: "/Home", destination: "/", permanent: true }');
  });
});

describe("siteUrl", () => {
  it("defaults to localhost and strips trailing slashes", () => {
    expect(siteUrl(undefined)).toBe("http://localhost:3000");
    expect(siteUrl("https://example.com/")).toBe("https://example.com");
  });
});
