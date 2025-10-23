import { BaseScreen } from './BaseScreen.js';

const MENU_SCREEN_LOCATORS = {
  MENU_TAB: '~open menu',
  LOGIN_BUTTON: '//android.widget.TextView[@text="Log In"]',
};

class MenuScreen extends BaseScreen {}

export { MenuScreen, MENU_SCREEN_LOCATORS };
