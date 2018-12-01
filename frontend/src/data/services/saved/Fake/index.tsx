import * as records from 'data/records';


import { getListReponse } from 'utils/testUtils/data/backend';

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
    const items: IItemRaw[] = getListReponse().data;

    return  Promise.resolve(items);
  }

  public create(item: IUnsavedItem): Promise<IItemRaw> {
    return Promise.resolve({ ...item, id: 'notFake' + (item as IItemRaw).id } as IItemRaw);
  }

  public edit(id: string, item: records.Item): Promise<IItemRaw> {
    return Promise.resolve({ ...item.toObject() } as IItemRaw);
  }

  public delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}

export default new Api();
