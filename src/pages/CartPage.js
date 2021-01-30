import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Divider } from 'antd';
import { PageTitle } from '../components/PageTitle';
import { CartTable } from '../components/CartTable';
import { getCartedItemsEdit, getCartedItems } from '../store/modules/products';
import { storageService } from '../services/storageService';
function CartPage(props) {
  const { cartedItems } = props;
  const dispatch = useDispatch();
  const inputNumberChange = useCallback(
    (id, quantity) => {
      dispatch(getCartedItemsEdit({ id, quantity }));
    },
    [dispatch]
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <PageTitle title="장바구니" />
        </Col>
      </Row>
      <Row style={{ marginBottom: 50 }}>
        <CartTable
          dataSource={cartedItems}
          inputNumberChange={inputNumberChange}
        />
      </Row>
      <Row>
        <Divider orientation="left">최종 결제 금액</Divider>
      </Row>
    </>
  );
}
export default CartPage;
