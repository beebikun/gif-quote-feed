import * as React from 'react';

import * as records from 'data/records';

import Background from './Background';
import ButtonsGroup from './Buttons';
import Img from './Img';
import Text from './Text';

import './index.css';

export interface IProps {
  item: records.Item;
}


export default function FeedItem({ item }: IProps) {
  return (
    <Background>
      <Img src={ item.gif } />

      <ButtonsGroup itemId={ item.id } />

      <Text text={ item.text } />
    </Background>
  );
}
