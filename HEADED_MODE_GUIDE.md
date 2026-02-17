# Running Playwright Tests in Headed Mode

## Overview

This guide explains how to run the Playwright test framework in **headed mode** where the browser window is visible during test execution.

## What is Headed Mode?

**Headed Mode** means the browser runs with a **visible user interface** (not headless), allowing you to:
- See the browser window as tests execute
- Watch interactions happen in real-time
- Debug issues more easily
- Verify visual aspects of your application

## Demonstration Results

The framework has been successfully tested in headed mode with the following results:

### ✅ Test Execution Success

**Demo Test**: `tests/demo-headed.spec.js`
- **Status**: ✅ PASSED
- **Duration**: 1.4 seconds
- **Browser**: Chromium (headed mode)
- **Screenshots**: 3 captured showing different stages

### Screenshots Captured

1. **Initial Page Load** (`headed-mode-initial.png`)
   - Shows the browser window with rendered content
   - Purple gradient background
   - Interactive buttons visible
   - Green status banner confirming headed mode

2. **After Button 1 Click** (`headed-mode-after-click.png`)
   - Shows result: "✅ Button 1 Clicked!"
   - Demonstrates browser interactivity
   - Click event processed successfully

3. **After Button 2 Click** (`headed-mode-final.png`)
   - Shows result: "✅ Button 2 Clicked!"
   - Confirms full interaction capability
   - Multiple interactions in sequence

## Running Tests in Headed Mode

### Option 1: Local Machine (Recommended for Development)

If you have a display/GUI available:

```bash
# Standard headed mode
npm test

# Or explicitly
npx playwright test --headed
```

This will:
1. Open a visible browser window
2. Run the tests with browser UI visible
3. Allow you to see exactly what's happening

### Option 2: Virtual Display (CI/Servers without GUI)

For headless servers or CI environments, use Xvfb (X Virtual Framebuffer):

```bash
# Install xvfb (if not already installed)
sudo apt-get install xvfb

# Run tests with virtual display
xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx playwright test --headed
```

**What this does:**
- Creates a virtual display server (`:99` or auto-assigned)
- Browser runs in "headed" mode on the virtual display
- Tests execute as if a real display was present
- Screenshots and videos capture the actual rendered output

### Option 3: Using npm Scripts

The project includes pre-configured scripts:

```bash
# Headed mode (requires display or virtual display)
npm test

# Headless mode (no display needed)
npm run test:ci

# Debug mode (headed with step-by-step debugging)
npm run test:debug

# UI mode (interactive test runner)
npm run test:ui
```

## Headed vs Headless Comparison

| Feature | Headed Mode | Headless Mode |
|---------|-------------|---------------|
| Browser Window | ✅ Visible | ❌ Not visible |
| Display Required | ✅ Yes (or virtual) | ❌ No |
| Performance | Slightly slower | Faster |
| Debugging | ✅ Easier | Harder |
| CI/CD | Requires Xvfb | ✅ Direct |
| Screenshots | ✅ Full rendering | ✅ Works |
| Videos | ✅ Full capture | ✅ Works |

## Environment Requirements

### For Local Development (Real Display)
- Physical display connected
- GUI environment (X11, Wayland, etc.)
- Browser installed

### For CI/Virtual Display
- Xvfb installed
- System dependencies for browser
- Sufficient memory/CPU

### Installation Command
```bash
# Install browsers with dependencies
npm run install-browsers

# Or manually
npx playwright install --with-deps chromium
```

## Configuration

The headed/headless mode is controlled by the `--headed` flag:

**In playwright.config.js:**
```javascript
use: {
  headless: false,  // This makes it headed by default
  // ... other options
}
```

**Or via command line:**
```bash
npx playwright test --headed      # Force headed mode
npx playwright test --headless    # Force headless mode
npx playwright test               # Use config default
```

## Demo Test Features

The `tests/demo-headed.spec.js` file demonstrates:

✅ **Browser Launch in Headed Mode**
- Browser window opens and is visible
- Full UI rendering with CSS gradients, styles

✅ **Page Rendering**
- HTML content loads completely
- Styles apply correctly (colors, fonts, layout)
- JavaScript executes properly

✅ **Element Interaction**
- Buttons clickable and responsive
- Click events trigger JavaScript handlers
- DOM updates reflected in UI

✅ **Screenshot Capture**
- Screenshots capture actual rendered output
- Visual confirmation of browser state
- Full-page screenshots with all elements

## Troubleshooting

### Issue: "Missing X server or $DISPLAY"

**Solution**: Use xvfb-run wrapper
```bash
xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx playwright test --headed
```

### Issue: Browser launches but closes immediately

**Cause**: Test completes before you can see it

**Solution**: Add `page.pause()` to pause execution:
```javascript
await page.pause(); // Opens Playwright Inspector
```

### Issue: Can't see browser on remote server

**Cause**: No physical display on server

**Solution**: 
1. Use Xvfb (virtual display)
2. Or use VNC to connect to virtual display
3. Or run tests locally in headed mode

### Issue: Screenshots are blank

**Cause**: Display not properly initialized

**Solution**: Ensure Xvfb starts before tests:
```bash
# Start Xvfb first
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Then run tests
npx playwright test --headed
```

## Best Practices

### 1. Development Workflow
```bash
# Use headed mode for development and debugging
npm test

# Watch tests run, understand behavior
# Fix issues as they appear visually
```

### 2. CI/CD Workflow
```bash
# Use headless for speed in CI
npm run test:ci

# Or use headed with Xvfb for complex scenarios
xvfb-run npx playwright test --headed
```

### 3. Debugging Workflow
```bash
# Use debug mode with Inspector
npm run test:debug

# Step through tests, inspect elements
# Pause at specific points
```

## Command Reference

```bash
# Basic headed mode
npx playwright test --headed

# Headed mode with specific test
npx playwright test demo-headed.spec.js --headed

# Headed mode with Xvfb
xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx playwright test --headed

# Headed mode with specific browser
npx playwright test --headed --project=chromium

# Headed mode with grep filter
npx playwright test --headed --grep "should run in headed mode"

# Show test results
npm run show-report
```

## Additional Resources

- **Playwright Documentation**: https://playwright.dev
- **Headed vs Headless**: https://playwright.dev/docs/ci#running-headed
- **Debugging Guide**: https://playwright.dev/docs/debug
- **CI Configuration**: https://playwright.dev/docs/ci

## Summary

✅ **Headed mode is working perfectly**
- Browser launches with visible UI
- Full rendering and interaction capability
- Screenshots capture actual browser output
- Ideal for development and debugging

🎯 **When to use headed mode:**
- Local development and testing
- Debugging test failures
- Visual verification
- Understanding test behavior
- Demo/presentation purposes

🚀 **When to use headless mode:**
- CI/CD pipelines
- Automated regression testing
- Performance-critical scenarios
- Production test runs

---

**Last Updated**: 2026-02-17
**Test Framework Version**: Playwright 1.58.2
