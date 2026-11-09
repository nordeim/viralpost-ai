import { expect, test } from "@playwright/test";

// The SEO surface — the reference family's per-route titles + the sitemap/
// robots/manifest endpoints (the standing operator ask).

test("per-route titles match the reference scheme", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("ViralPost AI");
  await page.goto("/login");
  await expect(page).toHaveTitle("ViralPost AI");
  await page.goto("/Tool");
  await expect(page).toHaveTitle("Tool | ViralPost AI");
  await page.goto("/Pricing");
  await expect(page).toHaveTitle("Pricing | ViralPost AI");
  await page.goto("/Contact");
  await expect(page).toHaveTitle("Contact | ViralPost AI");
});

test("the home head carries the canonical + OG family", async ({ page }) => {
  await page.goto("/");
  // Next's URL resolution normalizes the root canonical to the bare
  // origin (no trailing slash) — functionally the same URL; the
  // reference's SPA hand-writes the trailing-slash form.
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /^https?:\/\/[^/]+\/?$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "ViralPost AI");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /AI-powered social media generator/,
  );
});

test("the sitemap lists every canonical route", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.ok()).toBeTruthy();
  expect(res.headers()["content-type"]).toContain("application/xml");
  const xml = await res.text();
  expect(xml).toContain("<loc>");
  expect(xml).toContain("/Tool");
  expect(xml).toContain("/Pricing");
  expect(xml).toContain("/Contact");
  // The /Home alias is NOT listed (it 308-redirects to /).
  expect(xml).not.toContain("/Home");
});

test("robots.txt allows all and points at the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.ok()).toBeTruthy();
  const body = await res.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Sitemap: ");
});

test("manifest.json serves the installable app manifest", async ({ request }) => {
  const res = await request.get("/manifest.json");
  expect(res.ok()).toBeTruthy();
  const manifest = await res.json();
  expect(manifest.name).toBe("ViralPost AI");
  expect(manifest.icons.length).toBeGreaterThanOrEqual(1);
});

test("the security headers ride every response", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
});

test("the health endpoint answers the envelope", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.data.status).toBe("healthy");
});
