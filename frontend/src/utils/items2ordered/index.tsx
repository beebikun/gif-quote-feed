import Item from 'api/records/Item';
import * as Immutable from 'immutable';

interface IOrdered {
  [id: string]: Item;
}

type ItemStorage = Immutable.OrderedMap<string, Item>;


export default function items2ordered(items: Item[]): ItemStorage {
  const ordered: IOrdered = items.reduce((bucket: IOrdered, item: Item): IOrdered => {
    const id: string = item.id;
    bucket[id] = item;

    return bucket;
  }, Object.create(null));

  return Immutable.OrderedMap<Item>(ordered);
}