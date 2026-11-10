import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { SURFACES as A11Y_SURFACES, WIDTHS as A11Y_WIDTHS } from "./e2e/a11y-matrix";

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
// property suite, +10 this suite). s10: 463/32 files (+2 the F10-17
// dev-origins pins, +5 the F10-1 palette-completion + census pins, +2 the
// F10-11 siteUrl fallback pins, +4 the F10-11 boot-env shape pins, +1 the
// F10-13 hashtag-window pin, +4 the F10-3 NOT_FOUND_LAYOUT pins, +3 the
// F10-2 count-site pins below) and the e2e 48 → 49 (+1 the F10-10
// history-nav close pin). s11: 488/34 files (+2 the F11-18 hygiene-shape
// db-path fixtures, +5 the design-tokens censuses/retirements, +4 the
// verification seam suite, +4 the funnel/double-submit source pins, +1
// the over-length message pin, +1 the navbar a11y pin, +1 the signup
// P2002 pin, +5 the gate-script pins, +2 the doctrine/inventory censuses
// below) and the e2e 49 → 50 (+1 the full-funnel e2e). s12: 507/36 files
// (+7 the otp seam suite, +3 the effects-motion pins, +2 the login-views
// UX-boundary pins, +2 the verification invalid-copy pins −1 the F12-14
// dedup, +1 the stepped-semantic census arm, +5 the reality +
// semantic-prose censuses below) and the e2e 50 → 52 (+2 the
// reset-funnel e2e — F12-2, the funnel's first behavioral coverage),
// the specs 8 → 9. s13: 526/37 files (+6 the S13-1 boot-env delivery-
// polarity pins, +3 the S13-2/S13-5 auth-contract pins, +2 the S13-3/
// S13-7 effects-motion pins, +8 the from-url seam suite — S13-4, the
// resolver's first behavioral coverage, +1 the S13-10 forms-guard census
// arm below) and the e2e 52 → 54 (+2 the from_url round-trip legs —
// S13-4's wiring proof). ONE post-lockstep iteration: the OTP-log pins
// were first written inside a for-of (one source block, two runner
// tests — census 526 vs runner 527, caught at ship time); unrolled to
// explicit its + the loop-guard arm (its own +1 rides this ladder:
// +6 boot-env, +3 auth-contract, +2 effects-motion, +8 from-url,
// +2 the forms-guard + loop-arm censuses).

// ---- THE COUNT CONSTANTS (re-anchor here + every doc site below) ---------

/** Vitest unit checks (tests/*.test.ts — the exact `bun run test` total).
 *  Session-12 (F12-1): the constants are pinned to the LIVE SUITES ON
 *  DISK by the reality census below — a test added without re-anchoring
 *  here fails `bun run test` before any doc site is consulted. */
const UNIT = 538;
/** Vitest suite files. */
const SUITES = 37;
/** Playwright e2e checks (incl. the setup project's 1). */
const E2E = 55;
/** Playwright e2e spec files. */
const E2E_SPECS = 9;
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

  // Session-10 (F10-2): the three sites the s9 gate missed — the file-tree
  // prose in README + PAD and the SKILL's OWN pre-ship checklist line all
  // carried pre-s9 numbers while every table above them said the live
  // counts (README was internally inconsistent: "29" vs its own "31"
  // table row). The checklist item that exists to enforce lockstep was
  // itself the stale site — pinned here now.
  it("the README file-hierarchy line carries the live suite count", () => {
    const readme = read("README.md");
    expect(readme).toContain(`📂 tests/                  ${SUITES} unit suites + 📂 e2e/ (${E2E_SPECS} Playwright specs)`);
  });

  it("the PAD file-tree line carries the live suite count", () => {
    const pad = read("Project_Architecture_Document.md");
    expect(pad).toContain(`← ${SUITES} unit suites + e2e/ (${E2E_SPECS} specs)`);
  });

  it("the SKILL's pre-ship checklist carries the live counts (the lockstep enforcer, itself locked)", () => {
    const skill = read("viralpost-ai_SKILL.md");
    expect(skill).toContain(`Gate green at the exact counts (${UNIT} unit / ${E2E} e2e / ${SMOKE} smoke`);
  });

  // Session-11: the neo-crm doctrine-census mini adopted — every
  // command the AGENTS table advertises must exist in package.json's
  // scripts (read LIVE; a phantom command in the operator's quick
  // reference is the docs-lie genus), and the PAD §12 inventory rows
  // must carry their file's live line count (the F11-8 re-anchor made
  // mechanical).
  it("every AGENTS Commands-table command exists in package.json's scripts (the doctrine census, read live)", () => {
    const agents = read("AGENTS.md");
    const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
    // Every backticked `bun run …` form in a table row (cells may carry
    // trailing prose); the `-- args` suffix of the one-unit-file form maps
    // onto its base script.
    const cells = [...agents.matchAll(/\|.*?`([^`]+)`/g)].map((m) => m[1]);
    const commands = cells.filter((c) => c.startsWith("bun run "));
    expect(commands.length).toBeGreaterThanOrEqual(8);
    for (const cmd of commands) {
      const script = cmd.replace("bun run ", "").split(" --")[0].trim();
      expect(pkg.scripts[script], `AGENTS advertises '${cmd}' but package.json has no '${script}' script`).toBeDefined();
    }
  });

  it("the PAD §12 Key Files rows carry their files' LIVE line counts (the inventory census)", () => {
    const pad = read("Project_Architecture_Document.md");
    const rows = [...pad.matchAll(/^\| `([^`]+)` \| (\d+) \|/gm)];
    expect(rows.length).toBeGreaterThanOrEqual(17);
    for (const [, file, lines] of rows) {
      const full = join(root, file);
      expect(existsSync(full), `PAD §12 lists ${file} — it must exist`).toBe(true);
      const actual = readFileSync(full, "utf8").split("\n").length - (readFileSync(full, "utf8").endsWith("\n") ? 1 : 0);
      expect(actual, `PAD §12 says ${file} is ${lines} lines — live count is ${actual} (edit the row in the same commit)`).toBe(
        Number(lines),
      );
    }
  });
});

