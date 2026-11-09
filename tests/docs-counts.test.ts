import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The docs-counts gate (session-9, F9-13 — the neo-crm session-102/S102-P1
// pattern adopted for this repo). The badge-drift genus has recurred THREE
// times here (F8-8 twice: 450→455; F9-6 once: 455→457) because the count
// lockstep was prose discipline — prose drifts. These pins put every
// LIVE-TENSE count site under the unit gate: a stale count anywhere now
// fails `bun run test`.
//
// Scope discipline (the neo-crm history-record doctrine): the pins assert
// the LIVE-TENSE sites only. The SKILL's Appendix A round-history rows,
// the worklog's per-session records, and the session plans keep their
// historical numbers BY DESIGN — records of what was true then, not living
// count sites — so the negatives below use the scoped retired-badge forms,
// never a bare whole-file number ban.
//
// The count ladder (re-anchored in the same commit whenever the suite
// grows): s8 409/29 files → s9 442/31 files (+4 the F9-1 boot-env pins,
// +2 the F9-9 role pins, +2 the F9-7 reset-funnel pins, +15 the F9-5
// property suite, +10 this suite). The e2e census is unchanged at 48/8.

// ---- THE COUNT CONSTANTS (re-anchor here + every doc site below) ---------

/** Vitest unit checks (tests/*.test.ts — the exact `bun run test` total). */
const UNIT = 442;
/** Vitest suite files. */
const SUITES = 31;
/** Playwright e2e checks (incl. the setup project's 1). */
const E2E = 48;
/** Playwright e2e spec files. */
const E2E_SPECS = 8;
/** Smoke ladder legs. */
const SMOKE = 15;
/** The README badge total (unit + e2e). */
const BADGE = UNIT + E2E;

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

describe("docs-counts: the live-tense count sites (the badge-drift genus, retired)", () => {
  it("the README badge carries the live arithmetic (unit + e2e)", () => {
    const readme = read("README.md");
    expect(readme).toContain(`tests-${BADGE}%20checks`);
  });

  it("the README architecture + testing sections carry the live suite counts", () => {
    const readme = read("README.md");
    expect(readme).toContain(`| Unit tests | Vitest | 5.0 | ${SUITES} files / ${UNIT} tests, node env, pure seams |`);
    expect(readme).toContain(`| E2E | Playwright | 1.64 | ${E2E_SPECS} specs / ${E2E} tests against the production build |`);
    expect(readme).toContain(`bun run test            # Vitest unit suite (${SUITES} files / ${UNIT} tests)`);
    expect(readme).toContain(`bun run test:e2e        # Playwright e2e (${E2E_SPECS} specs / ${E2E} tests) — needs bun run build first`);
  });

  it("the README badge's retired forms never return (the F8-8/F9-6 ladder)", () => {
    const readme = read("README.md");
    expect(readme).not.toContain("tests-450%20checks");
    expect(readme).not.toContain("tests-455%20checks");
    expect(readme).not.toContain("tests-457%20checks");
  });

  it("AGENTS carries the live unit + e2e + smoke counts", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain(`(${SUITES} files, ${UNIT} tests)`);
    expect(agents).toContain(`${E2E_SPECS} specs / ${E2E} tests in`);
    expect(agents).toContain("`./scripts/smoke-test.sh` (" + SMOKE + " legs)");
  });

  it("CLAUDE carries the live unit + e2e counts (the agent contract)", () => {
    const claude = read("CLAUDE.md");
    expect(claude).toContain(`${SUITES} files / ${UNIT} tests`);
    expect(claude).toContain(`${E2E_SPECS} specs / ${E2E} tests`);
  });

  it("the PAD's test-distribution table + coverage doctrine carry the live counts", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`| Unit | ${SUITES} | ${UNIT} |`);
    expect(pad).toContain(`| E2E | ${E2E_SPECS} specs | ${E2E} |`);
    expect(pad).toContain(`| Smoke | 1 script | ${SMOKE} legs |`);
    expect(pad).toContain(`carry ${UNIT}/${E2E}/${SMOKE} and change together`);
  });

  it("the SKILL frontmatter carries the live gate state", () => {
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`unit ${UNIT}/${UNIT} (${SUITES} files)`);
    expect(skill).toContain(`e2e ${E2E}/${E2E} (${E2E_SPECS} specs)`);
    expect(skill).toContain(`smoke ${SMOKE}/${SMOKE}`);
  });

  it("the README env table carries the six-knob contract (both directions with .env.example)", () => {
    const readme = read("README.md");
    for (const knob of [
      "DATABASE_URL",
      "AUTH_SECRET",
      "NEXT_PUBLIC_SITE_URL",
      "VIRALPOST_PROXY_HOPS",
      "VIRALPOST_DISABLE_IN_APP_OTP",
      "VIRALPOST_DISABLE_IN_APP_RESET",
    ]) {
      expect(readme, `the ${knob} row must sit in the README env table`).toContain(
        `| \`${knob}\` |`,
      );
    }
  });

  it("the AGENTS plans map carries the session-9 round (the living plans census)", () => {
    const agents = read("AGENTS.md");
    expect(agents).toContain("session-9 rate-limiter trust warning");
  });

  it("the property layer's doc claim is TRUE (the F9-5 cure: PAD cites fast-check, the suite exists)", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain("Property tests (fast-check) on the generator contract");
    // and the suite itself is on disk (this file's own sibling)
    expect(read("tests/property.test.ts")).toContain("fast-check");
  });
});
