export { default as CONSTANTS } from './constants';
export { default as actions } from './actions';

import { ActionType } from 'typesafe-actions';
import actions from './actions';
export type IActions = ActionType<typeof actions>;