import { NotFoundBody } from "@/app/not-found-body";

// The catch-all segment's own not-found boundary (session-2, F-1): a
// page-thrown notFound() discards the PAGE's generateMetadata, so the
// derived unknown-route title lives in the segment LAYOUT (which renders
// around this boundary) and the boundary itself just paints the standard
// 404 body. The true 404 HTTP status is preserved (the SEO superset the
// reference's SPA — 200 everywhere — can't ship).
export default function CatchAllNotFound() {
  return <NotFoundBody />;
}
