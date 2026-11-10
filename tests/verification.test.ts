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

  it("a stored hash means verification owed — regardless of the code's TTL state (the F11-4 cure: no expiry bypass)", async () => {
    // The old gate (isVerificationPending) flipped to false once the TTL
    // passed, letting the never-verified account sign in. The hash is
    // the durable marker: only a successful verify (or the resend's
    // fresh code) clears the owed state. The seam takes NO timestamp —
    // expiry is invisible to it BY DESIGN (session-12, F12-14: this was
    // two tests with identical assertions; the duplication proved
    // nothing the first didn't).
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

describe("session-12 (F12-5): the expired-code copy — invalid is not lockout", () => {
  it("verificationInvalidMessage() exists and carries the no-longer-valid copy (still account-enumeration-safe)", async () => {
    const { verificationInvalidMessage } = await verification();
    expect(verificationInvalidMessage()).toBe(
      "This verification code is no longer valid. Please request a new one.",
    );
  });

  it("the verify route's 400 VERIFICATION_INVALID branch answers the invalid copy — the lockout copy stays on the 429", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const src = readFileSync(
      join(import.meta.dirname, "..", "src/app/api/auth/verify/route.ts"),
      "utf8",
    );
    // F12-5: the no-pending-code branch (unknown email, no code, EXPIRED
    // TTL) used to reuse verificationLockoutMessage() — "Too many failed
    // attempts…" — misleading a user who never failed once. The branch
    // now answers the generic invalid copy; the actual lockout (the 429
    // after 5 wrong submissions) keeps the attempts copy.
    const invalid = src.match(/VERIFICATION_INVALID[\s\S]{0,200}/);
    expect(invalid, "the VERIFICATION_INVALID branch must exist").toBeTruthy();
    expect(invalid![0]).toContain("verificationInvalidMessage()");
    expect(invalid![0]).not.toContain("verificationLockoutMessage()");
    const locked = src.match(/VERIFICATION_LOCKED[\s\S]{0,200}/);
    expect(locked, "the VERIFICATION_LOCKED branch must exist").toBeTruthy();
    expect(locked![0]).toContain("verificationLockoutMessage()");
  });
});
