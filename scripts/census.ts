// DB census: prints the resolved database path + per-model counts, and
// compares them against the seed contract.
//
// Why this exists (the template's N-53b lesson, carried over):
//   • a raw `new PrismaClient()` run from the repo root can open a
//     database OUTSIDE the repo under both node (a relative `file:` URL
//     resolves against the process CWD) and bun (which additionally
//     absolutizes the .env value against the .env location).
//   • the closure: censuses go through the app's own client — the SAME
//     singleton the running server uses (`src/lib/db`, re-anchored by
//     runtimeDatabaseUrl) — and PRINT the resolved URL, so every count
//     is bound to a named file. A count without its path is not
//     evidence.
// The expected counts are the prisma/seed.ts row counts; a mismatch is
// probe residue unless you deliberately added data (reseed with
// `bun run db:seed` to restore the contract).
//
// Run: bun run db:census   (or: bun scripts/census.ts)

import { db } from "../src/lib/db";
import { runtimeDatabaseUrl } from "../src/lib/db-path";

// The seed contract — prisma/seed.ts's row counts (users; the contact
// inbox starts empty). Keep in sync with the seed.
const EXPECTED = {
  users: 1,
  contactMessages: 0,
} as const;

type Counts = Record<keyof typeof EXPECTED, number>;

async function main(): Promise<void> {
  const url = runtimeDatabaseUrl();
  const [users, contactMessages] = await Promise.all([
    db.user.count(),
    db.contactMessage.count(),
  ]);
  const counts: Counts = { users, contactMessages };

  console.log(`database: ${url}`);
  console.log(`counts: users=${users} contactMessages=${contactMessages}`);

  const drift = (Object.keys(EXPECTED) as Array<keyof typeof EXPECTED>).filter(
    (k) => counts[k] !== EXPECTED[k],
  );
  if (drift.length > 0) {
    const detail = drift.map((k) => `${k}=${counts[k]} (expected ${EXPECTED[k]})`).join(", ");
    console.error(`pristine: MISMATCH — ${detail}`);
    console.error("Probe residue? Remove it, or reseed in place: bun run db:seed");
    await db.$disconnect();
    // Session-35 (S35-3): exitCode over the synchronous exit call — the
    // family teardown owns the process from here too.
    process.exitCode = 1;
    return;
  }
  const contract = `${EXPECTED.users} user + ${EXPECTED.contactMessages} contact messages`;
  console.log(`pristine: MATCH (${contract} — the seed contract)`);
  await db.$disconnect();
}

// Only take over the process when executed directly (not when imported by
// the Vitest suite).
const invokedAsScript = process.argv[1]?.endsWith("census.ts");
// Session-35 (S35-3): the family form. The old `void main()` sent a
// thrown count into an unhandled rejection (the drift-mismatch path
// disconnected in-main above; a failing query skipped it). The catch
// sets exitCode — the finally disconnects before the process exits.
// Session-36 (S36-3): the finally runs FIRST — the trailing catch
// covers main's rejection AND the disconnect's own.
// Session-37 (S37-1): the disconnect is inner-caught — in the both-fail
// case the finally's rejection used to supersede main's; both print now.
if (invokedAsScript)
  main()
    .finally(async () => {
      await db.$disconnect().catch((e) => {
        console.error(e);
        process.exitCode = 1;
      });
    })
    .catch((e) => {
      console.error(e);
      process.exitCode = 1;
    });
