import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { PriceLabel } from './PriceLabel';
import { ShoppingCartOutlined } from '@ant-design/icons';

export const ProductCard = props => {
  const { id, title, coverImage, price } = props.product;
  const { Meta } = Card;
  const [carted, setCarted] = useState(false);
  return (
    <Card
      style={{ width: 300, margin: 10 }}
      cover={
        <div style={{ overflow: 'hidden', width: 300, height: 180 }}>
          <img alt={title} src={coverImage} />
        </div>
      }
      actions={[
        <span>
          <PriceLabel value={price} strong={true} />
        </span>,
        <span style={carted ? { color: '#1890ff', fontWeight: 'bold' } : {}}>
          <ShoppingCartOutlined style={{ marginRight: '4px' }} />
          {carted ? '빼기' : '담기'}
        </span>
      ]}
    >
      <Tooltip placement="bottom" title={title}>
        <Meta title={title} />
      </Tooltip>
    </Card>
  );
};
