import * as React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import { IAction } from 'data/reducers/types';

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
  [dispatchName: string]: (...args: any[]) => IAction;
}
interface IDispatchExpected {
  // tslint:disable-next-line:no-any
  [dispatchName: string]: [IAction, any?];
}
export function expectDispatchProps(props: IDispatchProps,
                                    expected: IDispatchExpected): void {
  Object.keys(expected)
    .forEach((dispatchName: string) => {
      const dispatch = props[dispatchName];
      expect(dispatch).toBeInstanceOf(Function);

      const [ expectedAction, ...args ] = expected[dispatchName];
      const action = dispatch(...args);
      expect(action).toEqual(expectedAction);
    });
}