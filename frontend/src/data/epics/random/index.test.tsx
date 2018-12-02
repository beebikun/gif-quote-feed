import * as records from 'data/records';
import * as epics from './epics';
import { actions } from 'data/actions/random';
import { expectEditFlow, expectFetchItemsFlow } from 'utils/testUtils/epics';
import { getTestItem } from 'utils/testUtils';

const API_NAME = 'RandomApi';

describe('fetchItems', () => {
  expectFetchItemsFlow(API_NAME, epics.fetchItemsFlow, actions.fetchItems);
});

describe('fetchGif', () => {
  const item: records.Item = getTestItem();
  const successApi = item.gif;
  const apiParams = { name: API_NAME, method: 'randomGif' };
  expectEditFlow(item, apiParams, epics.fetchGifFlow, actions.fetchGif,
                 successApi);
});