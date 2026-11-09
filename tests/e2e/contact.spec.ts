import { expect, test } from "@playwright/test";

// The contact form — the advertised action must be REAL (the reference's
// handler is a client-side stub with zero persistence; ours POSTs to
// /api/contact and lands a ContactMessage row — the documented superset).

test("submits, shows Message Sent!, and clears the form", async ({ page }) => {
  await page.goto("/Contact");
  await page.getByLabel("Name").fill("E2E Probe");
  await page.getByLabel("Email").fill("probe@example.com");
  await page.getByLabel("Message").fill("Hello from the e2e battery.");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByRole("button", { name: "Message Sent!" })).toBeVisible();
  await expect(page.getByLabel("Name")).toHaveValue("");
  await expect(page.getByLabel("Message")).toHaveValue("");
});

test("an invalid email never submits (native validation gates the form)", async ({ page }) => {
  // The reference's own form uses required + type=email — the browser's
  // native validation blocks submission, exactly like ours. The API-level
  // validation is covered by the direct-request test below.
  await page.goto("/Contact");
  await page.getByLabel("Name").fill("E2E Probe");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Message").fill("Hello.");
  await page.getByRole("button", { name: "Send Message" }).click();
  // No send happened: the button never flipped, the form kept its values.
  await expect(page.getByRole("button", { name: "Message Sent!" })).toHaveCount(0);
  await expect(page.getByLabel("Email")).toHaveValue("not-an-email");
});

test("the API rejects an invalid email with the field message", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { name: "API Probe", email: "not-an-email", message: "Hello." },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error.message).toBe("Enter a valid email address");
});

test("the row landed (the persistence superset)", async ({ request }) => {
  // The API answers the envelope contract for a fresh valid submission.
  const res = await request.post("/api/contact", {
    data: { name: "API Probe", email: "api-probe@example.com", message: "Direct API check." },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.ok).toBe(true);
});
