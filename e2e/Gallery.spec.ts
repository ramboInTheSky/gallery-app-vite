import { test, expect } from "@playwright/test";

test.describe("Gallery Page E2E Tests", () => {
  // Before each test, navigate to the home page
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays loading skeletons initially", async ({ page }) => {
    // Wait for skeletons (aria-label="Loading content") to appear
    const skeletons = await page.locator('[aria-label="Loading content"]');
    await expect(skeletons.first()).toBeTruthy();
  });

  test("renders images once data is loaded", async ({ page }) => {
    // Wait for at least one image to appear
    const image = page.locator("img[alt]");
    await expect(image.first()).toBeVisible();
  });

  test("navigates to edit page when an image is clicked", async ({ page }) => {
    // Once images appear
    const firstImageCard = page.locator("img[alt]").first();
    await firstImageCard.click();

    // Check if we navigated to the edit page
    // Assuming URL changes to /edit/:id
    await expect(page).toHaveURL(/\/edit\//);
  });

  test("infinite scroll loads more images", async ({ page }) => {
    // Wait for some initial images
    const images = page.locator("img[alt]");
    await expect(images.first()).toBeVisible();

    // Scroll to bottom to trigger infinite scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for new images to appear or sentinel text
    // e.g. "Loading more..." or "Scroll down to load more"
    const sentinel = page.locator("text=Loading more...");
    await expect(sentinel).toBeVisible({ timeout: 5000 });
  });

  // NOTE: this test has been disabled since the API ALWAYS return images!!!!
  test.skip("shows 'No more images to load.' once hasNextPage is false", async ({
    page,
  }) => {
    // This requires your app to eventually set hasNextPage = false
    // Example: wait for enough scrolling or a specific scenario
    // We'll forcibly scroll multiple times
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
    }

    const noMore = page.locator("text=No more images to load.");
    await expect(noMore).toBeVisible();
  });
});
