import { connect } from "react-redux"
import Component from "./component"

export default connect(
  state => ({
    accounts: state.accounts.items,
    transactions: state.transactions.entries,
    darkMode: state.common.darkMode,
    theme: state.common.theme,
    transferMode: state.transactions.transferMode,
  }),

  dispatch => ({
    remove: account => dispatch({ type: "REMOVE_ACCOUNT", account }),
    removeTransactions: account => dispatch({ type: "REMOVE_ACCOUNT_TRANSACTIONS", account }),
    setTo: payload => dispatch({ type: "SELECT_TO_ACCOUNT", payload }),
    setFrom: payload => dispatch({ type: "SELECT_FROM_ACCOUNT", payload }),
  }),
)(Component)
