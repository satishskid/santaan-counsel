import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: 'cd backend && npm start',
      url: 'http://localhost:3000/health',
      timeout: 30 * 1000,
      reuseExistingServer: true,
    },
    {
      command: 'cd frontend && npm run dev',
      url: 'http://localhost:5173',
      timeout: 30 * 1000,
      reuseExistingServer: true,
    },
  ],
});
