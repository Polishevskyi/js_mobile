import {
  menuScreen,
  loginScreen,
  productsScreen,
  PRODUCTS_SCREEN_LOCATORS,
  LOGIN_SCREEN_LOCATORS,
  MENU_SCREEN_LOCATORS,
} from '../../src/mobile/fixtures/mobileFixtures.js';

describe('Mobile - Login Tests', () => {
  it('Verify that user can login successfully with valid credentials', async () => {
    await loginScreen.navigateToLogin(menuScreen, MENU_SCREEN_LOCATORS);
    await loginScreen.fillLoginCredentials(
      process.env.VALID_USERNAME,
      process.env.VALID_PASSWORD,
      LOGIN_SCREEN_LOCATORS
    );
    await loginScreen.tapWhenVisible(LOGIN_SCREEN_LOCATORS.LOGIN_BUTTON);
    await productsScreen.assertElementIsVisible(
      PRODUCTS_SCREEN_LOCATORS.CONTAINER_HEADER
    );
    await productsScreen.assertElementIsNotVisible(
      LOGIN_SCREEN_LOCATORS.USERNAME_FIELD
    );
    await productsScreen.assertElementIsVisible(
      PRODUCTS_SCREEN_LOCATORS.FIRST_ITEM_NAME
    );
  });
});
