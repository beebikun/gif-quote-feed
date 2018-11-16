import * as React from 'react';
import { IGif } from 'api/giphy';

import LazyImg from 'components/LazyImg';


export interface IProps {
  src?: IGif;
}

export default function Img({ src }: IProps) {
  if (!src) return null;

  return (
    <div className='Item__img'>
      <LazyImg { ...src } />
    </div>
  );
}