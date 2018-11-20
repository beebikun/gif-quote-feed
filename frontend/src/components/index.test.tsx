import * as React from 'react';
import { shallow } from 'enzyme';

import App from './index';


it('render without crashing', () => {
  shallow(<App />);
});
