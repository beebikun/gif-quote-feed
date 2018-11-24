import * as Immutable from 'immutable';
import * as records from 'data/records';

import { StorageID } from 'utils';

interface IOrdered {
  [id: string]: records.Item;
}

export type IStorage = Immutable.OrderedMap<string, records.Item>;
export function storageFromItems(items: records.Item[]): IStorage {
  const ordered: IOrdered = items
    .reduce((bucket: IOrdered, item: records.Item): IOrdered => {
      const id: string = StorageID.next();
      bucket[id] = item;

      return bucket;
    }, Object.create(null));

  return Immutable.OrderedMap<records.Item>(ordered);
}

export type IStorageKey = string;
export type IStorageEntry = [key: IStorageKey, value: records.Item];
export function storageToItems(storage: IStorage): IStorageEntry[] {
  return storage.toArray();
}

export function replaceItem(storage: IStorage,
                            [ key, value ]: IStorageEntry): IStorage {
  return storage.set(key, value);
}