// Canonical site origin seam (contract pinned by tests/page-titles.test.ts
// — the per-route title/OG/canonical family, the PWA metas, the sitemap
// route pins).
//
// NEXT_PUBLIC_SITE_URL has been documented in .env.example / README / CLAUDE
// as "used for metadata, sitemap.xml, and robots.txt" since the scaffold —
// but before the CRM-family's session-18 it was consumed NOWHERE. Every
// metadata surface (the root layout's metadataBase + OG/Twitter cards, the
// app/sitemap.xml + app/robots.txt route handlers) derives from siteUrl()
// so the documented contract is finally true.
//
// The per-route metadata factory (the scaffold family's session-19 shape):
// live re-verified against the reference at session 8 (2026-11-09, curl
// head census on /, /Tool, /Pricing, /Contact, /login) — the reference
// ships the full per-route OG/Twitter family: og:title mirrors the title
// scheme, og:description is the PLAIN 170-char root paragraph (unprefixed
// — the CRM-family's "<Page> on <App>. " prefix was never the reference's
// shape; retired at session 8, F8-1), og:url absolute, canonical on every
// route, the twitter family mirrors, one static og:image. Our
// /og-image.png is the S-10 self-hosted stand-in for the reference's
// platform-rendered logo (docs/implementation-plan.md §6).
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the variable
// before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

export const DEFAULT_SITE_URL = "http://localhost:3000";

/** The reference's meta description, mirrored verbatim (170 chars —
 * live re-verified at session 7: byte-identical on the reference). */
export const SITE_DESCRIPTION =
  "An AI-powered social media generator that helps creators, influencers, and businesses draft high-engagement posts for Instagram, TikTok, Twitter, and LinkedIn in seconds.";

/**
 * Canonical public origin: NEXT_PUBLIC_SITE_URL when set (trailing slashes
 * stripped — URL composition below always appends paths), otherwise the
 * localhost dev default.
 *
 * Session-10 (F10-11): input that does not parse as an ABSOLUTE http(s)
 * URL falls back to the default instead of flowing into `new URL()` in
 * the root layout's metadataBase — a schemeless operator typo used to
 * throw there and 500 EVERY route (the whole-site blast radius the boot
 * gate exists to prevent; the boot gate now warns on the malformed shape
 * too, in dev and production).
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  const stripped = raw.replace(/\/+$/, "");
  try {
    const parsed = new URL(stripped);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    // Session-25 (S25-4): a bare origin carries NO credentials, query,
    // or fragment. A query-carrying paste ("https://x.com?utm=1&x=2")
    // parses as absolute http(s) with pathname "/" — it slipped past
    // every prior check and rode unescaped into the sitemap's <loc>
    // (raw & — invalid XML, served 200) and into og:url/canonical
    // compositions. Same fallback as any malformed value; the boot
    // gate names the shape (boot-env's query-carrying warning).
    if (parsed.username || parsed.password || parsed.search || parsed.hash) {
      return DEFAULT_SITE_URL;
    }
    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

// (Session 8, F8-1: the scaffold's pageOgDescription helper — the
// CRM-family's "<Page> on <App>. " prefix over the root paragraph —
// was adopted here when dossier D-4 recorded the reference as shipping no
// per-route OG at all. The session-8 live census found the reference DOES
// ship per-route OG, with the PLAIN description on every route, so the
// prefix was a live drift and the helper (zero external callers) was
// retired in the same commit; pageMetadata ships SITE_DESCRIPTION
// directly. The retirement is pinned by tests/page-titles.test.ts.)

/**
 * Session-19: the three PWA metas the reference ships in its <head>
 * (mobile-web-app-capable + the apple pair). Next's Metadata object has
 * no first-class fields for them, so they ride `metadata.other` — and
 * because page-level metadata REPLACES the layout's `other` map (shallow
 * merge), the per-page factory re-declares them on every page.
 */
export const PWA_META: Record<string, string> = {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black",
  "apple-mobile-web-app-title": "ViralPost AI",
};

