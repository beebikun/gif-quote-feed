import generateArray from './index';

it('test generator', () => {
  const items = [ { i: 0 }, { i: 1 } ];
  const result = generateArray(items.length, (_: undefined, i: number) => ({ i }));

  expect(result).toEqual(items);
});