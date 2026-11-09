// Canonical site origin seam (contract pinned by tests/metadata.test.ts
// and tests/pwa-metadata.test.ts).
//
// NEXT_PUBLIC_SITE_URL has been documented in .env.example / README / CLAUDE
// as "used for metadata, sitemap.xml, and robots.txt" since the scaffold —
// but before session-18 it was consumed NOWHERE. Every metadata surface
// (the root layout's metadataBase + OG/Twitter cards, app/sitemap.ts,
// app/robots.ts) derives from siteUrl() so the documented contract is
// finally true.
//
// Session-19 extended the seam with the per-route metadata factory: the
// reference ships PER-ROUTE canonical/OG/Twitter on every inner page
// (og:title "<Page> | ViralPost AI", og:url origin+route, og:description
// "<Page> on ViralPost AI. " + the root paragraph — live-verified on all 10
// routes 2026-10-01), so the pages build their metadata through
// pageMetadata() instead of hand-rolling ten copies.
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
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/**
 * The inner-page OG description prefix — the CRM-family's session-19
 * convention ("<Page> on <App>. " + the root paragraph), adopted here
 * as the D-4 SEO SUPERSET: the reference ships NO per-route OG at all
 * (dossier D-4: "No SEO per-route canonical/OG on inner pages beyond
 * title tag" — DOM-probed at clone time). Our inner pages are /Tool,
 * /Pricing, /Contact; the root and /login stay unprefixed (page null).
 * The 170-char root paragraph is SITE_DESCRIPTION above. (The scaffold's
 * original comment claimed live verification on the CRM's route
 * vocabulary with a 405-char paragraph — another app's numbers;
 * corrected at session 7, F7-2.)
 */
export function pageOgDescription(page: string): string {
  return `${page} on ViralPost AI. ${SITE_DESCRIPTION}`;
}

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

/**
 * Session-19: the per-route metadata factory. The reference ships
 * PER-ROUTE canonical + OG/Twitter (og:title "<Page> | ViralPost AI",
 * og:url origin+route, the prefixed description, twitter:title/url —
 * live-verified on all 10 routes); Next shallow-merges page metadata over
 * the layout's, so every page re-declares the FULL openGraph/twitter/
 * other sets (otherwise the page would lose the layout's images/card/
 * PWA metas). The OG image is static across the reference's routes (the
 * same URL on root and inner pages — verified), so /og-image.png ships
 * everywhere.
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
  const description = page !== null ? pageOgDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: "ViralPost AI" },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: "ViralPost AI",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
