import { shallow } from 'enzyme';
import * as React from 'react';
import Gif from 'api/records/Gif';
import Img from './index';

const item = new Gif({ height: 200, src: 'src', width: 200 });

it('render without crashing', () => {
  const wrapper = shallow(<Img src={ item } />);
  const LazyImg = wrapper.find('LazyImg');
  expect(LazyImg).toHaveLength(1);
  expect(LazyImg.prop('height')).toBe(item.height);
  expect(LazyImg.prop('src')).toBe(item.src);
  expect(LazyImg.prop('width')).toBe(item.width);
});

