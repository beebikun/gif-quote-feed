import { connect } from 'react-redux';

import * as records from 'data/records';
import { RootState } from 'data/reducers';
import AsyncFeed, { IOwnProps } from './element';

interface IState {
  items: records.Item[];
}

function mapStateToProps(state: RootState): IState {
  return {
    items: state.items.array(),
  };
}

const connector = connect<IState, {}, IOwnProps>(mapStateToProps);
export default connector(AsyncFeed);