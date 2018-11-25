import * as React from 'react';
import { getRandomColor } from 'utils';

export interface IProps {
  children: React.ReactNode;
}

export default class Background extends React.Component<IProps, {}> {
  private bg: string;

  public constructor(props: IProps) {
    super(props);
    this.bg = getRandomColor();
  }

  public render() {
    return (
      <div className='Item' style={ { backgroundColor: this.bg } } >
        <div className='Item__content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
