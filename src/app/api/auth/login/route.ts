import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
import { verifyPassword, timingEqualizerHash, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { unverifiedAccount, verificationRequiredMessage } from "@/lib/verification";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const limit = rateLimit(`login:${clientKey(req)}`, 10, 15 * 60 * 1000);
  sweepRateLimits();
  // Session-67 (N-67h): the 429 joins the ERR family — the hand-built
  // NextResponse block is retired; the Retry-After header it carried
  // moves into ERR.RATE_LIMITED so every auth route ships it.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (the declared-size pre-gate + the
  // schema + the composite required message, one call — the N-67d pre-gate
  // and the N-63i email cap ride inside parseBody).
  const parsed = await parseBody(req, loginSchema);
  if (!parsed.ok) return parsed.response;
  const { email, password } = parsed.data;

  // Session-40 (S40-P5): the read + verification + cookie-set tail
  // joins the envelope — this was the ONLY auth-route DB read left
  // unwrapped (a SQLITE_BUSY-class failure answered a raw non-JSON
  // 500; signup/verify/resend wrapped theirs in s37). The returns
  // inside the try are the handler's own responses — the catch only
  // fires on a thrown DB failure.
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      // Session-163 (the digma S72-C port): the timing equalizer — the
      // miss branch burns the SAME scrypt work against a precomputed
      // throwaway-constant hash, so response latency no longer
      // distinguishes registered emails (the 401 envelope stays
      // byte-identical; the burn is LAZY-memoized at the pure seam).
      if (!user) verifyPassword(password, timingEqualizerHash());
      // Session-21 (S21-P1): the reference's banner text — "Invalid email or
      // password" (ours said "Incorrect…"). Live re-verified against this
      // reference at session 8 (2026-11-09: wrong-password POST → the
      // platform's "Invalid email or password" error; correct → 200).
      return fail("INVALID_CREDENTIALS", "Invalid email or password", 401);
    }

    // Session-21 (S21-P5): an unverified account cannot sign in —
    // "Please verify your email before logging in. Check your email for the
    // verification code." rides the base44 platform's shared auth component
    // (inherited from the scaffold family's reference walks; this
    // reference's signup probe was platform-rejected, so the banner was
    // never rendered here — Reasoned, re-attributed session 8, F8-6).
    // Session-11 (F11-4): the gate keys on the STORED HASH, not the code's
    // TTL — an expired code no longer downgrades the account to
    // no-verification-required (the old isVerificationPending gate let a
    // never-verified user sign in by waiting out the 15 minutes). The
    // login card re-enters the funnel on this 403 (swaps to the verify
    // view); the resend re-mints for any unverified account. Pre-flow
    // rows (null hash, the seeded demo account) pass untouched.
    if (unverifiedAccount(user.verificationCodeHash)) {
      return fail("VERIFICATION_REQUIRED", verificationRequiredMessage(), 403);
    }

    // Session-163 (the digma S67-A port): the mint carries the live row's
    // tokenVersion — a later reset increments it and this cookie dies at
    // the getSessionUser comparison.
    await setSessionCookie(user.id, user.tokenVersion);
    return ok({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarColor: user.avatarColor,
      role: user.role,
    });
  } catch {
    return ERR.INTERNAL();
  }
}
