import { BaseScreen } from './BaseScreen.js';

const GOODS_SCREEN_LOCATORS = {
  ADD_TO_CART_BUTTON: '~Add To Cart button',
  CART_BADGE: "(//android.widget.TextView[@text='1'])[1]",
  CART_PRICE: '~product price',
  CART_TAB: '~cart badge',
};

class GoodsScreen extends BaseScreen {}

export { GoodsScreen, GOODS_SCREEN_LOCATORS };
