import { mkdtempSync, rmSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, describe, expect, it } from "vitest";
import {
  effectiveDatabaseUrl,
  parseEnvFile,
  resolveDatabaseUrl,
  runtimeDatabaseUrl,
  urlForRoot,
} from "@/lib/db-path";

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length) rmSync(tempDirs.pop()!, { recursive: true, force: true });
});

describe("urlForRoot", () => {
  it("creates the database parent directory when it does not exist yet (first boot)", () => {
    const root = mkdtempSync(join(tmpdir(), "viralpost-dbpath-"));
    tempDirs.push(root);
    // Simulate a repo root WITHOUT a db/ folder: only the schema anchor exists.
    const dbFile = join(root, "prisma", "..", "db", "custom.db");

    const url = urlForRoot(root, "../db/custom.db");

    expect(url).toBe(`file:${dbFile}`);
    // The whole point of the first-boot fix: the folder is created so the
    // Prisma engine never falls back to a CWD-relative path.
    expect(existsSync(join(root, "db"))).toBe(true);
  });

  it("is idempotent when the database directory already exists", () => {
    const root = mkdtempSync(join(tmpdir(), "viralpost-dbpath-"));
    tempDirs.push(root);

    const first = urlForRoot(root, "../db/custom.db");
    const second = urlForRoot(root, "../db/custom.db");

    expect(second).toBe(first);
  });
});

describe("parseEnvFile", () => {
  it("reads a double-quoted DATABASE_URL without the quotes", () => {
    expect(parseEnvFile('# c\n\nDATABASE_URL="file:../db/custom.db"')).toEqual({
      DATABASE_URL: "file:../db/custom.db",
    });
  });

  it("ignores comments, blanks and the export prefix", () => {
    expect(parseEnvFile("# DATABASE_URL=nope\n\n  export DATABASE_URL=file:./ok.db  ")).toEqual({
      DATABASE_URL: "file:./ok.db",
    });
  });

  it("keeps values containing equals signs intact", () => {
    expect(parseEnvFile("AUTH_SECRET=abc=def==")).toEqual({ AUTH_SECRET: "abc=def==" });
  });

  // Session-21 (S21-8): bun's own loader strips an UNQUOTED trailing
  // inline comment; the parser must agree or the bun-signature
  // re-anchor misses and the DB silently lands outside the repo (the
  // exact Error-code-14 class this seam exists to kill — live-verified
  // divergence on bun 1.3.14 before this cure).
  it("strips an unquoted trailing inline comment (the bun parity face)", () => {
    expect(parseEnvFile("DATABASE_URL=file:../db/custom.db # the dev db")).toEqual({
      DATABASE_URL: "file:../db/custom.db",
    });
    expect(parseEnvFile("DATABASE_URL=file:./ok.db\t# tab-prefixed note")).toEqual({
      DATABASE_URL: "file:./ok.db",
    });
  });

  it("keeps a hash INSIDE a quoted value (bun semantics)", () => {
    expect(parseEnvFile('AUTH_SECRET="ab#cd"')).toEqual({ AUTH_SECRET: "ab#cd" });
  });

  it("cuts an unquoted value at the first hash anywhere (bun's rule, live-verified)", () => {
    // bun 1.3.14 parses `KEY=abc#def` as `abc` — no whitespace guard.
    // The seam mirrors bun (the signature check), not dotenv.
    expect(parseEnvFile("AUTH_SECRET=abc#def")).toEqual({ AUTH_SECRET: "abc" });
  });

  it("a quoted value followed by a comment parses to the quoted content", () => {
    expect(parseEnvFile('KEY="v" # after-quote note')).toEqual({ KEY: "v" });
  });
});

