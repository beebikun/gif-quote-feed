import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './data/storage';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const RoutedApp = () => (
  <ConnectedRouter history={ history }>
    <Route path='/' component={ App } />
  </ConnectedRouter>
);

const Root = () => (
  <Provider store={ store }>
    <RoutedApp />
  </Provider>
);


ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
