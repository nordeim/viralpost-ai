import { db } from "@/lib/db";
import { ok, fail, ERR, isTransientDbFailure, parseBody, TRANSIENT_DB_MESSAGE } from "@/lib/api";
import { hashPassword, hashResetToken } from "@/lib/password";
import { resetPasswordSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** The token-validation failure text (digma's RA-65 measured text — the
 *  reference's reset submit answers this for an invalid, expired, or
 *  already-consumed token alike). */
const INVALID_TOKEN_MESSAGE = "Invalid or expired reset token";

/**
 * POST /api/auth/reset-password — session-163 (the digma S67-A/S76-A/
 * S124-A port): the reset-submit half of the password-reset funnel.
 *
 * The token is validated BEFORE the password (digma's measured ordering —
 * an invalid token + a weak password still answers the TOKEN error). The
 * consumption is ATOMIC and SINGLE-USE (digma's S76-A form): the write is
 * a conditional updateMany whose WHERE carries the token AND the live
 * expiry, so a racing replay whose read interleaved before this commit
 * lands count 0 (the token is already consumed) and answers the
 * invalid-token 400 instead of overwriting the just-reset password on the
 * bare row id. The token CLEARS on success (a replay answers the
 * invalid-token 400) and NO session opens (the user signs in with the new
 * password on /login).
 *
 * The eviction (digma's S67-A): tokenVersion increments on the reset —
 * every cookie minted before this reset embeds the pre-increment version
 * and dies at the getSessionUser comparison. A stolen/observed session no
 * longer outlives the reset performed specifically to kill it.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`reset:${clientKey(req)}`, 10, 15 * 60 * 1000);
  // Session-163 (a donor-ledger number — the digma family's Zod-parse
  // port): the family's sweep placement (denied requests sweep too).
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163 (as above — the donor-ledger number): the Zod parse seam —
  // the schema's field order encodes the measured contract (token
  // presence/size FIRST, then the password
  // window), and the first issue answers.
  const parsed = await parseBody(req, resetPasswordSchema);
  if (!parsed.ok) return parsed.response;
  const { reset_token: resetToken, new_password: newPassword } = parsed.data;

  // The token check comes FIRST (the measured ordering). An unknown token
  // and a dead token answer identically (no oracle between them).
  // Session-164 (the skill §12 hashed-at-rest compliance): the row stores
  // the token's SHA-256 hex, so BOTH lookups key on the hash — the raw
  // token arrives from the URL and never touches the query.
  // Session-9 (F9-7): the READ path classifies the transient-abort family
  // (P2024/P2028) as the 503 envelope — an outage used to fall into the
  // invalid-token 400 below (a server condition masquerading as a client
  // error); every OTHER read failure stays a null user (the no-oracle
  // contract).
  // Session-21 (S21-19): findUnique on the S20-2 @unique index (computed
  // ONCE — the hash previously ran twice) — the one-live-token invariant
  // expressed structurally; behavior unchanged (the auth-reset suite is
  // the characterization).
  const tokenHash = hashResetToken(resetToken);
  let user: Awaited<ReturnType<typeof db.user.findUnique>> = null;
  try {
    user = await db.user.findUnique({ where: { resetToken: tokenHash } });
  } catch (error) {
    // Session-37 (S37-2): the classifier + the shared copy live in
    // @/lib/api now (the codes' one home) — the wire byte-identical.
    if (isTransientDbFailure(error)) {
      return fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503);
    }
    user = null;
  }
  const alive =
    user?.resetTokenExpiresAt instanceof Date && user.resetTokenExpiresAt.getTime() > Date.now();
  if (!user || !alive) {
    return fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400);
  }

  // The success path: the hash updates, the token CLEARS (single-use), the
  // version bumps (the eviction), and no session opens. The write is the
  // ATOMIC conditional form — the WHERE carries the token AND the live
  // expiry; a zero count means the token went stale between the pre-read
  // and this commit (the racing-replay shape) and answers the
  // invalid-token 400, never a success envelope.
  //
  // The P2025 arm is absent BY DESIGN: updateMany answers a vanished row
  // with count 0 — the invalid-token 400 below already covers it; the code
  // never throws P2025. The transient-abort family (P2024/P2028) surfaces
  // honestly as a 503 with the human copy, never a bare 500 past it (the
  // no-bare-throw discipline).
  try {
    const result = await db.user.updateMany({
      where: { id: user.id, resetToken: tokenHash, resetTokenExpiresAt: { gt: new Date() } },
      data: {
        passwordHash: hashPassword(newPassword),
        resetToken: null,
        resetTokenExpiresAt: null,
        // The eviction: every pre-reset cookie dies at the getSessionUser
        // version comparison.
        tokenVersion: { increment: 1 },
      },
    });
    if (result.count === 0) {
      return fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400);
    }
  } catch (error) {
    // Session-37 (S37-2): the hoisted classifier (same codes, same 503
    // — the wire byte-identical).
    if (isTransientDbFailure(error)) {
      return fail("UNAVAILABLE", TRANSIENT_DB_MESSAGE, 503);
    }
    // Session-9 (F9-7): the residual class answers the envelope — the
    // route's own "never a bare 500 past it" discipline, now literal
    // (a bare re-throw surfaced as a raw non-JSON 500).
    return ERR.INTERNAL();
  }

  return ok({ message: "Password reset successfully" });
}
