import React from 'react';
import ProductListContainer from '../containers/ProductListContainer';
import PagingListContainer from '../containers/PagingListContainer';

function ProductPage() {
  return (
    <div>
      <ProductListContainer />
      <PagingListContainer />
    </div>
  );
}
export default ProductPage;
