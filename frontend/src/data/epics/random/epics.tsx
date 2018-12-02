import { Epic } from 'redux-observable';
import * as records from 'data/records';
import { actions } from 'data/actions/random';

import { IRootApi } from 'data/services';
import { getFetchItemsFlow, getEditFlow } from '../utils';

export const fetchItemsFlow: Epic = getFetchItemsFlow(
  actions.fetchItems,
  ({ RandomApi }: IRootApi) => RandomApi.list(),
);

export const fetchGifFlow: Epic = getEditFlow(actions.fetchGif, fetchRandomGif);
function fetchRandomGif({ RandomApi }: IRootApi, item: records.Item): Promise<records.Item> {
  return RandomApi
    .randomGif()
    .then((gif: records.Gif) => item.set('gif', gif));
}