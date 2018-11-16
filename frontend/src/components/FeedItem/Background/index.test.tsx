import { shallow } from 'enzyme';
import * as React from 'react';

import Background from './index';


it('render without crashing', () => {
  const wrapper = shallow(<Background > <div id="inner" /> </Background>);
  expect(wrapper.find('#inner')).toHaveLength(1);

  const bg = wrapper.get(0).props.style.backgroundColor;
  expect(/^#[0-9A-F]{6}/.test(bg))
    .toBe(true);
});

