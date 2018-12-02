import { action } from 'typesafe-actions';
import * as random from 'data/actions/random';
import * as saved from 'data/actions/saved';
import reducer, { LoadingReducer } from './index';


function expectLoading(actionType: string, expected: LoadingReducer): void {
  const a = action(actionType);
  const next = reducer(undefined as unknown as LoadingReducer, a);

  expect(next).toEqual(expected);
}


it('Random Fetch', () => {
  expectLoading(random.CONSTANTS.FETCH_ITEMS.REQUEST, 'random');
});

it('Saved Fetch: to true', () => {
  expectLoading(saved.CONSTANTS.FETCH_ITEMS.REQUEST, 'saved');
});

it('Random Other: to true', () => {
  expectLoading(random.CONSTANTS.FETCH_ITEMS.SUCCESS, false);
});

it('Saved Fetch: to true', () => {
  expectLoading(saved.CONSTANTS.FETCH_ITEMS.SUCCESS, false);
});
