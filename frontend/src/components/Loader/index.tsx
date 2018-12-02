import * as React from 'react';

import './index.css';

interface IProps {
  dark?: boolean;
}

export const CLASSES = {
  dark: 'lds-ripple-container--dark',
};

export default function Loader({ dark }: IProps) {
  const classes = [
    'lds-ripple-container',
    dark ? CLASSES.dark : '',
  ];

  return (
    <div className={ classes.join(' ') }>
      <div className='lds-ripple' />
    </div>
  );
}
