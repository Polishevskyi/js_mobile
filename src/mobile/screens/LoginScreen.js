import { BaseScreen } from './BaseScreen.js';

const LOGIN_SCREEN_LOCATORS = {
  USERNAME_FIELD: '~Username input field',
  PASSWORD_FIELD: '~Password input field',
  LOGIN_BUTTON: '~Login button',
  USERNAME_ERROR:
    "//android.view.ViewGroup[@content-desc='Username-error-message']/android.widget.TextView",
  PASSWORD_ERROR:
    "//android.view.ViewGroup[@content-desc='Password-error-message']/android.widget.TextView",
  CREDENTIALS_ERROR:
    "//android.view.ViewGroup[@content-desc='generic-error-message']/android.widget.TextView",
  ERROR_LOCATORS: {
    USERNAME_ERROR: 'USERNAME_ERROR',
    PASSWORD_ERROR: 'PASSWORD_ERROR',
    CREDENTIALS_ERROR: 'CREDENTIALS_ERROR',
  },
};

class LoginScreen extends BaseScreen {}

export { LoginScreen, LOGIN_SCREEN_LOCATORS };
