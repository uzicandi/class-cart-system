import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Descriptions, Radio } from 'antd';
import { PriceLabel } from './PriceLabel';
import { getAllCoupons } from '../store/modules/coupons';

export const CartFinalPriceTable = () => {
  const all_coupons = useSelector(state => state.coupons.all_coupons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  return (
    <>
      <Radio.Group buttonStyle="solid" style={{ margin: '25px 50px 0 60px' }}>
        <Radio value={'unApplied'}>쿠폰 미적용</Radio>
        <Radio value={''}>title1</Radio>
        <Radio value={''}>title2</Radio>
      </Radio.Group>
      <Descriptions bordered style={{ margin: '10px 50px 0 50px' }}>
        <Descriptions.Item label="총 상품 금액" span={2}>
          <PriceLabel value={'price'} />
        </Descriptions.Item>
        <Descriptions.Item label="상품 할인 금액">
          <PriceLabel value={'discountPrice'} />
        </Descriptions.Item>
        <Descriptions.Item label="상품 할인 금액" span={3}>
          <PriceLabel value={'totaldiscountPrice'} large={true} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
