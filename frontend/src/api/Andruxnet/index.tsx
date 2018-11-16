import axios from 'axios';

const CAT = 'movies';  // "movies" or "famous"
export const COUNT = 9;
export const BASE_URL = 'https://andruxnet-random-famous-quotes.p.mashape.com/';
const URL = `${ BASE_URL }?cat=${ CAT }&count=${ COUNT }`;
const API_KEY = 'onAjInPSKymshNzgMRBkYmyEamZep11hZqhjsnRVS8YhEfXaX7';

export type IQuote {
  readonly author: string;
  readonly quote: string;
  // category: string;
}

export interface IResponse {
  data: IQuote[];
}

class API {
  public get (): Promise<string[]> {
    return axios.get(URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Mashape-Key': API_KEY,
      }
    }).then(({ data }: IResponse) => raw2string(data));
  }
}

function raw2string(data): string[] {
  return data.map(({ quote }: IQuote) => quote);
}

export default new API();

export const _TEST_QUOTE: IQuote = { quote: 'quote', author: 'author' };
export const _TEST_QUOTE_RESPONSE: IResponse = { data: new Array(COUNT).fill(_TEST_QUOTE) };
