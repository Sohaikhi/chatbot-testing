# Local Setup Guide

This guide explains how to set up the Playwright test framework on your local machine and keep it synchronized with changes made through the GitHub agent.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Running Tests Locally](#running-tests-locally)
4. [Syncing Agent Changes](#syncing-agent-changes)
5. [Development Workflow](#development-workflow)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **A Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any editor of your choice

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: At least 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space

---

## 🚀 Initial Setup

Follow these steps to set up the project on your local machine for the first time.

### Step 1: Clone the Repository

Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
# Clone the repository
git clone https://github.com/Sohaikhi/chatbot-testing.git

# Navigate into the project directory
cd chatbot-testing
```

**What this does:**
- Downloads the entire project to your local machine
- Creates a `chatbot-testing` folder with all files

### Step 2: Install Dependencies

```bash
# Install Node.js dependencies
npm install
```

**What this does:**
- Reads `package.json` and installs Playwright and other dependencies
- Creates a `node_modules` folder (which is gitignored)
- Usually takes 30-60 seconds

### Step 3: Install Playwright Browsers

```bash
# Install Chromium browser for testing
npm run install-browsers
```

**What this does:**
- Downloads the Chromium browser (~170MB)
- Installs system dependencies needed for running the browser
- May take 2-5 minutes depending on your internet speed

### Step 4: Validate Setup

```bash
# Verify everything is installed correctly
npm run validate
```

**Expected output:**
```
✅ ALL CHECKS PASSED! Framework is ready to use.
```

If you see all checkmarks, your setup is complete!

---

## 🧪 Running Tests Locally

Once setup is complete, you can run tests in several different modes.

### Headed Mode (Recommended for Development)

Run tests with a visible browser window:

```bash
npm test
```

**What happens:**
1. A Chromium browser window opens
2. The test navigates to the chat URL
3. The browser pauses automatically
4. **Action Required:** You manually complete the login
5. Click "Resume" in Playwright Inspector
6. The test continues and validates the page

### Headless Mode (Background)

Run tests without a visible browser window:

```bash
npm run test:ci
```

**Note:** This will fail at the login step since manual interaction is required.

### Debug Mode (Step-by-Step)

Run tests with the Playwright Inspector for debugging:

```bash
npm run test:debug
```

**What you can do:**
- Step through test code line by line
- Inspect elements on the page
- Try selectors in the inspector
- Pause and resume execution

### UI Mode (Interactive)

Run tests in Playwright's interactive UI:

```bash
npm run test:ui
```

**Features:**
- Visual test runner
- Time-travel debugging
- Watch mode (re-runs on file changes)
- Test filtering and search

### Run Specific Tests

Run only specific test files:

```bash
# Run only the demo test
npx playwright test demo-headed.spec.js --headed

# Run complete screenshot test
npx playwright test complete-screenshots.spec.js --headed

# Run browser window demo
npx playwright test browser-window-demo.spec.js --headed
```

### View Test Reports

After running tests, view the HTML report:

```bash
npm run show-report
```

This opens an interactive report in your browser showing:
- Test results
- Screenshots
- Videos
- Step-by-step traces

---

## 🔄 Syncing Agent Changes

When the GitHub agent makes changes to the repository, follow these steps to get those changes to your local machine.

### Understanding the Workflow

```
GitHub Agent → GitHub Repository → Your Local Machine
              (makes changes)     (you pull changes)
```

### Step 1: Check Current Status

Before pulling changes, check your local status:

```bash
# See which branch you're on and if you have uncommitted changes
git status
```

**If you have uncommitted changes**, either:
- Commit them: `git add . && git commit -m "Your message"`
- Stash them: `git stash` (saves them temporarily)

### Step 2: Fetch Latest Changes

```bash
# Download the latest changes from GitHub (doesn't apply them yet)
git fetch origin
```

**What this does:**
- Contacts GitHub and downloads new commits
- Updates your local knowledge of remote branches
- Doesn't change your working files

### Step 3: View Available Changes

```bash
# See what changes are available
git log HEAD..origin/main --oneline

# Or see detailed differences
git diff HEAD..origin/main
```

This shows you what the agent changed before you apply it.

### Step 4: Pull and Merge Changes

```bash
# Pull changes from the main branch
git pull origin main
```

**What this does:**
- Downloads changes from GitHub
- Merges them into your current branch
- Updates your local files

**If the agent worked on a different branch** (like `copilot/run-playwright-framework`):

```bash
# Pull from the agent's branch
git pull origin copilot/run-playwright-framework
```

### Step 5: Reinstall Dependencies (if needed)

If `package.json` was updated:

```bash
# Update dependencies
npm install
```

If new browsers are needed:

```bash
# Update Playwright browsers
npm run install-browsers
```

### Step 6: Run Tests to Verify

```bash
# Verify everything works
npm run validate
npm test
```

---

## 💡 Development Workflow

Here's the recommended workflow when working with this project alongside the GitHub agent.

### Daily Workflow

**Morning (or before starting work):**
```bash
# 1. Check for agent updates
git fetch origin

# 2. Pull latest changes
git pull origin main

# 3. Update dependencies if needed
npm install

# 4. Verify setup
npm run validate
```

**During work:**
```bash
# Run tests as you work
npm test

# Or use watch mode (auto-reruns)
npm run test:ui
```

**End of day (or before asking agent for changes):**
```bash
# Commit your local changes
git add .
git commit -m "Your descriptive message"

# Push to GitHub (if you have write access)
git push origin main
```

### Working with Agent Changes

**Scenario 1: Agent makes changes, you want them**
```bash
git pull origin main
npm install  # if package.json changed
npm test     # verify it works
```

**Scenario 2: You have local changes, agent also made changes**
```bash
# Save your changes
git stash

# Pull agent changes
git pull origin main

# Reapply your changes
git stash pop

# Resolve any conflicts if they occur
# Then test
npm test
```

**Scenario 3: Agent created a new feature branch**
```bash
# List all branches
git branch -a

# Switch to agent's branch
git checkout copilot/run-playwright-framework

# Pull latest from that branch
git pull origin copilot/run-playwright-framework

# Test the new features
npm test
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "npm: command not found"

**Solution:**
- Node.js is not installed or not in your PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

#### Issue: "git: command not found"

**Solution:**
- Git is not installed
- Install Git from https://git-scm.com/
- Restart your terminal after installation

#### Issue: "Permission denied" when pulling

**Solution:**
```bash
# Make sure you have read access to the repository
# You might need to configure Git credentials

# For HTTPS (recommended):
git config --global credential.helper store
git pull origin main  # You'll be prompted for credentials once

# For SSH:
# Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

#### Issue: "Merge conflict" when pulling

**Solution:**
```bash
# Git will mark conflicts in your files
# Open the conflicted files and look for:
# <<<<<<< HEAD
# Your changes
# =======
# Agent's changes
# >>>>>>> origin/main

# Edit the file to keep what you want
# Then:
git add .
git commit -m "Resolved merge conflicts"
```

#### Issue: "playwright: command not found"

**Solution:**
```bash
# Reinstall dependencies
npm install

# Use npx to run playwright
npx playwright test --headed
```

#### Issue: Tests fail with "Browser not found"

**Solution:**
```bash
# Reinstall Playwright browsers
npm run install-browsers

# Or manually:
npx playwright install --with-deps chromium
```

#### Issue: "Cannot find module '@playwright/test'"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Tests fail immediately on Windows

**Solution:**
- Ensure you're using a compatible Node.js version (18+)
- Run terminal as Administrator
- Disable antivirus temporarily if it's blocking browser execution

#### Issue: "Port already in use" when viewing reports

**Solution:**
```bash
# Kill the process using the port (usually 9323)
# Windows:
netstat -ano | findstr :9323
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:9323 | xargs kill -9
```

---

## 📚 Quick Reference

### Essential Commands

```bash
# Setup (one-time)
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
npm install
npm run install-browsers

# Daily sync
git pull origin main
npm install

# Run tests
npm test                    # Headed mode
npm run test:ci            # Headless mode
npm run test:debug         # Debug mode
npm run test:ui            # UI mode

# View results
npm run show-report

# Validate setup
npm run validate

# Update browsers
npm run install-browsers
```

### Git Commands

```bash
# Check status
git status
git branch

# Update from GitHub
git fetch origin
git pull origin main

# Save your changes
git add .
git commit -m "Message"
git push origin main

# View history
git log --oneline
git log -p  # with changes

# Undo changes
git checkout -- filename    # discard local changes
git reset --hard HEAD       # discard all local changes
```

### File Locations

```
chatbot-testing/
├── tests/                   # Test files
├── playwright-report/       # HTML reports (after running tests)
├── test-results/           # Screenshots, videos, traces
├── node_modules/           # Dependencies (gitignored)
├── package.json            # Project configuration
├── playwright.config.js    # Playwright settings
└── README.md              # Main documentation
```

---

## 🎯 Next Steps

After completing this setup:

1. **Run your first test**: `npm test`
2. **Review the documentation**: Check `README.md` for detailed feature info
3. **Explore test files**: Look at `tests/` directory
4. **Try different modes**: Experiment with debug and UI modes
5. **Check execution docs**: Review `COMPLETE_SCREENSHOT_GALLERY.md` to see what's possible

## 📖 Additional Resources

- **Main README**: [README.md](README.md) - Full project documentation
- **Headed Mode Guide**: [HEADED_MODE_GUIDE.md](HEADED_MODE_GUIDE.md) - Advanced headed mode usage
- **Screenshot Gallery**: [COMPLETE_SCREENSHOT_GALLERY.md](COMPLETE_SCREENSHOT_GALLERY.md) - Visual documentation
- **Execution Index**: [EXECUTION_INDEX.md](EXECUTION_INDEX.md) - All test executions
- **Playwright Docs**: https://playwright.dev/docs/intro - Official Playwright documentation

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `node --version` shows version 18 or higher
- [ ] `git --version` shows Git is installed
- [ ] `npm install` completes without errors
- [ ] `npm run validate` shows all checks passing
- [ ] `npm test` opens a browser window
- [ ] Tests run and you can interact with them
- [ ] `npm run show-report` opens a report

If all items are checked, you're ready to go! 🎉

---

**Need Help?**
- Check the [Troubleshooting](#troubleshooting) section above
- Review the main [README.md](README.md)
- Check GitHub Issues: https://github.com/Sohaikhi/chatbot-testing/issues
