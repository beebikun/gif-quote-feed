import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { RootActions } from 'data/reducers';
import AsyncFeed from 'containers/AsyncFeed';

export interface IProps {
  fetchRandom: () => RootActions;
  fetchSaved: () => RootActions;
}

export default function RoutedBody({ fetchRandom, fetchSaved }: IProps) {
  const RandomFeed = () => <AsyncFeed fetch={ fetchRandom } />;
  const SavedFeed = () => <AsyncFeed fetch={ fetchSaved } />;

  return (
    <Switch>
      <Route exact={ true } path='/' component={ RandomFeed } />
      <Route exact={ true } path='/saved' component={ SavedFeed } />
      <Redirect to='/' />
    </Switch>
  );
}
