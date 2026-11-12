/**
 * The from_url resolver — session-13 (S13-4), extracted from
 * login-card.tsx (session-147 / F-147c2 / walk37 — donor-ledger
 * numbers, the NEO-CRM family).
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
    // Session-14 (S14-1): a same-origin url whose PATH starts with "//"
    // (http://host//evil.com) is the protocol-relative ESCAPE — the
    // origin check above passes (the url IS same-origin) but the
    // returned string "//evil.com" navigates CROSS-ORIGIN at the router
    // (live-verified pre-cure: the sign-in landed on https://evil.com).
    // Backslash paths normalize to "//" inside the URL parser and are
    // caught by the same arm; an INNER "//" ("/a//b") stays a plain
    // same-origin path. The leading-"/" belt-and-braces arm covers any
    // parser shape a future spec change could introduce.
    if (!u.pathname.startsWith("/") || u.pathname.startsWith("//")) return "/";
    return `${u.pathname}${u.search}` || "/";
  } catch {
    return "/";
  }
}
