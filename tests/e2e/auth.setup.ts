import { expect, test } from "@playwright/test";

// Sign the demo user in ONCE through the real login UI and persist the
// browser storage state for the whole chromium project (the auth
// endpoints are rate-limited per IP/15 min — login 10 / signup 10 /
// resend 5 / verify 20 / forgot 10 / reset 10, the six per-route
// budgets — so per-test logins would trip the limiter mid-suite;
// the summary completed session-38, S38-5, joining the playwright.config
// + AGENTS summaries the S36-6c sweep had already completed).

const STORAGE = "tests/e2e/.auth/user.json";

test("authenticate demo user", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("$Abcd1234");
  await page.getByRole("button", { name: "Sign in" }).click();

  // The reference's login redirects to the landing page ("/Home" there;
  // ours to the canonical "/").
  await page.waitForURL("/");
  await expect(page.getByRole("heading", { name: "Create Viral Social Media Posts with AI" })).toBeVisible();

  await page.context().storageState({ path: STORAGE });
});
