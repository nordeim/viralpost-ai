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

// Session-13 (S13-4): the from_url round-trip's first BEHAVIORAL coverage
// at the e2e layer (the resolver's logic is unit-pinned at the seam —
// tests/from-url.test.ts; these legs pin the WIRING: the card reads the
// param, passes its origin into the seam, and the push lands where the
// auth wall intercepted the guest). Both directions live-verified on the
// dev server during the session-13 audit walk.
test("the from_url round-trip: sign-in returns to the same-origin target", async ({ page }) => {
  await page.goto("/login?from_url=/Tool");
  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("$Abcd1234");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/Tool$/, { timeout: 15_000 });
  await expect(page).toHaveTitle("Tool | ViralPost AI");
});

test("a FOREIGN from_url falls back to the plain landing (the open-redirect guard, live)", async ({ page }) => {
  await page.goto("/login?from_url=https://evil.example/x");
  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("$Abcd1234");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });
});

// Session-11 (F11-3 + F11-4 — the verification-funnel closure): the FULL
// round trip, previously untested at any layer: signup → the return
// visitor's login attempt is REFUSED (verification is enforceable — the
// stored-hash gate, not the code TTL) → the 403 re-enters the funnel (the
// card swaps to the verify view instead of dead-ending on the banner) →
// resend re-mints (the expired/fresh-code re-arm) → the pasted code
// distributes across the six boxes (F11-15) → verify signs the account in.
test("the return-visitor verification funnel closes end-to-end", async ({ page }) => {
  const email = `e2e-funnel-${Date.now()}@example.com`;

  // 1. Sign up — the verify view lands with the in-app code hint.
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("Password123!");
  await page.getByLabel("Confirm Password").fill("Password123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();

  // 2. The return visitor: reload to a fresh signin card, attempt login.
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("Password123!");
  await page.getByRole("button", { name: "Sign in" }).click();

  // 3. The 403 re-enters the funnel — the verify view, not the banner
  //    dead-end (the pre-cure card stayed on signin with only the
  //    refusal banner and no path back).
  await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();
  await expect(page.getByText(email).first()).toBeVisible();

  // 4. Resend — the fresh code rides the response (the demo-workflow
  //    in-app delivery; a self-hosted deployment without a mail
  //    transport).
  await page.getByRole("button", { name: "Resend" }).click();
  const hint = page.getByText("Demo code:").locator("span");
  await expect(hint).toBeVisible();
  const code = (await hint.textContent()) ?? "";

  // 5. The pasted code distributes across the boxes from Digit 1 (the
  //    F11-15 affordance — a paste used to leave only the last digit).
  await page.getByLabel("Digit 1").fill(code);
  await expect(page.getByLabel("Digit 6")).toHaveValue(code.slice(5));

  // 6. Verify — signs the account in and lands on the public landing.
  await page.getByRole("button", { name: "Verify email" }).click();
  await expect(page).toHaveURL(/\/$/, { timeout: 15_000 });

  // 7. The session is real (the funnel completed into an authed cookie).
  const me = await page.request.get("/api/auth/me");
  const body = await me.json();
  expect(me.status()).toBe(200);
  expect(body?.ok).toBe(true);
  expect(body?.data?.email).toBe(email);
});
