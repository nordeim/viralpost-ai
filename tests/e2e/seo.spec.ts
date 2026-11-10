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

test("session-15 (S15-7): unknown /api paths answer the JSON envelope 404 (not the HTML 404 body)", async ({ request }) => {
  // The root page catch-all used to win where no api route exists — an
  // API client hitting a typo'd endpoint got the HTML 404 body. The api
  // catch-all route now owns the subtree's unmatched paths with the
  // envelope's 404 (the true-404 doctrine extended to the API family).
  for (const path of ["/api/nonexistent-endpoint", "/api/auth/unknown-subpath"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(404);
    expect(res.headers()["content-type"], path).toContain("application/json");
    const body = await res.json();
    expect(body.ok, path).toBe(false);
    expect(body.error.code, path).toBe("NOT_FOUND");
  }
  // POST rides the same envelope (the five-method family).
  const post = await request.post("/api/nonexistent-endpoint", { data: {} });
  expect(post.status()).toBe(404);
  const body = await post.json();
  expect(body.ok).toBe(false);
  expect(body.error.code).toBe("NOT_FOUND");
  // Session-16 (S16-2): the BARE /api path (zero segments) is the one
  // shape a required [...path] catch-all can never match — it used to
  // fall through to the page tree's [...catchAll] and answer the HTML
  // 404 (title "Api | ViralPost AI"). src/app/api/route.ts now owns it
  // with the same envelope family.
  const bare = await request.get("/api");
  expect(bare.status()).toBe(404);
  expect(bare.headers()["content-type"]).toContain("application/json");
  const bareBody = await bare.json();
  expect(bareBody.ok).toBe(false);
  expect(bareBody.error.code).toBe("NOT_FOUND");
  // Session-18 (S18-2): OPTIONS joins the envelope family on BOTH
  // catch-alls. The five-method tree let an OPTIONS probe of an unknown
  // path fall to Next's own 405 + Allow (the route file matches the
  // path, just not the method) — a non-envelope response on a path that
  // does not exist. The leg covers both faces (the [...path] subtree
  // and the bare /api); HEAD needs no leg (auto-derived from GET).
  // TRACE is excluded — not a supported route-handler method, Next
  // rejects it at the router level before any handler runs.
  for (const path of ["/api/nonexistent-endpoint", "/api"]) {
    const options = await request.fetch(path, { method: "OPTIONS" });
    expect(options.status(), path).toBe(404);
    expect(options.headers()["content-type"], path).toContain("application/json");
    const optionsBody = await options.json();
    expect(optionsBody.ok, path).toBe(false);
    expect(optionsBody.error.code, path).toBe("NOT_FOUND");
  }
});
