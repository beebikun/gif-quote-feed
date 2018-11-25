import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import store from './data/storage';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const RoutedApp = () => (
  <Router >
    <Route path='/' component={ App } />
  </Router>
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
