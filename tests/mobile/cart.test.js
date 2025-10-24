import { CART_DATA } from '../../src/mobile/utils/constants.js';
import {
  CART_SCREEN_LOCATORS,
  cartScreen,
  GOODS_SCREEN_LOCATORS,
  goodsScreen,
  PRODUCTS_SCREEN_LOCATORS,
  productsScreen,
} from '../../src/mobile/fixtures/mobileFixtures.js';

describe('Mobile - Cart Tests', () => {
  it('Verify that user can add product to cart and verify cart contents', async () => {
    const productName = await productsScreen.getElementText(
      PRODUCTS_SCREEN_LOCATORS.FIRST_ITEM_NAME
    );
    const productPrice = await productsScreen.getElementText(
      PRODUCTS_SCREEN_LOCATORS.FIRST_ITEM_PRICE
    );
    await productsScreen.tapWhenVisible(
      PRODUCTS_SCREEN_LOCATORS.FIRST_ITEM_NAME
    );
    await goodsScreen.tapWhenVisible(GOODS_SCREEN_LOCATORS.ADD_TO_CART_BUTTON);
    await goodsScreen.assertElementTextEquals(
      GOODS_SCREEN_LOCATORS.CART_BADGE,
      CART_DATA.SINGLE_ITEM_COUNT
    );
    await goodsScreen.tapWhenVisible(GOODS_SCREEN_LOCATORS.CART_TAB);
    await cartScreen.assertElementTextEquals(
      CART_SCREEN_LOCATORS.PRODUCT_LABEL,
      productName
    );
    await cartScreen.assertElementTextEquals(
      CART_SCREEN_LOCATORS.PRODUCT_PRICE,
      productPrice
    );
    await cartScreen.tapWhenVisible(CART_SCREEN_LOCATORS.REMOVE_BUTTON);
    await cartScreen.assertElementIsNotVisible(
      CART_SCREEN_LOCATORS.PRODUCT_LABEL
    );
  });
});
