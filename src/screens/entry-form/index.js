import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      entries: state.transactions.entries,
      selectedCategory: state.categories.selectedCategory
    }
  },

  (dispatch) => {
    return {
      addNew: (payload) => dispatch({type: "ADD_NEW_ENTRY", payload})
    }
  }
)(Component);
