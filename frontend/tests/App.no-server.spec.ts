import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

// Note: The following tests are meant to be ran when the Server is *not* running, and therefore most of them will *not* pass otherwise.
test("mode output unaffected when server not running", async ({page}) => {
    await page.getByLabel("Command input").fill("mode");
    await page.locator("button").click();
  
    await page.waitForSelector(".repl-history");
    await expect(page.locator(".repl-history")).toContainText("Output mode switched to verbose"); // mode is the only unaffected command
  
    await page.getByLabel("Command input").fill("mode");
    await page.locator("button").click();
  
    await page.waitForSelector(".repl-history");
    await expect(page.locator(".repl-history")).toContainText("Output mode switched to brief");
  });
  
  test("load output error when server not running", async ({page}) => {
      await page.getByLabel("Command input").fill("load_file census/sample.csv");
      await page.locator("button").click();
    
      await page.waitForSelector(".repl-history");
      await expect(page.locator(".repl-history")).toContainText("Error with data fetching for load request");
    });
    
  test("view output error when server not running", async ({page}) => {
    await page.getByLabel("Command input").fill("view");
    await page.locator("button").click();
    
    await page.waitForSelector(".repl-history");
    await expect(page.locator(".repl-history")).toContainText("Error with data fetching for view request");
  })
    
  test("search output error when server not running", async ({page}) => {
    await page.getByLabel("Command input").fill("search 0 Westerly");
    await page.locator("button").click();
    
    await page.waitForSelector(".repl-history");
    await expect(page.locator(".repl-history")).toContainText("Error with data fetching for search request");
  })
    
  test("broadband output error when server not running", async ({page}) => {
    await page.getByLabel("Command input").fill("broadband california napa%20county");
    await page.locator("button").click();
    
    await page.waitForSelector(".repl-history");
    await expect(page.locator(".repl-history")).toContainText("Error with data fetching for broadband request");
  });