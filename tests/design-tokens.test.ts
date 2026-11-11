import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path, { join } from "node:path";
import { describe, expect, it } from "vitest";

// The design-token pins — the Tailwind v4 doctrine carried from the
// template's parity program, re-anchored to ViralPost AI's theme:
//   1. The hover-variant un-wrap (touch devices get hovers).
//   2. The v3 palette re-pin (v4's re-derived oklch palette diverges from
//      the reference's v3 values — the teal family joins the pin).
//   3. The shadow-sm/blur-sm rename re-pins.
//   4. The zero-webfont stock font stack, pinned explicitly.
//   5. The reduced-motion collapse.

const css = readFileSync(
  path.resolve(import.meta.dirname, "..", "src/app/globals.css"),
  "utf8",
);

function themeValue(name: string): string | undefined {
  const m = new RegExp(`--${name}:\\s*([^;]+);`).exec(css);
  return m?.[1]?.trim();
}

describe("design tokens: the Tailwind v4 doctrine", () => {
  it("the hover-variant un-wrap is present (touch devices get hovers)", () => {
    expect(css).toContain("@custom-variant hover (&:hover)");
  });

  it("no tailwind.config.js — the CSS-first configuration", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "tailwind.config.js"))).toBe(false);
    expect(existsSync(path.resolve(import.meta.dirname, "..", "tailwind.config.ts"))).toBe(false);
  });

  it("the @theme block carries literal hex tokens (no var() chains)", () => {
    const theme = /@theme\s*\{([\s\S]*?)\n\}/.exec(css)?.[1] ?? "";
    expect(theme).not.toMatch(/var\(--/);
  });
});

describe("design tokens: the v3 palette re-pin", () => {
  it("the teal family pins the v3 values (the reference's computed CTAs)", () => {
    expect(themeValue("color-teal-400")).toBe("#2dd4bf");
    expect(themeValue("color-teal-500")).toBe("#14b8a6");
    expect(themeValue("color-teal-600")).toBe("#0d9488");
    expect(themeValue("color-teal-700")).toBe("#0f766e");
  });

  it("the amber family pins the v3 values", () => {
    expect(themeValue("color-amber-300")).toBe("#fcd34d");
    expect(themeValue("color-amber-400")).toBe("#fbbf24");
    expect(themeValue("color-amber-500")).toBe("#f59e0b");
  });

  it("the slate family pins the v3 values (the dark hero + borders)", () => {
    expect(themeValue("color-slate-900")).toBe("#0f172a");
    expect(themeValue("color-slate-200")).toBe("#e2e8f0");
    expect(themeValue("color-slate-50")).toBe("#f8fafc");
  });
});

describe("design tokens: session-10 — the re-pin completion (F10-1)", () => {
  // The census that found the gaps: green-700 (the login/reset
  // sent-callout text — a DOM-extracted reference surface) computed
  // #008236 under v4's re-derived palette where the reference renders
  // the v3 #15803d; blue-600 (globals.css's OWN canonical example of
  // this bug class) sat unpinned on the login-card reset link. The
  // oklch→sRGB conversions of the installed tailwindcss/theme.css
  // quantified the drift this round.

  it("the green family pins the v3 values (the login/reset callouts)", () => {
    expect(themeValue("color-green-50")).toBe("#f0fdf4");
    expect(themeValue("color-green-200")).toBe("#bbf7d0");
    expect(themeValue("color-green-700")).toBe("#15803d");
  });

  it("the red family pins the v3 values (the error callouts)", () => {
    expect(themeValue("color-red-200")).toBe("#fecaca");
    expect(themeValue("color-red-700")).toBe("#b91c1c");
  });

  it("the blue family pins the v3 values (the login-card reset link)", () => {
    expect(themeValue("color-blue-600")).toBe("#2563eb");
    expect(themeValue("color-blue-700")).toBe("#1d4ed8");
  });

  it("emerald-200/600 + rose-200 + neutral-900 pin the v3 values (toast borders, the reset lock icon, the toast X hover ink)", () => {
    expect(themeValue("color-emerald-200")).toBe("#a7f3d0");
    expect(themeValue("color-emerald-600")).toBe("#059669");
    expect(themeValue("color-rose-200")).toBe("#fecdd3");
    expect(themeValue("color-neutral-900")).toBe("#171717");
  });

  it("THE CENSUS PIN: every stock color utility used in src/ resolves to a @theme literal (the 'every literal pair' invariant, made mechanical)", () => {
    // Enumerate (family, step) pairs from color utilities in src/ (text-,
    // bg-, border-, from-/via-/to-, ring-, etc.), then require a
    // --color-<family>-<step>: literal inside @theme for each. A future
    // unpinned family fails here instead of silently drifting to v4's
    // re-derived oklch palette (the F10-1 genus, retired).
    const srcDir = path.resolve(import.meta.dirname, "..", "src");
    const files = walkSourceFiles(srcDir);
    const utility = /(?:text|bg|border|from|to|via|fill|stroke|ring|decoration|divide|outline|shadow|accent|caret|placeholder)-([a-z]+)-(50|100|200|300|400|500|600|700|800|900|950)(?![\w-])/g;
    const NON_COLOR = new Set([
      "xs", "sm", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl",
      "8xl", "9xl", "base", "center", "left", "right", "top", "bottom",
      "auto", "full", "none", "current", "transparent", "white", "black",
      "primary", "brand", "line", "muted", "subtle", "success", "warning",
      "danger", "info", "foreground", "background", "opacity",
    ]);
    const used = new Set<string>();
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(utility)) {
        if (!NON_COLOR.has(m[1])) used.add(`${m[1]}-${m[2]}`);
      }
    }
    expect(used.size).toBeGreaterThan(10); // the census actually censused
    const unpinned = [...used].filter((pair) => themeValue(`color-${pair}`) === undefined);
    expect(unpinned, `color utilities with NO @theme literal (add the v3 hex pins): ${unpinned.join(", ")}`).toEqual([]);
  });
});

