import api, { IItemRaw } from './index';

import * as records from 'data/records';

import { expectCall, clearMethod } from '__mocks__/axios-utils';
import { _ITEM } from 'utils/testUtils/data/backend';

const expectedItem = expect.objectContaining({
  gif: expect.any(records.Gif),
  id: expect.any(String),
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

  return api.create(_ITEM)
    .then((data: IItemRaw) => {
      expectCall<IItemRaw>('post', [_ITEM]);
      expect(data).toMatchObject(expectedItem);
    });
});


it('delete', () => {
  clearMethod('delete');

  return api.delete(_ITEM.id)
    .then(() => {
      expectCall<IItemRaw>('delete', []);
    });
});

