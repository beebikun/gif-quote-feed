// tslint:disable:no-any
import * as Immutable from 'immutable';
import * as records from 'data/records';
import { ActionsObservable } from 'redux-observable';
import { Epic, StateObservable } from 'redux-observable';
import { IStorage, IStorageEntry } from 'data/reducers/utils';
import { IAsyncAction, IAction } from 'data/reducers/types';
import { generateTestItems } from 'utils/testUtils';

interface IApi {
  name: string;
  method: string;
  params?: any[];
}

interface IContext {
  request: any;
  success: any;
  successApi: any;
}

const KEY = 'STORAGE_KEY';

export function expectEditFlow(item: records.Item, apiParams: IApi, epic: Epic,
                               asyncAction: IAsyncAction,
                               successApi: any,
                               apiCallParams?: any[]): void {
  const entry: IStorageEntry = [KEY, item];
  const context = {
    request: KEY,
    success: entry,
    successApi,
  };
  const store = { items: Immutable.OrderedMap({ [ KEY ]: item }) ) };
  if (apiCallParams) {
    apiParams.params = apiCallParams;
  }

  expectFlow(asyncAction, epic, apiParams, context, store);

}

export function expectFetchItemsFlow(API_NAME: string, epic: Epic,
                                     asyncAction: IAsyncAction): void {
  const items: records.Item[] = generateTestItems(2);
  const context = {
    success: items,
  };
  const apiParams = { name: API_NAME, method: 'list' };

  describe('Normal flow', () => {
    const store = {
      loading: 'random',
    };
    expectFlow(asyncAction, epic, apiParams, context, store);
  });

  it('Tab is changed', () => {
    const emptySuccessAsyncAction = {
      ...asyncAction,
      success: () => ({} as IAction),
    };
    const store = {
      loading: false,
    };
    expectFlow(emptySuccessAsyncAction, epic, apiParams, context, store);
  });
}

export function expectFlow(asyncAction: IAsyncAction, epic: Epic,
                           apiParams: IApi, CONTEXTS: Partial<IContext>,
                           store: any): void {
  const API = { [ apiParams.method ]: jest.fn() };
  const request = asyncAction.request(CONTEXTS.request);
  const action$ = ActionsObservable.of(request);

  it('success', () => {
    const expectedAction = asyncAction.success(CONTEXTS.success);
    const apiResponse = Promise.resolve(CONTEXTS.successApi || CONTEXTS.success);

    return expectCall(expectedAction, apiResponse);
  });

  it('fail', () => {
    const error = Error('Failure reason');
    const expectedAction = asyncAction.failure(error);
    const apiResponse = Promise.reject(error);

    return expectCall(expectedAction, apiResponse);
  });

  function expectCall(expectedAction: IAction, promise: Promise<any>): Promise<void> {
    API[apiParams.method].mockClear();
    API[apiParams.method].mockReturnValueOnce(promise);

    const state = { value: store } as unknown as StateObservable<IStorage>;
    const output$ = epic(action$, state, { [ apiParams.name ]: API });

    return output$.toPromise()
      .then((calledAction: IAction) => {
        expect(calledAction).toEqual(expectedAction);
        expect(API[apiParams.method]).toHaveBeenCalledTimes(1);
        if (apiParams.params !== undefined) {
          expect(API[apiParams.method]).toHaveBeenCalledWith(...apiParams.params);
        }
      });
  }
}