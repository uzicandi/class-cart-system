import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { getCartedItemsId } from '../store/modules/products';

function CartListContainer() {
  const cartedItemsId = useSelector(state => state.products.cartedItemsId);
  const all_products = useSelector(state => state.products.all_products.data);
  const [cartedItems, setCartedItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartedItemsId());
  }, dispatch);
  //   if (cartedItemsId && all_products) {
  //     for (let i = 0; i < all_products.length; i++) {
  //       if (cartedItemsId[i] === all_products[i].id) {
  //         cartedItems.push(all_products[i]);
  //         //setCartedItems(cartedItems);
  //       }
  //     }
  //     console.log('cartedItems', cartedItems);
  //   }
  return <CartPage />;
}

export default CartListContainer;
