/**
 * Layout-system contracts for ViralPost AI.
 *
 * LOGIN_LAYOUT and NOT_FOUND_LAYOUT are DOM-extracted from the live
 * reference app (verified 2026-11-09: the login card and the 404 share the
 * base44 design language — borderless glass card with gradient accent
 * strip, centered logo column, slate inputs; slate-50 centered 404 with a
 * font-light 404 display). Every string is the single, test-pinned source
 * the pages read (tests/login-views.test.ts pins both families — the
 * login card's structure and, since session-10, NOT_FOUND_LAYOUT's
 * class vocabulary).
 *
 * Token mapping: slate-50 → page wash, slate-200 → line, slate-500 →
 * muted, slate-900 → foreground/primary.
 */

/** The login card — borderless glass card with a gradient accent strip,
 *  centered logo/title column, white Google button and h-11 sm:h-12 slate
 *  inputs. */
export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4",
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40",
  logo: "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  subtitle: "text-slate-500 text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 text-[16px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm",
  googleIcon: "-ml-4 transition-transform duration-200",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-slate-200",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-slate-500",
  form: "w-full space-y-4 sm:space-y-5",
  fields: "space-y-3 sm:space-y-4",
  // Tailwind v4 note (the template's session-96 doctrine): v3's 6px
  // vertical-gap space-y step — margin-TOP on the following child;
  // session-44 (S44-8) re-spelled: the old "(the margin-BOTTOM form)"
  // parenthetical mislabeled v3 with v4's compilation — is
  // v4-FALSIFIED on the auth fields: v4's space-y puts margin-BOTTOM
  // on the PRECEDING child (the label), a non-replaced INLINE element
  // where vertical margins are IGNORED, silently losing the 6px gap.
  // `[&>*+*]:mt-1.5` expresses the reference's computed mechanism in
  // v4. The label STAYS INLINE like the reference's own 16px inline
  // box.
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500",
  // The auth inputs carry the stock text-base md:text-sm pair (16px <768,
  // 14px at desktop). Session-40 (S40-8, the comment-truth cure): the
  // focus ring is the S25-3 WCAG 1.4.11 superset — the reference's own
  // slate-400 ring computes ≈2.57:1 on the white card (under the 3:1
  // focus-indicator floor); ours rides slate-600 (≈7.5:1) — the border
  // goes slate-400, the ring slate-600 (the signup sibling's docblock
  // carried the accurate form; this comment had the pre-S25-3 spelling).
  // Session-41 (S41-8): the block moved to ITS anchor — the S40-8
  // re-spell landed between `input:` and `submit:` and read as the
  // submit button's docblock.
  input:
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 text-base md:text-sm sm:h-12",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm sm:h-12",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-slate-500 transition-colors hover:text-slate-700",
  footerLinkStrong: "font-medium text-slate-700",
} as const;

/** The custom 404 — centered on bg-slate-50 with a font-light "404"
 *  display heading, "Page Not Found", the quoted-pathname message and a
 *  white bordered Go Home pill that navigates to `/`. No app shell. */
export const NOT_FOUND_LAYOUT = {
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-300",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  pathSpan: "font-medium text-slate-700",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
