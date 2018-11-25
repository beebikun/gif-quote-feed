import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './element';

const KEY = 'STORAGE_KEY';

it('Render without crashing', () => {
  const props = {
    storageKey: KEY,
    updateGif: jest.fn()
  };
  const wrapper = shallow(<Button {...props} />);

  wrapper.simulate('click');
  expect(props.updateGif)
    .toHaveBeenCalledTimes(1);
  expect(props.updateGif)
    .toHaveBeenCalledWith(KEY);
});
