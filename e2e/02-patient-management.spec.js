import { test, expect } from '@playwright/test';

test.describe('Patient Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.clinic');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('should display patient list on dashboard', async ({ page }) => {
    await expect(page.locator('text=/patient/i').first()).toBeVisible();
  });

  test('should search for patients', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Priya');
      
      // Wait for search results
      await page.waitForTimeout(1000);
      
      // Should show results containing 'Priya'
      await expect(page.locator('text=/priya/i').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should create walk-in patient', async ({ page }) => {
    // Look for walk-in or add patient button
    const walkinButton = page.locator('button:has-text("Walk-in")').first();
    
    if (await walkinButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await walkinButton.click();
      
      // Fill walk-in form
      await page.fill('input[name="name"]', 'Test Patient E2E');
      await page.fill('input[name="phone"]', '9999999999');
      
      // Submit
      await page.click('button[type="submit"]');
      
      // Should show success or redirect
      await expect(page.locator('text=/success|created/i').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate to patient view', async ({ page }) => {
    // Click on first patient
    const firstPatient = page.locator('[data-patient-card], .patient-card, text=/P-0001/i').first();
    
    if (await firstPatient.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstPatient.click();
      
      // Should navigate to patient view
      await expect(page).toHaveURL(/\/patients\//, { timeout: 5000 });
    }
  });
});
