import axios from 'axios';

import backendApi, { IItemRaw } from './Backend';
import quoteApi, { COUNT } from './Andruxnet';
import giphyApi, { Gif } from './Giphy';

import Item from 'api/records/Item';
export { default as Item} from 'api/records/Item';

import generateArray from 'utils/generateArray';
import FakeID from 'utils/FakeID';

class Api {
  public randomItemsList(): Promise<Item[]> {
    const quotePromise: Promise<string[]>  = quoteApi.get();
    const gifPromises: Promise<Gif>[] = generateArray(COUNT, () => this.randomGif());

    return axios.all([quotePromise, ...gifPromises])
      .then(axios.spread((quotes: string[], ...gifs: Gif[]) => {
        const size: number = Math.min(quotes.length, gifs.length);
    
        return generateArray(size, createItem);

        function createItem(_: undefined, i: number): Item {
          return new Item({
            id: FakeID.next(),
            gif: gifs[i],
            text: quotes[i],
          });
        }
      }));
  }

  public randomGif(): Promise<Gif> {
    return giphyApi.random();
  }

  /* ------------------------------------------- */ 

  public savedItemsList(): Promise<Item[]> {
    return backendApi.list()
      .then((data: IItemRaw[]) => {
        return data.map(d => new Item(d));
      });
  }

  /* ------------------------------------------- */ 

  public saveItem(item: Item): Promise<Item> {
    const { id, ...data }: IItemRaw = item2raw(item);
    if (id === undefined) {
      return backendApi.create(data)
        .then(({ id }: IItemRaw) => {
          return item.set('id', id);
        });
    }
    else {
      return backendApi.edit(id, data)
        .then(() => {
          return item;
        });
    }
  }

  public deleteItem(item: Item): Promise<Item> | void {
    const { id }: IItemRaw = item2raw(item);
    if (id === undefined) {
      return;
    }

    return backendApi.delete(id)
      .then(() => {
        return item.set('id', FakeID.next())
      });
  }
}

function item2raw(item: Item): IItemRaw {
  const data: IItemRaw = { ...item.toObject() };
  if (FakeID.isFake(data.id)) {
    data.id = undefined;
  }
  return data;
}


export default new Api();