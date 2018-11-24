import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootActions } from 'data/reducers';
import { actions as savedActions } from 'data/actions/saved';
import Button from './element';


const saveActions = savedActions.saveItem;
const deleteActions = savedActions.deleteItem;


function mapDispatchToProps(dispatch: Dispatch<RootActions>) {
  return bindActionCreators({
    onAdd: saveActions.request,
    onRemove: deleteActions.request,
  }, dispatch);
}

const connector = connect(null, mapDispatchToProps);
export default connector(Button);
