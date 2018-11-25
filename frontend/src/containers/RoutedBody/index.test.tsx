import { ShallowWrapper } from 'enzyme';
import Connected from './index';
import { actions as randomActions } from 'data/actions/random';
import { actions as savedActions } from 'data/actions/saved';

import { getConnectedWrapper, expectDispatchProps } from 'utils/testUtils/containers';

it('render without crashing', () => {
  const initialState = {
    router: { location: {} },
  };
  const wrapper: ShallowWrapper = getConnectedWrapper(Connected, { initialState });
  expectDispatchProps(wrapper.props(), {
    fetchRandom: [randomActions.fetchItems.request()],
    fetchSaved: [savedActions.fetchItems.request()],
  });
});
