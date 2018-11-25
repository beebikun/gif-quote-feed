import { Epic } from 'redux-observable';
import * as records from 'data/records';
import { from, of, pipe } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { IStorageEntry } from 'data/reducers/utils';
import { IAsyncAction, RootActions } from 'data/reducers';
import { actions } from 'data/actions/random';

export const fetchItemsFlow: Epic = (action$, store, { RandomApi }) => {
  const asyncActions = actions.fetchItems;
  const filtered = filter(isActionOf(asyncActions.request));
  const mapped = () => {
    const onSuccess = map(asyncActions.success);
    const onError = catchError(pipe(asyncActions.failure, of));

    return from(RandomApi.list())
      .pipe(onSuccess, onError);
  };

  return action$.pipe(filtered, switchMap(mapped));
};

export const fetchGifFlow: Epic = (action$, store, { RandomApi }) => {
  const asyncActions: IAsyncAction = actions.fetchGif;
  const filtered = filter(isActionOf(asyncActions.request));
  const mapped = ({ payload }: RootActions) => {
    const onSuccess = map(asyncActions.success);
    const onError = pipe(asyncActions.failure, of);
    const fetch = RandomApi
      .randomGif()
      .then(gif2item);

    return from(fetch)
      .pipe(onSuccess, catchError(onError));

    function gif2item(gif: records.Gif): IStorageEntry {
      const item = store.value.items.get(payload);

      return [payload, item.set('gif', gif)];
    }
  };

  return action$.pipe(filtered, switchMap(mapped));
};
