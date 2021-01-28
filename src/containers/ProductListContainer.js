import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/modules/products';
import ProductList from '../components/ProductList';

function ProductListContainer() {
  const { data, loading, error } = useSelector(
    state => state.products.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    console.log(data);
  }, [dispatch]);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>123</div>;
  return (
    <ProductList
      data={data}
      total={12}
      //pageChange={pageChange}
    />
  );
}

export default ProductListContainer;
