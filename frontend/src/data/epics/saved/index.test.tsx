import { actions } from 'data/actions/saved';
import * as records from 'data/records';

import * as epics from './epics';
import { IStorageEntry } from 'data/reducers/utils';
import { generateTestItems, getTestItem } from 'utils/testUtils';
import { expectFlow } from 'utils/testUtils/epics';

const API_NAME = 'SavedApi';
const KEY = 'STORAGE_KEY';

describe('fetchItems', () => {
  const items: records.Item[] = generateTestItems(2);
  expectFlow(actions.fetchItems, epics.fetchItemsFlow,
    { name: API_NAME, method: 'list' }, {
    success: items,
  });
});


describe('saveItem', () => {
  const item: records.Item = getTestItem();
  const entry: IStorageEntry = [KEY, item];
  expectFlow(actions.saveItem, epics.saveItemFlow,
    { name: API_NAME, method: 'saveItem', params: [item] }, {
    request: KEY,
    success: entry,
    successApi: item,
  }, { [ KEY ]: item });
});

describe('deleteItem', () => {
  const item: records.Item = getTestItem();
  const entry: IStorageEntry = [KEY, item];
  expectFlow(actions.deleteItem, epics.deleteItemFlow,
    { name: API_NAME, method: 'deleteItem', params: [item] }, {
    request: KEY,
    success: entry,
    successApi: item,
  }, { [ KEY ]: item });
});
