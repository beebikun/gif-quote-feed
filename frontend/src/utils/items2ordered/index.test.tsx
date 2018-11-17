import * as Immutable from 'immutable';

import items2ordered from './index';
import Item from 'api/records/Item';

import { getTestItem } from 'utils/testUtils/data/item';


it('test convert', () => {
  const item = getTestItem();
  const expected = Immutable.OrderedMap<string, Item>().set(item.id, item);
  const result = items2ordered([item]);
  expect(result)
    .toEqual(expected);
});