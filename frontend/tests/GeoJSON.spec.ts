// import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   await page.goto("http://localhost:8000/");
// });

// test("when area is entered, the search returns successful", async ({ page }) => {
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("area Providence");
//   await page.locator("button").click();
//   await expect(page.locator(".repl-history")).toContainText(
//     "Search Successful"
//   );
// });

// test("when no area is entered, an error is given", async ({ page }) => {
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("area");
//   await page.locator("button").click();
//   await expect(page.locator(".repl-history")).toContainText(
//     "Add an <area> value to area"
//   );
// });

// test("successful search persists even after switching areas", async ({ page }) => {
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("area Providence");
//   await page.locator("button").click();
//   await page.getByLabel("Command input").click();
//   await page.getByLabel("Command input").fill("area Pawtucket");
//   await page.locator("button").click();
//   await expect(page.locator(".repl-history")).toContainText("Search Successful");
// });


