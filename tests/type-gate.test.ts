// Session-174 (WP-1): THE TYPE-GATE HARDENING — the config source-pin
// battery. The rotation trigger: the repo's OWN newest artifacts (commit
// 25f1847 — skills/web-application/SKILL.md v1.0.0, the four-sibling
// family distillation, + skills/web-application/codebase-evaluation-
// report.md, the comparative audit that ranks neo-crm #1 at 8.55 while
// naming its defect register). The report's §9.2 graft list prescribes
// exactly the three moves this round lands; its findings register carries
// them (F-5 Medium · F-6 Medium · N-4 Low, all Verified). The code-wins
// rule runs in reverse this round: the code disagrees with the repo's own
// distilled doctrine — so the code is what gets fixed.
//
// TEMPLATE-FAMILY LINEAGE NOTE (re-attributed session 10, F10-4 — the
// F8-6 precedent): the session numbers and the scripts/sweep.ts
// citations below describe the NEO-CRM tree this battery was authored
// against. In THIS tree scripts/ holds census, prisma-env, smoke-test
// (install_packages.sh was retired at session-19, S19-16 — no sweep.ts
// ever existed here either) and the pins below assert the
// POST-fix state that carried over with the battery (ignoreBuildErrors
// unset, full strictness, one lockfile), which is exactly this repo's
// live config. The historical narration stays for provenance; nothing
// in it describes a file that exists here.
//
// The audit's finding register (each verified live against the source,
// in the CRM tree):
//   F-174a  next.config.ts set typescript.ignoreBuildErrors: true — the
//           build was NOT a type gate; a planted type error compiled
//           GREEN into the deployable artifact (reproduced live at this
//           round's gate-proof: the SAME plant swallowed under the old
//           posture, caught under the new one). The repo's own skill
//           §2: "do NOT set ignoreBuildErrors — the build should be the
//           type gate"; the report §9.2: "From zero-balance: drop
//           ignoreBuildErrors and make the build the type gate".
//   F-174b  tsconfig.json carried noImplicitAny: false — weakened strict
//           mode (the report §9.2: "From digma: enable full TS
//           strictness"). The flip probe surfaced exactly THREE
//           implicit-any stragglers repo-wide — in the CRM's
//           scripts/sweep.ts (its find/union helpers against a bare new
//           Map()). The entire src/ tree was already clean.
//   F-174c  Two lockfiles committed (bun.lock + package-lock.json) — the
//           s61/s62 §16ba npm-world-parity rule, superseded by the new
//           skill's Appendix A lesson 14: "Two lockfiles in one repo is
//           a reproducibility bug — one package manager, one lockfile".
//           The npm-world path (install_packages.sh — since retired
//           here, session-19 S19-16) installs by package
//           NAME from the registry — it never consumed the lockfile.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The comment-stripped views (the s46 idiom — a config-file comment can
// never masquerade as a live directive). Session-26 (S26-6) made the
// stripper STRING-AWARE: the regex block-comment pass treated the `/*`
// inside tsconfig's glob strings ("@/*", "**/*.mts") as a phantom
// comment OPEN and swallowed everything to the next `*/` — the include
// array vanished from the stripped view (live-caught by the S26-6 mts
// pin; the strict/exclude pins survived only because they sit outside
// the swallowed span). The state machine below tracks in-string state
// so comment markers inside string literals are never comment markers;
// escaped quotes inside strings are passed through. tsconfig.json
// carries // line comments; next.config.ts carries // lines + one
// /* */ block.
const stripComments = (s: string) => {
  let out = "";
  let i = 0;
  let inString = false;
  while (i < s.length) {
    const c = s[i];
    if (inString) {
      if (c === "\\") {
        out += c + (s[i + 1] ?? "");
        i += 2;
        continue;
      }
      if (c === '"') inString = false;
      out += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inString = true;
      out += c;
      i += 1;
      continue;
    }
    if (c === "/" && s[i + 1] === "*") {
      const end = s.indexOf("*/", i + 2);
      i = end < 0 ? s.length : end + 2;
      out += " ";
      continue;
    }
    if (c === "/" && s[i + 1] === "/") {
      const nl = s.indexOf("\n", i);
      i = nl < 0 ? s.length : nl;
      continue;
    }
    out += c;
    i += 1;
  }
  return out;
};

const nextConfig = () => stripComments(read("next.config.ts"));
const tsconfig = () => stripComments(read("tsconfig.json"));
const pkg = () => JSON.parse(read("package.json")) as { scripts?: Record<string, string> };

