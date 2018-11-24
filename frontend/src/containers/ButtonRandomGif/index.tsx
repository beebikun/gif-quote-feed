import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';


import { RootActions } from 'data/reducers';
import { actions as randomActions } from 'data/actions/random';
import Button from './element';


const asyncAction = randomActions.fetchGif;

function mapDispatchToProps(dispatch: Dispatch<RootActions>) {
  return bindActionCreators({
    updateGif: asyncAction.request,
  }, dispatch);
}

const connector = connect(null, mapDispatchToProps);
export default connector(Button);
