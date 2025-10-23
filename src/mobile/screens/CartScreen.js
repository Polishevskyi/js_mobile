import { BaseScreen } from './BaseScreen.js';

const CART_SCREEN_LOCATORS = {
  PRODUCT_LABEL: '~product label',
  PRODUCT_PRICE: '~product price',
  REMOVE_BUTTON: '//android.widget.TextView[@text="Remove Item"]',
};

class CartScreen extends BaseScreen {}

export { CartScreen, CART_SCREEN_LOCATORS };
