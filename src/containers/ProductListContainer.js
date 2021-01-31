import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/modules/products';
import ProductList from '../components/ProductList';
import { storageService } from '../services/storageService';

function ProductListContainer() {
  const [cartItems, setCartItems] = useState([]);
  const { data, loading, error } = useSelector(
    state => state.products.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (storageService.getItem('carted-item')) {
      setCartItems(JSON.parse(storageService.getItem('carted-item')));
    }
  }, [setCartItems, storageService.setItem]);

  const handleProductCardClick = useCallback(
    id => {
      // 카드 클릭시 localstorage에 setItem
      if (cartItems.includes(id)) {
        // cartItems에 해당 아이템이 있을 때 그 아이템 제외하고 넣기
        storageService.setItem(
          'carted-item',
          JSON.stringify([...cartItems.filter(value => value !== id)])
        );
        setCartItems([...cartItems.filter(value => value !== id)]);
      } else if (cartItems.length >= 3) {
        console.log('modal alert'); // infoModal
      } else {
        cartItems.push(id);
        storageService.setItem('carted-item', JSON.stringify([...cartItems]));
      }
    },
    [cartItems, setCartItems, storageService.setItem, storageService.getItem]
  );

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>123</div>;
  return <ProductList data={data} setCartFn={handleProductCardClick} />;
}

export default ProductListContainer;
