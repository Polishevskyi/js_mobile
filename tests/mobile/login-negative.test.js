import MobileDataGenerator from '../../src/mobile/utils/dataGenerator.js';
import { ERROR_MESSAGES } from '../../src/mobile/utils/constants.js';
import {
  menuScreen,
  loginScreen,
  MENU_SCREEN_LOCATORS,
  LOGIN_SCREEN_LOCATORS,
  ERROR_LOCATORS,
} from '../../src/mobile/fixtures/mobileFixtures.js';

describe('Mobile - Login Negative Tests', () => {
  const invalidCredentials = MobileDataGenerator.generateInvalidCredentials();

  const testCases = [
    {
      description: 'Verify that error is shown when username is empty',
      username: '',
      password: process.env.VALID_PASSWORD,
      expectedError: ERROR_MESSAGES.USERNAME_REQUIRED,
      errorLocator: ERROR_LOCATORS.USERNAME_ERROR,
    },
    {
      description: 'Verify that error is shown when password is empty',
      username: process.env.VALID_USERNAME,
      password: '',
      expectedError: ERROR_MESSAGES.PASSWORD_REQUIRED,
      errorLocator: ERROR_LOCATORS.PASSWORD_ERROR,
    },
    {
      description: 'Verify that error is shown when username is invalid',
      username: invalidCredentials.invalidUsername,
      password: process.env.VALID_PASSWORD,
      expectedError: ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorLocator: ERROR_LOCATORS.CREDENTIALS_ERROR,
    },
    {
      description: 'Verify that error is shown when password is invalid',
      username: process.env.VALID_USERNAME,
      password: invalidCredentials.invalidPassword,
      expectedError: ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorLocator: ERROR_LOCATORS.CREDENTIALS_ERROR,
    },
    {
      description:
        'Verify that error is shown when both credentials are invalid',
      username: invalidCredentials.randomUsername,
      password: invalidCredentials.randomPassword,
      expectedError: ERROR_MESSAGES.INVALID_CREDENTIALS,
      errorLocator: ERROR_LOCATORS.CREDENTIALS_ERROR,
    },
  ];

  before(async () => {
    await loginScreen.navigateToLogin(menuScreen, MENU_SCREEN_LOCATORS);
  });

  testCases.forEach(
    ({ description, username, password, expectedError, errorLocator }) => {
      it(description, async () => {
        await loginScreen.fillLoginCredentials(
          username,
          password,
          LOGIN_SCREEN_LOCATORS
        );
        await loginScreen.tapWhenVisible(LOGIN_SCREEN_LOCATORS.LOGIN_BUTTON);
        await loginScreen.assertElementTextEquals(
          LOGIN_SCREEN_LOCATORS[errorLocator],
          expectedError
        );
      });
    }
  );
});
