import * as React from 'react';

export interface IProps {
  storageKey: string;
  updateGif: (storageKey: string) => void;
}


export default function ButtonRandomGif({ storageKey, updateGif }: IProps) {
  return (<div className={`Button Button--refresh`} onClick={ onClick } />);

  function onClick() {
    updateGif(storageKey);
  }
}