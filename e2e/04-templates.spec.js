import { test, expect } from '@playwright/test';

test.describe('Template System', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[placeholder*="nurse1"]', 'admin');
    await page.fill('input[placeholder="demo"]', 'demo');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('should fetch templates from API', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/templates/all');
    expect(response.ok()).toBeTruthy();
    
    const templates = await response.json();
    expect(Array.isArray(templates)).toBeTruthy();
    expect(templates.length).toBeGreaterThan(0);
  });

  test('should have English templates', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/templates/all');
    const templates = await response.json();
    
    const englishTemplates = templates.filter(t => t.language === 'English');
    expect(englishTemplates.length).toBeGreaterThan(700);
  });

  test('should have Odia templates', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/templates/all');
    const templates = await response.json();
    
    const odiaTemplates = templates.filter(t => t.language === 'Odia');
    expect(odiaTemplates.length).toBeGreaterThan(60);
  });

  test('should render template with variables', async ({ page }) => {
    const response = await page.request.post('http://localhost:3000/api/templates/render', {
      data: {
        content: 'Hello {{patient_name}}, your appointment is at {{time}}',
        variables: {
          patient_name: 'Priya',
          time: '10:00 AM'
        }
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.rendered).toContain('Priya');
    expect(result.rendered).toContain('10:00 AM');
  });
});
