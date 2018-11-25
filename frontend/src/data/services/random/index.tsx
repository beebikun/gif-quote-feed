import axios from 'axios';

import * as records from 'data/records';
import generateArray from 'utils/generateArray';

import quoteApi, { COUNT } from './Andruxnet';
import giphyApi from './Giphy';

export { COUNT } from './Andruxnet';


class Api {
  public list(): Promise<records.Item[]> {
    type IPromiseQuote = Promise<string[]>;
    type IPromiseGif = Promise<records.Gif>;
    type IPromise = IPromiseQuote | IPromiseGif;

    const gifPromises: IPromiseGif[] = generateArray<Promise<records.Gif>>(COUNT, () => this.randomGif());
    const promises: IPromise[] = [ quoteApi.get(), ...gifPromises ];

    return axios.all<IPromise>(promises)
      .then(spreadResult);

    /* tslint:disable-next-line:no-any */
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
}


export default new Api();
