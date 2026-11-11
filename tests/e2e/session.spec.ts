import { expect, test } from "@playwright/test";

// The authenticated-session surface (rides the setup project's storage
// state — the demo user's signed-in cookie). The app's public pages are
// session-independent by design (the reference's only authed surface is
// the login card), so the session is exercised through the API envelope.

test("the authenticated session reads and signs out cleanly", async ({ request }) => {
  const me = await request.get("/api/auth/me");
  expect(me.ok()).toBeTruthy();
  const body = await me.json();
  expect(body.ok).toBe(true);
  expect(body.data?.email).toBe("sepnetflix2023@outlook.com");

  const out = await request.post("/api/auth/logout");
  expect(out.ok()).toBeTruthy();
  const meAfter = await request.get("/api/auth/me");
  const after = await meAfter.json();
  expect(after.data).toBeNull();
});

// Session-31 (S31-7b): the authenticated-visitor /login render — a
// documented parity posture (the CRM family's session-23, S23-P2 — a
// donor-ledger number: the reference serves the login card to
// AUTHENTICATED visitors too, NO redirect) that had no behavioral pin:
// a regression reintroducing `if (user) redirect("/")` on /login would
// have shipped green through every layer (session.spec exercised the
// API envelope only; auth.spec opts out of the shared storageState).
// Rides the setup project's signed-in cookie via the page fixture.
test("the authenticated visitor still gets the login card (the s23-P2 no-redirect parity posture)", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome to ViralPost AI" })).toBeVisible();
  // No redirect: the login card renders AT /login for the signed-in
  // visitor, exactly as the reference behaves.
  await expect(page).toHaveURL(/\/login$/);
});
