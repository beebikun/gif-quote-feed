import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import itemsReducer from './items';
import zlogger from './logger';


const rootReducer = (history: History) => combineReducers({
  items: itemsReducer,
  router: connectRouter(history),
  zlogger,
});

export default rootReducer;

export { enableLogger, disableLogger } from './logger';
export { IAsyncAction, RootState, RootActions } from './types';
