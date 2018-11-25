import * as React from 'react';

import './index.css';

import ButtonToggleSaved from 'containers/ButtonToggleSaved';
import ButtonRandomGif from 'containers/ButtonRandomGif';

import { FakeID } from 'utils';

export interface IProps {
  storageKey: string;
  itemId: string;
}

export default function Buttons({ storageKey, itemId }: IProps) {
  const isSaved = !FakeID.is(itemId);

  return (
    <div className='Item__btns'>
      <ButtonToggleSaved storageKey={ storageKey } isSaved={ isSaved } />
      { isSaved === false && <ButtonRandomGif storageKey={ storageKey } />}
    </div>
  );
}
