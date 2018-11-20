import { actions } from 'data/actions/random';
import { ActionsObservable } from 'redux-observable';

import * as records from 'data/records';
import { generateTestItems } from 'utils/testUtils';

import * as epics from './epics';

it('fetchItems: success', () => {
  const items: records.Item[] = generateTestItems(2);
  const fetchItems = actions.fetchItems;
  const request = fetchItems.request();
  const success = fetchItems.success(items);

  const RandomApi = {
    list: jest.fn(() => Promise.resolve(items))
  };

  const action$ = ActionsObservable.of(request);
  // tslint:disable-next-line:no-any
  const output$ = epics.fetchItemsFlow(action$, {} as any, { RandomApi });

  return output$.toPromise()
    .then(action => {
      expect(action).toEqual(success);
      expect(RandomApi.list).toHaveBeenCalledTimes(1);
    });
});

it('fetchItems: fail', () => {
  const error = Error('Failure reason');
  const fetchItems = actions.fetchItems;
  const request = fetchItems.request();
  const fail = fetchItems.failure(error);

  const RandomApi = {
    list: jest.fn(() => Promise.reject(error))
  };

  const action$ = ActionsObservable.of(request);
  // tslint:disable-next-line:no-any
  const output$ = epics.fetchItemsFlow(action$, {} as any, { RandomApi });

  return output$.toPromise()
    .then(action => {
      expect(action).toEqual(fail);
      expect(RandomApi.list).toHaveBeenCalledTimes(1);
      expect(RandomApi.list).rejects.toThrow(error);
    });
});
