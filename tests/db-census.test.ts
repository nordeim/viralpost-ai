import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-53 pins (S53-P2, N-53b): the census seam. A raw
// `new PrismaClient()` run from the repo root opens the SANDBOX-ROOT
// mirror db — not the repo's — under BOTH node (the relative `file:` URL
// resolves against the process CWD, not the schema dir) and bun (which
// additionally absolutizes the .env value against the .env location).
// Session-53 proved it live: the orchestrator's own intake census read
// the mirror (it carries the s51 zombie server's probe event), briefly
// misread it as repo-db residue, and only `PRAGMA database_list` exposed
// the engine's true file — the repo db was pristine all along. The
// systemic closure: DB censuses go through the app's own client
// (`src/lib/db` — the SAME singleton the running server uses,
// re-anchored by runtimeDatabaseUrl) and PRINT the resolved path, so a
// count is always bound to a named file.
// scripts/census.ts is that census, wired as `bun run db:census`.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

// Session-48 (S48-1): the hardened form — line pass first, block
// opener anchored (the S47-10 idiom; the one-idiom doctrine, the
// family's only shape).
function stripComments(src: string) {
  return src
    .replace(/\/\/[^\n]*/g, "")
    .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
}

const census = () => stripComments(read("scripts/census.ts") ?? "");
const pkg = () => JSON.parse(read("package.json") ?? "{}") as {
  scripts?: Record<string, string>;
};

