import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      entries: state.transactions.entries,
      total: state.transactions.total
    }
  },

  (dispatch) => {
    return {
    }
  }
)(Component);
