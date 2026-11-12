import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth";
import { verifySchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { timingEqualizerHash } from "@/lib/password";
import {
  VERIFICATION_MAX_ATTEMPTS,
  isVerificationLockedOut,
  isVerificationPending,
  verificationInvalidMessage,
  verificationLockoutMessage,
  verificationRemainingMessage,
} from "@/lib/verification";
import { verifyVerificationCode } from "@/lib/verification-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/verify — session-21 (S21-P5), the verify-email view's
 * submit. The banner ladder ("Please enter all 6 digits" → "Invalid
 * verification code. N attempts remaining." (4…1) → "Too many failed
 * attempts. Please request a new verification code." — the 5th failure
 * and every one after; the button stays enabled, the message repeats)
 * rides the base44 platform's shared auth component: inherited from the
 * scaffold family's reference walks, not census-verified against THIS
 * reference (the dossier's signup probe was platform-rejected — session 8,
 * F8-3; Confidence: Reasoned, platform-family). A correct code signs the
 * account in and redirects to the dashboard.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`verify:${clientKey(req)}`, 20, 15 * 60 * 1000);
  // Session-38 (S38-P6 — donor-ledger numbers, the NEO-CRM family): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (pre-gate + email/code schema in one
  // call — the digit-stripping and the 6-length check ride the schema).
  const parsed = await parseBody(req, verifySchema);
  if (!parsed.ok) return parsed.response;
  const { email, code } = parsed.data;

  // Session-37 (S37-P1 — donor-ledger numbers, the NEO-CRM family): the whole DB tail joins the envelope — the
  // findUnique and both user.update failures stay inside { ok, error }.
  // The 4xx returns inside the try bypass the catch by construction
  // (returns are not throws); setSessionCookie is cookie-signing only
  // (no DB) and rides the try for simplicity.
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.verificationCodeHash || !isVerificationPending(user.verificationExpiresAt)) {
      // No pending code: behave like the reference's generic failure (the
      // banner family) without leaking whether the account exists.
      // Session-12 (F12-5): the invalid copy, not the lockout copy —
      // this branch serves expired codes and never-verified accounts
      // that have failed ZERO times; "Too many failed attempts" told
      // them they had failed five.
      // Session-14 (S14-2): the miss branch burns one scrypt against the
      // memoized equalizer hash — the pending-code compare below costs
      // a scrypt, so an immediate miss answer was a timing oracle on
      // the verification state (login's S72-C shape, the same cure).
      verifyVerificationCode(code, timingEqualizerHash());
      return fail("VERIFICATION_INVALID", verificationInvalidMessage(), 400);
    }

    // The lockout check rides BEFORE the code compare (the reference's
    // ladder: five wrong submissions, then the lockout message repeats).
    // Session-19 (S19-5): the equalizer burn precedes the return — the
    // miss and wrong-code branches each burn one scrypt, and the
    // locked-out arm used to answer ~100ms faster (a timing oracle on
    // "exists AND unverified AND >= 5 failures"). Every branch out of
    // this route now pays the same scrypt tax.
    // Session-20 (S20-8, the resend S19-18 precedent): the scrypt tax is
    // the equalized FACE — the wrong-code branch additionally pays one
    // atomic update (fsync-scale, ~5-10ms) that the miss and lockout
    // branches don't, so "exists + pending + unlocked" stays
    // distinguishable from "unknown/locked" by latency. Documented
    // residual, same class: the route is 20/15min/IP rate-limited and
    // the message/status envelopes are identical; a burn-side write
    // would invert the fsync-scale signal the consume depends on.
    if (isVerificationLockedOut(user.verificationAttempts)) {
      verifyVerificationCode(code, timingEqualizerHash());
      return fail("VERIFICATION_LOCKED", verificationLockoutMessage(), 429);
    }

    if (!verifyVerificationCode(code, user.verificationCodeHash)) {
      // Session-67 (N-67c): the counter increments ATOMICALLY server-side
      // (the DB's own increment) — the read-modify-write form could let
      // concurrent submissions overshoot the 5-wrong lockout against one
      // code. Prisma's update returns the post-increment record, which
      // carries the value the lockout/remaining ladder reads.
      const { verificationAttempts: attempts } = await db.user.update({
        where: { id: user.id },
        data: { verificationAttempts: { increment: 1 } },
      });
      if (isVerificationLockedOut(attempts)) {
        return fail("VERIFICATION_LOCKED", verificationLockoutMessage(), 429);
      }
      const remaining = VERIFICATION_MAX_ATTEMPTS - attempts;
      return fail("VERIFICATION_INVALID", verificationRemainingMessage(remaining), 400);
    }

    // Success: clear the code, sign the account in (the reference's
    // post-verification funnel completes into the session).
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
      },
    });
    // Session-163 (the digma S67-A port): the mint carries the live
    // row's tokenVersion.
    await setSessionCookie(user.id, user.tokenVersion);
    return ok({ id: user.id, email: user.email, verified: true });
  } catch (error) {
    // Session-13 (S13-5): a row vanishing between the findUnique and
    // either update (the unreachable-via-API class — no user-delete
    // surface exists) throws P2025; the forgot-password route's own
    // known-error doctrine maps it to the SAME 400 the no-pending-code
    // branch serves, not a raw 500.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return fail("VERIFICATION_INVALID", verificationInvalidMessage(), 400);
    }
    return ERR.INTERNAL();
  }
}
