import { connect } from 'react-redux';

import { RootState } from 'data/reducers';
import RoutedBody from './element';


function mapStateToProps(state: RootState) {
  return {
    location: state.router.location,
  };
}

const connector = connect(mapStateToProps);
export default connector(RoutedBody);