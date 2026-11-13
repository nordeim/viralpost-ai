// Session-39 (S39-5): THE TYPED-ENVELOPE CENSUS — every client fetch
// site in src/components/ parses its response through a typed cast.
//
// The genus: `const body = await res.json().catch(() => null);` leaves
// body as implicit `any` — gate-blind under the documented S25-18c
// off-list posture (`@typescript-eslint/no-explicit-any` is off), so
// the envelope contract (body.error.message, body.data.resetUrl, …)
// is unchecked at exactly the sites that read it. The sibling fetch
// islands have carried the typed-cast idiom since their birth
// (generator-card.tsx: `as GenerateResponse | null`; contact-form.tsx:
// `as { ok: boolean; error?: … } | null`) — the auth family's six
// sites (login-card ×5, reset-password-screen ×1) were the residue.
//
// The census walks every src/components/**/*.{ts,tsx} line carrying
// `res.json()` and asserts an ` as ` cast on the same line — the
// S31-6 generalized-census form (imports there, envelope casts here).
// RED at birth (the six sites are untyped); GREEN when S39-5 lands
// the casts. The battery (a stripped cast → exactly this census RED)
// is on record in the session-39 plan.
//
// Lineage note: session numbers in this file cite THIS repo's ledger
// (docs/session_1..44.md) unless marked otherwise.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");

// Recursive (the runner scans src/ for *.test.ts too — none exist
// today, but the census mirrors the docs-counts S23-10 lesson: a flat
// scan is one directory level from blind).
function componentFiles(): string[] {
  return readdirSync(join(root, "src", "components"), { recursive: true })
    .map(String)
    .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
    .sort();
}

describe("session-39 (S39-5): the typed-envelope census (every client res.json() carries a cast)", () => {
  it("every res.json() line in src/components/ casts its parse (the generator-card idiom)", () => {
    const offenders: string[] = [];
    for (const f of componentFiles()) {
      const lines = readFileSync(join(root, "src", "components", f), "utf8").split("\n");
      lines.forEach((line, i) => {
        // The cast idiom's two shapes: `…) as Type` on one line, or the
        // multi-line form where `as` ends the line and the type rides
        // the next (contact-form's shape) — hence the trailing-`as` arm.
        const cast = line.includes(" as ") || /\bas\s*$/.test(line);
        if (line.includes("res.json()") && !cast) {
          offenders.push(`${f}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    // The offenders list names every untyped site (the battery's
    // planted defect — one stripped cast — lands here by name).
    expect(offenders).toEqual([]);
  });
});
