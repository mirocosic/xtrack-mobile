import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    transactions: state.transactions.entries,
    categories: state.categories.items,
    darkMode: state.common.darkMode,
  }),

  dispatch => ({
    add: payload => dispatch({ type: "ADD_CATEGORY", payload }),
    remove: category => dispatch({ type: "REMOVE_CATEGORY", category }),
    removeTransactions: category => dispatch({ type: "REMOVE_CATEGORY_TRANSACTIONS", category }),
    selectCategory: payload => dispatch({ type: "SELECT_CATEGORY", payload }),
  }),
)(Component);
