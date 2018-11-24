import quotesApi, { COUNT } from './Andruxnet';
import giphyApi from './Giphy';

import * as records from 'data/records';

import api from './index';

import { FakeID } from 'utils';
import generateArray from 'utils/generateArray';

import { _ITEM as _GIF_ITEM } from 'utils/testUtils/data/gif';


function expectItemsList(data: records.Item[], size: number) {
  expect(data).toBeInstanceOf(Array);
  expect(data).toHaveLength(size);

  const expected = expect.any(records.Item);
  expect(data).toContainEqual(expected);
}


describe('Random', () => {
  const mockedGif = jest.spyOn(giphyApi, 'random');
  mockedGif.mockReturnValue(Promise.resolve(_GIF_ITEM));

  const mockedQuotes = jest.spyOn(quotesApi, 'get');
  mockedQuotes.mockReturnValueOnce(Promise.resolve(generateArray(COUNT, () => 'text')));

  it('list', () => {
    mockedGif.mockClear();
    mockedQuotes.mockClear();

    return api.list()
      .then((data: records.Item[]) => {
        expect(mockedGif).toHaveBeenCalledTimes(COUNT);
        expect(mockedQuotes).toHaveBeenCalledTimes(1);

        expectItemsList(data, COUNT);

        const ids: string[] = data.map(({ id }) => id);
        const uniqIds = new Set(ids).size;
        const fakeIds = ids.filter((id) => FakeID.is(id));
        expect(ids)
          .toHaveLength(uniqIds);
        expect(fakeIds)
          .toHaveLength(uniqIds);
      });
  });

  it('gif', () => {
    mockedGif.mockClear();

    return api.randomGif()
      .then((data: records.Gif) => {
        expect(mockedGif).toHaveBeenCalledTimes(1);

        const expected = expect.any(records.Gif);
        expect(data).toMatchObject(expected);
      });
  });
});
