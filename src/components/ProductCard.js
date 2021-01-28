import React, { useState, useCallback, useEffect } from 'react';
import { Card, Tooltip } from 'antd';
import { PriceLabel } from './PriceLabel';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { storageService } from '../services/storageService';

export const ProductCard = props => {
  const { id, title, coverImage, price } = props.product;
  const { Meta } = Card;
  const { onClick } = props;
  const [carted, setCarted] = useState(false);

  useEffect(() => {
    // 로딩 시 담기/빼기 표시용
    if (storageService.checkCart(id)) {
      setCarted(true);
    }
  }, [onClick]);

  const handleIconClick = useCallback(
    id => {
      onClick(id);
      if (storageService.checkCart(id)) {
        // cart에 있을때
        setCarted(true);
      } else {
        // cart에 없을때
        setCarted(false);
      }
    },
    [onClick]
  );

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
        <span
          onClick={() => handleIconClick(id)}
          style={carted ? { color: '#1890ff', fontWeight: 'bold' } : {}}
        >
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
