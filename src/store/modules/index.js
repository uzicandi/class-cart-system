import { combineReducers } from 'redux';
import products from './products';
import coupons from './coupons';

export default combineReducers({
  products,
  coupons
});
