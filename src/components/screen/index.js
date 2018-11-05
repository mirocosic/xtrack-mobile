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

    }
  }
)(Component);
