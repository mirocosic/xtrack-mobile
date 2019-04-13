import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    accounts: state.accounts.items,
    transactions: state.transactions.entries,
    darkMode: state.common.darkMode,
    transferMode: state.transactions.transferMode,
  }),

  dispatch => ({
    add: payload => dispatch({ type: "ADD_ACCOUNT", payload }),
    deleteAccount: payload => dispatch({ type: "DELETE_ACCOUNT", payload }),
    setTo: payload => dispatch({ type: "SELECT_TO_ACCOUNT", payload }),
    setFrom: payload => dispatch({ type: "SELECT_FROM_ACCOUNT", payload }),
  }),
)(Component);
