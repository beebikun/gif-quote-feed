import { combineEpics } from 'redux-observable';
import { fetchItemsFlow, saveItemFlow, deleteItemFlow } from './epics';

export default combineEpics(
  deleteItemFlow,
  fetchItemsFlow,
  saveItemFlow,
);
