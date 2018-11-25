import * as Immutable from 'immutable';
import { ActionsObservable } from 'redux-observable';
import { Epic, StateObservable } from 'redux-observable';
import { IStorage } from 'data/reducers/utils';
import { IAsyncAction, IAction } from 'data/reducers/types';

interface IApi {
  name: string;
  method: string;
  // tslint:disable-next-line:no-any
  params?: any[];
}
interface IStorageItems {
  // tslint:disable-next-line:no-any
  [id: string]: Immutable.Record<any>;
}
// tslint:disable-next-line:no-any
interface IContext<C = any> {
  request: C;
  success: C;
  successApi: C;
}

export function expectFlow(asyncAction: IAsyncAction, epic: Epic,
                           apiParams: IApi, CONTEXTS: Partial<IContext>,
                           storageItems?: IStorageItems): void {
  const API = { [ apiParams.method ]: jest.fn() };
  const request = asyncAction.request(CONTEXTS.request);
  const action$ = ActionsObservable.of(request);

  it('success', () => {
    const success = asyncAction.success(CONTEXTS.success);

    return expectCall(success, Promise.resolve(CONTEXTS.successApi || CONTEXTS.success));
  });

  it('fail', () => {
    const error = Error('Failure reason');
    const fail = asyncAction.failure(error);

    return expectCall(fail, Promise.reject(error));
  });

  // tslint:disable-next-line:no-any
  function expectCall(expected: IAction, promise: Promise<any>): Promise<void> {
    API[apiParams.method].mockClear();
    API[apiParams.method].mockReturnValueOnce(promise);

    const store = { items: Immutable.OrderedMap(storageItems || {}) ) };
    const state = { value: store } as unknown as StateObservable<IStorage>;
    const output$ = epic(action$, state, { [ apiParams.name ]: API });

    return output$.toPromise()
      .then((calledAction: IAction) => {
        expect(calledAction).toEqual(expected);
        expect(API[apiParams.method]).toHaveBeenCalledTimes(1);
        if (apiParams.params !== undefined) {
          expect(API[apiParams.method]).toHaveBeenCalledWith(...apiParams.params);
        }
      });
  }
}