import * as records from 'data/records';

import { CONSTANTS, actions } from './index';
​
import { generateTestItems } from 'utils/testUtils';


it('fetch items', () => {
  const items: records.Item[] = generateTestItems(3);
  const fetchItems = actions.fetchItems;
  const requestResult = fetchItems.request();
  expect(requestResult).toEqual({
    type: CONSTANTS.FETCH_ITEMS.REQUEST,
  });

  const successResult = fetchItems.success(items);
  expect(successResult).toEqual({
    payload: items,
    type: CONSTANTS.FETCH_ITEMS.SUCCESS,
  });

  const failureResult = fetchItems.failure(Error('Failure reason'));
  expect(failureResult).toEqual({
    payload: Error('Failure reason'),
    type: CONSTANTS.FETCH_ITEMS.ERROR,
  });
});
