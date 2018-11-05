import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {

    }
  },

  (dispatch) => {
    return {
      delete: (transaction) => dispatch({type: "DELETE_TRANSACTION", transaction})
    }
  }
)(Component);
