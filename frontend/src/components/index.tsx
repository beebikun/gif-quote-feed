import * as React from 'react';
// import { Route, RouteComponentProps } from 'react-router-dom';

import Header from './Header';
import RoutedBody from 'containers/RoutedBody';


export default function App() {
  return (
    <div className='App'>
      <Header />
      <RoutedBody />
    </div>
  );
}
