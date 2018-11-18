import { shallow } from 'enzyme';
import * as React from 'react';
import Img from './index';

import { _ITEM } from 'utils/testUtils/data/gif';

it('render without crashing', () => {
  const wrapper = shallow(<Img src={ _ITEM } />);
  const LazyImg = wrapper.find('LazyImg');
  expect(LazyImg).toHaveLength(1);
  expect(LazyImg.prop('height')).toBe(_ITEM.height);
  expect(LazyImg.prop('src')).toBe(_ITEM.src);
  expect(LazyImg.prop('width')).toBe(_ITEM.width);
});

