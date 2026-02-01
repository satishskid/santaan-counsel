import { test, expect } from '@playwright/test';

test.describe('Acronym Expansion', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.clinic');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('should fetch acronyms from API', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/acronyms');
    expect(response.ok()).toBeTruthy();
    
    const acronyms = await response.json();
    expect(Array.isArray(acronyms)).toBeTruthy();
    expect(acronyms.length).toBeGreaterThan(0);
  });

  test('should expand IVF acronym', async ({ page }) => {
    const response = await page.request.post('http://localhost:3000/api/acronyms/expand', {
      data: {
        text: 'Patient needs IVF treatment'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.expanded).toContain('In Vitro Fertilization');
  });

  test('should expand FSH acronym', async ({ page }) => {
    const response = await page.request.post('http://localhost:3000/api/acronyms/expand', {
      data: {
        text: 'FSH levels are elevated'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.expanded).toContain('Follicle Stimulating Hormone');
  });

  test('should expand multiple acronyms', async ({ page }) => {
    const response = await page.request.post('http://localhost:3000/api/acronyms/expand', {
      data: {
        text: 'IVF with ICSI and PGT-A testing'
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.expanded).toContain('In Vitro Fertilization');
    expect(result.expanded).toMatch(/ICSI|Intracytoplasmic/i);
    expect(result.expanded).toMatch(/PGT-A|Genetic Testing/i);
  });
});
