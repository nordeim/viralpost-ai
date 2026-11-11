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
  await page.goBack();
  await page.waitForURL((url) => url.pathname === "/");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
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
