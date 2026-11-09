import { db } from "@/lib/db";
import { ERR, fail, ok, readBoundedJson } from "@/lib/api";
import { contactSchema } from "@/lib/schemas";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// POST /api/contact — persists the contact form the reference only fakes
// (docs/reference-investigation.md §5 D-2: its submit handler is a pure
// client stub — zero network calls). Same UX contract ("Message Sent!"
// clears the form); the message actually lands in the ContactMessage table
// for the operator to read.
//
// Rate limited per IP (5/hour) — the form is public and writes rows.

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  const limited = rateLimit(`contact:${clientKey(req)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.allowed) {
    return ERR.RATE_LIMITED(limited.retryAfterSec);
  }

  const read = await readBoundedJson(req);
  if (read.tooLarge) return fail("BAD_REQUEST", "Request body too large");
  const parsed = contactSchema.safeParse(read.value);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return fail("BAD_REQUEST", first?.message ?? "Invalid submission.");
  }

  try {
    await db.contactMessage.create({ data: parsed.data });
    return ok({ sent: true });
  } catch {
    return fail("INTERNAL", "Something went wrong. Please try again.");
  }
}
