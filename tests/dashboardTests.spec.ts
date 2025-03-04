import { test, expect } from "@playwright/test";
import { getUrl, IDENTIFIERS } from "../src/services/urlsHelper";

test.describe("test dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(getUrl(IDENTIFIERS.HOME));
  });

  test("has heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Summary statistics for all vehicles" })
    ).toBeVisible();
  });
  test("has summary with masked values", async ({ page }) => {
    await expect(page).toHaveScreenshot("DashboardFull.png", {
      mask: [page.locator(".data-plate__value, .leaflet-container")],
    });
  });
  test("has 10 EV with masked values", async ({ page }) => {
    await expect(page.locator(".ev-plate__title")).toHaveCount(30);
    await expect(page).toHaveScreenshot("DashboardFullWithEV.png", {
      mask: [page.locator(".react-grid-layout, .ev-plate")],
    });
  });
});
