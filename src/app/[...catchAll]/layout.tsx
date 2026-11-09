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
export async function generateMetadata({
  params,
}: {
  params: Promise<{ catchAll: string[] }>;
}): Promise<Metadata> {
  const { catchAll } = await params;
  return {
    title: { absolute: unknownRouteTitle(`/${catchAll.join("/")}`) },
  };
}

export default function CatchAllLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