describe("effectiveDatabaseUrl (bun absolutization re-anchoring)", () => {
  it("re-anchors a URL that Bun absolutized against the .env location", () => {
    // bun run exports DATABASE_URL=file:/parent-of-repo/db/custom.db when
    // /repo/.env carries file:../db/custom.db — one directory OUTSIDE the
    // repo. The seam must recognize the signature and fall back to the
    // schema rule (resolveDatabaseUrl) instead of passing it through.
    const bunAbsolutized = "file:/db/custom.db"; // resolve("/", "../db/custom.db")
    const url = effectiveDatabaseUrl({
      envUrl: bunAbsolutized,
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/",
    });
    expect(url).not.toBe(bunAbsolutized);
    expect(url).toContain("/db/custom.db");
  });

  it("keeps a caller-provided URL that differs from the bun signature", () => {
    // e.g. the Playwright webServer env: file:../db/e2e.db must win over
    // the repo .env's custom.db contract.
    const url = effectiveDatabaseUrl({
      envUrl: "file:../db/e2e.db",
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/repo",
    });
    expect(url).toContain("e2e.db");
  });

  it("passes postgres URLs through untouched", () => {
    const url = effectiveDatabaseUrl({
      envUrl: "postgresql://u:p@localhost:5432/viralpost",
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/repo",
    });
    expect(url).toBe("postgresql://u:p@localhost:5432/viralpost");
  });

  it("falls back to the .env value when the process env is unset", () => {
    const url = effectiveDatabaseUrl({
      envUrl: undefined,
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/repo",
    });
    expect(url).toContain("/db/custom.db");
  });

  // Session-30 (S30-1): the empty-value family. The `if (envUrl && …)`
  // arms already treat "" as unset (falsy), but the tail `??` chain passed
  // it through as a SET override — masking a valid .env value (the
  // docker-compose/CI empty-passthrough shape) and skipping the documented
  // DEFAULT_DATABASE_URL fallback for an empty .env line. Prisma has no
  // valid empty URL either way; "" can never be an intentional override.
  it("an empty-string process env never masks the .env value (S30-1)", () => {
    const url = effectiveDatabaseUrl({
      envUrl: "",
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/repo",
    });
    expect(url).toContain("/db/custom.db");
  });

  it("an empty .env value falls back to the default (S30-1)", () => {
    const url = effectiveDatabaseUrl({
      envUrl: undefined,
      envFileUrl: "",
      envFileDir: "/repo",
    });
    // DEFAULT_DATABASE_URL ("file:../db/custom.db") resolved through the
    // schema rule — the same fallback a MISSING .env line always got.
    expect(url).toContain("/db/custom.db");
  });

  // Session-31 (S31-1): the whitespace-only family — the S30-1 genus one
  // notch deeper. `input.envUrl || undefined` normalizes "" but not " "
  // (truthy), so a quoted-space DATABASE_URL still masked a valid .env
  // value and still skipped the DEFAULT_DATABASE_URL fallback. A
  // whitespace URL is never a legitimate Prisma datasource (the S30-1
  // rationale applies verbatim); the cure trims at the one-home boundary.
  it("a whitespace-only process env never masks the .env value (S31-1)", () => {
    const url = effectiveDatabaseUrl({
      envUrl: " ",
      envFileUrl: "file:../db/custom.db",
      envFileDir: "/repo",
    });
    expect(url).toContain("/db/custom.db");
  });

  it("a whitespace-only .env value falls back to the default (S31-1)", () => {
    const url = effectiveDatabaseUrl({
      envUrl: undefined,
      envFileUrl: " ",
      envFileDir: "/repo",
    });
    // The same DEFAULT_DATABASE_URL fallback a missing line gets — a
    // quoted-space .env line (DATABASE_URL=" ") is a typo, not an
    // intentional override.
    expect(url).toContain("/db/custom.db");
  });

  // Session-33 (S33-4): the dev-shape :memory: COMPOSITION — the process
  // env carrying bun's absolutization of a cwd .env's `file::memory:`
  // (the dev-server shape: bun run dev exports file:<repo>/:memory:
  // for it). The signature arm must route through resolveDatabaseUrl so
  // the S26-9 guard returns the RAW spelling. Both component behaviors
  // are individually pinned (the S26-9 guard below, the S27-2 launch
  // arm in the standalone describe); this pin owns the composition —
  // traced correct under both bun models, now pinned. Co-pinned faces
  // (the N12-2 doctrine's sanctioned form, documented here): removing
  // the S26-9 guard trips this pin AND the S26-9 pin; breaking the
  // signature arm's resolveDatabaseUrl routing trips this pin AND the
  // re-anchor pin above. Battery: `return envUrl;` planted for the
  // arm's `return resolveDatabaseUrl(envFileUrl);` → this pin REDs
  // alone.
  it("returns the RAW :memory: spelling when the env carries bun's absolutization of it (S33-4 — the dev-shape composition)", () => {
    const url = effectiveDatabaseUrl({
      envUrl: "file:/repo/:memory:", // bun's export for a /repo/.env file::memory:
      envFileUrl: "file::memory:",
      envFileDir: "/repo",
    });
    expect(url).toBe("file::memory:");
  });
});

