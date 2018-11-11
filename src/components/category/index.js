import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      transactions: state.transactions.entries
    }
  },

  (dispatch) => {
    return {

    }
  }
)(Component);