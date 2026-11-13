import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-163 (WP-1 — the digma S70-D port): the PURE password/code crypto
// seam. hashPassword/verifyPassword previously lived in src/lib/auth.ts —
// whose transitive next/headers + Prisma imports made it un-importable from
// the bare-`PrismaClient` seed script, so prisma/seed.ts DUPLICATED the
// scrypt parameter set (16-byte salt, 64-byte key, `scrypt:salt:hash`): a
// change in one place silently broke demo login in the other. The seam is
// node:crypto ONLY — both consumers import it, and auth.ts re-exports for
// the routes' existing import surface. timingEqualizerHash (the digma
// S72-C login miss-branch equalizer) and generateVerificationCode (moved
// from verification-server.ts) join the seam.

import {
  generateVerifyCode,
  hashPassword,
  hashResetToken,
  timingEqualizerHash,
  verifyPassword,
} from "@/lib/password";

describe("the pure password seam (session-163, digma S70-D)", () => {
  it("round-trips a password in the pinned scrypt:salt:hash format", () => {
    const stored = hashPassword("Sup3rSecret!");
    expect(stored.startsWith("scrypt:")).toBe(true);
    expect(stored.split(":")).toHaveLength(3);
    expect(verifyPassword("Sup3rSecret!", stored)).toBe(true);
  });

  it("rejects a wrong password", () => {
    const stored = hashPassword("Sup3rSecret!");
    expect(verifyPassword("wrong", stored)).toBe(false);
  });

  it("produces unique salts for identical passwords", () => {
    expect(hashPassword("same")).not.toBe(hashPassword("same"));
  });

  it("rejects malformed stored hashes", () => {
    expect(verifyPassword("x", "not-a-hash")).toBe(false);
    expect(verifyPassword("x", "bcrypt:abc:def")).toBe(false);
    expect(verifyPassword("x", "scrypt:only-two")).toBe(false);
  });
});

describe("timingEqualizerHash (session-163, digma S72-C)", () => {
  it("returns a stable per-process value in the scrypt format", () => {
    const first = timingEqualizerHash();
    expect(first.startsWith("scrypt:")).toBe(true);
    // LAZY memoization: the second call answers the SAME value (never a
    // second cold scrypt burn).
    expect(timingEqualizerHash()).toBe(first);
  });

  it("verifies harmlessly (the burn target never matches a real password)", () => {
    const equalizer = timingEqualizerHash();
    // The burn contract: verifyPassword against the equalizer hash must be
    // callable and false for ordinary passwords (it is a REAL scrypt hash
    // of a throwaway constant — the miss branch burns the same work).
    expect(verifyPassword("anything", equalizer)).toBe(false);
  });
});

describe("generateVerifyCode at the pure seam (session-163)", () => {
  it("mints a 6-digit string (leading zeros allowed — digit strings, not numbers)", () => {
    for (let i = 0; i < 50; i += 1) {
      const code = generateVerifyCode();
      expect(code).toMatch(/^\d{6}$/);
    }
  });
});

describe("hashResetToken (session-164 — the skill §12 hashed-at-rest compliance)", () => {
  it("hashes a token deterministically into 64-char lowercase hex (SHA-256)", () => {
    const token = "a".repeat(64); // the randomBytes(32).toString("hex") form
    expect(hashResetToken(token)).toBe(hashResetToken(token));
    expect(hashResetToken(token)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("distinct tokens hash distinctly (the lookup key never collides across users)", () => {
    const a = hashResetToken("deadbeef");
    const b = hashResetToken("deadbeeg");
    expect(a).not.toBe(b);
  });

  it("is a FAST hash — createHash sha256, never scrypt (a 32-byte crypto-random token has 256-bit entropy; no brute-force surface; the code-vs-token asymmetry: the 6-digit CODE is user-chosen low entropy so it needs the slow hash, the token does not)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/password.ts"),
      "utf8",
    );
    const stripped = src
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
    expect(stripped).toContain('createHash("sha256")');
    // the scrypt family stays untouched by the addition
    expect(stripped).toContain("scryptSync");
  });
});

describe("the seam's purity contract (session-163)", () => {
  it("imports node:crypto ONLY — no next/*, no prisma, no db (the seed script's import surface)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/password.ts"),
      "utf8",
    );
    const stripped = src
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
    const imports = [...stripped.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
    expect(imports.length).toBeGreaterThan(0);
    for (const specifier of imports) {
      expect(specifier).toMatch(/^node:crypto$/);
    }
  });

  it("is re-exported from auth.ts (the routes' existing import surface survives)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/auth.ts"),
      "utf8",
    );
    expect(src).toContain('from "@/lib/password"');
  });
});

// Session-37 (S37-6e): the verification-server pass-throughs, pinned.
// The S36-6b claim ("utils.ts was the only src/lib module with zero test
// references") was loose — verification-server.ts also had zero test
// imports/reads (only the prose comment above names it). Closed for real
// here: the two wrappers are one-line routes to THIS seam, and the pin
// proves the routing behaviorally (a scrypt-format digest + a round-trip
// verify + the negative). GREEN on arrival (a coverage-gap pin, the
// S36-6a precedent) — the battery owns the defense (plant a wrong
// wrapper body → exactly this pin REDs).
describe("session-37 (S37-6e): the verification-server wrappers route to the seam", () => {
  it("hashVerificationCode/verifyVerificationCode pass through to the password seam's scrypt form", async () => {
    const vsm = await import("@/lib/verification-server");
    const stored = vsm.hashVerificationCode("123456");
    expect(stored.startsWith("scrypt:")).toBe(true);
    expect(stored.split(":")).toHaveLength(3);
    expect(vsm.verifyVerificationCode("123456", stored)).toBe(true);
    expect(vsm.verifyVerificationCode("000000", stored)).toBe(false);
  });
});
