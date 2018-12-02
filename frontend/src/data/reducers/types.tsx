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
import { IStorage } from './utils';
import { LoadingReducer } from './loading';

interface IState {
  items: IStorage;
  loading: LoadingReducer;
  router: RouterState;
  zlogger: boolean;
}

export type RootState = IState;
export type RootActions = IAction;