const TIMEOUTS = {
  DEFAULT_TIMEOUT: 10000,
};

const CART_DATA = {
  ITEM_PRICE: '$29.99',
  SINGLE_ITEM_COUNT: '1',
};

const SORT_TYPES = {
  NAME_ASCENDING: 'nameAsc',
  NAME_DESCENDING: 'nameDesc',
  PRICE_ASCENDING: 'priceAsc',
  PRICE_DESCENDING: 'priceDesc',
};

const SORT_RESULTS = {
  PRODUCT_NAME_ASCENDING: 'Sauce Labs Backpack',
  PRODUCT_NAME_DESCENDING: 'Test.allTheThings() T-Shirt',
  PRODUCT_PRICE_ASCENDING: 'Sauce Labs Onesie',
  PRODUCT_PRICE_DESCENDING: 'Sauce Labs Fleece Jacket',
};

const ERROR_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
  INVALID_CREDENTIALS:
    'Provided credentials do not match any user in this service.',
};

export { TIMEOUTS, CART_DATA, SORT_TYPES, SORT_RESULTS, ERROR_MESSAGES };
