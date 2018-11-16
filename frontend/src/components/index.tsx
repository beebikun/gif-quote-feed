import * as React from 'react';
import Feed from './Feed';
import './index.css';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='App'>
        <Feed />
      </div>
    );
  }
}
