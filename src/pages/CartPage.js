import React from 'react';
import { Row, Col, Button, Divider } from 'antd';
import { PageTitle } from '../components/PageTitle';
import { CartTable } from '../components/CartTable';

function CartPage() {
  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="장바구니" />
        </Col>
      </Row>
      <Row style={{ marginBottom: 50 }}>
        <CartTable />
      </Row>
    </>
  );
}
export default CartPage;
