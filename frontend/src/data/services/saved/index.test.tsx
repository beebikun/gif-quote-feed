import * as records from 'data/records';
import api from './index';
import backedApi, { IItemRaw } from './Backend';
import { FakeID } from 'utils';
import { _ITEM as _BACKEND_ITEM } from 'utils/testUtils/data/backend';


describe('List', () => {
  it('list', () => {
    const items = [ _BACKEND_ITEM ];
    const backendMocked = getMockedBackendMethod('list', items);

    return api.list()
      .then((data: records.Item[]) => {
        expect(backendMocked).toHaveBeenCalledTimes(1);

        expectItemsList(data, items.length);

        const ids: string[] = data.map(({ id }) => id);
        const fakeIds = ids.filter((id) => FakeID.is(id));
        expect(ids)
          .toHaveLength(items.length);
        expect(fakeIds)
          .toHaveLength(0);
      });
  });

  function expectItemsList(data: records.Item[], size: number) {
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(size);

    const expected = expect.any(records.Item);
    expect(data).toContainEqual(expected);
  }
});

describe('Item', () => {
  describe('Save', () => {
    const NEW_ID = 'savedId';

    function callSave(item: records.Item, mustBeCalled: boolean): Promise<any> {
      const backendMocked = getMockedBackendMethod('create', { ..._BACKEND_ITEM, id: NEW_ID });

      return api.saveItem(item)
        .then((data: records.Item) => {
          expect(backendMocked).toHaveBeenCalledTimes(mustBeCalled ? 1 : 0);
          if (mustBeCalled) {
            const { id, ...callData } = item.toObject();
            expect(backendMocked).toHaveBeenCalledWith(callData);
          }

          return data;
        });
    }

    it('create: call backendApi and return new id', () => {
      const notSavedItem = new records.Item({ ..._BACKEND_ITEM, id: FakeID.next() });

      return callSave(notSavedItem, true)
        .then((data: records.Item) => {
          testItem(data, false, NEW_ID);
        });
    });

    it('create already existed: doesnt call backedApi, return the same item', () => {
      const SAVED_ID = 'some saved id';
      const savedItem = new records.Item({ ..._BACKEND_ITEM, id: SAVED_ID });

      return callSave(savedItem, false)
        .then((data: records.Item) => {
          testItem(data, false, SAVED_ID);
        });
    });
  });

  describe('Delete', () => {
    function callDelete(item: records.Item, mustBeCalled: boolean): Promise<any> {
      const backendMocked = getMockedBackendMethod('delete', undefined);

      return api.deleteItem(item)
        .then((data: records.Item) => {
          expect(backendMocked).toHaveBeenCalledTimes(mustBeCalled ? 1 : 0);
          if (mustBeCalled) {
            expect(backendMocked).toHaveBeenCalledWith(item.id);
          }

          return data;
        });
    }

    it('delete: call backedApi and return new fake id', () => {
      const savedItem = new records.Item(_BACKEND_ITEM);

      return callDelete(savedItem, true)
        .then((data: records.Item) => {
          testItem(data, true, null);
        });
    });

    it('delete not existed: doesnt call backedApi, return the same item', () => {
      const notSavedItem = new records.Item({ ..._BACKEND_ITEM, id: FakeID.next() });

      return callDelete(notSavedItem, false)
        .then((data: records.Item) => {
          testItem(data, true, notSavedItem.id);
        });
    });
  });

  function testItem(item: records.Item, isFake: boolean,
                    itemId: string | null): void {
    expect(item).toBeInstanceOf(records.Item);

    const isFakeId = FakeID.is(item.id);
    expect(isFakeId)
      .toBe(isFake);

    if (itemId !== null) {
      expect(item.id)
        .toEqual(itemId);
    }
  }
});

type BackendMethods = keyof typeof backedApi;
/* tslint:disable:no-any */
function getMockedBackendMethod(method: BackendMethods, resolve: any) {
  const backendMocked = jest.spyOn(backedApi, method);
  /* tslint:disable:no-any */
  backendMocked.mockImplementationOnce((): Promise<any> => Promise.resolve(resolve));
  backendMocked.mockClear();

  return backendMocked;
}

