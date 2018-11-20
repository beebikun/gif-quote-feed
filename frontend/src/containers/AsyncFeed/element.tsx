import * as React from 'react';

import * as records from 'data/records';
import { RootActions } from 'data/reducers';

import FeedItem from 'components/FeedItem';

export interface IOwnProps {
  fetch: () => RootActions;
}

interface IProps extends IOwnProps {
  items: records.Item[];
}


export default class AsyncFeed extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.fetch();
  }

  public render() {
    const { items } = this.props;

    return (
      <div className='Feed'>
        { items.map((item, i) => <FeedItem key={ i } item={ item } />) }
      </div>
    );
  }
}