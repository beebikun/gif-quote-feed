import { IGifRaw, IResponse, SIZE_FIELD } from 'data/services/random/Giphy';

import * as records from 'data/records';


let i = 0;

export const _ITEM = new records.Gif({ height: 200, src: 'src', width: 200 });

export function getResponse(): IResponse {
  const _RAW_ITEM: IGifRaw = {
    id: 'id',
    images: {
      [ SIZE_FIELD ]: {
        height: 200,
        url: 'src' + i,
        width: 200,
      },
    },
    title: 'title',
  };
  i += 1;

  return { data: { data: _RAW_ITEM } };
}