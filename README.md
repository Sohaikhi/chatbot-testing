# Chatbot Testing with Playwright

Automated testing framework for the chatbot portal using Playwright. This framework supports manual login flow with interactive testing capabilities.

## 🎯 Overview

This repository contains end-to-end tests for the chatbot portal at:
```
https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net/portal/chat/conv_66aca917e2a344fb
```

The test framework is designed to handle authentication-gated applications by pausing test execution to allow manual login, then continuing with automated validation.

## 📖 Documentation

### Getting Started
- 📘 **[Local Setup Guide](LOCAL_SETUP_GUIDE.md)** - Complete guide for setting up on your local machine
- 🔄 **[Git Sync Workflow](GIT_SYNC_WORKFLOW.md)** - How to sync agent changes to your local machine
- 🎭 **[Headed Mode Guide](HEADED_MODE_GUIDE.md)** - Running tests with visible browser window

### Execution Results
- 📸 **[Complete Screenshot Gallery](COMPLETE_SCREENSHOT_GALLERY.md)** - 26 screenshots documenting every test step
- 🎬 **[Browser Window Open](BROWSER_WINDOW_OPEN.md)** - Browser window demonstration with video
- 📊 **[Execution Index](EXECUTION_INDEX.md)** - Index of all test executions

## 📋 Features

- ✅ **Manual Login Support**: Tests pause for user authentication
- ✅ **Page Object Model**: Maintainable, reusable page abstractions
- ✅ **Selector Discovery**: Tools to identify stable selectors
- ✅ **Multiple Run Modes**: Headed, headless, debug, and UI modes
- ✅ **CI/CD Integration**: GitHub Actions workflow included
- ✅ **Detailed Reporting**: HTML reports with screenshots and videos
- ✅ **Local Development**: Complete setup guide for running locally
- ✅ **Git Sync Workflow**: Easy synchronization with agent changes

## 🚀 Quick Start

### For Local Machine Setup

**👉 New to this project? Start here:** [Local Setup Guide](LOCAL_SETUP_GUIDE.md)

This comprehensive guide covers:
- Prerequisites and system requirements
- Step-by-step installation
- Running tests on your machine
- Syncing changes from GitHub agent
- Troubleshooting common issues

### Quick Install (Experienced Users)

1. Clone the repository:
```bash
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

4. Validate setup:
```bash
npm run validate
```

This checks that all components are properly installed and configured.

## 🧪 Running Tests

### Headed Mode (Recommended for Development)

Run tests with a visible browser window:
```bash
npm test
```

This will:
1. Open a browser window
2. Navigate to the chat URL
3. **PAUSE** and open Playwright Inspector
4. Wait for you to manually complete login
5. Continue testing after you click "Resume"

**For servers/CI without GUI**, use virtual display:
```bash
xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx playwright test --headed
```

📖 **See [HEADED_MODE_GUIDE.md](HEADED_MODE_GUIDE.md) for detailed headed mode instructions and examples.**

### Headless Mode (CI/Automated)

Run tests in headless mode (no browser window):
```bash
npm run test:ci
```

⚠️ **Note**: Headless mode will fail at the login step since manual interaction is required. Use this for CI validation only.

### Debug Mode

Run tests with step-by-step debugging:
```bash
npm run test:debug
```

### UI Mode (Interactive)

Run tests in Playwright's interactive UI mode:
```bash
npm run test:ui
```

## 📝 Test Structure

### Main Test Suite

**File**: `tests/chatbot.spec.js`

This test validates the complete login and chat page flow:
1. Navigates to the chat URL
2. Pauses for manual login
3. Validates URL contains `/portal/chat/`
4. Verifies chat input element is visible
5. Takes a screenshot of the loaded page

### Selector Discovery Test

**File**: `tests/selector-discovery.spec.js`

This helper test discovers and validates page selectors:
- Lists all input elements
- Lists all button elements
- Searches for `data-testid` attributes
- Pauses for manual inspection with Playwright Inspector

Run it separately:
```bash
npx playwright test selector-discovery.spec.js --headed
```

### Headed Mode Demo Test

**File**: `tests/demo-headed.spec.js`

This demo test showcases the framework running in headed mode:
- Demonstrates visible browser window execution
- Interactive UI with clickable buttons
- Full CSS rendering with gradients and styles
- JavaScript execution and DOM updates
- Screenshot capture of browser output

Run it to see headed mode in action:
```bash
# Local (with GUI)
npx playwright test demo-headed.spec.js --headed

