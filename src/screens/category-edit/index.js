import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      selectedCategory: state.categories.selectedCategory,
      transactions: state.transactions.entries,
      categories: state.categories.items,
      selected: state.categories.selectedCategory,
      darkMode: state.common.darkMode
    }
  },

  (dispatch) => {
    return {
      edit: (category) => dispatch({type: "EDIT_CATEGORY", category}),
      delete: (payload) => dispatch({type: "DELETE_CATEGORY", payload}),
      selectCategory: (payload) => dispatch({type: "SELECT_CATEGORY", payload})
    }
  }
)(Component);
