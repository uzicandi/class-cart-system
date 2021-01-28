import React from 'react';
import ProductListContainer from './containers/ProductListContainer';
import PagingListContainer from './containers/PagingListContainer';

function App() {
  return (
    <div>
      <ProductListContainer />
      <PagingListContainer />
    </div>
  );
}

export default App;
