# Mobile Test Automation Suite

Professional mobile and API test automation framework with WebdriverIO, Appium, and Allure reporting.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Run all tests
npm test

# Run with Telegram notifications
npm run test:with-notification
```

## 📋 Prerequisites

- Node.js >= 18.0.0
- BrowserStack account (for mobile testing)

## 🔧 Configuration

### GitHub Secrets

Configure the following secrets in GitHub repository (Settings → Secrets and variables → Actions):

```bash
# API Configuration
API_BASE_URL=https://petstore.swagger.io/v2

# Test Environment
TEST_ENV=browserstack

# BrowserStack Configuration
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## 📱 Test Execution

```bash
# API tests only
npm run test:api

# Mobile tests on BrowserStack
npm run test:browserstack

# All tests with notifications
npm run test:with-notification
```

## 📊 Reporting

```bash
# Generate Allure report
npm run allure:generate

# Serve report locally
npm run allure:serve

# Open report
npm run allure:open
```

## 🔔 Telegram Notifications

The framework automatically sends test results to Telegram:

- **Success**: 🟢 All tests passed
- **Partial**: 🟡 Some tests failed
- **Failed**: 🔴 Critical failures

## 🏗️ Project Structure

```
src/
├── api/           # API test utilities
├── mobile/        # Mobile test screens
└── fixtures/      # Test data fixtures

tests/
├── api/           # API test cases
└── mobile/        # Mobile test cases
```

## 🛠️ Development

```bash
# Code quality
npm run check      # Lint + format check
npm run fix        # Auto-fix issues

# Manual notification
npm run notify:telegram
```

## 📈 CI/CD Integration

GitHub Actions automatically runs tests on:

- Push to main/master/develop branches
- Pull requests
- Manual triggers with test type selection (all/mobile/api)

Required GitHub Secrets:

- `API_BASE_URL` - API base URL
- `TEST_ENV` - Test environment (browserstack)
- `BROWSERSTACK_USERNAME` - BrowserStack username
- `BROWSERSTACK_ACCESS_KEY` - BrowserStack access key
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_CHAT_ID` - Telegram chat ID

## 🎯 Features

- ✅ **Page Object Model** with BaseScreen
- ✅ **API Testing** with custom HTTP client
- ✅ **Mobile Testing** with BrowserStack
- ✅ **Allure Reporting** with detailed metrics
- ✅ **Telegram Notifications** with test results
- ✅ **BrowserStack Integration** for cloud testing
- ✅ **ESLint + Prettier** for code quality
- ✅ **Proxy Pattern** for automatic logging
