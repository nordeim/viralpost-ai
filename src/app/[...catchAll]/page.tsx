import { notFound } from "next/navigation";

// The unknown-route catch-all (session-2, F-1) — the /Dashboard decode:
// the reference titles unknown routes
// `<StartCase(last segment)> | ViralPost AI` (live-verified:
// /Dashboard -> "Dashboard | ViralPost AI", /foo-bar -> "Foo Bar",
// /a/b/c -> "C", the empty derivation -> the bare app title).
//
// The page's ONLY job is to throw notFound() — the derived title lives
// in this segment's LAYOUT (session-3, F3-4: the page used to carry its
// own generateMetadata too, but Next DISCARDS a page's metadata when
// the page calls notFound() — probe-verified — so that copy was dead
// code from the session-2 iteration; the layout around the not-found
// boundary is what renders and its metadata is what rides the response).
// notFound() keeps the designed 404 body + the true 404 HTTP status
// (the SEO superset the reference's SPA — 200 everywhere — can't ship).
//
// Routing precedence keeps every real surface untouched: static segments
// (/, /Tool, /Pricing, /Contact, /login, /signup, /reset-password) and
// the /api route handlers all outrank the catch-all; only genuinely
// unmatched paths land here.
export default function CatchAllPage(): never {
  notFound();
}
