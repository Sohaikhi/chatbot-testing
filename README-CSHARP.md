# Chatbot Testing with Playwright (C# / .NET)

Automated testing framework for the chatbot portal using Playwright for .NET. This framework supports manual login flow with interactive testing capabilities.

## 🎯 Overview

This repository contains end-to-end tests for the chatbot portal at:
```
https://gsassistant-hec2cvcsbnf6a2bx.eastus-01.azurewebsites.net/portal/chat/conv_66aca917e2a344fb
```

The test framework is designed to handle authentication-gated applications by pausing test execution to allow manual login, then continuing with automated validation.

**Technology Stack**: C# with .NET 8.0 and Playwright for .NET

## 📋 Features

- ✅ **Manual Login Support**: Tests pause for user authentication
- ✅ **Page Object Model**: Maintainable, reusable page abstractions
- ✅ **NUnit Test Framework**: Industry-standard testing framework for .NET
- ✅ **Multiple Run Modes**: Headed, headless, and debug modes
- ✅ **CI/CD Integration**: Compatible with Azure DevOps, GitHub Actions, and other CI systems
- ✅ **Detailed Reporting**: HTML reports with screenshots and traces

## 🚀 Quick Start

### Prerequisites

- **.NET SDK 8.0 or higher**
  - Download from: https://dotnet.microsoft.com/download
  - Verify installation: `dotnet --version`

### Installation

#### Windows

1. Clone the repository:
```powershell
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
```

2. Run the setup script:
```powershell
.\setup.ps1
```

#### macOS / Linux

1. Clone the repository:
```bash
git clone https://github.com/Sohaikhi/chatbot-testing.git
cd chatbot-testing
```

2. Run the setup script:
```bash
chmod +x setup.sh
./setup.sh
```

#### Manual Setup

If you prefer to set up manually:

```bash
# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# Install Playwright browsers
pwsh bin/Debug/net8.0/playwright.ps1 install chromium --with-deps
```

## 🧪 Running Tests

### Headed Mode (Recommended for Development)

Run tests with a visible browser window:

```bash
dotnet test --settings:.runsettings
```

This will:
1. Open a Chromium browser window
2. Navigate to the chat URL
3. **PAUSE** and open Playwright Inspector
4. Wait for you to manually complete login
5. Continue testing after you click "Resume"

### Headless Mode (CI/Automated)

Run tests without a visible browser window:

```bash
dotnet test
```

### Debug Mode

Run tests with detailed output:

```bash
dotnet test --logger:"console;verbosity=detailed"
```

### Run Specific Tests

```bash
# Run a specific test
dotnet test --filter "FullyQualifiedName~ChatbotTests"

# Run tests by category (if you add [Category] attributes)
dotnet test --filter "Category=Smoke"
```

## 📁 Project Structure

```
ChatbotTesting/
├── Config/
│   └── TestConfig.cs          # Configuration settings
├── Pages/
│   └── ChatPage.cs             # Page Object for Chat page
├── Helpers/
│   └── ManualLoginHelper.cs    # Manual login utilities
├── Tests/
│   └── ChatbotTests.cs         # Main test suite
├── ChatbotTesting.csproj       # Project file
├── ChatbotTesting.sln          # Solution file
├── .runsettings                # Test run configuration
└── README-CSHARP.md            # This file
```

## 🔧 Configuration

### Test Settings

Edit `Config/TestConfig.cs` to change:
- Base URL
- Conversation ID
- Timeout values
- URL patterns

### Run Settings

Edit `.runsettings` to configure:
- Browser type (chromium, firefox, webkit)
- Headed/headless mode
- Slow motion delay
- Test results directory

## 🧰 Available Commands

```bash
# Build the project
dotnet build

# Run all tests
dotnet test

# Run tests in headed mode
dotnet test --settings:.runsettings

# Run tests with detailed output
dotnet test --logger:"console;verbosity=detailed"

# Clean build artifacts
dotnet clean

# Restore packages
dotnet restore

# Generate test report
dotnet test --logger "html;logfilename=testResults.html"
```

## 📊 Test Reports

After running tests, view the results:

- **Console Output**: Shown in terminal
- **Test Results**: Located in `TestResults/` folder
- **Screenshots**: Saved in `TestResults/` on test failure
- **TRX Files**: XML test result files for CI integration

## 🐛 Debugging

### Using Visual Studio

1. Open `ChatbotTesting.sln` in Visual Studio
2. Set breakpoints in test code
3. Run tests in Debug mode (Test Explorer)

### Using Visual Studio Code

1. Install C# extension
2. Open folder in VS Code
3. Use built-in test runner
4. Set breakpoints and debug

### Using Playwright Inspector

The tests automatically pause and open Playwright Inspector during manual login steps. You can also add manual pauses:

```csharp
await Page.PauseAsync();
```

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: 8.0.x
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build
      - name: Install Playwright
        run: pwsh bin/Debug/net8.0/playwright.ps1 install --with-deps chromium
      - name: Run tests
        run: dotnet test
```

### Azure DevOps

Add to your `azure-pipelines.yml`:

```yaml
- task: UseDotNet@2
  inputs:
    version: '8.0.x'
- script: dotnet restore
- script: dotnet build
- script: pwsh bin/Debug/net8.0/playwright.ps1 install --with-deps chromium
- script: dotnet test
```

## 📚 Resources

- [Playwright for .NET Documentation](https://playwright.dev/dotnet/)
- [NUnit Documentation](https://docs.nunit.org/)
- [.NET Documentation](https://docs.microsoft.com/dotnet/)

## 🆘 Troubleshooting

### .NET SDK Not Found

Install .NET SDK 8.0 or later from https://dotnet.microsoft.com/download

### Playwright Browsers Not Installed

Run:
```bash
pwsh bin/Debug/net8.0/playwright.ps1 install chromium --with-deps
```

### Tests Fail Immediately

Make sure you've built the project first:
```bash
dotnet build
```

### Permission Denied on setup.sh

Make the script executable:
```bash
chmod +x setup.sh
```

## 📝 Migration from JavaScript

This project has been migrated from JavaScript/Node.js to C#/.NET. Key differences:

| JavaScript | C# |
|------------|-----|
| `npm install` | `dotnet restore` |
| `npm test` | `dotnet test` |
| `.spec.js` files | `Tests.cs` files |
| `require()` | `using` statements |
| `async/await` | `async/await` (similar) |
| Jest/Mocha | NUnit |
| `package.json` | `.csproj` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `dotnet test`
5. Submit a pull request

## 📄 License

ISC License - See LICENSE file for details

---

**Need Help?** Check the troubleshooting section or create an issue on GitHub.