function walkSourceFiles(dir: string): string[] {
  const entries = existsSync(dir) ? readdirSync(dir) : [];
  const out: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walkSourceFiles(full));
    else if (/\.(ts|tsx|css)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("design tokens: the rename-bug re-pins (v4 shadow/blur)", () => {
  it("shadow-sm re-pins to the v3 tiny value", () => {
    expect(themeValue("shadow-sm")).toBe("0 1px 2px 0 rgb(0 0 0 / 0.05)");
  });

  it("blur-sm re-pins to 4px (the glass surfaces)", () => {
    expect(themeValue("blur-sm")).toBe("4px");
  });
});

describe("design tokens: typography + motion", () => {
  it("the font stack is the zero-webfont stock default, pinned explicitly", () => {
    expect(themeValue("font-sans")).toContain("ui-sans-serif, system-ui, sans-serif");
    expect(css).not.toMatch(/@font-face/);
  });

  it("the reduced-motion collapse is present", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("the float keyframes ship (the hero's ONLY motion vocabulary — the reveal/fade-in retirement, F11-5)", () => {
    // Session-11 (F11-5): the old pin asserted "the float + reveal
    // keyframes ship (the hero's motion vocabulary)" — a mis-attribution:
    // the hero consumes only animate-float; Reveal uses inline-style
    // transitions; animate-reveal/animate-fade-in had ZERO consumers and
    // shipped as dead keyframes in every build. The retirement pins live
    // in the session-11 describe below.
    expect(css).toContain("@keyframes float");
  });
});

// ---------------------------------------------------------------------------
// Session-11: the step-less census (F11-1) + the dead-CSS retirement
// (F11-2 / F11-5 / F11-16).
// ---------------------------------------------------------------------------

describe("design tokens: session-11 — the census completion + the dead-CSS retirement", () => {
  const srcDir = path.resolve(import.meta.dirname, "..", "src");

  it("THE STEP-LESS CENSUS PIN: every single-word color utility used in src/ resolves to a @theme token (the F11-1 blind spot, closed)", () => {
    // F11-1: `border border-input` on the verify-view OTP inputs compiled
    // to NOTHING — Tailwind v4 generates no utility for an undefined
    // --color-input token — while the stepped census above passed: its
    // regex only enumerates family-STEP utilities, so single-word
    // semantic utilities (border-input, ring-ring, text-foreground, …)
    // escaped the "every color utility resolves to a @theme literal"
    // invariant. This arm closes the blind spot: each step-less
    // candidate must resolve to --color-<word> (or --color-<first
    // segment> for multi-word tokens like primary-hover / line-soft).
    // The trailing (?![\w-]) boundary keeps family-STEP utilities
    // invisible here (their numeric step cannot be captured by the word
    // pattern, so a bare family followed by "-500" fails the lookahead
    // and is left to the stepped census above).
    const utility =
      /(?:text|bg|border|from|to|via|fill|stroke|ring|decoration|divide|outline|shadow|accent|caret|placeholder)-([a-z][a-z0-9]*(?:-[a-z][a-z0-9]*)*)(?![\w-])/g;
    // Tailwind's stock always-generated color values + its non-color
    // vocabulary for these prefixes…
    const STOCK = new Set(["white", "black", "transparent", "current", "inherit", "none"]);
    const NON_COLOR = new Set([
      "sm", "xs", "base", "lg", "xl", "left", "center", "right", "top", "bottom",
      "auto", "full", "opacity", "gradient", "clip", "fixed", "local",
      "scroll", "cover", "contain", "origin", "repeat", "round", "space",
      "no", "solid", "dashed", "dotted", "double", "hidden", "collapse",
      "spacing", "x", "y", "t", "r", "b", "l", "s", "e", "w", "offset",
      "pretty", "balance", "wrap", "nowrap", "truncate", "ellipsis",
      // CSS-property prose the raw-text scan picks out of globals.css
      // (border-color, border-radius, animation fill-mode)
      "color", "radius", "mode",
      // …plus English fragments the scan picks out of comments
      // (node:crypto-only → "to-only", auto-dismiss → "to-dismiss",
      // adjust-during-render → "ring-render", from-scratch, …) — class
      // vocabulary only, never English.
      "only", "advance", "creates", "create", "scratch", "render",
      "width", "end", "random", "dismiss", "dismisses", "dismissing",
      "dismissed", "start",
      // Session-17 (S17-5): api.ts's media-type comment says "never
      // substring-matched" — the raw-text scan reads "substRING-matched"
      // as a ring-<word> utility. English prose, never a class.
      "matched",
      // Session-13 (S13-4): the from-url seam's MODULE PATH — the
      // import line `from "@/lib/from-url"` scans as a from-<word>
      // "utility"; a path segment, never a class.
      "url",
    ]);
    const used = new Set<string>();
    for (const file of walkSourceFiles(srcDir)) {
      if (file.includes(`${path.sep}vendor${path.sep}`)) continue; // retired this session (F11-2); its absence is pinned below
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(utility)) {
        const word = m[1];
        const first = word.split("-")[0];
        if (STOCK.has(first) || NON_COLOR.has(first)) continue;
        used.add(word);
      }
    }
    expect(used.size).toBeGreaterThan(5); // the census actually censused
    const unresolved = [...used].filter((word) => {
      if (themeValue(`color-${word}`) !== undefined) return false;
      return themeValue(`color-${word.split("-")[0]}`) === undefined;
    });
    expect(
      unresolved,
      `step-less color utilities with NO @theme token (define the token or fix the class): ${unresolved.join(", ")}`,
    ).toEqual([]);
  });

  it("THE DEAD-TOKEN CENSUS PIN: every semantic --color-* token in @theme has a live consumer (the F11-5 genus, made mechanical)", () => {
    // The stepped stock re-pins are EXEMPT by doctrine (whole families
    // pinned defensively so any future step renders the v3 value); the
    // SEMANTIC tokens (no numeric step) must each be consumed — by a
    // utility class in src/ or by a var() reference in globals.css
    // outside @theme (the base layer). A token with neither is dead
    // weight shipping in every build.
    // Session-28 (S28-4): the census is now COMMENT-BLIND — each
    // scanned file is comment-stripped BEFORE the consumer regex (the
    // api-robustness stripComments idiom). The F11-5 form could be
    // fooled by PROSE: a comment mentioning a utility form ("the
    // text-subtle form (2.57:1)…") kept a zero-consumer token alive
    // through every prior census run. A mis-strip can only FALSE-RED
    // at gate time (a real consumer on a stripped line), never
    // silently pass.
    const semantic = [...css.matchAll(/--color-([a-z][a-z0-9-]*):/g)]
      .map((m) => m[1])
      .filter((name) => !/\d/.test(name));
    expect(semantic.length).toBeGreaterThan(5); // the census actually censused
    const srcText = walkSourceFiles(srcDir)
      .filter((f) => !f.endsWith("globals.css"))
      .map((f) => readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, ""))
      .join("\n");
    const baseLayer = (css.match(/@layer base\s*\{[\s\S]*\n\}/) ?? [""])[0];
    const dead = semantic.filter(
      (name) =>
        !new RegExp(`(?:bg|text|border|ring|fill|stroke|from|to|via|shadow|divide|outline|accent|caret|decoration|placeholder)-${name}(?![\\w-])`).test(
          srcText,
        ) && !baseLayer.includes(`var(--color-${name})`),
    );
    expect(dead, `semantic @theme tokens with ZERO consumers (retire them): ${dead.join(", ")}`).toEqual([]);
  });

  it("the dead motion vocabulary is retired (F11-5): no animate-fade-in / animate-reveal / their keyframes", () => {
    expect(css).not.toContain("--animate-fade-in");
    expect(css).not.toContain("--animate-reveal");
    expect(css).not.toContain("@keyframes fade-in");
    expect(css).not.toContain("@keyframes reveal");
    expect(css).not.toContain("--radius-card");
    expect(css).not.toContain("--radius-button");
  });

  it("the dead @utility rules are retired (F11-5): the custom-utilities block is gone", () => {
    // Surgical form (the s64/s65/s66 needle-in-own-doc lesson): the pin
    // must not fail on the retirement NOTE below the block, so it reads
    // the CSS with comments stripped before asserting the absence.
    const rules = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(rules).not.toContain("@utility ");
  });

  it("the vendored animate css is retired (F11-2): no import, no file", () => {
    // The phantom justification ("the Radix dialog family rides it") died
    // with the session-2 dependency diet — no Radix package exists and
    // the only consuming class family retired at session-131 (D-131a1).
    // The vendor file shipped @keyframes enter/exit/accordion-down + a
    // block of @property declarations with zero consumers. The import
    // assertion reads comment-stripped CSS (the retirement note names
    // the file — documentation, not a live reference).
    const rules = css.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(rules).not.toContain("@import \"./vendor/");
    expect(existsSync(path.resolve(srcDir, "app", "vendor"))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Session-12: the stepped-semantic census arm (F12-7) — the F11-1 genus,
// one notch deeper.
// ---------------------------------------------------------------------------

describe("design tokens: session-12 — the stepped-semantic census arm (F12-7)", () => {
  it("NO semantic family ever appears with a numeric step (text-success-500-shaped classes compile to NOTHING — no --color-<family>-<step> literal exists by construction)", () => {
    // The two existing censuses pass a `text-success-500`-shaped class in
    // opposite directions: the STEPPED census exempts semantic family
    // names (they sit in its NON_COLOR set so `text-success` — a legit
    // step-less token consumer — never demands a stepped literal), and
    // the STEP-LESS census can't see it (the numeric step defeats its
    // word-boundary pattern). The blind spot is the F11-1 genus
    // (`border-input` compiled to nothing) one notch deeper — zero live
    // instances today, asserted zero forever here.
    const srcDir = path.resolve(import.meta.dirname, "..", "src");
    const utility =
      /(?:text|bg|border|from|to|via|fill|stroke|ring|decoration|divide|outline|shadow|accent|caret|placeholder)-(primary|brand|line|muted|subtle|success|warning|danger|info|foreground|background|ink)-(?:50|100|200|300|400|500|600|700|800|900|950)(?![\w-])/g;
    const offenders = new Set<string>();
    for (const file of walkSourceFiles(srcDir)) {
      const text = readFileSync(file, "utf8");
      for (const m of text.matchAll(utility)) offenders.add(m[0]);
    }
    expect(
      [...offenders],
      `semantic families never take numeric steps (no @theme literal can ever resolve these — fix the class or pin the stock family): ${[...offenders].join(", ")}`,
    ).toEqual([]);
  });
});

describe("design tokens: session-21 — the oklab→sRGB gradient cure (S21-5)", () => {
  // The 2026-11-11 computed-style walk: the live reference (v3) ships
  // `linear-gradient(to right, rgb(45, 212, 191), rgb(251, 191, 36))`
  // (sRGB interpolation); Tailwind v4 compiles `bg-gradient-to-r
  // from-teal-400 to-amber-400` to the SAME endpoints interpolated
  // `in oklab` — a ΔR≈26 midband drift on the hue-crossing brand
  // family. The house doctrine (CLAUDE.md / SKILL §5 item 5: "use
  // inline styles where the reference's blend must be exact") lands
  // here: the three brand-gradient surfaces carry the sRGB form inline;
  // the utility pair is banned from src/ so the drift cannot return.
  // Same-family gradients (teal→teal, amber→amber) stay on utilities —
  // their oklab delta is sub-threshold (Δ≤2 per channel, computed).

  const BRAND_SRGB = "linear-gradient(to right, #2dd4bf, #fbbf24)";

  it("the logo wordmark carries the sRGB inline gradient (the navbar + footer brand face)", () => {
    const logo = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/components/marketing/logo.tsx"),
      "utf8",
    );
    expect(logo).toContain(`backgroundImage: "${BRAND_SRGB}"`);
  });

  it("the monetization headline span carries the sRGB inline gradient", () => {
    const sections = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/components/marketing/sections.tsx"),
      "utf8",
    );
    // Exactly TWO inline brand gradients in sections.tsx: the headline
    // span + the Get-Unlimited-Access CTA.
    expect(sections.match(new RegExp(BRAND_SRGB.replace(/[()]/g, "\\$&"), "g"))).toHaveLength(2);
  });

  it("THE BAN: the hue-crossing utility pair never returns to src/", () => {
    const srcDir = path.resolve(import.meta.dirname, "..", "src");
    const offenders: string[] = [];
    for (const file of walkSourceFiles(srcDir)) {
      const text = readFileSync(file, "utf8");
      if (/from-teal-400\s+to-amber-400/.test(text)) offenders.push(file);
    }
    expect(
      offenders,
      "the oklab-interpolated brand-gradient pair is banned — the reference blends these in sRGB (S21-5)",
    ).toEqual([]);
  });
});
