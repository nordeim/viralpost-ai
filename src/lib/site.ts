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
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
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

/**
 * The per-route metadata factory. The reference's live OG/Twitter family
 * (session-8 census, 2026-11-09): og:title "<Page> | ViralPost AI"
 * (bare "ViralPost AI" on the unprefixed routes), og:description the
 * PLAIN 170-char paragraph on every route, og:url origin+route, the
 * twitter family mirrors, one static og:image. Next shallow-merges page
 * metadata over the layout's, so every page re-declares the FULL
 * openGraph/twitter/other sets (otherwise the page would lose the
 * layout's images/card/PWA metas).
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
      description: SITE_DESCRIPTION,
      url: opts.route,
      type: "website",
      siteName: "ViralPost AI",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: SITE_DESCRIPTION,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