# Server/CI (with virtual display)
xvfb-run npx playwright test demo-headed.spec.js --headed
```

📖 **For more details, see [HEADED_MODE_GUIDE.md](HEADED_MODE_GUIDE.md)**

## 🎭 Using Manual Login Pause

When tests run in headed mode, they will pause at the login screen:

1. **The browser opens** and navigates to the chat URL
2. **Playwright Inspector opens** automatically
3. **Console shows instructions**:
   ```
   ⏸️  PAUSED for manual login.
   📋 Instructions:
      1. Use the Playwright Inspector to fill in login credentials
      2. Complete the login process manually
      3. Click the "Resume" button in the Playwright Inspector
      4. The test will continue automatically
   ```
4. **Complete your login** in the browser window
5. **Click "Resume"** in the Inspector when ready
6. **Test continues** with automated validation

## 🔧 Selector Discovery

To find stable selectors for page elements:

1. Run the selector discovery test:
```bash
npx playwright test selector-discovery.spec.js --headed
```

2. Login manually when paused

3. Review console output for discovered selectors

4. Use Playwright Inspector to test selectors interactively

5. Update selectors in `tests/pages/ChatPage.js`

### Using Codegen

Generate code with Playwright's codegen tool:
```bash
npm run codegen
```

This opens the URL in a browser with Playwright Inspector, allowing you to:
- Click elements to generate selectors
- Record interactions
- Copy generated code

## 📁 Project Structure

```
chatbot-testing/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
├── scripts/
│   └── get-chat-url.js             # Helper to get chat URL from config
├── tests/
│   ├── pages/
│   │   └── ChatPage.js             # Page object for chat page
│   ├── helpers/
│   │   └── ManualLoginHelper.js    # Manual login utilities
│   ├── chatbot.spec.js             # Main test suite
│   └── selector-discovery.spec.js  # Selector discovery test
├── test.config.js                  # Centralized test configuration
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── .gitignore                      # Git ignore rules
├── validate-setup.js               # Setup validation script
└── README.md                       # This file
```

## 🛠️ Configuration

### Test Configuration

**test.config.js** centralizes all test URLs and settings:
- Base URL for the chatbot portal
- Conversation ID (easy to update for different conversations)
- Timeout values
- URL patterns for validation

To change the target conversation, edit `test.config.js`:
```javascript
conversationId: 'conv_YOUR_CONVERSATION_ID',
```

### Playwright Config

Edit `playwright.config.js` to customize:
- Timeout values
- Browser settings
- Test directory
- Report formats
- Video/screenshot settings

### Environment Variables

Set these in your environment or CI:
- `CI=true`: Enables CI-specific settings (headless, retries)

## 🔄 CI/CD with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

### Triggers
- Push to `main` or `master` branch
- Pull requests to `main` or `master`
- Manual workflow dispatch

### What it does
1. Installs dependencies
2. Installs Playwright browsers
3. Runs tests (will pause/fail at login)
4. Uploads test artifacts (reports, screenshots, videos)

### Running Manually

Go to **Actions** → **Playwright Tests** → **Run workflow**

### Artifacts

After each run, download:
- `playwright-report`: HTML test report
- `test-results`: Screenshots and videos

## 📊 Viewing Test Reports

After running tests, view the HTML report:
```bash
npm run show-report
```

This opens an interactive report with:
- Test results
- Screenshots on failure
- Video recordings
- Step-by-step traces

## 🔍 Updating Selectors

The `ChatPage` class uses multiple fallback selectors. Update them based on your discoveries:

1. Run selector discovery test
2. Identify stable selectors (prefer `data-testid`)
3. Edit `tests/pages/ChatPage.js`
4. Update selector arrays:
   ```javascript
   this.chatInputSelectors = [
     '[data-testid="chat-input"]',  // Add your discovered selector
     // ... fallbacks
   ];
   ```

## 🐛 Troubleshooting

### Tests fail immediately
- Ensure you're running in **headed mode**: `npm test`
- Check that browsers are installed: `npm run install-browsers`

### Can't find elements after login
- Run the selector discovery test
- Update selectors in `ChatPage.js`
- Use `npm run codegen` to explore the page

### Login doesn't work
- Verify the URL in `playwright.config.js` matches your environment
- Check browser console for errors
- Try increasing timeout values

### Tests time out
- Increase timeout in `playwright.config.js`:
  ```javascript
  timeout: 180 * 1000, // 3 minutes
  ```

## 🔄 Keeping Your Local Copy in Sync

When the GitHub agent makes changes to this repository, you can easily sync them to your local machine.

### Quick Sync

```bash
# Pull latest changes
git pull origin main

# Update dependencies (if package.json changed)
npm install

# Verify everything works
npm test
```

### Detailed Sync Guide

📘 **[Git Sync Workflow](GIT_SYNC_WORKFLOW.md)** - Complete guide covering:
- Syncing agent changes to local machine
- Handling merge conflicts
- Working with feature branches
- Emergency recovery procedures
- Git command reference

### Common Sync Scenarios

**Agent made changes, you want them:**
```bash
git pull origin main
npm install
```

**You have local changes, need agent's changes too:**
```bash
git add .
git commit -m "My changes"
git pull origin main
```

**Agent worked on a feature branch:**
```bash
git pull origin copilot/run-playwright-framework
npm install
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🔄 Keeping Your Local Copy in Sync

When the GitHub agent makes changes to this repository, you can easily sync them to your local machine.

### Quick Sync

```bash
# Pull latest changes
git pull origin main

# Update dependencies (if package.json changed)
npm install

# Verify everything works
npm test
```

### Detailed Sync Guide

📘 **[Git Sync Workflow](GIT_SYNC_WORKFLOW.md)** - Complete guide covering:
- Syncing agent changes to local machine
- Handling merge conflicts
- Working with feature branches
- Emergency recovery procedures
- Git command reference

### Common Sync Scenarios

**Agent made changes, you want them:**
```bash
git pull origin main
npm install
```

**You have local changes, need agent's changes too:**
```bash
git add .
git commit -m "My changes"
git pull origin main
```

**Agent worked on a feature branch:**
```bash
git pull origin copilot/run-playwright-framework
npm install
```

## 🤝 Contributing

1. Discover and document stable selectors
2. Add new test cases to `tests/chatbot.spec.js`
3. Update page objects as needed
4. Ensure tests pass locally before committing

## 📄 License

ISC

---

**Happy Testing! 🎭✨**
