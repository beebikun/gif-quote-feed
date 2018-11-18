import * as React from 'react';

import './index.css';

export interface IProps {
  text: string;
}


export default function Text({ text }: IProps) {
  const textL = text.length;
  const textCls = textL > 150 ? 'Item__text--fz-sm' :
                  textL < 30  ? 'Item__text--fz-lg' : '';

  return (
    <div className={ 'Item__text ' + textCls} >
      { text }
    </div>
  );
}
