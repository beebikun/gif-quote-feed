import * as Immutable from 'immutable';
import { IStorage } from 'api/records/ItemStorage';
import Item from 'api/records/Item';

export function getExpected(items: Item[], expected = Immutable.OrderedMap<string, Item>(), i = 0): IStorage {
  if (i < items.length) {
    const item = items[i];

    return getExpected(items, expected.set(item.id, item), ++i);
  }

  return expected;
}