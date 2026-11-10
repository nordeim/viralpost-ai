// Zod schemas for the auth-family + contact API inputs.
//
// Pattern: per-route schemas, field-level messages, nothing reaches Prisma
// unvalidated (the zero-balance seam placement — a dedicated server-side
// validation module consumed by every route). Every message string is the
// pinned user-facing contract the unit + e2e suites assert.

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH, verificationIncompleteMessage } from "@/lib/verification";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces,
 * plus the 200-char ceiling the reset family has always owned — session-14
 * (S14-4) aligned the shared schema: a 201+ char password accepted at
 * signup (the 16KB body cap allowed it) could never be REPLACED at reset
 * (reset's own cap rejected it while the old password still verified).
 * Login's password field stays unbounded — login never rejects on length
 * (the tolerant posture for hashes minted before the ceiling).
 * Session-16 (S16-1): the { message } param owns the TYPE face — a
 * non-string password used to answer Zod's dev-facing "Invalid input:
 * expected string, received number" (live-confirmed at signup). */
export const passwordSchema = z
  .string({ message: "Password must be at least 8 characters" })
  .min(8, "Password must be at least 8 characters")
  .max(200, "Password must be reasonably sized");

export const loginSchema = z
  .object({
    // Session-21 (S21-18): the TOLERANT-email posture, documented — the
    // login/verify/resend family deliberately skips the format regex
    // (signup/forgot/contact enforce it): every downstream branch is
    // constant-shape (login → 401 INVALID_CREDENTIALS; verify → the
    // invalid-code 400; resend → the no-op 200), so a malformed email
    // leaks nothing and matches the password's own unbounded posture.
    email: emailField("Email and password are required"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The route's composite required-check, preserved verbatim: EITHER
    // field missing answers the ONE message (the per-field ladder would
    // change a pinned string).
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  // Session-16 (S16-1): the { message } param owns the TYPE face — a
  // non-string code used to answer Zod's dev-facing "Invalid input:
  // expected string, received number" (live-confirmed). The incomplete
  // message is the view's own pinned vocabulary (login-card re-uses
  // verificationIncompleteMessage() for the same hint).
  code: z
    .string({ message: verificationIncompleteMessage() })
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  // Session-16 (S16-1): the { message } param owns the TYPE face — a
  // missing or non-string new_password used to answer Zod's dev-facing
  // "Invalid input: expected string, received undefined"
  // (live-confirmed).
  new_password: z
    .string({ message: "Password must be at least 8 characters long" })
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

/** The contact form (POST /api/contact). */
export const contactSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be reasonably sized"),
  email: emailFormat,
  message: z
    .string({ message: "Message is required" })
    .trim()
    .min(1, "Message is required")
    .max(4000, "Message must be reasonably sized"),
});
