import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import rootEpic from '../epics';
import services from '../services';

export const epicMiddleware = createEpicMiddleware({dependencies : services});

export default function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = applyMiddleware(epicMiddleware);
  // // compose enhancers
  // const enhancer = composeEnhancers(middlewares);

  // create store
  const store = createStore(rootReducer, initialState!, middlewares);
  epicMiddleware.run(rootEpic);

  return store;
}
