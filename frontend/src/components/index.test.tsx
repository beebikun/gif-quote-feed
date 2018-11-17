import * as React from 'react';
import { shallow } from 'enzyme';

import API from 'api';
import Item from 'api/records/Item';
import App, { IState } from './index';

import { generateTestItems } from 'utils/testUtils/data/item';

it('render without crashing', () => {
  shallow(<App />);
});

const mocked = jest.spyOn(API, 'randomItemsList');
const responseItems = generateTestItems(1);
mocked.mockReturnValue(Promise.resolve(responseItems));


it('fetch data', () => {
  mocked.mockClear();

  const render = jest.spyOn(App.prototype, 'render');
  const fetch = jest.spyOn(App.prototype, 'fetch');
  const setState = jest.spyOn(App.prototype, 'setState');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<App />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);
  expectItems([]);

  (wrapper.instance() as App).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledTimes(0);

  return Promise.resolve(wrapper)
    .then(() => {
      expectItems(responseItems);

      expect(render).toHaveBeenCalledTimes(2); // render after setState
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(setState).toHaveBeenCalledTimes(1);

      expect(mocked).toHaveBeenCalledTimes(1);

      const Feed = wrapper.find('Feed');
      expect(Feed).toHaveLength(1);
      expect(Feed.prop('items'))
        .toEqual(responseItems);
    });


  function expectItems(expected: Item[]) {
    const { items } = wrapper.instance().state as IState;
    expect(items)
      .toEqual(expected);
  }
});