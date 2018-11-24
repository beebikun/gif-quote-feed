import * as React from 'react';
import { ShallowWrapper } from 'enzyme';

import Connected from './index';
import { IStorageEntry, storageFromItems } from 'data/reducers/utils';
import * as records from 'data/records';
import { generateTestItems } from 'utils/testUtils';
import { getConnectedWrapper } from 'utils/testUtils/containers';

it('render without crashing', () => {
  const storageItems = generateTestItems(2);
  const initialState = { items: storageFromItems(storageItems) };
  const ownProps = { fetch: jest.fn() };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { props: ownProps, initialState });

  // tslint:disable-next-line:no-any
  const items: IStorageEntry[] = (wrapper.props() as any).items;
  expect(items.map(i => i[1]))
    .toEqual(storageItems);
});