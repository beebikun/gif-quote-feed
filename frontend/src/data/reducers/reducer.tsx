import * as records from 'data/records';
import * as random from 'data/actions/random';

// import { Action } from 'redux';
// TODO: fix RootActions
// export type RootActions = { type: string, payload?: records.Item[] };
// tslint:disable-next-line:no-any
export type RootActions = any;
export default function Reducer(state = new records.ItemStorage(), action: RootActions) {
  switch (action.type) {
    case random.CONSTANTS.FETCH_ITEMS.SUCCESS:
      return state.set(action!.payload);

    default:
      return state;
  }
}