describe("session-174: THE TYPE-GATE HARDENING (the build fails on type errors)", () => {
  it("next.config.ts carries NO ignoreBuildErrors — the build IS the type gate (F-174a, the zero-balance graft)", () => {
    // The repo's own distilled skill forbids it (§2: "do NOT set
    // ignoreBuildErrors — the build should be the type gate"). The old
    // posture's hazard, demonstrated live at this round's gate-proof: a
    // planted type error compiled GREEN into the deployable artifact —
    // the type gate rode ONLY on the manual `bun run typecheck` step, a
    // skipped-command hazard. Both the directive form and the block form
    // are barred (comment-stripped, so a retired-explainer comment can
    // never masquerade as the live directive).
    expect(nextConfig()).not.toMatch(/ignoreBuildErrors\s*:/);
  });

  it("tsconfig.json runs FULL strictness — strict true, no noImplicitAny override (F-174b, the digma graft)", () => {
    // strict: true stays; the noImplicitAny: false escape hatch is
    // retired. (In the CRM tree the flip surfaced three stragglers in
    // its scripts/sweep.ts; THIS src/ tree was already clean, so the
    // override protected nothing — the lineage note above.)
    const cfg = tsconfig();
    expect(cfg).toMatch(/"strict"\s*:\s*true/);
    expect(cfg).not.toMatch(/"noImplicitAny"\s*:/);
  });


  it("ONE lockfile — bun.lock at the repo root, package-lock.json retired (F-174c, the single-lockfile doctrine)", () => {
    // The repo's own new skill, Appendix A lesson 14: "Two lockfiles in
    // one repo is a reproducibility bug — one package manager, one
    // lockfile." The npm-world path (install_packages.sh — retired in
    // this repo at session-19, S19-16) installs by package
    // NAME from the registry — it never consumed the lockfile,
    // so retiring it breaks nothing. The outputFileTracingExcludes
    // entry STAYS in next.config.ts as the defensive tripwire (an
    // accidental reintroduction still never ships in an artifact).
    expect(existsSync(join(root, "bun.lock"))).toBe(true);
    expect(existsSync(join(root, "package-lock.json"))).toBe(false);
    // the tripwire entry rides the artifact-hygiene excludes
    expect(nextConfig()).toContain('"package-lock.json"');
  });
  it("the gate chain keeps typecheck BEFORE build (the fast-gates-first order)", () => {
    // The manual `bun run typecheck` stays the FASTER signal (a bare tsc
    // run beats a full artifact build); the build is the ENFORCER (type
    // errors fail the artifact), typecheck remains the quick diagnostic.
    const gate = pkg().scripts?.["gate"] ?? "";
    expect(gate).toMatch(/lint.*typecheck.*test.*build.*smoke.*test:e2e/);
  });
});

describe("session-7: THE DEV-SCRIPT WATCH-ROOT CONTRACT (the tee feedback loop)", () => {
  it("the dev script writes NO log inside the Turbopack-watched repo root (F7-0)", () => {
    // The scaffold's `next dev -p 3000 2>&1 | tee dev.log` piped request
    // logs into the watched root: every request wrote dev.log → a
    // Fast-Refresh rebuild → a full page reload → more request logs — a
    // self-sustaining ~3.3-loads/s loop whenever a browser held the page
    // (A/B-verified live at session 7: with the tee, window markers
    // never survived 3s and navType=reload repeated; without it, the
    // page held stable and the mobile menu opened/navigated normally).
    // Nothing reads dev.log — the gate boots the standalone artifact
    // directly, and operators can redirect output themselves. The pin
    // holds the exact script form so the loop cannot return.
    expect(pkg().scripts?.dev).toBe("next dev -p 3000");
  });
});

describe("session-22: THE BUN POSTINSTALL PERMISSION (trustedDependencies, S22-8)", () => {
  // S22-8: package.json carried a dead `allowScripts` block — Bun does
  // not read that field (its postinstall-permission mechanism is
  // `trustedDependencies`, binary-scan-verified), so the documented
  // "let prisma's postinstall run prisma generate on install" permission
  // never applied. The permission now lives where Bun reads it.
  const manifest = () =>
    JSON.parse(read("package.json")) as {
      trustedDependencies?: string[];
      allowScripts?: Record<string, boolean>;
    };

  it("trustedDependencies carries prisma + @prisma/client (the install-time generate)", () => {
    const trusted = manifest().trustedDependencies ?? [];
    expect(trusted).toContain("prisma");
    expect(trusted).toContain("@prisma/client");
    expect(trusted).toContain("unrs-resolver"); // the pre-existing entry stays
  });

  it("the dead allowScripts block is retired (Bun never read it)", () => {
    expect(manifest().allowScripts).toBeUndefined();
  });
});

// Session-26 (S26-6): THE THREE-CONFIG SKILLS-EXCLUSION DOCTRINE, PINNED.
// tsconfig, eslint, and vitest each exclude the owner's `skills/` catalog
// (not app code — its own .test.ts files must never run in the app's gates)
// and tsconfig's `**/*.mts` include keeps the vitest config inside
// `tsc --noEmit` (the documented S18-5 silent gap: the TS glob "**/*.ts"
// does NOT match .mts files, so the session-18 rename silently dropped
// the vitest config from the typecheck gate — a type error there
// surfaced only as a Vite runtime failure). All four mechanics were
// comment-only (unpinned) — silent-regression surfaces with precedent.
// Mutation battery: plant a missing exclude/include in a scratch copy
// → the pin REDs.
describe("session-26 (S26-6): the config mechanics — skills excluded from every gate, the .mts include (the S18-5/S20-16 doctrine, pinned)", () => {
  it("tsconfig.json includes **/*.mts (the vitest config stays inside tsc --noEmit)", () => {
    const cfg = tsconfig();
    expect(cfg).toMatch(/"include"\s*:\s*\[[^\]]*"\*\*\/\*\.mts"/);
  });

  it("tsconfig.json excludes skills/", () => {
    const cfg = tsconfig();
    expect(cfg).toMatch(/"exclude"\s*:\s*\[[^\]]*"skills"/);
  });

  it("eslint.config.mjs ignores skills/ (the catalog is not linted)", () => {
    const eslint = read("eslint.config.mjs");
    // The ignores array: ["node_modules/**", ".next/**", "next-env.d.ts", "skills"]
    expect(eslint).toMatch(/ignores:\s*\[[^\]]*"skills"/);
  });

  it("vitest.config.mts excludes skills/** (the catalog's own tests never run)", () => {
    const vitest = read("vitest.config.mts");
    expect(vitest).toMatch(/exclude:\s*\[[^\]]*"skills\/\*\*"/);
  });
});
