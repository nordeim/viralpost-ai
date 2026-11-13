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
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");

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

  // Session-20 (S20-5): the S19-9 cure guarded only the RESIZE path —
  // the mount-time init() still ran the offscreen rasterize +
  // full-canvas pixel sampling in reduced mode, whose result is never
  // drawn (the reduced face only ever calls drawPlain). The build (and
  // the home-scatter that positions it) now rides the same !reduced
  // guard at mount.
  it("session-20 (S20-5): the mount-time init also skips the particle build in reduced mode (the S19-9 residual)", () => {
    const src = bare();
    const init = src.match(/const init = \(\) => \{[\s\S]*?\n {4}\};/);
    expect(init, "the init closure must exist").toBeTruthy();
    expect(init![0], "the build must sit behind the !reduced guard").toContain("if (!reduced)");
    const guard = init![0].indexOf("if (!reduced)");
    const build = init![0].indexOf("buildParticles();");
    expect(build, "the particle build must exist inside init").toBeGreaterThan(-1);
    expect(build, "the build must come after the guard (skipped in reduced mode)").toBeGreaterThan(guard);
  });
});

describe("session-12 (F12-9): the WebGL hero re-reads devicePixelRatio inside resize()", () => {
  it("resize() computes the canvas size from a FRESH devicePixelRatio read (not the boot-time capture)", () => {
    // Comment-stripped (the needle-in-own-doc lesson — the cure's own
    // comment names the API; documentation is not a live reference).
    const src = read("src/components/effects/iridescence.tsx")
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
    const resize = src.match(/const resize = \(\) => \{[\s\S]*?\n {4}\};/);
    expect(resize, "the resize closure must exist").toBeTruthy();
    expect(resize![0]).toContain("devicePixelRatio");
    // The pre-cure boot-time capture sat DIRECTLY after the disposed
    // flag at the effect's top level (the stale-DPR genus — the cure
    // moved the read inside resize, so the adjacency is gone).
    expect(src).not.toMatch(/let disposed = false;\s*\n\s*const dpr = Math\.min\(window\.devicePixelRatio/);
  });
});

describe("session-20 (S20-12): the WebGL hero guards context loss", () => {
  // Comment-stripped (the needle-in-own-doc lesson — the cure's own
  // comment names the event; documentation is not a live reference).
  const bare = () =>
    read("src/components/effects/iridescence.tsx")
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");

  // Session-24 (S24-6): in reduced mode the single static frame is
  // seeded by the mount rAF timestamp (the S23-2 comment truth), but
  // onResize re-rendered at a LITERAL t=0 — a resize visibly re-flowed
  // the slow sine bands from a different point in the phase cycle,
  // contradicting the comment the same week it was written. The cure:
  // the first render's timestamp is captured and the resize branch
  // re-renders at the SAME seed — the mount-time frame stays the
  // mount-time frame across resizes.
  it("session-24 (S24-6): the reduced-motion resize repaint keeps the mount-time seed (never a literal 0)", () => {
    const src = bare();
    const onResize = src.match(/const onResize = \(\) => \{[\s\S]*?\n {4}\};/);
    expect(onResize, "the resize closure must exist").toBeTruthy();
    expect(onResize![0], "the reduced branch re-renders at the captured seed").toMatch(/if \(reduced\) render\((?:seedT|seed|mountT)/);
    expect(onResize![0]).not.toMatch(/render\(0\)/);
    // The seed is captured from the first render call, not hardcoded.
    expect(src).toMatch(/(?:seedT|seed|mountT) = t/);
  });

  it("a webglcontextlost event stops the rAF loop and is removed on cleanup (no post-loss spin)", () => {
    const src = bare();
    expect(src, "the listener must be registered").toContain('addEventListener("webglcontextlost"');
    expect(src, "the listener must be removed on cleanup").toContain('removeEventListener("webglcontextlost"');
    const listener = src.match(/const onContextLost = \(e: Event\) => \{[\s\S]*?\n {4}\};/);
    expect(listener, "the handler closure must exist").toBeTruthy();
    expect(listener![0]).toContain("e.preventDefault()");
    expect(listener![0]).toContain("disposed = true");
    expect(listener![0]).toContain("cancelAnimationFrame(raf)");
  });

  it("the cleanup deliberately does NOT call loseContext (the StrictMode remount re-gets the same canvas)", () => {
    const src = bare();
    // loseContext() would break the dev-mode double-mount: React
    // StrictMode unmounts + remounts the effect against the SAME canvas
    // element, and a lost context cannot be re-acquired by a second
    // getContext call. The invariant is pinned so a future "cleanup
    // harder" pass cannot reintroduce it.
    expect(src).not.toContain("loseContext");
  });
});

// Session-37 (S37-6d): the WebGL hero's early-return paths release the
// GL objects they created. The three bare returns (compile-fail, !prog,
// link-fail) used to leave vs/fs/prog to GC of the context — the
// happy-path cleanup is exemplary, the error paths were the residue (a
// one-time leak per mount on a rare path; buf is created only AFTER the
// link check, so it is not live at these returns). RED-first (the
// releases are the Batch-2 cure); the battery owns the mutation
// defense (remove the link-fail deleteProgram → exactly this arm REDs).
describe("session-37 (S37-6d): the WebGL hero releases its GL objects on the early-return paths", () => {
  const bare = () =>
    read("src/components/effects/iridescence.tsx")
      .replace(/\/\/[^\n]*/g, "")
      .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");

  it("the compile-fail, no-program, and link-fail paths each delete what they created", () => {
    const src = bare();
    const branch = (re: RegExp) => src.match(re)?.[0] ?? "";
    const compileFail = branch(/if \(!vs \|\| !fs\) \{[\s\S]*?\n {4}\}/);
    expect(compileFail, "the compile-fail branch must exist").toBeTruthy();
    expect(compileFail).toContain("gl.deleteShader(vs)");
    expect(compileFail).toContain("gl.deleteShader(fs)");
    const noProg = branch(/const prog = gl\.createProgram\(\);\s*if \(!prog\) \{[\s\S]*?\n {4}\}/);
    expect(noProg, "the no-program branch must exist").toBeTruthy();
    expect(noProg).toContain("gl.deleteShader(vs)");
    expect(noProg).toContain("gl.deleteShader(fs)");
    const linkFail = branch(/if \(!gl\.getProgramParameter\(prog, gl\.LINK_STATUS\)\) \{[\s\S]*?\n {4}\}/);
    expect(linkFail, "the link-fail branch must exist").toBeTruthy();
    expect(linkFail).toContain("gl.deleteProgram(prog)");
    expect(linkFail).toContain("gl.deleteShader(vs)");
    expect(linkFail).toContain("gl.deleteShader(fs)");
  });
});

// ---------------------------------------------------------------------------
// Session-47 (S47-4, AUDIT-2 M1): the scroll-reveal's settle contract —
// the zone's highest-blast-radius component (17 live call sites: the
// whole landing page's content visibility) carried ZERO pins, and BOTH
// existing oracles are blind to the stuck-hidden regression:
// Playwright's toBeVisible() passes on opacity: 0 elements (visibility
// = a non-empty box + not display:none/visibility:hidden) and axe-core
// does not fail headings at opacity 0 — a broken hiddenStyle, IO settle
// flow, reduced/no-IO early return, or []-deps arm ships green through
// the entire gate. The e2e settle leg (landing.spec) owns the RUNTIME
// face (the wrapper's computed opacity reaches 1 after scroll); this
// source pin owns the STRUCTURAL face: both hidden forms, both settle
// arms, the early-return pair, and the disconnect pair. Single-tooth
// per N12-2: this suite's existing arms cover particle-text +
// iridescence only — no arm reads reveal.tsx (enumerated at birth).
// ---------------------------------------------------------------------------
describe("session-47 (S47-4): the scroll-reveal settle contract (source-pinned)", () => {
  it("ships both hidden forms, settles to opacity 1/transform none, and settles immediately when reduced or observer-less", () => {
    // Session-48 (S48-7, AUDIT-2 I1): joined the suite's bare() strip
    // idiom (the raw read retired — a future comment quoting a retired
    // needle could satisfy a pin whose code was deleted; convention
    // consistency inside one file, the s64/s65/s66 lesson).
    const src =
      read("src/components/effects/reveal.tsx")
        .replace(/\/\/[^\n]*/g, "")
        .replace(/(^|\s)\/\*[\s\S]*?\*\//g, "$1");
    // Both hidden inline forms (SSR ships these; a broken form =
    // visible flash or a stuck translate).
    expect(src).toContain('? { opacity: 0, transform: "translateX(-16px)" }');
    expect(src).toContain(': { opacity: 0, transform: "translateY(20px)" }');
    // The settle arms — the ONLY path from hidden to visible (the IO
    // callback AND the immediate pair; a dropped line here is the
    // stuck-hidden regression the toBeVisible oracles cannot see).
    expect(src).toContain('el.style.opacity = "1";');
    expect(src).toContain('el.style.transform = "none";');
    // Reduced motion or no IntersectionObserver support settles
    // immediately (never stuck hidden — the a11y floor).
    expect(src).toMatch(/if \(reduced \|\| typeof IntersectionObserver === "undefined"\) \{\s*settle\(\);\s*return;/);
    // The observer disconnects on settle AND on unmount (the effects
    // lifecycle law).
    expect(src).toMatch(/entry\.isIntersecting\) \{\s*settle\(\);\s*io\.disconnect\(\);/);
    expect(src).toContain("return () => io.disconnect();");
    // The effect arms ONCE with [] deps (the S31-5b mount-time
    // contract — the hidden style derives from mount-time props).
    expect(src).toMatch(/\}, \[\]\);/);
  });
});
