import * as React from 'react';

import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './data/storage';
import App from './components';

import { enableLogger } from './data/reducers';

interface IProps {
  debug: boolean;
  app?: React.ComponentType;
}

export default ({ debug, app }: IProps) => {
  if (debug) {
    enableLogger();
  }

  return (
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <Route path='/' component={ app || App } />
      </ConnectedRouter>
    </Provider>
  );
};