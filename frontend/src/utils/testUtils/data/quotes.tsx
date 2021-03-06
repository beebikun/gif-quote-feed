import { COUNT, IQuote, IResponse } from 'data/services/random/Andruxnet';

export const _ITEM: IQuote = Object.freeze({ quote: 'quote', author: 'author' });

export function getResponse(): IResponse {
  return { data: new Array(COUNT).fill(_ITEM) };
}