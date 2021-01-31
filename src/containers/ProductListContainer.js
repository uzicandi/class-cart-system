import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/modules/products';
import ProductList from '../components/ProductList';
import { storageService } from '../services/storageService';
import { InfoModal } from '../components/InfoModal';
import { LoadingSpin } from '../components/LoadingSpin';

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
  }, [setCartItems]);

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
        InfoModal('warning', '장바구니에는 3개 이상 담을 수 없습니다.');
      } else {
        cartItems.push(id);
        storageService.setItem('carted-item', JSON.stringify([...cartItems]));
      }
    },
    [cartItems, setCartItems]
  );

  if (loading) return <LoadingSpin />;
  if (error) return <LoadingSpin />;
  if (!data) return <LoadingSpin />;
  return <ProductList data={data} setCartFn={handleProductCardClick} />;
}

export default ProductListContainer;
