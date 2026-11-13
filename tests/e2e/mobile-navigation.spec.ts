import { expect, test } from "@playwright/test";

// The mobile navigation — the operator's standing ask, compared live
// against the reference's own working mobile menu (2026-11-09): hamburger
// button, dropdown with the 4 links + the Upgrade pill, closes on route
// change. Ours adds Escape-close + aria-expanded (the a11y superset).

test.use({ viewport: { width: 390, height: 844 } });

test("the hamburger opens the menu with every destination", async ({ page }) => {
  await page.goto("/");
  const burger = page.getByRole("button", { name: "Open menu" });
  await expect(burger).toBeVisible();
  await burger.click();

  const menu = page.getByRole("navigation");
  await expect(menu.getByRole("link", { name: "Home", exact: true })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Tool" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Contact" })).toBeVisible();
  // Session-22 (S22-1): the reference's dropdown pill reverted to its
  // session-1-era priced text (the session-21 "Upgrade to Pro" capture
  // was a transient deploy state on the reference).
  await expect(menu.getByRole("link", { name: "Upgrade to Pro – $19", exact: true })).toBeVisible();
});

test("menu links navigate and the menu closes on route change", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Pricing", exact: true }).click();
  await page.waitForURL("**/Pricing");
  await expect(page.getByRole("heading", { name: "Simple, Transparent Pricing" })).toBeVisible();
  // The menu collapsed after navigation.
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
});

test("history navigation closes the open menu too (session-10, F10-10)", async ({ page }) => {
  // "Closes on route change" used to ride ONLY the per-link onClick — a
  // back/forward navigation (no click) left the menu open over the new
  // page. The navbar now closes on any pathname change (the
  // adjust-during-render doctrine), so the documented superset behavior
  // holds for the browser's own navigation affordances.
  await page.goto("/");
  // Walk to /Tool through the open menu (at phone width the desktop
  // links are hidden — the menu is the only nav surface).
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Tool" }).click();
  await page.waitForURL("**/Tool");
  // Open the menu on /Tool, then leave via the browser's own back
  // button — no link click fires.
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  // Session-32 (S32-6): the S31-2 focus return's first BEHAVIORAL pin (the
  // mechanism was source-pinned only — the Escape arm's return has been
  // e2e-asserted since session 15). Focus a link INSIDE the open panel
  // first (the keyboard/AT posture) so the history close unloads the
  // focused link and only the layout-effect arm can land focus back on
  // the toggle — the battery's first shape was VACUOUS (focus had never
  // left the toggle, so the arm could be deleted with the assertion
  // still green); this shape makes the deletion RED.
  await page.getByRole("navigation").getByRole("link", { name: "Tool" }).focus();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Tool" })).toBeFocused();
  await page.goBack();
  await page.waitForURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("Escape closes the open menu (the a11y superset)", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  // Session-15 (S15-9): the focus RETURN is behavioral, not just a
  // source pin — closing via Escape restores focus to the toggle
  // instead of leaving it on the now-hidden panel content.
  await expect(toggle).toBeFocused();
});

test("the desktop links are hidden at phone width (no duplicated nav)", async ({ page }) => {
  await page.goto("/");
  const desktopLinks = page.locator("nav .hidden.md\\:flex");
  await expect(desktopLinks).toBeHidden();
});

test("the scrolled navbar gains the slate glass background", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 900));
  const nav = page.getByRole("navigation");
  await expect(nav).toHaveClass(/bg-slate-900\/95/);
  await expect(nav).toHaveClass(/backdrop-blur-xl/);
  // Session-22 (S22-5): the menu PANEL darkens on the scrolled home
  // route too (the dark-panel superset previously keyed on the route
  // alone — home scrolled into light sections left slate-300 links on
  // a transparent panel at ~1.48:1 contrast).
  await page.getByRole("button", { name: "Open menu" }).click();
  const panel = page.locator("#mobile-menu");
  await expect(panel).toHaveClass(/bg-slate-900\/95/);
  await expect(panel).toHaveClass(/backdrop-blur-xl/);
});

// Session-46 (S46-5, AUDIT-2 L1): the session-45 censused-parity faces,
// pinned behaviorally. The navbar's comment block records that the
// open panel STAYS OPEN on a same-route Logo click and on a tap on
// page content below it — both probed live against the reference at
// 390×844 (session-45) and re-censused in the session-46 walk — and
// carries the do-not-"fix" warning. These pins make the warning
// enforceable: a future "helpful" close arm on either face flips the
// toggle/panel state these assertions hold, and the gate goes RED.
test("the same-route Logo click leaves the open menu open (session-45, S45-3 censused parity)", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  // The Logo navigates /Home → 308 → /: the redirect resolves before
  // the pathname commits, so the adjust-during-render close arm never
  // fires (pathname-inert) — the reference's own same-route Logo face
  // (its /Home logo on /Home, censused live). Do NOT "fix" this into a
  // close arm — that would diverge from the reference's censused
  // behavior.
  // The Logo renders in BOTH the navbar and the footer (the same
  // aria-label twice) — scope to the navigation or the locator trips
  // strict mode (the multi-subtree DOM trap).
  await page.getByRole("navigation").getByRole("link", { name: "ViralPost AI — Home" }).click();
  await page.waitForURL((url) => url.pathname === "/");
  // If the pathname ever transiently committed "/Home" (a future Next
  // redirect-handling change), the menu would close and BOTH assertions
  // below fail — that is the drift this pin exists to catch.
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.locator("#mobile-menu")).toBeVisible();
});

test("a tap on page content below the open panel leaves it open (session-45, S45-4 censused parity)", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  // The reference's own panel ignores outside taps (a real click on the
  // hero copy left its panel open — censused live, session-45); ours
  // ships no click-outside close arm. Do NOT "fix" this into one.
  await page.locator("p.text-slate-300.text-lg").first().click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.locator("#mobile-menu")).toBeVisible();
});
