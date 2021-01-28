import React from 'react';
import { Row, Col, Empty, Pagination } from 'antd';
import { ProductCard } from './ProductCard';

function ProductList(props) {
  const itemList = props.data;
  const setCartFn = props.setCartFn;
  console.log(itemList);
  return (
    <>
      <Row>
        {itemList.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} onClick={setCartFn} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ProductList;
