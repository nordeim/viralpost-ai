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

  // Session-13 (S13-3): the branch used to draw BEFORE advancing — each
  // timer fire painted the phrase about to retire, so the first phrase
  // held ~2x its window and every swap landed one frame late. The pin
  // reads the ORDER inside the branch (comment-stripped — the cure's
  // own comment narrates the reorder).
  it("the reduced branch ADVANCES the phrase BEFORE drawing it (each phrase exactly one window)", () => {
    const src = bare();
    const reduced = src.match(/if \(reduced\) \{[\s\S]*?\n {6}\}/);
    expect(reduced, "the reduced branch must exist").toBeTruthy();
    const advance = reduced![0].indexOf("textIndex = (textIndex + 1)");
    const draw = reduced![0].indexOf("drawPlain()");
    expect(advance, "the index-advance must sit inside the reduced branch").toBeGreaterThan(-1);
    expect(draw, "the draw call must sit inside the reduced branch").toBeGreaterThan(-1);
    expect(advance, "the advance must precede the draw (draw-after-advance)").toBeLessThan(draw);
  });

  // Session-14 (S14-7): the swap boundary's comparison — the timer fires
  // at EXACTLY the window edge, so a strict > misses the measure-zero
  // on-time arrival and holds the phrase a second full window (the
  // S13-3 symptom recurring at the boundary). The inclusive form swaps
  // on the first arrival at-or-past the edge.
  it("the reduced branch's swap boundary is INCLUSIVE (>= at the window edge)", () => {
    const src = bare();
    const reduced = src.match(/if \(reduced\) \{[\s\S]*?\n {6}\}/);
    expect(reduced, "the reduced branch must exist").toBeTruthy();
    expect(reduced![0]).toContain("if (elapsed >= waitDuration + PHASE_SECONDS.vaporize)");
    expect(reduced![0]).not.toContain("if (elapsed > waitDuration + PHASE_SECONDS.vaporize)");
  });

  // Session-13 (S13-7): both font-fit loops re-read the body's computed
  // font family on EVERY shrink iteration (up to ~42 redundant
  // computed-style reads per rasterize, per undebounced resize). The
  // pin: neither loop body carries the computed-style read anymore
  // (comment-stripped).
  it("neither font-fit loop re-reads the computed font family per iteration (one read per draw call)", () => {
    const src = bare();
    const loops = src.match(/while \([^)]+\)[\s\S]*?\n {6}\}/g) ?? [];
    expect(loops.length, "both font-fit while-loops must exist").toBe(2);
    for (const loop of loops) {
      expect(loop, "the computed-style read must be hoisted out of the loop").not.toContain("getComputedStyle");
    }
    // The hoisted reads still exist (once per draw call, outside the loops).
    expect((src.match(/getComputedStyle\(document\.body\)\.fontFamily/g) ?? []).length).toBe(2);
  });

  // Session-19 (S19-9): in reduced mode the ONLY redraw rides the phrase
  // timer ((wait + vaporize) * 1000 ~= 3s) — a resize ran layout()
  // (which reassigns canvas.width/height and CLEARS the canvas) and the
  // title stayed blank until the next timer fire. The reduced face now
  // repaints synchronously on resize (drawPlain) and skips the particle
  // build (the field is never drawn in reduced mode).
  it("session-19 (S19-9): a reduced-motion resize repaints the plain title immediately (no blank window)", () => {
    const src = bare();
    const onResize = src.match(/const onResize = \(\) => \{[\s\S]*?\};/);
    expect(onResize, "the onResize handler must exist").toBeTruthy();
    expect(onResize![0]).toContain("if (reduced) {");
    expect(onResize![0]).toContain("drawPlain();");
    expect(onResize![0]).toContain("return;");
    expect(onResize![0]).toContain("buildParticles();");
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
