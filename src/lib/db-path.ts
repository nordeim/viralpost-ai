// SQLite path normalization (contract pinned by tests/db-path.test.ts).
//
// The Prisma CLI resolves relative `file:` URLs against prisma/schema.prisma;
// the runtime must follow the SAME rule so `next dev`, `next build` and the
// standalone server all land on <repo>/db/custom.db regardless of the
// process working directory.
//
// Anchor order:
//  1. Next standalone output — `server.js` runs `process.chdir()` into
//     .next/standalone, whose traced prisma/schema.prisma copy would
//     otherwise capture the CWD rule. Recognize that folder and return the
//     real repo two levels up.
//  2. This module's own repo root (validated by the source file existing
//     on disk — the module's import.meta.url resolves to the REAL file
//     path at runtime in the Turbopack build: the compiled chunk calls
//     the runtime getter e.F("src/lib/db-path.ts"), which anchors on the
//     chunk's actual location — a VIRTUAL path only in the webpack-era
//     builds the original comment described).
//  3. process.cwd() as a last resort.
//
// Session-47 (S47-1, AUDIT-1 M1 — the artifact-deploy truth, live-probed
// on the built artifact): in the artifact-only deploy shape (the
// standalone tree copied elsewhere, no repo root) the MODULE anchor
// wins, NOT the CWD arm — the artifact ships both src/lib/db-path.ts
// (runtime-resolvable) and prisma/schema.prisma, so anchor 2 validates
// the artifact root and urlForRoot mkdirs <artifact>/db on demand. The
// probed boot: /api/health answered healthy while <artifact>/db/
// custom.db was created as a 0-byte file — a fresh artifact serves a
// HEALTHY 200 against a table-less empty DB (SELECT 1 succeeds; the
// first User query P2021s). The operator's fresh-artifact playbook:
// run db:push (or restore a db file) at <artifact>/db/custom.db, or
// set an absolute DATABASE_URL per DEPLOYMENT.md §4/§7. The CWD arm
// fires only when BOTH validated anchors miss (a stripped artifact /
// an import.meta.url failure).
//
// Anchors 1–2 are VALIDATED (a prisma/schema.prisma really exists at the
// root they report), so their candidate is accepted unconditionally and the
// database folder is created on demand (first boot). Falling through with
// the raw relative URL instead would hand the path to the Prisma engine,
// which resolves it against the process CWD — landing one directory
// OUTSIDE the repo. That exact bug shipped once: the dev server opened
// /home/z/my-project/db/custom.db while the repo expected
// <repo>/db/custom.db.
//
// BUN ABSOLUTIZATION (the second half of that same bug): when bun runs a
// script (`bun run dev`, `bun run db:seed`, `bun x prisma …`) it loads the
// repo .env AND rewrites a relative `file:` DATABASE_URL into an ABSOLUTE
// path resolved against THE .ENV FILE'S OWN DIRECTORY. With the mandated
// root contract DATABASE_URL="file:../db/custom.db" that absolute path is
// <parent-of-repo>/db/custom.db — outside the repo — and it sails through
// resolveDatabaseUrl untouched (absolute URLs are passed through by
// design, e.g. for production deployments). effectiveDatabaseUrl detects
// exactly that signature (env var == absolutization of the .env value) and
// re-derives the URL from the RAW .env value via the schema rule. Any other
// env value (a caller override such as the e2e suite's file:../db/e2e.db,
// a postgres URL, a production absolute path) is respected as-is.
// (Session-45, S45-2 — the truth hedge: the rewrite is INVOCATION- and
// VERSION-CONDITIONAL, not an invariant. F11-18 live-reproduced it end
// to end on `bun run start`, and the parent-of-repo signature is real in
// deployed shapes; but session-45's fresh probe on the pinned bun 1.3.14
// saw the RAW relative value through `bun <file>`, `bun run <script>`,
// `bun -e`, and `bun x prisma` alike — no rewrite in any probed shape.
// The seam is regime-agnostic either way: without the rewrite the raw
// relative value misses both signature arms and resolves correctly
// through the anchor tail; with it, the signature arms catch it. Both
// postures land on <repo>/db/custom.db — the guard below exists for the
// shapes that DO rewrite, whenever and wherever they occur.)

