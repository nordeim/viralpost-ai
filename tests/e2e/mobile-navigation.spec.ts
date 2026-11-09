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
  await expect(menu.getByRole("link", { name: "Upgrade to Pro – $19" })).toBeVisible();
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
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
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
});
