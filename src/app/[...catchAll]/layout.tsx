import type { Metadata } from "next";

import { unknownRouteTitle } from "@/lib/route-title";

// The catch-all segment's layout (session-2, F-1) — owns the unknown-route
// title derivation. Next DISCARDS a page's generateMetadata when the page
// throws notFound() (probe-verified 2026-11-09: the same generateMetadata
// applied cleanly while the page rendered, and vanished once notFound()
// entered the picture) — but the LAYOUT around the not-found boundary
// still renders, and its generateMetadata rides the response.
//
// The title is ABSOLUTE (the full derived string, never the root
// template's "%s | ViralPost AI" rider) so the empty-derivation form
// stays the bare app title and nothing doubles.
//
// Session-66 (S66-3, AUDIT-3-1 L — live-probed on the standalone
// build): the SELF-CANONICAL. Without an `alternates` here, Next
// shallow-merged over the root layout's metadata and every 404 shipped
// the LANDING's canonical (`<link rel="canonical" href="<origin>"/>`)
// while simultaneously emitting noindex — a mixed signal with zero
// owners. The request path now declares itself its own canonical (the
// pageMetadata factory's relative form; metadataBase resolves it —
// site.ts:192's `alternates: { canonical: opts.route }` sibling). The
// root layout's og family STAYS by design: og:url/og:image keep
// advertising the site card on a noindexed page (rebuilding the full
// OG object here would forfeit the inherited family for zero SEO
// weight — the registered posture, PAD §11).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ catchAll: string[] }>;
}): Promise<Metadata> {
  const { catchAll } = await params;
  const route = `/${catchAll.join("/")}`;
  return {
    title: { absolute: unknownRouteTitle(route) },
    alternates: { canonical: route },
  };
}

export default function CatchAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
