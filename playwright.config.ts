import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e", // Directory containing Playwright tests
  retries: 3,
  workers: "60%",
  maxFailures: 1,
  use: {
    baseURL: "http://localhost:4173", // or your dev server URL
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
      },
    },
    {
      name: "Mobile Chrome (AXE_A11Y)",
      use: {
        ...devices["Pixel 5"],
      },
    },
  ],
});
