import { expect, test } from "@playwright/test";

// The generator journey — the app's core workflow, run against the real
// standalone server with the LOCAL engine (no external LLM dependency —
// the deterministic engine is the offline contract; the reference's own
// LLM was observed returning HTTP 402 with no generation ever landing —
// the failure face has drifted across walks, the D-1 record).

const TEXTBOX = (page: import("@playwright/test").Page) =>
  page.getByLabel("Describe your post idea");

test.describe("generator (desktop)", () => {
  // Clipboard permissions for the copy round-trip (headless Chromium
  // denies the clipboard API without them).
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test.beforeEach(async ({ page }) => {
    await page.goto("/Tool");
  });

  test("the button is disabled until the idea is non-empty", async ({ page }) => {
    const btn = page.getByRole("button", { name: "Generate Post" });
    await expect(btn).toBeDisabled();
    await TEXTBOX(page).fill("motivational post for entrepreneurs about consistency");
    await expect(btn).toBeEnabled();
  });

  test("generates a post and copies it", async ({ page }) => {
    await TEXTBOX(page).fill("motivational post for entrepreneurs about consistency");
    await page.getByRole("button", { name: "Generate Post" }).click();

    // The result card mounts with the GENERATED POST label + copy button.
    await expect(page.getByText("Generated Post")).toBeVisible({ timeout: 15_000 });
    const postText = await page
      .locator("p.whitespace-pre-line")
      .first()
      .innerText();

    // The reference prompt contract: 5-8 hashtags on the final line.
    const tags = postText.trim().split("\n").pop()?.match(/#[A-Za-z0-9_]+/g) ?? [];
    expect(tags.length).toBeGreaterThanOrEqual(5);
    expect(tags.length).toBeLessThanOrEqual(8);

    // Copy round-trip: the button flips to "Copied!".
    await page.getByRole("button", { name: "Copy" }).click();
    await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  });

  test("the free quota counts down and walls at 3/day", async ({ page }) => {
    await page.evaluate(() => window.localStorage.removeItem("viralpost_generations"));
    await page.reload();

    // Generations 1 and 2 render the result card; the counter ticks down
    // ("2 free", then "1 free").
    await expect(page.getByText("3 free generations remaining")).toBeVisible();
    for (let i = 0; i < 2; i++) {
      await TEXTBOX(page).fill(`fitness motivation post number ${i + 1}`);
      await page.getByRole("button", { name: "Generate Post" }).click();
      await expect(page.getByText("Generated Post")).toBeVisible({ timeout: 15_000 });
      // Session-25 (S25-2): exact:true disambiguates the VISIBLE quota
      // span from the new sr-only status region ("Post generated — 2
      // free generations remaining today.") — substring matching
      // resolved to both and tripped strict mode.
      await expect(
        page.getByText(`${2 - i} free generation${2 - i !== 1 ? "s" : ""} remaining`, { exact: true }),
      ).toBeVisible();
    }

    // The THIRD generation consumes the last slot — the card swaps to the
    // limit wall (the reference's own behavior: the counter re-render
    // replaces the generator body the moment the quota is spent).
    await TEXTBOX(page).fill("fitness motivation post number 3");
    await page.getByRole("button", { name: "Generate Post" }).click();
    await expect(page.getByText("You reached the free limit")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("link", { name: "Unlock Unlimited Posts – $19" })).toBeVisible();

    // The counter persists across reloads (same day).
    await page.reload();
    await expect(page.getByText("You reached the free limit")).toBeVisible();
  });

  test("an over-length idea answers a friendly error", async ({ page }) => {
    await TEXTBOX(page).fill("x".repeat(600));
    await page.getByRole("button", { name: "Generate Post" }).click();
    await expect(page.getByText(/shorter/i)).toBeVisible({ timeout: 10_000 });
    // The button settles (the reference's dead generator never lands a
    // post — no generation ever lands, the drift-proof D-1 record; the
    // failure face drifted from a session-46-era failure toast to silent
    // rest by the session-68 walk; ours recovers with a retry
    // affordance, the superset contract).
    await expect(page.getByRole("button", { name: "Generate Post" })).toBeEnabled();
    // Session-51 (S51-8, AUDIT-1 L2): the RAW-bound behavioral leg — a
    // whitespace-padded 1001-char idea (collapse 497 fits the seam's
    // 500) must answer the RAW pre-filter's message, never the seam's:
    // the honest bound's behavior pin. The textual F11-7 regexes
    // (api-robustness) own the branch's SOURCE shape; THIS leg owns
    // the BEHAVIOR (the class a textual pin cannot catch — a
    // behavior-reverted branch keeping the source text). Born green;
    // the battery reverts the branch to the single-message form and
    // REDs this leg alongside F11-7.
    await TEXTBOX(page).fill("x".repeat(497) + " ".repeat(504));
    await page.getByRole("button", { name: "Generate Post" }).click();
    await expect(page.getByText(/1000 characters max/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole("button", { name: "Generate Post" })).toBeEnabled();
  });

  // Session-47 (S47-7, AUDIT-2 L3): the toast auto-dismiss leg — the
  // 4s timer + the [paused, item.id] re-arm were source-pinned only;
  // no e2e ever waited out the timer. The over-length error toast is
  // the trigger (the same leg above renders it); the assertion reads
  // the DISMISSAL, not the render (the anatomy suite owns the render
  // face). ~4s timer + the settle margin. (Session-72, S72-4: the
  // hover-pause face this comment once called "timing-flaky by
  // nature" is now behaviorally owned by the S72-4b leg below — the
  // mount-probe redesign made it deterministic; the dep-array face
  // stays with toast-anatomy's S48-4 pin.)
  test("the error toast auto-dismisses (the 4s timer, S47-7)", async ({ page }) => {
    await TEXTBOX(page).fill("y".repeat(600));
    await page.getByRole("button", { name: "Generate Post" }).click();
    const toast = page.getByText(/shorter/i);
    await expect(toast).toBeVisible({ timeout: 10_000 });
    // 4s timer + the dismissal margin (never hovered — the pointer
    // rests away from the viewport's toast region by default).
    await expect(toast).toBeHidden({ timeout: 7_000 });
  });

  // Session-72 (S72-4, AUDIT-2 M-1 — live-probed): the mount-face
  // pause CONTRACT leg — a toast born under a parked pointer does
  // not vanish mid-read. The pointer is PARKED inside the toast
  // spawn region BEFORE the card mounts, and the trigger is
  // KEYBOARD-driven (Enter on the focused Generate button) so the
  // pointer never moves — the born-under-a-stationary-cursor state
  // (a mouse-driven click would re-park the pointer on the button
  // and test the event path instead). The paused card carries no
  // timer: it must survive the full 4s dismissal window (asserted at
  // 5s; the S47-7 leg above owns the unparked dismissal path). The
  // pointer parks at (width-60, height-40) — inside the card's rect
  // for any card the viewport renders at this width (the viewport
  // anchors right-0/bottom-0 with p-4 padding; a 44px/24px inset
  // from the card's right/bottom edges clears every card height).
  // Born GREEN in this app's slow-mount timing — the engine's own
  // re-evaluation rescues the card ~1.5s in even without the mount
  // probe (the S72-4 battery's record; the fast-mount harness where
  // the card dismissed 6/6 sits outside this app's fetch latency).
  // This leg owns the user-visible CONTRACT: it REDs when BOTH
  // pause writers at the mount face are broken (the geometry probe
  // deleted AND the transition pairs gone); the source-level teeth
  // are toast-anatomy's S72-4a pin, REDden on the geometry revert
  // plant — the S71-7a born-green precedent.
  test("a toast born under a parked pointer pauses — the mount geometry probe (S72-4)", async ({ page }) => {
    await TEXTBOX(page).fill("z".repeat(600));
    const vp = page.viewportSize();
    expect(vp).not.toBeNull();
    await page.mouse.move(vp!.width - 60, vp!.height - 40);
    await page.getByRole("button", { name: "Generate Post" }).focus();
    await page.keyboard.press("Enter");
    const toast = page.getByText(/shorter/i);
    await expect(toast).toBeVisible({ timeout: 10_000 });
    // Past the full 4s timer + margin: the paused card survives.
    await page.waitForTimeout(5_000);
    await expect(toast).toBeVisible();
    // The pointer never moved — the pause carried the card past the
    // full timer window (whichever writer delivered it; the contract
    // is the survival, the writers are the anatomy pin's business).
  });
});

test.describe("generator (phone 390×844)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("generates at phone width with no overflow", async ({ page }) => {
    await page.goto("/Tool");
    await page.evaluate(() => window.localStorage.removeItem("viralpost_generations"));
    await TEXTBOX(page).fill("travel adventure post about a weekend escape");
    await page.getByRole("button", { name: "Generate Post" }).click();
    await expect(page.getByText("Generated Post")).toBeVisible({ timeout: 15_000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
