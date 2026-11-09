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
