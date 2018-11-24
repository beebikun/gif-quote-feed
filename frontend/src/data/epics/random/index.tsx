import { combineEpics } from 'redux-observable';
import { fetchItemsFlow, fetchGifFlow } from './epics';

export default combineEpics(fetchItemsFlow, fetchGifFlow);