describe("runtimeDatabaseUrl (cwd .env discovery)", () => {
  it("re-anchors a bun-absolutized env var using the cwd .env file", () => {
    const dir = mkdtempSync(join(tmpdir(), "viralpost-runtime-"));
    tempDirs.push(dir);
    writeFileSync(join(dir, ".env"), 'DATABASE_URL="file:../db/custom.db"\n');

    const prev = process.env.DATABASE_URL;
    // Exactly what bun run exports for that .env line:
    process.env.DATABASE_URL = `file:${join(dir, "..", "db", "custom.db")}`;
    try {
      const url = runtimeDatabaseUrl(dir);
      // Re-anchored on the schema rule — NOT the bun-absolutized parent
      // path that sat in the process env.
      expect(url).not.toBe(process.env.DATABASE_URL);
      expect(url).toContain("/db/custom.db");
    } finally {
      if (prev === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = prev;
    }
  });

  it("uses the process env URL when no .env exists at the cwd", () => {
    const dir = mkdtempSync(join(tmpdir(), "viralpost-runtime-"));
    tempDirs.push(dir);
    mkdirSync(join(dir, "db"), { recursive: true });

    const prev = process.env.DATABASE_URL;
    process.env.DATABASE_URL = `file:${join(dir, "db", "x.db")}`;
    try {
      expect(runtimeDatabaseUrl(dir)).toBe(process.env.DATABASE_URL);
    } finally {
      if (prev === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = prev;
    }
  });
});

describe("runtimeDatabaseUrl (standalone launch contexts — session-34, a donor-ledger number)", () => {
  // Lineage note (the boot-env/session-10 F10-4 pattern — session-33,
  // S33-3): the session-34/35/36 numbers in this describe cite the
  // NEO-CRM donor ledger (the template repo the db-path seam was ported
  // from — its own standalone-launch-recovery sessions). THIS repo's
  // own sessions are docs/session_1..38; the donor enumeration lives
  // in viralpost-ai_SKILL.md §0.5. Unmarked, the numbers collide with
  // this repo's imminent session 34/35/36 rounds — the exact genus
  // §0.5 exists to prevent (the S31-4 auth.ts precedent).
  // The production layout: <repo>/{.env, prisma/schema.prisma} plus the
  // traced .next/standalone/{.env} copy the server chdirs into at boot.
  function buildStandaloneRepo(): { repo: string; standalone: string } {
    const repo = mkdtempSync(join(tmpdir(), "viralpost-standalone-"));
    tempDirs.push(repo);
    mkdirSync(join(repo, "prisma"), { recursive: true });
    writeFileSync(join(repo, "prisma", "schema.prisma"), "// schema stub\n");
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file:../db/custom.db"\n');
    const standalone = join(repo, ".next", "standalone");
    mkdirSync(standalone, { recursive: true });
    writeFileSync(join(standalone, ".env"), 'DATABASE_URL="file:../db/custom.db"\n');
    return { repo, standalone };
  }

  function withEnv(value: string | undefined, fn: () => void) {
    const prev = process.env.DATABASE_URL;
    if (value === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = value;
    try {
      fn();
    } finally {
      if (prev === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = prev;
    }
  }

  it("re-anchors a bun-absolutized env var when the standalone server was launched from the repo root", () => {
    const { repo, standalone } = buildStandaloneRepo();
    // What bun exports at launch: <repo>/.env's value absolutized against
    // the LAUNCH cwd (the repo root) — the parent-of-repo location whose
    // directory does not even exist. The cwd-side comparison (post-chdir,
    // against .next/standalone) misses it, so the seam must recognize the
    // launch-dir .env signature before treating the value as an override.
    const launchAbsolutized = `file:${join(repo, "..", "db", "custom.db")}`;
    withEnv(launchAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe(`file:${join(repo, "db", "custom.db")}`);
    });
  });

  it("keeps an intentional e2e-style override when launched from the repo root", () => {
    const { standalone } = buildStandaloneRepo();
    // Playwright's webServer override: a relative URL neither .env signature
    // can produce — must be honored as an intentional override (re-anchored
    // through the schema rule, never passed through raw).
    withEnv("file:../db/e2e.db", () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).not.toBe(process.env.DATABASE_URL);
      expect(url).toContain("/db/e2e.db");
    });
  });

  it("re-anchors when launched from inside .next/standalone (the traced .env)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    // Launching from the standalone folder itself: bun loaded the traced
    // .env and absolutized against .next/standalone.
    const standaloneAbsolutized = `file:${join(standalone, "..", "db", "custom.db")}`;
    withEnv(standaloneAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).not.toBe(process.env.DATABASE_URL);
      expect(url).toContain("/db/custom.db");
      expect(url).not.toBe(`file:${join(repo, ".next", "db", "custom.db")}`);
    });
  });

  it("re-anchors the bun-absolutized launch value in the HYGIENE shape — no .env at the standalone cwd (session-11, F11-18)", () => {
    // The build script's hygiene step deletes .next/standalone/.env
    // (`rm -f .next/standalone/.env` — the double-cure for Next's own
    // copy), so the post-chdir cwd carries NO .env. The session-34
    // launch-dir recovery used to sit INSIDE `isRelativeFileUrl(envFileUrl)`
    // — a guard that requires exactly that file — making the recovery
    // dead code in the launch shape it was written for: bun absolutizes
    // <repo>/.env's relative value against the repo root, the server
    // chdirs into .next/standalone, and the parent-of-repo URL sailed
    // through as an "intentional override" (live-reproduced: `bun run
    // start` with the default .env answered Error code 14). The hoisted
    // cure (the neo-crm session-212 pattern) tests the launch-dir
    // signature WITHOUT requiring a cwd .env.
    const repo = mkdtempSync(join(tmpdir(), "viralpost-hygiene-"));
    tempDirs.push(repo);
    mkdirSync(join(repo, "prisma"), { recursive: true });
    writeFileSync(join(repo, "prisma", "schema.prisma"), "// schema stub\n");
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file:../db/custom.db"\n');
    const standalone = join(repo, ".next", "standalone");
    mkdirSync(standalone, { recursive: true });
    // NO .env inside .next/standalone — the shipped artifact's shape.

    const launchAbsolutized = `file:${join(repo, "..", "db", "custom.db")}`;
    withEnv(launchAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe(`file:${join(repo, "db", "custom.db")}`);
    });
  });

  it("keeps an intentional ABSOLUTE override in the hygiene shape (no cwd .env, no signature match)", () => {
    // The same hygiene shape with a caller-provided absolute URL that
    // matches NO .env signature: honored exactly (the override contract).
    const repo = mkdtempSync(join(tmpdir(), "viralpost-hygiene2-"));
    tempDirs.push(repo);
    mkdirSync(join(repo, "prisma"), { recursive: true });
    writeFileSync(join(repo, "prisma", "schema.prisma"), "// schema stub\n");
    const standalone = join(repo, ".next", "standalone");
    mkdirSync(standalone, { recursive: true });

    withEnv("file:/var/lib/viralpost/custom.db", () => {
      expect(runtimeDatabaseUrl(standalone)).toBe("file:/var/lib/viralpost/custom.db");
    });
  });

  it("keeps an ABSOLUTE launch .env value as-is (session-35 guard, a donor-ledger number — never re-anchored)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    // The documented production form (docs/DEPLOYMENT.md §4): an ABSOLUTE
    // path in the launch <repo>/.env while the traced .next/standalone/.env
    // is a stale RELATIVE copy. The session-34 launch-dir branch tests the
    // bun signature WITHOUT the isRelativeFileUrl guard on the launch value
    // — and bunAbsolutized() happens to pass an absolute ref through
    // path.resolve unchanged, so the signature MATCHES and the seam would
    // re-anchor the absolute URL into a corrupted
    // <repo>/prisma/var/lib/… path (junk directories included). Absolute
    // URLs are intentional overrides by the seam's own header contract.
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file:/var/lib/viralpost/custom.db"\n');
    withEnv("file:/var/lib/viralpost/custom.db", () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe("file:/var/lib/viralpost/custom.db");
    });
    // And no junk directories were created on the way.
    expect(existsSync(join(repo, "prisma", "var"))).toBe(false);
  });

  // Session-27 (S27-2): the S26-9 genus on the LAUNCH arm. The recovery
  // arm re-anchors bun's absolutized export through urlForRoot DIRECTLY
  // — bypassing resolveDatabaseUrl's :memory: guard. A launch .env
  // carrying `file::memory:` (bun absolutizes it to `file:<repo>/:memory:`,
  // which MATCHES the arm's signature) was re-anchored into a literal
  // <repo>/prisma/:memory: file (live-reproduced in a /tmp sandbox — the
  // AUDIT-1 A1-L1 finding). No live caller — the same latent class
  // S26-9 itself was cured for. Mutation battery: remove the launch-arm
  // guard → this pin REDs.
  it("passes the :memory: spelling through in the LAUNCH shape too (S27-2 — the S26-9 sibling)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file::memory:"\n');
    // What bun exports at launch: the in-memory spelling absolutized
    // against the launch cwd (the repo root) — the corrupted form the
    // recovery arm exists to replace.
    const launchAbsolutized = `file:${join(repo, ":memory:")}`;
    withEnv(launchAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe("file::memory:");
    });
  });

  // Session-32 (S32-1): the S30-1/S31-1 trim doctrine, one face deeper.
  // The one-home trim lived ONLY in effectiveDatabaseUrl; the launch-
  // recovery arm compared UNTRIMMED faces, so a whitespace-PADDED quoted
  // launch .env value (a one-keystroke typo) matched its own padded
  // absolutization and re-anchored through urlForRoot with the untrimmed
  // ref — resolving to a trailing-space filename SQLite silently creates
  // as a fresh empty DB. Mutation battery: revert the two trims in
  // runtimeDatabaseUrl → BOTH pins RED.
  it("a whitespace-padded launch .env value resolves to the CLEAN path (S32-1)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    // The padded launch .env (trailing space inside the quotes) and the
    // padded absolutization bun would export for it.
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file:../db/custom.db "\n');
    const launchAbsolutized = `file:${join(repo, "..", "db", "custom.db")} `;
    withEnv(launchAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe(`file:${join(repo, "db", "custom.db")}`);
      // Never a trailing-space path — the pre-cure shape resolved to
      // "<repo>/db/custom.db " (a fresh empty wrong DB).
      expect(url).not.toMatch(/custom\.db $/);
    });
  });

  it("a whitespace-padded :memory: launch value returns the TRIMMED raw spelling (S32-1)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    // The S27-2 arm returns the launch .env's own value — the padded
    // spelling must come back TRIMMED, never the padded raw.
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file::memory: "\n');
    const launchAbsolutized = `file:${join(repo, ":memory:")} `;
    withEnv(launchAbsolutized, () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe("file::memory:");
    });
  });

  // Session-33 (S33-2): the Windows-absolute face of the launch arm —
  // the S33-2a genus through the standalone path. A Windows-bun launch
  // exports an absolute drive-letter value unchanged (path.resolve of
  // an absolute is the absolute), so the process env and the launch
  // .env carry the SAME value; the POSIX-only isRelativeFileUrl misread
  // it as a re-anchor candidate and the tail's resolveDatabaseUrl
  // re-anchored it into <repo>/prisma/C:\… junk (live-traced pre-cure
  // on this POSIX sandbox — the S30/S31/S32 wrong-DB genus on the one
  // platform the seam didn't model). Absolute URLs are intentional
  // overrides by the seam's own header contract. Mutation battery:
  // revert both predicates to the POSIX-only forms → the three S33-2
  // pins RED.
  it("keeps a Windows drive-letter launch .env value as-is (S33-2 — never re-anchored)", () => {
    const { repo, standalone } = buildStandaloneRepo();
    writeFileSync(join(repo, ".env"), 'DATABASE_URL="file:C:\\data\\prod.db"\n');
    // What Windows-bun exports at launch: the absolute value itself.
    withEnv("file:C:\\data\\prod.db", () => {
      const url = runtimeDatabaseUrl(standalone);
      expect(url).toBe("file:C:\\data\\prod.db");
      expect(url).not.toContain("prisma");
    });
  });
});

