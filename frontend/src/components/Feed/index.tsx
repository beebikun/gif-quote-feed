import * as React from 'react';

import * as records from 'data/records';

import FeedItem from 'components/FeedItem';


export interface IProps {
  items: records.Item[];
}


export default function Feed({ items }: IProps) {
  return (
    <div className='Feed'>
      { items.map((item, i) => <FeedItem key={ i } item={ item } />) }
    </div>
  );
}
