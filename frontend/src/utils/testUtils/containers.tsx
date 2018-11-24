import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';

interface IConnectedWrapperParams {
  // tslint:disable-next-line:no-any
  props?: { [name: string]: any };
  // tslint:disable-next-line:no-any
  initialState?: { [name: string]: any };
}

// tslint:disable-next-line:no-any
export function getConnectedWrapper(Connected: any, params?: IConnectedWrapperParams): ShallowWrapper {
  const mockStore = configureStore();
  const props = (params && params.props) ? params.props : {};
  props.store = mockStore(params && params.initialState);

  // Connected itself doesnot have store property so need to fix it
  // tslint:disable-next-line:no-any
  return shallow(<Connected { ...props as any } />);
}

interface IDispatchProps {
  // tslint:disable-next-line:no-any
  [dispatchName: string]: any;
}
export function expectDispatchProps(props: IDispatchProps, expected: IDispatchProps): void {
  Object.keys(expected)
    .forEach((dispatchName: string) => {
      const request = props[dispatchName];
      expect(request).toBeDefined();
      expect(request).toBeInstanceOf(Function);
      expect(request()).toEqual(expected[dispatchName]);
    });
}