import axios from 'axios';

import * as records from 'data/records';
import generateArray from 'utils/generateArray';

import backendApi, { IItemRaw, IUnsavedItem } from './Backend';
import quoteApi, { COUNT } from './Andruxnet';
import giphyApi from './Giphy';

export { COUNT } from './Andruxnet';


class Api {
  public randomItemsList(): Promise<records.Item[]> {
    type IPromiseQuote = Promise<string[]>;
    type IPromiseGif = Promise<records.Gif>;
    type IPromise = IPromiseQuote | IPromiseGif;

    const gifPromises: IPromiseGif[] = generateArray<Promise<records.Gif>>(COUNT, () => this.randomGif());
    const promises: IPromise[] = [ quoteApi.get(), ...gifPromises ];

    return axios.all<IPromise>(promises)
      .then(spreadResult);

    /* tslint:disable:no-any */
    function spreadResult(results: any[]): records.Item[] {
      const quotes = results[0] as string[];
      const gifs = results.slice(1) as records.Gif[];
      const size: number = Math.min(quotes.length, gifs.length);

      return generateArray<records.Item>(size, createItem);

      function createItem(_: undefined, i: number): records.Item {
        return new records.Item({
          gif: gifs[i],
          text: quotes[i],
        });
      }
    }
  }

  public randomGif(): Promise<records.Gif> {
    return giphyApi.random();
  }

  /* ------------------------------------------- */

  public savedItemsList(): Promise<records.Item[]> {
    return backendApi.list()
      .then((data: IItemRaw[]) => {
        return data.map(d => new records.Item(d));
      });
  }

  /* ------------------------------------------- */

  public saveItem(item: records.Item): Promise<records.Item> {
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

  public deleteItem(item: records.Item): Promise<records.Item> {
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
