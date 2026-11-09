import { expect, test } from "@playwright/test";

// The landing page — the reference's 10-section composition, asserted at
// the structural level (headings, nav, generator, footer) plus the mobile
// overflow contract. Visual parity is covered by the captures battery
// (docs/screenshots/) and the agent-browser walk in the session log.

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the hero with the particle title and CTAs", async ({ page }) => {
  await expect(page).toHaveTitle("ViralPost AI");
  // The visually-hidden h1 carries the full phrase list (the particle
  // canvas is aria-hidden — the reference's own sr-only pattern).
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Go Viral!");
  await expect(
    page.getByRole("heading", { name: "Create Viral Social Media Posts with AI" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Try the Tool/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Upgrade to Pro – \$19" }).first()).toBeVisible();
  // The canvas effects mounted (two canvases: background + particle title).
  await expect(page.locator("canvas")).toHaveCount(2);
});

test("renders every marketing section", async ({ page }) => {
  for (const heading of [
    "AI Social Media Post Generator",
    "Baixe Agora de Graça.",
    "Everything You Need to Go Viral",
    "How It Works",
    "Loved by Creators",
    "Simple Pricing",
    "Start Creating Viral Content Today",
    "Contact",
  ]) {
    await expect(page.getByRole("heading", { name: new RegExp(heading, "i") }).first()).toBeVisible();
  }
  // The stats row.
  await expect(page.getByText("10K+").first()).toBeVisible();
  await expect(page.getByText("500K+").first()).toBeVisible();
});

test("the nav navigates to every route", async ({ page }) => {
  await page.getByRole("navigation").getByRole("link", { name: "Tool" }).click();
  await page.waitForURL("**/Tool");
  await expect(page.getByRole("heading", { name: "AI Post Generator" })).toBeVisible();

  await page.getByRole("navigation").getByRole("link", { name: "Pricing" }).click();
  await page.waitForURL("**/Pricing");
  await expect(page.getByRole("heading", { name: "Simple, Transparent Pricing" })).toBeVisible();

  await page.getByRole("navigation").getByRole("link", { name: "Contact" }).click();
  await page.waitForURL("**/Contact");
  await expect(page.getByRole("heading", { name: "Contact Us" })).toBeVisible();

  // Home returns to the landing (through the /Home → / redirect).
  await page.getByRole("navigation").getByRole("link", { name: "Home", exact: true }).click();
  await page.waitForURL("/");
  await expect(
    page.getByRole("heading", { name: "Create Viral Social Media Posts with AI" }),
  ).toBeVisible();
});

test("the /Home alias 308-redirects to the canonical /", async ({ page }) => {
  const response = await page.goto("/Home");
  expect(response?.status()).toBeLessThan(400);
  await page.waitForURL("/");
  expect(page.url().endsWith("/Home")).toBe(false);
});

test("no horizontal overflow at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("the 404 page renders for unknown routes", async ({ page }) => {
  await page.goto("/definitely-not-a-route");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();
  await page.getByRole("link", { name: "Go Home" }).click();
  await page.waitForURL("/");
});
