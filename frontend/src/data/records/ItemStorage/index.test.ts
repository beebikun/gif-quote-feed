import ItemStorage from './index';
import Item from '../Item';

import { getExpected, generateTestItems } from 'utils/testUtils';

function createStorage(items: Item[]): ItemStorage {
  const storage = new ItemStorage(items);
  expectStorage(storage, items);

  return storage;
}

function expectStorage(storage: ItemStorage, items: Item[]): void {
  const expected = getExpected(items);
  expect(storage.items)
    .toEqual(expected);
}


it('create', () => {
  const items: Item[] = [];
  createStorage(items);
});


it('create with items', () => {
  const items: Item[] = generateTestItems(2);
  createStorage(items);
});


it('set new items', () => {
  const items: Item[] = generateTestItems(2, 'a');
  const storage = createStorage(items);

  const newItems: Item[] = generateTestItems(2, 'b');
  const newStorage = storage.set(newItems);
  expectStorage(newStorage, newItems);
  expectStorage(storage, items);
});


it('get array', () => {
  const items: Item[] = generateTestItems(2);
  const storage = createStorage(items);
  const array: Item[] = (storage.array());
  expect(array)
    .toEqual(items);
});
