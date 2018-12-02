import * as records from 'data/records';
import * as epics from './epics';
import { actions } from 'data/actions/saved';
import { getTestItem } from 'utils/testUtils';
import { expectEditFlow, expectFetchItemsFlow } from 'utils/testUtils/epics';

const API_NAME = 'SavedApi';


describe.only('fetchItems', () => {
  expectFetchItemsFlow(API_NAME, epics.fetchItemsFlow, actions.fetchItems);
});


describe('saveItem', () => {
  const item: records.Item = getTestItem();
  const successApi = item;
  const apiCallParams = [item];
  const apiParams = { name: API_NAME, method: 'saveItem' };
  expectEditFlow(item, apiParams, epics.saveItemFlow, actions.saveItem,
                 successApi, apiCallParams);
});

describe('deleteItem', () => {
  const item: records.Item = getTestItem();
  const successApi = item;
  const apiCallParams = [item];
  const apiParams = { name: API_NAME, method: 'deleteItem' };
  expectEditFlow(item, apiParams, epics.deleteItemFlow, actions.deleteItem,
                 successApi, apiCallParams);
});
