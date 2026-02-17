/**
 * Test configuration
 * Centralized configuration for test URLs and settings
 */

module.exports = {
  // Base URL for the chatbot portal
  baseURL: 'https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net',
  
  // Default conversation ID for testing
  conversationId: 'conv_66aca917e2a344fb',
  
  // Full chat URL (constructed from above)
  get chatURL() {
    return `${this.baseURL}/portal/chat/${this.conversationId}`;
  },
  
  // Timeout values (in milliseconds)
  timeouts: {
    test: 120 * 1000,        // 2 minutes per test
    action: 30 * 1000,       // 30 seconds per action
    navigation: 60 * 1000,   // 60 seconds for page navigation
    login: 5 * 60 * 1000,    // 5 minutes for manual login
  },
  
  // URL patterns for validation
  patterns: {
    chatUrl: /\/portal\/chat\//,
    loginUrl: /login|auth|signin/i,
  },
};
