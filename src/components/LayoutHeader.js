import React from 'react';
import { Row, Col, Typography } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { PRODUCTS_LIST_PATH } from '../routes/const';
import { CART_PATH } from '../routes/const';
import { NavLinkIconButton } from './NavLinkIconButton';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { AppstoreOutlined } from '@ant-design/icons';

export const LayoutHeader = () => {
  const { Title } = Typography;
  const location = useLocation();
  const isCartedPage = location.pathname === CART_PATH;
  return (
    <>
      <Row>
        <Col xs={20} sm={12}>
          <NavLink to={PRODUCTS_LIST_PATH}>
            <Title style={titleStyle}>SHOP</Title>
          </NavLink>
        </Col>
        <Col xs={4} sm={12} style={{ textAlign: 'right' }}>
          {isCartedPage ? (
            <NavLinkIconButton
              to={PRODUCTS_LIST_PATH}
              icon={<AppstoreOutlined />}
              text="상품목록"
            />
          ) : (
            <NavLinkIconButton
              to={CART_PATH}
              icon={<ShoppingCartOutlined />}
              text="장바구니"
            />
          )}
        </Col>
      </Row>
    </>
  );
};

const titleStyle = {
  color: '#fff',
  verticalAlign: 'center',
  marginTop: '7px'
};
