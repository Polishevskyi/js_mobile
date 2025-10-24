import { SORT_RESULTS, SORT_TYPES } from '../../src/mobile/utils/constants.js';
import {
  PRODUCTS_SCREEN_LOCATORS,
  productsScreen,
} from '../../src/mobile/fixtures/mobileFixtures.js';

describe('Mobile - Sort Goods Tests', () => {
  const sortTestData = [
    {
      description: 'Verify that products can be sorted by name ascending',
      sortType: SORT_TYPES.NAME_ASCENDING,
      expectedFirstItem: SORT_RESULTS.PRODUCT_NAME_ASCENDING,
    },
    {
      description: 'Verify that products can be sorted by name descending',
      sortType: SORT_TYPES.NAME_DESCENDING,
      expectedFirstItem: SORT_RESULTS.PRODUCT_NAME_DESCENDING,
    },
    {
      description: 'Verify that products can be sorted by price ascending',
      sortType: SORT_TYPES.PRICE_ASCENDING,
      expectedFirstItem: SORT_RESULTS.PRODUCT_PRICE_ASCENDING,
    },
    {
      description: 'Verify that products can be sorted by price descending',
      sortType: SORT_TYPES.PRICE_DESCENDING,
      expectedFirstItem: SORT_RESULTS.PRODUCT_PRICE_DESCENDING,
    },
  ];

  sortTestData.forEach(({ description, sortType, expectedFirstItem }) => {
    it(description, async () => {
      await productsScreen.sortByType(sortType);
      await productsScreen.assertElementTextEquals(
        PRODUCTS_SCREEN_LOCATORS.FIRST_ITEM_NAME,
        expectedFirstItem
      );
    });
  });
});
