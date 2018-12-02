import * as Immutable from 'immutable';
import { action } from 'typesafe-actions';

import { CONSTANTS as RANDOM_CONSTANTS } from 'data/actions/random';
import { CONSTANTS as SAVED_CONSTANTS } from 'data/actions/saved';
import * as records from 'data/records';
import { generateTestItems } from 'utils/testUtils';

import reducer from './index';
import { RootActions } from '../types';
import {
  storageFromItems, storageToItems, IStorage,
} from '../utils';

function storageItemsArray(storage: IStorage): records.Item[] {
  return storageToItems(storage)
    .map(entry => entry[1]);
}

function expectStorageItems(storage: IStorage,
                            expectedItems: records.Item[]): void {
  const storedItems: records.Item[] = storageItemsArray(storage);
  const storedIds: string[] = toIds(storedItems);
  const expectedIds: string[] = toIds(expectedItems);

  expect(storedIds)
    .toEqual(expectedIds);

  function toIds(items: records.Item[]) {
    return items.map(i => i.id);
  }
}


function expectStorageKeys(oldStorage: IStorage, newStorage: IStorage,
                           not?: boolean): void {
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
    const a = action('unknown') as RootActions;

    const nextState = reducer(undefined, a);
    expect(nextState)
      .toEqual(Immutable.OrderedMap());
  });

  it('unknown state: return old Map', () => {
    const oldItems: records.Item[] = generateTestItems(2, 'must stay');
    const prevState = storageFromItems(oldItems);

    const items: records.Item[] = generateTestItems(2, 'must pass off');
    const a = action('unknown', items) as RootActions;

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
  function expectEdit(editFn: (item: records.Item) => records.Item): void {
    const idx = 1;
    const oldItems: records.Item[] = generateTestItems(3);
    const prevState = storageFromItems(oldItems);
    const [ key, item ] = storageToItems(prevState)[idx];
    const value = editFn(item);
    const a = action(RANDOM_CONSTANTS.FETCH_GIF.SUCCESS, [ key, value ]);
    const nextState = reducer(prevState, a);
    expectStorageKeys(prevState, nextState); // keys werent change
    const newItems: records.Item[] = storageItemsArray(nextState);
    newItems.forEach((storagedItem: records.Item, i: number) => {
      if (i !== idx) {
        expect(storagedItem)
          .toEqual(oldItems[i]);
      } else {
        expect(storagedItem)
          .toEqual(value);
      }
    });
  }

  it('edit item: change gif', () => {
    const newValue = 'othergif';
    expectEdit((item: records.Item) => item.setIn(['gif', 'src'], newValue));
  });


  it('Delete item', () => {
    const newValue = 'fakeId';
    expectEdit((item: records.Item) => item.set('id', newValue));
  });


  it('Save item', () => {
    const newValue = 'savedId';
    expectEdit((item: records.Item) => item.set('id', newValue));
  });
});

