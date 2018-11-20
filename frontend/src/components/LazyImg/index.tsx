import * as React from 'react';
import './index.css';

export interface IProps {
  src: string;
  width: number;
  height: number;
}

// interface State {
//   // src: string;
// }
// TODO: make me lazy
export default class LazyImg extends React.Component<IProps, {}> {
  public state = {
    // src: '',
  };

  public render() {
    return (
      <img src={ this.props.src } className='LazyImg' />
    );
  }
}
