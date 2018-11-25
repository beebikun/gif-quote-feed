import * as records from 'data/records';
import * as random from 'data/actions/random';
import * as saved from 'data/actions/saved';

import { storageFromItems, replaceItem, IStorage, IStorageEntry } from './utils';
import { RootActions } from './types';

const initialState: IStorage = storageFromItems([]);
export default function Reducer(state = initialState, action: RootActions) {
  switch (action.type) {
    case random.CONSTANTS.FETCH_ITEMS.SUCCESS:
    case saved.CONSTANTS.FETCH_ITEMS.SUCCESS:
      const items: records.Item[] = action!.payload;

      return storageFromItems(items);

    case saved.CONSTANTS.SAVE_ITEM.SUCCESS:
    case saved.CONSTANTS.DELETE_ITEM.SUCCESS:
    case random.CONSTANTS.FETCH_GIF.SUCCESS:
      const item: IStorageEntry = action!.payload;

      return replaceItem(state, item);

    default:
      return state;
  }
}
