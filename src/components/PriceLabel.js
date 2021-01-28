import React from 'react';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/skeleton/Title';

/**
 * @description 가격 표시 Label
 * @param value 가격
 * @param [strong=false] 가격만 굵게 표시
 * @param [large=false] 최종 금액 표시용(빨간 가격)
 */

export const PriceLabel = props => {
  const { value, strong = false, large = false } = props;
  if (large) {
    return (
      <>
        <Title level={2} type="danger">
          {`${value}`}
          <small style={{ marginLeft: 3 }}>원</small>
        </Title>
      </>
    );
  }
  return (
    <>
      <Text strong={strong}>{`${value}`}</Text>
      <Text style={{ marginLeft: 2 }}>원</Text>
    </>
  );
};
