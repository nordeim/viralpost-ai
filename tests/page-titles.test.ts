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
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
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

// Session-24 (S24-9): the sitemap ROUTES-table face here was RETIRED —
// tests/seo-surfaces.test.ts (the suite built for the SEO route
// contracts in session 23) owns it now with a single ORDERED spanning
// pin (this suite's four independent toContains were order-blind and
// duplicated the face — the AGENTS exactly-one-pin doctrine). The
// /Home → / redirect below stays: a different face (next.config's
// redirect table, not the sitemap's route table).
describe("the /Home 308 alias", () => {
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

  // Session-25 (S25-4): a query/hash/userinfo-carrying origin parses
  // as absolute http(s) with pathname "/" — the F10-11 family's blind
  // spot (the S22-19 pathCarrying check passed silently too). The query
  // then rode unescaped into every surface the seam feeds: the sitemap
  // interpolated a raw & into <loc> (invalid XML, served 200) and
  // og:url/twitter:url/canonical composed the garbage path. A bare
  // origin carries NO credentials, query, or fragment — anything else
  // is an operator paste error and takes the same fallback as a
  // malformed value.
  it("S25-4: a non-bare origin (query/hash/userinfo) falls back to the default", () => {
    expect(siteUrl("https://example.com?utm=1&x=2")).toBe("http://localhost:3000");
    expect(siteUrl("https://example.com/#section")).toBe("http://localhost:3000");
    expect(siteUrl("https://user:pass@example.com")).toBe("http://localhost:3000");
    // The bare-origin family still passes verbatim.
    expect(siteUrl("https://example.com")).toBe("https://example.com");
    expect(siteUrl("http://127.0.0.1:3000")).toBe("http://127.0.0.1:3000");
  });

  // Session-28 (S28-1): the S25-4 genus, completed for the PATH shape.
  // A path-carrying origin parses absolute http(s) with all four S25-4
  // guarded fields empty, so it passed verbatim — while the boot gate
  // has warned on exactly this shape since S22-19 (the warning's own
  // comment: the prefix composes inconsistently across
  // metadataBase/canonical URL resolution vs the twitter:url string
  // concat). The doctrine line above — "anything else is an operator
  // paste error" — includes the path; the seam now takes the same
  // fallback for every non-bare shape. (A path carrying & also rode
  // unescaped into the sitemap's <loc>, the S25-4 failure mode.)
  it("S28-1: a path-carrying origin falls back to the default (the S22-19 genus closed at the seam)", () => {
    expect(siteUrl("https://example.com/base")).toBe("http://localhost:3000");
    expect(siteUrl("http://127.0.0.1:3000/app")).toBe("http://localhost:3000");
    // The bare-origin family still passes verbatim.
    expect(siteUrl("https://example.com")).toBe("https://example.com");
    expect(siteUrl("http://127.0.0.1:3000")).toBe("http://127.0.0.1:3000");
  });
});
