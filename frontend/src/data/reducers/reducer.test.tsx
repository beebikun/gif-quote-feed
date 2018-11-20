import { action } from 'typesafe-actions';
import reducer from './reducer';

import { CONSTANTS as RANDOM_CONSTANTS } from 'data/actions/random';
import { CONSTANTS as SAVED_CONSTANTS } from 'data/actions/saved';

import * as records from 'data/records';
import { getExpected, generateTestItems } from 'utils/testUtils';


function expectStorage(storage: records.ItemStorage, items: records.Item[]) {
  const expectedType = expect.any(records.ItemStorage);
  expect(storage)
    .toMatchObject(expectedType);

  const expectedItems = getExpected(items);
  expect(storage.items)
    .toEqual(expectedItems);
}


it('initial state: return new ItemStorage', () => {
  const prevState = undefined;

  const items: records.Item[] = [];
  // tslint:disable-next-line:no-any
  const a = action('unknown') as any;

  const nextState = reducer(prevState, a);

  expectStorage(nextState, items);
});


it('unknown state: return old ItemStorage', () => {
  const oldItems: records.Item[] = generateTestItems(2, 'must stay');
  const prevState = new records.ItemStorage(oldItems);

  const items: records.Item[] = generateTestItems(2, 'must pass off');
  // tslint:disable-next-line:no-any
  const a = action('unknown', items) as any;

  const nextState = reducer(prevState, a);

  expectStorage(nextState, oldItems);
});


it('set items from random: return new ItemStorage', () => {
  const oldItems: records.Item[] = generateTestItems(2, 'must be replaced');
  const prevState = new records.ItemStorage(oldItems);

  const items: records.Item[] = generateTestItems(1, 'must replace');
  const a = action(RANDOM_CONSTANTS.FETCH_ITEMS.SUCCESS, items);

  const nextState = reducer(prevState, a);

  expectStorage(nextState, items);
});


it('set items from saved: return new ItemStorage', () => {
  const oldItems: records.Item[] = generateTestItems(2, 'must be replaced');
  const prevState = new records.ItemStorage(oldItems);

  const items: records.Item[] = generateTestItems(1, 'must replace');
  const a = action(SAVED_CONSTANTS.FETCH_ITEMS.SUCCESS, items);

  const nextState = reducer(prevState, a);

  expectStorage(nextState, items);
});
