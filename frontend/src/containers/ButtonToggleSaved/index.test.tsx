import { ShallowWrapper } from 'enzyme';
import Connected from './index';
import { actions as savedActions } from 'data/actions/saved';

import { getConnectedWrapper, expectDispatchProps } from 'utils/testUtils/containers';

const KEY = 'STORAGE_KEY';

it('render without crashing', () => {
  const props = { isSaved: true, storageKey: KEY };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { props });
  expectDispatchProps(wrapper.props(), {
    onAdd: [savedActions.saveItem.request(KEY), KEY],
    onRemove: [savedActions.deleteItem.request(KEY), KEY],
  });
});
