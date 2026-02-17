const { expect } = require('@playwright/test');
const testConfig = require('../../test.config');

/**
 * Helper for manual login flow
 * Provides utilities to pause test execution for manual login
 */
class ManualLoginHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to the target URL and pause for manual login
   * @param {string} targetUrl - The URL to navigate to
   * @param {object} options - Configuration options
   * @param {string} options.loginUrlPattern - Pattern to detect login page (optional)
   * @param {number} options.timeout - Max time to wait for login (from config by default)
   */
  async waitForManualLogin(targetUrl, options = {}) {
    const {
      loginUrlPattern = testConfig.patterns.loginUrl,
      timeout = testConfig.timeouts.login,
    } = options;

    // Navigate to target URL
    console.log(`\n🌐 Navigating to: ${targetUrl}`);
    await this.page.goto(targetUrl);

    const currentUrl = this.page.url();
    
    // Check if we're on a login page
    const isLoginPage = loginUrlPattern.test(currentUrl) || 
                        currentUrl !== targetUrl;

    if (isLoginPage) {
      console.log('🔐 Login page detected.');
    } else {
      console.log('ℹ️  Checking for login requirements...');
    }

    // Pause for manual login
    console.log('\n⏸️  PAUSED for manual login.');
    console.log('📋 Instructions:');
    console.log('   1. Use the Playwright Inspector to fill in login credentials');
    console.log('   2. Complete the login process manually');
    console.log('   3. Click the "Resume" button in the Playwright Inspector');
    console.log('   4. The test will continue automatically\n');

    // Pause execution - user must resume manually
    await this.page.pause();

    console.log('▶️  Resumed! Verifying login success...');
    
    // Wait for network to settle after login
    await this.page.waitForLoadState('networkidle').catch(() => {
      // Fallback if networkidle doesn't work - wait for URL to stabilize
      console.log('Network idle timeout, continuing...');
    });

    const finalUrl = this.page.url();
    console.log(`✓ Current URL after login: ${finalUrl}`);
    
    return finalUrl;
  }

  /**
   * Wait for manual login with validation
   * @param {string} targetUrl - The URL to navigate to  
   * @param {string|RegExp} expectedUrlPattern - Pattern that URL should match after login
   */
  async waitForManualLoginWithValidation(targetUrl, expectedUrlPattern) {
    await this.waitForManualLogin(targetUrl);
    
    // Validate we reached the expected page
    const currentUrl = this.page.url();
    const pattern = typeof expectedUrlPattern === 'string' 
      ? new RegExp(expectedUrlPattern) 
      : expectedUrlPattern;
    
    expect(currentUrl, 'URL after login should match expected pattern').toMatch(pattern);
    
    console.log('✓ Login validation passed!');
  }

  /**
   * Check if currently on a login page
   * @param {string|RegExp} loginUrlPattern - Pattern to match login URLs
   */
  async isOnLoginPage(loginUrlPattern = /login|auth|signin/i) {
    const currentUrl = this.page.url();
    const pattern = typeof loginUrlPattern === 'string' 
      ? new RegExp(loginUrlPattern) 
      : loginUrlPattern;
    
    return pattern.test(currentUrl);
  }

  /**
   * Take a screenshot for debugging
   * @param {string} name - Name for the screenshot
   */
  async takeDebugScreenshot(name = 'debug') {
    const timestamp = new Date().toISOString().replace(/\D/g, '');
    const filename = `screenshot-${name}-${timestamp}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    console.log(`📸 Screenshot saved: ${filename}`);
    return filename;
  }
}

module.exports = { ManualLoginHelper };