// Session-41 (S41-14): the node: prefixes join the S40-12 normalization
// (crypto's scope) — this module was the last bare-specifier holdout
// under src/ (fs/path/url; scripts/prisma-env.ts already rode
// node:child_process). This note block itself grew the file 335→339;
// PAD §12's row re-anchored in the same commit. (Session-42, S42-1:
// the tail originally read "Line-in-place; PAD §12's row is unchanged"
// — the plan's prediction, not the shipped state.)
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_DATABASE_URL = "file:../db/custom.db";

function repoRootFromModule(): string | null {
  try {
    const here = dirname(fileURLToPath(import.meta.url)); // <repo>/src/lib
    const root = resolve(here, "..", "..");
    if (existsSync(join(root, "prisma", "schema.prisma"))) return root;
  } catch {
    // import.meta.url unavailable (unusual runtime) — fall through.
  }
  return null;
}

function repoRootFromStandaloneCwd(dir: string = process.cwd()): string | null {
  try {
    // Session-22 (S22-17): the basename PAIR, not a substring — the
    // loose `includes(".next")` gate accepted decoy layouts (any path
    // containing the substring anywhere, e.g. `.next-misc/standalone-ish`).
    if (basename(dir) !== "standalone" || basename(dirname(dir)) !== ".next") {
      return null;
    }
    // <repo>/.next/standalone -> <repo>
    const root = resolve(dir, "..", "..");
    if (existsSync(join(root, "prisma", "schema.prisma"))) return root;
  } catch {
    // ignore
  }
  return null;
}

/**
 * Absolute `file:` URL for a schema-relative reference, anchored at a
 * VALIDATED repo root. Creates the database's parent directory on demand
 * (first boot) so the Prisma engine never receives a relative URL from a
 * proven anchor.
 */
export function urlForRoot(root: string, ref: string): string {
  const candidate = join(root, "prisma", ref); // mirror the CLI rule
  mkdirSync(dirname(candidate), { recursive: true });
  return `file:${candidate}`;
}

// Session-33 (S33-2): the Windows-absolute ref family — a drive letter
// (C:\ or C:/) or a UNC lead (\\server\share). The seam's absoluteness
// tests were POSIX-only (startsWith("/")), so both fell through to the
// anchors and re-anchored into <repo>/prisma/C:\… junk (live-probed:
// resolveDatabaseUrl("file:C:\db\custom.db") answered
// "file:<repo>/prisma/C:\db\custom.db") — the S30/S31/S32 wrong-DB genus
// on the one platform the seam didn't model. No live caller on this
// Linux deployment (DEPLOYMENT.md documents POSIX absolutes); on a
// Windows bun host the documented production form would corrupt. A
// literal regex, NOT path.isAbsolute — that helper is platform-dependent,
// and this seam must recognize BOTH platform forms on ANY host (the
// header contract: "absolute URLs are passed through by design").
const WINDOWS_ABSOLUTE_REF = /^[A-Za-z]:[\\/]|^\\\\/;

function isAbsoluteFileRef(ref: string): boolean {
  return ref.startsWith("/") || WINDOWS_ABSOLUTE_REF.test(ref);
}

// Session-44 (S44-1): the one-home tail decomposition — split a
// relative file: ref into its clean path and its `?query`, DROPPING
// any `#fragment` (the engine bakes a fragment into the filename —
// the literal "x.db#frag" file — while it parses a query as
// connector config; see the resolveDatabaseUrl comment for the
// probe evidence and the S43-6 premise correction). Consumed by
// resolveDatabaseUrl AND the standalone-launch recovery arm below —
// the S43-6 strip covered only the former, leaving the launch arm
// baking fragment junk (the coverage gap S44-1b pins).
function decomposeFileRef(ref: string): { pathRef: string; query: string } {
  const hashAt = ref.indexOf("#");
  const hashless = hashAt === -1 ? ref : ref.slice(0, hashAt);
  const queryAt = hashless.indexOf("?");
  return {
    pathRef: queryAt === -1 ? hashless : hashless.slice(0, queryAt),
    query: queryAt === -1 ? "" : hashless.slice(queryAt),
  };
}


