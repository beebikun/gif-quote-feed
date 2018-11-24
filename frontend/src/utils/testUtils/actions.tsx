interface IDict {
  [key: string]: string;
}
// tslint:disable-next-line:no-any
export function expectAsyncActions(asyncAction: any, constants: IDict, payloads: IDict) {
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