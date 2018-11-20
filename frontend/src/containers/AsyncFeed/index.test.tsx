import * as React from 'react';
import { shallow } from 'enzyme';

import Connected from './index';

import * as records from 'data/records';
import configureStore from 'redux-mock-store';
import { generateTestItems } from 'utils/testUtils';

const mockStore = configureStore();

it('render without crashing', () => {
  const storageItems = generateTestItems(2);
  const store = mockStore({ items: new records.ItemStorage(storageItems) });
  // Connected itself doesnot have store property so need to fix it
  const props = { store, fetch: jest.fn() };
  // tslint:disable-next-line:no-any
  const wrapper = shallow(<Connected {...props as any} />);
  // tslint:disable-next-line:no-any
  const { items } = wrapper.props() as any;
  expect(items)
    .toEqual(storageItems);
});