import { describe, expect, it } from "vitest";

// Session-11 (F11-3 + F11-4 — the verification-funnel closure): the
// enforceability seam. Until this round the login route gated ONLY on
// isVerificationPending() — once the 15-minute code TTL passed, an
// account that never verified signed in FREELY (email verification was
// advisory, not enforceable), and the return-visitor had no path back to
// the verify view (the 403 rendered a banner on the signin form; the
// signup route answers "already exists"; resend was wired only inside
// the verify view — the only escape was waiting out the TTL, which the
// advisory gate then let bypass verification entirely).
//
// The closure, one seam: unverifiedAccount() keys on the STORED HASH —
// the account owes verification until a successful verify clears it
// (the verify route nulls verificationCodeHash/ExpiresAt on success).
// The login route refuses while the hash is non-null REGARDLESS of
// expiry; the resend route re-mints for any unverified account (the
// resend IS the re-arm path for an expired code); the login card swaps
// to the verify view on the 403 (the email is known — the Resend
// affordance is one click away). The seeded demo account (null hash,
// predates the flow) is unaffected.

const verification = async () => import("@/lib/verification");

describe("session-11 (F11-4): the unverifiedAccount seam — verification is enforceable", () => {
  it("a null hash means no verification owed (the seeded demo accounts, pre-flow rows)", async () => {
    const { unverifiedAccount } = await verification();
    expect(unverifiedAccount(null)).toBe(false);
    expect(unverifiedAccount(undefined)).toBe(false);
    expect(unverifiedAccount("")).toBe(false);
  });

  it("a stored hash means verification owed — code still within its TTL", async () => {
    const { unverifiedAccount } = await verification();
    expect(unverifiedAccount("scrypt$mock-hash")).toBe(true);
  });

  it("a stored hash means verification owed — EVEN AFTER the code expired (the F11-4 cure: no TTL bypass)", async () => {
    // The old gate (isVerificationPending) flipped to false once the TTL
    // passed, letting the never-verified account sign in. The hash is
    // the durable marker: only a successful verify (or the resend's
    // fresh code) clears the owed state.
    const { unverifiedAccount } = await verification();
    expect(unverifiedAccount("scrypt$mock-hash")).toBe(true);
  });

  it("the seam is independent of the expiry timestamp (the route pairs it with isVerificationPending only for the code-validity check)", async () => {
    const { unverifiedAccount, isVerificationPending } = await verification();
    // The two predicates answer DIFFERENT questions and stay separate:
    // unverifiedAccount — does the ACCOUNT owe verification (hash)?
    // isVerificationPending — is the CURRENT code still live (expiry)?
    expect(unverifiedAccount(null)).toBe(false);
    expect(isVerificationPending(new Date(Date.now() + 60_000))).toBe(true);
    expect(isVerificationPending(new Date(Date.now() - 60_000))).toBe(false);
    expect(isVerificationPending(null)).toBe(false);
  });
});
