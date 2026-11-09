import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { unknownRouteTitle } from "@/lib/route-title";

// The unknown-route catch-all (session-2, F-1) — the /Dashboard decode:
// the reference titles unknown routes
// `<StartCase(last segment)> | ViralPost AI` (live-verified:
// /Dashboard -> "Dashboard | ViralPost AI", /foo-bar -> "Foo Bar",
// /a/b/c -> "C", the empty derivation -> the bare app title).
//
// Next's not-found boundary cannot read the unmatched path server-side,
// so THIS segment owns the derivation: generateMetadata resolves the
// ABSOLUTE title from params (absolute — the full string, never the
// root template's "%s | ViralPost AI" rider, so the empty-derivation
// form stays the bare title and nothing doubles), then the page calls
// notFound() to keep the designed 404 body + the true 404 HTTP status
// (the SEO superset the reference's SPA — 200 everywhere — can't ship).
//
// Routing precedence keeps every real surface untouched: static segments
// (/, /Tool, /Pricing, /Contact, /login, /signup, /reset-password) and
// the /api route handlers all outrank the catch-all; only genuinely
// unmatched paths land here.
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

export default function CatchAllPage(): never {
  notFound();
}
