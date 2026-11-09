// The site's shared vocabulary: brand strings, routes, the Gumroad product
// link — the single source every nav/footer/CTA reads (route-path parity
// with the reference: /Home, /Tool, /Pricing, /Contact — the capital forms
// are the reference's own).

export const BRAND = {
  name: "ViralPost AI",
  tagline:
    "Smart AI tools for creators, influencers, and businesses. Generate viral-ready social media posts in seconds.",
  description:
    "An AI-powered social media generator that helps creators, influencers, and businesses draft high-engagement posts for Instagram, TikTok, Twitter, and LinkedIn in seconds.",
} as const;

/** The reference's product page (external, opens in a new tab). */
export const GUMROAD_URL = "https://templixco.gumroad.com/l/znzbnd";

export type RouteId = "home" | "tool" | "pricing" | "contact";

export interface NavRoute {
  id: RouteId;
  /** The label shown in navs and footers. */
  label: string;
  /** The reference's capitalized path. */
  href: string;
  /** The canonical path on OUR site (the /Home alias redirects to /). */
  canonical: string;
}

export const NAV_ROUTES: readonly NavRoute[] = [
  { id: "home", label: "Home", href: "/Home", canonical: "/" },
  { id: "tool", label: "Tool", href: "/Tool", canonical: "/Tool" },
  { id: "pricing", label: "Pricing", href: "/Pricing", canonical: "/Pricing" },
  { id: "contact", label: "Contact", href: "/Contact", canonical: "/Contact" },
] as const;

/** The active-route resolver: / and /Home both light the Home link. */
export function activeRoute(pathname: string): RouteId {
  if (pathname === "/" || pathname === "/Home") return "home";
  if (pathname.startsWith("/Tool")) return "tool";
  if (pathname.startsWith("/Pricing")) return "pricing";
  if (pathname.startsWith("/Contact")) return "contact";
  return "home";
}

/** The social links — the reference ships dead `#` stubs; we link the
 *  real platform homepages (the documented dead-control fix). */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Facebook", href: "https://facebook.com" },
] as const;
