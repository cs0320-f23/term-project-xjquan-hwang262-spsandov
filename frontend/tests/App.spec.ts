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

test("after I click the button, its label increments", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(
    page.getByRole("button", { name: "Submitted 4 times" })
  ).toBeVisible();
});

//////////////////

test("search without first loading a file", async ({page}) => {
  await page.getByLabel("Command input").fill("search 0 Westerly");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText("error_datasource: data hasn't been loaded yet");
});

test("view without first loading a file", async ({page,}) => {
  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await expect(page.locator(".repl-history")).toContainText("error_datasource: data hasn't been loaded yet");
});

test("Test csv data table is being produced", async ({ page }) => {
  await page.waitForTimeout(100);
  await page.getByLabel("Command input").fill("load_file census/sample.csv");

  await page.locator("button").click();
  await expect(page.getByRole('cell', { name: 'success' })).toBeVisible();

  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator('table').filter({ hasText: 'City/TownMedian Household IncomeMedian Family IncomePer Capita IncomeRhode Islan' })).toBeVisible();
});

test("keyboard shortcut can submit commands", async ({page}) => {
  //await page.waitForTimeout(1000);
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('load_file census/sample.csv');
  await page.getByLabel("Command input").press('Enter');
  await page.getByLabel("Command input").fill('view');
  await page.getByLabel("Command input").press('Enter');
  await page.getByLabel("Command input").press('Tab');
  await page.getByRole('button', { name: 'Submitted 2 times' }).press('Tab');
  await page.getByText('Result: success').press('Tab');
  await page.locator('table').filter({ hasText: 'success' }).press('Tab');
  await page.locator('tbody').filter({ hasText: 'success' }).press('Tab');
  await page.getByText('Result: City/TownMedian Household IncomeMedian Family IncomePer Capita IncomeRho').press('Tab');
});

test("after entering mode command, history displays in verbose mode", async ({page}) => {
  // Fill input with the "verbose" command
  //await page.waitForTimeout();
  await page.getByLabel("Command input").fill("mode");
  await page.locator("button").click();
  // Make sure mode switched output is displayed
  await expect(page.locator(".repl-history")).toContainText("verbose");
  await page.getByLabel("Command input").fill("view");
  // Make sure the Command: Output: format of verbose is produced
  await expect(page.locator(".repl-history")).toContainText("Command:");
  //Switch back to brief
  await page.getByLabel("Command input").fill("brief");
  await page.locator("button").click();
  // Make sure mode switched output is displayed
  await expect(page.locator(".repl-history")).toContainText("brief");

});

test("load file then load a second, then view make sure it’s the second one", async ({page}) => {
  await page.waitForTimeout(2000);
  await page.getByLabel("Command input").fill("load_file stars/ten-star.csv");
  await page.locator("button").click();
  await page.waitForTimeout(100);
  await page.waitForSelector(".repl-history");

  // Load file without headers
  await page.getByLabel("Command input").fill("load_file without_header/multiple_line.csv");
  await page.locator("button").click();
  await page.waitForTimeout(100);
  await page.waitForSelector(".repl-history");

  //Now view the file
  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");

  await expect(page.getByRole("cell", { name: "Brian" })).toBeVisible();
});

test("test that search results get displayed", async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.getByLabel("Command input").fill("load_file with_header/header_multiple_line.csv");
  await page.locator("button").click();

  await page.getByLabel("Command input").fill("search 2 Orange");
  await page.locator("button").click();
  await expect(page.getByRole("cell", { name: "Orange" })).toBeVisible();

  await page.getByLabel("Command input").fill("search Name Jack");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Jack" }).first()).toBeVisible();
  await expect(page.getByRole("cell", { name: "Jack" }).nth(1)).toBeVisible();
});

test("test invalid search command", async ({ page }) => {
  await page.waitForTimeout(4000);
  await page.getByLabel("Command input").fill("load_file with_header/header_multiple_line.csv");
  await page.locator("button").click();
  await page.waitForTimeout(100);

  await page.waitForSelector(".repl-history");

  //Search for out of bound/ doesn't exist
  await page.getByLabel("Command input").fill("search nonexistent nonexistent");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("error_bad_request: unrecognized target identifier");

  await page.getByLabel("Command input").fill("search 0 nonexistent");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Result:");

  // Too many arguments
  await page.getByLabel("Command input").fill("search 0 Jack test");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Error - Do Not Enter Args Other Than Column and Value");
});

