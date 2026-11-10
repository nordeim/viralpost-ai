import { fail } from "@/lib/api";

export const dynamic = "force-dynamic";

// Session-15 (S15-7): the API subtree's unmatched paths. The root page
// catch-all ([...catchAll]) used to win where no api route exists — an
// API client hitting a typo'd endpoint received the HTML 404 body (the
// content-type was text/html; live-confirmed). This route owns the
// subtree's unknown paths with the envelope's 404, extending the
// true-404 doctrine to the API family. Specific routes always win the
// manifest match; unknown methods on KNOWN paths keep Next's own 405s.
// The five-method family is deliberate: a single-method route would
// hand POST /api/typo a 405 for a path that does not exist at all.
// Session-18 (S18-2): OPTIONS joins the family — without the export,
// Next replies to OPTIONS with a bare 204 (live-observed in the RED
// run), a non-envelope response on a path that does not exist. TRACE
// stays outside the family by necessity: it is not a supported
// route-handler method, Next rejects it at the router level.
const notFound = () => fail("NOT_FOUND", "Unknown API endpoint", 404);

export async function GET() {
  return notFound();
}

export async function POST() {
  return notFound();
}

export async function PUT() {
  return notFound();
}

export async function PATCH() {
  return notFound();
}

export async function DELETE() {
  return notFound();
}

export async function OPTIONS() {
  return notFound();
}