describe("resolveDatabaseUrl", () => {
  it("passes through non-file URLs untouched", () => {
    expect(resolveDatabaseUrl("postgresql://u:p@localhost:5432/db")).toBe(
      "postgresql://u:p@localhost:5432/db",
    );
  });

  it("passes through absolute file URLs untouched", () => {
    expect(resolveDatabaseUrl("file:/tmp/data.db")).toBe("file:/tmp/data.db");
  });

  // Session-33 (S33-2): the Windows-absolute family — drive-letter and
  // UNC refs. The absoluteness test was POSIX-only (startsWith("/")),
  // so both fell through to the anchors and re-anchored into
  // <repo>/prisma/C:\… junk (live-probed pre-cure:
  // resolveDatabaseUrl("file:C:\db\custom.db") answered
  // "file:<repo>/prisma/C:\db\custom.db" — the S30/S31/S32 wrong-DB
  // genus on the one platform the seam didn't model; no live caller on
  // this Linux deployment, the documented production form on a Windows
  // host). Absolute URLs are intentional overrides by the seam's own
  // header contract.
  it("passes through a Windows drive-letter absolute file URL untouched (S33-2)", () => {
    expect(resolveDatabaseUrl("file:C:\\db\\custom.db")).toBe("file:C:\\db\\custom.db");
    // The forward-slash drive spelling too (Windows accepts both).
    expect(resolveDatabaseUrl("file:C:/db/custom.db")).toBe("file:C:/db/custom.db");
  });

  it("passes through a Windows UNC absolute file URL untouched (S33-2)", () => {
    expect(resolveDatabaseUrl("file:\\\\server\\share\\custom.db")).toBe(
      "file:\\\\server\\share\\custom.db",
    );
  });

  it("passes through the in-memory URL untouched", () => {
    expect(resolveDatabaseUrl("file:")).toBe("file:");
  });

  // Session-26 (S26-9): the standard SQLite in-memory spelling
  // `file::memory:` — the guard comment claimed "absolute or in-memory"
  // but the `:memory:` ref does NOT start with "/", so it fell through
  // to the anchors and re-anchored to a literal <repo>/prisma/:memory:
  // file (no live caller — the latent misroute; the comment now says
  // what the code does and the ref passes through).
  it("passes through the :memory: spelling untouched (S26-9 — the ref is not a schema-relative path)", () => {
    expect(resolveDatabaseUrl("file::memory:")).toBe("file::memory:");
    expect(resolveDatabaseUrl("file::memory:?cache=shared")).toBe(
      "file::memory:?cache=shared",
    );
  });

  it("resolves a repo-relative URL against the module's repo root", () => {
    const resolved = resolveDatabaseUrl("file:../db/custom.db");
    expect(resolved.startsWith("file:")).toBe(true);
    // The CLI rule anchors at prisma/schema.prisma, so ../db/custom.db lands
    // inside <repo>/db — never inside prisma/ or src/.
    expect(resolved).not.toContain("/prisma/../");
    expect(resolved).toContain("/db/custom.db");
  });

  it("never returns the raw relative URL when the repo root is discoverable", () => {
    const resolved = resolveDatabaseUrl("file:../db/custom.db");
    expect(resolved).not.toBe("file:../db/custom.db");
  });
});

