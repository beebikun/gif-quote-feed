import { shallow } from 'enzyme';
import * as React from 'react';

import LazyImg, { IProps } from './index';

const props: IProps = {
  height: 200,
  src: 'src',
  width: 200,
};

it('renders without crashing', () => {
  shallow(<LazyImg { ...props } />);
});
