// The boot gate's Next hook (session-170, WP-3 — the scandihaven
// instrumentation.ts port). Next calls register() once per server
// bootstrap — dev, `next start`, and the standalone server.js — and a
// throw here refuses the boot (verified live: "Failed to prepare
// server Error: An error occurred while loading instrumentation hook").
//
// THE TWO SKIPS:
//  - the edge runtime has no Node contract (the seam reads process.env
//    through the passed record — but the hook itself never loads on edge);
//  - the phase-production-build workers: `next build` runs with
//    NODE_ENV=production but NO live traffic — a fresh clone without
//    .env must still build (the secret gate belongs to the SERVING
//    boot, not the artifact compiler; verified live this round).
//
// Dev/test boot soft by construction: bootEnvCheck only fatals when
// NODE_ENV === "production" — the DEV fallback posture documented in
// auth.ts is unchanged.

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "edge") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  const { applyBootEnvReport, bootEnvCheck, shadowingEnvFileWarningsForServer } = await import("./lib/boot-env");
  applyBootEnvReport(bootEnvCheck(process.env));
  for (const warning of shadowingEnvFileWarningsForServer(process.env)) {
    console.warn(warning);
  }
  // Session-47 (S47-2): the shadowing-env-file warning — warn-only, the
  // [boot] family. Printed AFTER the report so a fatal (which throws)
  // still precedes it. The cwd read lives in the dynamically imported
  // wrapper (boot-env.ts's shadowingEnvFileWarningsForServer) — this
  // file is compiled for BOTH runtimes and a direct process.cwd() in
  // its body trips the edge compile (the birth calibration above).
  // Session-50 (S50-1): TWO-dir union probe — the cwd is the repo root
  // in the dev/start postures, but the standalone server.js chdirs to
  // .next/standalone BEFORE register() runs, so there the cwd sits in
  // the artifact dir while bun loaded the env files from the LAUNCH
  // dir. The wrapper probes the deduped cwd ∪ PWD union (PWD = the
  // launch cwd, inherited at spawn and never updated by the chdir) —
  // the repo-root shadow files warn in every documented posture.
}
