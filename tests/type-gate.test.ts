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
// The audit's finding register (each verified live against the source):
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
//           implicit-any stragglers repo-wide — scripts/sweep.ts:862
//           (find = (k)) + :873 (union = (x, y)) against a bare new
//           Map() — the inline twin of the FULLY-TYPED pure seam at
//           line 607. The entire src/ tree was already clean.
//   F-174c  Two lockfiles committed (bun.lock + package-lock.json) — the
//           s61/s62 §16ba npm-world-parity rule, superseded by the new
//           skill's Appendix A lesson 14: "Two lockfiles in one repo is
//           a reproducibility bug — one package manager, one lockfile".
//           The npm-world path (install_packages.sh) installs by package
//           NAME from the registry — it never consumed the lockfile.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// The comment-stripped views (the s46 idiom — a config-file comment can
// never masquerade as a live directive). tsconfig.json carries // line
// comments; next.config.ts carries // line comments + one /* */ block.
const stripComments = (s: string) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/[^\n]*$/gm, "$1");

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
    // retired. The flip surfaced exactly three stragglers repo-wide
    // (scripts/sweep.ts — the union-find inline twin); the src/ tree was
    // already clean, so the override protected nothing but the stragglers.
    const cfg = tsconfig();
    expect(cfg).toMatch(/"strict"\s*:\s*true/);
    expect(cfg).not.toMatch(/"noImplicitAny"\s*:/);
  });


  it("ONE lockfile — bun.lock at the repo root, package-lock.json retired (F-174c, the single-lockfile doctrine)", () => {
    // The repo's own new skill, Appendix A lesson 14: "Two lockfiles in
    // one repo is a reproducibility bug — one package manager, one
    // lockfile." The npm-world path (install_packages.sh) installs by
    // package NAME from the registry — it never consumed the lockfile,
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
