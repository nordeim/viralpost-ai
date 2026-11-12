// Seed: ViralPost AI demo workspace.
// Idempotent: upserts the demo user by email (stable ids across re-seeds —
// the session cookie's provenance must survive a reseed), clears the
// contact inbox, done.
// Run: bun prisma/seed.ts  (or: bun run db:seed)
//
// Demo login (mirrors the reference app): sepnetflix2023@outlook.com / $Abcd1234

import { PrismaClient } from "@prisma/client";
import { runtimeDatabaseUrl } from "../src/lib/db-path";
// The PURE crypto seam — node:crypto-only so the seed script can import it
// without next/headers transitives (see src/lib/password.ts).
import { hashPassword } from "../src/lib/password";

// Explicit datasource URL: never let the Prisma engine (or bun's .env
// absolutization) pick the database location — the shared resolver pins
// every consumer to <repo>/db/<name> (see src/lib/db-path.ts).
const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

async function main() {
  // Users land through UPSERT-BY-EMAIL, never deleteMany — a re-seed
  // preserves the row id, and v=0 session cookies minted before the
  // reseed keep resolving. The update path resets every seeded field
  // (the tokenVersion reset included, BY DESIGN — a pristine demo
  // state evicts post-reset sessions whose password the reseed also
  // reverted; only v=0 cookies survive). Session-26 (S26-8): the update
  // branch now carries avatarColor + photoUrl too — the "every seeded
  // field" claim is true (the comment previously overclaimed: a future
  // avatar-edit surface would have left a drifted value behind a
  // reseed).
  await db.user.upsert({
    where: { email: "sepnetflix2023@outlook.com" },
    update: {
      name: "Demo Creator",
      passwordHash: hashPassword("$Abcd1234"),
      role: "admin",
      avatarColor: "#14b8a6",
      photoUrl: null,
      verificationCodeHash: null,
      verificationAttempts: 0,
      verificationExpiresAt: null,
      tokenVersion: 0,
      resetToken: null,
      resetTokenExpiresAt: null,
    },
    create: {
      email: "sepnetflix2023@outlook.com",
      name: "Demo Creator",
      passwordHash: hashPassword("$Abcd1234"),
      role: "admin",
      avatarColor: "#14b8a6",
    },
  });

  // The contact inbox starts empty (the reference has no inbox at all —
  // its form is a client stub; ours persists, so the table exists).
  await db.contactMessage.deleteMany();
}

// Session-35 (S35-3): the teardown idiom's failure path. The old form
// made the synchronous exit call INSIDE .catch — it terminates the
// process before the promise chain continues, so the chained .finally
// never ran and $disconnect() was skipped exactly when a run failed,
// while the comment claimed the disconnect is AWAITED.
// process.exitCode lets the finally run; the process still exits 1
// after the chain settles.
main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
