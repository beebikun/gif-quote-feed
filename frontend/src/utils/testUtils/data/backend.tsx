import { _ITEM as _GIF } from './gif';
import { IItemRaw, IResponse } from 'api/Backend';

export const _ITEM: IItemRaw = Object.freeze({ id: '1', gif: _GIF, text: 'text' });

export function getResponse(): IResponse {
  return { data: _ITEM };
}

export function getListReponse(): IResponse<IItemRaw[]> {
  return { data: [ _ITEM ] };
}
