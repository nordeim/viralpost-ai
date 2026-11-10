import { describe, expect, it } from "vitest";

// Session-12 (F12-6): the OTP paste distribution seam. Session-11's
// F11-15 made a pasted code distribute across the six boxes from the
// focused index — but pasting into a box that ALREADY holds a digit
// shifted everything right and dropped the last digit (raw =
// <existing><pasted> = 7 digits: the pre-existing digit landed at the
// focus index, the pasted code shifted +1, the final digit fell off
// the end). The cure: take the TRAILING code-length digits of the
// sanitized input — strictly better or equal in every traced case
// (a clean paste into empty boxes is unchanged; a paste over a filled
// box now carries the pasted code, not the stale digit + a shifted
// paste; a short paste keeps every digit).
//
// The seam is pure (string → string) so the six-box wiring in the
// login card stays thin; VERIFICATION_CODE_LENGTH (6) is the code-side
// contract, passed in by the caller so the seam stays generic.

import { otpDigitsAfterPaste } from "@/lib/otp";

describe("session-12 (F12-6): otpDigitsAfterPaste — the trailing-digits semantics", () => {
  it("a clean 6-digit paste passes through unchanged", () => {
    expect(otpDigitsAfterPaste("123456", 6)).toBe("123456");
  });

  it("non-digits are stripped before the trailing window (a pasted '  123 456 ' is the code)", () => {
    expect(otpDigitsAfterPaste("  123 456 ", 6)).toBe("123456");
  });

  it("a paste into a box that already held a digit keeps the PASTED code (7 raw digits → the trailing 6)", () => {
    // The F12-6 defect shape: the box held "9", the user pasted
    // "123456" → the input's raw value reads "9123456". The trailing
    // six are the paste.
    expect(otpDigitsAfterPaste("9123456", 6)).toBe("123456");
  });

  it("an over-long paste (8 digits) keeps the trailing window (the last 6 the user's clipboard ended with)", () => {
    expect(otpDigitsAfterPaste("90123456", 6)).toBe("123456");
  });

  it("a SHORT paste keeps every digit (a 4-digit fragment distributes from the focus index as before)", () => {
    expect(otpDigitsAfterPaste("1234", 6)).toBe("1234");
    expect(otpDigitsAfterPaste("9", 6)).toBe("9");
  });

  it("a paste shorter than the window over a filled box (2 raw digits) keeps both — same as the pre-cure behavior", () => {
    // Box held "9", user typed/pasted "2" → raw "92": the trailing
    // window is the whole value; the caller distributes both digits
    // forward (the F11-15 semantics, unchanged).
    expect(otpDigitsAfterPaste("92", 6)).toBe("92");
  });

  it("an all-non-digit paste sanitizes to the empty string (the caller's no-op path)", () => {
    expect(otpDigitsAfterPaste("  --  ", 6)).toBe("");
  });
});
