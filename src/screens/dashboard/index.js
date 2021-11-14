import { connect } from "react-redux"
import Component from "./component"

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    theme: state.common.theme,
    openOnForm: state.common.openOnForm,
    accounts: state.accounts.items,
    accountFilter: state.accounts.accountFilter,
    categories: state.categories.items,
    transactions: state.transactions.entries,
    total: state.transactions.total,
    expenses: state.transactions.expenses,
    income: state.transactions.income,
    currentMonth: state.transactions.currentMonth,
  }),

  dispatch => ({
    changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }),
    clearTransactionForm: () => dispatch({ type: "CLEAR_TRANSACTION_FORM" }),
    clearSelectedCategory: () => dispatch({ type: "CLEAR_SELECTED_CATEGORY" }),
  }),
)(Component);
