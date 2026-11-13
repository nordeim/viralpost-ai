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
import { existsSync } from "node:fs";
import { join } from "node:path";

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

/**
 * Validate an env-shaped record against the six-knob contract.
 * PURE: same input, same report — tests drive every branch without a
 * process (tests/boot-env.test.ts).
 */
export function bootEnvCheck(env: Record<string, string | undefined>): BootEnvReport {
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
    if (malformed) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${siteUrl}" could not be parsed as an http(s) origin — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards fall back to http://localhost:3000 until it is fixed. Set the canonical origin (e.g. https://viralpost.example.com) BEFORE \`bun run build\` (it is inlined at build time).`,
      );
    }
    if (pathCarrying) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${siteUrl}" carries a path — the value must be the bare ORIGIN. The site seam falls back to http://localhost:3000 until it is fixed (S28-1 — a path prefix used to compose inconsistently across metadataBase/canonicals and the twitter:url cards); set e.g. https://viralpost.example.com with no trailing path.`,
      );
    }
    if (queryCarrying) {
      warnings.push(
        `[boot] NEXT_PUBLIC_SITE_URL="${siteUrl}" carries a query string (or fragment/credentials) — the value must be the bare ORIGIN. A query rides unescaped into /sitemap.xml's <loc> values (invalid XML) and composes broken og:url/canonical paths; the site seam falls back to http://localhost:3000 until it is fixed.`,
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
  const siteUrlIsLoopback = (() => {
    if (!siteUrl) return false;
    try {
      const host = new URL(siteUrl).hostname.replace(/\.$/, "");
      return host === "localhost" || host === "127.0.0.1";
    } catch {
      return false;
    }
  })();
  if (isProduction && (!siteUrl || siteUrlIsLoopback)) {
    warnings.push(
      `[boot] NEXT_PUBLIC_SITE_URL is ${
        siteUrl ? `"${siteUrl}"` : "unset"
      } in production — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards would advertise a localhost origin. Set the canonical public origin BEFORE \`bun run build\` (it is inlined at build time).`,
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

// Session-47 (S47-2): the shadowing-env-file warning — a pure seam in
// the bootEnvCheck family. WHY: the db-path seam's bun-absolutization
// recovery signature reads ONLY .env (readDatabaseUrlFromEnvAt — the
// S46-9 .env-only face), but the env loaders honor the standard
// cascade (.env.local and .env.<NODE_ENV> beat .env). A DATABASE_URL
// carried in a shadowing file lands in process.env outside the seam's
// loader rules — it matches neither signature arm and is honored as
// an "intentional override," potentially pointing the process at a
// database outside the repo (the founding wrong-DB shape) with zero
// operator signal. The warn-only posture (never fatal) follows the
// S13-1 doctrine: a shadowing file may be a legitimate override the
// operator chose; the warning declares the posture. The
// injectable-exists pattern (cwdFallbackUrl's, session-45): the seam
// stays pure over (dir, env, exists) so the unit pins never touch the
// disk. The .env file ITSELF is never a candidate — it is the file
// the seam's signature arms read.
export function shadowingEnvFileWarnings(
  dir: string,
  env: { NODE_ENV?: string | undefined },
  exists: (path: string) => boolean = existsSync,
): string[] {
  const candidates = new Set([".env.local", `.env.${env.NODE_ENV ?? "development"}`]);
  const found = [...candidates].filter((name) => exists(join(dir, name)));
  return found.map(
    (name) =>
      `[boot] a shadowing ${name} exists at ${dir} — the db-path seam's recovery signature reads only .env, so a DATABASE_URL defined in ${name} is honored as an unvalidated override (move the value into .env, or declare the override deliberately — see docs/DEPLOYMENT.md §4)`,
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
export function shadowingEnvFileWarningsForServer(
  env: { NODE_ENV?: string | undefined },
): string[] {
  return shadowingEnvFileWarnings(process.cwd(), env);
}
