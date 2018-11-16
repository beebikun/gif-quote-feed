import { shallow } from 'enzyme';
import * as React from 'react';

import Buttons from './index';


it('render without crashing', () => {
  shallow(<Buttons />);
});

