import { combineEpics } from 'redux-observable';

import randomEpics from './random';

export default combineEpics(randomEpics);