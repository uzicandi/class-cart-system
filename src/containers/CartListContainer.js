import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { getCartedItemsId, getCartedItems } from '../store/modules/products';
import { storageService } from '../services/storageService';
import { shallowEqual } from '@babel/types';

function CartListContainer() {
  const all_products = useSelector(state => state.products.all_products.data);
  const dispatch = useDispatch();

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

  return <CartPage />;
}

export default CartListContainer;
