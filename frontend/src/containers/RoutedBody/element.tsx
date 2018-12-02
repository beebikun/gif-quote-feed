import * as React from 'react';
import { Location } from 'history';
import { Route, Redirect, Switch } from 'react-router-dom';

import RandomFeed from 'containers/RandomFeed';
import SavedFeed from 'containers/SavedFeed';

export interface IProps {
  location: Location;
}


export default function RoutedBody(props: IProps) {
  return (
    <Switch>
      <Route exact={ true } path='/' component={ RandomFeed } />
      <Route exact={ true } path='/saved' component={ SavedFeed } />
      <Redirect to='/' />
    </Switch>
  );
}
