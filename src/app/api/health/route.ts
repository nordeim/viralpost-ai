import { db } from "@/lib/db";
import { ok, fail } from "@/lib/api";

export const dynamic = "force-dynamic";

// Session-36 (S36-P5 — donor-ledger numbers; this repo's sessions are
// docs/session_1..63, the SKILL §0.5 enumeration): the db-down branch
// is an honest 503 — the session-34 incident (a DONOR-ledger number —
// the NEO-CRM seam's own recovery session, the db-path.ts marker's
// sibling; this repo's own session 34 was the contact-persistence
// round — the S52-7 anti-collision marker) — production start serving
// db:"down" at 200 while every DB route 500'd — is the existence proof
// that the 200 form lies to
// monitoring. The playwright webServer probe still passes on a healthy
// boot (SQLite auto-creates db/e2e.db on first connect and SELECT 1
// succeeds on the empty file — verified by the fresh-boot e2e run); the
// 503 only fires when SELECT 1 actually fails, exactly the state where
// monitoring needs the signal.
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return ok({ status: "healthy", db: "up" });
  } catch (error) {
    // Session-63 (S63-3, AUDIT-1 I1): the 503 envelope is the monitoring
    // signal (S36-P5); this line is its diagnosis half — WHY SELECT 1
    // failed rides the server log, so an operator does not need a local
    // repro to see the cause (wrong db path, locked file, corrupted
    // file — the SKILL §10 symptom family).
    console.error("[health] db probe failed:", error);
    return fail("SERVICE_UNAVAILABLE", "Database unavailable", 503);
  }
}
