import * as records from 'data/records';
​import { IStorageEntry } from 'data/reducers/utils';

import { CONSTANTS, actions } from './index';
import { generateTestItems, getTestItem } from 'utils/testUtils';
import { expectAsyncActions } from 'utils/testUtils/actions';

const KEY = 'STORAGE_KEY';

it('fetch items', () => {
  const items: records.Item[] = generateTestItems(3);
  expectAsyncActions(actions.fetchItems, CONSTANTS.FETCH_ITEMS, {
    SUCCESS: items,
  });
});

it('delete item', () => {
  const item: records.Item = getTestItem();
  const entry = [KEY, item];
  expectAsyncActions(actions.deleteItem, CONSTANTS.DELETE_ITEM, {
    REQUEST: KEY,
    SUCCESS: entry,
  });
});

it('save item', () => {
  const item: records.Item = getTestItem();
  const entry = [KEY, item];
  expectAsyncActions(actions.saveItem, CONSTANTS.SAVE_ITEM, {
    REQUEST: KEY,
    SUCCESS: entry,
  });
});
