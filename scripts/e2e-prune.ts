import { PrismaClient } from "@prisma/client";

import { runtimeDatabaseUrl } from "../src/lib/db-path";

// Session-23 (S23-22): the e2e scratch-user prune. The auth/reset-funnel
// specs sign up timestamped probe users (e2e-<ts>@example.com) against
// db/e2e.db; nothing ever re-reads them (each run mints fresh ones), so
// without a prune the file grows unboundedly across local gate runs.
// Called by tests/e2e/global-setup.ts AFTER the seed, scoped to the
// e2e- prefix — the demo user's id-stable upsert and any operator rows
// are untouched (the seed's "never deleteMany a live user" doctrine
// holds; these rows are test scratch by construction).
//
// Session-24 (S24-7): the datasource URL is pinned through the seam —
// the seed's own idiom (runtimeDatabaseUrl()). The bare PrismaClient
// resolved correctly in the wired gate path (the global setup pins
// DATABASE_URL=file:../db/e2e.db), but a MANUAL run from the repo root
// followed bun's .env absolutization to the parent-of-repo path — the
// exact wrong-DB shape db-path.ts documents as its founding bug. The
// seam anchors on the repo regardless of the caller's env.
// Session-25 (S25-18a): WHICH db a manual run targets — with no
// DATABASE_URL override the seam resolves .env's
// file:../db/custom.db, i.e. the DEV database (the wired gate path
// targets db/e2e.db via the global setup's override). Scope is the
// `e2e-` prefix either way: a manual run cleans stray scratch rows
// out of the dev db — itself drift worth pruning.
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

async function main() {
  const pruned = await db.user.deleteMany({
    where: { email: { startsWith: "e2e-" } },
  });
  console.log(`[e2e-prune] removed ${pruned.count} scratch user(s)`);
}

// Session-25 (S25-18b): the disconnect is AWAITED — the seed's idiom.
// The fire-and-forget `void` form could exit the process before
// teardown completes (harmless for SQLite, but the sibling scripts
// should model one idiom).
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
