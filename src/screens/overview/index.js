import { connect } from "react-redux";
import Component from "./component";

const sortByCategory = (expenses) => {
  const result = {}
  expenses.map((expense) => {
    const currExpenseSum = result[expense.category.name] || 0
    result[expense.category.name] = currExpenseSum + expense.amount
  })

  return result
}

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    accounts: state.accounts.items,
    accountFilter: state.accounts.accountFilter,
    monthFilter: state.transactions.monthFilter,
    transactions: state.transactions.entries,
    total: state.transactions.total,
    expenses: state.transactions.expenses,
    expensesByCategory: sortByCategory(state.transactions.entries.filter(item => item.type === "expense")),
    income: state.transactions.income,
  }),

  dispatch => ({
    changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }),
    changeMonthFilter: month => dispatch({ type: "CHANGE_MONTH_FILTER", month }),
    clearTransactionForm: () => dispatch({ type: "CLEAR_TRANSACTION_FORM" }),
    clearSelectedCategory: () => dispatch({ type: "CLEAR_SELECTED_CATEGORY" }),
  }),
)(Component);