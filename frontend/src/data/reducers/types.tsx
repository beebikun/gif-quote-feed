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
import { RouterState } from 'connected-react-router';
// import { Reducer } from 'redux';
import { IStorage } from './utils';

interface IState {
  items: IStorage;
  router: RouterState;
}

export type RootState = IState;
export type RootActions = IAction;