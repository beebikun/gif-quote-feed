import { ReactWrapper } from 'enzyme';
import { FakeID } from 'utils';
import store from 'data/storage';
import { IStorageEntry, IStorage } from 'data/reducers/utils';


export default function expectToggleSave(wrapper: ReactWrapper
                          toRemove: boolean, [oldKey, oldItem]: IStorageEntry): void {
  const items: IStorage = store.getState().items;
  const [newKey, newItem]: IStorageEntry = items.toArray()[0];

  expect(newKey)
    .toEqual(oldKey);
  expect(newItem.id)
    .not.toEqual(oldItem.id);
  expect(FakeID.is(newItem.id))
    .toBe(toRemove === true);
  expect(newItem.gif)
    .toEqual(oldItem.gif);

  const FeedItem = wrapper
    .find('FeedItem')
    .at(0);
  const ButtonRandomGif = FeedItem.find('ButtonRandomGif');
  expect(ButtonRandomGif).toHaveLength(toRemove ? 1 : 0);
  const SaveButton = FeedItem.find('ButtonAdd')
    .filterWhere(n => n.prop('isSaved') === false);
  expect(SaveButton).toHaveLength(toRemove ? 1 : 0);
  const DeleteButton = FeedItem.find('ButtonAdd')
    .filterWhere(n => n.prop('isSaved') === true);
  expect(DeleteButton).toHaveLength(toRemove ? 0 : 1);
}