test("too many view arguments", async ({ page }) => {
  await page.waitForTimeout(5000);
  await page.getByLabel("Command input").fill("load_file census/sample.csv");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);

  //await page.getByPlaceholder('Enter command here!').fill('view a b c');
  await page.getByLabel("Command input").fill("view a b c");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Error - View Should Not Include Other Args");
});

test("test invalid filepath", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file cool.csv");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("error_datasource: filepath not found");
});

test("try loading more than one csv at once", async ({page,}) => {
  // load command
  await page.getByLabel("Command input").fill("load_file normal.csv price.csv");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);

  // Wait for the content to appear in the history
  await page.waitForSelector(".repl-history");

  // Make sure error is thrown
  await expect(page.locator(".repl-history")).toContainText("Extra Args after loadCSV");
});

test("broadband data can be retrieved", async ({page}) => {
  // normal case
  await page.getByLabel("Command input").fill("broadband california orange%20county");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("93.0");
  await expect(page.locator(".repl-history")).toContainText("date & time");
});

test("broadband handles state and county parameter issues", async ({page}) => {
  // state doesn't exist
  await page.getByLabel("Command input").fill("broadband nonexistent orange%20county");
  await page.locator("button").click();

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("error_bad_request: unrecognized state identifier nonexistent");

  // county doesn't exist
  await page.getByLabel("Command input").fill("broadband california nonexistent");
  await page.locator("button").click();

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("error_bad_request: unrecognized county identifier nonexistent");

  // state and county exist but not found in census api data
  await page.getByLabel("Command input").fill("broadband california colusa%20county");
  await page.locator("button").click();

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("error_bad_json: broadband data unavailable for colusa county, california");
});

test("broadband handles too little or too many arguments", async ({page}) => {
  // too many arguments
  await page.getByLabel("Command input").fill("broadband a b c");
  await page.locator("button").click();

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Error - Do Not Enter Args Other Than State and County");

  // not enough arguments
  await page.getByLabel("Command input").fill("broadband");
  await page.locator("button").click();

  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Error - Too Few Arguments, Add a <state> and <county> for broadband retrieval");
})

test("load, broadband, view, and search interactions", async ({page}) => {
  await page.waitForTimeout(6000);
  // load (w/o header)
  await page.getByLabel("Command input").fill("load_file without_header/multiple_line.csv");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("success");
  
  // broadband
  await page.getByLabel("Command input").fill("broadband new%20jersey salem%20county");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole('cell', { name: '87.2' })).toBeVisible();
  
  // view
  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Jack" }).first()).toBeVisible();
  
  // search
  await page.getByLabel("Command input").fill("search 1 20");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "20" }).nth(2)).toBeVisible();
  
  // load (ten star) 
  await page.getByLabel("Command input").fill("load_file stars/ten-star.csv");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("success");
  
  // view
  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "StarID" }).first()).toBeVisible();
  
  // search
  await page.getByLabel("Command input").fill("search 1 Sol");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Sol" }).nth(1)).toBeVisible();

  // load (w header)
  await page.getByLabel("Command input").fill("load_file with_header/header_multiple_line.csv");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("success");
  
  // view
  await page.getByLabel("Command input").fill("view");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "Color" })).toBeVisible();
  
  // search
  await page.getByLabel("Command input").fill("search 1 22");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.getByRole("cell", { name: "22" }).nth(1)).toBeVisible();

  // mode
  await page.getByLabel("Command input").fill("mode");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Output mode switched to verbose");
  
  // broadband
  await page.getByLabel("Command input").fill("broadband texas starr%20county");
  await page.locator("button").click();
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Command: broadband texas starr%20county");
  await expect(page.locator(".repl-history")).toContainText("73.5");
});

test("unrecognized command has proper error message", async ({page}) => {
  await page.getByLabel("Command input").fill("test");
  await page.locator("button").click();
  //await page.waitForTimeout(5000);
  
  await page.waitForSelector(".repl-history");
  await expect(page.locator(".repl-history")).toContainText("Invalid command: test");
});