import axios from 'axios';

import backendApi, { IItemRaw, IUnsavedItem } from './Backend';
import quoteApi, { COUNT } from './Andruxnet';
import giphyApi from './Giphy';

import Item from 'api/records/Item';
import Gif from 'api/records/Gif';

import generateArray from 'utils/generateArray';


class Api {
  public randomItemsList(): Promise<Item[]> {
    type IPromiseQuote = Promise<string[]>;
    type IPromiseGif = Promise<Gif>;
    type IPromise = IPromiseQuote | IPromiseGif;

    const gifPromises: IPromiseGif[] = generateArray<Promise<Gif>>(COUNT, () => this.randomGif());
    const promises: IPromise[] = [ quoteApi.get(), ...gifPromises ];

    return axios.all<IPromise>(promises)
      .then(spreadResult);

    /* tslint:disable:no-any */
    function spreadResult(results: any[]): Item[] {
      const quotes = results[0] as string[];
      const gifs = results.slice(1) as Gif[];
      const size: number = Math.min(quotes.length, gifs.length);

      return generateArray<Item>(size, createItem);

      function createItem(_: undefined, i: number): Item {
        return new Item({
          gif: gifs[i],
          text: quotes[i],
        });
      }
    }
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
    const id = item.getId();

    if (id === undefined) {
      return backendApi.create(item.data() as IUnsavedItem)
        .then((rawItem: IItemRaw) => {
          return item.set('id', rawItem.id);
        });
    }
    else {
      return backendApi.edit(id, item)
        .then(() => item);
    }
  }

  public deleteItem(item: Item): Promise<Item> {
    const id = item.getId();
    if (id === undefined) {
      return Promise.resolve(item);
    }

    return backendApi.delete(id)
      .then(() => {
        return item.resetId();
      });
  }
}


export default new Api();