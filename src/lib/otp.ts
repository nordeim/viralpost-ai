/**
 * The OTP input's paste semantics — session-12 (F12-6).
 *
 * The login card's six single-digit boxes accept a pasted code by
 * distributing the sanitized digits across the boxes from the focused
 * index (the F11-15 affordance). The defect this seam cures: pasting
 * into a box that ALREADY holds a digit produced a shifted,
 * last-digit-dropping distribution (raw = <existing><pasted>, so the
 * stale digit landed at the focus index and everything shifted right).
 *
 * The trailing-window rule: take the LAST `codeLength` digits of the
 * sanitized input. Traced against every input shape it is strictly
 * better or equal to the naive form:
 *   - a clean paste into empty boxes passes through unchanged;
 *   - a paste over a filled box carries the PASTED code (the stale
 *     leading digit falls outside the window);
 *   - a short paste keeps every digit (the window never truncates
 *     below the input length);
 *   - an over-long paste keeps the tail (what the clipboard ended
 *     with — the only digits the user could have intended).
 *
 * Pure string → string; the six-box focus/wiring stays in the card.
 */

/** Sanitize a raw input value and keep the trailing `codeLength` digits. */
export function otpDigitsAfterPaste(raw: string, codeLength: number): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= codeLength) return digits;
  return digits.slice(-codeLength);
}
