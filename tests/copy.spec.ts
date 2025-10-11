import { test, expect } from "@playwright/test";

const importString =
  "eyJpZCI6Ik5WMlBxIiwibmFtZSI6IlRFU1QgQ0hFQ0tMSVNUIiwiZGVzY3JpcHRpb24iOiJUaGlzIGlzIGEgdGVzdCIsInNlY3Rpb25zIjpbeyJpZCI6IkZITF84IiwidGl0bGUiOiJTRUNUSU9OIDEiLCJxdWVzdGlvbnMiOlt7ImlkIjoiUVp2cnYiLCJ0ZXh0IjoiUVVFU1RJT04gMSIsInNjb3JlIjo1LCJleHRyYSI6ZmFsc2V9LHsiaWQiOiJ1LXdnMyIsInRleHQiOiJRVUVTVElPTiAyIiwic2NvcmUiOjIsImV4dHJhIjp0cnVlfV19LHsiaWQiOiI1S1pXSSIsInRpdGxlIjoiU0VDVElPTiAyIiwicXVlc3Rpb25zIjpbeyJpZCI6InBSX0tiIiwidGV4dCI6IlEgMyIsInNjb3JlIjoxMCwiZXh0cmEiOmZhbHNlfV19XSwiY3JlYXRlZEF0IjoiMjAyNS0xMC0xMVQxNjoxMjozNy4wNzhaIiwidXBkYXRlZEF0IjoiMjAyNS0xMC0xMVQxNjoxMjozNy4wNzhaIn0=";

test("Copy checklist", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Checklists" }).click();
  await page.getByRole("button", { name: "Import Checklist" }).click();
  await page.getByRole("textbox", { name: "Checklist" }).click();
  await page.getByRole("textbox", { name: "Checklist" }).fill(importString);
  await page.getByRole("button", { name: "Import", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "TEST CHECKLIST" })
  ).toBeVisible();
  await expect(page.getByText("SECTION 2")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Start Interview" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete Checklist" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
});
