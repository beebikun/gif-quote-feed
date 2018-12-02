import * as Immutable from 'immutable';
import * as records from 'data/records';
import { StorageID } from 'utils';
import { generateTestItems } from 'utils/testUtils';
import {
  storageToItems, storageFromItems, replaceItem,
  IStorageEntry, IStorage,
} from './index';

it('storageToItems', () => {
  const items: records.Item[] = generateTestItems(3);
  const storage = Immutable.OrderedMap<records.Item>({
    [StorageID.next()]: items[0],
    [StorageID.next()]: items[1],
    [StorageID.next()]: items[2],
  });

  expect(storage.size)
    .toBe(items.length);

  const result = storageToItems(storage);
  const resultItems = itemsFromEntries(result);
  expect(resultItems)
    .toEqual(items);

  result.forEach(r => {
    expect(StorageID.is(r[0]))
      .toBe(true);
  });
});


it('storageFromItems', () => {
  const items: records.Item[] = generateTestItems(3);
  const storage = storageFromItems(items);

  const storagedItems = storageToItems(storage);
  const resultItems = itemsFromEntries(storagedItems);
  expect(resultItems)
    .toEqual(items);

  const keys: string[] = Array.from(storage.keys());
  keys.forEach(key => {
    expect(StorageID.is(key))
      .toBe(true);
  });
});


it('replaceItem', () => {
  const idx = 1;
  const items: records.Item[] = generateTestItems(3);
  const storage = storageFromItems(items);

  const item = items[idx];
  const key = storage.findKey((v: records.Item) => v.id === item.id) as string;
  const value = item.set('id', 'newId').set('text', 'some other text');

  const replacedStorage = replaceItem(storage, [ key, value ]);
  expect(storage.keys())
    .toEqual(replacedStorage.keys());

  const resultItems = itemsFromStorage(replacedStorage);
  expect(resultItems[idx])
    .toEqual(value);
});


function itemsFromStorage(storage: IStorage): records.Item[] {
  const storagedItems = storageToItems(storage);

  return itemsFromEntries(storagedItems);
}


function itemsFromEntries(arr: IStorageEntry[]): records.Item[] {
  return arr.map(i => i[1]);
}
