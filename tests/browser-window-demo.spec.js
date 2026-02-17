const { test, expect } = require('@playwright/test');

/**
 * Enhanced visual demo test showing browser window in action
 * This test performs multiple interactions to demonstrate the visible browser
 */

test.describe('Browser Window Visualization Demo', () => {
  test('should show browser window with multiple visual interactions', async ({ page }) => {
    console.log('\n🎬 === BROWSER WINDOW VISUALIZATION DEMO ===');
    console.log('✅ Browser window is OPEN and VISIBLE');
    console.log('📹 Video recording is ACTIVE');
    console.log('Note: Running on virtual display (Xvfb) in CI\n');

    // Create an interactive HTML page with animations
    const testHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Playwright Browser Window Demo</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .container {
              background: rgba(255, 255, 255, 0.95);
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
              max-width: 800px;
              width: 100%;
              animation: slideIn 0.5s ease-out;
            }
            
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            h1 {
              color: #667eea;
              font-size: 2.5em;
              margin-bottom: 20px;
              text-align: center;
              animation: fadeIn 1s ease-in;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            .status-banner {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: center;
              font-weight: bold;
              font-size: 1.2em;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
              animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            
            .info-box {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              border-left: 5px solid #667eea;
            }
            
            .info-box h3 {
              color: #667eea;
              margin-bottom: 10px;
            }
            
            .info-box ul {
              margin-left: 20px;
              line-height: 1.8;
            }
            
            .button-section {
              margin: 30px 0;
              display: flex;
              gap: 15px;
              flex-wrap: wrap;
              justify-content: center;
            }
            
            button {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 15px 30px;
              font-size: 1.1em;
              border-radius: 50px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              position: relative;
              overflow: hidden;
            }
            
            button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            
            button:active {
              transform: translateY(0);
            }
            
            button::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0;
              height: 0;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.3);
              transform: translate(-50%, -50%);
              transition: width 0.6s, height 0.6s;
            }
            
            button:active::before {
              width: 300px;
              height: 300px;
            }
            
            .result {
              margin-top: 30px;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              font-size: 1.5em;
              font-weight: bold;
              min-height: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            }
            
            .result.success {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              animation: bounceIn 0.5s ease-out;
            }
            
            @keyframes bounceIn {
              0% { transform: scale(0); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            
            .counter {
              background: #667eea;
              color: white;
              padding: 10px 20px;
              border-radius: 50%;
              display: inline-block;
              margin: 0 10px;
              font-size: 1.5em;
              min-width: 60px;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            
            .progress-bar {
              width: 100%;
              height: 10px;
              background: #e0e0e0;
              border-radius: 5px;
              overflow: hidden;
              margin: 20px 0;
            }
            
            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
              width: 0%;
              transition: width 0.5s ease;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎭 Browser Window Open & Visible!</h1>
            
            <div class="status-banner">
              ✅ HEADED MODE ACTIVE - Browser UI Rendered
            </div>
            
            <div class="info-box">
              <h3>🎬 What You're Seeing:</h3>
              <ul>
                <li>Real browser window with full UI rendering</li>
                <li>CSS animations and transitions working</li>
                <li>JavaScript event handlers active</li>
                <li>Video recording capturing all interactions</li>
                <li>Screenshots being taken at key moments</li>
              </ul>
            </div>
            
            <div class="progress-bar">
              <div class="progress-fill" id="progress"></div>
            </div>
            
            <div class="button-section">
              <button id="btn1">🚀 Action 1</button>
              <button id="btn2">⭐ Action 2</button>
              <button id="btn3">🎯 Action 3</button>
              <button id="btn4">💫 Reset</button>
            </div>
            
            <div class="result" id="result">
              Click any button to see interactions!
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <span style="color: #666;">Interaction Count:</span>
              <span class="counter" id="counter">0</span>
            </div>
          </div>
          
          <script>
            let count = 0;
            const counter = document.getElementById('counter');
            const result = document.getElementById('result');
            const progress = document.getElementById('progress');
            
            function updateCounter() {
              count++;
              counter.textContent = count;
              counter.style.animation = 'none';
              setTimeout(() => {
                counter.style.animation = 'pulse 0.5s ease';
              }, 10);
              
              // Update progress bar
              const progressPercent = Math.min(count * 25, 100);
              progress.style.width = progressPercent + '%';
            }
            
            function showResult(message, emoji) {
              result.textContent = emoji + ' ' + message;
              result.className = 'result success';
              updateCounter();
            }
            
            document.getElementById('btn1').onclick = function() {
              showResult('Action 1 Executed!', '🚀');
            };
            
            document.getElementById('btn2').onclick = function() {
              showResult('Action 2 Completed!', '⭐');
            };
            
            document.getElementById('btn3').onclick = function() {
              showResult('Action 3 Successful!', '🎯');
            };
            
            document.getElementById('btn4').onclick = function() {
              count = 0;
              counter.textContent = '0';
              progress.style.width = '0%';
              result.textContent = 'Reset! Click any button to start again.';
              result.className = 'result';
            };
          </script>
        </body>
      </html>
    `;

    // Step 1: Load the page
    await test.step('📄 Load interactive page', async () => {
      console.log('Loading interactive HTML page...');
      await page.goto(`data:text/html,${encodeURIComponent(testHTML)}`);
      console.log('✅ Page loaded with animations and styles');
      
      // Wait for animations to settle
      await page.waitForTimeout(1000);
    });

    // Step 2: Verify page loaded
    await test.step('✅ Verify page rendering', async () => {
      const title = await page.title();
      console.log(`Page title: "${title}"`);
      expect(title).toContain('Browser Window Demo');
      
      // Take initial screenshot
      await page.screenshot({ 
        path: 'test-results/browser-window-initial.png',
        fullPage: true 
      });
      console.log('📸 Initial screenshot captured');
    });

    // Step 3: First interaction
    await test.step('🚀 Click Action 1 button', async () => {
      console.log('Clicking Action 1 button...');
      await page.click('#btn1');
      await page.waitForTimeout(800);
      
      const resultText = await page.locator('#result').textContent();
      console.log(`Result: ${resultText}`);
      expect(resultText).toContain('Action 1 Executed');
      
      const counterText = await page.locator('#counter').textContent();
      console.log(`Counter: ${counterText}`);
      expect(counterText).toBe('1');
      
      await page.screenshot({ 
        path: 'test-results/browser-window-action1.png',
        fullPage: true 
      });
      console.log('📸 Screenshot after Action 1');
    });

    // Step 4: Second interaction
    await test.step('⭐ Click Action 2 button', async () => {
      console.log('Clicking Action 2 button...');
      await page.click('#btn2');
      await page.waitForTimeout(800);
      
      const resultText = await page.locator('#result').textContent();
      console.log(`Result: ${resultText}`);
      expect(resultText).toContain('Action 2 Completed');
      
      const counterText = await page.locator('#counter').textContent();
      console.log(`Counter: ${counterText}`);
      expect(counterText).toBe('2');
      
      await page.screenshot({ 
        path: 'test-results/browser-window-action2.png',
        fullPage: true 
      });
      console.log('📸 Screenshot after Action 2');
    });

    // Step 5: Third interaction
    await test.step('🎯 Click Action 3 button', async () => {
      console.log('Clicking Action 3 button...');
      await page.click('#btn3');
      await page.waitForTimeout(800);
      
      const resultText = await page.locator('#result').textContent();
      console.log(`Result: ${resultText}`);
      expect(resultText).toContain('Action 3 Successful');
      
      const counterText = await page.locator('#counter').textContent();
      console.log(`Counter: ${counterText}`);
      expect(counterText).toBe('3');
      
      await page.screenshot({ 
        path: 'test-results/browser-window-action3.png',
        fullPage: true 
      });
      console.log('📸 Screenshot after Action 3');
    });

    // Step 6: Check progress bar
    await test.step('📊 Verify progress bar', async () => {
      console.log('Checking progress bar...');
      const progressWidth = await page.locator('#progress').evaluate(el => el.style.width);
      console.log(`Progress bar width: ${progressWidth}`);
      expect(progressWidth).toBe('75%');
    });

    // Step 7: Reset action
    await test.step('💫 Click Reset button', async () => {
      console.log('Clicking Reset button...');
      await page.click('#btn4');
      await page.waitForTimeout(800);
      
      const counterText = await page.locator('#counter').textContent();
      console.log(`Counter after reset: ${counterText}`);
      expect(counterText).toBe('0');
      
      const progressWidth = await page.locator('#progress').evaluate(el => el.style.width);
      console.log(`Progress bar after reset: ${progressWidth}`);
      expect(progressWidth).toBe('0%');
      
      await page.screenshot({ 
        path: 'test-results/browser-window-reset.png',
        fullPage: true 
      });
      console.log('📸 Screenshot after Reset');
    });

    // Step 8: Final interaction to show video
    await test.step('🎬 Final interaction for video', async () => {
      console.log('Performing final interactions for video demonstration...');
      
      // Click all buttons in sequence
      await page.click('#btn1');
      await page.waitForTimeout(500);
      
      await page.click('#btn2');
      await page.waitForTimeout(500);
      
      await page.click('#btn3');
      await page.waitForTimeout(500);
      
      const finalCounter = await page.locator('#counter').textContent();
      console.log(`Final counter value: ${finalCounter}`);
      expect(finalCounter).toBe('3');
      
      await page.screenshot({ 
        path: 'test-results/browser-window-final.png',
        fullPage: true 
      });
      console.log('📸 Final screenshot captured');
    });

    console.log('\n✅ BROWSER WINDOW DEMO COMPLETED');
    console.log('📹 Video has been recorded showing all browser interactions');
    console.log('📸 6 screenshots captured at different stages');
    console.log('🎭 Browser window was visible throughout the entire test\n');
  });
});
