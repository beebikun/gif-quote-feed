import { shallow } from 'enzyme';
import * as React from 'react';

import Buttons from './index';
// import FakeID from 'utils/FakeID';

const KEY = 'STORAGE_KEY';
// const FAKE_ID = FakeID.next();
const ITEM_ID = 'ITEM_ID';

it('render without crashing', () => {
  shallow(<Buttons storageKey={ KEY } itemId={ ITEM_ID } />);
});


// it('render random item buttons set', () => {
//   const wrapper = shallow(<Buttons itemId={ FAKE_ID } />);
//   const ButtonSave = wrapper.find('Background');
//   expect(Background).toHaveLength(1);
// });

