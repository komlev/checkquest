import { test, expect } from "@playwright/test";

test("Copy template", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Copy template" }).click();
  await page.getByRole("link", { name: "View Template" }).click();
  await expect(page.getByText("Hooks")).toBeVisible();
  await page.getByRole("button", { name: "Copy to My Checklists" }).click();
  await expect(
    page.getByRole("button", { name: "Start Interview" }),
  ).toBeVisible();
  await page
    .getByLabel("Main Navigation")
    .getByRole("link", { name: "Checklists" })
    .click();
  await expect(page.getByRole("link", { name: "React" })).toBeVisible();
  await page.getByRole("button", { name: "Delete Checklist" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
