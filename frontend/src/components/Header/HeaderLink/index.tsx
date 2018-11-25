import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

interface IProps {
  title: string;
  to: string;
}

export default function HeaderLink({ title, to }: IProps) {
  return (
    <NavLink
      to={ to }
      exact={ true }
      activeClassName='HeaderLink--active'
      className='HeaderLink'
      >
      { title }
    </NavLink>
  );
}
