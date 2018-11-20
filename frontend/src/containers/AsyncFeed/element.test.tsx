import * as React from 'react';
import { shallow } from 'enzyme';

import * as records from 'data/records';
import AsyncFeed from './element';

import { generateTestItems } from 'utils/testUtils';

it('render without crashing', () => {
  const fetch = jest.fn();
  const items: records.Item[] = generateTestItems(2);
  const wrapper = shallow(<AsyncFeed fetch={ fetch } items={ items } />);
  const Item = wrapper.find('FeedItem');
  expect(Item).toHaveLength(items.length);
});


it('fetch data', () => {
  const items: records.Item[] = generateTestItems(2);
  const fetch = jest.fn();

  const render = jest.spyOn(AsyncFeed.prototype, 'render');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<AsyncFeed fetch={ fetch } items={ items } />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);

  (wrapper.instance() as AsyncFeed).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);

  return Promise.resolve(wrapper)
    .then(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

});
