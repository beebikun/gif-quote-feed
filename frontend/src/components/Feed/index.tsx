import * as React from 'react';
import api, { IQuote } from 'api/andruxnet';
import './index.css';

import Item, { IProps as ItemProps } from 'components/FeedItem';


export interface IState {
  items: ItemProps[];
}


export default class Feed extends React.Component<{}, IState> {
  public state = {
    items: [],
  };

  public fetch() {
    return api.get()
      .then((quotes: IQuote[]) => {
        const items: ItemProps[] = quotes.map(({ quote }: IQuote) => {
          return {
            text: quote,
          };
        });
        // this.setState({ items: (this.state.items as ItemProps[]).concat(items)  });
        this.setState({ items: [...this.state.items, ...items]  });
      });
  }

  public componentDidMount() {
    this.fetch();
  }

  public render() {
    return (
      <div className='Feed'>
        { this.state.items.map((props, i) => <Item key={i} { ...props } />) }
      </div>
    );
  }
}
