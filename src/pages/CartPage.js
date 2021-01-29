import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Divider } from 'antd';
import { PageTitle } from '../components/PageTitle';
import { CartTable } from '../components/CartTable';

function CartPage(props) {
  const cartedItems = useSelector(state => state.products.cartedItems);
  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="장바구니" />
        </Col>
      </Row>
      <Row style={{ marginBottom: 50 }}>
        <CartTable dataSource={cartedItems} />
      </Row>
      <Row>
        <Divider orientation="left">최종 결제 금액</Divider>
      </Row>
    </>
  );
}
export default CartPage;
