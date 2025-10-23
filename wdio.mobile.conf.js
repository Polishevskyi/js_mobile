import 'dotenv/config';

export const isBrowserStack = process.env.TEST_ENV === 'browserstack';

const MOBILE_TIMEOUT = 60000;
const MOBILE_RETRIES = 10;
const MAX_INSTANCES = 1;
const WAIT_TIMEOUT = 10000;
const CONNECTION_TIMEOUT = 120000;
const CONNECTION_RETRIES = 3;

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
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    },
  ],
];

export const config = {
  user: isBrowserStack ? process.env.BROWSERSTACK_USERNAME : undefined,
  key: isBrowserStack ? process.env.BROWSERSTACK_ACCESS_KEY : undefined,
  hostname: isBrowserStack ? 'hub.browserstack.com' : '127.0.0.1',
  port: isBrowserStack ? 443 : 4723,
  protocol: isBrowserStack ? 'https' : 'http',
  path: isBrowserStack ? '/wd/hub' : '/',

  services: isBrowserStack
    ? [
        [
          'browserstack',
          {
            app: process.env.MOBILE_APP_PATH,
            buildIdentifier: `${process.env.BUILD_NUMBER || 'local-build'}`,
            browserstackLocal: false,
          },
        ],
      ]
    : [
        [
          'appium',
          {
            args: {
              relaxedSecurity: true,
              address: 'localhost',
              port: 4723,
            },
            restart: true,
          },
        ],
      ],

  specs: ['./tests/mobile/**/*.js'],

  reporters,

  maxInstances: MAX_INSTANCES,

  capabilities: isBrowserStack
    ? [
        {
          platformName: 'Android',
          'appium:deviceName': 'Samsung Galaxy S22',
          'appium:platformVersion': '12.0',
          'appium:automationName': 'UiAutomator2',
          'appium:app': process.env.MOBILE_APP_PATH,
          'appium:noReset': false,
          'appium:fullReset': true,
          'appium:newCommandTimeout': 300,
          'appium:autoGrantPermissions': true,
        },
      ]
    : [
        {
          platformName: 'Android',
          'appium:deviceName': 'Pixel_4',
          'appium:platformVersion': '14',
          'appium:automationName': 'UiAutomator2',
          'appium:app': process.env.MOBILE_APP_PATH || './apps/myApp.apk',
          'appium:noReset': false,
          'appium:fullReset': true,
          'appium:newCommandTimeout': 300,
          'appium:autoGrantPermissions': true,
        },
      ],

  logLevel: 'info',

  bail: 0,
  waitforTimeout: WAIT_TIMEOUT,
  connectionRetryTimeout: CONNECTION_TIMEOUT,
  connectionRetryCount: CONNECTION_RETRIES,

  // Тестовий фреймворк
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: MOBILE_TIMEOUT,
    retries: MOBILE_RETRIES,
  },
};

console.log(
  `Running tests on: ${isBrowserStack ? 'BrowserStack' : 'Local Appium'}`
);
if (isBrowserStack) {
  console.log(`BrowserStack Username: ${process.env.BROWSERSTACK_USERNAME}`);
  console.log(`App Path: ${process.env.MOBILE_APP_PATH}`);
}
