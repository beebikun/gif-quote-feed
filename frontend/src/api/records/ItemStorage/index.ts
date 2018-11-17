import * as Immutable from 'immutable';
import Item from '../Item';

interface IOrdered {
  [id: string]: Item;
}

function getOrdered(items: Item[]): IOrdered {
  return items.reduce((bucket: IOrdered, item: Item): IOrdered => {
    const id: string = item.id;
    bucket[id] = item;

    return bucket;
  }, Object.create(null));
}

export type IStorage = Immutable.OrderedMap<string, Item>;

export default class ItemStorage {
  public readonly items: IStorage;

  constructor(items: Item[] = []) {
    const ordered: IOrdered = getOrdered(items);
    this.items = Immutable.OrderedMap<Item>(ordered);
  }

  public set(items: Item[]): ItemStorage {
    return new ItemStorage(items);
  }

  public array(): Item[] {
    const items: IterableIterator<Item> = this.items.values();

    return Array.from(items);
  }
}