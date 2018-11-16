import * as React from 'react';
import api, { Gif } from 'api/giphy';

import './index.css';

import Background from './Background';
import Buttons from './Buttons';
import Img from './Img';
import Text from './Text';

export interface IProps {
  gif: Gif;
  id: string;
  text: string;
}

export interface IState {
  gif?: Gif;
}


export default class Item extends React.Component<IProps, IState> {
  public state = {
    gif: undefined,
  };

  public toggleSaved() {
    Store.save({}); 
  }

  public fetch() {
    api.random()
      .then((gif: IGif) => {
        this.setState({ gif });
      });
  }

  public componentDidMount() {
    if (this.props.gif === undefined) {
      this.fetch();
    }
  }

  public render() {
    return (
      <Background>
        <Img src={ this.props.gif || this.state.gif } />

        <Buttons id={ this.props.id } />

        <Text text={ this.props.text } />
      </Background>
    );
  }
}