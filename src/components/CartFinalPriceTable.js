import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Descriptions, Radio } from 'antd';
import { PriceLabel } from './PriceLabel';
import { getAllCoupons } from '../store/modules/coupons';

export const CartFinalPriceTable = () => {
  const all_coupons = useSelector(state => state.coupons.all_coupons.data);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [defaultChecked, setDefaultChecked] = useState('unApplied');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const radioDiscountChange = useCallback(e => {
    setDefaultChecked(e.target.value);
  }, []);

  return (
    <>
      {all_coupons ? (
        <Radio.Group
          value={defaultChecked}
          buttonStyle="solid"
          style={{ margin: '25px 50px 0 60px' }}
          onChange={radioDiscountChange}
        >
          <Radio value={'unApplied'}>쿠폰 미적용</Radio>
          {all_coupons.map(coupon => (
            <Radio value={coupon.type}>{coupon.title}</Radio>
          ))}
        </Radio.Group>
      ) : (
        ''
      )}
      <Descriptions bordered style={{ margin: '10px 50px 0 50px' }}>
        <Descriptions.Item label="총 상품 금액" span={2}>
          <PriceLabel value={'price'} />
        </Descriptions.Item>
        <Descriptions.Item label="상품 할인 금액">
          <PriceLabel value={discountPrice} />
        </Descriptions.Item>
        <Descriptions.Item label="최종 가격" span={3}>
          <PriceLabel value={'totaldiscountPrice'} large={true} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