// Session-45 (S45-1): the CWD last-resort arm's decision, extracted as a
// pure seam — in the unit environment the module anchor ALWAYS wins
// (repoRootFromModule resolves from this file's own import.meta.url), so
// resolveDatabaseUrl's tests can never reach the arm (the A1 coverage
// gap: the S44-1 query re-append on this arm shipped with zero pins —
// revertable through a green gate). urlForRoot's own testing precedent:
// the seam is exported and pinned directly. The arm is
// production-reachable ONLY when BOTH validated anchors miss (a
// stripped artifact without src/lib + prisma/schema.prisma, or an
// import.meta.url failure — see the S47-1 header note above) and
// fires only when the CWD already carries the target's parent
// directory: for the mandated ref the dirname check tests <cwd>/db
// (candidate = join(cwd, "prisma", "../db/custom.db") normalizes to
// <cwd>/db/custom.db). The traced prisma/ folder satisfies the check
// only for a `file:custom.db`-style ref (dirname = <cwd>/prisma,
// which the trace DOES ship) — for the mandated `file:../db/...` ref
// the arm needs an operator-supplied <cwd>/db folder, else null →
// the raw URL pass-through (an absolute DATABASE_URL is the
// DEPLOYMENT.md §4 recommendation either way).
// (Session-47, S47-1 — the artifact-deploy TRUTH, live-probed on the
// built artifact: in the artifact-only shape the MODULE anchor owns
// resolution and the CWD arm NEVER fires — the S46-2 sentence that
// placed the raw pass-through posture on the fresh artifact was
// wrong. See the anchor-order header at the top of this file.)
export function cwdFallbackUrl(
  cwd: string,
  pathRef: string,
  query: string,
  exists: (path: string) => boolean = existsSync,
): string | null {
  // Accept only when the target (or at least its parent directory — the
  // Prisma/SQLite engine then creates the file there) already exists
  // under the CWD — never mkdir from an unproven root (a stray CWD must
  // not grow a db/ beyond what already exists). (Session-22, S22-17:
  // the dirname arm is the real behavior — a present file implies its
  // parent, so the candidate check is the belt-and-braces read.)
  const candidate = join(cwd, "prisma", pathRef); // mirror the CLI rule
  if (exists(candidate) || exists(dirname(candidate))) {
    return `file:${candidate}${query}`;
  }
  return null;
}

export function resolveDatabaseUrl(rawUrl: string): string {
  if (!rawUrl.startsWith("file:")) return rawUrl; // postgres etc. — pass through
  const ref = rawUrl.slice("file:".length);
  // Absolute, or the SQLite in-memory spelling — both pass through
  // (Session-26, S26-9: the `:memory:` ref does NOT start with "/", so
  // it previously fell through to the anchors and re-anchored to a
  // literal <repo>/prisma/:memory: file — the guard comment claimed
  // "in-memory" but the code misrouted it). Session-33 (S33-2): the
  // absoluteness arm now covers the Windows-absolute family too.
  if (!ref || isAbsoluteFileRef(ref) || ref.startsWith(":memory:")) return rawUrl;

  // Session-44 (S44-1): decompose the tail before the joins. The
  // engine PARSES a `?query` on file: URLs (live-probed on this
  // repo's own @prisma/client 6.19.3: file:<path>/q.db?connection_
  // limit=1 opens the CLEAN q.db — params are connector config,
  // never filename characters; socket_timeout compounds, unknown
  // params are ignored), while a `#fragment` BAKES into the filename
  // (the engine creates the literal "x.db#frag" file). Session-43
  // (S43-6) stripped BOTH halves on the false premise "the ?params
  // grammar is Prisma's PostgreSQL connector's, never the SQLite
  // file: connector's" — silently dropping params the engine honors
  // on relative refs while the absolute pass-through arm above kept
  // them, the inconsistent matrix this one-home seam exists to
  // prevent. The corrected contract: resolve the clean path,
  // re-append the query, drop only the fragment. (The absolute and
  // :memory: pass-through arms above keep their documented
  // pass-through-by-design contract — file::memory:?cache=shared is
  // a legitimate SQLite URI spelling.)
  // Session-44 (S44-2): a ref whose path part is EMPTY after the
  // decomposition ("file:?x", "file:#") passes through raw —
  // urlForRoot(root, "") would resolve to the prisma FOLDER itself
  // (live-probed), pointing the operator's Error-14 debugging at a
  // directory. The !ref arm's own posture, applied one family deeper.
  const { pathRef, query } = decomposeFileRef(ref);
  if (!pathRef) return rawUrl;

  // Validated anchors: trust them even on first boot (db/ may not exist
  // yet) — urlForRoot creates the folder.
  const validated: Array<() => string | null> = [
    repoRootFromStandaloneCwd,
    repoRootFromModule,
  ];
  for (const anchor of validated) {
    const root = anchor();
    if (root) return urlForRoot(root, pathRef) + query;
  }

  // Unvalidated last resort (S45-1: the decision lives in the exported
  // cwdFallbackUrl seam — pinned directly; see its header): accept only
  // when the target (or at least its parent directory) already exists
  // under the CWD — never mkdir from an unproven root. A null answer
  // falls back to the raw URL (the caller's own pass-through posture).
  const fallback = cwdFallbackUrl(process.cwd(), pathRef, query);
  if (fallback) return fallback;
  return rawUrl;
}

