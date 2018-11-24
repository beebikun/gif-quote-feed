import { createAsyncAction } from 'typesafe-actions';
import * as records from 'data/records';
import CONSTANTS from './constants';
import { IStorageEntry, IStorageKey } from 'data/reducers/utils';

const fetchItemsAsync = createAsyncAction(
  CONSTANTS.FETCH_ITEMS.REQUEST,
  CONSTANTS.FETCH_ITEMS.SUCCESS,
  CONSTANTS.FETCH_ITEMS.ERROR,
);


const fetchGifAsync = createAsyncAction(
  CONSTANTS.FETCH_GIF.REQUEST,
  CONSTANTS.FETCH_GIF.SUCCESS,
  CONSTANTS.FETCH_GIF.ERROR,
);


export default {
  fetchItems: fetchItemsAsync<void, records.Item[], Error>(),
  fetchGif: fetchGifAsync<IStorageKey, IStorageEntry, Error>(),
};