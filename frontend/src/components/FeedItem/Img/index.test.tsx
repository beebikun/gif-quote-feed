import { shallow } from 'enzyme';
import * as React from 'react';
import { IGif } from 'api/giphy';
import Img from './index';


it('render with no data', () => {
  const wrapper = shallow(<Img />);
  expect(wrapper.get(0))
    .toBe(null);
});

const item: IGif = { id: '1', height: 200, src: 'src', width: 200 };

it('render with no data', () => {
  const wrapper = shallow(<Img src={ item } />);
  expect(wrapper.get(0))
    .not
    .toBe(null);
});

