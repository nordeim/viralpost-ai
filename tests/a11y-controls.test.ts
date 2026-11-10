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

  it("session-11 (F11-11): the hamburger controls the panel id (aria-controls), and Escape returns focus to the toggle", () => {
    // The next increment of the menu superset: the toggle references the
    // panel it owns (aria-controls + the panel's id), and closing via
    // Escape restores focus to the toggle instead of leaving it on the
    // now-hidden panel content (where it falls to <body>).
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain('aria-controls="mobile-menu"');
    expect(src).toContain('id="mobile-menu"');
    expect(src).toMatch(/menuButtonRef\.current\?\.focus\(\)/);
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

  // Session-19 (S19-10): the login card's in-place view swaps (Forgot
  // password? / Need an account? / the Back buttons) unmount the focused
  // control — focus fell to <body> and the next Tab started at the
  // document top (WCAG 2.4.3). The swap now lands focus on the incoming
  // view's heading (tabIndex={-1} + data-view-focus); verify keeps its
  // code-box focus (the platform-family behavior).
  it("session-19 (S19-10): a view swap lands focus on the incoming view's heading (the navbar's focus-return genus, completed)", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain("data-view-focus");
    expect(src).toContain('cardRef.current?.querySelector<HTMLElement>("[data-view-focus]")?.focus()');
    // The per-view headings carry the focus target; the count: signin h1
    // + signup h2 + reset h2 + sent h2 (verify keeps the code-box arm).
    // Counted in the JSX attribute form — the querySelector and this
    // comment also spell the string.
    expect((src.match(/data-view-focus>/g) ?? []).length).toBe(4);
    expect(src).toMatch(/view === "verify"\) \{\s*codeRefs\.current\[0\]\?\.focus\(\);\s*return;/);
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

  it("session-15 (S15-4): the signin view's decorative input icons carry aria-hidden (the sibling views' own pattern)", () => {
    // The reset/signup/verify views' Mail/Lock icons all carry
    // aria-hidden="true" (their LOGIN_*_LAYOUT.inputIcon rides); the
    // signin view's two were the file's only stragglers — empty lucide
    // svgs are ignored by AT today, but a future title-bearing icon
    // would be announced on the signin view only.
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain('<Mail className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
    expect(src).toContain('<Lock className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
  });

  it("session-15 (S15-8): the mobile hamburger carries the house keyboard focus ring (slate-300 — the toggle's own ink, reads on the dark navbar)", () => {
    // The S14-6 toast-dismiss precedent applied to the only mobile-nav
    // control. The house ring-ring token (#0f172a) is invisible on the
    // dark slate navbar — slate-300 is the toggle's OWN ink (the
    // reference's own class on this very button: text-slate-300), so the
    // ring is guaranteed to read on slate-950 while staying in the
    // reference's palette vocabulary. Visible only on keyboard focus —
    // the visual-parity walk is untouched.
    const src = read("src/components/marketing/navbar.tsx");
    expect(src).toContain(
      'className="md:hidden p-2 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"',
    );
  });
});
