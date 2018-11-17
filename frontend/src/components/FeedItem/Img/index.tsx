import * as React from 'react';
import Gif from 'api/records/Gif';

import LazyImg, { IProps as ILazeImgProps } from 'components/LazyImg';


export interface IProps {
  src: Gif;
}

export default function Img({ src }: IProps) {
  return (
    <div className='Item__img'>
      <LazyImg { ...src.toObject() as ILazeImgProps } />
    </div>
  );
}