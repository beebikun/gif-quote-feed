import * as React from 'react';

import { RootActions } from 'data/reducers';

export interface IProps {
  isSaved: boolean;
  storageKey: string;
  onAdd: (itemId: string) => () => RootActions;
  onRemove: (itemId: string) => () => RootActions;
}

export const CLASSNAMES = {
  'saved': 'Button--star-filled',
  'notsaved': 'Button--star',
};

export default function ButtonAdd({ isSaved, storageKey, onAdd, onRemove }) {
  const onClick = isSaved ? onRemove : onAdd;
  const cls = isSaved ? CLASSNAMES.saved : CLASSNAMES.notsaved;
  return (<div className={`Button ${ cls }`} onClick={ () => onClick(storageKey) } />);
}