import * as React from 'react';
import Feed from './Feed';
import './index.css';

import API from 'api';
import Item from 'api/records/Item';
import ItemStorage from 'api/records/ItemStorage';

export interface IState {
  storage: ItemStorage;
}


export default class App extends React.Component<{}, IState> {
  public state: IState = {
    storage: new ItemStorage(),
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch() {
    return API.randomItemsList()
      .then((items: Item[]) => {
        const storage = this.state.storage.set(items);
        this.setState({ storage });
      });
  }

  public render() {
    const items: Item[] = this.state.storage.array();

    return (
      <div className='App'>
        <Feed items={ items } />
      </div>
    );
  }
}
