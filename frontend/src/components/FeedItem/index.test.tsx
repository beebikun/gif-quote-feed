import { shallow } from 'enzyme';
import * as React from 'react';

import FeedItem from './index';
import * as records from 'data/records';

import { getTestItem } from 'utils/testUtils';

const KEY = 'STORAGE_KEY';

it('renders without crashing', () => {
  const item: records.Item = getTestItem();
  const wrapper = shallow(<FeedItem item={ item } storageKey={ KEY } />);

  const Background = wrapper.find('Background');
  expect(Background).toHaveLength(1);

  const Img = wrapper.find('Img');
  expect(Img).toHaveLength(1);
  expect(Img.prop('src'))
    .toEqual(item.gif);

  const Buttons = wrapper.find('Buttons');
  expect(Buttons).toHaveLength(1);
  expect(Buttons.prop('itemId'))
    .toEqual(item.id);
  expect(Buttons.prop('storageKey'))
    .toEqual(KEY);

  const Text = wrapper.find('Text');
  expect(Text).toHaveLength(1);
  expect(Text.prop('text'))
    .toEqual(item.text);
});
