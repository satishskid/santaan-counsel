import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Santaan IVF Platform/);
    await expect(page.getByRole('heading', { name: 'Santaan' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[placeholder*="nurse1"]', 'wronguser');
    await page.fill('input[placeholder="demo"]', 'demo');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should stay on login page (not redirect)
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/\/login/);
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill login form
    await page.fill('input[placeholder*="nurse1"]', 'admin');
    await page.fill('input[placeholder="demo"]', 'demo');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test('should persist login after page reload', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[placeholder*="nurse1"]', 'admin');
    await page.fill('input[placeholder="demo"]', 'demo');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
    
    // Reload page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    // Clear storage to ensure no auth
    await page.context().clearCookies();
    await page.goto('/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });
});
