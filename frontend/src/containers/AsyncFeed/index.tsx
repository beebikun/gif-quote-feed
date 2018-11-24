import * as Immutable from 'immutable';
import { connect } from 'react-redux';

import * as records from 'data/records';
import { RootState } from 'data/reducers';
import { storageToItems } from 'data/reducers/utils';
import AsyncFeed from './element';


function mapStateToProps(state: RootState) {
  return {
    items: storageToItems(state.items),
  };
}

const connector = connect(mapStateToProps);
export default connector(AsyncFeed);