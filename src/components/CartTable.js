import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, InputNumber, Tag } from 'antd';
import { PriceLabel } from './PriceLabel';
import { CouponTag } from './CouponTag';
import { postPaymentCartedItems } from '../store/modules/products';

export const CartTable = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { dataSource, inputNumberChange } = props;
  // const {paymentDataSource, recommend} = useSelector(finalPaymentSelector);

  const dispatch = useDispatch();

  const handleSelectChange = useCallback(
    // checkbox 선택
    (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      // 최종결제 금액에 추가하는 함수
      dispatch(postPaymentCartedItems(selectedRowKeys, selectedRows));
    },

    [setSelectedRowKeys, selectedRowKeys]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange
  };

  const handleInputNumberChange = useCallback(
    (id, quantity) => {
      inputNumberChange(id, quantity);
    },
    [inputNumberChange]
  );

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
      render: quantity => (
        <InputNumber
          style={{ width: '65px' }}
          min={1}
          defaultValue={quantity.quantity}
          onChange={num => handleInputNumberChange(quantity.id, num)}
        />
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
        <span style={{ marginRight: 10 }}>
          {selectedRowKeys.length > 0
            ? `선택 상품(${selectedRowKeys.length}개)`
            : '선택 상품(0개)'}
        </span>
        <Button>장바구니 비우기</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};
