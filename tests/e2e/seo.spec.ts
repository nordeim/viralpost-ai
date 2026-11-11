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
  // Session-25 (S25-17): og:url / twitter:url absoluteness on the
  // RENDERED DOM (the canonical arm above owned the link form; these
  // two ride the metadata.other escape hatch — the S24-10 loc family
  // pinned the sitemap side, this closes the head side). Folded into
  // the existing block — the S18-2 in-place precedent, no count
  // change.
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[name="twitter:url"]')).toHaveAttribute(
    "content",
    /^https?:\/\/[^/]+\/?$/,
  );
  // Session-29 (S29-5): the rendered-DOM superset — og:image and
  // twitter:card were pinned only at the metadata-object level
  // (pageMetadata's openGraph.images / OG_IMAGE const) and the asset
  // level (the S24-11 IHDR), never the SERVED head. A framework-level
  // metadata rendering change (relative image resolution against
  // metadataBase, a page-level metadata-merge regression) would have
  // shipped green while the most-shared URL's preview card degraded.
  // The twitter:card arm carries the same one-share doctrine
  // (summary_large_image — the reference's own card type, pinned live).
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og-image\.png$/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  // The inner-route canonical face: / and /signup carried the DOM-level
  // canonical assertions; the inner routes were pinned only as the
  // metadata object's alternates.canonical. /Tool joins the rendered
  // family (the route-prefixed canonical — the reference's own shape).
  await page.goto("/Tool");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/Tool$/,
  );
});

test("session-19 (S19-1): the inner routes ship the prefixed truncated description family", async ({ page }) => {
  // Live-captured on the reference 2026-11-10: /Tool /Pricing /Contact
  // now ship "<Page> on ViralPost AI. " + the 70-char word-boundary
  // tail on meta/og/twitter description alike (the platform adopted
  // the prefix between the session-18 and session-19 walks; the
  // session-8 F8-1 plain-description finding is re-anchored). The
  // three surfaces are byte-identical on the reference — pinned that
  // way here.
  const tail = "An AI-powered social media generator that helps creators, influencers.";
  await page.goto("/Tool");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    `Tool on ViralPost AI. ${tail}`,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    `Tool on ViralPost AI. ${tail}`,
  );
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    "content",
    `Tool on ViralPost AI. ${tail}`,
  );
  await page.goto("/Pricing");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    `Pricing on ViralPost AI. ${tail}`,
  );
  await page.goto("/Contact");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    `Contact on ViralPost AI. ${tail}`,
  );
  // The unprefixed routes keep the plain paragraph (unchanged on the
  // reference) — the full 170-char root description, byte-pinned.
  await page.goto("/login");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "An AI-powered social media generator that helps creators, influencers, and businesses draft high-engagement posts for Instagram, TikTok, Twitter, and LinkedIn in seconds.",
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
  // path fall to Next's own bare 204 (live-observed in the RED run —
  // not the 405 the audit first hypothesized; the route file matches
  // the path, just not the method) — a non-envelope response on a path
  // that does not exist. The leg covers both faces (the [...path]
  // subtree and the bare /api); HEAD needs no leg (auto-derived from
  // GET). TRACE is excluded — not a supported route-handler method,
  // Next rejects it at the router level before any handler runs.
  // Session-19 (S19-6): OPTIONS on KNOWN API paths deliberately keeps
  // Next's router-level 204 (the CORS-preflight-friendly face — no
  // handler owns OPTIONS semantics there); only the unknown-path
  // catch-alls answer the envelope.
  for (const path of ["/api/nonexistent-endpoint", "/api"]) {
    const options = await request.fetch(path, { method: "OPTIONS" });
    expect(options.status(), path).toBe(404);
    expect(options.headers()["content-type"], path).toContain("application/json");
    const optionsBody = await options.json();
    expect(optionsBody.ok, path).toBe(false);
    expect(optionsBody.error.code, path).toBe("NOT_FOUND");
  }
});

// Session-22 (S22-14): the manifest's icon contract — the two entries
// point at ${origin}/icon.png (the file-convention route). No test at
// any layer asserted the icons RESOLVE; a deleted file or a convention
// break would ship green with the manifest pointing at a 404. The
// apple-icon rides the same convention family.
test("the manifest's icon routes resolve (the file-convention contract)", async ({ request }) => {
  const icon = await request.get("/icon.png");
  expect(icon.status()).toBe(200);
  expect(icon.headers()["content-type"]).toBe("image/png");
  const apple = await request.get("/apple-icon.png");
  expect(apple.status()).toBe(200);
  expect(apple.headers()["content-type"]).toBe("image/png");
});
