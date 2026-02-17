const { test, expect } = require('@playwright/test');
const { ChatPage } = require('./pages/ChatPage');
const { ManualLoginHelper } = require('./helpers/ManualLoginHelper');

/**
 * Main test suite for chatbot portal
 * Tests the manual login flow and chat page functionality
 */

test.describe('Chatbot Portal - Manual Login Flow', () => {
  const CHAT_URL = 'https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net/portal/chat/conv_66aca917e2a344fb';
  
  test('should allow manual login and verify chat page loads', async ({ page }) => {
    // Initialize helpers
    const loginHelper = new ManualLoginHelper(page);
    const chatPage = new ChatPage(page);

    // Step 1: Navigate and pause for manual login
    await test.step('Navigate to chat URL and pause for manual login', async () => {
      console.log('\n=== STEP 1: Manual Login ===');
      await loginHelper.waitForManualLoginWithValidation(
        CHAT_URL,
        /\/portal\/chat\// // Expected URL pattern after login
      );
    });

    // Step 2: Validate chat page is loaded
    await test.step('Verify chat page is loaded', async () => {
      console.log('\n=== STEP 2: Validate Chat Page ===');
      
      // Check URL contains /portal/chat/
      await chatPage.waitForPageLoad();
      console.log('✓ URL validation passed');
      
      // Check chat input is visible
      await chatPage.assertChatInputVisible();
      console.log('✓ Chat input is visible');
      
      console.log('\n✅ Test passed! Chat page is ready for interaction.');
    });

    // Optional: Take a screenshot of the loaded page
    await test.step('Take screenshot of loaded chat page', async () => {
      await page.screenshot({ 
        path: 'test-results/chat-page-loaded.png',
        fullPage: true 
      });
      console.log('📸 Screenshot saved: test-results/chat-page-loaded.png');
    });
  });
});
