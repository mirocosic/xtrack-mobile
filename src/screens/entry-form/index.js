import { connect } from 'react-redux';
import Component from './component';

export default connect(
  (state) => {
    return {
      darkMode: state.common.darkMode,
      entries: state.transactions.entries,
      transferMode: state.transactions.transferMode,
      selectedCategory: state.categories.selectedCategory,
      toAccount: state.accounts.toAccount,
      fromAccount: state.accounts.fromAccount
    }
  },

  (dispatch) => {
    return {
      add: (transaction) => dispatch({type: "ADD_TRANSACTION", transaction}),
      setTransferMode: (value) => dispatch({type:"SET_TRANSFER_MODE", value})
    }
  }
)(Component);
