import React from 'react';
import { Row, Col, Typography } from 'antd';

export const LayoutHeader = () => {
  const { Title } = Typography;
  return (
    <>
      <Row>
        {/* <Col xs={20} sm={12}>
          {isCartPage ? (
            <Title style={titleStyle}>장바구니</Title>
          ) : (
            <Title style={titleStyle}>상품목록</Title>
          )}
        </Col>
        <Col xs={4} sm={12} style={{ textAlign: 'right' }}>
          {isCartPage ? (
            <HeaderLinkButton
              to={PRODUCTS_LIST_PATH}
              icon={<AppstoreOutlined />}
              text="상품목록"
            />
          ) : (
            <HeaderLinkButton
              to={CART_PATH}
              icon={<ShoppingCartOutlined />}
              text="장바구니"
            />
          )}
        </Col> */}
      </Row>
    </>
  );
};
