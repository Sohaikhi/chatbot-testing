const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for chatbot testing
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // Maximum time one test can run for
  timeout: 120 * 1000,
  
  // Test execution configuration
  fullyParallel: false, // Run tests sequentially for manual login
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1, // Single worker for manual login flow
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Default timeout for actions
    actionTimeout: 30 * 1000,
    
    // Default timeout for navigation
    navigationTimeout: 60 * 1000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Slow down by 100ms for better visibility in headed mode
        launchOptions: {
          slowMo: process.env.CI ? 0 : 100,
        }
      },
    },
  ],

  // Output folder for test artifacts
  outputDir: 'test-results/',
});