/**
 * Minimal dotenv parser: quotes stripped, comments/blanks skipped.
 * Session-21 (S21-8): an UNQUOTED trailing inline comment (`KEY=value #
 * note`) is stripped too — bun's own loader does this, and a parser that
 * disagrees breaks the bun-absolutization signature check in
 * `effectiveDatabaseUrl` (the DB then silently lands outside the repo;
 * live-verified divergence on bun 1.3.14). Bun's scan order (verified
 * live, isolated): a QUOTE-OPENED value runs to its matching closing
 * quote (a `#` inside survives; anything after the closing quote is
 * discarded, so `KEY="v" # note` parses as `v`); an unquoted value cuts
 * at the FIRST `#` anywhere — no whitespace guard (bun parses
 * `KEY=abc#def` as `abc`; dotenv would keep it whole, but the seam
 * exists to mirror bun, and a mid-token `#` in an unquoted URL is
 * pathological — quote such values).
 */
export function parseEnvFile(contents: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of contents.split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue; // comment or blank line
    let value = match[2].trim();
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.length >= 2) {
      const closing = value.indexOf(quote, 1);
      if (closing !== -1) value = value.slice(1, closing);
    } else {
      // The unquoted comment strip — bun's rule: the first `#` anywhere.
      const comment = /#/.exec(value);
      if (comment) value = value.slice(0, comment.index).trim();
    }
    out[match[1]] = value;
  }
  return out;
}

function isRelativeFileUrl(url: string | undefined): url is string {
  if (!url) return false;
  if (!url.startsWith("file:")) return false;
  const ref = url.slice("file:".length);
  // Session-33 (S33-2): the Windows-absolute family is NOT relative —
  // misreading a drive-letter/UNC value as a re-anchor candidate sent
  // it through the anchors into <repo>/prisma/C:\… junk.
  return ref.length > 0 && !isAbsoluteFileRef(ref);
}

/**
 * The URL Bun would export for a relative `file:` value loaded from a .env
 * file: the value resolved against the .env file's own directory.
 */
function bunAbsolutized(envFileUrl: string, envFileDir: string): string {
  const ref = envFileUrl.slice("file:".length);
  return `file:${resolve(envFileDir, ref)}`;
}

/**
 * Pick the effective database URL from the two places it can come from:
 * the process environment (possibly rewritten by bun) and the raw .env
 * file. A process-env value that is exactly bun's absolutization of the
 * .env value is treated as derived (re-anchored on the schema rule);
 * anything else wins as an intentional override.
 */
