import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { getCartedItems, fetchPaymentCartedItems } from '../store/modules/cart';
import { storageService } from '../services/storageService';

function CartListContainer() {
  const dispatch = useDispatch();
  const all_products = useSelector(state => state.products.all_products.data);
  const cartedItems = useSelector(state => state.cart.cartedItems);

  useEffect(() => {
    if (storageService.getItem('carted-item')) {
      dispatch(
        getCartedItems(
          JSON.parse(storageService.getItem('carted-item')),
          all_products
        )
      );
      dispatch(fetchPaymentCartedItems({ ids: [] }));
    }
  }, [all_products, dispatch]);

  return <CartPage cartedItems={cartedItems} />;
}

export default CartListContainer;
