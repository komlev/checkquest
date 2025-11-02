import { test, expect } from "@playwright/test";

test("Create interview", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Templates" }).click();
  await page.getByRole("link", { name: "View Template" }).click();
  await page.getByRole("button", { name: "Copy to My Checklists" }).click();
  await page.getByRole("button", { name: "Start Interview" }).click();
  await page.getByRole("textbox", { name: "-" }).click();
  await page.getByRole("textbox", { name: "-" }).fill("Test interview");
  await page.locator("#submit-new-interview-btn").click();
  await page
    .getByRole("checkbox", { name: "Select full General section" })
    .check();
  await page.getByRole("checkbox", { name: "useState" }).check();
  await page.getByRole("checkbox", { name: "useState" }).press("Tab");
  await page.getByRole("checkbox", { name: "useReducer" }).check();
  await page.getByRole("textbox", { name: "Interview summary" }).click();
  await page
    .getByRole("textbox", { name: "Interview summary" })
    .fill("Test interview");
  await page.getByRole("link", { name: "Complete" }).click();
  await expect(
    page.getByRole("link", { name: "Test interview" }),
  ).toBeVisible();
  await expect(page.getByText("Trainee")).toBeVisible();
  await page.getByRole("button", { name: "Delete Interview" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
