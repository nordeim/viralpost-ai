/**
 * The from_url resolver — session-13 (S13-4), extracted from
 * login-card.tsx (session-147 / F-147c2, walk37).
 *
 * WHY THIS EXISTS: the reference's auth wall lands guests on
 * /login?from_url=<absolute-url> and returns them to the target after a
 * successful sign-in. The param is UNTRUSTED query input — only a
 * SAME-ORIGIN URL navigates; foreign origins, the protocol-relative
 * bypass, and malformed values all fall back to the plain-login target
 * "/".
 *
 * THE PURE FORM (the house doctrine): the origin is a PARAMETER, not a
 * window.location read — the seam runs in node (tests/from-url.test.ts
 * owns the behavioral coverage), and the login card passes its own
 * window.location.origin at the call sites. Never router.push(<the raw
 * param>).
 */
export function resolveFromUrl(raw: string, origin: string): string {
  try {
    const u = new URL(raw, origin);
    if (u.origin !== origin) return "/";
    return `${u.pathname}${u.search}` || "/";
  } catch {
    return "/";
  }
}
