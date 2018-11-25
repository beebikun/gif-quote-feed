import { createAsyncAction } from 'typesafe-actions';
import * as records from 'data/records';
import CONSTANTS from './constants';

import { IStorageEntry, IStorageKey } from 'data/reducers/utils';

const fetchItemsAsync = createAsyncAction(
  CONSTANTS.FETCH_ITEMS.REQUEST,
  CONSTANTS.FETCH_ITEMS.SUCCESS,
  CONSTANTS.FETCH_ITEMS.ERROR,
);


const deleteItemAsync = createAsyncAction(
  CONSTANTS.DELETE_ITEM.REQUEST,
  CONSTANTS.DELETE_ITEM.SUCCESS,
  CONSTANTS.DELETE_ITEM.ERROR,
);


const saveItemAsync = createAsyncAction(
  CONSTANTS.SAVE_ITEM.REQUEST,
  CONSTANTS.SAVE_ITEM.SUCCESS,
  CONSTANTS.SAVE_ITEM.ERROR,
);


export default {
  deleteItem: deleteItemAsync<IStorageKey, IStorageEntry, Error>(),
  fetchItems: fetchItemsAsync<void, records.Item[], Error>(),
  saveItem: saveItemAsync<IStorageKey, IStorageEntry, Error>(),
};

