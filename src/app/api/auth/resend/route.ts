import { db } from "@/lib/db";
import { ok, ERR, parseBody } from "@/lib/api";
import { resendSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { VERIFICATION_TTL_MS, unverifiedAccount, verificationResentMessage } from "@/lib/verification";
import { hashVerificationCode } from "@/lib/verification-server";
import { generateVerifyCode } from "@/lib/password";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/resend — session-21 (S21-P5), the verify-email view's
 * "Didn't receive the code? Resend". The info banner "New verification
 * code sent to your email" and the resend's attempts-ladder reset ride
 * the base44 platform's shared auth component (inherited from the
 * scaffold family's reference walks; this reference's signup probe was
 * platform-rejected, so the flow was never exercised here — Reasoned;
 * re-attributed session 8, F8-6). Like the signup route, the fresh code
 * is stored hashed and logged to the SERVER console — never shipped to
 * the client.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`resend:${clientKey(req)}`, 5, 15 * 60 * 1000);
  // Session-38 (S38-P6): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (pre-gate + the email contract).
  const parsed = await parseBody(req, resendSchema);
  if (!parsed.ok) return parsed.response;
  const { email } = parsed.data;

  // Session-37 (S37-P1): the auth family joins the envelope — the
  // findUnique/update failures stay inside { ok, error }.
  try {
    const user = await db.user.findUnique({ where: { email } });
    // Session-11 (F11-4): the no-op gate narrows to unknown-account or
    // already-verified — the old isVerificationPending requirement
    // dead-ended the expired-code user (a no-op "resent" with no fresh
    // code, while the login route's new hash gate refuses them). The
    // resend IS the re-arm path: any unverified account gets a fresh
    // code and a reset attempt counter.
    if (!user || !unverifiedAccount(user.verificationCodeHash)) {
      // Unknown account or nothing to resend: answer with the same info
      // banner (the reference's non-leaking posture) — a rate-limited no-op.
      return ok({ resent: true, message: verificationResentMessage() });
    }

    const code = generateVerifyCode();
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCodeHash: hashVerificationCode(code),
        verificationAttempts: 0,
        verificationExpiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    // Session-163 (the digma ADR-014 port): the in-app OTP delivery —
    // the fresh code rides the response for the demo workflow (and the
    // e2e resend funnel), VIRALPOST_DISABLE_IN_APP_OTP=1 gated.
    // Session-13 (S13-2): the console log rides the SAME gate — a
    // mail-transport deployment must not write OTPs to stdout.
    const inAppOtpEnabled = process.env.VIRALPOST_DISABLE_IN_APP_OTP !== "1";
    if (inAppOtpEnabled) {
      console.info(`[verification] code for ${email}: ${code} (expires in 15 minutes)`);
    }
    return ok({
      resent: true,
      message: verificationResentMessage(),
      verificationCode: inAppOtpEnabled ? code : null,
    });
  } catch {
    return ERR.INTERNAL();
  }
}
