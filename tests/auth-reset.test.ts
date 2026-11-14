import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-163 (WP-3 — the digma reset-flow port): the route-contract pins
// for the two NEW auth endpoints. House convention (the s67 auth-contract
// precedent): source-contract pins read COMMENT-STRIPPED sources — a
// literal pinned by a record comment alone is a vacuous pin. The surfaces:
// - forgot-password: the no-enumeration 200 (same body known/unknown), the
//   randomBytes(32) token, the 60-min TTL, the P2025-swallow, the
//   P2024/P2028→503 family, the VIRALPOST_DISABLE_IN_APP_RESET knob.
// - reset-password: the token-FIRST ordering, the atomic conditional
//   updateMany consumption (token + live expiry in the WHERE, count===0 →
//   the invalid-token 400), the tokenVersion increment (the eviction), the
//   8..200 password window, the P2024/P2028→503 family.
// Lineage note (session-21, S21-12): the "session-163, digma S67-A/S76-A/
// S124-A" citations are donor-ledger numbers (the template family);
// this repo's own sessions are docs/session_1..53.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

// Session-48 (S48-1): the hardened form — line pass first, block
// opener anchored (the S47-10 idiom; the one-idiom doctrine, the
// family's only shape).
function stripComments(src: string) {
  return src
    .replace(/\/\/[^\n]*/g, "")
    .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
}

const forgotRoute = () => stripComments(read("src/app/api/auth/forgot-password/route.ts") ?? "");
const resetRoute = () => stripComments(read("src/app/api/auth/reset-password/route.ts") ?? "");

describe("forgot-password route contract (session-163, digma S46/S64/S66/S124)", () => {
  it("exists", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "src/app/api/auth/forgot-password/route.ts"))).toBe(true);
  });

  it("rate-limits on its own forgot: bucket (10/15min, the auth family's posture)", () => {
    const src = forgotRoute();
    expect(src).toContain('rateLimit(`forgot:${clientKey(req)}`, 10, 15 * 60 * 1000)');
  });

  it("parses through the Zod seam (parseBody composes the N-67d declared-size pre-gate)", () => {
    const src = forgotRoute();
    expect(src).toContain("await parseBody(req, forgotPasswordSchema)");
  });

  it("carries the no-enumeration 200 message verbatim (known and unknown emails alike)", () => {
    const src = forgotRoute();
    expect(src).toContain(
      '"If an account exists with this email, you will receive a password reset link."',
    );
  });

  it("mints a 32-byte crypto-random token with a 60-minute TTL", () => {
    const src = forgotRoute();
    expect(src).toContain("randomBytes(32).toString");
    expect(src).toContain("60 * 60 * 1000");
  });

  it("stores the token HASHED at rest (session-164 — the skill §12 compliance; the raw token lives only in the delivery URL)", () => {
    const src = forgotRoute();
    expect(src).toContain("resetToken: hashResetToken(token)");
    expect(src).not.toContain("resetToken: token,");
  });

  it("gates the in-app resetUrl delivery behind VIRALPOST_DISABLE_IN_APP_RESET", () => {
    const src = forgotRoute();
    expect(src).toContain('process.env.VIRALPOST_DISABLE_IN_APP_RESET !== "1"');
  });

  it("renders the reset URL RELATIVE (the standalone-deploy cookie contract)", () => {
    const src = forgotRoute();
    expect(src).toContain("`/reset-password?token=${token}`");
  });

  it("swallows P2025 to the no-enumeration 200 and surfaces the transient family as 503", () => {
    // Session-37 (S37-2): the P2024/P2028 literals moved to
    // src/lib/api.ts's classifier (owned by the behavioral spec in
    // api-robustness) — the routes call the shared helper; this pin
    // follows the code.
    const src = forgotRoute();
    expect(src).toContain('"P2025"');
    expect(src).toContain("isTransientDbFailure");
    expect(src).toContain("TRANSIENT_DB_MESSAGE");
    expect(src).toContain("503");
  });
});

