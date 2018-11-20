import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

interface IProps {
  title: string;
  to: string;
}

const activeStyle: React.CSSProperties = {
  color: 'red',
  fontWeight: 'bold',
};

export default function HeaderLink({ title, to }: IProps) {
  return (
    <NavLink
      to={ to }
      exact={ true }
      activeStyle={ activeStyle }
      >
      { title }
    </NavLink>
  );
}
