import { action } from 'typesafe-actions';
import reducer from './reducer';
import {
  storageFromItems, storageToItems,
  IStorageEntry, IStorage,
} from './utils';
import * as Immutable from 'immutable';
import { CONSTANTS as RANDOM_CONSTANTS } from 'data/actions/random';
import { CONSTANTS as SAVED_CONSTANTS } from 'data/actions/saved';

import * as records from 'data/records';
import { generateTestItems } from 'utils/testUtils';


function expectStorageItems(storage: IStorage,
                            items: records.Item[]): records.Item[] {
  const storedItems: records.Item[] = Object.values(storage.toObject());
  const storedIds: string[] = toIds(storedItems);
  const expectedIds: string[] = toIds(items);

  expect(storedIds)
    .toEqual(expectedIds);

  return storedItems;

  function toIds(items: records.Item[]) {
    return items.map(i => i.id);
  }
}


function expectStorageKeys(oldStorage, newStorage, not?: boolean) {
  const oldKeys = oldStorage.keys();
  const newKeys = newStorage.keys();

  if (not) {
    expect(newKeys)
      .not.toEqual(oldKeys);
  } else {
    expect(newKeys)
      .toEqual(oldKeys);
  }
}

describe('DEFAULT CASE', () => {
  it('initial state: create new Map', () => {
    // tslint:disable-next-line:no-any
    const a = action('unknown') as any;

    const nextState = reducer(undefined, a);
    expect(nextState)
      .toEqual(Immutable.OrderedMap());
  });

  it('unknown state: return old Map', () => {
    const oldItems: records.Item[] = generateTestItems(2, 'must stay');
    const prevState = storageFromItems(oldItems);

    const items: records.Item[] = generateTestItems(2, 'must pass off');
    // tslint:disable-next-line:no-any
    const a = action('unknown', items) as any;

    const nextState = reducer(prevState, a);
    expectStorageItems(nextState, oldItems);  // items werent change
    expectStorageKeys(prevState, nextState); // keys werent change
  });
});




describe('SET NEW ITEMS: return new Map', () => {
  function expectSet(type: string): void {
    const oldItems: records.Item[] = generateTestItems(2, 'old items');
    const prevState = storageFromItems(oldItems);

    const items: records.Item[] = generateTestItems(1, 'new items');
    const a = action(type, items);

    const nextState = reducer(prevState, a);
    expectStorageItems(nextState, items);  // new items are set
    expectStorageKeys(prevState, nextState, true); // new keys are set
  }

  it('set items from random: return new ItemStorage', () => {
    expectSet(RANDOM_CONSTANTS.FETCH_ITEMS.SUCCESS);
  });

  it('set items from saved: return new ItemStorage', () => {
    expectSet(SAVED_CONSTANTS.FETCH_ITEMS.SUCCESS);
  });
});

describe('EDIT ITEM IN STORAGE: return old Map', () => {
  function expectEdit(editFn, expectFn): void {
    const idx = 1;
    const oldItems: records.Item[] = generateTestItems(3);
    const prevState = storageFromItems(oldItems);
    const [ key, item ] = storageToItems(prevState)[idx];
    const value = editFn(item);
    const a = action(RANDOM_CONSTANTS.FETCH_GIF.SUCCESS, [ key, value ]);
    const nextState = reducer(prevState, a);
    expectStorageKeys(prevState, nextState); // keys werent change
    const newItems = Object.values(nextState.toObject());
    newItems.forEach((storagedItem, i) => {
      if (i !== idx) {
        expect(storagedItem)
          .toEqual(oldItems[i]);
      } else {
        expect(storagedItem)
          .toEqual(value);
      }
    });
  };

  it('edit item: change gif', () => {
    const newValue = 'othergif';
    expectEdit(function (item: records.Item): records.Item {
      return item.set('gif', newValue);
    });
  });


  it('Delete item', () => {
    const newValue = 'fakeId';
    expectEdit(function (item: records.Item): records.Item {
      return item.set('id', newValue);
    });
  });


  it('Save item', () => {
    const newValue = 'savedId';
    expectEdit(function (item: records.Item): records.Item {
      return item.set('id', newValue);
    });
  });
});

