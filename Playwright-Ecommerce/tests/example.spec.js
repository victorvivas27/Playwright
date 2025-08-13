// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Esperar que el título contenga "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Hacer clic en el link "Get started"
  await page.getByRole('link', { name: 'Get started' }).click();

  // Esperar que el encabezado "Installation" esté visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
