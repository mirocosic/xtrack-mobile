import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    transactions: state.transactions.entries,
    accounts: state.accounts.items,
    selected: state.categories.selectedCategory,
    darkMode: state.common.darkMode,
  }),

  dispatch => ({
    edit: account => dispatch({ type: "EDIT_ACCOUNT", account }),
    delete: payload => dispatch({ type: "DELETE_ACCOUNT", payload }),
  }),
)(Component);
