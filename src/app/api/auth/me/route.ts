import { ok, ERR, fail, isTransientDbFailure, TRANSIENT_DB_MESSAGE } from "@/lib/api";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  // Session-41 (S41-P4 — donor-ledger numbers, the NEO-CRM family): the only route that reads the session directly
  // (it is NOT requireSession-gated by design — a logged-out caller gets
  // data:null, not a 401). A DB failure here now answers the envelope
  // instead of a raw non-JSON 500.
  try {
    const user = await getSessionUser();
    return ok(user); // data: user | null
  } catch (error) {
    // Session-37 (S37-2): the transient-abort family answers the shared
    // 503 (the reset funnel's F9-7 doctrine, hoisted) — a pool/transaction
    // timeout is not this route's 500.
    if (isTransientDbFailure(error)) {
      return fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503);
    }
    return ERR.INTERNAL();
  }
}
