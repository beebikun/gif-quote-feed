import { Epic } from 'redux-observable';

import { from, of, pipe } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootActions } from 'data/reducers';
import { IStorageEntry } from 'data/reducers/utils';
import { actions } from 'data/actions/saved';
import * as records from 'data/records';

export const fetchItemsFlow: Epic = (action$, store, { SavedApi }) => {
  const asyncAction = actions.fetchItems;
  const filtered = filter(isActionOf(asyncAction.request));
  const mapped = () => {
    const onSuccess = map(asyncAction.success);
    const onError = catchError(pipe(asyncAction.failure, of));

    return from(SavedApi.list())
      .pipe(onSuccess, onError);
  };

  return action$.pipe(filtered, switchMap(mapped));
};

export const saveItemFlow = getEditFlow(actions.saveItem, 'saveItem');

export const deleteItemFlow = getEditFlow(actions.deleteItem, 'deleteItem');

function getEditFlow(asyncAction: RootActions, apiMethod: string): Epic {
  return (action$, store, { SavedApi }) => {
    const filtered = filter(isActionOf(asyncAction.request));
    const mapped = ({ payload }: RootActions) => {
      const item = store.value.items.get(payload);
      const onSuccess = map(asyncAction.success);
      const onError = catchError(pipe(asyncAction.failure, of));
      const fetch = SavedApi[apiMethod](item);

      return from(fetch.then(insertKey))
        .pipe(onSuccess, onError);

      function insertKey(updatedItem) {
        return [ payload, updatedItem ];
      }
    };

    return action$.pipe(filtered, switchMap(mapped));
  };
}