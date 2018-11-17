import axios from 'axios';

import Gif from 'api/records/Gif';
import Item from 'api/records/Item';

import { API_URL } from './secrets';
export { API_URL as BASE_URL } from './secrets';

export interface IItemRaw {
  id: string;
  gif: Gif;
  text: string;
}

export interface IUnsavedItem {
  gif: Gif;
  text: string;
}

export interface IResponse<T= IItemRaw> {
  data: T;
}


class Api {
  public list(): Promise<IItemRaw[]> {
    const url = API_URL;

    return axios.get(url)
      .then(({ data }: IResponse<IItemRaw[]>) => data);
  }

  public create(item: IUnsavedItem): Promise<IItemRaw> {
    const url = API_URL;

    return axios.post(url, item)
      .then(({ data }: IResponse) => data);
  }

  public edit(id: string, item: Item): Promise<IItemRaw> {
    const url = `${ API_URL }/${ id }`;

    return axios.put(url, item)
      .then(({ data }: IResponse) => data);
  }

  public delete(id: string): Promise<undefined> {
    const url = `${ API_URL }/${ id }`;

    return axios.delete(url)
      .then(({ data }: IResponse) => undefined);
  }
}

export default new Api();
