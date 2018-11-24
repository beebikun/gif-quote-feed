import { ReactWrapper } from 'enzyme';
import { IStorageEntry } from 'data/reducers/utils';
import App from 'components';
import store from 'data/storage';
// // import Item from 'api/records/Item';
import { COUNT as RANDOM_ITEMS_COUNT } from 'data/services/random/Andruxnet';
import { _COUNT as SAVED_ITEMS_COUNT } from 'utils/testUtils/data/backend';
import { FakeID } from 'utils';
import { renderTestSequence, IStepFunction, IStepFunctionProps } from './router';


function expectApp(initialPath: string, isRandom: boolean, steps: IStepFunction[], count: number): Promise<any> {
  return new Promise(resolve => {
    const _steps = [ expectCallFetch, expectLoadItems ].concat(steps.slice(1));
    const firstStep = steps[0] || Function.prototype;
    const lastStep = _steps[_steps.length - 1];
    _steps[_steps.length - 1] = function(props: IStepFunctionProps) {
      lastStep(props);
      resolve();
    }

    renderTestSequence(App, {
      initialPath,
      steps: _steps,
    });

    function expectCallFetch({ wrapper }: IStepFunctionProps): void {
      const Header = wrapper.find('Header');
      expect(Header).toHaveLength(1);

      const Body = wrapper.find('RoutedBody');
      expect(Body).toHaveLength(1);

      const Feed = wrapper.find('AsyncFeed');
      expect(Feed).toHaveLength(1);
    }

    function expectLoadItems(props: IStepFunctionProps): void {
      const { wrapper } = props;

      const Feed = wrapper.find('AsyncFeed');
      expect(Feed).toHaveLength(1);
      const items = Feed.prop('items');

      expect(items.length).toBe(count);

      if (isRandom) {
        expect(items.every(([key, item]) => FakeID.is(item.id) === true))
          .toBe(true);
      } else {
        expect(items.some(([key, item]) => FakeID.is(item.id) === true))
          .toBe(false);
      }

      const FeedItem = wrapper.find('FeedItem');
      expect(FeedItem).toHaveLength(count);

      const Text = wrapper.find('Text');
      expect(FeedItem).toHaveLength(count);

      const Img = wrapper.find('Img');
      expect(FeedItem).toHaveLength(count);

      // random feed has RandomGif buttons, but Saved Feed - hasnt
      const ButtonRandomGif = wrapper.find('ButtonRandomGif')
      expect(ButtonRandomGif).toHaveLength(isRandom ? count: 0);

      const SaveButton = wrapper.find('ButtonAdd')
        .filterWhere(n => n.prop('isSaved') === false);
      expect(SaveButton).toHaveLength(isRandom ? count: 0);

      const DeleteButton = wrapper.find('ButtonAdd')
        .filterWhere(n => n.prop('isSaved') === true);
      expect(DeleteButton).toHaveLength(isRandom ? 0: count);

      firstStep(props);
    }
  });
}


it('Open random', () => {
  let _firstEntry;
  let _gifSrc;
  const initialPath = '/';
  const steps = [ updateGif, expectGifUpdated, expectSave];

  return expectApp(initialPath, true, steps, RANDOM_ITEMS_COUNT);

  function updateGif({ wrapper }: IStepFunctionProps): void {
    _firstEntry = store.getState().items.toArray()[0];
    const [oldKey, oldItem] = _firstEntry;
    expect(FakeID.is(oldItem.id))
      .toBe(true);

    const ButtonRandomGif = wrapper
      .find('ButtonRandomGif')
      .at(0);
    ButtonRandomGif.simulate('click');
  }

  function expectGifUpdated(props: IStepFunctionProps): void {
    const { wrapper } = props;
    const [newKey, newItem] = store.getState().items.toArray()[0];
    const [oldKey, oldItem] = _firstEntry;

    expect(newKey)
      .toEqual(oldKey);
    expect(newItem.id)
      .toEqual(oldItem.id);
    expect(newItem.gif.src)
      .not.toEqual(oldItem.gif.src);

    _gifSrc = newItem.gif.src;

    _firstEntry[1] = newItem;

    saveItem(props);
  }

  function saveItem({ wrapper }: IStepFunctionProps): void {
    const SaveButton = wrapper
      .find('ButtonAdd')
      .filterWhere(n => n.prop('isSaved') === false)
      .at(0);
    SaveButton.simulate('click');
  }

  function expectSave({ wrapper }: IStepFunctionProps): void {
    expectToggleSave(wrapper, false, _firstEntry);
  }
});

it('open saved', () => {
  let _firstEntry;
  const initialPath = '/saved';
  const steps = [ removeItem, expectRemove ];

  return expectApp(initialPath, false, steps, SAVED_ITEMS_COUNT);

  function removeItem({ wrapper }: IStepFunctionProps): void {
    _firstEntry = store.getState().items.toArray()[0];
    const DeleteButton = wrapper
      .find('ButtonAdd')
      .filterWhere(n => n.prop('isSaved') === true)
      .at(0);
    DeleteButton.simulate('click');
  }

  function expectRemove({ wrapper }: IStepFunctionProps): void {
    expectToggleSave(wrapper, true, _firstEntry);
  }
});


function expectToggleSave(wrapper: ReactWrapper, toRemove: boolean, [oldKey, oldItem]: IStorageEntry): void {
  const [newKey, newItem]: IStorageEntry = store.getState().items.toArray()[0];
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
