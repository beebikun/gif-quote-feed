import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
