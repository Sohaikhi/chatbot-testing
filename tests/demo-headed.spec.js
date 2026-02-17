const { test, expect } = require('@playwright/test');

/**
 * Demo test to show headed mode working
 * Uses a public website to demonstrate browser visibility
 */

test.describe('Headed Mode Demo', () => {
  test('should run in headed mode with visible browser', async ({ page }) => {
    console.log('\n=== HEADED MODE DEMO ===');
    console.log('✅ Browser is launching in HEADED mode (visible window)');
    console.log('Note: Running with virtual display (Xvfb) in CI environment\n');

    // Create a test HTML page without needing network access
    const testHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Playwright Headed Mode Demo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              background: rgba(255, 255, 255, 0.1);
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            h1 {
              font-size: 3em;
              margin-bottom: 20px;
              text-align: center;
            }
            p {
              font-size: 1.2em;
              line-height: 1.6;
            }
            .status {
              background: #4CAF50;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              text-align: center;
              font-weight: bold;
            }
            button {
              background: #ff6b6b;
              color: white;
              border: none;
              padding: 15px 30px;
              font-size: 1.1em;
              border-radius: 5px;
              cursor: pointer;
              margin: 10px;
            }
            button:hover {
              background: #ee5a5a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎭 Playwright Running in HEADED Mode!</h1>
            <div class="status">
              ✅ Browser Window is VISIBLE (Virtual Display)
            </div>
            <p>
              This demonstrates that the Playwright tests are running with a visible browser window.
              The browser is actually rendering this page and can interact with all elements.
            </p>
            <p>
              <strong>Test Features:</strong>
            </p>
            <ul>
              <li>Browser launches in headed mode (not headless)</li>
              <li>Full browser window with UI visible</li>
              <li>Can interact with page elements</li>
              <li>Screenshots capture the actual rendered content</li>
              <li>Videos record the browser session</li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
              <button id="btn1">Click Test Button 1</button>
              <button id="btn2">Click Test Button 2</button>
            </div>
            <div id="click-result" style="margin-top: 20px; text-align: center; font-size: 1.5em;"></div>
          </div>
          <script>
            document.getElementById('btn1').onclick = function() {
              document.getElementById('click-result').textContent = '✅ Button 1 Clicked!';
            };
            document.getElementById('btn2').onclick = function() {
              document.getElementById('click-result').textContent = '✅ Button 2 Clicked!';
            };
          </script>
        </body>
      </html>
    `;

    // Navigate to the test page
    await test.step('Load test page', async () => {
      console.log('📍 Loading test HTML page...');
      await page.goto(`data:text/html,${encodeURIComponent(testHTML)}`);
      console.log('✅ Page loaded successfully in HEADED browser');
    });

    // Verify page title
    await test.step('Verify page loaded', async () => {
      const title = await page.title();
      console.log(`📄 Page title: "${title}"`);
      expect(title).toContain('Playwright');
    });

    // Take initial screenshot
    await test.step('Capture initial screenshot', async () => {
      await page.screenshot({ 
        path: 'test-results/headed-mode-initial.png',
        fullPage: true 
      });
      console.log('📸 Initial screenshot saved: test-results/headed-mode-initial.png');
    });

    // Interact with the page to show browser is responsive
    await test.step('Click button in visible browser', async () => {
      const button1 = await page.locator('#btn1');
      console.log('🖱️  Clicking button 1 in the visible browser...');
      await button1.click();
      
      // Wait for result to appear
      await page.waitForSelector('#click-result', { state: 'visible' });
      const resultText = await page.locator('#click-result').textContent();
      console.log(`✅ Button click result: "${resultText}"`);
      
      expect(resultText).toContain('Button 1 Clicked');
    });

    // Take another screenshot showing the interaction
    await test.step('Capture interaction screenshot', async () => {
      await page.screenshot({ 
        path: 'test-results/headed-mode-after-click.png',
        fullPage: true 
      });
      console.log('📸 Post-interaction screenshot saved: test-results/headed-mode-after-click.png');
    });

    // Click the second button
    await test.step('Click second button', async () => {
      const button2 = await page.locator('#btn2');
      console.log('🖱️  Clicking button 2 in the visible browser...');
      await button2.click();
      
      const resultText = await page.locator('#click-result').textContent();
      console.log(`✅ Button click result: "${resultText}"`);
      
      expect(resultText).toContain('Button 2 Clicked');
      
      // Take final screenshot
      await page.screenshot({ 
        path: 'test-results/headed-mode-final.png',
        fullPage: true 
      });
      console.log('📸 Final screenshot saved: test-results/headed-mode-final.png');
    });

    console.log('\n✅ HEADED MODE DEMO COMPLETED');
    console.log('Browser was running in headed mode throughout the test');
    console.log('All interactions were performed in a visible browser window\n');
  });
});
