import { randomBytes } from "node:crypto";
import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
import { forgotPasswordSchema } from "@/lib/schemas";
import { hashResetToken } from "@/lib/password";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/forgot-password — session-163 (the digma S46/S64/S66/
 * S124 port): the reset-request half of the password-reset funnel. The
 * login card's "Forgot password?" view had been CLIENT-SIDE THEATER since
 * session 11 (the reference app's own demo rendered the sent card from
 * pure client state — no network call fired); this endpoint gives the
 * flow its server half.
 *
 * The no-enumeration contract: the same 200 + message whether or not the
 * account exists (digma's RA-65 measured text). The token is a 32-byte
 * crypto-random hex with a 60-minute TTL. The SELF-HOSTED in-app delivery
 * (the digma ADR-014 family): the resetUrl rides along for existing
 * accounts so the demo flow works end-to-end without a mail transport —
 * VIRALPOST_DISABLE_IN_APP_RESET=1 nulls it for production (an email service
 * owns the delivery); the no-enumeration 200 and its message are
 * unchanged either way, and the client's sent card degrades gracefully
 * (it renders the link only when the field is a string).
 *
 * The URL is RELATIVE on purpose (digma's e2e trace caught the absolute
 * form breaking the standalone deploy): Next's standalone server rebuilds
 * request.url from its BIND address, so an absolute href yielded
 * http://0.0.0.0:3100 — a host Chrome refuses cookies on. A relative
 * href resolves against the page's own origin everywhere.
 */

/** The no-enumeration message (digma's RA-65 measured text — the same
 *  body for known and unknown emails alike). */
const NO_ENUMERATION_MESSAGE =
  "If an account exists with this email, you will receive a password reset link.";

/** The reset window: 60 minutes (digma's measured "invalid or has
 *  expired" semantics). */
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  const limit = rateLimit(`forgot:${clientKey(req)}`, 10, 15 * 60 * 1000);
  // Session-163 (a donor-ledger number — the digma family's Zod-parse
  // port): the family's sweep placement (denied requests sweep too).
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163 (as above — the donor-ledger number): the Zod parse seam
  // (pre-gate + schema in one call).
  const parsed = await parseBody(req, forgotPasswordSchema);
  if (!parsed.ok) return parsed.response;
  const email = parsed.data.email;

  // The no-enumeration contract: the same 200 + message whether or not the
  // account exists. The known-email branch performs randomBytes + a SQLite
  // user.update (with fsync) before answering while the unknown-email
  // branch returns immediately — the timing residual is accepted (digma's
  // S105-G documented-residual posture): (a) the delta is fsync-scale
  // (<=10ms on a local disk, under network jitter); (b) a naive scrypt
  // burn on the unknown branch would INVERT the signal — scryptSync costs
  // ~100ms and dwarfs the write, making unknown emails measurably SLOWER
  // instead; (c) signup's 400 openly enumerates by design (the
  // already-exists branch answers ERR.BAD_REQUEST — session-17, S17-1:
  // this comment used to say "409", the status signup never sends), so
  // this route is not the enumeration boundary; (d) the route is
  // rate-limited (10/IP/15min).
  const inAppResetEnabled = process.env.VIRALPOST_DISABLE_IN_APP_RESET !== "1";
  let resetUrl: string | null = null;
  // Session-9 (F9-7): the READ path classifies the transient-abort family
  // (P2024 pool timeout / P2028 transaction timeout) as the 503 envelope
  // — the same doctrine the update path below has carried since
  // session-163. A swallowed outage used to answer the no-enumeration 200
  // with resetUrl null (a server condition masquerading as an account
  // state); every OTHER read failure stays a null user (the
  // no-enumeration contract).
  let user: Awaited<ReturnType<typeof db.user.findUnique>> = null;
  try {
    user = await db.user.findUnique({ where: { email } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2024" || error.code === "P2028")
    ) {
      return fail("UNAVAILABLE", "The request took too long — the database timed out. Try again.", 503);
    }
    // A row-level read failure is an unknown email by response time —
    // the guard keeps the no-enumeration 200 and resetUrl stays null
    // (never deliver a link the store cannot honor).
    user = null;
  }
  if (user) {
    // Session-20 (S20-10): minted INSIDE the try — a CSPRNG entropy
    // failure is the logout route's "no realistic throw" class, but the
    // envelope is absolute: every await/crypto on the path maps to the
    // envelope, belt-and-braces.
    let token = "";
    try {
      token = randomBytes(32).toString("hex");
    } catch {
      return ERR.INTERNAL();
    }
    // A row vanishing mid-request (the unreachable-via-API class; no
    // user-delete endpoint exists) is an unknown email by response time —
    // the guard SWALLOWS to the no-enumeration 200 and the resetUrl stays
    // null (never deliver a link the store cannot honor — the token never
    // persisted). The transient-abort family (P2024 = pool-connection
    // timeout, P2028 = transaction timeout) surfaces honestly as a 503 —
    // a server condition, never an account state.
    // Session-164 (the skill §12 hashed-at-rest compliance): the row
    // stores the token's SHA-256 hex — the RAW token lives only in the
    // delivery URL below, so a read compromise of the database can
    // never mint live reset links (the verification-code family's own
    // hashed-storage posture, brought to its sibling).
    let stored = false;
    try {
      await db.user.update({
        where: { id: user.id },
        data: {
          resetToken: hashResetToken(token),
          resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
        },
      });
      stored = true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        stored = false;
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === "P2024" || error.code === "P2028")
      ) {
        return fail("UNAVAILABLE", "The request took too long — the database timed out. Try again.", 503);
      } else {
        // Session-9 (F9-7): the residual class answers the envelope — a
        // bare re-throw would surface as a raw non-JSON 500 (the envelope
        // is absolute).
        return ERR.INTERNAL();
      }
    }
    if (stored && inAppResetEnabled) {
      resetUrl = `/reset-password?token=${token}`;
    }
  }

  return ok({ message: NO_ENUMERATION_MESSAGE, resetUrl });
}
