import { test, expect } from "@playwright/test";

test("Create checklist", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Create a Checklist" }).click();
  await page.getByRole("button", { name: "Add Section" }).click();
  await page
    .getByRole("textbox", { name: "Section title" })
    .fill("Test section");
  await page.getByRole("textbox", { name: "Section title" }).press("Enter");
  await page.getByRole("textbox", { name: "Question" }).fill("Test question");
  await page.getByRole("textbox", { name: "Question" }).press("Tab");
  await page.getByPlaceholder("Question score").press("ArrowUp");
  await page.getByPlaceholder("Question score").fill("2");
  await page.getByPlaceholder("Question score").press("Tab");
  await page.getByRole("checkbox", { name: "Extra" }).check();
  await page.getByRole("checkbox", { name: "Extra" }).press("Tab");
  await page.getByRole("button", { name: "Remove Question" }).press("Tab");
  await page.getByRole("button", { name: "Add Question" }).click();
  await page
    .getByRole("group", { name: "Question 1.2" })
    .getByPlaceholder("Question")
    .fill("Test question 2");
  await page.getByRole("button", { name: "Add Question" }).click();
  await page
    .getByRole("group", { name: "Question 1.3" })
    .getByPlaceholder("Question")
    .fill("Test question 3");
  await page.getByRole("button", { name: "Remove Question" }).nth(2).click();
  await page.getByRole("button", { name: "Add Section" }).click();
  await page
    .getByRole("group", { name: "2. Section Name" })
    .getByPlaceholder("Section title")
    .fill("Section 2");
  await page.getByRole("button", { name: "Add First Question" }).click();
  await page
    .getByRole("group", { name: "Question 2.1" })
    .getByPlaceholder("Question")
    .fill("Extra question");
  await page.getByRole("checkbox", { name: "Extra" }).nth(2).check();
  await page.getByPlaceholder("Description").click();
  await page.getByPlaceholder("Description").fill("This is test");
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Test checklist");
  await page.getByRole("button", { name: "Create Checklist" }).click();
  await expect(
    page.getByRole("heading", { name: "Test checklist" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete Checklist" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
