import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PagingList from '../components/PagingList';
import {
  getProducts,
  getAllProducts,
  setCurrentPage
} from '../store/modules/products';
import { LoadingSpin } from '../components/LoadingSpin';

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

  if (loading) return <LoadingSpin />;
  if (!data) return <LoadingSpin />;

  return (
    <PagingList
      total={data.length}
      currentPage={current_page}
      onSetCurrentPage={onSetCurrentPage}
    ></PagingList>
  );
}

export default PagingListContainer;
