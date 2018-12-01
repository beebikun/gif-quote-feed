import * as Immutable from 'immutable';
import { Reducer } from 'redux';
import { action } from 'typesafe-actions';

import * as records from 'data/records';
import { RootActions } from 'data/reducers';
import {
  storageFromItems, storageToItems, IStorage,
} from 'data/reducers/utils';
import { generateTestItems } from 'utils/testUtils';

export function expectUnknown(reducer: Reducer): void {
  const a = action('unknown') as RootActions;

  const nextState = reducer(undefined, a);
  expect(nextState)
    .toEqual(Immutable.OrderedMap());
}

export function expectDefault(reducer: Reducer): void {
  const oldItems: records.Item[] = generateTestItems(2, 'must stay');
  const prevState = storageFromItems(oldItems);

  const items: records.Item[] = generateTestItems(2, 'must pass off');
  const a = action('unknown', items) as RootActions;

  const nextState = reducer(prevState, a);
  expectStorageItems(nextState, oldItems);  // items werent change
  expectStorageKeys(prevState, nextState); // keys werent change
}

export function expectEdit(reducer: Reducer, actionType: string, editFn: (item: records.Item) => records.Item): void {
  const idx = 1;
  const oldItems: records.Item[] = generateTestItems(3);
  const prevState = storageFromItems(oldItems);
  const [ key, item ] = storageToItems(prevState)[idx];
  const value = editFn(item);
  const a = action(actionType, [ key, value ]);
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

export function storageItemsArray(storage: IStorage): records.Item[] {
  return storageToItems(storage)
    .map(entry => entry[1]);
}

export function expectStorageItems(storage: IStorage,
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


export function expectStorageKeys(oldStorage: IStorage, newStorage: IStorage,
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


export function expectSet(reducer: Reducer, type: string): void {
  const oldItems: records.Item[] = generateTestItems(2, 'old items');
  const prevState = storageFromItems(oldItems);

  const items: records.Item[] = generateTestItems(1, 'new items');
  const a = action(type, items);

  const nextState = reducer(prevState, a);
  expectStorageItems(nextState, items);  // new items are set
  expectStorageKeys(prevState, nextState, true); // new keys are set
}