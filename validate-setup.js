#!/usr/bin/env node

/**
 * Validation script for Playwright test framework setup
 * This script checks that all required components are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Playwright Test Framework Setup...\n');

const checks = [
  {
    name: 'package.json',
    check: () => fs.existsSync('package.json'),
    message: 'package.json found',
  },
  {
    name: 'Playwright config',
    check: () => fs.existsSync('playwright.config.js'),
    message: 'playwright.config.js found',
  },
  {
    name: 'Test directory',
    check: () => fs.existsSync('tests') && fs.statSync('tests').isDirectory(),
    message: 'tests/ directory exists',
  },
  {
    name: 'Main test',
    check: () => fs.existsSync('tests/chatbot.spec.js'),
    message: 'Main test file exists (tests/chatbot.spec.js)',
  },
  {
    name: 'Selector discovery test',
    check: () => fs.existsSync('tests/selector-discovery.spec.js'),
    message: 'Selector discovery test exists',
  },
  {
    name: 'ChatPage',
    check: () => fs.existsSync('tests/pages/ChatPage.js'),
    message: 'ChatPage page object found',
  },
  {
    name: 'ManualLoginHelper',
    check: () => fs.existsSync('tests/helpers/ManualLoginHelper.js'),
    message: 'ManualLoginHelper found',
  },
  {
    name: 'GitHub Actions workflow',
    check: () => fs.existsSync('.github/workflows/playwright.yml'),
    message: 'GitHub Actions workflow configured',
  },
  {
    name: 'README',
    check: () => fs.existsSync('README.md'),
    message: 'README.md documentation exists',
  },
  {
    name: '.gitignore',
    check: () => fs.existsSync('.gitignore'),
    message: '.gitignore configured',
  },
];

let allPassed = true;

checks.forEach(({ name, check, message }) => {
  const passed = check();
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}: ${message}`);
  if (!passed) {
    allPassed = false;
  }
});

console.log('\n📦 Checking npm scripts...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['test', 'test:ci', 'codegen'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`✅ npm run ${script}: ${packageJson.scripts[script]}`);
    } else {
      console.log(`❌ npm run ${script}: Not found`);
      allPassed = false;
    }
  });
} catch (e) {
  console.log('❌ Could not read package.json');
  allPassed = false;
}

console.log('\n🔧 Checking Playwright installation...');

try {
  const playwrightPath = path.join('node_modules', '@playwright', 'test');
  if (fs.existsSync(playwrightPath)) {
    console.log('✅ @playwright/test is installed');
  } else {
    console.log('❌ @playwright/test is not installed. Run: npm install');
    allPassed = false;
  }
} catch (e) {
  console.log('❌ Could not check Playwright installation');
  allPassed = false;
}

console.log('\n' + '='.repeat(60));

if (allPassed) {
  console.log('✅ ALL CHECKS PASSED! Framework is ready to use.');
  console.log('\n📚 Next steps:');
  console.log('   1. Install browsers: npm run install-browsers');
  console.log('   2. Run tests (headed): npm test');
  console.log('   3. Use codegen: npm run codegen');
  console.log('   4. Read README.md for detailed instructions');
  process.exit(0);
} else {
  console.log('❌ SOME CHECKS FAILED. Please review the output above.');
  process.exit(1);
}
