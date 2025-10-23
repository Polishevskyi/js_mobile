import { LoginScreen, LOGIN_SCREEN_LOCATORS } from '../screens/LoginScreen.js';
import { MenuScreen, MENU_SCREEN_LOCATORS } from '../screens/MenuScreen.js';
import {
  ProductsScreen,
  PRODUCTS_SCREEN_LOCATORS,
} from '../screens/ProductsScreen.js';
import { GoodsScreen, GOODS_SCREEN_LOCATORS } from '../screens/GoodsScreen.js';
import { CartScreen, CART_SCREEN_LOCATORS } from '../screens/CartScreen.js';

const loginScreen = new LoginScreen();
const menuScreen = new MenuScreen();
const productsScreen = new ProductsScreen();
const goodsScreen = new GoodsScreen();
const cartScreen = new CartScreen();

const { ERROR_LOCATORS } = LOGIN_SCREEN_LOCATORS;

export {
  loginScreen,
  menuScreen,
  productsScreen,
  goodsScreen,
  cartScreen,
  LOGIN_SCREEN_LOCATORS,
  MENU_SCREEN_LOCATORS,
  PRODUCTS_SCREEN_LOCATORS,
  GOODS_SCREEN_LOCATORS,
  CART_SCREEN_LOCATORS,
  ERROR_LOCATORS,
};
