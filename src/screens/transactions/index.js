import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      accounts: state.accounts.items,
      accountFilter: state.accounts.accountFilter,
      entries: state.transactions.entries,
      total: state.transactions.total,
      expenses: state.transactions.expenses,
      income: state.transactions.income
    }
  },

  (dispatch) => {
    return {
      changeAccountFilter: (account) => dispatch({type: "CHANGE_ACCOUNT_FILTER", account}),
      clearTransactionForm: () => dispatch({type: "CLEAR_TRANSACTION_FORM"}),
      clearSelectedCategory: () => dispatch({type: "CLEAR_SELECTED_CATEGORY"})
    }
  }
)(Component);
