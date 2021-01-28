import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PagingList from '../components/PagingList';
import {
  getProducts,
  getAllProducts,
  setCurrentPage
} from '../store/modules/products';

function PagingListContainer() {
  const { data, loading, error } = useSelector(
    state => state.products.all_products
  );
  const current_page = useSelector(state => state.products.current_page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const onSetCurrentPage = page => {
    dispatch(getProducts(page));
    dispatch(setCurrentPage(page));
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <PagingList
      total={data.length}
      currentPage={current_page}
      onSetCurrentPage={onSetCurrentPage}
    ></PagingList>
  );
}

export default PagingListContainer;
