import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { getCartedItems } from '../store/modules/products';
import { storageService } from '../services/storageService';

function CartListContainer() {
  const dispatch = useDispatch();
  const all_products = useSelector(state => state.products.all_products.data);
  const cartedItems = useSelector(state => state.products.cartedItems);

  useEffect(() => {
    if (storageService.getItem('carted-item')) {
      dispatch(
        getCartedItems(
          JSON.parse(storageService.getItem('carted-item')),
          all_products
        )
      );
    }
  }, [storageService.setItem]);

  return <CartPage cartedItems={cartedItems} />;
}

export default CartListContainer;
