# Quick Reference Card

Ultra-quick command reference for daily use.

## 🚀 First Time Setup

```bash
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
npm install
npm run install-browsers
npm run validate
```

## 🔄 Daily Sync (Get Agent Changes)

```bash
git pull origin main
npm install
npm test
```

## 🧪 Running Tests

```bash
npm test                 # Headed mode (visible browser)
npm run test:ci          # Headless mode (background)
npm run test:debug       # Debug mode (step-by-step)
npm run test:ui          # UI mode (interactive)
npm run show-report      # View last test report
```

## 📋 Validation

```bash
npm run validate         # Check setup is correct
node --version          # Check Node.js version
git --version           # Check Git version
```

## 🔍 Git Status

```bash
git status              # What changed locally?
git fetch origin        # Check for remote updates
git log -5 --oneline    # Last 5 commits
```

## 💾 Save Your Work

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

## 🆘 Emergency

```bash
# Undo local changes
git checkout -- filename

# Reset everything
git reset --hard HEAD
git pull origin main

# Reinstall everything
rm -rf node_modules
npm install
npm run install-browsers
```

## 📖 Full Documentation

- **[Local Setup Guide](LOCAL_SETUP_GUIDE.md)** - Complete setup instructions
- **[Git Sync Workflow](GIT_SYNC_WORKFLOW.md)** - Detailed sync guide
- **[README](README.md)** - Full project documentation

## 🎯 Common Tasks

### Sync Agent Changes
```bash
git pull origin main && npm install && npm test
```

### Run Specific Test
```bash
npx playwright test demo-headed.spec.js --headed
```

### View Screenshots
```bash
ls -lh test-results/screenshots/
```

### Clean and Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run install-browsers
```

### Check What Agent Changed
```bash
git fetch origin
git log HEAD..origin/main --oneline
git diff HEAD..origin/main
```

---

**Tip:** Bookmark this page for quick access to common commands!
