import api, { COUNT } from './index';

import { expectCall, clearMethod } from '__mocks__/axios-utils';


const headers = expect.objectContaining({
  headers: expect.any(Object),
});


it('test get quotes list', () => {
  clearMethod('get');

  return api.get()
    .then((data: string[]) => {
      expectCall('get', [headers]);

      expect(data).toMatchObject(expect.any(Array));
      expect(data).toHaveLength(COUNT);

      const expected = expect.any(String);
      expect(data).toContainEqual(expected);
    });
});
