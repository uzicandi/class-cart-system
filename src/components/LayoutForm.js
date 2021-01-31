import React from 'react';
import { Layout } from 'antd';
import { LayoutHeader } from './LayoutHeader';

export const LayoutForm = ({ children }) => {
  const { Header, Footer, Content } = Layout;
  return (
    <Layout style={LayoutStyle}>
      <Header style={HeaderStyle}>
        <LayoutHeader />
      </Header>
      <Content style={ContentStyle}>{children}</Content>
      <Footer style={FooterStyle}></Footer>
    </Layout>
  );
};

const LayoutStyle = {
  height: '100vh',
  overflow: 'hidden'
};
const HeaderStyle = {
  width: '100%',
  backgroundColor: '#000'
};

const ContentStyle = {
  padding: '1rem',
  width: '100%',
  margin: '0 auto',
  overflow: 'auto',
  backgroundColor: '#eee'
};

const FooterStyle = {
  backgroundColor: '#000',
  color: '#000',
  float: 'right'
};