describe("session-53: the census seam (S53-P2, N-53b)", () => {
  it("scripts/census.ts exists and counts through the app's db singleton — never a raw PrismaClient", () => {
    const src = census();
    expect(src.length).toBeGreaterThan(0);
    // The whole point of the seam: the census uses the SAME client the
    // app uses (src/lib/db re-anchors through runtimeDatabaseUrl), so it
    // can never be misdirected at a mirror db by ambient env.
    expect(src).toMatch(/from "\.\.\/src\/lib\/db"/);
    expect(src).not.toMatch(/new PrismaClient/);
  });

  it("prints the resolved database URL — a count without its path is not evidence", () => {
    const src = census();
    expect(src).toMatch(/runtimeDatabaseUrl/);
    // The URL is surfaced to the operator (console.log), not just used
    // internally. Session-54 strengthening (N-54e): pin the ACTUAL print
    // form — the s53 pin only asserted any console call, so deleting the
    // `database: ${url}` line while keeping the counts log would have
    // passed (the count-without-path regression the seam exists to close).
    expect(src).toMatch(/`database: \$\{url\}`/);
  });

  it("the MATCH banner derives from EXPECTED — no hardcoded count literal (N-54d)", () => {
    // Session-54 (S54-P3): the banner duplicated EXPECTED as a literal
    // ("15/24/10/23/12 + 4 users") — a future EXPECTED re-sync would
    // leave the printed contract silently stale. The banner now derives
    // from the EXPECTED table; comment-stripped source carries no
    // hardcoded count run.
    expect(census()).not.toMatch(/15\/24\/10\/23\/12/);
  });

  it("carries the seed-contract expectations and fails on drift (the N-53a guard, re-anchored to this repo's pristine contract)", () => {
    const src = census();
    // The prisma/seed.ts row counts (1 demo user + 0 contact messages —
    // the pristine contract) + a non-zero exit on mismatch. (The
    // scaffold-family's CRM counts — 15 contacts / 24 leads / … — were
    // prose relics; the pinned expectations below were always ours.)
    // Session-35 (S35-3): the drift path's non-zero exit re-anchored —
    // the synchronous exit call became process.exitCode (the family
    // teardown doctrine); the pin follows the code in the same commit.
    expect(src).toMatch(/users:\s*1/);
    expect(src).toMatch(/contactMessages:\s*0/);
    expect(src).toMatch(/process\.exitCode = 1/);
  });

  it("the db:census package script is wired", () => {
    expect(pkg().scripts?.["db:census"]).toBe("bun scripts/census.ts");
  });

  // Session-26 (S26-7): THE ONE-SHOT-SCRIPT EXEMPTION, PINNED. The AGENTS
  // contract says "PrismaClient constructed only in src/lib/db.ts" — but
  // two one-shot scripts (prisma/seed.ts, scripts/e2e-prune.ts)
  // deliberately construct their own clients with an EXPLICIT datasource
  // URL routed through the sanctioned runtimeDatabaseUrl() resolver (the
  // engine's target is pinned visibly at the construction site — never a
  // bare process.env.DATABASE_URL read, never the Prisma engine's or
  // bun's own env-absolutization). The exemption is now codified in the
  // AGENTS wording; this pin holds the seam-mandatory form so a future
  // edit can never silently bypass the resolver. Mutation battery:
  // point a script's datasource at a bare env read → RED.
  // Session-34 (S34-2): the enumeration gains the contact read-back
  // probe (scripts/e2e-contact-readback.ts) — the third one-shot DB
  // script, joining the seam-mandatory form this pin holds.
  it("session-26 (S26-7): the one-shot DB scripts construct through the sanctioned URL seam (runtimeDatabaseUrl — the db.ts-singleton exemption, pinned)", () => {
    for (const f of ["prisma/seed.ts", "scripts/e2e-prune.ts", "scripts/e2e-contact-readback.ts"]) {
      const src = stripComments(read(f) ?? "");
      expect(src, `${f} must construct a client`).toMatch(/new PrismaClient\(/);
      expect(src, `${f} must route the datasource through the sanctioned resolver`).toMatch(
        /datasources:\s*\{\s*db:\s*\{\s*url:\s*runtimeDatabaseUrl\(\)\s*\}\s*\}/,
      );
      // The bare direct-env form is banned in the construction site.
      expect(src).not.toMatch(/datasources:\s*\{\s*db:\s*\{\s*url:\s*process\.env\.DATABASE_URL/);
    }
  });

  // Session-35 (S35-3): THE ONE-SHOT FAMILY'S TEARDOWN, PINNED. The
  // documented S25-18b idiom ("the disconnect is AWAITED") was never
  // implemented on the failure path: `process.exit(1)` inside `.catch`
  // terminates synchronously, so the chained `.finally` never ran and
  // $disconnect() was skipped exactly when a run failed — while census.ts
  // had no catch at all (a thrown count = unhandled rejection). The fix
  // sets `process.exitCode = 1` (the finally runs, the process still
  // exits 1 after the chain settles) and gives census.ts the family
  // form; readback's usage check moves BEFORE the client construction
  // (a usage error builds nothing). Mutation batteries: plant
  // process.exit back → RED; plant a bare void main() in census → RED;
  // reorder readback's argv check after the client → RED.
  it("session-35 (S35-3): the one-shot family's teardown idiom (the awaited disconnect now runs on the failure path, pinned)", () => {
    for (const f of ["prisma/seed.ts", "scripts/e2e-prune.ts", "scripts/e2e-contact-readback.ts"]) {
      const src = read(f) ?? "";
      expect(src, `${f} must let the finally run — exitCode, not exit`).toContain("process.exitCode = 1");
      expect(src, `${f} must not preempt the teardown chain`).not.toContain("process.exit(1)");
      // Session-37 (S37-1): the prefix form — the await is what matters
      // here; the disconnect's own failure handling is the S37-1 arm's
      // face below (one face per pin, the N12-2 doctrine).
      expect(src, `${f} must await the disconnect in a finally`).toMatch(/\.finally\(async \(\) => \{\s*await db\.\$disconnect\(/);
      // Session-36 (S36-3): the chain STARTS with the finally — the
      // trailing catch then covers main's rejection AND the
      // disconnect's own (the old .catch-then-.finally order left a
      // rejecting disconnect as an unhandled rejection; on the success
      // path it flipped a green run non-zero with no message).
      expect(src, `${f} must run the finally FIRST (S36-3)`).toMatch(/main\(\)\s*\.finally\(/);
    }
    const census = read("scripts/census.ts") ?? "";
    expect(census, "census.ts must own its failures — the family form, not a bare void main()").toMatch(
      /if \(invokedAsScript\)\s*main\(\)\s*\.finally\(/,
    );
    expect(census).not.toMatch(/if \(invokedAsScript\) void main\(\);/);
    const readback = read("scripts/e2e-contact-readback.ts") ?? "";
    expect(readback, "readback's usage check must precede the client construction").toMatch(
      /process\.argv\[2\][\s\S]*?new PrismaClient\(/,
    );
  });

  // Session-37 (S37-1): the S36-3 reorder's own gap — in the BOTH-fail
  // case (main rejects AND the awaited $disconnect() rejects), Promise
  // .finally semantics make the finally's rejection SUPERSEDE main's, so
  // the trailing catch printed only the disconnect failure and the root
  // cause that triggered the teardown never surfaced (probe-verified
  // under bun 1.3.14 + node). The cure: the disconnect is inner-caught
  // inside the finally (logged + exitCode) — the trailing catch then only
  // ever sees main's rejection, and both failures print. Mutation
  // battery: strip the inner catch back to the bare await → exactly this
  // arm REDs while the S35-3 arm stays GREEN (the ownership separation).
  it("session-37 (S37-1): the teardown chains inner-catch the disconnect (the both-fail case prints BOTH messages)", () => {
    for (const f of ["prisma/seed.ts", "scripts/e2e-prune.ts", "scripts/e2e-contact-readback.ts", "scripts/census.ts"]) {
      const src = read(f) ?? "";
      expect(
        src,
        `${f}: the disconnect's own failure must be caught, logged, and flip the exit code`,
      ).toMatch(/await db\.\$disconnect\(\)\.catch\(\(e\) => \{\s*console\.error\(e\);\s*process\.exitCode = 1;\s*\}\)/);
    }
  });
});
