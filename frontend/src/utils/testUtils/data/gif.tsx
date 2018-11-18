import { IGifRaw, IResponse, SIZE_FIELD } from 'data/api/Giphy';

import * as records from 'data/records';


export const _ITEM = new records.Gif({ height: 200, src: 'src', width: 200 });

export function getResponse(): IResponse {
  const _RAW_ITEM: IGifRaw = {
    id: 'id',
    images: {
      [ SIZE_FIELD ]: {
        height: 200,
        url: 'src',
        width: 200,
      },
    },
    title: 'title',
  };

  return { data: { data: _RAW_ITEM } };
}