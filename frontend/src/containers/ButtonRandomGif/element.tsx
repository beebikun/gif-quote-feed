import * as React from 'react';
import * as records from 'data/records';
import FakeID from 'utils/FakeID';

import { RootActions } from 'data/reducers';

export interface IProps {
  storageKey: string;
  updateGif: (itemId: string) => () => RootActions;
}


export default function ButtonRandomGif({ storageKey, updateGif }) {
  return (<div className={`Button Button--refresh`} onClick={ () => updateGif(storageKey) } />);
}