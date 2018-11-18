import * as React from 'react';
import * as records from 'data/records';

import LazyImg, { IProps as ILazeImgProps } from 'components/LazyImg';


export interface IProps {
  src: records.Gif;
}

export default function Img({ src }: IProps) {
  return (
    <div className='Item__img'>
      <LazyImg { ...src.toObject() as ILazeImgProps } />
    </div>
  );
}
