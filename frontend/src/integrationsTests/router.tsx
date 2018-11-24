import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { withRouter, Route, MemoryRouter, RouteComponentProps } from "react-router-dom";
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { RootState } from 'data/reducers';
import store from 'data/storage';

export interface IAssertProps extends RouteComponentProps {
}

export interface IStepFunctionProps extends RouteComponentProps {
  wrapper: ReactWrapper,
}

export interface IStepFunction {
  (props: IStepFunctionProps): void
}

export type TSybject = | React.Component | React.StatelessComponent;

export interface ISequenceProps {
  initialPath: string;
  steps: Array<IStepFunction>;
};

export function renderTestSequence(Subject: TSybject, {
  initialPath='/',
  steps=[],
}: ISequenceProps) {
  let wrapper;
  const renderPromise = Promise.resolve();
  renderPromise.then(() => {
    wrapper = mount(<Test />);
  });

  class Assert extends React.Component<IAssertProps, {}>  {
    componentDidMount() {
      this.assert();
    }

    componentDidUpdate() {
      this.assert();
    }

    assert() {
      const nextStep: IStepFunction | undefined = steps.shift();
      if (nextStep) {
        renderPromise.then(() => {
          nextStep({ ...this.props, wrapper: wrapper.update() });
        });
      }
    }

    render() {
      return (
        <Subject />
      );
    }
  }

  function mapStateToProps(state: RootState) {
    return { state };
  }

  const connector = connect(mapStateToProps);
  const ConnectedAssert = connector(Assert);

  class Test extends React.Component {
    render() {
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