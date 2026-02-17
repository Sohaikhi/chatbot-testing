# How to Setup This Project on Your Local Machine

Quick guide to get this Playwright testing framework running on your computer.

## 🎯 Choose Your Language Version

This project is available in **TWO versions** - pick the one that fits your needs:

### Option 1: JavaScript/Node.js (Simpler)
**Best if you:** Already use JavaScript, want faster setup, prefer simpler syntax

### Option 2: C#/.NET (More Enterprise)
**Best if you:** Use .NET, prefer static typing, need Visual Studio integration

---

## 🚀 JavaScript Version Setup (Recommended for Beginners)

### Step 1: Install Prerequisites

**You need:**
1. **Node.js 18+** - Download from https://nodejs.org/ (get the LTS version)
2. **Git** - Download from https://git-scm.com/

**Verify installation:**
```bash
node --version  # Should show v18.0.0 or higher
git --version   # Should show git version
```

### Step 2: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Clone the project
git clone https://github.com/Sohaikhi/chatbot-testing.git

# Go into the folder
cd chatbot-testing
```

### Step 3: Install Dependencies

```bash
# Install Node.js packages
npm install

# Install Chrome browser for testing
npm run install-browsers
```

This will take 2-5 minutes depending on your internet speed.

### Step 4: Verify Setup

```bash
# Check everything is working
npm run validate
```

You should see: `✅ ALL CHECKS PASSED! Framework is ready to use.`

### Step 5: Run Your First Test

```bash
# Run tests with browser window visible
npm test
```

**What happens:**
1. A Chrome browser window opens
2. Test navigates to the chatbot page
3. Browser pauses for manual login
4. You log in manually
5. Click "Resume" in Playwright Inspector
6. Test continues automatically

**That's it! You're ready!** 🎉

---

## 🚀 C# Version Setup (For .NET Developers)

### Step 1: Install Prerequisites

**You need:**
1. **.NET SDK 8.0+** - Download from https://dotnet.microsoft.com/download
2. **Git** - Download from https://git-scm.com/

**Verify installation:**
```bash
dotnet --version  # Should show 8.0.0 or higher
git --version     # Should show git version
```

### Step 2: Clone the Repository

```bash
# Clone the project
git clone https://github.com/Sohaikhi/chatbot-testing.git

# Go into the folder
cd chatbot-testing
```

### Step 3: Run Setup Script

**On Windows:**
```powershell
.\setup.ps1
```

**On Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

This installs NuGet packages, builds the project, and installs Chrome browser.

### Step 4: Run Tests

```bash
# Run tests with browser window visible
dotnet test --settings:.runsettings
```

**That's it! You're ready!** 🎉

---

## 📚 Next Steps After Setup

### 1. Explore Different Test Modes

**JavaScript:**
```bash
npm test              # Headed mode (visible browser)
npm run test:ci       # Headless mode (no browser window)
npm run test:debug    # Debug mode (step-by-step)
npm run test:ui       # Interactive UI mode
```

**C#:**
```bash
dotnet test --settings:.runsettings  # Headed mode
dotnet test                          # Headless mode
```

### 2. View Test Reports

```bash
# JavaScript
npm run show-report

# Opens an HTML report showing:
# - Test results
# - Screenshots
# - Videos
# - Traces
```

### 3. Sync with Latest Changes

When updates are made (by the agent or other developers):

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install  # JavaScript
# or
dotnet restore  # C#

# Run tests to verify
npm test  # JavaScript
# or
dotnet test --settings:.runsettings  # C#
```

---

## 🎓 Learn More

### Comprehensive Guides

1. **[LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md)** - Detailed JavaScript setup (12KB guide)
   - Prerequisites explained in detail
   - Troubleshooting all common issues
   - Running tests in different modes
   - Development workflow

2. **[README-CSHARP.md](README-CSHARP.md)** - Complete C# documentation
   - .NET-specific setup
   - NuGet packages
   - Visual Studio integration
   - C# test examples

3. **[GIT_SYNC_WORKFLOW.md](GIT_SYNC_WORKFLOW.md)** - Syncing with agent changes
   - How Git works
   - Pulling updates
   - Handling conflicts
   - Best practices

4. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Command cheat sheet
   - Copy-paste ready commands
   - No explanations, just commands
   - Bookmark for daily use

### Visual Guides

- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Roadmap and learning path
- **[COMPLETE_SCREENSHOT_GALLERY.md](COMPLETE_SCREENSHOT_GALLERY.md)** - 26 screenshots of tests running
- **[BROWSER_WINDOW_OPEN.md](BROWSER_WINDOW_OPEN.md)** - Video demonstration
- **[CHROME_BROWSER_INFO.md](CHROME_BROWSER_INFO.md)** - Chrome vs Chromium details

---

## 🐛 Troubleshooting

### "npm: command not found"
**Fix:** Node.js is not installed. Download from https://nodejs.org/

### "git: command not found"
**Fix:** Git is not installed. Download from https://git-scm.com/

### "Browser not found"
**Fix:** Run `npm run install-browsers` (JavaScript) or reinstall with setup script (C#)

### "Permission denied"
**Fix:** On Linux/Mac, you may need to use `sudo` or check folder permissions

### Tests fail immediately
**Fix:** 
1. Run `npm run validate` to check setup
2. Make sure Chrome is installed: `npm run install-browsers`
3. Check [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md#troubleshooting) for detailed solutions

---

## 📱 Quick Command Reference

### JavaScript Setup
```bash
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
npm install
npm run install-browsers
npm run validate
npm test
```

### C# Setup
```bash
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
./setup.sh              # Linux/Mac
.\setup.ps1             # Windows
dotnet test --settings:.runsettings
```

### Daily Sync
```bash
git pull origin main
npm install              # JavaScript
dotnet restore          # C#
npm test                # JavaScript
dotnet test --settings:.runsettings  # C#
```

---

## ✅ Verification Checklist

After setup, check these:

- [ ] Node.js or .NET SDK installed
- [ ] Git installed  
- [ ] Repository cloned to your machine
- [ ] Dependencies installed without errors
- [ ] Validation passed (`npm run validate` or build succeeded)
- [ ] First test runs successfully
- [ ] Browser window opens
- [ ] Can view test reports

If all checked, **you're all set!** 🎉

---

## 🎯 Summary

**Absolute minimum to get started:**

1. Install Node.js (or .NET SDK)
2. Install Git
3. Run 4 commands:
   ```bash
   git clone https://github.com/Sohaikhi/chatbot-testing.git
   cd chatbot-testing
   npm install && npm run install-browsers  # JavaScript
   npm test                                 # JavaScript
   ```

**Total time:** 15-30 minutes (including downloads)

**Need help?** Check [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md) for detailed instructions and troubleshooting.

---

**Ready to start?** Choose JavaScript or C# above and follow the steps! 🚀
