import Immutable from 'immutable';

import Gif from './Gif';

interface IItem {
  id: string;
  gif: Gif;
  text: string;
}

declare class Item {
  id: string;
  gif: Gif;
  text: string;

  constructor(data: IItem): void;

  set(key: 'id', value: string): Item;
  // set(key: 'complete', value: boolean): Todo;
  // set(key: 'text', value: string): Todo;

  get(key: 'id'): string;

  toObject(): IItem;
}

const Item = Immutable.Record({
  id: '',
  gif: Gif,
  text: '',
});

export default Item;