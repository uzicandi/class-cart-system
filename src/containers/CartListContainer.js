import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { getCartedItemsId, getCartedItems } from '../store/modules/products';

function CartListContainer() {
  const cartedItemsId = useSelector(state => state.products.cartedItemsId);
  const all_products = useSelector(state => state.products.all_products.data);
  //const [cartedItems, setCartedItems] = useState([]);
  let cartedItems = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartedItemsId());
    dispatch(getCartedItems(cartedItemsId, all_products));
  }, [dispatch]);

  return <CartPage />;
}

export default CartListContainer;
