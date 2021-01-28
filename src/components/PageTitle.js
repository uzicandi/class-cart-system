import React from 'react';
import Title from 'antd/lib/typography/Title';

export const PageTitle = props => {
  const { title } = props;
  return <Title level={2}>| {title}</Title>;
};
