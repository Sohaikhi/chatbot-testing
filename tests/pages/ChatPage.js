const { expect } = require('@playwright/test');
const testConfig = require('../../test.config');

/**
 * Page Object for the Chat page
 * Encapsulates selectors and interactions for the chatbot portal
 */
class ChatPage {
  constructor(page) {
    this.page = page;
    
    // URL pattern
    this.chatUrlPattern = testConfig.patterns.chatUrl;
    
    // TODO: Update these selectors based on actual page structure
    // Use Playwright Inspector (npx playwright codegen) to discover stable selectors
    
    // Chat input selectors - try multiple strategies
    this.chatInputSelectors = [
      '[data-testid="chat-input"]',           // Preferred: data-testid
      'textarea[placeholder*="message"]',      // Fallback: textarea with message placeholder
      'input[type="text"][placeholder*="message"]', // Fallback: text input
      'textarea',                              // Last resort: any textarea
      'input[type="text"]',                    // Last resort: any text input
    ];
    
    // Chat container/wrapper selectors
    this.chatContainerSelectors = [
      '[data-testid="chat-container"]',
      '.chat-container',
      '#chat-container',
      '[class*="chat"]',
    ];
    
    // Send button selectors
    this.sendButtonSelectors = [
      '[data-testid="send-button"]',
      'button[type="submit"]',
      'button[aria-label*="send" i]',
      'button:has-text("Send")',
    ];
  }

  /**
   * Navigate to the chat page
   * @param {string} conversationId - Optional conversation ID (defaults to value from config)
   */
  async goto(conversationId = testConfig.conversationId) {
    const url = `/portal/chat/${conversationId}`;
    await this.page.goto(url);
  }

  /**
   * Wait for the chat page to be fully loaded
   * Validates URL and checks for key elements
   */
  async waitForPageLoad() {
    // Wait for URL to contain /portal/chat/
    await this.page.waitForURL(this.chatUrlPattern, { timeout: 30000 });
    
    // Verify URL matches expected pattern
    const currentUrl = this.page.url();
    expect(currentUrl).toMatch(this.chatUrlPattern);
  }

  /**
   * Find and return the chat input element
   * Tries multiple selector strategies
   */
  async getChatInput() {
    for (const selector of this.chatInputSelectors) {
      try {
        const element = this.page.locator(selector).first();
        if (await element.isVisible({ timeout: testConfig.timeouts.elementVisibility })) {
          return element;
        }
      } catch (e) {
        // Try next selector
        continue;
      }
    }
    throw new Error('Could not find chat input element. Please update selectors in ChatPage.');
  }

  /**
   * Validate that the chat input is visible
   */
  async assertChatInputVisible() {
    const chatInput = await this.getChatInput();
    await expect(chatInput).toBeVisible();
  }

  /**
   * Type a message in the chat input
   * @param {string} message - The message to type
   */
  async typeMessage(message) {
    const chatInput = await this.getChatInput();
    await chatInput.fill(message);
  }

  /**
   * Send a message (type and submit)
   * @param {string} message - The message to send
   */
  async sendMessage(message) {
    await this.typeMessage(message);
    
    // Try to find and click send button
    for (const selector of this.sendButtonSelectors) {
      try {
        const button = this.page.locator(selector).first();
        if (await button.isVisible({ timeout: testConfig.timeouts.quickCheck })) {
          await button.click();
          return;
        }
      } catch (e) {
        continue;
      }
    }
    
    // Fallback: press Enter
    const chatInput = await this.getChatInput();
    await chatInput.press('Enter');
  }

  /**
   * Get all selectors for inspection
   * Useful for debugging and selector discovery
   */
  getAllSelectors() {
    return {
      chatInput: this.chatInputSelectors,
      chatContainer: this.chatContainerSelectors,
      sendButton: this.sendButtonSelectors,
    };
  }
}

module.exports = { ChatPage };
