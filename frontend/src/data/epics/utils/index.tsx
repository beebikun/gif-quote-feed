import { Epic } from 'redux-observable';
import actions from 'data/actions';
import { from, of, pipe } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { IAsyncAction, RootActions } from 'data/reducers';
import * as records from 'data/records';
import { IStorageEntry } from 'data/reducers/utils';
import { IRootApi } from 'data/services';
type fetchItemsFn = (api: IRootApi) => Promise<records.Item[]>;

export function getFetchItemsFlow(asyncAction: IAsyncAction, fetch: fetchItemsFn): Epic {
  return (action$, store, api) => {
    const filtered = filter(isActionOf(asyncAction.request));
    const mapped = () => {
      const onSuccess = map(checkCurrentState);
      const onError = catchError(pipe(asyncAction.failure, of));

      return from(fetch(api))
        .pipe(onSuccess, onError);

      function checkCurrentState(items: records.Item[]): RootActions {
        // if store.value.loading is false:
        // user switchs between tabs and other items already have been loaded

        return store.value.loading === false ?
                    actions.LATE_ITEMS_LOADING :
                    asyncAction.success(items);
      }
    };

    return action$.pipe(filtered, switchMap(mapped));
  };
}

type editItemFn = (api: IRootApi, item: records.Item) => Promise<records.Item>;

export function getEditFlow(asyncAction: IAsyncAction, editItem: editItemFn): Epic {
  return (action$, store, api) => {
    const filtered = filter(isActionOf(asyncAction.request));
    const mapped = ({ payload }: RootActions) => {
      const item = store.value.items.get(payload);
      const onSuccess = map(asyncAction.success);
      const onError = catchError(pipe(asyncAction.failure, of));
      const fetch = editItem(api, item).then(insertKey);

      return from(fetch)
        .pipe(onSuccess, onError);

      function insertKey(updatedItem: records.Item): IStorageEntry {
        return [ payload, updatedItem ];
      }
    };

    return action$.pipe(filtered, switchMap(mapped));
  };
}
