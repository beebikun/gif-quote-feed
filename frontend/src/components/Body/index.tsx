import * as React from 'react';

import API from 'data/api';
import * as records from 'data/records';

import Feed from 'components/Feed';

export interface IState {
  storage: records.ItemStorage;
}

export default class Body extends React.Component<{}, IState> {
  public state: IState = {
    storage: new records.ItemStorage(),
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch() {
    return API.randomItemsList()
      .then((items: records.Item[]) => {
        const storage = this.state.storage.set(items);
        this.setState({ storage });
      });
  }

  public render() {
    const items: records.Item[] = this.state.storage.array();

    return (
      <Feed items={ items } />
    );
  }
}
