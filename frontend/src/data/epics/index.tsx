import { combineEpics } from 'redux-observable';

import randomEpics from './random';
import savedEpics from './saved';

export default combineEpics(randomEpics, savedEpics);