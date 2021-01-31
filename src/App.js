import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import { PRODUCTS_LIST_PATH } from './routes/const';
import { CART_PATH } from './routes/const';
import CartListContainer from './containers/CartListContainer';

function App() {
  return (
    <div>
      <Route
        path="/"
        render={() => {
          return <Redirect to={PRODUCTS_LIST_PATH} />;
        }}
      />
      <Route path={PRODUCTS_LIST_PATH} component={ProductPage} />
      <Route path={CART_PATH} component={CartListContainer} />
    </div>
  );
}

export default App;
