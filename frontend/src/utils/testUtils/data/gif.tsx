import { IGifRaw, IResponse, SIZE_FIELD } from 'api/Giphy';

import Gif from 'api/records/Gif';

export const _ITEM = new Gif({ height: 200, src: 'src', width: 200 });

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