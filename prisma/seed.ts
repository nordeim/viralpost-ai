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
  // preserves the row id, so session cookies minted before the reseed
  // keep resolving. The update path resets every seeded field.
  await db.user.upsert({
    where: { email: "sepnetflix2023@outlook.com" },
    update: {
      name: "Demo Creator",
      passwordHash: hashPassword("$Abcd1234"),
      role: "admin",
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
