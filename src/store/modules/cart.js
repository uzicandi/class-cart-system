import { reducerUtils } from '../../lib/asyncUtils';
import produce from 'immer';
import { storageService } from '../../services/storageService';

const GET_CARTED_ITEMS_ID = 'cart/GET_CARTED_ITEMS_ID';
const GET_CARTED_ITEMS = 'cart/GET_CARTED_ITEMS';
const GET_CARTED_ITEMS_EDIT = 'cart/GET_CARTED_ITEMS_EDIT';

const GET_PAYMENT_CARTED_ITEMS = 'cart/GET_PAYMENT_CARTED_ITEMS';
const FETCH_PAYMENT_CARTED_ITEMS = 'cart/FETCH_PAYMENT_CARTED_ITEMS';

const DELETE_ALL_CARTED_ITEMS = 'cart/DELETE_ALL_CARTED_ITEMS';

/**
 * @desc localStorage에 담겨있는 아이템 ID 가져오기
 */
export const getCartedItemsId = () => dispatch => {
  const cartedItemsId = JSON.parse(storageService.getItem('carted-item'));
  dispatch({
    type: GET_CARTED_ITEMS_ID,
    payload: {
      cartedItemsId
    }
  });
};

/**
 * @desc id를 통해 cart에 보여줄 item 배열 만들기
 */
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
  dispatch({
    type: GET_CARTED_ITEMS,
    payload: {
      cartedItems
    }
  });
};

/**
 * @desc 장바구니 수량 및 가격 변경
 * @param {상품 id} id
 * @param {상품 수량} quantity
 */
export const getCartedItemsEdit = (id, quantity) => dispatch => {
  dispatch({
    type: GET_CARTED_ITEMS_EDIT,
    payload: id,
    quantity
  });
};

/**
 *  결제창 빈 배열
 */
export const getPaymentCartedItems = ids => dispatch => {
  dispatch({
    type: GET_PAYMENT_CARTED_ITEMS,
    payload: ids
  });
};

/**
 *
 * @param {장바구니에서 선택한 ID 배열} ids
 * @param {장바구니에서 선택한 ROW 배열} rows
 */
export const fetchPaymentCartedItems = props => dispatch => {
  const { selectedRows } = props;
  dispatch({
    type: FETCH_PAYMENT_CARTED_ITEMS,
    payload: selectedRows
  });
};

export const deleteAllCartedItems = () => dispatch => {
  storageService.removeItem('carted-item');
  dispatch({
    type: DELETE_ALL_CARTED_ITEMS
  });
};

export const initialState = {
  cart: reducerUtils.initial()
};

export default function cart(state = initialState, action) {
  switch (action.type) {
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

      const paymentCartItem = Object.values(state.paymentCartedItems).filter(
        product => product.id === id
      );
      const key2 = Object.values(state.paymentCartedItems).findIndex(
        product => product.id === id
      );
      const newPaymentCartItem = paymentCartItem.map(product => {
        const newProductItem = {
          id: product.id,
          key: product.id,
          price: product.price,
          displayPrice: product.price * quantity,
          quantity: quantityObj,
          title: product.title,
          score: product.score,
          coverImage: product.coverImage
        };
        return newProductItem;
      });

      return produce(state, draft => {
        draft.cartedItems[key].quantity = quantityObj;
        draft.cartedItems[key].displayPrice = newDisplayPrice;
        if (state.paymentCartedItems.length !== 0) {
          draft.paymentCartedItems[key2] = newPaymentCartItem[0];
        }
      });
    case GET_PAYMENT_CARTED_ITEMS:
      return produce(state, draft => {
        draft.paymentCartedItems = [];
      });
    case FETCH_PAYMENT_CARTED_ITEMS:
      return produce(state, draft => {
        draft.paymentCartedItems = action.payload;
      });
    case DELETE_ALL_CARTED_ITEMS:
      return produce(state, draft => {
        draft.cartedItems = [];
      });
    default:
      return state;
  }
}
