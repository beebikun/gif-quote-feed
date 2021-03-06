import { IAsyncAction } from 'data/reducers/types';

// tslint:disable-next-line:no-any
interface IProps<T = any> {
  REQUEST: T;
  SUCCESS: T;
  ERROR: T;
}

export function expectAsyncActions(asyncAction: IAsyncAction,
                                   constants: IProps,
                                   payloads: Partial<IProps>): void {
  const requestResult = asyncAction.request(payloads.REQUEST);
  expect(requestResult).toEqual({
    payload: payloads.REQUEST,
    type: constants.REQUEST,
  });

  const successResult = asyncAction.success(payloads.SUCCESS);
  expect(successResult).toEqual({
    payload: payloads.SUCCESS,
    type: constants.SUCCESS,
  });

  const error = Error('Failure reason');
  const failureResult = asyncAction.failure(error);
  expect(failureResult).toEqual({
    payload: error,
    type: constants.ERROR,
  });
}