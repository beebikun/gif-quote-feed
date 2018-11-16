import backedApi, { _TEST_BACKEND_ITEM, IItemRaw } from './Backend';
import quotesApi, { COUNT } from './Andruxnet';
import giphyApi, { Gif, _TEST_GIF } from './Giphy';

import api, { Item } from './index';

import FakeID from 'utils/FakeID';
import generateArray from 'utils/generateArray';
import { IMockedMethod } from '__mocks__/axios-utils';


function expectItemsList(data, size) {
  expect(data).toMatchObject(expect.any(Array));
  expect(data).toHaveLength(size);

  const expected = expect.any(Item);
  expect(data).toContainEqual(expected);
}


describe('Random', () => {
  const mockedGif = jest.spyOn(giphyApi, 'random');
  mockedGif.mockReturnValue(Promise.resolve(_TEST_GIF));

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
    const item = new Item({ ..._TEST_BACKEND_ITEM, id: FakeID.next() });
    const newId = 'newId';
    const mocked = getMock('create', { ..._TEST_BACKEND_ITEM, id: newId });

    return api.saveItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        const { id, ...callData } = item.toObject();
        expect(mocked).toHaveBeenCalledWith(callData);

        testItem(data, newId);
      });
  });

  it('edit', () => {
    const item = new Item(_TEST_BACKEND_ITEM);
    const mocked = getMock('edit');

    return api.saveItem(item)
      .then((data: Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        const { id, ...callData } = item.toObject();
        expect(mocked).toHaveBeenCalledWith(id, callData);

        testItem(data, _TEST_BACKEND_ITEM.id);
      });
  });

  it('delete', () => {
    const item = new Item(_TEST_BACKEND_ITEM);
    const mocked = getMock('delete');

    return api.deleteItem(item)
      .then(() => {
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(mocked).toHaveBeenCalledWith(_TEST_BACKEND_ITEM.id);
      });
  });

  it('delete not existed', () => {
    const item = new Item({ ..._TEST_BACKEND_ITEM, id: FakeID.next() });
    const mocked = getMock('delete');

    const promise = api.deleteItem(item);
    expect(promise).toBeUndefined();
    expect(mocked).toHaveBeenCalledTimes(0);
  });

  it('list', () => {
    const items = [ _TEST_BACKEND_ITEM ];
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

  function getMock(method: string, resolve?: IItemRaw | IItemRaw[]): void {
    const mocked = jest.spyOn(backedApi, method);
    mocked.mockReturnValueOnce(Promise.resolve(resolve));
    mocked.mockClear();

    return mocked;
  }


  function testItem(result: Item, oldId?: string): void {
    const expected = expect.any(Item);
    expect(result).toMatchObject(expected);

    const id = result.get('id');
    const isFakeId = FakeID.isFake(id);
    expect(isFakeId)
      .toBe(oldId === undefined);

    if (oldId) {
      expect(id)
        .toBe(oldId);
    }
  }
});