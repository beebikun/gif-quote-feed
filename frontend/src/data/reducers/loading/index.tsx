import * as random from 'data/actions/random';
import * as saved from 'data/actions/saved';

import { RootActions } from '../types';

const initialState = false;
export type LoadingReducer = false | 'random' | 'saved';
export default function Reducer(state: LoadingReducer = initialState, action: RootActions): LoadingReducer {
  switch (action.type) {
    case random.CONSTANTS.FETCH_ITEMS.REQUEST:
      return 'random';

    case saved.CONSTANTS.FETCH_ITEMS.REQUEST:
      return 'saved';

    default:
      return false;
  }
}
