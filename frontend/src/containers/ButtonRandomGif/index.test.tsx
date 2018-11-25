import { ShallowWrapper } from 'enzyme';
import Connected from './index';
import { actions as randomActions } from 'data/actions/random';

import { storageFromItems } from 'data/reducers/utils';
import { getConnectedWrapper, expectDispatchProps } from 'utils/testUtils/containers';
import { getTestItem } from 'utils/testUtils';

const KEY = 'STORAGE_KEY';

it('render without crashing', () => {
  const item = getTestItem();
  const props = { storageKey: KEY };
  const initialState = { items: storageFromItems([ item ]) };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { props, initialState });
  expectDispatchProps(wrapper.props(), {
    updateGif: [randomActions.fetchGif.request(KEY), KEY],
  });
});
