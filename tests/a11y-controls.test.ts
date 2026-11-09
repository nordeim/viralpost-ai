// THE NAMED-CONTROL SOURCE-PIN BATTERY — the a11y doctrine's live census
// for ViralPost AI's public surfaces: every interactive control must
// carry an accessible name. The pins read the SOURCE live and assert the
// accessible-name form (the e2e axe battery is the runtime proof; this is
// the source-level regression net).

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

const SURFACE_FILES = [
  "src/components/marketing/navbar.tsx",
  "src/components/marketing/generator-card.tsx",
  "src/components/marketing/contact-form.tsx",
  "src/components/layout/login-card.tsx",
] as const;

describe("named-control source pins (the open surfaces)", () => {
  it("every surface file exists", () => {
    for (const f of SURFACE_FILES) {
      expect(existsSync(join(root, f)), f).toBe(true);
    }
  });

  it("the mobile hamburger carries aria-label + aria-expanded", () => {
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain('aria-label={open ? "Close menu" : "Open menu"}');
    expect(src).toContain("aria-expanded={open}");
  });

  it("the generator textarea carries a wired label", () => {
    const src = read("src/components/marketing/generator-card.tsx");
    expect(src).toMatch(/<label htmlFor="post-idea"/);
    expect(src).toMatch(/<textarea[^>]*id="post-idea"/);
  });

  it("the contact form fields carry wired labels", () => {
    const src = read("src/components/marketing/contact-form.tsx");
    for (const id of ["contact-name", "contact-email", "contact-message"]) {
      expect(src).toMatch(new RegExp(`<label[^>]*htmlFor="${id}"`));
      expect(src).toMatch(new RegExp(`id="${id}"`));
    }
  });

  it("icon-only controls are aria-hidden or labeled (no nameless glyphs)", () => {
    // The marketing icons ride aria-hidden="true" inside named parents;
    // the hamburger is the only icon-only BUTTON and it is labeled.
    const nav = read("src/components/marketing/navbar.tsx");
    expect(nav).toMatch(/aria-label=\{open \? "Close menu" : "Open menu"\}/);
  });

  it("the login card's icon-only code inputs carry their per-digit labels", () => {
    const src = read("src/components/layout/login-card.tsx");
    // The six single-digit verify inputs are the nameless-input genus —
    // the login-reset view machine's own doctrine pins the label form.
    expect(src).toMatch(/aria-label=\{`Digit \$\{idx \+ 1\}`\}|aria-label=.Digit/);
  });

  it("decorative canvases are aria-hidden", () => {
    const particle = read("src/components/effects/particle-text.tsx");
    expect(particle).toContain('aria-hidden="true"');
    const iridescence = read("src/components/effects/iridescence.tsx");
    expect(iridescence).toContain('aria-hidden="true"');
  });

  it("the hero portrait img carries its alt text", () => {
    const hero = read("src/components/marketing/hero.tsx");
    expect(hero).toContain('alt="ViralPost AI user"');
  });

  it("the footer social chips carry aria-labels", () => {
    const footer = read("src/components/marketing/footer.tsx");
    expect(footer).toMatch(/aria-label=\{s\.label\}/);
  });

  it("nav links expose the active route (aria-current)", () => {
    const nav = read("src/components/marketing/navbar.tsx");
    expect(nav).toContain('aria-current={active === r.id ? "page" : undefined}');
  });
});
