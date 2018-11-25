import { ShallowWrapper } from 'enzyme';

import Connected from './index';
import { IProps } from './element';
import { IStorageEntry, storageFromItems } from 'data/reducers/utils';
import { generateTestItems } from 'utils/testUtils';
import { getConnectedWrapper } from 'utils/testUtils/containers';

it('render without crashing', () => {
  const storageItems = generateTestItems(2);
  const initialState = { items: storageFromItems(storageItems) };
  const ownProps = { fetch: jest.fn() };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { props: ownProps, initialState });

  const items: IStorageEntry[] = (wrapper.props() as IProps).items;
  expect(items.map(i => i[1]))
    .toEqual(storageItems);
});