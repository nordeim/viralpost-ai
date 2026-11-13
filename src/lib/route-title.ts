// The unknown-route title seam — the reference's own scheme,
// live-verified 2026-11-09 (docs/plans/2026-11-09-session2-parity-audit-
// remediation.md §2): unknown routes title as
//
//   <StartCase(last path segment)> | ViralPost AI
//
// with a BARE "ViralPost AI" when the derivation is empty. The reference
// is an SPA — its shell ships a generic <title> and client JS sets the
// real one after the router resolves the unknown route. OUR mechanism is
// server-side: the catch-all segment LAYOUT's generateMetadata derives
// the title around the not-found boundary (ADR-006 — Next discards a
// PAGE's metadata when the page calls notFound(), but layouts render
// around it; the true-404 HTTP status superset rides the same response).
// NotFoundBody's client-side usePathname mirrors only the MESSAGE
// interpolation — it sets no title (the stale claim that it did was
// corrected session-40, S40-7; both files now describe the one
// mechanism the same way).
//
// (Session-45, S45-11 — the drift record: the reference's derivation
// NO LONGER REPRODUCES. Four probed unknown routes (/NoSuchRoute,
// /Dashboard, /Whatever, /page2) all shipped the BARE "ViralPost AI"
// title at session-45's walk — SSR HTML title and settled SPA title
// alike — while the known-route family still holds (/Tool →
// "Tool | ViralPost AI" both sides). The first reference-side drift
// since session-23's hamburger-aria flip; the S23-1 flip-flop doctrine
// governs: ours KEEPS the derived form — test-pinned (13 unit arms),
// ADR-006, SEO-meaningful — as the DOCUMENTED SUPERSET, and the drift
// is recorded (the Deviations Ledger row; docs/reference-
// investigation.md §3.7). Never chase a reference deploy that removes
// a superset.)
//
// The word rule is NOT lodash startCase — the reference's live behavior
// keeps digits inside words (/page2 -> "Page2", /12ft -> "12ft",
// /a1b2 -> "A1b2"):
//   1. the LAST non-empty path segment ("/a/b/c" -> "c")
//   2. split on non-alphanumeric runs (hyphen/underscore/space, collapsing)
//   3. split on camelCase transitions: [a-z0-9][A-Z] boundaries, and an
//      uppercase run keeps its final letter with the following lowercase
//      run ("XMLHttpRequest" -> "XML Http Request")
//   4. upperFirst each word (leading digits stay; all-caps words stay)

const SEPARATOR = " | ViralPost AI";
const BARE_TITLE = "ViralPost AI";

/** The last non-empty path segment ("/a/b/c" -> "c"; "/nested/path/" -> "path"). */
function lastSegment(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

/**
 * Split camelCase words: lower-or-digit followed by upper starts a new
 * word; an uppercase run keeps its final letter with a following lowercase
 * run (XMLHttp -> "XML Http"). Non-alphanumeric runs collapse into one
 * boundary. Digits never split a word (the reference's live rule).
 */
function splitWords(segment: string): string[] {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

function upperFirst(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** The derived document title for an unmatched route. */
export function unknownRouteTitle(pathname: string): string {
  const pretty = splitWords(lastSegment(pathname))
    .map(upperFirst)
    .join(" ");
  return pretty ? `${pretty}${SEPARATOR}` : BARE_TITLE;
}
