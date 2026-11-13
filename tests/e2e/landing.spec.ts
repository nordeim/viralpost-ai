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
    // Session-19 (S19-2): the reference redesigned the monetization
    // section EN ("Download Free. If It Helps You, Help Us Too.") —
    // the PT copy ("Baixe Agora de Graça.") is retired with it.
    "Download Free.",
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

test("the /Home alias 308-redirects to the canonical /", async ({ page, request }) => {
  // Session-23 (S23-20): the STATUS is owned here now — page.goto follows
  // redirects, so the old shape (a < 400 assert on the final response)
  // never actually pinned the 308 (smoke leg 05 owned it alone). The
  // no-redirect request sees the raw status + Location.
  const direct = await request.get("/Home", { maxRedirects: 0 });
  expect(direct.status()).toBe(308);
  expect(direct.headers().location).toBe("/");
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
  // Session-27 (S27-6): the noindex superset, PINNED — the README/PAD/
  // SKILL claims ride Next's built-in not-found meta, which no source
  // literal or test asserted (rg "noindex" src/ tests/ returned zero
  // hits — an upgrade changing that emission would ship green). The
  // meta rides the server HTML head (live-verified; the body text is
  // the documented client-stream fallback).
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page.getByRole("link", { name: "Go Home" }).click();
  await page.waitForURL("/");
});

// Session-2 (F-1): the reference titles unknown routes
// "<StartCase(last segment)> | ViralPost AI" — the /Dashboard decode
// (live-verified in both auth states on the reference).
test("unknown routes carry the reference's derived title", async ({ page }) => {
  await page.goto("/Dashboard");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page).toHaveTitle("Dashboard | ViralPost AI");
  await expect(
    page.getByText('The page "Dashboard" could not be found'),
  ).toBeVisible();

  await page.goto("/definitely-not-a-route");
  await expect(page).toHaveTitle("Definitely Not A Route | ViralPost AI");

  // The true-404 status superset (the reference's SPA serves 200 everywhere).
  const res = await page.goto("/some-missing-page");
  expect(res?.status()).toBe(404);
});

// Session-47 (S47-4, AUDIT-2 M1): the reveal-settle leg — the RUNTIME
// face of the scroll-reveal contract. toBeVisible() is BLIND to the
// stuck-hidden regression (it passes on opacity: 0 elements), so this
// leg asserts the WRAPPER div's computed opacity — the element that
// carries the hidden inline style — settles to 1 after scroll. The
// heading's own computed opacity is useless here: a child reports its
// own 1 under a 0-opacity parent. The "How It Works" head is the
// below-fold target (the S19-11 pricing head is deliberately
// UNFADED on the reference — never a Reveal target; its CARDS are).
// Construction-direct teeth (the house e2e precedent): any close of
// the settle path (the hiddenStyle, the IO flow, the reduced early
// return) leaves the wrapper at 0 and flips this leg.
test("the scroll-reveal settles visible after scroll (the wrapper's computed opacity)", async ({ page }) => {
  const heading = page.getByRole("heading", { name: "How It Works" });
  await heading.scrollIntoViewIfNeeded();
  // The wrapper (the Reveal div) is the heading's parent; the 500ms
  // transition needs its window before the assertion reads the rest
  // state. waitFor settles the poll on the RESTING computed value.
  const wrapper = heading.locator("..");
  // Session-48 (S48-6, AUDIT-2 L3): the structural anchor — the leg's
  // tooth hung on an UNENFORCED assumption ("the wrapper is the Reveal
  // div"). A future intermediate wrapper div (a plain div) would leave
  // the opacity assertion vacuously green. The Reveal base class
  // (reveal.tsx: transition-all) is the runtime identity check.
  await expect(wrapper).toHaveClass(/transition-all/, { timeout: 5_000 });
  await expect(wrapper).toHaveCSS("opacity", "1", { timeout: 5_000 });
});

// Session-47 (S47-6, AUDIT-2 L2): the skip-link leg — the S22-11 skip
// link + its S23-3 tabIndex={-1} target were source-pinned only; the
// WebKit-specific sequential-focus behavior the cure exists for is a
// RUNTIME face (the S32-6 doctrine). Tab at load → the revealed skip
// pill holds focus → activate → #main-content holds focus.
test("the skip link reaches #main-content by keyboard", async ({ page }) => {
  // The skip link is the layout's FIRST focusable element.
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
