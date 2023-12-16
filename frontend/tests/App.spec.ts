import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("on page load, i see an input bar", async ({ page }) => {
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
});


//////////////////

test("search without loading a input", async ({page}) => {
  await page.getByLabel("Command input").fill("");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Please enter the 'find' command followed by your desired destinations"
  );
});

test("search a bad input that is not a handler", async ({page,}) => {
  await page.getByLabel("Command input").fill("i really like to eat ice cream");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText("Invalid command: i");
});

test("correct path is displayed", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Sharpe Refectory, Salomon Center, Andrews Hall, Sayles Hall");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Sharpe Refectory, Sayles Hall, Salomon Center, Andrews Hall"
  );
});

test("correct path is displayed given two locations", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Sharpe Refectory, Salomon Center");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Sharpe Refectory, Salomon Center"
  );
});

test("error is thrown given no destination", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Error - please specify a destination"
  );
});

test("error is thrown given locations outside of brown", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Sharpe Refectory, Eiffel Tower, Smithsonian Museum");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Error with data fetching for find request"
  );
});

test("multiple find searches in a row with other inputs", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Sharpe Refectory, Salomon Center, Andrews Hall, Sayles Hall");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Sharpe Refectory, Sayles Hall, Salomon Center, Andrews Hall"
  );

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("mode");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText(
    "Output mode switched to brief"
  );

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Morriss Hall, Sharpe Refectory, Nelson Fitness Center");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Morriss Hall, Nelson Fitness Center, Sharpe Refectory"
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText(
    "Output mode switched to verbose"
  );
  
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill(
      "find Andrews Hall, Nelson Fitness Center, Morriss Hall, Sharpe Refectory"
    );
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText(
    "Andrews Hall, Morriss Hall, Nelson Fitness Center, Sharpe Refectory"
  );
  
  await page.waitForTimeout(100);
  await page.getByLabel("Command input").fill("mock this will make a csv string");

  await page.getByLabel("Command input").press("Enter");

  await expect(page.locator(".repl-history")).toContainText(
    "this, will, make, a, csv, string"
  );
});

test("keyboard shortcut can submit commands", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("find Sayles Hall, Andrews Hall, Salomon Center");
  await page.getByLabel("Command input").press("Enter");
  await expect(page.locator(".repl-history")).toContainText(
    "Sayles Hall, Salomon Center, Andrews Hall"
  );
});

test("unrecognized command has proper error message", async ({page}) => {
  await page.getByLabel("Command input").fill("test");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);
  
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Invalid command: test");
});