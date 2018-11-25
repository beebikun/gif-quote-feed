/* tslint:disable:max-classes-per-file */
import * as React from 'react';
import { withRouter, Route, MemoryRouter, RouteComponentProps } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { RootState } from 'data/reducers';
import store from 'data/storage';
import App from 'components';

export interface IAssertProps extends RouteComponentProps {
  children?: React.ReactNode;
}

export interface IStepFunctionProps extends IAssertProps {
  wrapper: ReactWrapper;
}

export type IStepFunction = (props: IStepFunctionProps) => void;


export interface ISequenceProps {
  initialPath: string;
  steps: IStepFunction[];
}

export function renderTestSequence({
  initialPath = '/',
  steps = [],
}: ISequenceProps) {
  let wrapper: ReactWrapper;
  const renderPromise = Promise.resolve();
  renderPromise.then(() => {
    wrapper = mount(<Test />);
  });

  class Assert extends React.Component<IAssertProps, {}>  {
    public componentDidMount() {
      this.assert();
    }

    public componentDidUpdate() {
      this.assert();
    }

    public assert() {
      const nextStep: IStepFunction | undefined = steps.shift();
      if (nextStep) {
        renderPromise.then(() => {
          nextStep({ ...this.props, wrapper: wrapper.update() as ReactWrapper });
        });
      }
    }

    public render() {
      return (
        <App />
      );
    }
  }

  function mapStateToProps(state: RootState) {
    return { state };
  }

  const connector = connect(mapStateToProps);
  const ConnectedAssert = connector(Assert);

  class Test extends React.Component {
    public render() {
      return (
        <Provider store={ store }>
          <MemoryRouter initialEntries={ [initialPath] } >
             <Route component={ withRouter(ConnectedAssert) } />
          </MemoryRouter>
        </Provider>
      );
    }
  }
}