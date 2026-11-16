// The boot gate (session-170, WP-3 — the scandihaven instrumentation.ts
// boot-validation port, recast in the house pure-seam form).
//
// WHY THIS EXISTS: the s169 production secret gate is a RUNTIME seam —
// secret() throws at the FIRST SESSION OP. A misconfigured production
// boot (missing/short AUTH_SECRET) still boots, serves every static
// page, and only explodes when the first user signs in. The
// web-app-foundation §6.2 posture + the scandihaven parseServerEnv
// pattern prescribe fail-fast AT BOOT: the server refuses to start with
// the actionable message. src/instrumentation.ts wires this seam into
// Next's register() hook — the throw crashes the standalone boot before
// the first request (verified live this round: "Failed to prepare
// server Error: An error occurred while loading instrumentation hook").
//
// THE PURE FORM (the house doctrine): bootEnvCheck takes an env-shaped
// record — no process access — and returns { fatal, warnings }.
// applyBootEnvReport applies it (the injectable logger prints the
// warnings; the fatal throws — the [boot] message family mirroring
// auth.ts's secret() throw, so the operator sees one vocabulary).
//
// WARN-THROW DISCIPLINE (the scandihaven posture): only the
// forgeable-sessions case is fatal. The metadata-family misconfig
// (NEXT_PUBLIC_SITE_URL) and the VIRALPOST_* toggle family warn — a bad
// toggle must never take a working deployment down, and dev/test boot
// SOFT (the DX posture unchanged: the DEV fallback stays documented in
// auth.ts; NODE_ENV !== "production" never fatals).

