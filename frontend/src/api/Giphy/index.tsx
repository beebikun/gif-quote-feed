import axios from 'axios';

import Gif from 'api/records/Gif';
export { default as Gif } from 'api/records/Gif';

const API_KEY = 'OvUTl0xhE2Gd9tiEcCZadiokCumhviZG';
export const BASE_URL = 'http://api.giphy.com/v1/gifs/';

const SIZE_FIELD = 'original';

export interface IGifRaw {
  readonly id: string;
  readonly images: {
    readonly [ SIZE_FIELD ]: {
      readonly url: string;
      readonly width: number;
      readonly height: number;
      // mp4: string,
    };
  };
  readonly title: string;
}

export interface IResponse {
  data: {
    data: IGifRaw;
  };
}

class API {
  public translate (s: string): Promise<IGif> {
    const weirdness = 10;
    const url = `${ getUrl('translate') }&s=${ s }&weirdness=${ weirdness }`;

    return axios.get(url)
      .then(({ data }: IResponse) => row2gif(data.data));
  }

  public random (): Promise<Gif> {
    const tag = 'cartoon';
    const url = `${ getUrl('random') }&tag=${ tag }`;

    return axios.get(url)
      .then(({ data }: IResponse) => row2gif(data.data));
  }
}


function row2gif({ id, images }: IGifRaw): Gif {
  const data = images[SIZE_FIELD];

  return new Gif({
    height: data.height,
    src: data.url,
    width: data.width,
  });
}

function getUrl(name: string) {
  return `${ BASE_URL }${ name }?api_key=${ API_KEY }`;
}

export default new API();


export const _TEST_GIF_RAW: IGifRaw = {
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
export const _TEST_GIF: Gif = row2gif(_TEST_GIF_RAW);
export const _TEST_GIF_RESPONSE = { data: { data: _TEST_GIF_RAW } };
