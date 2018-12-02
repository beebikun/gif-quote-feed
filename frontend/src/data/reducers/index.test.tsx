import * as Immutable from 'immutable';
import { createBrowserHistory } from 'history';
import { action } from 'typesafe-actions';
import getReducer from './index';
import { RootActions, RootState } from './types';

it('set defaults', () => {
  const history = createBrowserHistory();
  const reducer = getReducer(history);
  const a = action('unknown') as RootActions;
  const nextState = reducer({} as RootState, a);
  expect(nextState)
    .toEqual({
      items: Immutable.OrderedMap(),
      loading: false,
      router: {
        action: history.action,
        location: history.location,
      },
      zlogger: false,
    });
});
