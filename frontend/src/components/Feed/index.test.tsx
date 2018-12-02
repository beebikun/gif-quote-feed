import * as React from 'react';
import { shallow } from 'enzyme';

import * as records from 'data/records';
import Feed from './index';
import { IStorageEntry } from 'data/reducers/utils';
import { generateTestItems } from 'utils/testUtils';

const ITEMS: IStorageEntry[] = generateTestItems(2).map(item2entry);
function item2entry(item: records.Item, i: number): IStorageEntry {
  return ['STORAGE_KEY_' + i, item];
}

function expectItems(isLoading: boolean): void {
  const fetch = jest.fn();
  const wrapper = shallow(<Feed fetch={ fetch } items={ ITEMS } isLoading={ isLoading } />);
  const Item = wrapper.find('FeedItem');
  expect(Item).toHaveLength(isLoading ? 0 : ITEMS.length);
  const Loader = wrapper.find('Loader');
  expect(Loader).toHaveLength(isLoading ? 1 : 0);
}

it('render without crashing', () => {
  expectItems(false);
});


it('show loader', () => {
  expectItems(true);
});


it('fetch data', () => {
  const fetch = jest.fn();

  const render = jest.spyOn(Feed.prototype, 'render');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<Feed fetch={ fetch } items={ ITEMS } isLoading={ false } />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);

  (wrapper.instance() as Feed).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);

  return Promise.resolve(wrapper)
    .then(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
});
