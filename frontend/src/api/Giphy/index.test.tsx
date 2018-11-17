import api from './index';
import Gif from 'api/records/Gif';
import { expectCall, clearMethod } from '__mocks__/axios-utils';


function expectData(data: Gif) {
  const expected = expect.any(Gif);
  expect(data)
    .toMatchObject(expected);
}

it('test translate', () => {
  clearMethod('get');
  const s = 'query';

  return api.translate(s)
    .then((data: Gif) => {
      expectCall('get', []);
      expectData(data);
    });
});


it('test random', () => {
  clearMethod('get');

  return api.random()
    .then((data: Gif) => {
      expectCall('get', []);
      expectData(data);
    });
});