describe("reset-password route contract (session-163, digma S67-A/S76-A/S124-A)", () => {
  it("exists", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "src/app/api/auth/reset-password/route.ts"))).toBe(true);
  });

  it("rate-limits on its own reset: bucket (10/15min)", () => {
    const src = resetRoute();
    expect(src).toContain('rateLimit(`reset:${clientKey(req)}`, 10, 15 * 60 * 1000)');
  });

  it("parses through the Zod seam (parseBody composes the declared-size pre-gate)", () => {
    expect(resetRoute()).toContain("await parseBody(req, resetPasswordSchema)");
  });

  it("validates the token BEFORE the password (the schema's field order carries digma's measured ordering)", () => {
    const schemaSrc = stripComments(read("src/lib/schemas.ts") ?? "");
    const tokenIndex = schemaSrc.indexOf("reset_token");
    const passwordIndex = schemaSrc.indexOf("new_password");
    expect(tokenIndex).toBeGreaterThan(-1);
    expect(passwordIndex).toBeGreaterThan(tokenIndex);
    // And the route's DB-level token-alive check precedes the hash write
    // (the call site, not the import). Session-21 (S21-19): findUnique
    // since the @unique index landed — a -1 indexOf would pass vacuously,
    // so the anchor follows the live call.
    const routeSrc = resetRoute();
    expect(routeSrc.indexOf("findUnique")).toBeGreaterThan(-1);
    expect(routeSrc.indexOf("findUnique")).toBeLessThan(routeSrc.indexOf("passwordHash: hashPassword"));
  });

  it("consumes the token ATOMICALLY: updateMany with the HASHED token + live expiry in the WHERE", () => {
    const src = resetRoute();
    expect(src).toContain("updateMany");
    // Session-21 (S21-19): the hash is computed ONCE (tokenHash) and the
    // WHERE carries it — the atomic contract unchanged, the double-hash
    // retired.
    expect(src).toMatch(/where:\s*\{\s*id: user\.id,\s*resetToken: tokenHash,[\s\S]*?resetTokenExpiresAt:\s*\{\s*gt:\s*new Date\(\)\s*\}/);
  });

  it("looks the row up by the HASHED token (a DB read compromise never mints live reset URLs — session-164; findUnique on the S20-2 index since session-21, S21-19)", () => {
    const src = resetRoute();
    expect(src).toContain("findUnique({ where: { resetToken: tokenHash } })");
  });

  it("answers the invalid-token 400 when the conditional write lands count 0 (the racing replay)", () => {
    const src = resetRoute();
    expect(src).toContain("result.count === 0");
    expect(src).toContain('"Invalid or expired reset token"');
  });

  // Session-36 (S36-6a): the bespoke envelope CODE pinned — digma's
  // measured contract (S46/S124's own wire), not this repo's ERR family
  // default. No consumer keys on the code today (the message carries the
  // UX), but the wire is part of the ported contract; a future
  // normalization to BAD_REQUEST must be a deliberate, documented change.
  it('pins the invalid-token envelope code "VALIDATION" (the digma-measured wire — not the ERR.BAD_REQUEST family default)', () => {
    const src = resetRoute();
    expect(src).toContain('fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400)');
    // Both faces of the dead-token 400 (the pre-write lookup miss and
    // the conditional-write count 0) ride the same code + message.
    expect(src.match(/fail\("VALIDATION"/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });

  it("increments tokenVersion on reset (the eviction — every pre-reset cookie dies)", () => {
    const src = resetRoute();
    expect(src).toContain("tokenVersion: { increment: 1 }");
  });

  it("clears the consumed token (single-use — a replay answers the invalid-token 400)", () => {
    const src = resetRoute();
    expect(src).toContain("resetToken: null");
    expect(src).toContain("resetTokenExpiresAt: null");
  });

  it("surfaces the transient family as the 503s (the hoisted classifier, S37-2)", () => {
    // Session-37 (S37-2): pin-follows-the-code — the literal codes live
    // in src/lib/api.ts now; the route carries the classifier call.
    const src = resetRoute();
    expect(src).toContain("isTransientDbFailure");
    expect(src).toContain("TRANSIENT_DB_MESSAGE");
    expect(src).toContain("503");
  });
});

describe("the session eviction wiring (session-163, digma S67-A)", () => {
  it("getSessionUser compares the live row's tokenVersion against the token's v", () => {
    const src = stripComments(read("src/lib/auth.ts") ?? "");
    expect(src).toContain("tokenVersion");
  });

  it("the schema carries the three new User columns", () => {
    const schema = read("prisma/schema.prisma") ?? "";
    expect(schema).toContain("tokenVersion");
    expect(schema).toContain("resetToken");
    expect(schema).toContain("resetTokenExpiresAt");
  });

  // Session-20 (S20-2): the reset funnel's two token lookups (the
  // findFirst pre-read + the atomic updateMany consume) were the schema's
  // only unindexed lookup path — full-table scans that degrade linearly
  // as a self-hosted deployment grows. The @unique also structurally
  // pins the one-live-token-per-row invariant (SQLite unique indexes
  // treat NULLs as distinct, so the "no reset pending" rows coexist).
  it("the schema indexes resetToken (@unique — the reset lookups ride it, session-20)", () => {
    const schema = read("prisma/schema.prisma") ?? "";
    expect(schema).toContain("resetToken           String? @unique");
  });

  it("the schema comment documents the hashed-at-rest storage (session-164)", () => {
    const schema = read("prisma/schema.prisma") ?? "";
    expect(schema).toContain("SHA-256");
    expect(schema).toContain("hashed");
  });

  it("the seed's user upserts CLEAR the reset funnel (a stale pending token never survives a re-seed — session-164)", () => {
    const seed = stripComments(read("prisma/seed.ts") ?? "");
    // every update block carries the null-clearing pair, the same posture
    // as the verification fields
    const updateBlocks = seed.match(/update:\s*\{[\s\S]*?\},/g) ?? [];
    expect(updateBlocks.length).toBeGreaterThanOrEqual(1);
    for (const block of updateBlocks) {
      expect(block).toContain("resetToken: null");
      expect(block).toContain("resetTokenExpiresAt: null");
    }
  });
});

describe("the login timing equalizer wiring (session-163, digma S72-C)", () => {
  it("the login route burns the equalizer scrypt on the unknown-email miss branch", () => {
    const src = stripComments(read("src/app/api/auth/login/route.ts") ?? "");
    expect(src).toContain("timingEqualizerHash");
    expect(src).toContain("verifyPassword(password, timingEqualizerHash())");
  });

  it("the 401 envelope stays byte-identical (INVALID_CREDENTIALS, 'Invalid email or password')", () => {
    const src = stripComments(read("src/app/api/auth/login/route.ts") ?? "");
    expect(src).toContain('"INVALID_CREDENTIALS"');
    expect(src).toContain('"Invalid email or password"');
  });
});
