import { Store, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { History } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer, { RootState, RootActions } from '../reducers';
import rootEpic from '../epics';
import services from '../services';

export default function configureStore(history: History,
                                       initialState?: RootState): Store<RootState, RootActions> {
  const epicMiddleware = createEpicMiddleware({dependencies : services});
  const routerMiddleware = createRouterMiddleware(history);

  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});
  // configure middlewares
  const middlewares = applyMiddleware(
    epicMiddleware,
    routerMiddleware,
  );

  const rootReducer = createRootReducer(history);

  // create store
  const store = createStore(
    rootReducer,
    initialState!,
    composeEnhancers(middlewares),
  );
  epicMiddleware.run(rootEpic);

  return store;
}
