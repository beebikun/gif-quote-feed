import * as Immutable from 'immutable';
import { ActionsObservable } from 'redux-observable';

interface IApi {
  name: string;
  method: string;
  // tslint:disable-next-line:no-any
  params?: any[];
}
// tslint:disable-next-line:no-any
export function expectFlow(asyncAction: any, epic: any, apiParams: IApi, CONTEXTS: any, storageItems?: any) {
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

  function expectCall(expected, promise) {
    API[apiParams.method].mockClear();
    API[apiParams.method].mockReturnValueOnce(promise);

    // tslint:disable-next-line:no-any
    const store = { items: Immutable.OrderedMap(storageItems || {}) ) };
    const state = { value: store } as any;
    const output$ = epic(action$, state, { [ apiParams.name ]: API });

    return output$.toPromise()
      .then(calledAction => {
        expect(calledAction).toEqual(expected);
        expect(API[apiParams.method]).toHaveBeenCalledTimes(1);
        if (apiParams.params !== undefined) {
          expect(API[apiParams.method]).toHaveBeenCalledWith(...apiParams.params);
        }
      });
  }
}