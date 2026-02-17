# Chatbot Testing with Playwright

Automated testing framework for the chatbot portal using Playwright.

> **🚀 New to this project? Start here:** **[HOW_TO_SETUP.md](HOW_TO_SETUP.md)** - Simple guide to get running on your local machine in 15 minutes!

## 🎯 Overview

This repository contains end-to-end tests for the chatbot portal at:
```
https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net/portal/chat/conv_66aca917e2a344fb
```

The test framework is designed to handle authentication-gated applications by pausing test execution to allow manual login, then continuing with automated validation.

## 🔤 Language Versions

**This project is available in TWO versions:**

### 🟦 C# / .NET Version (Recommended)
- **Technology**: .NET 8.0 with Playwright for .NET
- **Test Framework**: NUnit
- **Setup**: See [README-CSHARP.md](README-CSHARP.md)
- **Quick Start**: Run `./setup.sh` (Linux/Mac) or `.\setup.ps1` (Windows)
- **Run Tests**: `dotnet test --settings:.runsettings`

**📘 [Full C# Documentation →](README-CSHARP.md)**

### 🟨 JavaScript / Node.js Version
- **Technology**: Node.js with @playwright/test
- **Test Framework**: Playwright Test
- **Setup**: See sections below
- **Quick Start**: Run `npm install && npm run install-browsers`
- **Run Tests**: `npm test`

**📘 [Conversion Guide (JS ↔ C#) →](JAVASCRIPT_TO_CSHARP.md)**

---

## 🚀 JavaScript Version - Quick Start

### Prerequisites

- Node.js 18 or higher
- npm package manager

### Installation

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

## �� Running Tests (JavaScript)

### Headed Mode

```bash
npm test
```

### Headless Mode

```bash
npm run test:ci
```

### Debug Mode

```bash
npm run test:debug
```

### UI Mode

```bash
npm run test:ui
```

## 📁 Project Structure

```
chatbot-testing/
├── JavaScript Version:
│   ├── tests/                  # JavaScript test files
│   │   ├── chatbot.spec.js
│   │   ├── pages/
│   │   └── helpers/
│   ├── package.json
│   └── playwright.config.js
│
├── C# Version:
│   ├── Tests/                  # C# test files
│   │   └── ChatbotTests.cs
│   ├── Pages/
│   ├── Helpers/
│   ├── Config/
│   ├── ChatbotTesting.csproj
│   ├── ChatbotTesting.sln
│   └── .runsettings
│
└── Documentation:
    ├── README.md               # This file
    ├── README-CSHARP.md        # C# documentation
    ├── JAVASCRIPT_TO_CSHARP.md # Conversion guide
    ├── LOCAL_SETUP_GUIDE.md
    ├── GIT_SYNC_WORKFLOW.md
    └── GETTING_STARTED.md
```

## 📚 Documentation

### 🚀 Setup & Getting Started
- 🌟 **[HOW_TO_SETUP.md](HOW_TO_SETUP.md)** - **START HERE!** Simple 15-minute setup guide
- 📘 **[GETTING_STARTED.md](GETTING_STARTED.md)** - Learning roadmap and next steps
- 📘 **[LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md)** - Comprehensive JavaScript setup (detailed)
- 📘 **[README-CSHARP.md](README-CSHARP.md)** - Complete C# .NET documentation
- 🔄 **[Git Sync Workflow](GIT_SYNC_WORKFLOW.md)** - Syncing agent changes
- ⚡ **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Command cheat sheet

### 📖 Advanced Guides
- 📘 **[JavaScript to C# Conversion](JAVASCRIPT_TO_CSHARP.md)** - Side-by-side comparison
- 🌐 **[Chrome Browser Info](CHROME_BROWSER_INFO.md)** - Chrome vs Chromium details
- 🎭 **[Headed Mode Guide](HEADED_MODE_GUIDE.md)** - Advanced testing modes

### Execution Results
- 📸 **[Complete Screenshot Gallery](COMPLETE_SCREENSHOT_GALLERY.md)** - 26 screenshots
- 🎬 **[Browser Window Open](BROWSER_WINDOW_OPEN.md)** - Video demonstration
- 📊 **[Execution Index](EXECUTION_INDEX.md)** - All test executions

## 🎯 Which Version Should I Use?

### Choose C# if:
- ✅ You're working in a .NET environment
- ✅ You prefer static typing and compile-time checking
- ✅ Your team knows C# better than JavaScript
- ✅ You need enterprise-level IDE support (Visual Studio)
- ✅ You're integrating with other .NET services

### Choose JavaScript if:
- ✅ You're already familiar with Node.js
- ✅ You prefer dynamic typing and flexibility
- ✅ Your team knows JavaScript better than C#
- ✅ You want faster prototyping
- ✅ You're working in a JavaScript-heavy environment

**Both versions have the same functionality and test coverage!**

## 🔧 Configuration

### JavaScript
- Edit `test.config.js` for test settings
- Edit `playwright.config.js` for Playwright configuration

### C#
- Edit `Config/TestConfig.cs` for test settings
- Edit `.runsettings` for run configuration

## 🤝 Contributing

When contributing:
- Choose which version you want to modify (C# or JavaScript)
- Keep documentation updated
- Run tests before submitting PR
- Follow the existing code style

## 📄 License

ISC License

---

## 🆘 Need Help?

- **C# Questions**: See [README-CSHARP.md](README-CSHARP.md)
- **JavaScript Questions**: See sections above or [LOCAL_SETUP_GUIDE.md](LOCAL_SETUP_GUIDE.md)
- **Converting Between**: See [JAVASCRIPT_TO_CSHARP.md](JAVASCRIPT_TO_CSHARP.md)
- **Issues**: Create an issue on GitHub

---

**Start Here:**
- For C#: [README-CSHARP.md](README-CSHARP.md) → Run `./setup.sh`
- For JavaScript: [GETTING_STARTED.md](GETTING_STARTED.md) → Run `npm install`
