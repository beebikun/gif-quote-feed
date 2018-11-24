import * as React from 'react';

import * as records from 'data/records';
import { RootActions } from 'data/reducers';
import { IStorageEntry } from 'data/reducers/utils';
import FeedItem from 'components/FeedItem';


interface IProps {
  fetch: () => RootActions;
  items: IStorageEntry[];
}


export default class AsyncFeed extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.fetch();
  }

  public render() {
    const { items } = this.props;

    return (
      <div className='Feed'>
        { items.map(([key, item]) => <FeedItem key={ key } storageKey={ key } item={ item } />) }
      </div>
    );
  }
}