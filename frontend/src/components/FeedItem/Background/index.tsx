import * as React from 'react';
import { getRandomColor } from 'utils';

export interface IProps {
  children: React.ReactNode;
}


export default function Background({ children }: IProps) {
  return (
    <div className='Item' style={ { backgroundColor: getRandomColor() } } >
      <div className='Item__content'>
        { children }
      </div>
    </div>
  );
}
