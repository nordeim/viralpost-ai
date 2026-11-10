import { hashPassword, verifyPassword } from "@/lib/password";

/**
 * The server side of the email-verification machinery — session 21
 * (S21-P5). SERVER-ONLY by convention (the routes that consume it are
 * server routes). Session-163 (the digma S70-D port): the crypto trio +
 * the code generator moved to the PURE seam `src/lib/password.ts`
 * (node:crypto-only — importable from the seed script); this module
 * keeps the verification-shaped wrappers on the seam. (Session-12,
 * F12-12: the `generateVerifyCode` re-export "for any stragglers"
 * retired — zero importers; the routes import from the seam directly.)
 * The client-safe constants and message builders live in
 * `src/lib/verification.ts`.
 */

/** Hashes a code for storage (the scrypt format the auth layer already uses). */
export function hashVerificationCode(code: string): string {
  return hashPassword(code);
}

/**
 * Constant-time-ish code check routed through the auth layer's scrypt
 * verify (salted + timing-safe digest comparison under the hood).
 */
export function verifyVerificationCode(code: string, storedHash: string): boolean {
  return verifyPassword(code, storedHash);
}
