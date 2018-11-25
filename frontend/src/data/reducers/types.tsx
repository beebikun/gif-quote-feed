export interface IAction {
  // tslint:disable-next-line:no-any
  payload?: any;
  type: string;
}
// tslint:disable-next-line:no-any
export interface IAsyncAction<A = (payload: any) => IAction> {
  request: A;
  success: A;
  failure: A;
}
export type RootActions = IAction;