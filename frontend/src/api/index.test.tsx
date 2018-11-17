import backedApi, { IItemRaw } from './Backend';
import quotesApi, { COUNT } from './Andruxnet';
import giphyApi from './Giphy';
import Gif from 'api/records/Gif';
import Item from 'api/records/Item';

import api from './index';

import FakeID from 'utils/FakeID';
import generateArray from 'utils/generateArray';

import { _ITEM as _BACKEND_ITEM } from 'utils/testUtils/data/backend';
import { _ITEM as _GIF_ITEM } from 'utils/testUtils/data/gif';


function expectItemsList(data: Item[], size: number) {
  expect(data).toMatchObject(expect.any(Array));
  expect(data).toHaveLength(size);

  const expected = expect.any(Item);
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

    return api.randomItemsList()
      .then((data: Item[]) => {
        expect(mockedGif).toHaveBeenCalledTimes(COUNT);
        expect(mockedQuotes).toHaveBeenCalledTimes(1);

        expectItemsList(data, COUNT);

        const ids: string[] = data.map(({ id }) => id);
        const uniqIds = new Set(ids).size;
        const fakeIds = ids.filter((id) => FakeID.isFake(id));
        expect(ids)
          .toHaveLength(uniqIds);
        expect(fakeIds)
          .toHaveLength(uniqIds);
      });
  });

  it('gif', () => {
    mockedGif.mockClear();

    return api.randomGif()
      .then((data: Gif) => {
        expect(mockedGif).toHaveBeenCalledTimes(1);

        const expected = expect.any(Gif);
        expect(data).toMatchObject(expected);
      });
  });
});


describe('Saved', () => {
  it('create', () => {
    const item = new Item({ ..._BACKEND_ITEM, id: FakeID.next() });
    const newId = 'newId';
    const mocked = getMock('create', { ..._BACKEND_ITEM, id: newId });

    return api.saveItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        const { id, ...callData } = item.toObject() as IItemRaw;
        expect(mocked).toHaveBeenCalledWith(callData);

        testItem(data, newId);
      });
  });

  it('edit', () => {
    const item = new Item(_BACKEND_ITEM);
    const mocked = getMock('edit', _BACKEND_ITEM);

    return api.saveItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(mocked).toHaveBeenCalledWith(item.id, item);

        testItem(data, _BACKEND_ITEM.id);
      });
  });

  it('delete', () => {
    const item = new Item(_BACKEND_ITEM);
    const mocked = getMock('delete', undefined);

    return api.deleteItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(mocked).toHaveBeenCalledWith(_BACKEND_ITEM.id);

        testItem(data);
      });
  });

  it('delete not existed', () => {
    const item = new Item({ ..._BACKEND_ITEM, id: FakeID.next() });
    const mocked = getMock('delete', undefined);

    return api.deleteItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(0);

        testItem(data);
        expect(data.id)
          .toBe(item.id);
      });
  });

  it('list', () => {
    const items = [ _BACKEND_ITEM ];
    const mocked = getMock('list', items);

    return api.savedItemsList()
      .then((data: Item[]) => {
        expect(mocked).toHaveBeenCalledTimes(1);

        expectItemsList(data, items.length);

        const ids: string[] = data.map(({ id }) => id);
        const fakeIds = ids.filter((id) => FakeID.isFake(id));
        expect(ids)
          .toHaveLength(items.length);
        expect(fakeIds)
          .toHaveLength(0);
      });
  });

  type BackendMethods = keyof typeof backedApi;
  /* tslint:disable:no-any */
  function getMock(method: BackendMethods, resolve: any) {
    const mocked = jest.spyOn(backedApi, method);
    /* tslint:disable:no-any */
    mocked.mockImplementationOnce((): Promise<any> => Promise.resolve(resolve));
    mocked.mockClear();

    return mocked;
  }


  function testItem(result: Item, oldId?: string): void {
    const expected = expect.any(Item);
    expect(result).toMatchObject(expected);

    const id: string = result.id;
    const isFakeId = FakeID.isFake(id);
    expect(isFakeId)
      .toBe(oldId === undefined);

    if (oldId) {
      expect(id)
        .toBe(oldId);
    }
  }
});
