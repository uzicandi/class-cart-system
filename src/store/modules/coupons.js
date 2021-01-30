import * as productsApi from '../../api/products';
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions
} from '../../lib/asyncUtils';

const GET_ALL_COUPONS = 'coupon/GET_ALL_COUPONS';
const GET_ALL_COUPONS_SUCCESS = 'coupon/GET_ALL_COUPONS_SUCCESS';
const GET_ALL_COUPONS_ERROR = 'coupon/GET_ALL_COUPONS_ERROR';

export const getAllCoupons = createPromiseThunk(
  GET_ALL_COUPONS,
  productsApi.getAllCoupons
);

export const initialState = {
  all_coupons: reducerUtils.initial()
};

const getAllCouponsReducer = handleAsyncActions(GET_ALL_COUPONS, 'all_coupons');

export default function coupons(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUPONS:
    case GET_ALL_COUPONS_SUCCESS:
    case GET_ALL_COUPONS_ERROR:
      return getAllCouponsReducer(state, action);
    default:
      return state;
  }
}
