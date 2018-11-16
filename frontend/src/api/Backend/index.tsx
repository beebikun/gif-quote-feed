import axios from 'axios';

import { Gif, _TEST_GIF } from 'api/Giphy';

import { API_URL } from './secrets';
export { API_URL as BASE_URL } from './secrets';

export interface IItemRaw {
  id?: string;
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

  public create(data: IItemRaw): Promise<IItemRaw> {
    const url = API_URL;

    return axios.post(url, data)
      .then(({ data }: IResponse) => data);
  }

  public edit(id: string, data: IItemRaw): Promise<IItemRaw> {
    const url = `${ API_URL }/${ id }`;

    return axios.put(url, data)
      .then(({ data }: IResponse) => data);
  }

  public delete(id: string): Promise<void> {
    const url = `${ API_URL }/${ id }`;

    return axios.delete(url)
      .then(({ data }: IResponse) => data);
  }
}

export default new Api();

export const _TEST_BACKEND_ITEM = { id: '1', gif: _TEST_GIF, text: 'text' };
export const _TEST_BACKEND_RESPONSE: { data: IItemRaw } = {
  data: _TEST_BACKEND_ITEM
};
export const _TEST_BACKEND_LIST_RESPONSE: { data: IItemRaw[] } = {
  data: [ _TEST_BACKEND_ITEM ]
};