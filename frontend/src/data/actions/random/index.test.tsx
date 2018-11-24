import * as records from 'data/records';

import { CONSTANTS, actions } from './index';
​
import { generateTestItems, getTestItem } from 'utils/testUtils';
import { expectAsyncActions } from 'utils/testUtils/actions';

const KEY = 'STORAGE_KEY';

it.only('fetch items', () => {
  const items: records.Item[] = generateTestItems(3);
  expectAsyncActions(actions.fetchItems, CONSTANTS.FETCH_ITEMS, {
    SUCCESS: items,
  });
});


it.only('fetch gif', () => {
  const item: records.Item = getTestItem();
  expectAsyncActions(actions.fetchGif, CONSTANTS.FETCH_GIF, {
    REQUEST: KEY,
    SUCCESS: [KEY, item],
  });
});