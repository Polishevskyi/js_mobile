import { BaseScreen } from './BaseScreen.js';

const PRODUCTS_SCREEN_LOCATORS = {
  CONTAINER_HEADER: '~container header',
  FIRST_ITEM_NAME:
    "(//android.widget.TextView[@content-desc='store item text'])[1]",
  FIRST_ITEM_PRICE:
    "(//android.widget.TextView[@content-desc='store item price'])[1]",
  SORT_BUTTON: '~sort button',
  SORT_NAME_ASC: '~nameAsc',
  SORT_NAME_DESC: '~nameDesc',
  SORT_PRICE_ASC: '~priceAsc',
  SORT_PRICE_DESC: '~priceDesc',
};

class ProductsScreen extends BaseScreen {
  async sortByType(sortType) {
    await this.tapWhenVisible(PRODUCTS_SCREEN_LOCATORS.SORT_BUTTON);

    switch (sortType) {
      case 'nameAsc':
        await this.tapWhenVisible(PRODUCTS_SCREEN_LOCATORS.SORT_NAME_ASC);
        break;
      case 'nameDesc':
        await this.tapWhenVisible(PRODUCTS_SCREEN_LOCATORS.SORT_NAME_DESC);
        break;
      case 'priceAsc':
        await this.tapWhenVisible(PRODUCTS_SCREEN_LOCATORS.SORT_PRICE_ASC);
        break;
      case 'priceDesc':
        await this.tapWhenVisible(PRODUCTS_SCREEN_LOCATORS.SORT_PRICE_DESC);
        break;
      default:
        throw new Error(`Unknown sort type: ${sortType}`);
    }
  }
}

export { ProductsScreen, PRODUCTS_SCREEN_LOCATORS };
