const { test, expect } = require('@playwright/test');
const { ChatPage } = require('./pages/ChatPage');
const { ManualLoginHelper } = require('./helpers/ManualLoginHelper');
const testConfig = require('../test.config');

/**
 * Selector discovery test
 * Helps identify and verify stable selectors for chat page elements
 * Run this test to discover what selectors are available on the page
 */

test.describe('Selector Discovery', () => {
  const CHAT_URL = testConfig.chatURL;

  test('discover and validate selectors on chat page', async ({ page }) => {
    const loginHelper = new ManualLoginHelper(page);
    const chatPage = new ChatPage(page);

    // Step 1: Manual login
    await test.step('Login to access chat page', async () => {
      console.log('\n=== Selector Discovery Test ===');
      console.log('This test will help you identify stable selectors for page elements.\n');
      
      await loginHelper.waitForManualLogin(CHAT_URL);
    });

    // Step 2: Discover page structure
    await test.step('Discover page structure', async () => {
      console.log('\n--- Page Information ---');
      console.log('URL:', page.url());
      console.log('Title:', await page.title());
    });

    // Step 3: Test chat input selectors
    await test.step('Test chat input selectors', async () => {
      console.log('\n--- Testing Chat Input Selectors ---');
      const selectors = chatPage.getAllSelectors();
      
      console.log('\nTrying chat input selectors:');
      for (const selector of selectors.chatInput) {
        try {
          const element = page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 2000 });
          const count = await page.locator(selector).count();
          
          if (isVisible) {
            console.log(`  ✓ FOUND: ${selector} (count: ${count})`);
            
            // Get more details about the element
            const tagName = await element.evaluate(el => el.tagName);
            const id = await element.getAttribute('id');
            const className = await element.getAttribute('class');
            const placeholder = await element.getAttribute('placeholder');
            
            console.log(`    Tag: ${tagName}`);
            if (id) console.log(`    ID: ${id}`);
            if (className) console.log(`    Class: ${className}`);
            if (placeholder) console.log(`    Placeholder: ${placeholder}`);
          } else {
            console.log(`  ✗ Not visible: ${selector}`);
          }
        } catch (e) {
          console.log(`  ✗ Not found: ${selector}`);
        }
      }
    });

    // Step 4: Discover all input elements
    await test.step('Discover all input elements', async () => {
      console.log('\n--- All Input Elements on Page ---');
      
      // Find all inputs
      const inputs = await page.locator('input').all();
      console.log(`Found ${inputs.length} input elements:`);
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const type = await input.getAttribute('type');
        const id = await input.getAttribute('id');
        const className = await input.getAttribute('class');
        const placeholder = await input.getAttribute('placeholder');
        const name = await input.getAttribute('name');
        
        console.log(`\n  Input ${i + 1}:`);
        if (type) console.log(`    Type: ${type}`);
        if (id) console.log(`    ID: ${id}`);
        if (name) console.log(`    Name: ${name}`);
        if (className) console.log(`    Class: ${className}`);
        if (placeholder) console.log(`    Placeholder: ${placeholder}`);
      }
      
      // Find all textareas
      const textareas = await page.locator('textarea').all();
      console.log(`\nFound ${textareas.length} textarea elements:`);
      for (let i = 0; i < textareas.length; i++) {
        const textarea = textareas[i];
        const id = await textarea.getAttribute('id');
        const className = await textarea.getAttribute('class');
        const placeholder = await textarea.getAttribute('placeholder');
        const name = await textarea.getAttribute('name');
        
        console.log(`\n  Textarea ${i + 1}:`);
        if (id) console.log(`    ID: ${id}`);
        if (name) console.log(`    Name: ${name}`);
        if (className) console.log(`    Class: ${className}`);
        if (placeholder) console.log(`    Placeholder: ${placeholder}`);
      }
    });

    // Step 5: Discover all buttons
    await test.step('Discover button elements', async () => {
      console.log('\n--- Button Elements on Page ---');
      
      const buttons = await page.locator('button').all();
      console.log(`Found ${buttons.length} button elements:`);
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const type = await button.getAttribute('type');
        const id = await button.getAttribute('id');
        const className = await button.getAttribute('class');
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        
        console.log(`\n  Button ${i + 1}:`);
        if (text && text.trim()) console.log(`    Text: ${text.trim()}`);
        if (type) console.log(`    Type: ${type}`);
        if (id) console.log(`    ID: ${id}`);
        if (className) console.log(`    Class: ${className}`);
        if (ariaLabel) console.log(`    Aria-label: ${ariaLabel}`);
      }
    });

    // Step 6: Check for data-testid attributes
    await test.step('Search for data-testid attributes', async () => {
      console.log('\n--- Elements with data-testid ---');
      
      const elementsWithTestId = await page.locator('[data-testid]').all();
      console.log(`Found ${elementsWithTestId.length} elements with data-testid:`);
      for (let i = 0; i < elementsWithTestId.length; i++) {
        const element = elementsWithTestId[i];
        const testId = await element.getAttribute('data-testid');
        const tagName = await element.evaluate(el => el.tagName);
        
        console.log(`  ${i + 1}. <${tagName}> data-testid="${testId}"`);
      }
      
      if (elementsWithTestId.length === 0) {
        console.log('  ℹ️  No elements with data-testid found.');
        console.log('  💡 Consider adding data-testid attributes for more stable selectors.');
      }
    });

    // Step 7: Pause for manual inspection
    await test.step('Pause for manual inspection', async () => {
      console.log('\n--- Manual Inspection ---');
      console.log('The test will now pause.');
      console.log('Use the Playwright Inspector to:');
      console.log('  - Explore the page DOM');
      console.log('  - Test selectors interactively');
      console.log('  - Identify stable selectors for your tests');
      console.log('\nClick Resume when done.\n');
      
      await page.pause();
    });

    console.log('\n✅ Selector discovery complete!');
    console.log('Update tests/pages/ChatPage.js with the selectors you discovered.');
  });
});
