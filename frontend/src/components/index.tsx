import * as React from 'react';
import Feed from './Feed';
import './index.css';

import API from 'api';
import Item from 'api/records/Item';
// import { IItemStorage } from 'api/records/ItemStorage';

export interface IState {
  items: Item[];
}


export default class App extends React.Component<{}, IState> {
  public state: IState = {
    items: [],
  };

  public componentDidMount() {
    this.fetch();
  }

  public fetch() {
    return API.randomItemsList()
      .then((items: Item[]) => {
        // this.setState({ items: (this.state.items as ItemProps[]).concat(items)  });
        this.setState({ items: [...this.state.items, ...items]  });
      });
  }

  public render() {
    return (
      <div className='App'>
        <Feed items={ this.state.items } />
      </div>
    );
  }
}