export function effectiveDatabaseUrl(input: {
  envUrl?: string | undefined;
  envFileUrl?: string | undefined;
  envFileDir: string;
}): string {
  // Session-30 (S30-1): an empty string is "unset", never an intentional
  // override. The `if (envUrl && …)` arms always treated "" as unset
  // (falsy), but the tail `??` chain passed it through as a SET override —
  // so a `DATABASE_URL=""` process env (the docker-compose/CI
  // empty-passthrough shape) MASKED a valid .env value, and an empty .env
  // line skipped the DEFAULT_DATABASE_URL fallback a missing line gets.
  // Prisma has no valid empty URL (it fails at first query with "You must
  // provide a nonempty URL"), so "" can never be a legitimate value; both
  // boundary spellings normalize to undefined here, in the one-home seam
  // every consumer already routes through.
  // Session-31 (S31-1): the whitespace-only family joins — `|| undefined`
  // normalizes "" but a quoted-space " " is truthy and rode through as a
  // SET override (the same masking/fallback-skip shapes). No legitimate
  // Prisma URL is whitespace-only; trimming at the one-home boundary keeps
  // the bun-signature comparison consistent on both faces.
  const envUrl = input.envUrl?.trim() || undefined;
  const envFileUrl = input.envFileUrl?.trim() || undefined;
  const { envFileDir } = input;
  if (envUrl && isRelativeFileUrl(envFileUrl)) {
    if (envUrl === bunAbsolutized(envFileUrl, envFileDir)) {
      return resolveDatabaseUrl(envFileUrl);
    }
  }
  return resolveDatabaseUrl(envUrl ?? envFileUrl ?? DEFAULT_DATABASE_URL);
}

/**
 * The DATABASE_URL value of the .env file at `dir`, if one exists.
 * (Session-46, S46-9: deliberately `.env`-ONLY — the launch-recovery
 * signature arms below compare against this value, so a knob carried in
 * `.env.local`/`.env.<NODE_ENV>` matches neither signature and is
 * honored as an intentional override. The repo contract mandates a
 * single `.env` (.env.example, DEPLOYMENT.md §4); bun's own load order
 * prefers .env.local, but no sanctioned shape ships one.)
 */
function readDatabaseUrlFromEnvAt(dir: string): string | undefined {
  const envPath = join(dir, ".env");
  if (existsSync(envPath)) {
    return parseEnvFile(readFileSync(envPath, "utf8")).DATABASE_URL;
  }
  return undefined;
}

/**
 * Runtime convenience: combines process.env.DATABASE_URL with the .env
 * file at `cwd` (if any) through effectiveDatabaseUrl. Used by the Prisma
 * client singleton (src/lib/db.ts), the seed script (prisma/seed.ts) and
 * the CLI wrapper (scripts/prisma-env.ts) so every consumer applies the
 * same rules.
 *
 * STANDALONE LAUNCH RECOVERY (session-34, a donor-ledger number — the
 * NEO-CRM seam's own recovery session; this repo's sessions are
 * docs/session_1..50, the SKILL §0.5 enumeration): the standalone server.js runs
 * `process.chdir(__dirname)` at boot — AFTER bun already absolutized a
 * relative `file:` DATABASE_URL against the LAUNCH directory's .env
 * (typically <repo>/.env via `bun run start` from the repo root). The
 * cwd-side bun signature (computed against the post-chdir cwd, whose .env
 * is the traced .next/standalone copy) then MISSES that value, and the
 * env var would be mistaken for an intentional override — handing the
 * engine a parent-of-repo path that cannot even be created. Before
 * accepting that, test the signature of the .env at the validated
 * standalone repo root (the launch directory). A caller-provided override
 * (e.g. the e2e suite's file:../db/e2e.db) matches neither signature and
 * is still honored exactly as before.
 */
