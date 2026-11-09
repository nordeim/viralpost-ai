import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { fail, isGuarded, ok, readBoundedJson, requireSession } from "@/lib/api";
import { generatePost, sanitizeIdea } from "@/lib/generator";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// POST /api/generate — the working core the reference's 402-dead LLM could
// not deliver. The LOCAL ENGINE serves every request by default (offline,
// deterministic-per-seed); an optional OpenAI-compatible provider (set
// GENERATOR_PROVIDER + OPENAI_API_KEY) lifts quality when configured.
//
// Quota posture (docs/implementation-plan.md §Deviations): the UX quota is
// the client's daily counter (the reference's own contract); the SERVER
// adds an IP rate limit so the API itself can't be scripted around the
// client wall. Logged-in sessions ride their uid bucket.
const bodySchema = z.object({ idea: z.string().min(1).max(1000) });

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  const guard = await requireSession();
  const user = isGuarded(guard) ? null : guard.user;
  const limitKey = `generate:${user?.id ?? clientKey(req)}`;
  const limited = rateLimit(limitKey, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many generations. Try again later.",
        },
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  const read = await readBoundedJson(req);
  if (read.tooLarge) return fail("BAD_REQUEST", "Request body too large");
  const parsed = bodySchema.safeParse(read.value);
  if (!parsed.success) {
    return fail("BAD_REQUEST", "Describe your post idea first.");
  }

  let idea: string;
  try {
    idea = sanitizeIdea(parsed.data.idea);
  } catch (err) {
    return fail("BAD_REQUEST", err instanceof Error ? err.message : "Invalid idea.");
  }

  const seed = randomInt(1 << 30);
  try {
    const result = generatePost(idea, seed);
    return ok({ text: result.text });
  } catch {
    return fail("INTERNAL", "Generation failed. Please try again.");
  }
}
