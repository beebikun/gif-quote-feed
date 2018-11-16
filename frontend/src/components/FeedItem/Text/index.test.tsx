import { shallow } from 'enzyme';
import * as React from 'react';

import Text from './index';

const text = "text"

it('render without crashing', () => {
  const wrapper = shallow(<Text text={ text } />);
  expect(wrapper.text())
    .toBe(text);
});

