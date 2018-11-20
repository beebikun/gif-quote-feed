import api from './index';
import * as records from 'data/records';
import { expectCall, clearMethod } from '__mocks__/axios-utils';


function expectData(data: records.Gif) {
  const expected = expect.any(records.Gif);
  expect(data)
    .toMatchObject(expected);
}

it('test translate', () => {
  clearMethod('get');
  const s = 'query';

  return api.translate(s)
    .then((data: records.Gif) => {
      expectCall('get', []);
      expectData(data);
    });
});


it('test random', () => {
  clearMethod('get');

  return api.random()
    .then((data: records.Gif) => {
      expectCall('get', []);
      expectData(data);
    });
});