// Session-25 (S25-6): the ONE declared OG image — consumed by BOTH
// pageMetadata() and the root layout's own openGraph block (the
// landing `/` takes its OG family from the LAYOUT, not the factory;
// the dims were hand-declared in both places and the S24-11 pin only
// saw the factory's literal, so a layout dims edit shipped green).
// The asset's IHDR is pinned against these bytes in seo-surfaces.
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
} as const;

// Session-19 (S19-1, live re-verified 2026-11-10): the reference's
// platform adopted the per-route description prefix between the
// session-18 and session-19 walks — /Tool, /Pricing and /Contact now
// ship "<Page> on ViralPost AI. " + a truncated tail of this
// paragraph on meta/og/twitter description alike (byte-identical
// across the three surfaces, live-captured on all three routes). The
// tail rule, reverse-engineered from the captures: SITE_DESCRIPTION
// cut at 70 chars with the trailing comma normalized to a period —
// the cut lands on a word boundary for the PINNED string (its 70th
// char is the comma after "influencers"), which is the mechanism
// below; the byte-pins in tests/page-titles.test.ts carry the
// contract, and any edit to SITE_DESCRIPTION re-anchors them. NOT
// the full paragraph the CRM-family's retired pageOgDescription
// helper shipped (session-8 F8-1 retired that prefix when the
// reference shipped the plain paragraph; the reference has since
// adopted its own prefixed+truncated shape).
const PAGE_DESCRIPTION_TAIL =
  SITE_DESCRIPTION.slice(0, 70).replace(/,$/, "") + ".";

/** The per-route description: the prefix + the 70-char tail (the
 *  reference's live family on /Tool /Pricing /Contact). The
 *  unprefixed routes (/, /login) keep SITE_DESCRIPTION wholesale. */
export function pageDescription(page: string): string {
  return `${page} on ViralPost AI. ${PAGE_DESCRIPTION_TAIL}`;
}

/**
 * The per-route metadata factory. The reference's live OG/Twitter family
 * (session-19 census, 2026-11-10): og:title "<Page> | ViralPost AI"
 * (bare "ViralPost AI" on the unprefixed routes), og:description the
 * PREFIXED "<Page> on ViralPost AI. " + 70-char truncated tail on the
 * three inner routes (the plain 170-char paragraph on / and /login —
 * the session-19 S19-1 re-anchor of the session-8 F8-1 finding),
 * og:url origin+route, the twitter family mirrors, one static
 * og:image. Next shallow-merges page metadata over the layout's, so
 * every page re-declares the FULL openGraph/twitter/other sets
 * (otherwise the page would lose the layout's images/card/PWA metas).
 *
 * - `page: null` → the unprefixed root/login family ("ViralPost AI" + the
 *   plain paragraph). Login keeps its ABSOLUTE title (the s13
 *   anti-doubling pin); pass `title` for other absolute spellings
 *   (signup: "Sign up | ViralPost AI").
 * - The dashboard needs NO factory call — it inherits the root layout's
 *   metadata wholesale (og:url = the origin root, which is exactly the
 *   reference's unprefixed family for / and /Dashboard).
 */
export function pageMetadata(opts: {
  page: string | null;
  route: string;
  title?: string;
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | ViralPost AI` : "ViralPost AI";
  const description = page !== null ? pageDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: "ViralPost AI" },
    // Session-19 (S19-1): the top-level description too — Next
    // shallow-merges page metadata over the layout's, and the layout
    // ships the plain root paragraph; without this field the inner
    // routes kept the plain meta description under the prefixed og
    // family (live-caught on the dev server post-cure).
    description,
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: "ViralPost AI",
      // Session-25 (S25-6): the ONE declared OG image — the root
      // layout's own block rides the same const (the dims were
      // hand-declared in both places; the S24-11 pin only saw this
      // one).
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      // Session-26 (S26-5): the twitter family rides the shared const's
      // url — the hand-written literal drifted greenly on asset renames
      // (the S25-6 one-declaration doctrine, completed).
      images: [OG_IMAGE.url],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
