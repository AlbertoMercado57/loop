import { test, expect } from '@playwright/test';

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];



// Login credentials
const email = 'ben+pose@workwithloop.com';
const password = 'Password123';

// Describe the test suite
test.describe('Asana Data-Driven Tests', () => {
  // Loop through each test case in the JSON object
  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      // Step 1: Login to Asana
      await test.step('Login to Asana', async () => {
        await page.goto('https://app.asana.com/-/login');
        await page.getByLabel('Email address').fill(email)
        await page.locator('.LoginEmailForm-continueButton').filter({hasText:'Continue'}).click()
        await page.locator('.LoginPasswordForm-passwordInput').fill(password);
        await page.getByRole('button').filter({hasText:'Log in'}).click()
        await page.waitForNavigation();
      });

      //Step 2: Navigate to the project page
      await test.step('Navigate to the project page', async () => {
        // Navigate to the left navigation item specified in the test case
        const leftNavItems = data.leftNav.split(', ');
        for (const item of leftNavItems) {
          await page.click(`text=${item}`);
        }
        await page.waitForLoadState('domcontentloaded');
      });

      // Step 3: Verify the card is within the right column
      await test.step('Verify the card is within the right column', async () => {
        const column = await page.locator(`text=${data.column}`).first();
        await expect(column).toBeVisible();
        const card = await column.locator(`text=${data.card_title}`)
        await expect(card).toBeVisible();
      });
    });
  });
});