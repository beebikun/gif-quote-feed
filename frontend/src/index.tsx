import 'purecss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

// import rootReducer from './reducers';
import App from './components';
import registerServiceWorker from './registerServiceWorker';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });


ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

// const store = createStore(rootReducer);

// store.subscribe(() => console.log(store.getState()));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root') as HTMLElement
// );
registerServiceWorker();
