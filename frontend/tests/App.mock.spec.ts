import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

// load too many args, load no filepath, load weird filepath
// view too many args

test("Test csv data is being produced", async ({ page }) => {
  await page.waitForTimeout(100);
  await page.getByLabel("Command input").fill("mock this will make a csv string");

  await page.getByLabel("Command input").press("Enter");

  await expect(page.locator(".repl-history")).toContainText(
    "this, will, make, a, csv, string"
  );})

test("test invalid mock search command", async ({ page }) => {
  await page.waitForTimeout(4000);
  await page.getByLabel("Command input").fill("mock okay input");
  await page.locator("button").click();
  await page.waitForTimeout(100);

  await page.waitForSelector(".repl-history");

  await page.getByLabel("Command input").fill("mock");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText(
    "Error - please specify a destination"
  );
});
