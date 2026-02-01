import { test, expect } from '@playwright/test';

test.describe('Protocol System', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@demo.clinic');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('should fetch protocols from API', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/protocols');
    expect(response.ok()).toBeTruthy();
    
    const protocols = await response.json();
    expect(Array.isArray(protocols)).toBeTruthy();
    expect(protocols.length).toBeGreaterThan(0);
  });

  test('should have Antagonist protocol', async ({ page }) => {
    const response = await page.request.get('http://localhost:3000/api/protocols');
    const protocols = await response.json();
    
    const antagonist = protocols.find(p => p.name.includes('Antagonist'));
    expect(antagonist).toBeDefined();
    expect(antagonist.schedule).toBeDefined();
    expect(antagonist.schedule.length).toBeGreaterThan(0);
  });

  test('should generate action series from protocol', async ({ page }) => {
    // Get first protocol
    const protocolsResponse = await page.request.get('http://localhost:3000/api/protocols');
    const protocols = await protocolsResponse.json();
    const firstProtocol = protocols[0];
    
    // Generate action series
    const response = await page.request.post(`http://localhost:3000/api/protocols/${firstProtocol.id}/generate`, {
      data: {
        patientId: '1',
        startDate: new Date().toISOString()
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const series = await response.json();
    expect(series.id).toBeDefined();
    expect(series.actions).toBeDefined();
    expect(Array.isArray(series.actions)).toBeTruthy();
  });
});
