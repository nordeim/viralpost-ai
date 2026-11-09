import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-131 pins — TEMPLATE-FAMILY LINEAGE, re-attributed session 10
// (F10-4, the F8-6 precedent): the header below originally narrated the
// CRM scaffold's toast walk (its reference's profile page, its walk22
// probe battery) as if it were THIS reference's evidence. It never was:
// viralpostai.base44.app has no photo-upload profile page, and this
// repo's own dossier (docs/reference-investigation.md) records no toast
// surface on any route. What actually holds HERE:
//
//   * THIS reference ships no toast system on any censused surface —
//     our toast is a DELIBERATE SUPERSET construction (the mobile-nav
//     doctrine: the reference's own absence covered by our working
//     surface). The superset justification stands; only the CRM-walk
//     narration was phantom.
//   * The neutral-900 hover literal (D-131a0) and the dead-animation
//     retirement (D-131a1) were scaffold-era fixes whose SESSION
//     NUMBERS (128–131) belong to the template family, not this repo's
//     round history. The classes they pinned are still OUR live
//     contract; the pins below freeze that contract as it ships.
//   * The "tabs.tsx / mobile-nav.tsx" citations described the CRM
//     tree's surfaces — neither file exists here (the s10 sweep
//     verified; session-4's directory census). The toast X is simply
//     the only hover:text-neutral-900 ride in this tree's src/.

const root = path.resolve(import.meta.dirname, "..");
const srcRaw = readFileSync(path.join(root, "src/components/ui/toast.tsx"), "utf8");

// comment-stripped source for the NEGATIVE pins — the fix comments
// themselves name the retired strings (the D-131a0/D-131a1 records), so
// negatives must read code-only (the mutation-feedback stripComments idiom)
function stripComments(s: string): string {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}
const src = stripComments(srcRaw);

/** A bounded region around an anchor (a failed anchor fails the pin). */
function regionAt(anchor: string, before: number, after: number): string {
  const i = src.indexOf(anchor);
  expect(i, `anchor not found: ${anchor}`).toBeGreaterThanOrEqual(0);
  return src.slice(Math.max(0, i - before), i + after);
}

describe("the toast family contract (scaffold-lineage pins, re-attributed session 10 — ours the deliberate superset over a reference that ships no toast)", () => {
  it("the close X rides the neutral-900 hover literal (the scaffold's interactive-hover ink, carried into our literal family)", () => {
    // the button block (the className rides the line above the aria-label)
    const x = regionAt('aria-label="Dismiss notification"', 400, 60);
    expect(x).toContain("hover:text-neutral-900");
    expect(x).not.toContain("hover:text-foreground");
  });

  it("the card carries NO data-[state] animation arms — the inert scaffold string retired", () => {
    expect(src).not.toContain("data-[state=open]:animate-in");
    expect(src).not.toContain("data-[state=closed]:animate-out");
    expect(src).not.toContain("slide-in-from-bottom-4");
  });

  it("the viewport geometry family (the walk-censused contract: bottom-right from sm, top-full-width below, max-w-[420px] at md, p-4, gap-2)", () => {
    expect(src).toContain("fixed top-0 z-[100]");
    expect(src).toContain("sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]");
    expect(src).toContain("gap-2 p-4");
    expect(src).toContain('aria-label="Notifications"');
    expect(src).toContain('role="region"');
  });

  it("the card chrome family (rounded-xl + p-3.5 + shadow-lg — live-censused 12px radius, 14px padding, the two-layer lg shadow)", () => {
    expect(src).toContain("rounded-xl border p-3.5 shadow-lg");
    expect(src).toContain('role="status"');
  });

  it("the three variant borders (the walk-censused success/error/info pair)", () => {
    expect(src).toContain('item.variant === "success" && "border-emerald-200 bg-white"');
    expect(src).toContain('item.variant === "error" && "border-rose-200 bg-white"');
    expect(src).toContain('item.variant === "info" && "border-line bg-white"');
  });

  it("the 4000ms auto-dismiss + the max-4 cap (live-measured 4126/4118ms; 4 cards after 5 pushes)", () => {
    expect(src).toContain("setTimeout(() => dismiss(item.id), 4000)");
    expect(src).toContain(".slice(-4)");
  });

  it("the title/description classes (the walk-censused 14px/500 title + the 12px muted description)", () => {
    expect(src).toContain('"text-sm font-medium text-foreground"');
    expect(src).toContain('"mt-0.5 text-xs text-muted"');
  });

  it("the icon family (h-4.5 w-4.5 + the three token rides — live-censused 18px rgb(16,185,129) success)", () => {
    expect(src).toContain("h-4.5 w-4.5 text-success");
    expect(src).toContain("h-4.5 w-4.5 text-danger");
    expect(src).toContain("h-4.5 w-4.5 text-primary");
  });

  it("the hover-pause seam (the onMouseEnter/Leave pair — live-proven: holds at 6.5s, dismisses ~4.1s after the unpause)", () => {
    expect(src).toContain("onMouseEnter={() => setPaused(true)}");
    expect(src).toContain("onMouseLeave={() => setPaused(false)}");
  });
});
