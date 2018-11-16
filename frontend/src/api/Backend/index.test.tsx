import api, { IItemRaw, _TEST_BACKEND_ITEM } from './index';
import { Gif } from 'api/Giphy';
import { expectCall, clearMethod } from '__mocks__/axios-utils';


const expectedItem = expect.objectContaining({
  id: expect.any(String),
  gif: expect.any(Gif),
  text: expect.any(String),
});


it('list', () => {
  clearMethod('get');

  return api.list()
    .then((data: IItemRaw[]) => {
      expectCall<IItemRaw>('get', []);
      expect(data).toContainEqual(expectedItem);
    });
});


it('create', () => {
  clearMethod('post');

  return api.create(_TEST_BACKEND_ITEM)
    .then((data: IItemRaw) => {
      expectCall<IItemRaw>('post', [_TEST_BACKEND_ITEM]);
      expect(data).toMatchObject(expectedItem);
    });
});


it('edit', () => {
  clearMethod('put');

  return api.edit(_TEST_BACKEND_ITEM.id, _TEST_BACKEND_ITEM)
    .then((data: IItemRaw) => {
      expectCall<IItemRaw>('put', [_TEST_BACKEND_ITEM]);
      expect(data).toMatchObject(expectedItem);
    });
});


it('delete', () => {
  clearMethod('delete');

  return api.delete(_TEST_BACKEND_ITEM.id)
    .then(() => {
      expectCall<IItemRaw>('delete', []);
    });
})

