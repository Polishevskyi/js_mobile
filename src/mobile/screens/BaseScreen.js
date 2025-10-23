import { TIMEOUTS } from '../utils/constants.js';
import Logger from '../../../helpers/logger.js';

class BaseScreen {
  constructor() {
    this.logger = Logger;
    return this.createProxy();
  }

  createProxy() {
    return new Proxy(this, {
      get(target, prop) {
        const original = target[prop];
        if (
          typeof original === 'function' &&
          prop !== 'constructor' &&
          !prop.startsWith('_') &&
          prop !== 'createProxy'
        ) {
          return async function (...args) {
            const methodName = `${target.constructor.name}.${prop}`;
            Logger.step(`${methodName}()`);
            return original.apply(target, args);
          };
        }
        return original;
      },
    });
  }

  async assertElementIsVisible(selector, timeout = TIMEOUTS.DEFAULT_TIMEOUT) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async assertElementIsNotVisible(
    selector,
    timeout = TIMEOUTS.DEFAULT_TIMEOUT
  ) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout, reverse: true });
    return element;
  }

  async tapWhenVisible(selector) {
    const element = await this.assertElementIsVisible(selector);
    await element.click();
  }

  async setValue(selector, text) {
    const element = await this.assertElementIsVisible(selector);
    await element.clearValue();
    await element.setValue(text);
  }

  async getElementText(selector) {
    const element = await this.assertElementIsVisible(selector);
    return await element.getText();
  }

  async assertElementTextEquals(
    selector,
    expectedText,
    timeout = TIMEOUTS.DEFAULT_TIMEOUT
  ) {
    const element = await this.assertElementIsVisible(selector, timeout);
    const actualText = await element.getText();
    if (actualText !== expectedText) {
      const errorMessage = `Text assertion failed for element "${selector}". Expected: "${expectedText}", Actual: "${actualText}"`;
      throw new Error(errorMessage);
    }
    return element;
  }

  async navigateToLogin(menuScreen, MENU_SCREEN_LOCATORS) {
    await menuScreen.tapWhenVisible(MENU_SCREEN_LOCATORS.MENU_TAB);
    await menuScreen.tapWhenVisible(MENU_SCREEN_LOCATORS.LOGIN_BUTTON);
  }

  async fillLoginCredentials(username, password, LOGIN_SCREEN_LOCATORS) {
    await this.setValue(LOGIN_SCREEN_LOCATORS.USERNAME_FIELD, username);
    await this.setValue(LOGIN_SCREEN_LOCATORS.PASSWORD_FIELD, password);
  }
}

export { BaseScreen };
