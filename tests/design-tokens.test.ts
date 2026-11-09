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

  it("the float + reveal keyframes ship (the hero's motion vocabulary)", () => {
    expect(css).toContain("@keyframes float");
    expect(css).toContain("@keyframes reveal");
  });
});
