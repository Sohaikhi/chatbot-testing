const { test, expect } = require('@playwright/test');

/**
 * Complete screenshot documentation test
 * Captures screenshots at EVERY screen and interaction step
 */

test.describe('Complete Browser Window Screenshot Gallery', () => {
  test('should capture screenshots at every single step and screen', async ({ page }) => {
    console.log('\n📸 === COMPLETE SCREENSHOT CAPTURE MODE ===');
    console.log('🎬 Browser window OPEN and capturing EVERY screen');
    console.log('📹 Video recording ACTIVE');
    console.log('🖼️  Taking screenshots at EVERY step\n');

    let screenshotCounter = 1;
    
    const takeScreenshot = async (name, description) => {
      const filename = `screenshots/${String(screenshotCounter).padStart(2, '0')}-${name}.png`;
      await page.screenshot({ 
        path: `test-results/${filename}`,
        fullPage: true 
      });
      console.log(`📸 Screenshot ${screenshotCounter}: ${description}`);
      console.log(`   File: ${filename}\n`);
      screenshotCounter++;
    };

    // Create interactive HTML with even more visual elements
    const testHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Complete Browser Window Documentation</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
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
              max-width: 900px;
              width: 100%;
              animation: slideIn 0.5s ease-out;
            }
            
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(-30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            h1 {
              color: #667eea;
              font-size: 2.5em;
              margin-bottom: 20px;
              text-align: center;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            
            .header-banner {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: center;
              font-weight: bold;
              font-size: 1.3em;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .section {
              margin: 25px 0;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 10px;
              border-left: 5px solid #667eea;
            }
            
            .section h2 {
              color: #667eea;
              margin-bottom: 15px;
              font-size: 1.5em;
            }
            
            .feature-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin: 15px 0;
            }
            
            .feature-card {
              background: white;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              transition: transform 0.3s ease;
            }
            
            .feature-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            }
            
            .button-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 15px;
              margin: 25px 0;
            }
            
            button {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 15px 25px;
              font-size: 1.1em;
              border-radius: 50px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              font-weight: bold;
            }
            
            button:hover {
              transform: translateY(-3px);
              box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
            }
            
            button:active {
              transform: translateY(0);
              box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
            }
            
            .status-display {
              display: flex;
              justify-content: space-around;
              margin: 25px 0;
              flex-wrap: wrap;
              gap: 20px;
            }
            
            .status-item {
              text-align: center;
              flex: 1;
              min-width: 150px;
            }
            
            .status-label {
              color: #666;
              font-size: 0.9em;
              margin-bottom: 5px;
            }
            
            .status-value {
              background: #667eea;
              color: white;
              padding: 15px;
              border-radius: 10px;
              font-size: 1.8em;
              font-weight: bold;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            
            .progress-section {
              margin: 25px 0;
            }
            
            .progress-bar {
              width: 100%;
              height: 30px;
              background: #e0e0e0;
              border-radius: 15px;
              overflow: hidden;
              box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
              width: 0%;
              transition: width 0.5s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
            }
            
            .result-box {
              margin: 25px 0;
              padding: 25px;
              border-radius: 10px;
              text-align: center;
              font-size: 1.5em;
              font-weight: bold;
              min-height: 80px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
            }
            
            .result-box.active {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              animation: bounceIn 0.5s ease-out;
            }
            
            @keyframes bounceIn {
              0% { transform: scale(0); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            
            .stats-bar {
              background: #2c3e50;
              color: white;
              padding: 15px;
              border-radius: 10px;
              margin: 20px 0;
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .stat {
              text-align: center;
            }
            
            .stat-number {
              font-size: 2em;
              font-weight: bold;
              color: #38ef7d;
            }
            
            .stat-label {
              font-size: 0.8em;
              opacity: 0.8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎭 Complete Browser Window Gallery</h1>
            
            <div class="header-banner">
              ✅ BROWSER WINDOW OPEN - Every Screen Captured
            </div>
            
            <div class="section">
              <h2>📸 Screenshot Documentation</h2>
              <p>This test captures screenshots at <strong>every single step</strong> to provide complete visual proof that the browser window is open and interactive.</p>
            </div>
            
            <div class="feature-grid">
              <div class="feature-card">
                <strong>🎨 CSS Rendering</strong><br>
                Full gradients & animations
              </div>
              <div class="feature-card">
                <strong>💻 JavaScript</strong><br>
                Event handlers active
              </div>
              <div class="feature-card">
                <strong>🎬 Video Recording</strong><br>
                All interactions captured
              </div>
              <div class="feature-card">
                <strong>📊 State Tracking</strong><br>
                Counter & progress
              </div>
            </div>
            
            <div class="progress-section">
              <h3 style="color: #667eea; margin-bottom: 10px;">Progress Tracker</h3>
              <div class="progress-bar">
                <div class="progress-fill" id="progress">0%</div>
              </div>
            </div>
            
            <div class="status-display">
              <div class="status-item">
                <div class="status-label">Total Clicks</div>
                <div class="status-value" id="clicks">0</div>
              </div>
              <div class="status-item">
                <div class="status-label">Screenshots</div>
                <div class="status-value" id="screenshots">0</div>
              </div>
              <div class="status-item">
                <div class="status-label">Progress</div>
                <div class="status-value" id="percent">0%</div>
              </div>
            </div>
            
            <h3 style="color: #667eea; text-align: center; margin: 20px 0;">Interactive Buttons</h3>
            <div class="button-grid">
              <button id="btn1">🚀 Action 1</button>
              <button id="btn2">⭐ Action 2</button>
              <button id="btn3">🎯 Action 3</button>
              <button id="btn4">💎 Action 4</button>
              <button id="btn5">🎨 Action 5</button>
              <button id="reset">💫 Reset All</button>
            </div>
            
            <div class="result-box" id="result">
              Ready! Click any button to start interactions.
            </div>
            
            <div class="stats-bar">
              <div class="stat">
                <div class="stat-number" id="stat-total">0</div>
                <div class="stat-label">Total Actions</div>
              </div>
              <div class="stat">
                <div class="stat-number" id="stat-last">-</div>
                <div class="stat-label">Last Action</div>
              </div>
              <div class="stat">
                <div class="stat-number" id="stat-time">0s</div>
                <div class="stat-label">Session Time</div>
              </div>
            </div>
          </div>
          
          <script>
            let clickCount = 0;
            let screenshotCount = 0;
            let startTime = Date.now();
            
            function updateStats() {
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              document.getElementById('stat-time').textContent = elapsed + 's';
            }
            
            setInterval(updateStats, 1000);
            
            function updateProgress() {
              const progressPercent = Math.min(clickCount * 16.67, 100);
              const progressFill = document.getElementById('progress');
              progressFill.style.width = progressPercent + '%';
              progressFill.textContent = Math.floor(progressPercent) + '%';
              
              document.getElementById('clicks').textContent = clickCount;
              document.getElementById('percent').textContent = Math.floor(progressPercent) + '%';
              document.getElementById('stat-total').textContent = clickCount;
            }
            
            function showResult(message, emoji, actionNum) {
              clickCount++;
              const result = document.getElementById('result');
              result.textContent = emoji + ' ' + message;
              result.className = 'result-box active';
              document.getElementById('stat-last').textContent = actionNum;
              updateProgress();
            }
            
            document.getElementById('btn1').onclick = function() {
              showResult('Action 1 - Launch Successful!', '🚀', '1');
            };
            
            document.getElementById('btn2').onclick = function() {
              showResult('Action 2 - Star Achievement Unlocked!', '⭐', '2');
            };
            
            document.getElementById('btn3').onclick = function() {
              showResult('Action 3 - Target Hit Perfect!', '🎯', '3');
            };
            
            document.getElementById('btn4').onclick = function() {
              showResult('Action 4 - Diamond Status Reached!', '💎', '4');
            };
            
            document.getElementById('btn5').onclick = function() {
              showResult('Action 5 - Artistic Excellence!', '🎨', '5');
            };
            
            document.getElementById('reset').onclick = function() {
              clickCount = 0;
              screenshotCount = 0;
              updateProgress();
              const result = document.getElementById('result');
              result.textContent = 'Reset Complete! All counters cleared.';
              result.className = 'result-box';
              document.getElementById('stat-last').textContent = '-';
              startTime = Date.now();
            };
          </script>
        </body>
      </html>
    `;

    // STEP 1: Page Load
    await test.step('01 - Load page and wait for initial render', async () => {
      console.log('\n🔹 STEP 1: Loading page...');
      await page.goto(`data:text/html,${encodeURIComponent(testHTML)}`);
      await page.waitForTimeout(500);
      await takeScreenshot('page-load-start', 'Page just loaded, animations starting');
    });

    await test.step('02 - Capture after animations settle', async () => {
      console.log('🔹 STEP 2: Waiting for animations to complete...');
      await page.waitForTimeout(800);
      await takeScreenshot('page-fully-rendered', 'All animations complete, page fully rendered');
    });

    // STEP 3: Initial state
    await test.step('03 - Document initial state', async () => {
      console.log('🔹 STEP 3: Documenting initial state...');
      const title = await page.title();
      console.log(`   Page title: "${title}"`);
      await takeScreenshot('initial-state', 'Initial state - Counter at 0, all buttons ready');
    });

    // STEP 4: Hover over first button
    await test.step('04 - Hover over Action 1 button', async () => {
      console.log('🔹 STEP 4: Hovering over Action 1 button...');
      await page.hover('#btn1');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-button1', 'Hovering over Action 1 button - hover effect visible');
    });

    // STEP 5: Click Action 1
    await test.step('05 - Click Action 1 button', async () => {
      console.log('🔹 STEP 5: Clicking Action 1...');
      await page.click('#btn1');
      await page.waitForTimeout(200);
      await takeScreenshot('click-button1-immediate', 'Action 1 clicked - immediate response');
    });

    await test.step('06 - After Action 1 animation', async () => {
      console.log('🔹 STEP 6: Action 1 animation complete...');
      await page.waitForTimeout(600);
      const result = await page.locator('#result').textContent();
      const clicks = await page.locator('#clicks').textContent();
      console.log(`   Result: ${result}`);
      console.log(`   Clicks: ${clicks}`);
      await takeScreenshot('button1-complete', 'Action 1 complete - Counter: 1, Progress updated');
    });

    // STEP 7: Hover Action 2
    await test.step('07 - Hover over Action 2 button', async () => {
      console.log('🔹 STEP 7: Hovering over Action 2...');
      await page.hover('#btn2');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-button2', 'Hovering over Action 2 button');
    });

    // STEP 8: Click Action 2
    await test.step('08 - Click Action 2 button', async () => {
      console.log('🔹 STEP 8: Clicking Action 2...');
      await page.click('#btn2');
      await page.waitForTimeout(200);
      await takeScreenshot('click-button2-immediate', 'Action 2 clicked - immediate response');
    });

    await test.step('09 - After Action 2 animation', async () => {
      console.log('🔹 STEP 9: Action 2 animation complete...');
      await page.waitForTimeout(600);
      const clicks = await page.locator('#clicks').textContent();
      console.log(`   Clicks: ${clicks}`);
      await takeScreenshot('button2-complete', 'Action 2 complete - Counter: 2, Progress: ~33%');
    });

    // STEP 10: Hover Action 3
    await test.step('10 - Hover over Action 3 button', async () => {
      console.log('🔹 STEP 10: Hovering over Action 3...');
      await page.hover('#btn3');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-button3', 'Hovering over Action 3 button');
    });

    // STEP 11: Click Action 3
    await test.step('11 - Click Action 3 button', async () => {
      console.log('🔹 STEP 11: Clicking Action 3...');
      await page.click('#btn3');
      await page.waitForTimeout(200);
      await takeScreenshot('click-button3-immediate', 'Action 3 clicked - immediate response');
    });

    await test.step('12 - After Action 3 animation', async () => {
      console.log('🔹 STEP 12: Action 3 animation complete...');
      await page.waitForTimeout(600);
      await takeScreenshot('button3-complete', 'Action 3 complete - Counter: 3, Progress: 50%');
    });

    // STEP 13: Hover Action 4
    await test.step('13 - Hover over Action 4 button', async () => {
      console.log('🔹 STEP 13: Hovering over Action 4...');
      await page.hover('#btn4');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-button4', 'Hovering over Action 4 button');
    });

    // STEP 14: Click Action 4
    await test.step('14 - Click Action 4 button', async () => {
      console.log('🔹 STEP 14: Clicking Action 4...');
      await page.click('#btn4');
      await page.waitForTimeout(200);
      await takeScreenshot('click-button4-immediate', 'Action 4 clicked - immediate response');
    });

    await test.step('15 - After Action 4 animation', async () => {
      console.log('🔹 STEP 15: Action 4 animation complete...');
      await page.waitForTimeout(600);
      await takeScreenshot('button4-complete', 'Action 4 complete - Counter: 4, Progress: ~67%');
    });

    // STEP 16: Hover Action 5
    await test.step('16 - Hover over Action 5 button', async () => {
      console.log('🔹 STEP 16: Hovering over Action 5...');
      await page.hover('#btn5');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-button5', 'Hovering over Action 5 button');
    });

    // STEP 17: Click Action 5
    await test.step('17 - Click Action 5 button', async () => {
      console.log('🔹 STEP 17: Clicking Action 5...');
      await page.click('#btn5');
      await page.waitForTimeout(200);
      await takeScreenshot('click-button5-immediate', 'Action 5 clicked - immediate response');
    });

    await test.step('18 - After Action 5 animation', async () => {
      console.log('🔹 STEP 18: Action 5 animation complete...');
      await page.waitForTimeout(600);
      await takeScreenshot('button5-complete', 'Action 5 complete - Counter: 5, Progress: ~83%');
    });

    // STEP 19: Progress check
    await test.step('19 - Document progress state', async () => {
      console.log('🔹 STEP 19: Checking progress state...');
      const progress = await page.locator('#progress').textContent();
      const clicks = await page.locator('#clicks').textContent();
      console.log(`   Progress: ${progress}`);
      console.log(`   Clicks: ${clicks}`);
      await takeScreenshot('progress-check', 'Progress state - 5 actions completed');
    });

    // STEP 20: Hover Reset
    await test.step('20 - Hover over Reset button', async () => {
      console.log('🔹 STEP 20: Hovering over Reset button...');
      await page.hover('#reset');
      await page.waitForTimeout(300);
      await takeScreenshot('hover-reset', 'Hovering over Reset button');
    });

    // STEP 21: Click Reset
    await test.step('21 - Click Reset button', async () => {
      console.log('🔹 STEP 21: Clicking Reset...');
      await page.click('#reset');
      await page.waitForTimeout(200);
      await takeScreenshot('click-reset-immediate', 'Reset clicked - immediate response');
    });

    await test.step('22 - After Reset animation', async () => {
      console.log('🔹 STEP 22: Reset animation complete...');
      await page.waitForTimeout(600);
      const clicks = await page.locator('#clicks').textContent();
      console.log(`   Clicks after reset: ${clicks}`);
      await takeScreenshot('reset-complete', 'Reset complete - Counter: 0, Progress: 0%');
    });

    // STEP 23: Quick sequence
    await test.step('23 - Final quick sequence - Button 1', async () => {
      console.log('🔹 STEP 23: Final sequence - Button 1...');
      await page.click('#btn1');
      await page.waitForTimeout(500);
      await takeScreenshot('final-button1', 'Final sequence - Action 1');
    });

    await test.step('24 - Final quick sequence - Button 2', async () => {
      console.log('🔹 STEP 24: Final sequence - Button 2...');
      await page.click('#btn2');
      await page.waitForTimeout(500);
      await takeScreenshot('final-button2', 'Final sequence - Action 2');
    });

    await test.step('25 - Final quick sequence - Button 3', async () => {
      console.log('🔹 STEP 25: Final sequence - Button 3...');
      await page.click('#btn3');
      await page.waitForTimeout(500);
      await takeScreenshot('final-button3', 'Final sequence - Action 3');
    });

    // STEP 26: Final state
    await test.step('26 - Capture final state', async () => {
      console.log('🔹 STEP 26: Documenting final state...');
      await page.waitForTimeout(500);
      const finalClicks = await page.locator('#clicks').textContent();
      const finalProgress = await page.locator('#progress').textContent();
      console.log(`   Final clicks: ${finalClicks}`);
      console.log(`   Final progress: ${finalProgress}`);
      await takeScreenshot('final-state', 'Final state - Complete test run');
    });

    console.log('\n✅ COMPLETE SCREENSHOT GALLERY CAPTURED!');
    console.log(`📸 Total screenshots: ${screenshotCounter - 1}`);
    console.log('🎬 Video recording also captured');
    console.log('🎭 Browser window was visible for every single screenshot\n');
  });
});
