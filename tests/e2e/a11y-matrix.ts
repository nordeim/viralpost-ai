// The a11y battery's matrix — extracted (session-12, F12-1) so the
// docs-counts REALITY CENSUS can compute the spec's loop expansion from
// the SAME constants this spec consumes (pure data, zero imports — safe
// for the unit layer to import; never a *.test.ts file so vitest never
// picks it up as a suite).
//
// Expansion arithmetic (the census and the spec must stay in lockstep):
//   (SURFACES.length + 1 /* the 404 */) × WIDTHS.length   — the main describe
// + 1 /* the login card */ × WIDTHS.length                 — the logged-out describe
// = 12 tests from 3 source test() calls.

/** The public surfaces the battery walks (the four marketing routes). */
export const SURFACES = [
  { name: "landing (/)", path: "/" },
  { name: "tool (/Tool)", path: "/Tool" },
  { name: "pricing (/Pricing)", path: "/Pricing" },
  { name: "contact (/Contact)", path: "/Contact" },
] as const;

/** The two widths every surface is probed at (desktop + the 390px phone). */
export const WIDTHS = [1280, 390] as const;
