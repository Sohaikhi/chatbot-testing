# Chatbot Testing - C# Setup Script for Windows

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Chatbot Testing - C# Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check for .NET SDK
try {
    $dotnetVersion = dotnet --version
    Write-Host "✅ .NET SDK found: $dotnetVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ .NET SDK is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install .NET SDK 8.0 or later from:"
    Write-Host "https://dotnet.microsoft.com/download"
    exit 1
}

# Restore NuGet packages
Write-Host "📦 Restoring NuGet packages..." -ForegroundColor Yellow
dotnet restore
Write-Host ""

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
dotnet build
Write-Host ""

# Install Playwright browsers
Write-Host "🌐 Installing Playwright browsers (Chrome)..." -ForegroundColor Yellow
& "$PWD\bin\Debug\net8.0\playwright.ps1" install chrome --with-deps
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run tests with:"
Write-Host "  dotnet test"
Write-Host ""
Write-Host "Or with headed mode:"
Write-Host "  dotnet test -- Playwright.LaunchOptions.Headless=false"
Write-Host ""
