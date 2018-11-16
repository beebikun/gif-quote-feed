import { shallow } from 'enzyme';
import * as React from 'react';

import { IGif } from 'api/Giphy';
import Item, { IState } from './index';

const TEXT = 'TEXT';

jest.mock('api/giphy');
/* tslint:disable:no-require-imports */
const api = require('api/giphy').default;
const item: IGif = { id: '1', height: 200, src: 'src', width: 200 };
api.random.mockImplementation( () => Promise.resolve(item) );

it('renders without crashing', () => {
  shallow(<Item text={ TEXT } />);
});


it('fetch data', () => {
  const render = jest.spyOn(Item.prototype, 'render');
  const fetch = jest.spyOn(Item.prototype, 'fetch');
  const setState = jest.spyOn(Item.prototype, 'setState');

  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<Item text={ TEXT } />, options);

  expect(render).toHaveBeenCalledTimes(1);  // initial render
  expect(fetch).toHaveBeenCalledTimes(0);
  expectState(undefined);

  (wrapper.instance() as Item).componentDidMount();

  expect(render).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(setState).toHaveBeenCalledTimes(0);

  return Promise.resolve(wrapper)
    .then(() => {
      expectState(item);
      expect(render).toHaveBeenCalledTimes(2); // render after setState
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(setState).toHaveBeenCalledTimes(1);
    });


  function expectState(expected?: IGif) {
    const { gif } = wrapper.instance().state as IState;
    expect(gif)
      .toEqual(expected);
  }
});
