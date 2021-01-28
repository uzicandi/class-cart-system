import React from 'react';
import { Button, Table, InputNumber, Tag } from 'antd';
import { PriceLabel } from './PriceLabel';
import { CouponTag } from './CouponTag';

export const CartTable = props => {
  const dataSource = [];
  const columns = [
    {
      title: '상품 제목',
      dataIndex: 'title',
      align: 'center',
      width: '50%'
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      align: 'center',
      value: InputNumber,
      render: quentity => (
        <InputNumber style={{ width: '65px' }} min={1} defaultValue={1} />
      )
    },
    {
      title: '가격',
      dataIndex: 'displayPrice',
      align: 'center',
      render: displayPrice => <PriceLabel value={displayPrice} strong={true} />
    },
    {
      title: '쿠폰 적용',
      dataIndex: 'availableCoupon',
      align: 'center',
      render: availableCoupon =>
        availableCoupon === undefined ? (
          <CouponTag
            label="가능"
            tooltip="아래 쿠폰 선택시 자동 적용됩니다"
            color="#108ee9"
          />
        ) : (
          <Tag>불가능</Tag>
        )
    }
  ];
  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>선택상품 0개</span>
        <Button>장바구니 비우기</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </>
  );
};
