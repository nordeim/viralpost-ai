import { expect, test } from "@playwright/test";

// The logged-out auth surface (no storage state for this spec): the
// three in-card views (signin / reset / signup) + the wrong-credentials
// banner + the login round-trip on the authenticated side.

test.use({ storageState: { cookies: [], origins: [] } });

test("login page renders the ViralPost AI card", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome to ViralPost AI" })).toBeVisible();
  await expect(page.getByText("Sign in to continue")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page).toHaveTitle("ViralPost AI");
});

test("rejects wrong credentials with the visible banner", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: /Invalid email or password/i }),
  ).toBeVisible();
});

test("forgot password swaps the card to the reset view and back", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await expect(page.getByRole("heading", { name: "Reset your password" })).toBeVisible();
  await expect(
    page.getByText("Enter your email and we'll send you a link to reset your password"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
  // The login-only chrome is gone on the reset view.
  await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
  // The URL never changes — the swap is in-card (the reference's own
  // behavior).
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to ViralPost AI" })).toBeVisible();
});

test("send reset link swaps to the check-your-email view", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await page.getByLabel("Email").fill("demo@example.com");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
  await expect(page.getByText("demo@example.com")).toBeVisible();
});

test("signup view renders the minimal form (no Google, no divider)", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Confirm Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create account" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
});

test("signup with mismatched passwords answers the banner", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await page.getByLabel("Email").fill("throwaway-e2e@example.com");
  await page.getByLabel("Password", { exact: true }).fill("Password123!");
  await page.getByLabel("Confirm Password").fill("Different123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Passwords do not match")).toBeVisible();
});
