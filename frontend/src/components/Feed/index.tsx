import * as React from 'react';

import Item from 'api/records/Item';

import FeedItem from 'components/FeedItem';


export interface IProps {
  items: Item[];
}


export default function Feed({ items }: IProps) {
  return (
    <div className='Feed'>
      { items.map((item, i) => <FeedItem key={ i } item={ item } />) }
    </div>
  );
}
