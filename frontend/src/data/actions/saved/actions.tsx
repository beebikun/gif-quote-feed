import { createAsyncAction } from 'typesafe-actions';
import * as records from 'data/records';
import CONSTANTS from './constants';

const fetchItemsAsync = createAsyncAction(
  CONSTANTS.FETCH_ITEMS.REQUEST,
  CONSTANTS.FETCH_ITEMS.SUCCESS,
  CONSTANTS.FETCH_ITEMS.ERROR,
);


export default {
  fetchItems: fetchItemsAsync<void, records.Item[], Error>(),
};