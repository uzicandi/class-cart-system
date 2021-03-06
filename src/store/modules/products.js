import * as productsApi from '../../api/products';
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions
} from '../../lib/asyncUtils';
import produce from 'immer';

const GET_PRODUCTS = 'products/GET_PRODUCTS';
const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_ERROR = 'products/GET_PRODUCTS_ERROR';

const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_ALL_PRODUCTS_SUCCESS = 'products/GET_ALL_PRODUCTS_SUCCESS';
const GET_ALL_PRODUCTS_ERROR = 'products/GET_ALL_PRODUCTS_ERROR';

const SET_CURRENT_PAGE = 'products/SET_CURRENT_PAGE';

/**
 * @desc 페이지당 상품 정보 가져오기
 */
export const getProducts = _page =>
  createPromiseThunk(GET_PRODUCTS, productsApi.getProducts)(_page);

/**
 * @desc 모든 상품 정보 가져오기
 */
export const getAllProducts = createPromiseThunk(
  GET_ALL_PRODUCTS,
  productsApi.getAllProducts
);

/**
 * @desc 페이지 이동
 * @param {현재 페이지} current_page
 */
export const setCurrentPage = current_page => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: {
      current_page
    }
  });
};

// 반복되는 initialState 리팩토링
export const initialState = {
  products: reducerUtils.initial(),
  all_products: reducerUtils.initial(),
  current_page: 1
};

const getProductsReducer = handleAsyncActions(GET_PRODUCTS, 'products');
const getAllProductsReducer = handleAsyncActions(
  GET_ALL_PRODUCTS,
  'all_products'
);

export default function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_ERROR:
      return getProductsReducer(state, action);
    case GET_ALL_PRODUCTS:
    case GET_ALL_PRODUCTS_SUCCESS:
    case GET_ALL_PRODUCTS_ERROR:
      return getAllProductsReducer(state, action);
    case SET_CURRENT_PAGE:
      return produce(state, draft => {
        draft.current_page = action.payload.current_page;
      });
    default:
      return state;
  }
}
