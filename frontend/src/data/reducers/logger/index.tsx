import { RootActions } from '../types';

import actions from './actions';

export default function (loggerEnable = false, action: RootActions) {
  if (loggerEnable) {
    console.log('>LOG:', action);
  }

  switch (action.type) {
    case actions.ENABLE.type:
      return true;
    case actions.DISABLE.type:
      return false;
  }

  return loggerEnable;
}


// tslint:disable-next-line:no-any
let unsubscribeLog: any;
export function enableLogger() {
  // tslint:disable-next-line:no-var-requires
  const store = require('data/storage').default;
  store.dispatch(actions.ENABLE);
  unsubscribeLog = store.subscribe(() => {
    console.log('>STATE:', store.getState());
  });
}
export function disableLogger() {
  // tslint:disable-next-line:no-var-requires
  const store = require('data/storage').default;
  store.dispatch(actions.DISABLE);
  if (unsubscribeLog) {
    unsubscribeLog();
  }
  unsubscribeLog = undefined;
}