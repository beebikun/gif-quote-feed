import { Store, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { History } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import createRootReducer, { RootState, RootActions } from '../reducers';
import rootEpic from '../epics';
import services from '../services';

export default function configureStore(history: History,
                                       initialState?: RootState): Store<RootState, RootActions> {
  const epicMiddleware = createEpicMiddleware({dependencies : services});
  const routerMiddleware = createRouterMiddleware(history);

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
    middlewares,
  );
  epicMiddleware.run(rootEpic);

  return store;
}
