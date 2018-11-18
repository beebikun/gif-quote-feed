import { shallow } from 'enzyme';
import * as React from 'react';

import Header from './index';


it('render without crashing', () => {
  const wrapper = shallow(<Header />);

  const HeaderLink = wrapper.find('HeaderLink');
  expect(HeaderLink).toHaveLength(2);

  expectLink('Random');
  expectLink('Saved');

  function expectLink(title: string): void {
    // type T = typeof HeaderLink;
    const Link = HeaderLink.filterWhere((n): boolean => {
      return n.prop('title') === title;
    });
    expect(Link).toHaveLength(1);
  }
});
