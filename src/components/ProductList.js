import React from 'react';
import { Row, Col, Empty, Pagination } from 'antd';
import { ProductCard } from './ProductCard';
import { PageTitle } from './PageTitle';

function ProductList(props) {
  const itemList = props.data;
  const setCartFn = props.setCartFn;
  console.log(itemList);
  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="상품목록" />
        </Col>
      </Row>
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
