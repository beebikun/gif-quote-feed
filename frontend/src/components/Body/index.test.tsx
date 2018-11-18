import * as React from 'react';
import { shallow } from 'enzyme';

import API from 'data/api';
import * as records from 'data/records';
import Body, { IState } from './index';

import { generateTestItems } from 'utils/testUtils/';
import { getExpected } from 'utils/testUtils';

it('render without crashing', () => {
  shallow(<Body />);
});

const mocked = jest.spyOn(API, 'randomItemsList');
const responseItems = generateTestItems(1);
mocked.mockReturnValue(Promise.resolve(responseItems));


it('fetch data', () => {
  mocked.mockClear();

  const render = jest.spyOn(Body.prototype, 'render');
  const fetch = jest.spyOn(Body.prototype, 'fetch');
  const setState = jest.spyOn(Body.prototype, 'setState');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapped = shallow(<Body />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);
  expectStorage([]);

  (wrapped.instance() as Body).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledTimes(0);

  return Promise.resolve(wrapped)
    .then(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(setState).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledTimes(2); // render after setState

      expectStorage(responseItems);

      expect(mocked).toHaveBeenCalledTimes(1);

      const Feed = wrapped.find('Feed');
      expect(Feed).toHaveLength(1);
      expect(Feed.prop('items'))
        .toEqual(responseItems);
    });


  function expectStorage(items: records.Item[]): void {
    const { storage } = wrapped.instance().state as IState;
    const expected = getExpected(items);
    expect(storage.items)
      .toEqual(expected);
  }

});
