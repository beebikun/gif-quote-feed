import axios from 'axios';

// export interface IMockedModule {
//   [key: string]: IMockedMethod;
//   [key: string]: mockImplementationOnce;
// }

export interface IMockedMethod {
  mock: {
    calls: {
      length: number
    }
  };
}

export function clearMethod(method: string): void {
  axios[method].mockClear();
}

export function expectCall<T>(method: string, params: T[]): void {
  const calls = (axios[method] as IMockedMethod).mock.calls;
  expect(calls).toHaveLength(1);

  expect(typeof calls[0][0] === 'string').toBe(true);
  expect(calls[0].slice(1)).toEqual(params);
}
