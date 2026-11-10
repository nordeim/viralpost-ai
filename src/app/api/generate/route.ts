import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { fail, isGuarded, ok, readBoundedJson, requireSession } from "@/lib/api";
import { generatePost, ideaTooLongMessage, sanitizeIdea } from "@/lib/generator";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// POST /api/generate — the working core the reference's 402-dead LLM could
// not deliver. The LOCAL ENGINE serves every request (offline,
// deterministic-per-seed). A provider face is a documented WIRE-IN POINT,
// not a shipped feature: generatorPrompt() preserves the reference's exact
// prompt, and a future env-keyed OpenAI-compatible module could slot behind
// this handler — no code reads a provider env today (session-9, F9-3 — the
// old comment advertised GENERATOR_PROVIDER/OPENAI_API_KEY as live knobs).
//
// Quota posture (docs/implementation-plan.md §Deviations): the UX quota is
// the client's daily counter (the reference's own contract); the SERVER
// adds an IP rate limit so the API itself can't be scripted around the
// client wall. Logged-in sessions ride their uid bucket.
const bodySchema = z.object({ idea: z.string().min(1).max(1000) });

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  // Session-14 (S14-3): the session read only SELECTS the limiter bucket
  // (uid vs IP key) — anonymous generation is BY DESIGN (the reference's
  // logged-out tool, ADR-003), so the guard's 401 response is never
  // returned; `user` degrades to null for guests and the IP bucket keys.
  const guard = await requireSession();
  const user = isGuarded(guard) ? null : guard.user;
  const limitKey = `generate:${user?.id ?? clientKey(req)}`;
  const limited = rateLimit(limitKey, RATE_LIMIT, RATE_WINDOW_MS);
  // Session-9 (F9-8): this route's key family sweeps too (the auth-route
  // placement, denied requests included) — under rotating XFF keys with
  // zero auth traffic the generate: buckets were never reclaimed.
  sweepRateLimits();
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
  // Session-15 (S15-2): the null-body class (the content-type CSRF gate's
  // unparseable-by-policy form, or unparseable JSON) answers the parseBody
  // vocabulary — the old branch answered the describe-first message for a
  // malformed body (misleading: the user's client sent no parseable idea
  // at all). The auth family's seam owns this message.
  if (read.value === null) return fail("BAD_REQUEST", "Invalid request body");
  const parsed = bodySchema.safeParse(read.value);
  if (!parsed.success) {
    // Session-11 (F11-7): the schema's max(1000) is a FAST PRE-FILTER in
    // front of the seam's real 500-char bound — an over-length idea must
    // answer the SAME message sanitizeIdea owns (the old branch answered
    // "Describe your post idea first." — misleading for a user who did
    // describe their idea; the textarea has no maxLength, so a paste
    // reaches the boundary). Only a genuinely EMPTY idea keeps the
    // describe-first message.
    // Session-15 (S15-2): only a STRING idea can be over-length — a
    // non-string idea ({"idea": 999}) is a type error and answers the
    // describe-first branch (String(999) used to reach the over-length
    // message for a type error).
    const rawIdea =
      read.value && typeof read.value === "object" && "idea" in read.value
        ? (read.value as { idea: unknown }).idea
        : "";
    return fail(
      "BAD_REQUEST",
      typeof rawIdea === "string" && rawIdea.trim().length > 0
        ? ideaTooLongMessage()
        : "Describe your post idea first.",
    );
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
