import { fail } from "@/lib/api";

export const dynamic = "force-dynamic";

// Session-16 (S16-2): the BARE /api path — the one shape the required
// [...path] catch-all (src/app/api/[...path]/route.ts, S15-7) can never
// match, because a required catch-all needs at least one segment. It
// used to fall through to the page tree's [...catchAll] and answer the
// HTML 404 (title "Api | ViralPost AI") — an API client probing the
// subtree root got markup instead of the envelope. This route closes
// the doctrine's last escaping shape with the same method family
// (specific routes still win the manifest match; unknown methods on
// KNOWN paths keep Next's own 405s).
// Session-18 (S18-2): OPTIONS joins the family — without the export,
// Next replies to OPTIONS with a bare 204 (live-observed in the RED
// run), a non-envelope response on a path that does not exist. TRACE
// stays outside the family by necessity: it is not a supported
// route-handler method, Next rejects it at the router level.
// Session-19 (S19-6): the known-path twin is the DOCUMENTED exception —
// the 11 verb-handler routes export no OPTIONS, so an OPTIONS probe of
// a KNOWN path (/api/generate, /api/auth/login, …) keeps Next's own
// router-level 204. Deliberate: a CORS preflight benefits from the
// framework's built-in reply, no handler owns OPTIONS semantics on a
// known resource, and pinning Next's internal behavior would pin the
// framework rather than our contract. Only the unknown-path
// catch-alls (this family) own the envelope face.
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
