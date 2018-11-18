import { shallow } from 'enzyme';
import * as React from 'react';

import HeaderLink from './index';


it('render without crashing', () => {
  const TITLE = 'SOME TEXT';
  const wrapper = shallow(<HeaderLink title={ TITLE } />);
  expect(wrapper.text())
    .toBe(TITLE);
});
