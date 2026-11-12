import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { ok, fail, ERR, isTransientDbFailure, parseBody, TRANSIENT_DB_MESSAGE } from "@/lib/api";
import { resendSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { VERIFICATION_TTL_MS, unverifiedAccount, verificationResentMessage } from "@/lib/verification";
import { hashVerificationCode } from "@/lib/verification-server";
import { generateVerifyCode } from "@/lib/password";

export const dynamic = "force-dynamic";

/** Session-14 (S14-2): the timing equalizer's input — a throwaway
 * constant, never a code, never user input. The no-op branch burns one
 * scrypt hash against it so response latency no longer distinguishes
 * known-unverified emails (the known branch burns hashVerificationCode
 * on the fresh code; the miss branch burns the same work class — the
 * login route's S72-C shape; unlike forgot-password's documented
 * residual, the known branch here ALREADY burns scrypt, so the burn
 * equalizes rather than inverts the signal). */
const RESEND_TIMING_EQUALIZER_INPUT = "viralpost-resend-timing-equalizer-constant";

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
  // Session-38 (S38-P6 — donor-ledger numbers, the NEO-CRM family): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h — donor-ledger numbers, the NEO-CRM family's own
  // limiter-envelope sessions): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163 (a donor-ledger number — the digma family's Zod-parse
  // port): the Zod parse seam (pre-gate + the email contract).
  const parsed = await parseBody(req, resendSchema);
  if (!parsed.ok) return parsed.response;
  const { email } = parsed.data;

  // Session-37 (S37-P1 — donor-ledger numbers, the NEO-CRM family): the auth family joins the envelope — the
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
      // Session-14 (S14-2): the branch burns one scrypt (the equalizer)
      // and ships the SAME response shape as the known branch — the
      // key's presence no longer leaks the verification state, and the
      // timing no longer distinguishes it either.
      // Session-19 (S19-18, the honest residual): the KNOWN branch below
      // additionally pays one SQLite write (fsync-scale, ~5-10ms) — the
      // exact class forgot-password documents as accepted (a scrypt burn
      // would invert the signal; the route is rate-limited at 5/15 min).
      // Recorded here so the equalizer's claim stays honest about its
      // own boundary.
      hashVerificationCode(RESEND_TIMING_EQUALIZER_INPUT);
      return ok({ resent: true, message: verificationResentMessage(), verificationCode: null });
    }

    const code = generateVerifyCode();
    // Session-40 (S40-3): the ACCEPTED RACE on this side — the
    // undocumented mirror of verify's S39-8 (session-39): if a
    // concurrent verify's success-clear commits between the
    // findUnique above and this unconditional update, the resend
    // re-writes a fresh verificationCodeHash onto a row that no longer
    // owes verification (the account flips back to
    // unverifiedAccount() once the surviving session's 7-day TTL
    // lapses; self-recoverable through the standard funnel, and the
    // response carried the fresh code in-app). Accepted for the same
    // reason S39-8 accepted the verify side: a conditional WHERE here
    // would drop a legitimate re-arm for an account whose code was
    // valid at read time — the same user did everything right.
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
      // Session-40 (S40-14): the TTL phrase is DERIVED from the constant
      // (src/lib/verification.ts) — the literal "15" was hand-coupled;
      // a future TTL edit would have left the operator-facing log lying.
      console.info(`[verification] code for ${email}: ${code} (expires in ${VERIFICATION_TTL_MS / 60000} minutes)`);
    }
    return ok({
      resent: true,
      message: verificationResentMessage(),
      verificationCode: inAppOtpEnabled ? code : null,
    });
  } catch (error) {
    // Session-37 (S37-2): the transient-abort family answers the shared
    // 503 (the reset funnel's F9-7 doctrine, hoisted) — a pool/transaction
    // timeout is not this route's 500.
    if (isTransientDbFailure(error)) {
      return fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503);
    }
    // Session-15 (S15-1): a row vanishing between the findUnique and the
    // re-mint (the unreachable-via-API class — no user-delete surface
    // exists) throws P2025; the sibling doctrine maps it to the SAME
    // no-op the unknown-account branch serves (verify's S13-5 arm →
    // 400; forgot-password's arm → stored=false), never a raw 500 for a
    // condition the branch contract promises as a rate-limited no-op.
    // The timing already matches the known branch — the scrypt burn
    // happened building the update data before the throw.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return ok({ resent: true, message: verificationResentMessage(), verificationCode: null });
    }
    return ERR.INTERNAL();
  }
}
