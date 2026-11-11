// The a11y battery's matrix — extracted (session-12, F12-1) so the
// docs-counts REALITY CENSUS can compute the spec's loop expansion from
// the SAME constants this spec consumes (pure data, zero imports — safe
// for the unit layer to import; never a *.test.ts file so vitest never
// picks it up as a suite).
//
// Expansion arithmetic (the census and the spec must stay in lockstep):
//   (SURFACES.length + 1 /* the 404 */) × WIDTHS.length     — the main describe
// + LOGGED_OUT_SURFACES.length × WIDTHS.length              — the logged-out describe
// = 16 tests from 3 source test() calls.
//
// Session-22 (S22-9): LOGGED_OUT_SURFACES grew from the login card alone
// to the full logged-out form family — /signup and /reset-password were
// never axe-scanned while three docs claimed "every route at two
// widths"; the claim is true again (and the form surfaces are now under
// the battery).

/** The public surfaces the battery walks (the four marketing routes). */
export const SURFACES = [
  { name: "landing (/)", path: "/" },
  { name: "tool (/Tool)", path: "/Tool" },
  { name: "pricing (/Pricing)", path: "/Pricing" },
  { name: "contact (/Contact)", path: "/Contact" },
] as const;

/**
 * The logged-out auth surfaces (S22-9): the card family a fresh visitor
 * can reach — the login card, the signup card, and the reset-password
 * screen (its no-token state renders the invalid-link card face).
 */
export const LOGGED_OUT_SURFACES = [
  { name: "login (/login)", path: "/login" },
  { name: "signup (/signup)", path: "/signup" },
  { name: "reset-password (/reset-password)", path: "/reset-password" },
] as const;

/** The two widths every surface is probed at (desktop + the 390px phone). */
export const WIDTHS = [1280, 390] as const;