// Session-47 (S47-2): the shadow seam below is the only fs-touching
// default in this module (the injectable-exists pattern — bootEnvCheck
// itself stays pure over the env record).
import { existsSync, readFileSync, statSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";
// Session-59 (S59-1): the one-home parse — the file-face arm's
// predicate and the runtime consumption share the runtime's OWN .env
// parser (the env-file.ts leaf db-path itself parses with), so the
// warning can never diverge from what the engine sees. Imported from
// the LEAF, not db-path: importing db-path here ballooned the
// instrumentation artifact's trace (the hygiene leg's scripts/
// exclude tripped — the S59-1b extraction note in env-file.ts).
import { parseEnvFile } from "./env-file";
// Session-68 (S68-4): the served-face leg split — siteUrl() is the
// face the served surfaces actually consume (build-time-inlined in the
// artifact; the live env in dev). The seam itself stays PURE: the
// caller injects the value, this module never reads process.env for it.
// (Aliased: the site-URL arm below binds a local `siteUrl` string —
// the runtime face — so the imported normalizer needs its own name.)
import { siteUrl as normalizeSiteUrl } from "./site";

/** The closed VIRALPOST_* knob set (the six-knob contract's 3 server knobs). */
export const KNOWN_VIRALPOST_VARS: ReadonlySet<string> = new Set([
  "VIRALPOST_PROXY_HOPS",
  "VIRALPOST_DISABLE_IN_APP_OTP",
  "VIRALPOST_DISABLE_IN_APP_RESET",
]);

/**
 * Session-40 (S40-1): the full six-knob contract's canonical names — the
 * case-variant scan's name set. The S39-13 arm matched only the
 * viralpost_/neo_ prefixes, so a case-variant spelling of the other
 * three knobs (auth_secret / database_url / next_public_site_url) was
 * invisible to every arm: the prefix scans never see them and the
 * exact-case readers read only the canonical spelling. The DATABASE_URL
 * face was the sharpest — zero signal in any mode: the seam silently
 * falls to the .env value while the operator believes they configured
 * the environment's knob. Consumed ONLY by the warn-only case-variant
 * arm below; the readers stay exact-case (a case-variant key never
 * reaches them — that is the gap the warning names).
 */
const SIX_KNOB_NAMES: readonly string[] = [
  "AUTH_SECRET",
  "DATABASE_URL",
  "NEXT_PUBLIC_SITE_URL",
  ...KNOWN_VIRALPOST_VARS,
];

/** The values the VIRALPOST_DISABLE_* kill-switches actually read ("1" = disable). */
const DISABLE_KNOB_VALUES = new Set(["", "1"]);

// Session-23 (S23-6): the in-app-delivery knob family — one named const,
// consumed by both the off-vocabulary arm and the production-unset arm
// (the literal was written out twice; a third knob joining the family
// had to be edited in four places, two unnamed).
const DISABLE_KNOBS = [
  "VIRALPOST_DISABLE_IN_APP_OTP",
  "VIRALPOST_DISABLE_IN_APP_RESET",
] as const;

export interface BootEnvReport {
  fatal: string | null;
  warnings: string[];
}

/** Session-68 (S68-4): the optional second face of the site-url arms.
 *
 * `servedSiteUrl` is what the metadata/sitemap/robots/manifest
 * surfaces actually ADVERTISE. The runtime env record's
 * NEXT_PUBLIC_SITE_URL is NOT that face in the built artifact —
 * Turbopack inlines NEXT_PUBLIC_* reads at build (compiled-chunk-
 * probed: site.ts's default-param literal survives, no env read does),
 * so the value the operator set at runtime is inert at serve time.
 * Injecting the served face lets the gate mirror the S62-2 leg-split
 * doctrine: warn on the DIVERGENCE between the faces (the actionable
 * truth) and stay silent when the served face is healthy and the
 * runtime face is merely unset (the node-booted-standalone family's
 * false alarm). The seam stays PURE — both faces are injected; the
 * one-arg call behaves exactly as before (every prior pin holds).
 * (Session-69, S69-10 — the servedIsHealthy invariant: the caller
 * contract is a BARE http(s) origin or undefined; the only live caller
 * passes siteUrl(), which returns exactly that shape. A future caller
 * must not pass a malformed non-loopback value — servedIsHealthy's
 * predicate conflates "non-loopback" with "healthy", and a malformed
 * served face would suppress the unset/loopback warning with no shape
 * warning of its own.) */
export interface BootEnvOptions {
  servedSiteUrl?: string;
}

// Session-73 (S73-2b, AUDIT-1 L-1): the DB-residue predicate's ONE
// home. The shape (the control-char class test plus the two
// startsWith quote-opener arms) was triplicated — the process-env arm,
// the file-residue arm, the inert-value seam's negated form, plus the
// arm's own control-char face classifier — three independent literals
// a future widening (the S73-1b class above) would edit at one site
// and silently diverge at the other two (the S29-2/S59-1 drift
// hazard). Both helpers below are the single homes: the control-char
// test carries the ONE such class literal in this file (the S73-2a
// census pins exactly that count — the spelling is deliberately not
// repeated in this comment), and the full residue predicate composes
// it with the quote-opener arms.
function dbUrlCarriesControlChar(value: string): boolean {
  // Session-75 (S75-3, AUDIT-1 A1-F4 — live-probed): the class admits
  // the INVISIBLE-WHITESPACE family alongside Cc — an INTERIOR NBSP
  // (\u00a0, the Zs paste artifact web/chat editors emit) or ZWSP
  // (\u200b, Cf) escaped the old control-only test, re-anchored into
  // the junk-named file under db/, and served a healthy-looking boot
  // with ZERO [boot] signal (the S57-1 genus, alive for this charset;
  // edge occurrences stay consumed by the callers' trim — the S69-4
  // doctrine). The block range \u2000-\u200f covers the en..hair
  // spaces + the ZWSP/directionality family; none is a legitimate
  // DATABASE_URL character.
  return /[\p{Cc}\u00a0\u2000-\u200f]/u.test(value);
}

// Session-75 (S75-2, AUDIT-1 A1-F2 — live-probed): the FACE QUARTET,
// single-homed. The quote-opener/control/newline/stray-quote faces
// were classified independently at the two printers (the process-env
// arm carried the !controlFace precedence gate; the file-face seam
// carried only !quoteFace) — the SAME value carrying both a control
// char and a quote printed the control-char story through one printer
// and the stray-quote story through the other (the two-homes drift
// the module's own S73-2b note warns about, realized one session
// later). Both printers (and the residue predicate below) now consume
// THIS classifier — the precedence is identical everywhere: a leading
// quote wins (the unclosed-quote story), a control char wins a
// combined control+quote value (the older pinned S60-1 precedence),
// and the stray-quote face requires a RELATIVE file: value with no
// control char riding.
function dbUrlFaceClassification(value: string): {
  quoteFace: boolean;
  controlFace: boolean;
  newlineFace: boolean;
  strayQuoteFace: boolean;
} {
  const quoteFace = value.startsWith('"') || value.startsWith("'");
  const controlFace = dbUrlCarriesControlChar(value);
  const newlineFace = controlFace && (value.includes("\n") || value.includes("\r"));
  // Session-75 (S74-2b + S75-3): a stray quote (or backtick) on a
  // RELATIVE file:-prefixed value. The one-keystroke mirrored typo
  // (file:../db/custom.db" — the quote the operator meant to open the
  // .env line with landed at the value's tail; the backtick rides the
  // neighboring key) parses clean through every loader, and the
  // engine ACCEPTS it: the live probe resolved it to a junk-named
  // custom.db" under db/, created it 0-byte, and SELECT 1 answered OK
  // — a healthy-looking boot against a table-less DB with ZERO [boot]
  // signal (the S57-1 junk-file genus, silent again). Session-75
  // (S75-3, AUDIT-1 A1-F3 — live-probed) scopes the arm to RELATIVE
  // values: the junk-file mechanism sentence is true for exactly that
  // scope (absolute refs pass through raw — no re-anchor, no junk
  // file under db/), and a LEGITIMATE quote inside an absolute path
  // (file:/opt/data/O'Brien.db) false-positived the arm with that
  // false mechanism. The scoping is file:-RELATIVE, never a blanket
  // includes: libpq's sanctioned quoted keyword containers
  // (password='my secret' host=x is a CLEAN value carrying quotes —
  // the keyword-form grammar) stay outside the residue seam's
  // routing, and !controlFace keeps the combined-value precedence.
  const strayQuoteFace =
    !controlFace &&
    value.startsWith("file:") &&
    !value.startsWith("file:/") &&
    (value.includes('"') || value.includes("'") || value.includes("`"));
  return { quoteFace, controlFace, newlineFace, strayQuoteFace };
}

function dbUrlCarriesResidue(value: string): boolean {
  const { quoteFace, controlFace, strayQuoteFace } = dbUrlFaceClassification(value);
  return controlFace || quoteFace || strayQuoteFace;
}

/**
 * Validate an env-shaped record against the six-knob contract.
 * PURE: same input, same report — tests drive every branch without a
 * process (tests/boot-env.test.ts).
 */
export function bootEnvCheck(
  env: Record<string, string | undefined>,
  options?: BootEnvOptions,
): BootEnvReport {
  const warnings: string[] = [];
  const isProduction = env.NODE_ENV === "production";

  // ---- AUTH_SECRET: the only FATAL (the forgeable-sessions case) ------
  const secret = env.AUTH_SECRET;
  if (isProduction && (!secret || secret.length < 16)) {
    return {
      fatal:
        "[boot] AUTH_SECRET is missing or shorter than 16 chars in production — sessions would be forgeable, so the server refuses to boot. Generate one with: openssl rand -hex 32 — then set AUTH_SECRET in the environment (or .env) and restart",
      warnings,
    };
  }

  // ---- NEXT_PUBLIC_SITE_URL: the advertised-origin family --------------
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  // Session-10 (F10-11): the SHAPE check runs in dev too — a value that
  // cannot parse as an absolute http(s) origin is always wrong (unlike
  // the unset/localhost family, a production-posture issue), and it used
  // to flow straight into `new URL()` in the root layout's metadataBase
  // and 500 every route. The site seam (src/lib/site.ts) now falls back
  // to the dev default on malformed input; this warning is the
  // operator's earliest, most actionable signal.
  if (siteUrl !== undefined && siteUrl !== "") {
    let malformed = false;
    let pathCarrying = false;
    let queryCarrying = false;
    try {
      const parsed = new URL(siteUrl.trim().replace(/\/+$/, ""));
      malformed = parsed.protocol !== "http:" && parsed.protocol !== "https:";
      // Session-22 (S22-19): the origin-only contract — a non-root
      // pathname parses fine yet used to flow into
      // metadataBase/canonical composition as a PREFIX (and the two
      // surfaces compose differently: URL path resolution vs plain
      // string concatenation for the twitter:url cards). Name the shape
      // at the earliest signal. (A bare origin parses with pathname
      // "/".) Session-28 (S28-1): the seam now takes the SAME
      // fallback as every non-bare shape — a path-carrying value never
      // reaches the surfaces (the warning text below states it).
      pathCarrying = !malformed && parsed.pathname !== "/";
      // Session-25 (S25-4): the non-bare-origin extension — a query (or
      // fragment, or userinfo) parses with pathname "/" so the check
      // above passed silently, yet the query rode unescaped into
      // /sitemap.xml's <loc> values (raw & — invalid XML) and every
      // og:url/canonical composition. The site seam falls back to the
      // default on the same shapes; this warning is the operator's
      // earliest signal.
      queryCarrying =
        !malformed && !pathCarrying &&
        (parsed.search !== "" || parsed.hash !== "" ||
          parsed.username !== "" || parsed.password !== "");
    } catch {
      malformed = true;
    }
    // Session-75 (S74-3b, AUDIT-1 L-1 — live-probed): the three shape
    // arms print through redactCredentials. The queryCarrying arm
    // explicitly covers credentials (parsed.username/password — an
    // operator's basic-auth paste), and the raw interpolation printed
    // the password VERBATIM into the boot log; the DATABASE_URL
    // printers have routed through the seam since S63-2 — these arms
    // were the family's one unredacted printer. The shape stays
    // visible (the redaction masks only credential-shaped material);
    // a bare origin carries nothing to mask — byte-identical output
    // for every healthy-value pin.
    const shownUrl = redactCredentials(siteUrl);
    if (malformed) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${shownUrl}" could not be parsed as an http(s) origin — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards fall back to http://localhost:3000 until it is fixed. Set the canonical origin (e.g. https://viralpost.example.com) BEFORE \`bun run build\` (it is inlined at build time).`,
      );
    }
    if (pathCarrying) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${shownUrl}" carries a path — the value must be the bare ORIGIN. The site seam falls back to http://localhost:3000 until it is fixed in dev (a built artifact keeps serving its build-inlined origin — the S68-4 leg split; the runtime value is inert either way) (S28-1 — a path prefix used to compose inconsistently across metadataBase/canonicals and the twitter:url cards); set e.g. https://viralpost.example.com with no trailing path.`,
      );
    }
    if (queryCarrying) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${shownUrl}" carries a query string (or fragment/credentials) — the value must be the bare ORIGIN. A query rides unescaped into /sitemap.xml's <loc> values (invalid XML) and composes broken og:url/canonical paths; the site seam falls back to http://localhost:3000 until it is fixed.`,
      );
    }
  }
  // Session-42 (S42-6): the parsed HOSTNAME, not the raw substring —
  // the old /localhost|127\.0\.0\.1/.test(siteUrl) form tripped on any
  // PUBLIC origin whose string merely contains the word
  // (mylocalhost.example.com, or a query carrying it — double-warned
  // after the shape arms above already fired). A false alarm erodes the
  // warning's authority (the S22-18 doctrine). Session-43 (S43-1):
  // the trailing dot is STRIPPED before the comparison —
  // new URL("http://localhost.:3000").hostname keeps the dot
  // ("localhost."), so the plain equality went SILENT on the FQDN
  // spelling the old substring form caught (the one true-positive
  // family the S42-6 cure lost; the revert battery on record). The
  // cure also GAINED a true positive the old case-sensitive regex
  // missed: URL parsing lowercases the host, so http://LOCALHOST:3000
  // now warns. A parse MISS (malformed origin) stays silent here —
  // the F10-11 shape arms own that class.
  // (Session-68, S68-4: extracted to the shared predicate — the served
  // face below runs the SAME loopback test the runtime face always
  // has; two faces, one law.)
  const isLoopbackOrigin = (value: string): boolean => {
    try {
      // Session-71 (S71-5b, AUDIT-1 L-3 — live-probed): the loopback
      // FAMILY, not the two exact spellings. The parsed hostname keeps
      // its IPv6 brackets ([::1]), and 127.0.0.2 is as loopback as
      // 127.0.0.1 (the 127/8 range) — both passed as healthy
      // production origins while servedIsHealthy counted them
      // healthy (no unset/loopback warning). The S42-6 hostname-parse
      // law, extended to the families it missed. The strip order:
      // trailing dot (the S43-1 FQDN face) then brackets (the IPv6
      // family), then the grammar: localhost, 127.0.0.1, ::1, the
      // IPv4-mapped family, and the 127/8 dotted quad. The mapped
      // family rides TWO spellings (probe-verified): the URL parser
      // NORMALIZES the dotted input [::ffff:127.0.0.1] into its
      // compressed hex form (::ffff:7f00:1), so the dotted prefix
      // alone never fires — the full-hextet form below is the mapped
      // 127/8 range exactly; the dotted spelling stays as belt-and-
      // braces (Session-73 respell: unreachable through the URL
      // parser — the hostname normalizes to compressed hex — kept for
      // robustness against future non-URL callers).
      // Session-72 (S72-3b, AUDIT-1 I-1 — live-probed): the grammar
      // TIGHTENS to the exact families. The loose prefixes
      // over-matched: `startsWith("::ffff:7f")` accepted
      // short-hextet forms (::ffff:7f0:1 is 7.240.0.1,
      // ::ffff:7f:1 is 0.127.0.1 — public addresses; only the FULL
      // 4-hex-digit first mapped hextet 7fXX is 127.x.x.x), and
      // `/^127\./` matched any 127.-prefixed DNS name
      // (127.0.0.1.example.com — a public name; hostname parse
      // cannot know DNS resolution, and the loopback warning was
      // never about it) — an identical runtime=served pair at those
      // origins fired the spurious "would advertise a localhost
      // origin" warning (probed: 1 warning where a genuinely-public
      // identical pair answers 0). The exact-hextet + dotted-quad
      // grammar below is the same size as a register entry and
      // eliminates the genus.
      const host = new URL(value)
        .hostname.replace(/\.$/, "")
        .replace(/^\[(.+)\]$/, "$1");
      return (
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "::1" ||
        /^::ffff:127\./.test(host) ||
        /^::ffff:7f[0-9a-f]{2}:/.test(host) ||
        /^127(?:\.\d{1,3}){3}$/.test(host)
      );
    } catch {
      return false;
    }
  };
  const siteUrlIsLoopback = siteUrl ? isLoopbackOrigin(siteUrl) : false;
  // Session-68 (S68-4): the served face, when the caller models it —
  // what the metadata/sitemap/robots/manifest surfaces actually
  // advertise (the artifact's build-inlined literal; dev's live env,
  // identical to the record face there). Undefined = the one-arg
  // posture (tests, or any caller that has not adopted the split) —
  // both new arms inert, the prior behavior exact.
  const servedSiteUrl = options?.servedSiteUrl;
  const servedIsHealthy =
    servedSiteUrl !== undefined &&
    servedSiteUrl !== "" &&
    !isLoopbackOrigin(servedSiteUrl);
  if (isProduction && (!siteUrl || siteUrlIsLoopback)) {
    // The false-alarm cure: the surfaces advertise the healthy
    // build-inlined origin and the runtime face is inert for this knob
    // (nothing reads it at serve time) — silence is correct (the
    // S22-18 doctrine; the S62-2 leg-split precedent). Only when the
    // served face is ALSO bad (or unmodeled) does the warning below
    // carry the truth it always has.
    if (!servedIsHealthy) {
      warnings.push(
        // Session-75 (S75-1, AUDIT-1 A1-F1 — live-probed): the
        // interpolation routes through redactCredentials — S74-3
        // covered the three SHAPE arms and missed this fourth member
        // of the family (the loopback arm interpolated the raw value,
        // so a credentialed loopback paste printed the password
        // VERBATIM while the shape arm beside it printed http://***@…
        // — both fire on the same value). A healthy loopback origin is
        // byte-identical under the pass (nothing to mask); a
        // credentialed one is exactly the "operator's basic-auth paste"
        // the queryCarrying arm exists for.
        `[boot] NEXT_PUBLIC_SITE_URL is ${
          siteUrl ? `"${redactCredentials(siteUrl)}"` : "unset"
        } in production — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards would advertise a localhost origin. Set the canonical public origin BEFORE \`bun run build\` (it is inlined at build time).`,
      );
    }
  }
  // Session-68 (S68-4): the divergence arm — the false-negative cure.
  // A runtime value the artifact does NOT serve used to pass silently
  // (set + non-loopback satisfied the old arm) while every served
  // OG/canonical/sitemap URL advertised the inlined face. The seam's
  // own normalizer compares both faces (trailing slashes strip the
  // same way on each side; a malformed runtime value stays owned by
  // the F10-11 shape arms above — this arm fires only on a
  // WELL-FORMED runtime origin that the served face disagrees with,
  // loopback spellings included: a leftover localhost in the runtime
  // env against a healthy served origin is the same inert-value genus
  // the S63-1 warning names for DATABASE_URL).
  // Session-69 (S69-3, AUDIT-1 F2 — live-probed): the WELL-FORMED
  // claim is now mechanically true. The old parseability-only gate
  // admitted path-carrying, query-carrying, and non-http(s) values —
  // each fired the divergence warning IN ADDITION to its shape
  // warning (two warnings, one root cause — the S22-18
  // warning-authority erosion). The bare-origin gate below requires
  // http(s), no path beyond "/", no search, no hash; every other
  // class stays owned by the shape arms (exactly one warning per bad
  // posture).
  // Session-70 (S70-3, AUDIT-1 L-2 — live-probed): USERINFO joins the
  // conjuncts — a credentialed origin (http://user:pass@example.com)
  // passed the four-field gate and double-warned (the S25-4 shape
  // warning plus this arm's), and normalizeSiteUrl's credentialed
  // fallback to the localhost default manufactured a spurious
  // mismatch even against an IDENTICAL served host. A credentialed
  // origin is not a well-formed bare origin; the shape arms own it.
  // siteUrl(x) is only ever called with a non-empty string here — the
  // default-param process.env read can never trigger inside the seam.
  const runtimeIsBareOrigin = (() => {
    if (!siteUrl) return false;
    try {
      // Session-71 (S71-4b, AUDIT-1 L-2 — live-probed): the spelling
      // folds BEFORE parsing — trim + a trailing strip, mirrored from
      // the normalizer's post-serialization fold (site.ts). The raw
      // getters disagreed with the comparison on edge
      // spellings: the empty ? delimiter drops from u.search (the
      // predicate passed) while toString() kept it (the comparison
      // mismatched an IDENTICAL served origin — the false positive),
      // and a // pathname failed this bare gate while both the shape
      // arms and the normalizer folded the spelling healthy (an
      // inert diverging value answering ZERO warnings — the false
      // negative). ONE normalizer, one law: the predicate, the shape
      // arms, and the comparison now agree on every spelling (the
      // S69-3 "exactly one warning per bad posture" law, held at
      // both edges — the S71 form's own [/?#] strip is the part
      // S72-2b below refined).
      // Session-72 (S72-2b, AUDIT-1 L-1 — live-probed): the pre-parse
      // fold narrows to SLASHES ONLY — the [/?#] form was over-eager:
      // it erased the OPENING delimiter of a non-empty fragment/query
      // (`https://x.com/#/?` — fragment "/?"), the predicate read
      // bare, and the divergence arm fired BESIDE the shape arm's own
      // warning (two warnings, one root cause — the S69-3 law broken
      // at the edge the S71 probes never covered). The empty `?`/`#`
      // delimiters need no pre-parse fold at all: the URL getters
      // ALREADY treat them as bare (u.search === "" && u.hash === ""
      // — the empty delimiter drops from the getters), so the
      // refined law is: slash-fold pre-parse (the // pathname edge),
      // getter semantics for the empty delimiters, and the site.ts
      // post-serialization [/?#] strip for the comparison — three
      // lenses, one bare-origin verdict on every spelling (the
      // `#/?`/`?/?` faces answer the shape arm's warning ALONE now).
      const u = new URL(siteUrl.trim().replace(/\/+$/, ""));
      return (
        (u.protocol === "http:" || u.protocol === "https:") &&
        (u.pathname === "/" || u.pathname === "") &&
        u.search === "" &&
        u.hash === "" &&
        u.username === "" &&
        u.password === ""
      );
    } catch {
      return false;
    }
  })();
  if (
    isProduction &&
    servedSiteUrl !== undefined &&
    siteUrl &&
    runtimeIsBareOrigin &&
    normalizeSiteUrl(siteUrl) !== normalizeSiteUrl(servedSiteUrl)
  ) {
    warnings.push(
      `[boot] NEXT_PUBLIC_SITE_URL="${siteUrl}" in the runtime environment is NOT what this server serves — the surfaces advertise "${servedSiteUrl}" (NEXT_PUBLIC_* values are INLINED AT BUILD TIME; the runtime value is inert for them). Set the canonical origin BEFORE \`bun run build\` and rebuild, then keep the runtime env in sync.`,
    );
  }

  // ---- DATABASE_URL: the unclosed-quote residue (session-58, S58-1) ----
  // A quoted DATABASE_URL line left unclosed in .env is the S57-1 span
  // genus — and the two sanctioned loaders spell the SAME typo's residue
  // DIFFERENTLY (live-probed both this round, ambient env unset, both
  // quote chars): bun 1.3.14 SPANS the S3 shape (the value embeds a
  // NEWLINE — `file:../db/custom.db\nOTHER="quoted value`) and keeps
  // the leading quote on the single-line-unclosed shape; @next/env
  // (next dev via node / the standalone server.js) NEVER spans — the S3
  // shape keeps the LEADING QUOTE (`"file:../db/custom.db`).
  // (Session-61, S61-1 — the loader-census truth respell: this
  // comment's prior tail — the loader-drops claim (the verbatim
  // falsified spelling removed session-62, S62-1) — was FALSIFIED
  // by a direct probe of the repo's own @next/env
  // 16.4.2 (loadEnvConfig on a scratch .env, ambient env unset, both
  // quote chars, dev:true and dev:false alike): @next/env KEEPS the
  // leading-quote value in process.env on EVERY unclosed shape. Both
  // sanctioned loaders carry the single-line-unclosed residue into the
  // process env; the S59-1 file-face arm's real coverage is the
  // UNLOADED-.env postures — the S51-1 launch-dir/unloaded-file family
  // where NO sanctioned loader ever consumed that .env, so the
  // process-env record this seam reads cannot carry it.)
  // The MECHANISM splits on whether the residue still carries the
  // file: prefix (session-59, S59-1 — the live-probed truth; the old
  // single message described only the span face and misdirected the
  // leading-quote operator toward a junk file that never exists): a
  // file:-prefixed residue re-anchors through the db-path seam into a
  // junk-named file under db/ that the engine ACCEPTS (a 0-byte file;
  // SELECT 1 answers; the first User query P2021s — the S47-1 artifact
  // genus; db-path.ts's S57-1b docblock owns the full truth); a
  // non-file: residue is passed through RAW (db-path.ts's postgres
  // pass-through arm) and the engine answers
  // PrismaClientInitializationError at the first DB-touching
  // invocation — no junk file, no healthy boot (the session-59 live
  // probe on the repo's own @prisma/client 6.19.3).
  // The runtime cure stays REGISTERED
  // (the S53-6 posture: fix the .env) — this warning converts the genus
  // from SILENT to loud, in EVERY mode (the F10-11 doctrine: a
  // malformed value is always wrong, dev included — the operator edits
  // .env in dev). A healthy URL never carries a control character or a
  // leading quote, so every documented shape stays silent (the .env
  // contract value, the e2e override, the :memory: pass-through, the
  // absolute override). The value prints JSON.stringify'd — the
  // residue is malformed by definition, and the escaped one-line form
  // (the newline visible as \n) is the diagnostic itself.
  // Session-69 (S69-4, AUDIT-1 F3 — live-probed): the arm reads the
  // TRIMMED face throughout — mirroring the engine's consumption
  // exactly (runtimeDatabaseUrl resolves process.env.DATABASE_URL
  // .trim(); the file-face arm above already trimmed — the two arms
  // of the family are now aligned). An EDGE-only control char (a
  // trailing tab inside a quoted .env value — quoted inner content
  // survives both loaders) is consumed away by the trim and the boot
  // is HEALTHY: the old untrimmed predicate fired a false alarm whose
  // junk-file / raw-pass-through mechanism sentences were false for
  // that face. INTERIOR control chars and leading quotes survive the
  // trim exactly as the engine sees them (the raw resolve bakes an
  // interior tab into the resolved path — verified live), and the
  // printed face loses nothing for firing shapes (an interior control
  // char stays visible in the trimmed value).
  const dbUrl = env.DATABASE_URL;
  // (The ?? "" fallback is unreachable inside the arm — the guard below
  // requires a non-empty dbUrl — but it satisfies the type narrowing the
  // separate const otherwise loses.)
  const dbFace = (dbUrl ?? "").trim();
  if (
    dbUrl !== undefined && dbUrl !== "" &&
    dbUrlCarriesResidue(dbFace)
  ) {
    // Session-60 (S60-1): the attribution splits by trigger face. The
    // predicate fires on FOUR faces — the leading quote (kept by BOTH
    // sanctioned loaders — the session-61 S61-1 probe census), the
    // embedded newline (the S57-1 span genus:
    // an unclosed quote in .env spanning lines IS the usual cause of a
    // newline in the value, so that face KEEPS the unclosed-quote story
    // and the close-the-quote fix), every OTHER control character
    // (a pasted tab or platform artifact on an unquoted line — no
    // quote is involved, so the quote headline and the quote fix were
    // misattributions for this face; the round's probes: the seam
    // re-anchors a tab-bearing file: value into the junk-named file
    // exactly like the newline span, and passes a tab-bearing non-file:
    // value through raw), and — session-74 (S74-2b) — the STRAY QUOTE on
    // a file:-prefixed value (the mirrored typo file:../db/custom.db":
    // the engine accepts it and creates the junk-named 0-byte file —
    // the S57-1 junk-file genus, NOT PrismaClientInitializationError;
    // the live probe resolved and accepted the trailing-quote spelling
    // on the repo's own engine). The `file:` branch is reachable by
    // control-char values and stray-quote values (a leading-quote value
    // can never start with `file:`) — before the split its "unclosed
    // quote" headline was false for every value that reached it.
    // Session-75 (S75-2): the face quartet is classified by the ONE
    // shared helper (dbUrlFaceClassification) — this printer and the
    // file-side seam consume the same precedence (a combined
    // control+quote value keeps the control-char story everywhere).
    const { quoteFace, controlFace, newlineFace, strayQuoteFace } = dbUrlFaceClassification(dbFace);
    // Session-63 (S63-2): the printed value is REDACTED (a credentialed
    // postgres URL never leaks its password to stdout/server.log — the
    // residue shape stays, the userinfo segment goes); the branch
    // conditions test the SAME trimmed face the engine consumes (the
    // S69-4 alignment — the raw value's edge whitespace never reaches
    // the engine, so it must not reach the branch selector either).
    const shown = JSON.stringify(redactCredentials(dbFace));
    warnings.push(
      dbFace.startsWith("file:")
        ? (newlineFace
            ? `[boot] DATABASE_URL=${shown} carries an unclosed quote residue from .env (a control character rides the value — the session-57 S57-1 loader-span genus) — the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021). Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`
            : strayQuoteFace
              ? `[boot] DATABASE_URL=${shown} carries a stray quote (or backtick) from .env (the mirrored one-keystroke typo — the quote the operator meant to open the .env line with landed at the value's tail, or the backtick on its neighboring key; no control character rides the value, the session-74 census; the arm is scoped to RELATIVE file: values — the session-75 S75-3 cure, the junk-file mechanism below is true for exactly that scope) — the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-74 live probe on the repo's own engine resolved the trailing-quote spelling into the 0-byte custom.db" and accepted it). Fix the .env: remove the stray quote (or backtick) from the DATABASE_URL value.`
              : `[boot] DATABASE_URL=${shown} carries a control character from .env (a stray control or invisible character rides the value — the session-60 S60-1 census; the invisible-whitespace paste family (NBSP/ZWSP) joined session-75, S75-3, and a value carrying BOTH a control char and a quote keeps this story with the quote as secondary residue — S75-2) — the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-60 seam probe re-anchored the tab-bearing value exactly like the newline span). Fix the .env: remove the control character from the DATABASE_URL value.`)
        : (quoteFace
            ? `[boot] DATABASE_URL=${shown} carries an unclosed quote residue from .env — the value does not start with "file:", so the db-path seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation (no junk file is created; static pages still serve while every DB route fails). Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`
            : `[boot] DATABASE_URL=${shown} carries a control character from .env (a stray control or invisible character rides the value — the session-60 S60-1 census; the invisible-whitespace paste family (NBSP/ZWSP) joined session-75, S75-3, and a value carrying BOTH a control char and a quote keeps this story with the quote as secondary residue — S75-2) — the value does not start with "file:", so the db-path seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation (no junk file is created; static pages still serve while every DB route fails). Fix the .env: remove the control character from the DATABASE_URL value.`),
    );
  }

  // ---- The flag-typo guard (warn form) ---------------------------------
  // Two prefixes, two hazards (session-3, F3-1 — the session-2 rename
  // left this scan speaking the old NEO_ dialect while the knobs became
  // VIRALPOST_*, so a mistyped VIRALPOST_ name silently no-oped):
  //  - an UNKNOWN VIRALPOST_* key is the live typo hazard (the closed
  //    set is read verbatim — a mistyped knob does nothing);
  //  - ANY NEO_* key is a legacy spelling of the session-2 rename — the
  //    code no longer reads it, so it is inert; the warning maps the
  //    live VIRALPOST_* name where one exists.
  // (NODE_ENV, DATABASE_URL and the NEXT_* family start with neither
  //  prefix — they can never trip these scans.)
  // Session-39 (S39-13): the CASE-VARIANT arm — env keys are
  // case-sensitive, so a lower/mixed-case spelling
  // (viralpost_disable_in_app_otp=1) is invisible to BOTH the exact-case
  // reader and the two exact-case branches above: the operator believes
  // delivery is disabled while the OTP keeps riding the responses, with
  // no [boot] warning (the S13-1 polarity genus, one spelling away).
  // Warn-only, after the exact-case branches, mapping the canonical
  // ALL-CAPS spelling.
  // Session-40 (S40-1): the arm now covers the WHOLE six-knob contract,
  // not just the two prefixes — a case-variant
  // AUTH_SECRET/NEXT_PUBLIC_SITE_URL/DATABASE_URL was invisible to every
  // arm before (see SIX_KNOB_NAMES above for the sharp faces); the
  // NEO_ branch's mapped tail is uppercased the same way (S40-2).
  for (const key of Object.keys(env)) {
    if (key.startsWith("VIRALPOST_") && !KNOWN_VIRALPOST_VARS.has(key)) {
      // Session-41 (S41-4): an exact-VIRALPOST_-prefix MIXED-TAIL key
      // (VIRALPOST_proxy_hops) is a case variant of a known knob, not
      // an unknown name — route it to the case-variant vocabulary (the
      // actionable "Set X instead"), the same cure S40-2 gave the NEO_
      // face. The old form warned "Unknown VIRALPOST_* … A typo here
      // silently no-ops" — true but mislabeled: the operator configured
      // a REAL knob with the wrong casing and got the generic typo
      // guidance without the exact spelling the code reads. (An
      // exact-case known key never reaches this branch — the
      // !KNOWN_VIRALPOST_VARS.has(key) gate above is the exclusion.)
      const knownCaseVariant = [...KNOWN_VIRALPOST_VARS].find(
        (k) => k.toLowerCase() === key.toLowerCase(),
      );
      warnings.push(
        knownCaseVariant
          ? `[boot] Case-variant environment variable ${key} — env keys are case-sensitive, so this key is inert here. The code reads the exact spelling ${knownCaseVariant}. Set ${knownCaseVariant} instead.`
          : `[boot] Unknown VIRALPOST_* environment variable ${key} — the known knobs are: ${[...KNOWN_VIRALPOST_VARS].join(
              ", ",
            )}. A typo here silently no-ops (the closed set is read verbatim).`,
      );
    } else if (key.startsWith("NEO_")) {
      // Session-40 (S40-2): the tail is UPPERCASED like the case arm's
      // canonical — an exact-NEO_-prefix mixed-tail key (NEO_Proxy_Hops)
      // used to fail KNOWN_VIRALPOST_VARS.has(mapped) and land in the
      // dead-end "no knob maps" branch instead of the actionable
      // mapping (the S39-13 arm solved the identical problem for the
      // lowercase-lead shape; this closes the mixed-tail shape).
      const mapped = `VIRALPOST_${key.slice(4).toUpperCase()}`;
      warnings.push(
        KNOWN_VIRALPOST_VARS.has(mapped)
          ? `[boot] Legacy NEO_* environment variable ${key} — the knob names were renamed NEO_* → VIRALPOST_* (session 2); the code reads the VIRALPOST_* spelling, so ${key} is inert here. Set ${mapped} instead.`
          : `[boot] Legacy NEO_* environment variable ${key} — the knob family was renamed NEO_* → VIRALPOST_* (session 2); no knob maps to this name. The known knobs are: ${[
              ...KNOWN_VIRALPOST_VARS,
            ].join(", ")}.`,
      );
    } else if (
      !key.startsWith("VIRALPOST_") &&
      !key.startsWith("NEO_") &&
      // Session-40 (S40-1): the six-knob family joins the case-variant
      // scan (see SIX_KNOB_NAMES above) — the S39-13 arm matched only
      // the viralpost_/neo_ prefixes, so a case-variant
      // AUTH_SECRET/NEXT_PUBLIC_SITE_URL/DATABASE_URL spelling was
      // invisible to every arm (the prefix tests never see them; the
      // exact-case readers read only the canonical spelling).
      (/^viralpost_/i.test(key) ||
        /^neo_/i.test(key) ||
        SIX_KNOB_NAMES.some((k) => k !== key && k.toLowerCase() === key.toLowerCase()))
    ) {
      // (The exact-prefix exclusions are load-bearing: a KNOWN
      // exact-case key reaches this else too — without them the
      // case-insensitive test would warn on every healthy knob. The
      // 33-failure RED the S39-13a pins produced on the arm's first
      // draft is the in-round proof. The `k !== key` guard in the
      // six-knob matcher is the same exclusion on the name-set face:
      // an exact-case DATABASE_URL/AUTH_SECRET never warns here.)
      // Session-41 (S41-3): the six-knob match is computed ONCE and
      // leads the canonical ternary — the S40-1 form carried an
      // unreachable `?? key.toUpperCase()` fallback (the arm
      // condition's some() already guarantees find() resolves whenever
      // the prefix tests miss, under identical predicates) and a
      // maps-ternary left arm subsumed by the containment
      // (SIX_KNOB_NAMES ⊇ KNOWN_VIRALPOST_VARS — the set is built from
      // it). No fallback arm exists by construction; the input
      // equivalence holds for every key class (the six-knob face, the
      // neo_/viralpost_ prefix faces, and the unknown-tail miss).
      const sixKnobCanonical = SIX_KNOB_NAMES.find(
        (k) => k !== key && k.toLowerCase() === key.toLowerCase(),
      );
      const canonical =
        sixKnobCanonical ??
        (/^neo_/i.test(key)
          ? `VIRALPOST_${key.slice(4).toUpperCase()}`
          : key.toUpperCase());
      warnings.push(
        SIX_KNOB_NAMES.includes(canonical)
          ? `[boot] Case-variant environment variable ${key} — env keys are case-sensitive, so this key is inert here. The code reads the exact spelling ${canonical}. Set ${canonical} instead.`
          : `[boot] Case-variant environment variable ${key} — env keys are case-sensitive, and no knob maps to ${canonical}. The known knobs are: ${[
              ...KNOWN_VIRALPOST_VARS,
            ].join(", ")}.`,
      );
    }
  }
  for (const key of DISABLE_KNOBS) {
    const value = env[key];
    if (value !== undefined && !DISABLE_KNOB_VALUES.has(value)) {
      warnings.push(
        `[boot] ${key}="${value}" — only the empty string (unset: in-app delivery) and "1" (disable) are meaningful; every other value silently behaves as unset.`,
      );
    }
  }
  // Session-13 (S13-1): the in-app-delivery polarity hazard — both
  // kill-switches ship "" (ENABLED) in .env.example, so a
  // default-configured PRODUCTION deploy returns a live reset link for
  // any known email (forgot-password → resetUrl) and a fresh OTP for any
  // unverified account (resend → the code; verify then signs in). The
  // boot gate already warned for strictly less dangerous knobs (the
  // unset-hops direct-exposure hazard above); this arm extends the same
  // DECLARE-YOUR-POSTURE precedent to the delivery family. Warn, never
  // fatal (the mail-less demo posture is a legitimate self-hosted
  // deployment); the off-vocabulary values stay owned by the off-vocab
  // arm above (one face, one pin).
  for (const key of DISABLE_KNOBS) {
    const value = env[key];
    if (isProduction && (value === undefined || value === "")) {
      const what =
        key === "VIRALPOST_DISABLE_IN_APP_OTP"
          ? "the verification code rides the signup/resend responses (anyone who can reach the API can verify — and sign in as — an unverified account)"
          : "the password-reset link rides the forgot-password response (anyone who can reach the API can reset — and take over — any known account)";
      warnings.push(
        `[boot] ${key} is unset in production — ${what}. Set ${key}=1 when a real mail transport owns delivery (the self-hosted demo posture may keep it unset deliberately).`,
      );
    }
  }
  const hops = env.VIRALPOST_PROXY_HOPS;
  // Session-22 (S22-18): the predicate mirrors proxyHopDepth's own
  // parse (Number.parseInt) — the old /^\d+$/ form warned "unparsable"
  // for parseInt-accepted values like "+1", " 1", "0x2" (a false
  // alarm eroding the warning's authority; the fail-closed claim was
  // wrong for them too — the seam happily parsed them).
  const hopsUnparsable =
    hops !== undefined && hops !== "" &&
    (Number.isNaN(Number.parseInt(hops, 10)) || Number.parseInt(hops, 10) < 0);
  if (hopsUnparsable) {
    warnings.push(
      `[boot] VIRALPOST_PROXY_HOPS="${hops}" is unparsable — the rate-limit seam fails CLOSED onto hop 1 (a bad value never widens trust); fix the value to unset, 0, or an N ≥ 1.`,
    );
  }
  // Session-9 (F9-1): the trust-default hazard — unset means depth 1
  // ("exactly one appending proxy"), but a DIRECT-exposure deployment
  // (the self-hosted quickstart's own shape) has NO proxy in front: the
  // whole x-forwarded-for header is client-supplied, and a client
  // rotating one fake XFF value per request mints a fresh limiter bucket
  // every time — every per-IP wall (login, signup, resend, verify,
  // forgot/reset, contact, generate) becomes bypassable. The seam cannot
  // know the topology; production must DECLARE it (the
  // NEXT_PUBLIC_SITE_URL warn precedent — never fatal; dev is exempt).
  // Session-19 (S19-4): the availability face stated alongside the
  // spoofing face — a browser sends NO x-forwarded-for and NO
  // x-real-ip, so on a proxyless deployment (the DEFAULT depth 1 just
  // as much as the declared 0) every honest client keys into the SAME
  // "unknown" bucket per route: the deployment-wide shared ceiling
  // (login 10 / 15 min for ALL users combined). Fronting the app with
  // a proxy + declaring the depth is the only per-client posture.
  if (isProduction && (hops === undefined || hops === "")) {
    warnings.push(
      // Session-21 (S21-17): "x-forwarded-for or x-real-ip" — the
      // x-real-ip fallback (rate-limit.ts) is the same client-suppliable
      // class under direct exposure; naming only XFF undersold the hazard.
      `[boot] VIRALPOST_PROXY_HOPS is unset in production — the default trusts exactly one appending proxy (depth 1). Behind a reverse proxy chain, set it to the hop count; under DIRECT exposure (no proxy in front of the app), set VIRALPOST_PROXY_HOPS=0 — otherwise a client rotating a forged x-forwarded-for or x-real-ip value gets a fresh rate-limit bucket per request. NOTE (session-19): on ANY proxyless deployment — declared 0 or default — browsers send no x-forwarded-for, so every honest client shares ONE bucket per route (a site-wide login ceiling of 10 / 15 min); front the app with a proxy and declare the depth for per-client limits.`,
    );
  }

  return { fatal: null, warnings };
}

