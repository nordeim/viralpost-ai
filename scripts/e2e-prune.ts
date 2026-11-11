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
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

async function main() {
  const pruned = await db.user.deleteMany({
    where: { email: { startsWith: "e2e-" } },
  });
  console.log(`[e2e-prune] removed ${pruned.count} scratch user(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
