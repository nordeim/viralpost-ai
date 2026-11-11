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

/** The closed VIRALPOST_* knob set (the six-knob contract's 3 server knobs). */
export const KNOWN_VIRALPOST_VARS: ReadonlySet<string> = new Set([
  "VIRALPOST_PROXY_HOPS",
  "VIRALPOST_DISABLE_IN_APP_OTP",
  "VIRALPOST_DISABLE_IN_APP_RESET",
]);

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
  if (isProduction && (!siteUrl || /localhost|127\.0\.0\.1/.test(siteUrl))) {
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
  for (const key of Object.keys(env)) {
    if (key.startsWith("VIRALPOST_") && !KNOWN_VIRALPOST_VARS.has(key)) {
      warnings.push(
        `[boot] Unknown VIRALPOST_* environment variable ${key} — the known knobs are: ${[...KNOWN_VIRALPOST_VARS].join(
          ", ",
        )}. A typo here silently no-ops (the closed set is read verbatim).`,
      );
    } else if (key.startsWith("NEO_")) {
      const mapped = `VIRALPOST_${key.slice(4)}`;
      warnings.push(
        KNOWN_VIRALPOST_VARS.has(mapped)
          ? `[boot] Legacy NEO_* environment variable ${key} — the knob names were renamed NEO_* → VIRALPOST_* (session 2); the code reads the VIRALPOST_* spelling, so ${key} is inert here. Set ${mapped} instead.`
          : `[boot] Legacy NEO_* environment variable ${key} — the knob family was renamed NEO_* → VIRALPOST_* (session 2); no knob maps to this name. The known knobs are: ${[
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
