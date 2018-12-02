import { ReactWrapper } from 'enzyme';
import { IStorageEntry } from 'data/reducers/utils';
import { COUNT as RANDOM_ITEMS_COUNT } from 'data/services/random/Andruxnet';
import { FakeID } from 'utils';
import store from 'data/storage';
import { IStepFunctionProps } from './router';
import expectApp from './expectApp';
import expectToggleSave from './expectToggleSave';

it('Open random', (done) => {
  let firstEntry: IStorageEntry;
  const initialPath = '/';
  const steps = [ updateGif, expectGifUpdated, expectSave];

  return expectApp(initialPath, true, steps, RANDOM_ITEMS_COUNT);

  function updateGif({ wrapper }: IStepFunctionProps): void {
    firstEntry = store.getState().items.toArray()[0];
    const oldItem = firstEntry[1];
    expect(FakeID.is(oldItem.id))
      .toBe(true);

    const ButtonRandomGif = wrapper
      .find('ButtonRandomGif')
      .at(0);
    ButtonRandomGif.simulate('click');
  }

  function expectGifUpdated(props: IStepFunctionProps): void {
    const [newKey, newItem] = store.getState().items.toArray()[0];
    const [oldKey, oldItem] = firstEntry;

    expect(newKey)
      .toEqual(oldKey);
    expect(newItem.id)
      .toEqual(oldItem.id);
    expect(newItem.gif.src)
      .not.toEqual(oldItem.gif.src);

    firstEntry[1] = newItem;

    saveItem(props);
  }

  function saveItem({ wrapper }: IStepFunctionProps): void {
    const SaveButton = wrapper
      .find('ButtonAdd')
      .filterWhere((n: ReactWrapper) => n.prop('isSaved') === false)
      .at(0);
    SaveButton.simulate('click');
  }

  function expectSave({ wrapper }: IStepFunctionProps): void {
    expectToggleSave(wrapper, false, firstEntry);
    done();
  }
});