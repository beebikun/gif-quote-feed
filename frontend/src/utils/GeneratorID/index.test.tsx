import GeneratorID from './index';


it('test fake id', () => {
  const FakeId = new GeneratorID();
  const id1 = FakeId.next();
  const id2 = FakeId.next();
  expect(id1)
    .not
    .toBe(id2);

  expect(FakeId.is(id1))
    .toBe(true);

  expect(FakeId.is('not fake id'))
    .toBe(false);
});


it('test prefix', () => {
  const prefix = 'STORAGE';
  const Generator = new GeneratorID(prefix);
  const id = Generator.next();
  expect(id).toMatch(new RegExp(`^${ prefix }_\\d+_\\d+$`));
});