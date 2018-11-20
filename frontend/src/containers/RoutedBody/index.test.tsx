import * as React from 'react';
import { shallow } from 'enzyme';
import Connected from './index';
import { actions as randomActions } from 'data/actions/random';
import { actions as savedActions } from 'data/actions/random';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

it('render without crashing', () => {
  const store = mockStore();
  // Connected itself doesnot have store property so need to fix it
  const props = { store };
  // tslint:disable-next-line:no-any
  const wrapper = shallow(<Connected {...props as any} />);

  // tslint:disable-next-line:no-any
  const { fetchRandom, fetchSaved } = wrapper.props() as any;
  expect(fetchRandom).toBeInstanceOf(Function);
  expect(fetchSaved).toBeInstanceOf(Function);

  const randomFetched = fetchRandom();
  expect(randomFetched)
    .toEqual(randomActions.fetchItems.request());
  const savedFetched = fetchSaved();
  expect(savedFetched)
    .toEqual(savedActions.fetchItems.request());
});
