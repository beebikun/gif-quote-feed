import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './data/storage';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

store.subscribe(() => console.log(store.getState()));

const Root = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(
  <Provider store={ store }>
    <Root />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
