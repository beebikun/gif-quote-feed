import { Epic } from 'redux-observable';

import { from, of, pipe } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

// import { RootState, RootActions } from 'data/reducers';
import { actions } from 'data/actions/saved';

// TODO: add types to Epic<>
export const fetchItemsFlow: Epic = (action$, store, { RandomApi }) => {
  const fetchActions = actions.fetchItems;
  const filtered = filter(isActionOf(fetchActions.request));
  const mapped = () => {
    const onSuccess = map(fetchActions.success);
    const onError = catchError(pipe(fetchActions.failure, of));

    return from(RandomApi.list())
      .pipe(onSuccess, onError);
  };

  return action$.pipe(filtered, switchMap(mapped));
};
