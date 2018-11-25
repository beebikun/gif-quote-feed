import * as React from 'react';
import './index.css';
import loader from './loader.gif';

export interface IProps {
  height: number;
  src: string;
  width: number;
}

export const defaultParams: IProps = {
  height: 200,
  src: process.env.NODE_ENV === 'test' ? 'default' : loader,
  width: 200,
};

export default class LazyImg extends React.Component<IProps, IProps> {
  public img = new Image();

  public state: IProps = {
    ...defaultParams
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
    return (
      <img className='LazyImg'
           width={ this.state.width } height={ this.state.height }
           src={ this.state.src }
           />
    );
  }

  public clearImgOnload() {
    // tslint:disable-next-line:no-any
    (this.img as any).onload = undefined;
  }

  public loadImg() {
    const { height, src, width } = this.props;
    this.setState({ ...defaultParams, height: width, width });

    this.img.onload = () => {
      this.clearImgOnload();
      this.setState({ height, src, width });
    };
    this.img.onerror = () => {
      this.clearImgOnload();
      console.log('ERROR', src);
    };
    this.img.src = src;
  }
}
