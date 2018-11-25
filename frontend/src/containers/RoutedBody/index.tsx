import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootActions, RootState } from 'data/reducers';
import { actions as randomActions } from 'data/actions/random';
import { actions as savedActions } from 'data/actions/saved';
import RoutedBody from './element';


const fetchRandom = randomActions.fetchItems;
const fetchSaved = savedActions.fetchItems;

function mapStateToProps(state: RootState) {
  return {
    location: state.router.location,
  };
}


function mapDispatchToProps(dispatch: Dispatch<RootActions>) {
  return bindActionCreators({
    fetchRandom: fetchRandom.request,
    fetchSaved: fetchSaved.request,
  }, dispatch);
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(RoutedBody);