/**
 * Apply a report: print each warning via the injectable logger, throw
 * the fatal. Called from src/instrumentation.ts's register() (and from
 * tests with logger/report doubles).
 */
export function applyBootEnvReport(
  report: BootEnvReport,
  deps: { logger?: Pick<Console, "warn"> } = {},
): void {
  const logger = deps.logger ?? console;
  for (const warning of report.warnings) logger.warn(warning);
  if (report.fatal !== null) throw new Error(report.fatal);
}

// Session-59 (S59-1, AUDIT-1 L1; the premise re-spelled session-61,
// S61-1): the .env-FILE-face residue warning — the pure seam in the
// bootEnvCheck family. WHY: the S58-1 arm reads only the PROCESS-ENV
// face, and there are postures where the process env carries NOTHING
// while the db-path seam's own .env parse sees the residue — the
// UNLOADED-.env postures (the S51-1 launch-dir/unloaded-file family:
// no sanctioned loader ever consumed that .env). The session-59
// premise — the loader-drops claim (the verbatim falsified spelling
// removed session-62, S62-1) — was FALSIFIED by the session-61
// probe (the repo's own @next/env 16.4.2 KEEPS the leading-quote value
// in process.env on every unclosed shape); when a sanctioned loader
// DID consume the .env, the process env carries the residue and the
// S58-1 arm fires — the file-face arm defers by its one-owner design
// (the envUrl guard). In the postures where THIS arm fires, the file
// value keeps the leading quote (parseEnvFile: no closing quote ⇒ the
// slice never runs) and resolveDatabaseUrl passes the non-file: value
// through RAW. The session-59 live probe (ambient env unset, a
// single-line-unclosed scratch .env): runtimeDatabaseUrl answered
// `"file:../db/custom.db` and the repo's own @prisma/client 6.19.3
// threw PrismaClientInitializationError at the first invocation — a
// loud request-time failure with ZERO boot signal, the hole in the
// S58-1 "no longer silent, in EVERY mode" claim. The cure mirrors the
// shadow seam's pattern: THIS pure function takes both faces (the env
// record + the .env file's parsed DATABASE_URL), the server wrapper
// below feeds it. FIRES ONLY when the process-env face is UNSET — the
// one posture where the file residue reaches the engine unseen: a SET
// env face either carries the residue itself (the S58-1 arm owns that
// face — one owner) or is a clean override (the file value never
// reaches the engine, effectiveDatabaseUrl's envUrl ?? envFileUrl
// tail). Warn-only, every mode (the F10-11 doctrine), the [boot]
// family vocabulary.
export function databaseUrlFileResidueWarning(
  env: { NODE_ENV?: string | undefined; DATABASE_URL?: string | undefined },
  envFileUrl: string | undefined,
  runtimeConsumesFile: boolean = true,
): string | null {
  // A SET process-env face owns the signal: it either carries the
  // residue itself (the S58-1 arm in bootEnvCheck — one owner, never
  // a double warning) or is a clean override the runtime honors over
  // the file value (effectiveDatabaseUrl's envUrl ?? envFileUrl tail —
  // the file residue never reaches the engine, warning about it would
  // be a false alarm). No mode gate either (the F10-11 doctrine: a
  // malformed .env is always wrong, dev included — the operator edits
  // .env in dev); the env record carries NODE_ENV solely so a future
  // mode-gate "cure" is expressible — and pinned against (the dev
  // pin's mode-gate plant).
  const envUrl = env.DATABASE_URL?.trim() || undefined;
  if (envUrl) return null;
  const fileUrl = envFileUrl?.trim() || undefined;
  if (fileUrl === undefined || fileUrl === "") return null;
  if (!dbUrlCarriesResidue(fileUrl)) {
    return null;
  }
  // Session-60 (S60-1): the per-face mechanism truth (the loader
  // parenthetical re-spelled session-61, S61-1). The line-based parse
  // carries TWO residue faces (this round's parseEnvFile census): the
  // leading quote (an unclosed quote on the line — kept by BOTH
  // sanctioned loaders; the file-face arm's real coverage is the
  // UNLOADED-.env postures), and a control character on an unquoted
  // line (a pasted tab or platform artifact). A span needs an embedded
  // newline, which a line-based parse cannot produce — that clause
  // stays true.
  // The leading-quote face is never file:-prefixed (the raw
  // pass-through + PrismaClientInitializationError mechanism, the
  // session-59 live probe); the control-char face CAN be file:-prefixed
  // (the session-60 probes: an unquoted tab-bearing line parses to a
  // file:-prefixed value, and the seam re-anchors it into the junk-named
  // file under db/ — the S57-1 genus), so the mechanism splits per
  // branch exactly like the process-env arm's S60-1 split.
  // Session-75 (S75-2): the face quartet is classified by the ONE
  // shared helper (dbUrlFaceClassification) — this seam and the
  // process-env printer consume the same precedence. The stray-quote
  // face here used to gate only !quoteFace (the process-env twin
  // carried !controlFace), so a value carrying BOTH a control char
  // and a quote printed the STRAY-QUOTE story on this printer and
  // the control-char story through bootEnvCheck — the two-homes
  // drift, cured by the single home (a combined value keeps the
  // control-char story through both printers now).
  const { quoteFace, strayQuoteFace } = dbUrlFaceClassification(fileUrl);
  // Session-63 (S63-2): the printed value is REDACTED (the userinfo
  // segment of a credentialed URL never prints; the residue shape —
  // the diagnostic — stays); the branch conditions below still test
  // the UN-REDACTED, TRIMMED face (session-70, AUDIT-1 I-2: the old
  // "RAW value" wording predated the S69-4 trim cure — fileUrl IS the
  // trimmed face here, and "raw" now invites the edge-control-char
  // misread; un-redacted is the claim the branches rely on).
  const prefix = `[boot] the .env DATABASE_URL=${JSON.stringify(redactCredentials(fileUrl))}`;
  // Session-62 (S62-2): re-named from `dropped` — the S61-1 respell
  // re-spelled the VALUE to the posture truth; the vestigial name
  // followed it this round (the constant no longer says "dropped").
  const unseen = `the process environment does not carry the value (no sanctioned loader consumed this .env — the S51-1 launch-dir family), so the process-env arm cannot see it`;
  // Session-62 (S62-2, AUDIT-1 L3 — live-probed): the leg split. The
  // wrapper probes the cwd ∪ PWD union, but the runtime tail
  // (runtimeDatabaseUrl → readDatabaseUrlFromEnvAt(cwd)) reads ONLY
  // the server CWD's .env — a residue on the PWD leg never reaches
  // the engine. The round's live probe (node-booted standalone
  // server.js from the repo root, a single-line-unclosed residue
  // .env at the repo root, ambient unset): the PWD-leg warning fired
  // naming PrismaClientInitializationError while the server booted
  // HEALTHY against the real db (/api/health answered ok:true,
  // db:up) — the predicted failure never happened. On this leg the
  // mechanism sentence is the posture truth: the residue is INERT
  // until a loader consumes this file. The headline + cause clause +
  // fix guidance stay true on both legs.
  if (!runtimeConsumesFile) {
    const headline = quoteFace
      ? "an unclosed quote residue"
      : strayQuoteFace
        ? "a stray quote (or backtick)"
        : "a control character";
    const fix = quoteFace
      ? 'close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db")'
      : strayQuoteFace
        ? "remove the stray quote (or backtick) from the DATABASE_URL value"
        : "remove the control character from the DATABASE_URL value";
    return `${prefix} carries ${headline} — ${unseen}; this directory is the PWD leg and the db-path seam's runtime reads only the server CWD's .env, so the engine never sees the residue (it resolves the default URL and boots against the real database) — the malformed line is inert until a loader consumes this file. Fix the .env: ${fix}.`;
  }
  if (quoteFace) {
    return `${prefix} carries an unclosed quote residue — ${unseen}; the db-path seam's own .env parse keeps the quote and hands the engine the value raw, and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation. Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`;
  }
  if (strayQuoteFace) {
    return `${prefix} carries a stray quote (or backtick) — ${unseen}; the db-path seam's own .env parse keeps the quote (or backtick) and the runtime re-anchors the RELATIVE file:-prefixed value into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-74 live probe on the repo's own engine resolved file:../db/custom.db" into the 0-byte custom.db" and accepted it; the arm is scoped to RELATIVE values — the session-75 S75-3 cure, the mechanism sentence is true for exactly that scope). Fix the .env: remove the stray quote (or backtick) from the DATABASE_URL value.`;
  }
  if (fileUrl.startsWith("file:")) {
    return `${prefix} carries a control character — ${unseen}; the db-path seam's own .env parse keeps the control character (an unquoted line's pasted tab or invisible whitespace — the session-60 S60-1 census, the invisible-whitespace family widened session-75/S75-3), and, the value being file:-prefixed, the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-60 seam probe). Fix the .env: remove the control character from the DATABASE_URL value.`;
  }
  return `${prefix} carries a control character — ${unseen}; the db-path seam's own .env parse keeps the control character (an unquoted line's pasted tab or invisible whitespace — the session-60 S60-1 census, the invisible-whitespace family widened session-75/S75-3), and, the value not starting with "file:", the seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation. Fix the .env: remove the control character from the DATABASE_URL value.`;
}

