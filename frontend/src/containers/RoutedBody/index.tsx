import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootActions } from 'data/reducers';
import { actions as randomActions } from 'data/actions/random';
import RoutedBody, { IProps } from './element';


const fetchRandom = randomActions.fetchItems;
const fetchSaved = randomActions.fetchItems;


function mapDispatchToProps(dispatch: Dispatch<RootActions>): IProps {
  return bindActionCreators({
    fetchRandom: fetchRandom.request,
    fetchSaved: fetchSaved.request,
  }, dispatch);
}

const connector = connect(null, mapDispatchToProps);
export default connector(RoutedBody);
