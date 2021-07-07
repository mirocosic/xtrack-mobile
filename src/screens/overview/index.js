import { connect } from "react-redux"
import { get } from "lodash"
import moment from "moment"

import Component from "./component";

const sortByCategory = (categories, expenses) => {
  const result = {}
  expenses.forEach((expense) => {
    const category = categories.filter(cat => cat.id === expense.categoryId)
    const currExpenseSum = result[category.name] || 0
    result[category.name] = currExpenseSum + expense.amount
  })

  return result
}

export const filterByAccount = (expenses, accountFilter) => (
  accountFilter ? expenses.filter(item => accountFilter.id === get(item, "accountId")) : expenses
)

export const filterByMonth = (transactions, currentMonth) => (
  transactions.filter(t => moment(t.timestamp) > moment(currentMonth).startOf("month")
                           && moment(t.timestamp) < moment(currentMonth).endOf("month")
                           && t.type === "expense"))

export default connect(
  state => ({
    darkMode: state.common.darkMode,
    theme: state.common.theme,
    accounts: state.accounts.items,
    accountFilter: state.accounts.accountFilter,
    monthFilter: state.transactions.monthFilter,
    currentMonth: state.transactions.currentMonth,
    transactions: state.transactions.entries,
    categories: state.categories.items,
    total: state.transactions.total,
    expenses: state.transactions.expenses,
    expensesByCategory:
      sortByCategory(
        state.categories.items,
        filterByMonth(
          state.transactions.entries.filter(item => item.type === "expense"),
          state.transactions.currentMonth,
        ),
      ),
    income: state.transactions.income,
  }),

  dispatch => ({
    changeAccountFilter: account => dispatch({ type: "CHANGE_ACCOUNT_FILTER", account }),
    changeMonthFilter: month => dispatch({ type: "CHANGE_MONTH_FILTER", month }),
    clearTransactionForm: () => dispatch({ type: "CLEAR_TRANSACTION_FORM" }),
    clearSelectedCategory: () => dispatch({ type: "CLEAR_SELECTED_CATEGORY" }),
  }),
)(Component);
