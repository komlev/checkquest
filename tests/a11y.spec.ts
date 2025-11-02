import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a11y", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Templates" }).click();

  const teamplatesPage = await new AxeBuilder({ page }).analyze();
  expect(teamplatesPage.violations).toEqual([]);

  await page.getByRole("link", { name: "View Template" }).click();

  const teamplatePage = await new AxeBuilder({ page }).analyze();
  expect(teamplatePage.violations).toEqual([]);

  await page.getByRole("button", { name: "Copy to My Checklists" }).click();

  const teamplatePage2 = await new AxeBuilder({ page }).analyze();
  expect(teamplatePage2.violations).toEqual([]);

  await page.getByRole("button", { name: "Start Interview" }).click();

  await page.getByRole("textbox", { name: "-" }).click();
  await page.getByRole("textbox", { name: "-" }).fill("Test");

  const modalPage = await new AxeBuilder({ page }).analyze();
  expect(modalPage.violations).toEqual([]);

  await page.getByRole("dialog", { name: "Start Interview" }).click();

  const interviewPage = await new AxeBuilder({ page }).analyze();
  expect(interviewPage.violations).toEqual([]);

  await expect(
    page.getByRole("heading", { name: "Start Interview" }),
  ).toBeVisible();
  await page.locator("#submit-new-interview-btn").click();

  await page.getByText("useEffect").click();
  await page.getByText("useReducer").click();
  await page.getByText("useState").click();
  await page.getByRole("textbox", { name: "Interview summary" }).fill("Test");

  await page.getByRole("link", { name: "Complete" }).click();

  const interviewsPage = await new AxeBuilder({ page }).analyze();
  expect(
    interviewsPage.violations.filter((i) => i.id !== "color-contrast"),
  ).toEqual([]);

  await page.getByRole("button", { name: "New Interview" }).click();
  await page.getByRole("textbox", { name: "-" }).click();
  await page.getByRole("textbox", { name: "-" }).fill("Test");
  await page
    .getByRole("group", { name: "Checklist" })
    .getByLabel("-")
    .selectOption({ index: 1 });
  await page.getByRole("button", { name: "Start Interview" }).click();
  await page.getByRole("link", { name: "Complete" }).click();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Test|React|None" })
    .getByLabel("Delete Interview")
    .click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.getByRole("link", { name: "Checklists" }).click();
  await page.getByRole("link", { name: "New Checklist" }).click();
  await page.getByRole("button", { name: "Create Checklist" }).click();

  const newChecklistPage = await new AxeBuilder({ page }).analyze();
  expect(newChecklistPage.violations).toEqual([]);

  await page.getByPlaceholder("Name").fill("Hello");
  await page.getByPlaceholder("Description").fill("Hello");
  await page.getByRole("button", { name: "Create Checklist" }).click();

  const resultChecklistPage = await new AxeBuilder({ page }).analyze();
  expect(resultChecklistPage.violations).toEqual([]);

  await page.getByRole("button", { name: "Delete Checklist" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();

  await page.getByRole("button", { name: "Delete Checklist" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
