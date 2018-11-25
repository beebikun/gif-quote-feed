import * as React from 'react';

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
