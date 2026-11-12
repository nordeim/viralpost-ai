import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-11: the gate-script pins (the neo-crm tests/gate-script.test.ts
// pattern adopted). `bun run gate` is the repo's definition of done — the
// ONE command the docs tell operators and agents to trust. These pins
// freeze its exact chain so it can never silently drift:
//   lint → typecheck → unit → build → smoke → e2e (CI=1, fresh boot).
// The e2e arm's CI=1 prefix is load-bearing (playwright.config.ts's
// reuseExistingServer: !process.env.CI — without it a reused server keeps
// its IN-MEMORY rate buckets while global-setup reseeds the DB, and a
// second run inside the window trips LOGIN at the 11th cumulative POST
// (7 logins/run vs the 10/15-min wall — the S34-4 census; re-anchored
// session-35, S35-6: the old text said "a third run", the arithmetic
// the S34-4 round already corrected everywhere else). The contact
// bucket trips earlier still on the hour clock — playwright.config.ts's
// comment is the full census).
// Also pinned: the build script's hygiene tail (rm -f .next/standalone/.env
// — the double-cure for Next's own .env copy into the deployable
// artifact), and the start script's production shape.

const pkg = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, "..", "package.json"), "utf8"),
) as { scripts: Record<string, string> };

describe("session-11: the gate-script pins (the neo-crm adoption)", () => {
  it("the gate script exists and chains exactly lint → typecheck → test → build → smoke → CI=1 e2e", () => {
    const gate = pkg.scripts["gate"];
    expect(gate).toBeDefined();
    // The exact chain, in order, each joined by &&.
    const steps = (gate ?? "").split("&&").map((s) => s.trim());
    expect(steps).toEqual([
      "bun run lint",
      "bun run typecheck",
      "bun run test",
      "bun run build",
      "./scripts/smoke-test.sh",
      "CI=1 bun run test:e2e",
    ]);
  });

  it("the e2e arm forces the fresh boot (CI=1 — the reused-server rate-bucket hazard)", () => {
    expect(pkg.scripts["gate"]).toMatch(/CI=1 bun run test:e2e/);
  });

  it("the build script ends with the artifact-hygiene tail (standalone static/public copies + the .env removal)", () => {
    const build = pkg.scripts["build"];
    expect(build).toBeDefined();
    expect(build).toContain("cp -r .next/static .next/standalone/.next/");
    expect(build).toContain("cp -r public .next/standalone/");
    // Next's writeStandaloneDirectory copies .env into the deployable
    // artifact EXPLICITLY (immune to outputFileTracingExcludes) — the
    // trailing rm is the double-cure (the smoke hygiene leg asserts the
    // artifact carries none).
    expect(build).toContain("rm -f .next/standalone/.env");
  });

  it("the start script boots the standalone server in production", () => {
    const start = pkg.scripts["start"];
    expect(start).toBeDefined();
    expect(start).toContain("NODE_ENV=production");
    expect(start).toContain(".next/standalone/server.js");
  });

  it("the smoke script exists as its own npm script", () => {
    expect(pkg.scripts["smoke"]).toBe("./scripts/smoke-test.sh");
    expect(existsSync(path.resolve(import.meta.dirname, "..", "scripts", "smoke-test.sh"))).toBe(true);
  });

  // Session-20 (S20-3): the S19-17 cure added GATE_PID to the EXIT trap
  // but no initialization — under `set -euo pipefail`, any leg failing
  // before the :3211 spawn hit an unbound-variable expansion INSIDE the
  // trap, aborting cleanup mid-function (the temp files — including the
  // cookie jar — leaked). The init must sit beside SERVER_PID="".
  it("the smoke trap's GATE_PID is initialized before any leg can fail (S20-3)", () => {
    const smoke = readFileSync(
      path.resolve(import.meta.dirname, "..", "scripts", "smoke-test.sh"),
      "utf8",
    );
    const init = smoke.match(/^SERVER_PID=""/m);
    expect(init, "the SERVER_PID init line must exist").toBeTruthy();
    // The GATE_PID init must exist AND precede the trap registration.
    const gateInit = smoke.match(/^GATE_PID=""/m);
    expect(gateInit, "the GATE_PID init line must exist").toBeTruthy();
    expect(smoke.indexOf('GATE_PID=""')).toBeLessThan(smoke.indexOf("trap cleanup EXIT"));
  });

  // Session-29 (S29-6): the operator-path wiring census — db:push rides
  // the prisma-env wrapper specifically to defeat bun's .env
  // absolutization of the RELATIVE file: URL (the R-1 founding hazard:
  // a raw `prisma db push` resolves file:../db/custom.db against the
  // process CWD and CREATES a wrong db outside the repo). db:census was
  // already pinned (db-census.test.ts); the push/seed mappings were the
  // uncounted faces — a hand-edit reverting the wrapper string would
  // ship green through every layer.
  it("S29-6: the db operator scripts route through their wrappers (prisma-env for push, the seed module for seed)", () => {
    expect(pkg.scripts["db:push"]).toContain("scripts/prisma-env.ts");
    expect(pkg.scripts["db:push"]).toContain("db push");
    expect(pkg.scripts["db:seed"]).toBe("bun prisma/seed.ts");
    // The wrapper itself exists on disk (the string pin is honest only
    // if the target is real).
    expect(existsSync(path.resolve(import.meta.dirname, "..", "scripts", "prisma-env.ts"))).toBe(true);
    expect(existsSync(path.resolve(import.meta.dirname, "..", "prisma", "seed.ts"))).toBe(true);
  });
});
