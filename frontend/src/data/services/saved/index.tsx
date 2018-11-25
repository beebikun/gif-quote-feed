import * as records from 'data/records';
import backendApi, { IItemRaw, IUnsavedItem } from './Backend';

class Api {
  public list(): Promise<records.Item[]> {
    return backendApi.list()
      .then((data: IItemRaw[]) => {
        return data.map(d => new records.Item(d));
      });
  }

  /* ------------------------------------------- */

  public saveItem(item: records.Item): Promise<records.Item> {
    const id = item.getId();
    if (id !== undefined) {
      return Promise.resolve(item);
    }

    return backendApi.create(item.data() as IUnsavedItem)
      .then((rawItem: IItemRaw) => {
        return item.set('id', rawItem.id);
      });
  }

  public deleteItem(item: records.Item): Promise<records.Item> {
    const id = item.getId();
    if (id === undefined) {
      return Promise.resolve(item);
    }

    return backendApi.delete(id)
      .then(() => {
        return item.resetId();
      });
  }
}


export default new Api();