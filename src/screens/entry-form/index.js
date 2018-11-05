import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      darkMode: state.common.darkMode,
      entries: state.transactions.entries,
      selectedCategory: state.categories.selectedCategory
    }
  },

  (dispatch) => {
    return {
      add: (transaction) => dispatch({type: "ADD_TRANSACTION", transaction})
    }
  }
)(Component);
