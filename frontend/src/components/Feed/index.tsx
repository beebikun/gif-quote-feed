import * as React from 'react';
import { RootActions } from 'data/reducers';
import { IStorageEntry } from 'data/reducers/utils';
import FeedItem from 'components/FeedItem';


export interface IProps {
  fetch: () => RootActions;
  items: IStorageEntry[];
}


export default class Feed extends React.Component<IProps, {}> {
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