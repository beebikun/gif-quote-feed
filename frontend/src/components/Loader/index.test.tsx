import { shallow } from 'enzyme';
import * as React from 'react';

import Loader, { CLASSES } from './index';


it('render without crashing', () => {
  const wrapper = shallow(<Loader />);
  expect(wrapper.hasClass(CLASSES.dark))
    .toBe(false);
});


it('render dark', () => {
  const wrapper = shallow(<Loader dark={ true } />);
  expect(wrapper.hasClass(CLASSES.dark))
    .toBe(true);
});

