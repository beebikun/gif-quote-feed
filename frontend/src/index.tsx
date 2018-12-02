import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';


import Provider from './provider';
ReactDOM.render(
  <Provider debug={ false } />,
  document.getElementById('root') as HTMLElement
);

import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
