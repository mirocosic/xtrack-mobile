import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      darkMode: state.common.darkMode
    }
  },

  (dispatch) => {
    return {
      select: (transaction) => dispatch({type: "SELECT_TRANSACTION", transaction}),
      delete: (transaction) => dispatch({type: "DELETE_TRANSACTION", transaction})
    }
  }
)(Component);