describe("session-22 (S22-17): the standalone anchor gates on the .next/standalone folder PAIR", () => {
  // The loose `dir.includes(".next")` gate accepted any cwd with the
  // substring anywhere (e.g. `.next-misc/standalone-ish`) — gated only
  // by the schema-existence check two levels up, which a coincidental
  // layout can satisfy. The basename-pair gate matches the real
  // standalone shape exactly.
  it("a mid-path .next substring is NOT a standalone anchor (the loose-gate genus)", () => {
    // <repo>/.next-misc/standalone-ish contains ".next" and resolves
    // two levels up at <repo> — where a schema exists. The loose gate
    // would return <repo> as the anchor; the pair gate rejects and the
    // resolution falls through to the other anchors (here: the module
    // anchor of THIS test run, whose db/ path the URL must carry
    // instead — never the decoy repo's).
    const repo = mkdtempSync(join(tmpdir(), "viralpost-loose-anchor-"));
    tempDirs.push(repo);
    mkdirSync(join(repo, "prisma"), { recursive: true });
    writeFileSync(join(repo, "prisma", "schema.prisma"), "// decoy schema\n");
    const decoyCwd = join(repo, ".next-misc", "standalone-ish");
    mkdirSync(decoyCwd, { recursive: true });

    const prevCwd = process.cwd();
    process.chdir(decoyCwd);
    try {
      const url = resolveDatabaseUrl("file:../db/custom.db");
      // The decoy repo must NOT own the URL (the loose gate would have
      // returned file:<decoy>/db/custom.db).
      expect(url).not.toContain(repo);
    } finally {
      process.chdir(prevCwd);
    }
  });
});
