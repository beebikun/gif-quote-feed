import { shallow } from 'enzyme';
import * as React from 'react';

import Header from './index';


it('render without crashing', () => {
  const wrapper = shallow(<Header />);

  const HeaderLink = wrapper.find('HeaderLink');
  expect(HeaderLink).toHaveLength(2);

  expectChild('Random', '/');
  expectChild('Saved', '/saved');

  function expectChild(title: string, path: string): void {
    const Link = HeaderLink.filterWhere((n): boolean => {
      return n.prop('title') === title;
    });
    expect(Link)
      .toHaveLength(1);
    expect(Link.prop('to'))
      .toEqual(path);
  }
});
