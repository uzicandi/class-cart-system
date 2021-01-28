import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';

export const NavLinkIconButton = props => {
  const { to, icon, text } = props;
  return (
    <NavLink to={to}>
      <Button icon={icon}>
        <Text strong={true}>{text}</Text>
      </Button>
    </NavLink>
  );
};
