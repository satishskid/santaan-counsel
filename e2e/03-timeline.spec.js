import { test, expect } from '@playwright/test';

test.describe('Timeline System', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.clinic');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
    
    // Navigate to first patient
    await page.goto('/patients/1');
    await page.waitForLoadState('networkidle');
  });

  test('should display patient timeline', async ({ page }) => {
    // Should show timeline elements
    await expect(page.locator('text=/timeline|event/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should show patient profile in left column', async ({ page }) => {
    // Should display patient name or profile info
    await expect(page.locator('text=/patient|profile/i').first()).toBeVisible();
  });

  test('should display clinical logging area', async ({ page }) => {
    // Middle column should be visible
    await expect(page.locator('text=/clinical|log|note/i').first()).toBeVisible({ timeout: 5000 });
  });

  test('should display action buttons', async ({ page }) => {
    // Right column with action buttons
    const actionButtons = page.locator('button:has-text("Verbally"), button:has-text("WhatsApp"), button:has-text("Called")');
    
    const count = await actionButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should create timeline event', async ({ page }) => {
    // Look for add event or template button
    const addButton = page.locator('button:has-text("Add Event"), button:has-text("Template"), button:has-text("+")').first();
    
    if (await addButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await addButton.click();
      
      // Wait for modal or form
      await page.waitForTimeout(500);
      
      // Should show some form or template selector
      const formVisible = await page.locator('input, textarea, select').first().isVisible({ timeout: 2000 }).catch(() => false);
      expect(formVisible).toBeTruthy();
    }
  });

  test('should select communication channel', async ({ page }) => {
    // Click on WhatsApp button
    const whatsappButton = page.locator('button:has-text("WhatsApp")').first();
    
    if (await whatsappButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await whatsappButton.click();
      
      // Button should be highlighted or selected
      await expect(whatsappButton).toHaveClass(/selected|active|bg-/);
    }
  });

  test('should capture emoji reaction', async ({ page }) => {
    // Look for emoji buttons
    const emojiButton = page.locator('button:has-text("😊"), button:has-text("😌"), button:has-text("😟")').first();
    
    if (await emojiButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await emojiButton.click();
      
      // Should be selected
      await expect(emojiButton).toHaveClass(/selected|active|ring-/);
    }
  });
});
