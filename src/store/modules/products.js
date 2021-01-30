import * as productsApi from '../../api/products';
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions
} from '../../lib/asyncUtils';
import produce from 'immer';
import { storageService } from '../../services/storageService';

const GET_PRODUCTS = 'products/GET_PRODUCTS';
const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_ERROR = 'products/GET_PRODUCTS_ERROR';

const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_ALL_PRODUCTS_SUCCESS = 'products/GET_ALL_PRODUCTS_SUCCESS';
const GET_ALL_PRODUCTS_ERROR = 'products/GET_ALL_PRODUCTS_ERROR';

const SET_CURRENT_PAGE = 'products/SET_CURRENT_PAGE';

const GET_CARTED_ITEMS_ID = 'cart/GET_CARTED_ITEMS_ID';

const GET_CARTED_ITEMS = 'cart/GET_CARTED_ITEMS';

const GET_CARTED_ITEMS_EDIT = 'cart/GET_CARTED_ITEMS_EDIT';

export const getProducts = _page =>
  createPromiseThunk(GET_PRODUCTS, productsApi.getProducts)(_page);

export const getAllProducts = createPromiseThunk(
  GET_ALL_PRODUCTS,
  productsApi.getAllProducts
);

export const setCurrentPage = current_page => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: {
      current_page
    }
  });
};

export const getCartedItemsId = () => dispatch => {
  const cartedItemsId = JSON.parse(storageService.getItem('carted-item'));
  dispatch({
    type: GET_CARTED_ITEMS_ID,
    payload: {
      cartedItemsId
    }
  });
};

export const getCartedItems = (cartedItemsId, all_products) => dispatch => {
  const newAllProducts = Object.assign([], all_products);
  const filteredCart = newAllProducts.filter(product => {
    if (
      product.id === cartedItemsId[0] ||
      product.id === cartedItemsId[1] ||
      product.id === cartedItemsId[2]
    ) {
      return true;
    }
  });
  const cartedItems = [];

  const mappedCart = Object.values(filteredCart).map(product => {
    const newCarted = Object.assign(
      {},
      product,
      {
        quantity: {
          id: product.id,
          quantity: product.quantity || 1
        }
      },
      { key: product.id },
      { displayPrice: product.price * (product.quantity || 1) }
    );
    return newCarted;
  });
  cartedItems.push(mappedCart);
  console.log('mappedCart cartedItems', cartedItems);
  dispatch({
    type: GET_CARTED_ITEMS,
    payload: {
      cartedItems
    }
  });
};

export const getCartedItemsEdit = (id, quantity) => dispatch => {
  // id로 해당 row 찾아서 quatity 넣기, 전체 state도 있어야함
  dispatch({
    type: GET_CARTED_ITEMS_EDIT,
    payload: id,
    quantity
  });
};

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
    case GET_CARTED_ITEMS_ID:
      return produce(state, draft => {
        draft.cartedItemsId = action.payload.cartedItemsId;
      });
    case GET_CARTED_ITEMS:
      return produce(state, draft => {
        draft.cartedItems = action.payload.cartedItems[0];
      });
    case GET_CARTED_ITEMS_EDIT:
      const { id, quantity } = action.payload;
      const cartedItemById = Object.values(state.cartedItems).filter(
        product => product.id === id
      );
      const key = Object.values(state.cartedItems).findIndex(
        product => product.id === id
      );
      const quantityObj = {
        id: id,
        quantity: quantity
      };
      const newDisplayPrice = cartedItemById[0].price * quantity;
      return produce(state, draft => {
        draft.cartedItems[key].quantity = quantityObj;
        draft.cartedItems[key].displayPrice = newDisplayPrice;
      });
    default:
      return state;
  }
}
