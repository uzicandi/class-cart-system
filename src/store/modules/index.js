import { combineReducers } from 'redux';
import products from './products';
import coupons from './coupons';
import cart from './cart';

export default combineReducers({
  products,
  coupons,
  cart
});
