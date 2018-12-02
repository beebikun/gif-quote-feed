import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { storageToItems } from 'data/reducers/utils';
import { RootActions, RootState } from 'data/reducers';
import { actions } from 'data/actions/random';
import Feed from 'components/Feed';


function mapStateToProps(state: RootState) {
  return {
    items: storageToItems(state.items),
  };
}

function mapDispatchToProps(dispatch: Dispatch<RootActions>) {
  return bindActionCreators({
    fetch: actions.fetchItems.request,
  }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Feed);