export function runtimeDatabaseUrl(cwd: string = process.cwd()): string {
  // Session-32 (S32-1): the launch-recovery arm used to compare UNTRIMMED
  // faces — a whitespace-PADDED quoted launch .env value (a one-keystroke
  // typo) matched its own padded absolutization and re-anchored through
  // urlForRoot with the untrimmed ref, resolving to a trailing-space
  // filename SQLite silently creates as a fresh empty DB (the S30-1/S31-1
  // genus, one face deeper). Trim both faces here so the signature
  // comparison, the :memory: pass-through and urlForRoot all see clean
  // values — the same one-home doctrine the tail seam already applies
  // (effectiveDatabaseUrl's own trim is idempotent on pre-trimmed input).
  const envUrl = process.env.DATABASE_URL?.trim() || undefined;
  const envFileUrl = readDatabaseUrlFromEnvAt(cwd);
  // Session-23 (S23-7): the cwd-side bun-signature early return is
  // RETIRED — the tail effectiveDatabaseUrl({envUrl, envFileUrl,
  // envFileDir: cwd}) performs the same test at its top (verified
  // behavior-neutral by the 263-line fixture suite: both paths converge
  // on the same repo-anchored resolution). The inline duplicate was a
  // divergence hazard: a future edit to one copy silently forked the
  // seam's two faces.
  // Session-11 (F11-18 — the standalone-launch DB lock, the neo-crm
  // session-212 cure): the launch-dir recovery is HOISTED out of the
  // cwd-.env guard above. The build's hygiene step deletes
  // .next/standalone/.env (`rm -f`), so the post-chdir cwd carries NO
  // .env — under the old nesting the recovery required exactly that file
  // and never ran in the launch shape it was written for: bun absolutized
  // <repo>/.env's relative value against the repo root, the server
  // chdir'd, and the parent-of-repo URL passed through as an
  // "intentional override" (live-reproduced: `bun run start` with the
  // default .env answered Error code 14 — or, where the parent db/
  // exists, silently opened an EMPTY WRONG database). The signature test
  // below now runs whenever an env URL is present.
  if (envUrl) {
    const launchDir = repoRootFromStandaloneCwd(cwd);
    // Session-42 (S42-3, the S28-8 annotation doctrine): the
    // `&& launchDir !== cwd` conjunct is SUBSUMED — the helper returns
    // non-null only for a <root>/.next/standalone cwd and always a
    // strict two-level ancestor of it, so launchDir !== cwd holds
    // whenever launchDir is non-null — kept as belt-and-braces in the
    // most-bitten contract of the family: if the helper's contract ever
    // widens, the conjunct still skips the degenerate same-dir read.
    if (launchDir && launchDir !== cwd) {
      // Session-32 (S32-1): the launch .env's value joins the one-home
      // trim — see the runtimeDatabaseUrl header comment.
      const launchEnvUrl = readDatabaseUrlFromEnvAt(launchDir)?.trim() || undefined;
      // Session-35 guard (a donor-ledger number — the NEO-CRM seam's
      // absolute-launch-value guard, docs/plans/2026-11-10-session11…md):
      // only a RELATIVE launch value can be a bun
      // absolutization candidate. An absolute launch .env value (the
      // documented production form, docs/DEPLOYMENT.md §4) passes through
      // path.resolve unchanged inside bunAbsolutized(), so its signature
      // would MATCH and the seam would re-anchor it into a corrupted
      // <repo>/prisma/var/lib/… path. Absolute URLs are intentional
      // overrides by this seam's own header contract.
      if (
        launchEnvUrl &&
        isRelativeFileUrl(launchEnvUrl) &&
        envUrl === bunAbsolutized(launchEnvUrl, launchDir)
      ) {
        // Re-anchor on the launch directory's own value through the
        // ALREADY-VALIDATED standalone root (the schema rule — identical
        // to resolveDatabaseUrl, but anchored exactly where bun loaded it).
        // Session-27 (S27-2 — the S26-9 sibling): the in-memory spelling
        // must pass through RAW here too. `file::memory:` in a launch .env
        // gets bun-absolutized into `file:<repo>/:memory:` (matching this
        // arm's signature), and urlForRoot would re-anchor it into a
        // literal <repo>/prisma/:memory: file — the operator's in-memory
        // intent silently becoming a junk disk file. The arm's own purpose
        // is replacing bun's corrupted value with the .env's original.
        const ref = launchEnvUrl.slice("file:".length);
        if (ref.startsWith(":memory:")) return launchEnvUrl;
        // Session-44 (S44-1): the launch arm joins the one-home tail
        // decomposition — the query rides the re-anchored URL (the
        // engine parses it as connector config), the fragment strips,
        // and a path-emptied ref passes through raw (the S44-2 guard;
        // urlForRoot(launchDir, "") would answer the prisma FOLDER).
        const { pathRef, query } = decomposeFileRef(ref);
        if (!pathRef) return launchEnvUrl;
        return urlForRoot(launchDir, pathRef) + query;
      }
    }
  }
  return effectiveDatabaseUrl({
    envUrl,
    envFileUrl,
    envFileDir: cwd,
  });
}
