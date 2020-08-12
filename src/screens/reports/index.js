import { connect } from "react-redux";
import Component from "./component";

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    accounts: state.accounts.items,
    accountFilter: state.accounts.accountFilter,
    transactions: state.transactions.entries,
    total: state.transactions.total,
    expenses: state.transactions.expenses,
    income: state.transactions.income,
  }),

  dispatch => ({ changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }) }),
)(Component);