// Session-63 (S63-2, AUDIT-1 L1): the residue warnings print the raw
// value — the diagnostic IS the residue shape. But the db-path seam
// passes non-file: URLs through verbatim by design (the documented
// PostgreSQL migration path), and such URLs commonly embed credentials
// (`postgresql://user:pass@host/db`); a MALFORMED one (the only shape
// these warnings fire on — a stray tab or unclosed quote) would print
// the password to stdout, and `bun run start`'s `tee server.log`
// persists it. The redaction replaces only the userinfo segment; the
// residue shape stays visible (the residue, not the secret, is the
// diagnostic). file: values carry no userinfo — untouched.
// Session-64 (S64-1, AUDIT-1 L1 — live-probed): the authority-scoped
// form redacts up to the LAST @ in the segment. The first-@ form
// leaked a raw-@ password's tail ('"postgresql://admin:p@ssw0rd@host'
// printed '***@ssw0rd@host' — the bulk of the password); userinfo
// with an embedded @ is technically invalid (it should be %40), but
// it is exactly the malformed-value class these arms print, and the
// one-owner doctrine is "the password never prints". Every pinned
// S63-2 shape is byte-identical under this form.
function redactCredentials(url: string): string {
  // Session-65 (S65-1, AUDIT-1 M-1 — live-probed): the manual scan
  // replaces the S64-1 replace() form. The grammar-scoped authority
  // ([^/?#\s"']*) stopped at / ? # whitespace and quotes — a password
  // carrying one of those BEFORE its @ left the captured segment @-less
  // and printed VERBATIM ('postgresql://admin:p/ss@host/db' printed
  // p/ss; the tab form printed pa<TAB>ss while the residue warning
  // named the very control char it was printing). The scan form masks
  // to the LAST @ of the token run (the whitespace/quote-bounded run
  // after the scheme), then falls back to the LAST @ of the whole
  // input (the whole input is one env value, so the tail is still the
  // value's) — over-redacting rather than under-redacting (an @-in-path
  // token mangles to ***@tail; the safe direction; no pinned shape
  // covers it). Every pinned S63-2/S64-1 shape is byte-identical under
  // it (replace()'s match-consumption boundary made the extended tiers
  // un-expressible there — a replacement cannot consume past its
  // match, so the delimiter face duplicated the tail).
  //
  // Session-66 (S66-1, AUDIT-1-1 M — live-probed through the real
  // warning builders): three residual classes still printed verbatim,
  // closed here. (1) SCHEME-LESS credentialed values ('user:pass@host/
  // db') fell through the !schemeMatch early return — now masked to
  // the LAST @ (a no-@ value stays verbatim; nothing to hide). (2) A
  // credential BEFORE the first scheme ('"admin:pass@host\npostgres://
  // x/y') declined under the restAt > afterScheme guard — masking from
  // afterScheme would keep the credential in the sliced prefix, so the
  // whole prefix masks to the last @. (3) QUERY-PARAM credentials on
  // an otherwise VALID url ('postgresql://host/db?user=u&password=p' —
  // a documented libpq/Prisma spelling) never ride an @; the pass
  // below runs on EVERY arm's output (a url can carry BOTH userinfo
  // and a query password). The user= identity and host tails stay
  // visible where parseable (the S65-1b visibility doctrine); every
  // pinned S63-2/S64-1/S65-1 shape is byte-identical (none carries a
  // query param or a scheme-less/pre-scheme form).
  // Session-71 (S71-2b, AUDIT-1 M-2 — live-probed): the KEYWORD pass
  // now runs FIRST, on the raw value. The old order (scheme/userinfo
  // arms → query pass → keyword pass LAST) let the scheme-less last-@
  // mask DESTROY the prefix carrying the password= key before the
  // keyword pass ever saw it — a password containing @ (no escaping
  // required inside single quotes; among the most common real-world
  // spellings) leaked its post-@ tail through every arm
  // (password='S3cr@tPass!' → DATABASE_URL="***@tPass!'"; the bare
  // spelling password=p@ss dbname=x → ***@ss dbname=x — the key
  // visibility destroyed AND the tail leaked), while the keyword pass
  // that would have masked it never fired on the already-masked
  // output. Keyword-first closes the genus: the masked region carries
  // no @, the scheme-less arm below finds nothing to drop, and the
  // identity/host visibility survives. The S67-1 disjointness
  // argument re-verified for the new order — a password= key rides
  // either a ?/& or whitespace, never both (? and & are not
  // whitespace, so this pass never matches a URI-query password and
  // the reorder changes nothing for the scheme-full family; the
  // masked `password=***` output can never match the query pass's
  // [?&] prefix below — a space is neither).
  // Session-71 (S71-1b, AUDIT-1 M-1 — live-probed): the quoted arms
  // are ESCAPE-AWARE with trailing-junk runs. libpq's documented
  // grammar escapes single quotes and backslashes inside a
  // single-quoted value with a backslash (\' and \\) — but the
  // S69-1 container closed at the FIRST same-quote char, so the
  // sanctioned escape spelling itself printed the post-escaped-quote
  // tail (password='p\'ass' → password=***ass'), and a leading-"
  // value printed its post-close tail (password="ab"cdw0rd →
  // ***cdw0rd). The (?:[^'\\]|\\.)* core consumes escape PAIRS; the
  // trailing [^\s]* run consumes any post-close material to the
  // token's end (over-redact, the S65-1 doctrine; a " is not a libpq
  // container — the DQ arm is the pinned S69-1 over-redaction
  // posture, widened identically).
  // Session-67 (S67-1, AUDIT-1 M-1 — live-probed): the KEYWORD-VALUE
  // libpq form — the space-separated spelling ('host=localhost
  // user=admin password=…', the habitual psql habit) — carries no
  // scheme, no @, and no ?/&, so the scheme/userinfo arms below pass
  // it through and the warning family printed the password verbatim
  // before this pass existed. REGISTERED boundaries (named, not
  // cured): the @-less colon-segment face ('postgresql://user:secretpw/
  // db' — the password sits in URL grammar's port slot; libpq reads
  // host=user port=secretpw, and masking host:port would destroy the
  // host-visibility doctrine); the unencoded-& tail (a query value
  // carrying a raw & prints its post-delimiter tail — libpq parses
  // only the pre-& run as the password, which IS masked); and the
  // key-set asymmetry (sslkey/servicefile stay visible while passfile
  // masks — the chosen trio is the secret-bearing set).
  // Session-69 (S69-1, AUDIT-1 F1 — live-probed): the SAME quoted-tail
  // alternation as the query pass — libpq's documented keyword form
  // uses a single-quoted value as a CONTAINER (password='my secret' is
  // the sanctioned spelling for values with spaces; Prisma accepts
  // libpq connection strings), and the bare run ([^\s"']*) stopped at
  // the opening quote, so the replacement inserted *** and the ENTIRE
  // quoted tail printed verbatim (the live probe:
  // password=***'my secret'). REGISTERED with this cure: the
  // percent-encoded query-key face ('%70assword=' — libpq
  // percent-decodes query keys, so the decoded key IS the password;
  // the literal-spelling match is the chosen posture — the
  // registered-boundary precedent above).
  // Session-70 (S70-1/S70-2 — live-probed): the SAME widenings as the
  // query pass, for the same live-probed leaks — the key face takes
  // libpq's optional whitespace around the equals sign (the spaced
  // form `password = topsecret` printed verbatim; the live probe hit
  // every arm this pass rides), and the bare run drops the quote
  // chars (an interior quote is value material; the leading-container
  // arms own the opener case).
  // Session-72 (S72-1b, AUDIT-1 M-1 — live-probed): the prefix class
  // widens to `(^|[\s"'])` — a residue QUOTE is a libpq-meaningful
  // delimiter before a keyword exactly as whitespace is. The
  // unclosed-quote .env malformation class (the exact face the boot
  // residue and file-residue arms exist to print) with the password
  // FIRST fell through every pass: `(^|\s)` rejected the leading
  // quote, the scheme/userinfo arms saw no scheme and no @, and the
  // query pass needs [?&] — the whole value printed VERBATIM
  // (`"password=SuperSecret123 host=localhost user=admin` carried
  // SuperSecret123 in clear; the @-bearing variant misattributed its
  // tail to the mask-to-last-@ fallback; the passfile key path
  // printed verbatim through the file-residue arm). The widened
  // class masks the keyword at the head of the quote-opened run; the
  // masked `password=***` output carries no quote, so the arms below
  // are unchanged.
  // Session-73 (S73-1b, AUDIT-1 M-1 — live-probed through both residue
  // printers): the class widens AGAIN to
  // `(^|[\s"'\u0000-\u001f\u007f-\u009f])` — every control character
  // that JS \s does NOT match (\x00-\x08, \x0e-\x1f, \x7f DEL, the
  // C1 \x80-\x9f family) is a libpq-meaningful delimiter before a
  // keyword exactly as whitespace, a residue quote, and the realistic
  // pasted controls (\t \n \v \f \r — already \s) are: the
  // `postgresql://host/db\x01password=Secret123 user=admin` face
  // printed the secret VERBATIM through BOTH printers (stdout +
  // server.log + the file-residue arm) while the \t face masked
  // correctly — the boundary was exactly \s membership. The \s
  // members are subsumed (the overlap is harmless); the masked
  // `password=***` output carries no control character, so the arms
  // below are unchanged. REGISTERED boundary: a backslash-preceded
  // keyword (a stray `\` ahead of the key inside a quoted run) stays
  // unmasked — a double-malformation face; adding `\\` to the class
  // is the named lift if ever deemed reachable.
  const keywordMasked = url.replace(
    /(^|[\s"'\u0000-\u001f\u007f-\u009f])((?:password|passfile|sslpassword)\s*=\s*)('(?:[^'\\]|\\.)*'?[^\s]*|"(?:[^"\\]|\\.)*"?[^\s]*|[^\s]*)/gi,
    "$1$2***",
  );
  // S66-1 face 1: the query-param credentials (password/passfile/
  // sslpassword — the libpq secret-bearing keys; user= is an identity,
  // not a secret). Case-insensitive: over-redact, never under.
  // Session-69 (S69-1, AUDIT-1 F1 — live-probed): the value alternation
  // consumes a QUOTED TAIL before the bare run — libpq's query values
  // may be single-quoted containers ('my secret'), and the bare run
  // ([^&\s"']*) stopped at the opening quote, printing the quoted tail
  // verbatim after the mask. The quoted alternative consumes to the
  // closing quote (or the run's end — unclosed quotes are exactly the
  // residue class these warnings print); the double-quoted form
  // over-redacts the same way (the container doctrine does not care
  // which quote char opened it).
  // Session-70 (S70-1, AUDIT-1 M-1 — live-probed): the key face widens
  // to `\s*=\s*` — libpq's documented keyword grammar makes spaces
  // around the equals sign OPTIONAL ("keyword = value"), and the tight
  // `=` left the sanctioned spaced spelling (password = topsecret)
  // UNMASKED through every arm (the live probe printed it verbatim).
  // Session-70 (S70-2, AUDIT-1 L-1 — live-probed): the bare run drops
  // the quote chars (`[^&\s"']*` → `[^&\s]*`) — a quote only opens a
  // container when it LEADS the value (the first two alternation arms
  // own that case); an interior quote is VALUE material, and the old
  // run printed the post-quote tail (`password=***'cd`). The
  // over-redaction acceptance: an empty spaced password masks the
  // following token — the safe direction (the S65-1 doctrine).
  // Session-71 (S71-1b/S71-3b, AUDIT-1 M-1/L-1 — live-probed): the
  // query pass takes the SAME escape-aware quoted arms as the keyword
  // pass above (the S69-1 containers closed at the first same-quote
  // char — the sanctioned \' escape spelling (?password='p\'ass')
  // and the leading-" trailing-junk face (?password="qu"oted123)
  // printed their tails through this pass too), and the bare run
  // widens `[^&\s]*` → `[^&]*` — in URI form libpq's value scan runs
  // to &/end, so an interior control char (or any whitespace) inside
  // the run is VALUE material (?password=pa<TAB>ss printed
  // password=***<TAB>ss on the residue arms while the message named
  // the very char it was printing); the &-stop and the registered
  // unencoded-& tail boundary are unchanged (libpq genuinely stops
  // there).
  // Session-75 (S74-1b, AUDIT-1 M-1 — live-probed through both file-side
  // printers): the pass moves from LAST to SECOND (keyword → query →
  // scheme). The old order let the scheme arm's token
  // lastIndexOf("@") land INSIDE a URI-query password carrying a raw
  // @ (legal in query values, RFC 3986) — masking only up to that @
  // and KEEPING the post-@ tail in clear ('?password=Hunter2@Winter2024!'
  // printed ***@Winter2024!) while consuming the very ?password= trigger
  // this pass needed, so the pass never fired on the arm's output. The
  // S71-2b disjointness argument inverts cleanly for the new order: the
  // keyword output never carries [?&]password= (a space is neither ?
  // nor &), and the query output never carries a bare @ for the scheme
  // arm to misattribute — every pinned shape is byte-identical (the
  // fixture suite is the gate); only the leak shapes change. The tail
  // return's own copy of this pass is RETIRED (the scheme arm inserts
  // only ***, never a new [?&]password= shape — a second application
  // would be dead code, the S48 one-idiom doctrine).
  const queryMasked = keywordMasked.replace(
    /([?&](?:password|passfile|sslpassword)\s*=\s*)('(?:[^'\\]|\\.)*'?[^&]*|"(?:[^"\\]|\\.)*"?[^&]*|[^&]*)/gi,
    "$1***",
  );
  let masked: string;
  const schemeMatch = /([A-Za-z][A-Za-z0-9+.-]*:\/\/)/.exec(queryMasked);
  if (!schemeMatch) {
    // S66-1 face 2: the scheme-less value — mask to the last @ when
    // one rides the input (over-redact; the safe direction). On a
    // query-masked input this is the S71-2b payoff: the keyword pass
    // already ate every @ the password carried, so the key
    // prefix survives when no other @ rides the value.
    const at = queryMasked.lastIndexOf("@");
    masked = at === -1 ? queryMasked : "***" + queryMasked.slice(at);
  } else {
    const scheme = schemeMatch[1];
    const afterScheme = schemeMatch.index + scheme.length;
    const token = /^[^\s"']*/.exec(queryMasked.slice(afterScheme))?.[0] ?? "";
    const tokenAt = token.lastIndexOf("@");
    if (tokenAt !== -1) {
      masked = queryMasked.slice(0, afterScheme) + "***" + token.slice(tokenAt) + queryMasked.slice(afterScheme + token.length);
    } else {
      // The control-char face: the password held whitespace/control
      // bytes, so the token run ends before its @ — mask to the
      // input's LAST @.
      const restAt = queryMasked.lastIndexOf("@");
      if (restAt > afterScheme) {
        masked = queryMasked.slice(0, afterScheme) + "***" + queryMasked.slice(restAt);
      } else if (restAt !== -1) {
        // S66-1 face 3: the @ rides BEFORE the scheme — mask the WHOLE
        // prefix (slicing from afterScheme would keep the credential
        // in the prefix it skips over).
        masked = "***" + queryMasked.slice(restAt);
      } else {
        masked = queryMasked;
      }
    }
  }
  return masked;
}

// Session-63 (S63-1, AUDIT-1 M1 — live-probed): the inert-VALUE
// divergence warning, the residue seam's clean-value sibling. The
// round's decisive probe (env -u DATABASE_URL, a node-booted standalone
// server, a schema-only db/alt.db with 0 users behind a clean absolute
// value in the repo .env): /api/health answered db:up AND the
// demo-credentials login answered 200 with the SEEDED user — the engine
// served the DEFAULT db's user from a file the operator's .env never
// named — with ZERO [boot] warnings (the clean-value early return in
// the residue seam below). The S47-2 shadow-file genus one face deeper:
// not a shadow FILE, an inert VALUE — the operator's belief that .env
// is the source of truth is silently wrong, with zero signal. This seam
// speaks for that posture: a CLEAN value on a leg the runtime never
// reads (runtimeConsumesFile: false — the S62-2 leg discriminator)
// diverges from what the engine will actually open.
export function databaseUrlInertValueWarning(
  env: { NODE_ENV?: string | undefined; DATABASE_URL?: string | undefined },
  envFileUrl: string | undefined,
  runtimeConsumesFile: boolean = true,
): string | null {
  // A SET process-env face owns the signal (the one-owner doctrine —
  // the runtime honors the override; warning about the file value
  // would be a false alarm).
  const envUrl = env.DATABASE_URL?.trim() || undefined;
  if (envUrl) return null;
  const fileUrl = envFileUrl?.trim() || undefined;
  if (fileUrl === undefined || fileUrl === "") return null;
  // Residue values belong to the residue seam (one face one pin); this
  // seam speaks only for CLEAN values (the shape that never warns
  // anywhere else).
  if (dbUrlCarriesResidue(fileUrl)) {
    return null;
  }
  // The consumed leg honors the file value (the db-path seam's own .env
  // parse feeds the runtime there) — no divergence to name.
  if (runtimeConsumesFile) return null;
  // The raw DEFAULT spelling lands on the same file the default itself
  // resolves to (the schema rule) — the .env.example contract must
  // never warn. The designed approximation: a NON-repo PWD carrying
  // the default spelling would resolve elsewhere but stays silent (the
  // false-negative corner, named here; the value is inert either way).
  // The literal mirrors db-path's DEFAULT_DATABASE_URL — importing it
  // would drag the seam's heavyweight trace into the instrumentation
  // artifact (the S59-1b lightweight-trace doctrine).
  if (fileUrl === "file:../db/custom.db") return null;
  return (
    `[boot] the .env DATABASE_URL=${JSON.stringify(redactCredentials(fileUrl))} here is never read by this server ` +
    "(the process environment carries no DATABASE_URL and the db-path seam's runtime reads only the server CWD's .env — " +
    "the S51-1 launch-dir family), so the engine resolves the default file:../db/custom.db instead " +
    "(the session-63 live probe: a clean non-default .env value under a node boot served the seeded user from the " +
    "default db while the operator's file carried none — the value is inert, not honored). " +
    "Fix: export DATABASE_URL in the server's environment (a systemd Environment= line, a docker -e), " +
    "or boot with bun run start, which loads this .env."
  );
}

// Session-47 (S47-2): the shadowing-env-file warning — a pure seam in
// the bootEnvCheck family. WHY: the db-path seam's bun-absolutization
// recovery signature reads ONLY .env (readDatabaseUrlFromEnvAt — the
// S46-9 .env-only face), but the env loaders honor the standard
// cascade (see S48-2 below). A DATABASE_URL carried in a shadowing
// file lands in process.env outside the seam's loader rules — it
// matches neither signature arm and is honored as an intentional
// override (the S48-3 truth): a RELATIVE value still re-anchors
// inside the repo (a different file — the validated module anchor
// owns relative refs), an ABSOLUTE one is honored verbatim (the
// seam's by-design absolute-override contract, db-path.ts's "absolute
// URLs are intentional overrides"). The real hazard: the operator's
// belief that .env is the source of truth is silently wrong, with
// zero signal. The warn-only posture (never fatal) follows the
// S13-1 doctrine: a shadowing file may be a legitimate override the
// operator chose; the warning declares the posture. The
// injectable-exists pattern (cwdFallbackUrl's, session-45): the seam
// stays pure over (dir, env, exists) so the unit pins never touch the
// disk. The .env file ITSELF is never a candidate — it is the file
// the seam's signature arms read.
//
// Session-48 (S48-2, AUDIT-1 M2): the candidates mirror Next's ACTUAL
// cascade (verified in the installed @next/env loadEnvConfig):
// [.env.${d}.local, d!=="test"&&.env.local, .env.${d}, ".env"] — the
// S47-2 seam checked two of the four, so the standard-convention
// operator (a DATABASE_URL in .env.production.local, the FIRST file
// loaded) got zero warning. minus ".env" itself; the test-mode skip
// of .env.local mirrors Next exactly (a test run never loads it — a
// stray .env.local cannot shadow anything there, warning for it
// would be noise).
//
// Session-49 (S49-6, AUDIT-1 L1): the mode-derivation hedge — the
// FILE LIST mirrors Next exactly, but the MODE mechanism differs at
// the edges: Next derives d from the dev flag (NODE_ENV only gates
// the "test" case), while this mirror (and bun's own env loader,
// live-verified) key off NODE_ENV. The three canonical postures
// (next dev, next start/standalone, test) agree exactly on both
// engines; a mismatched NODE_ENV/phase posture (e.g. NODE_ENV=
// production next dev) can diverge — an unsupported shape, documented
// here rather than probed (the union-probe alternative doubles the
// candidate set for a posture nobody runs).
//
// Session-49 (S49-11, AUDIT-1 I1): the rewrite-regime hedge on the
// warning's relative-value claim — in the pinned-bun 1.3.14 regime
// (live-verified at session 49) a relative shadow-file value reaches
// process.env RAW (no absolutization in any probed shape) and
// re-anchors inside the repo. A future absolutizing runtime would
// hand the seam an ABSOLUTE value (honored verbatim, potentially
// OUTSIDE the repo) — db-path.ts's header documents the rewrite as
// invocation/version-conditional; that note is the deep contract
// this warning's operator-facing prose simplifies.
export function shadowingEnvFileWarnings(
  dir: string,
  env: { NODE_ENV?: string | undefined },
  exists: (path: string) => boolean = existsSync,
): string[] {
  const mode = env.NODE_ENV ?? "development";
  const candidates = [
    `.env.${mode}.local`,
    mode !== "test" && ".env.local",
    `.env.${mode}`,
  ].filter((name): name is string => name !== false);
  const found = candidates.filter((name) => exists(join(dir, name)));
  return found.map(
    (name) =>
      `[boot] a shadowing ${name} exists at ${dir} — the db-path seam's recovery signature reads only .env, so a DATABASE_URL defined in ${name} is honored as an intentional override (a relative value re-anchors inside the repo, an absolute one is honored verbatim) — move the value into .env, or declare the override deliberately (see docs/DEPLOYMENT.md §4)`,
  );
}

// Session-47 (S47-2, the build calibration): the SERVER wiring face —
// instrumentation.ts is compiled for BOTH runtimes (Next compiles the
// hook for node and edge alike), and a DIRECT process.cwd() call in
// its module body trips Turbopack's edge compile ("a Node.js API is
// used … not supported in the Edge Runtime" — the warning shipped
// once at birth and was cured in the same round). The cwd read lives
// HERE instead: this module is reached only through the dynamic
// import inside register()'s POST-EDGE-GUARD branch, so the edge
// compile of instrumentation.ts never statically sees it (the
// next-runtime guard returns before the import executes on edge).
// The pure seam above stays pure — this wrapper is the Node-only
// adapter, the applyBootEnvReport pattern's shadow sibling.
// Session-50 (S50-1, AUDIT-1 M1): the wrapper probes the DEDUPED UNION
// of the cwd and PWD. The standalone server.js runs
// process.chdir(__dirname) BEFORE next loads, so in the
// bun-run-start posture the cwd at register() sits in
// .next/standalone — a cwd-only probe never saw the LAUNCH dir (the
// repo root) where bun loaded the env files, leaving the S47-2 warning
// inert for repo-root shadow files (live-probed: the shadow file's
// DATABASE_URL reached the server with zero signal). bun inherits
// PWD = the launch cwd and the chdir never updates it, so the union
// covers both postures; the dev/start postures (no chdir) keep
// cwd === PWD and probe exactly once (the dedupe arm).
// Session-51 (S51-1, AUDIT-1 L1): the PWD leg normalizes before
// compare/push — the S50-1 union deduped by STRING identity, so a
// symlink alias of the cwd warned twice for one physical shadow file,
// a trailing-slash spelling did the same, and a RELATIVE PWD probed
// the wrong directory with a misleading path in the warning. Now:
// absolute only (a relative PWD names the SHELL's dir at spawn time —
// uninterpretable, skipped), resolve()-normalized (trailing slashes
// and .. segments fold onto the canonical form), and deduped against
// the cwd through a best-effort statSync dev/ino IDENTITY comparison
// (Session-52, S52-5: a symlink spelling of the SAME physical dir as
// the cwd adds nothing — the cwd leg already probes it; inode
// identity, not path spelling, is the same-file test — a case-variant
// PWD of the cwd on a case-insensitive filesystem survives a realpath
// STRING compare but not dev/ino).
// Session-51 (AUDIT-1 I1): the PWD face rides on the launch shell
// setting it — a PWD-less process manager (systemd-style units,
// exec-form containers) falls back to the cwd-only probe; no such
// posture is documented today (DEPLOYMENT.md ships bun run start).
// Session-59 (S59-1): the cwd ∪ PWD union extracted to ONE home — the
// shadow wrapper and the file-face residue wrapper below probe the
// same dirs (the S50-1/S51-1/S52-5 lineage; the dedupe/normalize/
// identity rules moved verbatim out of shadowingEnvFileWarningsForServer,
// a pure refactor its pins hold green for — one dir list, never two
// that can diverge).
function serverEnvProbeDirs(): string[] {
  const cwd = process.cwd();
  const dirs = [cwd];
  const pwd = process.env.PWD;
  if (pwd && isAbsolute(pwd)) {
    const norm = resolve(pwd);
    if (norm !== cwd) {
      let samePhysicalDir = false;
      try {
        // Session-52 (S52-5, AUDIT-1 L1): identity, not spelling — the
        // S51-1 realpathSync STRING compare survives its own case face
        // on case-insensitive filesystems (macOS dev postures: a
        // case-variant PWD reads distinct in both the string compare
        // and realpath's output, double-warning the same physical
        // file). statSync follows symlinks exactly like realpathSync;
        // dev/ino is the canonical same-file test, alias- and
        // case-robust in one home. On Linux (the documented target) a
        // case-variant spelling of an existing dir simply ENOENTs into
        // the catch — the face is macOS-only, unobservable in this
        // repo's Linux sandbox (the S52-5 battery's honest result).
        const pwdStat = statSync(norm);
        const cwdStat = statSync(cwd);
        samePhysicalDir = pwdStat.dev === cwdStat.dev && pwdStat.ino === cwdStat.ino;
      } catch {
        // best-effort only — a missing PWD target probes below (the
        // probe itself finds no env files in a missing dir).
      }
      if (!samePhysicalDir) dirs.push(norm);
    }
  }
  return dirs;
}

// Session-47 (S47-2): the shadowing-env-file warning — the SERVER
// wiring face. The cwd read and the PWD union live in
// serverEnvProbeDirs (shared with the file-face wrapper below since
// session-59); this wrapper keeps its own pure seam
// (shadowingEnvFileWarnings) per dir.
export function shadowingEnvFileWarningsForServer(
  env: { NODE_ENV?: string | undefined },
): string[] {
  const out: string[] = [];
  for (const d of serverEnvProbeDirs()) {
    out.push(...shadowingEnvFileWarnings(d, env));
  }
  return out;
}

// Session-59 (S59-1): the file-face residue wrapper — reads each probe
// dir's .env DATABASE_URL through the db-path seam's OWN parser
// (parseEnvFile — the one-home parse: the warning's predicate and the
// runtime consumption share one parser, so they can never diverge on
// the PARSE face) and routes it through the pure seam with the live
// process env. (Session-62, S62-2 — live-probed: one parser, TWO legs
// — the runtime tail consumes only the SERVER CWD's .env, so the PWD
// leg passes runtimeConsumesFile=false and its message names the
// inert-residue truth; a warning claiming the engine would fail fired
// on a PWD-leg residue while the server booted healthy against the
// real db.) The PWD-less process-manager boundary inherits the S51-1
// register (the union is cwd-only there; the db-path seam's
// module-anchor recovery may still consume a launch-dir .env the
// union cannot see — the same documented boundary the shadow wrapper
// carries).
export function databaseUrlFileResidueWarningsForServer(
  env: { NODE_ENV?: string | undefined; DATABASE_URL?: string | undefined },
): string[] {
  const out: string[] = [];
  for (const d of serverEnvProbeDirs()) {
    const envPath = join(d, ".env");
    let envFileUrl: string | undefined;
    if (existsSync(envPath)) {
      envFileUrl = parseEnvFile(readFileSync(envPath, "utf8")).DATABASE_URL;
    }
    // Session-62 (S62-2): the leg discriminator — the runtime reads
    // only the SERVER CWD's .env, so a PWD-leg residue never reaches
    // the engine (the round's live probe: a healthy boot against the
    // real db while the PWD-leg warning fired). The pure seam needs
    // the leg to speak the true mechanism sentence.
    const warning = databaseUrlFileResidueWarning(env, envFileUrl, d === process.cwd());
    if (warning !== null) out.push(warning);
    // Session-63 (S63-1): the clean-value sibling on the same leg —
    // a non-default value the runtime never reads diverges from what
    // the engine will open, with zero signal anywhere else (the
    // round's live probe: the seeded user served from the default db
    // while the operator's .env carried none).
    const inert = databaseUrlInertValueWarning(env, envFileUrl, d === process.cwd());
    if (inert !== null) out.push(inert);
  }
  return out;
}
