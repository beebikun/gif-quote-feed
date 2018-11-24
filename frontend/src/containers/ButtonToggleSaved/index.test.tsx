import * as React from 'react';
import { ShallowWrapper } from 'enzyme';
import Connected from './index';
import { actions as savedActions } from 'data/actions/saved';

import { getConnectedWrapper, expectDispatchProps } from 'utils/testUtils/containers';


it('render without crashing', () => {
  const props = { itemId: '1' };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { props });
  expectDispatchProps(wrapper.props(), {
    onAdd: savedActions.saveItem.request(),
    onRemove: savedActions.deleteItem.request(),
  });
});
