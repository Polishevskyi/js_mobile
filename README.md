# 🚀 Mobile Test Automation Framework

**Professional Mobile and API test automation framework with WebdriverIO, Appium, and Allure reporting**

[![Node.js](https://img.shields.io/badge/Node.js-18.0.0+-green.svg)](https://nodejs.org/)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-8.16.12-blue.svg)](https://webdriver.io/)
[![Appium](https://img.shields.io/badge/Appium-2.0.1-orange.svg)](https://appium.io/)
[![Allure](https://img.shields.io/badge/Allure-2.32.0-red.svg)](https://allure-framework.github.io/)

---

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Architecture & Structure](#-architecture--structure)
- [Technology Stack](#-technology-stack)
- [Design Patterns](#-design-patterns)
- [Configuration & Secrets](#-configuration--secrets)
- [BrowserStack Upload Tool](#-browserstack-upload-tool)
- [Quick Start](#-quick-start)
- [Test Execution](#-test-execution)
- [Reporting](#-reporting)
- [CI/CD Integration](#-cicd-integration)

---

## 🎯 Project Description

This project is a comprehensive test automation framework that combines:

- **Mobile Testing** through BrowserStack and local Appium
- **API Testing** with custom HTTP client and data models
- **Automated Reporting** through Allure Reports
- **Telegram Integration** for test result notifications
- **CI/CD Support** through GitHub Actions

The framework is built on clean architecture principles using modern design patterns to ensure scalability, maintainability, and reliability.

---

## 🏗️ Architecture & Structure

### 📁 Project Structure

```
js_mobile/
├── 📁 src/                          # Main framework code
│   ├── 📁 api/                      # API testing
│   │   ├── 📁 fixtures/             # Test data for API
│   │   ├── 📁 models/              # Data models and comparison
│   │   │   ├── 📁 comparison/      # Comparator pattern for validation
│   │   │   ├── baseModel.js        # Base model (Factory Pattern)
│   │   │   ├── createPetRequest.js # Request model
│   │   │   └── createPetResponse.js# Response model
│   │   ├── 📁 steps/               # Page Object for API (Step Pattern)
│   │   └── 📁 utils/               # Utilities and clients
│   │       ├── httpClient.js       # HTTP client (Singleton)
│   │       ├── requester.js        # Facade Pattern for API requests
│   │       ├── dataGenerator.js    # Factory Pattern for test data
│   │       └── constants.js        # Constants and configuration
│   └── 📁 mobile/                  # Mobile testing
│       ├── 📁 screens/              # Page Object Model
│       │   ├── BaseScreen.js       # Base page with Proxy Pattern
│       │   ├── LoginScreen.js      # Login page
│       │   ├── ProductsScreen.js  # Products page
│       │   └── ...                 # Other pages
│       ├── 📁 fixtures/            # Test data for mobile tests
│       └── 📁 utils/               # Utilities for mobile testing
├── 📁 tests/                       # Test scenarios
│   ├── 📁 api/                     # API tests
│   └── 📁 mobile/                  # Mobile tests
├── 📁 helpers/                     # Helper utilities
│   └── logger.js                   # Logging (Singleton)
├── 📁 apps/                        # APK files for testing
├── 📁 allure-results/              # Allure results
├── 📁 allure-report/               # Generated reports
├── bs-upload-app.js                # APK upload tool
├── wdio.api.conf.js                # API test configuration
└── wdio.mobile.conf.js             # Mobile test configuration
```

### 🔄 Architectural Principles

- **Separation of Concerns** - clear separation of responsibilities
- **DRY (Don't Repeat Yourself)** - avoiding code duplication
- **SOLID Principles** - following object-oriented programming principles
- **Dependency Injection** - dependency inversion for testing

---

## 🛠️ Technology Stack

### 🎯 Core Technologies

| Category           | Technology   | Version | Purpose                      |
| ------------------ | ------------ | ------- | ---------------------------- |
| **Testing**        | WebdriverIO  | 8.16.12 | Main automation framework    |
| **Mobile Testing** | Appium       | 2.0.1   | Mobile app automation        |
| **API Testing**    | Axios        | 1.9.0   | HTTP client for API requests |
| **Test Framework** | Mocha        | 11.1.0  | BDD testing                  |
| **Assertions**     | Chai         | 5.2.0   | Assertion library            |
| **Reporting**      | Allure       | 2.32.0  | Detailed test reporting      |
| **Cloud Testing**  | BrowserStack | 9.20.0  | Cloud testing platform       |

### 🔧 Additional Tools

| Tool                  | Purpose                             |
| --------------------- | ----------------------------------- |
| **ESLint + Prettier** | Code quality control and formatting |
| **Faker.js**          | Test data generation                |
| **Form-data**         | File uploads                        |
| **Tweetsodium**       | Encryption for GitHub Secrets       |
| **Dotenv**            | Environment variable management     |

### 🌐 Supported Platforms

- **Android** (primary platform)
- **iOS** (via Appium)
- **BrowserStack Cloud** (cloud testing)
- **Local Testing** (Appium Server)

---

## 🎨 Design Patterns

### 1. **Page Object Model (POM)**

```javascript
// src/mobile/screens/BaseScreen.js
class BaseScreen {
  constructor() {
    this.logger = Logger;
    return this.createProxy(); // Proxy Pattern
  }
}

class LoginScreen extends BaseScreen {
  // Specific methods for login page
}
```

### 2. **Proxy Pattern** (Automatic Logging)

```javascript
createProxy() {
  return new Proxy(this, {
    get(target, prop) {
      const original = target[prop];
      if (typeof original === 'function') {
        return async function (...args) {
          Logger.step(`${target.constructor.name}.${prop}()`);
          return original.apply(target, args);
        };
      }
      return original;
    },
  });
}
```

### 3. **Factory Pattern** (Data Generation)

```javascript
// src/api/utils/dataGenerator.js
class DataGenerator {
  static generatePet() {
    return {
      id: faker.number.int({ min: 1, max: 999999 }),
      name: faker.animal.dog(),
      status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    };
  }
}
```

### 4. **Facade Pattern** (API Requests)

```javascript
// src/api/utils/requester.js
export default class Requester {
  constructor() {
    this.httpClient = new HttpClient(); // Singleton
  }

  async request(endpointKey, { data, config, pathParams }) {
    // Simplified interface for complex operations
  }
}
```

### 5. **Singleton Pattern** (HTTP Client & Logging)

```javascript
// src/api/utils/httpClient.js
export default class HttpClient {
  constructor() {
    this.client = axios.create({
      baseURL: backendUrl,
      headers: {
        /* ... */
      },
    });
  }
}
```

### 6. **Comparator Pattern** (Model Validation)

```javascript
// src/api/models/comparison/modelComparator.js
export const compareModels = (request, response, fieldMap) => {
  // Field comparison between request and response
  const mismatches = [];
  // Comparison logic...
  return { success: mismatches.length === 0, mismatches };
};
```

### 7. **Builder Pattern** (Test Configuration)

```javascript
// wdio.mobile.conf.js
export const config = {
  capabilities: isBrowserStack
    ? [
        {
          platformName: 'Android',
          'appium:deviceName': 'Samsung Galaxy S22',
          // ... other parameters
        },
      ]
    : [
        /* local configuration */
      ],
};
```

### 8. **Strategy Pattern** (Different Testing Environments)

```javascript
// Support for different testing strategies:
// - BrowserStack (cloud)
// - Local (Appium)
// - API testing
```

---

## 🔐 Configuration & Secrets

### 📝 Required Environment Variables

Create `.env` file based on `.env.example`:

```bash
# API Configuration
API_BASE_URL=https://petstore.swagger.io/v2

# Test Environment (browserstack | local)
TEST_ENV=browserstack

# BrowserStack Configuration
BROWSERSTACK_USERNAME=your_browserstack_username
BROWSERSTACK_ACCESS_KEY=your_browserstack_access_key

# Mobile App Path (automatically updated via bs-upload-app.js)
MOBILE_APP_PATH=bs://your_app_hash_here

# Telegram Notifications
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# GitHub Integration (optional)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repository_name
```

### 🔑 GitHub Secrets

Configure the following secrets in GitHub (Settings → Secrets and variables → Actions):

| Secret                    | Description               | Example                          |
| ------------------------- | ------------------------- | -------------------------------- |
| `API_BASE_URL`            | API base URL              | `https://petstore.swagger.io/v2` |
| `TEST_ENV`                | Test environment          | `browserstack`                   |
| `BROWSERSTACK_USERNAME`   | BrowserStack username     | `your_username`                  |
| `BROWSERSTACK_ACCESS_KEY` | BrowserStack access key   | `your_access_key`                |
| `MOBILE_APP_PATH`         | APK path (auto-updated)   | `bs://app_hash`                  |
| `TELEGRAM_BOT_TOKEN`      | Telegram bot token        | `123456789:ABC...`               |
| `TELEGRAM_CHAT_ID`        | Chat ID for notifications | `-1001234567890`                 |

### 🚀 How to Get Secrets

#### BrowserStack

1. Register at [browserstack.com](https://browserstack.com)
2. Go to Account → Settings
3. Copy Username and Access Key

#### Telegram Bot

1. Create bot via [@BotFather](https://t.me/botfather)
2. Get bot token
3. Add bot to group/channel
4. Get Chat ID via [@userinfobot](https://t.me/userinfobot)

#### GitHub Token

1. Go to Settings → Developer settings → Personal access tokens
2. Create new token with `repo` and `workflow` permissions

---

## 📤 BrowserStack Upload Tool

### 🔧 How `bs-upload-app.js` Works

This tool automates the process of uploading APK files to BrowserStack:

#### 📋 Workflow Algorithm

1. **Read configuration** from `.env` file
2. **Validate APK file** in `apps/` folder
3. **Upload to BrowserStack** via REST API
4. **Update local `.env`** with new APK path
5. **Update GitHub Secret** (if configured)

#### 🛠️ Technical Details

```javascript
// Main functions:
-loadEnvFile() - // Read .env
  uploadToBrowserStack() - // Upload APK
  updateEnvFile() - // Update local .env
  updateGitHubSecret() - // Update GitHub Secret
  encryptSecret(); // Encrypt via tweetsodium
```

#### 🔐 Security

- **Secret encryption** via GitHub Public Key
- **Base64 encoding** for BrowserStack authorization
- **Token validation** before usage

#### 🚀 Usage

```bash
# Upload APK to BrowserStack
npm run bs:upload-app

# Or directly
node bs-upload-app.js
```

#### 📊 Logs & Errors

Tool provides detailed information about:

- ✅ Successful upload
- ❌ Network errors
- ⚠️ Missing secrets warnings
- 🔄 GitHub Secret update status

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **BrowserStack account** (for cloud testing)
- **Android Studio** (for local testing)

### ⚡ Installation

```bash
# Clone repository
git clone <repository-url>
cd js_mobile

# Install dependencies
npm install

# Copy configuration
cp .env.example .env

# Edit configuration
nano .env  # or any editor
```

### 🎯 First Run

```bash
# Upload APK to BrowserStack
npm run bs:upload-app

# Run all tests
npm test

# Generate report
npm run allure:generate
npm run allure:serve
```

---

## 🧪 Test Execution

### 📱 Mobile Tests

```bash
# All mobile tests
npm run test:mobile

# Specific test
npx wdio run wdio.mobile.conf.js --spec tests/mobile/login.test.js

# With additional parameters
TEST_ENV=browserstack npm run test:mobile
```

### 🌐 API Tests

```bash
# All API tests
npm run test:api

# Specific API test
npx wdio run wdio.api.conf.js --spec tests/api/createPet.test.js
```

### 🔄 Combined Testing

```bash
# All tests sequentially
npm test

# Parallel execution (via CI/CD)
npm run test:api & npm run test:mobile
```

### ⚙️ Environment Configuration

```bash
# BrowserStack (cloud)
TEST_ENV=browserstack npm run test:mobile

# Local testing
TEST_ENV=local npm run test:mobile

# API testing
npm run test:api
```

---

## 📊 Reporting

### 🎨 Allure Reports

```bash
# Generate report
npm run allure:generate

# Local server
npm run allure:serve

# Open report
npm run allure:open
```

### 📈 Report Types

- **📊 Summary** - overall statistics
- **📋 Test Cases** - detailed results
- **📈 Trends** - execution trends
- **🔍 Behaviors** - behavioral tests
- **📱 Suites** - test groups

### 🔔 Telegram Notifications

Automatic notifications about results:

- 🟢 **Success** - all tests passed
- 🟡 **Partial** - some tests failed
- 🔴 **Failed** - critical errors

---

## 🔄 CI/CD Integration

### 🚀 GitHub Actions

Automatic test execution on:

- **Push** to main/master/develop
- **Pull Requests**
- **Manual triggers** with test type selection

### 📋 Workflow Stages

1. **Setup** - install Node.js and dependencies
2. **Lint** - code quality check
3. **API Tests** - execute API tests
4. **Mobile Tests** - execute mobile tests
5. **Report** - generate Allure reports
6. **Notify** - send Telegram notifications

### 🎯 Matrix Testing

```yaml
strategy:
  matrix:
    test-type: [all, mobile, api]
    environment: [browserstack, local]
```

### 📊 Artifacts

- **Allure Reports** - detailed reports
- **Screenshots** - error screenshots
- **Logs** - execution logs
- **Video** - test recordings (BrowserStack)

---

## 🎯 Key Benefits

### ✅ **Scalability**

- Modular architecture
- Easy addition of new tests
- Multi-platform support

### ✅ **Reliability**

- Automatic retries
- Detailed logging
- Error handling

### ✅ **Usability**

- Simple API
- Automatic logging
- Detailed documentation

### ✅ **Integration**

- CI/CD ready
- Telegram notifications
- Allure reporting

---

<div align="center">

**Made with ❤️ by Polishevskyi**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Polishevskyi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/polishevskyi/)

</div>
