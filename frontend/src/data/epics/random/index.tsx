import { combineEpics } from 'redux-observable';
import { fetchItemsFlow } from './epics';

export default combineEpics(fetchItemsFlow);
