import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

// load too many args, load no filepath, load weird filepath
// view too many args

test("Test csv data table is being produced", async ({ page }) => {
  await page.waitForTimeout(100);
  await page.getByLabel("Command input").fill("mock this will make a table");

  await expect(page.locator(".repl-history")).toContainText(
    "this will make a table"
  );})

// test("test that search results get displayed", async ({ page }) => {
//   await page.waitForTimeout(3000);
//   await page.getByLabel("Command input").fill("mock_load file1.csv");
//   await page.locator("button").click()
//   ;

//   await page.getByLabel("Command input").fill("mock_search 1");
//   await page.locator("button").click();
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(1)).toBeVisible();

//   await page.getByLabel("Command input").fill("mock_search 2");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Data1" })).toBeVisible();
// });

test("test invalid search command", async ({ page }) => {
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

// test("test invalid filepath", async ({ page }) => {
//   await page.getByLabel("Command input").fill("mock_load cool.csv");
//   await page.locator("button").click();
//   //await page.waitForTimeout(5000);

//   await page.waitForSelector(".repl-history");
//   await expect(page.locator(".repl-history")).toContainText(
//     "Result: Invalid command: mock_load"
//   );
// });

// test("try loading more than one csv at once", async ({page,}) => {
//   // load command
//   await page.getByLabel("Command input").fill("mock_load file1.csv file2.csv");
//   await page.locator("button").click();
//   //await page.waitForTimeout(5000);

//   // Wait for the content to appear in the history
//   await page.waitForSelector(".repl-history");

//   // Make sure error is thrown
//   await expect(page.locator(".repl-history")).toContainText("Error - Extra Args after loadCSV that is not \'header\'");
// });

// test("broadband data can be retrieved", async ({page}) => {
//   // normal case
//   await page.getByLabel("Command input").fill("mock_broadband Texas Dallas");
//   await page.locator("button").click();
//   //await page.waitForTimeout(5000);

//   await page.waitForSelector(".repl-history");
//   await expect(page.locator(".repl-history")).toContainText("12345");
//   await expect(page.locator(".repl-history")).toContainText("date & time");
// });

// test("broadband handles too little or too many arguments", async ({page}) => {
//   // too many arguments
//   await page.getByLabel("Command input").fill("mock_broadband a b c");
//   await page.locator("button").click();

//   await page.waitForSelector(".repl-history");
//   await expect(page.locator(".repl-history")).toContainText("Error - Do Not Enter Args Other Than State and County");

//   // not enough arguments
//   await page.getByLabel("Command input").fill("mock_broadband");
//   await page.locator("button").click();

//   await page.waitForSelector(".repl-history");
//   await expect(page.locator(".repl-history")).toContainText("Error - Too Few Arguments, Add a <state> and <county> for broadband retrieval");
// })

// test("load, broadband, view, and search interactions", async ({page}) => {
//   await page.waitForTimeout(5000);
//   // load (w/o header)
//   await page.getByLabel("Command input").fill("mock_load file2.csv");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole('cell', { name: 'Data6' })).toBeVisible();
  
//   // broadband
//   await page.getByLabel("Command input").fill("mock_broadband Texas Dallas");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole('cell', { name: '12345' })).toBeVisible();
  
//   // view
//   await page.getByLabel("Command input").fill("mock_view");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole('cell', { name: 'Column1' })).toBeVisible();
  
//   // search
//   await page.getByLabel("Command input").fill("mock_search 1");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(1)).toBeVisible();
  
//   // load (ten star) 
//   await page.getByLabel("Command input").fill("mock_load file1.csv");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(2)).toBeVisible();
  
//   // view
//   await page.getByLabel("Command input").fill("mock_view");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(3)).toBeVisible();
  
//   // search
//   await page.getByLabel("Command input").fill("mock_search 1");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(4)).toBeVisible();
  
//   // view
//   await page.getByLabel("Command input").fill("mock_view");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(5)).toBeVisible();
  
//   // search
//   await page.getByLabel("Command input").fill("mock_search 1");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.getByRole("cell", { name: "Value1" }).nth(6)).toBeVisible();

//   // mode
//   await page.getByLabel("Command input").fill("mode");
//   await page.locator("button").click();
//   await page.waitForSelector(".repl-history");
//   await expect(page.locator(".repl-history")).toContainText("Output mode switched to verbose");
  
// });