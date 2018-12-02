import { IStorageEntry } from 'data/reducers/utils';
import { _COUNT as SAVED_ITEMS_COUNT } from 'utils/testUtils/data/backend';
import store from 'data/storage';
import expectApp from './expectApp';
import expectToggleSave from './expectToggleSave';


it('open saved', (done) => {
  let firstEntry: IStorageEntry;
  const initialPath = '/saved';
  const steps = [ removeItem, expectRemove ];

  return expectApp(initialPath, false, steps, SAVED_ITEMS_COUNT);

  function removeItem({ wrapper }: IStepFunctionProps): void {
    firstEntry = store.getState().items.toArray()[0];
    const DeleteButton = wrapper
      .find('ButtonAdd')
      .filterWhere(n => n.prop('isSaved') === true)
      .at(0);
    DeleteButton.simulate('click');
  }

  function expectRemove({ wrapper }: IStepFunctionProps): void {
    expectToggleSave(wrapper, true, firstEntry);
    done();
  }
});