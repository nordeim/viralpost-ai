import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
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
