import { ok } from "@/lib/api";
import { clearSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  // Session-18 (S18-3): deliberately bare — the only cookie-mutating
  // route without a try/catch. clearSessionCookie performs no crypto
  // (never calls secret()) and no DB work, and cookies() cannot throw
  // inside a route handler, so there is no realistic throw path across
  // the boundary (login/verify wrap their MINT in try because secret()
  // and the DB read CAN throw). If the clear ever gains a throwing
  // dependency, wrap it: try → ERR.INTERNAL(), the sibling idiom.
  await clearSessionCookie();
  return ok({ signedOut: true });
}
