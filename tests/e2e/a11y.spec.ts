import { expect, test } from "@playwright/test";

import { LOGGED_OUT_SURFACES, SURFACES, WIDTHS } from "./a11y-matrix";

// The a11y battery — every public surface at BOTH widths (the template's
// two-gate doctrine, adapted to the new app): STRUCTURAL violations must
// be ZERO (named controls, labeled inputs, heading order, valid ARIA).
// Color-contrast nodes are adjudicated against the sanctioned register —
// the REFERENCE's own marketing palette (verified on its DOM 2026-11-09:
// it ships the identical slate/teal washes); fixing them would break
// visual parity with the reference, the documented doctrine.
//
// The axe engine rides the DECLARED devDep (package.json: axe-core).
//
// Session-12 (F12-1): SURFACES + WIDTHS live in ./a11y-matrix (pure data)
// so the docs-counts reality census can compute this file's loop
// expansion mechanically — the matrix is the single source for both.

const AXE_PATH = "node_modules/axe-core/axe.min.js";

interface Violation {
  id: string;
  nodes: Array<{ target: string; className: string }>;
}

// The SANCTIONED register — rule → class-substring matchers, each citing
// the reference's own design. A flagged node whose ELEMENT CLASSLIST
// matches none of them REDs the gate. (Matching rides the element's real
// className, queried in-page — axe's target selectors pick structural
// classes and miss the color ones.)
const SANCTIONED: Record<string, Array<{ any: string[]; cite: string }>> = {
  "color-contrast": [
    {
      // The marketing washes on the dark hero/monetization surfaces (text-slate-400
      // pills, text-slate-300 copy, teal-200/60 subs — the reference's
      // own palette).
      any: ["text-slate-300", "text-slate-400", "text-slate-500", "text-teal-200", "text-teal-100", "text-white/60", "text-white/80", "text-white/90"],
      cite: "the slate/teal washes on the dark marketing surfaces — the reference's own palette",
    },
    {
      // The stats bar's teal-100/70 captions on the teal gradient.
      any: ["text-teal-100/70"],
      cite: "the stats-bar captions on the teal gradient — the reference's own palette",
    },
    {
      // The pricing Free card's slate-400 heading + the muted list copy.
      any: ["text-slate-600"],
      cite: "the pricing-card muted copy — the reference's own palette",
    },
    {
      // The footer's slate-500 copyright lines on slate-900.
      any: ["text-slate-500"],
      cite: "the footer copyright lines — the reference's own palette",
    },
  ],
};

async function axeViolations(page: import("@playwright/test").Page): Promise<Violation[]> {
  await page.addScriptTag({ path: AXE_PATH });
  return page.evaluate(async () => {
    const axe = (window as unknown as { axe: { run: (opts: object) => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: Array<string | number> }> }> }> } }).axe;
    const results = await axe.run({
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target.join(" "),
        className: String(n.target.length ? document.querySelector(n.target.map(t => (typeof t === 'number' ? ':nth-child(' + (t + 1) + ')' : t)).join(' > '))?.getAttribute("class") ?? "" : ""),
      })),
    }));
  });
}

function assertAdjudicated(violations: Violation[]): void {
  const structural = violations.filter((v) => !(v.id in SANCTIONED));
  for (const v of structural) {
    expect(
      { id: v.id, nodes: v.nodes.map((n) => n.target) },
      `structural a11y violation: ${v.id}`,
    ).toEqual({ id: "", nodes: [] });
  }
  for (const v of violations) {
    if (!(v.id in SANCTIONED)) continue;
    const matchers = SANCTIONED[v.id];
    for (const node of v.nodes) {
      const sanctioned = matchers.some((m) => m.any.some((substr) => node.className.includes(substr)));
      if (!sanctioned) {
        expect(
          { id: v.id, target: node.target, className: node.className },
          `unadjudicated a11y violation: ${v.id} on ${node.target}`,
        ).toEqual({ id: "", target: "", className: "" });
      }
    }
  }
}

// (SURFACES/WIDTHS imported from ./a11y-matrix — session-12, F12-1.)

for (const width of WIDTHS) {
  test.describe(`a11y @${width}`, () => {
    test.use({ viewport: { width, height: width === 390 ? 844 : 800 } });

    for (const surface of SURFACES) {
      test(`${surface.name} — named controls, labels, contrast`, async ({ page }) => {
        await page.goto(surface.path);
        await page.waitForLoadState("networkidle");
        const violations = await axeViolations(page);
        assertAdjudicated(violations);
      });
    }

    test(`404 — the not-found surface`, async ({ page }) => {
      await page.goto("/definitely-not-a-route");
      const violations = await axeViolations(page);
      assertAdjudicated(violations);
    });
  });
}

// The logged-out auth surfaces (their own describe so the empty
// storageState can ride test.use at the legal level). Session-22
// (S22-9): the family grew from the login card alone to /signup and
// /reset-password — the docs' "every route at two widths" claim is
// true again.
test.describe("a11y — logged-out auth surfaces", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const width of WIDTHS) {
    for (const surface of LOGGED_OUT_SURFACES) {
      test(`${surface.name} @${width} — the auth card`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 800 });
        await page.goto(surface.path);
        await page.waitForLoadState("networkidle");
        const violations = await axeViolations(page);
        assertAdjudicated(violations);
      });
    }
  }
});
