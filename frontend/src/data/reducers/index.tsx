import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import itemsReducer from './items';
import loadingReducer from './loading';
import zlogger from './logger';


const rootReducer = (history: History) => combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  router: connectRouter(history),
  zlogger,
});

export default rootReducer;

export { enableLogger, disableLogger } from './logger';
export { IAsyncAction, RootState, RootActions } from './types';
