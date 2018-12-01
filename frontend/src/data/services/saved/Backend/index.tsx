import axios from 'axios';

import * as records from 'data/records';

import { API_URL } from './secrets';

export interface IUnsavedItem {
  gif: records.Gif;
  text: string;
}

export interface IItemRaw extends IUnsavedItem {
  id: string;
}


export interface IResponse<T= IItemRaw> {
  data: T;
}

class Api {
  public list(): Promise<IItemRaw[]> {
    return axios.get(API_URL)
      .then(({ data }: IResponse<IItemRaw[]>) => data);
  }

  public create(item: IUnsavedItem): Promise<IItemRaw> {
    return axios.post(API_URL, item)
      .then(({ data }: IResponse) => data);
  }

  public delete(id: string): Promise<void> {
    return axios.delete(`${ API_URL }${ id }`)
      .then(({ data }: IResponse) => undefined);
  }
}

export default new Api();
