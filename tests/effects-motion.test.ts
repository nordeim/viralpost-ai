import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Session-12 (F12-8 + F12-9): the effects' motion/power hygiene — the
// two canvas effects' boundary behavior, source-pinned (the effects are
// client WebGL/canvas code; the unit layer pins the structural contract
// the e2e layer cannot probe — rAF scheduling and DPR capture are
// invisible to a DOM walk).
//
// F12-8: the particle title's reduced-motion branch used to keep a
// 60 fps requestAnimationFrame loop redrawing the SAME plain text all
// day (the phrase changes only every ~3 s) — contradicting the
// reduced-motion intent the globals.css collapse expresses for CSS
// animations (a canvas loop is out of its reach). The cure: the
// reduced branch draws once and schedules the phrase change with a
// timeout (cleared on dispose); NO rAF registration may sit inside the
// reduced shape.
//
// F12-9: the WebGL hero captured window.devicePixelRatio ONCE at boot
// and reused the stale value in resize() — a cross-monitor move
// rendered over/under-sharpened until remount. particle-text re-reads
// DPR inside its layout() (the correct pattern); iridescence now
// matches it.

const read = (rel: string) =>
  readFileSync(join(import.meta.dirname, "..", rel), "utf8");

describe("session-12 (F12-8): the particle title's reduced-motion shape schedules by timeout, never rAF", () => {
  // The pins read comment-stripped source (the s64/s65/s66
  // needle-in-own-doc lesson — the cure's own explanatory comment names
  // the retired API, which is documentation, not a live reference).
  const bare = () =>
    read("src/components/effects/particle-text.tsx")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

  it("the reduced branch contains NO requestAnimationFrame registration (draw once, schedule the phrase change)", () => {
    const src = bare();
    // The branch is nested inside frame() (6-space closing brace — the
    // non-greedy span must stop THERE, not at frame's own tail where the
    // full-motion rAF registration lives).
    const reduced = src.match(/if \(reduced\) \{[\s\S]*?\n {6}\}/);
    expect(reduced, "the reduced branch must exist").toBeTruthy();
    expect(reduced![0]).not.toContain("requestAnimationFrame");
    expect(reduced![0]).toContain("setTimeout");
  });

  it("the reduced branch's timeout is cleared on dispose (no leaked phrase timer)", () => {
    const src = bare();
    // The cleanup path cancels BOTH schedulers (rAF + the reduced-mode
    // timeout) — a leaked timeout would fire after unmount.
    const reduced = src.match(/if \(reduced\) \{[\s\S]*?\n {6}\}/);
    expect(reduced, "the reduced branch must exist").toBeTruthy();
    const timerVar = reduced![0].match(/(\w+)\s*=\s*setTimeout/);
    expect(timerVar, "the reduced branch assigns its timeout to a handle").toBeTruthy();
    expect(src).toMatch(new RegExp(`clearTimeout\\(${timerVar![1]}\\)`));
  });
});

describe("session-12 (F12-9): the WebGL hero re-reads devicePixelRatio inside resize()", () => {
  it("resize() computes the canvas size from a FRESH devicePixelRatio read (not the boot-time capture)", () => {
    // Comment-stripped (the needle-in-own-doc lesson — the cure's own
    // comment names the API; documentation is not a live reference).
    const src = read("src/components/effects/iridescence.tsx")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    const resize = src.match(/const resize = \(\) => \{[\s\S]*?\n {4}\};/);
    expect(resize, "the resize closure must exist").toBeTruthy();
    expect(resize![0]).toContain("devicePixelRatio");
    // The pre-cure boot-time capture sat DIRECTLY after the disposed
    // flag at the effect's top level (the stale-DPR genus — the cure
    // moved the read inside resize, so the adjacency is gone).
    expect(src).not.toMatch(/let disposed = false;\s*\n\s*const dpr = Math\.min\(window\.devicePixelRatio/);
  });
});