// ---------------------------------------------------------------------------
// Session-12 (F12-1): THE REALITY CENSUS — the count constants are pinned
// to the LIVE SUITES ON DISK, not only to the doc sites above. The badge-
// drift genus retired at session 9 assumed the constants were honest; a
// test added without bumping UNIT left every doc stale while the gate
// stayed green (the constants and the docs agreed with each other and
// lied about reality together). These arms count the suites the way the
// runners do — a constant that drifts from disk now fails `bun run test`
// BEFORE any doc site is consulted.
// ---------------------------------------------------------------------------

describe("docs-counts: session-12 — the reality census (constants vs DISK, F12-1)", () => {
  it("UNIT/SUITES match the live vitest surface (files + it/test blocks counted on disk)", () => {
    const unitFiles = readdirSync(join(root, "tests"))
      .filter((f) => f.endsWith(".test.ts"))
      .sort();
    expect(unitFiles.length, `tests/*.test.ts on disk: ${unitFiles.length} files (SUITES says ${SUITES})`).toBe(SUITES);
    let unitTests = 0;
    for (const f of unitFiles) {
      unitTests += (read(`tests/${f}`).match(/^\s*(?:it|test)\(/gm) ?? []).length;
    }
    // The vitest config also admits src/**/*.test.ts — none exist today;
    // if one appears, it joins the census (and the count ladder).
    const srcTestFiles = existsSync(join(root, "src"))
      ? readdirSync(join(root, "src"), { recursive: true })
          .filter((f) => String(f).endsWith(".test.ts"))
          .map(String)
      : [];
    for (const f of srcTestFiles) {
      unitTests += (read(join("src", f)).match(/^\s*(?:it|test)\(/gm) ?? []).length;
    }
    expect(unitTests, `it/test blocks on disk: ${unitTests} (UNIT says ${UNIT}) — re-anchor UNIT + every doc site above`).toBe(UNIT);
  });

  it("E2E/E2E_SPECS match the live Playwright surface (source test() + the a11y matrix expansion)", () => {
    const e2eDir = join(root, "tests", "e2e");
    const specFiles = readdirSync(e2eDir).filter((f) => f.endsWith(".spec.ts")).sort();
    expect(specFiles.length, `tests/e2e/*.spec.ts on disk: ${specFiles.length} (E2E_SPECS says ${E2E_SPECS})`).toBe(E2E_SPECS);

    // Source test() blocks across the specs + the setup project (the
    // setup's 1 test is part of the E2E total by the constant's contract).
    const counted = [...specFiles, "auth.setup.ts"];
    let source = 0;
    for (const f of counted) {
      source += (read(`tests/e2e/${f}`).match(/^\s*test\(/gm) ?? []).length;
    }

    // The a11y spec registers tests inside width loops — its source
    // count (3) expands through the shared matrix (the single source
    // both the spec and this census import):
    //   (SURFACES + the 404) × WIDTHS  +  the login card × WIDTHS
    const A11Y_SOURCE_TESTS = 3;
    const a11ySource = (read("tests/e2e/a11y.spec.ts").match(/^\s*test\(/gm) ?? []).length;
    expect(a11ySource, `a11y.spec.ts carries ${A11Y_SOURCE_TESTS} source test() blocks — if you added or moved one, update A11Y_SOURCE_TESTS and the expansion formula`).toBe(A11Y_SOURCE_TESTS);
    const expansion =
      (A11Y_SURFACES.length + 1) * A11Y_WIDTHS.length + // + 1 = the 404 test
      A11Y_WIDTHS.length; // the logged-out login describe
    expect(source - A11Y_SOURCE_TESTS + expansion, `e2e tests on disk: ${source - A11Y_SOURCE_TESTS + expansion} (E2E says ${E2E}) — re-anchor E2E + every doc site above`).toBe(E2E);

    // The width-loop pattern stays a11y-only: a registration loop
    // copied into another spec would silently dodge this census (its
    // source count would understate its real tests).
    for (const f of specFiles) {
      if (f === "a11y.spec.ts") continue;
      expect(read(`tests/e2e/${f}`), `${f} registers tests inside a width loop — extend the reality census's expansion formula`).not.toContain("for (const width");
    }
  });

  // Session-13 (S13-10): the forms-guard — the census counts `it(`/`test(`
  // source blocks, so a registration form the regex CANNOT see would
  // decouple the constants from the runner's executed count (the
  // badge-drift genus one notch deeper: .each( registers N tests per
  // block, .skip(/.only( change what runs, .todo( neither counts nor
  // runs). Zero live instances at birth (verified before the pin
  // landed); comment-stripped so a prose mention is not a violation.
  it("no uncountable registration form in any unit suite or e2e spec (the census's shape contract)", () => {
    const stripComments = (src: string) =>
      src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    const unitFiles = readdirSync(join(root, "tests"))
      .filter((f) => f.endsWith(".test.ts"))
      .sort();
    const e2eFiles = readdirSync(join(root, "tests", "e2e"))
      .filter((f) => f.endsWith(".spec.ts") || f === "auth.setup.ts")
      .sort();
    for (const f of [...unitFiles.map((f) => `tests/${f}`), ...e2eFiles.map((f) => `tests/e2e/${f}`)]) {
      const src = stripComments(read(f));
      const form = src.match(/\.(each|skip|only|todo|concurrent|fails)\(/);
      expect(form, `${f} uses a "${form?.[0] ?? ""}" registration form the reality census cannot count — count it by hand and extend the census, or write plain it(/test( blocks`).toBeNull();
    }
  });

  // Session-13 (S13-10, the loop arm — born from a REAL instance): this
  // round's own OTP-log pin was first written inside a for-of over the
  // two routes — ONE source `it(` block, TWO runner tests; the census
  // said 526 while the runner said 527 (the exact badge-drift genus the
  // census exists to catch, caught by the runner-vs-census diff at
  // ship time). The guard: an it(/test( REGISTRATION at line start
  // inside a for-loop body (an indent-based scan — the loop's body
  // ends at the first non-blank line indented no deeper than the
  // `for` itself). Loops INSIDE a test body stay legal (they assert,
  // they don't register).
  it("no it(/test( registration inside a for-loop body in any unit suite (the census counts source blocks)", () => {
    const stripComments = (src: string) =>
      src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    const unitFiles = readdirSync(join(root, "tests"))
      .filter((f) => f.endsWith(".test.ts"))
      .sort();
    for (const f of unitFiles) {
      const lines = stripComments(read(`tests/${f}`)).split("\n");
      for (let i = 0; i < lines.length; i++) {
        const forLine = lines[i].match(/^(\s*)for \(.*\) \{/);
        if (!forLine) continue;
        const loopIndent = forLine[1].length;
        for (let j = i + 1; j < lines.length; j++) {
          const line = lines[j];
          if (line.trim() === "") continue;
          const indent = line.length - line.trimStart().length;
          if (indent <= loopIndent) break; // the loop body ended
          if (/^(?:it|test)\(/.test(line.trim())) {
            throw new Error(
              `${f}:${j + 1} registers a test inside a for-loop body (line ${i + 1}) — the census counts SOURCE blocks, so the runner would execute more tests than UNIT counts. Unroll the loop into explicit it( blocks (the S13-10 loop-arm precedent).`,
            );
          }
        }
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Session-12 (N12-1): the semantic-prose census STARTER — the neo-crm
// s208–s217 family, scoped to this repo's drift-prone sites. Doc prose
// that names RETIRED forms or carries load-bearing setup steps is pinned
// so the genus can't return (the PAD referenced the retired tw-animate
// file for a full session after its deletion — F12-5).
// ---------------------------------------------------------------------------

describe("docs-counts: session-12 — the semantic-prose census starter (N12-1)", () => {
  it("the PAD carries no retired-form references (tw-animate / the vendor tree line / the stale 409+ prose)", () => {
    const pad = read("Project_Architecture_Document.md");
    // Scoped to the PAD: AGENTS/CLAUDE/SKILL legitimately narrate the
    // session-11 retirement as history; the PAD's ADR-005 + file tree
    // described it as LIVE architecture — the exact drift F12-5 cured.
    expect(pad).not.toContain("tw-animate");
    expect(pad).not.toContain("vendor/");
    expect(pad).not.toContain("409+");
  });

  it("the README quickstart keeps the fresh-clone cp line before the first db command (the checkout leg)", () => {
    const readme = read("README.md");
    const cp = readme.indexOf("cp .env.example .env");
    const push = readme.indexOf("bun run db:push");
    expect(cp, "the quickstart must keep `cp .env.example .env`").toBeGreaterThan(-1);
    expect(push, "the quickstart must keep `bun run db:push`").toBeGreaterThan(-1);
    expect(cp, "the cp must precede the first db command (a pristine clone needs .env before db:push)").toBeLessThan(push);
  });

  it("AGENTS carries the one-owner doctrine (the mutation-battery refinement, N12-2)", () => {
    expect(read("AGENTS.md")).toContain("EXACTLY ONE pin");
  });
});
