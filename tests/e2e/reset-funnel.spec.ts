import { expect, test } from "@playwright/test";

// The password-reset funnel, end to end (session-12, F12-2 — the A-2
// coverage gap). The verification funnel got its full e2e at session 11;
// its sibling funnel had ZERO behavioral coverage: no spec navigated
// /reset-password?token=…, the reset API was pinned only by source
// regexes, and a wiring break in the screen or the route's conditional
// updateMany would have shipped through the green gate.
//
// The walk: signup a scratch user → verify (the in-app code hint) →
// forgot-password (the in-app reset link — the webServer pins
// VIRALPOST_DISABLE_IN_APP_RESET="" so the link always rides the
// response) → open the link → set a NEW password → sign in with it →
// /api/auth/me → then the single-use replay of the consumed token
// answers 400.
//
// Auth-rate budget per run (per IP / 15 min — well under every wall):
// signup 1, verify 1, forgot 1, reset 2 (the set + the replay), login 1.

test.use({ storageState: { cookies: [], origins: [] } });

test("the password-reset funnel closes end-to-end (signup → verify → forgot → link → new password → session)", async ({ page }) => {
  const email = `e2e-reset-${Date.now()}@example.com`;
  const oldPassword = "Password123!";
  const newPassword = "NewPassword456!";

  // 1. Sign up the scratch user — the verify view lands with the code hint.
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(oldPassword);
  await page.getByLabel("Confirm Password").fill(oldPassword);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "Verify your email", level: 2 })).toBeVisible();

  // 2. Verify through the in-app hint (the account must be verified or
  //    the post-reset login would hit the F11-4 gate).
  const hint = page.getByText("Demo code:").locator("span");
  await expect(hint).toBeVisible();
  const code = (await hint.textContent()) ?? "";
  await page.getByLabel("Digit 1").fill(code);
  await expect(page.getByLabel("Digit 6")).toHaveValue(code.slice(5));
  await page.getByRole("button", { name: "Verify email" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });

  // 3. Forgot password — the sent view carries the in-app reset link.
  await page.goto("/login");
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Send reset link" }).click();
  const resetLink = page.getByRole("link", { name: "Open your password reset link" });
  await expect(resetLink).toBeVisible();
  const resetUrl = (await resetLink.getAttribute("href")) ?? "";
  expect(resetUrl).toContain("/reset-password?token=");

  // 4. Open the link — the set-new-password form renders (a valid,
  //    unconsumed token).
  await page.goto(resetUrl);
  await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();

  // 5. Set the new password — the done state lands.
  await page.getByLabel("New password", { exact: true }).fill(newPassword);
  await page.getByLabel("Confirm password").fill(newPassword);
  await page.getByRole("button", { name: /reset password/i }).click();
  await expect(page.getByText(/password has been reset/i)).toBeVisible();

  // 6. Sign in with the NEW password — the old one is gone.
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(newPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
  const me = await page.request.get("/api/auth/me");
  const body = await me.json();
  expect(me.status()).toBe(200);
  expect(body?.ok).toBe(true);
  expect(body?.data?.email).toBe(email);

  // 7. The token is SINGLE-USE: replaying the consumed token answers 400.
  //    (The link is RELATIVE — /reset-password?token=… — so the parse
  //    carries a dummy base; only the query param matters here.)
  const token = new URL(resetUrl, "http://e2e.local").searchParams.get("token") ?? "";
  const replay = await page.request.post("/api/auth/reset-password", {
    data: { reset_token: token, new_password: "ReplayPassword789!" },
  });
  expect(replay.status()).toBe(400);
});

test("the reset-password screen answers the invalid-link state (no token → the designed card)", async ({ page }) => {
  await page.goto("/reset-password");
  await expect(page.getByRole("heading", { name: "Invalid reset link" })).toBeVisible();
  await expect(page.getByText("This password reset link is invalid or has expired.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Back to login" })).toBeVisible();
});

// Session-31 (S31-7c): the screen's failed-submit surface — the error
// banner branch (the API-rejected shape) had no behavioral pin: the
// no-token card and the happy path were walked, but a wiring break in
// the screen's error path (setError never called, the banner never
// rendered) would have shipped green. A garbage token renders the FORM
// (the screen only gates a MISSING token client-side); matching
// passwords submit to the API, which answers the envelope's 400 with
// "Invalid or expired reset token", and the role="alert" banner must
// carry it. Auth-rate budget: +1 reset POST (the wall is 10/15 min).
test("the reset-password screen surfaces the API-rejected branch (garbage token → the inline error banner)", async ({ page }) => {
  await page.goto("/reset-password?token=e2e-garbage-token-not-in-db");
  await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
  await page.fill("#password", "NewPassword456!");
  await page.fill("#confirmPassword", "NewPassword456!");
  await page.getByRole("button", { name: "Reset password" }).click();
  // Scoped to the form: Next's route announcer also carries role="alert"
  // (aria-live assertive) — the banner is the form's own inline node.
  const banner = page.locator('form [role="alert"]');
  await expect(banner).toBeVisible();
  await expect(banner).toHaveText("Invalid or expired reset token");
});
