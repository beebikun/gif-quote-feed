import { shallow } from 'enzyme';
import * as React from 'react';

import Feed from './index';

import { generateTestItems } from 'utils/testUtils';


it('render without crashing', () => {
  const responseItems = generateTestItems(3);
  const wrapper = shallow(<Feed items={ responseItems } />);

  const FeedItem = wrapper.find('FeedItem');
  expect(FeedItem).toHaveLength(responseItems.length);
});
