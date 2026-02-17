#!/bin/bash

echo "=========================================="
echo "Chatbot Testing - C# Setup"
echo "=========================================="
echo ""

# Check for .NET SDK
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed!"
    echo ""
    echo "Please install .NET SDK 8.0 or later from:"
    echo "https://dotnet.microsoft.com/download"
    exit 1
fi

echo "✅ .NET SDK found:"
dotnet --version
echo ""

# Restore NuGet packages
echo "�� Restoring NuGet packages..."
dotnet restore
echo ""

# Build the project
echo "🔨 Building the project..."
dotnet build
echo ""

# Install Playwright browsers
echo "🌐 Installing Playwright browsers (Chrome)..."
pwsh bin/Debug/net8.0/playwright.ps1 install chrome --with-deps
echo ""

echo "=========================================="
echo "✅ Setup complete!"
echo "=========================================="
echo ""
echo "Run tests with:"
echo "  dotnet test"
echo ""
echo "Or with Playwright UI:"
echo "  dotnet test --settings:.runsettings"
echo ""
