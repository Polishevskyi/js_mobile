const API_TIMEOUT = 10000;
const API_RETRIES = 10;
const MAX_INSTANCES = 10;

const chromeOptions = {
  args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
};

const capabilities = [
  {
    maxInstances: MAX_INSTANCES,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': chromeOptions,
  },
];

const reporters = [
  [
    'spec',
    {
      showPreface: false,
      realtimeReporting: true,
    },
  ],
  [
    'allure',
    {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    },
  ],
];

export const config = {
  specs: ['./tests/api/**/*.js'],
  maxInstances: MAX_INSTANCES,
  capabilities,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: API_TIMEOUT,
    retries: API_RETRIES,
  },
  reporters,
};
