import { actions } from 'data/actions/random';
import { ActionsObservable } from 'redux-observable';

import * as records from 'data/records';
import { IStorageEntry } from 'data/reducers/utils';
import { generateTestItems, getTestItem } from 'utils/testUtils';

import * as epics from './epics';
import { expectFlow } from 'utils/testUtils/epics';

const API_NAME = 'RandomApi';
const KEY = 'STORAGE_KEY';

describe('fetchItems', () => {
  const items: records.Item[] = generateTestItems(2);
  expectFlow(actions.fetchItems, epics.fetchItemsFlow,
    { name: API_NAME, method: 'list' }, {
    success: items,
  });
});


describe('fetchGif', () => {
  const item: records.Item = getTestItem();
  const entry: IStorageEntry = [KEY, item];
  expectFlow(actions.fetchGif, epics.fetchGifFlow,
    { name: API_NAME, method: 'randomGif' }, {
    request: KEY,
    success: entry,
    successApi: item.gif,
  }, { [ KEY ]: item });
});
