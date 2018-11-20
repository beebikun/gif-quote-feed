import axios from 'axios';

import * as records from 'data/records';

import { API_URL } from './secrets';

import { _ITEM } from 'utils/testUtils/data/backend';
import generateArray from 'utils/generateArray';

export interface IUnsavedItem {
  gif: records.Gif;
  text: string;
}

export interface IItemRaw implements IUnsavedItem {
  id: string;
}


export interface IResponse<T= IItemRaw> {
  data: T;
}

// TODO: 4) fix real backend
class Api {
  public list(): Promise<IItemRaw[]> {
    const items: IItemRaw[] = generateArray<IItemRaw>(3, () => _ITEM);

    return  Promise.resolve(items);
    // const url = API_URL;

    // return axios.get(url)
    //   .then(({ data }: IResponse<IItemRaw[]>) => data);
  }

  public create(item: IUnsavedItem): Promise<IItemRaw> {
    return Promise.resolve({ ...item, id: 'notFake' + item.id } as IItemRaw);
    // const url = API_URL;

    // return axios.post(url, item)
    //   .then(({ data }: IResponse) => data);
  }

  public edit(id: string, item: records.Item): Promise<IItemRaw> {
    return Promise.resolve({ ...item.toObject() } as IItemRaw);
    // const url = `${ API_URL }/${ id }`;

    // return axios.put(url, item)
    //   .then(({ data }: IResponse) => data);
  }

  public delete(id: string): Promise<undefined> {
    return Promise.resolve();
    // const url = `${ API_URL }/${ id }`;

    // return axios.delete(url)
    //   .then(({ data }: IResponse) => undefined);
  }
}

export default new Api();
