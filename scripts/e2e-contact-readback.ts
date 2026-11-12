import { PrismaClient } from "@prisma/client";

import { runtimeDatabaseUrl } from "../src/lib/db-path";

// Session-34 (S34-2): the contact-persistence read-back. The e2e test
// titled "the row landed" asserted only the API envelope — no layer
// ever verified the advertised superset ("the contact form actually
// persists") against the database, so deleting the create in
// contact/route.ts shipped green through every gate (the
// vacuous-coverage genus the N12-2 doctrine polices). This script is
// the e2e leg's DB probe: it prints the ContactMessage rows matching a
// target email as JSON, so the spec can assert the row EXISTS with the
// submitted payload — the persistence face's first behavioral owner.
//
// One-shot DB script (the S26-7 exemption family — e2e-prune/seed):
// constructs its own client with the datasource URL routed through the
// sanctioned runtimeDatabaseUrl() resolver (never a bare env read;
// the e2e global setup pins DATABASE_URL=file:../db/e2e.db, so the
// resolver anchors the target regardless of the caller's env — the
// S24-7/S25-18a doctrine). READ-ONLY by construction: a findMany, no
// writes, nothing to prune.
//
// Usage: bun scripts/e2e-contact-readback.ts <email>
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("[e2e-contact-readback] usage: bun scripts/e2e-contact-readback.ts <email>");
    process.exit(2);
  }
  const rows = await db.contactMessage.findMany({
    where: { email },
    select: { name: true, email: true, message: true },
    orderBy: { createdAt: "asc" },
  });
  console.log(JSON.stringify(rows));
}

// The awaited disconnect (the S25-18b idiom — the seed's form).
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
