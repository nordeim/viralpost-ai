import { fail } from "@/lib/api";

export const dynamic = "force-dynamic";

// Session-16 (S16-2): the BARE /api path — the one shape the required
// [...path] catch-all (src/app/api/[...path]/route.ts, S15-7) can never
// match, because a required catch-all needs at least one segment. It
// used to fall through to the page tree's [...catchAll] and answer the
// HTML 404 (title "Api | ViralPost AI") — an API client probing the
// subtree root got markup instead of the envelope. This route closes
// the doctrine's last escaping shape with the same five-method family
// (specific routes still win the manifest match; unknown methods on
// KNOWN paths keep Next's own 405s).
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
