import { IGifRaw, IResponse, SIZE_FIELD } from 'data/services/random/Giphy';
import defGif from './def.gif';
import * as records from 'data/records';


let i = 0;

export const _ITEM = new records.Gif({
  height: 200,
  src: process.env.NODE_ENV === 'test' ? 'src' : defGif,
  width: 200
});

export function getResponse(): IResponse {
  const _RAW_ITEM: IGifRaw = {
    id: 'id',
    images: {
      [ SIZE_FIELD ]: {
        height: 200,
        url: process.env.NODE_ENV === 'test' ? 'src' + i : defGif,
        width: 200,
      },
    },
    title: 'title',
  };
  i += 1;

  return { data: { data: _RAW_ITEM } };
}