import * as records from 'data/records';

import { generateArray } from 'utils';
import { _ITEM as _BACKEND_ITEM } from './data/backend';

export function generateTestItems(n: number, prefix?: string): records.Item[] {
  return generateArray<records.Item>(n, create);

  function create(_: undefined, i: number): records.Item {
    return getTestItem(prefix, i);
  }
}

export function getTestItem(prefix: string = 'id', i: number = 0): records.Item {
  return new records.Item({..._BACKEND_ITEM, id: prefix + i});
}