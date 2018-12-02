import * as React from 'react';
import './index.css';

import Loader from 'components/Loader';

export interface IProps {
  height: number;
  src: string;
  width: number;
}

export interface IState {
  isLoading: boolean;
}

export default class LazyImg extends React.Component<IProps, IState> {
  public img = new Image();

  public state: IState = {
    isLoading: true,
  };

  public componentDidMount() {
    this.loadImg();
  }

  public componentWillUnmount() {
    this.clearImgOnload();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.src !== this.props.src) {
      this.loadImg();
    }
  }

  public render() {
    if (this.state.isLoading) {
      const size = { width: this.props.width + 'px', height: this.props.height + 'px' };

      return (
        <div className='LazyImg' style={ size }>
          <Loader dark={ true } />
        </div>
      );
    } else {
      return (
        <img className='LazyImg'
             width={ this.props.width } height={ this.props.height }
             src={ this.props.src }
             />
      );
    }

  }

  public clearImgOnload() {
    // tslint:disable-next-line:no-any
    (this.img as any).onload = undefined;
  }

  public loadImg() {
    this.setState({ isLoading: true });

    this.img.onload = () => {
      this.clearImgOnload();
      this.setState({ isLoading: false });
    };
    this.img.onerror = () => {
      this.clearImgOnload();
      console.log('ERROR', this.props.src);
    };
    // start lazy loading
    this.img.src = this.props.src;
  }
}
