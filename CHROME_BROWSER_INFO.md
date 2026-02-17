# Chrome Browser Configuration

This project is configured to run tests using **Google Chrome** browser instead of Chromium.

## Browser Configuration

### JavaScript Version

The tests use Playwright with Chrome channel specified in `playwright.config.js`:

```javascript
projects: [
  {
    name: 'chrome',
    use: { 
      ...devices['Desktop Chrome'],
      channel: 'chrome',  // Uses Google Chrome
      launchOptions: {
        slowMo: 100,  // Slow down for visibility
      }
    },
  },
]
```

### C# Version

The tests use Playwright for .NET with Chrome channel in `.runsettings`:

```xml
<Playwright>
  <BrowserName>chromium</BrowserName>
  <Channel>chrome</Channel>
  <LaunchOptions>
    <Headless>false</Headless>
    <SlowMo>100</SlowMo>
  </LaunchOptions>
</Playwright>
```

## Chrome vs Chromium

| Feature | Chromium | Chrome |
|---------|----------|--------|
| Source | Open-source | Google's branded version |
| Auto-updates | No | Yes |
| Media codecs | Limited | Full support |
| Sync | No | Google account sync |
| Branding | Chromium logo | Chrome logo |

## Running Tests

### JavaScript
```bash
# Headed mode (Chrome window visible)
npm test

# Headless mode
npm run test:ci

# Debug mode
npm run test:debug
```

### C#
```bash
# Headed mode (Chrome window visible)
dotnet test --settings:.runsettings

# Headless mode
dotnet test
```

## Browser Installation

Chrome is automatically installed using:

**JavaScript:**
```bash
npm run install-browsers
# or
npx playwright install chrome --with-deps
```

**C# (.NET):**
```bash
pwsh bin/Debug/net8.0/playwright.ps1 install chrome --with-deps
```

## System Requirements

- Chrome browser will be downloaded and installed by Playwright
- If you have Chrome already installed on your system, Playwright can use it via the `channel: 'chrome'` option
- Approximately 150-200MB disk space for Chrome installation

## Verification

To verify Chrome is configured correctly:

**JavaScript:**
```bash
npx playwright --version
```

**C#:**
```bash
dotnet test --list-tests
```

## Troubleshooting

**Issue**: Tests fail to launch Chrome

**Solution**: Install Chrome browser manually:
```bash
# JavaScript
npx playwright install chrome

# C#
pwsh bin/Debug/net8.0/playwright.ps1 install chrome
```

**Issue**: Chrome window not visible

**Solution**: Ensure you're running in headed mode:
- JavaScript: Use `npm test` (not `npm run test:ci`)
- C#: Use `dotnet test --settings:.runsettings`

## Current Chrome Version

The tests have been verified with Chrome version 144.0.7559.132.

## Documentation References

- [Playwright Browser Channels](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge)
- [JavaScript README](README.md)
- [C# README](README-CSHARP.md)
