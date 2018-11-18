import * as React from 'react';
import { shallow } from 'enzyme';

import App from './index';


it('render without crashing', () => {
  const wrapper = shallow(<App />);
  const Body = wrapper.find('Body');
  expect(Body).toHaveLength(1);
  const Header = wrapper.find('Header');
  expect(Header).toHaveLength(1);
});
