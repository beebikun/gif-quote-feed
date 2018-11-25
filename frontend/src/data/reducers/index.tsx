import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import itemsReducer from './reducer';


const rootReducer = (history: History) => combineReducers({
  items: itemsReducer,
  router: connectRouter(history),
});

export default rootReducer;


export { IAsyncAction, RootState, RootActions } from './types';
