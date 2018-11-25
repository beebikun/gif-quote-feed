import { combineReducers } from 'redux';
import itemsReducer from './reducer';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;

import { StateType } from 'typesafe-actions';
export type RootState = StateType<typeof rootReducer>;
export { RootActions, IAsyncAction } from './types';
