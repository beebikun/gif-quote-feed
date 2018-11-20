import { shallow } from 'enzyme';
import * as React from 'react';

import HeaderLink from './index';


it('render without crashing', () => {
  const TITLE = 'SOME TEXT';
  const TO = '/path';

  const wrapper = shallow(<HeaderLink title={ TITLE } to={ TO } />);

  const Link = wrapper.find('NavLink');
  expect(Link).toHaveLength(1);
  expect(Link.prop('to')).toBe(TO);
  expect(Link.props().children).toBe(TITLE);
});
