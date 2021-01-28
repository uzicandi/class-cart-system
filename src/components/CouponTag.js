import React from 'react';
import { Tag, Icon, Tooltip } from 'antd';

export const CouponTag = props => {
  const { label, color, tooltip } = props;
  return (
    <Tooltip title={tooltip} placement="bottom">
      <Tag color={color}>{label}</Tag>
    </Tooltip>
  );
};
