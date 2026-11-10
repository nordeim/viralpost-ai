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
  it("the description is the reference's 170-char meta description", () => {
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

  // Session-19 (S19-1, live re-verified 2026-11-10): the reference's
  // platform ADOPTED the per-route description prefix between the
  // session-18 and session-19 walks — og/twitter/meta description on
  // /Tool /Pricing /Contact now ship "<Page> on ViralPost AI. " + a
  // 70-char tail of the root paragraph (the hard slice + the trailing
  // comma normalized to a period — word-boundary-correct for the pinned
  // string, the S20-15 wording). The session-8 F8-1
  // retirement (which pinned the PLAIN description) is re-anchored to
  // the reference's new live family; / and /login keep the plain
  // 170-char paragraph (unchanged on the reference).
  it("inner pages ship the PREFIXED description on ALL THREE surfaces (the reference's live family, session-19)", () => {
    const tail = "An AI-powered social media generator that helps creators, influencers.";
    for (const page of ["Tool", "Pricing", "Contact"]) {
      const md = pageMetadata({ page, route: `/${page}` });
      // The top-level field too: Next shallow-merges page metadata over
      // the layout's plain root paragraph — without the page-level
      // field the inner routes kept a plain meta description under the
      // prefixed og/twitter family (live-caught on the dev server).
      expect(md.description, page).toBe(`${page} on ViralPost AI. ${tail}`);
      expect(md.openGraph?.description, page).toBe(`${page} on ViralPost AI. ${tail}`);
      expect(md.twitter?.description, page).toBe(`${page} on ViralPost AI. ${tail}`);
    }
  });

  it("the unprefixed family (page: null) keeps the plain description", () => {
    const login = pageMetadata({ page: null, route: "/login" });
    expect(login.description).toBe(SITE_DESCRIPTION);
    expect(login.openGraph?.description).toBe(SITE_DESCRIPTION);
    expect(login.twitter?.description).toBe(SITE_DESCRIPTION);
  });

  it("the prefixed description derives from SITE_DESCRIPTION (the hard 70-char cut + comma normalization)", () => {
    // The live-observed rule (S20-15's precise wording): the tail is
    // SITE_DESCRIPTION hard-cut at 70 chars, the trailing comma
    // normalized to a period — word-boundary-correct only because the
    // pinned description's 70th character happens to be that comma.
    // Pinned against the derivation, not a magic string, so a
    // root-description edit surfaces here instead of silently
    // diverging from the truncation contract.
    const tail = "An AI-powered social media generator that helps creators, influencers.";
    expect(tail).toHaveLength(70);
    expect(SITE_DESCRIPTION.slice(0, 70).replace(/,$/, "") + ".").toBe(tail);
    const tool = pageMetadata({ page: "Tool", route: "/Tool" });
    expect(tool.openGraph?.description).toBe(`Tool on ViralPost AI. ${tail}`);
  });

  it("the description-prefix helper is BACK in the site module (session-19 re-anchor of the F8-1 retirement)", () => {
    // The F8-1 retirement pin ("the prefix STRING must be gone") is
    // inverted by the reference's own live change — the prefix returns
    // WITH the reference's truncation. The helper is pageDescription()
    // (a new name — the retired pageOgDescription name stays retired).
    const siteSrc = read("src/lib/site.ts")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    expect(siteSrc).toContain("export function pageDescription(");
    expect(siteSrc).not.toContain("pageOgDescription");
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
      // Session-21 (S21-10): /reset-password joins the consumer list —
      // its pageMetadata export was the one unpinned factory consumer
      // (a dropped export would have shipped through a green gate).
      "src/app/reset-password/page.tsx",
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

  // Session-10 (F10-11): a malformed NEXT_PUBLIC_SITE_URL used to reach
  // `new URL(siteUrl())` in the ROOT LAYOUT's metadataBase and throw —
  // every route 500s into the error boundary from one operator typo, the
  // whole-site blast radius the boot gate exists to prevent. The seam now
  // falls back to the dev default on any input that does not parse as an
  // absolute http(s) URL.
  it("falls back to the default on malformed input (never bricks the root layout)", () => {
    expect(siteUrl("example.com")).toBe("http://localhost:3000");
    expect(siteUrl("https//missing-colon.example.com")).toBe("http://localhost:3000");
    expect(siteUrl("ftp://scheme-not-allowed.example.com")).toBe("http://localhost:3000");
    expect(siteUrl("   ")).toBe("http://localhost:3000");
  });

  it("valid origins pass through verbatim (slash-stripped, port preserved)", () => {
    expect(siteUrl("http://127.0.0.1:3000")).toBe("http://127.0.0.1:3000");
    expect(siteUrl("https://viralpost.example.com///")).toBe("https://viralpost.example.com");
  });
});
