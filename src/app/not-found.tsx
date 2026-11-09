import { NotFoundBody } from "./not-found-body";

export default function NotFound() {

// The ROOT-level not-found boundary — a dormant insurance layer in this
// architecture (session-7, F7-3: this comment block was rewritten; the
// scaffold's session-194 text described the CRM reference's 404 title
// behavior as this reference's — wrong app, wrong bundle, wrong claims).
//
// WHY THIS FILE IS DORMANT HERE: unknown routes are owned by the
// [...catchAll] segment (session-2, F-1) — its page calls notFound(),
// its SEGMENT not-found renders the 404 body, and the segment LAYOUT's
// generateMetadata derives the title ("Dashboard | ViralPost AI" on
// /Dashboard — the live-verified scheme the reference's SPA ships,
// re-verified every round since). THIS root boundary only answers a
// notFound() thrown OUTSIDE the catch-all segment — and no route in
// this tree throws one; it exists so a future notFound() call site
// still renders the designed 404 body instead of Next's stock page.
//
// The title on this boundary: no metadata export (declaring one would
// override the root layout's title machinery); the root layout's
// title.default "ViralPost AI" renders, exactly as on / and /login.
//
// Session independence by design: no session resolution, no redirect —
// the 404 body renders for anon and authenticated visitors alike (the
// reference serves its designed 404 publicly too — dossier: /Dashboard
// → Public → 404 page; OURS adds the true 404 HTTP status the
// reference's SPA-200-everywhere can't ship).
  return <NotFoundBody />;
}
