import RandomApi from './random';
import SavedApi from './saved';

export default {
  RandomApi, SavedApi,
};

export interface IApiServive {
  // tslint:disable-next-line:no-any
  [method: string]: (...args: any[]) => any;
}

export interface IRootApi {
  RandomApi: IApiServive;
  SavedApi: IApiServive;
}