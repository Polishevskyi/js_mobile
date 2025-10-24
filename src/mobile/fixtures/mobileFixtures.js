import { LOGIN_SCREEN_LOCATORS, LoginScreen } from '../screens/LoginScreen.js';
import { MENU_SCREEN_LOCATORS, MenuScreen } from '../screens/MenuScreen.js';
import {
  PRODUCTS_SCREEN_LOCATORS,
  ProductsScreen,
} from '../screens/ProductsScreen.js';
import { GOODS_SCREEN_LOCATORS, GoodsScreen } from '../screens/GoodsScreen.js';
import { CART_SCREEN_LOCATORS, CartScreen } from '../screens/CartScreen.js';

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
