import Connected from './index';

import { getConnectedWrapper } from 'utils/testUtils/containers';

it('render without crashing', () => {
  const initialState = {
    router: { location: {} },
  };
  getConnectedWrapper(Connected, { initialState });
});
