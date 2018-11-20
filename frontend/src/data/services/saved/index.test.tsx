import * as records from 'data/records';

import api from './index';
import backedApi, { IItemRaw } from './Backend';
import FakeID from 'utils/FakeID';
import { _ITEM as _BACKEND_ITEM } from 'utils/testUtils/data/backend';

describe('Saved', () => {
  it('create', () => {
    const item = new records.Item({ ..._BACKEND_ITEM, id: FakeID.next() });
    const newId = 'newId';
    const mocked = getMock('create', { ..._BACKEND_ITEM, id: newId });

    return api.saveItem(item)
      .then((data: records.Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        const { id, ...callData } = item.toObject() as IItemRaw;
        expect(mocked).toHaveBeenCalledWith(callData);

        testItem(data, newId);
      });
  });

  it('edit', () => {
    const item = new records.Item(_BACKEND_ITEM);
    const mocked = getMock('edit', _BACKEND_ITEM);

    return api.saveItem(item)
      .then((data: records.Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(mocked).toHaveBeenCalledWith(item.id, item);

        testItem(data, _BACKEND_ITEM.id);
      });
  });

  it('delete', () => {
    const item = new records.Item(_BACKEND_ITEM);
    const mocked = getMock('delete', undefined);

    return api.deleteItem(item)
      .then((data: records.Item) => {
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(mocked).toHaveBeenCalledWith(_BACKEND_ITEM.id);

        testItem(data);
      });
  });

  it('delete not existed', () => {
    const item = new records.Item({ ..._BACKEND_ITEM, id: FakeID.next() });
    const mocked = getMock('delete', undefined);

    return api.deleteItem(item)
      .then((data: records.Item) => {
        expect(mocked).toHaveBeenCalledTimes(0);

        testItem(data);
        expect(data.id)
          .toBe(item.id);
      });
  });

  it('list', () => {
    const items = [ _BACKEND_ITEM ];
    const mocked = getMock('list', items);

    return api.list()
      .then((data: records.Item[]) => {
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


  function testItem(result: records.Item, oldId?: string): void {
    const expected = expect.any(records.Item);
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


function expectItemsList(data: records.Item[], size: number) {
  expect(data).toBeInstanceOf(Array);
  expect(data).toHaveLength(size);

  const expected = expect.any(records.Item);
  expect(data).toContainEqual(expected);
}

