import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    selectedCategory: state.categories.selectedCategory,
    transactions: state.transactions.entries,
    categories: state.categories.items,
    selected: state.categories.selectedCategory,
    darkMode: state.common.darkMode,
  }),

  dispatch => ({
    add: category => dispatch({ type: "ADD_CATEGORY", category }),
    edit: category => dispatch({ type: "EDIT_CATEGORY", category }),
    remove: category => dispatch({ type: "REMOVE_CATEGORY", category }),
    selectCategory: payload => dispatch({ type: "SELECT_CATEGORY", payload }),
  }),
)(Component);
