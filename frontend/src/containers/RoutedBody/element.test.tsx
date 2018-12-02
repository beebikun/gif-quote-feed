import * as React from 'react';
import { shallow } from 'enzyme';
import { Location } from 'history';

import RoutedBody from './element';

it('render without crashing', () => {
  const wrapper = shallow(<RoutedBody
    location={ {} as Location }
    />);

  expectChild('/');
  expectChild('/saved');

  const Redirect = wrapper.find('Redirect');
  expect(Redirect).toHaveLength(1);
  expect(Redirect.prop('to')).toBe('/');

  function expectChild(path: string): void {
    const r = wrapper
      .find('Route')
      .filterWhere((n) => n.prop('path') === path);
    expect(r).toHaveLength(1);
  }
});
