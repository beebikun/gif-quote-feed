import * as records from 'data/records';
import * as random from 'data/actions/random';
import * as saved from 'data/actions/saved';

// import { Action } from 'redux';
// TODO: fix RootActions
// export type RootActions = { type: string, payload?: records.Item[] };
import { storageFromItems, replaceItem } from './utils';
const initialState = storageFromItems([]);
// tslint:disable-next-line:no-any
export type RootActions = any;
export default function Reducer(state = initialState, action: RootActions) {
  switch (action.type) {
    case random.CONSTANTS.FETCH_ITEMS.SUCCESS:
    case saved.CONSTANTS.FETCH_ITEMS.SUCCESS:
      const items: records.Item[] = action!.payload;

      return storageFromItems(items);

    case saved.CONSTANTS.SAVE_ITEM.SUCCESS:
    case saved.CONSTANTS.DELETE_ITEM.SUCCESS:
    case random.CONSTANTS.FETCH_GIF.SUCCESS:
      const item: records.Item = action!.payload;

      return replaceItem(state, item);

    default:
      return state;
  }
}
