import Item from 'api/records/Item';
import { generateArray } from 'utils';
import { _ITEM as _BACKEND_ITEM } from './backend';

export function generateTestItems(n: number, prefix?: string): Item[] {
  return generateArray<Item>(n, create);

  function create(_: undefined, i: number): Item {
    return getTestItem(prefix, i);
  }
}

export function getTestItem(prefix: string = 'id', i: number = 0): Item {
  return new Item({..._BACKEND_ITEM, id: prefix + i});
}