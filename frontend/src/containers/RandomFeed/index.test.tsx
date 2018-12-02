import { ShallowWrapper } from 'enzyme';
import Connected from './index';

import { generateTestItems } from 'utils/testUtils';
import { storageToItems, storageFromItems } from 'data/reducers/utils';
import { IProps as IFeedProps } from 'components/Feed';
import { actions } from 'data/actions/random';

import { getConnectedWrapper, expectDispatchProps } from 'utils/testUtils/containers';

it('render without crashing', () => {
  const savedItems = generateTestItems(3);
  const store = storageFromItems(savedItems);
  const initialState = {
    items: store,
  };
  const storageItems = storageToItems(store);
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { initialState });
  expectDispatchProps(wrapper.props(), {
    fetch: [actions.fetchItems.request()],
  });

  const { items } = wrapper.props() as IFeedProps;
  expect(items)
    .toEqual(storageItems);
});
