import * as React from 'react';
import { shallow } from 'enzyme';
import Button, { CLASSNAMES } from './element';

import FakeID from 'utils/FakeID';

const KEY = 'STORAGE_KEY';
const props = {
  onAdd: jest.fn(),
  onRemove: jest.fn(),
  storageKey: KEY,
};

beforeEach(() => {
  props.onAdd.mockClear();
  props.onRemove.mockClear();
});

it('Render without crashing', () => {
  shallow(<Button { ...props } isSaved={ true } />);
});


it('Add', () => {
  const wrapper = shallow(<Button { ...props } isSaved={ false } />);
  expect(wrapper.hasClass(CLASSNAMES.notsaved))
    .toBe(true);
  wrapper.simulate('click');
  expect(props.onAdd)
    .toHaveBeenCalledTimes(1);
  expect(props.onAdd)
    .toHaveBeenCalledWith(KEY);
});


it('Delete', () => {
  const wrapper = shallow(<Button { ...props } isSaved={ true } />);
  expect(wrapper.hasClass(CLASSNAMES.saved))
    .toBe(true);
  wrapper.simulate('click');
  expect(props.onRemove)
    .toHaveBeenCalledTimes(1);
  expect(props.onRemove)
    .toHaveBeenCalledWith(KEY);
});