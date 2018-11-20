import * as React from 'react';

import HeaderLink from './HeaderLink';
import './index.css';

export default function Header() {
  return (
    <div className='Header'>
      <HeaderLink title='Random' to='/' />
      <HeaderLink title='Saved' to='/saved' />
      <HeaderLink title='NotExists' to='/NotExists' />
    </div>
  );
}
