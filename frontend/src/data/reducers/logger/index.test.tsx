import { RootActions } from '../types';
import actions from './actions';
import reducer, { enableLogger, disableLogger } from './index';


it('initial state', () => {
  const next = reducer(undefined, {} as RootActions);
  expect(next)
    .toBe(false);
});


it('enable logger', () => {
  const prev = false;
  const next = reducer(prev, actions.ENABLE);
  expect(next)
    .toBe(true);
});


it('disable logger', () => {
  const prev = true;
  const next = reducer(prev, actions.DISABLE);
  expect(next)
    .toBe(false);
});

import store from 'data/storage';
describe('Utils', () => {
  const mockDispatch = jest.spyOn(store, 'dispatch');

  it('enableLogger', () => {
    enableLogger();
    expect(mockDispatch)
      .toHaveBeenCalledWith(actions.ENABLE);
  });


  it('disableLogger', () => {
    disableLogger();
    expect(mockDispatch)
      .toHaveBeenCalledWith(actions.DISABLE);
  });
});