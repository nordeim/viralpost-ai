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
  const dbUrl = env.DATABASE_URL;
  if (
    dbUrl !== undefined && dbUrl !== "" &&
    (/\p{Cc}/u.test(dbUrl) || dbUrl.startsWith('"') || dbUrl.startsWith("'"))
  ) {
    // Session-60 (S60-1): the attribution splits by trigger face. The
    // predicate fires on THREE faces — the leading quote (kept by BOTH
    // sanctioned loaders — the session-61 S61-1 probe census), the
    // embedded newline (the S57-1 span genus:
    // an unclosed quote in .env spanning lines IS the usual cause of a
    // newline in the value, so that face KEEPS the unclosed-quote story
    // and the close-the-quote fix), and every OTHER control character
    // (a pasted tab or platform artifact on an unquoted line — no
    // quote is involved, so the quote headline and the quote fix were
    // misattributions for this face; the round's probes: the seam
    // re-anchors a tab-bearing file: value into the junk-named file
    // exactly like the newline span, and passes a tab-bearing non-file:
    // value through raw). The `file:` branch is reachable ONLY by
    // control-char values (a leading-quote value can never start with
    // `file:`) — before the split its "unclosed quote" headline was
    // false for every value that reached it.
    const quoteFace = dbUrl.startsWith('"') || dbUrl.startsWith("'");
    const controlFace = /\p{Cc}/u.test(dbUrl);
    const newlineFace = controlFace && (dbUrl.includes("\n") || dbUrl.includes("\r"));
    // Session-63 (S63-2): the printed value is REDACTED (a credentialed
    // postgres URL never leaks its password to stdout/server.log — the
    // residue shape stays, the userinfo segment goes); the branch
    // conditions below still test the RAW value (the parse truth).
    const shown = JSON.stringify(redactCredentials(dbUrl));
    warnings.push(
      dbUrl.startsWith("file:")
        ? (newlineFace
            ? `[boot] DATABASE_URL=${shown} carries an unclosed quote residue from .env (a control character rides the value — the session-57 S57-1 loader-span genus) — the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021). Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`
            : `[boot] DATABASE_URL=${shown} carries a control character from .env (a stray control character rides the value — no quote is involved, the session-60 S60-1 census) — the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-60 seam probe re-anchored the tab-bearing value exactly like the newline span). Fix the .env: remove the control character from the DATABASE_URL value.`)
        : (quoteFace
            ? `[boot] DATABASE_URL=${shown} carries an unclosed quote residue from .env — the value does not start with "file:", so the db-path seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation (no junk file is created; static pages still serve while every DB route fails). Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`
            : `[boot] DATABASE_URL=${shown} carries a control character from .env (a stray control character rides the value — no quote is involved, the session-60 S60-1 census) — the value does not start with "file:", so the db-path seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation (no junk file is created; static pages still serve while every DB route fails). Fix the .env: remove the control character from the DATABASE_URL value.`),
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
  if (!( /\p{Cc}/u.test(fileUrl) || fileUrl.startsWith('"') || fileUrl.startsWith("'") )) {
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
  const quoteFace = fileUrl.startsWith('"') || fileUrl.startsWith("'");
  // Session-63 (S63-2): the printed value is REDACTED (the userinfo
  // segment of a credentialed URL never prints; the residue shape —
  // the diagnostic — stays); the branch conditions below still test
  // the RAW value.
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
    const headline = quoteFace ? "an unclosed quote residue" : "a control character";
    const fix = quoteFace
      ? 'close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db")'
      : "remove the control character from the DATABASE_URL value";
    return `${prefix} carries ${headline} — ${unseen}; this directory is the PWD leg and the db-path seam's runtime reads only the server CWD's .env, so the engine never sees the residue (it resolves the default URL and boots against the real database) — the malformed line is inert until a loader consumes this file. Fix the .env: ${fix}.`;
  }
  if (quoteFace) {
    return `${prefix} carries an unclosed quote residue — ${unseen}; the db-path seam's own .env parse keeps the quote and hands the engine the value raw, and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation. Fix the .env: close the quote on the DATABASE_URL line (e.g. DATABASE_URL="file:../db/custom.db").`;
  }
  if (fileUrl.startsWith("file:")) {
    return `${prefix} carries a control character — ${unseen}; the db-path seam's own .env parse keeps the control character (an unquoted line's pasted tab — the session-60 S60-1 census), and, the value being file:-prefixed, the runtime re-anchors it into a junk-named file under db/ that still serves a healthy boot against a table-less empty DB (SELECT 1 answers; the first User query fails P2021 — the session-60 seam probe). Fix the .env: remove the control character from the DATABASE_URL value.`;
  }
  return `${prefix} carries a control character — ${unseen}; the db-path seam's own .env parse keeps the control character (an unquoted line's pasted tab — the session-60 S60-1 census), and, the value not starting with "file:", the seam passes it through raw and the Prisma engine answers PrismaClientInitializationError at the first DB-touching invocation. Fix the .env: remove the control character from the DATABASE_URL value.`;
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
  const schemeMatch = /([A-Za-z][A-Za-z0-9+.-]*:\/\/)/.exec(url);
  if (!schemeMatch) return url;
  const scheme = schemeMatch[1];
  const afterScheme = schemeMatch.index + scheme.length;
  const token = /^[^\s"']*/.exec(url.slice(afterScheme))?.[0] ?? "";
  const tokenAt = token.lastIndexOf("@");
  if (tokenAt !== -1) {
    return url.slice(0, afterScheme) + "***" + token.slice(tokenAt) + url.slice(afterScheme + token.length);
  }
  // The control-char face: the password held whitespace/control bytes,
  // so the token run ends before its @ — mask to the input's LAST @.
  const restAt = url.lastIndexOf("@");
  if (restAt > afterScheme) {
    return url.slice(0, afterScheme) + "***" + url.slice(restAt);
  }
  return url;
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
  if (/\p{Cc}/u.test(fileUrl) || fileUrl.startsWith('"') || fileUrl.startsWith("'")) {
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
