import { Epic } from 'redux-observable';
import { actions } from 'data/actions/saved';
import * as records from 'data/records';

import { IRootApi } from 'data/services';
import { getFetchItemsFlow, getEditFlow } from '../utils';

export const fetchItemsFlow: Epic = getFetchItemsFlow(
  actions.fetchItems,
  ({ SavedApi }: IRootApi) => SavedApi.list(),
);

export const saveItemFlow: Epic = getEditFlow(
  actions.saveItem,
  ({SavedApi}: IRootApi, item: records.Item) => SavedApi.saveItem(item),
);

export const deleteItemFlow: Epic = getEditFlow(
  actions.deleteItem,
  ({SavedApi}: IRootApi, item: records.Item) => SavedApi.deleteItem(item),
);
