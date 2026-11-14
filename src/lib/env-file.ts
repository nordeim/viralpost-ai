// Session-59 (S59-1b): the .env file parser, EXTRACTED to a leaf module
// (zero imports — pure string parsing). WHY a leaf: the boot gate's
// file-face arm (boot-env.ts) must share the RUNTIME's parser (the
// one-home doctrine — a warning that re-implements the parse can
// diverge from what the engine sees), but importing db-path.ts from
// boot-env.ts ballooned the standalone artifact's instrumentation
// trace (the output-file tracer over-scans db-path's import.meta.url
// resolution + its sibling importers — scripts/prisma-env.ts and
// prisma/seed.ts rode into .next/standalone, tripping the smoke
// ladder's hygiene leg). A pure leaf keeps the instrumentation trace
// lean AND the parse in exactly one home; db-path.ts re-exports it so
// every existing consumer's import path is unchanged.

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
 * (Session-56, S56-3 — the unclosed-quote cross-line face, completing
 * the S53-6 register; re-spelled session-57, S57-1b, after the final
 * clause below was falsified live end-to-end: on a single-line
 * unclosed quote the seam and bun AGREE (live-probed on 1.3.14 —
 * both keep the leading `"` in the value, so the signature
 * comparison stays consistent on the realistic typo; later
 * UNCLOSED-quoted and mid-line-quoted lines do not span either —
 * agreement). The ONE divergent shape: an unclosed quote on the
 * DATABASE_URL line PLUS a later CLOSED quoted value — bun's scan
 * spans to the closing quote that ENDS its line, swallowing the
 * newline and the intermediate quote (DATABASE_URL becomes
 * `file:../db/custom.db\nOTHER="quoted value`, OTHER unset) while
 * this line-based parser cannot model that, doubly pathological.
 * The spanned value is a RELATIVE `file:` URL; the seam's own
 * line-based parse keeps the leading quote (not a relative file:
 * URL — the signature arm is skipped), so the spanned value rides
 * the tail arm and the module anchor re-anchors it into the
 * JUNK-NAMED `<repo>/db/custom.db\nOTHER="quoted value` file — NOT
 * the clean repo db (session-57 live probe, the repo's own
 * @prisma/client 6.19.3: the engine ACCEPTS the junk URL — a 0-byte
 * junk file is created under <repo>/db/, `SELECT 1` answers, the
 * first `User` query P2021s — the S47-1 artifact genus: a healthy
 * 200 against a table-less empty DB). REGISTERED, not cured — the
 * S53-6 posture stands: fix the .env. Boot-warned session-58 (S58-1):
 * the boot gate names the residue the PROCESS ENV carries (bun's span
 * embeds a newline; @next/env keeps the leading quote — live-probed
 * both, both quote chars); session-59 (S59-1) closed the last silent
 * face — @next/env's single-line shape DROPS the line to undefined
 * (invisible to any process-env arm), and the boot gate's file-face
 * arm now reads this same parser's value for exactly that shape (the
 * leading-quote residue hands the engine a non-file: URL raw —
 * PrismaClientInitializationError at the first invocation, the
 * session-59 live probe). The genus is no longer silent on any loader
 * face. Pinned session-57, S57-1a: the parse fixtures + the resolve
 * junk-tail face in tests/db-path.test.ts.)
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

