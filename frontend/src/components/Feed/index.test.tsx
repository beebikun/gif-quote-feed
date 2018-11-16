import { shallow } from 'enzyme';
import * as React from 'react';

import { IQuote } from 'api/Andruxnet';
import Feed, { IState } from './index';
import { IProps as IItemProps } from 'components/FeedItem';

jest.mock('api/andruxnet');
/* tslint:disable:no-require-imports */
const api = require('api/andruxnet').default;
const item: IQuote = { quote: 'quote', author: 'author' };
api.get.mockImplementation( () => Promise.resolve([ item ]) );

it('renders without crashing', () => {
  shallow(<Feed />);
});


it('fetch data', () => {
  const render = jest.spyOn(Feed.prototype, 'render');
  const fetch = jest.spyOn(Feed.prototype, 'fetch');
  const setState = jest.spyOn(Feed.prototype, 'setState');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<Feed />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);
  expectItems([]);

  (wrapper.instance() as Feed).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledTimes(0);

  return Promise.resolve(wrapper)
    .then(() => {
      expectItems([ { text: item.quote } ]);
      expect(render).toHaveBeenCalledTimes(2); // render after setState
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(setState).toHaveBeenCalledTimes(1);
    });


  function expectItems(expected: IItemProps[]) {
    const { items } = wrapper.instance().state as IState;
    expect(items)
      .toEqual(expected);
  }
});
