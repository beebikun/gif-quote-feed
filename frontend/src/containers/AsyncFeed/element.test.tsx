import * as React from 'react';
import { shallow } from 'enzyme';

import * as records from 'data/records';
import AsyncFeed from './element';
import { IStorageEntry } from 'data/reducers/utils';
import { generateTestItems } from 'utils/testUtils';

const ITEMS: IStorageEntry[] = generateTestItems(2).map(item2entry);
function item2entry(item: records.Item, i: number): IStorageEntry {
  return ['STORAGE_KEY_' + i, item];
}

it('render without crashing', () => {
  const fetch = jest.fn();
  const wrapper = shallow(<AsyncFeed fetch={ fetch } items={ ITEMS } />);
  const Item = wrapper.find('FeedItem');
  expect(Item).toHaveLength(ITEMS.length);
});


it('fetch data', () => {
  const fetch = jest.fn();

  const render = jest.spyOn(AsyncFeed.prototype, 'render');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<AsyncFeed fetch={ fetch } items={ ITEMS } />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);

  (wrapper.instance() as AsyncFeed).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);

  return Promise.resolve(wrapper)
    .then(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
});
