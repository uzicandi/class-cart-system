import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { PageTitle } from '../components/PageTitle';
import { CartTable } from '../components/CartTable';
import { getCartedItemsEdit } from '../store/modules/products';
import { CartFinalPriceTable } from '../components/CartFinalPriceTable';
import { paymentTableSelector } from '../store/selector';

function CartPage(props) {
  const { cartedItems } = props;
  //const { paymentDataSource, recommend } = useSelector(paymentTableSelector);

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
      <Row style={{ marginBottom: 50 }} justify="center">
        <Col span={20}>
          <CartTable
            dataSource={cartedItems}
            inputNumberChange={inputNumberChange}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Divider orientation="left">최종 결제 금액</Divider>
          <CartFinalPriceTable />
        </Col>
      </Row>
    </>
  );
}
export default CartPage;
