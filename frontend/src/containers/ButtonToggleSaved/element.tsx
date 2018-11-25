import * as React from 'react';
import { RootActions } from 'data/reducers';

export interface IProps {
  isSaved: boolean;
  storageKey: string;
  onAdd: (storageKey: string) => RootActions;
  onRemove: (storageKey: string) => RootActions;
}

export const CLASSNAMES = {
  'notsaved': 'Button--star',
  'saved': 'Button--star-filled',
};

export default function ButtonAdd({ isSaved, storageKey, onAdd, onRemove }: IProps) {
  const cls = isSaved ? CLASSNAMES.saved : CLASSNAMES.notsaved;

  return (<div className={`Button ${ cls }`} onClick={ onClick } />);

  function onClick() {
    const onToggle = isSaved ? onRemove : onAdd;
    onToggle(storageKey);
  }
}