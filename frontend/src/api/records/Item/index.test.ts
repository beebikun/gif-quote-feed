import Item, { IProps } from './index';
import Gif from 'api/records/Gif';
import { FakeID } from 'utils';


function getItem(props: Partial<IProps>): Item {
  const item = new Item(props);
  Object.keys(props)
    .forEach((key: string) => {
      expect(item[key])
        .toEqual(props[key]);
    });

  return item;
}


it('create with id', () => {
  getItem({
    gif: new Gif(),
    id: '1',
    text: '111',
  });
});

it('create without id', () => {
  const item = getItem({
    gif: new Gif(),
    text: '111',
  });
  expect(FakeID.isFake(item.id))
    .toBe(true);
});

it('get object', () => {
  const item = getItem({
    gif: new Gif(),
    id: '1',
    text: '111',
  });
  const obj = item.toObject();
  expect(item.gif)
    .toBe(obj.gif);
  expect(item.id)
    .toBe(obj.id);
  expect(item.text)
    .toBe(obj.text);
});


it('reset id', () => {
  const item = getItem({
    gif: new Gif(),
    id: '1',
    text: '111',
  });
  expect(FakeID.isFake(item.id))
    .toBe(false);

  const reseted = item.resetId();
  expect(FakeID.isFake(reseted.id))
    .toBe(true);
});


it('get id: existed', () => {
  const item = getItem({
    gif: new Gif(),
    id: '1',
    text: '111',
  });
  const id = item.getId();
  expect(id)
    .toBe(item.id);
});


it('get id: not existed', () => {
  const item = getItem({
    gif: new Gif(),
    text: '111',
  });
  const id = item.getId();
  expect(id)
    .toBeUndefined();
});

it('get data', () => {
  const item = getItem({
    gif: new Gif(),
    id: '1',
    text: '111',
  });
  const data = item.data();
  expect(data.gif)
    .toBe(item.gif);
  expect(data.text)
    .toBe(item.text);
  expect(data.id)
    .toBeUndefined();
});