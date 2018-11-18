import * as React from 'react';

import HeaderLink from './HeaderLink';
import './index.css';

export default function Header() {
  return (
    <div className='Header'>
      <HeaderLink title='Random' />
      <HeaderLink title='Saved' />
    </div>
  );
}
