import { PrismaClient } from "@prisma/client";

// Session-23 (S23-22): the e2e scratch-user prune. The auth/reset-funnel
// specs sign up timestamped probe users (e2e-<ts>@example.com) against
// db/e2e.db; nothing ever re-reads them (each run mints fresh ones), so
// without a prune the file grows unboundedly across local gate runs.
// Called by tests/e2e/global-setup.ts AFTER the seed, scoped to the
// e2e- prefix — the demo user's id-stable upsert and any operator rows
// are untouched (the seed's "never deleteMany a live user" doctrine
// holds; these rows are test scratch by construction).
//
// The DATABASE_URL comes from the caller's env (the global setup pins
// file:../db/e2e.db — the same isolation contract the seed rides).

const db = new PrismaClient();

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
