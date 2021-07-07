import { connect } from "react-redux"
import Component from "./component"

export default connect(
  state => ({
    transactions: state.transactions.entries,
    accounts: state.accounts.items,
    selected: state.categories.selectedCategory,
    darkMode: state.common.darkMode,
    theme: state.common.theme,
  }),

  dispatch => ({
    add: account => dispatch({ type: "ADD_ACCOUNT", account }),
    edit: account => dispatch({ type: "EDIT_ACCOUNT", account }),
    remove: account => dispatch({ type: "REMOVE_ACCOUNT", account }),
    removeTransactions: account => dispatch({ type: "REMOVE_ACCOUNT_TRANSACTIONS", account }),
    setDefault: account => dispatch({ type: "SET_DEFAULT_ACCOUNT", account }),
  }),
)(Component)
