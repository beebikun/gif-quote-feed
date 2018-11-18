import * as React from 'react';
import './index.css';

interface IProps {
  title: string;
}

export default function HeaderLink({ title }: IProps) {
  return (
    <div className='HeaderLink'>
      { title }
    </div>
  );
}
