import { RootActions } from '../types';

import actions from './actions';

export default function (loggerEnable = false, action: RootActions) {
  if (loggerEnable) {
    console.log(action);
  }

  switch (action.type) {
    case actions.ENABLE.type:
      return true;
    case actions.DISABLE.type:
      return false;
  }

  return loggerEnable;
}

export function enableLogger() {
  // tslint:disable-next-line:no-var-requires
  const store = require('data/storage').default;
  store.dispatch(actions.ENABLE);
}
export function disableLogger() {
  // tslint:disable-next-line:no-var-requires
  const store = require('data/storage').default;
  store.dispatch(actions.DISABLE);
}