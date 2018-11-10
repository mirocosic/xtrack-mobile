import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      labels: state.labels.items,

      darkMode: state.common.darkMode,

    }
  },

  (dispatch) => {
    return {
      add: (payload) => dispatch({type: "ADD_LABEL", payload}),
      delete: (payload) => dispatch({type: "DELETE_LABEL", payload}),
      select: (payload) => dispatch({type: "SELECT_LABEL", payload})
    }
  }
)(Component);
