import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("renders Bruno Maps heading", async ({ page }) => {
  const headingElement = await page.waitForSelector("h1.bruno-maps");
  expect(headingElement).toBeTruthy();
});

test("renders Travel Planner subheading", async ({ page }) => {
  const subheadingElement = await page.waitForSelector("h2.plan-trips");
  expect(subheadingElement).toBeTruthy();
});

test("displays Brown University logo", async ({ page }) => {
  const logoElement = await page.waitForSelector('img[alt="Brown Logo"]');
  expect(logoElement).toBeTruthy();
  const src = await logoElement.getAttribute("src");
  expect(src).toBe("Brown-University-Logo.png"); // Replace with the actual logo source
});

