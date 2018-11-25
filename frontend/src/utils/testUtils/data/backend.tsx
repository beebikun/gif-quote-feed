import { _ITEM as _GIF } from './gif';
import { IItemRaw, IResponse } from 'data/services/saved/Backend';
import { generateArray } from 'utils';

export const _ITEM: IItemRaw = Object.freeze({ id: '1', gif: _GIF, text: 'text' });

export function getResponse(): IResponse {
  return { data: _ITEM };
}
export const _COUNT = 5;
export function getListReponse(): IResponse<IItemRaw[]> {
  const data = generateArray(_COUNT, (_, i) => {
    return Object.freeze({ id: 'SAVED_' + i, gif: _GIF, text: 'text' });
  });

  return { data };
}
