import FakeId from './index';

it('test fake id', () => {
  const id1 = FakeId.next();
  const id2 = FakeId.next();
  expect(id1)
    .not
    .toBe(id2);

  expect(FakeId.isFake(id1))
    .toBe(true);

  expect(FakeId.isFake('not fake id'))
    .toBe(false);
});